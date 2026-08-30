// ============================================================================
// ALKOTA UK — CHEMICAL COMMERCE SYSTEM CANONICAL TYPES
// Strict separation: Master Formulation -> Retail Product -> Application -> SKU
// ============================================================================

export type ComplianceStatus = 
  | 'VERIFIED_UK_CLP' 
  | 'UK_REVIEW' 
  | 'REQUIRES_VERIFICATION' 
  | 'RESTRICTED';

export type UKReviewStatus = 
  | 'draft' 
  | 'needs_uk_review' 
  | 'uk_approved' 
  | 'published';

export type MerchandisingStatus = 
  | 'live' 
  | 'draft' 
  | 'archived';

export type SurfaceCompatibilityLevel = 
  | 'recommended' 
  | 'safe' 
  | 'test_first' 
  | 'do_not_use';

export interface TechnicalDocument {
  title: string;
  type: 'sds' | 'tds' | 'label' | 'spec';
  url: string;
  revision_date?: string;
}

export interface SurfaceCompatibilityItem {
  surface: string;
  suitability: SurfaceCompatibilityLevel;
  notes?: string;
}

// 1. First-Class Master Chemical Formulation (Underlying Alkota formulation)
export interface ChemicalMasterFormulation {
  id: string;
  master_code: string; // e.g. 'TR-407', 'DE-703', 'TS-602'
  original_name: string; // e.g. 'Power Blast', 'Grease Cutter'
  manufacturer: string; // 'Alkota / Hydrus'
  technical_description: string;
  formulation_family: string; // 'Vehicle Cleaning', 'Degreasers', 'Heavy Duty / Extreme', 'Aluminium & Metal', etc.
  technical_documents?: TechnicalDocument[];
  sds_reference?: string;
  compliance_status: ComplianceStatus;
  uk_review_status: UKReviewStatus;
  ph_level?: string;
  dilution_guidelines?: string;
  active: boolean;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  retail_products_count?: number;
  skus_count?: number;
}

// 2. Retail Brand Identity & Creative Merchandising Model
export interface ChemicalWorkflowStep {
  label: string; // e.g. 'PRE-CLEAN', 'DEGREASE', 'WASH', 'ALUMINIUM', 'RINSE', 'PROTECT'
  product_name?: string;
  product_slug?: string;
  is_current_product?: boolean;
  notes?: string;
}

export interface ChemicalBrandIdentity {
  descriptor: string; // e.g. 'Professional Vehicle Cleaner', 'Industrial Hydrocarbon Degreaser'
  brand_family: string; // e.g. 'RoadForce', 'GreaseCut', 'AlumaRestore'
  product_promise: string; // e.g. 'Built for the dirt ordinary detergents leave behind.'
  product_story_headline: string; // e.g. "THIS ISN'T JUST SOAP."
  product_story_body: string; // Editorial paragraph explaining the cleaning battle
  problem_labels: string[]; // e.g. ['ROAD FILM', 'DIESEL SOOT', 'HEAVY OIL', 'WINTER SALT']
  application_labels: string[]; // e.g. ['HGV & TRUCKS', 'VANS', 'FLEET HAULAGE', 'LIGHT COMMERCIAL']
  hero_image?: string;
  lifestyle_images?: string[];
  product_image?: string;
  label_concept_notes?: string;
  brand_colour_accent?: string; // e.g. '#FF6900' for Alkota Orange
  related_product_ids?: string[]; // Recommended complementary system formulations
  workflow_steps?: ChemicalWorkflowStep[];
  ai_content_status?: 'human_verified' | 'ai_suggested' | 'placeholder';
}

// 3. Retail Chemical Product (Customer-Facing Ecommerce Entity)
export interface ChemicalRetailProduct {
  id: string;
  master_formulation_id: string;
  master_formulation?: ChemicalMasterFormulation;
  originating_master_code: string; // e.g. 'TR-407' (MANDATORY IN ADMIN)
  originating_master_name: string; // e.g. 'Power Blast'
  retail_name: string; // e.g. 'RoadForce Fleet'
  retail_family: string; // e.g. 'RoadForce'
  descriptor?: string; // e.g. 'Professional Vehicle Cleaner'
  slug: string; // e.g. 'roadforce-fleet'
  short_description: string;
  long_description: string;
  primary_application: string; // e.g. 'Commercial HGV & Fleet Cleaning'
  hero_image: string;
  gallery: string[];
  video_url?: string;
  technical_summary: string;
  usage_instructions: string;
  dilution_information: string;
  surface_compatibility: SurfaceCompatibilityItem[];
  warnings: string[];
  compliance_status: ComplianceStatus;
  merchandising_status: MerchandisingStatus;
  brand_identity?: ChemicalBrandIdentity;
  seo_title: string;
  seo_description: string;
  canonical_url?: string;
  featured: boolean;
  sort_order: number;
  published: boolean;
  applications?: ChemicalApplication[];
  problems?: ChemicalCleaningProblem[];
  skus?: ChemicalSKU[];
  created_at?: string;
  updated_at?: string;
}

// 3. Application Taxonomy
export interface ChemicalApplication {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  editorial_intro?: string;
  icon_name?: string;
  sort_order: number;
  active: boolean;
  product_count?: number;
}

// 4. Cleaning Problem Taxonomy
export interface ChemicalCleaningProblem {
  id: string;
  slug: string;
  name: string;
  category: string;
  sort_order: number;
}

// 5. Substrates & Surfaces Taxonomy
export interface ChemicalSurface {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
}

// 6. Sellable SKU / Pack Size Variant
export interface ChemicalSKU {
  id: string;
  retail_product_id: string;
  sku_code: string; // e.g. 'ALK-CHM-TR407-5L'
  pack_size: string; // e.g. '5 L', '15 L', '20 L', '200 L Drum', '1000 L IBC'
  volume_litres: number;
  price: number;
  cost_price?: number;
  in_stock: boolean;
  stock_quantity: number;
  supplier_sku?: string;
  barcode_ean?: string;
  weight_kg?: number;
  sort_order: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

// 7. Audit Log Entry
export interface ChemicalAuditEntry {
  id: string;
  entity_type: 'master_formulation' | 'retail_product' | 'sku' | 'compliance';
  entity_id: string;
  user_id?: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE';
  old_values?: any;
  new_values?: any;
  created_at: string;
}

// 8. Guided Chemical Match / Finder Query
export interface ChemicalFinderQuery {
  applicationSlug?: string;
  problemSlug?: string;
  surfaceSlug?: string;
  desiredResult?: 'clean' | 'degrease' | 'restore' | 'brighten' | 'protect' | 'maintain';
  hotWaterOnly?: boolean;
}
