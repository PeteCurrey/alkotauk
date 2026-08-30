import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  getLobbyArticles,
  getLobbyCategoryBySlug,
  getLobbyCategories,
} from '@/lib/lobby';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Filter,
  BookOpen,
  Wrench,
  MapPin,
  Factory,
  BarChart3,
  Cpu,
  Flame,
  Star,
} from 'lucide-react';

interface Props {
  params: Promise<{ category: string }>;
}

// ─── PILLAR METADATA ─────────────────────────────────────────────────────────

const PILLAR_META: Record<
  string,
  { label: string; description: string; icon: React.ElementType; number: string }
> = {
  'good-clean-news': {
    label: 'Good Clean News',
    description:
      'Industry intelligence, Alkota editorial comment and professional news for the cleaning industry.',
    icon: BookOpen,
    number: '01',
  },
  knowledge: {
    label: 'Knowledge',
    description:
      'Engineering science, thermodynamics, materials science and technical reference journals.',
    icon: Cpu,
    number: '02',
  },
  workshop: {
    label: 'Workshop',
    description:
      'Maintenance guides, diagnostic teardowns, service protocols and fault-finding procedures.',
    icon: Wrench,
    number: '03',
  },
  'field-notes': {
    label: 'Field Notes',
    description:
      'Real-world deployment studies, on-site operator reports and professional case observations.',
    icon: MapPin,
    number: '04',
  },
  industries: {
    label: 'Industries',
    description:
      'Sector-specific cleaning intelligence, compliance guides and application deep-dives.',
    icon: Factory,
    number: '05',
  },
  'trade-desk': {
    label: 'Trade Desk',
    description:
      'Calculators, nozzle sizing tools, flow rate tables, TCO models and specification aids.',
    icon: BarChart3,
    number: '06',
  },
  'inside-alkota': {
    label: 'Inside Alkota',
    description:
      'Heritage, manufacturing process, engineering philosophy and the people behind the machines.',
    icon: Flame,
    number: '07',
  },
};

export async function generateStaticParams() {
  const categories = await getLobbyCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = PILLAR_META[category];
  const cat = await getLobbyCategoryBySlug(category);

  const name = meta?.label || cat?.name || category;
  const desc = meta?.description || cat?.description || '';

  return {
    title: `${name} | The Lobby`,
    description: desc,
    openGraph: {
      title: `${name} | The Lobby — Alkota UK`,
      description: desc,
      type: 'website',
    },
  };
}

