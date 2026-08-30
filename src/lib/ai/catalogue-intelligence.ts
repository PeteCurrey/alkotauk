import { supabaseAdmin } from '@/lib/supabase/server';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';

export interface AIClassificationResult {
  categorySlug: string;
  categoryName: string;
  subcategory?: string;
  confidence: number;
  reasoning: string;
  model: string;
}

export interface AIBrandMatchResult {
  brandSlug?: string;
  brandName?: string;
  confidence: number;
  reasoning: string;
}

export interface AIAttributeExtractionResult {
  mpn?: string;
  brand?: string;
  pressure_psi?: number;
  pressure_bar?: number;
  flow_lpm?: number;
  thread_type?: string;
  material?: string;
  voltage?: string;
  dimensions?: string;
  compatible_machines?: string[];
  confidence: number;
  raw_attributes?: Record<string, any>;
}

export interface AIDuplicateMatchResult {
  isDuplicate: boolean;
  matchedPartId?: string;
  matchedPartNumber?: string;
  confidence: number;
  reasoning: string;
  evidence: string[];
}

export interface AnomalyScanResult {
  hasAnomalies: boolean;
  anomalyFlags: string[];
  severity: 'low' | 'medium' | 'high';
  warnings: string[];
}

/**
 * Execute a prompt with OpenAI server-side, parsing structured JSON.
 * Returns null if key is missing or request fails.
 */
async function callOpenAIJson<T>(systemPrompt: string, userPrompt: string, model = 'gpt-4o-mini'): Promise<{ data: T | null; error?: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { data: null, error: 'OPENAI_API_KEY is not configured in server environment' };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: `${systemPrompt}\n\nYou MUST respond strictly in valid JSON without markdown formatting or code fences.` },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const errText = await response.text();
      return { data: null, error: `OpenAI API HTTP ${response.status}: ${errText}` };
    }

    const resJson = await response.json();
    const content = resJson.choices?.[0]?.message?.content;
    if (!content) return { data: null, error: 'Empty completion from OpenAI' };

    const parsed = JSON.parse(content) as T;
    return { data: parsed };
  } catch (err: any) {
    return { data: null, error: err.message || 'OpenAI network error' };
  }
}

/**
 * Log an AI decision to the auditable ai_decision_log table
 */
export async function logAIDecision(params: {
  taskType: 'classification' | 'brand_match' | 'product_match' | 'duplicate_detection' | 'attribute_extraction' | 'anomaly_scan';
  sourceType?: 'staged_product' | 'batch' | 'manual' | 'canonical_part';
  sourceId: string;
  inputSummary: string;
  result: Record<string, any>;
  confidence: number;
  model?: string;
}) {
  try {
    await supabaseAdmin.from('ai_decision_log').insert({
      task_type: params.taskType,
      source_type: params.sourceType || 'staged_product',
      source_id: params.sourceId,
      input_summary: params.inputSummary.slice(0, 1000),
      result: params.result,
      confidence: params.confidence,
      model: params.model || 'gpt-4o-mini',
    });
  } catch (err) {
    console.error('Failed to log AI decision:', err);
  }
}

/**
 * 1. AI Product Classification
 */
