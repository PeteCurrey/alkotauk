import { supabaseAdmin } from '@/lib/supabase/server';
import { Part } from '@/lib/types/parts';
import { CANONICAL_RELATIONSHIPS } from '@/lib/relationships/canonical-data';

export interface PartNumberLookupResult {
  matchType: 'exact_mpn' | 'exact_sku' | 'exact_part_number' | 'normalised_match' | 'close_match' | 'none';
  part: Part | null;
  alternatives: Part[];
  is_superseded: boolean;
  superseded_by_part: Part | null;
  supersession_notice?: string;
  confidence: 'EXACT_MATCH' | 'STRONG_MATCH' | 'POSSIBLE_MATCH' | 'NO_MATCH';
}

export interface MachineLookupResult {
  machine: {
    id?: string;
    model_code: string;
    name: string;
    series?: string;
    specs_summary?: string;
    pressure_psi?: number;
    flow_lpm?: number;
    image_url?: string;
  } | null;
  compatibleParts: Array<Part & { compatibility_evidence?: string }>;
  serviceKits: any[];
  accessories: any[];
  totalCompatibleCount: number;
}

export interface AttributeDiscoveryResult {
  candidates: Array<{
    part: Part;
    confidence: 'EXACT_MATCH' | 'STRONG_MATCH' | 'POSSIBLE_MATCH';
    score: number;
    match_reasons: string[];
    verification_warning?: string;
  }>;
  totalMatches: number;
}

export const SAFE_PUBLIC_PART_COLUMNS = `
  id, part_number, sku, mpn, name, slug, description, category, subcategory,
  manufacturer, brand, price, vat_rate, in_stock, stock_type, availability_status,
  superseded_by, weight_kg, dimensions_cm, specifications, technical_notes,
  documents, compatible_machines, image_url, image_gallery, oem_genuine,
  featured, is_attachment, tags, active, created_at, updated_at
`;

/**
 * Normalises a part number or code for flexible comparison:
 * Strips whitespace, hyphens, underscores, dots, and converts to uppercase.
 * Example: 'N07 00006' -> 'N0700006'
 *          'N07-00006' -> 'N0700006'
 *          'n07-00006' -> 'N0700006'
 */
export function normalisePartCode(code?: string | null): string {
  if (!code) return '';
  return code.trim().toUpperCase().replace(/[\s\-_.]+/g, '');
}

/**
 * ROUTE ONE: Part Number Search
 * Prioritises exact MPN, SKU, Part Number, normalised match, with supersession detection.
 */
