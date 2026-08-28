import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FAMILIES = [
  {
    id: 'hot-water',
    categorySlug: 'hot-water',
    label: 'HOT WATER',
    heading: 'THERMAL POWER.',
    statement: 'Schedule 80 continuous-wound heating coils delivering water temperatures up to 95°C at pressures to 345 bar. The engine of serious fleet and industrial degreasing.',
    specs: ['Up to 345 BAR', 'Up to 38 L/MIN', 'Schedule 80 ASTM A53', '7-Year Coil Warranty'],
    image: '/assets/products/420x4.png',
    bg: '#1A1A18',
    accent: '#FF6900',
  },
  {
    id: 'cold-water',
    categorySlug: 'cold-water',
    label: 'COLD WATER',
    heading: 'RAW VOLUME.',
    statement: 'Industrial triplex plunger pumps on welded structural steel frames. Honda, Kohler, Vanguard, or TEFC electric drives — built for continuous high-duty cleaning.',
    specs: ['100–350 BAR Range', 'Electric / Petrol / Diesel', 'Welded Steel Frame', 'Continuous Duty Cycle'],
    image: '/assets/products/4305xd4.png',
    bg: '#F5F4F0',
    accent: '#FF6900',
  },
  {
    id: 'steam',
    categorySlug: 'steam',
    label: 'DRY STEAM',
    heading: 'MOLECULAR HEAT.',
    statement: '140°C saturated dry vapour steam. Melts heavy grease matrices instantly with ultra-low water volume — purpose-built for food processing, HACCP zones, and biofilm elimination.',
    specs: ['Up to 140°C Vapour', 'Dry & Wet Steam Modes', 'HACCP Zone Compliant', 'Ultra-Low Runoff'],
    image: '/assets/products/steam-oil.png',
    bg: '#1A1A18',
    accent: '#FF6900',
  },
  {
    id: 'parts-washers',
    categorySlug: 'parts-washers',
    label: 'PARTS WASHERS',
    heading: 'AUTOMATED DEGREASING.',
    statement: 'Heated alkaline aqueous turntable cabinet washers eliminate solvent liabilities. High-velocity 3D wash jets, integrated disc oil skimmers, 80°C operating temperature.',
    specs: ['Up to 80°C Heated', 'Gear-Driven Turntable', 'Disc Oil Skimmer', 'Zero VOC Emissions'],
    image: '/assets/products/stationary-gas-fired.png',
    bg: '#F5F4F0',
    accent: '#FF6900',
  },
  {
    id: 'trailers',
    categorySlug: 'trailers',
    label: 'MOBILE RIGS',
    heading: 'SELF-CONTAINED.',
    statement: 'Custom single and tandem-axle mobile wash plants with on-board baffled water tanks up to 1,000L, dual-gun feeds, generator power, and spring-rewind hose reels.',
    specs: ['Up to 1,000L On-Board', 'Tow / Van / Skid Mount', 'Integrated Hose Reels', 'Bespoke to Application'],
    image: '/assets/products/trailer-single.png',
    bg: '#1A1A18',
    accent: '#FF6900',
  },
];

export default function ProductUniverse() {
  return (
    <section aria-label="Product Families">
      {/* Section introduction */}
      <div className="bg-white px-8 sm:px-12 lg:px-16 pt-20 pb-12 border-b border-[#E0E0DE]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#999] block mb-3">
              The Equipment
            </span>
            <h2 className="font-barlow-condensed text-5xl sm:text-6xl lg:text-7xl font-black uppercase italic tracking-tight text-alkota-black leading-none">
              BUILT FOR<br className="sm:hidden" /> THE WORK.
            </h2>
          </div>
          <Link
            href="/machines"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors no-underline shrink-0 pb-1"
          >
            <span>View Full Machine Index</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Full-width alternating product reveals */}
      {FAMILIES.map((family, i) => {
        const isDark = family.bg === '#1A1A18';
        const isReversed = i % 2 !== 0;

        return (
          <div
            key={family.id}
            className={`relative flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[70vh] lg:min-h-[80vh] overflow-hidden`}
            style={{ backgroundColor: family.bg }}
          >
            {/* Machine Visual — fills 55% */}
            <div className="relative w-full lg:w-[55%] min-h-[50vw] lg:min-h-full flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: isDark ? '#141412' : '#EDEDEB' }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-12 lg:p-20">
                <img
                  src={family.image}
                  alt={`Alkota ${family.label} — ${family.heading}`}
                  className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
                  style={{
                    filter: isDark
                      ? 'drop-shadow(0 40px 80px rgba(0,0,0,0.8))'
                      : 'drop-shadow(0 30px 60px rgba(0,0,0,0.25))',
                  }}
                  loading="lazy"
                />
              </div>
              {/* Category label overlay */}
              <div className={`absolute top-8 ${isReversed ? 'right-8' : 'left-8'} font-ibm-plex-mono`}>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 ${isDark ? 'text-alkota-orange bg-black/60' : 'text-[#666] bg-white/80'}`}>
                  {family.label}
                </span>
              </div>
            </div>

            {/* Content Panel — 45% */}
            <div className={`relative z-10 flex flex-col justify-center w-full lg:w-[45%] px-8 sm:px-12 lg:px-16 py-16 lg:py-24 ${isDark ? 'text-white' : 'text-alkota-black'}`}>
              {/* Step number */}
              <span className={`font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] mb-6 block ${isDark ? 'text-alkota-orange' : 'text-[#999]'}`}>
                0{i + 1} / {String(FAMILIES.length).padStart(2, '0')}
              </span>

              {/* Large product category heading */}
              <h3 className="font-barlow-condensed font-black uppercase italic tracking-tight leading-[0.88] mb-6"
                style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
              >
                {family.heading}
              </h3>

              {/* Statement */}
              <p className={`font-inter leading-relaxed mb-10 font-normal ${isDark ? 'text-[#aaa]' : 'text-[#555]'}`}
                style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', maxWidth: '38ch' }}
              >
                {family.statement}
              </p>

              {/* Spec strip */}
              <div className={`grid grid-cols-2 gap-x-8 gap-y-4 border-t pt-8 mb-10 font-ibm-plex-mono text-xs ${isDark ? 'border-[#2F2F2B]' : 'border-[#E0E0DE]'}`}>
                {family.specs.map((spec, si) => (
                  <div key={si}>
                    <span className={`text-[9px] uppercase block mb-0.5 ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>
                      {['Pressure', 'Flow', 'Metallurgy', 'Protection', 'Pressure Range', 'Drive', 'Frame', 'Duty', 'Temperature', 'Mode', 'Hygiene', 'Water', 'Heating', 'Turntable', 'Oil Mgmt', 'Emissions', 'Capacity', 'Mounting', 'Storage', 'Spec'][si * 4 + i] || `Spec ${si + 1}`}
                    </span>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-alkota-black'}`}>{spec}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div>
                <Link
                  href={`/machines/${family.categorySlug}`}
                  className={`inline-flex items-center gap-3 px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] transition-all no-underline group ${
                    isDark
                      ? 'bg-alkota-orange text-white hover:bg-white hover:text-black'
                      : 'bg-alkota-black text-white hover:bg-alkota-orange'
                  }`}
                >
                  <span>Explore {family.label}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
