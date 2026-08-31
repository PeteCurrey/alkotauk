import { supabaseAdmin } from '@/lib/supabase/server';
import {
  ChemicalMasterFormulation,
  ChemicalRetailProduct,
  ChemicalApplication,
  ChemicalCleaningProblem,
  ChemicalSurface,
  ChemicalSKU,
  ChemicalFinderQuery,
} from '@/lib/types/chemical-commerce';
import {
  MASTER_FORMULATIONS,
  RETAIL_PRODUCTS,
  CHEMICAL_APPLICATIONS,
  CHEMICAL_CLEANING_PROBLEMS,
  CHEMICAL_SURFACES,
  CHEMICAL_SKUS,
} from './seed-data';

// ============================================================================
// MASTER FORMULATIONS
// ============================================================================

export async function getMasterFormulations(): Promise<ChemicalMasterFormulation[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('chemical_master_formulations')
      .select('*')
      .order('master_code');

    if (data && data.length > 0 && !error) {
      // Annotate with count of retail products
      return data.map((form) => {
        const linkedRetail = RETAIL_PRODUCTS.filter(r => r.master_formulation_id === form.id || r.originating_master_code === form.master_code);
        const linkedSkus = CHEMICAL_SKUS.filter(s => linkedRetail.some(r => r.id === s.retail_product_id));
        return {
          ...form,
          retail_products_count: linkedRetail.length,
          skus_count: linkedSkus.length,
        };
      });
    }
  } catch (err) {
    // Fallback gracefully
  }

  // Canonical Seed Fallback
  return MASTER_FORMULATIONS.map((form) => {
    const linkedRetail = RETAIL_PRODUCTS.filter(r => r.master_formulation_id === form.id || r.originating_master_code === form.master_code);
    const linkedSkus = CHEMICAL_SKUS.filter(s => linkedRetail.some(r => r.id === s.retail_product_id));
    return {
      ...form,
      retail_products_count: linkedRetail.length,
      skus_count: linkedSkus.length,
    };
  });
}

export async function getMasterFormulationByCode(code: string): Promise<ChemicalMasterFormulation | null> {
  const norm = code.trim().toUpperCase();
  try {
    const { data } = await supabaseAdmin
      .from('chemical_master_formulations')
      .select('*')
      .eq('master_code', norm)
      .single();

    if (data) return data;
  } catch {}

  return MASTER_FORMULATIONS.find(f => f.master_code.toUpperCase() === norm) || null;
}

export async function getMasterFormulationById(id: string): Promise<ChemicalMasterFormulation | null> {
  try {
    const { data } = await supabaseAdmin
      .from('chemical_master_formulations')
      .select('*')
      .eq('id', id)
      .single();

    if (data) return data;
  } catch {}

  return MASTER_FORMULATIONS.find(f => f.id === id) || null;
}

// ============================================================================
// RETAIL CHEMICAL PRODUCTS
// ============================================================================

export async function getRetailProducts(options?: {
  applicationSlug?: string;
  family?: string;
  featuredOnly?: boolean;
  limit?: number;
}): Promise<ChemicalRetailProduct[]> {
  let products = [...RETAIL_PRODUCTS];

  try {
    let query = supabaseAdmin
      .from('chemical_retail_products')
      .select('*')
      .eq('published', true)
      .order('sort_order');

    if (options?.featuredOnly) query = query.eq('featured', true);
    if (options?.limit) query = query.limit(options.limit);

    const { data } = await query;
    if (data && data.length > 0) {
      products = data;
    }
  } catch {}

  // Hydrate with Master Formulations and SKUs
  let enriched = products.map((prod) => {
    const formulation = MASTER_FORMULATIONS.find(f => f.id === prod.master_formulation_id || f.master_code === prod.originating_master_code);
    const skus = CHEMICAL_SKUS.filter(s => s.retail_product_id === prod.id);
    return {
      ...prod,
      master_formulation: formulation,
      originating_master_code: formulation?.master_code || prod.originating_master_code || 'UNASSIGNED',
      originating_master_name: formulation?.original_name || prod.originating_master_name || '',
      skus,
    };
  });

  if (options?.applicationSlug) {
    const app = CHEMICAL_APPLICATIONS.find(a => a.slug === options.applicationSlug);
    if (app) {
      enriched = enriched.filter(p => 
        p.primary_application.toLowerCase().includes(app.name.toLowerCase().split(' ')[0]) ||
        p.long_description.toLowerCase().includes(app.name.toLowerCase().split(' ')[0])
      );
    }
  }

  if (options?.family) {
    enriched = enriched.filter(p => p.retail_family.toLowerCase() === options.family?.toLowerCase());
  }

  if (options?.featuredOnly) {
    enriched = enriched.filter(p => p.featured);
  }

  if (options?.limit) {
    enriched = enriched.slice(0, options.limit);
  }

  return enriched;
}

