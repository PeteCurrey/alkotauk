-- ============================================================
-- 025_products_migration_status.sql
-- Adds reconciliation tracking fields to products table.
-- Safe to run on a populated table — all columns use IF NOT EXISTS.
-- ============================================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS needs_review         boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS migration_status     text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS source_verified_at   timestamptz;

-- Indexes for admin filtering
CREATE INDEX IF NOT EXISTS products_needs_review_idx ON products (needs_review) WHERE needs_review = true;
CREATE INDEX IF NOT EXISTS products_migration_status_idx ON products (migration_status);
CREATE INDEX IF NOT EXISTS products_category_active_idx ON products (category, active);
CREATE INDEX IF NOT EXISTS products_slug_idx ON products (slug);
CREATE INDEX IF NOT EXISTS products_sort_order_idx ON products (sort_order ASC);
