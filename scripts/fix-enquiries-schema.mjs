// Run with: node scripts/fix-enquiries-schema.mjs
// Adds missing columns to the enquiries table via Supabase service role

const SUPABASE_URL = 'https://xohftjaohhkwgxdnouoo.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaGZ0amFvaGhrd2d4ZG5vdW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg2NzU5MywiZXhwIjoyMDkwNDQzNTkzfQ.65YGsr1ZbSgECaM0nUZ8-sJR7lezQPd7xWxwTDirZD4';

const sql = `
ALTER TABLE enquiries
  ADD COLUMN IF NOT EXISTS type         text NOT NULL DEFAULT 'contact',
  ADD COLUMN IF NOT EXISTS status       text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS name         text,
  ADD COLUMN IF NOT EXISTS email        text,
  ADD COLUMN IF NOT EXISTS company      text,
  ADD COLUMN IF NOT EXISTS phone        text,
  ADD COLUMN IF NOT EXISTS subject      text,
  ADD COLUMN IF NOT EXISTS message      text,
  ADD COLUMN IF NOT EXISTS metadata     jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS reference    text,
  ADD COLUMN IF NOT EXISTS notes        text,
  ADD COLUMN IF NOT EXISTS assigned_to  text;
`;

const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
  method: 'GET',
  headers: {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
  }
});
console.log('Supabase reachable:', res.status);

// Use pg direct connection via Supabase DB API
const dbRes = await fetch(`${SUPABASE_URL}/pg/query`, {
  method: 'POST',
  headers: {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: sql }),
});

const body = await dbRes.text();
console.log('DB response:', dbRes.status, body);
