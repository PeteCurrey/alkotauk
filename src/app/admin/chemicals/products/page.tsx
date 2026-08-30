import React from 'react';
import Link from 'next/link';
import { Package, ArrowLeft, Plus, ExternalLink, ShieldCheck, Tag } from 'lucide-react';
import { getRetailProducts, getMasterFormulations } from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export default async function AdminRetailChemicalsListPage() {
  const products = await getRetailProducts();
  const formulations = await getMasterFormulations();

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
      {/* ── BREADCRUMB ── */}
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
              Customer-Facing Storefront Identities
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Retail Chemical Products ({products.length})
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Every retail chemical product displays its mandatory <span className="font-bold text-[#FF6900]">Originating Master Formulation Code</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/chemicals/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6900] hover:bg-[#E55D00] text-white shadow-sm transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Create Retail Product</span>
          </Link>
        </div>
      </div>

      {/* ── RETAIL PRODUCTS TABLE ── */}
      <div className="bg-white rounded-2xl border border-[#E2E4E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FB] border-b border-[#F0F2F5] text-[#64748B] font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Retail Product</th>
                <th className="py-3.5 px-5 bg-orange-50/60 text-[#FF6900]">Originating Master Code</th>
                <th className="py-3.5 px-5">Primary Application</th>
                <th className="py-3.5 px-5">Pack Variants</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5] font-medium text-[#334155]">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#F8F9FB] transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-sm text-[#0F172A]">{prod.retail_name}</div>
                    <div className="font-mono text-[10px] text-[#94A3B8]">/{prod.slug}</div>
                  </td>
                  <td className="py-4 px-5 bg-orange-50/30">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm text-[#FF6900] bg-white px-2 py-0.5 rounded border border-orange-200 shadow-2xs">
                        {prod.originating_master_code}
                      </span>
                      <span className="text-xs font-semibold text-[#0F172A]">
                        {prod.originating_master_name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[#475569]">
                    {prod.primary_application}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex flex-wrap gap-1">
                      {prod.skus?.map(s => (
                        <span key={s.id} className="px-1.5 py-0.5 rounded bg-[#F1F5F9] font-mono text-[10px] text-[#334155]">
                          {s.pack_size} (£{s.price.toFixed(2)})
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {prod.merchandising_status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right space-x-2">
                    <Link
                      href={`/chemicals/product/${prod.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-[#F8F9FB] hover:bg-[#F1F3F7] text-[#64748B] inline-block"
                      title="View Storefront Page"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/admin/chemicals/products/${prod.id}`}
                      className="font-bold text-xs text-[#FF6900] hover:underline"
                    >
                      Edit →
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
