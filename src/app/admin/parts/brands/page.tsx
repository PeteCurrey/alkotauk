import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Building2, ExternalLink, ArrowLeft } from 'lucide-react';
import BrandRowActions from './BrandRowActions';

export const dynamic = 'force-dynamic';

export default async function BrandPartnersAdminPage() {
  const { data: brands } = await supabaseAdmin
    .from('brand_partners')
    .select('id,slug,name,tagline,website_url,country_of_origin,sort_order,active')
    .order('sort_order');

  const brandList = brands || [];

  return (
    <div className="text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link 
              href="/admin/parts" 
              className="flex items-center gap-1.5 font-ibm-plex-mono text-[10px] text-[#777] hover:text-white uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Parts Catalogue</span>
            </Link>
          </div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic">
            Brand Partners Manager
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
            // {brandList.length} brands · Mosmatic · Cox Reels · Steel Eagle · Dual Pumps · Alkota
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/parts-attachments"
            target="_blank"
            className="flex items-center gap-2 border border-[#333] bg-[#141414] px-4 py-3 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#CCC] hover:text-white"
          >
            <span>Live Experience</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-[#222] pb-4 overflow-x-auto">
        <Link
          href="/admin/parts"
          className="px-4 py-2 bg-[#141414] text-[#888] hover:text-white border border-[#262626] font-ibm-plex-mono text-[10px] uppercase tracking-wider"
        >
          All Components
        </Link>
        <Link
          href="/admin/parts/categories"
          className="px-4 py-2 bg-[#141414] text-[#888] hover:text-white border border-[#262626] font-ibm-plex-mono text-[10px] uppercase tracking-wider"
        >
          Part Categories
        </Link>
        <Link
          href="/admin/parts/brands"
          className="px-4 py-2 bg-alkota-orange text-white font-ibm-plex-mono text-[10px] uppercase tracking-wider font-bold"
        >
          Brand Partners ({brandList.length})
        </Link>
      </div>

      {/* Brands Table */}
      <div className="border border-[#222] overflow-x-auto bg-[#0E0E0E]">
        <table className="w-full text-left">
          <thead>
            <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #222' }}>
              {['Order', 'Slug', 'Brand Name', 'Tagline', 'Origin', 'Website', 'Status', 'Actions'].map((h) => (
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
            {brandList.map((b: any, i: number) => (
              <tr
                key={b.id}
                style={{
                  borderBottom: '1px solid #1A1A1A',
                  background: i % 2 === 0 ? '#111' : '#0D0D0D',
                }}
                className="hover:bg-[#161616] transition-colors"
              >
                <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-[#777]">
                  {b.sort_order ?? 0}
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[11px] text-alkota-orange font-bold">
                  {b.slug}
                </td>
                <td className="px-4 py-3 font-inter text-[13px] text-white">
                  <Link
                    href={`/parts-attachments/brands/${b.slug}`}
                    target="_blank"
                    className="hover:text-alkota-orange transition-colors flex items-center gap-1.5"
                  >
                    <span>{b.name}</span>
                    <ExternalLink className="h-3 w-3 text-[#666]" />
                  </Link>
                </td>
                <td className="px-4 py-3 font-inter text-[11px] text-[#888]">
                  {b.tagline || '—'}
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#AAA]">
                  {b.country_of_origin || '—'}
                </td>
                <td className="px-4 py-3 font-ibm-plex-mono text-[10px] text-[#666]">
                  {b.website_url ? (
                    <a href={b.website_url} target="_blank" rel="noreferrer" className="text-alkota-orange hover:underline">
                      Link
                    </a>
                  ) : '—'}
                </td>
                <td className="px-4 py-3">
                  <span
                    style={{ color: b.active ? '#22C55E' : '#555' }}
                    className="font-ibm-plex-mono text-[10px]"
                  >
                    {b.active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <BrandRowActions brand={b} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
