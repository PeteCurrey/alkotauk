import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const { human_approved, overridden, override_value } = body;

    const { data, error } = await supabaseAdmin
      .from('ai_decision_log')
      .update({
        human_approved: human_approved ?? true,
        human_action_by: 'admin',
        human_action_at: new Date().toISOString(),
        overridden: overridden ?? false,
        override_value: override_value || null,
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ decision: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
