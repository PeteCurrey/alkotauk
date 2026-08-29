import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Thermometer } from 'lucide-react';
import { CaseStudy } from '@/lib/case-studies/types';

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyFlagshipCard({ caseStudy }: Props) {
  return (
    <section id="flagship-story" className="bg-[#121212] text-white py-20 sm:py-28 px-6 sm:px-12 border-b border-[#222]">
      <div className="mx-auto max-w-7xl w-full">
        {/* Flagship Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/15">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6900]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] font-normal">
                {caseStudy.eyebrow}
              </span>
            </div>
            <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
              Flagship Engineering Proof
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#888]">
            <ShieldCheck className="h-4 w-4 text-[#FF6900]" />
            <span>{caseStudy.sourceType}</span>
          </div>
        </div>

        {/* Massive Landscape Image and Split Story Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Image Canvas (Substantial Viewport Feature) */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] overflow-hidden bg-[#1A1A18] group">
            <img
              src={caseStudy.heroImage}
              alt={caseStudy.heroAlt}
              className="w-full h-full object-cover object-center filter contrast-110 brightness-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            {/* Technical overlay badge on image */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="bg-black/80 backdrop-blur-sm px-4 py-2 border border-white/20 text-white font-normal">
                <span className="text-[#FF6900] mr-2">LOCATION:</span>
                <span>West Antarctic Ice Sheet (~800 m Ice)</span>
              </div>
              <div className="bg-black/80 backdrop-blur-sm px-4 py-2 border border-white/20 text-white font-normal">
                <span className="text-[#FF6900] mr-2">EQUIPMENT:</span>
                <span>6 × Alkota 12257K Units</span>
              </div>
            </div>
          </div>

          {/* Editorial Story Content */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#181816] p-8 sm:p-12 border border-white/10">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#999] mb-4">
                Antarctica / 2013 // Subglacial Exploration
              </div>

              <h3 className="font-extralight text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-tight mb-6">
                Half a Mile of Ice.<br />
                Six Alkota Machines.<br />
                <span className="text-[#FF6900]">One Unexplored World Below.</span>
              </h3>

              <p className="text-sm sm:text-base text-[#CCC] leading-relaxed font-normal mb-8">
                In January 2013, a scientific expedition team achieved the first clean access through the West Antarctic ice sheet into Subglacial Lake Whillans. At the heart of the hot-water drilling system were six Alkota pressure-washer units delivering continuous thermal energy in extreme polar conditions.
              </p>

              {/* Restrained Technical Metric Grid */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/15 mb-8">
                <div>
                  <span className="font-extralight text-3xl sm:text-4xl text-[#FF6900] block mb-1">
                    ~800 m
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#888] font-normal">
                    Ice Penetration Depth
                  </span>
                </div>
                <div>
                  <span className="font-extralight text-3xl sm:text-4xl text-white block mb-1">
                    270 L/m
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#888] font-normal">
                    Theoretical Max Thermal Output
                  </span>
                </div>
              </div>
            </div>

            {/* Read CTA */}
            <div>
              <Link
                href={`/resources/case-studies/${caseStudy.slug}`}
                className="inline-flex items-center justify-between w-full bg-[#FF6900] text-white px-8 py-5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-normal no-underline group shadow-lg"
              >
                <span>Read the Antarctica Story</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
