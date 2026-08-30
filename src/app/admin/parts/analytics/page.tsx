import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { BarChart2, ArrowLeft, AlertCircle, Search, Sparkles, TrendingUp } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSearchAnalyticsPage() {
  const { data: searches } = await supabaseAdmin
    .from('search_analytics')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  const searchLogs = searches || [];
  const zeroResults = searchLogs.filter(s => s.is_zero_result);
  const successfulSearches = searchLogs.filter(s => !s.is_zero_result);

  return (
    <div className="space-y-6 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin/parts" className="hover:text-[#FF6900] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Parts Studio
              </Link>
              <span>/</span>
              <span className="text-[#FF6900]">Search Analytics & Intelligence</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Search Intelligence & Zero-Result Analytics
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Analyze what customers and trade engineers are searching for to guide supplier relationships, stock stocking, and catalogue taxonomy additions.
            </p>
          </div>
        </div>
      </div>

      {/* ── METRICS STRIP ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Total Search Queries Logged</span>
          <span className="text-2xl font-bold text-[#0F172A] mt-1 block">{searchLogs.length}</span>
        </div>
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Zero-Result Searches (Procurement Signals)</span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">{zeroResults.length}</span>
        </div>
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Search Match Rate</span>
          <span className="text-2xl font-bold text-green-600 mt-1 block">
            {searchLogs.length > 0
              ? `${Math.round((successfulSearches.length / searchLogs.length) * 100)}%`
              : '100%'}
          </span>
        </div>
      </div>

      {/* ── ZERO-RESULT QUERIES TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-[#0F172A]">
            Zero-Result Searches — Demand & Procurement Opportunities
          </h2>
        </div>
        <p className="text-xs text-[#64748B]">
          These queries returned 0 results on the live parts hub. Use these exact part numbers and terms to source from Dual Pumps, Flowjet, or direct manufacturers.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Search Term</th>
                <th className="py-3 px-4">Applied Filters</th>
                <th className="py-3 px-4 text-right">Result Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F7]">
              {zeroResults.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[#94A3B8]">
                    No zero-result searches recorded yet.
                  </td>
                </tr>
              ) : (
                zeroResults.map((z: any) => (
                  <tr key={z.id} className="hover:bg-[#F8FAFC]">
                    <td className="py-3 px-4 font-mono text-[#64748B]">
                      {new Date(z.created_at).toLocaleString('en-GB')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">
                      "{z.query}"
                    </td>
                    <td className="py-3 px-4 text-[#64748B] font-mono text-[11px]">
                      {JSON.stringify(z.filters || {})}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-red-600">
                      0 Results
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