export async function classifyProduct(title: string, description?: string, brand?: string, sourceId = 'temp'): Promise<AIClassificationResult> {
  const categoriesList = MASTER_TAXONOMY.map(c => `${c.slug}: ${c.name} (${c.shortDesc})`).join('\n');

  const systemPrompt = `You are an industrial pressure washer parts cataloging expert for Alkota UK.
Classify the given industrial component into exactly ONE of the standard Alkota Master Categories:

AVAILABLE MASTER CATEGORIES:
${categoriesList}

Output JSON schema:
{
  "categorySlug": "pumps",
  "categoryName": "Pumps & Plunger Components",
  "subcategory": "Plunger Seal Kits",
  "confidence": 0.95,
  "reasoning": "Explicitly mentions Giant P217 seal replacement packing."
}`;

  const userPrompt = `Product Title: ${title}
Description: ${description || 'None'}
Brand/Manufacturer: ${brand || 'Unknown'}`;

  const { data } = await callOpenAIJson<any>(systemPrompt, userPrompt);

  if (data && data.categorySlug) {
    const res: AIClassificationResult = {
      categorySlug: data.categorySlug,
      categoryName: data.categoryName || data.categorySlug,
      subcategory: data.subcategory,
      confidence: typeof data.confidence === 'number' ? Math.min(1, Math.max(0, data.confidence)) : 0.85,
      reasoning: data.reasoning || 'AI classified from product title and attributes',
      model: 'gpt-4o-mini',
    };

    await logAIDecision({
      taskType: 'classification',
      sourceId,
      inputSummary: `${title} | ${brand}`,
      result: res,
      confidence: res.confidence,
    });

    return res;
  }

  // Deterministic Fallback Rule Classification
  return fallbackClassify(title, description);
}

/**
 * 2. AI Brand Recognition
 */
export async function recogniseBrand(title: string, rawManufacturer?: string, sourceId = 'temp'): Promise<AIBrandMatchResult> {
  const systemPrompt = `You are an industrial parts cataloguing expert. Identify the manufacturer/brand of the pressure washer component.
Known major brands: Alkota, Giant, Interpump, General Pump, CAT Pumps, PA, Mosmatic, CoxREELS, Steel Eagle, Suttner, Comet, Annovi Reverberi, Hawk, Udor, Pratissoli, Riello, Beckett, Delavan.

Output JSON:
{
  "brandSlug": "giant-pumps",
  "brandName": "Giant",
  "confidence": 0.98,
  "reasoning": "Product title starts with Giant OEM model number."
}`;

  const { data } = await callOpenAIJson<any>(systemPrompt, `Title: ${title}\nRaw Manufacturer: ${rawManufacturer || 'None'}`);

  if (data && data.brandName) {
    const res: AIBrandMatchResult = {
      brandSlug: data.brandSlug?.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      brandName: data.brandName,
      confidence: data.confidence || 0.9,
      reasoning: data.reasoning || 'Matched from product title',
    };

    await logAIDecision({
      taskType: 'brand_match',
      sourceId,
      inputSummary: `${title} (${rawManufacturer})`,
      result: res,
      confidence: res.confidence,
    });

    return res;
  }

  return {
    brandName: rawManufacturer || 'Unknown',
    confidence: 0.5,
    reasoning: 'Fallback to raw supplier field',
  };
}

/**
 * 3. AI Attribute Extraction
 */
export async function extractAttributes(title: string, description?: string, sourceId = 'temp'): Promise<AIAttributeExtractionResult> {
  const systemPrompt = `Extract structured technical engineering attributes for high-pressure washing components.
Only extract values explicitly supported by the text. Never hallucinate or invent specs.

Output JSON:
{
  "mpn": "2021-04",
  "brand": "General Pump",
  "pressure_psi": 3000,
  "pressure_bar": 200,
  "flow_lpm": 15,
  "thread_type": "3/8\" BSP F",
  "material": "Stainless Steel 316",
  "voltage": "240V 1ph",
  "compatible_machines": ["430XH", "4358"],
  "confidence": 0.92
}`;

  const { data } = await callOpenAIJson<any>(systemPrompt, `Title: ${title}\nDescription: ${description || 'None'}`);

  if (data) {
    const res: AIAttributeExtractionResult = {
      mpn: data.mpn,
      brand: data.brand,
      pressure_psi: data.pressure_psi,
      pressure_bar: data.pressure_bar,
      flow_lpm: data.flow_lpm,
      thread_type: data.thread_type,
      material: data.material,
      voltage: data.voltage,
      dimensions: data.dimensions,
      compatible_machines: data.compatible_machines,
      confidence: data.confidence || 0.85,
      raw_attributes: data,
    };

    await logAIDecision({
      taskType: 'attribute_extraction',
      sourceId,
      inputSummary: `${title}`,
      result: res,
      confidence: res.confidence,
    });

    return res;
  }

  return { confidence: 0.0 };
}

