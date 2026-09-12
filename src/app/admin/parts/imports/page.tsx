import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Layers, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  RefreshCw,
  Plus,
  ExternalLink,
  ShieldAlert,
  FileSpreadsheet
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminImportsDashboardPage() {
  const { data: dbBatches } = await supabaseAdmin
    .from('import_batches')
    .select('*, supplier:suppliers(name, slug, code)')
    .order('started_at', { ascending: false });

  const batches = (dbBatches || []) as any[];

  // Calculate high-level metrics across all batches
  const totalReceived = batches.reduce((acc, b) => acc + (b.records_received || b.products_discovered || 0), 0);
  const totalNew = batches.reduce((acc, b) => acc + (b.records_new || b.products_new || 0), 0);
  const totalDuplicates = batches.reduce((acc, b) => acc + (b.records_duplicates || b.products_duplicate || 0), 0);
  const totalReview = batches.reduce((acc, b) => acc + (b.records_review || b.products_requiring_review || 0), 0);
  const totalApproved = batches.reduce((acc, b) => acc + (b.records_approved || 0), 0);

  return (
    <div className="space-y-6 pb-24 max-w-[1600px] mx-auto px-4 sm:px-6 font-sans">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin/parts" className="hover:text-[#FF6900] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Parts Studio
              </Link>
              <span>/</span>
              <span className="text-[#FF6900]">Supplier Ingestion Dashboard</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Supplier Catalogue Ingestion Batches
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5 max-w-3xl">
              Authoritative staged pipeline for Dual Pumps Ltd, Steel Eagle USA, and third-party manufacturers. Controlled ingestion with zero automatic publication.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/parts/staging"
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold rounded-lg transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#64748B]" />
              Staged Queue
            </Link>
            <Link
              href="/admin/parts/import"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6900] hover:bg-[#E05D00] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Upload New Catalogue
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI METRICS STRIP ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block">Total Processed</span>
          <span className="text-2xl font-bold text-[#0F172A] tracking-tight mt-1 block">
            {totalReceived.toLocaleString()}
          </span>
        </div>
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#059669] block">New Products</span>
          <span className="text-2xl font-bold text-[#059669] tracking-tight mt-1 block">
            {totalNew.toLocaleString()}
          </span>
        </div>
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] block">Duplicates Detected</span>
          <span className="text-2xl font-bold text-[#D97706] tracking-tight mt-1 block">
            {totalDuplicates.toLocaleString()}
          </span>
        </div>
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#DC2626] block">Needs Review</span>
          <span className="text-2xl font-bold text-[#DC2626] tracking-tight mt-1 block">
            {totalReview.toLocaleString()}
          </span>
        </div>
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#2563EB] block">Approved & Published</span>
          <span className="text-2xl font-bold text-[#2563EB] tracking-tight mt-1 block">
            {totalApproved.toLocaleString()}
          </span>
        </div>
      </div>

      {/* ── BATCHES TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#E2E4E8] flex items-center justify-between bg-[#F8FAFC]">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#475569] font-mono">
            Catalogue Ingestion Batches ({batches.length})
          </h2>
          <span className="text-[11px] text-[#64748B]">
            Real-time execution telemetry
          </span>
        </div>

        {batches.length === 0 ? (
          <div className="p-16 text-center text-[#64748B] space-y-3">
            <FileSpreadsheet className="w-10 h-10 text-[#CBD5E1] mx-auto" />
            <p className="text-sm font-medium text-[#0F172A]">No supplier batches executed yet</p>
            <p className="text-xs max-w-md mx-auto">
              Run the command-line ingestion pipeline or upload a supplier catalogue file to stage products.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Batch ID / Date</th>
                  <th className="py-3.5 px-4">Supplier</th>
                  <th className="py-3.5 px-4">Source / Version</th>
                  <th className="py-3.5 px-4 text-right">Received</th>
                  <th className="py-3.5 px-4 text-right">Valid</th>
                  <th className="py-3.5 px-4 text-right">New</th>
                  <th className="py-3.5 px-4 text-right">Duplicates</th>
                  <th className="py-3.5 px-4 text-right">Needs Review</th>
                  <th className="py-3.5 px-4 text-right">Approved</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E4E8]">
                {batches.map(batch => {
                  const isCompleted = batch.status === 'completed';
                  const isWarning = batch.status === 'completed_with_warnings';
                  const isRunning = batch.status === 'running';

                  return (
                    <tr key={batch.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[11px] font-bold text-[#0F172A] block">
                          {batch.id.slice(0, 8)}...
                        </span>
                        <span className="text-[10px] text-[#64748B] block mt-0.5">
                          {new Date(batch.started_at).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-[#0F172A]">
                        {batch.supplier?.name || 'Unknown Supplier'}
                        <span className="text-[10px] text-[#64748B] block font-mono">
                          code: {batch.supplier?.code || 'N/A'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[#475569]">
                        <span className="truncate max-w-[180px] block" title={batch.source_document || 'Feed'}>
                          {batch.source_document || batch.trigger_method}
                        </span>
                        {batch.source_version && (
                          <span className="font-mono text-[9px] text-[#64748B]">v{batch.source_version}</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-medium">
                        {(batch.records_received || batch.products_discovered || 0).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-[#059669]">
                        {(batch.records_valid || batch.products_discovered || 0).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-[#0F172A] font-bold">
                        {(batch.records_new || batch.products_new || 0).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-[#D97706]">
                        {(batch.records_duplicates || batch.products_duplicate || 0).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-[#DC2626] font-bold">
                        {(batch.records_review || batch.products_requiring_review || 0).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-[#2563EB] font-bold">
                        {(batch.records_approved || 0).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isWarning
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : isRunning
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {batch.status.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/parts/imports/${batch.id}`}
                          className="inline-flex items-center gap-1 text-xs text-[#FF6900] hover:text-[#E05D00] font-semibold"
                        >
                          <span>Review Batch</span>
                          <ExternalLink className="w-3 h-3" />
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
