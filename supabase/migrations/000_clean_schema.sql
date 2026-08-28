-- ============================================================
-- ALKOTA UK — COMPLETE CLEAN DATABASE SCHEMA (Phase 02)
-- Enables all core entities, security policies, triggers, and indices.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── 1. SITE SETTINGS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read site_settings" ON site_settings;
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role can modify site_settings" ON site_settings;
CREATE POLICY "Service role can modify site_settings" ON site_settings FOR ALL USING (true);

-- ─── 2. PRODUCT CATEGORIES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text,
  description text,
  hero_image_url text,
  icon_name text,
  meta_title text,
  meta_description text,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active categories" ON product_categories;
CREATE POLICY "Public can read active categories" ON product_categories FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify product_categories" ON product_categories;
CREATE POLICY "Service role can modify product_categories" ON product_categories FOR ALL USING (true);

-- ─── 3. PRODUCTS (Canonical Product Platform) ──────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  model_code text,
  name text NOT NULL,
  series text,
  category text NOT NULL, -- e.g. 'hot-water', 'cold-water', 'steam', 'trailer', 'parts-washer', 'water-treatment', 'space-heater'
  subcategory text,
  
  -- Status & Marketing
  status text NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  active boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  is_elite_series boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  
  -- Core Descriptions (Upstream & UK Editorial)
  tagline text,
  short_description text,
  description text,
  uk_description text,
  engineering_story text,
  
  -- Structured Flow & Pressure Specifications
  flow_rate_gpm numeric,
  flow_rate_lpm numeric,
  pressure_psi integer,
  pressure_bar integer,
  
  -- Power, Heating & Mechanics
  power_source text,      -- e.g. 'Electric', 'Gas Engine', 'Diesel Engine'
  heating_fuel text,      -- e.g. 'Diesel / Kerosene', 'LP Gas', 'Natural Gas', 'All-Electric'
  voltage text,           -- e.g. '230V', '400V / 3PH', '115V'
  phase integer,          -- 1 or 3
  amp_requirement numeric,
  motor_hp numeric,
  motor_kw numeric,
  engine_details text,
  burner_btu integer,
  fuel_tank_capacity_gal numeric,
  fuel_consumption_gph numeric,
  max_temp_c integer,
  
  -- Physical Specifications
  portable boolean NOT NULL DEFAULT true,
  mobility text,          -- e.g. '4-Wheel Portable', 'Stationary Cabinet', 'Skid Mount'
  dimensions_mm text,
  dimensions_inches text,
  weight_kg numeric,
  weight_lbs numeric,
  
  -- Components & Warranty
  pump_type text,
  coil_type text,
  coil_length_ft integer,
  warranty_years integer DEFAULT 1,
  coil_warranty_years integer DEFAULT 7,
  certifications text[] DEFAULT '{}',
  
  -- Application & Industry Relationships
  duty_application text,
  applications text[] DEFAULT '{}',
  industries text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  options text[] DEFAULT '{}',
  extra_specs jsonb DEFAULT '[]'::jsonb,
  
  -- Media & Documents
  primary_image_url text,
  cutout_image_url text,
  gallery_images text[] DEFAULT '{}',
  pdf_spec_url text,
  pdf_manual_url text,
  pdf_brochure_url text,
  video_url text,
  
  -- Relationships
  related_machines uuid[] DEFAULT '{}',
  related_accessories uuid[] DEFAULT '{}',
  
  -- SEO & Crawl Control
  meta_title text,
  meta_description text,
  canonical_url text,
  no_index boolean NOT NULL DEFAULT false,
  
  -- Upstream Ingestion Tracking
  source_url text,
  source_last_checked timestamptz,
  upstream_data jsonb DEFAULT '{}'::jsonb,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status, active);
CREATE INDEX IF NOT EXISTS idx_products_series ON products(series);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active published products" ON products;
CREATE POLICY "Public can read active published products" ON products FOR SELECT USING (active = true AND status = 'published');
DROP POLICY IF EXISTS "Service role can modify products" ON products;
CREATE POLICY "Service role can modify products" ON products FOR ALL USING (true);

