import { useEffect, useRef, useState } from "react";

type TurnstileAPI = {
  render: (
    container: HTMLElement,
    options: Record<string, unknown>
  ) => string;
  remove: (widgetId: string) => void;
};

type TurnstileWindow = Window & {
  turnstile?: TurnstileAPI;
};

let scriptPromise: Promise<TurnstileAPI> | undefined;

function loadTurnstile(): Promise<TurnstileAPI> {
  const browser = window as TurnstileWindow;

  if (browser.turnstile) {
    return Promise.resolve(browser.turnstile);
  }

  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

    script.async = true;

    script.onload = () => {
      if (browser.turnstile) {
        resolve(browser.turnstile);
      } else {
        script.remove();
        scriptPromise = undefined;
        reject(new Error("Verification unavailable."));
      }
    };

    script.onerror = () => {
      script.remove();
      scriptPromise = undefined;
      reject(new Error("Verification could not load."));
    };

    document.head.appendChild(script);
  });

  return scriptPromise;
}

interface Props {
  onToken: (token: string) => void;
  resetKey: number;
}

const Turnstile = ({ onToken, resetKey }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    let widgetId: string | undefined;
    let api: TurnstileAPI | undefined;

    onToken("");
    setError(false);

    const siteKey =
      import.meta.env.VITE_TURNSTILE_SITE_KEY;

    if (!siteKey) {
      setError(true);
      return;
    }

    loadTurnstile()
      .then((turnstile) => {
        if (!active || !container.current) return;

        api = turnstile;

        widgetId = api.render(container.current, {
          sitekey: siteKey,
          action: "contact",
          theme: "dark",
          size: "flexible",
          callback: (token: string) => {
            if (active) onToken(token);
          },
          "expired-callback": () => {
            if (active) onToken("");
          },
          "error-callback": () => {
            if (active) {
              onToken("");
              setError(true);
            }
          },
        });
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;

      if (widgetId !== undefined && api) {
        api.remove(widgetId);
      }
    };
  }, [onToken, resetKey, attempt]);

  return (
    <div className="space-y-2">
      <div ref={container} className="min-h-[65px]" />

      {error && (
        <div className="space-y-2">
          <p className="text-xs text-destructive" role="alert">
            Verification unavailable. Check your connection
            and try again.
          </p>

          <button
            type="button"
            className="text-sm text-primary underline"
            onClick={() => setAttempt((value) => value + 1)}
          >
            Retry verification
          </button>
        </div>
      )}
    </div>
  );
};

export default Turnstile;
