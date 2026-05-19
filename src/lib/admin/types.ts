// ─── ALKOTA UK ADMIN — DB TYPES ───────────────────────────────────────────────
// Mirrors the Supabase schema exactly. Use these types for all admin operations.

export type Profile = {
  id: string;
  email: string | null;
  role: string;
  created_at: string;
};

export type ProductCategory =
  | 'hot-water'
  | 'cold-water'
  | 'steam'
  | 'trailer'
  | 'parts-washer'
  | 'water-treatment'
  | 'space-heater'
  | 'water-heater'
  | 'wash-plant';

export type Product = {
  id: string;
  slug: string;
  name: string;
  series: string | null;
  category: ProductCategory;
  tagline: string | null;
  description: string | null;
  featured: boolean;
  active: boolean;

  // Specifications
  flow_rate_gpm: number | null;
  flow_rate_lpm: number | null;
  pressure_psi: number | null;
  pressure_bar: number | null;
  power_source: string | null;
  heating_fuel: string | null;
  voltage: string | null;
  portable: boolean;
  weight_kg: number | null;
  dimensions_mm: string | null;
  max_temp_c: number | null;
  warranty_years: number | null;
  certifications: string[] | null;
  extra_specs: Record<string, string>[] | null;

  // Industries
  industries: string[] | null;

  // Media
  primary_image_url: string | null;
  gallery_images: string[] | null;
  pdf_spec_url: string | null;
  pdf_manual_url: string | null;

  // SEO
  meta_title: string | null;
  meta_description: string | null;

  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export type ProductUpdate = Partial<ProductInsert>;

export type ChemicalCategory =
  | 'degreaser'
  | 'farm-ag'
  | 'transportation-fleet'
  | 'heavy-industrial'
  | 'scale-stop'
  | 'parts-washer-solution'
  | 'aluminium-brightener'
  | 'aircraft-specialist';

export type Chemical = {
  id: string;
  slug: string;
  name: string;
  code: string | null;
  category: ChemicalCategory;
  tagline: string | null;
  description: string | null;
  active: boolean;
  featured: boolean;

  // Properties
  use_cases: string[] | null;
  compatible_surfaces: string[] | null;
  not_suitable_for: string[] | null;
  biodegradable: boolean;
  hazardous: boolean;

  // Sizes
  available_sizes: string[] | null;

  // Media
  primary_image_url: string | null;
  pdf_datasheet_url: string | null;

  // SEO
  meta_title: string | null;
  meta_description: string | null;

  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ChemicalInsert = Omit<Chemical, 'id' | 'created_at' | 'updated_at'>;
export type ChemicalUpdate = Partial<ChemicalInsert>;

export type BuildType = 'trailer' | 'wash-plant' | 'skid-unit' | 'stationary';

export type BespokeBuild = {
  id: string;
  slug: string;
  name: string;
  build_type: BuildType;
  tagline: string | null;
  description: string | null;
  active: boolean;
  featured: boolean;

  spec_highlights: Array<{ label: string; value: string }> | null;
  industries: string[] | null;

  primary_image_url: string | null;
  gallery_images: string[] | null;
  pdf_brochure_url: string | null;

  meta_title: string | null;
  meta_description: string | null;

  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type BespokeBuildInsert = Omit<BespokeBuild, 'id' | 'created_at' | 'updated_at'>;
export type BespokeBuildUpdate = Partial<BespokeBuildInsert>;

export type EnquiryType =
  | 'product-quote'
  | 'bespoke-build'
  | 'chemical-order'
  | 'general'
  | 'wash-plant'
  | 'quote'
  | 'contact'
  | 'trailer'
  | 'industrial'
  | 'industrial-brief'
  | 'compliance'
  | 'machine-match'
  | 'chemical-selector'
  | 'maintenance-lead'
  | 'tco';

export type EnquiryStatus =
  | 'new'
  | 'in-progress'
  | 'quoted'
  | 'won'
  | 'lost'
  | 'archived'
  | 'read'
  | 'responded'
  | 'closed';

export type Enquiry = {
  id: string;
  type: EnquiryType;
  status: EnquiryStatus;

  // Contact
  first_name?: string | null;
  last_name?: string | null;
  name?: string | null; // legacy
  email: string;
  phone: string | null;
  company: string | null;
  job_title?: string | null;
  reference?: string | null;

  // What they want
  product_id: string | null;
  chemical_id: string | null;
  bespoke_build_id: string | null;
  product_name: string | null;

  // Enquiry details
  message: string | null;
  industry: string | null;
  quantity: number | null;
  budget_range: string | null;
  timeline: string | null;

  // Admin notes
  admin_notes: string | null;
  assigned_to: string | null;
  follow_up_date: string | null;

  // Source tracking
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;

  created_at: string;
  updated_at: string;
};

export type EnquiryUpdate = Partial<Pick<Enquiry,
  'status' | 'admin_notes' | 'assigned_to' | 'follow_up_date'
>>;

export type PostCategory = 'guide' | 'industry-news' | 'product-update' | 'case-study';

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: PostCategory | null;
  tags: string[] | null;
  featured_image_url: string | null;
  published: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
};

export type PostInsert = Omit<Post, 'id' | 'created_at' | 'updated_at'>;
export type PostUpdate = Partial<PostInsert>;

export type IndustryPage = {
  id: string;
  slug: string;
  name: string;
  headline: string | null;
  intro: string | null;
  body_content: string | null;
  hero_image_url: string | null;
  featured_product_ids: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type IndustryPageUpdate = Partial<Omit<IndustryPage, 'id' | 'created_at' | 'updated_at'>>;

// ─── SHARED UTILITY TYPES ────────────────────────────────────────────────────

export type Industry =
  | 'agriculture'
  | 'oil-gas'
  | 'fleet-transport'
  | 'food-processing'
  | 'construction'
  | 'plant-hire'
  | 'local-authorities'
  | 'marine'
  | 'waste-management'
  | 'mining'
  | 'manufacturing'
  | 'automotive';

export const INDUSTRY_LABELS: Record<Industry, string> = {
  'agriculture': 'Agriculture & Farming',
  'oil-gas': 'Oil & Gas',
  'fleet-transport': 'Fleet & Transport',
  'food-processing': 'Food Processing',
  'construction': 'Construction',
  'plant-hire': 'Plant Hire',
  'local-authorities': 'Local Authorities / Councils',
  'marine': 'Marine',
  'waste-management': 'Waste Management',
  'mining': 'Mining',
  'manufacturing': 'Manufacturing',
  'automotive': 'Automotive',
};

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  'hot-water': 'Hot Water',
  'cold-water': 'Cold Water',
  'steam': 'Steam Cleaner',
  'trailer': 'Trailer',
  'parts-washer': 'Parts Washer',
  'water-treatment': 'Water Treatment',
  'space-heater': 'Space Heater',
  'water-heater': 'Water Heater',
  'wash-plant': 'Wash Plant',
};

export const CHEMICAL_CATEGORY_LABELS: Record<ChemicalCategory, string> = {
  'degreaser': 'Degreaser',
  'farm-ag': 'Farm & Ag',
  'transportation-fleet': 'Transportation & Fleet',
  'heavy-industrial': 'Heavy Industrial',
  'scale-stop': 'Scale Stop',
  'parts-washer-solution': 'Parts Washer Solution',
  'aluminium-brightener': 'Aluminium Brightener',
  'aircraft-specialist': 'Aircraft & Specialist',
};
