import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowDown, 
  ArrowLeft,
  ShieldCheck, 
  Gauge, 
  Thermometer, 
  Droplets, 
  Wrench, 
  Truck, 
  FlaskConical, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Play
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import MessQuestVideoPlayer from '@/components/mess-quest/MessQuestVideoPlayer';
import CleaningEquation from '@/components/mess-quest/CleaningEquation';
import { 
  getMessQuestEpisodeBySlug, 
  getAllMessQuestEpisodes, 
  getRelatedMessQuestEpisodes,
  MessQuestEpisode 
} from '@/lib/messQuestEpisodes';
import { getProductBySlug, CANONICAL_CATEGORIES } from '@/lib/products';
import { resolveMachineImage } from '@/lib/images';

interface EpisodePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ─── Static Params for SSG ─────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const episodes = getAllMessQuestEpisodes();
  return episodes.map((ep) => ({
    slug: ep.slug,
  }));
}

/* ─── SEO Metadata ──────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getMessQuestEpisodeBySlug(slug);

  if (!episode) return {};

  return {
    title: `${episode.title} | Mess Quest | Alkota UK`,
    description: `${episode.shortDescription} Watch genuine Alkota industrial pressure washers tackling extreme contamination. Explore the physics, equipment requirements, and cleaning chemistry.`,
    alternates: {
      canonical: `https://alkota.co.uk/mess-quest/${slug}`,
    },
    openGraph: {
      title: `${episode.title} — Mess Quest Case Study`,
      description: episode.shortDescription,
      url: `https://alkota.co.uk/mess-quest/${slug}`,
      siteName: 'Alkota UK',
      type: 'video.other',
      images: episode.thumbnail ? [{ url: episode.thumbnail }] : [],
    },
  };
}

/* ─── Page Component ─────────────────────────────────────────────────────────── */

