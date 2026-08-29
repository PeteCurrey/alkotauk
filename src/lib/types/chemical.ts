// ─── ALKOTA UK — CHEMICALS PLATFORM CANONICAL TYPES ──────────────────────────

export type ChemicalUKStatus = 
  | 'draft'
  | 'needs_uk_review'
  | 'uk_approved'
  | 'published'
  | 'archived';

export type ChemicalCategorySlug =
  | 'fleet-vehicle'
  | 'degreasers'
  | 'industrial'
  | 'parts-washers'
  | 'food-processing'
  | 'masonry'
  | 'aviation'
  | 'specialty'
  | 'scale-stop';

export type FoodProcessStatus =
  | 'non_food'
  | 'rinse_required'
  | 'validated_contact'
  | 'under_review';

export type SignalWord = 'DANGER' | 'WARNING' | 'NONE';

export type MediaStatus = 'media_required' | 'placeholder_active' | 'media_verified';

export interface ChemicalProduct {
  id: string;
  slug: string;
  name: string;
  code: string | null;
  category: ChemicalCategorySlug | string;
  tagline: string | null;
  description: string | null;
  
  // Status & Publishing
  active: boolean;
  featured: boolean;
  uk_status: ChemicalUKStatus;
  sort_order: number;
  
  // Physical & Chemical Properties
  form: string | null;                     // e.g. 'Concentrated Liquid', 'Free-Flowing Powder'
  appearance: string | null;               // e.g. 'Clear Amber Liquid', 'White Powder'
  ph_level: string | null;                 // e.g. '12.4 (Concentrate)', '7.0 (Neutral)'
  specific_gravity: string | null;         // e.g. '1.08 @ 20°C'
  active_ingredients: string[] | null;     // e.g. ['Surfactant Blend', 'Citrus Terpenes', 'Alkaline Builders']
  voc_content: string | null;              // e.g. 'Low VOC (<5g/L)'
  biodegradability_claim: string | null;   // e.g. 'Readily Biodegradable (OECD 301B)'
  biodegradable: boolean;
  hazardous: boolean;
  food_safe: boolean;
  food_process_status: FoodProcessStatus;
  
  // Compatibility & Substrate Matrices
  use_cases: string[] | null;
  compatible_surfaces: string[] | null;
  not_suitable_for: string[] | null;
  contamination_types: string[] | null;
  application_methods: string[] | null;
  compatible_equipment_types: string[] | null;
  
  // Application & Dilution
  dilution_hot: string | null;             // e.g. '1:50 to 1:120'
  dilution_cold: string | null;            // e.g. '1:30 to 1:80'
  surface_notes: string | null;
  application_notes: string | null;
  
  // Water Treatment & Recycling Loop
  water_recovery_compatible: boolean;
  separator_compatible: boolean;
  recycling_compatible: boolean;
  water_recovery_notes: string | null;
  
  // Storage & Logistics
  storage_notes: string | null;
  shelf_life: string | null;
  available_sizes: string[] | null;
  price_5l?: number | null;
  price_25l?: number | null;
  price_200l?: number | null;
  price_1000l?: number | null;
  manufacturer: string;
  country_of_origin: string;
  features: string[] | null;
  
  // Safety & GB CLP / COSHH
  hazard_classification: string | null;    // e.g. 'Skin Corr. 1B; Eye Dam. 1'
  signal_word: SignalWord;
  hazard_pictograms: string[] | null;      // e.g. ['corrosive', 'exclamation']
  hazard_statements: string[] | null;      // e.g. ['H314: Causes severe skin burns and eye damage']
  precautionary_statements: string[] | null;// e.g. ['P280: Wear protective gloves/eye protection']
  
  // Documents & Media
  sds_url: string | null;
  sds_revision_date: string | null;
  tds_url: string | null;
  tds_revision_date: string | null;
  label_url: string | null;
  primary_image_url: string | null;
  image_url?: string | null;
  media_status: MediaStatus;
  
  // SEO
  meta_title: string | null;
  meta_description: string | null;
  
  created_at?: string;
  updated_at?: string;
}

export interface ChemicalCategoryDefinition {
  slug: ChemicalCategorySlug;
  name: string;
  title: string;
  tagline: string;
  description: string;
  applicationScope: string[];
  keyContaminants: string[];
  keySurfaces: string[];
  equipmentSynergy: string;
  heroImagePlaceholder: string;
  badge: string;
}

export interface ChemicalMatchRequest {
  contamination: string;
  surface: string;
  equipmentType?: string;
  hotOrCold?: 'hot' | 'cold' | 'steam' | 'any';
  waterRecoverySystem?: boolean;
  foodProcessArea?: boolean;
  foamPreference?: boolean;
}

export interface ChemicalMatchResult {
  score: number;
  product: ChemicalProduct;
  fitReason: string;
  surfaceSuitability: 'optimal' | 'suitable_with_caution' | 'not_recommended';
  surfaceWarning?: string;
  recommendedDilution: string;
  keySafetyNotes: string;
  waterRecoveryFit: boolean;
}
