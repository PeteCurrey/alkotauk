-- ============================================================
-- ALKOTA UK — WASH PLANT DIVISION SCHEMA (013)
-- Infrastructure: Projects Pipeline, Installed Assets, Service Reports, Media
-- ============================================================

-- ─── 1. WASH PLANT PROJECTS (High-CAPEX Commercial Pipeline) ───────────────
CREATE TABLE IF NOT EXISTS wash_plant_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text UNIQUE NOT NULL, -- e.g. WP-2026-001
  status text NOT NULL DEFAULT 'new_enquiry' CHECK (status IN (
    'new_enquiry',
    'qualification',
    'site_survey',
    'concept_design',
    'budget_proposal',
    'tender',
    'detailed_design',
    'quotation',
    'negotiation',
    'awarded',
    'engineering',
    'installation',
    'commissioning',
    'service_contract',
    'lost'
  )),
  
  -- Client & Contact
  client_name text,
  client_company text,
  client_email text,
  client_phone text,
  site_location text,
  project_name text,
  estimated_value_gbp numeric,
  probability_pct integer DEFAULT 50,

  -- Scoping & Architect Tool Payload
  application text[] DEFAULT '{}',
  architect_data jsonb DEFAULT '{}'::jsonb,

  -- Queryable Scope Fields
  asset_types text[] DEFAULT '{}',
  throughput_description text,
  contamination_profile text[] DEFAULT '{}',
  automation_level text,
  water_strategy text,
  site_type text,
  budget_band text,
  target_date text,
  procurement_route text,
  service_requirements text[] DEFAULT '{}',

  -- Project Execution & Engineering
  scope_summary text,
  assigned_to text,
  admin_notes text,
  follow_up_date timestamptz,

  -- Documents & Photography
  document_urls jsonb DEFAULT '[]'::jsonb,
  photo_urls jsonb DEFAULT '[]'::jsonb,

  -- Handover Link
  service_opportunity boolean DEFAULT true,
  converted_to_asset_id uuid,

  -- Public Editorial & Case Study
  published boolean DEFAULT false,
  visibility text DEFAULT 'private' CHECK (visibility IN ('public', 'anonymised', 'private')),
  case_study_slug text UNIQUE,
  case_study_sector text,
  case_study_challenge text,
  case_study_scope text,
  case_study_architecture text,
  case_study_water_solution text,
  case_study_automation text,
  case_study_throughput text,
  client_testimonial text,
  client_testimonial_approved boolean DEFAULT false,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wash_plant_projects_status ON wash_plant_projects(status);
CREATE INDEX IF NOT EXISTS idx_wash_plant_projects_ref ON wash_plant_projects(reference);
CREATE INDEX IF NOT EXISTS idx_wash_plant_projects_slug ON wash_plant_projects(case_study_slug);

ALTER TABLE wash_plant_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view published public wash plant projects" ON wash_plant_projects;
CREATE POLICY "Public can view published public wash plant projects" ON wash_plant_projects
  FOR SELECT USING (published = true AND visibility IN ('public', 'anonymised'));
DROP POLICY IF EXISTS "Service role full access to wash_plant_projects" ON wash_plant_projects;
CREATE POLICY "Service role full access to wash_plant_projects" ON wash_plant_projects
  FOR ALL USING (true);


-- ─── 2. WASH PLANT ASSETS (Installed Plant Register & Telemetry Ready) ──────
CREATE TABLE IF NOT EXISTS wash_plant_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_reference text UNIQUE NOT NULL, -- e.g. WP-001
  client_name text NOT NULL,
  client_company text NOT NULL,
  site_name text NOT NULL,
  site_location text,
  project_id uuid REFERENCES wash_plant_projects(id) ON DELETE SET NULL,

  -- Asset Details & Component Breakdown
  system_description text,
  asset_hierarchy jsonb DEFAULT '[]'::jsonb, -- [{ id, type, name, make, model, serial, condition, age_years }]

  -- Service Contract & Warranty
  contract_tier text DEFAULT 'planned_maintenance' CHECK (contract_tier IN (
    'planned_maintenance',
    'planned_reactive',
    'managed_asset_support',
    'critical_operations_support'
  )),
  commissioning_date date,
  warranty_expiry date,
  ppm_frequency text DEFAULT 'quarterly', -- 'monthly','quarterly','six-monthly','annual','hour-based'
  next_ppm_date date,
  contract_start date,
  contract_end date,
  sla_response_hours integer DEFAULT 24,

  -- Spares & Strategy
  critical_spares jsonb DEFAULT '[]'::jsonb, -- [{ part_name, part_number, qty_site, qty_alkota, supplier }]

  -- Telemetry & Future IoT Integration
  telemetry_enabled boolean DEFAULT false,
  telemetry_config jsonb DEFAULT '{}'::jsonb,
  latest_telemetry jsonb DEFAULT '{}'::jsonb,

  -- Condition Assessment
  condition_rating text DEFAULT 'good' CHECK (condition_rating IN ('excellent', 'good', 'fair', 'poor', 'critical')),
  condition_last_assessed date,
  obsolescence_risk text DEFAULT 'low' CHECK (obsolescence_risk IN ('low', 'medium', 'high', 'critical')),
  replacement_forecast_year integer,

  document_urls jsonb DEFAULT '[]'::jsonb,
  active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wash_plant_assets_ref ON wash_plant_assets(asset_reference);
