-- ============================================================
-- 006_site_settings.sql — Admin Control & Banners
-- ============================================================

-- ─── SITE SETTINGS ──────────────────────────────────────────────────────────
create table if not exists site_settings (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  key         text not null unique,
  value       text not null,
  description text
);

-- Default Settings
insert into site_settings (key, value, description) values
  ('maintenance_mode', 'false', 'When true, the public site shows a maintenance splash page.'),
  ('site_name', 'Alkota UK', 'The primary brand name across the site.')
on conflict (key) do nothing;

-- ─── BANNERS ────────────────────────────────────────────────────────────────
create table if not exists banners (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  message     text not null,
  href        text,
  active      boolean not null default false,
  background  text default '#FF6900',
  text_color  text default '#FFFFFF'
);

-- RLS
alter table site_settings enable row level security;
alter table banners enable row level security;

create policy "Public can read active banners" on banners for select using (active = true);
create policy "Public can read site settings" on site_settings for select using (true);
