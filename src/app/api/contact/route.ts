import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, phone, message, enquiry, subject, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Build a clean, readable email body
    const subjectLine = subject || (enquiry ? `New Enquiry — ${enquiry}` : 'New Contact Form Enquiry');
    const origin = source === 'maintenance_splash' ? 'Maintenance Screen' : 'Contact Page';

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: #1a1a1a; padding: 24px; margin-bottom: 24px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
            ALKOTA UK — NEW ENQUIRY
          </h1>
          <p style="color: #f97316; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
            Received via ${origin}
          </p>
        </div>

        <div style="background: #ffffff; padding: 24px; margin-bottom: 16px; border-left: 4px solid #f97316;">
          <h2 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #666;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; font-size: 12px; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #999; font-size: 12px;">Email</td><td style="padding: 8px 0; font-weight: bold;"><a href="mailto:${email}" style="color: #f97316;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #999; font-size: 12px;">Company</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${company}</td></tr>` : ''}
            ${phone ? `<tr><td style="padding: 8px 0; color: #999; font-size: 12px;">Phone</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;"><a href="tel:${phone}" style="color: #f97316;">${phone}</a></td></tr>` : ''}
            ${enquiry ? `<tr><td style="padding: 8px 0; color: #999; font-size: 12px;">Enquiry Type</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${enquiry}</td></tr>` : ''}
          </table>
        </div>

        ${message ? `
        <div style="background: #ffffff; padding: 24px; margin-bottom: 16px;">
          <h2 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #666;">Message</h2>
          <p style="margin: 0; color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        ` : ''}

        <div style="text-align: center; padding: 16px; color: #999; font-size: 11px;">
          <p style="margin: 0;">alkota.co.uk — Enquiry Management System</p>
        </div>
      </div>
    `;

    // Send email via Resend
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Alkota UK Enquiries <enquiries@alkota.co.uk>',
        to: ['sales@alkota.co.uk'],
        reply_to: email,
        subject: subjectLine,
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      const resendError = await resendRes.text();
      console.error('Resend error:', resendError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Also save to Supabase if available (non-blocking — don't fail if Supabase is down)
    try {
      const { supabaseAdmin } = await import('@/lib/supabase/server');
      await supabaseAdmin
        .from('enquiries')
        .insert({
          type: source || enquiry || 'contact',
          name,
          email,
          company: company || '',
          phone: phone || '',
          message: message || '',
          status: 'new',
          metadata: { source: source || 'contact_page', enquiry_type: enquiry }
        });
    } catch (dbErr) {
      console.warn('Supabase save skipped (non-fatal):', dbErr);
    }

    return NextResponse.json({ success: true, message: 'Enquiry sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