-- ─── 4. CHEMICALS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chemicals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  code text,
  category text NOT NULL DEFAULT 'degreaser',
  tagline text,
  description text,
  active boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  use_cases text[] DEFAULT '{}',
  compatible_surfaces text[] DEFAULT '{}',
  not_suitable_for text[] DEFAULT '{}',
  biodegradable boolean NOT NULL DEFAULT true,
  hazardous boolean NOT NULL DEFAULT false,
  food_safe boolean NOT NULL DEFAULT false,
  available_sizes text[] DEFAULT '{"5L", "25L", "200L"}',
  price_5l decimal(10,2),
  price_25l decimal(10,2),
  price_200l decimal(10,2),
  primary_image_url text,
  pdf_datasheet_url text,
  meta_title text,
  meta_description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE chemicals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active chemicals" ON chemicals;
CREATE POLICY "Public can read active chemicals" ON chemicals FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify chemicals" ON chemicals;
CREATE POLICY "Service role can modify chemicals" ON chemicals FOR ALL USING (true);

-- ─── 5. BESPOKE BUILDS ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bespoke_builds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  build_type text NOT NULL DEFAULT 'trailer',
  tagline text,
  description text,
  active boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  spec_highlights jsonb DEFAULT '[]'::jsonb,
  industries text[] DEFAULT '{}',
  primary_image_url text,
  gallery_images text[] DEFAULT '{}',
  pdf_brochure_url text,
  meta_title text,
  meta_description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE bespoke_builds ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active bespoke_builds" ON bespoke_builds;
CREATE POLICY "Public can read active bespoke_builds" ON bespoke_builds FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify bespoke_builds" ON bespoke_builds FOR ALL USING (true);

-- ─── 6. PARTS ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_number text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'other',
  compatible_machines text[] DEFAULT '{}',
  price decimal(10,2),
  in_stock boolean NOT NULL DEFAULT true,
  active boolean NOT NULL DEFAULT true,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active parts" ON parts;
CREATE POLICY "Public can read active parts" ON parts FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify parts" ON parts;
CREATE POLICY "Service role can modify parts" ON parts FOR ALL USING (true);

-- ─── 7. ENQUIRIES ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text,
  type text NOT NULL DEFAULT 'quote',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'quoted', 'won', 'lost', 'archived', 'read', 'responded', 'closed')),
  
  -- Contact details
  first_name text,
  last_name text,
  name text,
  email text NOT NULL,
  phone text,
  company text,
  job_title text,
  
  -- Product Context
  product_id text,
  product_name text,
  chemical_id text,
  bespoke_build_id text,
  
  -- Payload
  subject text,
  message text,
  industry text,
  quantity integer,
  budget_range text,
  timeline text,
  metadata jsonb DEFAULT '{}'::jsonb,
  admin_notes text,
  assigned_to text,
  follow_up_date timestamptz,
  
  -- Tracking
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can create enquiries" ON enquiries;
CREATE POLICY "Public can create enquiries" ON enquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Service role can modify enquiries" ON enquiries;
CREATE POLICY "Service role can modify enquiries" ON enquiries FOR ALL USING (true);

-- ─── 8. POSTS & ARTICLES ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text,
  category text DEFAULT 'guide',
  tags text[] DEFAULT '{}',
  featured_image_url text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  meta_title text,
  meta_description text,
  author text NOT NULL DEFAULT 'Alkota UK Engineering',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text,
  category text DEFAULT 'news',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  featured_image_url text,
  meta_title text,
  meta_description text,
  author text NOT NULL DEFAULT 'Alkota UK',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published posts" ON posts;
CREATE POLICY "Public can read published posts" ON posts FOR SELECT USING (published = true);
DROP POLICY IF EXISTS "Service role can modify posts" ON posts;
CREATE POLICY "Service role can modify posts" ON posts FOR ALL USING (true);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published blog_posts" ON blog_posts;
CREATE POLICY "Public can read published blog_posts" ON blog_posts FOR SELECT USING (published = true);
DROP POLICY IF EXISTS "Service role can modify blog_posts" ON blog_posts;
CREATE POLICY "Service role can modify blog_posts" ON blog_posts FOR ALL USING (true);

