import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { CANONICAL_RELATIONSHIPS } from '@/lib/relationships/canonical-data';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain');
  const status = searchParams.get('status');

  try {
    let query = supabaseAdmin
      .from('product_relationships')
      .select('*')
      .order('created_at', { ascending: false });

    if (domain && domain !== 'ALL') {
      query = query.eq('relationship_domain', domain);
    }
    if (status && status !== 'ALL') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) {
      // Return canonical fallback if table not yet migrated
      let list = [...CANONICAL_RELATIONSHIPS];
      if (domain && domain !== 'ALL') list = list.filter(r => r.relationship_domain === domain);
      if (status && status !== 'ALL') list = list.filter(r => r.status === status);
      return NextResponse.json(list);
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(CANONICAL_RELATIONSHIPS);
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Validation
    if (!body.source_id || !body.target_id || !body.relationship_domain || !body.relationship_type) {
      return NextResponse.json(
        { error: 'source_id, target_id, relationship_domain, and relationship_type are required' },
        { status: 400 }
      );
    }

    // Engineering safeguard: Compatibility claims require verification
    if (body.relationship_domain === 'COMPATIBILITY') {
      if (body.status === 'published' && ['REVIEW_REQUIRED', 'NOT_COMPATIBLE'].includes(body.confidence)) {
        return NextResponse.json(
          { error: 'Cannot publish a compatibility relationship with confidence REVIEW_REQUIRED or NOT_COMPATIBLE' },
          { status: 400 }
        );
      }
    }

    const insertPayload = {
      source_id: body.source_id.trim(),
      source_type: body.source_type || 'machine',
      target_id: body.target_id.trim(),
      target_type: body.target_type || 'part',
      relationship_domain: body.relationship_domain,
      relationship_type: body.relationship_type,
      status: body.status || 'draft',
      confidence: body.confidence || 'VERIFIED',
      evidence: body.evidence?.trim() || null,
      source_url: body.source_url?.trim() || null,
      source_document: body.source_document?.trim() || null,
      verified_by: body.verified_by?.trim() || null,
      notes: body.notes?.trim() || null,
      active: body.active !== false,
      sort_order: typeof body.sort_order === 'number' ? body.sort_order : 0,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from('product_relationships')
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
