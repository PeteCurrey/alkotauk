import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getProductBySlug, getProducts, CANONICAL_CATEGORIES } from '@/lib/products';
import { 
  Droplets, 
  ShieldCheck, 
  Zap, 
  Phone,
  Settings,
  Trophy,
  ArrowRight,
  Thermometer,
  Gauge,
  Truck,
  FileText,
  Download,
  CheckCircle2,
  Cpu,
  Layers,
  Flame
} from "lucide-react";
import { resolveMachineImage } from '@/lib/images';

interface MachineDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: MachineDetailPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const machine = await getProductBySlug(slug);
  if (!machine) return {};

  const bar = machine.pressure_bar ? `${machine.pressure_bar} Bar` : '';
  const lpm = machine.flow_rate_lpm ? `${machine.flow_rate_lpm} L/min` : '';
  const specSummary = [bar, lpm].filter(Boolean).join(' • ');

  return {
    title: `Alkota ${machine.model_code || machine.name} | ${specSummary ? `${specSummary} ` : ''}Industrial Specification | Alkota UK`,
    description: machine.uk_description || machine.description || `Industrial ${machine.category} cleaning machine engineered by Alkota.`,
    alternates: {
      canonical: `https://alkota.co.uk/machines/${category}/${slug}`,
    },
    openGraph: {
      title: `Alkota ${machine.model_code || machine.name} — Industrial Specification`,
      description: machine.tagline || machine.description || 'Industrial cleaning equipment built in South Dakota for the UK.',
      images: machine.primary_image_url ? [{ url: machine.primary_image_url }] : [],
    }
  };
}

