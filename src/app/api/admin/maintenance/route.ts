import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://xohftjaohhkwgxdnouoo.supabase.co';
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaGZ0amFvaGhrd2d4ZG5vdW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg2NzU5MywiZXhwIjoyMDkwNDQzNTkzfQ.65YGsr1ZbSgECaM0nUZ8-sJR7lezQPd7xWxwTDirZD4';

async function requireAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

function getClient() {
  return createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// GET — returns current maintenance_mode value
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised — please log in again' }, { status: 401 });
  }
  const supabase = getClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'maintenance_mode')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ maintenance_mode: data?.value ?? 'false' });
}

// POST — toggles or explicitly sets maintenance_mode
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised — please log in again' }, { status: 401 });
  }

  let newValue: string;
  try {
    const body = await req.json();
    // Accept explicit { value: 'true'|'false' } OR derive from toggle
    if (body.value === 'true' || body.value === true) {
      newValue = 'true';
    } else if (body.value === 'false' || body.value === false) {
      newValue = 'false';
    } else {
      // If no value provided, fetch current and flip
      const supabase = getClient();
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'maintenance_mode')
        .maybeSingle();
      newValue = data?.value === 'true' ? 'false' : 'true';
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const supabase = getClient();
  const { error } = await supabase
    .from('site_settings')
    .upsert(
      { key: 'maintenance_mode', value: newValue, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, maintenance_mode: newValue });
}
