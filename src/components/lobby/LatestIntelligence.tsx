'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { LobbyArticle } from '@/lib/lobby';

interface Props {
  articles: LobbyArticle[];
}

export default function LatestIntelligence({ articles }: Props) {
  const leadArticle = articles.find(a => a.is_featured) || articles[0];
  const secondaryArticles = articles.filter(a => a.id !== leadArticle?.id).slice(0, 3);

  if (!leadArticle) return null;

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#FAFAF8] border-b border-[#E5E5E0]">
      <div className="mx-auto max-w-7xl">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-light font-mono">
              Chapter 01 // Curated Research
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-none">
              Latest Intelligence.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666] max-w-md font-normal">
            Peer-reviewed engineering whitepapers, environmental compliance analyses, and thermodynamic research papers.
          </p>
        </div>

        {/* Lead Story + Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Lead Story (Large 7-Col) */}
          <div className="lg:col-span-7 group">
            <Link
              href={'/lobby/' + leadArticle.category_slug + '/' + leadArticle.slug}
              className="block no-underline"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#222] mb-6 shadow-sm border border-[#E0E0DE]">
                {leadArticle.featured_image_url && (
                  <Image
                    src={leadArticle.featured_image_url}
                    alt={leadArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                )}
                <div className="absolute top-4 left-4 bg-black/85 text-white px-3 py-1 text-[10px] uppercase font-mono tracking-widest">
                  {leadArticle.category?.name || 'Lead Investigation'}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#888] font-mono">
                  <span className="text-[#FF6900] uppercase">Featured Research</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {leadArticle.reading_time_mins} min read
                  </span>
                </div>

                <h3 className="font-extralight text-2xl sm:text-4xl text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-tight tracking-tight">
                  {leadArticle.title}
                </h3>

                <p className="text-sm sm:text-base text-[#555] leading-relaxed line-clamp-3 font-normal">
                  {leadArticle.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-[#1A1A18] font-normal group-hover:text-[#FF6900] transition-colors">
                  <span>Read Full Analysis</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Headlines Column (5-Col) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-[#E5E5E0] border-t lg:border-t-0 border-[#E5E5E0]">
            {secondaryArticles.map((art) => (
              <div key={art.id} className="py-6 first:pt-0 last:pb-0 group">
                <Link
                  href={'/lobby/' + art.category_slug + '/' + art.slug}
                  className="block no-underline space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#888]">
                    <span className="text-[#FF6900] uppercase tracking-wider">
                      {art.category?.name || art.category_slug}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {art.reading_time_mins}m
                    </span>
                  </div>

                  <h4 className="font-light text-lg sm:text-xl text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-snug tracking-tight">
                    {art.title}
                  </h4>

                  <p className="text-xs text-[#666] line-clamp-2 leading-relaxed font-normal">
                    {art.excerpt}
                  </p>

                  <div className="pt-1 flex items-center gap-1.5 text-xs text-[#333] group-hover:text-[#FF6900] transition-colors font-mono">
                    <span>Examine report</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
