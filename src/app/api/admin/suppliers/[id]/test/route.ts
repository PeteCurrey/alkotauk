import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { createSupplierConnector } from '@/lib/supplier-connectors/connector-factory';
import { Supplier } from '@/lib/types/parts';

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

    const connector = createSupplierConnector(supplier as Supplier);
    const testResult = await connector.testConnection();

    return NextResponse.json({
      testResult,
      isConfigured: connector.isConfigured(),
      missingRequirements: connector.getMissingRequirements(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
