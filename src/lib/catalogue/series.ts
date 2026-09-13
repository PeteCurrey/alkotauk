import { getProducts, Product, CANONICAL_CATEGORIES } from '@/lib/products';
import { resolveMachineImage } from '@/lib/images';

export interface SeriesInfo {
  series: string; // Canonical verbatim series name from DB
  slug: string; // URL-safe slug e.g. "all-electric-series"
  displayName: string; // Customer-friendly clean name
  category: string; // Canonical DB category e.g. "hot-water"
  categorySlug: string; // Route segment e.g. "hot-water" or "parts-washers"
  modelCount: number;
  models: Product[];
  representativeImage: string;
  representativeModel?: Product;
  minPressureBar?: number;
  maxPressureBar?: number;
  minPressurePsi?: number;
  maxPressurePsi?: number;
  minFlowLpm?: number;
  maxFlowLpm?: number;
  minFlowGpm?: number;
  maxFlowGpm?: number;
  powerSources: string[];
  heatingFuels: string[];
  hasDocumentation: boolean;
  sharedPdfUrl?: string | null;
  tagline?: string | null;
  description?: string | null;
}

export interface CategoryDetails {
  slug: string; // Canonical DB slug e.g. "hot-water"
  routeSlug: string; // URL route segment e.g. "hot-water" or "parts-washers"
  name: string;
  tagline: string;
  description: string;
  modelCount: number;
  seriesCount: number;
  representativeImage: string;
  representativeModel?: Product;
  minPressureBar?: number;
  maxPressureBar?: number;
  seriesList: SeriesInfo[];
}

/**
 * Deterministically slugify a series name for clean, crawlable URLs.
 */
export function slugifySeries(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Normalise category routing parameters.
 */
export function toCategoryRoute(category: string): string {
  return category === 'parts-washer' ? 'parts-washers' : category;
}

export function fromCategoryRoute(route: string): string {
  return route === 'parts-washers' ? 'parts-washer' : route;
}

/**
 * Formats a raw database series name into a customer-facing display title.
 */
export function formatSeriesDisplayName(series: string): string {
  const cleaned = series.replace(/\s+/g, ' ').trim();
  // Strip redundant trailing punctuation if any
  return cleaned.replace(/\.+$/, '');
}

/**
 * Builds rich SeriesInfo metadata from a list of products belonging to that series.
 */
function buildSeriesInfo(seriesName: string, category: string, models: Product[]): SeriesInfo {
  const routeSlug = toCategoryRoute(category);
  const slug = slugifySeries(seriesName);

  // Find best representative model (prefer featured, is_elite, or first model)
  const repModel = models.find(m => m.is_elite_series || m.featured) || models[0];
  const repImage = repModel
    ? resolveMachineImage(repModel.primary_image_url, repModel.model_code, repModel.category)
    : '/assets/products/hot-water-skid.png';

  // Calculate pressure ranges
  const pressuresBar = models.map(m => m.pressure_bar).filter((p): p is number => typeof p === 'number' && p > 0);
  const pressuresPsi = models.map(m => m.pressure_psi).filter((p): p is number => typeof p === 'number' && p > 0);
  const flowsLpm = models.map(m => m.flow_rate_lpm).filter((f): f is number => typeof f === 'number' && f > 0);
  const flowsGpm = models.map(m => m.flow_rate_gpm).filter((f): f is number => typeof f === 'number' && f > 0);

  // Power sources & fuels
  const powerSources = Array.from(new Set(models.map(m => m.power_source).filter(Boolean))) as string[];
  const heatingFuels = Array.from(new Set(models.map(m => m.heating_fuel).filter(Boolean))) as string[];

  // Documentation
  const docs = models.map(m => m.pdf_spec_url || m.pdf_brochure_url).filter(Boolean);
  const sharedPdf = docs.length > 0 ? docs[0] : null;

  // Synthesize clean series overview from models
  const firstWithDesc = models.find(m => m.description || m.uk_description);
  const firstWithTagline = models.find(m => m.tagline);

  return {
    series: seriesName,
    slug,
    displayName: formatSeriesDisplayName(seriesName),
    category,
    categorySlug: routeSlug,
    modelCount: models.length,
    models,
    representativeImage: repImage,
    representativeModel: repModel,
    minPressureBar: pressuresBar.length > 0 ? Math.min(...pressuresBar) : undefined,
    maxPressureBar: pressuresBar.length > 0 ? Math.max(...pressuresBar) : undefined,
    minPressurePsi: pressuresPsi.length > 0 ? Math.min(...pressuresPsi) : undefined,
    maxPressurePsi: pressuresPsi.length > 0 ? Math.max(...pressuresPsi) : undefined,
    minFlowLpm: flowsLpm.length > 0 ? Math.min(...flowsLpm) : undefined,
    maxFlowLpm: flowsLpm.length > 0 ? Math.max(...flowsLpm) : undefined,
    minFlowGpm: flowsGpm.length > 0 ? Math.min(...flowsGpm) : undefined,
    maxFlowGpm: flowsGpm.length > 0 ? Math.max(...flowsGpm) : undefined,
    powerSources,
    heatingFuels,
    hasDocumentation: docs.length > 0,
    sharedPdfUrl: sharedPdf,
    tagline: firstWithTagline?.tagline || null,
    description: firstWithDesc?.uk_description || firstWithDesc?.description || null
  };
}

/**
 * Retrieve all 36 series dynamically grouped from the authoritative machine catalogue.
 */
export async function getAllSeries(): Promise<SeriesInfo[]> {
  const products = await getProducts();
  const seriesMap = new Map<string, { category: string; models: Product[] }>();

  for (const product of products) {
    const seriesName = product.series || 'Industrial Series';
    const key = `${product.category}::${seriesName}`;
    if (!seriesMap.has(key)) {
      seriesMap.set(key, { category: product.category, models: [] });
    }
    seriesMap.get(key)!.models.push(product);
  }

  const result: SeriesInfo[] = [];
  for (const [key, data] of seriesMap.entries()) {
    const seriesName = key.split('::')[1];
    result.push(buildSeriesInfo(seriesName, data.category, data.models));
  }

  // Sort by category, then by model count descending
  return result.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return b.modelCount - a.modelCount;
  });
}

