-- ============================================================
-- 026_supplier_catalogue_pipeline.sql
-- Alkota UK — Supplier Catalogue Pipeline, Audit Logging & Provenance
-- Dual Pumps Ltd & Steel Eagle USA Architecture
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. PART AUDIT LOG (CHANGE HISTORY & TRACEABILITY)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS part_audit_log (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id        uuid REFERENCES parts(id) ON DELETE CASCADE,
  part_number    text NOT NULL,
  action         text NOT NULL, -- e.g. 'price_update', 'cost_update', 'stock_update', 'supplier_sync', 'manual_override', 'published', 'archived'
  changed_field  text NOT NULL,
  old_value      text,
  new_value      text,
  changed_by     text NOT NULL DEFAULT 'system',
  source         text, -- e.g. 'Dual Pumps Import Batch DP-2026-09-001', 'Admin Studio'
  notes          text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE part_audit_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access part_audit_log" ON part_audit_log;
CREATE POLICY "Service role full access part_audit_log" ON part_audit_log FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS part_audit_log_part_id_idx ON part_audit_log(part_id, created_at DESC);
CREATE INDEX IF NOT EXISTS part_audit_log_part_number_idx ON part_audit_log(part_number);
CREATE INDEX IF NOT EXISTS part_audit_log_action_idx ON part_audit_log(action);

-- ─────────────────────────────────────────────────────────────
-- 2. SUPPLIER CATEGORY MAPPINGS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS supplier_category_mappings (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id          uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  raw_category         text NOT NULL,
  alkota_category_slug text REFERENCES part_categories(slug) ON DELETE SET NULL,
  alkota_subcategory  text,
  is_verified          boolean NOT NULL DEFAULT false,
  verified_by          text,
  notes                text,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT supplier_raw_category_unique UNIQUE(supplier_id, raw_category)
);

ALTER TABLE supplier_category_mappings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access supplier_category_mappings" ON supplier_category_mappings;
CREATE POLICY "Service role full access supplier_category_mappings" ON supplier_category_mappings FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS scm_supplier_idx ON supplier_category_mappings(supplier_id);
CREATE INDEX IF NOT EXISTS scm_alkota_slug_idx ON supplier_category_mappings(alkota_category_slug);

-- ─────────────────────────────────────────────────────────────
-- 3. EXTEND PARTS (PROVENANCE, OVERRIDES, PUBLICATION STATUS)
-- ─────────────────────────────────────────────────────────────
ALTER TABLE parts
  ADD COLUMN IF NOT EXISTS source_type            text DEFAULT 'manual'
    CHECK (source_type IN ('manual', 'manufacturer_catalogue', 'supplier_feed', 'spec_sheet', 'pdf_extract', 'seed_v2', 'supplier_import')),
  ADD COLUMN IF NOT EXISTS source_url             text,
  ADD COLUMN IF NOT EXISTS source_document        text,
  ADD COLUMN IF NOT EXISTS source_reference       text,
  ADD COLUMN IF NOT EXISTS source_last_checked    timestamptz,
  ADD COLUMN IF NOT EXISTS source_version         text,
  ADD COLUMN IF NOT EXISTS manual_override_fields text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS publication_status     text DEFAULT 'draft'
    CHECK (publication_status IN ('draft', 'needs_review', 'ready', 'published', 'request_availability', 'request_quote', 'out_of_stock', 'discontinued', 'superseded', 'archived'));

CREATE INDEX IF NOT EXISTS parts_publication_status_idx ON parts(publication_status);
CREATE INDEX IF NOT EXISTS parts_source_type_idx ON parts(source_type);

-- Backfill publication_status for existing active parts
UPDATE parts
SET publication_status = CASE
  WHEN active = true AND price IS NOT NULL AND price > 0 THEN 'published'
  WHEN active = true AND (price IS NULL OR price <= 0) THEN 'request_availability'
  WHEN discontinued = true THEN 'discontinued'
  ELSE 'draft'
END
WHERE publication_status = 'draft' OR publication_status IS NULL;

-- ─────────────────────────────────────────────────────────────
-- 4. EXTEND STAGED SUPPLIER PRODUCTS
-- ─────────────────────────────────────────────────────────────
ALTER TABLE staged_supplier_products
  ADD COLUMN IF NOT EXISTS provenance        jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS source_reference text,
  ADD COLUMN IF NOT EXISTS source_document  text,
  ADD COLUMN IF NOT EXISTS spn              text, -- Explicit Supplier Part Number
  ADD COLUMN IF NOT EXISTS raw_specs        jsonb DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS staged_spn_idx ON staged_supplier_products(spn);
CREATE INDEX IF NOT EXISTS staged_mpn_idx ON staged_supplier_products(mpn);

-- ─────────────────────────────────────────────────────────────
-- 5. EXTEND PART MACHINE COMPATIBILITY
-- ─────────────────────────────────────────────────────────────
ALTER TABLE part_machine_compatibility
  ADD COLUMN IF NOT EXISTS compatibility_status text DEFAULT 'confirmed'
    CHECK (compatibility_status IN ('confirmed', 'unconfirmed', 'unknown')),
  ADD COLUMN IF NOT EXISTS source_reference    text;

-- ─────────────────────────────────────────────────────────────
-- 6. EXTEND IMPORT BATCHES
-- ─────────────────────────────────────────────────────────────
ALTER TABLE import_batches
  ADD COLUMN IF NOT EXISTS records_received   integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS records_valid      integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS records_invalid    integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS records_duplicates integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS records_new        integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS records_review     integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS records_approved   integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS records_published  integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS records_rejected   integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS source_version     text,
  ADD COLUMN IF NOT EXISTS source_document    text;

-- ─────────────────────────────────────────────────────────────
-- 7. SEED INITIAL AUTHORITATIVE SUPPLIERS
-- ─────────────────────────────────────────────────────────────
INSERT INTO suppliers (
  slug,
  name,
  code,
  supplier_type,
  account_number,
  contact_name,
  email,
  phone,
  website_url,
  portal_url,
  default_margin_pct,
  integration_method,
  notes,
  active,
  sort_order
)
VALUES
  (
    'dual-pumps-uk',
    'Dual Pumps Ltd',
    'DP',
    'distributor',
    'ALK-DP-01',
    'Trade Support Team',
    'sales@dualpumps.co.uk',
    '01664 567226',
    'https://dualpumps.co.uk',
    'https://dualpumps.co.uk/trade-login',
    35.00,
    'csv',
    'Authorised UK master distributor of Interpump, PA, Hawk, Annovi Reverberi, and Steel Eagle surface cleaners. Also manufactures UK high-pressure manifolds, hose reels, and 12V/240V fuel transfer pumps.',
    true,
    1
  ),
  (
    'steel-eagle-direct',
    'Steel Eagle USA',
    'SE',
    'manufacturer',
    'ALK-SE-01',
    'International OEM Sales',
    'sales@steeleagle.com',
    '+1 724 583 0100',
    'https://steeleagle.com',
    NULL,
    40.00,
    'manual',
    'World leading manufacturer of commercial rotary surface cleaners, deck cleaners, and undercarriage spray systems. Uniontown, PA, USA.',
    true,
    2
  )
ON CONFLICT (slug) DO UPDATE
  SET name               = EXCLUDED.name,
      code               = EXCLUDED.code,
      supplier_type      = EXCLUDED.supplier_type,
      default_margin_pct = EXCLUDED.default_margin_pct,
      website_url        = EXCLUDED.website_url,
      notes              = EXCLUDED.notes;

-- ─────────────────────────────────────────────────────────────
-- 8. SEED SUPPLIER CATEGORY MAPPINGS
-- ─────────────────────────────────────────────────────────────
DO $$
DECLARE
  dp_id uuid;
  se_id uuid;
BEGIN
  SELECT id INTO dp_id FROM suppliers WHERE slug = 'dual-pumps-uk';
  SELECT id INTO se_id FROM suppliers WHERE slug = 'steel-eagle-direct';

  -- Dual Pumps Mappings
  IF dp_id IS NOT NULL THEN
    INSERT INTO supplier_category_mappings (supplier_id, raw_category, alkota_category_slug, alkota_subcategory, is_verified)
    VALUES
      (dp_id, 'High Pressure Plunger Pumps', 'pumps', 'complete-pumps', true),
      (dp_id, 'Pump Repair & Seal Kits', 'seals-o-rings', 'seal-kits', true),
      (dp_id, 'Unloader Valves & Regulators', 'valves-unloaders', 'unloaders', true),
      (dp_id, 'Bypass Manifolds & Safety Valves', 'valves-unloaders', 'valves', true),
      (dp_id, 'High Pressure Hoses & Assemblies', 'hoses', 'high-pressure-hoses', true),
      (dp_id, 'Manual & Industrial Hose Reels', 'hoses', 'hose-reels', true),
      (dp_id, 'Trigger Guns & Spray Lances', 'trigger-guns', 'guns', true),
      (dp_id, 'Spray Nozzles & Quick Couplers', 'lances-nozzles', 'nozzles', true),
      (dp_id, 'Rotary Flat Surface Cleaners', 'surface-cleaners', 'surface-cleaners', true),
      (dp_id, 'Fuel Transfer & DC Pumps', 'engines-motors', 'motors', true),
      (dp_id, 'Pressure Gauges & Instrumentation', 'electrical-switches', 'controls', true),
      (dp_id, 'Chemical Injectors & Foam Equipment', 'attachments', 'attachments', true),
      (dp_id, 'Inlet Water Filtration', 'filters', 'filters', true)
    ON CONFLICT (supplier_id, raw_category) DO UPDATE
      SET alkota_category_slug = EXCLUDED.alkota_category_slug,
          alkota_subcategory   = EXCLUDED.alkota_subcategory,
          is_verified          = EXCLUDED.is_verified;
  END IF;

  -- Steel Eagle Mappings
  IF se_id IS NOT NULL THEN
    INSERT INTO supplier_category_mappings (supplier_id, raw_category, alkota_category_slug, alkota_subcategory, is_verified)
    VALUES
      (se_id, 'Rotary Surface Cleaners', 'surface-cleaners', 'surface-cleaners', true),
      (se_id, 'Vacuum Recovery Surface Cleaners', 'surface-cleaners', 'surface-cleaners', true),
      (se_id, 'Undercarriage Cleaners', 'surface-cleaners', 'surface-cleaners', true),
      (se_id, 'Spray Bars & Road Cleaners', 'lances-nozzles', 'lances', true),
      (se_id, 'Rotary Swivel Unions & Kits', 'fittings-couplers', 'fittings', true),
      (se_id, 'Replacement Decks & Casters', 'surface-cleaners', 'accessories', true)
    ON CONFLICT (supplier_id, raw_category) DO UPDATE
      SET alkota_category_slug = EXCLUDED.alkota_category_slug,
          alkota_subcategory   = EXCLUDED.alkota_subcategory,
          is_verified          = EXCLUDED.is_verified;
  END IF;
END $$;
