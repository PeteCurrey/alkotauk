import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('part_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: requests, error } = await query;

    if (error) {
      console.error('Error fetching admin part requests:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Also fetch status counts
    const { data: allStatuses } = await supabaseAdmin
      .from('part_requests')
      .select('status');

    const counts: Record<string, number> = {
      all: allStatuses?.length || 0,
      new: 0,
      identifying: 0,
      need_more_info: 0,
      identified: 0,
      quoted: 0,
      resolved: 0,
      closed: 0,
    };

    (allStatuses || []).forEach(r => {
      const s = r.status || 'new';
      counts[s] = (counts[s] || 0) + 1;
    });

    return NextResponse.json({
      requests: requests || [],
      counts,
    });
  } catch (err: any) {
    console.error('Admin part requests API exception:', err);
    return NextResponse.json({ error: err.message || 'Failed to load requests' }, { status: 500 });
  }
}
