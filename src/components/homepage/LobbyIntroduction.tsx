import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { getLobbyArticles } from '@/lib/lobby';

export default async function LobbyIntroduction() {
  const articles = await getLobbyArticles({ limit: 3 });

  const fallbackArticles = [
    {
      title: "Schedule 80 Metallurgy — Barlow's Formula & Coil Wall Stress",
      slug: "engineering-design/metallurgy-of-heavy-heating-coils-schedule-80",
      category: "Engineering Design",
      time: 12,
      excerpt: "Technical analysis of hoop stress resistance, wall thickness tolerances, and thermal shock survivability in heavy industrial coils.",
    },
    {
      title: "UK Wash Bay Drainage & Environment Agency PPG3 Compliance",
      slug: "regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators",
      category: "Regulatory Compliance",
      time: 8,
      excerpt: "Guidance on trade effluent consents, oil-water separation systems, and closed-loop recycling for commercial vehicle washing.",
    },
    {
      title: "Vapour Steam vs. High-Pressure Hot Water — Thermal Breakdown",
      slug: "application-science/vapour-steam-vs-high-pressure-hot-water-thermal-breakdown",
      category: "Application Science",
      time: 10,
      excerpt: "Thermodynamic comparison of dry saturated steam versus pressurized hot water for food hygiene and grease matrix emulsification.",
    },
  ];

  const featured = articles[0] || fallbackArticles[0];
  const secondary = articles.slice(1, 3).length === 2 ? articles.slice(1, 3) : fallbackArticles.slice(1, 3);

  return (
    <section className="bg-white text-alkota-black py-24 sm:py-32 border-t border-[#E0E0DC] font-normal" aria-label="The Lobby Editorial Journal">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-[#E0E0DC] mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-alkota-orange block mb-3 font-light">
              Editorial Repository
            </span>
            <h2 className="font-extralight text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-none">
              The Lobby.
            </h2>
          </div>
          <Link
            href="/lobby"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors no-underline shrink-0 font-normal"
          >
            <span>Enter The Lobby</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Embedded Journal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Featured Editorial */}
          <div className="lg:col-span-7 font-normal">
            <Link
              href={articles[0] ? `/lobby/${articles[0].category_slug}/${articles[0].slug}` : `/lobby/${fallbackArticles[0].slug}`}
              className="group block no-underline text-inherit"
            >
              <div className="aspect-[16/9] bg-[#EFEFEA] overflow-hidden mb-6">
                <img
                  src="/assets/industries/manufacturing.png"
                  alt={featured.title}
                  className="w-full h-full object-cover filter brightness-[0.85] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-4 text-[11px] text-[#777] mb-3 font-light">
                <span className="text-alkota-orange uppercase">
                  {(featured as any).category?.name || (featured as any).category_slug || (featured as any).category}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {(featured as any).reading_time_mins || (featured as any).time} min read
                </span>
              </div>
              <h3 className="font-light text-2xl sm:text-3xl text-alkota-black group-hover:text-alkota-orange transition-colors leading-tight mb-3">
                {featured.title}
              </h3>
              <p className="text-sm sm:text-base text-[#666] leading-relaxed line-clamp-3 font-normal">
                {featured.excerpt}
              </p>
            </Link>
          </div>

          {/* Secondary Editorial List */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-[#E0E0DC] font-normal">
            {secondary.map((item, idx) => (
              <Link
                key={idx}
                href={(item as any).category_slug ? `/lobby/${(item as any).category_slug}/${(item as any).slug}` : `/lobby/${(item as any).slug}`}
                className="py-6 first:pt-0 last:pb-0 group block no-underline text-inherit font-normal"
              >
                <div className="flex items-center gap-3 text-[10px] text-[#888] mb-2 font-light">
                  <span className="text-alkota-orange uppercase">
                    {(item as any).category?.name || (item as any).category_slug || (item as any).category}
                  </span>
                  <span>·</span>
                  <span>{(item as any).reading_time_mins || (item as any).time} min read</span>
                </div>
                <h4 className="font-light text-lg text-alkota-black group-hover:text-alkota-orange transition-colors leading-snug mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[#777] leading-relaxed line-clamp-2 font-normal">
                  {item.excerpt}
                </p>
              </Link>
            ))}

            <div className="pt-8 font-normal">
              <Link
                href="/lobby"
                className="inline-flex items-center gap-3 bg-alkota-black text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group font-normal"
              >
                <span>Browse All Whitepapers & Guides</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
