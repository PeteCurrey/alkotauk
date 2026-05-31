import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://xohftjaohhkwgxdnouoo.supabase.co';
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaGZ0amFvaGhrd2d4ZG5vdW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg2NzU5MywiZXhwIjoyMDkwNDQzNTkzfQ.65YGsr1ZbSgECaM0nUZ8-sJR7lezQPd7xWxwTDirZD4';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

/** Probe which columns exist in a table by trying a minimal SELECT */
async function getExistingColumns(table: string, candidates: string[]): Promise<string[]> {
  const existing: string[] = [];
  for (const col of candidates) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?select=${col}&limit=0`,
      {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
      }
    );
    if (res.ok) existing.push(col);
  }
  return existing;
}

/** Add a column by inserting a row with only that column set, if it fails we know it's missing */
async function addColumnViaInsert(
  table: string,
  columnName: string,
  sampleValue: unknown
): Promise<boolean> {
  // We can't run DDL via REST. Instead we detect and report.
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${columnName}&limit=0`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  });
  return res.ok;
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  // Check which enquiry columns actually exist
  const candidates = [
    'id', 'created_at', 'type', 'status', 'name', 'email',
    'company', 'phone', 'subject', 'message', 'metadata',
    'reference', 'notes', 'assigned_to',
  ];

  const existing = await getExistingColumns('enquiries', candidates);
  const missing = candidates.filter((c) => !existing.includes(c));

  return NextResponse.json({
    table: 'enquiries',
    existing,
    missing,
    healthy: missing.length === 0,
    fixSql: missing.length > 0
      ? `ALTER TABLE enquiries\n${missing
          .filter((c) => !['id', 'created_at'].includes(c))
          .map((c) => {
            const typeMap: Record<string, string> = {
              type: `ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'contact'`,
              status: `ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new'`,
              name: 'ADD COLUMN IF NOT EXISTS name text',
              email: 'ADD COLUMN IF NOT EXISTS email text',
              company: 'ADD COLUMN IF NOT EXISTS company text',
              phone: 'ADD COLUMN IF NOT EXISTS phone text',
              subject: 'ADD COLUMN IF NOT EXISTS subject text',
              message: 'ADD COLUMN IF NOT EXISTS message text',
              metadata: `ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'`,
              reference: 'ADD COLUMN IF NOT EXISTS reference text',
              notes: 'ADD COLUMN IF NOT EXISTS notes text',
              assigned_to: 'ADD COLUMN IF NOT EXISTS assigned_to text',
            };
            return `  ${typeMap[c] || `ADD COLUMN IF NOT EXISTS ${c} text`}`;
          })
          .join(',\n')};`
      : null,
  });
}