-- ─── 9. INDUSTRIES & APPLICATIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS industry_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  headline text,
  intro text,
  body_content text,
  hero_image_url text,
  featured_product_ids text[] DEFAULT '{}',
  meta_title text,
  meta_description text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  icon text,
  description text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  icon text,
  description text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE industry_pages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published industry_pages" ON industry_pages;
CREATE POLICY "Public can read published industry_pages" ON industry_pages FOR SELECT USING (published = true);
DROP POLICY IF EXISTS "Service role can modify industry_pages" ON industry_pages;
CREATE POLICY "Service role can modify industry_pages" ON industry_pages FOR ALL USING (true);

ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active industries" ON industries;
CREATE POLICY "Public can read active industries" ON industries FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify industries" ON industries;
CREATE POLICY "Service role can modify industries" ON industries FOR ALL USING (true);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active applications" ON applications;
CREATE POLICY "Public can read active applications" ON applications FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify applications" ON applications;
CREATE POLICY "Service role can modify applications" ON applications FOR ALL USING (true);

-- ─── 10. BANNERS & ATTACHMENTS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  link_url text,
  link_text text,
  active boolean NOT NULL DEFAULT false,
  variant text NOT NULL DEFAULT 'info',
  start_at timestamptz,
  end_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  file_size integer,
  category text DEFAULT 'general',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active banners" ON banners;
CREATE POLICY "Public can read active banners" ON banners FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify banners" ON banners;
CREATE POLICY "Service role can modify banners" ON banners FOR ALL USING (true);

ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read attachments" ON attachments;
CREATE POLICY "Public can read attachments" ON attachments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role can modify attachments" ON attachments;
CREATE POLICY "Service role can modify attachments" ON attachments FOR ALL USING (true);

-- ─── 11. IMPORT LOGS & SOURCES (Audit Trail) ───────────────────────────────
CREATE TABLE IF NOT EXISTS import_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'alkota-usa-scraper',
  status text NOT NULL DEFAULT 'completed',
  total_discovered integer NOT NULL DEFAULT 0,
  total_imported integer NOT NULL DEFAULT 0,
  total_updated integer NOT NULL DEFAULT 0,
  total_errors integer NOT NULL DEFAULT 0,
  details jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE import_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage import_logs" ON import_logs;
CREATE POLICY "Service role can manage import_logs" ON import_logs FOR ALL USING (true);

-- ─── 12. INITIAL SEED FOR SITE SETTINGS ─────────────────────────────────────
INSERT INTO site_settings (key, value, description)
VALUES 
  ('maintenance_mode', 'false', 'Toggle the whole-site maintenance screen for non-admin visitors'),
  ('company_name', 'Alkota UK', 'Official company trading name'),
  ('contact_email', 'sales@alkota.co.uk', 'Primary inbound sales & technical enquiries email'),
  ('contact_phone', '01772 822 822', 'Primary sales & technical hotline'),
  ('address', 'Unit 4 Industrial Estate, Preston, Lancashire, UK', 'UK distribution centre address')
ON CONFLICT (key) DO NOTHING;

-- ─── 13. UPDATED_AT TRIGGERS ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS set_updated_at_products ON products;
CREATE TRIGGER set_updated_at_products BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_product_categories ON product_categories;
CREATE TRIGGER set_updated_at_product_categories BEFORE UPDATE ON product_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_chemicals ON chemicals;
CREATE TRIGGER set_updated_at_chemicals BEFORE UPDATE ON chemicals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_bespoke_builds ON bespoke_builds;
CREATE TRIGGER set_updated_at_bespoke_builds BEFORE UPDATE ON bespoke_builds FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_parts ON parts;
CREATE TRIGGER set_updated_at_parts BEFORE UPDATE ON parts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_enquiries ON enquiries;
CREATE TRIGGER set_updated_at_enquiries BEFORE UPDATE ON enquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
