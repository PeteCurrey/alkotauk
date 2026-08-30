import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import { Truck, Plus, ArrowLeft, ExternalLink, RefreshCw, CheckCircle2, Shield } from 'lucide-react';
import { COMPREHENSIVE_SUPPLIERS } from '@/lib/parts/seed-comprehensive';

export const revalidate = 0;

export default async function AdminSuppliersPage() {
  const { data: dbSuppliers } = await supabaseAdmin
    .from('suppliers')
    .select('*')
    .order('sort_order');

  const suppliers = (dbSuppliers && dbSuppliers.length > 0) ? dbSuppliers : COMPREHENSIVE_SUPPLIERS;

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
              <span className="text-[#FF6900]">Suppliers & Feeds</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Wholesale Suppliers & Manufacturer Feeds
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Configure supplier feeds, automated pricing margin rules, lead times, and API/CSV sync endpoints.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/parts/import"
              className="flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-[#222] text-white text-xs font-bold rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#FF6900]" />
              Run Import Staging
            </Link>
          </div>
        </div>
      </div>

      {/* ── SUPPLIERS TABLE ── */}
      <div className="bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E4E8] text-[#475569] font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Supplier Name</th>
              <th className="py-3.5 px-4">Code</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Default Margin</th>
              <th className="py-3.5 px-4">Feed Type</th>
              <th className="py-3.5 px-4">Contact / Email</th>
              <th className="py-3.5 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F7]">
            {suppliers.map((s: any) => (
              <tr key={s.slug} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                  {s.name}
                  {s.website_url && (
                    <a
                      href={s.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-[#94A3B8] hover:text-[#0F172A] inline-block"
                    >
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  )}
                </td>
                <td className="py-3.5 px-4 font-mono font-semibold text-[#64748B]">
                  {s.code || '—'}
                </td>
                <td className="py-3.5 px-4 capitalize text-[#475569]">
                  {s.supplier_type || 'wholesaler'}
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">
                  {s.default_margin_pct || 35}% Margin
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 bg-[#F1F3F7] rounded text-[11px] font-mono text-[#475569] uppercase">
                    {s.feed_type || 'Manual'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#64748B]">
                  {s.email || 'Trade Desk'}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
