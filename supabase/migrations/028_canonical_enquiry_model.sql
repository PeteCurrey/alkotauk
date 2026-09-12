-- ============================================================
-- 028_canonical_enquiry_model.sql
-- Alkota UK — Minimal Canonical Enquiry & Machine Data Model
-- Phase 7.0
--
-- Safely extends the canonical 'enquiries' table with structured
-- commercial, selection, requirements, and revalidation columns,
-- and creates the normalised 'enquiry_machines' relationship table.
--
-- Safe to run on existing production: IF NOT EXISTS throughout.
-- ============================================================

-- ─── 1. EXTEND CANONICAL ENQUIRIES TABLE ─────────────────────────────────────
ALTER TABLE enquiries
  -- Commercial Source & Context
  ADD COLUMN IF NOT EXISTS source                        text DEFAULT 'GENERAL',
  ADD COLUMN IF NOT EXISTS enquiry_context               text DEFAULT 'GENERAL_ENQUIRY',
  
  -- Customer & Site Readiness (Promoted from metadata for direct reporting)
  ADD COLUMN IF NOT EXISTS postcode                      text,
  ADD COLUMN IF NOT EXISTS preferred_contact_method      text DEFAULT 'either',
  ADD COLUMN IF NOT EXISTS site_power                    text,
  ADD COLUMN IF NOT EXISTS site_water                    text,
  
  -- Structured Selector Requirements (Option C: Minimal Hybrid)
  ADD COLUMN IF NOT EXISTS req_application               text,
  ADD COLUMN IF NOT EXISTS req_water_type                text,
  ADD COLUMN IF NOT EXISTS req_min_pressure_bar          integer,
  ADD COLUMN IF NOT EXISTS req_min_flow_lpm              numeric,
  ADD COLUMN IF NOT EXISTS req_power_source              text,
  ADD COLUMN IF NOT EXISTS req_voltage                   text,
  ADD COLUMN IF NOT EXISTS req_phase                     text,
  ADD COLUMN IF NOT EXISTS req_mobility                  text,
  ADD COLUMN IF NOT EXISTS requirements                  jsonb DEFAULT '{}'::jsonb,
  
  -- Deterministic Selection Outcome & Engine Version
  ADD COLUMN IF NOT EXISTS selector_version              text,
  ADD COLUMN IF NOT EXISTS selection_outcome             text,
  
  -- Server Revalidation & Anti-Spoofing Audit Trail
  ADD COLUMN IF NOT EXISTS revalidation_status           text DEFAULT 'VALID',
  ADD COLUMN IF NOT EXISTS discrepancy_detected          boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS discrepancy_details           text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS requires_human_confirmation   boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS unknown_criteria              text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS confirmation_items            text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS revalidated_at                timestamptz,
  
  -- Dealer Attribution (Future-Proof FK)
  ADD COLUMN IF NOT EXISTS dealer_id                     uuid REFERENCES dealers(id) ON DELETE SET NULL;

-- ─── 2. UPDATE/ADD CONSTRAINTS ON ENQUIRIES ──────────────────────────────────
DO $$
BEGIN
  -- Safe status constraint update
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'enquiries'::regclass AND conname = 'enquiries_status_check'
  ) THEN
    ALTER TABLE enquiries DROP CONSTRAINT enquiries_status_check;
  END IF;

  ALTER TABLE enquiries ADD CONSTRAINT enquiries_status_check
    CHECK (status IN (
      'new', 'acknowledged', 'contacted', 'qualifying', 'quoting', 'won', 'lost', 'closed',
      -- Legacy compatibility
      'read', 'responded', 'in-progress', 'archived'
    ));

  -- Source constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'enquiries'::regclass AND conname = 'enquiries_source_check'
  ) THEN
    ALTER TABLE enquiries ADD CONSTRAINT enquiries_source_check
      CHECK (source IN (
        'MACHINE_DETAIL',
        'MACHINE_SELECTOR',
        'MACHINE_COMPARISON',
        'MACHINE_CATALOGUE',
        'PARTS',
        'ATTACHMENTS',
        'CHEMICALS',
        'DEALER',
        'GENERAL'
      ));
  END IF;

  -- Enquiry context constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'enquiries'::regclass AND conname = 'enquiries_context_check'
  ) THEN
    ALTER TABLE enquiries ADD CONSTRAINT enquiries_context_check
      CHECK (enquiry_context IN (
        'DIRECT_MACHINE',
        'MACHINE_SELECTION',
        'MACHINE_COMPARISON',
        'GENERAL_PRODUCT',
        'GENERAL_ENQUIRY'
      ));
  END IF;

  -- Selection outcome constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'enquiries'::regclass AND conname = 'enquiries_selection_outcome_check'
  ) THEN
    ALTER TABLE enquiries ADD CONSTRAINT enquiries_selection_outcome_check
      CHECK (selection_outcome IS NULL OR selection_outcome IN (
        'STRONG_MATCH',
        'POSSIBLE_MATCH',
        'NO_VERIFIED_MATCH',
        'DOES_NOT_MEET',
        'NOT_APPLICABLE'
      ));
  END IF;

  -- Revalidation status constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'enquiries'::regclass AND conname = 'enquiries_revalidation_status_check'
  ) THEN
    ALTER TABLE enquiries ADD CONSTRAINT enquiries_revalidation_status_check
      CHECK (revalidation_status IN ('VALID', 'DISCREPANCY_DETECTED', 'SKIPPED'));
  END IF;
