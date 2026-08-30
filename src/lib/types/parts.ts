export type PartAvailability =
  | 'in_stock'
  | 'low_stock'
  | 'backorder'
  | 'special_order'
  | 'obsolete'
  | 'check_availability';

export type StockType = 
  | 'direct_stock'
  | 'supplier_stock'
  | 'made_to_order'
  | 'special_order'
  | 'discontinued';

export type PartCategorySlug =
  | 'pumps'
  | 'burners'
  | 'coils'
  | 'valves-unloaders'
  | 'hoses'
  | 'trigger-guns'
  | 'lances-nozzles'
  | 'filters'
  | 'electrical-switches'
  | 'engines-motors'
  | 'fuel-system'
  | 'fittings-couplers'
  | 'seals-o-rings'
  | 'service-kits'
  | 'surface-cleaners'
  | 'foam-chemical'
  | 'jetting-drain'
  | 'consumables'
  | 'attachments'
  | 'other';

export interface PartCategoryDef {
  slug: PartCategorySlug | string;
  name: string;
  shortDesc: string;
  iconName: string;
  popularParts?: string[];
  subcategories?: string[];
}

export interface PartDocument {
  title: string;
  type: 'parts_manual' | 'schematic' | 'spec_sheet' | 'service_bulletin';
  url: string;
  revisionDate?: string;
  restrictedLevel?: 'public' | 'dealer' | 'internal';
}

