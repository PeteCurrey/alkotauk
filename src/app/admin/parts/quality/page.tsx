import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  Edit, 
  DollarSign,
  Layers,
  FileQuestion
} from 'lucide-react';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ filter?: string; q?: string }>;
}

export default async function DataQualityDashboard({ searchParams }: PageProps) {
  const { filter, q } = await searchParams;

  // Query parts with review flags or data quality issues
  let query = supabaseAdmin
    .from('parts')
    .select('id, part_number, name, category, brand, price, description, catalogue_source, catalogue_page, needs_review, review_flags, data_quality_score, active, updated_at')
    .order('data_quality_score', { ascending: true })
    .order('part_number', { ascending: true });

  if (filter === 'missing_price') {
    query = query.is('price', null);
  } else if (filter === 'missing_desc') {
    query = query.or('description.is.null,description.eq.""');
  } else if (filter === 'low_score') {
    query = query.lt('data_quality_score', 60);
  } else if (filter === 'needs_review') {
    query = query.eq('needs_review', true);
  } else {
    query = query.or('needs_review.eq.true,data_quality_score.lt.80');
  }

  if (q) {
    query = query.or(`name.ilike.%${q}%,part_number.ilike.%${q}%`);
  }

  const { data: rawParts } = await query.limit(100);
  const parts = rawParts || [];

  // Fetch summary counts for the metric cards
  const [
    { count: totalCount },
    { count: reviewCount },
    { count: noPriceCount },
    { count: lowScoreCount }
  ] = await Promise.all([
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }).eq('needs_review', true),
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }).is('price', null),
    supabaseAdmin.from('parts').select('*', { count: 'exact', head: true }).lt('data_quality_score', 60),
  ]);

  return (
    <div className="space-y-6 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-[6px] p-6 shadow-tactile-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black text-white rounded-[5px]">
                <ShieldAlert className="w-5 h-5 text-[#FF6900]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/admin/parts"
                    className="font-ibm-plex-mono text-[10px] uppercase text-[#64748B] hover:text-[#FF6900] transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" /> Parts Studio
                  </Link>
                  <span className="text-[#CBD5E1]">/</span>
                  <span className="font-ibm-plex-mono text-[10px] uppercase text-[#FF6900]">Data Quality</span>
                </div>
                <h1 className="text-xl font-bold text-[#0F172A] tracking-tight mt-1">
                  Catalogue Data Quality &amp; Review Queue
                </h1>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Audit catalogue records, unpriced components, and extraction flags before public display.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/parts"
              className="flex items-center gap-2 px-4 py-2 bg-[#F1F3F7] hover:bg-[#E2E4E8] text-[#334155] text-xs font-semibold rounded-[4px] btn-tactile transition-colors"
            >
              All Parts Catalogue
            </Link>
            <Link
              href="/admin/parts/new"
              className="flex items-center gap-2 px-4 py-2 bg-[#FF6900] hover:bg-[#E55D00] text-white text-xs font-bold rounded-[4px] btn-tactile shadow-button hover:shadow-button-hover transition-all"
            >
              Add New Part
            </Link>
          </div>
        </div>

        {/* ── KPI METRIC CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E2E4E8]">
          <Link
            href="/admin/parts/quality"
            className={`p-4 rounded-[6px] border transition-all ${
              !filter ? 'bg-[#FAFBFD] border-[#FF6900]' : 'bg-white border-[#E2E4E8] hover:border-[#CBD5E1]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#64748B]">Total Catalogue</span>
              <Layers className="w-4 h-4 text-[#64748B]" />
            </div>
            <div className="text-2xl font-bold text-[#0F172A] mt-2">{totalCount ?? 0}</div>
            <span className="text-[11px] text-[#64748B]">Database records</span>
          </Link>

          <Link
            href="/admin/parts/quality?filter=needs_review"
            className={`p-4 rounded-[6px] border transition-all ${
              filter === 'needs_review' ? 'bg-[#FFF9F5] border-[#FF6900]' : 'bg-white border-[#E2E4E8] hover:border-[#CBD5E1]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900]">Needs Review</span>
              <AlertTriangle className="w-4 h-4 text-[#FF6900]" />
            </div>
            <div className="text-2xl font-bold text-[#FF6900] mt-2">{reviewCount ?? 0}</div>
            <span className="text-[11px] text-[#64748B]">Flagged for review</span>
          </Link>

          <Link
            href="/admin/parts/quality?filter=missing_price"
            className={`p-4 rounded-[6px] border transition-all ${
              filter === 'missing_price' ? 'bg-[#FFF9F5] border-[#FF6900]' : 'bg-white border-[#E2E4E8] hover:border-[#CBD5E1]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-amber-600">Unpriced (POA)</span>
              <DollarSign className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-amber-600 mt-2">{noPriceCount ?? 0}</div>
            <span className="text-[11px] text-[#64748B]">Require trade/rrp pricing</span>
          </Link>

          <Link
            href="/admin/parts/quality?filter=low_score"
            className={`p-4 rounded-[6px] border transition-all ${
              filter === 'low_score' ? 'bg-[#FFF9F5] border-[#FF6900]' : 'bg-white border-[#E2E4E8] hover:border-[#CBD5E1]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-red-600">Score &lt; 60%</span>
              <FileQuestion className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600 mt-2">{lowScoreCount ?? 0}</div>
            <span className="text-[11px] text-[#64748B]">Missing specs/images</span>
          </Link>
        </div>

        {/* ── SUPPLIER-SPECIFIC AUDIT QUEUES ── */}
        <div className="mt-6 pt-6 border-t border-[#E2E4E8]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#475569] font-mono">
              // Supplier Queues: Dual Pumps Ltd &amp; Steel Eagle USA
            </span>
            <Link
              href="/admin/parts/imports"
              className="text-[11px] text-[#FF6900] hover:text-[#E05D00] font-semibold"
            >
              View Ingestion Batches →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dual Pumps Queue */}
            <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-[6px] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A] text-sm">Dual Pumps Ltd Queue</span>
                <span className="font-mono text-[10px] bg-white border border-[#CBD5E1] px-2 py-0.5 rounded text-[#475569]">
                  UK Master Distributor
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                High-pressure bypass manifolds, fuel transfer systems, stainless gauges, and unloader assemblies.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <Link
                  href="/admin/parts?brand=dual-pumps"
                  className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded text-[#0F172A] hover:border-[#FF6900] transition-colors"
                >
                  All Dual Pumps Parts
                </Link>
                <Link
                  href="/admin/parts/staging?supplier=dual-pumps-uk"
                  className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded text-[#059669] font-medium hover:border-[#059669] transition-colors"
                >
                  Staged Dual Pumps Queue →
                </Link>
              </div>
            </div>

            {/* Steel Eagle Queue */}
            <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-[6px] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A] text-sm">Steel Eagle USA Queue</span>
                <span className="font-mono text-[10px] bg-white border border-[#CBD5E1] px-2 py-0.5 rounded text-[#475569]">
                  Commercial Manufacturer
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                Commercial rotary surface cleaners, vacuum wastewater recovery decks, undercarriage tools, and swivels.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <Link
                  href="/admin/parts?brand=steel-eagle"
                  className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded text-[#0F172A] hover:border-[#FF6900] transition-colors"
                >
                  All Steel Eagle Parts
                </Link>
                <Link
                  href="/admin/parts/staging?supplier=steel-eagle-direct"
                  className="px-2.5 py-1 bg-white border border-[#CBD5E1] rounded text-[#059669] font-medium hover:border-[#059669] transition-colors"
                >
                  Staged Steel Eagle Queue →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER TABS & SEARCH ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-medium">
          {[
            { id: '', label: 'All Flagged' },
            { id: 'needs_review', label: 'Needs Review', studioHref: '/admin/parts?review_status=needs_review' },
            { id: 'missing_price', label: 'Missing Price', studioHref: '/admin/parts?price_status=poa' },
            { id: 'missing_desc', label: 'Missing Description' },
            { id: 'low_score', label: 'Low Quality Score' },
          ].map(tab => (
            <Link
              key={tab.id}
              href={tab.id ? `/admin/parts/quality?filter=${tab.id}` : '/admin/parts/quality'}
              className={`px-3.5 py-1.5 rounded-[4px] transition-all whitespace-nowrap ${
                (filter || '') === tab.id
                  ? 'bg-black text-white shadow-tactile-sm'
                  : 'bg-white border border-[#E2E4E8] text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {tab.label}
            </Link>
          ))}

          {filter === 'needs_review' && (
            <Link
              href="/admin/parts?review_status=needs_review"
              className="ml-2 px-3 py-1.5 bg-[#FFF9F5] border border-[#FF6900] text-[#FF6900] rounded-[4px] text-xs font-semibold hover:bg-[#FF6900] hover:text-white transition-all shrink-0"
            >
              Open in Studio Table &amp; Bulk Update →
            </Link>
          )}
          {filter === 'missing_price' && (
            <Link
              href="/admin/parts?price_status=poa"
              className="ml-2 px-3 py-1.5 bg-amber-50 border border-amber-600 text-amber-700 rounded-[4px] text-xs font-semibold hover:bg-amber-600 hover:text-white transition-all shrink-0"
            >
              Open in Studio Table &amp; Bulk Price →
            </Link>
          )}
        </div>

        <form method="GET" className="flex items-center gap-2">
          {filter && <input type="hidden" name="filter" value={filter} />}
          <input
            type="text"
            name="q"
            defaultValue={q || ''}
            placeholder="Search part # or name..."
            className="px-3 py-1.5 bg-white border border-[#E2E4E8] rounded-[5px] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#FF6900] w-64"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-black text-white text-xs font-semibold rounded-[4px] btn-tactile hover:bg-[#222] transition-colors"
          >
            Filter
          </button>
        </form>
      </div>

      {/* ── PARTS QUALITY TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-[6px] shadow-tactile-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E4E8] flex items-center justify-between">
          <span className="font-ibm-plex-mono text-xs uppercase tracking-wider text-[#64748B]">
            Showing {parts.length} flagged products
          </span>
          <span className="text-xs text-[#64748B]">
            Click Edit to update specifications, pricing, or mark verified
          </span>
        </div>

        {parts.length === 0 ? (
          <div className="p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[#0F172A]">All parts clean</h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
              No parts found matching this filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                  <th className="py-3 px-4">Part #</th>
                  <th className="py-3 px-4">Component Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Catalogue Ref</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Quality Score</th>
                  <th className="py-3 px-4">Review Flags</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E4E8] text-xs">
                {parts.map(part => {
                  const score = part.data_quality_score ?? 50;
                  const scoreColor =
                    score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500';

                  return (
                    <tr key={part.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-4 font-ibm-plex-mono text-xs font-semibold text-[#0F172A]">
                        {part.part_number}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#0F172A] max-w-sm truncate">
                          {part.name}
                        </div>
                        {part.description && (
                          <div className="text-[11px] text-[#64748B] max-w-sm truncate mt-0.5">
                            {part.description}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 bg-[#F1F5F9] text-[#475569] text-[10px] uppercase font-mono rounded-[3px]">
                          {part.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#64748B] text-[11px] font-mono">
                        {part.catalogue_page ? `Page ${part.catalogue_page}` : 'Index only'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs">
                        {part.price !== null && part.price !== undefined ? (
                          <span className="font-semibold text-[#0F172A]">£{Number(part.price).toFixed(2)}</span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-semibold rounded-[3px]">
                            POA (No price)
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-[#E2E4E8] h-1.5 rounded-[3px] overflow-hidden">
                            <div className={`h-full ${scoreColor}`} style={{ width: `${score}%` }} />
                          </div>
                          <span className="font-mono text-[11px] text-[#64748B]">{score}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {(part.review_flags || []).map((flag: string) => (
                            <span
                              key={flag}
                              className="px-1.5 py-0.5 bg-red-50 text-red-700 text-[9px] uppercase font-mono rounded-[3px]"
                            >
                              {flag.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/parts/${part.id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[#CBD5E1] hover:border-[#FF6900] hover:text-[#FF6900] text-[#334155] text-xs font-semibold rounded-[4px] btn-tactile transition-all"
                        >
                          <Edit className="w-3 h-3" /> Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
