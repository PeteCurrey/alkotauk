import { CanonicalEnquiryRecord, CanonicalEnquiryMachineRecord } from '@/lib/enquiries/schema';

interface SendNotificationParams {
  enquiry: CanonicalEnquiryRecord;
  machines?: CanonicalEnquiryMachineRecord[];
  siteUrl?: string;
}

export function buildEnquiryEmailHtml({
  enquiry,
  machines = [],
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alkota.co.uk',
}: SendNotificationParams): string {
  const adminUrl = `${siteUrl}/admin/enquiries/${enquiry.id || ''}`;
  const dateStr = enquiry.created_at
    ? new Date(enquiry.created_at).toLocaleString('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : new Date().toLocaleString('en-GB');

  const machinesHtml =
    machines.length > 0
      ? `
      <div style="margin-top: 24px; border: 1px solid #e5e5e5; padding: 16px; background-color: #fafafa;">
        <h3 style="margin: 0 0 12px 0; font-size: 13px; font-family: monospace; text-transform: uppercase; color: #111; letter-spacing: 0.1em;">
          Authoritative Equipment Snapshot (${machines.length})
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd; text-align: left; color: #666; font-size: 11px; font-family: monospace;">
              <th style="padding: 6px 8px;">Model</th>
              <th style="padding: 6px 8px;">Category</th>
              <th style="padding: 6px 8px;">Pressure</th>
              <th style="padding: 6px 8px;">Flow Rate</th>
              <th style="padding: 6px 8px;">Match Status</th>
            </tr>
          </thead>
          <tbody>
            ${machines
              .map(
                m => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px; font-weight: bold; color: #FF6900; font-family: monospace;">${m.model_code_snapshot}</td>
                <td style="padding: 8px; color: #444;">${m.category_snapshot}</td>
                <td style="padding: 8px; font-family: monospace;">${
                  (m.specs_snapshot as any)?.pressure_bar ? `${(m.specs_snapshot as any).pressure_bar} BAR` : '—'
                }</td>
                <td style="padding: 8px; font-family: monospace;">${
                  (m.specs_snapshot as any)?.flow_rate_lpm ? `${(m.specs_snapshot as any).flow_rate_lpm} LPM` : '—'
                }</td>
                <td style="padding: 8px; font-family: monospace; font-size: 11px; font-weight: bold; color: ${
                  m.selection_status === 'STRONG_MATCH'
                    ? '#16a34a'
                    : m.selection_status === 'POSSIBLE_MATCH'
                    ? '#d97706'
                    : '#555'
                };">${m.selection_status || 'DIRECT'}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `
      : '';

  const requirementsHtml =
    enquiry.req_application || enquiry.req_min_pressure_bar || enquiry.req_water_type
      ? `
      <div style="margin-top: 20px; border: 1px solid #e5e5e5; padding: 16px; background-color: #fafafa;">
        <h3 style="margin: 0 0 10px 0; font-size: 13px; font-family: monospace; text-transform: uppercase; color: #111; letter-spacing: 0.1em;">
          Stated Operational Requirements
        </h3>
        <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
          ${enquiry.req_application ? `<tr><td style="padding: 4px 8px; color: #666; width: 140px;">Application:</td><td style="padding: 4px 8px; font-weight: bold;">${enquiry.req_application.replace(/_/g, ' ')}</td></tr>` : ''}
          ${enquiry.req_water_type ? `<tr><td style="padding: 4px 8px; color: #666;">Water Duty:</td><td style="padding: 4px 8px; font-weight: bold;">${enquiry.req_water_type.toUpperCase()}</td></tr>` : ''}
          ${enquiry.req_min_pressure_bar ? `<tr><td style="padding: 4px 8px; color: #666;">Min Pressure:</td><td style="padding: 4px 8px; font-weight: bold;">${enquiry.req_min_pressure_bar} BAR</td></tr>` : ''}
          ${enquiry.req_min_flow_lpm ? `<tr><td style="padding: 4px 8px; color: #666;">Min Flow:</td><td style="padding: 4px 8px; font-weight: bold;">${enquiry.req_min_flow_lpm} L/min</td></tr>` : ''}
          ${enquiry.req_power_source ? `<tr><td style="padding: 4px 8px; color: #666;">Power Drive:</td><td style="padding: 4px 8px; font-weight: bold;">${enquiry.req_power_source}</td></tr>` : ''}
          ${enquiry.req_voltage ? `<tr><td style="padding: 4px 8px; color: #666;">Voltage:</td><td style="padding: 4px 8px; font-weight: bold;">${enquiry.req_voltage} ${enquiry.req_phase ? `(${enquiry.req_phase}-Phase)` : ''}</td></tr>` : ''}
        </table>
      </div>
    `
      : '';

  const confirmationHtml =
    enquiry.confirmation_items && enquiry.confirmation_items.length > 0
      ? `
      <div style="margin-top: 16px; border: 1px solid #fed7aa; background-color: #fffbeb; padding: 14px;">
        <h4 style="margin: 0 0 6px 0; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #9a3412;">
          ⚠ Sales Engineer Checklist (Worth Confirming)
        </h4>
        <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #7c2d12;">
          ${enquiry.confirmation_items.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}
        </ul>
      </div>
    `
      : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Alkota UK Enquiry: ${enquiry.reference}</title>
      </head>
      <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #18181b;">
        <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-top: 4px solid #FF6900; padding: 32px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 16px; margin-bottom: 24px;">
            <div>
              <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; color: #71717a; letter-spacing: 0.1em; display: block;">Commercial Enquiry</span>
              <h1 style="margin: 4px 0 0 0; font-size: 20px; color: #09090b;">Ref: ${enquiry.reference}</h1>
            </div>
            <div style="text-align: right;">
              <span style="display: inline-block; padding: 4px 8px; font-size: 11px; font-family: monospace; font-weight: bold; background-color: #f4f4f5; color: #18181b; text-transform: uppercase; border: 1px solid #e4e4e7;">
                ${enquiry.source || 'GENERAL'}
              </span>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; color: #71717a; width: 140px;">Customer:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #09090b;">${enquiry.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #71717a;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${enquiry.email}" style="color: #FF6900; text-decoration: none;">${enquiry.email}</a></td>
            </tr>
            ${enquiry.phone ? `<tr><td style="padding: 6px 0; color: #71717a;">Telephone:</td><td style="padding: 6px 0; font-family: monospace;">${enquiry.phone}</td></tr>` : ''}
            ${enquiry.company ? `<tr><td style="padding: 6px 0; color: #71717a;">Company:</td><td style="padding: 6px 0;">${enquiry.company}</td></tr>` : ''}
            ${enquiry.postcode ? `<tr><td style="padding: 6px 0; color: #71717a;">Site Postcode:</td><td style="padding: 6px 0; font-family: monospace; font-weight: bold;">${enquiry.postcode}</td></tr>` : ''}
            ${enquiry.site_power ? `<tr><td style="padding: 6px 0; color: #71717a;">Site Power:</td><td style="padding: 6px 0;">${enquiry.site_power}</td></tr>` : ''}
            ${enquiry.timeline ? `<tr><td style="padding: 6px 0; color: #71717a;">Timeline:</td><td style="padding: 6px 0;">${enquiry.timeline}</td></tr>` : ''}
            <tr>
              <td style="padding: 6px 0; color: #71717a;">Received:</td>
              <td style="padding: 6px 0; color: #71717a; font-size: 12px;">${dateStr}</td>
            </tr>
          </table>

          ${machinesHtml}
          ${requirementsHtml}
          ${confirmationHtml}

          ${
            enquiry.message
              ? `
            <div style="margin-top: 24px; border-top: 1px solid #eee; pt-16px;">
              <h4 style="margin: 16px 0 8px 0; font-size: 12px; font-family: monospace; text-transform: uppercase; color: #71717a;">
                Customer Application Message:
              </h4>
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #27272a; white-space: pre-wrap; background-color: #fafafa; padding: 12px; border: 1px solid #e5e5e5;">
                ${enquiry.message}
              </p>
            </div>
          `
              : ''
          }

          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e4e4e7; text-align: center;">
            <a href="${adminUrl}" style="display: inline-block; background-color: #18181b; color: #ffffff; text-decoration: none; padding: 10px 24px; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; border-radius: 2px;">
              Open Enquiry in Admin Desk →
            </a>
          </div>

        </div>
      </body>
    </html>
  `;
}

export function buildEnquiryEmailText({
  enquiry,
  machines = [],
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alkota.co.uk',
}: SendNotificationParams): string {
  const adminUrl = `${siteUrl}/admin/enquiries/${enquiry.id || ''}`;
  const lines: string[] = [
    `NEW ALKOTA UK ENQUIRY: ${enquiry.reference}`,
    `Source: ${enquiry.source || 'GENERAL'}`,
    `Date: ${new Date().toISOString()}`,
    '',
    `CUSTOMER:`,
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    enquiry.phone ? `Phone: ${enquiry.phone}` : '',
    enquiry.company ? `Company: ${enquiry.company}` : '',
    enquiry.postcode ? `Postcode: ${enquiry.postcode}` : '',
    '',
  ];

  if (machines.length > 0) {
    lines.push('EQUIPMENT:');
    machines.forEach(m => {
      lines.push(`• ${m.model_code_snapshot} (${m.category_snapshot}) - Status: ${m.selection_status || 'DIRECT'}`);
    });
    lines.push('');
  }

  if (enquiry.req_application || enquiry.req_min_pressure_bar) {
    lines.push('REQUIREMENTS:');
    if (enquiry.req_application) lines.push(`• Application: ${enquiry.req_application}`);
    if (enquiry.req_water_type) lines.push(`• Water: ${enquiry.req_water_type}`);
    if (enquiry.req_min_pressure_bar) lines.push(`• Min Pressure: ${enquiry.req_min_pressure_bar} BAR`);
    if (enquiry.req_min_flow_lpm) lines.push(`• Min Flow: ${enquiry.req_min_flow_lpm} L/min`);
    lines.push('');
  }

  if (enquiry.confirmation_items && enquiry.confirmation_items.length > 0) {
    lines.push('CHECKLIST / WORTH CONFIRMING:');
    enquiry.confirmation_items.forEach(c => lines.push(`- ${c}`));
    lines.push('');
  }

  if (enquiry.message) {
    lines.push('MESSAGE:');
    lines.push(enquiry.message);
    lines.push('');
  }

  lines.push(`VIEW IN ADMIN: ${adminUrl}`);

  return lines.filter(Boolean).join('\n');
}

export async function sendEnquiryNotification(params: SendNotificationParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Notifications] RESEND_API_KEY not configured. Skipping email dispatch.');
    return false;
  }

  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || 'sales@alkota.co.uk';
  const html = buildEnquiryEmailHtml(params);
  const text = buildEnquiryEmailText(params);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Alkota Commercial Desk <enquiries@alkota.co.uk>',
        to: [recipient],
        reply_to: params.enquiry.email,
        subject: `[Alkota Enquiry] ${params.enquiry.reference} — ${params.enquiry.name} (${params.enquiry.source || 'Commercial'})`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[Notifications] Resend API error response:', res.status, errText);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Notifications] Failed to send enquiry notification:', err);
    return false;
  }
}