export async function lookupPartNumber(inputQuery: string): Promise<PartNumberLookupResult> {
  const trimmed = (inputQuery || '').trim();
  if (!trimmed) {
    return {
      matchType: 'none',
      part: null,
      alternatives: [],
      is_superseded: false,
      superseded_by_part: null,
      confidence: 'NO_MATCH',
    };
  }

  const norm = normalisePartCode(trimmed);
  const upper = trimmed.toUpperCase();

  // Split tokens by non-alphanumeric (e.g. "20 001" -> ["20", "001"])
  const tokens = trimmed.split(/[\s\-_.]+/).filter(Boolean);
  const wildcardTokenString = tokens.length > 1 ? tokens.join('%') : trimmed;

  const orClauses = [
    `part_number.ilike.%${trimmed}%`,
    `mpn.ilike.%${trimmed}%`,
    `sku.ilike.%${trimmed}%`,
    `name.ilike.%${trimmed}%`,
  ];

  if (tokens.length > 1) {
    orClauses.push(
      `part_number.ilike.%${wildcardTokenString}%`,
      `mpn.ilike.%${wildcardTokenString}%`,
      `sku.ilike.%${wildcardTokenString}%`
    );
  }

  // 1. Fetch potential candidates from database
  const { data: rawParts, error } = await supabaseAdmin
    .from('parts')
    .select(SAFE_PUBLIC_PART_COLUMNS)
    .eq('active', true)
    .or(orClauses.join(','))
    .limit(30);

  if (error || !rawParts || rawParts.length === 0) {
    // Log zero result
    await logSearchEvent(trimmed, 'part_number', 0, true);

    return {
      matchType: 'none',
      part: null,
      alternatives: [],
      is_superseded: false,
      superseded_by_part: null,
      confidence: 'NO_MATCH',
    };
  }

  const parts = rawParts as Part[];

  // 2. Rank candidates by strict priority
  let bestMatch: Part | null = null;
  let matchType: PartNumberLookupResult['matchType'] = 'none';

  // 2a. Exact MPN
  const exactMpn = parts.find(p => (p.mpn || '').toUpperCase() === upper);
  if (exactMpn) {
    bestMatch = exactMpn;
    matchType = 'exact_mpn';
  }

  // 2b. Exact SKU
  if (!bestMatch) {
    const exactSku = parts.find(p => (p.sku || '').toUpperCase() === upper);
    if (exactSku) {
      bestMatch = exactSku;
      matchType = 'exact_sku';
    }
  }

  // 2c. Exact Part Number
  if (!bestMatch) {
    const exactPn = parts.find(p => (p.part_number || '').toUpperCase() === upper);
    if (exactPn) {
      bestMatch = exactPn;
      matchType = 'exact_part_number';
    }
  }

  // 2d. Normalised match (stripped hyphens/spaces)
  if (!bestMatch) {
    const normMatch = parts.find(p => 
      normalisePartCode(p.part_number) === norm ||
      normalisePartCode(p.mpn) === norm ||
      normalisePartCode(p.sku) === norm
    );
    if (normMatch) {
      bestMatch = normMatch;
      matchType = 'normalised_match';
    }
  }

  // 2e. Prefix or Close match
  if (!bestMatch) {
    const prefixMatch = parts.find(p =>
      (p.part_number || '').toUpperCase().startsWith(upper) ||
      (p.mpn || '').toUpperCase().startsWith(upper)
    );
    if (prefixMatch) {
      bestMatch = prefixMatch;
      matchType = 'close_match';
    }
  }

  // Fallback to top result
  if (!bestMatch && parts.length > 0) {
    bestMatch = parts[0];
    matchType = 'close_match';
  }

  // 3. Handle Supersession
  let is_superseded = false;
  let superseded_by_part: Part | null = null;
  let supersession_notice: string | undefined = undefined;

  if (bestMatch && (bestMatch.superseded_by || (bestMatch as any).discontinued)) {
    is_superseded = true;
    const replacementCode = bestMatch.superseded_by;

    if (replacementCode) {
      // Query the replacement part from Supabase
      const { data: repData } = await supabaseAdmin
        .from('parts')
        .select(SAFE_PUBLIC_PART_COLUMNS)
        .or(`part_number.eq.${replacementCode},sku.eq.${replacementCode},slug.eq.${replacementCode}`)
        .eq('active', true)
        .maybeSingle();

      if (repData) {
        superseded_by_part = repData as Part;
        supersession_notice = `Part number ${bestMatch.part_number} has been officially superseded by the manufacturer. The direct verified replacement is ${superseded_by_part.part_number} (${superseded_by_part.name}).`;
      } else {
        supersession_notice = `Part number ${bestMatch.part_number} is discontinued and superseded by reference ${replacementCode}.`;
      }
    } else {
      supersession_notice = `Part number ${bestMatch.part_number} has been discontinued by the manufacturer. Please contact our workshop team for current equivalent options.`;
    }
  }

  const confidence = 
    matchType === 'exact_mpn' || matchType === 'exact_sku' || matchType === 'exact_part_number'
      ? 'EXACT_MATCH'
      : matchType === 'normalised_match'
      ? 'STRONG_MATCH'
      : 'POSSIBLE_MATCH';

  const alternatives = parts.filter(p => p.id !== bestMatch?.id).slice(0, 6);

  await logSearchEvent(trimmed, 'part_number', bestMatch ? 1 + alternatives.length : 0, !bestMatch);

  return {
    matchType,
    part: bestMatch,
    alternatives,
    is_superseded,
    superseded_by_part,
    supersession_notice,
    confidence,
  };
}

/**
 * ROUTE TWO: Machine Lookup
 * Finds machine and retrieves only verified compatible parts, service kits, and accessories.
 */
