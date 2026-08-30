import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Tag, 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  Save, 
  Sparkles,
  Info,
  Palette,
  Package,
  Award
} from 'lucide-react';
import { getRetailProducts, getMasterFormulations } from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminRetailProductEditorPage({ params }: PageProps) {
  const { id } = await params;
  const allProducts = await getRetailProducts();
  const product = allProducts.find(p => p.id === id || p.slug === id);

  if (!product) {
    notFound();
  }

  const brand = product.brand_identity;

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-24">
      {/* ── BREADCRUMB ── */}
      <div className="flex items-center justify-between">
        <Link href="/admin/chemicals/products" className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Retail Products
        </Link>
        <Link
          href={`/chemicals/product/${product.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6900] hover:underline"
        >
          <span>View Public Digital Product Page</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* ── MANDATORY PROMINENT MASTER FORMULATION BANNER (CANNOT BE MISSED) ── */}
      <div className="bg-[#111111] text-white p-6 rounded-2xl border-2 border-[#FF6900] shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF6900] font-bold bg-[#FF6900]/10 px-2.5 py-1 rounded-md border border-[#FF6900]/30">
            Mandatory Originating Master Formulation Link
          </span>
          <span className="text-xs font-mono text-[#AAA]">
            Formulation ID: {product.master_formulation_id}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-t border-white/10 pt-3">
          <div>
            <div className="text-xs text-[#888] uppercase font-bold tracking-wider">Originating Master Code &amp; Name</div>
            <div className="text-3xl font-extrabold font-mono text-white flex items-center gap-3 mt-0.5">
              <span className="text-[#FF6900]">{product.originating_master_code}</span>
              <span className="text-[#555] font-light">—</span>
              <span className="font-sans font-bold">{product.originating_master_name}</span>
            </div>
          </div>

          <Link
            href={`/admin/chemicals/formulations/${product.master_formulation_id}`}
            className="text-xs font-bold text-[#FF6900] hover:text-white underline inline-flex items-center gap-1"
          >
            <span>Inspect Master Formula Specs</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ── CHEMICAL BRAND STUDIO: DIGITAL-FIRST CREATIVE MASTER ── */}
      <div className="bg-[#0A0A0A] text-white p-8 rounded-2xl border border-[#333] shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#FF6900]" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                Chemical Brand Studio
              </h2>
            </div>
            <p className="text-xs text-[#888]">
              Define consumer-facing identity, bottle art direction, label hierarchy, and editorial storytelling.
            </p>
          </div>

          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded">
            Status: {brand?.ai_content_status || 'human_verified'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-[#AAA] uppercase tracking-wider mb-1.5">
              Product Descriptor (Brand Layer)
            </label>
            <input
              type="text"
              defaultValue={brand?.descriptor || product.descriptor || 'Professional Vehicle Cleaner'}
              placeholder="e.g. Professional Vehicle Cleaner"
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#AAA] uppercase tracking-wider mb-1.5">
              Brand Accent Color (Hex)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                defaultValue={brand?.brand_colour_accent || '#FF6900'}
                className="w-full bg-[#181818] border border-[#333] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#FF6900]"
              />
              <div 
                className="w-9 h-9 rounded-xl border border-white/20 shrink-0" 
                style={{ backgroundColor: brand?.brand_colour_accent || '#FF6900' }}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-[#AAA] uppercase tracking-wider mb-1.5">
            Customer Promise (Hero Headline Hook)
          </label>
          <input
            type="text"
            defaultValue={brand?.product_promise || 'Built for the dirt ordinary detergents leave behind.'}
            className="w-full bg-[#181818] border border-[#333] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6900]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-[#AAA] uppercase tracking-wider mb-1.5">
              Editorial Story Headline
            </label>
            <input
              type="text"
              defaultValue={brand?.product_story_headline || "THIS ISN'T JUST SOAP."}
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#AAA] uppercase tracking-wider mb-1.5">
              Target Soil Labels (Comma Separated)
            </label>
            <input
              type="text"
              defaultValue={brand?.problem_labels?.join(', ') || 'ROAD FILM, DIESEL RESIDUE, OIL & GREASE, WINTER SALT'}
              className="w-full bg-[#181818] border border-[#333] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#FF6900]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-[#AAA] uppercase tracking-wider mb-1.5">
            Editorial Story Narrative Body
          </label>
          <textarea
            rows={3}
            defaultValue={brand?.product_story_body || product.long_description}
            className="w-full bg-[#181818] border border-[#333] rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#FF6900]"
          />
        </div>

        <div className="p-4 bg-[#141414] border border-[#282828] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-[#AAA]">
            <Sparkles className="w-4 h-4 text-[#FF6900]" />
            <span>AI Brand Studio Assistant: Generate fresh positioning, copy alternatives, and tags without touching technical chemistry.</span>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-white/10 hover:bg-[#FF6900] hover:text-white text-xs font-mono uppercase tracking-wider text-white transition-all shrink-0 rounded-lg"
          >
            Generate AI Brand Copy
          </button>
        </div>
      </div>

      {/* ── TECHNICAL & OPERATIONAL ATTRIBUTES ── */}
      <div className="bg-white p-8 rounded-2xl border border-[#E2E4E8] shadow-sm space-y-6">
        <div className="border-b border-[#F0F2F5] pb-4">
          <h2 className="text-lg font-bold text-[#0F172A]">Technical Merchandising &amp; Dilution Guidance</h2>
          <p className="text-xs text-[#64748B]">Verified dilution and substrate compatibility parameters.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Retail Product Name</label>
            <input
              type="text"
              defaultValue={product.retail_name}
              className="w-full bg-[#F8F9FB] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] font-semibold focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">URL Slug</label>
            <input
              type="text"
              defaultValue={product.slug}
              className="w-full bg-[#F8F9FB] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#F0F2F5]">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Usage &amp; Dilution Ratios</label>
            <textarea
              rows={3}
              defaultValue={product.dilution_information}
              className="w-full bg-[#F8F9FB] border border-[#CBD5E1] rounded-xl p-3 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Safety &amp; Caution Notes</label>
            <textarea
              rows={3}
              defaultValue={product.warnings?.join('\n')}
              className="w-full bg-[#F8F9FB] border border-[#CBD5E1] rounded-xl p-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
            />
          </div>
        </div>

        {/* ── SKUS & PACK VARIANTS ── */}
        <div className="pt-6 border-t border-[#F0F2F5] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Sellable SKUs &amp; Pack Sizes</h3>
              <p className="text-xs text-[#64748B]">All SKUs remain tied to master formulation {product.originating_master_code}</p>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F8F9FB] hover:bg-[#E2E4E8] text-[#0F172A] border border-[#CBD5E1]"
            >
              + Add Pack Variant
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E2E4E8] rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FB] border-b border-[#E2E4E8] text-[#64748B] font-bold text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-4">SKU Code</th>
                  <th className="py-2.5 px-4">Pack Size</th>
                  <th className="py-2.5 px-4">Volume (L)</th>
                  <th className="py-2.5 px-4">Selling Price (£ Ex VAT)</th>
                  <th className="py-2.5 px-4">Cost Price (£)</th>
                  <th className="py-2.5 px-4">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E4E8] font-mono text-[#0F172A]">
                {product.skus?.map((sku) => (
                  <tr key={sku.id}>
                    <td className="py-2.5 px-4 font-bold text-[#FF6900]">{sku.sku_code}</td>
                    <td className="py-2.5 px-4 font-sans font-semibold">{sku.pack_size}</td>
                    <td className="py-2.5 px-4">{sku.volume_litres} L</td>
                    <td className="py-2.5 px-4 font-bold">£{sku.price.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-[#64748B]">£{sku.cost_price?.toFixed(2) || '—'}</td>
                    <td className="py-2.5 px-4 font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {sku.stock_quantity} in stock
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-[#F0F2F5] flex items-center justify-end gap-3">
          <Link
            href="/admin/chemicals/products"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#FF6900] hover:bg-[#E55D00] text-white shadow-md transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Save Product Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
