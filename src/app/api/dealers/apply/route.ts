import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.company_name || !body.contact_name || !body.email || !body.phone || !body.postcode) {
      return NextResponse.json(
        { error: 'Missing required dealer application fields.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('dealer_applications')
      .insert({
        company_name: body.company_name,
        trading_name: body.trading_name || null,
        contact_name: body.contact_name,
        job_title: body.job_title || null,
        email: body.email,
        phone: body.phone,
        website: body.website || null,
        address_line1: body.address_line1 || 'Pending',
        town: body.town || 'Pending',
        county: body.county || 'Pending',
        postcode: body.postcode,
        years_in_business: parseInt(body.years_in_business) || null,
        territory_interest: body.territory_interest || 'UK Regional',
        current_brands_represented: body.current_brands_represented || null,
        workshop_facilities: body.workshop_facilities !== false,
        mobile_service_capability: body.mobile_service_capability !== false,
        service_van_count: parseInt(body.service_van_count) || 1,
        additional_notes: body.additional_notes || null,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      console.warn('Dealer application DB insert error (table may be pending migration):', error);
    }

    // Send email alert to UK management
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Alkota UK Dealer Applications <applications@alkota.co.uk>',
            to: ['director@alkota.co.uk', 'sales@alkota.co.uk'],
            reply_to: body.email,
            subject: `[New Dealer Application] ${body.company_name} — ${body.town} (${body.postcode})`,
            html: `
              <h2>New Alkota UK Authorised Dealership Application</h2>
              <p><strong>Company:</strong> ${body.company_name} (${body.trading_name || 'N/A'})</p>
              <p><strong>Contact:</strong> ${body.contact_name} - ${body.job_title || ''}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              <p><strong>Phone:</strong> ${body.phone}</p>
              <p><strong>Location:</strong> ${body.town}, ${body.county} ${body.postcode}</p>
              <p><strong>Target Territory:</strong> ${body.territory_interest}</p>
              <p><strong>Mobile Vans:</strong> ${body.service_van_count}</p>
              <p><strong>Current Brands:</strong> ${body.current_brands_represented || 'None listed'}</p>
              <p><strong>Notes:</strong><br/>${body.additional_notes || 'None'}</p>
            `,
          }),
        });
      } catch (mailErr) {
        console.error('Error sending dealer application email:', mailErr);
      }
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('API /api/dealers/apply error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
