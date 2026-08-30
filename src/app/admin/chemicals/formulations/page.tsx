import React from 'react';
import Link from 'next/link';
import { Tag, ArrowLeft, Plus, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { getMasterFormulations } from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export default async function AdminMasterFormulationsPage() {
  const formulations = await getMasterFormulations();

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
      {/* ── BREADCRUMB & HEADER ── */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
        <Link href="/admin/chemicals" className="hover:text-[#0F172A] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Chemical Centre
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E2E4E8] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-[#FF6900]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-bold">
              Authoritative Alkota Formulations
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Master Chemical Formulations ({formulations.length})
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            The canonical source formulations. Every customer-facing retail product must link to one of these records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/chemicals/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6900] hover:bg-[#E55D00] text-white shadow-sm transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Create Retail Identity</span>
          </Link>
        </div>
      </div>

      {/* ── FORMULATIONS TABLE ── */}
      <div className="bg-white rounded-2xl border border-[#E2E4E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FB] border-b border-[#F0F2F5] text-[#64748B] font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-5">Master Code</th>
                <th className="py-3 px-5">Original Formulation Name</th>
                <th className="py-3 px-5">Chemical Family</th>
                <th className="py-3 px-5">pH Profile</th>
                <th className="py-3 px-5">Retail Products</th>
                <th className="py-3 px-5">Sellable SKUs</th>
                <th className="py-3 px-5">Compliance</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5] font-medium text-[#334155]">
              {formulations.map((form) => (
                <tr key={form.id} className="hover:bg-[#F8F9FB] transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-mono font-extrabold text-sm text-[#FF6900] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                      {form.master_code}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-bold text-sm text-[#0F172A]">{form.original_name}</div>
                    <div className="text-[10px] text-[#94A3B8]">{form.manufacturer}</div>
                  </td>
                  <td className="py-4 px-5 text-[#475569]">
                    {form.formulation_family}
                  </td>
                  <td className="py-4 px-5 font-mono text-[11px] text-[#475569]">
                    {form.ph_level || '—'}
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 rounded-md bg-[#F1F5F9] font-bold text-[#334155] text-xs">
                      {form.retail_products_count}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 rounded-md bg-[#F1F5F9] font-mono text-[#334155] text-xs">
                      {form.skus_count} SKUs
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="h-3 w-3" />
                      {form.compliance_status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right space-x-2">
                    <Link
                      href={`/admin/chemicals/formulations/${form.id}`}
                      className="font-bold text-xs text-[#FF6900] hover:underline"
                    >
                      View Formulation →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
