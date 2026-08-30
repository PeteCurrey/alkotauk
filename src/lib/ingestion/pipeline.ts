import { supabaseAdmin } from '@/lib/supabase/server';
import { 
  Supplier, 
  ImportBatch, 
  StagedSupplierProduct, 
  NormalisedProduct, 
  Part 
} from '@/lib/types/parts';
import { createSupplierConnector } from '@/lib/supplier-connectors/connector-factory';
import { 
  classifyProduct, 
  recogniseBrand, 
  detectDuplicatesAI, 
  scanAnomalies, 
  extractAttributes 
} from '@/lib/ai/catalogue-intelligence';
import { calculateRetailPrice } from '@/lib/parts/pricing-engine';

/**
 * Structured logger for sync events
 */
export async function logSyncEvent(
  batchId: string,
  level: 'info' | 'warn' | 'error',
  event: string,
  message: string,
  payload?: Record<string, any>,
  supplierSku?: string
) {
  try {
    await supabaseAdmin.from('supplier_sync_logs').insert({
      batch_id: batchId,
      level,
      event,
      message,
      payload: payload || {},
      supplier_sku: supplierSku || null,
    });
  } catch (err) {
    console.error('Failed to write sync log:', err);
  }
}

/**
 * 1. Create a new Import Batch
 */
export async function createImportBatch(
  supplierId: string,
  triggerMethod: 'manual' | 'scheduled' | 'webhook' | 'file_upload' = 'manual',
  triggeredBy = 'admin'
): Promise<ImportBatch> {
  const { data, error } = await supabaseAdmin
    .from('import_batches')
    .insert({
      supplier_id: supplierId,
      status: 'queued',
      trigger_method: triggerMethod,
      triggered_by: triggeredBy,
    })
    .select('*')
    .single();

  if (error || !data) {
    throw new Error(`Failed to create import batch: ${error?.message}`);
  }

  return data as ImportBatch;
}

/**
 * 2. Execute an Import Batch Ingestion Pipeline
 */
