-- ============================================================
-- ALKOTA UK — PHASE 04: DEALER NETWORK & LEAD ROUTING SCHEMA
-- Full relational schema for Authorised Dealers, Territories,
-- Services, Commercial Leads, and Dealer Applications.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── 1. DEALERS TABLE ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dealers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  tier text NOT NULL DEFAULT 'authorised' CHECK (tier IN ('authorised', 'service_centre', 'specialist_partner', 'national_hub')),
  
  -- Description & Media
  description text,
  short_description text,
  logo_url text,
  hero_image_url text,
  
  -- Address & Physical Coordinates
  address_line1 text NOT NULL,
  address_line2 text,
  town text NOT NULL,
  county text NOT NULL,
  postcode text NOT NULL,
  country text NOT NULL DEFAULT 'United Kingdom',
  latitude numeric(10, 7) NOT NULL,
  longitude numeric(10, 7) NOT NULL,
  
  -- Contact Details
  phone text NOT NULL,
  email text NOT NULL,
  website text,
  opening_hours jsonb DEFAULT '{"mon_fri": "08:00 - 17:30", "sat": "08:30 - 12:30", "sun": "Closed"}'::jsonb,
  
  -- Capabilities & Operational Details
  emergency_support boolean NOT NULL DEFAULT true,
  mobile_service_vans integer NOT NULL DEFAULT 1,
  demonstration_facility boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  rating numeric(3, 2) DEFAULT 4.90,
  sort_order integer NOT NULL DEFAULT 0,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active dealers" ON dealers;
CREATE POLICY "Public can read active dealers" ON dealers FOR SELECT USING (status = 'active');
DROP POLICY IF EXISTS "Service role can modify dealers" ON dealers;
CREATE POLICY "Service role can modify dealers" ON dealers FOR ALL USING (true);

-- ─── 2. DEALER SERVICES ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id uuid NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  service_key text NOT NULL, -- e.g. 'machine-sales', 'on-site-demo', 'service-maintenance', 'emergency-breakdown', 'parts-accessories', 'trailer-systems', 'water-recovery', 'chemicals'
  service_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(dealer_id, service_key)
);

ALTER TABLE dealer_services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read dealer services" ON dealer_services;
CREATE POLICY "Public can read dealer services" ON dealer_services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role can modify dealer services" ON dealer_services;
CREATE POLICY "Service role can modify dealer services" ON dealer_services FOR ALL USING (true);

-- ─── 3. DEALER TERRITORIES (Postcode Outcodes & Regions) ────────────────────
CREATE TABLE IF NOT EXISTS dealer_territories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id uuid NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  postcode_prefix text NOT NULL, -- e.g. 'S', 'DE', 'NG', 'M', 'WA', 'LS', 'G', 'EH', 'CF', etc.
  county_name text,
  region_name text NOT NULL, -- e.g. 'East Midlands', 'North West', 'Yorkshire', 'Scotland', 'Wales'
  is_primary boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(dealer_id, postcode_prefix)
);

ALTER TABLE dealer_territories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read dealer territories" ON dealer_territories;
CREATE POLICY "Public can read dealer territories" ON dealer_territories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role can modify dealer territories" ON dealer_territories;
CREATE POLICY "Service role can modify dealer territories" ON dealer_territories FOR ALL USING (true);

-- ─── 4. DEALER PRODUCT SPECIALISMS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id uuid NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  category_slug text NOT NULL, -- e.g. 'hot-water', 'cold-water', 'steam', 'parts-washer', 'trailer', 'water-treatment'
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(dealer_id, category_slug)
);

ALTER TABLE dealer_product_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read dealer product categories" ON dealer_product_categories;
CREATE POLICY "Public can read dealer product categories" ON dealer_product_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role can modify dealer product categories" ON dealer_product_categories;
CREATE POLICY "Service role can modify dealer product categories" ON dealer_product_categories FOR ALL USING (true);

-- ─── 5. DEALER LEADS & COMMERCIAL INQUIRIES ────────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id uuid REFERENCES dealers(id) ON DELETE SET NULL,
  
  -- Customer Information
  customer_name text NOT NULL,
  customer_company text,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_postcode text NOT NULL,
  customer_town text,
  
  -- Commercial Context
  lead_type text NOT NULL DEFAULT 'quote' CHECK (lead_type IN ('quote', 'demo', 'service', 'general')),
  product_slug text,
  product_name text,
  product_category text,
  industry_slug text,
  application_notes text,
  message text,
  
  -- Routing & CRM Status
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost', 'routed_to_fallback')),
  routed_via text NOT NULL DEFAULT 'territory_match' CHECK (routed_via IN ('territory_match', 'proximity_match', 'direct_dealer', 'fallback_hq')),
  routing_distance_miles numeric(6, 2),
  source_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer leads" ON dealer_leads;
CREATE POLICY "Service role can manage dealer leads" ON dealer_leads FOR ALL USING (true);

-- ─── 6. DEALER PARTNERSHIP APPLICATIONS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  trading_name text,
  contact_name text NOT NULL,
  job_title text,
  email text NOT NULL,
  phone text NOT NULL,
  website text,
  
  -- Location & Facilities
  address_line1 text NOT NULL,
  town text NOT NULL,
  county text NOT NULL,
  postcode text NOT NULL,
  years_in_business integer,
  current_turnover_range text,
  
  -- Commercial Capabilities
  current_brands_represented text,
  territory_interest text NOT NULL,
  workshop_facilities boolean NOT NULL DEFAULT true,
  mobile_service_capability boolean NOT NULL DEFAULT true,
  service_van_count integer NOT NULL DEFAULT 1,
  annual_pressure_washer_units integer,
  additional_notes text,
  
  -- Status
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'interview_scheduled', 'approved', 'rejected')),
  admin_notes text,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer applications" ON dealer_applications;
CREATE POLICY "Service role can manage dealer applications" ON dealer_applications FOR ALL USING (true);

-- ─── 7. DEALER PORTAL USERS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dealer_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id uuid NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'dealer_admin' CHECK (role IN ('dealer_admin', 'dealer_staff')),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role can manage dealer users" ON dealer_users;
CREATE POLICY "Service role can manage dealer users" ON dealer_users FOR ALL USING (true);

-- ─── INDICES FOR FAST LOCATION & POSTCODE ROUTING ───────────────────────────
CREATE INDEX IF NOT EXISTS idx_dealers_slug ON dealers(slug);
CREATE INDEX IF NOT EXISTS idx_dealers_status ON dealers(status);
CREATE INDEX IF NOT EXISTS idx_dealers_coords ON dealers(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_dealer_territories_prefix ON dealer_territories(postcode_prefix);
CREATE INDEX IF NOT EXISTS idx_dealer_services_key ON dealer_services(service_key);
CREATE INDEX IF NOT EXISTS idx_dealer_leads_status ON dealer_leads(status);
CREATE INDEX IF NOT EXISTS idx_dealer_leads_dealer_id ON dealer_leads(dealer_id);
