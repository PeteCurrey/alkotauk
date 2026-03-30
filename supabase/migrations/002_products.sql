-- ============================================================
-- 002_products.sql — Alkota UK Product & Site Tables
-- Run AFTER 001_initial.sql
-- ============================================================

-- ─── CHEMICALS ───────────────────────────────────────────────────────────────
create table if not exists chemicals (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  name                text not null,
  slug                text not null unique,
  tagline             text,
  description         text,
  category            text not null default 'industrial',
  surfaces            text[] default '{}',
  contamination_types text[] default '{}',
  dilution_hot        text,
  dilution_cold       text,
  dilution_foam       text,
  application_method  text,
  contact_time        text,
  do_not_use_on       text,
  safety_notes        text,
  food_safe           boolean not null default false,
  biodegradable       boolean not null default false,
  available_sizes     text[] default '{}',
  price_5l            decimal(10,2),
  price_25l           decimal(10,2),
  price_200l          decimal(10,2),
  in_stock            boolean not null default true,
  featured            boolean not null default false,
  sort_order          integer not null default 0,
  active              boolean not null default true,
  meta_title          text,
  meta_description    text
);

alter table chemicals enable row level security;
create policy "Public can read active chemicals" on chemicals for select using (active = true);

create trigger set_updated_at_chemicals
  before update on chemicals
  for each row execute function update_updated_at_column();

-- ─── PARTS ───────────────────────────────────────────────────────────────────
create table if not exists parts (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  part_number         text not null unique,
  name                text not null,
  description         text,
  category            text not null default 'other',
  compatible_machines text[] default '{}',
  price               decimal(10,2),
  in_stock            boolean not null default true,
  active              boolean not null default true,
  image_url           text,
  sort_order          integer not null default 0
);

alter table parts enable row level security;
create policy "Public can read active parts" on parts for select using (active = true);

create trigger set_updated_at_parts
  before update on parts
  for each row execute function update_updated_at_column();

-- ─── ATTACHMENTS ─────────────────────────────────────────────────────────────
create table if not exists attachments (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  name                text not null,
  slug                text not null unique,
  description         text,
  category            text not null default 'other',
  compatible_machines text[] default '{}',
  price               decimal(10,2),
  in_stock            boolean not null default true,
  active              boolean not null default true,
  image_url           text,
  featured            boolean not null default false,
  sort_order          integer not null default 0
);

alter table attachments enable row level security;
create policy "Public can read active attachments" on attachments for select using (active = true);

create trigger set_updated_at_attachments
  before update on attachments
  for each row execute function update_updated_at_column();

-- ─── SITE SETTINGS ───────────────────────────────────────────────────────────
create table if not exists site_settings (
  id          uuid primary key default gen_random_uuid(),
  key         text not null unique,
  value       text,
  value_json  jsonb,
  updated_at  timestamptz not null default now(),
  updated_by  text
);

alter table site_settings enable row level security;
-- Public can read site settings (maintenance mode, banners etc.)
create policy "Public can read site settings" on site_settings for select using (true);

-- Seed initial settings
insert into site_settings (key, value) values
  ('maintenance_mode',          'false'),
  ('maintenance_message',       'The platform is currently undergoing scheduled upgrades to enhance performance and catalogue accuracy.'),
  ('maintenance_phone',         '+447912506738'),
  ('maintenance_lead_capture',  'true'),
  ('maintenance_lead_heading',  'Need immediate assistance?'),
  ('site_name',                 'Alkota UK'),
  ('contact_email',             'sales@alkota.co.uk'),
  ('contact_phone',             '+447912506738'),
  ('notification_email',        'sales@alkota.co.uk'),
  ('address_line_1',            ''),
  ('address_line_2',            ''),
  ('city',                      'Chesterfield, Derbyshire'),
  ('instagram_url',             ''),
  ('facebook_url',              ''),
  ('linkedin_url',              ''),
  ('youtube_url',               ''),
  ('lead_capture_enabled',      'true'),
  ('exit_intent_enabled',       'false'),
  ('exit_intent_title',         'Before you go...'),
  ('exit_intent_message',       'Get our free Industrial Pressure Washer Buying Guide. Drop your email and we''ll send it straight over.'),
  ('exit_intent_cta',           'Send Me the Guide'),
  ('exit_intent_delay',         '30'),
  ('meta_title_suffix',         '| Alkota UK'),
  ('meta_description',          'Alkota UK — Industrial pressure washing equipment handcrafted in South Dakota since 1964. Bespoke builds, wash plants, water recovery and full UK service.'),
  ('google_analytics_id',       ''),
  ('search_console_verification', '')
on conflict (key) do nothing;

