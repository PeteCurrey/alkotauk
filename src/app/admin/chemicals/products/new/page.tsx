import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, ShieldCheck, Tag, Info } from 'lucide-react';
import { getMasterFormulations } from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ master_id?: string }>;
}

export default async function AdminNewRetailProductPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const formulations = await getMasterFormulations();
  const selectedMaster = formulations.find(f => f.id === sp.master_id) || formulations[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans pb-16">
      <div className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
        <Link href="/admin/chemicals/products" className="hover:text-[#0F172A] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Retail Products
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-[#E2E4E8] shadow-sm space-y-6">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Create New Retail Chemical Product</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Every retail chemical product must originate from an authoritative Alkota Master Formulation.
          </p>
        </div>

        {/* ── STEP 1: SELECT MANDATORY MASTER FORMULATION ── */}
        <div className="p-5 rounded-xl bg-orange-50/60 border border-orange-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold text-[#FF6900] tracking-wider">
              Step 1: Select Originating Master Formulation (Mandatory)
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Originating Formulation</label>
            <select
              defaultValue={selectedMaster?.id}
              className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
            >
              {formulations.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.master_code} — {f.original_name} ({f.formulation_family})
                </option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-[#64748B]">
            This ensures complete formulation traceability, SDS compliance, and chemistry integrity.
          </p>
        </div>

        {/* ── STEP 2: RETAIL IDENTITY ── */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-[#0F172A]">Step 2: Customer-Facing Merchandising Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Retail Product Name</label>
              <input
                type="text"
                placeholder="e.g. RoadForce Fleet"
                className="w-full bg-[#F8F9FB] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Retail Family</label>
              <input
                type="text"
                placeholder="e.g. RoadForce"
                className="w-full bg-[#F8F9FB] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Primary Application</label>
            <input
              type="text"
              placeholder="e.g. Commercial HGV & Logistics Fleets"
              className="w-full bg-[#F8F9FB] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Short Storefront Description</label>
            <textarea
              rows={2}
              placeholder="Concise customer description..."
              className="w-full bg-[#F8F9FB] border border-[#CBD5E1] rounded-xl p-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#F0F2F5] flex justify-end gap-3">
          <Link
            href="/admin/chemicals/products"
            className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#FF6900] hover:bg-[#E55D00] text-white shadow-md transition-all"
          >
            Publish Retail Product
          </button>
        </div>
      </div>
    </div>
  );
}
