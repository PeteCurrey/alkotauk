import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit, AlertTriangle, ShieldAlert, CheckCircle2, FileText, Image as ImageIcon, Search } from 'lucide-react';
import { ChemicalProduct } from '@/lib/types/chemical';
import { VERIFIED_CHEMICAL_PRODUCTS } from '@/lib/chemicals/seed-data';

const STATUS_TABS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Needs UK Review', value: 'needs_uk_review' },
  { label: 'UK Approved', value: 'uk_approved' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived' },
];

const CATEGORY_TABS = [
  { label: 'All Categories', value: 'all' },
  { label: 'Fleet & Transport', value: 'fleet-vehicle' },
  { label: 'Degreasers', value: 'degreasers' },
  { label: 'Ag & Heavy Industrial', value: 'industrial' },
  { label: 'Parts Washer', value: 'parts-washers' },
  { label: 'Scale Stop & Additives', value: 'specialty' },
  { label: 'Masonry & Concrete', value: 'masonry' },
  { label: 'Food & Process', value: 'food-processing' },
];

export default async function ChemicalsAdminPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string; category?: string; q?: string }>
}) {
  const { status = 'all', category = 'all', q = '' } = await searchParams;

  let dbQuery = supabaseAdmin
    .from('chemicals')
    .select('*')
    .order('sort_order')
    .order('name');

  if (category !== 'all') {
    dbQuery = dbQuery.or(`category.eq.${category},category.eq.${category.replace(/s$/, '')}`);
  }

  if (status !== 'all') {
    dbQuery = dbQuery.eq('uk_status', status);
  }

  const { data: dbData } = await dbQuery;

  // Combine DB data or fallback to canonical verified data
  let items: any[] = dbData && dbData.length > 0 ? dbData : VERIFIED_CHEMICAL_PRODUCTS;

  if (q) {
    const query = q.toLowerCase();
    items = items.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        (c.code && c.code.toLowerCase().includes(query)) ||
        (c.tagline && c.tagline.toLowerCase().includes(query))
    );
  }

  // Calculate QA Metrics
  const totalItems = items.length;
  const needsReviewCount = items.filter((c) => c.uk_status === 'needs_uk_review').length;
  const missingSdsCount = items.filter((c) => !c.sds_url && !c.pdf_datasheet_url).length;
  const missingMediaCount = items.filter((c) => !c.primary_image_url && !c.image_url).length;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            Chemical Range & Safety Manager
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">
            // {totalItems} products in registry · GB CLP & UK REACH Compliant
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/chemicals"
            target="_blank"
            className="flex items-center gap-1.5 border border-[#333] bg-[#141414] px-4 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#CCC] hover:text-white hover:border-[#555] transition-colors"
          >
            <span>Live Hub</span>
          </Link>
          <Link
            href="/admin/chemicals/new"
            className="flex items-center gap-2 bg-[#FF6900] px-5 py-2.5 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e55f00] transition-colors shadow"
          >
            <Plus className="h-4 w-4" /> Add Chemical
          </Link>
        </div>
      </div>

      {/* Safety QA Summary Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#222] border border-[#222]">
        <div className="bg-[#111] p-4">
          <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#666] mb-1">
            Total Catalog
          </span>
          <span className="font-ibm-plex-mono text-xl text-white font-bold">{totalItems}</span>
        </div>
        <div className="bg-[#111] p-4">
          <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#666] mb-1">
            Needs UK Review
          </span>
          <span className={`font-ibm-plex-mono text-xl font-bold ${needsReviewCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {needsReviewCount}
          </span>
        </div>
        <div className="bg-[#111] p-4">
          <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#666] mb-1">
            Missing / Unlinked SDS
          </span>
          <span className={`font-ibm-plex-mono text-xl font-bold ${missingSdsCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {missingSdsCount}
          </span>
        </div>
        <div className="bg-[#111] p-4">
          <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#666] mb-1">
            Media Placeholders
          </span>
          <span className="font-ibm-plex-mono text-xl text-cyan-400 font-bold">
            {missingMediaCount} Active
          </span>
        </div>
      </div>

      {/* Filter Tabs: UK Status */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2">
        <span className="font-ibm-plex-mono text-[9px] uppercase text-[#666] mr-2">Status:</span>
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab.value}
            href={`/admin/chemicals?status=${tab.value}${category !== 'all' ? `&category=${category}` : ''}`}
            className="px-3 py-1.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-all"
            style={{
              background: status === tab.value ? '#FF6900' : '#141414',
              color: status === tab.value ? '#fff' : '#777',
              border: '1px solid',
              borderColor: status === tab.value ? '#FF6900' : '#262626'
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Filter Tabs: Category */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-[#222]">
        <span className="font-ibm-plex-mono text-[9px] uppercase text-[#666] mr-2">Category:</span>
        {CATEGORY_TABS.map((tab) => (
          <Link
            key={tab.value}
            href={`/admin/chemicals?category=${tab.value}${status !== 'all' ? `&status=${status}` : ''}`}
            className="px-3 py-1.5 font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-all"
            style={{
              background: category === tab.value ? '#2A2A2A' : '#0D0D0D',
              color: category === tab.value ? '#fff' : '#666',
              border: '1px solid',
              borderColor: category === tab.value ? '#444' : '#222'
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table Container */}
      <div className="border border-[#222] overflow-x-auto bg-[#0E0E0E]">
        <table className="w-full text-sm min-w-[840px]">
          <thead>
            <tr style={{ background: '#141414', borderBottom: '1px solid #222' }}>
              {['Product / Code', 'Category', 'UK Status', 'QA & Safety Flags', 'pH / Form', 'Active', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center font-ibm-plex-mono text-[10px] text-[#444] uppercase tracking-widest">
                  No chemicals match the current filters —{' '}
                  <Link href="/admin/chemicals/new" className="text-[#FF6900] hover:underline">
                    create chemical
                  </Link>
                </td>
              </tr>
            ) : (
              items.map((c: any, i: number) => {
                const hasSds = !!(c.sds_url || c.pdf_datasheet_url);
                const hasImage = !!(c.primary_image_url || c.image_url);
                const isNeedsReview = c.uk_status === 'needs_uk_review';

                return (
                  <tr
                    key={c.id || c.slug}
                    className="hover:bg-[#141414] transition-colors"
                  >
                    {/* Name & Code */}
                    <td className="px-4 py-3.5">
                      <p className="font-inter text-[13px] text-white font-medium">{c.name}</p>
                      <p className="font-ibm-plex-mono text-[10px] text-[#666]">{c.code || c.slug}</p>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5 font-ibm-plex-mono text-[10px] text-[#888] uppercase">
                      {c.category?.replace(/-/g, ' ')}
                    </td>

                    {/* UK Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border ${
                          c.uk_status === 'published'
                            ? 'text-emerald-400 border-emerald-900/60 bg-emerald-950/20'
                            : c.uk_status === 'uk_approved'
                            ? 'text-cyan-400 border-cyan-900/60 bg-cyan-950/20'
                            : c.uk_status === 'needs_uk_review'
                            ? 'text-amber-400 border-amber-900/60 bg-amber-950/20'
                            : 'text-[#666] border-[#333]'
                        }`}
                      >
                        {c.uk_status?.replace(/_/g, ' ').toUpperCase() || 'PUBLISHED'}
                      </span>
                    </td>

                    {/* QA Flags */}
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {!hasSds && (
                          <span className="inline-flex items-center gap-1 font-ibm-plex-mono text-[8px] uppercase px-1.5 py-0.5 bg-red-950/40 text-red-400 border border-red-800/40">
                            <AlertTriangle className="h-2.5 w-2.5" /> NO SDS
                          </span>
                        )}
                        {!hasImage && (
                          <span className="inline-flex items-center gap-1 font-ibm-plex-mono text-[8px] uppercase px-1.5 py-0.5 bg-cyan-950/30 text-cyan-400 border border-cyan-800/30">
                            <ImageIcon className="h-2.5 w-2.5" /> PLACEHOLDER
                          </span>
                        )}
                        {hasSds && hasImage && !isNeedsReview && (
                          <span className="inline-flex items-center gap-1 font-ibm-plex-mono text-[8px] uppercase px-1.5 py-0.5 text-emerald-400">
                            <CheckCircle2 className="h-2.5 w-2.5" /> QA READY
                          </span>
                        )}
                      </div>
                    </td>

                    {/* pH & Form */}
                    <td className="px-4 py-3.5 font-ibm-plex-mono text-[10px] text-[#777]">
                      <span>{c.ph_level || '--'}</span> · <span>{c.form?.split(' ')[0] || 'Liquid'}</span>
                    </td>

                    {/* Active */}
                    <td className="px-4 py-3.5">
                      <span className={`font-ibm-plex-mono text-[9px] px-2 py-0.5 border ${c.active ? 'text-emerald-400 border-emerald-900/50' : 'text-red-400 border-red-900/50'}`}>
                        {c.active ? 'Live' : 'Hidden'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/chemicals/${c.id || c.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#333] font-ibm-plex-mono text-[9px] uppercase text-[#AAA] hover:text-white hover:border-[#FF6900] transition-all"
                      >
                        <Edit className="h-3 w-3" /> Edit
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
