import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  getLobbyArticleBySlug,
  getLobbyArticles,
  getLobbyCategoryBySlug,
  LobbyArticle,
} from '@/lib/lobby';
import { getProductBySlug } from '@/lib/products';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Flame,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await getLobbyArticles();
  return articles.map((a) => ({
    category: a.category_slug,
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getLobbyArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | The Lobby',
    };
  }

  const title = article.seo_title || `${article.title} | The Lobby — Alkota UK`;
  const description =
    article.seo_description || article.excerpt || article.subtitle;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.published_at,
      authors: article.author ? [article.author.name] : ['Alkota UK'],
      images: article.featured_image_url ? [article.featured_image_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: article.featured_image_url ? [article.featured_image_url] : [],
    },
  };
}

export default async function LobbyArticlePage({ params }: Props) {
  const { category: categorySlug, slug } = await params;
  const article = await getLobbyArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch related machines
  const relatedMachines = await Promise.all(
    (article.related_machine_slugs || []).map(async (mSlug) => {
      try {
        return await getProductBySlug(mSlug);
      } catch {
        return null;
      }
    })
  ).then((res) => res.filter(Boolean));

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image_url,
    datePublished: article.published_at,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Alkota UK Engineering Team',
      jobTitle: article.author?.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alkota UK',
      url: 'https://alkota.co.uk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://alkota.co.uk/assets/logo.png',
      },
    },
  };

  return (
    <article className="pb-24">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── BREADCRUMB & HEADER ─────────────────────────────────────────── */}
      <div className="border-b border-[#1A1A1A] bg-[#0D0D0D] px-6 py-4 sm:px-12">
        <div className="mx-auto max-w-5xl flex items-center justify-between text-[10px] font-ibm-plex-mono text-[#777]">
          <div className="flex items-center gap-2">
            <Link href="/lobby" className="hover:text-white transition-colors">
              The Lobby
            </Link>
            <ChevronRight className="h-3 w-3 text-[#444]" />
            <Link
              href={`/lobby#${article.category_slug}`}
              className="text-[#FF6900] hover:underline"
            >
              {article.category?.name || article.category_slug}
            </Link>
            <ChevronRight className="h-3 w-3 text-[#444]" />
            <span className="text-[#aaa] truncate max-w-xs sm:max-w-md">
              {article.slug}
            </span>
          </div>
          <Link
            href="/lobby"
            className="hidden sm:inline-flex items-center gap-1 text-[#888] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Archive Index</span>
          </Link>
        </div>
      </div>

      {/* ─── ARTICLE HEADER ──────────────────────────────────────────────── */}
      <header className="border-b border-[#1F1F1F] bg-[#0A0A0A] px-6 pt-12 pb-14 sm:px-12 lg:pt-16">
        <div className="mx-auto max-w-4xl">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block bg-[#FF6900]/10 border border-[#FF6900]/30 px-3 py-1 text-[9px] font-ibm-plex-mono font-bold uppercase tracking-widest text-[#FF6900]">
              {article.category?.badge_label || 'TECHNICAL WHITE PAPER'}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-ibm-plex-mono text-[#888]">
              <Clock className="h-3 w-3 text-[#666]" />
              {article.reading_time_mins} Min Read
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-ibm-plex-mono text-[#888]">
              <Calendar className="h-3 w-3 text-[#666]" />
              {new Date(article.published_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="font-barlow-condensed text-4xl sm:text-6xl lg:text-7xl font-black uppercase italic tracking-tight text-white leading-[0.92]">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="mt-4 font-inter text-base sm:text-xl text-[#bbb] leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Author Byline */}
          {article.author && (
            <div className="mt-8 pt-8 border-t border-[#1C1C1C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {article.author.avatar_url && (
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border border-[#333]">
                    <Image
                      src={article.author.avatar_url}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-barlow-condensed text-lg font-bold text-white">
                      {article.author.name}
                    </span>
                    {article.author.credentials && (
                      <span className="hidden sm:inline text-[10px] font-ibm-plex-mono text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 border border-[#FF6900]/20">
                        {article.author.credentials}
                      </span>
                    )}
                  </div>
                  <p className="font-ibm-plex-mono text-[10px] text-[#777]">
                    {article.author.role}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {article.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#262626] bg-[#111] px-2.5 py-1 text-[9px] font-ibm-plex-mono text-[#888]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ─── FEATURED IMAGE ──────────────────────────────────────────────── */}
      {article.featured_image_url && (
        <div className="border-b border-[#1F1F1F] bg-[#050505]">
          <div className="mx-auto max-w-5xl px-6 sm:px-12 py-8">
            <div className="relative aspect-[21/9] w-full overflow-hidden border border-[#222] bg-[#111]">
              <Image
                src={article.featured_image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── EDITORIAL BODY ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-12">
        <div className="grid grid-cols-1 gap-12">
          {/* Main Article Prose */}
          <div className="prose prose-invert prose-orange max-w-none font-inter text-[#ccc] leading-relaxed text-sm sm:text-base prose-headings:font-barlow-condensed prose-headings:uppercase prose-headings:italic prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h2:border-b prose-h2:border-[#222] prose-h2:pb-3 prose-h2:mt-12 prose-strong:text-white prose-table:border-collapse prose-th:border prose-th:border-[#333] prose-th:bg-[#141414] prose-th:p-3 prose-th:font-ibm-plex-mono prose-th:text-xs prose-td:border prose-td:border-[#222] prose-td:p-3 prose-td:text-xs prose-hr:border-[#222]">
            {/* Render plain text or simple markdown formatting */}
            <div className="whitespace-pre-line leading-relaxed space-y-4">
              {article.content_markdown}
            </div>
          </div>

          {/* ─── RELATED HARDWARE / MACHINERY CARDS ─────────────────────── */}
          {relatedMachines.length > 0 && (
            <div className="mt-12 border-t border-[#222] pt-12">
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6900]">
                // ENGINEERED HARDWARE
              </span>
              <h3 className="mt-2 font-barlow-condensed text-3xl font-black uppercase italic text-white mb-6">
                APPLICABLE ALKOTA MACHINERY & PLATFORMS
              </h3>
              <p className="font-inter text-xs text-[#888] mb-6">
                The technical principles detailed in this paper are built directly into the following Alkota systems:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedMachines.map((machine: any) => (
                  <Link
                    key={machine.id}
                    href={`/machines/${machine.category}/${machine.slug}`}
                    className="flex flex-col justify-between border border-[#222] bg-[#0E0E0E] p-5 hover:border-[#FF6900] transition-colors group"
                  >
                    <div>
                      <span className="text-[8px] font-ibm-plex-mono font-bold uppercase tracking-widest text-[#FF6900]">
                        {machine.series || machine.category}
                      </span>
                      <h4 className="mt-1 font-barlow-condensed text-2xl font-black uppercase italic text-white group-hover:text-[#FF6900] transition-colors">
                        {machine.name}
                      </h4>
                      <p className="mt-2 font-inter text-xs text-[#777] line-clamp-2">
                        {machine.tagline || machine.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1A1A1A] flex items-center justify-between font-ibm-plex-mono text-[10px]">
                      <span className="text-white font-bold">
                        {machine.pressure_bar ? `${machine.pressure_bar} BAR` : 'Heavy Duty'} • {machine.flow_rate_lpm ? `${machine.flow_rate_lpm} L/MIN` : ''}
                      </span>
                      <span className="text-[#FF6900] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Specs <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ─── AUTHOR BIO CARD ───────────────────────────────────────── */}
          {article.author && (
            <div className="border border-[#222] bg-[#0D0D0D] p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
              {article.author.avatar_url && (
                <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden border border-[#333]">
                  <Image
                    src={article.author.avatar_url}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-barlow-condensed text-2xl font-bold uppercase text-white">
                    {article.author.name}
                  </h4>
                  <span className="font-ibm-plex-mono text-[9px] text-[#FF6900] uppercase">
                    AUTHOR
                  </span>
                </div>
                <p className="font-ibm-plex-mono text-[10px] text-[#777] mb-3">
                  {article.author.role} • {article.author.credentials}
                </p>
                <p className="font-inter text-xs text-[#999] leading-relaxed">
                  {article.author.bio}
                </p>
              </div>
            </div>
          )}

          {/* ─── CONSULTATION BANNER ───────────────────────────────────── */}
          <div className="border border-[#FF6900]/40 bg-[#FF6900]/5 p-8 sm:p-10 text-center">
            <h3 className="font-barlow-condensed text-3xl sm:text-4xl font-black uppercase italic text-white leading-tight">
              REQUIRE BESPOKE APPLICATION ENGINEERING?
            </h3>
            <p className="mt-2 font-inter text-xs sm:text-sm text-[#aaa] max-w-xl mx-auto leading-relaxed">
              Our UK team provides site assessments, wash bay drainage consultations, and thermodynamic calculations for custom industrial installations.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#FF6900] px-6 py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
              >
                <span>Consult an Applications Engineer</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+447912506738"
                className="inline-flex items-center justify-center gap-2 border border-[#333] bg-[#111] px-6 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest text-white hover:border-white transition-colors w-full sm:w-auto"
              >
                <span>Call +44 7912 506738</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
