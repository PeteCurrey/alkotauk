import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

function escapeCsvField(field: any): string {
  if (field === null || field === undefined) return '';
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get('ids');
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const stockStatus = searchParams.get('stock_status');
    const priceStatus = searchParams.get('price_status');
    const reviewStatus = searchParams.get('review_status');

    let query = supabaseAdmin
      .from('parts')
      .select(`
        id,
        part_number,
        sku,
        mpn,
        name,
        category,
        subcategory,
        brand,
        manufacturer,
        price,
        cost_price,
        trade_price,
        rrp_price,
        vat_rate,
        in_stock,
        stock_type,
        stock_quantity,
        lead_time_days,
        availability_status,
        weight_kg,
        data_quality_score,
        needs_review,
        active,
        catalogue_source,
        catalogue_page,
        catalogue_section
      `)
      .order('part_number', { ascending: true });

    if (ids) {
      const idList = ids.split(',').map(s => s.trim()).filter(Boolean);
      if (idList.length > 0) {
        query = query.in('id', idList);
      }
    } else {
      if (q) query = query.or(`name.ilike.%${q}%,part_number.ilike.%${q}%,mpn.ilike.%${q}%,sku.ilike.%${q}%,manufacturer.ilike.%${q}%`);
      if (category && category !== 'all') query = query.eq('category', category);
      if (brand && brand !== 'all') query = query.eq('brand', brand);
      if (stockStatus === 'in_stock') query = query.eq('in_stock', true);
      else if (stockStatus === 'out_of_stock') query = query.eq('in_stock', false);
      else if (stockStatus && stockStatus !== 'all') query = query.eq('availability_status', stockStatus);
      if (priceStatus === 'priced') query = query.not('price', 'is', null).gt('price', 0);
      else if (priceStatus === 'poa') query = query.or('price.is.null,price.lte.0');
      if (reviewStatus === 'needs_review') query = query.eq('needs_review', true);
      else if (reviewStatus === 'reviewed') query = query.eq('needs_review', false);
    }

    const { data: parts, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const headers = [
      'id',
      'part_number',
      'sku',
      'mpn',
      'name',
      'category',
      'subcategory',
      'brand',
      'manufacturer',
      'price_retail_ex_vat',
      'cost_price',
      'trade_price',
      'rrp_price',
      'vat_rate',
      'in_stock',
      'stock_type',
      'stock_quantity',
      'lead_time_days',
      'availability_status',
      'weight_kg',
      'data_quality_score',
      'needs_review',
      'active',
      'catalogue_source',
      'catalogue_page',
      'catalogue_section'
    ];

    const rows = (parts || []).map(p => [
      p.id,
      p.part_number,
      p.sku || '',
      p.mpn || '',
      p.name,
      p.category,
      p.subcategory || '',
      p.brand || '',
      p.manufacturer || '',
      p.price != null ? Number(p.price).toFixed(2) : '',
      p.cost_price != null ? Number(p.cost_price).toFixed(2) : '',
      p.trade_price != null ? Number(p.trade_price).toFixed(2) : '',
      p.rrp_price != null ? Number(p.rrp_price).toFixed(2) : '',
      p.vat_rate != null ? p.vat_rate : '0.20',
      p.in_stock ? 'TRUE' : 'FALSE',
      p.stock_type || '',
      p.stock_quantity != null ? p.stock_quantity : '',
      p.lead_time_days != null ? p.lead_time_days : '',
      p.availability_status || '',
      p.weight_kg != null ? p.weight_kg : '',
      p.data_quality_score != null ? p.data_quality_score : '',
      p.needs_review ? 'TRUE' : 'FALSE',
      p.active ? 'TRUE' : 'FALSE',
      p.catalogue_source || '',
      p.catalogue_page || '',
      p.catalogue_section || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(escapeCsvField).join(','))
    ].join('\r\n');

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `alkota-parts-export-${timestamp}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    console.error('Parts export error:', err);
    return NextResponse.json({ error: err.message || 'Export failed' }, { status: 500 });
  }
}
