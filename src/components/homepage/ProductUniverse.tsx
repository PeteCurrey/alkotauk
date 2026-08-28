import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SpecItem {
  label: string;
  value: string;
}

interface ProductFamily {
  id: string;
  categorySlug: string;
  label: string;
  heading: string;
  statement: string;
  specs: SpecItem[];
  image: string;
  bg: string;
  tag: string;
}

const FAMILIES: ProductFamily[] = [
  {
    id: 'hot-water',
    categorySlug: 'hot-water',
    label: 'HOT WATER',
    tag: 'CATEGORY 01 // THERMAL POWER',
    heading: 'THERMAL POWER FOR EXTREME GRIME.',
    statement: 'Schedule 80 continuous-wound heating coils and dual-pass aerodynamic burners delivering water temperatures up to 95°C at pressures to 345 bar. The industry benchmark for heavy grease, bitumen, and oil breakdown.',
    specs: [
      { label: 'Operating Pressure', value: 'Up to 345 BAR' },
      { label: 'Water Flow Rate', value: 'Up to 38 L/MIN' },
      { label: 'Coil Metallurgy', value: 'Schedule 80 ASTM A53' },
      { label: 'Factory Warranty', value: '7-Year Coil Guarantee' },
    ],
    image: '/assets/products/420x4.png',
    bg: '#141412',
  },
  {
    id: 'cold-water',
    categorySlug: 'cold-water',
    label: 'COLD WATER',
    tag: 'CATEGORY 02 // HIGH WATER VOLUME',
    heading: 'RAW VOLUME FOR SITE OPERATIONS.',
    statement: 'Slow-turning ceramic triplex plunger pumps mounted on welded structural steel frames. Powered by Honda, Kohler, Vanguard petrol/diesel or heavy TEFC electric motors for uninterrupted multi-shift duty cycles.',
    specs: [
      { label: 'Pressure Range', value: '100 – 350 BAR' },
      { label: 'Drive Formats', value: 'Electric / Petrol / Diesel' },
      { label: 'Frame Build', value: 'Welded Cold-Rolled Steel' },
      { label: 'Duty Rating', value: 'Continuous Industrial' },
    ],
    image: '/assets/products/4305xd4.png',
    bg: '#F5F4F0',
  },
  {
    id: 'steam',
    categorySlug: 'steam',
    label: 'DRY STEAM',
    tag: 'CATEGORY 03 // LATENT HEAT SANITISATION',
    heading: '140°C DRY VAPOUR STEAM SANITISATION.',
    statement: 'Ultra-low water volume combined with 140°C saturated dry vapour. Melts grease matrices and sanitises microbial biofilms instantly without flooding food production zones or creating excessive runoff.',
    specs: [
      { label: 'Steam Temperature', value: 'Up to 140°C Vapour' },
      { label: 'Operating Modes', value: 'Dry Vapour & Wet Steam' },
      { label: 'Hygiene Rating', value: 'HACCP Zone Compliant' },
      { label: 'Surface Runoff', value: 'Ultra-Low Moisture' },
    ],
    image: '/assets/products/steam-oil.png',
    bg: '#141412',
  },
  {
    id: 'parts-washers',
    categorySlug: 'parts-washers',
    label: 'PARTS WASHERS',
    tag: 'CATEGORY 04 // AUTOMATED DEGREASING',
    heading: 'AQUEOUS TURNTABLE COMPONENT CLEANING.',
    statement: 'Eliminate toxic solvent sinks and VOC liabilities. Heated alkaline aqueous turntable cabinet washers with high-velocity 3D jet arrays and built-in disc oil skimmers for automated batch degreasing.',
    specs: [
      { label: 'Operating Temp', value: 'Up to 80°C Heated' },
      { label: 'Turntable Drive', value: 'Gear-Driven Rotary' },
      { label: 'Oil Management', value: 'Automatic Disc Skimmer' },
      { label: 'Environmental', value: 'Zero VOC Emissions' },
    ],
    image: '/assets/products/stationary-gas-fired.png',
    bg: '#F5F4F0',
  },
  {
    id: 'trailers',
    categorySlug: 'trailers',
    label: 'MOBILE RIGS',
    tag: 'CATEGORY 05 // TURNKEY MOBILE PLANT',
    heading: 'CUSTOM MOBILE TRAILER & VAN RIGS.',
    statement: 'Single and tandem-axle highway-certified mobile wash plants engineered with on-board baffled water storage up to 1,000 litres, dual-lance feeds, generator power, and heavy-duty spring-rewind hose reels.',
    specs: [
      { label: 'Water Capacity', value: 'Up to 1,000 Litres' },
      { label: 'Mounting Types', value: 'Road-Tow / Van / Skid' },
      { label: 'Hose Storage', value: 'Integrated Stainless Reels' },
      { label: 'Customisation', value: 'Bespoke to Application' },
    ],
    image: '/assets/products/trailer-single.png',
    bg: '#141412',
  },
];

