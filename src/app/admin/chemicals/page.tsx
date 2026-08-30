import React from 'react';
import Link from 'next/link';
import { 
  FlaskConical, 
  Tag, 
  Package, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Plus, 
  ExternalLink,
  Layers,
  Sparkles,
  Search
} from 'lucide-react';
import { 
  getMasterFormulations, 
  getRetailProducts, 
  getAdminChemicalMetrics,
  getChemicalApplications
} from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export default async function AdminChemicalsDashboard() {
  const metrics = await getAdminChemicalMetrics();
  const formulations = await getMasterFormulations();
  const retailProducts = await getRetailProducts({ limit: 8 });
  const applications = await getChemicalApplications();

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-12">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E2E4E8] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-[#FF6900]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748B] font-bold">
              Alkota UK Chemical Commerce Engine
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Chemical Control Centre
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Strict Architecture: Master Formulation → Retail Identity → Application Context → Sellable SKUs
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/chemicals"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#F8F9FB] hover:bg-[#F1F3F7] text-[#334155] border border-[#E2E4E8] transition-colors"
          >
            <span>Live Chemical Store</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#94A3B8]" />
          </Link>
          <Link
            href="/admin/chemicals/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6900] hover:bg-[#E55D00] text-white shadow-sm transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>New Retail Chemical</span>
          </Link>
        </div>
      </div>

      {/* ── REAL DATABASE METRICS (No AI Slop / Fabrications) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E4E8] shadow-sm">
          <div className="flex items-center justify-between text-[#64748B] mb-2">
            <span className="text-xs font-semibold">Master Formulations</span>
            <Tag className="h-4 w-4 text-[#FF6900]" />
          </div>
          <p className="text-3xl font-extrabold text-[#0F172A]">{metrics.masterFormulationsCount}</p>
          <p className="text-[11px] text-[#94A3B8] mt-1 font-medium">Underlying Alkota chemical codes</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E4E8] shadow-sm">
          <div className="flex items-center justify-between text-[#64748B] mb-2">
            <span className="text-xs font-semibold">Retail Identities</span>
            <Package className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-[#0F172A]">{metrics.retailProductsCount}</p>
          <p className="text-[11px] text-[#94A3B8] mt-1 font-medium">{metrics.liveProductsCount} Live in Storefront</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E4E8] shadow-sm">
          <div className="flex items-center justify-between text-[#64748B] mb-2">
            <span className="text-xs font-semibold">Sellable SKUs</span>
            <Layers className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-[#0F172A]">{metrics.skusCount}</p>
          <p className="text-[11px] text-[#94A3B8] mt-1 font-medium">5L, 20L, 200L &amp; IBC variants</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E4E8] shadow-sm">
          <div className="flex items-center justify-between text-[#64748B] mb-2">
            <span className="text-xs font-semibold">UK CLP Status</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">{metrics.verifiedClpCount}</p>
          <p className="text-[11px] text-[#94A3B8] mt-1 font-medium">{metrics.needsReviewCount} Pending Tech Review</p>
        </div>
      </div>

      {/* ── MASTER CHEMICAL CODES DIRECTORY STRIP ── */}
      <div className="bg-white rounded-2xl border border-[#E2E4E8] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#F0F2F5] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">Master Formulation Ledger</h2>
            <p className="text-xs text-[#64748B]">All retail products originate from these authoritative Alkota formulations</p>
          </div>
          <Link
            href="/admin/chemicals/formulations"
            className="text-xs font-bold text-[#FF6900] hover:underline inline-flex items-center gap-1"
          >
            <span>View All ({formulations.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FB] border-b border-[#F0F2F5] text-[#64748B] font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-5">Master Code</th>
                <th className="py-3 px-5">Original Formulation Name</th>
                <th className="py-3 px-5">Family</th>
                <th className="py-3 px-5">pH Level</th>
                <th className="py-3 px-5">Retail Products</th>
                <th className="py-3 px-5">Compliance</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5] font-medium text-[#334155]">
              {formulations.slice(0, 7).map((form) => (
                <tr key={form.id} className="hover:bg-[#F8F9FB] transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-[#FF6900]">
                    {form.master_code}
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-[#0F172A]">
                    {form.original_name}
                  </td>
                  <td className="py-3.5 px-5 text-[#64748B]">
                    {form.formulation_family}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-[11px]">
                    {form.ph_level?.split(' ')[0] || '—'}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] font-bold text-[#475569] text-[10px]">
                      {form.retail_products_count} {form.retail_products_count === 1 ? 'Product' : 'Products'}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      form.compliance_status === 'VERIFIED_UK_CLP'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <ShieldCheck className="h-3 w-3" />
                      {form.compliance_status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Link
                      href={`/admin/chemicals/formulations/${form.id}`}
                      className="font-bold text-[#FF6900] hover:underline"
                    >
                      Inspect →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── RETAIL PRODUCT INVENTORY WITH ORIGINATING CODE MANDATORY ── */}
      <div className="bg-white rounded-2xl border border-[#E2E4E8] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#F0F2F5] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">Retail Chemical Products</h2>
            <p className="text-xs text-[#64748B]">
              Every retail SKU displays its mandatory <span className="font-bold text-[#FF6900]">Originating Master Chemical Code</span>
            </p>
          </div>
          <Link
            href="/admin/chemicals/products"
            className="text-xs font-bold text-[#FF6900] hover:underline inline-flex items-center gap-1"
          >
            <span>All Retail Products ({retailProducts.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FB] border-b border-[#F0F2F5] text-[#64748B] font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-5">Retail Product Name</th>
                <th className="py-3 px-5 bg-orange-50/50 text-[#FF6900]">Originating Master Code</th>
                <th className="py-3 px-5">Primary Application</th>
                <th className="py-3 px-5">Pack Options</th>
                <th className="py-3 px-5">Price (Base 5L / 20L)</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5] font-medium text-[#334155]">
              {retailProducts.map((prod) => {
                const base5L = prod.skus?.find(s => s.volume_litres === 5)?.price;
                const base20L = prod.skus?.find(s => s.volume_litres === 20)?.price;

                return (
                  <tr key={prod.id} className="hover:bg-[#F8F9FB] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-[#0F172A]">{prod.retail_name}</div>
                      <div className="text-[10px] text-[#94A3B8]">{prod.retail_family} Series</div>
                    </td>
                    <td className="py-3.5 px-5 bg-orange-50/30">
                      <div className="font-mono font-extrabold text-[#FF6900] flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF6900]" />
                        {prod.originating_master_code}
                      </div>
                      <div className="text-[10px] text-[#64748B] font-normal">{prod.originating_master_name}</div>
                    </td>
                    <td className="py-3.5 px-5 text-[#475569]">
                      {prod.primary_application}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex flex-wrap gap-1">
                        {prod.skus?.map(s => (
                          <span key={s.id} className="px-1.5 py-0.5 rounded bg-[#F1F5F9] font-mono text-[9px] text-[#475569]">
                            {s.pack_size.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-[11px] text-[#0F172A]">
                      {base5L ? `£${base5L.toFixed(2)} (5L)` : ''} {base20L ? `· £${base20L.toFixed(2)} (20L)` : ''}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {prod.merchandising_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right space-x-2">
                      <Link
                        href={`/chemicals/product/${prod.slug}`}
                        target="_blank"
                        className="text-[#64748B] hover:text-[#0F172A]"
                        title="View Public Page"
                      >
                        <ExternalLink className="h-3.5 w-3.5 inline" />
                      </Link>
                      <Link
                        href={`/admin/chemicals/products/${prod.id}`}
                        className="font-bold text-[#FF6900] hover:underline"
                      >
                        Edit →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