export default async function EpisodeDetailPage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = getMessQuestEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const allEpisodes = getAllMessQuestEpisodes();
  const currentIndex = allEpisodes.findIndex((e) => e.slug === slug);
  const prevEpisode = currentIndex > 0 ? allEpisodes[currentIndex - 1] : allEpisodes[allEpisodes.length - 1];
  const nextEpisode = currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1] : allEpisodes[0];
  const relatedEpisodes = getRelatedMessQuestEpisodes(slug, 2);

  // Fetch real canonical product specs for recommended machine slugs
  const matchingProducts = await Promise.all(
    episode.editorialData.relatedProductSlugs.map(async (pSlug) => {
      const prod = await getProductBySlug(pSlug);
      return prod;
    })
  );
  const validProducts = matchingProducts.filter(Boolean);

  // Structured Data (VideoObject + BreadcrumbList + Article)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoObject',
        '@id': `https://alkota.co.uk/mess-quest/${episode.slug}#video`,
        name: episode.title,
        description: episode.shortDescription,
        thumbnailUrl: episode.thumbnail,
        uploadDate: episode.publishedDate || '2013-01-01',
        contentUrl: episode.youtubeUrl,
        embedUrl: `https://www.youtube-nocookie.com/embed/${episode.youtubeVideoId}`,
        publisher: {
          '@type': 'Organization',
          name: 'Alkota UK',
          url: 'https://alkota.co.uk',
          logo: 'https://alkota.co.uk/logo.png',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://alkota.co.uk',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Resources',
            item: 'https://alkota.co.uk/resources',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Mess Quest',
            item: 'https://alkota.co.uk/mess-quest',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: episode.title,
            item: `https://alkota.co.uk/mess-quest/${episode.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#F8F7F4] text-alkota-black font-normal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main>
        {/* ── 01. FULL-VIEWPORT HERO (DARK CINEMATIC) ─────────────────────────── */}
        <section
          className="relative min-h-[85vh] sm:min-h-screen w-full flex flex-col justify-between bg-[#0A0A08] text-white px-6 sm:px-12 pt-32 pb-16 overflow-hidden"
          aria-label={episode.title}
        >
          {/* Background imagery */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={episode.thumbnail}
              alt={episode.title}
              className="h-full w-full object-cover object-center scale-105"
              style={{ filter: 'brightness(0.38) contrast(1.15)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-transparent to-black/60" />
          </div>

          {/* Breadcrumbs & Provenance Header */}
          <div className="relative z-10 mx-auto max-w-7xl w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-8">
              <Breadcrumbs
                items={[
                  { label: 'Resources', href: '/resources' },
                  { label: 'Mess Quest', href: '/mess-quest' },
                  { label: `Episode ${episode.id}` },
                ]}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-alkota-orange">
                // {episode.sourceSummary}
              </span>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[2px] w-8 bg-alkota-orange" />
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-alkota-orange">
                  MESS QUEST · EPISODE {episode.id} // {episode.categoryFilter}
                </span>
              </div>

              <h1
                className="font-extralight uppercase tracking-tight text-white leading-[0.92] mb-6"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
              >
                {episode.title}
              </h1>

              <p className="text-white/80 text-base sm:text-xl leading-relaxed mb-10 max-w-2xl font-light">
                {episode.shortDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#player"
                  className="inline-flex items-center justify-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all group shadow-2xl no-underline"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Watch Episode Footage</span>
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a
                  href="#engineering"
                  className="inline-flex items-center justify-center gap-3 border border-white/35 bg-black/40 backdrop-blur-sm text-white px-7 py-4 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all no-underline"
                >
                  <span>Explore Engineering Breakdown</span>
                </a>
              </div>
            </div>
          </div>

          {/* Location & Metadata Bar */}
          <div className="relative z-10 mx-auto max-w-7xl w-full pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/60">
            <div className="flex items-center gap-6">
              <span>Location: <strong className="text-white font-normal">{episode.location}</strong></span>
              {episode.duration && <span>Duration: <strong className="text-white font-normal">{episode.duration}</strong></span>}
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest">
              Original Alkota Brand Property · Authentic Field Archive
            </div>
          </div>
        </section>

        {/* ── 02. FEATURE VIDEO PLAYER (DARK) ─────────────────────────────────── */}
        <section id="player" className="bg-[#0D0D0B] py-16 sm:py-24 px-6 sm:px-12 border-b border-[#1F1F1D]">
          <div className="mx-auto max-w-5xl w-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-alkota-orange block mb-1">
                  OFFICIAL FOOTAGE // YOUTUBE EMBED
                </span>
                <h2 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  Field Documentation.
                </h2>
              </div>
              <span className="hidden sm:inline-block font-mono text-xs text-[#888]">
                Alkota Cleaning Systems Inc.
              </span>
            </div>

            <MessQuestVideoPlayer
              youtubeVideoId={episode.youtubeVideoId}
              title={episode.title}
              thumbnail={episode.thumbnail}
            />

            {/* Fact Provenance Note */}
            <div className="mt-8 p-4 bg-[#141412] border border-[#222] text-[11px] text-[#888] flex items-start gap-3">
              <span className="text-alkota-orange font-mono font-bold mt-0.5">//</span>
              <p>
                <strong className="text-white font-normal">Content Provenance:</strong> The video above is original Alkota archive footage. The technical analysis, application physics, and machine requirement breakdown below represent Alkota UK engineering commentary to help UK operators specify suitable commercial cleaning systems.
              </p>
            </div>
          </div>
        </section>

        {/* ── 03. THE JOB (LIGHT EDITORIAL) ───────────────────────────────────── */}
        <section className="bg-white py-24 sm:py-32 px-6 sm:px-12 border-b border-[#E0E0DC]">
          <div className="mx-auto max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
              {/* Left: Section Header & Narrative */}
              <div className="lg:col-span-7">
                <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-4">
                  Field Challenge Analysis
                </span>
                <h2
                  className="font-extralight uppercase tracking-tight text-alkota-black leading-[0.95] mb-8"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
                >
                  The Job.
                </h2>
                <div className="space-y-5 text-base sm:text-lg text-[#555] leading-relaxed mb-10">
                  <p className="font-light text-xl text-alkota-black leading-snug">
                    {episode.editorialData.theJob.narrative}
                  </p>
                  <p>
                    {episode.editorialData.theJob.operationalImplications}
                  </p>
                </div>

                <div className="border-l-2 border-alkota-orange pl-6 py-2">
                  <p className="text-xs uppercase tracking-widest text-[#888] font-mono mb-1">
                    OPERATIONAL TAKEAWAY
                  </p>
                  <p className="text-sm sm:text-base text-alkota-black font-light leading-relaxed">
                    Industrial cleaning is rarely about blast pressure alone. In severe environments, the speed of turnaround is directly dictated by sensible heat and volumetric rinsing power.
                  </p>
                </div>
              </div>

              {/* Right: Technical Parameters Table */}
              <div className="lg:col-span-5 bg-[#F8F7F4] border border-[#E0E0DC] p-6 sm:p-8">
                <h3 className="text-xs uppercase tracking-[0.25em] text-alkota-black mb-6 font-mono font-medium pb-3 border-b border-[#E0E0DC]">
                  // APPLICATION SPECIFICATIONS
                </h3>

                <dl className="space-y-4 text-xs font-normal">
                  <div className="pb-3 border-b border-[#E8E8E4]">
                    <dt className="text-[#888] uppercase tracking-wider mb-1">Operating Environment</dt>
                    <dd className="text-alkota-black font-medium">{episode.editorialData.theJob.environment}</dd>
                  </div>
                  <div className="pb-3 border-b border-[#E8E8E4]">
                    <dt className="text-[#888] uppercase tracking-wider mb-1">Primary Contamination</dt>
                    <dd className="text-alkota-black font-medium">{episode.editorialData.theJob.contaminationType}</dd>
                  </div>
                  <div className="pb-3 border-b border-[#E8E8E4]">
                    <dt className="text-[#888] uppercase tracking-wider mb-1">Access & Physical Constraints</dt>
                    <dd className="text-alkota-black font-medium">{episode.editorialData.theJob.accessChallenge}</dd>
                  </div>
                  <div>
                    <dt className="text-[#888] uppercase tracking-wider mb-1">Job Scale & Operational Impact</dt>
                    <dd className="text-alkota-black font-medium">{episode.editorialData.theJob.scale}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04. WHY IT'S DIFFICULT (EDITORIAL BREAKDOWN) ─────────────────────── */}
        <section className="bg-[#FAF9F5] py-24 sm:py-32 px-6 sm:px-12 border-b border-[#E0E0DC]">
          <div className="mx-auto max-w-7xl w-full">
            <div className="mb-16 max-w-3xl">
              <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-mono font-medium">
                Physics & Substrate Challenges
              </span>
              <h2
                className="font-extralight uppercase tracking-tight text-alkota-black leading-[0.95]"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
              >
                Why this clean is difficult.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {episode.editorialData.difficultyFactors.map((factor, idx) => (
                <div
                  key={factor.title}
                  className="bg-white border border-[#E0E0DC] p-8 flex flex-col justify-between hover:border-alkota-orange transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-alkota-orange font-medium">
                        FACTOR // 0{idx + 1}
                      </span>
                      <AlertTriangle className="h-4 w-4 text-[#888] group-hover:text-alkota-orange transition-colors" />
                    </div>
                    <h3 className="font-light text-xl sm:text-2xl uppercase tracking-tight text-alkota-black mb-3">
                      {factor.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#666] leading-relaxed">
                      {factor.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05. THE ENGINEERING BEHIND THE CLEAN ────────────────────────────── */}
        <section id="engineering" className="bg-white py-24 sm:py-32 px-6 sm:px-12 border-b border-[#E0E0DC]">
          <div className="mx-auto max-w-7xl w-full">
            <div className="mb-16 max-w-3xl">
              <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-mono font-medium">
                Alkota Engineering Intelligence
              </span>
              <h2
                className="font-extralight uppercase tracking-tight text-alkota-black leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
              >
                The engineering behind the clean.
              </h2>
              <p className="text-base sm:text-lg text-[#666] leading-relaxed">
                {episode.editorialData.theEngineering.overview}
              </p>
            </div>

            {/* Variable Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {episode.editorialData.theEngineering.variables.map((v) => (
                <div
                  key={v.variable}
                  className="bg-[#F8F7F4] border border-[#E0E0DC] p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#888]">
                        VARIABLE
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-alkota-orange/10 px-2 py-0.5">
                        {v.importance}
                      </span>
                    </div>

                    <h3 className="font-light text-lg uppercase tracking-tight text-alkota-black mb-1">
                      {v.variable}
                    </h3>
                    <p className="text-xs text-alkota-orange font-mono uppercase mb-4">
                      {v.role}
                    </p>

                    <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                      {v.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── 06. CLEANING EQUATION COMPONENT ─────────────────────────────── */}
            <CleaningEquation equation={episode.editorialData.cleaningEquation} />
          </div>
        </section>

        {/* ── 07. WHAT DOES A JOB LIKE THIS DEMAND? (PRODUCT MATCHING) ───────── */}
        <section className="bg-[#FAF9F5] py-24 sm:py-32 px-6 sm:px-12 border-b border-[#E0E0DC]">
          <div className="mx-auto max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-16">
              <div className="lg:col-span-6">
                <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-mono font-medium">
                  System Architecture Requirements
                </span>
                <h2
                  className="font-extralight uppercase tracking-tight text-alkota-black leading-[0.95] mb-6"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
                >
                  What does a job like this demand?
                </h2>
                <p className="text-base text-[#666] leading-relaxed">
                  Before choosing a specific model, consider the structural and thermodynamic requirements of this class of cleaning. The demanding duty cycles seen in Mess Quest reveal why commercial-grade components outperform consumer pressure washers.
                </p>
              </div>

              <div className="lg:col-span-6 space-y-4">
                {episode.editorialData.systemDemands.map((demand, i) => (
                  <div key={demand.requirement} className="bg-white border border-[#E0E0DC] p-5 flex items-start gap-4">
                    <span className="font-mono text-xs text-alkota-orange font-bold mt-0.5">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-light text-base uppercase text-alkota-black mb-1">
                        {demand.requirement}
                      </h3>
                      <p className="text-xs text-[#666] leading-relaxed">
                        {demand.why}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Canonical Alkota Machinery Recommendations */}
            <div className="mt-16 pt-16 border-t border-[#E0E0DC]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-mono font-medium">
                    Recommended Equipment
                  </span>
                  <h3 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                    Suitable Alkota UK Systems.
                  </h3>
                </div>
                <Link
                  href="/machines"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-alkota-orange hover:text-alkota-black transition-colors"
                >
                  <span>Browse Complete 127-Machine Fleet</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {validProducts.map((prod) => {
                  if (!prod) return null;
                  const catInfo = CANONICAL_CATEGORIES[prod.category];
                  const bar = prod.pressure_bar ? `${prod.pressure_bar} BAR` : '';
                  const lpm = prod.flow_rate_lpm ? `${prod.flow_rate_lpm} L/min` : '';
                  const image = resolveMachineImage(prod.primary_image_url, prod.model_code, prod.category);

                  return (
                    <div
                      key={prod.id}
                      className="bg-white border border-[#E0E0DC] p-6 flex flex-col justify-between hover:border-alkota-orange transition-all group shadow-sm"
                    >
                      <div>
                        <div className="aspect-[4/3] bg-[#EFEFEA] flex items-center justify-center p-6 mb-6 overflow-hidden">
                          <img
                            src={image}
                            alt={prod.name}
                            className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-[#888] mb-2 uppercase">
                          <span>{catInfo?.name || prod.category}</span>
                          <span className="text-alkota-orange">{[bar, lpm].filter(Boolean).join(' · ')}</span>
                        </div>

                        <h4 className="font-light text-2xl uppercase tracking-tight text-alkota-black mb-2 group-hover:text-alkota-orange transition-colors">
                          Alkota {prod.model_code || prod.name}
                        </h4>

                        <p className="text-xs text-[#666] line-clamp-3 leading-relaxed mb-6">
                          {prod.uk_description || prod.description || prod.tagline}
                        </p>
                      </div>

                      <Link
                        href={`/machines/${prod.category}/${prod.slug}`}
                        className="inline-flex items-center justify-center gap-2 bg-alkota-black text-white px-5 py-3 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors no-underline"
                      >
                        <span>View Technical Spec</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 08. CHEMISTRY MATTERS (CHEMICALS INTEGRATION) ───────────────────── */}
        <section className="bg-white py-20 sm:py-28 px-6 sm:px-12 border-b border-[#E0E0DC]">
          <div className="mx-auto max-w-7xl w-full">
            <div className="bg-[#141412] text-white p-8 sm:p-12 border border-[#222]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-alkota-orange text-xs uppercase tracking-[0.25em] font-mono mb-4">
                    <FlaskConical className="h-4 w-4" />
                    <span>Hydrus Chemical Formulations</span>
                  </div>

                  <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight mb-4">
                    Chemistry Matters.
                  </h3>

                  <p className="text-sm sm:text-base text-[#AAA] leading-relaxed mb-6 font-light">
                    {episode.editorialData.relatedChemicals.explanation}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {episode.editorialData.relatedChemicals.suggestedTypes.map((chem) => (
                      <span
                        key={chem}
                        className="text-xs font-mono bg-white/10 border border-white/20 text-[#DDD] px-3 py-1 uppercase"
                      >
                        {chem}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={episode.editorialData.relatedChemicals.href}
                    className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline font-normal"
                  >
                    <span>Explore Hydrus Chemical Range</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-5 border-l border-white/15 pl-0 lg:pl-10 font-normal">
                  <h4 className="text-xs uppercase tracking-wider text-white mb-4 font-mono font-medium">
                    // Essential Cleaning Accessories
                  </h4>
                  <ul className="space-y-4 text-xs text-[#AAA]">
                    {episode.editorialData.relatedAccessories.map((acc) => (
                      <li key={acc.name} className="pb-3 border-b border-white/10">
                        <Link href={acc.href} className="text-white hover:text-alkota-orange transition-colors block font-medium uppercase mb-0.5">
                          {acc.name} →
                        </Link>
                        <p className="text-[11px] text-[#777]">{acc.role}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 09. TRAILER CONFIGURATOR & BESPOKE SYSTEM CTAS ─────────────────── */}
        <section className="bg-[#0A0A08] text-white py-24 sm:py-32 px-6 sm:px-12 border-b border-[#1F1F1D]">
          <div className="mx-auto max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left Column: Trailer Rig Connection */}
              <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-[#222] pb-12 lg:pb-0 lg:pr-12">
                <span className="text-[10px] uppercase tracking-[0.28em] text-alkota-orange block mb-3 font-mono">
                  Mobile Independence // Remote Works
                </span>
                <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white mb-4">
                  Build a rig for this kind of work.
                </h3>
                <p className="text-sm text-[#999] leading-relaxed mb-8">
                  Configure water capacity, washer performance, live hose management, onboard generator power, and dual-operator capability around your specific application.
                </p>
                <Link
                  href="/trailers/configure"
                  className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors no-underline"
                >
                  <Truck className="h-4 w-4" />
                  <span>Configure a Trailer System</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Right Column: Bespoke Systems */}
              <div className="lg:col-span-6">
                <span className="text-[10px] uppercase tracking-[0.28em] text-alkota-orange block mb-3 font-mono">
                  Custom Engineering // Non-Standard Applications
                </span>
                <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white mb-4">
                  This is where bespoke starts.
                </h3>
                <p className="text-sm text-[#999] leading-relaxed mb-8">
                  A cleaning system should be engineered around the job rather than forcing the job around an off-the-shelf machine. Talk to our UK engineering team about custom flow rates, multi-operator manifolds, and closed-loop wash bay recycling.
                </p>
                <Link
                  href="/wash-plant"
                  className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-colors no-underline"
                >
                  <Wrench className="h-4 w-4" />
                  <span>Discuss a Bespoke Solution</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. EPISODE NAVIGATION & RELATED CASE STUDIES ─────────────────── */}
        <section className="bg-white py-20 sm:py-28 px-6 sm:px-12 border-b border-[#E0E0DC]">
          <div className="mx-auto max-w-7xl w-full">
            {/* Prev / Next Switcher */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-16 mb-16 border-b border-[#E0E0DC]">
              <Link
                href={`/mess-quest/${prevEpisode.slug}`}
                className="p-6 bg-[#F8F7F4] border border-[#E0E0DC] hover:border-alkota-orange transition-colors flex items-center gap-4 group no-underline"
              >
                <ArrowLeft className="h-6 w-6 text-alkota-orange shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#888] block">
                    PREVIOUS EPISODE // {prevEpisode.id}
                  </span>
                  <h4 className="font-light text-lg uppercase text-alkota-black group-hover:text-alkota-orange transition-colors">
                    {prevEpisode.title}
                  </h4>
                </div>
              </Link>

              <Link
                href={`/mess-quest/${nextEpisode.slug}`}
                className="p-6 bg-[#F8F7F4] border border-[#E0E0DC] hover:border-alkota-orange transition-colors flex items-center justify-between gap-4 group no-underline text-right"
              >
                <div className="w-full">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#888] block">
                    NEXT EPISODE // {nextEpisode.id}
                  </span>
                  <h4 className="font-light text-lg uppercase text-alkota-black group-hover:text-alkota-orange transition-colors">
                    {nextEpisode.title}
                  </h4>
                </div>
                <ArrowRight className="h-6 w-6 text-alkota-orange shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Explore More Mess Quest */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-extralight text-3xl uppercase tracking-tight text-alkota-black">
                  Explore More Mess Quest.
                </h3>
                <Link
                  href="/mess-quest"
                  className="text-xs uppercase tracking-[0.2em] text-alkota-orange hover:text-alkota-black transition-colors"
                >
                  View All Episodes →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedEpisodes.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/mess-quest/${rel.slug}`}
                    className="bg-[#141412] text-white border border-[#222] overflow-hidden group hover:border-alkota-orange transition-colors no-underline flex flex-col justify-between"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img
                        src={rel.thumbnail}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 text-[9px] font-mono uppercase tracking-widest bg-alkota-orange text-white px-2 py-0.5">
                        EPISODE {rel.id}
                      </span>
                    </div>

                    <div className="p-6">
                      <span className="text-[10px] font-mono text-[#888] uppercase tracking-widest block mb-1">
                        {rel.categoryFilter} · {rel.location}
                      </span>
                      <h4 className="font-light text-xl uppercase tracking-tight text-white group-hover:text-alkota-orange transition-colors mb-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#AAA] line-clamp-2 leading-relaxed">
                        {rel.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
