'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { LobbyArticle } from '@/lib/lobby';

interface CategoryLobbyKnowledgeProps {
  categorySlug: string;
  articles: LobbyArticle[];
}

export default function CategoryLobbyKnowledge({
  categorySlug,
  articles,
}: CategoryLobbyKnowledgeProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="bg-white border-b border-[#E5E5E0] py-20 px-6 sm:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] font-mono font-medium uppercase tracking-[0.25em] text-[#FF6900] block mb-2">
              Engineering Knowledge & Regulation
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-tight">
              Intelligence From The Lobby
            </h2>
          </div>
          <Link
            href="/lobby"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6900] hover:text-[#1A1A18] transition-colors no-underline"
          >
            <span>Explore All Intelligence</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/lobby/${article.category_slug}/${article.slug}`}
              className="group flex flex-col justify-between bg-[#FAFAF8] border border-[#E5E5E0] hover:border-[#FF6900] transition-colors p-6 sm:p-8 no-underline"
            >
              <div>
                <div className="flex items-center justify-between mb-4 text-[10px] font-mono text-[#888]">
                  <span className="text-[#FF6900] font-medium uppercase">
                    {article.category?.name || 'TECHNICAL PAPER'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.reading_time_mins} Min Read
                  </span>
                </div>

                <h3 className="font-light text-xl uppercase tracking-tight text-[#1A1A18] group-hover:text-[#FF6900] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>
                <p className="font-normal text-xs text-[#666] line-clamp-3 leading-relaxed mb-6">
                  {article.excerpt || article.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAEAE5] flex items-center justify-between font-mono text-xs text-[#FF6900]">
                <span>Read Analysis</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
