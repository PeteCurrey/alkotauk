import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';
import {
  COMPREHENSIVE_BRANDS,
  COMPREHENSIVE_APPLICATIONS,
  COMPREHENSIVE_SUPPLIERS,
  COMPREHENSIVE_MACHINE_FAMILIES,
  COMPREHENSIVE_MACHINE_MODELS,
} from '@/lib/parts/seed-comprehensive';
import { PARTS_CATALOGUE_V2 } from '@/lib/parts/catalogue-seed-v2';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    // 1. Seed Top-Level Categories
    const topCategories = MASTER_TAXONOMY.map((cat, idx) => ({
      slug: cat.slug,
      name: cat.name,
      short_desc: cat.shortDesc,
      icon_name: cat.iconName,
      level: 1,
      is_featured: cat.isFeatured,
      sort_order: (idx + 1) * 10,
      active: true,
    }));

    const { data: seededTopCats, error: topCatErr } = await supabaseAdmin
      .from('part_categories')
      .upsert(topCategories, { onConflict: 'slug' })
      .select('id, slug');

    if (topCatErr) throw new Error(`Top categories error: ${topCatErr.message}`);

    const catMap = new Map((seededTopCats || []).map(c => [c.slug, c.id]));

    // 2. Seed Subcategories with parent_id
    const subCategoriesList: any[] = [];
    MASTER_TAXONOMY.forEach((cat) => {
      const parentId = catMap.get(cat.slug);
      cat.subcategories.forEach((sub, subIdx) => {
        subCategoriesList.push({
          slug: `${cat.slug}-${sub.slug}`,
          name: sub.name,
          short_desc: sub.shortDesc,
          icon_name: cat.iconName,
          parent_id: parentId || null,
          level: 2,
          is_featured: false,
          sort_order: subIdx + 1,
          active: true,
        });
      });
    });

    if (subCategoriesList.length > 0) {
      const { error: subCatErr } = await supabaseAdmin
        .from('part_categories')
        .upsert(subCategoriesList, { onConflict: 'slug' });
      if (subCatErr) console.warn('Subcategories upsert notice:', subCatErr.message);
    }

    // 3. Seed Brand Partners (25+ Brands)
    const { error: brandErr } = await supabaseAdmin
      .from('brand_partners')
      .upsert(COMPREHENSIVE_BRANDS, { onConflict: 'slug' });
    if (brandErr) throw new Error(`Brands error: ${brandErr.message}`);

    // 4. Seed Applications (10 Core Cleaning Applications)
    const { error: appErr } = await supabaseAdmin
      .from('applications')
      .upsert(COMPREHENSIVE_APPLICATIONS, { onConflict: 'slug' });
    if (appErr) console.warn('Applications upsert notice:', appErr.message);

    // 5. Seed Suppliers (Dual Pumps, Flowjet, Exchange Eng, G&S, Stinson, Alkota)
    const { error: suppErr } = await supabaseAdmin
      .from('suppliers')
      .upsert(COMPREHENSIVE_SUPPLIERS, { onConflict: 'slug' });
    if (suppErr) console.warn('Suppliers upsert notice:', suppErr.message);

    // 6. Seed Machine Families & Models
    const { data: seededFamilies, error: famErr } = await supabaseAdmin
      .from('machine_families')
      .upsert(COMPREHENSIVE_MACHINE_FAMILIES, { onConflict: 'slug' })
      .select('id, slug');

    if (!famErr && seededFamilies) {
      const famMap = new Map(seededFamilies.map(f => [f.slug, f.id]));
      const modelsToSeed = COMPREHENSIVE_MACHINE_MODELS.map((m, idx) => ({
        slug: m.slug,
        model_code: m.model_code,
        name: m.name,
        family_id: famMap.get(m.family_slug) || null,
        series: m.series,
        pressure_psi: m.pressure_psi,
        flow_gpm: m.flow_gpm,
        flow_lpm: m.flow_lpm,
        power_source: m.power_source,
        heating_type: m.heating_type,
        specs_summary: m.specs_summary,
        sort_order: idx + 1,
        active: true,
      }));

      await supabaseAdmin
        .from('machine_models')
        .upsert(modelsToSeed, { onConflict: 'slug' });
    }

    // 7. Seed Parts Catalogue (120+ Authentic Products with MPN, SKU, Cost, Pricing)
    const enhancedParts = PARTS_CATALOGUE_V2.map((p) => {
      const costPrice = p.price ? Number((p.price * 0.65).toFixed(2)) : null;
      const tradePrice = p.price ? Number((p.price * 0.85).toFixed(2)) : null;
      return {
        ...p,
        mpn: p.part_number,
        sku: p.part_number,
        cost_price: costPrice,
        trade_price: tradePrice,
        rrp_price: p.price,
        stock_type: 'direct_stock',
        stock_quantity: 25,
        lead_time_days: 1,
        is_indexable: true,
        discontinued: false,
      };
    });

    const { data: seededParts, error: partsErr } = await supabaseAdmin
      .from('parts')
      .upsert(enhancedParts, { onConflict: 'slug' })
      .select('id, part_number, name');

    if (partsErr) throw new Error(`Parts error: ${partsErr.message}`);

    return NextResponse.json({
      success: true,
      summary: {
        masterCategories: MASTER_TAXONOMY.length,
        subcategories: subCategoriesList.length,
        brands: COMPREHENSIVE_BRANDS.length,
        applications: COMPREHENSIVE_APPLICATIONS.length,
        suppliers: COMPREHENSIVE_SUPPLIERS.length,
        parts: seededParts?.length || 0,
      },
    });
  } catch (err: any) {
    console.error('Commerce seeding failed:', err);
    return NextResponse.json({ error: err.message || 'Seeding failed' }, { status: 500 });
  }
}
