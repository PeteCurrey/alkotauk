import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { mode, items, supplier_slug } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided for import' }, { status: 400 });
    }

    if (mode === 'validate') {
      const partNumbers = items.map((i: any) => String(i.part_number || '').trim()).filter(Boolean);

      // Check existing parts in database by part_number
      const { data: existingParts, error: checkErr } = await supabaseAdmin
        .from('parts')
        .select('id, part_number, name, price, cost_price, category')
        .in('part_number', partNumbers);

      if (checkErr) {
        return NextResponse.json({ error: checkErr.message }, { status: 500 });
      }

      const existingMap = new Map<string, any>((existingParts || []).map((p: any) => [p.part_number.toUpperCase(), p]));

      const preview: any[] = [];
      let newCount = 0;
      let updateCount = 0;
      let errorCount = 0;

      for (let idx = 0; idx < items.length; idx++) {
        const item = items[idx];
        const pn = String(item.part_number || '').trim().toUpperCase();
        const name = String(item.name || '').trim();

        if (!pn || !name) {
          errorCount++;
          preview.push({
            index: idx,
            part_number: pn || 'MISSING',
            name: name || 'MISSING',
            status: 'error',
            error: 'Missing required part_number or name',
          });
          continue;
        }

        const existing = existingMap.get(pn);
        if (existing) {
          updateCount++;
          preview.push({
            index: idx,
            part_number: pn,
            name,
            status: 'update',
            existing_id: existing.id,
            existing_price: existing.price,
            new_price: item.price !== undefined ? item.price : null,
            category: item.category || existing.category,
            changes: `Update existing part (${existing.name})`,
          });
        } else {
          newCount++;
          preview.push({
            index: idx,
            part_number: pn,
            name,
            status: 'new',
            new_price: item.price !== undefined ? item.price : null,
            category: item.category || 'pumps',
            changes: 'Insert new catalogue part',
          });
        }
      }

      return NextResponse.json({
        validated: true,
        summary: {
          total: items.length,
          new_parts: newCount,
          updates: updateCount,
          errors: errorCount,
        },
        preview: preview.slice(0, 50), // Return top 50 for preview
      });
    }

    if (mode === 'commit') {
      const now = new Date().toISOString();
      const validRows: any[] = [];

      for (const item of items) {
        const pn = String(item.part_number || '').trim();
        const name = String(item.name || '').trim();
        if (!pn || !name) continue;

        const baseSlug = `${pn}-${name}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        const row: Record<string, any> = {
          part_number: pn,
          name,
          slug: item.slug || baseSlug,
          category: item.category || 'pumps',
          brand: item.brand || 'alkota',
          manufacturer: item.manufacturer || item.brand || 'Alkota',
          in_stock: item.in_stock !== undefined ? Boolean(item.in_stock) : false,
          availability_status: item.availability_status || (item.in_stock ? 'in_stock' : 'check_availability'),
          stock_type: item.stock_type || 'special_order',
          catalogue_source: 'supplier_import',
          needs_review: item.needs_review !== undefined ? Boolean(item.needs_review) : true,
          active: item.active !== undefined ? Boolean(item.active) : true,
          updated_at: now,
        };

        if (item.sku) row.sku = item.sku;
        if (item.mpn) row.mpn = item.mpn;
        if (item.subcategory) row.subcategory = item.subcategory;
        if (item.description) row.description = item.description;
        if (item.cost_price != null && item.cost_price !== '') row.cost_price = Number(item.cost_price);
        if (item.price != null && item.price !== '') row.price = Number(item.price);
        if (item.trade_price != null && item.trade_price !== '') row.trade_price = Number(item.trade_price);
        if (item.stock_quantity != null) row.stock_quantity = Number(item.stock_quantity);
        if (item.weight_kg != null) row.weight_kg = Number(item.weight_kg);

        validRows.push(row);
      }

      if (validRows.length === 0) {
        return NextResponse.json({ error: 'No valid records to commit' }, { status: 400 });
      }

      // Upsert into Supabase parts table with part_number unique conflict resolution
      const { data, error: upsertErr } = await supabaseAdmin
        .from('parts')
        .upsert(validRows, { onConflict: 'part_number', ignoreDuplicates: false })
        .select('id, part_number');

      if (upsertErr) {
        return NextResponse.json({ error: upsertErr.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        committed: data?.length || validRows.length,
        total: validRows.length,
      });
    }

    return NextResponse.json({ error: `Unsupported mode: ${mode}` }, { status: 400 });
  } catch (err: any) {
    console.error('Import processing failed:', err);
    return NextResponse.json({ error: err.message || 'Import failed' }, { status: 500 });
  }
}
