-- ============================================================
-- 008_extend_products_schema.sql
-- Expand the products table to support detailed specification
-- for future configurator, AI, and SEO architecture.
-- ============================================================

ALTER TABLE products
  -- Categorisation & Applications
  ADD COLUMN IF NOT EXISTS subcategory text,
  ADD COLUMN IF NOT EXISTS applications text[] DEFAULT '{}',
  
  -- Core Engineering Components
  ADD COLUMN IF NOT EXISTS motor_engine text,
  ADD COLUMN IF NOT EXISTS pump text,
  ADD COLUMN IF NOT EXISTS burner text,
  
  -- Electrical & Physical
  ADD COLUMN IF NOT EXISTS electrical_requirements text,
  ADD COLUMN IF NOT EXISTS mobility text,
  ADD COLUMN IF NOT EXISTS duty_application text,
  
  -- Features & Options
  ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS options text[] DEFAULT '{}',
  
  -- Relationships (stored as UUID arrays for now, can be normalised later if needed)
  ADD COLUMN IF NOT EXISTS related_machines uuid[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS related_accessories uuid[] DEFAULT '{}';
