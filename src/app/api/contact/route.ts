import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { generateReference } from '@/lib/auth';

export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, email, company, phone, message, enquiry, subject, source,
      productId, product_id, productName, product_name, model, category, quantity,
      timeline, budgetRange
    } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const isQuote = enquiry === 'quote' || source === 'product_quote' || source === 'request_pricing' || !!(productName || product_name || model);
    const itemReference = productName || product_name || model || enquiry || '';

    const subjectLine =
      subject || (isQuote ? `Quotation Request — ${itemReference || 'Alkota Industrial Machine'}` : (enquiry ? `Enquiry: ${enquiry}` : 'New Website Enquiry'));
    const origin = source === 'request_pricing' ? 'Product Detail (Request Pricing)' : (source === 'maintenance_splash' ? 'Maintenance Screen' : 'Website Form');

    // ── 1. Save directly into Supabase enquiries table ───────────────────────
    const leadType = isQuote ? 'quote' : (enquiry === 'demo' ? 'demo' : 'contact');
    const reference = generateReference(leadType);

    const payload = {
      type: leadType,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: (company || '').trim(),
      phone: (phone || '').trim(),
      subject: subjectLine,
      message: (message || '').trim(),
      status: 'new',
      reference,
      metadata: { 
        source: source || 'contact_page', 
        enquiry_type: enquiry || null,
        product_id: productId || product_id || null,
        product_name: productName || product_name || model || null,
        category: category || null,
        quantity: quantity || 1,
        timeline: timeline || null,
        budget_range: budgetRange || null,
      },
    };

    const { data: savedEnquiry, error: dbError } = await supabaseAdmin
      .from('enquiries')
      .insert(payload)
      .select()
      .single();

    if (dbError) {
      console.error('Failed to save enquiry to Supabase:', dbError);
      // If table constraint or column issue, attempt minimal insert
      const fallbackPayload = {
        name: payload.name,
        email: payload.email,
        company: payload.company,
        phone: payload.phone,
        subject: payload.subject,
        message: payload.message,
        type: payload.type,
        status: 'new',
      };
      const { error: fallbackError } = await supabaseAdmin.from('enquiries').insert(fallbackPayload);
      if (fallbackError) {
        console.error('Fallback enquiry insert error:', fallbackError);
        return NextResponse.json({ error: 'Database saving failed: ' + fallbackError.message }, { status: 500 });
      }
    }

    // ── 2. Send email notification if RESEND_API_KEY is configured ───────────
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: #1a1a1a; padding: 24px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
              ALKOTA UK — ${isQuote ? 'MACHINE QUOTATION REQUEST' : 'NEW ENQUIRY'}
            </h1>
            <p style="color: #f97316; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
              Received via ${origin} [Ref: ${reference}]
            </p>
          </div>

          <div style="background: #ffffff; padding: 24px; margin-bottom: 16px; border-left: 4px solid #f97316;">
            <h2 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #666;">Customer Contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #999; font-size: 12px; width: 130px;">Name</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #999; font-size: 12px;">Email</td><td style="padding: 8px 0; font-weight: bold;"><a href="mailto:${email}" style="color: #f97316;">${email}</a></td></tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #999; font-size: 12px;">Company</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${company}</td></tr>` : ''}
              ${phone ? `<tr><td style="padding: 8px 0; color: #999; font-size: 12px;">Phone</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;"><a href="tel:${phone}" style="color: #f97316;">${phone}</a></td></tr>` : ''}
              ${itemReference ? `<tr><td style="padding: 8px 0; color: #999; font-size: 12px;">Equipment Requested</td><td style="padding: 8px 0; font-weight: bold; color: #f97316;">${itemReference}</td></tr>` : ''}
            </table>
          </div>

          ${message ? `
          <div style="background: #ffffff; padding: 24px; margin-bottom: 16px;">
            <h2 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #666;">Message</h2>
            <p style="margin: 0; color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
        </div>
      `;

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Alkota UK <enquiries@alkota.co.uk>',
            to: ['sales@alkota.co.uk'],
            reply_to: email,
            subject: `[${reference}] ${subjectLine}`,
            html: htmlBody,
          }),
        });
      } catch (e) {
        console.error('Email sending error:', e);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Submission received successfully', reference },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
