import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/server';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import {
  Beaker,
  ShieldCheck,
  Droplets,
  FileText,
  ChevronLeft,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Gauge,
  Sparkles,
  Download,
  Building2,
  RefreshCw,
  Clock,
  Layers,
  XCircle,
  MessageSquare,
  HelpCircle,
  Calculator
} from 'lucide-react';
import { generateSeo } from '@/lib/seo';
import { getChemicalBySlug, VERIFIED_CHEMICAL_PRODUCTS, CHEMICAL_CATEGORIES } from '@/lib/chemicals/seed-data';
import { ChemicalProduct } from '@/lib/types/chemical';
import ProductDilutionWidget from './ProductDilutionWidget';

interface ChemicalDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

async function getChemical(slug: string): Promise<ChemicalProduct | null> {
  // 1. Check verified canonical in-memory products
  const canonical = getChemicalBySlug(slug);
  if (canonical) return canonical;

  // 2. Query Supabase database
  try {
    const { data, error } = await supabaseAdmin
      .from('chemicals')
      .select('*')
      .eq('slug', slug)
      .single();

    if (data && !error) {
      return data as ChemicalProduct;
    }
  } catch (e) {
    console.error('Error fetching chemical from DB:', e);
  }

  return null;
}

export async function generateMetadata({ params }: ChemicalDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chemical = await getChemical(slug);
  if (!chemical) return {};

  return generateSeo({
    title: `${chemical.name} | Technical Chemical Specification | Alkota UK`,
    description: chemical.tagline || chemical.description || 'Industrial cleaning chemical specification.',
    image: chemical.primary_image_url || undefined,
  });
}

