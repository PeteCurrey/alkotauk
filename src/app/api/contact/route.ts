import { NextResponse } from 'next/server';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://xohftjaohhkwgxdnouoo.supabase.co';
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaGZ0amFvaGhrd2d4ZG5vdW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg2NzU5MywiZXhwIjoyMDkwNDQzNTkzfQ.65YGsr1ZbSgECaM0nUZ8-sJR7lezQPd7xWxwTDirZD4';

/** Insert a row into the enquiries table using the REST API directly.
 *  Tries the full schema first; if Supabase returns PGRST204 (unknown column)
 *  it strips the offending columns and retries with a minimal safe payload. */
async function saveEnquiry(payload: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  const url = `${SUPABASE_URL}/rest/v1/enquiries`;

  const headers = {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  };

  // ── Attempt 1: full payload ────────────────────────────────────────────────
  const res1 = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (res1.ok || res1.status === 201) return { ok: true };

  const err1 = await res1.json().catch(() => ({}));

  // PGRST204 = column not found in schema cache → strip unknown fields and retry
  if (err1?.code === 'PGRST204' || res1.status === 400) {
    console.warn('contact/route: schema mismatch, retrying with minimal payload:', err1?.message);

    // Minimal payload — only id + created_at are guaranteed; these are universal
    const minimal: Record<string, unknown> = {};
    const safeKeys = ['id', 'created_at'];
    for (const k of safeKeys) {
      if (payload[k] !== undefined) minimal[k] = payload[k];
    }

    // Try each extra column individually to find what exists
    const optionalKeys = ['type', 'status', 'name', 'email', 'company', 'phone', 'subject', 'message', 'reference', 'notes', 'assigned_to', 'metadata'];
    for (const key of optionalKeys) {
      if (payload[key] === undefined) continue;
      const test = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...minimal, [key]: payload[key] }),
      });
      if (test.ok || test.status === 201 || test.status === 204) {
        minimal[key] = payload[key];
      } else {
        const testErr = await test.json().catch(() => ({}));
        if (testErr?.code !== 'PGRST204') {
          // Not a column error — something else, include anyway for next attempt
          minimal[key] = payload[key];
        }
        // PGRST204 = column genuinely missing — skip it
      }
    }

    // Final insert with only confirmed-safe columns
    const res2 = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(minimal),
    });

    if (res2.ok || res2.status === 201 || res2.status === 204) return { ok: true };

    const err2 = await res2.json().catch(() => ({}));
    return { ok: false, error: err2?.message || `HTTP ${res2.status}` };
  }

  return { ok: false, error: err1?.message || `HTTP ${res1.status}` };
}

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

    const apiKey = process.env.RESEND_API_KEY;
    const isQuote = enquiry === 'quote' || source === 'product_quote' || source === 'request_pricing' || !!(productName || product_name || model);
    const itemReference = productName || product_name || model || enquiry || '';

    const subjectLine =
      subject || (isQuote ? `Quotation Request — ${itemReference || 'Alkota Industrial Machine'}` : (enquiry ? `New Enquiry — ${enquiry}` : 'New Website Enquiry'));
    const origin = source === 'request_pricing' ? 'Product Detail (Request Pricing)' : (source === 'maintenance_splash' ? 'Maintenance Screen' : 'Website Form');

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: #1a1a1a; padding: 24px; margin-bottom: 24px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
            ALKOTA UK — ${isQuote ? 'MACHINE QUOTATION REQUEST' : 'NEW ENQUIRY'}
          </h1>
          <p style="color: #f97316; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
            Received via ${origin}
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
            ${quantity ? `<tr><td style="padding: 8px 0; color: #999; font-size: 12px;">Quantity</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${quantity}</td></tr>` : ''}
          </table>
        </div>

        ${message ? `
        <div style="background: #ffffff; padding: 24px; margin-bottom: 16px;">
          <h2 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #666;">Application Scope / Notes</h2>
          <p style="margin: 0; color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        ` : ''}

        <div style="text-align: center; padding: 16px; color: #999; font-size: 11px;">
          <p style="margin: 0;">alkota.co.uk — Enquiry & Quotation Management</p>
        </div>
      </div>
    `;

    // ── 1. Send email if API key configured ─────────────────────────────────
    if (apiKey) {
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
            subject: subjectLine,
            html: htmlBody,
          }),
        });
      } catch (e) {
        console.error('Email notification failed:', e);
      }
    }

    // ── 2. Save to database (schema-adaptive) ────────────────────────────────
    const dbResult = await saveEnquiry({
      type: isQuote ? 'quote' : (source || enquiry || 'contact'),
      name,
      email,
      company: company || '',
      phone: phone || '',
      subject: subjectLine,
      message: message || '',
      status: 'new',
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
    });

    return NextResponse.json(
      { success: true, message: 'Submission received successfully', dbSaved: dbResult.ok },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
