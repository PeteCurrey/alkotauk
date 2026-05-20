-- ============================================================
-- 007_create_products_table.sql — Create Products Table
-- ============================================================

create table if not exists products (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  name                text not null,
  series              text,
  category            text not null default 'hot-water',
  tagline             text,
  description         text,
  featured            boolean not null default false,
  active              boolean not null default true,
  
  -- Specifications
  flow_rate_gpm       numeric,
  flow_rate_lpm       numeric,
  pressure_psi        integer,
  pressure_bar        integer,
  power_source        text,
  heating_fuel        text,
  voltage             text,
  portable            boolean not null default true,
  weight_kg           numeric,
  dimensions_mm       text,
  max_temp_c          integer,
  warranty_years      integer,
  certifications      text[] default '{}',
  extra_specs         jsonb default '[]'::jsonb,
  
  -- Industries
  industries          text[] default '{}',
  
  -- Media
  primary_image_url   text,
  gallery_images      text[] default '{}',
  pdf_spec_url        text,
  pdf_manual_url      text,
  
  -- SEO
  meta_title          text,
  meta_description    text,
  
  sort_order          integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

alter table products enable row level security;

-- Drop policy if it already exists
drop policy if exists "Public can read active products" on products;
create policy "Public can read active products" on products for select using (active = true);

-- Add update trigger
drop trigger if exists set_updated_at_products on products;
create trigger set_updated_at_products
  before update on products
  for each row execute function update_updated_at_column();
