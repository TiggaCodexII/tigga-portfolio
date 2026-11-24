interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

const HOSTNAME =
  "tiggacodexii-tigga-portfolio.tiggacodex.workers.dev";

const ORIGIN = `https://${HOSTNAME}`;

function json(
  body: Record<string, unknown>,
  status = 200
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function contact(
  request: Request,
  env: Env
): Promise<Response> {

  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  if (request.headers.get("Origin") !== ORIGIN) {
    return json({ error: "Invalid request origin." }, 403);
  }

  if (
    !request.headers
      .get("Content-Type")
      ?.toLowerCase()
      .includes("application/json")
  ) {
    return json({ error: "Invalid content type." }, 415);
  }

  if (
    !env.TURNSTILE_SECRET_KEY ||
    !env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return json({ error: "Service unavailable." }, 503);
  }

  let body: Record<string, unknown>;

  try {
    const reader = request.body?.getReader();

    if (!reader) {
      return json({ error: "Empty request." }, 400);
    }

    const decoder = new TextDecoder();
    let raw = "";
    let bytes = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      bytes += value.byteLength;

      if (bytes > 16384) {
        await reader.cancel();
        return json({ error: "Request too large." }, 413);
      }

      raw += decoder.decode(value, { stream: true });
    }

    raw += decoder.decode();

    const parsed = JSON.parse(raw);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return json({ error: "Invalid request." }, 400);
    }

    body = parsed;

  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const clean = (value: unknown) =>
    typeof value === "string" ? value.trim() : "";

  const name = clean(body.name);
  const email = clean(body.email);
  const company = clean(body.company);
  const projectType = clean(body.projectType);
  const message = clean(body.message);
  const token = clean(body.turnstileToken);

  if (
    !name ||
    name.length > 100 ||
    !email ||
    email.length > 255 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    company.length > 120 ||
    projectType.length > 120 ||
    message.length < 10 ||
    message.length > 1000
  ) {
    return json({
      error: "Please check your contact information."
    }, 400);
  }

  if (!token || token.length > 2048) {
    return json({
      error: "Human verification is required."
    }, 400);
  }

  try {
    const verification = new FormData();

    verification.append(
      "secret",
      env.TURNSTILE_SECRET_KEY
    );

    verification.append("response", token);

    const ip = request.headers.get("CF-Connecting-IP");

    if (ip) {
      verification.append("remoteip", ip);
    }

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: verification,
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!verifyResponse.ok) {
      return json({
        error: "Verification service unavailable."
      }, 503);
    }

    const result = await verifyResponse.json() as {
      success: boolean;
      hostname?: string;
      action?: string;
    };

    if (
      !result.success ||
      result.hostname !== HOSTNAME ||
      result.action !== "contact"
    ) {
      return json({
        error: "Verification failed. Please try again."
      }, 403);
    }

    const dbResponse = await fetch(
      `${env.SUPABASE_URL}/rest/v1/contact_submissions`,
      {
        method: "POST",
        headers: {
          "apikey": env.SUPABASE_SERVICE_ROLE_KEY,
          "Authorization":
            `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          name,
          email,
          company: company || null,
          project_type: projectType || null,
          message,
        }),
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!dbResponse.ok) {
      console.error(
        "Contact database insertion failed:",
        dbResponse.status
      );

      return json({
        error: "Unable to submit message. Please try again."
      }, 502);
    }

    return json({ success: true }, 201);

  } catch {
    return json({
      error: "Unable to complete your request. Please try again."
    }, 503);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return contact(request, env);
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "Not found." }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
