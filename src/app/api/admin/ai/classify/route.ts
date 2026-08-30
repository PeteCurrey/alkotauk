import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { classifyProduct, recogniseBrand, extractAttributes } from '@/lib/ai/catalogue-intelligence';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, brand, stagedId } = body;

    const classification = await classifyProduct(title, description, brand, stagedId || 'manual');
    const brandMatch = await recogniseBrand(title, brand, stagedId || 'manual');
    const attributes = await extractAttributes(title, description, stagedId || 'manual');

    // Update staged product if stagedId was provided
    if (stagedId) {
      await supabaseAdmin
        .from('staged_supplier_products')
        .update({
          ai_category: classification.categorySlug,
          ai_confidence: classification.confidence,
          ai_reasoning: classification.reasoning,
          ai_model: classification.model,
          ai_run_at: new Date().toISOString(),
          suggested_category: classification.categorySlug,
          suggested_brand: brandMatch.brandName || null,
        })
        .eq('id', stagedId);
    }

    return NextResponse.json({
      classification,
      brandMatch,
      attributes,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
