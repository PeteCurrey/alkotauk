import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { createImportBatch, executeImportBatch } from '@/lib/ingestion/pipeline';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const { data: supplier, error } = await supabaseAdmin
      .from('suppliers')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (error || !supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const rawPayload = body.rawPayload;
    const triggerMethod = body.triggerMethod || (rawPayload ? 'file_upload' : 'manual');

    // 1. Create Batch
    const batch = await createImportBatch(supplier.id, triggerMethod, 'admin');

    // 2. Execute Ingestion Pipeline
    const result = await executeImportBatch(batch.id, rawPayload);

    return NextResponse.json({
      success: true,
      batch: result.batch,
      stagedCount: result.stagedCount,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
