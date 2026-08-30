import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { approveStagedProduct, rejectStagedProduct } from '@/lib/ingestion/pipeline';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const action = body.action; // 'approve' | 'reject'
    const ids: string[] = body.ids || [];

    let successCount = 0;
    for (const id of ids) {
      try {
        if (action === 'approve') await approveStagedProduct(id, 'admin');
        else if (action === 'reject') await rejectStagedProduct(id, 'admin');
        successCount++;
      } catch (err) {
        console.error(`Bulk ${action} failed for staged ${id}:`, err);
      }
    }

    return NextResponse.json({ success: true, processed: successCount, total: ids.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
