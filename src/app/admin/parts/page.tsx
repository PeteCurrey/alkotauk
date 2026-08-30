import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Wrench, Layers, Inbox, ExternalLink, Filter } from 'lucide-react';
import PartRowActions from './PartRowActions';
import SeedCatalogueButton from './SeedCatalogueButton';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ brand?: string; category?: string; q?: string }>;
}

export default async function PartsAdminPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const filterBrand = sp.brand;
  const filterCat = sp.category;
  const searchQ = sp.q;

  let query = supabaseAdmin
    .from('parts')
    .select('id,part_number,name,category,brand,compatible_machines,price,in_stock,active,featured,is_attachment')
    .order('sort_order')
    .order('name');

  if (filterBrand) {
    query = query.eq('brand', filterBrand);
  }

  if (filterCat) {
    query = query.eq('category', filterCat);
  }

  if (searchQ) {
    query = query.or(`name.ilike.%${searchQ}%,part_number.ilike.%${searchQ}%`);
  }

  const { data: parts } = await query;
  const partList = parts || [];

  return (
    <div className="text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">
            Parts &amp; Attachments Catalogue
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
            // {partList.length} components listed · OEM &amp; Partner tooling database
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SeedCatalogueButton />

          <Link
            href="/parts-attachments"
            target="_blank"
            className="flex items-center gap-2 border border-[#333] bg-[#141414] px-4 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#CCC] hover:text-white"
          >
            <span>Live Store</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          
          <Link
            href="/admin/parts/new"
            className="flex items-center gap-2 px-5 py-3 bg-[#FF6900] text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest hover:bg-[#e55f00] transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Part
          </Link>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Link
            href="/admin/parts"
            className={`px-4 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-wider ${
              !filterBrand 
                ? 'bg-alkota-orange text-white font-bold' 
                : 'bg-[#141414] text-[#888] hover:text-white border border-[#262626]'
            }`}
          >
            All Components ({partList.length})
          </Link>
          <Link
            href="/admin/parts?brand=alkota"
            className={`px-4 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-wider ${
              filterBrand === 'alkota' 
                ? 'bg-alkota-orange text-white font-bold' 
                : 'bg-[#141414] text-[#888] hover:text-white border border-[#262626]'
            }`}
          >
            Alkota OEM
          </Link>
          <Link
            href="/admin/parts?brand=mosmatic"
            className={`px-4 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-wider ${
              filterBrand === 'mosmatic' 
                ? 'bg-alkota-orange text-white font-bold' 
                : 'bg-[#141414] text-[#888] hover:text-white border border-[#262626]'
            }`}
          >
            Mosmatic
          </Link>
          <Link
            href="/admin/parts?brand=cox-reels"
            className={`px-4 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-wider ${
              filterBrand === 'cox-reels' 
                ? 'bg-alkota-orange text-white font-bold' 
                : 'bg-[#141414] text-[#888] hover:text-white border border-[#262626]'
            }`}
          >
            Cox Reels
          </Link>
          <Link
            href="/admin/parts?brand=steel-eagle"
            className={`px-4 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-wider ${
              filterBrand === 'steel-eagle' 
                ? 'bg-alkota-orange text-white font-bold' 
                : 'bg-[#141414] text-[#888] hover:text-white border border-[#262626]'
            }`}
          >
            Steel Eagle
          </Link>
          <Link
            href="/admin/parts?brand=dual-pumps"
            className={`px-4 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-wider ${
              filterBrand === 'dual-pumps' 
                ? 'bg-alkota-orange text-white font-bold' 
                : 'bg-[#141414] text-[#888] hover:text-white border border-[#262626]'
            }`}
          >
            Dual Pumps
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/parts/categories"
            className="px-3 py-1.5 bg-[#181818] border border-[#333] hover:border-alkota-orange text-[#AAA] hover:text-white font-ibm-plex-mono text-[10px] uppercase tracking-wider"
          >
            Manage Categories →
          </Link>
          <Link
            href="/admin/parts/brands"
            className="px-3 py-1.5 bg-[#181818] border border-[#333] hover:border-alkota-orange text-[#AAA] hover:text-white font-ibm-plex-mono text-[10px] uppercase tracking-wider"
          >
            Manage Brands →
          </Link>
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-[#222] overflow-x-auto bg-[#0E0E0E]">
        <table className="w-full text-left">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Part No.', 'Name', 'Category', 'Brand', 'Price', 'Stock', 'Featured', 'Status', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#555]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {partList.map((p: any, i: number) => (
              <tr
                key={p.id}
                style={{
                  borderBottom: '1px solid #1A1A1A',
                  background: i % 2 === 0 ? '#111' : '#0D0D0D',
                }}
                className="hover:bg-[#161616] transition-colors"
              >
                <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-[#FF6900] font-bold">
                  {p.part_number}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/parts/${p.id}/edit`}
                    className="font-inter text-[13px] text-white hover:text-[#FF6900]"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] uppercase text-[#888]">
                  {p.category}
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] uppercase text-alkota-orange">
                  {p.brand || 'alkota'}
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[12px] text-white">
                  {p.price ? `£${Number(p.price).toFixed(2)}` : 'POA'}
                </td>
                <td className="px-4 py-3">
                  <span
                    style={{ color: p.in_stock ? '#22C55E' : '#EF4444' }}
                    className="font-ibm-plex-mono text-[10px]"
                  >
                    {p.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {p.featured && (
                    <span className="px-1.5 py-0.5 bg-alkota-orange/20 text-alkota-orange border border-alkota-orange/40 font-ibm-plex-mono text-[8px] uppercase">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    style={{ color: p.active ? '#22C55E' : '#555' }}
                    className="font-ibm-plex-mono text-[10px]"
                  >
                    {p.active ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <PartRowActions part={p} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
