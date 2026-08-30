import Link from 'next/link';
import { getLobbyArticles, getLobbyCategories, LobbyArticle } from '@/lib/lobby';
import {
  ExternalLink,
  Sparkles,
  Star,
  TrendingUp,
  ShieldCheck,
  History,
  BookOpen,
  Wrench,
  Cpu,
  MapPin,
  Factory,
  BarChart3,
  Flame,
} from 'lucide-react';

export default async function AdminLobbyPage() {
  const [articles, categories] = await Promise.all([
    getLobbyArticles(),
    getLobbyCategories(),
  ]);

  const trendingCount = articles.filter((a) => a.is_trending).length;
  const evergreenCount = articles.filter((a) => a.is_evergreen).length;
  const adaptedCount = articles.filter((a) => a.provenance_type === 'us_adapted').length;
  const originalCount = articles.filter((a) => !a.provenance_type || a.provenance_type === 'uk_original').length;

  const PILLARS = [
    { slug: 'good-clean-news', name: 'Good Clean News', icon: BookOpen },
    { slug: 'knowledge', name: 'Knowledge', icon: Cpu },
    { slug: 'workshop', name: 'Workshop', icon: Wrench },
    { slug: 'field-notes', name: 'Field Notes', icon: MapPin },
    { slug: 'industries', name: 'Industries', icon: Factory },
    { slug: 'trade-desk', name: 'Trade Desk', icon: BarChart3 },
    { slug: 'inside-alkota', name: 'Inside Alkota', icon: Flame },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
            The Lobby Editorial CMS
          </h1>
          <p className="font-ibm-plex-mono text-[10px] text-[#777] uppercase tracking-widest mt-1">
            // {articles.length} verified technical publications · 7 destination pillars
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/lobby"
            target="_blank"
            className="flex items-center gap-2 border border-[#333] px-4 py-2.5 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-[#ccc] hover:text-white hover:border-[#FF6900] transition-colors"
          >
            <span>Launch Live Lobby</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#FF6900]" />
          </Link>
        </div>
      </div>

      {/* KPI Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#777] uppercase font-bold">
            Total Published
          </p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {articles.length}
          </h3>
          <p className="font-ibm-plex-mono text-[10px] text-[#FF6900] mt-1">
            Across 7 Knowledge Pillars
          </p>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#777] uppercase font-bold">
            Evergreen Reference
          </p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {evergreenCount}
          </h3>
          <p className="font-ibm-plex-mono text-[10px] text-amber-400 mt-1 flex items-center gap-1">
            <Star className="h-3 w-3" /> Core Technical Foundations
          </p>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#777] uppercase font-bold">
            Trending Dispatches
          </p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {trendingCount}
          </h3>
          <p className="font-ibm-plex-mono text-[10px] text-[#FF6900] mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Promoted on Lobby Cover
          </p>
        </div>

        <div className="border border-[#222] bg-[#0E0E0E] p-4">
          <p className="font-ibm-plex-mono text-[9px] text-[#777] uppercase font-bold">
            Provenance Split
          </p>
          <h3 className="font-barlow-condensed text-3xl font-black text-white mt-1">
            {originalCount} <span className="text-sm font-normal text-[#555]">UK /</span> {adaptedCount} <span className="text-sm font-normal text-[#555]">US</span>
          </h3>
          <p className="font-ibm-plex-mono text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Verified Standards
          </p>
        </div>
      </div>

      {/* Seven Pillar Breakdown */}
      <div>
        <h2 className="font-barlow-condensed text-xl font-bold uppercase text-white mb-3 tracking-wider">
          Pillar Distribution
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const count = articles.filter(
              (a) => a.pillar === pillar.slug || a.category_slug === pillar.slug
            ).length;
            return (
              <Link
                key={pillar.slug}
                href={`/lobby/${pillar.slug}`}
                target="_blank"
                className="border border-[#222] bg-[#0E0E0E] hover:border-[#FF6900] p-3 transition-colors group block no-underline"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-4 w-4 text-[#777] group-hover:text-[#FF6900] transition-colors" />
                  <span className="font-ibm-plex-mono text-xs font-bold text-white">
                    {count}
                  </span>
                </div>
                <p className="font-barlow-condensed text-sm font-bold uppercase text-[#ccc] group-hover:text-white leading-tight">
                  {pillar.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Articles Table */}
      <div className="border border-[#222] bg-[#0A0A0A]">
        <div className="border-b border-[#222] bg-[#141414] px-6 py-4 flex items-center justify-between">
          <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest text-white">
            Editorial Publications & Research Papers
          </span>
          <span className="font-ibm-plex-mono text-[9px] text-[#666]">
            Showing {articles.length} verified publications
          </span>
        </div>

        <div className="divide-y divide-[#1A1A1A]">
          {articles.map((article) => (
            <div
              key={article.id}
              className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#111] transition-colors"
            >
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[9px] font-ibm-plex-mono font-bold uppercase tracking-wider text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 border border-[#FF6900]/20">
                    {article.pillar || article.category?.name || article.category_slug}
                  </span>

                  {article.is_featured && (
                    <span className="text-[9px] font-ibm-plex-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 border border-amber-400/20 flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" /> Featured Lead
                    </span>
                  )}

                  {article.is_evergreen && (
                    <span className="text-[9px] font-ibm-plex-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 border border-emerald-400/20 flex items-center gap-1">
                      <Star className="h-2.5 w-2.5" /> Evergreen
                    </span>
                  )}

                  {article.is_trending && (
                    <span className="text-[9px] font-ibm-plex-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-400/10 px-2 py-0.5 border border-orange-400/20 flex items-center gap-1">
                      <TrendingUp className="h-2.5 w-2.5" /> Trending
                    </span>
                  )}

                  {article.provenance_type === 'us_adapted' && (
                    <span className="text-[9px] font-ibm-plex-mono text-purple-400 bg-purple-400/10 px-2 py-0.5 border border-purple-400/20">
                      US Adapted
                    </span>
                  )}

                  {article.difficulty_level && (
                    <span className="text-[9px] font-ibm-plex-mono text-[#888] bg-[#1A1A1A] px-2 py-0.5 capitalize">
                      {article.difficulty_level.replace(/_/g, ' ')}
                    </span>
                  )}

                  <span className="font-ibm-plex-mono text-[9px] text-[#666]">
                    {article.reading_time_mins} min read
                  </span>
                </div>

                <h3 className="font-barlow-condensed text-xl font-bold text-white leading-tight">
                  {article.title}
                </h3>
                <p className="font-inter text-xs text-[#777] line-clamp-1 mt-1">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-3 font-ibm-plex-mono text-[9px] text-[#555] mt-2">
                  <span>Author: <strong className="text-[#888]">{article.author?.name || 'Alkota Editorial'}</strong></span>
                  <span>•</span>
                  <span>Route: <code className="text-[#888]">/lobby/{article.category_slug}/{article.slug}</code></span>
                  {article.related_machine_slugs && article.related_machine_slugs.length > 0 && (
                    <>
                      <span>•</span>
                      <span>Machines: <strong className="text-[#888]">{article.related_machine_slugs.join(', ')}</strong></span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/lobby/${article.category_slug}/${article.slug}`}
                  target="_blank"
                  className="flex items-center gap-1.5 border border-[#333] px-3.5 py-2 font-ibm-plex-mono text-[9px] font-bold uppercase tracking-wider text-[#ccc] hover:border-[#FF6900] hover:text-white transition-colors no-underline"
                >
                  <ExternalLink className="h-3 w-3 text-[#FF6900]" />
                  <span>Preview</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
