import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  FlaskConical, 
  FileText, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Truck,
  Car,
  Tractor,
  HardHat,
  Award
} from 'lucide-react';
import ProductStickyNav from '@/components/chemicals/ProductStickyNav';
import ProductCinematicHero from '@/components/chemicals/ProductCinematicHero';
import ProductStoryEditorial from '@/components/chemicals/ProductStoryEditorial';
import ProductProblemVisualiser from '@/components/chemicals/ProductProblemVisualiser';
import ProductInstructionSteps from '@/components/chemicals/ProductInstructionSteps';
import ProductPackSelector from '@/components/chemicals/ProductPackSelector';
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

  const brand = product.brand_identity;
  const appLabels = brand?.application_labels || [
    'COMMERCIAL HGV & TRUCKS',
    'FLEET HAULAGE VANS',
    'AGRICULTURAL MACHINERY',
    'WORKSHOP WASH BAYS',
    'HIGHWAY PLANT'
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange/30">
      
      {/* ── 01 STICKY PRODUCT NAV ── */}
      <ProductStickyNav product={product} />

      {/* ── 02 CINEMATIC FULL-VIEWPORT HERO ── */}
      <ProductCinematicHero product={product} />

      {/* ── 03 PRODUCT STORY: "THIS ISN'T JUST SOAP." ── */}
      <ProductStoryEditorial product={product} />

      {/* ── 04 THE PROBLEM: TARGET CONTAMINATION SPECTRUM ── */}
      <ProductProblemVisualiser product={product} />

      {/* ── 05 HOW TO USE: 3-STEP PROTOCOL ── */}
      <ProductInstructionSteps product={product} />

      {/* ── 06 BUILT FOR WORK: INDUSTRY APPLICATION SPECTRUM ── */}
      <section id="applications" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-b border-[#222]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#222] pb-8">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
                // Operational Environments
              </span>
              <h2 className="text-4xl sm:text-5xl font-extralight text-white tracking-tight uppercase">
                Built for Work.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#888] font-light leading-relaxed">
              Tested and deployed in the UK’s most demanding transport yards, farming operations, and industrial facilities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#222]">
            {appLabels.map((label, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#0E0E0E] hover:bg-[#161616] transition-colors flex flex-col justify-between min-h-[180px] group"
              >
                <span className="font-ibm-plex-mono text-[9px] text-[#555]">
                  APPLICATION 0{idx + 1}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-light text-white tracking-tight group-hover:text-alkota-orange transition-colors">
                    {label}
                  </h3>
                </div>
                <div className="text-[10px] font-ibm-plex-mono text-[#666] uppercase">
                  Verified Field Safe
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-[#888]">
            <span>Need advice for a bespoke fleet or industrial wash plant configuration?</span>
            <Link
              href="/chemicals/applications"
              className="text-alkota-orange hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1.5"
            >
              <span>Explore All Application Sectors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── 07 WHY ALKOTA: AUTHORITY & ENGINEERING PRINCIPLES ── */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-[#FAF9F5] text-alkota-black border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="border-b border-[#E0DEDC] pb-8">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
              // Engineering Authority
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-alkota-black tracking-tight uppercase">
              Why Alkota Chemistry.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="font-ibm-plex-mono text-3xl font-extralight text-alkota-orange">
                50+
              </span>
              <h3 className="text-2xl font-light text-alkota-black">
                Years of Pressure Washing Chemistry
              </h3>
              <p className="text-sm text-[#666] font-normal leading-relaxed">
                Alkota does not buy white-label commodity detergents. Every master formulation was developed alongside our industrial hot water pressure washer engineers.
              </p>
            </div>

            <div className="space-y-4">
              <span className="font-ibm-plex-mono text-3xl font-extralight text-alkota-orange">
                100%
              </span>
              <h3 className="text-2xl font-light text-alkota-black">
                Machine &amp; Thermal Synergy
              </h3>
              <p className="text-sm text-[#666] font-normal leading-relaxed">
                Formulated with low-foaming, non-crystallising surfactant packages that protect Schedule 80 heating coils, ceramic plungers, and brass unloader valves.
              </p>
            </div>

            <div className="space-y-4">
              <span className="font-ibm-plex-mono text-3xl font-extralight text-alkota-orange">
                GB-CLP
              </span>
              <h3 className="text-2xl font-light text-alkota-black">
                Full UK Safety Compliance
              </h3>
              <p className="text-sm text-[#666] font-normal leading-relaxed">
                All formulations comply strictly with UK HSE Chemical Classification, Labelling and Packaging (GB-CLP) guidelines with comprehensive Safety Data Sheets.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 08 PACK SIZE SELECTION & LIVE ORDERING ── */}
      <ProductPackSelector product={product} />

      {/* ── 09 TECHNICAL DOSSIER & SUBSTRATE MATRIX ── */}
      <section id="technical" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-white text-alkota-black border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E0DEDC] pb-8">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
                // Technical Profile &amp; Substrates
              </span>
              <h2 className="text-4xl sm:text-5xl font-extralight text-alkota-black tracking-tight uppercase">
                Technical Specification.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#666] font-light leading-relaxed">
              Full verified chemical specifications, substrate suitability matrices, and downloadable GB-CLP documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Substrate Matrix (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl font-light text-alkota-black">
                Substrate Compatibility Matrix
              </h3>
              <p className="text-sm text-[#666] font-light">
                Verified surface interactions under standard operating dilution. Always test unlisted delicate substrates on an inconspicuous area.
              </p>

              <div className="border border-[#E0DEDC] divide-y divide-[#E8E8E4]">
                {product.surface_compatibility.map((sc, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FAF9F5]">
                    <div>
                      <span className="text-sm font-medium text-alkota-black block">
                        {sc.surface}
                      </span>
                      {sc.notes && (
                        <span className="text-xs text-[#777] font-light mt-0.5 block">
                          {sc.notes}
                        </span>
                      )}
                    </div>
                    <span className={`px-3 py-1 font-ibm-plex-mono text-[10px] uppercase tracking-wider rounded font-bold self-start sm:self-auto ${
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
            <div className="lg:col-span-5 space-y-8">
              
              {/* Specification Table */}
              <div className="p-6 bg-[#FAF9F5] border border-[#E0DEDC] space-y-4">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block">
                  Chemistry Reference
                </span>
                <div className="divide-y divide-[#E0DEDC] text-xs font-ibm-plex-mono">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#777]">Master Code:</span>
                    <span className="font-bold text-alkota-black">{product.originating_master_code}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#777]">Original Name:</span>
                    <span className="font-medium text-alkota-black">{product.originating_master_name}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#777]">Formulation Family:</span>
                    <span className="text-alkota-black">{product.retail_family}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#777]">Classification:</span>
                    <span className="text-emerald-700 font-bold">GB-CLP Verified</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#777]">Primary Induction:</span>
                    <span className="text-alkota-black">High/Low Pressure Injector</span>
                  </div>
                </div>
              </div>

              {/* Safety Data Sheet Portal Card */}
              <div className="bg-[#0A0A0A] text-white p-8 space-y-4 shadow-xl">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block">
                  Compliance Dossier
                </span>
                <h4 className="text-xl font-light text-white">
                  Safety Data Sheet (SDS)
                </h4>
                <p className="text-xs text-[#AAA] leading-relaxed">
                  Official UK CLP safety documentation for {product.originating_master_code} ({product.originating_master_name}) covering composition, PPE requirements, first aid, and ecological storage.
                </p>
                <div className="pt-2">
                  <a
                    href={`/api/chemicals/sds?code=${product.originating_master_code}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-white text-black hover:bg-alkota-orange hover:text-white px-6 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all font-medium"
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

      {/* ── 10 SYSTEM CROSS-SELL & CLEANING REGIMEN ── */}
      <ProductSystemCrossSell product={product} relatedProducts={relatedProducts} />

      {/* ── 11 MASTER INTEGRITY FOOTER BANNER ── */}
      <section className="bg-[#0A0A0A] text-white py-12 px-6 sm:px-12 lg:px-24 border-t border-[#222]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Award className="w-6 h-6 text-alkota-orange shrink-0" />
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
                Authentic Alkota Heritage Formulation
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-white">
                {product.originating_master_code} — {product.originating_master_name}
              </span>
            </div>
          </div>
          <div className="font-ibm-plex-mono text-xs text-[#888]">
            Alkota UK · Sourced, Stocked &amp; Despatched from the United Kingdom
          </div>
        </div>
      </section>

    </main>
  );
}
