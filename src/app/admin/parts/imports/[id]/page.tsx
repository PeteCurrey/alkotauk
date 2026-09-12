import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Layers, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  XCircle, 
  ShieldAlert,
  Merge,
  ExternalLink
} from 'lucide-react';
import BatchReviewActions from './BatchReviewActions';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ filter?: string }>;
}

export default async function AdminBatchDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { filter = 'all' } = await searchParams;

  const { data: batch, error: bErr } = await supabaseAdmin
    .from('import_batches')
    .select('*, supplier:suppliers(name, slug, code, default_margin_pct)')
    .eq('id', id)
    .single();

  if (bErr || !batch) notFound();

  let query = supabaseAdmin
    .from('staged_supplier_products')
    .select('*, matched_part:parts(id, part_number, name, price, brand, in_stock)')
    .eq('batch_id', id)
    .order('created_at', { ascending: false });

  if (filter === 'new') query = query.eq('import_status', 'new_product');
  if (filter === 'duplicates') query = query.eq('import_status', 'matched_duplicate');
  if (filter === 'imported') query = query.eq('import_status', 'imported');
  if (filter === 'rejected') query = query.eq('import_status', 'rejected');

  const { data: stagedItems } = await query;
  const items = (stagedItems || []) as any[];

  return (
    <div className="space-y-6 pb-24 max-w-[1600px] mx-auto px-4 sm:px-6 font-sans">
      {/* ── BREADCRUMB & HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin/parts/imports" className="hover:text-[#FF6900] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Ingestion Batches
              </Link>
              <span>/</span>
              <span className="text-[#FF6900]">{batch.supplier?.name}</span>
              <span>/</span>
              <span>Batch {batch.id.slice(0, 8)}</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Review Batch: {batch.supplier?.name}
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Source: {batch.source_document || 'Feed'} · Started: {new Date(batch.started_at).toLocaleString('en-GB')}
            </p>
          </div>

          <BatchReviewActions
            batchId={batch.id}
            mode="batch_new"
            supplierName={batch.supplier?.name || 'Supplier'}
          />
        </div>
      </div>

      {/* ── BATCH METRICS STRIP ── */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block">Received</span>
          <span className="text-2xl font-bold text-[#0F172A] tracking-tight mt-1 block">
            {(batch.records_received || batch.products_discovered || 0).toLocaleString()}
          </span>
        </div>
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#059669] block">Valid</span>
          <span className="text-2xl font-bold text-[#059669] tracking-tight mt-1 block">
            {(batch.records_valid || batch.products_discovered || 0).toLocaleString()}
          </span>
        </div>
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#0F172A] block">New Items</span>
          <span className="text-2xl font-bold text-[#0F172A] tracking-tight mt-1 block">
            {(batch.records_new || batch.products_new || 0).toLocaleString()}
          </span>
        </div>
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] block">Duplicates</span>
          <span className="text-2xl font-bold text-[#D97706] tracking-tight mt-1 block">
            {(batch.records_duplicates || batch.products_duplicate || 0).toLocaleString()}
          </span>
        </div>
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#DC2626] block">Review Flags</span>
          <span className="text-2xl font-bold text-[#DC2626] tracking-tight mt-1 block">
            {(batch.records_review || batch.products_requiring_review || 0).toLocaleString()}
          </span>
        </div>
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#2563EB] block">Approved</span>
          <span className="text-2xl font-bold text-[#2563EB] tracking-tight mt-1 block">
            {(batch.records_approved || 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* ── FILTER TABS ── */}
      <div className="flex items-center gap-2 border-b border-[#E2E4E8] pb-2 text-xs">
        {[
          { id: 'all', label: 'All Items' },
          { id: 'new', label: 'New Products' },
          { id: 'duplicates', label: 'Potential Duplicates' },
          { id: 'imported', label: 'Approved & Imported' },
          { id: 'rejected', label: 'Rejected' },
        ].map(tab => {
          const active = filter === tab.id;
          return (
            <Link
              key={tab.id}
              href={`/admin/parts/imports/${id}?filter=${tab.id}`}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                active 
                  ? 'bg-[#0F172A] text-white' 
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* ── STAGED ITEMS TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Supplier SKU / MPN</th>
              <th className="py-3.5 px-4">Product Title & Brand</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4 text-right">Cost (£)</th>
              <th className="py-3.5 px-4 text-center">Quality</th>
              <th className="py-3.5 px-4">Duplicate Detection / Match</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E4E8]">
            {items.map(item => {
              const hasMatch = item.matched_part;
              const qualityScore = item.provenance?.data_quality_score ?? 80;

              return (
                <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-bold text-[#0F172A] block">{item.supplier_sku}</span>
                    <span className="text-[10px] text-[#64748B] block">MPN: {item.mpn || 'None'}</span>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <span className="font-medium text-[#0F172A] line-clamp-1 block" title={item.raw_title}>
                      {item.raw_title}
                    </span>
                    <span className="text-[10px] text-[#64748B] block mt-0.5">
                      {item.manufacturer || item.raw_brand || batch.supplier?.name}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11px] text-[#334155] block">
                      {item.suggested_category || item.raw_category || 'other'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-medium text-[#0F172A]">
                    £{Number(item.cost_price).toFixed(2)}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      qualityScore >= 80 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : qualityScore >= 50 
                        ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {qualityScore}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    {item.matched_part_id && (
                      <div className="bg-amber-50 border border-amber-200 rounded p-2 text-[11px] space-y-1">
                        <div className="flex items-center gap-1 text-amber-800 font-bold">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Candidate Match ({Math.round((item.match_confidence || 0) * 100)}%)</span>
                        </div>
                        <p className="text-[#0F172A] font-medium line-clamp-1">
                          Existing: {item.matched_part?.part_number} — {item.matched_part?.name}
                        </p>
                        <p className="text-[10px] text-[#64748B]">
                          Reason: {item.match_reason}
                        </p>
                      </div>
                    )}
                    {!item.matched_part_id && (
                      <span className="text-[11px] text-emerald-600 font-medium">
                        ✓ No duplicates found
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.import_status === 'imported'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.import_status === 'matched_duplicate'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : item.import_status === 'rejected'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {item.import_status.replace(/_/g, ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <BatchReviewActions
                      batchId={batch.id}
                      stagedId={item.id}
                      matchedPartId={item.matched_part_id}
                      mode="single"
                      supplierName={batch.supplier?.name || 'Supplier'}
                    />
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