export async function lookupMachine(machineQuery: string, categoryFilter?: string): Promise<MachineLookupResult> {
  const trimmed = (machineQuery || '').trim();
  const norm = normalisePartCode(trimmed);

  // 1. Find Machine in machine_models table
  let machineRecord: any = null;

  if (trimmed) {
    const { data: models } = await supabaseAdmin
      .from('machine_models')
      .select('*')
      .eq('active', true);

    if (models && models.length > 0) {
      // Try exact model_code or slug
      machineRecord = models.find(m => 
        normalisePartCode(m.model_code) === norm ||
        normalisePartCode(m.slug) === norm ||
        m.name.toLowerCase().includes(trimmed.toLowerCase())
      );

      // Fallback: substring match
      if (!machineRecord && norm.length >= 3) {
        machineRecord = models.find(m => 
          normalisePartCode(m.model_code).includes(norm) ||
          norm.includes(normalisePartCode(m.model_code))
        );
      }
    }
  }

  if (!machineRecord && !trimmed) {
    return {
      machine: null,
      compatibleParts: [],
      serviceKits: [],
      accessories: [],
      totalCompatibleCount: 0,
    };
  }

  const modelCode = machineRecord?.model_code || trimmed.toUpperCase();
  const machineSlug = machineRecord?.slug || trimmed.toLowerCase();

  // 2. Query verified compatibility from part_machine_compatibility table
  const { data: compRecords } = await supabaseAdmin
    .from('part_machine_compatibility')
    .select('*')
    .or(`machine_model_code.ilike.%${modelCode}%,machine_slug.eq.${machineSlug}`);

  const evidenceMap = new Map<string, string>();
  const partIdsFromComp: string[] = [];

  (compRecords || []).forEach((c: any) => {
    if (c.part_id) {
      partIdsFromComp.push(c.part_id);
      if (c.notes) {
        evidenceMap.set(c.part_id, c.notes);
      }
    }
  });

  // 3. Query parts that explicitly list this machine model in compatible_machines array
  let partsQuery = supabaseAdmin
    .from('parts')
    .select(SAFE_PUBLIC_PART_COLUMNS)
    .eq('active', true);

  if (partIdsFromComp.length > 0) {
    partsQuery = partsQuery.or(`id.in.(${partIdsFromComp.join(',')}),compatible_machines.cs.{"${modelCode}"}`);
  } else {
    partsQuery = partsQuery.contains('compatible_machines', [modelCode]);
  }

  if (categoryFilter && categoryFilter !== 'all') {
    partsQuery = partsQuery.eq('category', categoryFilter);
  }

  const { data: compatiblePartsRaw } = await partsQuery.limit(40);
  const rawPartsList = (compatiblePartsRaw as Part[]) || [];

  const compatibleParts = rawPartsList.map(p => {
    const evidence = evidenceMap.get(p.id) || `OEM Verified Fitment: Listed as genuine compatible component for Alkota ${modelCode}.`;
    return {
      ...p,
      compatibility_evidence: evidence,
    };
  });

  // 4. Fetch service kits specified for this machine
  const { data: kitsRaw } = await supabaseAdmin
    .from('service_kits')
    .select('*')
    .eq('active', true);

  const serviceKits = (kitsRaw || []).filter((k: any) => {
    const appStr = (k.machine_application || k.name || '').toUpperCase();
    return appStr.includes(modelCode) || (machineRecord?.series && appStr.includes(machineRecord.series.toUpperCase()));
  });

  // 5. Fetch recommended accessories from canonical / product_relationships (Domain: GENERAL)
  const canonicalAccessories = CANONICAL_RELATIONSHIPS.filter(r => 
    r.relationship_domain === 'GENERAL' &&
    ['ACCESSORY', 'RELATED_ACCESSORY', 'RECOMMENDED_PRODUCT'].includes(r.relationship_type)
  );

  // Pick suitable general accessories
  const accessories = canonicalAccessories.slice(0, 4).map(a => ({
    id: a.id,
    target_id: a.target_id,
    title: a.target_id.replace(/-/g, ' ').toUpperCase(),
    notes: a.notes || 'Recommended accessory for enhanced operation.',
    href: `/parts-attachments/product/${a.target_id}`,
  }));

  await logSearchEvent(modelCode, 'machine_lookup', compatibleParts.length, compatibleParts.length === 0);

  return {
    machine: machineRecord ? {
      id: machineRecord.id,
      model_code: machineRecord.model_code,
      name: machineRecord.name,
      series: machineRecord.series,
      specs_summary: machineRecord.specs_summary,
      pressure_psi: machineRecord.pressure_psi,
      flow_lpm: machineRecord.flow_lpm,
      image_url: machineRecord.image_url,
    } : null,
    compatibleParts,
    serviceKits,
    accessories,
    totalCompatibleCount: compatibleParts.length,
  };
}