END
$$;

-- ─── 3. CREATE ENQUIRY_MACHINES RELATIONSHIP TABLE ───────────────────────────
CREATE TABLE IF NOT EXISTS enquiry_machines (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id              uuid NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  machine_id              text NOT NULL, -- Canonical identifier or product slug
  product_id              uuid REFERENCES products(id) ON DELETE SET NULL,

  -- Historical Snapshots (resilience if catalog names/slugs evolve)
  model_code_snapshot     text NOT NULL,
  machine_name_snapshot   text NOT NULL,
  slug_snapshot           text NOT NULL,
  category_snapshot       text NOT NULL,

  -- Commercial Role & Ordering
  role                    text NOT NULL DEFAULT 'PRIMARY'
    CHECK (role IN ('PRIMARY', 'SHORTLIST', 'COMPARISON', 'SELECTED')),
  display_order           integer NOT NULL DEFAULT 0,

  -- Machine-Level Deterministic Outcome
  selection_status        text
    CHECK (selection_status IS NULL OR selection_status IN (
      'STRONG_MATCH', 'POSSIBLE_MATCH', 'DOES_NOT_MEET', 'NOT_APPLICABLE'
    )),

  -- Reasoning & Audit Details
  match_reasons           text[] DEFAULT '{}',
  unknown_criteria        text[] DEFAULT '{}',
  failure_reasons         text[] DEFAULT '{}',

  -- Minimal Verified Technical Snapshot (pressure, flow, power, voltage, phase)
  specs_snapshot          jsonb DEFAULT '{}'::jsonb,

  created_at              timestamptz NOT NULL DEFAULT now()
);

-- ─── 4. ROW LEVEL SECURITY (RLS) ─────────────────────────────────────────────
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_machines ENABLE ROW LEVEL SECURITY;

-- Enquiries: public may create; service role has full access; anonymous users cannot read
DROP POLICY IF EXISTS "Public can create enquiries" ON enquiries;
CREATE POLICY "Public can create enquiries" ON enquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can modify enquiries" ON enquiries;
CREATE POLICY "Service role can modify enquiries" ON enquiries FOR ALL USING (true);

-- Enquiry Machines: public may insert child records; service role has full access
DROP POLICY IF EXISTS "Public can create enquiry_machines" ON enquiry_machines;
CREATE POLICY "Public can create enquiry_machines" ON enquiry_machines FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can modify enquiry_machines" ON enquiry_machines;
CREATE POLICY "Service role can modify enquiry_machines" ON enquiry_machines FOR ALL USING (true);

-- ─── 5. INDEXES FOR PERFORMANCE & REPORTING ──────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_source ON enquiries(source);
CREATE INDEX IF NOT EXISTS idx_enquiries_context ON enquiries(enquiry_context);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_reference ON enquiries(reference);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_req_app ON enquiries(req_application) WHERE req_application IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_enquiries_dealer ON enquiries(dealer_id) WHERE dealer_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_enquiry_machines_enquiry_id ON enquiry_machines(enquiry_id);
CREATE INDEX IF NOT EXISTS idx_enquiry_machines_machine_id ON enquiry_machines(machine_id);
CREATE INDEX IF NOT EXISTS idx_enquiry_machines_product_id ON enquiry_machines(product_id) WHERE product_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_enquiry_machines_model ON enquiry_machines(model_code_snapshot);
CREATE INDEX IF NOT EXISTS idx_enquiry_machines_role ON enquiry_machines(role);
CREATE INDEX IF NOT EXISTS idx_enquiry_machines_status ON enquiry_machines(selection_status) WHERE selection_status IS NOT NULL;
