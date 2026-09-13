import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import ComparisonDock from '@/components/comparison/ComparisonDock';
import MachineCard from '@/components/MachineCard';
import { CANONICAL_CATEGORIES } from '@/lib/products';
import { 
  getAllSeries, 
  getSeriesBySlug, 
  getSeriesByCategory, 
  fromCategoryRoute, 
  toCategoryRoute 
} from '@/lib/catalogue/series';
import { 
  Gauge, 
  Zap, 
  Flame, 
  Layers, 
  FileText, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

interface SeriesPageProps {
  params: Promise<{
    category: string;
    series: string;
  }>;
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries();
  return allSeries.map(s => ({
    category: s.categorySlug,
    series: s.slug
  }));
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { category, series: seriesSlug } = await params;
  const series = await getSeriesBySlug(category, seriesSlug);

  if (!series) return {};

  const catInfo = CANONICAL_CATEGORIES[series.category];
  const catTitle = catInfo?.name || category;

  const pressureSpan = series.minPressureBar && series.maxPressureBar
    ? `${series.minPressureBar === series.maxPressureBar ? `${series.minPressureBar} BAR` : `${series.minPressureBar}–${series.maxPressureBar} BAR`}`
    : '';

  const title = `${series.displayName} | ${catTitle} | Alkota UK`;
  const description = series.description || `Explore the Alkota ${series.displayName} range (${series.modelCount} models, ${pressureSpan}). Engineered in Alcester, SD for continuous industrial operation in the UK.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://alkota.co.uk/machines/${toCategoryRoute(category)}/series/${series.slug}`,
    },
    openGraph: {
      title: `${series.displayName} — Alkota UK Industrial Fleet`,
      description,
      type: 'website',
      images: series.representativeImage ? [series.representativeImage] : [],
    }
  };
}