/**
 * ROUTE THREE: Attribute-Driven Discovery
 * Classifies results into Exact Match, Strong Match, and Possible Match (with verification notice).
 */
export async function attributeDiscovery(options: {
  category: string;
  attributes?: Record<string, string>;
  machineModel?: string;
  description?: string;
}): Promise<AttributeDiscoveryResult> {
  const { category, attributes = {}, machineModel, description = '' } = options;

  if (!category) {
    return { candidates: [], totalMatches: 0 };
  }

  // 1. Query parts in category
  let query = supabaseAdmin
    .from('parts')
    .select(SAFE_PUBLIC_PART_COLUMNS)
    .eq('active', true);

  if (category !== 'all') {
    query = query.eq('category', category);
  }

  const { data: rawParts } = await query.limit(60);
  const parts = (rawParts as Part[]) || [];

  const normModel = machineModel ? normalisePartCode(machineModel) : null;
  const descKeywords = description
    .toLowerCase()
    .split(/[\s,.;]+/)
    .filter(w => w.length > 2);

  const scored: Array<{
    part: Part;
    confidence: 'EXACT_MATCH' | 'STRONG_MATCH' | 'POSSIBLE_MATCH';
    score: number;
    match_reasons: string[];
    verification_warning?: string;
  }> = [];

  for (const part of parts) {
    let score = 20; // Base score for category match
    const match_reasons: string[] = [`Category: ${part.category}`];
    const pText = `${part.name} ${part.description || ''} ${part.technical_notes || ''} ${JSON.stringify(part.specifications || {})} ${(part.tags || []).join(' ')}`.toLowerCase();

    // Machine check
    if (normModel && Array.isArray(part.compatible_machines)) {
      const isCompat = part.compatible_machines.some(m => normalisePartCode(m) === normModel);
      if (isCompat) {
        score += 40;
        match_reasons.push(`Verified compatible with ${machineModel}`);
      }
    }

    // Attribute matches
    for (const [key, val] of Object.entries(attributes)) {
      if (!val) continue;
      const vLower = val.toLowerCase().trim();
      if (pText.includes(vLower)) {
        score += 15;
        match_reasons.push(`Matched ${key}: ${val}`);
      }
    }

    // Keyword matches from description
    for (const kw of descKeywords) {
      if (pText.includes(kw)) {
        score += 5;
        match_reasons.push(`Matches keyword: "${kw}"`);
      }
    }

    let confidence: 'EXACT_MATCH' | 'STRONG_MATCH' | 'POSSIBLE_MATCH' = 'POSSIBLE_MATCH';
    let verification_warning: string | undefined = undefined;

    if (score >= 60) {
      confidence = 'EXACT_MATCH';
    } else if (score >= 35) {
      confidence = 'STRONG_MATCH';
    } else {
      confidence = 'POSSIBLE_MATCH';
      verification_warning = 'Let\'s verify this before you order. Specifications partially match your query.';
    }

    scored.push({
      part,
      confidence,
      score,
      match_reasons,
      verification_warning,
    });
  }

  scored.sort((a, b) => b.score - a.score);

  return {
    candidates: scored.slice(0, 24),
    totalMatches: scored.length,
  };
}

/**
 * Anonymous, customer-safe event tracking for search analytics.
 */
async function logSearchEvent(
  query: string,
  searchType: string,
  resultsCount: number,
  isZeroResult: boolean
) {
  try {
    await supabaseAdmin.from('search_analytics').insert({
      query: query.slice(0, 100),
      filters: { search_type: searchType },
      results_count: resultsCount,
      is_zero_result: isZeroResult,
    });
  } catch {
    // Gracefully ignore logging errors
  }
}
