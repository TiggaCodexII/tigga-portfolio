BEGIN;

CREATE TYPE public.app_role AS ENUM (
  'admin', 'moderator', 'user'
);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.user_roles
FROM PUBLIC, anon, authenticated;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE FUNCTION public.has_role(
  _user_id uuid,
  _role public.app_role
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT auth.uid() IS NOT NULL
    AND auth.uid() = _user_id
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = _user_id AND role = _role
    );
$$;

REVOKE ALL ON FUNCTION public.has_role(
  uuid, public.app_role
) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(
  uuid, public.app_role
) TO authenticated;

CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL
    CHECK (char_length(btrim(name)) BETWEEN 1 AND 100),
  email text NOT NULL
    CHECK (
      char_length(email) <= 255
      AND email ~*
      '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    ),
  company text CHECK (char_length(company) <= 120),
  project_type text CHECK (char_length(project_type) <= 120),
  message text NOT NULL
    CHECK (char_length(btrim(message)) BETWEEN 10 AND 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX contact_submissions_created_at_idx
ON public.contact_submissions (created_at DESC);

ALTER TABLE public.contact_submissions
ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.contact_submissions
FROM PUBLIC, anon, authenticated;

GRANT INSERT (name, email, company, project_type, message)
ON public.contact_submissions TO anon, authenticated;

GRANT SELECT ON public.contact_submissions
TO authenticated;

GRANT ALL ON public.contact_submissions
TO service_role;

CREATE POLICY "Visitors can submit contact enquiries"
ON public.contact_submissions
FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Only administrators can read enquiries"
ON public.contact_submissions
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

COMMIT;
