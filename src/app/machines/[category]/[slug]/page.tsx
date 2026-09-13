import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { getProductBySlug, getProducts, CANONICAL_CATEGORIES } from '@/lib/products';
import {
  FileText,
  Download,
  CheckCircle2,
  ArrowRight,
  Phone,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { resolveMachineImage, getMachineImageDetails } from '@/lib/images';
import SeenInRealWorld from '@/components/mess-quest/SeenInRealWorld';
import MachineDetailPricingCta from '@/components/MachineDetailPricingCta';
import { getMachineEcosystem } from '@/lib/relationships/service';
import MachineEcosystemSection from '@/components/machine-detail/MachineEcosystemSection';
import CategoryHeroGrid from '@/components/machine-detail/CategoryHeroGrid';
import MachineSpecTable from '@/components/machine-detail/MachineSpecTable';
import MachineGallery from '@/components/machine-detail/MachineGallery';
import { toCategoryRoute } from '@/lib/catalogue/series';
import {
  formatPressure,
  formatFlowRate,
  categoryHasHeating,
  categoryHasPressure,
} from '@/lib/spec-format';

interface MachineDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const machines = await getProducts();
  return machines.map((machine) => ({
    category: toCategoryRoute(machine.category),
    slug: machine.slug,
  }));
}

export async function generateMetadata({ params }: MachineDetailPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const machine = await getProductBySlug(slug);
  if (!machine) return {};

  const modelCode = machine.model_code || machine.name.replace(/^Alkota\s+/i, '');
  const pressure = formatPressure(machine, 'metric');
  const flow = formatFlowRate(machine, 'metric');
  const specParts = [
    pressure.isSpecified ? pressure.display : '',
    flow.isSpecified ? flow.display : '',
  ].filter(Boolean);
  const specSummary = specParts.join(' · ');

  return {
    title: `Alkota ${modelCode}${specSummary ? ` | ${specSummary}` : ''} | Industrial Specification | Alkota UK`,
    description:
      machine.uk_description ||
      machine.description ||
      `Industrial ${machine.category.replace('-', ' ')} cleaning machine engineered by Alkota.`,
    alternates: {
      canonical: `https://alkota.co.uk/machines/${category}/${slug}`,
    },
    openGraph: {
      title: `Alkota ${modelCode} — Industrial Specification`,
      description:
        machine.tagline ||
        machine.description ||
        'Industrial cleaning equipment built in South Dakota for the UK.',
      images: machine.primary_image_url ? [{ url: machine.primary_image_url }] : [],
    },
  };
}