CREATE INDEX IF NOT EXISTS idx_wash_plant_assets_active ON wash_plant_assets(active);

ALTER TABLE wash_plant_assets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access to wash_plant_assets" ON wash_plant_assets;
CREATE POLICY "Service role full access to wash_plant_assets" ON wash_plant_assets
  FOR ALL USING (true);


-- ─── 3. WASH PLANT SERVICE REPORTS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wash_plant_service_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid NOT NULL REFERENCES wash_plant_assets(id) ON DELETE CASCADE,
  project_id uuid REFERENCES wash_plant_projects(id) ON DELETE SET NULL,
  report_reference text,
  visit_date date NOT NULL DEFAULT CURRENT_DATE,
  engineer_name text NOT NULL,
  work_type text NOT NULL DEFAULT 'ppm' CHECK (work_type IN (
    'ppm',
    'reactive',
    'emergency',
    'commissioning',
    'inspection',
    'warranty'
  )),

  assets_worked_on text[] DEFAULT '{}',
  work_completed text,
  readings jsonb DEFAULT '{}'::jsonb, -- { pressure_bar, flow_lpm, temp_c, hours_run, custom: [] }
  condition_found text,
  parts_used jsonb DEFAULT '[]'::jsonb,
  defects_found jsonb DEFAULT '[]'::jsonb,
  photos jsonb DEFAULT '[]'::jsonb,
  recommendations text,
  follow_up_required boolean DEFAULT false,
  follow_up_notes text,
  next_visit_date date,
  signature_url text,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wash_plant_reports_asset ON wash_plant_service_reports(asset_id);

ALTER TABLE wash_plant_service_reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access to wash_plant_service_reports" ON wash_plant_service_reports;
CREATE POLICY "Service role full access to wash_plant_service_reports" ON wash_plant_service_reports
  FOR ALL USING (true);


-- ─── 4. WASH PLANT PROJECT MEDIA ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wash_plant_project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES wash_plant_projects(id) ON DELETE SET NULL,
  asset_id uuid REFERENCES wash_plant_assets(id) ON DELETE SET NULL,
  category text NOT NULL CHECK (category IN (
    'hero',
    'wide_plant',
    'control_panels',
    'pump_skids',
    'filtration',
    'wash_stations',
    'civil_works',
    'plant_rooms',
    'before_after',
    'installation',
    'commissioning',
    'engineers',
    'finished_plant',
    'general'
  )),
  file_url text NOT NULL,
  caption text,
  alt_text text,
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wash_plant_media_project ON wash_plant_project_media(project_id);
CREATE INDEX IF NOT EXISTS idx_wash_plant_media_category ON wash_plant_project_media(category);

ALTER TABLE wash_plant_project_media ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view project media" ON wash_plant_project_media;
CREATE POLICY "Public can view project media" ON wash_plant_project_media
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role full access to wash_plant_project_media" ON wash_plant_project_media;
CREATE POLICY "Service role full access to wash_plant_project_media" ON wash_plant_project_media
  FOR ALL USING (true);


-- ─── 5. UPDATED_AT TRIGGERS ────────────────────────────────────────────────
DROP TRIGGER IF EXISTS set_updated_at_wash_plant_projects ON wash_plant_projects;
CREATE TRIGGER set_updated_at_wash_plant_projects BEFORE UPDATE ON wash_plant_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_wash_plant_assets ON wash_plant_assets;
CREATE TRIGGER set_updated_at_wash_plant_assets BEFORE UPDATE ON wash_plant_assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_wash_plant_service_reports ON wash_plant_service_reports;
CREATE TRIGGER set_updated_at_wash_plant_service_reports BEFORE UPDATE ON wash_plant_service_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
