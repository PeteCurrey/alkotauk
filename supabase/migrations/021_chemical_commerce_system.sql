-- ============================================================================
-- ALKOTA UK — CHEMICAL COMMERCE SYSTEM (021)
-- Master Product Architecture, Formulations, Retail Entities, Application Taxonomy & SKUs
-- ============================================================================

-- 1. Master Formulations (First-Class Physical & Chemical Formulation)
CREATE TABLE IF NOT EXISTS chemical_master_formulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  master_code TEXT UNIQUE NOT NULL, -- e.g. 'TR-407', 'DE-703', 'TS-602'
  original_name TEXT NOT NULL, -- e.g. 'Power Blast', 'Grease Cutter'
  manufacturer TEXT NOT NULL DEFAULT 'Alkota / Hydrus',
  technical_description TEXT,
  formulation_family TEXT NOT NULL, -- e.g. 'Vehicle Cleaning', 'Degreasers', 'Heavy Duty / Extreme', 'Aluminium & Metal', 'Machine Care', 'Finish & Protection', 'Salt & Winter', 'Building & Exterior', 'Agriculture'
  technical_documents JSONB DEFAULT '[]'::jsonb,
  sds_reference TEXT,
  compliance_status TEXT NOT NULL DEFAULT 'UK_REVIEW' CHECK (compliance_status IN ('VERIFIED_UK_CLP', 'UK_REVIEW', 'REQUIRES_VERIFICATION', 'RESTRICTED')),
  uk_review_status TEXT NOT NULL DEFAULT 'needs_uk_review' CHECK (uk_review_status IN ('draft', 'needs_uk_review', 'uk_approved', 'published')),
  ph_level TEXT,
  dilution_guidelines TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Retail Chemical Products (Customer-Facing Ecommerce Identities)
CREATE TABLE IF NOT EXISTS chemical_retail_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  master_formulation_id UUID NOT NULL REFERENCES chemical_master_formulations(id) ON DELETE RESTRICT,
  retail_name TEXT NOT NULL, -- e.g. 'RoadForce Fleet'
  retail_family TEXT NOT NULL, -- e.g. 'RoadForce'
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  long_description TEXT,
  primary_application TEXT,
  hero_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  technical_summary TEXT,
  usage_instructions TEXT,
  dilution_information TEXT,
  surface_compatibility JSONB DEFAULT '[]'::jsonb,
  warnings TEXT[] DEFAULT '{}',
  compliance_status TEXT NOT NULL DEFAULT 'UK_REVIEW' CHECK (compliance_status IN ('VERIFIED_UK_CLP', 'UK_REVIEW', 'REQUIRES_VERIFICATION', 'RESTRICTED')),
  merchandising_status TEXT NOT NULL DEFAULT 'live' CHECK (merchandising_status IN ('live', 'draft', 'archived')),
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 100,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Application Taxonomy
CREATE TABLE IF NOT EXISTS chemical_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  editorial_intro TEXT,
  icon_name TEXT,
  sort_order INTEGER DEFAULT 100,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Product-Application Junction
CREATE TABLE IF NOT EXISTS chemical_product_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retail_product_id UUID NOT NULL REFERENCES chemical_retail_products(id) ON DELETE CASCADE,
  application_id UUID NOT NULL REFERENCES chemical_applications(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  recommended_dilution TEXT,
  application_notes TEXT,
  UNIQUE(retail_product_id, application_id)
);

-- 5. Cleaning Problems Taxonomy
CREATE TABLE IF NOT EXISTS chemical_cleaning_problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  sort_order INTEGER DEFAULT 100
);

-- 6. Product-Problem Junction
CREATE TABLE IF NOT EXISTS chemical_product_problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retail_product_id UUID NOT NULL REFERENCES chemical_retail_products(id) ON DELETE CASCADE,
  problem_id UUID NOT NULL REFERENCES chemical_cleaning_problems(id) ON DELETE CASCADE,
  UNIQUE(retail_product_id, problem_id)
);

-- 7. Substrates / Surfaces Taxonomy
CREATE TABLE IF NOT EXISTS chemical_surfaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 100
);

-- 8. Product-Surface Compatibility Junction
CREATE TABLE IF NOT EXISTS chemical_product_surfaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retail_product_id UUID NOT NULL REFERENCES chemical_retail_products(id) ON DELETE CASCADE,
  surface_id UUID NOT NULL REFERENCES chemical_surfaces(id) ON DELETE CASCADE,
  compatibility_level TEXT NOT NULL DEFAULT 'recommended' CHECK (compatibility_level IN ('recommended', 'safe', 'test_first', 'do_not_use')),
  UNIQUE(retail_product_id, surface_id)
);

-- 9. Sellable SKUs (Pack Size Variants: 5L, 15L, 20L, 200L, 1000L)
CREATE TABLE IF NOT EXISTS chemical_skus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retail_product_id UUID NOT NULL REFERENCES chemical_retail_products(id) ON DELETE CASCADE,
  sku_code TEXT UNIQUE NOT NULL,
  pack_size TEXT NOT NULL, -- e.g. '5 L', '15 L', '20 L', '200 L Drum', '1000 L IBC'
  volume_litres NUMERIC NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  cost_price NUMERIC(10, 2),
  in_stock BOOLEAN NOT NULL DEFAULT true,
  stock_quantity INTEGER DEFAULT 50,
  supplier_sku TEXT,
  barcode_ean TEXT,
  weight_kg NUMERIC(10, 2),
  sort_order INTEGER DEFAULT 10,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Change Audit Trail
CREATE TABLE IF NOT EXISTS chemical_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL, -- 'master_formulation', 'retail_product', 'sku', 'compliance'
  entity_id UUID NOT NULL,
  user_id TEXT,
  action TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'STATUS_CHANGE'
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_chem_master_code ON chemical_master_formulations(master_code);
CREATE INDEX IF NOT EXISTS idx_chem_retail_master_id ON chemical_retail_products(master_formulation_id);
CREATE INDEX IF NOT EXISTS idx_chem_retail_slug ON chemical_retail_products(slug);
CREATE INDEX IF NOT EXISTS idx_chem_retail_published ON chemical_retail_products(published, merchandising_status);
CREATE INDEX IF NOT EXISTS idx_chem_sku_product_id ON chemical_skus(retail_product_id);
CREATE INDEX IF NOT EXISTS idx_chem_sku_code ON chemical_skus(sku_code);
CREATE INDEX IF NOT EXISTS idx_chem_prod_app_rel ON chemical_product_applications(retail_product_id, application_id);
CREATE INDEX IF NOT EXISTS idx_chem_prod_prob_rel ON chemical_product_problems(retail_product_id, problem_id);
CREATE INDEX IF NOT EXISTS idx_chem_prod_surf_rel ON chemical_product_surfaces(retail_product_id, surface_id);
