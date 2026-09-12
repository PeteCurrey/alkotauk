import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const allowedFields = [
      'status',
      'assigned_to',
      'internal_notes',
      'requested_parts',
      'notes',
    ];

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    const { data, error } = await supabaseAdmin
      .from('part_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating part request:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, request: data });
  } catch (err: any) {
    console.error('Update part request exception:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from('part_requests')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deleted: id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
