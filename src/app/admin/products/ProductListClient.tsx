'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, AlertTriangle, Edit, Trash2, ExternalLink, Search, 
  Filter, CheckCircle2, Eye, SlidersHorizontal, Package, Tag, Layers
} from 'lucide-react';
import type { Product } from '@/lib/admin/types';

const CATEGORY_TABS: Array<{ label: string; value: string }> = [
  { label: 'All Catalogue', value: 'all' },
  { label: 'Hot Water', value: 'hot-water' },
  { label: 'Cold Water', value: 'cold-water' },
  { label: 'Steam Cleaners', value: 'steam' },
  { label: 'Trailers & Skids', value: 'trailer' },
  { label: 'Parts Washers', value: 'parts-washer' },
  { label: 'Water Treatment', value: 'water-treatment' },
  { label: 'Space Heaters', value: 'space-heater' },
  { label: 'Water Heaters', value: 'water-heater' },
];

export default function ProductListClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'draft' | 'missing'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Filter products
  const filtered = products.filter(p => {
    const matchesCat = category === 'all' || p.category === category;
    const matchesSearch = !search || 
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.slug?.toLowerCase().includes(search.toLowerCase()) ||
      p.series?.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline?.toLowerCase().includes(search.toLowerCase());

    const hasMissing = !p.primary_image_url || !p.pdf_spec_url;
    let matchesStatus = true;
    if (statusFilter === 'live') matchesStatus = !!p.active;
    if (statusFilter === 'draft') matchesStatus = !p.active;
    if (statusFilter === 'missing') matchesStatus = hasMissing;

    return matchesCat && matchesSearch && matchesStatus;
  });

  const missingCount = products.filter(p => !p.primary_image_url || !p.pdf_spec_url).length;

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border border-[#E6E8EC] p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Delete Machine Record</h3>
            <p className="text-xs text-[#64748B] leading-relaxed mb-6 font-medium">
              Are you sure you want to delete this product? It will be removed from all public store catalogues and specification sheets.
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-5 py-2.5 rounded-full border border-[#E6E8EC] text-xs font-semibold text-[#64748B] hover:bg-[#F8F9FA]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={deletingId === confirmDeleteId}
                className="px-5 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 disabled:opacity-50 shadow-sm"
              >
                {deletingId === confirmDeleteId ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Machine Inventory</h1>
          <p className="text-sm font-medium text-[#64748B] mt-1">
            {products.length} models registered in database · {products.filter(p => p.active).length} live on store
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/categories"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E6E8EC] text-[#334155] text-xs font-semibold hover:bg-[#F8F9FA] transition-colors shadow-sm"
          >
            <Tag className="h-3.5 w-3.5 text-[#FF6900]" /> Store Categories
          </Link>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6900] text-white text-xs font-bold hover:bg-[#e55f00] transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Attention banner if items missing assets */}
      {missingCount > 0 && (
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-[20px] p-5 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                {missingCount} catalogue item{missingCount !== 1 ? 's' : ''} require attention
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Missing primary high-resolution photography or official PDF engineering data sheets.
              </p>
            </div>
          </div>
          <button
            onClick={() => setStatusFilter(statusFilter === 'missing' ? 'all' : 'missing')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors shrink-0 ${
              statusFilter === 'missing' 
                ? 'bg-amber-600 text-white' 
                : 'bg-white border border-amber-300 text-amber-800 hover:bg-amber-100'
            }`}
          >
            {statusFilter === 'missing' ? 'Show All' : 'Filter Missing Assets'}
          </button>
        </div>
      )}

      {/* Category Tabs (Pills) */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_TABS.map(tab => {
          const count = tab.value === 'all' 
            ? products.length 
            : products.filter(p => p.category === tab.value).length;
          const isSelected = category === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setCategory(tab.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-white border border-[#E6E8EC] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8F9FA]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isSelected ? 'bg-white/20 text-white' : 'bg-[#F1F3F7] text-[#475569]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar Card */}
      <div className="bg-white rounded-[20px] border border-[#E6E8EC] p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-1.5">
          {(['all', 'live', 'draft'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                statusFilter === st 
                  ? 'bg-[#F1F3F7] text-[#0F172A] font-bold' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {st === 'all' ? 'All Models' : st === 'live' ? 'Live on Store' : 'Drafts / Hidden'}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by model, code, series, pressure..."
            className="w-full bg-[#F6F7F9] border border-[#E6E8EC] rounded-full text-[#0F172A] pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-[#FF6900] transition-colors placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-[24px] border border-[#E6E8EC] shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[950px]">
            <thead>
              <tr className="bg-[#F8F9FB] border-b border-[#F0F2F5] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                {['Visual', 'Model & Series', 'Category', 'Pressure (BAR / PSI)', 'Flow (LPM / GPM)', 'Pricing Mode', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5] text-sm">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <Package className="h-8 w-8 text-[#CBD5E1] mx-auto mb-2" />
                    <p className="text-xs font-medium text-[#64748B]">
                      No products matching current filter criteria
                    </p>
                  </td>
                </tr>
              )}
              {filtered.map((p) => {
                const hasMissing = !p.primary_image_url || !p.pdf_spec_url;
                const storeUrl = `/machines/${p.category || 'hot-water'}/${p.slug}`;
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-[#F8F9FB] transition-colors"
                  >
                    <td className="px-6 py-4">
                      {p.primary_image_url ? (
                        <div className="h-12 w-12 rounded-xl bg-[#F6F7F9] border border-[#E6E8EC] flex items-center justify-center p-1 shadow-sm">
                          <img src={p.primary_image_url} alt={p.name} className="h-full w-full object-contain" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#0F172A]">{p.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {p.series && <span className="text-xs text-[#64748B] font-medium">{p.series}</span>}
                        {p.is_elite_series && (
                          <span className="px-2 py-0.2 rounded-full bg-[#FF6900]/10 text-[#FF6900] text-[10px] font-bold uppercase">
                            Elite
                          </span>
                        )}
                      </div>
                      {hasMissing && (
                        <div className="flex gap-1.5 mt-1.5">
                          {!p.primary_image_url && <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">No Image</span>}
                          {!p.pdf_spec_url && <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">No Spec PDF</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-[#475569] uppercase">
                      {p.category?.replace('-', ' ')}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs font-medium text-[#0F172A]">
                      {p.pressure_bar ? `${p.pressure_bar} bar` : '—'}
                      {p.pressure_psi ? <span className="text-[#94A3B8]"> / {p.pressure_psi} PSI</span> : null}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs font-medium text-[#0F172A]">
                      {p.flow_rate_lpm ? `${p.flow_rate_lpm} LPM` : '—'}
                      {p.flow_rate_gpm ? <span className="text-[#94A3B8]"> / {p.flow_rate_gpm} GPM</span> : null}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FF6900]/10 text-[#FF6900]">
                        {p.pricing_type === 'fixed_price' && p.price ? `£${p.price.toLocaleString()}` : 'Request Pricing'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        p.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${p.active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {p.active ? 'Live' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={storeUrl}
                          target="_blank"
                          title="View Live on Store"
                          className="h-8 w-8 rounded-full bg-[#F6F7F9] border border-[#E6E8EC] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#EBECEF] transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="px-3.5 py-1.5 rounded-full bg-[#F6F7F9] border border-[#E6E8EC] text-xs font-bold text-[#334155] hover:bg-[#111] hover:text-white transition-all flex items-center gap-1"
                        >
                          <Edit className="h-3 w-3" /> Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(p.id)}
                          className="h-8 w-8 rounded-full bg-transparent hover:bg-red-50 text-[#94A3B8] hover:text-red-600 flex items-center justify-center transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

