import Link from 'next/link';
import Image from 'next/image';
import {
  getLobbyArticles,
  getLobbyCategories,
  getLobbyResources,
  LobbyArticle,
} from '@/lib/lobby';
import {
  ArrowRight,
  Clock,
  Download,
  FileText,
  ShieldCheck,
  Cpu,
  Flame,
  BarChart3,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const revalidate = 3600; // 1 hour ISR

export default async function LobbyHubPage() {
  const [articles, categories, resources] = await Promise.all([
    getLobbyArticles(),
    getLobbyCategories(),
    getLobbyResources(),
  ]);

  const featuredArticle = articles.find((a) => a.is_featured) || articles[0];
  const regularArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div className="relative pb-24">
      {/* ─── FULL-SCREEN CINEMATIC MASTHEAD HERO SECTION ─────────────────────── */}
      <section className="relative min-h-[calc(100vh-74px)] flex flex-col justify-between border-b border-[#222] bg-gradient-to-b from-[#0F0F0F] via-[#0A0A0A] to-[#050505] px-6 py-12 sm:px-12 lg:py-16 overflow-hidden">
        {/* Ambient background grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          {/* Top Label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[2px] w-10 bg-[#FF6900]" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#FF6900]">
              ALKOTA UK // INDUSTRY AUTHORITY & ENGINEERING REPOSITORY
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-barlow-condensed text-6xl sm:text-8xl lg:text-9xl font-black uppercase italic tracking-tight text-white leading-[0.84]">
                THE LOBBY.
              </h1>
              <p className="mt-6 font-inter text-base sm:text-xl text-[#ccc] max-w-2xl leading-relaxed">
                The authoritative engineering destination for high-temperature fluid dynamics, Schedule 80 coil metallurgy, UK wash bay environmental regulations, and heavy industrial plant specification.
              </p>

              {/* Action Links */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 bg-[#FF6900] px-6 py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
                >
                  <span>Explore Featured Research</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/machines"
                  className="inline-flex items-center gap-2 border border-[#333] bg-[#111] px-6 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest text-[#ccc] transition-all hover:border-white hover:text-white"
                >
                  <span>Commercial Catalogue</span>
                  <ArrowUpRight className="h-4 w-4 text-[#FF6900]" />
                </Link>
              </div>
            </div>

            {/* Quick Stats / Scope */}
            <div className="lg:col-span-4 border-l border-[#222] pl-8 hidden lg:block">
              <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] mb-4">
                // ARCHIVE SPECIFICATION
              </p>
              <div className="space-y-4 font-ibm-plex-mono text-xs text-[#aaa]">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                  <span className="text-[#666]">AUTHORITY:</span>
                  <span className="text-white font-bold">Alkota Engineering UK</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                  <span className="text-[#666]">COIL STANDARD:</span>
                  <span className="text-[#FF6900] font-bold">ASTM A53 Schedule 80</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                  <span className="text-[#666]">REGULATORY FOCUS:</span>
                  <span className="text-white font-bold">EA PPG3 & BS EN 858</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666]">MACHINE MODELS:</span>
                  <span className="text-white font-bold">127 UK Documented</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Hero: Category Ribbon & Scroll Down Prompt */}
        <div className="relative z-10 mx-auto max-w-7xl w-full pt-12 mt-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-[#1F1F1F] pt-8">
            {categories.map((cat) => {
              const Icon =
                cat.icon_name === 'Cpu'
                  ? Cpu
                  : cat.icon_name === 'ShieldCheck'
                  ? ShieldCheck
                  : cat.icon_name === 'Flame'
                  ? Flame
                  : BarChart3;
              return (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="group flex items-center gap-3 border border-[#222] bg-[#0C0C0C]/80 p-4 hover:border-[#FF6900] transition-colors"
                >
                  <Icon className="h-5 w-5 text-[#FF6900] shrink-0 transition-transform group-hover:scale-110" />
                  <div className="overflow-hidden">
                    <p className="font-ibm-plex-mono text-[8px] font-bold uppercase tracking-wider text-[#666]">
                      {cat.badge_label || 'DISCIPLINE'}
                    </p>
                    <p className="font-barlow-condensed text-base font-bold uppercase text-white truncate group-hover:text-[#FF6900] transition-colors">
                      {cat.name}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between text-[9px] font-ibm-plex-mono text-[#555]">
            <span>// CONTINUOUS INDUSTRIAL KNOWLEDGE FEED</span>
            <a
              href="#featured"
              className="flex items-center gap-1.5 text-[#888] hover:text-[#FF6900] transition-colors"
            >
              <span>Scroll to Papers</span>
              <ChevronDown className="h-3 w-3 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── LEAD STORY SPOTLIGHT (HERO ARTICLE) ─────────────────────────── */}
      {featuredArticle && (
        <section id="featured" className="border-b border-[#1F1F1F] px-6 py-16 sm:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF6900]" />
                <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
                  LEAD TECHNICAL INVESTIGATION
                </span>
              </div>
              <span className="font-ibm-plex-mono text-[10px] text-[#666] uppercase tracking-wider">
                {featuredArticle.reading_time_mins} MIN READ
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0F0F0F] border border-[#222] p-6 sm:p-8 lg:p-12 hover:border-[#333] transition-colors group">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-[#FF6900]/10 border border-[#FF6900]/30 px-2.5 py-1 text-[9px] font-ibm-plex-mono font-bold uppercase tracking-widest text-[#FF6900]">
                      {featuredArticle.category?.name || 'Engineering'}
                    </span>
                    <span className="font-ibm-plex-mono text-[10px] text-[#777]">
                      {new Date(featuredArticle.published_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <Link
                    href={`/lobby/${featuredArticle.category_slug}/${featuredArticle.slug}`}
                    className="block group"
                  >
                    <h2 className="font-barlow-condensed text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-white group-hover:text-[#FF6900] transition-colors leading-[0.95]">
                      {featuredArticle.title}
                    </h2>
                  </Link>

                  {featuredArticle.subtitle && (
                    <p className="mt-3 font-inter text-sm sm:text-base text-[#ccc] leading-relaxed">
                      {featuredArticle.subtitle}
                    </p>
                  )}

                  <p className="mt-4 font-inter text-xs sm:text-sm text-[#888] leading-relaxed line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1F1F1F] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {featuredArticle.author?.avatar_url && (
                      <div className="relative h-9 w-9 rounded-full overflow-hidden border border-[#333]">
                        <Image
                          src={featuredArticle.author.avatar_url}
                          alt={featuredArticle.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-barlow-condensed text-base font-bold text-white leading-none">
                        {featuredArticle.author?.name || 'Alkota Engineering Staff'}
                      </p>
                      <p className="font-ibm-plex-mono text-[9px] text-[#666]">
                        {featuredArticle.author?.role || 'Technical Desk'}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/lobby/${featuredArticle.category_slug}/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 bg-[#FF6900] px-5 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
                  >
                    <span>Read Full Paper</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Lead Image */}
              {featuredArticle.featured_image_url && (
                <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-square overflow-hidden bg-[#1A1A1A] border border-[#262626]">
                  <Image
                    src={featuredArticle.featured_image_url}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── CATEGORY HUBS & ARTICLES GRID ──────────────────────────────── */}
      <section className="px-6 py-16 sm:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#222] pb-6 mb-12 gap-4">
            <div>
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6900]">
                // CURATED INTELLIGENCE
              </span>
              <h2 className="mt-1 font-barlow-condensed text-4xl sm:text-5xl font-black uppercase italic tracking-tight text-white">
                ALL RESEARCH & BRIEFINGS
              </h2>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="whitespace-nowrap border border-[#262626] bg-[#111] px-3 py-1.5 text-[10px] font-ibm-plex-mono uppercase tracking-wider text-[#999] hover:border-[#FF6900] hover:text-white transition-colors"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <article
                key={article.id}
                id={article.category_slug}
                className="flex flex-col justify-between bg-[#0E0E0E] border border-[#222] hover:border-[#FF6900]/50 transition-all group p-6"
              >
                <div>
                  {/* Article Thumbnail */}
                  {article.featured_image_url && (
                    <Link
                      href={`/lobby/${article.category_slug}/${article.slug}`}
                      className="block relative aspect-[16/9] overflow-hidden mb-6 bg-[#161616]"
                    >
                      <Image
                        src={article.featured_image_url}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  )}

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[9px] font-ibm-plex-mono font-bold uppercase tracking-widest text-[#FF6900]">
                      {article.category?.name || 'Briefing'}
                    </span>
                    <span className="flex items-center gap-1 font-ibm-plex-mono text-[9px] text-[#666]">
                      <Clock className="h-3 w-3" />
                      {article.reading_time_mins} min
                    </span>
                  </div>

                  <Link
                    href={`/lobby/${article.category_slug}/${article.slug}`}
                    className="block group"
                  >
                    <h3 className="font-barlow-condensed text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-[#FF6900] transition-colors leading-tight">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="mt-3 font-inter text-xs text-[#888] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                  <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                    By {article.author?.name || 'Alkota Engineer'}
                  </span>
                  <Link
                    href={`/lobby/${article.category_slug}/${article.slug}`}
                    className="flex items-center gap-1 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-wider text-[#FF6900] hover:underline"
                  >
                    <span>Read Paper</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE SPEC DESK (DOWNLOADS & SCHEMATICS) ────────────────────────── */}
      <section className="border-t border-[#1F1F1F] bg-[#070707] px-6 py-16 sm:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6900]">
                // THE SPEC DESK
              </span>
              <h2 className="mt-2 font-barlow-condensed text-4xl sm:text-5xl font-black uppercase italic tracking-tight text-white leading-[0.9]">
                ENGINEERING CAD, STANDARDS & COMPLIANCE DOWNLOADS.
              </h2>
              <p className="mt-4 font-inter text-sm text-[#888] leading-relaxed">
                Direct access to downloadable PDF technical whitepapers, wash bay civil engineering guidelines, and heating coil metallurgy test certificates.
              </p>
              <div className="mt-8 border border-[#222] bg-[#0C0C0C] p-5">
                <p className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#FF6900] mb-1">
                  // NEED BESPOKE DRAWINGS?
                </p>
                <p className="font-inter text-xs text-[#aaa] leading-relaxed">
                  Our UK application engineering team generates custom CAD layouts and 3D schematics for stationary wash plant bay integrations.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-[10px] font-ibm-plex-mono font-bold uppercase tracking-widest text-white hover:text-[#FF6900]"
                >
                  Request Technical Briefing →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {resources.map((res) => (
                <div
                  key={res.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#222] bg-[#0F0F0F] p-6 hover:border-[#333] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#333] bg-[#141414] text-[#FF6900]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-barlow-condensed text-xl font-bold uppercase text-white leading-tight">
                        {res.title}
                      </h4>
                      <p className="mt-1 font-inter text-xs text-[#777] leading-relaxed max-w-xl">
                        {res.description}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[9px] font-ibm-plex-mono text-[#555]">
                        <span className="uppercase text-[#FF6900]">{res.file_format}</span>
                        <span>•</span>
                        <span>
                          {res.file_size_bytes
                            ? `${(res.file_size_bytes / (1024 * 1024)).toFixed(1)} MB`
                            : 'Direct Access'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={res.file_url}
                    download
                    className="inline-flex items-center justify-center gap-2 border border-[#333] bg-[#161616] px-4 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white hover:border-[#FF6900] hover:bg-[#FF6900] transition-colors shrink-0"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CROSS-DISCIPLINE NAVIGATION CTA ─────────────────────────────── */}
      <section className="border-t border-[#1F1F1F] bg-[#0A0A0A] px-6 py-16 sm:px-12 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#FF6900]/10 border border-[#FF6900]/30 px-3 py-1 text-[9px] font-ibm-plex-mono font-bold uppercase tracking-widest text-[#FF6900] mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>COMMERCIAL CATALOGUE</span>
          </div>
          <h2 className="font-barlow-condensed text-4xl sm:text-6xl font-black uppercase italic tracking-tight text-white leading-[0.9]">
            READY TO SPECIFY ALKOTA HARDWARE?
          </h2>
          <p className="mt-4 font-inter text-sm sm:text-base text-[#888] max-w-2xl mx-auto leading-relaxed">
            Every technical standard detailed in The Lobby is engineered directly into our North Dakota-built pressure washers, aqueous parts cleaners, and wash plant systems.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/machines"
              className="inline-flex items-center justify-center gap-2 bg-[#FF6900] px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
            >
              <span>Explore All 127 Machines</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools/configurator"
              className="inline-flex items-center justify-center gap-2 border border-[#333] bg-[#111] px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest text-white hover:border-white transition-colors w-full sm:w-auto"
            >
              <span>Launch Build Configurator</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
