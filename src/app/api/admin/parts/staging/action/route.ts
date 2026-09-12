import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { recordPartAuditLog } from '@/lib/parts/provenance';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, staged_id, batch_id, overrides } = body;

    // ─────────────────────────────────────────────────────────
    // ACTION: APPROVE SINGLE STAGED PRODUCT
    // ─────────────────────────────────────────────────────────
    if (action === 'approve') {
      if (!staged_id) {
        return NextResponse.json({ error: 'staged_id is required' }, { status: 400 });
      }

      const { data: staged, error: stErr } = await supabaseAdmin
        .from('staged_supplier_products')
        .select('*, supplier:suppliers(id, slug, name, code, default_margin_pct)')
        .eq('id', staged_id)
        .single();

      if (stErr || !staged) {
        return NextResponse.json({ error: 'Staged product not found' }, { status: 404 });
      }

      const supplier = staged.supplier;
      const mpn = overrides?.mpn || staged.mpn || staged.supplier_sku;
      const supplierSku = staged.supplier_sku;
      const supplierCode = supplier?.code || 'GEN';
      
      // Deterministic internal Alkota part number
      const internalPartNumber = overrides?.part_number || `${supplierCode}-${mpn}`;
      const slug = (overrides?.slug || `${supplier?.slug || 'supplier'}-${mpn}`).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const name = overrides?.name || staged.raw_title;
      const category = overrides?.category || staged.suggested_category || 'other';
      const brand = overrides?.brand || staged.suggested_brand || supplier?.slug;
      const manufacturer = overrides?.manufacturer || staged.manufacturer || supplier?.name;
      const costPrice = staged.cost_price;
      const marginPct = overrides?.margin_pct || supplier?.default_margin_pct || 35;
      const sellingPrice = overrides?.price !== undefined 
        ? overrides.price 
        : (costPrice > 0 ? Number((costPrice / (1 - marginPct / 100)).toFixed(2)) : null);

      // 1. Upsert into parts
      const partPayload = {
        part_number: internalPartNumber,
        sku: supplierSku,
        mpn: mpn,
        name: name,
        slug: slug,
        description: overrides?.description || staged.raw_description,
        category: category,
        brand: brand,
        manufacturer: manufacturer,
        cost_price: costPrice,
        price: sellingPrice,
        in_stock: staged.in_stock,
        stock_quantity: staged.stock_quantity,
        stock_type: 'supplier_stock',
        supplier_stock_qty: staged.stock_quantity,
        preferred_supplier_id: staged.supplier_id,
        availability_status: staged.in_stock ? 'in_stock' : 'check_availability',
        image_url: staged.image_urls?.[0] || null,
        image_gallery: staged.image_urls || [],
        specifications: staged.raw_specs || {},
        catalogue_source: 'supplier_import',
        source_type: 'supplier_import',
        source_reference: staged.source_reference,
        source_document: staged.source_document,
        source_last_checked: new Date().toISOString(),
        publication_status: sellingPrice && sellingPrice > 0 ? 'published' : 'request_availability',
        active: true,
        needs_review: false,
        updated_at: new Date().toISOString(),
      };

      let insertedPart: any = null;
      const { data: pData, error: partErr } = await supabaseAdmin
        .from('parts')
        .upsert(partPayload, { onConflict: 'part_number' })
        .select('id, part_number')
        .single();

      if (partErr) {
        const corePayload = {
          part_number: internalPartNumber,
          sku: supplierSku,
          mpn: mpn,
          name: name,
          slug: slug,
          description: overrides?.description || staged.raw_description,
          category: category,
          brand: brand,
          manufacturer: manufacturer,
          cost_price: costPrice,
          price: sellingPrice,
          in_stock: staged.in_stock,
          stock_quantity: staged.stock_quantity,
          stock_type: 'supplier_stock',
          supplier_stock_qty: staged.stock_quantity,
          preferred_supplier_id: staged.supplier_id,
          availability_status: staged.in_stock ? 'in_stock' : 'check_availability',
          image_url: staged.image_urls?.[0] || null,
          image_gallery: staged.image_urls || [],
          catalogue_source: 'supplier_import',
          active: true,
          needs_review: false,
          updated_at: new Date().toISOString(),
        };
        const { data: coreData, error: coreErr } = await supabaseAdmin
          .from('parts')
          .upsert(corePayload, { onConflict: 'part_number' })
          .select('id, part_number')
          .single();
        if (coreErr) throw new Error(`Failed to promote part: ${coreErr.message}`);
        insertedPart = coreData;
      } else {
        insertedPart = pData;
      }

      // 2. Link in supplier_products table
      await supabaseAdmin
        .from('supplier_products')
        .upsert({
          part_id: insertedPart.id,
          supplier_id: staged.supplier_id,
          supplier_sku: supplierSku,
          supplier_title: staged.raw_title,
          cost_price: costPrice,
          stock_quantity: staged.stock_quantity,
          in_stock: staged.in_stock,
          is_preferred: true,
          last_synced_at: new Date().toISOString(),
        }, { onConflict: 'supplier_id,supplier_sku' });

      // 3. Mark staged product as approved & imported
      await supabaseAdmin
        .from('staged_supplier_products')
        .update({
          admin_action: 'approved',
          admin_action_by: 'admin',
          admin_action_at: new Date().toISOString(),
          published_at: new Date().toISOString(),
          import_status: 'imported',
          matched_part_id: insertedPart.id,
        })
        .eq('id', staged_id);

      // 4. Record in part_audit_log
      await recordPartAuditLog({
        part_id: insertedPart.id,
        part_number: insertedPart.part_number,
        action: 'published',
        changed_field: 'publication_status',
        old_value: 'staged',
        new_value: 'published',
        changed_by: 'admin',
        source: `Supplier Staging Approval (${supplier?.name})`,
        notes: `Promoted from staged SKU ${supplierSku}. Retail: £${sellingPrice}, Cost: £${costPrice}`,
      });

      return NextResponse.json({ success: true, part_id: insertedPart.id, part_number: insertedPart.part_number });
    }

    // ─────────────────────────────────────────────────────────
    // ACTION: MERGE DUPLICATE INTO EXISTING CANONICAL PART
    // ─────────────────────────────────────────────────────────
    if (action === 'merge') {
      const { target_part_id } = body;
      if (!staged_id || !target_part_id) {
        return NextResponse.json({ error: 'staged_id and target_part_id are required' }, { status: 400 });
      }

      const { data: staged } = await supabaseAdmin
        .from('staged_supplier_products')
        .select('*')
        .eq('id', staged_id)
        .single();

      if (!staged) return NextResponse.json({ error: 'Staged product not found' }, { status: 404 });

      // Link supplier_products
      await supabaseAdmin
        .from('supplier_products')
        .upsert({
          part_id: target_part_id,
          supplier_id: staged.supplier_id,
          supplier_sku: staged.supplier_sku,
          supplier_title: staged.raw_title,
          cost_price: staged.cost_price,
          stock_quantity: staged.stock_quantity,
          in_stock: staged.in_stock,
          is_preferred: false,
          last_synced_at: new Date().toISOString(),
        }, { onConflict: 'supplier_id,supplier_sku' });

      // Update staged product
      await supabaseAdmin
        .from('staged_supplier_products')
        .update({
          admin_action: 'merged',
          admin_action_by: 'admin',
          admin_action_at: new Date().toISOString(),
          import_status: 'imported',
          matched_part_id: target_part_id,
        })
        .eq('id', staged_id);

      await recordPartAuditLog({
        part_id: target_part_id,
        part_number: staged.supplier_sku,
        action: 'supplier_linked',
        changed_field: 'supplier_products',
        new_value: staged.supplier_sku,
        changed_by: 'admin',
        source: 'Admin Staging Merge',
        notes: `Linked supplier SKU ${staged.supplier_sku} from supplier ID ${staged.supplier_id}`,
      });

      return NextResponse.json({ success: true, merged: true });
    }

    // ─────────────────────────────────────────────────────────
    // ACTION: REJECT STAGED PRODUCT
    // ─────────────────────────────────────────────────────────
    if (action === 'reject') {
      if (!staged_id) return NextResponse.json({ error: 'staged_id required' }, { status: 400 });

      await supabaseAdmin
        .from('staged_supplier_products')
        .update({
          admin_action: 'rejected',
          admin_action_by: 'admin',
          admin_action_at: new Date().toISOString(),
          import_status: 'rejected',
        })
        .eq('id', staged_id);

      return NextResponse.json({ success: true, rejected: true });
    }

    // ─────────────────────────────────────────────────────────
    // ACTION: BATCH APPROVE ALL VALID NEW PRODUCTS IN A BATCH
    // ─────────────────────────────────────────────────────────
    if (action === 'approve_batch_new') {
      if (!batch_id) return NextResponse.json({ error: 'batch_id required' }, { status: 400 });

      const { data: stagedItems } = await supabaseAdmin
        .from('staged_supplier_products')
        .select('*, supplier:suppliers(id, slug, name, code, default_margin_pct)')
        .eq('batch_id', batch_id)
        .eq('import_status', 'new_product');

      if (!stagedItems || stagedItems.length === 0) {
        return NextResponse.json({ approved_count: 0 });
      }

      let approvedCount = 0;
      for (const staged of stagedItems) {
        const supplier = staged.supplier;
        const mpn = staged.mpn || staged.supplier_sku;
        const supplierCode = supplier?.code || 'GEN';
        const internalPartNumber = `${supplierCode}-${mpn}`;
        const slug = `${supplier?.slug || 'supplier'}-${mpn}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const costPrice = staged.cost_price;
        const marginPct = supplier?.default_margin_pct || 35;
        const sellingPrice = costPrice > 0 ? Number((costPrice / (1 - marginPct / 100)).toFixed(2)) : null;

        let part: any = null;
        const { data: pData, error: pErr } = await supabaseAdmin
          .from('parts')
          .upsert({
            part_number: internalPartNumber,
            sku: staged.supplier_sku,
            mpn: mpn,
            name: staged.raw_title,
            slug: slug,
            description: staged.raw_description,
            category: staged.suggested_category || 'other',
            brand: staged.suggested_brand || supplier?.slug,
            manufacturer: staged.manufacturer || supplier?.name,
            cost_price: costPrice,
            price: sellingPrice,
            in_stock: staged.in_stock,
            stock_quantity: staged.stock_quantity,
            stock_type: 'supplier_stock',
            supplier_stock_qty: staged.stock_quantity,
            preferred_supplier_id: staged.supplier_id,
            availability_status: staged.in_stock ? 'in_stock' : 'check_availability',
            image_url: staged.image_urls?.[0] || null,
            image_gallery: staged.image_urls || [],
            catalogue_source: 'supplier_import',
            active: true,
          }, { onConflict: 'part_number' })
          .select('id')
          .single();

        if (pErr) {
          console.warn('Batch promote fallback to minimal payload:', pErr.message);
        }
        part = pData;

        if (part) {
          await supabaseAdmin
            .from('supplier_products')
            .upsert({
              part_id: part.id,
              supplier_id: staged.supplier_id,
              supplier_sku: staged.supplier_sku,
              supplier_title: staged.raw_title,
              cost_price: costPrice,
              stock_quantity: staged.stock_quantity,
              in_stock: staged.in_stock,
              is_preferred: true,
              last_synced_at: new Date().toISOString(),
            }, { onConflict: 'supplier_id,supplier_sku' });

          await supabaseAdmin
            .from('staged_supplier_products')
            .update({
              admin_action: 'approved',
              admin_action_by: 'admin',
              admin_action_at: new Date().toISOString(),
              published_at: new Date().toISOString(),
              import_status: 'imported',
              matched_part_id: part.id,
            })
            .eq('id', staged.id);

          approvedCount++;
        }
      }

      // Update batch records_approved
      await supabaseAdmin
        .from('import_batches')
        .update({
          records_approved: approvedCount,
          records_published: approvedCount,
          updated_at: new Date().toISOString(),
        })
        .eq('id', batch_id);

      return NextResponse.json({ success: true, approved_count: approvedCount });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
