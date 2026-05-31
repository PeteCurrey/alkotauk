-- ============================================================
-- 010_fix_enquiries.sql — Add missing columns to enquiries table
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/xohftjaohhkwgxdnouoo/sql
-- ============================================================

-- Add all columns that may be missing (safe — IF NOT EXISTS prevents errors)
ALTER TABLE enquiries
  ADD COLUMN IF NOT EXISTS type          text NOT NULL DEFAULT 'contact',
  ADD COLUMN IF NOT EXISTS status        text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS name          text,
  ADD COLUMN IF NOT EXISTS email         text,
  ADD COLUMN IF NOT EXISTS company       text,
  ADD COLUMN IF NOT EXISTS phone         text,
  ADD COLUMN IF NOT EXISTS subject       text,
  ADD COLUMN IF NOT EXISTS message       text,
  ADD COLUMN IF NOT EXISTS metadata      jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS reference     text,
  ADD COLUMN IF NOT EXISTS notes         text,
  ADD COLUMN IF NOT EXISTS assigned_to   text;

-- Add status CHECK constraint only if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'enquiries'::regclass
    AND conname = 'enquiries_status_check'
  ) THEN
    ALTER TABLE enquiries
      ADD CONSTRAINT enquiries_status_check
      CHECK (status IN ('new', 'read', 'responded', 'closed'));
  END IF;
END
$$;

-- Ensure RLS is enabled
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Verify the fix
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'enquiries'
ORDER BY ordinal_position;
