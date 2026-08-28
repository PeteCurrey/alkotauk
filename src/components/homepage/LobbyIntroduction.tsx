import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { getLobbyArticles } from '@/lib/lobby';

export default async function LobbyIntroduction() {
  const articles = await getLobbyArticles({ limit: 3 });

  return (
    <section className="bg-[#F5F4F0]" aria-label="The Lobby — Engineering Intelligence">

      {/* ── Full-width editorial header ─────────────────────────────── */}
      <div className="flex flex-col lg:flex-row">

        {/* Left — large editorial statement */}
        <div className="w-full lg:w-[50%] bg-alkota-black px-8 sm:px-12 lg:px-16 py-20 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange animate-pulse" />
            <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
              Editorial Repository
            </span>
          </div>
          <h2 className="font-barlow-condensed font-black uppercase italic tracking-tight text-white leading-[0.88] mb-6"
            style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
          >
            THE<br />
            <span className="text-alkota-orange">LOBBY.</span>
          </h2>
          <p className="font-inter text-[#aaa] leading-relaxed mb-10 font-normal"
            style={{ fontSize: '1rem', maxWidth: '36ch' }}
          >
            Industry intelligence, technical white papers, environmental compliance guides, and professional resources — built for the engineers and procurement leads who specify industrial cleaning equipment.
          </p>
          <Link
            href="/lobby"
            className="inline-flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group"
          >
            <span>Enter The Lobby</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right — featured article list */}
        <div className="w-full lg:w-[50%] flex flex-col divide-y divide-[#E0E0DE]">
          {articles.length > 0 ? articles.map((art, i) => (
            <Link
              key={art.id}
              href={`/lobby/${art.category_slug}/${art.slug}`}
              className="flex flex-col justify-between px-8 sm:px-12 py-10 bg-white hover:bg-[#F8F8F6] transition-colors no-underline group flex-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-ibm-plex-mono font-bold uppercase tracking-wider text-alkota-orange bg-alkota-orange/10 px-2 py-0.5">
                    {art.category?.name || art.category_slug}
                  </span>
                  <span className="flex items-center gap-1.5 font-ibm-plex-mono text-[9px] text-[#888]">
                    <Clock className="h-3 w-3" />
                    {art.reading_time_mins} min read
                  </span>
                </div>
                <h3 className="font-inter text-base font-bold text-alkota-black group-hover:text-alkota-orange transition-colors leading-tight mb-2">
                  {art.title}
                </h3>
                <p className="font-inter text-xs text-[#777] leading-relaxed line-clamp-2">
                  {art.excerpt}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between font-ibm-plex-mono text-[10px]">
                <span className="text-[#888]">By {art.author?.name || 'Alkota Engineering'}</span>
                <span className="text-alkota-orange font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          )) : (
            /* Fallback when no articles */
            [
              { title: 'Schedule 80 Metallurgy — Barlow\'s Formula & Coil Wall Stress', slug: 'engineering-design/metallurgy-of-heavy-heating-coils-schedule-80', category: 'Engineering Design', time: 12 },
              { title: 'UK Wash Bay Drainage & Environment Agency PPG3 Compliance', slug: 'regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators', category: 'Regulatory Compliance', time: 8 },
              { title: 'Vapour Steam vs. High-Pressure Hot Water — Thermal Breakdown', slug: 'application-science/vapour-steam-vs-high-pressure-hot-water-thermal-breakdown', category: 'Application Science', time: 10 },
            ].map((art, i) => (
              <Link
                key={i}
                href={`/lobby/${art.slug}`}
                className="flex flex-col justify-between px-8 sm:px-12 py-10 bg-white hover:bg-[#F8F8F6] transition-colors no-underline group flex-1"
              >
                <div>
                  <span className="text-[9px] font-ibm-plex-mono font-bold uppercase tracking-wider text-alkota-orange bg-alkota-orange/10 px-2 py-0.5 inline-block mb-4">
                    {art.category}
                  </span>
                  <h3 className="font-inter text-base font-bold text-alkota-black group-hover:text-alkota-orange transition-colors leading-tight">
                    {art.title}
                  </h3>
                </div>
                <div className="mt-6 flex items-center justify-between font-ibm-plex-mono text-[10px]">
                  <span className="text-[#888] flex items-center gap-1"><Clock className="h-3 w-3" /> {art.time} min read</span>
                  <span className="text-alkota-orange font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
