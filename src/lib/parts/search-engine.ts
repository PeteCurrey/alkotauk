import { supabaseAdmin } from '@/lib/supabase/server';
import { Part } from '../types/parts';

export interface SearchOptions {
  query?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  machineModel?: string;
  application?: string;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'name_asc';
  page?: number;
  limit?: number;
  logAnalytics?: boolean;
}

export interface SearchResult {
  parts: Part[];
  totalCount: number;
  page: number;
  totalPages: number;
  query: string;
  facets: {
    brands: { slug: string; name: string; count: number }[];
    categories: { slug: string; name: string; count: number }[];
    inStockCount: number;
  };
}

const SYNONYMS: Record<string, string[]> = {
  'seal kit': ['packing', 'v-packing', 'seal', 'repack'],
  'packing': ['seal kit', 'v-packing', 'water seal'],
  'gun': ['trigger gun', 'spray gun', 'wand handle'],
  'wand': ['lance', 'extension lance', 'spray pipe'],
  'lance': ['wand', 'extension', 'insulated lance'],
  'surface cleaner': ['whirlaway', 'flat surface cleaner', 'floor cleaner', 'rotary cleaner'],
  'coil': ['heating coil', 'schedule 80', 'heat exchanger', 'burner coil'],
  'unloader': ['unloader valve', 'pressure regulator', 'vrt3', 'pulsar'],
  'reel': ['hose reel', 'manual reel', 'retractable reel', 'cox'],
  'nozzle': ['spray tip', 'turbo nozzle', 'rotary nozzle', 'meg'],
  'pump': ['triplex pump', 'plunger pump', 'pressure pump'],
};

export async function searchParts(options: SearchOptions): Promise<SearchResult> {
  const {
    query = '',
    category,
    subcategory,
    brand,
    machineModel,
    inStockOnly = false,
    minPrice,
    maxPrice,
    sortBy = 'relevance',
    page = 1,
    limit = 24,
    logAnalytics = true,
  } = options;

  const trimmedQuery = query.trim();
  const offset = (page - 1) * limit;

  let dbQuery = supabaseAdmin
    .from('parts')
    .select('*', { count: 'exact' })
    .eq('active', true);

  // Exact filters
  if (category && category !== 'all') {
    dbQuery = dbQuery.eq('category', category);
  }
  if (subcategory && subcategory !== 'all') {
    dbQuery = dbQuery.eq('subcategory', subcategory);
  }
  if (brand && brand !== 'all') {
    dbQuery = dbQuery.eq('brand', brand);
  }
  if (inStockOnly) {
    dbQuery = dbQuery.eq('in_stock', true);
  }
  if (typeof minPrice === 'number' && minPrice >= 0) {
    dbQuery = dbQuery.gte('price', minPrice);
  }
  if (typeof maxPrice === 'number' && maxPrice > 0) {
    dbQuery = dbQuery.lte('price', maxPrice);
  }

  // Machine compatibility filter
  if (machineModel) {
    dbQuery = dbQuery.contains('compatible_machines', [machineModel]);
  }

  // Text search conditions
  if (trimmedQuery) {
    // Check for synonym expansion
    const lowerQ = trimmedQuery.toLowerCase();
    const expansions = [trimmedQuery];
    Object.entries(SYNONYMS).forEach(([term, syns]) => {
      if (lowerQ.includes(term)) {
        expansions.push(...syns);
      }
    });

    const searchClauses: string[] = [];
    expansions.forEach(term => {
      searchClauses.push(
        `name.ilike.%${term}%`,
        `part_number.ilike.%${term}%`,
        `mpn.ilike.%${term}%`,
        `sku.ilike.%${term}%`,
        `brand.ilike.%${term}%`,
        `manufacturer.ilike.%${term}%`,
        `category.ilike.%${term}%`,
        `description.ilike.%${term}%`
      );
    });

    dbQuery = dbQuery.or(searchClauses.join(','));
  }

  // Sorting
  switch (sortBy) {
    case 'price_asc':
      dbQuery = dbQuery.order('price', { ascending: true, nullsFirst: false });
      break;
    case 'price_desc':
      dbQuery = dbQuery.order('price', { ascending: false, nullsFirst: false });
      break;
    case 'newest':
      dbQuery = dbQuery.order('created_at', { ascending: false });
      break;
    case 'name_asc':
      dbQuery = dbQuery.order('name', { ascending: true });
      break;
    case 'relevance':
    default:
      dbQuery = dbQuery.order('featured', { ascending: false }).order('sort_order', { ascending: true }).order('name', { ascending: true });
      break;
  }

  // Pagination
  dbQuery = dbQuery.range(offset, offset + limit - 1);

  const { data: parts, count, error } = await dbQuery;

  const totalCount = count || 0;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  // Log analytics if query was performed
  if (logAnalytics && trimmedQuery) {
    try {
      await supabaseAdmin.from('search_analytics').insert({
        query: trimmedQuery,
        filters: { category, subcategory, brand, machineModel, inStockOnly },
        results_count: totalCount,
        is_zero_result: totalCount === 0,
      });
    } catch {
      // ignore logging errors
    }
  }

  return {
    parts: (parts as Part[]) || [],
    totalCount,
    page,
    totalPages,
    query: trimmedQuery,
    facets: {
      brands: [],
      categories: [],
      inStockCount: 0,
    },
  };
}