/**
 * 4. AI Duplicate Detection & Master Matching
 */
export async function detectDuplicatesAI(
  staged: { title: string; supplier_sku: string; mpn?: string; brand?: string; cost_price: number },
  candidates: { id: string; part_number: string; mpn?: string; name: string; brand?: string; price?: number }[],
  sourceId = 'temp'
): Promise<AIDuplicateMatchResult> {
  if (candidates.length === 0) {
    return { isDuplicate: false, confidence: 0.0, reasoning: 'No existing candidate parts in category', evidence: [] };
  }

  const systemPrompt = `You are a strict catalog de-duplication engine for Alkota UK.
Determine if the NEW incoming supplier product matches ANY of the EXISTING catalogue products.
Two products are a DUPLICATE if they represent the EXACT SAME physical engineering component (e.g. same OEM seal kit, same pump model, same nozzle), even if the title phrasing differs slightly.
Do NOT match if they are different sizes, different thread types, or different pump series.

Output JSON:
{
  "isDuplicate": true,
  "matchedPartId": "uuid-of-existing",
  "matchedPartNumber": "PART-001",
  "confidence": 0.95,
  "reasoning": "Both products are the Giant P217 V-packing seal kit matching MPN P217-SEAL.",
  "evidence": ["Exact MPN match", "Identical pump series compatibility"]
}`;

  const userPrompt = `INCOMING SUPPLIER PRODUCT:
SKU: ${staged.supplier_sku}
MPN: ${staged.mpn || 'None'}
Title: ${staged.title}
Brand: ${staged.brand || 'Unknown'}
Cost: £${staged.cost_price}

EXISTING CATALOGUE CANDIDATES:
${JSON.stringify(candidates.slice(0, 8), null, 2)}`;

  const { data } = await callOpenAIJson<any>(systemPrompt, userPrompt);

  if (data && typeof data.isDuplicate === 'boolean') {
    const res: AIDuplicateMatchResult = {
      isDuplicate: data.isDuplicate,
      matchedPartId: data.matchedPartId,
      matchedPartNumber: data.matchedPartNumber,
      confidence: data.confidence || 0.9,
      reasoning: data.reasoning || 'AI matching analysis',
      evidence: data.evidence || [],
    };

    await logAIDecision({
      taskType: 'duplicate_detection',
      sourceId,
      inputSummary: `${staged.supplier_sku}: ${staged.title}`,
      result: res,
      confidence: res.confidence,
    });

    return res;
  }

  return { isDuplicate: false, confidence: 0.0, reasoning: 'AI matching unavailable', evidence: [] };
}

/**
 * 5. Anomaly Scanning
 */
