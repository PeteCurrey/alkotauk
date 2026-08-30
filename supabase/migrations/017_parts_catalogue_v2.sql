-- ============================================================
-- 017_parts_catalogue_v2.sql — Alkota UK Parts & Attachments Hub
-- Run in Supabase SQL Editor before seeding catalogue data.
-- ============================================================

-- ─── 1. BRAND PARTNERS TABLE ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brand_partners (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text NOT NULL UNIQUE,           -- 'alkota', 'mosmatic', 'cox-reels', 'steel-eagle', 'dual-pumps'
  name         text NOT NULL,
  tagline      text,
  description  text,
  logo_url     text,
  hero_image_url text,
  website_url  text,
  country_of_origin text,
  sort_order   integer NOT NULL DEFAULT 0,
  active       boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE brand_partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active brand partners" ON brand_partners;
CREATE POLICY "Public can read active brand partners" ON brand_partners FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify brand partners" ON brand_partners;
CREATE POLICY "Service role can modify brand partners" ON brand_partners FOR ALL USING (true);

-- ─── 2. ADMIN-MANAGED PART CATEGORIES TABLE ──────────────────────────────────
CREATE TABLE IF NOT EXISTS part_categories (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text NOT NULL UNIQUE,
  name         text NOT NULL,
  short_desc   text,
  icon_name    text DEFAULT 'Wrench',
  hero_image_url text,
  brand_filter text,                           -- null = all brands, or brand slug to limit
  sort_order   integer NOT NULL DEFAULT 0,
  active       boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE part_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active part categories" ON part_categories;
CREATE POLICY "Public can read active part categories" ON part_categories FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Service role can modify part categories" ON part_categories;
CREATE POLICY "Service role can modify part categories" ON part_categories FOR ALL USING (true);

-- ─── 3. EXTEND PARTS TABLE ────────────────────────────────────────────────────
ALTER TABLE IF EXISTS parts
  ADD COLUMN IF NOT EXISTS brand         text REFERENCES brand_partners(slug) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_attachment boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS featured      boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS tags          text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS retail_url    text,
  ADD COLUMN IF NOT EXISTS image_gallery text[]  DEFAULT '{}';

-- Index for fast brand filtering
CREATE INDEX IF NOT EXISTS parts_brand_idx     ON parts(brand);
CREATE INDEX IF NOT EXISTS parts_featured_idx  ON parts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS parts_category_idx  ON parts(category);

-- ─── 4. SEED BRAND PARTNERS ───────────────────────────────────────────────────
INSERT INTO brand_partners (slug, name, tagline, description, website_url, country_of_origin, sort_order)
VALUES
  ('alkota', 'Alkota', 'OEM Genuine Parts', 'Original equipment manufacturer parts and service components for all Alkota pressure washers and cleaning systems. Every part is specified, tested, and approved to maintain the full 7-year coil warranty.', 'https://alkota.co.uk', 'USA / UK', 1),
  ('mosmatic', 'Mosmatic', 'Swiss Rotating Precision', 'Swiss-engineered rotating unions, flat surface cleaners, undercarriage cleaners, and turbo nozzles. The benchmark for rotating pressure wash tooling used by professional cleaning contractors worldwide.', 'https://mosmatic.com', 'Switzerland', 2),
  ('cox-reels', 'Cox Reels', 'American Hose Reel Engineering', 'USA-manufactured heavy-duty hose reels for industrial, commercial, and professional applications. Hand-crank and motor-driven models for high-pressure hose up to 1" bore.', 'https://coxreels.com', 'USA', 3),
  ('steel-eagle', 'Steel Eagle', 'Surface Cleaning Systems', 'Professional-grade rotating surface cleaners, bar nozzles, and deck cleaning attachments designed for commercial pressure washing operations.', 'https://steeleagle.com', 'USA', 4),
  ('dual-pumps', 'Dual Pumps', 'UK Pump Specialists', 'UK-based distributor of industrial pump solutions, flow pumps, bypass assemblies, and pump accessories for high-pressure water systems.', 'https://dualpumps.co.uk', 'UK', 5)
ON CONFLICT (slug) DO UPDATE
  SET name = EXCLUDED.name,
      tagline = EXCLUDED.tagline,
      description = EXCLUDED.description;

-- ─── 5. SEED PART CATEGORIES ─────────────────────────────────────────────────
INSERT INTO part_categories (slug, name, short_desc, icon_name, sort_order)
VALUES
  ('pumps',              'Pumps & Pump Parts',          'Complete triplex plunger pumps, ceramic pistons, manifold heads, and valve cages.',                 'Gauge',         1),
  ('burners',            'Burners & Ignition',           'Diesel & kerosene combustion heads, electrodes, transformers, and fuel solenoids.',                 'Flame',         2),
  ('coils',              'Heating Coils',                'Schedule 80 ASTM A53 heating coils and ceramic insulation blankets.',                              'Layers',        3),
  ('hoses',              'Hoses & Reels',                'High-pressure single and double wire braided hoses, non-marking, steam rated, and reel systems.',  'Activity',      4),
  ('trigger-guns',       'Trigger Guns',                 'Easy-pull fatigue-reducing spray handles, high-temperature guns, and dump guns.',                   'Wrench',        5),
  ('lances-nozzles',     'Lances & Nozzles',             'Insulated wands, hardened nozzles, rotating turbo tips, and chemical jets.',                        'Target',        6),
  ('surface-cleaners',   'Surface Cleaners',             'Rotating flat surface cleaners, undercarriage systems, and deck cleaning tools.',                   'RotateCcw',     7),
  ('valves-unloaders',   'Valves & Unloaders',           'Trapped-pressure unloaders, safety relief valves, burst discs, and thermal relief.',               'ShieldAlert',   8),
  ('filters',            'Filters & Strainers',          'Inlet water strainers, fuel filters, and chemical suction check-valves.',                          'Filter',        9),
  ('electrical-switches','Electrical & Controls',        'Thermostats, flow switches, toggles, contactors, and control panels.',                              'Zap',           10),
  ('seals-o-rings',      'Seals & O-Rings',              'Viton and Buna packing seals, check valve kits, and complete maintenance sets.',                   'CheckCircle2',  11),
  ('service-kits',       'Service & Maintenance Kits',   'Scheduled maintenance kits, pump rebuild kits, and burner service packages.',                       'Package',       12),
  ('fittings-couplers',  'Fittings & Couplers',          'Stainless and brass quick-release sockets, live swivels, and BSP adaptors.',                       'Link2',         13),
  ('engines-motors',     'Engines & Motors',             'TEFC electric motors, Honda/Vanguard service items, pulleys, and drive belts.',                     'Cpu',           14),
  ('attachments',        'Attachments & Accessories',    'Foam lances, chemical injectors, extension sets, and cleaning accessories.',                       'Plus',          15)
ON CONFLICT (slug) DO UPDATE
  SET name       = EXCLUDED.name,
      short_desc = EXCLUDED.short_desc,
      icon_name  = EXCLUDED.icon_name;
