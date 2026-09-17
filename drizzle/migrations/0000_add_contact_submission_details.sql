ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS project_type TEXT;