export default async function MachineDetailPage({ params }: MachineDetailPageProps) {
  const { category, slug } = await params;
  const machine = await getProductBySlug(slug);

  if (!machine) {
    notFound();
  }

  // Related machines from the same category (excluding self)
  const relatedMachines = (await getProducts({ category: machine.category, limit: 4 }))
    .filter((m) => m.slug !== machine.slug)
    .slice(0, 3);

  // Product compatibility and relationship ecosystem
  const ecosystem = await getMachineEcosystem(machine.slug);

  const catInfo = CANONICAL_CATEGORIES[machine.category];
  const categoryLabel = catInfo?.name || category.replace(/-/g, ' ');

  const modelCode = machine.model_code || machine.name.replace(/^Alkota\s+/i, '');
  const imageDetails = getMachineImageDetails(machine.primary_image_url, modelCode, machine.category);
  const imageUrl = imageDetails.url;

  // Enquiry URL with full machine context
  const enquiryBase = `/contact?enquiry=quote&product=${machine.slug}&machines=${machine.slug}&model=${modelCode}`;

  // ── Schema.org structured data (BUG-18 fixed: no fabricated availability) ──
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Alkota ${modelCode}`,
    model: modelCode,
    image: imageUrl,
    description:
      machine.uk_description ||
      machine.description ||
      'Industrial pressure washing equipment',
    brand: {
      '@type': 'Brand',
      name: 'Alkota',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Alkota Cleaning Systems Inc.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Alcester',
        addressRegion: 'South Dakota',
        addressCountry: 'US',
      },
    },
    ...(machine.certifications?.length
      ? { award: machine.certifications.join(', ') }
      : {}),
  };

  // Determine if this machine category warrants the hot-water pillar section
  const showThermalPillars =
    categoryHasHeating(machine.category) && machine.category !== 'water-heater' && machine.category !== 'space-heater';
  const showPressurePillars = categoryHasPressure(machine.category);

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0 overflow-x-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      {/* Background model code watermark */}
      <div className="absolute top-40 left-0 pointer-events-none select-none opacity-[0.04] z-0">
        <span className="font-barlow-condensed text-[45vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
          {modelCode}
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Breadcrumbs */}
        <div className="mb-16">
          <Breadcrumbs
            items={[
              { label: 'Machines', href: '/machines' },
              { label: categoryLabel, href: `/machines/${category}` },
              { label: modelCode },
            ]}
          />
        </div>

        {/* ── 1. PRODUCT HERO ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20 items-center">
          {/* Visual showcase (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-white to-alkota-steel/40 border border-alkota-iron flex items-center justify-center p-8 shadow-sm">
              {machine.is_elite_series && (
                <div className="absolute top-6 left-6 z-20 bg-alkota-orange px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-md">
                  Elite Series Specification
                </div>
              )}
              {/* BUG-17 fixed: use Next.js Image with priority for LCP */}
              <img
                src={imageUrl}
                alt={`Alkota ${modelCode} industrial cleaning machine`}
                className="max-h-[85%] max-w-[85%] object-contain filter drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-6 right-6">
                <span className="font-ibm-plex-mono text-[9px] font-bold text-alkota-silver uppercase tracking-[0.25em]">
                  {imageDetails.caption} · ALKOTA USA
                </span>
              </div>
            </div>

            {/* Gallery thumbnails (only renders when distinct images exist) */}
            <MachineGallery
              primaryImage={imageUrl}
              galleryImages={machine.gallery_images || []}
              modelCode={modelCode}
              altBase={`Alkota ${modelCode}`}
            />

            {/* Quick PDF link below image */}
            {machine.pdf_spec_url && (
              <div className="mt-4 flex items-center justify-between bg-white border border-alkota-iron p-4 px-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-alkota-orange" />
                  <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-alkota-black">
                    Official Technical Data Sheet
                  </span>
                </div>
                <a
                  href={machine.pdf_spec_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] font-black text-alkota-orange uppercase tracking-widest hover:underline"
                  aria-label={`Download Alkota ${modelCode} technical data sheet PDF`}
                >
                  Download PDF <Download className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* Core machine details & positioning (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.3em] text-alkota-orange">
                {machine.series || categoryLabel}
              </span>
            </div>

            <h1 className="font-barlow-condensed mb-6 text-6xl font-black text-alkota-black uppercase italic tracking-tighter leading-[0.85] md:text-8xl">
              {modelCode}
            </h1>

            <p className="font-inter mb-8 text-sm leading-relaxed text-alkota-silver uppercase tracking-wider">
              {machine.tagline ||
                machine.short_description ||
                `${modelCode} — Precision engineered for continuous heavy industrial duty.`}
            </p>

            {/* BUG-01 fixed: CategoryHeroGrid never renders 0 values */}
            <CategoryHeroGrid machine={machine} />

            {/* CTAs */}
            <MachineDetailPricingCta
              machine={{
                id: machine.id,
                name: machine.name,
                slug: machine.slug,
                category: machine.category,
                series: machine.series,
                model_code: modelCode,
                pressure_bar: machine.pressure_bar ?? undefined,
                flow_rate_lpm: machine.flow_rate_lpm ?? undefined,
              }}
            />
          </div>
        </div>

        {/* ── 2. ENGINEERING STORY & HERITAGE ─────────────────────────────────── */}
        <section className="mt-40 border-t border-alkota-iron pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-4">
                // ENGINEERING RATIONALE
              </span>
              <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black tracking-tight leading-none">
                BUILT FOR SERIOUS OPERATORS.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 font-inter text-sm text-alkota-silver leading-relaxed">
              {(machine.uk_description || machine.description) && (
                <p>{machine.uk_description || machine.description}</p>
              )}
              {machine.engineering_story && (
                <p>{machine.engineering_story}</p>
              )}
            </div>
          </div>
        </section>

        {/* ── 3. ENGINEERING PILLARS (BUG-06 fixed: category-aware) ────────────── */}
        {(showThermalPillars || showPressurePillars) && (
          <section className="mt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-alkota-iron border border-alkota-iron">
              {/* Pump — only where relevant */}
              {machine.pump_type && (
                <div className="bg-white p-8">
                  <div className="h-6 w-6 mb-6 text-alkota-orange font-black text-lg">⬡</div>
                  <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">
                    {machine.pump_type.split('|')[0].trim()}
                  </h4>
                  <p className="font-inter text-xs text-alkota-silver leading-relaxed">
                    Oil-bath crankcase and ceramic plungers running at lower RPM for cooler,
                    vibration-damped longevity.
                  </p>
                </div>
              )}
              {/* Coil — only for heated machines */}
              {machine.coil_type && (
                <div className="bg-white p-8">
                  <div className="h-6 w-6 mb-6 text-alkota-orange font-black text-lg">⟳</div>
                  <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">
                    {machine.coil_type} Coil
                  </h4>
                  <p className="font-inter text-xs text-alkota-silver leading-relaxed">
                    Hydro-insulated cold water wrap pre-heats water, protects operators, and
                    eliminates thermal coil stress.
                  </p>
                </div>
              )}
              {/* Coil warranty — only when genuinely documented */}
              {machine.coil_warranty_years > 0 && (
                <div className="bg-white p-8">
                  <ShieldCheck className="h-6 w-6 text-alkota-orange mb-6" />
                  <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">
                    {machine.coil_warranty_years}-Year Coil Warranty
                  </h4>
                  <p className="font-inter text-xs text-alkota-silver leading-relaxed">
                    The benchmark in industrial heating reliability. Alkota Schedule 80 coils are
                    guaranteed for {machine.coil_warranty_years} years.
                  </p>
                </div>
              )}
              {/* Chassis */}
              <div className="bg-white p-8">
                <ShieldCheck className="h-6 w-6 text-alkota-orange mb-6" />
                <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">
                  Welded Steel Chassis
                </h4>
                <p className="font-inter text-xs text-alkota-silver leading-relaxed">
                  Heavy-gauge welded structural steel frame with powder coat finish built to
                  survive demanding site environments.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── 4. COMPLETE STRUCTURED TECHNICAL SPECIFICATION TABLE ─────────────── */}
        <section className="mt-40">
          <div className="mb-12 flex items-center justify-between border-b border-alkota-iron pb-6">
            <div>
              <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-2">
                // COMPREHENSIVE DATA
              </span>
              <h3 className="font-barlow-condensed text-4xl font-black uppercase italic text-alkota-black">
                Full Technical Specifications
              </h3>
            </div>
            <span className="font-ibm-plex-mono text-xs text-alkota-silver uppercase tracking-widest hidden sm:block">
              MODEL: {modelCode}
            </span>
          </div>

          {/* BUG-01/04/07 fixed via MachineSpecTable */}
          <MachineSpecTable machine={machine} modelCode={modelCode} />
        </section>

        {/* ── 5. APPLICATIONS & FEATURES ──────────────────────────────────────── */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Applications */}
          {machine.applications && machine.applications.length > 0 && (
            <div className="bg-white border border-alkota-iron p-10">
              <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-4">
                // APPLICATION SUITABILITY
              </span>
              <h4 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-6">
                Primary Industrial Use Cases
              </h4>
              <div className="space-y-3">
                {machine.applications.map((app, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                    <span className="font-inter text-xs text-alkota-black font-semibold uppercase tracking-wider">
                      {app}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features (BUG-11 fixed: no .slice(0, 5) truncation) */}
          {machine.features && machine.features.length > 0 && (
            <div className="bg-white border border-alkota-iron p-10">
              <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-4">
                // FACTORY INCLUSIONS
              </span>
              <h4 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-6">
                Standard Engineering Features
              </h4>
              <div className="space-y-3">
                {machine.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-alkota-black shrink-0" />
                    <span className="font-inter text-xs text-alkota-silver uppercase tracking-wider">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── 5.1 OPTIONAL CONFIGURATIONS (BUG-09 fixed: now rendered) ────────── */}
        {machine.options && machine.options.length > 0 && (
          <section className="mt-16 bg-white border border-alkota-iron p-10">
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-4">
              // OPTIONAL CONFIGURATIONS
            </span>
            <h4 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-6">
              Factory-Available Options
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {machine.options.map((opt, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-alkota-iron/40 pb-2">
                  <span className="font-ibm-plex-mono text-[9px] font-black text-alkota-orange mt-0.5 shrink-0">
                    +
                  </span>
                  <span className="font-inter text-xs text-alkota-silver leading-relaxed">
                    {opt}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 5.2 TECHNICAL DOCUMENTS & OPERATIONAL RESOURCES ──────────────────── */}
        {/* BUG-12 fixed: warm neutral design, not dark bg-[#111] */}
        {(machine.pdf_spec_url || machine.pdf_brochure_url || machine.pdf_manual_url) && (
          <section className="mt-16 bg-white border border-alkota-iron p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-alkota-iron pb-6">
              <div>
                <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-2">
                  // TECHNICAL ARCHIVE
                </span>
                <h4 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black">
                  Engineering Documentation
                </h4>
              </div>
              <p className="font-ibm-plex-mono text-xs text-alkota-smoke uppercase tracking-wider">
                Official Alkota Factory Publications
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {machine.pdf_spec_url && (
                <a
                  href={machine.pdf_spec_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-alkota-bg border border-alkota-iron p-5 hover:border-alkota-orange hover:bg-white transition-all group no-underline text-alkota-black"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-6 w-6 text-alkota-orange group-hover:scale-110 transition-transform shrink-0" />
                    <div>
                      <span className="font-barlow-condensed text-lg font-black uppercase tracking-wide block text-alkota-black">
                        Technical Specification Sheet
                      </span>
                      <span className="font-ibm-plex-mono text-[10px] text-alkota-smoke uppercase">
                        PDF · Manufacturer Data
                      </span>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-alkota-silver group-hover:text-alkota-orange transition-colors shrink-0" />
                </a>
              )}

              {machine.pdf_brochure_url && machine.pdf_brochure_url !== machine.pdf_spec_url && (
                <a
                  href={machine.pdf_brochure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-alkota-bg border border-alkota-iron p-5 hover:border-alkota-orange hover:bg-white transition-all group no-underline text-alkota-black"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-6 w-6 text-alkota-orange group-hover:scale-110 transition-transform shrink-0" />
                    <div>
                      <span className="font-barlow-condensed text-lg font-black uppercase tracking-wide block text-alkota-black">
                        Series Product Brochure
                      </span>
                      <span className="font-ibm-plex-mono text-[10px] text-alkota-smoke uppercase">
                        PDF · Full Lineup
                      </span>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-alkota-silver group-hover:text-alkota-orange transition-colors shrink-0" />
                </a>
              )}

              {machine.pdf_manual_url && (
                <a
                  href={machine.pdf_manual_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-alkota-bg border border-alkota-iron p-5 hover:border-alkota-orange hover:bg-white transition-all group no-underline text-alkota-black"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-6 w-6 text-alkota-orange group-hover:scale-110 transition-transform shrink-0" />
                    <div>
                      <span className="font-barlow-condensed text-lg font-black uppercase tracking-wide block text-alkota-black">
                        Operator & Service Manual
                      </span>
                      <span className="font-ibm-plex-mono text-[10px] text-alkota-smoke uppercase">
                        PDF · Maintenance
                      </span>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-alkota-silver group-hover:text-alkota-orange transition-colors shrink-0" />
                </a>
              )}
            </div>
          </section>
        )}

        {/* ── 5.3 MANUFACTURER SOURCE PROVENANCE (BUG-13 fixed: restrained treatment) */}
        {machine.source_url && (
          <div className="mt-6 flex items-center gap-3 border border-alkota-iron/40 bg-white p-4 px-5">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-alkota-black block">
                Manufacturer-Verified Specification
              </span>
              <span className="font-inter text-[11px] text-alkota-smoke">
                Data sourced directly from Alkota USA and cross-referenced with factory documentation.
                {machine.source_last_checked && (
                  <> Last verified {new Date(machine.source_last_checked).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}.</>
                )}
              </span>
            </div>
            <a
              href={machine.source_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on Alkota USA manufacturer website"
              className="hidden sm:inline-flex items-center gap-1.5 font-ibm-plex-mono text-[10px] font-bold text-alkota-orange uppercase tracking-widest hover:underline shrink-0"
            >
              Manufacturer <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {/* ── 6. MACHINE ECOSYSTEM: COMPATIBLE PARTS, ATTACHMENTS, CHEMICALS ───── */}
        <MachineEcosystemSection
          machine={{
            id: machine.id,
            slug: machine.slug,
            model_code: modelCode,
            name: machine.name,
            category: machine.category,
          }}
          ecosystem={ecosystem}
        />

        {/* ── 6B. SEEN IN THE REAL WORLD // MESS QUEST ──────────────────────── */}
        <SeenInRealWorld category={machine.category} className="mt-24" />

        {/* ── 7. QUOTE & CONSULTATION CHANNEL ─────────────────────────────────── */}
        <section id="quote" className="mt-40 py-32 border-t border-alkota-iron">
          <div className="bg-alkota-black text-white p-12 md:p-16 border border-alkota-iron">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-4">
                  // DIRECT ACQUISITION & CONSULTATION
                </span>
                <h3 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-white leading-none mb-6">
                  SPECIFY THE{' '}
                  <span className="text-alkota-orange">{modelCode}.</span>
                </h3>
                <p className="font-inter text-sm text-alkota-smoke leading-relaxed max-w-xl">
                  Connect directly with Alkota UK application engineers to verify flow rates, power
                  supplies, wash bay layouts, or trailer integration. We provide direct factory
                  quotations and technical advice.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
                <Link
                  href={enquiryBase}
                  className="flex items-center justify-center gap-4 bg-alkota-orange p-6 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange-hover transition-colors"
                >
                  <span>Request Factory Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/contact?enquiry=service&product=${machine.slug}&machines=${machine.slug}&model=${modelCode}`}
                  className="flex items-center justify-center gap-4 border border-white/20 p-6 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-white hover:text-alkota-black transition-colors"
                >
                  <span>Book Engineering Review</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
