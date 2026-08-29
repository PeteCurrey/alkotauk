import { supabaseAdmin } from '@/lib/supabase/server';

export type TrailerEmailEventType =
  | 'BUILD_SAVED'
  | 'ENGINEERING_REVIEW_RECEIVED'
  | 'ORDER_CONFIRMED'
  | 'MILESTONE_UPDATE'
  | 'READY_FOR_HANDOVER'
  | 'SERVICE_REQUEST_CONFIRMATION'
  | 'PARTS_ENQUIRY_CONFIRMATION';

export type EmailDeliveryStatus = 'queued' | 'sending' | 'sent' | 'failed' | 'simulated';

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
  eventVersion?: number;
  authorizedBy?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  status: EmailDeliveryStatus;
  eventKey: string;
  messageId?: string;
  duplicated?: boolean;
  error?: string;
  attemptCount: number;
  dispatchedAt: string;
}

export interface NotificationEventRecord {
  id: string;
  event_key: string;
  event_type: string;
  entity_type: string;
  entity_id: string;
  event_version: number;
  recipient: string;
  recipient_name: string | null;
  subject: string;
  status: EmailDeliveryStatus;
  provider: string;
  provider_message_id: string | null;
  attempt_count: number;
  created_at: string;
  sent_at: string | null;
  failed_at: string | null;
  last_error: string | null;
  metadata: Record<string, any>;
}

// ─── DETERMINISTIC EVENT KEY DERIVATION ─────────────────────────────────────

export function deriveEventKey({
  eventType,
  entityId,
  eventVersion = 1,
  recipientEmail,
}: {
  eventType: TrailerEmailEventType;
  entityId: string;
  eventVersion?: number;
  recipientEmail: string;
}): string {
  const cleanEmail = recipientEmail.trim().toLowerCase();
  const cleanEntity = entityId.trim();
  return `${eventType}:${cleanEntity}:v${eventVersion}:${cleanEmail}`;
}

// ─── IN-MEMORY FALLBACK STORE (FOR OFFLINE / TEST ISOLATION) ────────────────

const _mockDbStore = new Map<string, NotificationEventRecord>();

export function _clearMockDbStore(): void {
  _mockDbStore.clear();
}

export function _getMockDbStore(): Map<string, NotificationEventRecord> {
  return _mockDbStore;
}

// ─── EMAIL TEMPLATE GENERATOR ───────────────────────────────────────────────

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

// ─── DATABASE STATE MANAGEMENT ──────────────────────────────────────────────

async function getEventRecord(eventKey: string): Promise<NotificationEventRecord | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('transactional_notification_events')
      .select('*')
      .eq('event_key', eventKey)
      .maybeSingle();

    if (!error && data) {
      return data as NotificationEventRecord;
    }
  } catch {
    // Database connection or table unavailable — fallback to isolated mock store
  }
  return _mockDbStore.get(eventKey) || null;
}

async function claimOrInsertEvent({
  eventKey,
  payload,
  subject,
}: {
  eventKey: string;
  payload: TrailerEmailPayload;
  subject: string;
}): Promise<{ record: NotificationEventRecord; isNew: boolean; alreadySent: boolean }> {
  const entityId = payload.buildReference || payload.buildCode || 'global';
  const eventVersion = payload.eventVersion || 1;
  const now = new Date().toISOString();

  // Check mock store atomically first for offline/test environments
  if (_mockDbStore.has(eventKey)) {
    const existing = _mockDbStore.get(eventKey)!;
    if (existing.status === 'sent' || existing.status === 'simulated') {
      return { record: existing, isNew: false, alreadySent: true };
    }
    if (existing.status === 'sending') {
      return { record: existing, isNew: false, alreadySent: false };
    }
    // If failed, retry
    const updatedRecord: NotificationEventRecord = {
      ...existing,
      status: 'sending',
      attempt_count: existing.attempt_count + 1,
      last_error: null,
    };
    _mockDbStore.set(eventKey, updatedRecord);
    return { record: updatedRecord, isNew: false, alreadySent: false };
  }

  // 1. Check existing record in Supabase
  const existing = await getEventRecord(eventKey);
  if (existing) {
    if (existing.status === 'sent' || existing.status === 'simulated') {
      return { record: existing, isNew: false, alreadySent: true };
    }
    if (existing.status === 'sending') {
      return { record: existing, isNew: false, alreadySent: false };
    }
    // If failed, increment attempt count and set to sending
    const updatedRecord: NotificationEventRecord = {
      ...existing,
      status: 'sending',
      attempt_count: existing.attempt_count + 1,
      last_error: null,
    };
    try {
      await supabaseAdmin
        .from('transactional_notification_events')
        .update({
          status: 'sending',
          attempt_count: updatedRecord.attempt_count,
          last_error: null,
        })
        .eq('event_key', eventKey);
    } catch {
      _mockDbStore.set(eventKey, updatedRecord);
    }
    return { record: updatedRecord, isNew: false, alreadySent: false };
  }

  // 2. Insert new event record
  const newRecord: NotificationEventRecord = {
    id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    event_key: eventKey,
    event_type: payload.eventType,
    entity_type: 'trailer_build',
    entity_id: entityId,
    event_version: eventVersion,
    recipient: payload.recipientEmail.trim().toLowerCase(),
    recipient_name: payload.recipientName || null,
    subject,
    status: 'sending',
    provider: 'resend',
    provider_message_id: null,
    attempt_count: 1,
    created_at: now,
    sent_at: null,
    failed_at: null,
    last_error: null,
    metadata: {
      authorized_by: payload.authorizedBy || 'system',
      build_code: payload.buildCode,
      build_reference: payload.buildReference,
    },
  };

  // Claim in mock store immediately to prevent concurrent races
  _mockDbStore.set(eventKey, newRecord);

  try {
    const { data, error } = await supabaseAdmin
      .from('transactional_notification_events')
      .insert({
        event_key: newRecord.event_key,
        event_type: newRecord.event_type,
        entity_type: newRecord.entity_type,
        entity_id: newRecord.entity_id,
        event_version: newRecord.event_version,
        recipient: newRecord.recipient,
        recipient_name: newRecord.recipient_name,
        subject: newRecord.subject,
        status: 'sending',
        provider: 'resend',
        attempt_count: 1,
        created_at: now,
        metadata: newRecord.metadata,
      })
      .select()
      .single();

    if (!error && data) {
      return { record: data as NotificationEventRecord, isNew: true, alreadySent: false };
    }
  } catch {
    // Fallback store already set
    return { record: newRecord, isNew: true, alreadySent: false };
  }

  // If insert collided via unique constraint, re-fetch
  const winner = await getEventRecord(eventKey);
  if (winner) {
    return { record: winner, isNew: false, alreadySent: winner.status === 'sent' || winner.status === 'simulated' };
  }

  return { record: newRecord, isNew: true, alreadySent: false };
}