export async function getRetailProductBySlug(slug: string): Promise<ChemicalRetailProduct | null> {
  const norm = slug.trim().toLowerCase();
  
  // 1. Direct match in local seed definitions
  let prod = RETAIL_PRODUCTS.find(p => p.slug.toLowerCase() === norm) || null;

  // 2. Direct match in Supabase
  try {
    const { data } = await supabaseAdmin
      .from('chemical_retail_products')
      .select('*')
      .eq('slug', norm)
      .single();

    if (data) prod = data;
  } catch {}

  // 3. Fallback: Check known aliases and shorthands
  if (!prod) {
    const SLUG_ALIASES: Record<string, string> = {
      'greasecut-workshop-degreaser': 'greasecut-multi-surface-workshop-degreaser',
      'greasecut-super-duty-degreaser': 'greasecut-multi-surface-workshop-degreaser',
      'greasecut-degreaser': 'greasecut-multi-surface-workshop-degreaser',
      'greasecut': 'greasecut-multi-surface-workshop-degreaser',
      'scaleguard-coil-protector': 'scaleguard-water-softener-coil-protector',
      'scaleguard': 'scaleguard-water-softener-coil-protector',
      'roadforce-fleet-tfr': 'roadforce-fleet-heavy-tfr',
      'roadforce-tfr': 'roadforce-fleet-heavy-tfr',
      'roadforce': 'roadforce-fleet-heavy-tfr',
      'alumarestore-acid-brightener': 'alumarestore-aluminium-acid-brightener',
      'alumarestore': 'alumarestore-aluminium-acid-brightener',
      'citrusforce-degreaser': 'citrusforce-natural-solvent-degreaser',
      'coilrestore-descaler': 'coilrestore-schedule-80-coil-descaler',
    };

    const targetSlug = SLUG_ALIASES[norm];
    if (targetSlug) {
      prod = RETAIL_PRODUCTS.find(p => p.slug.toLowerCase() === targetSlug) || null;
      if (!prod) {
        try {
          const { data } = await supabaseAdmin
            .from('chemical_retail_products')
            .select('*')
            .eq('slug', targetSlug)
            .single();
          if (data) prod = data;
        } catch {}
      }
    }
  }

  // 4. Fuzzy fallback: prefix or partial match
  if (!prod) {
    const firstWord = norm.split('-')[0];
    if (firstWord && firstWord.length > 3) {
      prod = RETAIL_PRODUCTS.find(p => p.slug.toLowerCase().startsWith(firstWord)) || null;
    }
  }

  if (!prod) return null;

  const formulation = MASTER_FORMULATIONS.find(f => f.id === prod.master_formulation_id || f.master_code === prod.originating_master_code);
  const skus = CHEMICAL_SKUS.filter(s => s.retail_product_id === prod.id);

  return {
    ...prod,
    master_formulation: formulation,
    originating_master_code: formulation?.master_code || prod.originating_master_code || 'UNASSIGNED',
    originating_master_name: formulation?.original_name || prod.originating_master_name || '',
    skus,
  };
}

// ============================================================================
// APPLICATIONS TAXONOMY
// ============================================================================

export async function getChemicalApplications(): Promise<ChemicalApplication[]> {
  try {
    const { data } = await supabaseAdmin
      .from('chemical_applications')
      .select('*')
      .eq('active', true)
      .order('sort_order');

    if (data && data.length > 0) return data;
  } catch {}

  return CHEMICAL_APPLICATIONS.map((app) => {
    const count = RETAIL_PRODUCTS.filter(p => 
      p.primary_application.toLowerCase().includes(app.name.toLowerCase().split(' ')[0]) ||
      p.long_description.toLowerCase().includes(app.name.toLowerCase().split(' ')[0])
    ).length;
    return { ...app, product_count: count };
  });
}

export async function getChemicalApplicationBySlug(slug: string): Promise<ChemicalApplication | null> {
  const norm = slug.trim().toLowerCase();
  try {
    const { data } = await supabaseAdmin
      .from('chemical_applications')
      .select('*')
      .eq('slug', norm)
      .single();

    if (data) return data;
  } catch {}

  return CHEMICAL_APPLICATIONS.find(a => a.slug.toLowerCase() === norm) || null;
}

// ============================================================================
// SEARCH & GUIDED FINDER
// ============================================================================

export async function searchChemicals(query: string): Promise<{
  query: string;
  matchedMasterCodes: ChemicalMasterFormulation[];
  retailProducts: ChemicalRetailProduct[];
  totalCount: number;
}> {
  const q = query.trim().toLowerCase();
  if (!q) {
    const all = await getRetailProducts();
    return {
      query: '',
      matchedMasterCodes: [],
      retailProducts: all,
      totalCount: all.length,
    };
  }

  // 1. Check if user typed master code directly (e.g. 'TR-407', 'DE 703', '407')
  const matchedCodes = MASTER_FORMULATIONS.filter(f => 
    f.master_code.toLowerCase().includes(q) ||
    f.original_name.toLowerCase().includes(q)
  );

  // 2. Search Retail Products
  const allRetail = await getRetailProducts();
  const matchedRetail = allRetail.filter(p => {
    return (
      p.retail_name.toLowerCase().includes(q) ||
      p.originating_master_code.toLowerCase().includes(q) ||
      p.originating_master_name.toLowerCase().includes(q) ||
      p.retail_family.toLowerCase().includes(q) ||
      p.short_description.toLowerCase().includes(q) ||
      p.primary_application.toLowerCase().includes(q) ||
      p.technical_summary.toLowerCase().includes(q) ||
      p.skus?.some(s => s.sku_code.toLowerCase().includes(q) || s.pack_size.toLowerCase().includes(q))
    );
  });

  return {
    query,
    matchedMasterCodes: matchedCodes,
    retailProducts: matchedRetail,
    totalCount: matchedRetail.length,
  };
}

