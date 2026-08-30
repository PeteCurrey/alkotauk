import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Activity, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  XCircle, 
  RefreshCw,
  Layers,
  FileText
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminImportBatchesPage() {
  const { data: dbBatches } = await supabaseAdmin
    .from('import_batches')
    .select('*, supplier:suppliers(name, slug, code)')
    .order('started_at', { ascending: false })
    .limit(50);

  const batches = (dbBatches || []) as any[];

  return (
    <div className="space-y-6 pb-24 max-w-[1600px] mx-auto px-4 sm:px-6 font-sans">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin/parts/supplier-centre" className="hover:text-[#FF6900] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Supplier Centre
              </Link>
              <span>/</span>
              <span className="text-[#FF6900]">Import Batches & Sync Logs</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Ingestion Batches & Observability Logs
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5 max-w-3xl">
              Track execution history, discovered items, duplicate detection stats, and audit logs for all supplier sync operations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/parts/staging"
              className="flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-[#222] text-white text-xs font-bold rounded-lg transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#FF6900]" />
              View Staged Products
            </Link>
          </div>
        </div>
      </div>

      {/* ── BATCHES TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Started / Date</th>
              <th className="py-3.5 px-4">Supplier</th>
              <th className="py-3.5 px-4">Trigger</th>
              <th className="py-3.5 px-4">Discovered</th>
              <th className="py-3.5 px-4">New</th>
              <th className="py-3.5 px-4">Duplicates</th>
              <th className="py-3.5 px-4">Review Req.</th>
              <th className="py-3.5 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F7]">
            {batches.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-[#94A3B8]">
                  No import batch runs recorded yet. Trigger a sync from the Supplier Centre to see live logs.
                </td>
              </tr>
            ) : (
              batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#0F172A]">
                    {new Date(batch.started_at).toLocaleString('en-GB')}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                    {batch.supplier?.name || 'Unknown Supplier'}
                  </td>

                  <td className="py-3.5 px-4 uppercase text-[10px] font-mono text-[#64748B]">
                    {batch.trigger_method}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">
                    {batch.products_discovered}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-green-700 font-bold">
                    +{batch.products_new}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-amber-700">
                    {batch.products_duplicate}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[#0F172A]">
                    {batch.products_requiring_review}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        batch.status === 'completed'
                          ? 'bg-green-50 text-green-700'
                          : batch.status === 'running'
                          ? 'bg-blue-50 text-blue-700'
                          : batch.status === 'completed_with_warnings'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {batch.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                      {batch.status === 'running' && <RefreshCw className="w-3 h-3 animate-spin" />}
                      {batch.status === 'failed' && <XCircle className="w-3 h-3" />}
                      {batch.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
