import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, FileText, Sparkles } from 'lucide-react';
import { getLobbyArticles } from '@/lib/lobby';

export default async function LobbyIntroduction() {
  const articles = await getLobbyArticles({ limit: 3 });

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#FFFFFF] border-b border-[#D8D8D6]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8D8D6] pb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#FF6900] animate-pulse" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#FF6900]">
                EDITORIAL REPOSITORY // THE LOBBY
              </span>
            </div>
            <h2 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-alkota-black leading-none">
              ENGINEERING INTELLIGENCE.
            </h2>
          </div>
          <Link
            href="/lobby"
            className="inline-flex items-center gap-2 bg-alkota-black text-white px-6 py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-alkota-orange transition-colors no-underline group"
          >
            <span>Enter The Lobby</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Featured Whitepapers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/lobby/${art.category_slug}/${art.slug}`}
              className="flex flex-col justify-between border border-[#D5D5D3] bg-[#F8F8F7] p-8 hover:border-alkota-orange hover:bg-white transition-all group no-underline"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-ibm-plex-mono font-bold uppercase tracking-wider text-alkota-orange bg-alkota-orange/10 px-2 py-0.5">
                    {art.category?.name || art.category_slug}
                  </span>
                  <span className="flex items-center gap-1 font-ibm-plex-mono text-[9px] text-[#777]">
                    <Clock className="h-3 w-3" />
                    {art.reading_time_mins} min read
                  </span>
                </div>

                <h3 className="font-barlow-condensed text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-alkota-black group-hover:text-alkota-orange transition-colors leading-tight mb-3">
                  {art.title}
                </h3>

                <p className="font-inter text-xs text-[#666] leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E5E5E3] flex items-center justify-between font-ibm-plex-mono text-[10px]">
                <span className="text-[#888]">By {art.author?.name || 'Alkota Engineer'}</span>
                <span className="text-alkota-orange font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Paper <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
