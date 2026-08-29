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

  // Category specific narratives
  const isFleet = categorySlug === 'fleet-vehicle' || categorySlug === 'transportation-fleet';
  const isDegreaser = categorySlug === 'degreasers' || categorySlug === 'degreaser' || categorySlug === 'heavy-industrial';
  const isAg = categorySlug === 'industrial' || categorySlug === 'farm-ag' || categorySlug === 'agriculture';
  const isPartsWasher = categorySlug === 'parts-washers' || categorySlug === 'parts-washer' || categorySlug === 'parts-washer-solution';

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white selection:bg-alkota-orange selection:text-white pt-28 pb-0">
      <Navigation />

      {/* Hero Header */}
      <section className="relative border-b border-[#222] bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 pt-12 pb-16">
          <Breadcrumbs
            items={[
              { label: 'Chemicals', href: '/chemicals' },
              { label: categoryDef.name }
            ]}
          />

          <div className="mt-8 max-w-4xl">
            <Link
              href="/chemicals"
              className="inline-flex items-center gap-1.5 text-[10px] font-ibm-plex-mono uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors mb-6"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Back to All Chemical Families</span>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="h-2 w-2 rounded-full bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange">
                // {categoryDef.badge} // VERIFIED UK RANGE
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extralight tracking-tight uppercase leading-[0.95] text-white mb-6">
              {categoryDef.name.split('&')[0]} <br />
              <span className="text-alkota-orange font-light">
                {categoryDef.name.includes('&') ? `& ${categoryDef.name.split('&')[1]}` : 'ENGINEERING CHEMISTRY.'}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#AAA] leading-relaxed font-normal mb-8 max-w-3xl">
              {categoryDef.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/chemicals/match"
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal shadow-lg shadow-alkota-orange/10"
              >
                <span>Run Chemical Match Diagnostic</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/chemicals/safety-data"
                className="inline-flex items-center gap-2 border border-[#333] bg-[#141414] text-[#CCC] px-5 py-3 text-xs uppercase tracking-widest hover:text-white transition-colors font-normal"
              >
                <FileText className="h-3.5 w-3.5 text-alkota-orange" />
                <span>Category SDS Technical Library</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Target Application & Metallurgy Matrix */}
      <section className="py-12 bg-[#111111] border-b border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#141414] border border-[#262626]">
              <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange mb-2">
                Primary Contaminants
              </span>
              <ul className="space-y-1.5 text-xs text-[#CCC] font-normal">
                {categoryDef.keyContaminants.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-alkota-orange" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-[#141414] border border-[#262626]">
              <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange mb-2">
                Compatible Substrates
              </span>
              <ul className="space-y-1.5 text-xs text-[#CCC] font-normal">
                {categoryDef.keySurfaces.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-[#141414] border border-[#262626]">
              <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange mb-2">
                Equipment Synergy
              </span>
              <p className="text-xs text-[#AAA] leading-relaxed font-normal">
                {categoryDef.equipmentSynergy}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BESPOKE CATEGORY EDITORIAL CHAPTERS ───────────────────────────── */}
      {isFleet && (
        <section className="py-16 bg-[#0E0E0E] border-b border-[#222]">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-8">
            <div className="max-w-3xl">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
                // FLEET ENGINEERING ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-3xl uppercase tracking-tight text-white font-light mb-4">
                The Science of Touchless Road-Film Elimination
              </h2>
              <p className="text-xs sm:text-sm text-[#AAA] leading-relaxed font-normal">
                Traffic film is not simple dirt; it is an electrostatically bonded compound of unburnt diesel soot, microscopic tire rubber dust, and oxidised bitumen oils. Alkota Fleet chemistry uses high-performance polar surfactants to neutralize this surface charge, allowing high-pressure hot rinse water to sheet away road grime without abrasive brush swirls.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-[#141414] border border-[#262626] space-y-3">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange block">
                  01. Alloy & Clear-Coat Preservation
                </span>
                <p className="text-xs text-[#CCC] leading-relaxed font-normal">
                  High-pH caustics strip clear-coat gloss and permanently pit polished aluminium wheels. Alkota Power Blast TR-407 and Touchless TR-470 are engineered with sacrificial corrosion buffers to protect mirror finishes.
                </p>
              </div>
              <div className="p-6 bg-[#141414] border border-[#262626] space-y-3">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange block">
                  02. Interceptor & Wash Bay Compliance
                </span>
                <p className="text-xs text-[#CCC] leading-relaxed font-normal">
                  All Alkota UK fleet formulations feature quick-break emulsion chemistry, allowing oil-water separators and interceptors to efficiently separate fuel and oil droplets before discharging.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {isDegreaser && (
        <section className="py-16 bg-[#0E0E0E] border-b border-[#222]">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-8">
            <div className="max-w-3xl">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
                // INDUSTRIAL DEGREASING MECHANISM
              </span>
              <h2 className="text-2xl sm:text-3xl uppercase tracking-tight text-white font-light mb-4">
                Grease is Not One Contaminant
              </h2>
              <p className="text-xs sm:text-sm text-[#AAA] leading-relaxed font-normal">
                Industrial grease ranges from polymerised fifth-wheel lithium grease to high-temperature engine block varnish and bitumen tack. Alkota degreasers pair solvent solvency with thermal liquefaction to chemically penetrate the sludge barrier on contact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 bg-[#141414] border border-[#262626] space-y-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange block">
                  Thermal Synergy
                </span>
                <p className="text-xs text-[#CCC] font-normal leading-relaxed">
                  Hot water at 80°C liquefies heavy waxes; alkaline builders then saponify greases into water-soluble soaps.
                </p>
              </div>
              <div className="p-6 bg-[#141414] border border-[#262626] space-y-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange block">
                  Soil Re-suspension
                </span>
                <p className="text-xs text-[#CCC] font-normal leading-relaxed">
                  Hydrotropic agents form stable micelles, preventing dislodged grease from re-sticking to newly washed metal.
                </p>
              </div>
              <div className="p-6 bg-[#141414] border border-[#262626] space-y-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange block">
                  Heavy Cast Iron Protection
                </span>
                <p className="text-xs text-[#CCC] font-normal leading-relaxed">
                  Alkaline environments leave clean machine blocks temporarily passivated against immediate atmospheric oxidation.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {isAg && (
        <section className="py-16 bg-[#0E0E0E] border-b border-[#222]">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-8">
            <div className="max-w-3xl">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
                // AGRICULTURAL HERO FORMULATION
              </span>
              <h2 className="text-2xl sm:text-3xl uppercase tracking-tight text-white font-light mb-4">
                Farm Soap TR-440: Equipment Restoration Science
              </h2>
              <p className="text-xs sm:text-sm text-[#AAA] leading-relaxed font-normal">
                Agricultural machinery operates in punishing weather, UV sunlight, manure acids, and caked clay. Farm Soap TR-440 is specifically formulated to remove micro-oxidised surface paint layers on weathered tractors and combines, permanently renewing colour depth and leaving a protective rinse barrier.
              </p>
            </div>
          </div>
        </section>
      )}

      {isPartsWasher && (
        <section className="py-16 bg-[#0E0E0E] border-b border-[#222]">
          <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-8">
            <div className="max-w-3xl">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
                // CLOSED-LOOP AQUEOUS PROCESS
              </span>
              <h2 className="text-2xl sm:text-3xl uppercase tracking-tight text-white font-light mb-4">
                Non-Foaming Aqueous Degreasing with Flash-Rust Passivation
              </h2>
              <p className="text-xs sm:text-sm text-[#AAA] leading-relaxed font-normal">
                Enclosed automatic rotary parts washers subject detergents to 10+ BAR mechanical impact pressures at 70°C. Standard detergents foam aggressively, cavitating pumps. Alkota APW chemistry uses temperature-activated de-foamers and vapour phase rust inhibitors to passivate bare cast iron for up to 60 days.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Products Listing Grid */}
      <section className="py-20 bg-[#0D0D0D] border-b border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#222]">
            <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#888]">
              // Verified Formulations in this Family ({chemicals.length})
            </span>
            <span className="text-[10px] font-ibm-plex-mono text-emerald-400 uppercase">
              100% GB CLP Validated
            </span>
          </div>

          {chemicals.length === 0 ? (
            <div className="p-16 text-center bg-[#141414] border border-[#262626]">
              <p className="text-xs font-ibm-plex-mono uppercase text-[#777] mb-4">
                Additional formulations in this category are currently under UK REACH / GB CLP technical review.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal"
              >
                <span>Enquire About Custom Formulation Supply</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chemicals.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#141414] border border-[#262626] hover:border-alkota-orange p-6 sm:p-8 flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-ibm-plex-mono text-[#666] mb-3">
                      <span className="bg-alkota-orange/10 text-alkota-orange px-2 py-0.5 border border-alkota-orange/30">
                        {item.code || 'HYDRUS'}
                      </span>
                      <span>{item.form}</span>
                    </div>

                    <h3 className="text-2xl uppercase tracking-tight text-white font-normal group-hover:text-alkota-orange transition-colors mb-2">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#AAA] leading-relaxed font-normal mb-6">
                      {item.tagline}
                    </p>

                    {/* Specification Highlights */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-black/40 border border-[#222] text-[11px] font-ibm-plex-mono mb-6">
                      <div>
                        <span className="block text-[#555] text-[9px] uppercase">pH Level</span>
                        <span className="text-white">{item.ph_level?.split(' ')[0] || '--'}</span>
                      </div>
                      <div>
                        <span className="block text-[#555] text-[9px] uppercase">Dilution Rate</span>
                        <span className="text-white">{item.dilution_hot || item.dilution_cold || 'As Directed'}</span>
                      </div>
                      <div>
                        <span className="block text-[#555] text-[9px] uppercase">Biodegradable</span>
                        <span className={item.biodegradable ? 'text-emerald-400' : 'text-[#888]'}>
                          {item.biodegradable ? 'YES (OECD)' : 'NO'}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[#555] text-[9px] uppercase">Available Sizes</span>
                        <span className="text-white">{item.available_sizes?.length || 3} Pack Sizes</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-[#222]">
                    <Link
                      href={`/chemicals/${categorySlug}/${item.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-alkota-orange text-white py-3 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors font-normal shadow"
                    >
                      <span>View Technical Specification</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <div className="flex gap-2">
                      <a
                        href={item.sds_url || '#'}
                        className="flex-1 text-center py-2 bg-[#1C1C1C] hover:bg-[#262626] text-[#AAA] hover:text-white border border-[#333] text-[10px] font-ibm-plex-mono uppercase transition-colors"
                      >
                        SDS
                      </a>
                      <a
                        href={item.tds_url || '#'}
                        className="flex-1 text-center py-2 bg-[#1C1C1C] hover:bg-[#262626] text-[#AAA] hover:text-white border border-[#333] text-[10px] font-ibm-plex-mono uppercase transition-colors"
                      >
                        TDS
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Commercial Orders & Supply Banner */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#141412] border border-[#262626] p-8 sm:p-12">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-2xl uppercase tracking-tight text-white font-light">
              Bulk 1000L IBC & Multi-Site Fleet Supply
            </h3>
            <p className="text-xs text-[#AAA] leading-relaxed font-normal">
              Hydrus formulations in this category are available in palletized 25L drums, 200L barrels, and 1000L IBC totes with nationwide scheduled replenishment.
            </p>
          </div>
          <Link
            href={`/contact?subject=Bulk%20Pricing%20for%20${encodeURIComponent(categoryDef.name)}`}
            className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal shrink-0"
          >
            <span>Request Category Pricing</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
