-- ============================================================
-- 027_product_relationships.sql
-- Alkota UK — Product Relationship & Compatibility Ecosystem
--
-- Strict separation between:
-- 1. COMPATIBILITY (Engineering claims: fitment, operation, specification)
-- 2. GENERAL (Commercial, discovery, lifecycle, recommendations)
--
-- Safe to run on production: IF NOT EXISTS throughout.
-- ============================================================

-- ─── 1. CREATE PRODUCT RELATIONSHIPS TABLE ───────────────────────────────────
CREATE TABLE IF NOT EXISTS product_relationships (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Product Identifiers (Polymorphic references across products, parts, chemicals, attachments)
  source_id           text NOT NULL, -- e.g. product slug / part_number / chemical code
  source_type         text NOT NULL DEFAULT 'machine'
    CHECK (source_type IN ('machine', 'part', 'attachment', 'chemical', 'accessory', 'document', 'other')),
  
  target_id           text NOT NULL,
  target_type         text NOT NULL DEFAULT 'part'
    CHECK (target_type IN ('machine', 'part', 'attachment', 'chemical', 'accessory', 'document', 'other')),

  -- Primary Domain Separation: NEVER conflate engineering compatibility with general merchandising
  relationship_domain text NOT NULL DEFAULT 'COMPATIBILITY'
    CHECK (relationship_domain IN ('COMPATIBILITY', 'GENERAL')),

  -- Controlled Type Taxonomy
  relationship_type   text NOT NULL,

  -- Engineering Lifecycle & Status
  status              text NOT NULL DEFAULT 'published'
    CHECK (status IN ('draft', 'review', 'verified', 'published', 'rejected', 'archived')),

  confidence          text NOT NULL DEFAULT 'VERIFIED'
    CHECK (confidence IN ('VERIFIED', 'MANUFACTURER_SUPPORTED', 'UK_ENGINEERING_VERIFIED', 'REVIEW_REQUIRED', 'NOT_COMPATIBLE')),

  -- Verification Evidence & Provenance (Auditability)
  evidence            text,
  evidence_type       text, -- e.g. 'parts_manual', 'schematic', 'service_bulletin', 'physical_fitment_test'
  evidence_source     text, -- e.g. 'Alkota Factory Documentation'
  evidence_reference  text, -- e.g. 'Page 14, Assembly Diagram 3.1'
  source_url          text,
  source_document     text,
  verification_date   timestamptz,
  verified_by         text,
  notes               text,

  -- Display & Auditing Controls
  priority            integer NOT NULL DEFAULT 0,
  customer_visible    boolean NOT NULL DEFAULT true,
  sort_order          integer NOT NULL DEFAULT 0,
  active              boolean NOT NULL DEFAULT true,
  metadata            jsonb DEFAULT '{}'::jsonb,
  created_by          text DEFAULT 'system',
  updated_by          text DEFAULT 'system',

  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  -- Prevent duplicate relationships of the exact same type & domain
  CONSTRAINT uq_product_relationships_pair UNIQUE (source_id, target_id, relationship_domain, relationship_type)
);

-- ─── 2. INDEXES FOR HIGH-PERFORMANCE DISCOVERY ───────────────────────────────
CREATE INDEX IF NOT EXISTS idx_prod_rel_source 
  ON product_relationships(source_id, relationship_domain, status, active);

CREATE INDEX IF NOT EXISTS idx_prod_rel_target 
  ON product_relationships(target_id, relationship_domain, status, active);

CREATE INDEX IF NOT EXISTS idx_prod_rel_domain_type 
  ON product_relationships(relationship_domain, relationship_type);

CREATE INDEX IF NOT EXISTS idx_prod_rel_status_confidence 
  ON product_relationships(status, confidence);

CREATE INDEX IF NOT EXISTS idx_prod_rel_source_type 
  ON product_relationships(source_type, target_type);

-- ─── 3. ROW LEVEL SECURITY ───────────────────────────────────────────────────
ALTER TABLE product_relationships ENABLE ROW LEVEL SECURITY;

-- Public read access: ONLY active, published records.
-- For COMPATIBILITY domain, public users can ONLY see verified or manufacturer-supported claims.
-- REVIEW_REQUIRED and NOT_COMPATIBLE are never exposed as compatibility to the public.
DROP POLICY IF EXISTS "Public can read published product relationships" ON product_relationships;
CREATE POLICY "Public can read published product relationships" ON product_relationships
  FOR SELECT USING (
    active = true 
    AND status = 'published'
    AND (
      relationship_domain != 'COMPATIBILITY' 
      OR confidence IN ('VERIFIED', 'MANUFACTURER_SUPPORTED', 'UK_ENGINEERING_VERIFIED')
    )
  );

-- Service role full access for admin and background pipelines
DROP POLICY IF EXISTS "Service role full access product_relationships" ON product_relationships;
CREATE POLICY "Service role full access product_relationships" ON product_relationships
  FOR ALL USING (true);
