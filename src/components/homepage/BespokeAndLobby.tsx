import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { getLobbyArticles } from '@/lib/lobby';

export default async function BespokeAndLobby() {
  const articles = await getLobbyArticles({ limit: 1 });
  const featured = articles[0] || {
    title: "Schedule 80 Metallurgy — Barlow's Formula & Coil Wall Stress",
    slug: "engineering-design/metallurgy-of-heavy-heating-coils-schedule-80",
    category_slug: "engineering-design",
    category: { name: "Engineering Design" },
    reading_time_mins: 12,
    excerpt: "Technical analysis of hoop stress resistance, wall thickness tolerances, and thermal shock survivability in heavy industrial coils.",
  };

  return (
    <section className="bg-white text-alkota-black py-28 sm:py-36 px-6 sm:px-12 font-normal overflow-hidden" aria-label="Bespoke Engineering and The Lobby">
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left Column: Bespoke Engineering */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full font-normal">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
                Custom Systems
              </span>
              <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
                Bespoke Engineering.
              </h2>
              <div className="aspect-[16/10] bg-[#EFEFEA] flex items-center justify-center p-6 mb-8 overflow-hidden rounded-[6px] shadow-tactile-sm">
                <img
                  src="/assets/products/trailer-single.png"
                  alt="Alkota Custom Mobile Wash Trailer"
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)]"
                  loading="lazy"
                />
              </div>
              <p className="text-base text-[#555] leading-relaxed mb-8 font-normal">
                Single and tandem-axle highway wash rigs, multi-lance skid-mounted plant, and closed-loop water treatment systems tailored to your transport platform and site power specs.
              </p>
            </div>
            <div>
              <Link
                href="/machines/trailers"
                className="inline-flex items-center gap-3 bg-alkota-black text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-alkota-orange transition-colors no-underline group shadow-md font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
              >
                <span>Discuss Your Application</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: The Lobby Knowledge Preview */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full font-normal">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
                The Lobby // Journal
              </span>
              <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-alkota-black leading-tight mb-6">
                Technical Knowledge.
              </h2>
              <div className="aspect-[16/10] bg-[#141412] overflow-hidden mb-8 rounded-[6px] shadow-tactile-sm">
                <img
                  src="/assets/industries/manufacturing.png"
                  alt={featured.title}
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1]"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-[#777] mb-3 font-light">
                <span className="text-alkota-orange uppercase">
                  {(featured as any).category?.name || (featured as any).category_slug || 'Engineering'}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {(featured as any).reading_time_mins || 10} min read
                </span>
              </div>
              <h3 className="font-light text-xl sm:text-2xl text-alkota-black leading-snug mb-3">
                {featured.title}
              </h3>
              <p className="text-sm sm:text-base text-[#666] leading-relaxed mb-8 line-clamp-3 font-normal">
                {featured.excerpt}
              </p>
            </div>
            <div>
              <Link
                href="/lobby"
                className="inline-flex items-center gap-3 border border-alkota-black text-alkota-black px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-alkota-black hover:text-white transition-all no-underline group font-normal rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
              >
                <span>Enter The Lobby</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
