-- ============================================================
-- 018_parts_commerce_platform.sql — Alkota UK Parts & Attachments Commerce Platform
-- Run in Supabase SQL Editor
-- ============================================================

-- ─── 1. EXTEND / ENHANCE PART CATEGORIES TABLE (HIERARCHY & SEO) ─────────────
ALTER TABLE IF EXISTS part_categories
  ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES part_categories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS level integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS meta_title text,
  ADD COLUMN IF NOT EXISTS meta_description text,
  ADD COLUMN IF NOT EXISTS canonical_url text,
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS part_categories_parent_idx ON part_categories(parent_id);
CREATE INDEX IF NOT EXISTS part_categories_level_idx ON part_categories(level);

-- ─── 2. SUPPLIERS TABLE ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                text NOT NULL UNIQUE,
  name                text NOT NULL,
  code                text, -- e.g. 'DP', 'FJ', 'EE', 'GS', 'ST'
  supplier_type       text NOT NULL DEFAULT 'wholesaler' CHECK (supplier_type IN ('manufacturer', 'wholesaler', 'distributor', 'importer')),
  account_number      text,
  contact_name        text,
  email               text,
  phone               text,
  website_url         text,
  portal_url          text,
  default_margin_pct  decimal(5,2) NOT NULL DEFAULT 35.00,
  feed_type           text NOT NULL DEFAULT 'manual' CHECK (feed_type IN ('api', 'xml', 'csv', 'manual')),
  feed_url            text,
  last_sync_at        timestamptz,
  notes               text,
  active              boolean NOT NULL DEFAULT true,
  sort_order          integer NOT NULL DEFAULT 0,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active suppliers" ON suppliers;
CREATE POLICY "Public can read active suppliers" ON suppliers FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role full access suppliers" ON suppliers;
CREATE POLICY "Service role full access suppliers" ON suppliers FOR ALL USING (true);

-- ─── 3. EXTEND PARTS TABLE (COMMERCE, PRICING & ATTRIBUTES) ──────────────────
ALTER TABLE IF EXISTS parts
  ADD COLUMN IF NOT EXISTS sku                   text,
  ADD COLUMN IF NOT EXISTS mpn                   text, -- Manufacturer Part Number
  ADD COLUMN IF NOT EXISTS subcategory           text,
  ADD COLUMN IF NOT EXISTS cost_price            decimal(10,2),
  ADD COLUMN IF NOT EXISTS trade_price           decimal(10,2),
  ADD COLUMN IF NOT EXISTS rrp_price             decimal(10,2),
  ADD COLUMN IF NOT EXISTS margin_override_pct   decimal(5,2),
  ADD COLUMN IF NOT EXISTS vat_rate              decimal(4,2) NOT NULL DEFAULT 0.20,
  ADD COLUMN IF NOT EXISTS stock_type            text NOT NULL DEFAULT 'direct_stock' 
    CHECK (stock_type IN ('direct_stock', 'supplier_stock', 'made_to_order', 'special_order', 'discontinued')),
  ADD COLUMN IF NOT EXISTS stock_quantity        integer NOT NULL DEFAULT 10,
  ADD COLUMN IF NOT EXISTS supplier_stock_qty    integer,
  ADD COLUMN IF NOT EXISTS lead_time_days        integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS preferred_supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS dimensions_cm         text,
  ADD COLUMN IF NOT EXISTS specifications        jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS included_items        text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS accessory_part_ids    text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS replacement_part_ids  text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS related_part_ids      text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS meta_keywords         text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS canonical_url         text,
  ADD COLUMN IF NOT EXISTS is_indexable          boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS discontinued          boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_supplier_sync    timestamptz,
  ADD COLUMN IF NOT EXISTS last_price_update     timestamptz DEFAULT now();

CREATE INDEX IF NOT EXISTS parts_mpn_idx ON parts(mpn);
CREATE INDEX IF NOT EXISTS parts_sku_idx ON parts(sku);
CREATE INDEX IF NOT EXISTS parts_stock_type_idx ON parts(stock_type);

-- ─── 4. MULTI-SUPPLIER PRODUCT MAPPING ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS supplier_products (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id             uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  supplier_id         uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  supplier_sku        text NOT NULL,
  supplier_title      text,
  cost_price          decimal(10,2) NOT NULL,
  stock_quantity      integer DEFAULT 0,
  in_stock            boolean NOT NULL DEFAULT true,
  lead_time_days      integer NOT NULL DEFAULT 1,
  min_order_qty       integer NOT NULL DEFAULT 1,
  is_preferred        boolean NOT NULL DEFAULT false,
  product_url         text,
  last_synced_at      timestamptz NOT NULL DEFAULT now(),
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT supplier_product_unique UNIQUE(supplier_id, supplier_sku)
);

ALTER TABLE supplier_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read supplier products" ON supplier_products;
CREATE POLICY "Public can read supplier products" ON supplier_products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role full access supplier products" ON supplier_products;
CREATE POLICY "Service role full access supplier products" ON supplier_products FOR ALL USING (true);

