import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  Plus,
  ExternalLink,
  Wrench,
  Upload,
  ShieldAlert,
  Download,
} from 'lucide-react';
import SeedCatalogueButton from './SeedCatalogueButton';
import PartsFilterBar from './PartsFilterBar';
import PartsAdminClient from './PartsAdminClient';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    brand?: string;
    category?: string;
    stock_status?: string;
    price_status?: string;
    review_status?: string;
    sort?: string;
    page?: string;
    pageSize?: string;
  }>;
}

function buildOrderClause(sort: string): { column: string; ascending: boolean }[] {
  switch (sort) {
    case 'part_number_desc': return [{ column: 'part_number', ascending: false }];
    case 'name_asc':         return [{ column: 'name', ascending: true }];
    case 'price_asc':        return [{ column: 'price', ascending: true }];
    case 'price_desc':       return [{ column: 'price', ascending: false }];
    case 'quality_asc':      return [{ column: 'data_quality_score', ascending: true }, { column: 'part_number', ascending: true }];
    case 'updated_desc':     return [{ column: 'updated_at', ascending: false }];
    default:                 return [{ column: 'part_number', ascending: true }];
  }
}

export default async function AdminPartsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q            = sp.q            || '';
  const brand        = sp.brand        || 'all';
  const category     = sp.category     || 'all';
  const stockStatus  = sp.stock_status  || 'all';
  const priceStatus  = sp.price_status  || 'all';
  const reviewStatus = sp.review_status || 'all';
  const sort         = sp.sort          || 'part_number_asc';
  const page         = Math.max(1, parseInt(sp.page     || '1',  10));
  const pageSize     = Math.min(100, Math.max(10, parseInt(sp.pageSize || '50', 10)));
  const from         = (page - 1) * pageSize;
  const to           = from + pageSize - 1;

  // Build query with exact count
  let query = supabaseAdmin
    .from('parts')
    .select(
      'id, part_number, sku, name, category, brand, manufacturer, cost_price, price, in_stock, availability_status, needs_review, data_quality_score, active, updated_at',
      { count: 'exact' }
    );

  // Apply filters
  if (q) {
    query = query.or(
      `name.ilike.%${q}%,part_number.ilike.%${q}%,mpn.ilike.%${q}%,sku.ilike.%${q}%,manufacturer.ilike.%${q}%`
    );
  }
  if (brand     !== 'all') query = query.eq('brand', brand);
  if (category  !== 'all') query = query.eq('category', category);

  if (stockStatus === 'in_stock')          query = query.eq('in_stock', true);
  else if (stockStatus === 'out_of_stock') query = query.eq('in_stock', false);
  else if (stockStatus && stockStatus !== 'all') query = query.eq('availability_status', stockStatus);

  if (priceStatus === 'priced')            query = query.not('price', 'is', null).gt('price', 0);
  else if (priceStatus === 'poa')          query = query.or('price.is.null,price.lte.0');

  if (reviewStatus === 'needs_review')     query = query.eq('needs_review', true);
  else if (reviewStatus === 'reviewed')    query = query.eq('needs_review', false);

  // Apply ordering
  const orderClauses = buildOrderClause(sort);
  for (const { column, ascending } of orderClauses) {
    query = query.order(column, { ascending });
  }

  // Apply pagination
  query = query.range(from, to);

  const { data: parts, count: totalCount, error } = await query;

  // Fast KPI counts (head:true = no row data, just count)
  const [
    { count: totalAll },
    { count: inStockCount },
    { count: pricedCount },
    { count: reviewCount },
    { count: lowQualityCount },
  ] = await Promise.all([
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }).eq('in_stock', true),
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }).not('price', 'is', null).gt('price', 0),
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }).eq('needs_review', true),
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }).lt('data_quality_score', 60),
  ]);

  // Fetch filter option lists
  const [{ data: catRows }, { data: brandRows }] = await Promise.all([
    supabaseAdmin.from('part_categories').select('slug, name').eq('active', true).order('sort_order'),
    supabaseAdmin.from('brand_partners').select('slug, name').eq('active', true).order('sort_order'),
  ]);

  const categories = catRows || [];
  const brands     = brandRows || [];
  const filteredCount = totalCount ?? 0;

  return (
    <div className="space-y-5 pb-24 max-w-[1600px] mx-auto px-4 sm:px-6">
      {/* ── TOP HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-[6px] p-6 shadow-tactile-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black text-white rounded-[5px]">
              <Wrench className="w-5 h-5 text-[#FF6900]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
                Parts &amp; Attachments Commerce Studio
              </h1>
              <p className="text-xs text-[#64748B] mt-0.5">
                Manage catalogue taxonomy, multi-supplier mapping, machine compatibility, and data quality.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`/api/admin/parts/export?${new URLSearchParams({
                ...(q            && { q }),
                ...(brand     !== 'all' && { brand }),
                ...(category  !== 'all' && { category }),
                ...(stockStatus  !== 'all' && { stock_status: stockStatus }),
                ...(priceStatus  !== 'all' && { price_status: priceStatus }),
                ...(reviewStatus !== 'all' && { review_status: reviewStatus }),
              }).toString()}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F1F3F7] hover:bg-[#E2E4E8] text-[#334155] text-xs font-semibold rounded-[4px] btn-tactile transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </a>
            <Link
              href="/admin/parts/import"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F1F3F7] hover:bg-[#E2E4E8] text-[#334155] text-xs font-semibold rounded-[4px] btn-tactile transition-colors"
            >
              <Upload className="h-3.5 w-3.5" />
              Import
            </Link>
            <SeedCatalogueButton />
            <Link
              href="/parts-attachments"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F1F3F7] hover:bg-[#E2E4E8] text-[#334155] text-xs font-semibold rounded-[4px] btn-tactile transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Live
            </Link>
            <Link
              href="/admin/parts/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6900] hover:bg-[#E55D00] text-white text-xs font-bold rounded-[4px] btn-tactile shadow-button hover:shadow-button-hover transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Part
            </Link>
          </div>
        </div>

        {/* ── SUB-NAV TABS ── */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#E2E4E8] overflow-x-auto text-xs font-medium">
          <Link href="/admin/parts" className="px-3.5 py-2 bg-[#111] text-white rounded-[4px] btn-tactile shadow-tactile-sm shrink-0 font-bold">
            All Products ({(totalAll ?? 0).toLocaleString()})
          </Link>
          <Link href="/admin/parts/quality" className="px-3.5 py-2 text-amber-700 bg-amber-50/60 hover:bg-amber-50 rounded-[4px] transition-colors shrink-0 flex items-center gap-1.5 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            Quality &amp; Review ({(reviewCount ?? 0).toLocaleString()})
          </Link>
          <Link href="/admin/parts/supplier-centre" className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-[4px] transition-colors shrink-0">
            Supplier Centre
          </Link>
          <Link href="/admin/parts/categories" className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-[4px] transition-colors shrink-0">
            Categories
          </Link>
          <Link href="/admin/parts/brands" className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-[4px] transition-colors shrink-0">
            Brands
          </Link>
          <Link href="/admin/parts/compatibility" className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-[4px] transition-colors shrink-0">
            Machine Fitment
          </Link>
          <Link href="/admin/parts/enquiries" className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-[4px] transition-colors shrink-0">
            Enquiries CRM
          </Link>
        </div>
      </div>

      {/* ── KPI METRICS STRIP ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total SKUs', value: (totalAll ?? 0).toLocaleString(), color: 'text-[#0F172A]' },
          { label: 'In UK Stock', value: (inStockCount ?? 0).toLocaleString(), color: 'text-green-600' },
          { label: 'Priced (Ecommerce)', value: (pricedCount ?? 0).toLocaleString(), color: 'text-blue-600' },
          { label: 'Needs Review', value: (reviewCount ?? 0).toLocaleString(), color: 'text-amber-600' },
          { label: 'Low Quality (<60)', value: (lowQualityCount ?? 0).toLocaleString(), color: 'text-red-500' },
        ].map(m => (
          <div key={m.label} className="bg-white border border-[#E2E4E8] p-4 rounded-[6px] shadow-tactile-sm">
            <span className="text-[10px] text-[#64748B] font-medium uppercase tracking-wide block">{m.label}</span>
            <span className={`text-2xl font-bold mt-1 block ${m.color}`}>{m.value}</span>
          </div>
        ))}
      </div>

      {/* ── FILTER BAR (Client Component) ── */}
      <PartsFilterBar
        categories={categories}
        brands={brands}
        totalCount={filteredCount}
      />

      {/* ── TABLE + PAGINATION + BULK BAR (Client) ── */}
      <PartsAdminClient
        parts={parts || []}
        totalCount={filteredCount}
        currentPage={page}
        pageSize={pageSize}
        currentSort={sort}
        categories={categories}
        brands={brands}
      />
    </div>
  );
}
