-- ============================================================
-- ALKOTA UK — CHEMICALS FLAGSHIP SCHEMA & COMPLIANCE (013)
-- Extends the chemicals table with UK safety, CLP, compatibility,
-- document versioning, and review status fields.
-- ============================================================

ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS uk_status text NOT NULL DEFAULT 'published' 
  CHECK (uk_status IN ('draft', 'needs_uk_review', 'uk_approved', 'published', 'archived'));

ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS form text DEFAULT 'Concentrated Liquid';
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS appearance text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS ph_level text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS specific_gravity text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS active_ingredients text[] DEFAULT '{}';
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS voc_content text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS biodegradability_claim text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS food_process_status text DEFAULT 'non_food'
  CHECK (food_process_status IN ('non_food', 'rinse_required', 'validated_contact', 'under_review'));

ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS surface_notes text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS application_notes text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS water_recovery_notes text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS water_recovery_compatible boolean NOT NULL DEFAULT false;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS separator_compatible boolean NOT NULL DEFAULT true;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS recycling_compatible boolean NOT NULL DEFAULT false;

ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS storage_notes text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS shelf_life text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS manufacturer text DEFAULT 'Hydrus Detergents / Alkota';
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS country_of_origin text DEFAULT 'USA / UK Formulated';

ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}';
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS dilution_hot text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS dilution_cold text;

-- Safety & GB CLP / COSHH fields
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS hazard_classification text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS signal_word text DEFAULT 'NONE' 
  CHECK (signal_word IN ('DANGER', 'WARNING', 'NONE'));
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS hazard_pictograms text[] DEFAULT '{}';
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS hazard_statements text[] DEFAULT '{}';
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS precautionary_statements text[] DEFAULT '{}';

-- Documents & Revision Tracking
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS sds_url text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS sds_revision_date text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS tds_url text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS tds_revision_date text;
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS label_url text;

-- Media & Compatibility
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS media_status text DEFAULT 'placeholder_active'
  CHECK (media_status IN ('media_required', 'placeholder_active', 'media_verified'));
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS compatible_equipment_types text[] DEFAULT '{}';
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS application_methods text[] DEFAULT '{}';
ALTER TABLE chemicals ADD COLUMN IF NOT EXISTS contamination_types text[] DEFAULT '{}';

-- Ensure Index for fast UK status filtering
CREATE INDEX IF NOT EXISTS idx_chemicals_uk_status ON chemicals(uk_status, active);
CREATE INDEX IF NOT EXISTS idx_chemicals_category ON chemicals(category);
