import { supabaseAdmin } from './supabase/server';
import canonicalData from '../../scripts/data/alkota-canonical-catalogue.json';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  model_code: string;
  name: string;
  series: string;
  category: string;
  subcategory?: string | null;
  status: 'published' | 'draft' | 'archived';
  active: boolean;
  featured: boolean;
  is_elite_series: boolean;
  sort_order: number;

  tagline: string | null;
  short_description: string | null;
  description: string | null;
  uk_description: string | null;
  engineering_story: string | null;

  flow_rate_gpm: number | null;
  flow_rate_lpm: number | null;
  pressure_psi: number | null;
  pressure_bar: number | null;

  power_source: string | null;
  heating_fuel: string | null;
  voltage: string | null;
  phase: number | null;
  amp_requirement: number | null;
  motor_hp: number | null;
  motor_kw: number | null;
  engine_details: string | null;
  burner_btu: number | null;
  fuel_tank_capacity_gal: number | null;
  fuel_consumption_gph: number | null;
  max_temp_c: number | null;

  portable: boolean;
  mobility: string | null;
  dimensions_mm: string | null;
  dimensions_inches: string | null;
  weight_kg: number | null;
  weight_lbs: number | null;

  pump_type: string | null;
  coil_type: string | null;
  coil_length_ft: number | null;
  warranty_years: number;
  coil_warranty_years: number;
  certifications: string[];

  duty_application: string | null;
  applications: string[];
  industries: string[];
  features: string[];
  options: string[];
  extra_specs: ProductSpecification[];

  primary_image_url: string | null;
  cutout_image_url?: string | null;
  gallery_images: string[];
  pdf_spec_url: string | null;
  pdf_manual_url: string | null;
  pdf_brochure_url: string | null;
  video_url: string | null;

  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  no_index: boolean;

  source_url?: string;
  source_last_checked?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  count: number;
}

export const CANONICAL_CATEGORIES: Record<string, { name: string; tagline: string; description: string }> = {
  'hot-water': {
    name: 'Hot Water Pressure Washers',
    tagline: 'High-Temperature Industrial Degreasing & Washdown',
    description: 'Alkota hot water pressure washers eliminate grease, oil, bitumen and heavy biological contamination for industrial operators. Built with Schedule 80 hydro-insulated coils backed by our 7-year warranty.'
  },
  'cold-water': {
    name: 'Cold Water Pressure Washers',
    tagline: 'High-Volume Mud, Soil & General Washdown Systems',
    description: 'Industrial cold water pressure washers for bulk soil removal, fleet depots, and wash bay installations. Heavy-gauge frames and belt-driven ceramic triplex pumps.'
  },
  'steam': {
    name: 'Industrial Steam Cleaners',
    tagline: 'Dry & Wet High-Temperature Sanitisation',
    description: 'Specialist high-temperature steam generators up to 140°C for chemical-free industrial degreasing, sterilisation, paraffin removal, and sensitive substrate restoration.'
  },
  'parts-washer': {
    name: 'Aqueous Parts Washers',
    tagline: 'Biodegradable Component Wash & Degreasing Cabinets',
    description: 'Aqueous hot-water parts cleaning cabinets using biodegradable detergents. Zero toxic solvents. Front-load, top-load, and rollout turntables with oil skimmers.'
  },
  'trailer': {
    name: 'Mobile Wash Trailers & Custom Rigs',
    tagline: 'Turnkey Road-Legal Mobile Cleaning Platforms',
    description: 'Bespoke single and tandem-axle mobile wash trailers engineered for remote industrial cleaning, municipal contractors, and fleet wash operations.'
  },
  'water-treatment': {
    name: 'Water Recovery & Treatment Systems',
    tagline: 'Closed-Loop Recycling & Trade Effluent Compliance',
    description: 'Vacuum recovery, oil-water separation, media filtration, and bulk wastewater evaporators supporting UK Environment Agency discharge compliance.'
  },
  'water-heater': {
    name: 'Continuous Industrial Water Heaters',
    tagline: 'Add Hot Water Capability to Any Cold Pressure Line',
    description: 'Heavy-duty inline water heating modules (oil or gas fired) that convert cold pressure washers and wash systems into high-output hot water operations.'
  },
  'space-heater': {
    name: 'Industrial Space Heaters',
    tagline: 'High-Output Indirect & Direct Fired Workshop Heating',
    description: 'High-efficiency industrial heaters for construction sites, warehouses, and agricultural buildings needing reliable bulk heating.'
  }
};

/**
 * Fetch all published products from database with fallback to canonical snapshot.
 */
export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  isElite?: boolean;
  limit?: number;
  q?: string;
}): Promise<Product[]> {
  try {
    let query = supabaseAdmin
      .from('products')
      .select('*')
      .eq('active', true)
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (options?.category) {
      const dbCat = options.category === 'parts-washers' ? 'parts-washer' : options.category;
      query = query.eq('category', dbCat);
    }
    if (options?.featured) {
      query = query.eq('featured', true);
    }
    if (options?.isElite) {
      query = query.eq('is_elite_series', true);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      if (options?.q) {
        const term = options.q.toLowerCase();
        return (data as Product[]).filter(p => 
          p.name.toLowerCase().includes(term) ||
          p.model_code?.toLowerCase().includes(term) ||
          p.series?.toLowerCase().includes(term) ||
          p.tagline?.toLowerCase().includes(term)
        );
      }
      return data as Product[];
    }
  } catch (err) {
    console.warn('Error fetching products from database, using canonical snapshot fallback');
  }

  // Fallback to canonical snapshot
  let list = canonicalData as unknown as Product[];
  
  if (options?.category) {
    const dbCat = options.category === 'parts-washers' ? 'parts-washer' : options.category;
    list = list.filter(p => p.category === dbCat);
  }
  if (options?.featured) {
    list = list.filter(p => p.featured);
  }
  if (options?.isElite) {
    list = list.filter(p => p.is_elite_series);
  }
  if (options?.q) {
    const term = options.q.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.model_code?.toLowerCase().includes(term) ||
      p.series?.toLowerCase().includes(term) ||
      p.tagline?.toLowerCase().includes(term)
    );
  }
  if (options?.limit) {
    list = list.slice(0, options.limit);
  }

  return list;
}

/**
 * Fetch a single product by slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const cleanSlug = slug.toLowerCase().trim();
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('slug', cleanSlug)
      .single();

    if (!error && data) {
      return data as Product;
    }
  } catch (err) {
    console.warn(`Error fetching product [${cleanSlug}], checking canonical snapshot`);
  }

  // Fallback to canonical snapshot
  const found = (canonicalData as unknown as Product[]).find(
    p => p.slug === cleanSlug || p.model_code.toLowerCase() === cleanSlug.replace(/^alkota-/, '')
  );
  return found || null;
}

/**
 * Fetch all categories with counts.
 */
export async function getCategoriesWithCounts(): Promise<CategoryInfo[]> {
  const products = await getProducts();
  const counts: Record<string, number> = {};
  
  products.forEach(p => {
    const cat = p.category;
    counts[cat] = (counts[cat] || 0) + 1;
  });

  return Object.entries(CANONICAL_CATEGORIES).map(([slug, info]) => ({
    slug,
    name: info.name,
    tagline: info.tagline,
    description: info.description,
    count: counts[slug] || 0
  }));
}
