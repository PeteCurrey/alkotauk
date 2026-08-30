-- ============================================================
-- ALKOTA UK — DEALER PORTAL FOUNDATION (023)
-- Extends existing tables and adds new dealer portal structures.
-- Idempotent: safe to run multiple times.
-- ============================================================

-- ─── EXTEND: dealers ────────────────────────────────────────
-- The existing dealers table is the public directory model.
-- We extend it with portal-specific fields.

ALTER TABLE dealers
  ADD COLUMN IF NOT EXISTS portal_active       boolean      NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS portal_tier         text         NOT NULL DEFAULT 'standard'
    CHECK (portal_tier IN ('standard', 'silver', 'gold', 'platinum')),
  ADD COLUMN IF NOT EXISTS account_manager     text,
  ADD COLUMN IF NOT EXISTS credit_terms        text         NOT NULL DEFAULT 'proforma'
    CHECK (credit_terms IN ('proforma', '14_days', '30_days', '60_days', 'account')),
  ADD COLUMN IF NOT EXISTS credit_limit        decimal(10,2),
  ADD COLUMN IF NOT EXISTS payment_terms       text,
  ADD COLUMN IF NOT EXISTS company_reg         text,
  ADD COLUMN IF NOT EXISTS vat_number          text,
  ADD COLUMN IF NOT EXISTS approved_at         timestamptz,
  ADD COLUMN IF NOT EXISTS approved_by         text,
  ADD COLUMN IF NOT EXISTS suspended_at        timestamptz,
  ADD COLUMN IF NOT EXISTS suspension_reason   text,
  ADD COLUMN IF NOT EXISTS internal_notes      text,
  ADD COLUMN IF NOT EXISTS pricing_tier_id     uuid;

-- ─── EXTEND: dealer_applications ────────────────────────────
-- Existing table is basic. Extend with full application data.

ALTER TABLE dealer_applications
  ADD COLUMN IF NOT EXISTS trading_name                text,
  ADD COLUMN IF NOT EXISTS company_reg                 text,
  ADD COLUMN IF NOT EXISTS vat_number                  text,
  ADD COLUMN IF NOT EXISTS mobile                      text,
  ADD COLUMN IF NOT EXISTS address_line2               text,
  ADD COLUMN IF NOT EXISTS country                     text NOT NULL DEFAULT 'United Kingdom',
  ADD COLUMN IF NOT EXISTS num_employees               integer,
  ADD COLUMN IF NOT EXISTS business_type               text,
  ADD COLUMN IF NOT EXISTS years_trading               integer,
  ADD COLUMN IF NOT EXISTS industries_served           text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS geographic_territory        text,
  ADD COLUMN IF NOT EXISTS estimated_annual_sales      text,
  ADD COLUMN IF NOT EXISTS current_pw_brands           text,
  ADD COLUMN IF NOT EXISTS workshop_facilities         boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS mobile_service_capability   boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS service_van_count           integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS parts_service_capability    boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS dealer_interests            text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS document_urls               text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS additional_notes            text,
  ADD COLUMN IF NOT EXISTS reviewed_by                 text,
  ADD COLUMN IF NOT EXISTS reviewed_at                 timestamptz,
  ADD COLUMN IF NOT EXISTS more_info_message           text,
  ADD COLUMN IF NOT EXISTS more_info_requested_at      timestamptz,
  ADD COLUMN IF NOT EXISTS decision_reason             text,
  ADD COLUMN IF NOT EXISTS converted_dealer_id         uuid REFERENCES dealers(id) ON DELETE SET NULL;

-- Fix status constraint for dealer_applications
ALTER TABLE dealer_applications DROP CONSTRAINT IF EXISTS dealer_applications_status_check;
ALTER TABLE dealer_applications ADD CONSTRAINT dealer_applications_status_check
  CHECK (status IN ('pending', 'under_review', 'more_info_required', 'approved', 'rejected'));

-- ─── EXTEND: dealer_users ───────────────────────────────────
-- Existing table has basic dealer_admin/dealer_staff roles.
-- Extend with full role set and invitation workflow.

ALTER TABLE dealer_users
  ADD COLUMN IF NOT EXISTS first_name               text,
  ADD COLUMN IF NOT EXISTS last_name                text,
  ADD COLUMN IF NOT EXISTS job_title                text,
  ADD COLUMN IF NOT EXISTS phone                    text,
  ADD COLUMN IF NOT EXISTS password_hash            text,
  ADD COLUMN IF NOT EXISTS invitation_token         text UNIQUE,
  ADD COLUMN IF NOT EXISTS invited_at               timestamptz,
  ADD COLUMN IF NOT EXISTS invitation_accepted_at   timestamptz,
  ADD COLUMN IF NOT EXISTS last_login_at            timestamptz;