export function scanAnomalies(product: {
  cost_price: number;
  calculated_retail?: number;
  mpn?: string;
  image_urls?: string[];
  stock_quantity?: number;
  previous_cost_price?: number;
}): AnomalyScanResult {
  const flags: string[] = [];
  const warnings: string[] = [];

  // Cost spike > 50%
  if (product.previous_cost_price && product.previous_cost_price > 0) {
    const change = (product.cost_price - product.previous_cost_price) / product.previous_cost_price;
    if (change > 0.50) {
      flags.push('cost_spike_50');
      warnings.push(`Cost increased by ${(change * 100).toFixed(1)}% (from £${product.previous_cost_price.toFixed(2)} to £${product.cost_price.toFixed(2)})`);
    }
  }

  // Price below cost
  if (product.calculated_retail && product.calculated_retail < product.cost_price) {
    flags.push('price_below_cost');
    warnings.push(`Calculated retail price (£${product.calculated_retail.toFixed(2)}) is below supplier cost (£${product.cost_price.toFixed(2)})`);
  }

  // Zero cost
  if (product.cost_price <= 0) {
    flags.push('zero_cost_price');
    warnings.push('Cost price is £0.00');
  }

  // Missing MPN
  if (!product.mpn || product.mpn.trim().length === 0) {
    flags.push('missing_mpn');
    warnings.push('Missing Manufacturer Part Number (MPN)');
  }

  // Missing Images
  if (!product.image_urls || product.image_urls.length === 0) {
    flags.push('missing_image');
    warnings.push('No product photography or schematic image associated');
  }

  let severity: 'low' | 'medium' | 'high' = 'low';
  if (flags.includes('price_below_cost') || flags.includes('cost_spike_50')) severity = 'high';
  else if (flags.includes('zero_cost_price') || flags.includes('missing_mpn')) severity = 'medium';

  return {
    hasAnomalies: flags.length > 0,
    anomalyFlags: flags,
    severity,
    warnings,
  };
}

/**
 * Deterministic fallback category classifier if AI is offline
 */
function fallbackClassify(title: string, description?: string): AIClassificationResult {
  const text = `${title} ${description || ''}`.toLowerCase();

  if (text.includes('pump') || text.includes('plunger') || text.includes('manifold') || text.includes('crankshaft')) {
    return { categorySlug: 'pumps', categoryName: 'Pumps & Pump Parts', confidence: 0.88, reasoning: 'Matched pump keywords in title', model: 'rule-based-fallback' };
  }
  if (text.includes('seal') || text.includes('packing') || text.includes('v-pack') || text.includes('o-ring')) {
    return { categorySlug: 'seals-o-rings', categoryName: 'Seals & O-Rings', confidence: 0.90, reasoning: 'Matched seal/packing keywords', model: 'rule-based-fallback' };
  }
  if (text.includes('valve') || text.includes('unloader') || text.includes('vrt') || text.includes('relief')) {
    return { categorySlug: 'valves-unloaders', categoryName: 'Valves & Unloaders', confidence: 0.90, reasoning: 'Matched valve/unloader keywords', model: 'rule-based-fallback' };
  }
  if (text.includes('burner') || text.includes('electrode') || text.includes('ignit') || text.includes('transformer') || text.includes('solenoid')) {
    return { categorySlug: 'burners', categoryName: 'Burners & Ignition', confidence: 0.88, reasoning: 'Matched burner keywords', model: 'rule-based-fallback' };
  }
  if (text.includes('coil') || text.includes('insulation') || text.includes('schedule 80')) {
    return { categorySlug: 'coils', categoryName: 'Heating Coils', confidence: 0.92, reasoning: 'Matched coil keywords', model: 'rule-based-fallback' };
  }
  if (text.includes('hose') || text.includes('reel')) {
    return { categorySlug: 'hoses', categoryName: 'Hoses & Reels', confidence: 0.88, reasoning: 'Matched hose/reel keywords', model: 'rule-based-fallback' };
  }
  if (text.includes('gun') || text.includes('trigger') || text.includes('lance') || text.includes('wand')) {
    return { categorySlug: 'trigger-guns', categoryName: 'Trigger Guns', confidence: 0.85, reasoning: 'Matched spray handle keywords', model: 'rule-based-fallback' };
  }
  if (text.includes('surface cleaner') || text.includes('whirlaway') || text.includes('flat surface') || text.includes('rotary')) {
    return { categorySlug: 'surface-cleaners', categoryName: 'Surface Cleaners', confidence: 0.90, reasoning: 'Matched surface cleaning keywords', model: 'rule-based-fallback' };
  }

  return { categorySlug: 'attachments', categoryName: 'Attachments & Accessories', confidence: 0.50, reasoning: 'General component fallback', model: 'rule-based-fallback' };
}