export interface Part {
  id: string;
  part_number: string;
  sku?: string | null;
  mpn?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  category: PartCategorySlug | string;
  subcategory?: string | null;
  assembly_category?: string | null;
  manufacturer?: string | null;
  brand?: string | null;
  price?: number | null;
  cost_price?: number | null;
  trade_price?: number | null;
  rrp_price?: number | null;
  margin_override_pct?: number | null;
  vat_rate?: number;
  in_stock: boolean;
  stock_type?: StockType;
  stock_quantity?: number;
  supplier_stock_qty?: number | null;
  lead_time_days?: number;
  availability_status: PartAvailability;
  superseded_by?: string | null;
  weight_kg?: number | null;
  dimensions_cm?: string | null;
  specifications?: Record<string, any>;
  included_items?: string[];
  accessory_part_ids?: string[];
  replacement_part_ids?: string[];
  related_part_ids?: string[];
  technical_notes?: string | null;
  documents?: PartDocument[];
  compatible_machines?: string[];
  image_url?: string | null;
  image_gallery?: string[];
  oem_genuine: boolean;
  featured?: boolean;
  is_attachment?: boolean;
  tags?: string[];
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string[];
  canonical_url?: string | null;
  is_indexable?: boolean;
  discontinued?: boolean;
  retail_url?: string | null;
  active: boolean;
  sort_order?: number;
  preferred_supplier_id?: string | null;
  last_supplier_sync?: string | null;
  last_price_update?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BrandPartner {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  description?: string | null;
  logo_url?: string | null;
  hero_image_url?: string | null;
  website_url?: string | null;
  country_of_origin?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  sort_order?: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PartCategoryAdmin {
  id: string;
  parent_id?: string | null;
  level?: number;
  slug: string;
  name: string;
  short_desc?: string | null;
  icon_name?: string | null;
  hero_image_url?: string | null;
  brand_filter?: string | null;
  is_featured?: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  sort_order?: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  subcategories?: PartCategoryAdmin[];
}

export interface Supplier {
  id: string;
  slug: string;
  name: string;
  code?: string | null;
  supplier_type: 'manufacturer' | 'wholesaler' | 'distributor' | 'importer';
  account_number?: string | null;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  website_url?: string | null;
  portal_url?: string | null;
  default_margin_pct: number;
  feed_type: 'api' | 'xml' | 'csv' | 'manual';
  feed_url?: string | null;
  last_sync_at?: string | null;
  notes?: string | null;
  active: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SupplierProduct {
  id: string;
  part_id: string;
  supplier_id: string;
  supplier_sku: string;
  supplier_title?: string | null;
  cost_price: number;
  stock_quantity: number;
  in_stock: boolean;
  lead_time_days: number;
  min_order_qty: number;
  is_preferred: boolean;
  product_url?: string | null;
  last_synced_at: string;
  supplier?: Supplier;
  part?: Part;
}

export interface MachineFamily {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  description?: string | null;
  image_url?: string | null;
  sort_order: number;
  active: boolean;
  models?: MachineModel[];
}

export interface MachineModel {
  id: string;
  family_id?: string | null;
  slug: string;
  model_code: string;
  name: string;
  manufacturer: string;
  series?: string | null;
  pressure_psi?: number | null;
  flow_gpm?: number | null;
  flow_lpm?: number | null;
  power_source?: string | null;
  heating_type?: string | null;
  specs_summary?: string | null;
  image_url?: string | null;
  manual_pdf_url?: string | null;
  schematic_pdf_url?: string | null;
  sort_order: number;
  active: boolean;
  family?: MachineFamily;
}

export interface Application {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  hero_image_url?: string | null;
  editorial_intro?: string | null;
  buying_guidance?: string | null;
  recommended_specs?: string | null;
  faqs?: { question: string; answer: string }[];
  sort_order: number;
  active: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
}

export interface PartApplication {
  id: string;
  part_id: string;
  application_id: string;
  is_primary: boolean;
  notes?: string | null;
  part?: Part;
  application?: Application;
}

export interface StagedSupplierProduct {
  id: string;
  supplier_id: string;
  supplier_sku: string;
  raw_title: string;
  raw_description?: string | null;
  raw_category?: string | null;
  raw_brand?: string | null;
  cost_price: number;
  stock_quantity: number;
  in_stock: boolean;
  suggested_category?: string | null;
  suggested_brand?: string | null;
  matched_part_id?: string | null;
  match_confidence?: number | null;
  match_reason?: string | null;
  import_status: 'pending' | 'matched_duplicate' | 'new_product' | 'imported' | 'ignored' | 'rejected';
  raw_payload?: Record<string, any>;
  created_at: string;
  supplier?: Supplier;
  matched_part?: Part;
}

export interface PartsEnquiry {
  id: string;
  enquiry_number: string;
  customer_name: string;
  company_name?: string | null;
  email: string;
  phone?: string | null;
  postcode?: string | null;
  machine_model?: string | null;
  serial_number?: string | null;
  component_type?: string | null;
  part_number_known?: string | null;
  urgency: 'emergency_breakdown' | 'urgent' | 'standard' | 'planned_maintenance';
  description?: string | null;
  photo_urls?: string[];
  basket_items?: {
    part_number: string;
    name: string;
    quantity: number;
    price?: number | null;
  }[];
  status: 'new' | 'investigating' | 'quoted' | 'awaiting_customer' | 'converted_to_order' | 'closed';
  internal_notes?: string | null;
  quote_amount?: number | null;
  assigned_to?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SearchAnalyticsRecord {
  id: string;
  query: string;
  filters?: Record<string, any>;
  results_count: number;
  is_zero_result: boolean;
  user_ip_hash?: string | null;
  user_agent?: string | null;
  created_at: string;
}

export interface DiagramCallout {
  id: string;
  assembly_id: string;
  callout_number: number;
  x_percent: number;
  y_percent: number;
  part_id?: string;
  part_number: string;
  part_name: string;
  quantity_used: number;
  superseded_by?: string | null;
  notes?: string | null;
  price?: number | null;
}

export interface PartAssembly {
  id: string;
  name: string;
  slug: string;
  machine_model_code: string;
  machine_slug?: string;
  category: string;
  description?: string;
  diagram_image_url?: string;
  diagram_svg_path?: string;
  diagram_pdf_url?: string;
  callouts: DiagramCallout[];
  sort_order: number;
  active: boolean;
}

export interface PartMachineCompatibility {
  id: string;
  part_id: string;
  machine_model_code: string;
  machine_slug?: string;
  machine_family?: string;
  assembly_name?: string;
  serial_from?: string;
  serial_to?: string;
  quantity_used: number;
  notes?: string;
}

export interface ServiceKit {
  id: string;
  kit_number: string;
  name: string;
  slug: string;
  description: string;
  service_purpose: string;
  service_interval_hours?: number;
  compatible_machine_codes: string[];
  included_parts_summary: string[];
  /** Individual part-number associations included in the kit */
  items?: Array<{
    part_number: string;
    part_name: string;
    quantity: number;
  }>;
  price?: number | null;
  in_stock: boolean;
  image_url?: string | null;
  active: boolean;
}

/** A resolved machine-parts profile mapping a machine model to its associated parts */
export interface MachinePartsProfile {
  machine_code: string;
  machine_name: string;
  series?: string;
  compatible_part_ids?: string[];
  compatible_kit_ids?: string[];
  assembly_slugs?: string[];
  notes?: string;
}

export interface PartRequestItem {
  part_number: string;
  name: string;
  quantity: number;
  machine_context?: string;
  price_each?: number | null;
}

export interface PartRequestSubmission {
  id?: string;
  customer_name: string;
  company?: string;
  email: string;
  phone?: string;
  postcode?: string;
  machine_model?: string;
  serial_number?: string;
  urgency: 'emergency_breakdown' | 'urgent' | 'standard' | 'planned_maintenance';
  requested_parts: PartRequestItem[];
  photo_urls?: string[];
  notes?: string;
}