-- Fix role constraint for dealer_users
ALTER TABLE dealer_users DROP CONSTRAINT IF EXISTS dealer_users_role_check;
ALTER TABLE dealer_users ADD CONSTRAINT dealer_users_role_check
  CHECK (role IN ('owner', 'manager', 'sales', 'parts', 'service', 'accounts'));

-- ─── EXTEND: orders ─────────────────────────────────────────
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS dealer_id        uuid REFERENCES dealers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS dealer_user_id   uuid REFERENCES dealer_users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS po_number        text,
  ADD COLUMN IF NOT EXISTS order_type       text NOT NULL DEFAULT 'public'
    CHECK (order_type IN ('public', 'dealer')),
  ADD COLUMN IF NOT EXISTS payment_method   text NOT NULL DEFAULT 'card'
    CHECK (payment_method IN ('card', 'account', 'bacs'));

CREATE INDEX IF NOT EXISTS idx_orders_dealer_id   ON orders(dealer_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_type  ON orders(order_type);

-- ─── NEW: dealer_addresses ──────────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_addresses (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id     uuid        NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  address_type  text        NOT NULL DEFAULT 'delivery'
    CHECK (address_type IN ('delivery', 'billing', 'registered')),
  address_name  text,
  company_name  text,
  address_line1 text        NOT NULL,
  address_line2 text,
  town          text        NOT NULL,
  county        text,
  postcode      text        NOT NULL,
  country       text        NOT NULL DEFAULT 'United Kingdom',
  is_default    boolean     NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_addresses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_addresses" ON dealer_addresses;
CREATE POLICY "Service role can manage dealer_addresses" ON dealer_addresses FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS idx_dealer_addresses_dealer_id ON dealer_addresses(dealer_id);

-- ─── NEW: dealer_resources ──────────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_resources (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text        NOT NULL,
  document_type   text        NOT NULL DEFAULT 'manual'
    CHECK (document_type IN ('manual','specification','drawing','sds','marketing',
                             'parts_diagram','training','bulletin','brochure','other')),
  category        text        NOT NULL DEFAULT 'general'
    CHECK (category IN ('product_specs','manuals','engineering','chemicals',
                        'parts','marketing','training','general')),
  product_id      uuid        REFERENCES products(id) ON DELETE SET NULL,
  product_name    text,
  version         text,
  revision_date   date,
  language        text        NOT NULL DEFAULT 'en',
  file_url        text        NOT NULL,
  file_type       text,
  file_size_kb    integer,
  thumbnail_url   text,
  access_level    text        NOT NULL DEFAULT 'dealer'
    CHECK (access_level IN ('public','dealer','tier_silver','tier_gold','tier_platinum','specific','internal')),
  restricted_to_dealer_ids uuid[] DEFAULT '{}',
  active          boolean     NOT NULL DEFAULT true,
  featured        boolean     NOT NULL DEFAULT false,
  downloads       integer     NOT NULL DEFAULT 0,
  sort_order      integer     NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_resources" ON dealer_resources;
CREATE POLICY "Service role can manage dealer_resources" ON dealer_resources FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS idx_dealer_resources_category ON dealer_resources(category);
CREATE INDEX IF NOT EXISTS idx_dealer_resources_type     ON dealer_resources(document_type);
CREATE INDEX IF NOT EXISTS idx_dealer_resources_product  ON dealer_resources(product_id);
CREATE INDEX IF NOT EXISTS idx_dealer_resources_access   ON dealer_resources(access_level);

-- ─── NEW: dealer_announcements ──────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_announcements (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text        NOT NULL,
  body            text        NOT NULL,
  priority        text        NOT NULL DEFAULT 'normal'
    CHECK (priority IN ('low','normal','high','urgent')),
  audience_tiers  text[]      NOT NULL DEFAULT '{"standard","silver","gold","platinum"}',
  specific_dealer_ids uuid[]  DEFAULT '{}',
  attachment_urls text[]      DEFAULT '{}',
  published       boolean     NOT NULL DEFAULT false,
  published_at    timestamptz,
  expires_at      timestamptz,
  published_by    text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_announcements" ON dealer_announcements;
CREATE POLICY "Service role can manage dealer_announcements" ON dealer_announcements FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS idx_dealer_announcements_pub ON dealer_announcements(published, expires_at);

-- ─── NEW: dealer_notifications ──────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_notifications (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_user_id  uuid        NOT NULL REFERENCES dealer_users(id) ON DELETE CASCADE,
  dealer_id       uuid        NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  type            text        NOT NULL,
  title           text        NOT NULL,
  body            text,
  action_url      text,
  read            boolean     NOT NULL DEFAULT false,
  read_at         timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_notifications" ON dealer_notifications;
CREATE POLICY "Service role can manage dealer_notifications" ON dealer_notifications FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS idx_dealer_notif_user ON dealer_notifications(dealer_user_id, read);

-- ─── NEW: dealer_audit_log ──────────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_audit_log (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  action       text        NOT NULL,
  actor_id     text,
  actor_type   text        NOT NULL DEFAULT 'admin'
    CHECK (actor_type IN ('admin','dealer_user','system')),
  entity_type  text        NOT NULL,
  entity_id    text,
  dealer_id    uuid        REFERENCES dealers(id) ON DELETE SET NULL,
  metadata     jsonb       NOT NULL DEFAULT '{}'::jsonb,
  ip_address   text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_audit_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_audit_log" ON dealer_audit_log;
CREATE POLICY "Service role can manage dealer_audit_log" ON dealer_audit_log FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS idx_dealer_audit_dealer ON dealer_audit_log(dealer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dealer_audit_action ON dealer_audit_log(action);

-- ─── NEW: dealer_support_tickets ────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_support_tickets (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number   text        NOT NULL UNIQUE,
  dealer_id       uuid        NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  dealer_user_id  uuid        REFERENCES dealer_users(id) ON DELETE SET NULL,
  category        text        NOT NULL DEFAULT 'general'
    CHECK (category IN ('technical','parts','product','order','warranty',
                        'service','chemical','marketing','portal','other')),
  subject         text        NOT NULL,
  description     text,
  priority        text        NOT NULL DEFAULT 'normal'
    CHECK (priority IN ('low','normal','high','urgent')),
  status          text        NOT NULL DEFAULT 'open'
    CHECK (status IN ('open','in_progress','awaiting_dealer','resolved','closed')),
  assigned_to     text,
  attachment_urls text[]      DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_support_tickets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_support_tickets" ON dealer_support_tickets;
CREATE POLICY "Service role can manage dealer_support_tickets" ON dealer_support_tickets FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS idx_dealer_support_dealer  ON dealer_support_tickets(dealer_id);
CREATE INDEX IF NOT EXISTS idx_dealer_support_status  ON dealer_support_tickets(status);

-- ─── NEW: dealer_support_messages ───────────────────────────
CREATE TABLE IF NOT EXISTS dealer_support_messages (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id       uuid        NOT NULL REFERENCES dealer_support_tickets(id) ON DELETE CASCADE,
  sender_type     text        NOT NULL DEFAULT 'dealer'
    CHECK (sender_type IN ('dealer','alkota')),
  sender_name     text,
  message         text        NOT NULL,
  attachment_urls text[]      DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_support_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_support_messages" ON dealer_support_messages;
CREATE POLICY "Service role can manage dealer_support_messages" ON dealer_support_messages FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS idx_dealer_support_msgs_ticket ON dealer_support_messages(ticket_id);

-- ─── NEW: dealer_demo_requests ──────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_demo_requests (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number      text        NOT NULL UNIQUE,
  dealer_id           uuid        NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  dealer_user_id      uuid        REFERENCES dealer_users(id) ON DELETE SET NULL,
  demo_type           text        NOT NULL DEFAULT 'customer'
    CHECK (demo_type IN ('customer','dealer_day','factory')),
  contact_name        text        NOT NULL,
  contact_email       text        NOT NULL,
  contact_phone       text,
  proposed_date       date,
  proposed_date_alt   date,
  location            text,
  customer_name       text,
  customer_company    text,
  customer_industry   text,
  machines_requested  text[]      DEFAULT '{}',
  application_notes   text,
  expected_attendees  integer,
  special_requirements text,
  notes               text,
  status              text        NOT NULL DEFAULT 'requested'
    CHECK (status IN ('requested','under_review','approved','scheduled','completed','cancelled')),
  scheduled_date      date,
  alkota_notes        text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_demo_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_demo_requests" ON dealer_demo_requests;
CREATE POLICY "Service role can manage dealer_demo_requests" ON dealer_demo_requests FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS idx_dealer_demo_dealer ON dealer_demo_requests(dealer_id);
CREATE INDEX IF NOT EXISTS idx_dealer_demo_status  ON dealer_demo_requests(status);

-- ─── NEW: dealer_training ───────────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_training (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text        NOT NULL,
  slug             text        UNIQUE NOT NULL,
  category         text        NOT NULL DEFAULT 'product'
    CHECK (category IN ('product','sales','technical','parts','service',
                        'chemical','safety','new_product')),
  description      text,
  video_url        text,
  document_urls    text[]      DEFAULT '{}',
  duration_minutes integer,
  difficulty       text        NOT NULL DEFAULT 'beginner'
    CHECK (difficulty IN ('beginner','intermediate','advanced')),
  access_tier      text        NOT NULL DEFAULT 'standard'
    CHECK (access_tier IN ('standard','silver','gold','platinum')),
  active           boolean     NOT NULL DEFAULT true,
  featured         boolean     NOT NULL DEFAULT false,
  sort_order       integer     NOT NULL DEFAULT 0,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_training ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_training" ON dealer_training;
CREATE POLICY "Service role can manage dealer_training" ON dealer_training FOR ALL USING (true);

-- ─── NEW: dealer_training_progress ──────────────────────────
CREATE TABLE IF NOT EXISTS dealer_training_progress (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_user_id   uuid        NOT NULL REFERENCES dealer_users(id) ON DELETE CASCADE,
  training_id      uuid        NOT NULL REFERENCES dealer_training(id) ON DELETE CASCADE,
  status           text        NOT NULL DEFAULT 'not_started'
    CHECK (status IN ('not_started','in_progress','completed')),
  started_at       timestamptz,
  completed_at     timestamptz,
  score            integer,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (dealer_user_id, training_id)
);

ALTER TABLE dealer_training_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_training_progress" ON dealer_training_progress;
CREATE POLICY "Service role can manage dealer_training_progress" ON dealer_training_progress FOR ALL USING (true);

-- ─── NEW: dealer_training_events ────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_training_events (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 text        NOT NULL,
  event_type            text        NOT NULL DEFAULT 'online'
    CHECK (event_type IN ('classroom','factory','online','product_launch','workshop')),
  description           text,
  event_date            date,
  event_time            text,
  location              text,
  max_places            integer,
  registration_deadline date,
  access_tier           text        NOT NULL DEFAULT 'standard',
  active                boolean     NOT NULL DEFAULT true,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_training_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_training_events" ON dealer_training_events;
CREATE POLICY "Service role can manage dealer_training_events" ON dealer_training_events FOR ALL USING (true);

-- ─── NEW: dealer_training_registrations ─────────────────────
CREATE TABLE IF NOT EXISTS dealer_training_registrations (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id         uuid        NOT NULL REFERENCES dealer_training_events(id) ON DELETE CASCADE,
  dealer_id        uuid        NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  dealer_user_id   uuid        REFERENCES dealer_users(id) ON DELETE SET NULL,
  status           text        NOT NULL DEFAULT 'requested'
    CHECK (status IN ('requested','confirmed','cancelled','attended')),
  notes            text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (event_id, dealer_user_id)
);

ALTER TABLE dealer_training_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_training_registrations" ON dealer_training_registrations;
CREATE POLICY "Service role can manage dealer_training_registrations" ON dealer_training_registrations FOR ALL USING (true);

-- ─── NEW: dealer_pricing_rules ───────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_pricing_rules (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_name         text        NOT NULL,
  applies_to        text        NOT NULL DEFAULT 'tier'
    CHECK (applies_to IN ('tier','specific_dealer','all')),
  dealer_id         uuid        REFERENCES dealers(id) ON DELETE CASCADE,
  portal_tier       text,
  product_id        uuid        REFERENCES products(id) ON DELETE CASCADE,
  part_id           uuid        REFERENCES parts(id) ON DELETE CASCADE,
  product_category  text,
  discount_pct      decimal(5,2),
  price_override    decimal(10,2),
  valid_from        timestamptz,
  valid_to          timestamptz,
  active            boolean     NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_pricing_rules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer_pricing_rules" ON dealer_pricing_rules;
CREATE POLICY "Service role can manage dealer_pricing_rules" ON dealer_pricing_rules FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS idx_dealer_pricing_dealer ON dealer_pricing_rules(dealer_id);
CREATE INDEX IF NOT EXISTS idx_dealer_pricing_tier   ON dealer_pricing_rules(portal_tier);
CREATE INDEX IF NOT EXISTS idx_dealer_pricing_part   ON dealer_pricing_rules(part_id);

-- ─── UPDATED_AT TRIGGERS ────────────────────────────────────
DROP TRIGGER IF EXISTS set_updated_at_dealer_addresses ON dealer_addresses;
CREATE TRIGGER set_updated_at_dealer_addresses
  BEFORE UPDATE ON dealer_addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_dealer_resources ON dealer_resources;
CREATE TRIGGER set_updated_at_dealer_resources
  BEFORE UPDATE ON dealer_resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_dealer_announcements ON dealer_announcements;
CREATE TRIGGER set_updated_at_dealer_announcements
  BEFORE UPDATE ON dealer_announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_dealer_support_tickets ON dealer_support_tickets;
CREATE TRIGGER set_updated_at_dealer_support_tickets
  BEFORE UPDATE ON dealer_support_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_dealer_demo_requests ON dealer_demo_requests;
CREATE TRIGGER set_updated_at_dealer_demo_requests
  BEFORE UPDATE ON dealer_demo_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_dealer_training ON dealer_training;
CREATE TRIGGER set_updated_at_dealer_training
  BEFORE UPDATE ON dealer_training
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_dealer_training_progress ON dealer_training_progress;
CREATE TRIGGER set_updated_at_dealer_training_progress
  BEFORE UPDATE ON dealer_training_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_dealer_training_events ON dealer_training_events;
CREATE TRIGGER set_updated_at_dealer_training_events
  BEFORE UPDATE ON dealer_training_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_dealer_pricing_rules ON dealer_pricing_rules;
CREATE TRIGGER set_updated_at_dealer_pricing_rules
  BEFORE UPDATE ON dealer_pricing_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── DEMO SEED DATA ─────────────────────────────────────────
-- DEMO SEED: Announcements
INSERT INTO dealer_announcements (title, body, priority, published, published_at, published_by)
VALUES
(
  'New 2026 Machine Price List Now Available',
  'The updated 2026 wholesale price list is now available in the Resource Centre. Please review the new pricing before placing orders. Key changes include revised pump assembly pricing and updated chemical IBC rates.',
  'high',
  true,
  now(),
  'Alkota UK Commercial'
),
(
  'Hot Water Combustion Certification — Online Module Now Live',
  'The updated Hot Water Combustion Certification training module is now available in your Training Library. All service-level dealer users should complete this module before 30 September 2026.',
  'normal',
  true,
  now() - interval '3 days',
  'Alkota UK Training'
)
ON CONFLICT DO NOTHING;

-- DEMO SEED: Training
INSERT INTO dealer_training (title, slug, category, description, duration_minutes, difficulty, access_tier, featured)
VALUES
(
  'Introduction to Alkota Hot Water Systems',
  'intro-hot-water-systems',
  'product',
  'A comprehensive introduction to the Alkota hot water pressure washer range. Covers key components, operating principles, specifications and sales positioning.',
  45,
  'beginner',
  'standard',
  true
),
(
  'Triplex Pump Service & Maintenance',
  'triplex-pump-service',
  'technical',
  'Detailed technical training on triplex pump inspection, seal replacement, valve servicing and torque specifications for the General Pump TS-Series.',
  90,
  'intermediate',
  'standard',
  false
),
(
  'Chemical Application & Safety',
  'chemical-application-safety',
  'chemical',
  'Safe handling, dilution guidelines, PPE requirements and application best practices for the Hydrus chemical range.',
  30,
  'beginner',
  'standard',
  false
)
ON CONFLICT (slug) DO NOTHING;

-- DEMO SEED: Training Events
INSERT INTO dealer_training_events (title, event_type, description, event_date, event_time, location, max_places, access_tier)
VALUES
(
  'Dealer Technical Day — Preston HQ',
  'factory',
  'Full-day hands-on technical training at our Preston facility. Covers combustion system diagnostics, pump rebuilds, electrical fault finding and water treatment system commissioning.',
  (CURRENT_DATE + interval '28 days')::date,
  '09:00 — 17:00',
  'Alkota UK, Unit 4, Preston, Lancashire',
  12,
  'standard'
),
(
  'New Product Launch Webinar — 2026 Elite Series',
  'online',
  'Online product launch presentation covering the new Elite Series hot water machines. Includes specification walkthrough, competitive positioning and dealer pricing briefing.',
  (CURRENT_DATE + interval '14 days')::date,
  '10:00 — 11:30',
  'Online (link sent on registration)',
  50,
  'standard'
)
ON CONFLICT DO NOTHING;
