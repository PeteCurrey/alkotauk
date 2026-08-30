import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  getLobbyArticleBySlug,
  getLobbyArticles,
  getRelatedLobbyArticles,
} from '@/lib/lobby';
import { getProductBySlug } from '@/lib/products';
import ArticleTOC from '@/components/lobby/ArticleTOC';
import ProvenanceBanner from '@/components/lobby/ProvenanceBanner';
import ArticleMarkdown from '@/components/lobby/ArticleMarkdown';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  ChevronRight,
  Star,
  Tag,
  BookOpen,
  AlertTriangle,
  Wrench,
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
    return { title: 'Article Not Found | The Lobby' };
  }

  const title = article.seo_title || `${article.title} | The Lobby — Alkota UK`;
  const description = article.seo_description || article.excerpt || article.subtitle || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: article.author ? [article.author.name] : ['Alkota UK'],
      images: article.featured_image_url ? [article.featured_image_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: article.featured_image_url ? [article.featured_image_url] : [],
    },
    ...(article.canonical_url
      ? { alternates: { canonical: article.canonical_url } }
      : {}),
  };
}

export default async function LobbyArticlePage({ params }: Props) {
  const { category: categorySlug, slug } = await params;
  const article = await getLobbyArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch related machines and related articles in parallel
  const [relatedMachines, relatedArticles] = await Promise.all([
    Promise.all(
      (article.related_machine_slugs || []).map(async (mSlug) => {
        try {
          return await getProductBySlug(mSlug);
        } catch {
          return null;
        }
      })
    ).then((res) => res.filter(Boolean)),
    getRelatedLobbyArticles(article, 3),
  ]);

  // Extract headings from markdown for the sticky TOC
  const headings = (article.content_markdown.match(/^#{1,3} .+$/gm) || [])
    .map((line) => {
      const level = line.match(/^(#+)/)?.[1].length ?? 2;
      const text = line.replace(/^#+\s+/, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 60);
      return { id, text, level };
    })
    .filter((h) => h.level <= 3);


  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': article.pillar === 'workshop' ? 'HowTo' : 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image_url,
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
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
    ...(article.difficulty_level && {
      educationalLevel: article.difficulty_level.replace(/_/g, ' '),
    }),
  };

  const difficultyLabel: Record<string, string> = {
    foundational: 'Foundational',
    intermediate: 'Intermediate',
    advanced_engineering: 'Advanced Engineering',
  };

  return (
    <article className="bg-[#FAFAF8] text-[#1A1A18] font-normal">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── BREADCRUMB ──────────────────────────────────────────────────── */}
      <div className="border-b border-[#E5E5E0] bg-white px-6 py-4 sm:px-12 pt-24">
        <div className="mx-auto max-w-5xl flex items-center justify-between text-xs font-mono text-[#777]">
          <div className="flex items-center gap-2">
            <Link href="/lobby" className="hover:text-[#FF6900] transition-colors no-underline text-[#777] uppercase tracking-wider">
              The Lobby
            </Link>
            <ChevronRight className="h-3 w-3 text-[#ccc]" />
            <Link
              href={`/lobby/${article.category_slug}`}
              className="text-[#FF6900] hover:underline no-underline uppercase tracking-wider"
            >
              {article.category?.name || article.category_slug}
            </Link>
            <ChevronRight className="h-3 w-3 text-[#ccc]" />
            <span className="text-[#333] truncate max-w-[200px] sm:max-w-md">
              {article.title}
            </span>
          </div>
          <Link
            href="/lobby"
            className="hidden sm:inline-flex items-center gap-1.5 text-[#555] hover:text-[#FF6900] transition-colors no-underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Intelligence</span>
          </Link>
        </div>
      </div>

      {/* ─── PROVENANCE BANNER ───────────────────────────────────────────── */}
      {article.provenance_type && article.provenance_type !== 'uk_original' && (
        <div className="px-6 sm:px-12 pt-6 bg-white">
          <div className="mx-auto max-w-4xl">
            <ProvenanceBanner article={article} />
          </div>
        </div>
      )}


      {/* ─── ARTICLE HEADER ──────────────────────────────────────────────── */}
      <header className="border-b border-[#E5E5E0] bg-white px-6 pt-12 pb-14 sm:px-12 lg:pt-16">
        <div className="mx-auto max-w-4xl">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block bg-[#FF6900]/10 border border-[#FF6900]/30 px-3 py-1 text-[10px] font-mono font-medium uppercase tracking-wider text-[#FF6900]">
              {article.category?.badge_label || article.category?.name || 'Technical White Paper'}
            </span>
            {article.difficulty_level && (
              <span className="inline-block border border-[#E5E5E0] bg-[#FAFAF8] px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#666]">
                {difficultyLabel[article.difficulty_level] || article.difficulty_level}
              </span>
            )}
            {article.is_evergreen && (
              <span className="inline-flex items-center gap-1 border border-[#FF6900]/30 bg-[#FF6900]/5 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#FF6900]">
                <Star className="h-2.5 w-2.5" />
                Evergreen Reference
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#777]">
              <Clock className="h-3.5 w-3.5 text-[#FF6900]" />
              {article.reading_time_mins} Min Read
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#777]">
              <Calendar className="h-3.5 w-3.5 text-[#777]" />
              {new Date(article.published_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="font-extralight text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#1A1A18] leading-tight mb-4">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="font-light text-lg sm:text-xl text-[#555] leading-relaxed mb-8">
              {article.subtitle}
            </p>
          )}

          {/* Author Byline */}
          {article.author && (
            <div className="pt-6 border-t border-[#E5E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {article.author.avatar_url ? (
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border border-[#E5E5E0] shrink-0">
                    <Image
                      src={article.author.avatar_url}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-[#1A1A18] flex items-center justify-center text-white font-mono text-sm shrink-0">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-normal text-base text-[#1A1A18]">
                      {article.author.name}
                    </span>
                    {article.author.credentials && (
                      <span className="hidden sm:inline text-[10px] font-mono text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 border border-[#FF6900]/20">
                        {article.author.credentials}
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-[#777]">{article.author.role}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {article.tags?.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#E5E5E0] bg-[#FAFAF8] px-2.5 py-1 text-[10px] font-mono text-[#666]"
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
        <div className="border-b border-[#E5E5E0] bg-[#FAFAF8]">
          <div className="mx-auto max-w-5xl px-6 sm:px-12 py-8">
            <div className="relative aspect-[21/9] w-full overflow-hidden border border-[#E5E5E0] bg-[#EEE]">
              <Image
                src={article.featured_image_url}
                alt={article.hero_alt_text || article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
            {article.hero_alt_text && (
              <p className="mt-2 text-[11px] font-mono text-[#999] text-center italic">
                {article.hero_alt_text}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ─── EDITORIAL BODY — STICKY TOC + MAIN PROSE ───────────────────── */}
      <div className="mx-auto max-w-7xl px-6 sm:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Main Article Prose — 8 cols */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <ArticleMarkdown content={article.content_markdown} />

            {/* ─── INDUSTRIES TAGS ──────────────────────────────────────── */}
            {article.industries && article.industries.length > 0 && (
              <div className="mt-10 pt-8 border-t border-[#E5E5E0]">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-3.5 w-3.5 text-[#FF6900]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#999]">
                    Applicable Industries
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.industries.map((ind) => (
                    <span
                      key={ind}
                      className="border border-[#E5E5E0] bg-white px-3 py-1.5 text-[11px] font-mono text-[#555] hover:border-[#FF6900] hover:text-[#FF6900] transition-colors cursor-default"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ─── RELATED HARDWARE / MACHINERY CARDS ──────────────────── */}
            {relatedMachines.length > 0 && (
              <div className="mt-12 border-t border-[#E5E5E0] pt-12">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-3.5 w-3.5 text-[#FF6900]" />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-[#FF6900]">
                    Engineered Hardware
                  </span>
                </div>
                <h3 className="mt-1 font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-[#1A1A18] mb-2">
                  Applicable Alkota Systems
                </h3>
                <p className="text-xs sm:text-sm text-[#666] mb-6 font-normal">
                  The technical principles detailed in this paper are engineered into the following Alkota platforms:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedMachines.map((machine: any) => (
                    <Link
                      key={machine.id}
                      href={`/machines/${machine.category}/${machine.slug}`}
                      className="flex flex-col justify-between border border-[#E5E5E0] bg-white p-6 hover:border-[#FF6900] transition-colors group no-underline"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-[#FF6900]">
                          {machine.series || machine.category}
                        </span>
                        <h4 className="mt-1 font-light text-xl text-[#1A1A18] group-hover:text-[#FF6900] transition-colors">
                          {machine.name}
                        </h4>
                        <p className="mt-2 text-xs text-[#666] line-clamp-2 leading-relaxed font-normal">
                          {machine.tagline || machine.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#F0F0EE] flex items-center justify-between font-mono text-xs">
                        <span className="text-[#1A1A18]">
                          {machine.pressure_bar ? `${machine.pressure_bar} BAR` : 'Heavy Duty'}{' '}
                          {machine.flow_rate_lpm ? `· ${machine.flow_rate_lpm} L/MIN` : ''}
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

            {/* ─── RELATED ARTICLES ─────────────────────────────────────── */}
            {relatedArticles.length > 0 && (
              <div className="mt-12 border-t border-[#E5E5E0] pt-12">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-3.5 w-3.5 text-[#FF6900]" />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-[#FF6900]">
                    Related Reading
                  </span>
                </div>
                <h3 className="mt-1 font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-[#1A1A18] mb-6">
                  Continue Your Research
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/lobby/${rel.category_slug}/${rel.slug}`}
                      className="group flex flex-col border border-[#E5E5E0] bg-white hover:border-[#FF6900] transition-colors no-underline p-4"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6900] mb-2">
                        {rel.category?.name || rel.category_slug}
                      </span>
                      <h4 className="font-light text-sm text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-snug tracking-tight mb-2 flex-1">
                        {rel.title}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-[#999] group-hover:text-[#FF6900] transition-colors mt-auto pt-2 border-t border-[#F0F0EE]">
                        <Clock className="h-3 w-3" />
                        <span>{rel.reading_time_mins} min</span>
                        <ArrowRight className="h-3 w-3 ml-auto group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ─── RETURN / CONSULT FOOTER ──────────────────────────────── */}
            <div className="mt-12 pt-8 border-t border-[#E5E5E0] flex flex-wrap items-center justify-between gap-4">
              <Link
                href={`/lobby/${categorySlug}`}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1A1A18] hover:text-[#FF6900] no-underline transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to {article.category?.name || categorySlug}</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#1A1A18] text-white px-5 py-2.5 text-xs uppercase tracking-widest transition-colors font-normal no-underline"
              >
                <span>Consult an Applications Engineer</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Sticky Sidebar — 4 cols */}
          <aside className="lg:col-span-4 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Table of Contents */}
              <ArticleTOC headings={headings} />

              {/* Quick Specs Panel — if there's a difficulty or industries */}
              {(article.difficulty_level || (article.industries && article.industries.length > 0)) && (
                <div className="border border-[#E5E5E0] bg-white p-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#999] block mb-4">
                    QUICK REFERENCE
                  </span>
                  {article.difficulty_level && (
                    <div className="flex items-start gap-3 py-2.5 border-b border-[#F0F0EE]">
                      <AlertTriangle className="h-3.5 w-3.5 text-[#FF6900] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-mono uppercase tracking-wider text-[#999] mb-0.5">Technical Level</p>
                        <p className="text-xs font-medium text-[#1A1A18]">
                          {difficultyLabel[article.difficulty_level]}
                        </p>
                      </div>
                    </div>
                  )}
                  {article.industries && article.industries.length > 0 && (
                    <div className="flex items-start gap-3 py-2.5">
                      <Tag className="h-3.5 w-3.5 text-[#FF6900] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1.5">Industries</p>
                        <div className="flex flex-wrap gap-1">
                          {article.industries.map((ind) => (
                            <span key={ind} className="text-[10px] font-mono border border-[#E5E5E0] px-1.5 py-0.5 text-[#555]">
                              {ind}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Consult CTA */}
              <div className="bg-[#141416] text-white p-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF6900] block mb-3">
                  APPLICATIONS ENGINEERING
                </span>
                <h4 className="font-extralight text-xl text-white leading-tight mb-3">
                  Questions about this topic?
                </h4>
                <p className="text-xs text-white/60 leading-relaxed mb-5">
                  Speak directly with an Alkota applications engineer for site-specific advice and system specification.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-between w-full bg-[#FF6900] text-white px-4 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline font-normal"
                >
                  <span>Book a consultation</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
