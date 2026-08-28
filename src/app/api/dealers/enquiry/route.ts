import { NextRequest, NextResponse } from 'next/server';
import { routeLead } from '@/lib/dealers/routing';
import { getDealerBySlug } from '@/lib/dealers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.customer_name || !body.customer_email || !body.customer_phone || !body.customer_postcode) {
      return NextResponse.json(
        { error: 'Missing required customer details (name, email, phone, postcode).' },
        { status: 400 }
      );
    }

    let dealerId = body.dealer_id;
    if (!dealerId && body.dealer_slug) {
      const dealer = await getDealerBySlug(body.dealer_slug);
      if (dealer) dealerId = dealer.id;
    }

    const result = await routeLead({
      dealer_id: dealerId,
      customer_name: body.customer_name,
      customer_company: body.customer_company,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      customer_postcode: body.customer_postcode,
      customer_town: body.customer_town,
      lead_type: body.lead_type || 'quote',
      product_slug: body.product_slug,
      product_name: body.product_name,
      product_category: body.product_category,
      industry_slug: body.industry_slug,
      application_notes: body.application_notes,
      message: body.message,
      source_url: body.source_url,
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /api/dealers/enquiry error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
