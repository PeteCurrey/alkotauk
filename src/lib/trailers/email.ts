export type TrailerEmailEventType =
  | 'BUILD_SAVED'
  | 'ENGINEERING_REVIEW_RECEIVED'
  | 'ORDER_CONFIRMED'
  | 'MILESTONE_UPDATE'
  | 'READY_FOR_HANDOVER'
  | 'SERVICE_REQUEST_CONFIRMATION'
  | 'PARTS_ENQUIRY_CONFIRMATION';

export type EmailDeliveryStatus = 'queued' | 'sent' | 'failed' | 'simulated';

export interface TrailerEmailPayload {
  eventType: TrailerEmailEventType;
  recipientEmail: string;
  recipientName: string;
  buildReference?: string;
  buildCode?: string;
  systemName?: string;
  companyName?: string;
  milestoneTitle?: string;
  milestoneMessage?: string;
  serviceType?: string;
  partDescription?: string;
  idempotencyKey?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  status: EmailDeliveryStatus;
  messageId?: string;
  error?: string;
  dispatchedAt: string;
}

// In-memory idempotency cache to prevent rapid duplicate dispatches
const processedIdempotencyKeys = new Set<string>();

/**
 * Renders high-authority, premium Alkota UK transactional email HTML.
 */
function renderTrailerEmailHtml(payload: TrailerEmailPayload): { subject: string; html: string } {
  const brandOrange = '#FF6900';
  const brandDark = '#0A0A0A';

  let subject = `Alkota UK · ${payload.buildReference || 'Bespoke Trailer System'}`;
  let title = 'System Update';
  let bodyContent = '';
  let actionUrl = `https://alkota.co.uk/my-alkota/builds/${payload.buildCode || ''}`;
  let actionLabel = 'View Your Alkota Build';

  switch (payload.eventType) {
    case 'BUILD_SAVED':
      subject = `Alkota UK · Your Bespoke Trailer Specification [${payload.buildCode}]`;
      title = 'Preliminary Specification Saved';
      bodyContent = `
        <p style="color: #333; font-size: 14px; line-height: 1.6;">Thank you for configuring your bespoke Alkota mobile system. Your technical build code is <strong>${payload.buildCode}</strong>.</p>
        <p style="color: #666; font-size: 13px; line-height: 1.6;">You can revisit, modify, or submit your specification for engineering review at any time using your permanent build link.</p>
      `;
      actionUrl = `https://alkota.co.uk/trailers/build/${payload.buildCode}`;
      actionLabel = 'Open Specification Sheet';
      break;

    case 'ENGINEERING_REVIEW_RECEIVED':
      subject = `Alkota UK Engineering · Review Received [${payload.buildCode}]`;
      title = 'Engineering Review in Progress';
      bodyContent = `
        <p style="color: #333; font-size: 14px; line-height: 1.6;">Our engineering team in Yorkshire has received your trailer configuration for <strong>${payload.companyName || 'your organisation'}</strong>.</p>
        <p style="color: #666; font-size: 13px; line-height: 1.6;">We are currently verifying chassis payload margins, water endurance dynamics, and machinery compatibility. A technical specialist will contact you with formal quotation options.</p>
      `;
      break;

    case 'ORDER_CONFIRMED':
      subject = `Alkota UK · Build Project Confirmed [${payload.buildReference}]`;
      title = 'Order Confirmed — Production Scheduled';
      bodyContent = `
        <p style="color: #333; font-size: 14px; line-height: 1.6;">Your order has been formally confirmed and assigned production build reference <strong>${payload.buildReference}</strong>.</p>
        <p style="color: #666; font-size: 13px; line-height: 1.6;">Chassis preparation and component staging have commenced. You can follow live workshop milestones through your customer tracker.</p>
      `;
      actionUrl = `https://alkota.co.uk/my-alkota/builds/${payload.buildCode}`;
      actionLabel = 'Track Live Workshop Build';
      break;

    case 'MILESTONE_UPDATE':
      subject = `Alkota Workshop Update · ${payload.milestoneTitle || 'Milestone Reached'} [${payload.buildReference}]`;
      title = payload.milestoneTitle || 'Workshop Progress Update';
      bodyContent = `
        <p style="color: #333; font-size: 14px; line-height: 1.6;">${payload.milestoneMessage || 'A new approved workshop stage has been completed on your rig.'}</p>
        <p style="color: #666; font-size: 13px; line-height: 1.6;">System: <strong>${payload.systemName || 'Alkota Bespoke Mobile Rig'}</strong> (${payload.buildReference})</p>
      `;
      break;

    case 'READY_FOR_HANDOVER':
      subject = `Alkota UK · Your System is Ready for Handover [${payload.buildReference}]`;
      title = 'Quality Checks Passed — Ready for Handover';
      bodyContent = `
        <p style="color: #333; font-size: 14px; line-height: 1.6;">Final testing, calibration, and verified scale weighing have concluded. Your Alkota trailer system <strong>${payload.buildReference}</strong> has passed 100% of quality assurance protocols.</p>
        <p style="color: #666; font-size: 13px; line-height: 1.6;">Our team will coordinate the handover date, documentation pack sign-off, and operator induction training with your depot representative.</p>
      `;
      actionLabel = 'View Handover Pack';
      break;

    case 'SERVICE_REQUEST_CONFIRMATION':
      subject = `Alkota Service Dispatch · Request Logged [${payload.buildReference}]`;
      title = 'Service Visit Request Logged';
      bodyContent = `
        <p style="color: #333; font-size: 14px; line-height: 1.6;">Your service request for <strong>${payload.buildReference}</strong> (${payload.serviceType || 'Routine PPM'}) has been received by Alkota UK field dispatch.</p>
        <p style="color: #666; font-size: 13px; line-height: 1.6;">Your recorded machine serials and historical service ledger have been attached to this ticket.</p>
      `;
      actionLabel = 'View Service Ledger';
      break;

    case 'PARTS_ENQUIRY_CONFIRMATION':
      subject = `Alkota Genuine Parts · Enquiry Confirmed [${payload.buildReference}]`;
      title = 'Matched Parts Enquiry Received';
      bodyContent = `
        <p style="color: #333; font-size: 14px; line-height: 1.6;">Your enquiry for genuine replacement parts for <strong>${payload.buildReference}</strong> has been logged.</p>
        <p style="color: #666; font-size: 13px; line-height: 1.6;">Requirement: <em>${payload.partDescription || 'Genuine Alkota Components'}</em>. A parts specialist will confirm lead times and stock availability.</p>
      `;
      actionLabel = 'View Build Record';
      break;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9F5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E8E8E4; }
          .header { background: ${brandDark}; padding: 32px 24px; text-align: left; border-bottom: 3px solid ${brandOrange}; }
          .brand { color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
          .brand span { color: ${brandOrange}; }
          .body { padding: 32px 24px; }
          .title { font-size: 20px; font-weight: 600; color: #111111; margin-top: 0; margin-bottom: 16px; }
          .button { display: inline-block; background: ${brandOrange}; color: #ffffff !important; padding: 12px 24px; text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-top: 24px; }
          .footer { background: #FAF9F5; border-top: 1px solid #E8E8E4; padding: 20px 24px; text-align: left; font-size: 11px; color: #888888; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="brand">ALKOTA <span>UK</span></h1>
            <p style="margin: 4px 0 0 0; color: #888888; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">Bespoke Mobile Cleaning Systems</p>
          </div>
          <div class="body">
            <h2 class="title">${title}</h2>
            <p style="color: #666; font-size: 13px; margin-bottom: 16px;">Hello ${payload.recipientName},</p>
            ${bodyContent}
            <div style="text-align: left; margin-top: 24px;">
              <a href="${actionUrl}" class="button">${actionLabel} →</a>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0 0 4px 0;"><strong>Alkota UK</strong> · Official UK Operation &amp; System Integration</p>
            <p style="margin: 0;">Phone: 0800 000 0000 · Email: service@alkota.co.uk · Web: alkota.co.uk</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return { subject, html };
}

/**
 * Dispatches a transactional email via Resend with idempotency protection and event independence.
 * Critical: If sending fails, it returns a failed status object without throwing, preserving operational state.
 */
export async function dispatchTrailerTransactionalEmail(
  payload: TrailerEmailPayload
): Promise<EmailDispatchResult> {
  const dispatchedAt = new Date().toISOString();

  // 1. Idempotency Check
  if (payload.idempotencyKey) {
    if (processedIdempotencyKeys.has(payload.idempotencyKey)) {
      return {
        success: true,
        status: 'queued',
        messageId: `idempotent-duplicate-${payload.idempotencyKey}`,
        dispatchedAt,
      };
    }
    processedIdempotencyKeys.add(payload.idempotencyKey);
  }

  const { subject, html } = renderTrailerEmailHtml(payload);
  const apiKey = process.env.RESEND_API_KEY;

  // 2. Offline / Development fallback simulation
  if (!apiKey || apiKey.startsWith('re_dummy') || process.env.NODE_ENV === 'test') {
    return {
      success: true,
      status: 'simulated',
      messageId: `sim-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      dispatchedAt,
    };
  }

  // 3. Live Resend Transport
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Alkota UK <notifications@alkota.co.uk>',
        to: [payload.recipientEmail],
        reply_to: 'service@alkota.co.uk',
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`Transactional email delivery failed [${payload.eventType}]:`, errText);
      return {
        success: false,
        status: 'failed',
        error: `Resend error: ${res.statusText}`,
        dispatchedAt,
      };
    }

    const data = await res.json();
    return {
      success: true,
      status: 'sent',
      messageId: data.id,
      dispatchedAt,
    };
  } catch (err: any) {
    console.warn(`Transactional email network exception [${payload.eventType}]:`, err.message);
    return {
      success: false,
      status: 'failed',
      error: err.message || 'Network error during email dispatch.',
      dispatchedAt,
    };
  }
}
