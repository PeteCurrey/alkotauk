import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, AlertTriangle, Edit, ToggleLeft } from 'lucide-react';
import type { Product, ProductCategory } from '@/lib/admin/types';

const CATEGORY_TABS: Array<{ label: string; value: string }> = [
  { label: 'All', value: 'all' },
  { label: 'Hot Water', value: 'hot-water' },
  { label: 'Cold Water', value: 'cold-water' },
  { label: 'Steam', value: 'steam' },
  { label: 'Trailers', value: 'trailer' },
  { label: 'Parts Washers', value: 'parts-washer' },
  { label: 'Water Treatment', value: 'water-treatment' },
  { label: 'Space Heaters', value: 'space-heater' },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category = 'all', q = '' } = await searchParams;

  let query = supabaseAdmin
    .from('products')
    .select('id,slug,name,series,category,pressure_psi,pressure_bar,flow_rate_gpm,flow_rate_lpm,featured,active,primary_image_url,pdf_spec_url,sort_order,created_at')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (category !== 'all') query = query.eq('category', category);
  if (q) query = query.ilike('name', `%${q}%`);

  const { data: products } = await query;
  const items = (products ?? []) as Partial<Product>[];

  const missing = items.filter(p => !p.primary_image_url || !p.pdf_spec_url);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">Products</h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
            // {items.length} machine{items.length !== 1 ? 's' : ''} in catalogue
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#FF6900] px-5 py-2.5 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e55f00] transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      {/* Missing data warning */}
      {missing.length > 0 && (
        <div className="border border-amber-900/40 bg-amber-950/20 px-5 py-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-ibm-plex-mono text-[10px] text-amber-400 uppercase tracking-wider font-bold mb-1">
              {missing.length} product{missing.length !== 1 ? 's' : ''} need attention
            </p>
            <p className="font-inter text-[12px] text-[#888]">
              Missing primary image or spec PDF. Edit the product to add missing assets.
            </p>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1 mb-6">
        {CATEGORY_TABS.map(tab => (
          <Link
            key={tab.value}
            href={`/admin/products${tab.value !== 'all' ? `?category=${tab.value}` : ''}`}
            className="px-3 py-1.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-all"
            style={{
              background: category === tab.value ? '#FF6900' : '#1A1A1A',
              color: category === tab.value ? '#fff' : '#666',
              border: '1px solid',
              borderColor: category === tab.value ? '#FF6900' : '#222',
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="border border-[#222] overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Image', 'Name / Series', 'Category', 'PSI / BAR', 'GPM / LPM', 'Featured', 'Active', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-16 text-center font-ibm-plex-mono text-[10px] text-[#444] uppercase tracking-widest">
                No products found — <Link href="/admin/products/new" className="text-[#FF6900] hover:underline">add the first one</Link>
              </td></tr>
            )}
            {items.map((p, i) => {
              const hasMissing = !p.primary_image_url || !p.pdf_spec_url;
              return (
                <tr
                  key={p.id}
                  style={{ borderBottom: '1px solid #1A1A1A', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}
                  className="hover:bg-[#1A1A1A] transition-colors"
                >
                  <td className="px-4 py-3">
                    {p.primary_image_url ? (
                      <img src={p.primary_image_url} alt={p.name} className="h-10 w-10 object-cover border border-[#222]" />
                    ) : (
                      <div className="h-10 w-10 bg-[#1A1A1A] border border-[#333] flex items-center justify-center">
                        <AlertTriangle className="h-3 w-3 text-amber-500" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-inter text-[13px] text-white font-medium">{p.name}</p>
                    {p.series && <p className="font-ibm-plex-mono text-[10px] text-[#555]">{p.series}</p>}
                    {hasMissing && (
                      <div className="flex gap-1 mt-1">
                        {!p.primary_image_url && <span className="px-1.5 py-0.5 bg-amber-900/30 border border-amber-800/40 font-ibm-plex-mono text-[8px] text-amber-500 uppercase">No Image</span>}
                        {!p.pdf_spec_url && <span className="px-1.5 py-0.5 bg-amber-900/30 border border-amber-800/40 font-ibm-plex-mono text-[8px] text-amber-500 uppercase">No Spec PDF</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#888] uppercase">{p.category?.replace('-', ' ')}</td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-white">
                    {p.pressure_psi ? `${p.pressure_psi} PSI` : '—'}
                    {p.pressure_bar ? <span className="text-[#555]"> / {p.pressure_bar} bar</span> : null}
                  </td>
                  <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-white">
                    {p.flow_rate_gpm ? `${p.flow_rate_gpm} GPM` : '—'}
                    {p.flow_rate_lpm ? <span className="text-[#555]"> / {p.flow_rate_lpm} LPM</span> : null}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border uppercase ${p.featured ? 'text-[#FF6900] border-[#FF6900]/40 bg-[#FF6900]/10' : 'text-[#444] border-[#222]'}`}>
                      {p.featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border uppercase ${p.active ? 'text-green-400 border-green-900/50 bg-green-950/30' : 'text-red-400 border-red-900/50 bg-red-950/30'}`}>
                      {p.active ? 'Live' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#333] font-ibm-plex-mono text-[9px] uppercase text-[#888] hover:text-white hover:border-[#FF6900] transition-all"
                    >
                      <Edit className="h-3 w-3" /> Edit
                    </Link>
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
