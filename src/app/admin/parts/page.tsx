import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Tag, 
  ExternalLink, 
  Building2, 
  Wrench, 
  Truck, 
  Layers, 
  Upload, 
  FileText, 
  BarChart2, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import PartRowActions from './PartRowActions';
import SeedCatalogueButton from './SeedCatalogueButton';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ q?: string; brand?: string; category?: string }>;
}

export default async function AdminPartsPage({ searchParams }: PageProps) {
  const { q, brand, category } = await searchParams;

  let query = supabaseAdmin
    .from('parts')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (q) query = query.or(`name.ilike.%${q}%,part_number.ilike.%${q}%,manufacturer.ilike.%${q}%`);
  if (brand && brand !== 'all') query = query.eq('brand', brand);
  if (category && category !== 'all') query = query.eq('category', category);

  const { data: parts, count } = await query;
  const allParts = parts || [];

  // Fetch stats
  const totalParts = allParts.length;
  const inStockParts = allParts.filter(p => p.in_stock).length;
  const pricedParts = allParts.filter(p => typeof p.price === 'number' && p.price > 0).length;

  return (
    <div className="space-y-6 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6">
      {/* ── TOP HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-lg">
                <Wrench className="w-5 h-5 text-[#FF6900]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
                  Parts & Attachments Commerce Studio
                </h1>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Manage catalogue taxonomy, multi-supplier mapping, machine compatibility, applications, and zero-result search analytics.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SeedCatalogueButton />
            <Link
              href="/parts-attachments"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F1F3F7] hover:bg-[#E2E4E8] text-[#334155] text-xs font-semibold rounded-lg transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Live Hub
            </Link>
            <Link
              href="/admin/parts/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6900] hover:bg-[#E55D00] text-white text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </div>
        </div>

        {/* ── COMMERCE SUB-NAV TABS ── */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#E2E4E8] overflow-x-auto text-xs font-medium">
          <Link
            href="/admin/parts"
            className="px-3.5 py-2 bg-[#111] text-white rounded-lg shadow-sm shrink-0"
          >
            All Products ({totalParts})
          </Link>
          <Link
            href="/admin/parts/supplier-centre"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            Supplier Centre
          </Link>
          <Link
            href="/admin/parts/staging"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0 font-semibold text-[#FF6900]"
          >
            Staging Review
          </Link>
          <Link
            href="/admin/parts/ai-review"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            AI Review Queue
          </Link>
          <Link
            href="/admin/parts/import/batches"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            Sync Batches
          </Link>
          <Link
            href="/admin/parts/categories"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            Categories
          </Link>
          <Link
            href="/admin/parts/brands"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            Brands
          </Link>
          <Link
            href="/admin/parts/compatibility"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            Machine Fitment
          </Link>
          <Link
            href="/admin/parts/applications"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            Applications
          </Link>
          <Link
            href="/admin/parts/enquiries"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            Enquiries CRM
          </Link>
          <Link
            href="/admin/parts/analytics"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            Search Analytics
          </Link>
        </div>
      </div>

      {/* ── METRICS STRIP ── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Total Catalogue SKUs</span>
          <span className="text-2xl font-bold text-[#0F172A] mt-1 block">{totalParts}</span>
        </div>
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">In Direct UK Stock</span>
          <span className="text-2xl font-bold text-green-600 mt-1 block">{inStockParts}</span>
        </div>
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Priced Products (Ecommerce)</span>
          <span className="text-2xl font-bold text-[#0F172A] mt-1 block">{pricedParts}</span>
        </div>
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">POA / Quote Only</span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">{totalParts - pricedParts}</span>
        </div>
      </div>

      {/* ── FILTERS & SEARCH BAR ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <form method="GET" className="relative flex-1 max-w-md">
          <input
            type="text"
            name="q"
            defaultValue={q || ''}
            placeholder="Search SKU, MPN, or product title..."
            className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg pl-9 pr-4 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
          />
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </form>

        <div className="flex items-center gap-2">
          {q && (
            <Link
              href="/admin/parts"
              className="text-xs text-[#FF6900] hover:underline px-2"
            >
              Clear Search
            </Link>
          )}
        </div>
      </div>

      {/* ── PRODUCTS TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Part Number / MPN</th>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Cost Price</th>
                <th className="py-3.5 px-4">Retail (Ex. VAT)</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F7]">
              {allParts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#94A3B8]">
                    No parts found matching your query.
                  </td>
                </tr>
              ) : (
                allParts.map((part) => {
                  const cost = part.cost_price ? `£${Number(part.cost_price).toFixed(2)}` : '—';
                  const retail = part.price ? `£${Number(part.price).toFixed(2)}` : 'POA';

                  return (
                    <tr key={part.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#0F172A]">
                        {part.part_number}
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate font-medium text-[#1E293B]">
                        {part.name}
                      </td>
                      <td className="py-3 px-4 text-[#64748B]">
                        {part.category}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-[#F1F3F7] rounded text-[11px] font-semibold text-[#334155]">
                          {part.brand || part.manufacturer || 'Alkota'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[#64748B]">
                        {cost}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#0F172A]">
                        {retail}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          part.in_stock ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${part.in_stock ? 'bg-green-600' : 'bg-amber-600'}`} />
                          {part.in_stock ? 'In Stock' : 'Order Only'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <PartRowActions part={part} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
