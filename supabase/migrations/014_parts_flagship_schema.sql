-- ============================================================
-- 014_parts_flagship_schema.sql — Alkota UK Parts & Spares Flagship
-- Run in Supabase SQL Editor
-- ============================================================

-- ─── 1. EXTEND / UPDATE PARTS TABLE ──────────────────────────────────────────
ALTER TABLE IF EXISTS parts
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS manufacturer text DEFAULT 'Alkota / OEM Approved',
  ADD COLUMN IF NOT EXISTS availability_status text DEFAULT 'in_stock'
    CHECK (availability_status IN ('in_stock', 'low_stock', 'backorder', 'special_order', 'obsolete', 'check_availability')),
  ADD COLUMN IF NOT EXISTS superseded_by text,
  ADD COLUMN IF NOT EXISTS weight_kg decimal(6,2),
  ADD COLUMN IF NOT EXISTS technical_notes text,
  ADD COLUMN IF NOT EXISTS documents jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS assembly_category text DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS oem_genuine boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS meta_title text,
  ADD COLUMN IF NOT EXISTS meta_description text;

-- Ensure unique slug constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'parts_slug_unique'
  ) THEN
    ALTER TABLE parts ADD CONSTRAINT parts_slug_unique UNIQUE (slug);
  END IF;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- ─── 2. PART ASSEMBLIES (EXPLODED DIAGRAM PARENTS) ───────────────────────────
CREATE TABLE IF NOT EXISTS part_assemblies (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  name                text NOT NULL,
  slug                text NOT NULL UNIQUE,
  machine_model_code  text NOT NULL,
  machine_slug        text,
  category            text NOT NULL DEFAULT 'pump'
    CHECK (category IN ('pump', 'burner', 'coil', 'frame', 'electrical', 'fuel', 'plumbing', 'unloader', 'engine_motor', 'controls', 'general')),
  description         text,
  diagram_image_url   text,
  diagram_svg_path    text,
  diagram_pdf_url     text,
  sort_order          integer NOT NULL DEFAULT 0,
  active              boolean NOT NULL DEFAULT true
);

ALTER TABLE part_assemblies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active part assemblies" ON part_assemblies FOR SELECT USING (active = true);

-- ─── 3. DIAGRAM CALLOUTS (HOTSPOTS) ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS diagram_callouts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assembly_id         uuid NOT NULL REFERENCES part_assemblies(id) ON DELETE CASCADE,
  callout_number      integer NOT NULL,
  x_percent           decimal(5,2) NOT NULL, -- 0.00 to 100.00%
  y_percent           decimal(5,2) NOT NULL, -- 0.00 to 100.00%
  part_id             uuid REFERENCES parts(id) ON DELETE SET NULL,
  part_number         text NOT NULL,
  part_name           text NOT NULL,
  quantity_used       integer NOT NULL DEFAULT 1,
  superseded_by       text,
  notes               text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE diagram_callouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read diagram callouts" ON diagram_callouts FOR SELECT USING (true);

-- ─── 4. MACHINE COMPATIBILITY MATRIX ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS part_machine_compatibility (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id             uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  machine_model_code  text NOT NULL,
  machine_slug        text,
  machine_family      text, -- e.g. '4000 Series', 'APW Rotary', '200 Series'
  assembly_name       text,
  serial_from         text,
  serial_to           text,
  quantity_used       integer NOT NULL DEFAULT 1,
  notes               text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE part_machine_compatibility ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read part compatibility" ON part_machine_compatibility FOR SELECT USING (true);

-- ─── 5. SERVICE KITS ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS service_kits (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now(),
  kit_number              text NOT NULL UNIQUE,
  name                    text NOT NULL,
  slug                    text NOT NULL UNIQUE,
  description             text,
  service_purpose         text NOT NULL,
  service_interval_hours  integer, -- e.g. 500, 1000 hours, or annual
  compatible_machine_codes text[] DEFAULT '{}',
  included_parts_summary  text[] DEFAULT '{}',
  price                   decimal(10,2),
  in_stock                boolean NOT NULL DEFAULT true,
  image_url               text,
  active                  boolean NOT NULL DEFAULT true,
  sort_order              integer NOT NULL DEFAULT 0
);

ALTER TABLE service_kits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active service kits" ON service_kits FOR SELECT USING (active = true);

CREATE TABLE IF NOT EXISTS service_kit_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kit_id      uuid NOT NULL REFERENCES service_kits(id) ON DELETE CASCADE,
  part_id     uuid REFERENCES parts(id) ON DELETE SET NULL,
  part_number text NOT NULL,
  quantity    integer NOT NULL DEFAULT 1,
  notes       text
);

ALTER TABLE service_kit_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read service kit items" ON service_kit_items FOR SELECT USING (true);

-- ─── 6. PART REQUESTS (LEADS / QUOTES / ASSISTANCE) ──────────────────────────
CREATE TABLE IF NOT EXISTS part_requests (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  customer_name       text NOT NULL,
  company             text,
  email               text NOT NULL,
  phone               text,
  postcode            text,
  machine_model       text,
  serial_number       text,
  urgency             text NOT NULL DEFAULT 'standard'
    CHECK (urgency IN ('emergency_breakdown', 'urgent', 'standard', 'planned_maintenance')),
  requested_parts     jsonb NOT NULL DEFAULT '[]'::jsonb, -- array of { partNumber, name, quantity, machine }
  photo_urls          text[] DEFAULT '{}',
  notes               text,
  status              text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'identifying', 'availability_check', 'quoted', 'ordered', 'dispatched', 'closed')),
  assigned_to         text,
  internal_notes      text
);

ALTER TABLE part_requests ENABLE ROW LEVEL SECURITY;
-- Service role full access via admin