export default async function ChemicalDetailPage({ params }: ChemicalDetailPageProps) {
  const { category: categorySlug, slug } = await params;
  const chemical = await getChemical(slug);

  if (!chemical) {
    notFound();
  }

  const categoryDef = CHEMICAL_CATEGORIES.find(c => c.slug === chemical.category || c.slug === categorySlug);
  const categoryName = categoryDef?.name || categorySlug.replace(/-/g, ' ');

  // Surface Compatibility Matrix Definition
  const ALL_SURFACES = [
    { name: 'Painted Mild Steel', note: 'Safe at all recommended dilution rates' },
    { name: 'Cast Iron Machine Blocks', note: 'Safe; leaves protective rinse film' },
    { name: '304 / 316 Stainless Steel', note: '100% compatible; optical shine' },
    { name: 'Standard / Cast Aluminium', note: 'Test dilution; safe as directed' },
    { name: 'Mirror Polished Aluminium', note: 'Sensitive metallurgy check' },
    { name: 'Galvanised Metal', note: 'Check pH contact constraints' },
    { name: 'Rubber Seals & EPDM', note: 'Non-degrading wetting agents' },
    { name: 'Concrete & Masonry Pads', note: 'Penetrates porous substrate' }
  ];

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white selection:bg-alkota-orange selection:text-white pt-28 pb-0 overflow-x-hidden">
      <Navigation />

      {/* Breadcrumb Header */}
      <div className="border-b border-[#222] bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 py-8">
          <Breadcrumbs
            items={[
              { label: 'Chemicals', href: '/chemicals' },
              { label: categoryName, href: `/chemicals/${categorySlug}` },
              { label: chemical.name }
            ]}
          />
        </div>
      </div>

      {/* Main Technical Specification Section */}
      <section className="py-12 bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* ─── LEFT COLUMN: PRODUCT VISUAL & IDENTITY (7 cols) ───────── */}
            <div className="lg:col-span-7 space-y-10">
              {/* Product Visual Container with Neutral Placeholder Design */}
              <div className="relative aspect-[16/10] bg-[#141414] border border-[#262626] p-8 flex items-center justify-center overflow-hidden group">
                {chemical.primary_image_url || chemical.image_url ? (
                  <img
                    src={chemical.primary_image_url || chemical.image_url || ''}
                    alt={chemical.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-center space-y-3 p-6">
                    <Beaker className="h-16 w-16 text-alkota-orange mx-auto opacity-40" />
                    <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#666] block">
                      Alkota Hydrus Chemical Formulation
                    </span>
                    <span className="text-sm uppercase tracking-tight text-[#AAA] font-light">
                      {chemical.name} · {chemical.code}
                    </span>
                  </div>
                )}

                <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 border border-[#333] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#CCC]">
                    UK Approved // GB CLP Validated
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 font-ibm-plex-mono text-[9px] text-[#666] uppercase">
                  {chemical.form || 'Concentrated Liquid'}
                </div>
              </div>

              {/* Formulation Overview & Engineering Story */}
              <div className="space-y-4">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block">
                  // TECHNICAL PROFILE & FORMULATION SCIENCE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extralight uppercase tracking-tight text-white">
                  Chemical Purpose & Action
                </h2>
                <p className="text-sm text-[#CCC] leading-relaxed font-normal">
                  {chemical.description}
                </p>

                {chemical.features && chemical.features.length > 0 && (
                  <div className="pt-4 space-y-2">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-2">
                      Key Technical Advantages:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {chemical.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 bg-[#141414] border border-[#222]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0 mt-0.5" />
                          <span className="text-xs text-[#AAA] font-normal leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Surface Exclusions and Prominent Safety Warnings */}
              {chemical.not_suitable_for && chemical.not_suitable_for.length > 0 && (
                <div className="p-5 bg-red-950/20 border border-red-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-ibm-plex-mono text-xs uppercase tracking-wider font-bold">
                      Important Surface Restrictions & Metallurgy Cautions
                    </span>
                  </div>
                  <p className="text-xs text-[#DDD] leading-relaxed font-normal">
                    This formulation is <strong>NOT suitable</strong> for direct application on: {chemical.not_suitable_for.join(', ')}. Contact with sensitive unlacquered aluminium or galvanised coatings may cause permanent chemical etching or discoloration.
                  </p>
                </div>
              )}

              {/* Comprehensive Surface Compatibility Matrix */}
              <div className="space-y-4 pt-6 border-t border-[#222]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block">
                      // SUBSTRATE SUITABILITY MATRIX
                    </span>
                    <h3 className="text-xl uppercase tracking-tight text-white font-light">
                      Surface Metallurgy Compatibility
                    </h3>
                  </div>
                  <span className="text-[10px] font-ibm-plex-mono text-[#888] uppercase">
                    Lab Verified Rules
                  </span>
                </div>

                <div className="border border-[#222] bg-[#141414] divide-y divide-[#222]">
                  {ALL_SURFACES.map((surf, i) => {
                    const isExplicitlyExcluded = chemical.not_suitable_for?.some(
                      s => s.toLowerCase().includes(surf.name.toLowerCase().split(' ')[0])
                    );
                    const isOptimal = chemical.compatible_surfaces?.some(
                      s => s.toLowerCase().includes(surf.name.toLowerCase().split(' ')[0])
                    );

                    return (
                      <div key={i} className="p-3.5 flex items-center justify-between gap-4 text-xs font-normal">
                        <div className="flex items-center gap-3">
                          {isExplicitlyExcluded ? (
                            <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                          ) : isOptimal ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                          )}
                          <div>
                            <span className={isExplicitlyExcluded ? 'text-red-300 font-normal' : 'text-white'}>
                              {surf.name}
                            </span>
                            <span className="block text-[10px] text-[#666] leading-tight">
                              {isExplicitlyExcluded ? 'NOT RECOMMENDED — RISK OF ETCHING' : surf.note}
                            </span>
                          </div>
                        </div>

                        <span className={`font-ibm-plex-mono text-[10px] uppercase px-2 py-0.5 border ${
                          isExplicitlyExcluded
                            ? 'text-red-400 bg-red-950/40 border-red-800/40'
                            : 'text-emerald-400 bg-emerald-950/30 border-emerald-800/30'
                        }`}>
                          {isExplicitlyExcluded ? 'Exclude' : 'Compatible'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive In-Page Dilution Calculator */}
              <div className="space-y-4 pt-6 border-t border-[#222]">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-alkota-orange" />
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange">
                    // DOSING & DILUTION CALCULATOR
                  </span>
                </div>
                <ProductDilutionWidget
                  productName={chemical.name}
                  dilutionHot={chemical.dilution_hot || undefined}
                  dilutionCold={chemical.dilution_cold || undefined}
                />
              </div>

              {/* Contextual Ask The Lobby Support Block */}
              <div className="p-6 bg-[#141412] border border-[#262626] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-alkota-orange/10 border border-alkota-orange/30 text-alkota-orange">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block">
                      // Contextual Chemical Intelligence
                    </span>
                    <h4 className="text-lg uppercase text-white font-light">
                      Need Technical Verification for this Formulation?
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-[#AAA] leading-relaxed font-normal">
                  Ask our engineering intelligence platform specific questions regarding metallurgy compatibility, water recycling compliance, or dwell times.
                </p>
                <div className="pt-1">
                  <Link
                    href={`/lobby?q=${encodeURIComponent(`I am reviewing ${chemical.name} (${chemical.code || ''}). What are the surface considerations and proper application dwell times?`)}`}
                    className="inline-flex items-center gap-2 bg-[#1C1C1C] hover:bg-alkota-orange hover:text-black text-white px-5 py-2.5 text-xs font-ibm-plex-mono uppercase tracking-wider border border-[#333] transition-colors"
                  >
                    <span>Ask The Lobby About {chemical.name}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ─── RIGHT COLUMN: DENSE SPECIFICATION & ORDERING (5 cols) ─── */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
              {/* Product Masthead */}
              <div className="bg-[#141414] border border-[#262626] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#222]">
                  <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange bg-alkota-orange/10 px-2.5 py-0.5 border border-alkota-orange/30">
                    {chemical.code || 'HYDRUS-UK'}
                  </span>
                  <span className="font-ibm-plex-mono text-xs text-[#888] uppercase">
                    {chemical.manufacturer}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extralight uppercase tracking-tight text-white leading-tight">
                  {chemical.name}
                </h1>

                <p className="text-xs text-[#AAA] leading-relaxed font-normal">
                  {chemical.tagline}
                </p>

                {/* Dense Physical Metric Pillars */}
                <div className="grid grid-cols-2 gap-px bg-[#262626] border border-[#262626] text-xs font-ibm-plex-mono pt-2">
                  <div className="bg-[#181818] p-3">
                    <span className="block text-[8px] text-[#666] uppercase">pH Classification</span>
                    <span className="text-white text-sm">{chemical.ph_level || '11.5 – 12.0'}</span>
                  </div>
                  <div className="bg-[#181818] p-3">
                    <span className="block text-[8px] text-[#666] uppercase">Specific Gravity</span>
                    <span className="text-white text-sm">{chemical.specific_gravity || '1.08 @ 20°C'}</span>
                  </div>
                  <div className="bg-[#181818] p-3">
                    <span className="block text-[8px] text-[#666] uppercase">Hot Dilution Rate</span>
                    <span className="text-alkota-orange text-sm">{chemical.dilution_hot || '1:60 to 1:120'}</span>
                  </div>
                  <div className="bg-[#181818] p-3">
                    <span className="block text-[8px] text-[#666] uppercase">Cold Dilution Rate</span>
                    <span className="text-white text-sm">{chemical.dilution_cold || '1:30 to 1:80'}</span>
                  </div>
                  <div className="bg-[#181818] p-3">
                    <span className="block text-[8px] text-[#666] uppercase">Biodegradability</span>
                    <span className="text-emerald-400 text-sm">
                      {chemical.biodegradable ? 'OECD 301B' : 'Non-Bio'}
                    </span>
                  </div>
                  <div className="bg-[#181818] p-3">
                    <span className="block text-[8px] text-[#666] uppercase">Water Recycling</span>
                    <span className="text-cyan-400 text-sm">
                      {chemical.water_recovery_compatible ? 'Compatible' : 'Dedicated'}
                    </span>
                  </div>
                </div>

                {/* Available Packaging Options */}
                {chemical.available_sizes && (
                  <div className="pt-2">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-2">
                      Available Packaging Formats:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {chemical.available_sizes.map((sz, i) => (
                        <span key={i} className="px-2.5 py-1 bg-black/60 border border-[#333] text-[10px] font-ibm-plex-mono text-[#DDD]">
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order / Pricing Action Buttons */}
                <div className="pt-4 border-t border-[#222] space-y-2.5">
                  <Link
                    href={`/contact?subject=Price%20Request%20for%20${encodeURIComponent(chemical.name)}`}
                    className="w-full flex items-center justify-center gap-2 bg-alkota-orange text-white py-3.5 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all font-normal shadow-lg shadow-alkota-orange/20"
                  >
                    <span>Request Pricing & Order</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/dealers"
                    className="w-full flex items-center justify-center gap-2 border border-[#333] bg-[#1C1C1C] text-[#CCC] hover:text-white py-2.5 text-xs uppercase tracking-widest transition-colors font-normal"
                  >
                    <span>Find Local Stocking Dealer</span>
                  </Link>
                </div>
              </div>

              {/* Safety & GB CLP / COSHH Documentation Box */}
              <div className="bg-[#141412] border border-[#262626] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#222]">
                  <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange font-bold flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>GB CLP & Safety Data</span>
                  </span>
                  {chemical.signal_word === 'DANGER' ? (
                    <span className="text-red-400 bg-red-950/40 px-2 py-0.5 border border-red-800 text-[10px] font-ibm-plex-mono">
                      DANGER
                    </span>
                  ) : chemical.signal_word === 'WARNING' ? (
                    <span className="text-amber-400 bg-amber-950/40 px-2 py-0.5 border border-amber-800 text-[10px] font-ibm-plex-mono">
                      WARNING
                    </span>
                  ) : (
                    <span className="text-[#666] font-ibm-plex-mono text-[10px]">NON-HAZARDOUS</span>
                  )}
                </div>

                <div className="space-y-2 text-xs text-[#AAA] font-normal">
                  <p className="text-[11px] leading-relaxed">
                    <strong>Classification:</strong> {chemical.hazard_classification || 'Non-Hazardous formulation according to GB CLP rules.'}
                  </p>
                  {chemical.hazard_statements && chemical.hazard_statements.length > 0 && (
                    <ul className="space-y-1 text-[10px] text-[#888] font-ibm-plex-mono pt-1">
                      {chemical.hazard_statements.map((h, idx) => (
                        <li key={idx}>• {h}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="p-3 bg-black/40 border border-[#222] text-[10px] text-[#777] leading-relaxed font-normal">
                  The Safety Data Sheet provides information required to support your site-specific COSHH assessment.
                </div>

                {/* Download Document Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={chemical.sds_url || '#'}
                    className="flex items-center justify-center gap-2 p-2.5 bg-[#1C1C1C] hover:bg-alkota-orange text-white text-xs uppercase font-ibm-plex-mono transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>SDS (PDF)</span>
                  </a>
                  <a
                    href={chemical.tds_url || '#'}
                    className="flex items-center justify-center gap-2 p-2.5 border border-[#333] hover:border-white text-[#CCC] hover:text-white text-xs uppercase font-ibm-plex-mono transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>TDS</span>
                  </a>
                </div>
                <span className="block text-[9px] font-ibm-plex-mono text-[#555] text-center">
                  Document Revision: {chemical.sds_revision_date || 'Current Active'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Equipment Cross-Sell Synergy */}
      <section className="py-16 bg-[#0A0A0A] border-t border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#222]">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                // SYSTEM SYNERGY
              </span>
              <h3 className="text-2xl uppercase tracking-tight text-white font-light">
                Recommended Equipment Pairings
              </h3>
            </div>
            <Link
              href="/machines"
              className="text-xs uppercase tracking-wider text-alkota-orange hover:text-white transition-colors font-normal inline-flex items-center gap-1"
            >
              <span>View All Machines</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#141414] border border-[#262626] hover:border-alkota-orange transition-all group">
              <span className="text-[10px] font-ibm-plex-mono uppercase text-[#666] block mb-2">
                Hot Water Systems
              </span>
              <h4 className="text-lg uppercase text-white font-normal group-hover:text-alkota-orange transition-colors mb-2">
                Alkota 4000 Series
              </h4>
              <p className="text-xs text-[#888] leading-relaxed font-normal mb-4">
                Schedule 80 continuous-wound coil washer engineered to activate thermal degreasing without scale buildup.
              </p>
              <Link
                href="/machines/hot-water"
                className="text-xs uppercase tracking-wider text-white inline-flex items-center gap-1.5 font-normal"
              >
                <span>Explore Series</span>
                <ArrowRight className="h-3 w-3 text-alkota-orange" />
              </Link>
            </div>

            <div className="p-6 bg-[#141414] border border-[#262626] hover:border-alkota-orange transition-all group">
              <span className="text-[10px] font-ibm-plex-mono uppercase text-[#666] block mb-2">
                Aqueous Washing
              </span>
              <h4 className="text-lg uppercase text-white font-normal group-hover:text-alkota-orange transition-colors mb-2">
                Alkota APW Rotary Washers
              </h4>
              <p className="text-xs text-[#888] leading-relaxed font-normal mb-4">
                Enclosed automatic turntable parts washing cabinets directly matched to APW non-foaming detergency.
              </p>
              <Link
                href="/parts-washers"
                className="text-xs uppercase tracking-wider text-white inline-flex items-center gap-1.5 font-normal"
              >
                <span>Explore Parts Washers</span>
                <ArrowRight className="h-3 w-3 text-alkota-orange" />
              </Link>
            </div>

            <div className="p-6 bg-[#141414] border border-[#262626] hover:border-alkota-orange transition-all group">
              <span className="text-[10px] font-ibm-plex-mono uppercase text-[#666] block mb-2">
                Mobile Fleet Wash
              </span>
              <h4 className="text-lg uppercase text-white font-normal group-hover:text-alkota-orange transition-colors mb-2">
                Alkota Bespoke Trailers
              </h4>
              <p className="text-xs text-[#888] leading-relaxed font-normal mb-4">
                Turnkey highway-certified trailers with onboard chemical tanks, dual hose reels, and water recovery.
              </p>
              <Link
                href="/trailers"
                className="text-xs uppercase tracking-wider text-white inline-flex items-center gap-1.5 font-normal"
              >
                <span>Configure Rig</span>
                <ArrowRight className="h-3 w-3 text-alkota-orange" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
