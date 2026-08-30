import Link from 'next/link';
import Image from 'next/image';
import { getLobbyArticles, getLobbyResources, getLobbyCategories, LobbyArticle } from '@/lib/lobby';
import AskTheLobbyHero from '@/components/lobby/AskTheLobbyHero';
import RegulatoryWatch from '@/components/lobby/RegulatoryWatch';
import IndustryEvents from '@/components/lobby/IndustryEvents';
import MessQuestLobbySection from '@/components/lobby/MessQuestLobbySection';
import TechnicalLibrary from '@/components/lobby/TechnicalLibrary';
import LobbyTools from '@/components/lobby/LobbyTools';
import LobbyBrief from '@/components/lobby/LobbyBrief';
import {
  ArrowRight,
  Clock,
  Flame,
  BookOpen,
  Wrench,
  MapPin,
  Factory,
  BarChart3,
  Cpu,
  ChevronRight,
  TrendingUp,
  Star,
} from 'lucide-react';

export const revalidate = 3600;

// ─── PILLAR DEFINITIONS ───────────────────────────────────────────────────────

const PILLARS = [
  {
    slug: 'good-clean-news',
    name: 'Good Clean News',
    strapline: 'Industry insight, Alkota editorials & professional news.',
    icon: BookOpen,
    accent: '#FF6900',
    bg: '#1A1A18',
    text: '#FFFFFF',
  },
  {
    slug: 'knowledge',
    name: 'Knowledge',
    strapline: 'Engineering science, thermodynamics & technical journals.',
    icon: Cpu,
    accent: '#FF6900',
    bg: '#FAFAF8',
    text: '#1A1A18',
  },
  {
    slug: 'workshop',
    name: 'Workshop',
    strapline: 'Maintenance guides, diagnostic teardowns & service protocol.',
    icon: Wrench,
    accent: '#FF6900',
    bg: '#FAFAF8',
    text: '#1A1A18',
  },
  {
    slug: 'field-notes',
    name: 'Field Notes',
    strapline: 'Real-world deployment studies & on-site operator reports.',
    icon: MapPin,
    accent: '#FF6900',
    bg: '#FAFAF8',
    text: '#1A1A18',
  },
  {
    slug: 'industries',
    name: 'Industries',
    strapline: 'Sector-specific cleaning intelligence & compliance guides.',
    icon: Factory,
    accent: '#FF6900',
    bg: '#FAFAF8',
    text: '#1A1A18',
  },
  {
    slug: 'trade-desk',
    name: 'Trade Desk',
    strapline: 'Calculators, nozzle sizing, flow rate tools & TCO models.',
    icon: BarChart3,
    accent: '#FF6900',
    bg: '#FAFAF8',
    text: '#1A1A18',
  },
  {
    slug: 'inside-alkota',
    name: 'Inside Alkota',
    strapline: 'Heritage, manufacturing process & engineering philosophy.',
    icon: Flame,
    accent: '#FF6900',
    bg: '#FAFAF8',
    text: '#1A1A18',
  },
] as const;

// ─── ARTICLE CARD COMPONENTS ──────────────────────────────────────────────────

