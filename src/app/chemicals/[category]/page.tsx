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
  Gauge
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
                {categoryDef.name.includes('&') ? `& ${categoryDef.name.split('&')[1]}` : 'CHEMISTRY.'}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#AAA] leading-relaxed font-normal mb-8 max-w-3xl">
              {categoryDef.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/chemicals/match"
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal"
              >
                <span>Run Chemical Match For This Category</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/chemicals/safety-data"
                className="inline-flex items-center gap-2 border border-[#333] bg-[#141414] text-[#CCC] px-5 py-3 text-xs uppercase tracking-widest hover:text-white transition-colors font-normal"
              >
                <FileText className="h-3.5 w-3.5 text-alkota-orange" />
                <span>Category SDS Documents</span>
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

      {/* Products Listing Grid */}
      <section className="py-20 bg-[#0D0D0D] border-b border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#222]">
            <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#888]">
              // Verified Products in this Discipline ({chemicals.length})
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
