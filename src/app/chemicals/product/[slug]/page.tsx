import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { FileText, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import ProductStickyNav from '@/components/chemicals/ProductStickyNav';
import ProductCinematicHero from '@/components/chemicals/ProductCinematicHero';
import ProductStoryEditorial from '@/components/chemicals/ProductStoryEditorial';
import ProductProblemVisualiser from '@/components/chemicals/ProductProblemVisualiser';
import ProductInstructionSteps from '@/components/chemicals/ProductInstructionSteps';
import ProductSystemCrossSell from '@/components/chemicals/ProductSystemCrossSell';
import { getRetailProductBySlug, getRetailProducts } from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getRetailProductBySlug(slug);
  if (!product) return { title: 'Chemical Formulation | Alkota UK' };

  const descriptor = product.brand_identity?.descriptor || product.descriptor || 'Professional Chemical';
  return {
    title: `${product.retail_name} | ${descriptor} (${product.originating_master_code}) | Alkota UK`,
    description: product.brand_identity?.product_promise || product.short_description,
    openGraph: {
      title: `${product.retail_name} — ${descriptor}`,
      description: product.short_description,
      images: product.hero_image ? [{ url: product.hero_image }] : [],
    },
  };
}

export default async function ChemicalProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getRetailProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getRetailProducts();
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.retail_family === product.retail_family || p.primary_application === product.primary_application))
    .slice(0, 4);

  const minPrice = (product.skus && product.skus.length > 0) ? Math.min(...product.skus.map(s => s.price)) : 35;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.retail_name,
    description: product.short_description,
    brand: {
      '@type': 'Brand',
      name: 'Alkota'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Alkota UK'
    },
    category: 'Industrial Cleaning Chemicals',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: minPrice,
      offerCount: product.skus?.length || 4,
      availability: 'https://schema.org/InStock',
      url: `https://alkota.co.uk/chemicals/product/${product.slug}`
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* ── CHAPTER 01: DESIRE & INSTANT SELECTION (APPLE HERO) ── */}
      <ProductStickyNav product={product} />
      <ProductCinematicHero product={product} />

      {/* ── CHAPTER 02: UNDERSTANDING & THE MOLECULAR ACTION ── */}
      <ProductStoryEditorial product={product} />
      <ProductProblemVisualiser product={product} />

      {/* ── CHAPTER 03: APPLICATION, DILUTION & SURFACE MATRICES ── */}
      <ProductInstructionSteps product={product} />

      {/* ── CHAPTER 04: TECHNICAL DOSSIER & COMPLEMENTARY CHEMISTRY ── */}
      <section id="technical" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-white text-alkota-black border-b border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E8E8E4] pb-8">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                Technical Specification
              </span>
              <h2 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
                Substrate &amp; Safety Dossier.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#666] font-normal leading-relaxed">
              Verified surface interactions under standard operating dilution, formulation profile, and downloadable GB-CLP documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Substrate Matrix (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-light text-[#0A0A0A] uppercase tracking-tight">
                Substrate Compatibility Matrix
              </h3>

              <div className="border border-[#E8E8E4] divide-y divide-[#E8E8E4]">
                {(Array.isArray(product.surface_compatibility) ? product.surface_compatibility : []).map((sc, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FAF9F5]">
                    <div>
                      <span className="text-sm font-medium text-alkota-black block">
                        {sc.surface}
                      </span>
                      {sc.notes && (
                        <span className="text-xs text-[#777] font-normal mt-0.5 block">
                          {sc.notes}
                        </span>
                      )}
                    </div>
                    <span className={`px-2.5 py-0.5 font-ibm-plex-mono text-[10px] uppercase tracking-wider font-semibold self-start sm:self-auto ${
                      sc.suitability === 'recommended'
                        ? 'bg-emerald-100 text-emerald-800'
                        : sc.suitability === 'safe'
                        ? 'bg-blue-100 text-blue-800'
                        : sc.suitability === 'test_first'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {sc.suitability.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Specs & SDS Download (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 bg-[#FAF9F5] border border-[#E8E8E4] space-y-4">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] block font-medium">
                  Formulation Reference
                </span>
                <div className="divide-y divide-[#E8E8E4] text-xs font-ibm-plex-mono">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#777]">Master Code:</span>
                    <span className="font-bold text-alkota-black">{product.originating_master_code}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#777]">Original Name:</span>
                    <span className="font-medium text-alkota-black">{product.originating_master_name}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#777]">Family:</span>
                    <span className="text-alkota-black">{product.retail_family}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#777]">Compliance:</span>
                    <span className="text-emerald-800 font-medium">100% GB-CLP Verified</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#777]">Induction:</span>
                    <span className="text-alkota-black">High/Low Pressure Injector</span>
                  </div>
                </div>
              </div>

              {/* Safety Data Sheet Card */}
              <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-6 space-y-3">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] block font-medium">
                  Safety Documentation
                </span>
                <h4 className="text-lg font-light text-[#0A0A0A]">
                  Safety Data Sheet (SDS)
                </h4>
                <p className="text-xs text-[#666] leading-relaxed font-normal">
                  Official UK CLP safety dossier for {product.originating_master_code} covering composition, PPE, first aid, and storage.
                </p>
                <div className="pt-2">
                  <a
                    href={`/api/chemicals/sds?code=${product.originating_master_code}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-5 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-colors font-medium"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download SDS PDF</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── CHAPTER 05: COMPLEMENTARY CLEANING REGIMEN ── */}
      <ProductSystemCrossSell product={product} relatedProducts={relatedProducts} />

      {/* ── QUIET FOOTER ── */}
      <section className="bg-[#FAF9F5] text-alkota-black py-10 px-6 sm:px-12 lg:px-24 border-t border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-[#777]">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-alkota-orange shrink-0" />
            <span>Master Formula {product.originating_master_code} ({product.originating_master_name})</span>
          </div>
          <span>Sourced, Stocked &amp; Despatched from Alkota UK</span>
        </div>
      </section>

    </main>
  );
}