export default function ProductUniverse() {
  return (
    <section aria-label="Alkota Product Families">
      {/* Section introduction */}
      <div className="bg-white px-6 sm:px-12 lg:px-16 pt-20 pb-12 border-b border-[#E0E0DE]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-6 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.35em] text-alkota-orange">
                Equipment Universe
              </span>
            </div>
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
        const isDark = family.bg === '#141412';
        const isReversed = i % 2 !== 0;

        return (
          <div
            key={family.id}
            className={`relative flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[60vh] lg:min-h-[75vh] border-b ${isDark ? 'border-[#222]' : 'border-[#E0E0DE]'}`}
            style={{ backgroundColor: family.bg }}
          >
            {/* Machine Visual — 55% */}
            <div
              className={`relative w-full lg:w-[55%] min-h-[340px] sm:min-h-[440px] lg:min-h-full flex items-center justify-center p-8 sm:p-12 lg:p-16 overflow-hidden ${
                isDark ? 'bg-[#0E0E0C]' : 'bg-[#EAEAE7]'
              }`}
            >
              <img
                src={family.image}
                alt={`Alkota ${family.label} — ${family.heading}`}
                className="w-full max-w-lg lg:max-w-xl max-h-[450px] object-contain transition-transform duration-700 hover:scale-105"
                style={{
                  filter: isDark
                    ? 'drop-shadow(0 25px 45px rgba(0,0,0,0.75))'
                    : 'drop-shadow(0 20px 35px rgba(0,0,0,0.18))',
                }}
                loading="lazy"
              />
              {/* Category label overlay */}
              <div className={`absolute top-6 ${isReversed ? 'right-6' : 'left-6'} font-ibm-plex-mono`}>
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 ${
                    isDark ? 'text-alkota-orange bg-black/70 border border-[#333]' : 'text-[#666] bg-white/90 border border-[#D5D5D2]'
                  }`}
                >
                  {family.label}
                </span>
              </div>
            </div>

            {/* Content Panel — 45% */}
            <div
              className={`relative z-10 flex flex-col justify-center w-full lg:w-[45%] px-6 sm:px-12 lg:px-16 py-14 lg:py-20 ${
                isDark ? 'text-white' : 'text-alkota-black'
              }`}
            >
              {/* Tag / Step */}
              <span
                className={`font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.35em] mb-4 block ${
                  isDark ? 'text-alkota-orange' : 'text-[#888]'
                }`}
              >
                {family.tag}
              </span>

              {/* Heading */}
              <h3
                className="font-barlow-condensed font-black uppercase italic tracking-tight leading-[0.9] mb-5"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
              >
                {family.heading}
              </h3>

              {/* Statement */}
              <p
                className={`font-inter text-sm sm:text-base leading-relaxed mb-8 font-normal ${
                  isDark ? 'text-[#aaa]' : 'text-[#555]'
                }`}
                style={{ maxWidth: '42ch' }}
              >
                {family.statement}
              </p>

              {/* Glanceable Specs Grid */}
              <div
                className={`grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 mb-8 font-ibm-plex-mono text-xs ${
                  isDark ? 'border-[#2A2A28]' : 'border-[#E0E0DE]'
                }`}
              >
                {family.specs.map((spec, si) => (
                  <div key={si}>
                    <span className={`text-[9px] uppercase block mb-0.5 ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>
                      {spec.label}
                    </span>
                    <span className={`font-bold text-xs sm:text-sm ${isDark ? 'text-white' : 'text-alkota-black'}`}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4">
                <Link
                  href={`/machines/${family.categorySlug}`}
                  className={`inline-flex items-center gap-3 px-7 py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] transition-all no-underline group ${
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