-- ─── 5. MACHINE FAMILIES & MODELS ARCHITECTURE ────────────────────────────────
CREATE TABLE IF NOT EXISTS machine_families (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                text NOT NULL UNIQUE,
  name                text NOT NULL,
  manufacturer        text NOT NULL DEFAULT 'Alkota',
  description         text,
  image_url           text,
  sort_order          integer NOT NULL DEFAULT 0,
  active              boolean NOT NULL DEFAULT true,
  created_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE machine_families ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active machine families" ON machine_families;
CREATE POLICY "Public can read active machine families" ON machine_families FOR SELECT USING (active = true);

CREATE TABLE IF NOT EXISTS machine_models (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id           uuid REFERENCES machine_families(id) ON DELETE SET NULL,
  slug                text NOT NULL UNIQUE,
  model_code          text NOT NULL,
  name                text NOT NULL,
  manufacturer        text NOT NULL DEFAULT 'Alkota',
  series              text,
  pressure_psi        integer,
  flow_gpm            decimal(4,2),
  flow_lpm            decimal(5,2),
  power_source        text,
  heating_type        text,
  specs_summary       text,
  image_url           text,
  manual_pdf_url      text,
  schematic_pdf_url   text,
  sort_order          integer NOT NULL DEFAULT 0,
  active              boolean NOT NULL DEFAULT true,
  created_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE machine_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active machine models" ON machine_models;
CREATE POLICY "Public can read active machine models" ON machine_models FOR SELECT USING (active = true);

-- ─── 6. APPLICATIONS & PART APPLICATION MAPPINGS ─────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                text NOT NULL UNIQUE,
  name                text NOT NULL,
  tagline             text,
  hero_image_url      text,
  editorial_intro     text,
  buying_guidance     text,
  recommended_specs   text,
  faqs                jsonb DEFAULT '[]'::jsonb,
  sort_order          integer NOT NULL DEFAULT 0,
  active              boolean NOT NULL DEFAULT true,
  meta_title          text,
  meta_description    text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active applications" ON applications;
CREATE POLICY "Public can read active applications" ON applications FOR SELECT USING (active = true);

CREATE TABLE IF NOT EXISTS part_applications (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id             uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  application_id      uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  is_primary          boolean NOT NULL DEFAULT false,
  notes               text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT part_application_unique UNIQUE(part_id, application_id)
);

ALTER TABLE part_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read part applications" ON part_applications;
CREATE POLICY "Public can read part applications" ON part_applications FOR SELECT USING (true);

-- ─── 7. STAGED SUPPLIER PRODUCTS (IMPORT & DUPLICATE PIPELINE) ───────────────
CREATE TABLE IF NOT EXISTS staged_supplier_products (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id         uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  supplier_sku        text NOT NULL,
  raw_title           text NOT NULL,
  raw_description     text,
  raw_category        text,
  raw_brand           text,
  cost_price          decimal(10,2) NOT NULL,
  stock_quantity      integer DEFAULT 0,
  in_stock            boolean NOT NULL DEFAULT true,
  suggested_category  text,
  suggested_brand     text,
  matched_part_id     uuid REFERENCES parts(id) ON DELETE SET NULL,
  match_confidence    decimal(4,2),
  match_reason        text,
  import_status       text NOT NULL DEFAULT 'pending' 
    CHECK (import_status IN ('pending', 'matched_duplicate', 'new_product', 'imported', 'ignored', 'rejected')),
  raw_payload         jsonb DEFAULT '{}'::jsonb,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE staged_supplier_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role access staged products" ON staged_supplier_products;
CREATE POLICY "Service role access staged products" ON staged_supplier_products FOR ALL USING (true);

-- ─── 8. PARTS ENQUIRIES & PARTS FINDER CRM ────────────────────────────────────
CREATE TABLE IF NOT EXISTS parts_enquiries (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_number      text NOT NULL UNIQUE,
  customer_name       text NOT NULL,
  company_name        text,
  email               text NOT NULL,
  phone               text,
  postcode            text,
  machine_model       text,
  serial_number       text,
  component_type      text,
  part_number_known   text,
  urgency             text NOT NULL DEFAULT 'standard' 
    CHECK (urgency IN ('emergency_breakdown', 'urgent', 'standard', 'planned_maintenance')),
  description         text,
  photo_urls          text[] DEFAULT '{}',
  basket_items        jsonb DEFAULT '[]'::jsonb,
  status              text NOT NULL DEFAULT 'new' 
    CHECK (status IN ('new', 'investigating', 'quoted', 'awaiting_customer', 'converted_to_order', 'closed')),
  internal_notes      text,
  quote_amount        decimal(10,2),
  assigned_to         text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE parts_enquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can create parts enquiries" ON parts_enquiries;
CREATE POLICY "Public can create parts enquiries" ON parts_enquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Service role manage parts enquiries" ON parts_enquiries;
CREATE POLICY "Service role manage parts enquiries" ON parts_enquiries FOR ALL USING (true);

-- ─── 9. SEARCH ANALYTICS & ZERO-RESULT TRACKING ──────────────────────────────
CREATE TABLE IF NOT EXISTS search_analytics (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query               text NOT NULL,
  filters             jsonb DEFAULT '{}'::jsonb,
  results_count       integer NOT NULL DEFAULT 0,
  is_zero_result      boolean NOT NULL DEFAULT false,
  user_ip_hash        text,
  user_agent          text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert search analytics" ON search_analytics;
CREATE POLICY "Public can insert search analytics" ON search_analytics FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Service role access search analytics" ON search_analytics;
CREATE POLICY "Service role access search analytics" ON search_analytics FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS search_analytics_query_idx ON search_analytics(query);
CREATE INDEX IF NOT EXISTS search_analytics_zero_idx ON search_analytics(is_zero_result) WHERE is_zero_result = true;
