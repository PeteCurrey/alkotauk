import { supabaseAdmin } from '../supabase/server';
import { detectDuplicate, DuplicateMatchResult } from './duplicate-detector';
import { calculateDataQuality } from './provenance';
import { MASTER_TAXONOMY } from './taxonomy';
import { Part, ImportBatch, StagedSupplierProduct } from '../types/parts';

export interface RawSupplierItem {
  supplier_sku: string;
  mpn?: string | null;
  name: string;
  manufacturer?: string | null;
  brand?: string | null;
  category?: string | null;
  subcategory?: string | null;
  description?: string | null;
  cost_price: number;
  trade_price?: number | null;
  retail_price?: number | null;
  stock_quantity?: number;
  in_stock?: boolean;
  lead_time_days?: number;
  weight_kg?: number | null;
  dimensions_cm?: string | null;
  specifications?: Record<string, any>;
  image_url?: string | null;
  image_gallery?: string[];
  document_url?: string | null;
  document_urls?: string[];
  source_reference?: string | null;
  source_document?: string | null;
  source_version?: string | null;
}

export interface IngestionOptions {
  supplierSlug: string;
  triggerMethod?: 'manual' | 'file_upload' | 'scheduled' | 'webhook';
  triggeredBy?: string;
  sourceVersion?: string;
  sourceDocument?: string;
  defaultMarginPct?: number;
}

export interface IngestionResult {
  batchId: string;
  supplierId: string;
  supplierName: string;
  sourceVersion?: string;
  recordsReceived: number;
  recordsValid: number;
  recordsInvalid: number;
  recordsNew: number;
  recordsDuplicates: number;
  recordsReview: number;
  recordsApproved: number;
  recordsPublished: number;
  recordsRejected: number;
  stagedItems: StagedSupplierProduct[];
  unmappedCategories: string[];
}

/**
 * Built-in fallback category mapping for suppliers
 */
const DEFAULT_CATEGORY_FALLBACKS: Record<string, string> = {
  'surface cleaners': 'surface-cleaners',
  'flat surface cleaners': 'surface-cleaners',
  'vacuum recovery': 'surface-cleaners',
  'undercarriage': 'surface-cleaners',
  'spray bars': 'lances-nozzles',
  'spray bar': 'lances-nozzles',
  'pumps': 'pumps',
  'plunger pumps': 'pumps',
  'high pressure pumps': 'pumps',
  'hoses': 'hoses',
  'hose reels': 'hoses',
  'reels': 'hoses',
  'valves': 'valves-unloaders',
  'unloaders': 'valves-unloaders',
  'bypass manifolds': 'valves-unloaders',
  'manifold': 'valves-unloaders',
  'nozzles': 'lances-nozzles',
  'spray nozzles': 'lances-nozzles',
  'trigger guns': 'trigger-guns',
  'spray guns': 'trigger-guns',
  'guns': 'trigger-guns',
  'pressure gauges': 'electrical-switches',
  'gauges': 'electrical-switches',
  'fuel transfer': 'engines-motors',
  'transfer pumps': 'engines-motors',
  'swivels': 'fittings-couplers',
  'couplers': 'fittings-couplers',
  'fittings': 'fittings-couplers',
  'filters': 'filters',
  'filtration': 'filters',
  'injectors': 'attachments',
  'chemical injectors': 'attachments',
  'accessories': 'attachments',
  'seals': 'seals-o-rings',
  'seal kits': 'seals-o-rings',
  'packing': 'seals-o-rings',
};

/**
 * Ingests a raw supplier catalogue through the staged pipeline:
 * RAW -> NORMALISATION -> VALIDATION -> DUPLICATE DETECTION -> CATEGORY MAPPING -> QUALITY SCORING -> STAGING
 */