export async function matchChemicalsGuided(criteria: ChemicalFinderQuery): Promise<{
  primaryMatch: ChemicalRetailProduct | null;
  alternativeMatches: ChemicalRetailProduct[];
  fitExplanation: string;
}> {
  const allProducts = await getRetailProducts();
  let scored = allProducts.map(product => {
    let score = 0;
    const reasons: string[] = [];

    // Application Match
    if (criteria.applicationSlug) {
      const app = CHEMICAL_APPLICATIONS.find(a => a.slug === criteria.applicationSlug);
      if (app) {
        if (product.primary_application.toLowerCase().includes(app.name.toLowerCase().split(' ')[0])) {
          score += 40;
          reasons.push(`Targeted for ${app.name}`);
        } else if (product.long_description.toLowerCase().includes(app.name.toLowerCase().split(' ')[0])) {
          score += 20;
        }
      }
    }

    // Problem Match
    if (criteria.problemSlug) {
      const prob = CHEMICAL_CLEANING_PROBLEMS.find(p => p.slug === criteria.problemSlug);
      if (prob) {
        if (product.short_description.toLowerCase().includes(prob.name.toLowerCase().split(' ')[0]) ||
            product.long_description.toLowerCase().includes(prob.name.toLowerCase().split(' ')[0])) {
          score += 35;
          reasons.push(`Dissolves ${prob.name}`);
        }
      }
    }

    // Surface Compatibility Match
    if (criteria.surfaceSlug) {
      const surf = CHEMICAL_SURFACES.find(s => s.slug === criteria.surfaceSlug);
      if (surf) {
        const compat = product.surface_compatibility.find(sc => sc.surface.toLowerCase().includes(surf.name.toLowerCase().split(' ')[0]));
        if (compat) {
          if (compat.suitability === 'recommended') {
            score += 30;
            reasons.push(`Recommended for ${surf.name}`);
          } else if (compat.suitability === 'safe') {
            score += 15;
          } else if (compat.suitability === 'do_not_use') {
            score -= 100;
          }
        }
      }
    }

    // Desired Result
    if (criteria.desiredResult) {
      if (criteria.desiredResult === 'brighten' && product.retail_family.toLowerCase().includes('luma')) score += 25;
      if (criteria.desiredResult === 'degrease' && (product.retail_family.toLowerCase().includes('degrease') || product.retail_family.toLowerCase().includes('forge'))) score += 25;
      if (criteria.desiredResult === 'protect' && product.retail_family.toLowerCase().includes('guard')) score += 25;
    }

    return {
      product,
      score,
      reason: reasons.join(' · ') || 'Industrial multipurpose compatibility',
    };
  });

  scored.sort((a, b) => b.score - a.score);

  const primary = scored[0] && scored[0].score > 0 ? scored[0].product : null;
  const alternatives = scored.slice(1, 4).filter(s => s.score > 0).map(s => s.product);

  return {
    primaryMatch: primary,
    alternativeMatches: alternatives,
    fitExplanation: scored[0]?.reason || 'High compatibility with pressure washing operations.',
  };
}

// ============================================================================
// ADMIN METRICS
// ============================================================================

export async function getAdminChemicalMetrics(): Promise<{
  masterFormulationsCount: number;
  retailProductsCount: number;
  skusCount: number;
  needsReviewCount: number;
  verifiedClpCount: number;
  liveProductsCount: number;
  draftProductsCount: number;
  lowStockSkusCount: number;
}> {
  const formulations = MASTER_FORMULATIONS;
  const retail = RETAIL_PRODUCTS;
  const skus = CHEMICAL_SKUS;

  return {
    masterFormulationsCount: formulations.length,
    retailProductsCount: retail.length,
    skusCount: skus.length,
    needsReviewCount: formulations.filter(f => f.compliance_status === 'UK_REVIEW' || f.compliance_status === 'REQUIRES_VERIFICATION').length,
    verifiedClpCount: formulations.filter(f => f.compliance_status === 'VERIFIED_UK_CLP').length,
    liveProductsCount: retail.filter(r => r.merchandising_status === 'live').length,
    draftProductsCount: retail.filter(r => r.merchandising_status === 'draft').length,
    lowStockSkusCount: skus.filter(s => s.stock_quantity < 30).length,
  };
}
