import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Layers, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Search, 
  ExternalLink,
  ShieldAlert,
  Merge
} from 'lucide-react';
import StagingTableActions from './StagingTableActions';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ status?: string; supplier?: string; q?: string }>;
}

export default async function AdminStagingCataloguePage({ searchParams }: PageProps) {
  const { status, supplier, q } = await searchParams;

  let query = supabaseAdmin
    .from('staged_supplier_products')
    .select('*, supplier:suppliers(name, slug, default_margin_pct)')
    .order('created_at', { ascending: false })
    .limit(150);

  if (status && status !== 'all') {
    query = query.eq('import_status', status);
  }
  if (supplier && supplier !== 'all') {
    query = query.eq('supplier_id', supplier);
  }
  if (q) {
    query = query.or(`raw_title.ilike.%${q}%,supplier_sku.ilike.%${q}%,raw_brand.ilike.%${q}%`);
  }

  const { data: stagedItems } = await query;
  const items = (stagedItems || []) as any[];

  // Fetch suppliers for filter dropdown
  const { data: suppliers } = await supabaseAdmin
    .from('suppliers')
    .select('id, name, slug')
    .order('name');

  // Calculate metrics
  const totalStaged = items.length;
  const pendingCount = items.filter(i => i.import_status === 'pending' || i.import_status === 'new_product').length;
  const duplicateCount = items.filter(i => i.import_status === 'matched_duplicate').length;
  const anomalyCount = items.filter(i => (i.anomaly_flags || []).length > 0).length;

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
              <span className="text-[#FF6900]">Staging Catalogue & Review Pipeline</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Staging Review & Product Normalisation Pipeline
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5 max-w-3xl">
              Inspect AI classifications, duplicate candidates, and pricing anomalies before promoting products to the live canonical catalogue.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/parts/ai-review"
              className="flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-[#222] text-white text-xs font-bold rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF6900]" />
              AI Review Queue
            </Link>
          </div>
        </div>
      </div>

      {/* ── METRICS STRIP ── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Total Staged Items</span>
          <span className="text-2xl font-bold text-[#0F172A] mt-1 block">{totalStaged}</span>
        </div>
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">New Products (Awaiting Approval)</span>
          <span className="text-2xl font-bold text-green-600 mt-1 block">{pendingCount}</span>
        </div>
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Duplicate Candidates</span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">{duplicateCount}</span>
        </div>
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Anomalies Detected</span>
          <span className="text-2xl font-bold text-red-600 mt-1 block">{anomalyCount}</span>
        </div>
      </div>

      {/* ── STAGING TABLE + CLIENT BULK CONTROLS ── */}
      <StagingTableActions items={items} suppliers={suppliers || []} />
    </div>
  );
}
