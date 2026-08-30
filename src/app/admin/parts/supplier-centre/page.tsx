import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Truck, 
  Plus, 
  ArrowLeft, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Layers, 
  Settings, 
  Sparkles, 
  FileSpreadsheet, 
  Zap, 
  Activity,
  AlertTriangle
} from 'lucide-react';
import { SUPPLIER_REGISTRY } from '@/lib/supplier-connectors/registry';
import { COMPREHENSIVE_SUPPLIERS } from '@/lib/parts/seed-comprehensive';
import SupplierCardActions from './SupplierCardActions';

export const revalidate = 0;

export default async function AdminSupplierCentrePage() {
  const { data: dbSuppliers } = await supabaseAdmin
    .from('suppliers')
    .select('*')
    .order('sort_order', { ascending: true });

  const suppliers = (dbSuppliers && dbSuppliers.length > 0) ? dbSuppliers : COMPREHENSIVE_SUPPLIERS;

  // Calculate metrics
  const totalCount = suppliers.length;
  const connectedCount = suppliers.filter((s: any) => s.sync_status === 'completed').length;
  const needsAttentionCount = suppliers.filter((s: any) => s.sync_status === 'failed' || !s.api_endpoint).length;

  return (
    <div className="space-y-6 pb-24 max-w-[1600px] mx-auto px-4 sm:px-6 font-sans">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin/parts" className="hover:text-[#FF6900] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Parts Studio
              </Link>
              <span>/</span>
              <span className="text-[#FF6900]">Supplier Intelligence & Ingestion Centre</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Supplier Centre & Feed Ingestion Engine
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5 max-w-3xl leading-relaxed">
              Manage multi-supplier connector adapters (REST, XML, JSON, CSV, PDF, Manual), automated pricing margin rules, live inventory sync, and staging pipeline controls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/parts/import/batches"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F1F3F7] hover:bg-[#E2E4E8] text-[#334155] text-xs font-semibold rounded-lg transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-[#64748B]" />
              View Import Batches
            </Link>
            <Link
              href="/admin/parts/staging"
              className="flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-[#222] text-white text-xs font-bold rounded-lg transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#FF6900]" />
              Staging Catalogue
            </Link>
            <Link
              href="/admin/parts/supplier-centre/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6900] hover:bg-[#E55D00] text-white text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Supplier
            </Link>
          </div>
        </div>

        {/* ── COMMERCE SUB-NAV ── */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#E2E4E8] overflow-x-auto text-xs font-medium">
          <Link
            href="/admin/parts"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            All Products
          </Link>
          <Link
            href="/admin/parts/supplier-centre"
            className="px-3.5 py-2 bg-[#111] text-white rounded-lg shadow-sm shrink-0"
          >
            Supplier Centre ({totalCount})
          </Link>
          <Link
            href="/admin/parts/staging"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            Staging Review
          </Link>
          <Link
            href="/admin/parts/ai-review"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            AI Review Queue
          </Link>
          <Link
            href="/admin/parts/import/batches"
            className="px-3.5 py-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F3F7] rounded-lg transition-colors shrink-0"
          >
            Sync Batches & Logs
          </Link>
        </div>
      </div>

      {/* ── METRICS STRIP ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Total Supplier Records</span>
          <span className="text-2xl font-bold text-[#0F172A] mt-1 block">{totalCount}</span>
        </div>
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Active Automated Feeds</span>
          <span className="text-2xl font-bold text-green-600 mt-1 block">{connectedCount}</span>
        </div>
        <div className="bg-white border border-[#E2E4E8] p-5 rounded-xl">
          <span className="text-xs text-[#64748B] font-medium block">Ready for API Credentials</span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">{needsAttentionCount}</span>
        </div>
      </div>

      {/* ── SUPPLIER CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {suppliers.map((supplier: any) => {
          const registryInfo = SUPPLIER_REGISTRY[supplier.slug];
          const hasEndpoint = Boolean(supplier.api_endpoint || supplier.feed_url);
          const isConnected = supplier.sync_status === 'completed';

          return (
            <div
              key={supplier.slug}
              className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm flex flex-col justify-between hover:border-[#CBD5E1] transition-all space-y-6"
            >
              <div className="space-y-4">
                {/* Top Row: Name + Status Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] text-[#FF6900] uppercase tracking-wider block font-bold">
                      // {supplier.code || 'OEM'} · {supplier.supplier_type}
                    </span>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-0.5 flex items-center gap-2">
                      {supplier.name}
                      {supplier.website_url && (
                        <a
                          href={supplier.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#94A3B8] hover:text-[#0F172A]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </h3>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      isConnected
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isConnected ? 'bg-green-600' : 'bg-amber-600'
                      }`}
                    />
                    {isConnected ? 'Active Feed' : 'Awaiting Config'}
                  </span>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {supplier.notes || registryInfo?.description || 'Registered commercial equipment and spares provider.'}
                </p>

                {/* Integration Details Box */}
                <div className="bg-[#F8FAFC] border border-[#E2E4E8] p-3.5 rounded-lg space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Method:</span>
                    <span className="text-[#0F172A] font-bold uppercase">{supplier.integration_method || supplier.feed_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Default Margin:</span>
                    <span className="text-[#0F172A] font-bold">{supplier.default_margin_pct || 35}% Gross</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Last Sync:</span>
                    <span className="text-[#0F172A]">
                      {supplier.last_sync_at ? new Date(supplier.last_sync_at).toLocaleDateString('en-GB') : 'Never'}
                    </span>
                  </div>
                </div>

                {/* Missing Requirements Guidance */}
                {!hasEndpoint && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[11px] space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Required to Activate Live Feed:
                    </div>
                    <p className="text-amber-700">
                      Supply API endpoint / Feed URL or set <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">{registryInfo?.credentialEnvPattern || `SUPPLIER_${supplier.slug.toUpperCase()}_API_KEY`}</code> in environment.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions Row */}
              <SupplierCardActions supplier={supplier} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
