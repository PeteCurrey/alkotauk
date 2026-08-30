import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { mergeStagedProduct } from '@/lib/ingestion/pipeline';

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
    const body = await req.json();
    const targetPartId = body.targetPartId;
    if (!targetPartId) {
      return NextResponse.json({ error: 'targetPartId is required for merging' }, { status: 400 });
    }

    const result = await mergeStagedProduct(id, targetPartId, 'admin');
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
