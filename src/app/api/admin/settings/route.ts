import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

// ── SETTINGS ─────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { data, error } = await supabaseAdmin.from('site_settings').select('*').order('key');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const body = await req.json();

  // Accept either a single { key, value } or an array of { key, value }
  const updates: Array<{ key: string; value: string }> = Array.isArray(body) ? body : [body];

  const results = await Promise.all(
    updates.map(({ key, value }) =>
      supabaseAdmin
        .from('site_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
        .select()
        .single()
    )
  );

  const errors = results.filter((r) => r.error);
  if (errors.length > 0) return NextResponse.json({ error: errors[0].error?.message }, { status: 500 });
  return NextResponse.json({ success: true, updated: updates.length });
}
