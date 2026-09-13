import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

const VALID_STATUSES = new Set([
  'new',
  'acknowledged',
  'contacted',
  'qualifying',
  'quoting',
  'won',
  'lost',
  'closed',
  'read',
  'responded',
  'in-progress',
  'archived',
]);

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('enquiries')
    .select('*, enquiry_machines(*)')
    .eq('id', id)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const allowed: Record<string, unknown> = {};

  if (body.status !== undefined) {
    if (typeof body.status !== 'string' || !VALID_STATUSES.has(body.status.toLowerCase())) {
      return NextResponse.json(
        {
          error: `Invalid enquiry status: "${body.status}". Must be one of: ${Array.from(VALID_STATUSES).join(', ')}`,
        },
        { status: 400 }
      );
    }
    allowed.status = body.status.toLowerCase();
  }

  if (body.notes !== undefined) allowed.notes = body.notes;
  if (body.admin_notes !== undefined) allowed.admin_notes = body.admin_notes;
  if (body.assigned_to !== undefined) allowed.assigned_to = body.assigned_to;
  if (body.follow_up_date !== undefined) allowed.follow_up_date = body.follow_up_date;
  allowed.updated_at = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from('enquiries')
    .update(allowed)
    .eq('id', id)
    .select('*, enquiry_machines(*)')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