export async function executeImportBatch(
  batchId: string,
  rawPayload?: string
): Promise<{ batch: ImportBatch; stagedCount: number }> {
  // Fetch batch & supplier
  const { data: batchData, error: batchErr } = await supabaseAdmin
    .from('import_batches')
    .select('*, supplier:suppliers(*)')
    .eq('id', batchId)
    .single();

  if (batchErr || !batchData) {
    throw new Error(`Batch ${batchId} not found`);
  }

  const batch = batchData as ImportBatch & { supplier: Supplier };
  const supplier = batch.supplier;

  // Update status to running
  await supabaseAdmin
    .from('import_batches')
    .update({ status: 'running', started_at: new Date().toISOString() })
    .eq('id', batchId);

  await supabaseAdmin
    .from('suppliers')
    .update({ sync_status: 'running', last_sync_attempted_at: new Date().toISOString() })
    .eq('id', supplier.id);

  await logSyncEvent(batchId, 'info', 'batch_start', `Starting ingestion for supplier ${supplier.name}`);

  try {
    // 1. Instantiate connector
    const connector = createSupplierConnector(supplier);

    // 2. Fetch raw products
    await logSyncEvent(batchId, 'info', 'fetch_start', `Fetching product payload via ${connector.integrationMethod}`);
    const rawProducts = await connector.fetchProducts({ rawPayload });
    await logSyncEvent(batchId, 'info', 'fetch_complete', `Retrieved ${rawProducts.length} raw products`);

    // 3. Fetch existing master parts for de-duplication
    const { data: existingPartsData } = await supabaseAdmin
      .from('parts')
      .select('id, part_number, mpn, name, brand, price, category')
      .eq('active', true);
    const existingParts = (existingPartsData || []) as any[];

    let newCount = 0;
    let dupCount = 0;
    let reviewCount = 0;
    let failCount = 0;

    // 4. Process each raw item through Normalisation -> AI -> Anomaly Scan -> Staging
    for (const raw of rawProducts) {
      try {
        const norm: NormalisedProduct = connector.normalise(raw);

        // Find duplicate candidates by exact MPN or SKU
        const candidateMatches = existingParts.filter(p => {
          if (norm.mpn && p.mpn && norm.mpn.toLowerCase() === p.mpn.toLowerCase()) return true;
          if (p.part_number.toLowerCase() === norm.supplier_sku.toLowerCase()) return true;
          return false;
        });

        let isDuplicate = candidateMatches.length > 0;
        let matchedPartId = candidateMatches[0]?.id || null;
        let matchConfidence = isDuplicate ? 0.98 : 0.0;
        let matchReason = isDuplicate ? `Exact MPN/SKU match on ${candidateMatches[0]?.part_number}` : '';

        // If no exact match, try AI duplicate match on pump/seal kit items
        if (!isDuplicate && existingParts.length > 0) {
          const aiDup = await detectDuplicatesAI(
            {
              title: norm.raw_title,
              supplier_sku: norm.supplier_sku,
              mpn: norm.mpn,
              brand: norm.raw_brand,
              cost_price: norm.cost_price,
            },
            existingParts.slice(0, 10),
            `batch-${batchId}`
          );

          if (aiDup.isDuplicate && aiDup.confidence >= 0.85) {
            isDuplicate = true;
            matchedPartId = aiDup.matchedPartId || null;
            matchConfidence = aiDup.confidence;
            matchReason = aiDup.reasoning;
          }
        }

        // AI Classification
        const aiClass = await classifyProduct(
          norm.raw_title,
          norm.raw_description,
          norm.raw_brand,
          `batch-${batchId}`
        );

        // Calculate expected retail price
        const calcRetail = calculateRetailPrice(norm.cost_price, supplier.default_margin_pct || 35);

        // Anomaly scanning
        const anomaly = scanAnomalies({
          cost_price: norm.cost_price,
          calculated_retail: calcRetail,
          mpn: norm.mpn,
          image_urls: norm.image_urls,
          stock_quantity: norm.stock_quantity,
        });

        const importStatus = isDuplicate ? 'matched_duplicate' : 'new_product';
        if (isDuplicate) dupCount++;
        else newCount++;

        if (anomaly.hasAnomalies || matchConfidence < 0.90) {
          reviewCount++;
        }

        // Upsert into staged_supplier_products
        await supabaseAdmin.from('staged_supplier_products').upsert({
          supplier_id: supplier.id,
          batch_id: batchId,
          supplier_sku: norm.supplier_sku,
          raw_title: norm.raw_title,
          raw_description: norm.raw_description || null,
          raw_category: norm.raw_category || null,
          raw_brand: norm.raw_brand || null,
          cost_price: norm.cost_price,
          stock_quantity: norm.stock_quantity,
          in_stock: norm.in_stock,
          suggested_category: aiClass.categorySlug,
          suggested_brand: norm.raw_brand || null,
          matched_part_id: matchedPartId,
          match_confidence: matchConfidence,
          match_reason: matchReason,
          ai_category: aiClass.categorySlug,
          ai_confidence: aiClass.confidence,
          ai_reasoning: aiClass.reasoning,
          ai_model: aiClass.model,
          ai_run_at: new Date().toISOString(),
          anomaly_flags: anomaly.anomalyFlags,
          validation_warnings: norm.validation_warnings,
          import_status: importStatus,
          raw_payload: norm.raw_payload,
        }, { onConflict: 'supplier_id,supplier_sku' });

      } catch (itemErr: any) {
        failCount++;
        await logSyncEvent(batchId, 'warn', 'item_failed', `Failed processing SKU ${raw.supplier_sku}: ${itemErr.message}`, undefined, raw.supplier_sku);
      }
    }

    // Finalise batch record
    const finalStatus = failCount > 0 ? 'completed_with_warnings' : 'completed';
    const { data: updatedBatch } = await supabaseAdmin
      .from('import_batches')
      .update({
        status: finalStatus,
        completed_at: new Date().toISOString(),
        products_discovered: rawProducts.length,
        products_new: newCount,
        products_duplicate: dupCount,
        products_failed: failCount,
        products_requiring_review: reviewCount,
      })
      .eq('id', batchId)
      .select('*')
      .single();

    // Update supplier statistics
    await supabaseAdmin
      .from('suppliers')
      .update({
        sync_status: finalStatus,
        last_sync_at: new Date().toISOString(),
        products_discovered: rawProducts.length,
        new_products: newCount,
        sync_error: null,
      })
      .eq('id', supplier.id);

    await logSyncEvent(batchId, 'info', 'batch_complete', `Batch complete: ${newCount} new, ${dupCount} duplicates, ${reviewCount} requiring review`);

    return {
      batch: (updatedBatch || batch) as ImportBatch,
      stagedCount: rawProducts.length,
    };
  } catch (err: any) {
    await supabaseAdmin
      .from('import_batches')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        error_message: err.message,
      })
      .eq('id', batchId);

    await supabaseAdmin
      .from('suppliers')
      .update({
        sync_status: 'failed',
        sync_error: err.message,
      })
      .eq('id', supplier.id);

    await logSyncEvent(batchId, 'error', 'batch_error', `Batch failed: ${err.message}`);
    throw err;
  }
}

/**
 * 3. Approve and Promote a Staged Product into Canonical Catalogue
 */