-- ─── BANNERS ─────────────────────────────────────────────────────────────────
create table if not exists banners (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  message     text not null,
  link_text   text,
  link_url    text,
  style       text not null default 'info'
                check (style in ('info', 'warning', 'promo', 'urgent')),
  active      boolean not null default false,
  start_date  timestamptz,
  end_date    timestamptz,
  dismissible boolean not null default true,
  pages       text[] default '{}'
);

alter table banners enable row level security;
create policy "Public can read active banners" on banners for select using (active = true);

create trigger set_updated_at_banners
  before update on banners
  for each row execute function update_updated_at_column();

-- ─── SEED: CHEMICALS ─────────────────────────────────────────────────────────
insert into chemicals (name, slug, tagline, description, category, surfaces, contamination_types, dilution_hot, dilution_cold, biodegradable, food_safe, available_sizes, price_5l, price_25l, price_200l, featured, sort_order) values
  ('TR-440 Farm Soap',          'tr-440-farm-soap',        'The gold standard for agricultural and heavy equipment cleaning.',       'Highly concentrated heavy-duty alkaline detergent for agriculture. Removes heavy soil, mud and organic matter while protecting heating coils.',                                    'industrial',      '{"Farm machinery","Engine bays","Concrete floors"}', '{"Grease & oil","Mud & soil","Biological"}', '1:50 to 1:120', '1:30 to 1:80', true, false, '{"5L","25L","200L"}', 18.50, 74.00, 285.00, true, 10),
  ('Grease Cutter DE-703',      'grease-cutter-de-703',    'Industrial strength degreaser for extreme oil and grease environments.', 'Highly alkaline solvent-boosted degreaser for engine bays, factory floors and workshop equipment contaminated with mineral oils, fats and greases.',                              'degreasers',      '{"Engine bays","Concrete floors","Stainless steel"}', '{"Grease & oil","Carbon deposits","Road film & tar"}', '1:10 to 1:40', '1:5 to 1:20', true, false, '{"5L","25L","200L"}', 24.00, 89.00, 310.00, true, 20),
  ('Alkota Auto Shampoo',       'alkota-auto-shampoo',     'pH-neutral vehicle shampoo safe on wax, sealants and clear coat.',       'Balanced pH vehicle shampoo producing dense foam for safe, scratch-free cleaning of paintwork, glass and trim on passenger and commercial vehicles.',                          'auto-truck-wash', '{"Vehicle paintwork"}',                              '{"Road film & tar","Mud & soil"}',             '1:40 to 1:80', '1:20 to 1:40', true, false, '{"5L","25L","200L"}', 14.50, 55.00, 185.00, false, 30),
  ('Truck & Plant Wash HD',     'truck-plant-wash-hd',     'Heavy-duty alkaline wash for trucks, plant and fleet vehicles.',         'Industrial alkaline pre-soak and contact wash formulated for the most heavily contaminated trucks, agricultural machinery and construction plant.',                           'auto-truck-wash', '{"Farm machinery","Vehicle paintwork"}',             '{"Grease & oil","Mud & soil","Road film & tar"}', '1:20 to 1:60', '1:10 to 1:30', true, false, '{"5L","25L","200L"}', 19.00, 72.00, 265.00, false, 40),
  ('Alkota Food Safe Cleaner',  'alkota-food-safe-cleaner','HACCP-compliant cleaner and degreaser for food contact surfaces.',      'NSF and HACCP compliant multi-surface cleaner for food processing environments. Removes grease, food residues and biofilm from stainless steel and food-contact surfaces.', 'food-processing', '{"Food equipment","Stainless steel"}',               '{"Grease & oil","Biological"}',                 '1:20 to 1:50', '1:10 to 1:25', true, true, '{"5L","25L","200L"}', 22.00, 84.00, 295.00, false, 50),
  ('Scale Stop Additive',       'scale-stop-additive',     'Inhibits limescale buildup inside heating coils and heat exchangers.',  'Proprietary scale inhibitor designed for use in hard water areas. Prevents calcium and magnesium deposits building up inside heating coils, extending coil life.',          'additives',       '{}',                                                 '{"Mineral scale"}',                            'As directed', 'N/A', true, false, '{"5L","25L"}', 16.00, 58.00, null, false, 60),
  ('Masonry & Concrete Cleaner','masonry-concrete-cleaner','Acid-based cleaner for concrete, paving and masonry surfaces.',          'Diluted acid formulation for removing efflorescence, rust stains, mineral deposits and grime from concrete floors, block paving and natural stone.',                           'industrial',      '{"Stone & masonry","Concrete floors"}',               '{"Mineral scale","Biological"}',                '1:5 to 1:20', '1:3 to 1:10', false, false, '{"5L","25L"}', 19.50, 76.00, null, false, 70)
on conflict (slug) do nothing;