export default async function SeriesDetailPage({ params }: SeriesPageProps) {
  const { category, series: seriesSlug } = await params;
  const dbCategory = fromCategoryRoute(category);
  
  const [series, siblingSeries] = await Promise.all([
    getSeriesBySlug(category, seriesSlug),
    getSeriesByCategory(dbCategory)
  ]);

  if (!series) {
    notFound();
  }

  const catInfo = CANONICAL_CATEGORIES[series.category];
  const catName = catInfo?.name || category;
  const otherSeries = siblingSeries.filter(s => s.slug !== series.slug);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#1A1A18] font-normal pb-0">
      <Navigation />

      {/* ── 01. SERIES HEADER & SPECIFICATION DOSSIER ─────────────────────── */}
      <header className="bg-white border-b border-[#E5E5E0] pt-28 pb-16 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: 'Machines', href: '/machines' },
              { label: catName, href: `/machines/${toCategoryRoute(category)}` },
              { label: series.displayName }
            ]}
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Series Identity & Details */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <Link
                  href={`/machines/${toCategoryRoute(category)}`}
                  className="font-mono text-xs text-[#FF6900] uppercase tracking-wider font-semibold hover:underline no-underline"
                >
                  {catName}
                </Link>
                <span className="text-[#CCC]">/</span>
                <span className="font-mono text-xs text-[#888] uppercase tracking-wider">
                  Manufacturer Series
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-light text-[#1A1A18] tracking-tight leading-none mb-4">
                {series.displayName}
              </h1>

              <p className="text-sm sm:text-base text-[#555] leading-relaxed mb-6 max-w-2xl font-normal">
                {series.description || `The Alkota ${series.displayName} represents continuous-duty American engineering. Engineered with ASTM A53 Schedule 80 cold-rolled heating coils, ceramic triplex plunger pumps, and robust industrial chassis designed for UK commercial and plant environments.`}
              </p>

              {/* Technical Envelopes Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs mb-8">
                {series.minPressureBar && (
                  <div className="bg-[#FAF9F5] border border-[#EAEAEA] p-3 rounded-[3px]">
                    <div className="flex items-center gap-1.5 text-[#888] text-[9px] uppercase tracking-wider mb-1">
                      <Gauge className="w-3.5 h-3.5 text-[#FF6900]" />
                      <span>Pressure Envelope</span>
                    </div>
                    <div className="text-sm font-bold text-[#1A1A18]">
                      {series.minPressureBar === series.maxPressureBar
                        ? `${series.minPressureBar} BAR`
                        : `${series.minPressureBar} – ${series.maxPressureBar} BAR`}
                    </div>
                    {series.minPressurePsi && (
                      <div className="text-[10px] text-[#888] font-normal mt-0.5">
                        {series.minPressurePsi === series.maxPressurePsi
                          ? `${series.minPressurePsi} PSI`
                          : `${series.minPressurePsi} – ${series.maxPressurePsi} PSI`}
                      </div>
                    )}
                  </div>
                )}

                {series.minFlowLpm && (
                  <div className="bg-[#FAF9F5] border border-[#EAEAEA] p-3 rounded-[3px]">
                    <div className="flex items-center gap-1.5 text-[#888] text-[9px] uppercase tracking-wider mb-1">
                      <Zap className="w-3.5 h-3.5 text-[#FF6900]" />
                      <span>Flow Volume</span>
                    </div>
                    <div className="text-sm font-bold text-[#1A1A18]">
                      {series.minFlowLpm === series.maxFlowLpm
                        ? `${series.minFlowLpm} L/M`
                        : `${series.minFlowLpm} – ${series.maxFlowLpm} L/M`}
                    </div>
                    {series.minFlowGpm && (
                      <div className="text-[10px] text-[#888] font-normal mt-0.5">
                        {series.minFlowGpm === series.maxFlowGpm
                          ? `${series.minFlowGpm} GPM`
                          : `${series.minFlowGpm} – ${series.maxFlowGpm} GPM`}
                      </div>
                    )}
                  </div>
                )}

                {series.powerSources.length > 0 && (
                  <div className="bg-[#FAF9F5] border border-[#EAEAEA] p-3 rounded-[3px] col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-1.5 text-[#888] text-[9px] uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FF6900]" />
                      <span>Drive Unit</span>
                    </div>
                    <div className="text-xs font-bold text-[#1A1A18] truncate" title={series.powerSources.join(', ')}>
                      {series.powerSources[0]}
                    </div>
                    <div className="text-[10px] text-[#888] font-normal mt-0.5">
                      {series.models.length} Model Configurations
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons & Documentation */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#models"
                  className="inline-flex items-center gap-2 bg-[#1A1A18] hover:bg-[#FF6900] text-white px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-[3px] transition-colors no-underline"
                >
                  <span>Explore All {series.modelCount} Models</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {series.sharedPdfUrl && (
                  <a
                    href={series.sharedPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF9F5] text-[#1A1A18] border border-[#DDD] px-4 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-[3px] transition-colors no-underline"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FF6900]" />
                    <span>Manufacturer Spec Sheet (PDF)</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right: Representative Equipment Photography */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative aspect-[4/3] w-full max-w-md bg-[#FAF9F5] border border-[#E5E5E0] rounded-[4px] p-8 flex items-center justify-center shadow-xs">
                <img
                  src={series.representativeImage}
                  alt={`${series.displayName} series equipment photography`}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md"
                />
                <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[#888] bg-white/90 px-2 py-0.5 rounded border border-[#EAEAEA]">
                  Official Alkota USA Asset
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 02. CONSTITUENT MODELS ROSTER ─────────────────────────────────── */}
      <section id="models" className="py-20 px-6 sm:px-12 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] block mb-1 font-semibold">
              SERIES LINEUP // {series.displayName}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-[#1A1A18] tracking-tight">
              Available Model Configurations ({series.modelCount})
            </h2>
          </div>
          <p className="font-mono text-xs text-[#888] uppercase tracking-wider">
            Compare models side-by-side or select to view complete technical blueprints
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {series.models.map((machine, idx) => (
            <MachineCard
              key={machine.id || machine.slug}
              machine={machine}
              index={idx}
            />
          ))}
        </div>

        {/* ── 03. DIRECT QUOTE & CONSULTATION CHANNEL ─────────────────────── */}
        <div className="bg-[#1A1A18] text-white p-8 sm:p-12 rounded-[4px] border border-[#333] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6900] block mb-2">
                Factory Engineering Support
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug mb-3">
                Specify or Customise Your {series.displayName} Machine
              </h3>
              <p className="text-xs sm:text-sm text-[#AAA] leading-relaxed max-w-xl">
                Alkota UK application specialists verify site electrical supply (single vs 3-phase), water header pressure, and wash bay layouts. We provide direct factory quotations and technical advice.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href={`/contact?enquiry=quote&series=${encodeURIComponent(series.series)}`}
                className="inline-flex items-center justify-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white p-3.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-[3px] transition-colors no-underline"
              >
                <span>Request Series Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/contact?enquiry=callback&series=${encodeURIComponent(series.series)}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white hover:text-[#1A1A18] text-white border border-white/20 p-3.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-[3px] transition-colors no-underline"
              >
                <span>Speak to an Engineer</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── 04. SIBLING SERIES IN THIS CATEGORY ─────────────────────────── */}
        {otherSeries.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E5E5E0]">
              <h3 className="text-lg font-medium text-[#1A1A18]">
                Other Series in {catName}
              </h3>
              <Link
                href={`/machines/${toCategoryRoute(category)}`}
                className="text-xs font-mono text-[#FF6900] uppercase tracking-wider hover:underline no-underline"
              >
                View Full Category ({catName}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherSeries.slice(0, 4).map((s) => (
                <Link
                  key={s.slug}
                  href={`/machines/${toCategoryRoute(category)}/series/${s.slug}`}
                  className="group bg-white border border-[#E5E5E0] hover:border-[#FF6900] p-4 rounded-[4px] transition-colors no-underline block"
                >
                  <div className="text-[10px] font-mono text-[#888] uppercase tracking-wider mb-1">
                    {s.modelCount} Models
                  </div>
                  <h4 className="text-sm font-medium text-[#1A1A18] group-hover:text-[#FF6900] transition-colors mb-1 truncate">
                    {s.displayName}
                  </h4>
                  <div className="text-xs font-mono text-[#FF6900] flex items-center gap-1 mt-2">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <ComparisonDock />
      <Footer />
    </main>
  );
}
