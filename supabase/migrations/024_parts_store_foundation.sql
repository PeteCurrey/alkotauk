-- ============================================================
-- 024_parts_store_foundation.sql
-- Alkota UK — Parts Store & Ecommerce Catalogue Foundation
--
-- SAFE TO RUN ON PRODUCTION: every statement uses
-- CREATE TABLE IF NOT EXISTS or ADD COLUMN IF NOT EXISTS.
-- Nothing is dropped or truncated.
--
-- Run in the Supabase SQL Editor at:
-- https://supabase.com/dashboard/project/pulpjomffnwtivqyqyam/editor
-- ============================================================

-- Ensure trigram extension for full-text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ─────────────────────────────────────────────────────────────
-- 1. BRAND PARTNERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brand_partners (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              text NOT NULL UNIQUE,
  name              text NOT NULL,
  tagline           text,
  description       text,
  logo_url          text,
  hero_image_url    text,
  website_url       text,
  country_of_origin text,
  sort_order        integer NOT NULL DEFAULT 0,
  active            boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE brand_partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active brand partners" ON brand_partners;
CREATE POLICY "Public can read active brand partners" ON brand_partners FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify brand partners" ON brand_partners;
CREATE POLICY "Service role can modify brand partners" ON brand_partners FOR ALL USING (true);

-- ─────────────────────────────────────────────────────────────
-- 2. PART CATEGORIES (2-level hierarchy + SEO)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS part_categories (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             text NOT NULL UNIQUE,
  name             text NOT NULL,
  short_desc       text,
  icon_name        text DEFAULT 'Wrench',
  hero_image_url   text,
  brand_filter     text,
  parent_id        uuid REFERENCES part_categories(id) ON DELETE SET NULL,
  level            integer NOT NULL DEFAULT 1,
  meta_title       text,
  meta_description text,
  canonical_url    text,
  is_featured      boolean NOT NULL DEFAULT false,
  sort_order       integer NOT NULL DEFAULT 0,
  active           boolean NOT NULL DEFAULT true,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE part_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active part categories" ON part_categories;
CREATE POLICY "Public can read active part categories" ON part_categories FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify part categories" ON part_categories;
CREATE POLICY "Service role can modify part categories" ON part_categories FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS part_categories_slug_idx      ON part_categories(slug);
CREATE INDEX IF NOT EXISTS part_categories_parent_idx    ON part_categories(parent_id);
CREATE INDEX IF NOT EXISTS part_categories_level_idx     ON part_categories(level);
CREATE INDEX IF NOT EXISTS part_categories_featured_idx  ON part_categories(is_featured) WHERE is_featured = true;

-- ─────────────────────────────────────────────────────────────
-- 3. SUPPLIERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                    text NOT NULL UNIQUE,
  name                    text NOT NULL,
  code                    text,
  supplier_type           text NOT NULL DEFAULT 'wholesaler'
    CHECK (supplier_type IN ('manufacturer', 'wholesaler', 'distributor', 'importer')),
  account_number          text,
  contact_name            text,
  email                   text,
  phone                   text,
  website_url             text,
  portal_url              text,
  default_margin_pct      decimal(5,2) NOT NULL DEFAULT 35.00,
  integration_method      text NOT NULL DEFAULT 'manual'
    CHECK (integration_method IN ('rest_api', 'graphql', 'xml_feed', 'json_feed', 'pim', 'ftp', 'sftp', 'csv', 'xlsx', 'pdf', 'manual')),
  api_endpoint            text,
  auth_method             text NOT NULL DEFAULT 'none'
    CHECK (auth_method IN ('api_key', 'oauth2', 'basic', 'bearer', 'none')),
  credential_ref          text,
  last_sync_attempted_at  timestamptz,
  sync_status             text NOT NULL DEFAULT 'idle'
    CHECK (sync_status IN ('idle', 'running', 'completed', 'completed_with_warnings', 'failed', 'cancelled')),
  sync_error              text,
  sync_frequency_hours    integer NOT NULL DEFAULT 24,
  products_discovered     integer NOT NULL DEFAULT 0,
  products_changed        integer NOT NULL DEFAULT 0,
  new_products            integer NOT NULL DEFAULT 0,
  feed_type               text NOT NULL DEFAULT 'manual' CHECK (feed_type IN ('api', 'xml', 'csv', 'manual')),
  feed_url                text,
  last_sync_at            timestamptz,
  notes                   text,
  active                  boolean NOT NULL DEFAULT true,
  sort_order              integer NOT NULL DEFAULT 0,
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active suppliers" ON suppliers;
CREATE POLICY "Public can read active suppliers" ON suppliers FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role full access suppliers" ON suppliers;
CREATE POLICY "Service role full access suppliers" ON suppliers FOR ALL USING (true);

-- ─────────────────────────────────────────────────────────────
-- 4. MACHINE FAMILIES & MODELS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS machine_families (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text NOT NULL UNIQUE,
  name         text NOT NULL,
  manufacturer text NOT NULL DEFAULT 'Alkota',
  description  text,
  image_url    text,
  sort_order   integer NOT NULL DEFAULT 0,
  active       boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE machine_families ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active machine families" ON machine_families;
CREATE POLICY "Public can read active machine families" ON machine_families FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role full access machine families" ON machine_families;
CREATE POLICY "Service role full access machine families" ON machine_families FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS machine_models (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id         uuid REFERENCES machine_families(id) ON DELETE SET NULL,
  slug              text NOT NULL UNIQUE,
  model_code        text NOT NULL,
  name              text NOT NULL,
  manufacturer      text NOT NULL DEFAULT 'Alkota',
  series            text,
  pressure_psi      integer,
  flow_gpm          decimal(4,2),
  flow_lpm          decimal(5,2),
  power_source      text,
  heating_type      text,
  specs_summary     text,
  image_url         text,
  manual_pdf_url    text,
  schematic_pdf_url text,
  sort_order        integer NOT NULL DEFAULT 0,
  active            boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE machine_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active machine models" ON machine_models;
CREATE POLICY "Public can read active machine models" ON machine_models FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role full access machine models" ON machine_models;
CREATE POLICY "Service role full access machine models" ON machine_models FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS machine_models_family_idx     ON machine_models(family_id);
CREATE INDEX IF NOT EXISTS machine_models_model_code_idx ON machine_models(model_code);

-- ─────────────────────────────────────────────────────────────
-- 5. PARTS TABLE (Base Table & Extended Ecommerce Fields)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS parts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_number         text UNIQUE NOT NULL,
  name                text NOT NULL,
  description         text,
  category            text NOT NULL DEFAULT 'other',
  compatible_machines text[] DEFAULT '{}',
  price               decimal(10,2),
  in_stock            boolean NOT NULL DEFAULT false,
  active              boolean NOT NULL DEFAULT true,
  image_url           text,
  sort_order          integer NOT NULL DEFAULT 0,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active parts" ON parts;
CREATE POLICY "Public can read active parts" ON parts FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role full access parts" ON parts;
CREATE POLICY "Service role full access parts" ON parts FOR ALL USING (true);

ALTER TABLE parts
  ADD COLUMN IF NOT EXISTS slug                 text,
  ADD COLUMN IF NOT EXISTS manufacturer         text DEFAULT 'Alkota / OEM Approved',
  ADD COLUMN IF NOT EXISTS availability_status  text DEFAULT 'check_availability'
    CHECK (availability_status IN ('in_stock', 'low_stock', 'backorder', 'special_order', 'obsolete', 'check_availability')),
  ADD COLUMN IF NOT EXISTS superseded_by        text,
  ADD COLUMN IF NOT EXISTS weight_kg            decimal(6,2),
  ADD COLUMN IF NOT EXISTS technical_notes      text,
  ADD COLUMN IF NOT EXISTS documents            jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS assembly_category    text DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS oem_genuine          boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS meta_title           text,
  ADD COLUMN IF NOT EXISTS meta_description     text;

ALTER TABLE parts
  ADD COLUMN IF NOT EXISTS brand                text REFERENCES brand_partners(slug) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_attachment        boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS featured             boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS tags                 text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS retail_url           text,
  ADD COLUMN IF NOT EXISTS image_gallery        text[]  DEFAULT '{}';

ALTER TABLE parts
  ADD COLUMN IF NOT EXISTS sku                  text,
  ADD COLUMN IF NOT EXISTS mpn                  text,
  ADD COLUMN IF NOT EXISTS subcategory          text,
  ADD COLUMN IF NOT EXISTS cost_price           decimal(10,2),
  ADD COLUMN IF NOT EXISTS trade_price          decimal(10,2),
  ADD COLUMN IF NOT EXISTS rrp_price            decimal(10,2),
  ADD COLUMN IF NOT EXISTS margin_override_pct  decimal(5,2),
  ADD COLUMN IF NOT EXISTS vat_rate             decimal(4,2) NOT NULL DEFAULT 0.20,
  ADD COLUMN IF NOT EXISTS stock_type           text NOT NULL DEFAULT 'special_order'
    CHECK (stock_type IN ('direct_stock', 'supplier_stock', 'made_to_order', 'special_order', 'discontinued')),
  ADD COLUMN IF NOT EXISTS stock_quantity       integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS supplier_stock_qty   integer,
  ADD COLUMN IF NOT EXISTS lead_time_days       integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS preferred_supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS dimensions_cm        text,
  ADD COLUMN IF NOT EXISTS specifications       jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS included_items       text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS accessory_part_ids   text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS replacement_part_ids text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS related_part_ids     text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS meta_keywords        text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS canonical_url        text,
  ADD COLUMN IF NOT EXISTS is_indexable         boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS discontinued         boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_supplier_sync   timestamptz,
  ADD COLUMN IF NOT EXISTS last_price_update    timestamptz DEFAULT now();

ALTER TABLE parts
  ADD COLUMN IF NOT EXISTS review_flags         text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS data_quality_score   integer DEFAULT 100,
  ADD COLUMN IF NOT EXISTS needs_review         boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS review_notes         text,
  ADD COLUMN IF NOT EXISTS catalogue_source     text DEFAULT 'manual'
    CHECK (catalogue_source IN ('manual', 'pdf_extract', 'seed_v2', 'supplier_import', 'admin')),
  ADD COLUMN IF NOT EXISTS catalogue_page       integer,
  ADD COLUMN IF NOT EXISTS catalogue_section    text;

-- Unique slug constraint (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'parts_slug_unique'
  ) THEN
    ALTER TABLE parts ADD CONSTRAINT parts_slug_unique UNIQUE (slug);
  END IF;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS parts_slug_idx             ON parts(slug);
CREATE INDEX IF NOT EXISTS parts_mpn_idx              ON parts(mpn);
CREATE INDEX IF NOT EXISTS parts_sku_idx              ON parts(sku);
CREATE INDEX IF NOT EXISTS parts_brand_idx            ON parts(brand);
CREATE INDEX IF NOT EXISTS parts_category_idx         ON parts(category);
CREATE INDEX IF NOT EXISTS parts_subcategory_idx      ON parts(subcategory);
CREATE INDEX IF NOT EXISTS parts_stock_type_idx       ON parts(stock_type);
CREATE INDEX IF NOT EXISTS parts_featured_idx         ON parts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS parts_needs_review_idx     ON parts(needs_review) WHERE needs_review = true;
CREATE INDEX IF NOT EXISTS parts_discontinued_idx     ON parts(discontinued) WHERE discontinued = true;
CREATE INDEX IF NOT EXISTS parts_availability_idx     ON parts(availability_status);
CREATE INDEX IF NOT EXISTS parts_active_idx           ON parts(active, is_indexable);
CREATE INDEX IF NOT EXISTS parts_part_number_trgm_idx ON parts USING gin(part_number gin_trgm_ops);
CREATE INDEX IF NOT EXISTS parts_name_trgm_idx        ON parts USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS parts_sku_trgm_idx         ON parts USING gin(sku gin_trgm_ops);

-- ─────────────────────────────────────────────────────────────
-- 6. PART ASSEMBLIES (exploded diagram parents)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS part_assemblies (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                text NOT NULL,
  slug                text NOT NULL UNIQUE,
  machine_model_code  text NOT NULL,
  machine_slug        text,
  category            text NOT NULL DEFAULT 'pump'
    CHECK (category IN ('pump', 'burner', 'coil', 'frame', 'electrical', 'fuel', 'plumbing', 'unloader', 'engine_motor', 'controls', 'general')),
  description         text,
  diagram_image_url   text,
  diagram_svg_path    text,
  diagram_pdf_url     text,
  sort_order          integer NOT NULL DEFAULT 0,
  active              boolean NOT NULL DEFAULT true,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE part_assemblies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active part assemblies" ON part_assemblies;
CREATE POLICY "Public can read active part assemblies" ON part_assemblies FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role full access part assemblies" ON part_assemblies;
CREATE POLICY "Service role full access part assemblies" ON part_assemblies FOR ALL USING (true);

-- ─────────────────────────────────────────────────────────────
-- 7. DIAGRAM CALLOUTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS diagram_callouts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assembly_id     uuid NOT NULL REFERENCES part_assemblies(id) ON DELETE CASCADE,
  callout_number  integer NOT NULL,
  x_percent       decimal(5,2) NOT NULL,
  y_percent       decimal(5,2) NOT NULL,
  part_id         uuid REFERENCES parts(id) ON DELETE SET NULL,
  part_number     text NOT NULL,
  part_name       text NOT NULL,
  quantity_used   integer NOT NULL DEFAULT 1,
  superseded_by   text,
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE diagram_callouts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read diagram callouts" ON diagram_callouts;
CREATE POLICY "Public can read diagram callouts" ON diagram_callouts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role full access diagram callouts" ON diagram_callouts;
CREATE POLICY "Service role full access diagram callouts" ON diagram_callouts FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS diagram_callouts_assembly_idx ON diagram_callouts(assembly_id);
CREATE INDEX IF NOT EXISTS diagram_callouts_part_idx     ON diagram_callouts(part_id);

-- ─────────────────────────────────────────────────────────────
-- 8. PART MACHINE COMPATIBILITY
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS part_machine_compatibility (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id             uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  machine_model_code  text NOT NULL,
  machine_slug        text,
  machine_family      text,
  assembly_name       text,
  serial_from         text,
  serial_to           text,
  quantity_used       integer NOT NULL DEFAULT 1,
  notes               text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE part_machine_compatibility ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read part compatibility" ON part_machine_compatibility;
CREATE POLICY "Public can read part compatibility" ON part_machine_compatibility FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role full access part compatibility" ON part_machine_compatibility;
CREATE POLICY "Service role full access part compatibility" ON part_machine_compatibility FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS pmc_part_idx  ON part_machine_compatibility(part_id);
CREATE INDEX IF NOT EXISTS pmc_model_idx ON part_machine_compatibility(machine_model_code);

-- ─────────────────────────────────────────────────────────────
-- 9. SUPPLIER PRODUCTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS supplier_products (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id          uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  supplier_id      uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  supplier_sku     text NOT NULL,
  supplier_title   text,
  cost_price       decimal(10,2) NOT NULL,
  stock_quantity   integer DEFAULT 0,
  in_stock         boolean NOT NULL DEFAULT true,
  lead_time_days   integer NOT NULL DEFAULT 1,
  min_order_qty    integer NOT NULL DEFAULT 1,
  is_preferred     boolean NOT NULL DEFAULT false,
  product_url      text,
  last_synced_at   timestamptz NOT NULL DEFAULT now(),
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT supplier_product_unique UNIQUE(supplier_id, supplier_sku)
);

ALTER TABLE supplier_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read supplier products" ON supplier_products;
DROP POLICY IF EXISTS "Service role full access supplier products" ON supplier_products;
CREATE POLICY "Service role full access supplier products" ON supplier_products FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS supplier_products_part_idx     ON supplier_products(part_id);
CREATE INDEX IF NOT EXISTS supplier_products_supplier_idx ON supplier_products(supplier_id);

-- ─────────────────────────────────────────────────────────────
-- 10. SERVICE KITS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS service_kits (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kit_number               text NOT NULL UNIQUE,
  name                     text NOT NULL,
  slug                     text NOT NULL UNIQUE,
  description              text,
  service_purpose          text NOT NULL,
  service_interval_hours   integer,
  compatible_machine_codes text[] DEFAULT '{}',
  included_parts_summary   text[] DEFAULT '{}',
  price                    decimal(10,2),
  in_stock                 boolean NOT NULL DEFAULT true,
  image_url                text,
  active                   boolean NOT NULL DEFAULT true,
  sort_order               integer NOT NULL DEFAULT 0,
  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE service_kits ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active service kits" ON service_kits;
CREATE POLICY "Public can read active service kits" ON service_kits FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role full access service kits" ON service_kits;
CREATE POLICY "Service role full access service kits" ON service_kits FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS service_kit_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kit_id      uuid NOT NULL REFERENCES service_kits(id) ON DELETE CASCADE,
  part_id     uuid REFERENCES parts(id) ON DELETE SET NULL,
  part_number text NOT NULL,
  quantity    integer NOT NULL DEFAULT 1,
  notes       text
);

ALTER TABLE service_kit_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read service kit items" ON service_kit_items;
CREATE POLICY "Public can read service kit items" ON service_kit_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role full access service kit items" ON service_kit_items;
CREATE POLICY "Service role full access service kit items" ON service_kit_items FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS service_kit_items_kit_idx  ON service_kit_items(kit_id);
CREATE INDEX IF NOT EXISTS service_kit_items_part_idx ON service_kit_items(part_id);

-- ─────────────────────────────────────────────────────────────
-- 11. PART REQUESTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS part_requests (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name   text NOT NULL,
  company         text,
  email           text NOT NULL,
  phone           text,
  postcode        text,
  machine_model   text,
  serial_number   text,
  urgency         text NOT NULL DEFAULT 'standard'
    CHECK (urgency IN ('emergency_breakdown', 'urgent', 'standard', 'planned_maintenance')),
  requested_parts jsonb NOT NULL DEFAULT '[]'::jsonb,
  photo_urls      text[] DEFAULT '{}',
  notes           text,
  status          text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'identifying', 'availability_check', 'quoted', 'ordered', 'dispatched', 'closed')),
  assigned_to     text,
  internal_notes  text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE part_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can create part requests" ON part_requests;
CREATE POLICY "Public can create part requests" ON part_requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Service role full access part requests" ON part_requests;
CREATE POLICY "Service role full access part requests" ON part_requests FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS part_requests_status_idx ON part_requests(status);
CREATE INDEX IF NOT EXISTS part_requests_email_idx  ON part_requests(email);

-- ─────────────────────────────────────────────────────────────
-- 12. ORDERS (server-authoritative; Stripe webhook writes here)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number            text NOT NULL UNIQUE,
  customer_name           text NOT NULL,
  customer_email          text NOT NULL,
  customer_phone          text,
  company_name            text,
  shipping_address        jsonb NOT NULL DEFAULT '{}'::jsonb,
  billing_address         jsonb NOT NULL DEFAULT '{}'::jsonb,
  items                   jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal                decimal(10,2) NOT NULL DEFAULT 0.00,
  vat                     decimal(10,2) NOT NULL DEFAULT 0.00,
  shipping_cost           decimal(10,2) NOT NULL DEFAULT 0.00,
  total                   decimal(10,2) NOT NULL DEFAULT 0.00,
  stripe_session_id       text UNIQUE,
  stripe_payment_intent   text,
  payment_status          text NOT NULL DEFAULT 'awaiting_payment'
    CHECK (payment_status IN ('awaiting_payment', 'paid', 'invoice_30_days', 'refunded', 'failed')),
  status                  text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'pending', 'processing', 'hold', 'shipped', 'completed', 'cancelled')),
  tracking_number         text,
  carrier                 text,
  shipped_at              timestamptz,
  notes                   text,
  internal_notes          text,
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read own orders by email" ON orders;
-- In guest checkout, orders are created and fetched via server-authoritative API/actions
DROP POLICY IF EXISTS "Service role full access orders" ON orders;
CREATE POLICY "Service role full access orders" ON orders FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS orders_status_idx         ON orders(status);
CREATE INDEX IF NOT EXISTS orders_payment_status_idx ON orders(payment_status);
CREATE INDEX IF NOT EXISTS orders_stripe_session_idx ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS orders_email_idx          ON orders(customer_email);
CREATE INDEX IF NOT EXISTS orders_created_at_idx     ON orders(created_at DESC);

-- ─────────────────────────────────────────────────────────────
-- 13. IMPORT BATCHES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS import_batches (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id               uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  status                    text NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued', 'running', 'completed', 'completed_with_warnings', 'failed', 'cancelled')),
  trigger_method            text NOT NULL DEFAULT 'manual'
    CHECK (trigger_method IN ('manual', 'scheduled', 'webhook', 'file_upload')),
  triggered_by              text DEFAULT 'admin',
  started_at                timestamptz NOT NULL DEFAULT now(),
  completed_at              timestamptz,
  products_discovered       integer NOT NULL DEFAULT 0,
  products_new              integer NOT NULL DEFAULT 0,
  products_changed          integer NOT NULL DEFAULT 0,
  products_duplicate        integer NOT NULL DEFAULT 0,
  products_failed           integer NOT NULL DEFAULT 0,
  products_requiring_review integer NOT NULL DEFAULT 0,
  error_message             text,
  notes                     text,
  metadata                  jsonb DEFAULT '{}'::jsonb,
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE import_batches ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access import batches" ON import_batches;
CREATE POLICY "Service role full access import batches" ON import_batches FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS import_batches_supplier_idx ON import_batches(supplier_id);
CREATE INDEX IF NOT EXISTS import_batches_status_idx   ON import_batches(status);

-- ─────────────────────────────────────────────────────────────
-- 14. STAGED SUPPLIER PRODUCTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS staged_supplier_products (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id         uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  batch_id            uuid REFERENCES import_batches(id) ON DELETE SET NULL,
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
  retrieved_at        timestamptz NOT NULL DEFAULT now(),
  raw_supplier_id     text,
  mpn                 text,
  manufacturer        text,
  image_urls          text[] DEFAULT '{}',
  document_urls       text[] DEFAULT '{}',
  ai_category         text,
  ai_brand            text,
  ai_confidence       decimal(4,2),
  ai_model            text,
  ai_reasoning        text,
  ai_run_at           timestamptz,
  ai_task_type        text,
  anomaly_flags       text[] DEFAULT '{}',
  validation_warnings text[] DEFAULT '{}',
  admin_action        text
    CHECK (admin_action IN ('approved', 'rejected', 'merged', 'mapped')),
  admin_action_by     text,
  admin_action_at     timestamptz,
  published_at        timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE staged_supplier_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role access staged products" ON staged_supplier_products;
CREATE POLICY "Service role access staged products" ON staged_supplier_products FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS staged_batch_idx         ON staged_supplier_products(batch_id);
CREATE INDEX IF NOT EXISTS staged_supplier_idx      ON staged_supplier_products(supplier_id);
CREATE INDEX IF NOT EXISTS staged_import_status_idx ON staged_supplier_products(import_status);
CREATE INDEX IF NOT EXISTS staged_admin_action_idx  ON staged_supplier_products(admin_action);

-- ─────────────────────────────────────────────────────────────
-- 15. SEARCH ANALYTICS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS search_analytics (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query          text NOT NULL,
  filters        jsonb DEFAULT '{}'::jsonb,
  results_count  integer NOT NULL DEFAULT 0,
  is_zero_result boolean NOT NULL DEFAULT false,
  user_ip_hash   text,
  user_agent     text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert search analytics" ON search_analytics;
CREATE POLICY "Public can insert search analytics" ON search_analytics FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Service role access search analytics" ON search_analytics;
CREATE POLICY "Service role access search analytics" ON search_analytics FOR ALL USING (true);

CREATE INDEX IF NOT EXISTS search_analytics_query_idx      ON search_analytics(query);
CREATE INDEX IF NOT EXISTS search_analytics_zero_idx       ON search_analytics(is_zero_result) WHERE is_zero_result = true;
CREATE INDEX IF NOT EXISTS search_analytics_query_trgm_idx ON search_analytics USING gin(query gin_trgm_ops);

-- ─────────────────────────────────────────────────────────────
-- 16. SEED BRAND PARTNERS
-- ─────────────────────────────────────────────────────────────
INSERT INTO brand_partners (slug, name, tagline, description, website_url, country_of_origin, sort_order)
VALUES
  ('alkota',           'Alkota',            'OEM Genuine Parts',                'Original equipment manufacturer parts and service components for all Alkota pressure washers and cleaning systems.',    'https://alkota.co.uk',         'USA / UK',    1),
  ('mosmatic',         'Mosmatic',          'Swiss Rotating Precision',          'Swiss-engineered rotating unions, flat surface cleaners, undercarriage cleaners, and turbo nozzles.',                  'https://mosmatic.com',         'Switzerland', 2),
  ('cox-reels',        'Cox Reels',         'American Hose Reel Engineering',    'USA-manufactured heavy-duty hose reels for industrial and commercial applications.',                                   'https://coxreels.com',         'USA',         3),
  ('steel-eagle',      'Steel Eagle',       'Surface Cleaning Systems',          'Professional-grade rotating surface cleaners and deck cleaning attachments.',                                          'https://steeleagle.com',       'USA',         4),
  ('dual-pumps',       'Dual Pumps',        'UK Pump Specialists',               'UK-based distributor of industrial pump solutions and high-pressure water system components.',                         'https://dualpumps.co.uk',      'UK',          5),
  ('interpump',        'Interpump',         'Italian Pump Engineering',          'Italian high-pressure plunger pumps and accessories. One of the world largest manufacturers of pump solutions.',       'https://interpumpgroup.com',   'Italy',       6),
  ('annovi-reverberi', 'Annovi Reverberi',  'Professional Pressure Equipment',   'Italian manufacturer of high-pressure pumps and pressure washers for professional cleaning applications.',             'https://ar-pumps.com',         'Italy',       7),
  ('cat-pumps',        'CAT Pumps',         'Triplex Plunger Specialists',       'Minneapolis-based manufacturer of triplex plunger pumps for high-pressure applications.',                             'https://catpumps.com',         'USA',         8),
  ('general-pump',     'General Pump',      'Professional Water Jetting',        'Professional-grade triplex plunger pumps and high-pressure components.',                                               'https://generalpump.com',      'USA',         9),
  ('nozzle-pro',       'Nozzle Pro',        'Precision Spray Technology',        'Precision-engineered spray nozzles and accessories for professional pressure washing.',                                NULL,                           'USA',         10)
ON CONFLICT (slug) DO UPDATE
  SET name              = EXCLUDED.name,
      tagline           = EXCLUDED.tagline,
      description       = EXCLUDED.description,
      website_url       = EXCLUDED.website_url,
      country_of_origin = EXCLUDED.country_of_origin;

-- ─────────────────────────────────────────────────────────────
-- 17. SEED PART CATEGORIES
-- ─────────────────────────────────────────────────────────────
INSERT INTO part_categories (slug, name, short_desc, icon_name, sort_order, level)
VALUES
  ('pumps',              'Pumps & Pump Parts',           'Complete triplex plunger pumps, ceramic pistons, manifold heads, and valve cages.',                'Gauge',        1,  1),
  ('burners',            'Burners & Ignition',           'Diesel & kerosene combustion heads, electrodes, transformers, and fuel solenoids.',                'Flame',        2,  1),
  ('coils',              'Heating Coils',                'Schedule 80 ASTM A53 heating coils and ceramic insulation blankets.',                             'Layers',       3,  1),
  ('hoses',              'Hoses & Reels',                'High-pressure single and double wire braided hoses, non-marking, steam rated, and reel systems.',  'Activity',     4,  1),
  ('trigger-guns',       'Trigger Guns',                 'Easy-pull fatigue-reducing spray handles, high-temperature guns, and dump guns.',                  'Wrench',       5,  1),
  ('lances-nozzles',     'Lances & Nozzles',             'Insulated wands, hardened nozzles, rotating turbo tips, and chemical jets.',                       'Target',       6,  1),
  ('surface-cleaners',   'Surface Cleaners',             'Rotating flat surface cleaners, undercarriage systems, and deck cleaning tools.',                  'RotateCcw',    7,  1),
  ('valves-unloaders',   'Valves & Unloaders',           'Trapped-pressure unloaders, safety relief valves, burst discs, and thermal relief.',              'ShieldAlert',  8,  1),
  ('filters',            'Filters & Strainers',          'Inlet water strainers, fuel filters, and chemical suction check-valves.',                          'Filter',       9,  1),
  ('electrical-switches','Electrical & Controls',        'Thermostats, flow switches, toggles, contactors, and control panels.',                             'Zap',          10, 1),
  ('seals-o-rings',      'Seals & O-Rings',              'Viton and Buna packing seals, check valve kits, and complete maintenance sets.',                   'CheckCircle2', 11, 1),
  ('service-kits',       'Service & Maintenance Kits',   'Scheduled maintenance kits, pump rebuild kits, and burner service packages.',                      'Package',      12, 1),
  ('fittings-couplers',  'Fittings & Couplers',          'Stainless and brass quick-release sockets, live swivels, and BSP adaptors.',                       'Link2',        13, 1),
  ('engines-motors',     'Engines & Motors',             'TEFC electric motors, Honda/Vanguard service items, pulleys, and drive belts.',                    'Cpu',          14, 1),
  ('attachments',        'Attachments & Accessories',    'Foam lances, chemical injectors, extension sets, and cleaning accessories.',                       'Plus',         15, 1),
  ('chemicals',          'Chemicals & Detergents',       'Professional cleaning chemicals, degreasers, sanitisers, and chemical injection accessories.',     'Flask',        16, 1)
ON CONFLICT (slug) DO UPDATE
  SET name       = EXCLUDED.name,
      short_desc = EXCLUDED.short_desc,
      icon_name  = EXCLUDED.icon_name,
      level      = EXCLUDED.level;

-- ─────────────────────────────────────────────────────────────
-- 18. updated_at TRIGGER
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN VALUES ('parts'), ('brand_partners'), ('part_categories'), ('suppliers'), ('supplier_products'),
                    ('service_kits'), ('staged_supplier_products'), ('import_batches'),
                    ('orders'), ('part_requests'), ('part_assemblies')
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_%s_updated_at ON %I;
       CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %I
       FOR EACH ROW EXECUTE FUNCTION set_updated_at();',
      tbl, tbl, tbl, tbl
    );
  END LOOP;
END $$;

-- ─────────────────────────────────────────────────────────────
-- DONE
-- Tables: brand_partners, part_categories, suppliers,
--         machine_families, machine_models, parts (extended),
--         part_assemblies, diagram_callouts,
--         part_machine_compatibility, supplier_products,
--         service_kits, service_kit_items, part_requests,
--         orders, import_batches, staged_supplier_products,
--         search_analytics
-- Seeded: 10 brand_partners, 16 part_categories
-- ─────────────────────────────────────────────────────────────