export default async function LobbyPillarPage({ params }: Props) {
  const { category: categorySlug } = await params;

  // Accept both pillar slugs and category slugs
  const [articles, category] = await Promise.all([
    getLobbyArticles({ pillar: categorySlug }).then((arts) =>
      arts.length > 0
        ? arts
        : getLobbyArticles({ categorySlug })
    ),
    getLobbyCategoryBySlug(categorySlug),
  ]);

  const meta = PILLAR_META[categorySlug];

  // Only 404 if we have no matching articles AND no known category
  if (!meta && !category && articles.length === 0) {
    notFound();
  }

  const pillarName = meta?.label || category?.name || categorySlug;
  const pillarDesc = meta?.description || category?.description || '';
  const PillarIcon = meta?.icon || BookOpen;
  const pillarNumber = meta?.number || '—';

  const featured = articles.find((a) => a.is_featured) || articles[0];
  const remaining = articles.filter((a) => a.id !== featured?.id);
  const evergreen = articles.filter((a) => a.is_evergreen);

  // Group by difficulty if applicable
  const difficulties = ['foundational', 'intermediate', 'advanced_engineering'] as const;

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A18] font-normal selection:bg-[#FF6900] selection:text-white pb-24">

      {/* ─── PILLAR MASTHEAD ──────────────────────────────────────────────── */}
      <div className="bg-[#141416] text-white border-b border-white/10 pt-28 pb-16 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 text-[11px] font-mono text-white/40">
            <Link href="/lobby" className="hover:text-[#FF6900] transition-colors no-underline text-white/40">
              THE LOBBY
            </Link>
            <span>/</span>
            <span className="text-[#FF6900] uppercase">{pillarName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 bg-[#FF6900] flex items-center justify-center shrink-0">
                  <PillarIcon className="h-7 w-7 text-white" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6900]">
                  PILLAR {pillarNumber}
                </span>
              </div>
              <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-none mb-6">
                {pillarName}.
              </h1>
              <p className="font-light text-base sm:text-xl text-white/60 max-w-2xl leading-relaxed">
                {pillarDesc}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
              <div className="flex gap-6 text-center">
                <div>
                  <p className="font-extralight text-3xl text-white">{articles.length}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">
                    {articles.length === 1 ? 'Article' : 'Articles'}
                  </p>
                </div>
                {evergreen.length > 0 && (
                  <div>
                    <p className="font-extralight text-3xl text-white">{evergreen.length}</p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">
                      Evergreen
                    </p>
                  </div>
                )}
              </div>
              <Link
                href="/lobby"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-[#FF6900] transition-colors no-underline"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>All Pillars</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FEATURED ARTICLE ─────────────────────────────────────────────── */}
      {featured && (
        <div className="px-6 sm:px-12 py-12 border-b border-[#E5E5E0] bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6900]">
                TOP OF SECTION
              </span>
              <div className="h-px flex-1 bg-[#E5E5E0]" />
            </div>
            <Link
              href={`/lobby/${featured.category_slug}/${featured.slug}`}
              className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-start no-underline"
            >
              {featured.featured_image_url ? (
                <div className="relative aspect-[16/9] overflow-hidden bg-[#EEE] border border-[#E5E5E0]">
                  <Image
                    src={featured.featured_image_url}
                    alt={featured.hero_alt_text || featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              ) : (
                <div className="relative aspect-[16/9] bg-[#141416] border border-[#333] flex items-center justify-center">
                  <PillarIcon className="h-16 w-16 text-[#FF6900] opacity-30" />
                </div>
              )}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-4 text-xs font-mono text-[#888]">
                    <span className="text-[#FF6900] uppercase tracking-wider">
                      {featured.category?.badge_label || featured.category?.name || categorySlug}
                    </span>
                    {featured.is_evergreen && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-[#FF6900]" />
                          Evergreen
                        </span>
                      </>
                    )}
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featured.reading_time_mins} min
                    </span>
                  </div>
                  <h2 className="font-extralight text-2xl sm:text-4xl text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-tight tracking-tight mb-3">
                    {featured.title}
                  </h2>
                  {featured.subtitle && (
                    <p className="font-light text-base sm:text-lg text-[#555] leading-relaxed mb-4">
                      {featured.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-[#666] leading-relaxed line-clamp-4 font-normal">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E5E5E0] flex items-center justify-between">
                  {featured.author && (
                    <div>
                      <p className="text-xs font-medium text-[#1A1A18]">{featured.author.name}</p>
                      <p className="text-[11px] font-mono text-[#999]">{featured.author.role}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#1A1A18] group-hover:text-[#FF6900] transition-colors">
                    <span>Read Full Article</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* ─── ARTICLE INDEX GRID ───────────────────────────────────────────── */}
      {remaining.length > 0 && (
        <div className="px-6 sm:px-12 py-12 border-b border-[#E5E5E0]">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-8">
              <Filter className="h-3.5 w-3.5 text-[#999]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#999]">
                ALL {pillarName.toUpperCase()} ARTICLES
              </span>
              <div className="h-px flex-1 bg-[#E5E5E0]" />
              <span className="text-[11px] font-mono text-[#999]">{articles.length} articles</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {remaining.map((art) => (
                <Link
                  key={art.id}
                  href={`/lobby/${art.category_slug}/${art.slug}`}
                  className="group flex flex-col border border-[#E5E5E0] bg-white hover:border-[#FF6900] transition-colors no-underline"
                >
                  {art.featured_image_url && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#EEE]">
                      <Image
                        src={art.featured_image_url}
                        alt={art.hero_alt_text || art.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6900]">
                          {art.category?.badge_label || art.category?.name || categorySlug}
                        </span>
                        {art.is_evergreen && (
                          <Star className="h-2.5 w-2.5 text-[#FF6900]" />
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-[#999]">
                        <Clock className="h-3 w-3" />
                        {art.reading_time_mins}m
                      </span>
                    </div>
                    <h3 className="font-light text-base sm:text-lg text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-snug tracking-tight mb-2 flex-1">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#666] leading-relaxed line-clamp-2 font-normal mb-4">
                      {art.excerpt}
                    </p>
                    {art.difficulty_level && (
                      <div className="mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider border border-[#E5E5E0] px-2 py-0.5 text-[#999]">
                          {art.difficulty_level.replace(/_/g, ' ')}
                        </span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-[#F0F0EE] flex items-center gap-1.5 text-[11px] font-mono text-[#999] group-hover:text-[#FF6900] transition-colors">
                      <span>Read article</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── EMPTY STATE ──────────────────────────────────────────────────── */}
      {articles.length === 0 && (
        <div className="px-6 sm:px-12 py-24 text-center">
          <div className="mx-auto max-w-md">
            <PillarIcon className="h-12 w-12 text-[#CCC] mx-auto mb-6" />
            <h2 className="font-extralight text-2xl uppercase tracking-tight text-[#1A1A18] mb-4">
              Content Coming Soon
            </h2>
            <p className="text-sm text-[#666] leading-relaxed font-normal mb-8">
              The {pillarName} section is being populated with professional knowledge content.
              Return soon or explore another pillar.
            </p>
            <Link
              href="/lobby"
              className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-6 py-3 text-xs uppercase tracking-widest font-normal no-underline hover:bg-[#1A1A18] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to The Lobby</span>
            </Link>
          </div>
        </div>
      )}

      {/* ─── RETURN NAVIGATION ────────────────────────────────────────────── */}
      <div className="px-6 sm:px-12 py-8 border-t border-[#E5E5E0] bg-white">
        <div className="mx-auto max-w-7xl flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/lobby"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666] hover:text-[#FF6900] transition-colors no-underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>The Lobby Index</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-5 py-2.5 text-xs uppercase tracking-widest font-normal no-underline hover:bg-[#1A1A18] transition-colors"
          >
            <span>Consult an Applications Engineer</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
