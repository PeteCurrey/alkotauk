-- ============================================================
-- 001_initial.sql — Alkota UK Core Tables
-- Run in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── ENQUIRIES ───────────────────────────────────────────────────────────────
create table if not exists enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  type          text not null default 'contact',
  status        text not null default 'new'
                  check (status in ('new', 'read', 'responded', 'closed')),
  name          text,
  email         text,
  company       text,
  phone         text,
  subject       text,
  message       text,
  metadata      jsonb,
  reference     text,
  notes         text,
  assigned_to   text
);

alter table enquiries enable row level security;

-- Service role can do everything (used by API routes)
-- Anon/authenticated users cannot read enquiries directly

-- ─── BLOG POSTS ──────────────────────────────────────────────────────────────
create table if not exists blog_posts (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  title             text not null,
  slug              text not null unique,
  excerpt           text,
  content           text,
  category          text default 'news'
                      check (category in ('news', 'application', 'maintenance', 'industry', 'product', 'compliance')),
  published         boolean not null default false,
  published_at      timestamptz,
  featured_image_url text,
  meta_title        text,
  meta_description  text,
  author            text not null default 'Alkota UK'
);

alter table blog_posts enable row level security;

-- Public policy: read published posts
create policy "Public can read published blog posts"
  on blog_posts for select
  using (published = true);

-- ─── ADMIN SESSIONS ──────────────────────────────────────────────────────────
create table if not exists admin_sessions (
  id          uuid primary key,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null,
  token       text not null unique
);

alter table admin_sessions enable row level security;

-- ─── ADMIN SETTINGS (password storage) ───────────────────────────────────────
-- Stores the hashed admin password so it can be changed via the UI
create table if not exists admin_config (
  key         text primary key,
  value       text not null,
  updated_at  timestamptz not null default now()
);

alter table admin_config enable row level security;

-- Seed initial admin password hash (bcrypt of "Alkota2024!!")
-- Run scripts/hash-password.ts to generate a new hash
-- $2b$10$... is a placeholder — replace with output of hash-password script
insert into admin_config (key, value) values
  ('password_hash', '$2b$10$placeholder_run_hash_password_script')
on conflict (key) do nothing;

-- ─── UPDATED_AT TRIGGER ──────────────────────────────────────────────────────
create or replace function update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at_blog_posts
  before update on blog_posts
  for each row execute function update_updated_at_column();
