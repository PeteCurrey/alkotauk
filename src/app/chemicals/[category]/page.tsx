import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import {
  Beaker,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Download,
  FileText,
  Sparkles,
  AlertTriangle,
  Info,
  Droplets,
  Building2,
  Gauge,
  Truck,
  Factory,
  Tractor,
  Layers,
  RotateCcw,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import {
  CHEMICAL_CATEGORIES,
  VERIFIED_CHEMICAL_PRODUCTS,
  getChemicalsByCategory,
} from '@/lib/chemicals/seed-data';
import { generateSeo } from '@/lib/seo';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const categoryDef = CHEMICAL_CATEGORIES.find(c => c.slug === categorySlug);
  if (!categoryDef) return {};

  return generateSeo({
    title: `Alkota UK | ${categoryDef.name} Industrial Chemistry`,
    description: categoryDef.description,
  });
}

export default async function ChemicalCategoryHubPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;

  // Find canonical category or alias
  const categoryDef = CHEMICAL_CATEGORIES.find(c => c.slug === categorySlug) || {
    slug: categorySlug as any,
    name: categorySlug.replace(/-/g, ' ').toUpperCase(),
    title: `${categorySlug.replace(/-/g, ' ')} Solutions`,
    tagline: 'Engineered chemical formulations for industrial cleaning applications.',
    description: `Professional ${categorySlug.replace(/-/g, ' ')} detergents formulated for high-performance pressure washing, degreasing, and equipment preservation.`,
    applicationScope: ['Commercial & Industrial Operations'],
    keyContaminants: ['Industrial Soil', 'Grease & Oil'],
    keySurfaces: ['Steel', 'Painted Metal', 'Industrial Machinery'],
    equipmentSynergy: 'Compatible with Alkota Industrial Wash Systems',
    heroImagePlaceholder: `IMAGE SLOT — ${categorySlug.toUpperCase()} CHEMISTRY`,
    badge: 'INDUSTRIAL RANGE'
  };

  const chemicals = getChemicalsByCategory(categorySlug);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1A18] selection:bg-alkota-orange selection:text-white">
      <Navigation />

      {/* ── CHAPTER 01: EDITORIAL LIGHT HERO ── */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#E8E7E0] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Chemicals', href: '/chemicals' },
              { label: categoryDef.name }
            ]}
          />

          <div className="mt-8 max-w-4xl">
            <Link
              href="/chemicals"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#777] hover:text-alkota-orange transition-colors mb-6 font-normal"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Back to All Chemical Families</span>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="h-2 w-2 rounded-full bg-alkota-orange" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange font-medium">
                {categoryDef.badge} // VERIFIED UK SPECIFICATION
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight uppercase leading-[0.98] text-[#1A1A18] mb-6">
              {categoryDef.name.split('&')[0]} <br />
              <span className="text-alkota-orange font-normal italic">
                {categoryDef.name.includes('&') ? `& ${categoryDef.name.split('&')[1]}` : 'ENGINEERING CHEMISTRY.'}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#555] leading-relaxed font-normal mb-8 max-w-3xl">
              {categoryDef.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/chemicals/match"
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-7 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-black transition-colors font-medium shadow-md"
              >
                <span>Launch Chemical Diagnostic</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/chemicals/safety-data"
                className="inline-flex items-center gap-2 border border-[#D5D5D0] bg-white text-[#333] px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:border-black transition-colors font-normal"
              >
                <FileText className="h-3.5 w-3.5 text-alkota-orange" />
                <span>Safety Data Sheets (SDS)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 02: TARGET APPLICATION & METALLURGY MATRIX (LIGHT EDITORIAL) ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E8E7E0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-[#1A1A18] pt-6">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-alkota-orange mb-3 font-medium">
                Primary Contaminants
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[#444] font-normal">
                {categoryDef.keyContaminants.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-alkota-orange font-mono">0{i+1}.</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#1A1A18] pt-6">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-alkota-orange mb-3 font-medium">
                Compatible Substrates
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[#444] font-normal">
                {categoryDef.keySurfaces.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-alkota-orange font-mono">0{i+1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#1A1A18] pt-6">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-alkota-orange mb-3 font-medium">
                Machine Equipment Synergy
              </span>
              <p className="text-xs sm:text-sm text-[#444] font-normal leading-relaxed mb-4">
                {categoryDef.equipmentSynergy}
              </p>
              <Link
                href="/machines"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-alkota-orange hover:text-black uppercase tracking-wider font-medium"
              >
                <span>View Compatible Wash Systems</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 03: VERIFIED CHEMICAL FORMULATIONS (LIGHT PRODUCT COMPARISON) ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2 font-medium">
            Formulation Roster
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl text-[#1A1A18] tracking-tight leading-tight mb-4">
            Verified {categoryDef.name} Products
          </h2>
          <p className="text-base text-[#666] font-normal leading-relaxed">
            High-concentration concentrates formulated for downstream injector delivery, high-pressure foam cannons, or direct tank immersion.
          </p>
        </div>

        {chemicals.length === 0 ? (
          <div className="p-12 bg-white border border-[#E8E7E0] text-center">
            <Beaker className="h-10 w-10 text-[#AAA] mx-auto mb-3" />
            <h3 className="font-light text-xl text-[#1A1A18] mb-2">Category Formulations Under Technical Review</h3>
            <p className="text-xs text-[#666] max-w-md mx-auto mb-6">
              Our UK chemical laboratory is currently updating dilution matrices for this category. Contact an application engineer for interim formulation advice.
            </p>
            <Link
              href="/chemicals"
              className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3 font-mono text-xs uppercase tracking-widest"
            >
              <span>Explore Active Chemical Families</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chemicals.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-[#E8E7E0] hover:border-[#1A1A18] p-8 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-alkota-orange block mb-1">
                        {prod.formulaCode || 'CONCENTRATE'}
                      </span>
                      <h3 className="font-light text-2xl sm:text-3xl tracking-tight text-[#1A1A18]">
                        {prod.name}
                      </h3>
                    </div>

                    <span className="font-mono text-xs bg-[#FAF9F5] border border-[#DDD] px-3 py-1 text-[#444] shrink-0 font-medium">
                      pH: {prod.pH || 'Neutral'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#555] leading-relaxed font-normal mb-6">
                    {prod.description}
                  </p>

                  {/* Clean Technical Specs Grid */}
                  <div className="border-t border-[#F0EFEB] pt-4 mb-6 space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-[#666]">
                      <span className="text-[#888]">Dilution Ratio:</span>
                      <span className="text-[#1A1A18] font-medium">{prod.dilutionRatio || '1:20 to 1:100'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#666]">
                      <span className="text-[#888]">Foam Profile:</span>
                      <span className="text-[#1A1A18] font-medium">{prod.foamProfile || 'Medium High-Cling'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#666]">
                      <span className="text-[#888]">Pack Sizes:</span>
                      <span className="text-[#1A1A18] font-medium">25L Drum / 205L Barrel / 1000L IBC</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E8E7E0] pt-5 flex items-center justify-between gap-4">
                  <Link
                    href={`/chemicals/product/${prod.slug}`}
                    className="font-mono text-xs uppercase tracking-widest text-[#1A1A18] hover:text-alkota-orange transition-colors font-medium"
                  >
                    View Formulation Specs →
                  </Link>

                  <Link
                    href="/chemicals/safety-data"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#777] hover:text-black transition-colors"
                  >
                    <Download className="h-3.5 w-3.5 text-alkota-orange" />
                    <span>Download SDS</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CHAPTER 04: ONE DARK CINEMATIC WASH CHAPTER (THERMAL SYNERGY) ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-y border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333] inline-block mb-4">
                Thermal Emulsification Thermodynamics
              </span>

              <h2 className="font-extralight text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
                Why Alkota chemistry is formulated for heat.
              </h2>

              <p className="text-base text-[#AAA] font-normal leading-relaxed mb-6">
                Standard consumer detergents break down and evaporate when exposed to 80°C hot water. Alkota industrial chemistry is chemically engineered with heat-stable surfactants that accelerate saponification under high thermal exchange.
              </p>
              <p className="text-sm text-[#777] font-normal leading-relaxed mb-8">
                Combining Alkota hot-water Schedule 80 coil delivery with our verified chemical range allows operators to reduce chemical dosage by up to 60% while cutting wash time in half.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/machines/hot-water"
                  className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3.5 font-mono text-xs uppercase tracking-widest transition-all font-medium"
                >
                  <span>Explore Hot Water Systems</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/lobby/application-science/chemical-saponification-mechanics"
                  className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 font-mono text-xs uppercase tracking-widest transition-all font-normal"
                >
                  Read Saponification Science
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#141414] border border-[#222] p-8 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-alkota-orange mb-4">
                Alkota Chemical Advantages:
              </h3>
              {[
                { title: 'Downstream Injection Safe', desc: 'Prevents aggressive chemical exposure to high-pressure pump valves and seals.' },
                { title: 'Coil Scaling Inhibitors', desc: 'Chelating agents bind calcium and magnesium to prevent internal heat exchanger furring.' },
                { title: 'Rapid Phase Separation', desc: 'Designed for wash bay oil-water interceptors to satisfy Environment Agency trade effluent rules.' },
                { title: 'Full COSHH Compliance', desc: 'UK CLP compliant safety data sheets and bilingual container labeling.' },
              ].map((item, idx) => (
                <div key={idx} className="border-b border-[#222] pb-3 last:border-b-0">
                  <h4 className="text-xs font-medium text-white mb-0.5">{item.title}</h4>
                  <p className="text-[11px] text-[#777] leading-relaxed font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 05: COMPLIANCE & BULK DISTRIBUTION (LIGHT) ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="bg-white border border-[#E8E7E0] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2 font-medium">
                UK Supply &amp; Storage
              </span>
              <h2 className="font-extralight text-3xl sm:text-4xl text-[#1A1A18] tracking-tight leading-tight mb-4">
                Regional Chemical Delivery &amp; IBC Dosing
              </h2>
              <p className="text-sm text-[#555] leading-relaxed mb-6 font-normal">
                Alkota authorised regional dealers provide regular route delivery of 25-litre polycans, 205-litre barrels, and 1,000-litre IBCs directly to your depot or wash bay with automated dosing integration.
              </p>
              <Link
                href="/dealers"
                className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-7 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors font-medium"
              >
                <span>Find Your Local Chemical Stockist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#E8E7E0] p-6 text-center">
              <ShieldCheck className="w-10 h-10 text-alkota-orange mx-auto mb-3" />
              <h4 className="font-medium text-sm text-[#1A1A18] mb-1">
                COSHH Assessment &amp; Dilution Training
              </h4>
              <p className="text-xs text-[#666] mb-6 font-normal leading-relaxed">
                We supply wallcharts, dilution proportioners, and staff chemical safety briefings with every fleet supply contract.
              </p>
              <Link
                href="/chemicals/safety-data"
                className="inline-flex items-center gap-2 border border-[#CCC] hover:border-black text-[#1A1A18] px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors"
              >
                <span>Access Safety Data Portal →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
