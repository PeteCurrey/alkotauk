'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, AlertTriangle, Edit, Trash2, ExternalLink, Search, 
  Filter, CheckCircle2, Eye, SlidersHorizontal, Package, Tag
} from 'lucide-react';
import type { Product, ProductCategory } from '@/lib/admin/types';

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
    <div>
      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-red-900/60 p-8 max-w-md w-full">
            <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-white mb-2">Delete Product</h3>
            <p className="font-inter text-sm text-[#888] mb-6">
              Are you sure you want to delete this product? It will be removed from all front-end store catalogues.
            </p>
            <div className="flex justify-end gap-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border border-[#333] text-[#888] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={deletingId === confirmDeleteId}
                className="px-5 py-2 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId === confirmDeleteId ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">Store Products</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {products.length} machines registered in database · {products.filter(p => p.active).length} live on store
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/categories"
            className="flex items-center gap-2 border border-[#333] px-4 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-[#AAA] hover:text-white hover:border-[#555] transition-colors"
          >
            <Tag className="h-3.5 w-3.5 text-[#FF6900]" /> Store Categories
          </Link>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-[#FF6900] px-5 py-2.5 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e55f00] transition-colors shadow-lg shadow-orange-950/20"
          >
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Attention banner if items missing assets */}
      {missingCount > 0 && (
        <div className="border border-amber-900/40 bg-amber-950/20 px-5 py-4 mb-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-ibm-plex-mono text-[10px] text-amber-400 uppercase tracking-wider font-bold mb-1">
                {missingCount} catalogue item{missingCount !== 1 ? 's' : ''} require attention
              </p>
              <p className="font-inter text-[12px] text-[#888]">
                Missing primary high-resolution photography or official PDF engineering data sheets.
              </p>
            </div>
          </div>
          <button
            onClick={() => setStatusFilter(statusFilter === 'missing' ? 'all' : 'missing')}
            className={`font-ibm-plex-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border transition-colors shrink-0 ${statusFilter === 'missing' ? 'bg-amber-500 text-black border-amber-500' : 'border-amber-700/50 text-amber-400 hover:bg-amber-900/40'}`}
          >
            {statusFilter === 'missing' ? 'Show All' : 'Filter Missing Assets'}
          </button>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {CATEGORY_TABS.map(tab => {
          const count = tab.value === 'all' 
            ? products.length 
            : products.filter(p => p.category === tab.value).length;
          const isSelected = category === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setCategory(tab.value)}
              className="px-3.5 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
              style={{
                background: isSelected ? '#FF6900' : '#141414',
                color: isSelected ? '#fff' : '#888',
                border: '1px solid',
                borderColor: isSelected ? '#FF6900' : '#222',
              }}
            >
              <span>{tab.label}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/30 text-white' : 'bg-[#222] text-[#666]'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-3 bg-[#141414] border border-[#222]">
        <div className="flex items-center gap-2">
          {(['all', 'live', 'draft'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-widest border transition-colors ${statusFilter === st ? 'bg-white text-black border-white' : 'border-transparent text-[#777] hover:text-white'}`}
            >
              {st === 'all' ? 'All Status' : st === 'live' ? 'Live on Store' : 'Drafts / Hidden'}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#555]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by model, name, series..."
            className="w-full bg-[#0D0D0D] border border-[#262626] text-white pl-9 pr-4 py-2 font-inter text-[13px] focus:outline-none focus:border-[#FF6900]"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="border border-[#222] bg-[#0E0E0E] overflow-x-auto">
        <table className="w-full text-sm min-w-[1000px]">
          <thead>
            <tr style={{ background: '#141414', borderBottom: '1px solid #222' }}>
              {['Image', 'Model / Series', 'Store Category', 'Pressure (PSI / Bar)', 'Flow (GPM / LPM)', 'Commercial Mode', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center">
                  <Package className="h-8 w-8 text-[#333] mx-auto mb-2" />
                  <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest">
                    No products matching current filter criteria
                  </p>
                </td>
              </tr>
            )}
            {filtered.map((p, i) => {
              const hasMissing = !p.primary_image_url || !p.pdf_spec_url;
              const storeUrl = `/machines/${p.category || 'hot-water'}/${p.slug}`;
              return (
                <tr
                  key={p.id}
                  className="hover:bg-[#141414] transition-colors"
                >
                  <td className="px-4 py-3">
                    {p.primary_image_url ? (
                      <div className="h-12 w-12 bg-[#121212] border border-[#262626] flex items-center justify-center p-1">
                        <img src={p.primary_image_url} alt={p.name} className="h-full w-full object-contain" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 bg-[#1A1A1A] border border-[#333] flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-inter text-[13px] text-white font-medium">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {p.series && <span className="font-ibm-plex-mono text-[10px] text-[#666]">{p.series}</span>}
                      {p.is_elite_series && (
                        <span className="px-1.5 py-0.2 bg-[#FF6900]/10 border border-[#FF6900]/30 font-ibm-plex-mono text-[8px] text-[#FF6900] uppercase">
                          Elite
                        </span>
                      )}
                    </div>
                    {hasMissing && (
                      <div className="flex gap-1 mt-1.5">
                        {!p.primary_image_url && <span className="px-1.5 py-0.5 bg-amber-950/50 border border-amber-800/50 font-ibm-plex-mono text-[8px] text-amber-400 uppercase">No Image</span>}
                        {!p.pdf_spec_url && <span className="px-1.5 py-0.5 bg-amber-950/50 border border-amber-800/50 font-ibm-plex-mono text-[8px] text-amber-400 uppercase">No Spec PDF</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#999] uppercase">
                    {p.category?.replace('-', ' ')}
                  </td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-white">
                    {p.pressure_psi ? `${p.pressure_psi} PSI` : '—'}
                    {p.pressure_bar ? <span className="text-[#666]"> / {p.pressure_bar} bar</span> : null}
                  </td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-white">
                    {p.flow_rate_gpm ? `${p.flow_rate_gpm} GPM` : '—'}
                    {p.flow_rate_lpm ? <span className="text-[#666]"> / {p.flow_rate_lpm} LPM</span> : null}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-ibm-plex-mono text-[9px] px-2 py-0.5 border border-alkota-orange/30 bg-alkota-orange/10 text-alkota-orange uppercase">
                      {p.pricing_type === 'fixed_price' && p.price ? `£${p.price.toLocaleString()}` : 'Request Pricing'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border uppercase ${p.active ? 'text-green-400 border-green-900/50 bg-green-950/30' : 'text-zinc-500 border-zinc-800 bg-zinc-900/40'}`}>
                      {p.active ? 'Live' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={storeUrl}
                        target="_blank"
                        title="View Live on Store"
                        className="p-1.5 border border-[#333] text-[#777] hover:text-white hover:border-[#666] transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#333] font-ibm-plex-mono text-[9px] uppercase text-[#AAA] hover:text-white hover:border-[#FF6900] transition-colors"
                      >
                        <Edit className="h-3 w-3" /> Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(p.id)}
                        className="p-1.5 border border-transparent text-[#555] hover:text-red-400 hover:border-red-900/40 transition-colors"
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
  );
}
