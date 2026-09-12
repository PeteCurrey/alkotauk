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
  // ── Chemical Cross-Referencing Synonyms (Master Code <-> Retail Identity) ──
  'tr-407': ['power blast', 'roadforce', 'traffic film remover', 'tfr', 'truck cleaner', 'fleet wash'],
  'tr407': ['tr-407', 'power blast', 'roadforce', 'traffic film remover', 'tfr'],
  'power blast': ['tr-407', 'roadforce', 'traffic film remover', 'tfr'],
  'roadforce': ['tr-407', 'power blast', 'traffic film remover', 'tfr', 'fleet wash'],
  'tr-404': ['klean-all', 'roadforce general', 'vehicle cleaner'],
  'klean-all': ['tr-404', 'roadforce general'],
  'ts-602': ['aluma restore', 'alumarestore', 'acid brightener', 'aluminium cleaner'],
  'aluma restore': ['ts-602', 'alumarestore', 'acid brightener', 'aluminium cleaner'],
  'alumarestore': ['ts-602', 'aluma restore', 'acid brightener'],
  'acid brightener': ['ts-602', 'alumarestore', 'aluma restore', 'aluminium acid'],
  'de-703': ['grease cutter', 'greasecut', 'workshop degreaser', 'floor degreaser'],
  'greasecut': ['de-703', 'grease cutter', 'workshop degreaser', 'floor degreaser'],
  'grease cutter': ['de-703', 'greasecut', 'heavy degreaser'],
  'sd-927': ['scale-stop', 'scaleguard', 'coil descaler', 'coil protector'],
  'scaleguard': ['sd-927', 'scale-stop', 'coil protector', 'descaler'],
  'scale-stop': ['sd-927', 'scaleguard', 'coil descaler'],
  'tfr': ['traffic film remover', 'roadforce', 'tr-407', 'fleet wash', 'truck wash'],
  'traffic film remover': ['tfr', 'roadforce', 'tr-407', 'fleet wash'],
  'truck wash': ['roadforce', 'tr-407', 'tfr', 'traffic film remover', 'fleet cleaner'],
  'chemical': ['detergent', 'tfr', 'degreaser', 'acid brightener', 'descaler'],
  'detergent': ['chemical', 'tfr', 'roadforce', 'greasecut', 'wash'],
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

  // Public storefront safe column projection (prevents leaking internal commercial data)
  const PUBLIC_SAFE_COLUMNS = `
    id, part_number, sku, mpn, name, slug, description, category, subcategory,
    manufacturer, brand, price, vat_rate, in_stock, stock_type, availability_status,
    superseded_by, weight_kg, dimensions_cm, specifications, technical_notes,
    documents, compatible_machines, image_url, image_gallery, oem_genuine,
    featured, is_attachment, tags, active, created_at, updated_at
  `;

  let dbQuery = supabaseAdmin
    .from('parts')
    .select(PUBLIC_SAFE_COLUMNS, { count: 'exact' })
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
  const cleanTerm = trimmedQuery.replace(/[^a-zA-Z0-9]/g, '');

  if (trimmedQuery) {
    // Check for synonym expansion
    const lowerQ = trimmedQuery.toLowerCase();
    const expansions = [trimmedQuery];
    if (cleanTerm && cleanTerm !== trimmedQuery) {
      expansions.push(cleanTerm);
    }

    Object.entries(SYNONYMS).forEach(([term, syns]) => {
      if (lowerQ.includes(term)) {
        expansions.push(...syns);
      }
    });

    const searchClauses: string[] = [];
    expansions.forEach(term => {
      searchClauses.push(
        `part_number.ilike.%${term}%`,
        `mpn.ilike.%${term}%`,
        `sku.ilike.%${term}%`,
        `name.ilike.%${term}%`,
        `brand.ilike.%${term}%`,
        `manufacturer.ilike.%${term}%`,
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
      dbQuery = dbQuery
        .order('featured', { ascending: false })
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });
      break;
  }

  // Pagination
  dbQuery = dbQuery.range(offset, offset + limit - 1);

  const { data: rawParts, count, error } = await dbQuery;

  let parts = (rawParts as Part[]) || [];

  // Relevance Re-Ranking: Exact Part # / SKU / MPN Match goes strictly to Position #1
  if (trimmedQuery && sortBy === 'relevance' && parts.length > 1) {
    const qUpper = trimmedQuery.toUpperCase();
    const qClean = cleanTerm.toUpperCase();

    parts = [...parts].sort((a, b) => {
      const aPn = (a.part_number || '').toUpperCase();
      const bPn = (b.part_number || '').toUpperCase();
      const aSku = (a.sku || '').toUpperCase();
      const bSku = (b.sku || '').toUpperCase();
      const aMpn = (a.mpn || '').toUpperCase();
      const bMpn = (b.mpn || '').toUpperCase();

      // 1. Exact Part Number match
      const aExactPn = aPn === qUpper || aPn.replace(/[^A-Z0-9]/g, '') === qClean;
      const bExactPn = bPn === qUpper || bPn.replace(/[^A-Z0-9]/g, '') === qClean;
      if (aExactPn && !bExactPn) return -1;
      if (!aExactPn && bExactPn) return 1;

      // 2. Exact SKU / MPN match
      const aExactSku = aSku === qUpper || aMpn === qUpper;
      const bExactSku = bSku === qUpper || bMpn === qUpper;
      if (aExactSku && !bExactSku) return -1;
      if (!aExactSku && bExactSku) return 1;

      // 3. Prefix Part Number match
      const aStartsPn = aPn.startsWith(qUpper);
      const bStartsPn = bPn.startsWith(qUpper);
      if (aStartsPn && !bStartsPn) return -1;
      if (!aStartsPn && bStartsPn) return 1;

      // 4. Exact Word in Title match
      const aNameHas = a.name?.toLowerCase().includes(trimmedQuery.toLowerCase());
      const bNameHas = b.name?.toLowerCase().includes(trimmedQuery.toLowerCase());
      if (aNameHas && !bNameHas) return -1;
      if (!aNameHas && bNameHas) return 1;

      return 0;
    });
  }

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
