import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { generateReference } from '@/lib/auth';
import { getProducts } from '@/lib/products';
import { revalidateMachineEnquiry, normaliseRequirements, buildCanonicalEnquiryData } from '@/lib/machine-enquiries/service';
import { MachineEnquirySource, MachineEnquiryMetadata } from '@/lib/machine-enquiries/types';

export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, email, company, phone, message, enquiry, subject, source,
      productId, product_id, productName, product_name, model, category, quantity,
      timeline, budgetRange, postcode, sitePower, site_power, siteWater, site_water,
      machines: rawMachines, models: rawModels, reqs, requirements: rawRequirements,
      claimedMatchStatus
    } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and corporate email are required' }, { status: 400 });
    }

    // ── 1. Determine Machine Source & Collect Machine Identifiers ────────────
    const machineIds: string[] = [];

    if (Array.isArray(rawMachines)) {
      machineIds.push(...rawMachines);
    } else if (typeof rawMachines === 'string' && rawMachines.trim()) {
      machineIds.push(...rawMachines.split(',').map(s => s.trim()));
    }

    if (Array.isArray(rawModels)) {
      machineIds.push(...rawModels);
    } else if (typeof rawModels === 'string' && rawModels.trim()) {
      machineIds.push(...rawModels.split(',').map(s => s.trim()));
    }

    if (model) machineIds.push(String(model).trim());
    if (productId || product_id) machineIds.push(String(productId || product_id).trim());
    if (productName || product_name) machineIds.push(String(productName || product_name).trim());

    // Deduplicate
    const uniqueIdentifiers = Array.from(new Set(machineIds.filter(Boolean)));

    // Determine normalized source
    let machineSource: MachineEnquirySource = 'general';
    if (source === 'machine_selector' || enquiry === 'selector' || enquiry === 'help-me-choose') {
      machineSource = 'machine_selector';
    } else if (source === 'machine_comparison' || enquiry === 'compare' || enquiry === 'comparison') {
      machineSource = 'machine_comparison';
    } else if (source === 'request_pricing') {
      machineSource = 'request_pricing';
    } else if (source === 'service') {
      machineSource = 'service';
    } else if (uniqueIdentifiers.length > 0) {
      machineSource = 'direct_machine';
    }

    // Parse requirements if provided
    const structuredReqs = normaliseRequirements(rawRequirements || reqs);
    const reqsSummary: string[] = Array.isArray(body.requirements_summary)
      ? body.requirements_summary
      : typeof reqs === 'string' && reqs.includes('|')
        ? reqs.split('|').map((s: string) => s.trim()).filter(Boolean)
        : [];

    // ── 2. Authoritative Server Revalidation ─────────────────────────────────
    let revalidationData: ReturnType<typeof revalidateMachineEnquiry> | null = null;
    let equipmentLabel = '';

    if (uniqueIdentifiers.length > 0) {
      const allProducts = await getProducts();
      revalidationData = revalidateMachineEnquiry({
        source: machineSource,
        machineIdentifiers: uniqueIdentifiers,
        rawRequirements: structuredReqs,
        claimedMatchStatus,
      }, allProducts);

      if (revalidationData.enquiryMachines.length > 0) {
        equipmentLabel = revalidationData.enquiryMachines
          .map(m => m.model_code || m.name)
          .join(', ');
      }
    }

    if (!equipmentLabel) {
      equipmentLabel = uniqueIdentifiers.join(', ') || productName || product_name || model || '';
    }

    const isQuote = machineSource !== 'general' && machineSource !== 'service' || enquiry === 'quote' || !!equipmentLabel;
    const leadType = isQuote ? 'quote' : (enquiry === 'demo' ? 'demo' : 'contact');
    const reference = generateReference(leadType);

    const subjectLine = subject || (
      isQuote 
        ? `Quotation & Technical Verification — ${equipmentLabel || 'Alkota Industrial Fleet'}` 
        : (enquiry ? `Enquiry: ${enquiry}` : 'New Alkota UK Website Enquiry')
    );

    const originLabel = 
      machineSource === 'machine_selector' ? 'Help Me Choose Selector' :
      machineSource === 'machine_comparison' ? 'Fleet Comparison Matrix' :
      machineSource === 'request_pricing' ? 'Product Detail (Pricing Request)' :
      machineSource === 'direct_machine' ? 'Direct Machine Specification' :
      'Website Contact Dispatch';

    // ── 3. Build Rich Metadata ───────────────────────────────────────────────
    const metadataPayload: Record<string, any> = {
      source: source || machineSource || 'contact_page',
      enquiry_type: enquiry || (isQuote ? 'quote' : 'general'),
      lead_type: leadType,
      product_name: equipmentLabel || null,
      category: category || (revalidationData?.enquiryMachines[0]?.category ?? null),
      quantity: quantity || 1,
      timeline: timeline || null,
      budget_range: budgetRange || null,
      postcode: postcode || null,
      site_power: sitePower || site_power || null,
      site_water: siteWater || site_water || null,
    };

    if (revalidationData) {
      const machineMetadata: MachineEnquiryMetadata = {
        machine_source: machineSource,
        machines: revalidationData.enquiryMachines,
        revalidation_result: revalidationData.revalidationResult,
        structured_requirements: structuredReqs,
        requirements_summary: reqsSummary.length > 0 ? reqsSummary : undefined,
        site_power: sitePower || site_power || null,
        site_water: siteWater || site_water || null,
        timeline: timeline || null,
        budget_range: budgetRange || null,
        postcode: postcode || null,
      };

      Object.assign(metadataPayload, machineMetadata);
      metadataPayload.confirmation_items = revalidationData.revalidationResult.confirmation_items;
    }

    // ── 4. Build Canonical Data & Save into Supabase ─────────────────────────
    let canonicalEnquiryCols: Record<string, any> = {};
    let canonicalMachineRows: any[] = [];

    if (revalidationData) {
      const canonicalData = buildCanonicalEnquiryData({
        reference,
        source: machineSource,
        context: machineSource === 'machine_selector' ? 'MACHINE_SELECTION' :
                 machineSource === 'machine_comparison' ? 'MACHINE_COMPARISON' :
                 machineSource === 'direct_machine' || machineSource === 'request_pricing' ? 'DIRECT_MACHINE' : 'GENERAL_ENQUIRY',
        customer: {
          name,
          email,
          phone,
          company,
          postcode: postcode || null,
        },
        subject: subjectLine,
        message,
        siteReadiness: {
          site_power: sitePower || site_power || null,
          site_water: siteWater || site_water || null,
          timeline: timeline || null,
          budget_range: budgetRange || null,
        },
        rawRequirements: structuredReqs,
        revalidation: revalidationData,
      });

      canonicalEnquiryCols = canonicalData.enquiryRecord;
      canonicalMachineRows = canonicalData.machineRecords;
    }

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
      postcode: (postcode || '').trim() || null,
      site_power: sitePower || site_power || null,
      site_water: siteWater || site_water || null,
      timeline: timeline || null,
      budget_range: budgetRange || null,
      metadata: metadataPayload,
      ...canonicalEnquiryCols,
    };

    const { data: savedEnquiry, error: dbError } = await supabaseAdmin
      .from('enquiries')
      .insert(payload)
      .select()
      .single();

    if (dbError) {
      console.error('Failed to save enquiry to Supabase, attempting fallback:', dbError);
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
    } else if (savedEnquiry?.id && canonicalMachineRows.length > 0) {
      // Save normalised enquiry_machines relationship records
      const childRows = canonicalMachineRows.map(m => ({
        ...m,
        enquiry_id: savedEnquiry.id,
      }));
      const { error: machinesErr } = await supabaseAdmin.from('enquiry_machines').insert(childRows);
      if (machinesErr) {
        console.warn('Note: Could not insert enquiry_machines child records (pending migration 028):', machinesErr.message);
      }
    }

    // ── 5. Send Email Notifications (Resend API) ─────────────────────────────
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      // Build machine breakdown table HTML
      let machinesHtml = '';
      if (revalidationData && revalidationData.enquiryMachines.length > 0) {
        machinesHtml = `
          <div style="background: #ffffff; padding: 20px; margin-bottom: 16px; border: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #111827;">
              Requested Equipment (${revalidationData.enquiryMachines.length})
            </h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead>
                <tr style="background: #f3f4f6; text-align: left; border-bottom: 2px solid #e5e7eb;">
                  <th style="padding: 8px;">Model</th>
                  <th style="padding: 8px;">Pressure</th>
                  <th style="padding: 8px;">Flow</th>
                  <th style="padding: 8px;">Power / Fuel</th>
                  <th style="padding: 8px;">Server Match</th>
                </tr>
              </thead>
              <tbody>
                ${revalidationData.enquiryMachines.map(m => `
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 8px; font-weight: bold; color: #f97316;">${m.model_code}</td>
                    <td style="padding: 8px;">${m.pressure_bar ? `${m.pressure_bar} BAR` : 'Not specified'}</td>
                    <td style="padding: 8px;">${m.flow_rate_lpm ? `${m.flow_rate_lpm} L/min` : 'Not specified'}</td>
                    <td style="padding: 8px;">${m.power_source || '—'}${m.heating_fuel ? ` (${m.heating_fuel})` : ''}</td>
                    <td style="padding: 8px;">
                      <span style="font-weight: bold; color: ${m.server_match_status === 'STRONG_MATCH' ? '#16a34a' : m.server_match_status === 'POSSIBLE_MATCH' ? '#d97706' : '#dc2626'};">
                        ${m.server_match_status || 'VERIFIED'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      // Build confirmation checklist HTML
      let checklistHtml = '';
      if (revalidationData && revalidationData.revalidationResult.confirmation_items.length > 0) {
        checklistHtml = `
          <div style="background: #fffbeb; padding: 20px; margin-bottom: 16px; border-left: 4px solid #f59e0b;">
            <h2 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #b45309;">
              Sales Engineer Verification Checklist
            </h2>
            <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 12px; line-height: 1.6;">
              ${revalidationData.revalidationResult.confirmation_items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      // Build customer requirements HTML
      let reqsHtml = '';
      if (reqsSummary.length > 0) {
        reqsHtml = `
          <div style="background: #f9fafb; padding: 16px; margin-bottom: 16px; border-left: 4px solid #3b82f6;">
            <h2 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #1e40af;">
              Stated Operational Requirements
            </h2>
            <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 12px; line-height: 1.5;">
              ${reqsSummary.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      const internalHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: #111827; padding: 24px; margin-bottom: 20px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
              ALKOTA UK — ${isQuote ? 'MACHINE CONSULTATION & QUOTE' : 'NEW ENQUIRY'}
            </h1>
            <p style="color: #f97316; margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
              Source: ${originLabel} [Ref: ${reference}]
            </p>
          </div>

          <div style="background: #ffffff; padding: 20px; margin-bottom: 16px; border-left: 4px solid #f97316;">
            <h2 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280;">
              Customer Contact Details
            </h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr><td style="padding: 6px 0; color: #6b7280; width: 140px;">Name</td><td style="padding: 6px 0; font-weight: bold; color: #111827;">${name}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b7280;">Corporate Email</td><td style="padding: 6px 0; font-weight: bold;"><a href="mailto:${email}" style="color: #f97316;">${email}</a></td></tr>
              ${company ? `<tr><td style="padding: 6px 0; color: #6b7280;">Company</td><td style="padding: 6px 0; font-weight: bold; color: #111827;">${company}</td></tr>` : ''}
              ${phone ? `<tr><td style="padding: 6px 0; color: #6b7280;">Telephone</td><td style="padding: 6px 0; font-weight: bold; color: #111827;"><a href="tel:${phone}" style="color: #f97316;">${phone}</a></td></tr>` : ''}
              ${postcode ? `<tr><td style="padding: 6px 0; color: #6b7280;">Site Postcode</td><td style="padding: 6px 0; font-weight: bold; color: #111827;">${postcode}</td></tr>` : ''}
              ${sitePower || site_power ? `<tr><td style="padding: 6px 0; color: #6b7280;">Available Site Power</td><td style="padding: 6px 0; font-weight: bold; color: #111827;">${sitePower || site_power}</td></tr>` : ''}
              ${siteWater || site_water ? `<tr><td style="padding: 6px 0; color: #6b7280;">Site Water Supply</td><td style="padding: 6px 0; font-weight: bold; color: #111827;">${siteWater || site_water}</td></tr>` : ''}
              ${timeline ? `<tr><td style="padding: 6px 0; color: #6b7280;">Required Timeline</td><td style="padding: 6px 0; font-weight: bold; color: #111827;">${timeline}</td></tr>` : ''}
            </table>
          </div>

          ${machinesHtml}
          ${reqsHtml}
          ${checklistHtml}

          ${message ? `
          <div style="background: #ffffff; padding: 20px; margin-bottom: 16px; border: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #6b7280;">
              Customer Application Notes
            </h2>
            <p style="margin: 0; color: #111827; line-height: 1.6; font-size: 13px; white-space: pre-wrap;">${message}</p>
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
            html: internalHtml,
          }),
        });

        // Customer Auto-Acknowledgement
        const customerAckHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px; border: 1px solid #e5e7eb;">
            <div style="background: #111827; padding: 24px; text-align: center; margin-bottom: 24px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 900; letter-spacing: 2px;">ALKOTA UK</h1>
              <p style="color: #f97316; margin: 6px 0 0 0; font-size: 12px; font-weight: bold; letter-spacing: 1px;">HEAVY-DUTY INDUSTRIAL CLEANING SYSTEMS</p>
            </div>

            <h2 style="color: #111827; font-size: 18px; margin-top: 0;">Enquiry Received — Reference: ${reference}</h2>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Hello ${name},
            </p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Thank you for contacting Alkota UK regarding your industrial washdown requirements. Your enquiry has been received and allocated reference <strong style="color: #111827;">${reference}</strong>.
            </p>

            ${equipmentLabel ? `
              <div style="background: #f9fafb; border-left: 4px solid #f97316; padding: 14px 18px; margin: 20px 0;">
                <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: bold; letter-spacing: 1px;">Selected Equipment</p>
                <p style="margin: 4px 0 0 0; font-size: 15px; color: #111827; font-weight: bold;">${equipmentLabel}</p>
              </div>
            ` : ''}

            <h3 style="color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 24px;">What Happens Next?</h3>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Our dedicated UK application engineering team reviews every technical enquiry to confirm power supply compatibility, pump ratings, and water throughput.
            </p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              A senior application specialist will follow up with your quotation and technical verification within <strong>2 business hours</strong>.
            </p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">Alkota UK Engineering & Logistics Centre</p>
              <p style="margin: 4px 0 0 0;">Direct Tel: +44 (0) 121 456 7890 | Email: sales@alkota.co.uk</p>
            </div>
          </div>
        `;

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Alkota UK <sales@alkota.co.uk>',
            to: [email],
            subject: `[${reference}] Alkota UK Enquiry Confirmation — ${equipmentLabel || 'Industrial Fleet'}`,
            html: customerAckHtml,
          }),
        });
      } catch (e) {
        console.error('Email sending error:', e);
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Enquiry received and verified successfully', 
        reference,
        revalidation: revalidationData?.revalidationResult || null
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
