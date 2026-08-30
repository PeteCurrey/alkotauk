import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Truck, 
  ExternalLink, 
  RefreshCw, 
  Activity, 
  ShieldCheck, 
  Settings,
  Layers,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { SUPPLIER_REGISTRY } from '@/lib/supplier-connectors/registry';
import SupplierCardActions from '../SupplierCardActions';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SupplierDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: supplier, error } = await supabaseAdmin
    .from('suppliers')
    .select('*')
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .single();

  if (error || !supplier) {
    notFound();
  }

  // Fetch recent batches for this supplier
  const { data: batches } = await supabaseAdmin
    .from('import_batches')
    .select('*')
    .eq('supplier_id', supplier.id)
    .order('started_at', { ascending: false })
    .limit(10);

  // Fetch mapped products count
  const { count: mappedCount } = await supabaseAdmin
    .from('supplier_products')
    .select('*', { count: 'exact', head: true })
    .eq('supplier_id', supplier.id);

  const registryInfo = SUPPLIER_REGISTRY[supplier.slug];

  return (
    <div className="space-y-6 pb-24 max-w-[1400px] mx-auto px-4 sm:px-6 font-sans">
      {/* ── HEADER ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
              <Link href="/admin/parts/supplier-centre" className="hover:text-[#FF6900] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Supplier Centre
              </Link>
              <span>/</span>
              <span className="text-[#FF6900]">{supplier.name}</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              {supplier.name} — Connector Profile
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Code: <strong className="font-mono text-[#0F172A]">{supplier.code || 'OEM'}</strong> · Type: <strong className="text-[#0F172A] capitalize">{supplier.supplier_type}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/admin/parts/staging?supplier=${supplier.id}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-[#222] text-white text-xs font-bold rounded-lg transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#FF6900]" />
              View Staged Products
            </Link>
          </div>
        </div>
      </div>

      {/* ── METRICS & CONFIG GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details & Credentials */}
        <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
            Connector Configuration
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-[#F1F3F7]">
              <span className="text-[#64748B]">Method:</span>
              <span className="font-mono font-bold uppercase text-[#0F172A]">{supplier.integration_method || supplier.feed_type}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F1F3F7]">
              <span className="text-[#64748B]">Auth Scheme:</span>
              <span className="font-mono uppercase text-[#0F172A]">{supplier.auth_method || 'none'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F1F3F7]">
              <span className="text-[#64748B]">Default Gross Margin:</span>
              <span className="font-mono font-bold text-[#0F172A]">{supplier.default_margin_pct}%</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F1F3F7]">
              <span className="text-[#64748B]">Sync Frequency:</span>
              <span className="font-mono text-[#0F172A]">{supplier.sync_frequency_hours || 24} Hours</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F1F3F7]">
              <span className="text-[#64748B]">Mapped Master SKUs:</span>
              <span className="font-mono font-bold text-green-600">{mappedCount || 0}</span>
            </div>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E4E8] rounded-lg text-xs space-y-1 font-mono">
            <span className="text-[#64748B] block font-semibold">Environment Secret Pointer:</span>
            <code className="text-[#0F172A] font-bold block">
              {registryInfo?.credentialEnvPattern || `SUPPLIER_${(supplier.credential_ref || supplier.slug).toUpperCase()}_API_KEY`}
            </code>
          </div>

          <SupplierCardActions supplier={supplier} />
        </div>

        {/* Right 2 Columns: Ingestion Batches History */}
        <div className="lg:col-span-2 bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Recent Sync Batches
            </h2>
            <span className="text-xs text-[#64748B] font-mono">
              {(batches || []).length} Recorded Runs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Date / Time</th>
                  <th className="py-3 px-4">Trigger</th>
                  <th className="py-3 px-4">Discovered</th>
                  <th className="py-3 px-4">New</th>
                  <th className="py-3 px-4">Duplicates</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F7]">
                {(batches || []).length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#94A3B8]">
                      No sync batches run for this supplier yet. Click 'Sync' to trigger the first ingestion run.
                    </td>
                  </tr>
                ) : (
                  (batches || []).map((b) => (
                    <tr key={b.id} className="hover:bg-[#F8FAFC]">
                      <td className="py-3 px-4 font-mono text-[#0F172A]">
                        {new Date(b.started_at).toLocaleString('en-GB')}
                      </td>
                      <td className="py-3 px-4 font-mono uppercase text-[10px] text-[#64748B]">
                        {b.trigger_method}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#0F172A]">
                        {b.products_discovered}
                      </td>
                      <td className="py-3 px-4 font-mono text-green-700 font-bold">
                        +{b.products_new}
                      </td>
                      <td className="py-3 px-4 font-mono text-amber-700">
                        {b.products_duplicate}
                      </td>
                      <td className="py-3 px-4 text-right capitalize font-bold text-green-700">
                        {b.status.replace(/_/g, ' ')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