export async function ingestSupplierCatalogue(
  rawItems: RawSupplierItem[],
  options: IngestionOptions
): Promise<IngestionResult> {
  // 1. Resolve Supplier
  const { data: supplier, error: supErr } = await supabaseAdmin
    .from('suppliers')
    .select('*')
    .eq('slug', options.supplierSlug)
    .single();

  if (supErr || !supplier) {
    throw new Error(`Supplier '${options.supplierSlug}' not found in database.`);
  }

  // 2. Fetch existing parts for duplicate matching
  const { data: existingPartsData } = await supabaseAdmin
    .from('parts')
    .select('id, part_number, sku, mpn, name, brand, manufacturer, price, cost_price, manual_override_fields');
  const existingParts: Part[] = (existingPartsData || []) as any[];

  // 3. Fetch existing supplier products map (supplier_sku -> part_id)
  const { data: supplierProductsData } = await supabaseAdmin
    .from('supplier_products')
    .select('supplier_sku, part_id')
    .eq('supplier_id', supplier.id);
  
  const existingSupplierMap = new Map<string, string>();
  (supplierProductsData || []).forEach(sp => {
    existingSupplierMap.set(sp.supplier_sku, sp.part_id);
  });

  // 4. Fetch category mappings for this supplier
  const categoryMap = new Map<string, string>();
  try {
    const { data: dbCatMappings } = await supabaseAdmin
      .from('supplier_category_mappings')
      .select('raw_category, alkota_category_slug')
      .eq('supplier_id', supplier.id);
    (dbCatMappings || []).forEach(m => {
      if (m.alkota_category_slug) {
        categoryMap.set(m.raw_category.toLowerCase().trim(), m.alkota_category_slug);
      }
    });
  } catch {
    // Graceful fallback if table is pending migration
  }

  // 5. Create Import Batch record in running state
  const marginPct = options.defaultMarginPct || supplier.default_margin_pct || 35.0;
  const batchPayload: any = {
    supplier_id: supplier.id,
    status: 'running',
    trigger_method: options.triggerMethod || 'manual',
    triggered_by: options.triggeredBy || 'admin',
    started_at: new Date().toISOString(),
    notes: `Ingestion for ${supplier.name} (${rawItems.length} items submitted)`,
    metadata: {
      item_count: rawItems.length,
      default_margin_pct: marginPct,
      supplier_slug: supplier.slug,
      source_version: options.sourceVersion || null,
      source_document: options.sourceDocument || null,
    },
  };

  const { data: newBatch, error: batchErr } = await supabaseAdmin
    .from('import_batches')
    .insert(batchPayload)
    .select('*')
    .single();

  if (batchErr || !newBatch) {
    throw new Error(`Failed to create import batch: ${batchErr?.message}`);
  }

  const batchId = newBatch.id;
  const stagedToInsert: any[] = [];
  const unmappedCategories = new Set<string>();

  let countValid = 0;
  let countInvalid = 0;
  let countDuplicates = 0;
  let countNew = 0;
  let countReview = 0;

  // 6. Process each raw item through the pipeline
  for (const item of rawItems) {
    const validationWarnings: string[] = [];
    const anomalyFlags: string[] = [];

    // --- A. Normalisation ---
    const supplierSku = (item.supplier_sku || '').trim();
    const mpn = (item.mpn || item.supplier_sku || '').trim();
    const rawTitle = (item.name || '').trim();
    const rawManufacturer = (item.manufacturer || supplier.name).trim();
    const rawBrand = (item.brand || supplier.slug).trim();
    const costPrice = Number(item.cost_price) || 0;
    const stockQty = Number(item.stock_quantity) || 0;
    const inStock = item.in_stock !== undefined ? Boolean(item.in_stock) : stockQty > 0;

    // --- B. Validation ---
    if (!supplierSku) {
      validationWarnings.push('Missing Supplier Part Number (SKU)');
    }
    if (!rawTitle || rawTitle.length < 3) {
      validationWarnings.push('Invalid or empty product name');
    }
    if (costPrice <= 0) {
      validationWarnings.push('Missing or non-positive supplier cost price');
      anomalyFlags.push('zero_cost_price');
    }

    const isValid = validationWarnings.length === 0;
    if (isValid) countValid++;
    else countInvalid++;

    // --- C. Duplicate Detection ---
    const dupResult: DuplicateMatchResult = detectDuplicate(
      {
        supplierSku,
        rawTitle,
        rawBrand,
        rawManufacturer,
        rawMpn: mpn,
      },
      existingParts,
      existingSupplierMap
    );

    let importStatus: StagedSupplierProduct['import_status'] = 'pending';
    let matchedPartId = dupResult.matchedPartId;
    let matchConfidence = dupResult.matchConfidence;
    let matchReason = dupResult.matchReason;

    if (dupResult.isDuplicate) {
      importStatus = 'matched_duplicate';
      countDuplicates++;
    } else if (dupResult.isPotentialMatch) {
      importStatus = 'pending'; // Requires admin confirmation
      countReview++;
      validationWarnings.push(`Potential duplicate review: ${dupResult.matchReason}`);
    } else {
      importStatus = 'new_product';
      countNew++;
    }

    // --- D. Category Mapping ---
    let mappedCategory = 'other';
    const rawCategory = (item.category || '').trim();
    if (rawCategory) {
      const normRawCat = rawCategory.toLowerCase();
      if (categoryMap.has(normRawCat)) {
        mappedCategory = categoryMap.get(normRawCat)!;
      } else {
        // Fallback matching
        let matchedFallback = false;
        for (const [kw, alkotaSlug] of Object.entries(DEFAULT_CATEGORY_FALLBACKS)) {
          if (normRawCat.includes(kw)) {
            mappedCategory = alkotaSlug;
            matchedFallback = true;
            break;
          }
        }
        if (!matchedFallback) {
          unmappedCategories.add(rawCategory);
          validationWarnings.push(`Unmapped supplier category: "${rawCategory}"`);
          anomalyFlags.push('unmapped_category');
          countReview++;
        }
      }
    } else {
      validationWarnings.push('No category provided by supplier');
      anomalyFlags.push('missing_category');
      countReview++;
    }

    // Calculate customer price based on margin
    const calculatedRetail = costPrice > 0 
      ? Number((costPrice / (1 - marginPct / 100)).toFixed(2))
      : null;

    // --- E. Data Quality Breakdown ---
    const quality = calculateDataQuality({
      part_number: mpn || supplierSku,
      name: rawTitle,
      mpn,
      brand: rawBrand,
      manufacturer: rawManufacturer,
      category: mappedCategory,
      subcategory: item.subcategory,
      description: item.description,
      cost_price: costPrice,
      price: calculatedRetail,
      stock_quantity: stockQty,
      in_stock: inStock,
      weight_kg: item.weight_kg,
      dimensions_cm: item.dimensions_cm,
      image_url: item.image_url,
      documents: item.document_url ? [{ title: 'Spec Sheet', type: 'spec_sheet', url: item.document_url }] : undefined,
    });

    // --- F. Provenance Payload ---
    const provenance = {
      source_type: 'supplier_import',
      supplier_id: supplier.id,
      supplier_slug: supplier.slug,
      supplier_name: supplier.name,
      supplier_sku: supplierSku,
      mpn,
      cost_price: costPrice,
      currency: 'GBP',
      source_document: item.source_document || options.sourceDocument || null,
      source_version: item.source_version || options.sourceVersion || null,
      source_reference: item.source_reference || null,
      imported_at: new Date().toISOString(),
      data_quality_score: quality.totalScore,
      quality_breakdown: quality,
    };

    stagedToInsert.push({
      batch_id: batchId,
      supplier_id: supplier.id,
      supplier_sku: supplierSku,
      mpn,
      manufacturer: rawManufacturer,
      raw_title: rawTitle,
      raw_description: item.description || null,
      raw_category: rawCategory || null,
      raw_brand: rawBrand || null,
      cost_price: costPrice,
      stock_quantity: stockQty,
      in_stock: inStock,
      suggested_category: mappedCategory,
      suggested_brand: rawBrand,
      matched_part_id: matchedPartId,
      match_confidence: matchConfidence,
      match_reason: matchReason,
      import_status: importStatus,
      validation_warnings: validationWarnings,
      anomaly_flags: anomalyFlags,
      image_urls: item.image_url ? [item.image_url] : (item.image_gallery || []),
      document_urls: item.document_url ? [item.document_url] : (item.document_urls || []),
      raw_payload: {
        ...item,
        spn: supplierSku,
        provenance,
        raw_specs: item.specifications || {},
        source_reference: item.source_reference || null,
        source_document: item.source_document || options.sourceDocument || null,
      },
    });
  }

  // 7. Insert staged products into Supabase
  const { data: insertedStaged, error: stagedErr } = await supabaseAdmin
    .from('staged_supplier_products')
    .insert(stagedToInsert)
    .select('*');

  if (stagedErr) {
    await supabaseAdmin
      .from('import_batches')
      .update({
        status: 'failed',
        error_message: stagedErr.message,
        completed_at: new Date().toISOString(),
      })
      .eq('id', batchId);
    throw new Error(`Failed to insert staged products: ${stagedErr.message}`);
  }

  // 8. Update Import Batch with Final Summary Metrics
  const finalStatus = countInvalid > 0 || unmappedCategories.size > 0 
    ? 'completed_with_warnings' 
    : 'completed';

  await supabaseAdmin
    .from('import_batches')
    .update({
      status: finalStatus,
      completed_at: new Date().toISOString(),
      products_discovered: rawItems.length,
      products_new: countNew,
      products_duplicate: countDuplicates,
      products_requiring_review: countReview,
      metadata: {
        ...newBatch.metadata,
        records_received: rawItems.length,
        records_valid: countValid,
        records_invalid: countInvalid,
        records_duplicates: countDuplicates,
        records_new: countNew,
        records_review: countReview,
        records_approved: 0,
        records_published: 0,
        records_rejected: 0,
        unmapped_categories: Array.from(unmappedCategories),
        final_status: finalStatus,
      },
    })
    .eq('id', batchId);

  return {
    batchId,
    supplierId: supplier.id,
    supplierName: supplier.name,
    sourceVersion: options.sourceVersion,
    recordsReceived: rawItems.length,
    recordsValid: countValid,
    recordsInvalid: countInvalid,
    recordsNew: countNew,
    recordsDuplicates: countDuplicates,
    recordsReview: countReview,
    recordsApproved: 0,
    recordsPublished: 0,
    recordsRejected: 0,
    stagedItems: (insertedStaged || []) as StagedSupplierProduct[],
    unmappedCategories: Array.from(unmappedCategories),
  };
}
