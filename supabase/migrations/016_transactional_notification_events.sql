-- Migration 016: Transactional Notification Events & Durable Idempotency
-- Provides durable database-level deduplication, delivery state tracking,
-- retry management, and provider message auditing for Alkota lifecycle communications.

CREATE TABLE IF NOT EXISTS transactional_notification_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_key TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  entity_type TEXT NOT NULL DEFAULT 'trailer_build',
  entity_id TEXT NOT NULL,
  event_version INTEGER NOT NULL DEFAULT 1,
  recipient TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sending', 'sent', 'failed', 'simulated')),
  provider TEXT NOT NULL DEFAULT 'resend',
  provider_message_id TEXT,
  attempt_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  last_error TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for high-frequency queries
CREATE INDEX IF NOT EXISTS idx_trans_notif_entity ON transactional_notification_events(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_trans_notif_recipient ON transactional_notification_events(recipient);
CREATE INDEX IF NOT EXISTS idx_trans_notif_status ON transactional_notification_events(status);
CREATE INDEX IF NOT EXISTS idx_trans_notif_created_at ON transactional_notification_events(created_at DESC);