async function finalizeEventStatus({
  eventKey,
  status,
  messageId,
  error,
}: {
  eventKey: string;
  status: EmailDeliveryStatus;
  messageId?: string;
  error?: string;
}): Promise<void> {
  const now = new Date().toISOString();
  try {
    await supabaseAdmin
      .from('transactional_notification_events')
      .update({
        status,
        provider_message_id: messageId || null,
        sent_at: status === 'sent' || status === 'simulated' ? now : null,
        failed_at: status === 'failed' ? now : null,
        last_error: error || null,
      })
      .eq('event_key', eventKey);
  } catch {
    const existing = _mockDbStore.get(eventKey);
    if (existing) {
      _mockDbStore.set(eventKey, {
        ...existing,
        status,
        provider_message_id: messageId || null,
        sent_at: status === 'sent' || status === 'simulated' ? now : null,
        failed_at: status === 'failed' ? now : null,
        last_error: error || null,
      });
    }
  }
}

// ─── DURABLE TRANSACTIONAL DISPATCH ─────────────────────────────────────────

export async function dispatchTrailerTransactionalEmail(
  payload: TrailerEmailPayload
): Promise<EmailDispatchResult> {
  const entityId = payload.buildReference || payload.buildCode || 'global';
  const eventKey = deriveEventKey({
    eventType: payload.eventType,
    entityId,
    eventVersion: payload.eventVersion || 1,
    recipientEmail: payload.recipientEmail,
  });

  const { subject, html } = renderTrailerEmailHtml(payload);

  // 1. Claim or check existing event in database
  const claim = await claimOrInsertEvent({ eventKey, payload, subject });

  // 2. If already sent, suppress duplicate dispatch
  if (claim.alreadySent) {
    return {
      success: true,
      status: claim.record.status,
      eventKey,
      messageId: claim.record.provider_message_id || `dedup-${eventKey}`,
      duplicated: true,
      attemptCount: claim.record.attempt_count,
      dispatchedAt: claim.record.sent_at || claim.record.created_at,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  // 3. Offline / Test / Development simulation mode
  if (!apiKey || apiKey.startsWith('re_dummy') || process.env.NODE_ENV === 'test') {
    const simMessageId = `sim-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    await finalizeEventStatus({
      eventKey,
      status: 'simulated',
      messageId: simMessageId,
    });

    return {
      success: true,
      status: 'simulated',
      eventKey,
      messageId: simMessageId,
      duplicated: false,
      attemptCount: claim.record.attempt_count,
      dispatchedAt: new Date().toISOString(),
    };
  }

  // 4. Live Resend API Transport
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
      const errorMsg = `Resend error (${res.status}): ${errText.substring(0, 100)}`;
      await finalizeEventStatus({
        eventKey,
        status: 'failed',
        error: errorMsg,
      });

      return {
        success: false,
        status: 'failed',
        eventKey,
        error: errorMsg,
        duplicated: false,
        attemptCount: claim.record.attempt_count,
        dispatchedAt: new Date().toISOString(),
      };
    }

    const data = await res.json();
    await finalizeEventStatus({
      eventKey,
      status: 'sent',
      messageId: data.id,
    });

    return {
      success: true,
      status: 'sent',
      eventKey,
      messageId: data.id,
      duplicated: false,
      attemptCount: claim.record.attempt_count,
      dispatchedAt: new Date().toISOString(),
    };
  } catch (err: any) {
    const errorMsg = err.message || 'Network exception during Resend dispatch.';
    await finalizeEventStatus({
      eventKey,
      status: 'failed',
      error: errorMsg,
    });

    return {
      success: false,
      status: 'failed',
      eventKey,
      error: errorMsg,
      duplicated: false,
      attemptCount: claim.record.attempt_count,
      dispatchedAt: new Date().toISOString(),
    };
  }
}

/**
 * Authorised admin action to explicitly resend a customer lifecycle communication.
 * Increments the event version (e.g. v1 -> v2) to establish a new auditable delivery attempt.
 */
export async function resendTrailerNotification({
  originalPayload,
  nextVersion,
  authorizedAdminUser,
}: {
  originalPayload: TrailerEmailPayload;
  nextVersion: number;
  authorizedAdminUser: string;
}): Promise<EmailDispatchResult> {
  const newPayload: TrailerEmailPayload = {
    ...originalPayload,
    eventVersion: nextVersion,
    authorizedBy: authorizedAdminUser,
  };
  return dispatchTrailerTransactionalEmail(newPayload);
}