function ArticleCardCompact({ article }: { article: LobbyArticle }) {
  return (
    <Link
      href={`/lobby/${article.category_slug}/${article.slug}`}
      className="group flex gap-4 py-4 border-b border-[#E5E5E0] last:border-0 no-underline"
    >
      {article.featured_image_url && (
        <div className="relative h-16 w-24 shrink-0 overflow-hidden bg-[#EEE] border border-[#E5E5E0]">
          <Image
            src={article.featured_image_url}
            alt={article.hero_alt_text || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="96px"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6900] block mb-1">
          {article.category?.name || article.category_slug}
        </span>
        <h4 className="font-light text-sm text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-snug line-clamp-2 tracking-tight">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-1.5 text-[11px] font-mono text-[#999]">
          <Clock className="h-3 w-3" />
          <span>{article.reading_time_mins} min</span>
          {article.difficulty_level && (
            <>
              <span>·</span>
              <span className="capitalize">{article.difficulty_level.replace('_', ' ')}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

function ArticleCardMedium({ article }: { article: LobbyArticle }) {
  return (
    <Link
      href={`/lobby/${article.category_slug}/${article.slug}`}
      className="group flex flex-col border border-[#E5E5E0] bg-white hover:border-[#FF6900] transition-colors no-underline"
    >
      {article.featured_image_url && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#EEE]">
          <Image
            src={article.featured_image_url}
            alt={article.hero_alt_text || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6900]">
            {article.category?.badge_label || article.category?.name || article.category_slug}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-mono text-[#999]">
            <Clock className="h-3 w-3" />
            {article.reading_time_mins}m
          </span>
        </div>
        <h3 className="font-light text-base sm:text-lg text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-snug tracking-tight mb-2 flex-1">
          {article.title}
        </h3>
        <p className="text-xs text-[#666] leading-relaxed line-clamp-2 font-normal">
          {article.excerpt}
        </p>
        <div className="mt-4 pt-3 border-t border-[#F0F0EE] flex items-center gap-1.5 text-[11px] font-mono text-[#999] group-hover:text-[#FF6900] transition-colors">
          <span>Read article</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function LobbyHubPage() {
  const [allArticles, resources] = await Promise.all([
    getLobbyArticles(),
    getLobbyResources(),
  ]);

  const featuredArticle = allArticles.find((a) => a.is_featured) || allArticles[0];
  const trendingArticles = allArticles.filter((a) => a.is_trending && a.id !== featuredArticle?.id).slice(0, 4);
  const evergreenArticles = allArticles.filter((a) => a.is_evergreen).slice(0, 3);
  const recentArticles = allArticles
    .filter((a) => a.id !== featuredArticle?.id && !a.is_trending)
    .slice(0, 9);
  const sidebarArticles = allArticles
    .filter((a) => a.id !== featuredArticle?.id)
    .slice(0, 5);

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A18] font-normal selection:bg-[#FF6900] selection:text-white">

      {/* ── 01. FULL-PAGE HERO + ASK THE LOBBY ─────────────────────────── */}
      <AskTheLobbyHero />

      {/* ── 02. EDITORIAL COVER — LEAD STORY + SIDEBAR ─────────────────── */}
      {featuredArticle && (
        <section id="latest" className="py-16 sm:py-24 px-6 sm:px-12 bg-white border-b border-[#E5E5E0]">
          <div className="mx-auto max-w-7xl">
            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-[#E5E5E0] gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6900] block mb-2">
                  LATEST INTELLIGENCE — EDITORIAL LEAD
                </span>
                <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-none">
                  Latest Intelligence.
                </h2>
              </div>
              <Link
                href="/lobby/knowledge"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666] hover:text-[#FF6900] transition-colors no-underline"
              >
                <span>View Full Library</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Lead Story — 8 cols */}
              <div className="lg:col-span-8">
                <Link
                  href={`/lobby/${featuredArticle.category_slug}/${featuredArticle.slug}`}
                  className="group block no-underline"
                >
                  {/* Hero image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1A1A18] mb-6 border border-[#E5E5E0]">
                    {featuredArticle.featured_image_url ? (
                      <Image
                        src={featuredArticle.featured_image_url}
                        alt={featuredArticle.hero_alt_text || featuredArticle.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                        sizes="(max-width: 1024px) 100vw, 67vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A18] to-[#333] flex items-center justify-center">
                        <Flame className="h-16 w-16 text-[#FF6900] opacity-40" />
                      </div>
                    )}
                    {/* Overlay badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-[#FF6900] text-white px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                        Lead Investigation
                      </span>
                      {featuredArticle.is_evergreen && (
                        <span className="bg-white/90 text-[#1A1A18] px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1">
                          <Star className="h-2.5 w-2.5 text-[#FF6900]" />
                          Evergreen
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 text-[10px] font-mono uppercase tracking-wider">
                      {featuredArticle.reading_time_mins} MIN READ
                    </div>
                  </div>

                  {/* Article metadata + headline */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#888]">
                      <span className="text-[#FF6900] uppercase tracking-wider">
                        {featuredArticle.category?.name || 'Engineering White Paper'}
                      </span>
                      <span>—</span>
                      <span>
                        {new Date(featuredArticle.published_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="font-extralight text-2xl sm:text-4xl text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-tight tracking-tight">
                      {featuredArticle.title}
                    </h3>
                    {featuredArticle.subtitle && (
                      <p className="font-light text-lg text-[#555] leading-relaxed">
                        {featuredArticle.subtitle}
                      </p>
                    )}
                    <p className="text-sm text-[#666] leading-relaxed line-clamp-3 font-normal">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E0]">
                      {featuredArticle.author && (
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-[#1A1A18] flex items-center justify-center text-xs text-white font-mono font-medium">
                            {featuredArticle.author.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[#1A1A18]">{featuredArticle.author.name}</p>
                            <p className="text-[11px] font-mono text-[#999]">{featuredArticle.author.role}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#1A1A18] group-hover:text-[#FF6900] transition-colors font-mono">
                        <span>Read Full Analysis</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Sidebar — 4 cols */}
              <div className="lg:col-span-4">
                <div className="border border-[#E5E5E0] bg-[#FAFAF8] p-5">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E0]">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#1A1A18] font-medium">
                      Also In The Lobby
                    </span>
                  </div>
                  <div className="divide-y divide-[#E5E5E0]">
                    {sidebarArticles.map((art) => (
                      <ArticleCardCompact key={art.id} article={art} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 03. SEVEN PILLAR PORTAL GRID ───────────────────────────────── */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#141416] border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-white/10 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6900] block mb-2">
                THE SEVEN DESTINATIONS
              </span>
              <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none">
                Knowledge Pillars.
              </h2>
            </div>
            <p className="text-xs text-white/50 max-w-xs font-normal">
              Seven editorial destinations. One professional knowledge platform.
            </p>
          </div>

          {/* Pillar grid — feature GCN full-width, rest in 3-col */}
          <div className="grid grid-cols-1 gap-px bg-white/10">
            {/* Row 1: Good Clean News spans full width */}
            <Link
              href={`/lobby/${PILLARS[0].slug}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#1A1A18] hover:bg-[#FF6900]/10 transition-colors px-8 py-8 no-underline border border-transparent hover:border-[#FF6900]/30"
            >
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-[#FF6900] flex items-center justify-center shrink-0">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6900] block mb-1">
                    PILLAR 01
                  </span>
                  <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white leading-none mb-2">
                    Good Clean News
                  </h3>
                  <p className="text-sm text-white/60 font-normal max-w-md">
                    Industry insight, professional news, and Alkota editorial comment. The pulse of professional cleaning.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6900] shrink-0 group-hover:gap-3 transition-all">
                <span>Enter</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            {/* Row 2: Remaining 6 pillars in 3-col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
              {PILLARS.slice(1).map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <Link
                    key={pillar.slug}
                    href={`/lobby/${pillar.slug}`}
                    className="group flex flex-col bg-[#1A1A18] hover:bg-[#222] transition-colors px-6 py-7 no-underline"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="h-10 w-10 border border-white/20 group-hover:border-[#FF6900]/50 flex items-center justify-center transition-colors">
                        <Icon className="h-5 w-5 text-white/60 group-hover:text-[#FF6900] transition-colors" />
                      </div>
                      <span className="text-[10px] font-mono text-white/30 group-hover:text-[#FF6900] transition-colors">
                        0{idx + 2}
                      </span>
                    </div>
                    <h3 className="font-light text-base sm:text-lg uppercase tracking-tight text-white group-hover:text-[#FF6900] transition-colors leading-none mb-2">
                      {pillar.name}
                    </h3>
                    <p className="text-[12px] text-white/50 font-normal leading-relaxed flex-1">
                      {pillar.strapline}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-white/30 group-hover:text-[#FF6900] transition-colors">
                      <span>Browse</span>
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 04. TRENDING DISPATCH STRIP ────────────────────────────────── */}
      {trendingArticles.length > 0 && (
        <section className="py-12 px-6 sm:px-12 bg-[#FF6900] border-b border-[#E05800]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
              <div className="flex items-center gap-3 shrink-0">
                <TrendingUp className="h-5 w-5 text-white" />
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white font-medium whitespace-nowrap">
                  TRENDING NOW
                </span>
                <div className="hidden lg:block h-px flex-1 bg-white/30 w-8" />
              </div>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 flex-1 flex-wrap">
                {trendingArticles.map((art, idx) => (
                  <Link
                    key={art.id}
                    href={`/lobby/${art.category_slug}/${art.slug}`}
                    className="group flex items-start gap-3 no-underline min-w-0"
                  >
                    <span className="text-white/40 font-mono text-xs shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider block mb-0.5">
                        {art.category?.name || art.category_slug}
                      </span>
                      <p className="text-sm text-white font-normal group-hover:text-white/80 transition-colors line-clamp-2 leading-snug">
                        {art.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 05. KNOWLEDGE INDEX — 3-COL ARTICLE GRID ──────────────────── */}
      {recentArticles.length > 0 && (
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#FAFAF8] border-b border-[#E5E5E0]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-[#E5E5E0] gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6900] block mb-2">
                  THE FULL LIBRARY
                </span>
                <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-none">
                  Knowledge Index.
                </h2>
              </div>
              <Link
                href="/lobby/knowledge"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666] hover:text-[#FF6900] transition-colors no-underline"
              >
                <span>Full library</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map((art) => (
                <ArticleCardMedium key={art.id} article={art} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 06. EVERGREEN ESSENTIALS ───────────────────────────────────── */}
      {evergreenArticles.length > 0 && (
        <section className="py-16 sm:py-20 px-6 sm:px-12 bg-white border-b border-[#E5E5E0]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-[#E5E5E0] gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#FF6900] block mb-2">
                  ESSENTIAL READING — REFERENCE GRADE
                </span>
                <h2 className="font-extralight text-2xl sm:text-4xl uppercase tracking-tight text-[#1A1A18] leading-none">
                  Evergreen Fundamentals.
                </h2>
              </div>
              <p className="text-xs text-[#777] max-w-xs font-normal">
                Timeless technical references that professionals return to again and again.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#E5E5E0] divide-y md:divide-y-0 md:divide-x divide-[#E5E5E0]">
              {evergreenArticles.map((art, idx) => (
                <Link
                  key={art.id}
                  href={`/lobby/${art.category_slug}/${art.slug}`}
                  className="group flex flex-col p-6 sm:p-8 bg-white hover:bg-[#FAFAF8] transition-colors no-underline"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="inline-flex items-center gap-1.5 border border-[#FF6900]/30 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-[#FF6900]">
                      <Star className="h-2.5 w-2.5" />
                      Evergreen
                    </span>
                    <span className="text-2xl font-extralight text-[#E5E5E0]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-light text-lg sm:text-xl text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-snug tracking-tight mb-3 flex-1">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#666] leading-relaxed line-clamp-3 font-normal mb-5">
                    {art.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#999] group-hover:text-[#FF6900] transition-colors">
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 07. REGULATORY WATCH ───────────────────────────────────────── */}
      <div id="regulatory">
        <RegulatoryWatch />
      </div>

      {/* ── 08. FROM THE FIELD: MESS QUEST ────────────────────────────── */}
      <MessQuestLobbySection />

      {/* ── 09. TECHNICAL LIBRARY & DOWNLOADS ─────────────────────────── */}
      <div id="technical">
        <TechnicalLibrary resources={resources} />
      </div>

      {/* ── 10. THE SPEC DESK & ENGINEERING TOOLS ─────────────────────── */}
      <LobbyTools />

      {/* ── 11. INDUSTRY EVENTS ───────────────────────────────────────── */}
      <div id="events">
        <IndustryEvents />
      </div>

      {/* ── 12. THE LOBBY BRIEF WEEKLY DISPATCH ───────────────────────── */}
      <LobbyBrief />
    </div>
  );
}
