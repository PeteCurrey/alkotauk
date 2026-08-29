-- Migration 015: Service & Lifecycle Support Flagship Schema
-- Supports machine registrations, service requests, PPM schedules, service reports, service contracts, and asset condition tracking.

CREATE TABLE IF NOT EXISTS machine_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_slug TEXT,
  model_code TEXT NOT NULL,
  serial_number TEXT NOT NULL UNIQUE,
  serial_plate_image_url TEXT,
  purchase_date DATE,
  dealer_name TEXT,
  company_name TEXT NOT NULL,
  site_name TEXT,
  site_address TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  operating_environment TEXT,
  weekly_operating_hours INTEGER,
  status TEXT DEFAULT 'pending_verification' CHECK (status IN ('pending_verification', 'verified', 'rejected')),
  verified_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number TEXT NOT NULL UNIQUE,
  request_type TEXT NOT NULL CHECK (request_type IN ('planned_maintenance', 'breakdown', 'pump_repair', 'commissioning', 'technical_support')),
  urgency TEXT NOT NULL DEFAULT 'routine' CHECK (urgency IN ('routine', 'machine_down', 'operating_with_fault', 'planned_shutdown', 'project_commissioning')),
  machine_registration_id UUID REFERENCES machine_registrations(id) ON DELETE SET NULL,
  machine_model TEXT NOT NULL,
  serial_number TEXT,
  machine_status TEXT DEFAULT 'unknown' CHECK (machine_status IN ('not_running', 'reduced_performance', 'leaking', 'no_heat', 'low_pressure', 'electrical_fault', 'unknown')),
  symptoms TEXT NOT NULL,
  error_codes TEXT,
  photos JSONB DEFAULT '[]'::jsonb,
  company_name TEXT NOT NULL,
  site_name TEXT,
  site_address TEXT NOT NULL,
  site_postcode TEXT,
  access_instructions TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'triage', 'scheduled', 'engineer_assigned', 'in_progress', 'parts_required', 'quote_required', 'completed', 'closed')),
  assigned_engineer TEXT,
  scheduled_date DATE,
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS service_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_number TEXT NOT NULL UNIQUE,
  service_request_id UUID REFERENCES service_requests(id) ON DELETE SET NULL,
  machine_registration_id UUID REFERENCES machine_registrations(id) ON DELETE SET NULL,
  machine_model TEXT NOT NULL,
  serial_number TEXT NOT NULL,
  visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  engineer_name TEXT NOT NULL,
  visit_type TEXT NOT NULL,
  hours_reading INTEGER,
  pressure_reading_bar NUMERIC,
  temp_reading_c NUMERIC,
  flow_reading_lpm NUMERIC,
  work_carried_out TEXT NOT NULL,
  asset_condition TEXT NOT NULL CHECK (asset_condition IN ('good', 'monitor', 'action_required', 'critical')),
  condition_notes TEXT,
  parts_used JSONB DEFAULT '[]'::jsonb,
  recommendations TEXT,
  customer_signature_name TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS service_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_ref TEXT NOT NULL UNIQUE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('planned_maintenance', 'planned_reactive', 'managed_equipment', 'critical_operations')),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  sites JSONB DEFAULT '[]'::jsonb,
  covered_machines JSONB DEFAULT '[]'::jsonb,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  renewal_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending_renewal', 'expired', 'cancelled')),
  annual_value NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ppm_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_model TEXT NOT NULL,
  frequency_type TEXT NOT NULL CHECK (frequency_type IN ('calendar_interval', 'operating_hours', 'both')),
  interval_months INTEGER,
  interval_hours INTEGER,
  checklist_items JSONB DEFAULT '[]'::jsonb,
  recommended_kit_ref TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_machine_registrations_serial ON machine_registrations(serial_number);
CREATE INDEX IF NOT EXISTS idx_machine_registrations_company ON machine_registrations(company_name);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_service_requests_type ON service_requests(request_type);
CREATE INDEX IF NOT EXISTS idx_service_reports_serial ON service_reports(serial_number);
CREATE INDEX IF NOT EXISTS idx_service_contracts_company ON service_contracts(company_name);