/**
 * Retrieve all series for a specific canonical category.
 */
export async function getSeriesByCategory(category: string): Promise<SeriesInfo[]> {
  const dbCat = fromCategoryRoute(category);
  const products = await getProducts({ category: dbCat });
  const seriesMap = new Map<string, Product[]>();

  for (const product of products) {
    const seriesName = product.series || 'Industrial Series';
    if (!seriesMap.has(seriesName)) {
      seriesMap.set(seriesName, []);
    }
    seriesMap.get(seriesName)!.push(product);
  }

  const result: SeriesInfo[] = [];
  for (const [seriesName, models] of seriesMap.entries()) {
    result.push(buildSeriesInfo(seriesName, dbCat, models));
  }

  // Sort by model count descending, then series name
  return result.sort((a, b) => b.modelCount - a.modelCount || a.displayName.localeCompare(b.displayName));
}

/**
 * Retrieve a specific series by its category and slug.
 */
export async function getSeriesBySlug(category: string, seriesSlug: string): Promise<SeriesInfo | null> {
  const allInCat = await getSeriesByCategory(category);
  const cleanSlug = seriesSlug.toLowerCase().trim();
  return allInCat.find(s => s.slug === cleanSlug) || null;
}

/**
 * Retrieve detailed category information including dynamic model & series counts,
 * representative imagery, and pressure envelopes.
 */
export async function getCategoriesWithDetails(): Promise<CategoryDetails[]> {
  const [allProducts, allSeries] = await Promise.all([
    getProducts(),
    getAllSeries()
  ]);

  return Object.entries(CANONICAL_CATEGORIES).map(([catSlug, info]) => {
    const models = allProducts.filter(p => p.category === catSlug);
    const seriesForCat = allSeries.filter(s => s.category === catSlug);

    // Pick best representative model for the category
    const repModel = models.find(m => m.is_elite_series || m.featured) || models[0];
    const repImage = repModel
      ? resolveMachineImage(repModel.primary_image_url, repModel.model_code, repModel.category)
      : '/assets/products/hot-water-skid.png';

    const pressures = models.map(m => m.pressure_bar).filter((p): p is number => typeof p === 'number' && p > 0);

    return {
      slug: catSlug,
      routeSlug: toCategoryRoute(catSlug),
      name: info.name,
      tagline: info.tagline,
      description: info.description,
      modelCount: models.length,
      seriesCount: seriesForCat.length,
      representativeImage: repImage,
      representativeModel: repModel,
      minPressureBar: pressures.length > 0 ? Math.min(...pressures) : undefined,
      maxPressureBar: pressures.length > 0 ? Math.max(...pressures) : undefined,
      seriesList: seriesForCat
    };
  });
}
