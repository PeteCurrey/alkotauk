-- ============================================================
-- 003_machines.sql — Alkota UK Machine Catalog (Refined)
-- Run in Supabase SQL Editor
-- ============================================================

DROP TABLE IF EXISTS machines CASCADE;

-- ─── MACHINES TABLE ─────────────────────────────────────────────────────────────
create table if not exists machines (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  name                text not null,
  model_code          text not null unique,
  slug                text not null unique,
  tagline             text,
  description         text,
  category            text not null default 'hot-water',
  series              text not null,
  gpm                 decimal(4,1),
  psi                 integer,
  btu                 integer,
  drive               text,
  hp                  decimal(4,1),
  voltage             text,
  engine              text,
  burner_fuel         text default 'Diesel',
  water_tank          text,
  dimensions          text,
  weight              text,
  image_url           text,
  gallery             text[] default '{}',
  features            text[] default '{}',
  included_accessories text[] default '{}',
  manual_url          text,
  brochure_url        text,
  price               decimal(10,2),
  featured            boolean not null default false,
  active              boolean not null default true,
  sort_order          integer not null default 0,
  meta_title          text,
  meta_description    text
);

alter table machines enable row level security;
create policy "Public can read active machines" on machines for select using (active = true);

create or replace function update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at_machines on machines;
create trigger set_updated_at_machines
  before update on machines
  for each row execute function update_updated_at_column();

-- ─── SEED: MACHINES (XH4 Series - Electric) ───────────────────────────────────
insert into machines (name, model_code, slug, tagline, category, series, gpm, psi, btu, drive, hp, voltage, image_url, sort_order) values
  ('Alkota 430XH', '430XH', 'alkota-430xh', 'Elite portable electric hot water.', 'hot-water', 'XH4', 3.9, 3000, 350000, 'belt', 8.0, '230V, 1 PH, 40 AMP', '/assets/products/430xh.png', 10),
  ('Alkota 420XH', '420XH', 'alkota-420xh', 'Standard industrial power.', 'hot-water', 'XH4', 3.5, 2000, 350000, 'belt', 5.0, '230V, 1 PH, 30 AMP', '/assets/products/420xh.png', 11),
  ('Alkota 330XH4', '330XH4', 'alkota-330xh4', 'Compact high-pressure electric.', 'hot-water', 'XH4', 3.0, 3000, 273000, 'belt', 6.0, '230V, 1 PH, 30 AMP', '/assets/products/330xh4.png', 12)
on conflict (slug) do nothing;

-- ─── SEED: MACHINES (EN/HN Series - Gas) ──────────────────────────────────────
insert into machines (name, model_code, slug, tagline, category, series, gpm, psi, btu, drive, engine, image_url, featured, sort_order) values
  ('Alkota 5355HNL', '5355HNL', 'alkota-5355hnl', 'The rugged industry standard.', 'hot-water', 'EN/HN', 5.0, 3500, 355000, 'belt', 'GX630 Honda (Electric Start)', '/assets/products/5355hnl.png', true, 20),
  ('Alkota 8405HNL', '8405HNL', 'alkota-8405hnl', 'Extreme volume hot water.', 'hot-water', 'EN/HN', 8.0, 4000, 510000, 'belt', 'GX800 EFI Honda (Electric Start)', '/assets/products/8405hnl.png', false, 21),
  ('Alkota 7407DNL', '7407DNL', 'alkota-7407dnl', 'Diesel-powered high capacity.', 'hot-water', 'EN/HN', 7.0, 4000, 630000, 'belt', 'Kubota D902 Diesel', '/assets/products/7407dnl.png', false, 22)
on conflict (slug) do nothing;

-- ─── SEED: MACHINES (GED 12V Series) ──────────────────────────────────────────
insert into machines (name, model_code, slug, tagline, category, series, gpm, psi, btu, engine, image_url, sort_order) values
  ('Alkota 4405F', '4405F', 'alkota-4405f', 'Versatile gasoline performance.', 'hot-water', 'GED 12V', 4.0, 4000, 235000, 'Vanguard 18 HP', '/assets/products/4405f.png', 30)
on conflict (slug) do nothing;

-- ─── SEED: MACHINES (DED Series - Diesel) ─────────────────────────────────────
insert into machines (name, model_code, slug, tagline, category, series, gpm, psi, btu, engine, image_url, sort_order) values
  ('Alkota 10307KK', '10307KK', 'alkota-10307kk', 'The heavy-duty diesel workhorse.', 'hot-water', 'DED', 10.0, 3000, 785000, 'Kubota D1305 Water Cooled', '/assets/products/10307kk.png', 40)
on conflict (slug) do nothing;

-- ─── SEED: MACHINES (Specialty) ────────────────────────────────────────────────
insert into machines (name, model_code, slug, tagline, category, series, image_url, sort_order) values
  ('Alkota Model 111', '111', 'alkota-model-111', 'High-pressure steam cleaning.', 'steam', 'Steam', '/assets/products/model-111.png', 50),
  ('Alkota Model 911', '911', 'alkota-model-911', 'Precision parts washing.', 'parts-washers', 'Parts Washers', '/assets/products/model-911.png', 60),
  ('Alkota VFS-1', 'VFS-1', 'alkota-vfs-1', 'Advanced vacuum filtration.', 'water-treatment', 'Water Treatment', '/assets/products/vfs-1.png', 70)
on conflict (slug) do nothing;
