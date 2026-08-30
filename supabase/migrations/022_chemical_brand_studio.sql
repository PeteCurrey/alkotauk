-- ============================================================================
-- ALKOTA UK — MIGRATION 022: CHEMICAL BRAND STUDIO & CREATIVE IDENTITY MODEL
-- Digital-First Product Creation: Website as Creative Master for Bottles & Packaging
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.chemical_brand_identities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retail_product_id UUID NOT NULL REFERENCES public.chemical_retail_products(id) ON DELETE CASCADE,
  descriptor TEXT NOT NULL, -- e.g. 'Professional Vehicle Cleaner'
  brand_family TEXT NOT NULL, -- e.g. 'RoadForce'
  product_promise TEXT NOT NULL, -- e.g. 'Built for the dirt ordinary detergents leave behind.'
  product_story_headline TEXT NOT NULL DEFAULT 'THIS ISN''T JUST SOAP.',
  product_story_body TEXT NOT NULL,
  problem_labels TEXT[] DEFAULT '{}',
  application_labels TEXT[] DEFAULT '{}',
  hero_image TEXT,
  lifestyle_images TEXT[] DEFAULT '{}',
  product_image TEXT,
  label_concept_notes TEXT,
  brand_colour_accent TEXT DEFAULT '#FF6900',
  related_product_ids TEXT[] DEFAULT '{}',
  workflow_steps JSONB DEFAULT '[]'::jsonb,
  ai_content_status TEXT NOT NULL DEFAULT 'human_verified' CHECK (ai_content_status IN ('human_verified', 'ai_suggested', 'placeholder')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_chemical_brand_identities_retail_product UNIQUE (retail_product_id)
);

CREATE INDEX IF NOT EXISTS idx_brand_identities_retail_product ON public.chemical_brand_identities(retail_product_id);
CREATE INDEX IF NOT EXISTS idx_brand_identities_family ON public.chemical_brand_identities(brand_family);

-- Add descriptor column to chemical_retail_products if not exists
ALTER TABLE public.chemical_retail_products
  ADD COLUMN IF NOT EXISTS descriptor TEXT;

-- Enable RLS
ALTER TABLE public.chemical_brand_identities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read brand identities"
  ON public.chemical_brand_identities FOR SELECT
  USING (true);

CREATE POLICY "Admin manage brand identities"
  ON public.chemical_brand_identities FOR ALL
  USING (true)
  WITH CHECK (true);