export async function approveStagedProduct(
  stagedId: string,
  adminUser = 'admin'
): Promise<{ success: boolean; partId: string }> {
  // Fetch staged item
  const { data: staged, error } = await supabaseAdmin
    .from('staged_supplier_products')
    .select('*, supplier:suppliers(*)')
    .eq('id', stagedId)
    .single();

  if (error || !staged) {
    throw new Error(`Staged product ${stagedId} not found`);
  }

  const supplier = staged.supplier as Supplier;
  const margin = supplier?.default_margin_pct || 35;
  const retailPrice = calculateRetailPrice(staged.cost_price, margin);
  const slug = `${staged.suggested_brand || supplier?.slug || 'part'}-${staged.supplier_sku}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-');

  // Check if we are updating an existing matched part or creating new
  let partId = staged.matched_part_id;

  if (partId) {
    // Update existing part cost & stock if lower or preferred
    await supabaseAdmin
      .from('parts')
      .update({
        cost_price: staged.cost_price,
        in_stock: staged.in_stock,
        last_supplier_sync: new Date().toISOString(),
        last_price_update: new Date().toISOString(),
      })
      .eq('id', partId);
  } else {
    // Insert new canonical part
    const { data: newPart, error: insertErr } = await supabaseAdmin
      .from('parts')
      .insert({
        part_number: staged.mpn || staged.supplier_sku,
        sku: staged.supplier_sku,
        mpn: staged.mpn || staged.supplier_sku,
        name: staged.raw_title,
        slug,
        description: staged.raw_description || `Genuine ${staged.raw_brand || supplier?.name} component.`,
        category: staged.suggested_category || 'attachments',
        brand: staged.suggested_brand?.toLowerCase().replace(/[^a-z0-9-]/g, '-') || null,
        manufacturer: staged.raw_brand || supplier?.name,
        price: retailPrice,
        cost_price: staged.cost_price,
        in_stock: staged.in_stock,
        stock_quantity: staged.stock_quantity || 10,
        stock_type: 'supplier_stock',
        lead_time_days: 2,
        preferred_supplier_id: supplier?.id,
        availability_status: staged.in_stock ? 'in_stock' : 'special_order',
        active: true,
        oem_genuine: supplier?.supplier_type === 'manufacturer',
      })
      .select('id')
      .single();

    if (insertErr || !newPart) {
      throw new Error(`Failed to create canonical part: ${insertErr?.message}`);
    }
    partId = newPart.id;
  }

  // Upsert supplier_products multi-source mapping
  await supabaseAdmin.from('supplier_products').upsert({
    part_id: partId,
    supplier_id: supplier.id,
    supplier_sku: staged.supplier_sku,
    supplier_title: staged.raw_title,
    cost_price: staged.cost_price,
    stock_quantity: staged.stock_quantity,
    in_stock: staged.in_stock,
    lead_time_days: 2,
    is_preferred: true,
    last_synced_at: new Date().toISOString(),
  }, { onConflict: 'supplier_id,supplier_sku' });

  // Update staged record to approved
  await supabaseAdmin
    .from('staged_supplier_products')
    .update({
      import_status: 'imported',
      admin_action: 'approved',
      admin_action_by: adminUser,
      admin_action_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      matched_part_id: partId,
    })
    .eq('id', stagedId);

  return { success: true, partId };
}

/**
 * 4. Merge a Staged Product into an Existing Canonical Part
 */
export async function mergeStagedProduct(
  stagedId: string,
  targetPartId: string,
  adminUser = 'admin'
): Promise<{ success: boolean }> {
  const { data: staged } = await supabaseAdmin
    .from('staged_supplier_products')
    .select('*')
    .eq('id', stagedId)
    .single();

  if (!staged) throw new Error('Staged product not found');

  // Insert or update multi-supplier mapping
  await supabaseAdmin.from('supplier_products').upsert({
    part_id: targetPartId,
    supplier_id: staged.supplier_id,
    supplier_sku: staged.supplier_sku,
    supplier_title: staged.raw_title,
    cost_price: staged.cost_price,
    stock_quantity: staged.stock_quantity,
    in_stock: staged.in_stock,
    last_synced_at: new Date().toISOString(),
  }, { onConflict: 'supplier_id,supplier_sku' });

  // Update staged status
  await supabaseAdmin
    .from('staged_supplier_products')
    .update({
      import_status: 'imported',
      admin_action: 'merged',
      admin_action_by: adminUser,
      admin_action_at: new Date().toISOString(),
      matched_part_id: targetPartId,
      published_at: new Date().toISOString(),
    })
    .eq('id', stagedId);

  return { success: true };
}

/**
 * 5. Reject a Staged Product
 */
export async function rejectStagedProduct(
  stagedId: string,
  adminUser = 'admin'
): Promise<{ success: boolean }> {
  await supabaseAdmin
    .from('staged_supplier_products')
    .update({
      import_status: 'rejected',
      admin_action: 'rejected',
      admin_action_by: adminUser,
      admin_action_at: new Date().toISOString(),
    })
    .eq('id', stagedId);

  return { success: true };
}
