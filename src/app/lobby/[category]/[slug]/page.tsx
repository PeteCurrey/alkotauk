import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  getLobbyArticleBySlug,
  getLobbyArticles,
  LobbyArticle,
} from '@/lib/lobby';
import { getProductBySlug } from '@/lib/products';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Flame,
  BarChart3,
  ExternalLink,
  BookOpen,
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
    <article className="bg-[#FAFAF8] text-[#1A1A18] font-normal pb-24">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── BREADCRUMB ──────────────────────────────────────────────────── */}
      <div className="border-b border-[#E5E5E0] bg-white px-6 py-4 sm:px-12">
        <div className="mx-auto max-w-5xl flex items-center justify-between text-xs font-mono text-[#777]">
          <div className="flex items-center gap-2">
            <Link href="/lobby" className="hover:text-[#FF6900] transition-colors no-underline text-[#777]">
              The Lobby
            </Link>
            <ChevronRight className="h-3 w-3 text-[#ccc]" />
            <Link
              href={'/lobby#' + article.category_slug}
              className="text-[#FF6900] hover:underline no-underline uppercase"
            >
              {article.category?.name || article.category_slug}
            </Link>
            <ChevronRight className="h-3 w-3 text-[#ccc]" />
            <span className="text-[#333] truncate max-w-xs sm:max-w-md">
              {article.slug}
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

      {/* ─── ARTICLE HEADER ──────────────────────────────────────────────── */}
      <header className="border-b border-[#E5E5E0] bg-white px-6 pt-12 pb-14 sm:px-12 lg:pt-16">
        <div className="mx-auto max-w-4xl">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block bg-[#FF6900]/10 border border-[#FF6900]/30 px-3 py-1 text-[10px] font-mono font-medium uppercase tracking-wider text-[#FF6900]">
              {article.category?.badge_label || 'TECHNICAL WHITE PAPER'}
            </span>
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
                {article.author.avatar_url && (
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border border-[#E5E5E0]">
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
                    <span className="font-normal text-base text-[#1A1A18]">
                      {article.author.name}
                    </span>
                    {article.author.credentials && (
                      <span className="hidden sm:inline text-[10px] font-mono text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 border border-[#FF6900]/20">
                        {article.author.credentials}
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-[#777]">
                    {article.author.role}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {article.tags?.map((tag) => (
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
            <div className="relative aspect-[21/9] w-full overflow-hidden border border-[#E5E5E0] bg-[#EEE] shadow-sm">
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
          <div className="text-[#2A2A28] leading-relaxed text-base sm:text-lg space-y-6 font-normal whitespace-pre-line">
            {article.content_markdown}
          </div>

          {/* ─── RELATED HARDWARE / MACHINERY CARDS ─────────────────────── */}
          {relatedMachines.length > 0 && (
            <div className="mt-12 border-t border-[#E5E5E0] pt-12">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-[#FF6900]">
                Engineered Hardware
              </span>
              <h3 className="mt-2 font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-[#1A1A18] mb-6">
                Applicable Alkota Machinery & Platforms
              </h3>
              <p className="text-xs sm:text-sm text-[#666] mb-6 font-normal">
                The technical principles detailed in this paper are built directly into the following Alkota systems:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedMachines.map((machine: any) => (
                  <Link
                    key={machine.id}
                    href={'/machines/' + machine.category + '/' + machine.slug}
                    className="flex flex-col justify-between border border-[#E5E5E0] bg-white p-6 hover:border-[#FF6900] transition-colors group no-underline shadow-xs"
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
                        {machine.pressure_bar ? machine.pressure_bar + ' BAR' : 'Heavy Duty'} {machine.flow_rate_lpm ? '• ' + machine.flow_rate_lpm + ' L/MIN' : ''}
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

          {/* Return & Inquiries */}
          <div className="mt-8 pt-8 border-t border-[#E5E5E0] flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/lobby"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1A1A18] hover:text-[#FF6900] no-underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to The Lobby Index</span>
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
      </div>
    </article>
  );
}
