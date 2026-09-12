import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { ingestSupplierCatalogue } from '@/lib/parts/supplier-ingestion';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { data: batches, error } = await supabaseAdmin
      .from('import_batches')
      .select('*, supplier:suppliers(name, slug, code)')
      .order('started_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ batches });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { supplier_slug, items, source_version, source_document, default_margin_pct } = body;

    if (!supplier_slug || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'supplier_slug and items array are required.' }, { status: 400 });
    }

    const result = await ingestSupplierCatalogue(items, {
      supplierSlug: supplier_slug,
      triggerMethod: 'manual',
      triggeredBy: 'admin',
      sourceVersion: source_version,
      sourceDocument: source_document,
      defaultMarginPct: default_margin_pct,
    });

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
