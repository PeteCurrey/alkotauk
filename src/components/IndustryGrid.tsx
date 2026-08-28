import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function IndustryGrid() {
  const industries = [
    { name: 'Agriculture', slug: 'agriculture', image: '/assets/industries/agriculture.png', statement: 'Combines, livestock housing, irrigation systems. Where a clean machine runs longer.' },
    { name: 'Transport & Fleet', slug: 'transport-fleet', image: '/assets/industries/fleet.png', statement: 'HGV fleets, logistics hubs, vehicle preparation. Road film and corrosive salt removed at scale.' },
    { name: 'Food & Beverage', slug: 'food-beverage', image: '/assets/industries/food-processing.png', statement: 'HACCP-compliant steam sanitisation for production lines, cold stores and prep kitchens.' },
    { name: 'Manufacturing', slug: 'industrial', image: '/assets/industries/manufacturing.png', statement: 'Factory floor bays, press tools, conveyor lines. Continuous-duty industrial degreasing.' },
    { name: 'Construction', slug: 'construction', image: '/assets/industries/construction.png', statement: 'Earthmovers, scaffolding, concrete plant. High-pressure mud and debris removal on live sites.' },
    { name: 'Mining & Quarrying', slug: 'mining', image: '/assets/industries/mining.png', statement: 'Extraction machinery, conveyors, heavy loaders. Descaling and ore-dust management.' },
    { name: 'Waste & Recycling', slug: 'waste-management', image: '/assets/industries/waste-management.png', statement: 'Refuse fleets, skip lorries, recycling facilities. Sanitisation and grease removal at depot scale.' },
    { name: 'Oil & Gas', slug: 'oil-gas', image: '/assets/industries/oil-gas.png', statement: 'Offshore platforms, subsea equipment, terminal yards. Corrosion-resistant performance in hostile environments.' },
  ];

  return (
    <section className="bg-[#111110]" aria-label="Industry Applications">
      {/* Section Header */}
      <div className="px-8 sm:px-12 lg:px-16 pt-20 pb-12 border-b border-[#222]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#666] block mb-3">
              Operational Environments
            </span>
            <h2 className="font-barlow-condensed text-5xl sm:text-6xl lg:text-7xl font-black uppercase italic tracking-tight text-white leading-none">
              BUILT FOR<br className="sm:hidden" /> YOUR INDUSTRY.
            </h2>
          </div>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors no-underline shrink-0 pb-1"
          >
            <span>All Applications</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 4-column industry grid — full images, dramatic reveal on hover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222]">
        {industries.map((ind, i) => (
          <Link
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            className="relative group overflow-hidden bg-[#111110] aspect-[3/4] lg:aspect-auto lg:h-[520px] flex flex-col no-underline"
          >
            {/* Full-bleed industry photograph */}
            <div className="absolute inset-0">
              <img
                src={ind.image}
                alt={ind.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                style={{ filter: 'brightness(0.45) contrast(1.1)' }}
              />
              {/* Gradient: ensures text is always readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              {/* Hover — reveal more image */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-0 transition-opacity duration-500" />
            </div>

            {/* Content always at bottom */}
            <div className="relative z-10 mt-auto p-8">
              <div className="mb-4 overflow-hidden">
                <div className="h-px w-0 bg-alkota-orange transition-all duration-500 group-hover:w-12 mb-4" />
                <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-white leading-tight group-hover:text-alkota-orange transition-colors duration-300">
                  {ind.name}
                </h3>
              </div>
              <p className="font-inter text-xs text-[#999] leading-relaxed max-w-[28ch] translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                {ind.statement}
              </p>
              <div className="mt-4 flex items-center gap-2 font-ibm-plex-mono text-[10px] text-alkota-orange font-bold uppercase tracking-widest translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <span>Explore</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

            {/* Index number watermark */}
            <div className="absolute top-6 right-6 font-ibm-plex-mono text-[11px] font-bold text-white/20">
              0{i + 1}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
