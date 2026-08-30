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
  Calculator,
  Award
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
    <main className="min-h-screen bg-[#0D0D0D] text-white selection:bg-alkota-orange selection:text-white pb-0 overflow-x-hidden">
      <Navigation />

      {/* ── 01: FULL SCREEN HERO SECTION WITH BACKGROUND IMAGE ── */}
      <section 
        className="relative min-h-screen w-full flex flex-col justify-between bg-[#0A0A0A] text-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222] overflow-hidden"
        aria-label={`${chemical.name} - Technical Specification`}
      >
        {/* Full Hero Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/cold-water-control-hero.jpg"
            alt={`${chemical.name} industrial chemical formulation`}
            className="h-full w-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.38) contrast(1.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-black/70" />
        </div>

        {/* Top Breadcrumb & Metadata Navigation */}
        <div className="relative z-10 max-w-7xl mx-auto w-full border-b border-white/10 pb-6">
          <Breadcrumbs
            items={[
              { label: 'Chemicals', href: '/chemicals' },
              { label: categoryName, href: `/chemicals/${categorySlug}` },
              { label: chemical.name }
            ]}
          />
        </div>

        {/* Hero Content Stage */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange bg-alkota-orange/10 px-3 py-1 border border-alkota-orange/30 font-medium">
                {chemical.code || 'HYDRUS-UK'}
              </span>
              <span className="font-ibm-plex-mono text-xs text-[#AAA] uppercase">
                {chemical.manufacturer || 'Alkota USA / UK Formulation'}
              </span>
              <span className="text-[#555]">•</span>
              <span className="text-emerald-400 font-ibm-plex-mono text-xs font-medium">
                UK Approved // GB CLP Validated
              </span>
            </div>

            <h1 
              className="text-4xl sm:text-6xl lg:text-7xl font-extralight uppercase tracking-tight text-white leading-[0.94]"
            >
              {chemical.name}
            </h1>

            <p className="text-base sm:text-xl text-[#DDD] font-light leading-relaxed max-w-2xl">
              {chemical.tagline || chemical.description}
            </p>

            {/* Dense Physical Metric Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10 border border-white/10 text-xs font-ibm-plex-mono pt-2 max-w-2xl backdrop-blur-md">
              <div className="bg-black/60 p-3">
                <span className="block text-[8px] text-[#888] uppercase">pH Classification</span>
                <span className="text-white text-sm font-medium">{chemical.ph_level || '11.5 – 12.0'}</span>
              </div>
              <div className="bg-black/60 p-3">
                <span className="block text-[8px] text-[#888] uppercase">Specific Gravity</span>
                <span className="text-white text-sm font-medium">{chemical.specific_gravity || '1.08 @ 20°C'}</span>
              </div>
              <div className="bg-black/60 p-3">
                <span className="block text-[8px] text-[#888] uppercase">Hot Dilution Rate</span>
                <span className="text-alkota-orange text-sm font-medium">{chemical.dilution_hot || '1:60 to 1:120'}</span>
              </div>
              <div className="bg-black/60 p-3">
                <span className="block text-[8px] text-[#888] uppercase">Cold Dilution Rate</span>
                <span className="text-white text-sm font-medium">{chemical.dilution_cold || '1:30 to 1:80'}</span>
              </div>
              <div className="bg-black/60 p-3">
                <span className="block text-[8px] text-[#888] uppercase">Biodegradability</span>
                <span className="text-emerald-400 text-sm font-medium">
                  {chemical.biodegradable ? 'OECD 301B' : 'Industrial Standard'}
                </span>
              </div>
              <div className="bg-black/60 p-3">
                <span className="block text-[8px] text-[#888] uppercase">Packaging</span>
                <span className="text-cyan-400 text-sm font-medium">5L / 20L / 200L / IBC</span>
              </div>
            </div>

            {/* Direct Order Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-xl">
              <Link
                href={`/contact?subject=Price%20Request%20for%20${encodeURIComponent(chemical.name)}`}
                className="flex-1 flex items-center justify-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white py-4 px-8 text-xs uppercase tracking-widest font-mono transition-all shadow-lg"
              >
                <span>Request Pricing &amp; Bulk Order</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/parts-attachments/chemicals"
                className="flex items-center justify-center gap-2 border border-white/30 hover:border-white bg-white/5 backdrop-blur-sm text-white py-4 px-6 text-xs uppercase tracking-widest font-mono transition-colors"
              >
                <span>Shop Retail Store</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Telemetry Strip */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-ibm-plex-mono text-[#AAA]">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-alkota-orange" />
            <span>Master Formula {chemical.code || 'HYDRUS-UK'} · Genuine Alkota Formulation</span>
          </div>
          <span>Next-Day UK Mainland Delivery on All Standard Drums</span>
        </div>
      </section>

      {/* ── 02: TECHNICAL PROFILE & FORMULATION SPECIFICATION ── */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* ─── LEFT COLUMN: PRODUCT TECHNICAL PROFILE (7 cols) ───────── */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Formulation Overview & Engineering Story */}
              <div className="space-y-4">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block">
                  // TECHNICAL PROFILE &amp; FORMULATION SCIENCE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extralight uppercase tracking-tight text-white">
                  Chemical Purpose &amp; Action
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
                      Important Surface Restrictions &amp; Metallurgy Cautions
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
                    // DOSING &amp; DILUTION CALCULATOR
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

            {/* ─── RIGHT COLUMN: DENSE SPECIFICATION & SAFETY (5 cols) ─── */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
              {/* Safety & GB CLP / COSHH Documentation Box */}
              <div className="bg-[#141412] border border-[#262626] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#222]">
                  <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange font-bold flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>GB CLP &amp; Safety Data</span>
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

              {/* Available Formats & Quick Quote */}
              <div className="bg-[#141414] border border-[#262626] p-6 space-y-4">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] block font-medium">
                  Direct Dispatch Formats
                </span>
                <p className="text-xs text-[#AAA] leading-relaxed">
                  Available in 5L polycans, 20L drums, 200L barrels, and 1000L palletised IBC containers with next-day UK dispatch.
                </p>
                <div className="pt-2">
                  <Link
                    href={`/contact?subject=Price%20Request%20for%20${encodeURIComponent(chemical.name)}`}
                    className="w-full flex items-center justify-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white py-3 font-mono text-xs uppercase tracking-widest transition-colors"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
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
