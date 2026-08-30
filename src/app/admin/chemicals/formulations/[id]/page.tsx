import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Package, 
  Layers, 
  ExternalLink, 
  Plus, 
  FileText,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { getMasterFormulationById, getRetailProducts } from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminMasterFormulationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const formulation = await getMasterFormulationById(id);

  if (!formulation) {
    notFound();
  }

  // Get all retail products that link to this formulation
  const allRetail = await getRetailProducts();
  const linkedRetail = allRetail.filter(
    r => r.master_formulation_id === formulation.id || r.originating_master_code === formulation.master_code
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-12">
      {/* ── BREADCRUMB ── */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
        <Link href="/admin/chemicals/formulations" className="hover:text-[#0F172A] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Master Formulations
        </Link>
      </div>

      {/* ── MASTER FORMULATION PROMINENT HERO ── */}
      <div className="bg-[#111111] text-white p-8 rounded-2xl border border-[#262626] shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-white font-mono text-xs uppercase tracking-widest mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6900]" />
              Master Formulation Specification
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span className="text-[#FF6900] font-mono">{formulation.master_code}</span>
              <span className="text-[#555] font-light">—</span>
              <span>{formulation.original_name}</span>
            </h1>
            <p className="text-sm text-[#AAA] mt-2 max-w-2xl leading-relaxed">
              {formulation.technical_description}
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              <ShieldCheck className="h-4 w-4" />
              {formulation.compliance_status.replace(/_/g, ' ')}
            </span>
            <span className="font-mono text-xs text-[#888]">
              Manufacturer: {formulation.manufacturer}
            </span>
          </div>
        </div>
      </div>

      {/* ── TECHNICAL PROFILE & DILUTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E4E8] shadow-sm space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">pH Level &amp; Alkalinity</span>
          <p className="text-lg font-mono font-bold text-[#0F172A]">{formulation.ph_level || 'Not Specified'}</p>
          <p className="text-xs text-[#64748B]">Determines substrate suitability &amp; caustic rating</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E4E8] shadow-sm space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Dilution Guidelines</span>
          <p className="text-xs font-mono font-semibold text-[#0F172A] leading-relaxed">{formulation.dilution_guidelines || 'Standard 1:50'}</p>
          <p className="text-[10px] text-[#64748B]">Pressure washer chemical induction ratios</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E4E8] shadow-sm space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Safety &amp; SDS Document</span>
          <p className="text-sm font-bold text-[#0F172A]">{formulation.sds_reference || 'SDS-PENDING'}</p>
          <p className="text-xs text-emerald-600 font-medium">GB CLP &amp; COSHH Reviewed</p>
        </div>
      </div>

      {/* ── LINKED RETAIL IDENTITIES SECTION ── */}
      <div className="bg-white rounded-2xl border border-[#E2E4E8] shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F2F5] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <Package className="h-5 w-5 text-[#FF6900]" />
              <span>Customer-Facing Retail Products Derived from {formulation.master_code}</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              These are the storefront ecommerce products that utilize this exact chemical formulation.
            </p>
          </div>

          <Link
            href={`/admin/chemicals/products/new?master_id=${formulation.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FF6900] hover:bg-[#E55D00] text-white shadow-sm transition-all shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Retail Identity for {formulation.master_code}</span>
          </Link>
        </div>

        {linkedRetail.length > 0 ? (
          <div className="divide-y divide-[#F0F2F5]">
            {linkedRetail.map((prod) => (
              <div key={prod.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#0F172A]">{prod.retail_name}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {prod.merchandising_status}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] max-w-xl">{prod.short_description}</p>
                  <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-[#94A3B8]">
                    <span>Slug: /{prod.slug}</span>
                    <span>·</span>
                    <span>Application: {prod.primary_application}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-[#64748B] block">Available SKUs</span>
                    <span className="font-mono text-xs text-[#0F172A] font-bold">
                      {prod.skus?.length || 0} Pack Sizes
                    </span>
                  </div>

                  <Link
                    href={`/chemicals/product/${prod.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg bg-[#F8F9FB] hover:bg-[#F1F3F7] text-[#64748B]"
                    title="View Store Page"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>

                  <Link
                    href={`/admin/chemicals/products/${prod.id}`}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#111111] hover:bg-[#333] text-white transition-colors"
                  >
                    Edit Product →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <Package className="h-8 w-8 text-[#CBD5E1] mx-auto" />
            <p className="text-sm font-semibold text-[#0F172A]">No retail products linked yet</p>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto">
              Create a customer-facing product name (e.g. RoadForce, GreaseCut) linking directly to {formulation.master_code}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