export default async function MachineDetailPage({ params }: MachineDetailPageProps) {
  const { category, slug } = await params;
  const machine = await getProductBySlug(slug);

  if (!machine) {
    notFound();
  }

  // Fetch related machines from the same category
  const relatedMachines = (await getProducts({ category: machine.category, limit: 4 }))
    .filter(m => m.slug !== machine.slug)
    .slice(0, 3);

  const catInfo = CANONICAL_CATEGORIES[machine.category];
  const categoryLabel = catInfo?.name || category.replace('-', ' ');

  const gpm = machine.flow_rate_gpm || 0;
  const lpm = machine.flow_rate_lpm || (gpm ? Number((gpm * 3.785).toFixed(1)) : '—');
  const psi = machine.pressure_psi || 0;
  const bar = machine.pressure_bar || (psi ? Math.round(psi / 14.5) : '—');

  const modelCode = machine.model_code || machine.name.replace(/^Alkota\s+/i, '');
  const imageUrl = resolveMachineImage(machine.primary_image_url, modelCode, machine.category);

  // Structured Data (Schema.org Product)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Alkota ${modelCode}`,
    model: modelCode,
    image: imageUrl,
    description: machine.uk_description || machine.description || 'Industrial pressure washing equipment',
    brand: {
      '@type': 'Brand',
      name: 'Alkota'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Alkota Cleaning Systems Inc.'
    },
    category: categoryLabel,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: `https://alkota.co.uk/machines/${category}/${slug}`
    }
  };

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0 overflow-x-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      
      {/* Background Watermark */}
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
              { label: modelCode }
            ]} 
          />
        </div>

        {/* ── 1. PRODUCT HERO ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20 items-center">
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-white to-alkota-steel/40 border border-alkota-iron flex items-center justify-center p-8 shadow-sm">
              {machine.is_elite_series && (
                <div className="absolute top-6 left-6 z-20 bg-alkota-orange px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-md">
                  Elite Series Specification
                </div>
              )}
              <img 
                src={imageUrl} 
                alt={`Alkota ${modelCode} Industrial Cleaning Machine`} 
                className="max-h-[85%] max-w-[85%] object-contain filter drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-6 right-6">
                <span className="font-ibm-plex-mono text-[9px] font-bold text-alkota-silver uppercase tracking-[0.3em]">
                  MADE IN SOUTH DAKOTA, USA
                </span>
              </div>
            </div>

            {/* Document / Brochure Links */}
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
                >
                  Download PDF <Download className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* Core Machine Details & Positioning (5 cols) */}
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
              {machine.tagline || machine.short_description || `${modelCode} — Precision engineered for continuous heavy industrial duty.`}
            </p>

            {/* Glanceable Hero Metric Grid */}
            <div className="mb-10 grid grid-cols-2 gap-px bg-alkota-iron border border-alkota-iron">
              <div className="bg-white p-5">
                <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-smoke block mb-1">
                  Operating Pressure
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-barlow-condensed text-4xl font-black italic text-alkota-black">{bar}</span>
                  <span className="font-ibm-plex-mono text-xs font-bold text-alkota-orange">BAR</span>
                  <span className="text-[10px] text-alkota-silver ml-1">({psi} PSI)</span>
                </div>
              </div>
              <div className="bg-white p-5">
                <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-smoke block mb-1">
                  Water Flow Rate
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-barlow-condensed text-4xl font-black italic text-alkota-black">{lpm}</span>
                  <span className="font-ibm-plex-mono text-xs font-bold text-alkota-orange">L/MIN</span>
                  <span className="text-[10px] text-alkota-silver ml-1">({gpm} GPM)</span>
                </div>
              </div>
              <div className="bg-white p-5">
                <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-smoke block mb-1">
                  Power Source
                </span>
                <span className="font-barlow-condensed text-xl font-black italic text-alkota-black uppercase">
                  {machine.power_source || machine.voltage || 'Industrial Spec'}
                </span>
              </div>
              <div className="bg-white p-5">
                <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-widest text-alkota-smoke block mb-1">
                  Heating / Thermal
                </span>
                <span className="font-barlow-condensed text-xl font-black italic text-alkota-black uppercase">
                  {machine.heating_fuel || (machine.category === 'hot-water' ? 'Diesel Fired' : 'Cold Water')}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#quote"
                className="flex-1 flex items-center justify-center gap-3 bg-alkota-orange p-5 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange-hover transition-all"
              >
                Request Quotation
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link 
                href={`/contact?enquiry=consultation&product=${machine.slug}&model=${modelCode}`}
                className="flex-1 flex items-center justify-center gap-3 bg-alkota-black p-5 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-neutral-800 transition-all"
              >
                Technical Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* ── 2. ENGINEERING STORY & HERITAGE ───────────────────────────────── */}
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
              <p>
                {machine.uk_description || machine.description}
              </p>
              <p>
                {machine.engineering_story}
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. ENGINEERING PILLARS / COMPONENT DEEP DIVE ─────────────────── */}
        <section className="mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-alkota-iron border border-alkota-iron">
            <div className="bg-white p-8">
              <Layers className="h-6 w-6 text-alkota-orange mb-6" />
              <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">
                {machine.pump_type?.split('|')[0] || 'Ceramic Plunger Pump'}
              </h4>
              <p className="font-inter text-xs text-alkota-silver leading-relaxed">
                Oil-bath crankcase and ceramic plungers running at lower RPM for cooler, vibration-damped longevity.
              </p>
            </div>

            <div className="bg-white p-8">
              <Flame className="h-6 w-6 text-alkota-orange mb-6" />
              <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">
                {machine.coil_type || 'Schedule 80 Coil'}
              </h4>
              <p className="font-inter text-xs text-alkota-silver leading-relaxed">
                Hydro-insulated cold water wrap pre-heats water, protects operators, and eliminates thermal coil stress.
              </p>
            </div>

            <div className="bg-white p-8">
              <Trophy className="h-6 w-6 text-alkota-orange mb-6" />
              <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">
                7-Year Coil Warranty
              </h4>
              <p className="font-inter text-xs text-alkota-silver leading-relaxed">
                The benchmark in industrial heating reliability. While competitors offer 1–2 years, Alkota guarantees 7.
              </p>
            </div>

            <div className="bg-white p-8">
              <ShieldCheck className="h-6 w-6 text-alkota-orange mb-6" />
              <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-2">
                Welded Steel Chassis
              </h4>
              <p className="font-inter text-xs text-alkota-silver leading-relaxed">
                Heavy-gauge welded structural steel frame with powder coat finish built to survive demanding site environments.
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. COMPLETE STRUCTURED TECHNICAL SPECIFICATION TABLE ─────────── */}
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
            <span className="font-ibm-plex-mono text-xs text-alkota-silver uppercase tracking-widest">
              MODEL: {modelCode}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-alkota-iron border border-alkota-iron bg-white">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-alkota-iron">
                <tr className="hover:bg-alkota-bg transition-colors">
                  <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Water Flow Rate</td>
                  <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">{lpm} L/min ({gpm} GPM)</td>
                </tr>
                <tr className="hover:bg-alkota-bg transition-colors">
                  <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Operating Pressure</td>
                  <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">{bar} bar ({psi} PSI)</td>
                </tr>
                <tr className="hover:bg-alkota-bg transition-colors">
                  <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Power Supply / Voltage</td>
                  <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">{machine.voltage || '230V / 1PH'}</td>
                </tr>
                {machine.motor_hp && (
                  <tr className="hover:bg-alkota-bg transition-colors">
                    <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Motor Output</td>
                    <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">{machine.motor_kw ? `${machine.motor_kw} kW` : ''} ({machine.motor_hp} HP)</td>
                  </tr>
                )}
                {machine.burner_btu && (
                  <tr className="hover:bg-alkota-bg transition-colors">
                    <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Thermal Heat Output</td>
                    <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">{machine.burner_btu.toLocaleString()} BTU</td>
                  </tr>
                )}
                {machine.heating_fuel && (
                  <tr className="hover:bg-alkota-bg transition-colors">
                    <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Heating Fuel Type</td>
                    <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">{machine.heating_fuel}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-alkota-iron">
                <tr className="hover:bg-alkota-bg transition-colors">
                  <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Unit Weight</td>
                  <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">{machine.weight_kg ? `${machine.weight_kg} kg` : ''} ({machine.weight_lbs || '—'} lbs)</td>
                </tr>
                {machine.dimensions_mm && (
                  <tr className="hover:bg-alkota-bg transition-colors">
                    <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Dimensions</td>
                    <td className="p-4 px-6 font-barlow-condensed text-lg font-black text-alkota-black italic text-right">{machine.dimensions_mm}</td>
                  </tr>
                )}
                <tr className="hover:bg-alkota-bg transition-colors">
                  <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Mobility / Mounting</td>
                  <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">{machine.mobility || (machine.portable ? 'Portable' : 'Stationary')}</td>
                </tr>
                <tr className="hover:bg-alkota-bg transition-colors">
                  <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Coil Warranty</td>
                  <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">7 Years (Hydro-Insulated)</td>
                </tr>
                <tr className="hover:bg-alkota-bg transition-colors">
                  <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Pump Style</td>
                  <td className="p-4 px-6 font-barlow-condensed text-base font-black text-alkota-black italic text-right">{machine.pump_type || 'Triplex Ceramic'}</td>
                </tr>
                <tr className="hover:bg-alkota-bg transition-colors">
                  <td className="p-4 px-6 font-ibm-plex-mono text-xs font-bold text-alkota-silver uppercase tracking-wider">Duty Rating</td>
                  <td className="p-4 px-6 font-barlow-condensed text-xl font-black text-alkota-black italic text-right">Continuous Industrial Duty</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 5. APPLICATIONS & FEATURES ───────────────────────────────────── */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Applications */}
          <div className="bg-white border border-alkota-iron p-10">
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-4">
              // APPLICATION SUITABILITY
            </span>
            <h4 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-6">
              Primary Industrial Use Cases
            </h4>
            <div className="space-y-3">
              {(machine.applications || ['Heavy Fleet Degreasing', 'Machinery Washdown', 'Facility Maintenance']).map((app, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />
                  <span className="font-inter text-xs text-alkota-black font-semibold uppercase tracking-wider">{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white border border-alkota-iron p-10">
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-4">
              // FACTORY INCLUSIONS
            </span>
            <h4 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-6">
              Standard Engineering Features
            </h4>
            <div className="space-y-3">
              {(machine.features || ['Schedule 80 Hydro-Insulated Coil', 'Soft Damping System', 'Ceramic Plungers']).slice(0, 5).map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-alkota-black shrink-0" />
                  <span className="font-inter text-xs text-alkota-silver uppercase tracking-wider">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. RELATED MACHINES ──────────────────────────────────────────── */}
        {relatedMachines.length > 0 && (
          <section className="mt-40">
            <div className="mb-12 flex items-center justify-between border-b border-alkota-iron pb-6">
              <div>
                <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-2">
                  // FLEET ALTERNATIVES
                </span>
                <h3 className="font-barlow-condensed text-4xl font-black uppercase italic text-alkota-black">
                  Related {categoryLabel}
                </h3>
              </div>
              <Link href={`/machines/${category}`} className="text-xs font-black uppercase tracking-widest text-alkota-orange hover:underline">
                View All {categoryLabel} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
              {relatedMachines.map((rel, i) => (
                <div key={rel.slug} className="bg-white p-8 flex flex-col justify-between group hover:bg-alkota-steel/40 transition-colors">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] font-bold text-alkota-orange uppercase tracking-widest block mb-2">
                      {rel.model_code}
                    </span>
                    <h5 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-4">
                      {rel.name}
                    </h5>
                    <p className="font-inter text-[11px] text-alkota-silver line-clamp-2 uppercase tracking-wider mb-6">
                      {rel.tagline || rel.description}
                    </p>
                  </div>
                  <Link 
                    href={`/machines/${rel.category}/${rel.slug}`}
                    className="flex items-center justify-between border border-alkota-iron p-3 text-[10px] font-black uppercase tracking-widest text-alkota-black group-hover:bg-alkota-orange group-hover:text-white group-hover:border-alkota-orange transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 7. QUOTE & CONSULTATION CHANNEL ──────────────────────────────── */}
        <section id="quote" className="mt-40 py-32 border-t border-alkota-iron">
          <div className="bg-alkota-black text-white p-12 md:p-16 border border-alkota-iron">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.3em] text-alkota-orange block mb-4">
                  // DIRECT ACQUISITION & CONSULTATION
                </span>
                <h3 className="font-barlow-condensed text-5xl md:text-6xl font-black uppercase italic text-white leading-none mb-6">
                  SPECIFY THE <span className="text-alkota-orange">{modelCode}.</span>
                </h3>
                <p className="font-inter text-sm text-alkota-smoke leading-relaxed max-w-xl">
                  Connect directly with Alkota UK application engineers to verify flow rates, power supplies, wash bay layouts, or trailer integration. We provide direct factory quotations and technical advice.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
                <Link 
                  href={`/contact?enquiry=quote&product=${machine.slug}&model=${modelCode}`}
                  className="flex items-center justify-center gap-4 bg-alkota-orange p-6 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange-hover transition-colors"
                >
                  <span>Request Factory Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href={`/contact?enquiry=service&product=${machine.slug}`}
                  className="flex items-center justify-center gap-4 border border-white/20 p-6 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-white hover:text-alkota-black transition-colors"
                >
                  <span>Book Engineering Review</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
