'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Zap, ChevronRight, Hammer, Award, Settings } from 'lucide-react';
import Link from 'next/link';

export default function TrailersSection() {
  const trailerFeatures = [
    {
      title: 'Chassis & Custom Tank Configuration',
      desc: 'Single or tandem axle road-legal trailers from 750kg to 3,500kg GVW, integrated with baffled onboard water tanks up to 2,091L.',
      icon: Truck
    },
    {
      title: 'High-Heat Steam (Up to 150°C)',
      desc: 'Configurable with single or dual-user pressure washers, outputting clean high-pressure steam for instant oil and grease emulsification.',
      icon: Zap
    },
    {
      title: 'Wastewater Vacuum & Recycle',
      desc: 'Fully environmentally compliant. High-suction recovery vacuum filters and recycles wastewater from up to 100 meters away.',
      icon: Award
    },
    {
      title: 'Bespoke Tooling & Lighting Packs',
      desc: 'Equipped with dual hose reels up to 100m, on-board silent generator systems, work lighting, and safe CAT 5 air-gap protection.',
      icon: Settings
    }
  ];

  return (
    <section className="bg-alkota-steel py-40 px-6 border-t border-alkota-iron relative overflow-hidden z-20">
      {/* Background orange skew element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-alkota-orange/5 -skew-x-12 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          {/* Left Column: Heading and Craftsmanship */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.3em] text-alkota-orange">
                Engineered in the UK
              </span>
            </div>
            
            <h2 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase italic text-white leading-tight tracking-tight mb-8">
              Bespoke Pressure <br />
              <span className="text-alkota-orange">Washer Trailers</span>
            </h2>

            <p className="text-alkota-silver text-lg leading-relaxed mb-10 max-w-xl uppercase tracking-wider font-medium">
              Sometimes standard washers just don't cut it. For heavy duty mobile wash operations, our UK team designs and handcrafts custom road-legal trailer rigs from the ground up.
            </p>

            <div className="bg-alkota-black border border-alkota-iron p-8 flex items-start gap-6 max-w-xl">
              <Hammer className="h-10 w-10 text-alkota-orange shrink-0 mt-1" />
              <div>
                <h4 className="font-barlow-condensed text-xl font-bold uppercase italic text-white mb-2">Handcrafted Durability</h4>
                <p className="text-alkota-grey text-sm leading-relaxed">
                  Every trailer is custom designed, calculated for perfect tongue/braking stability, and assembled piece-by-piece by our master UK craftsmen.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Configurations Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {trailerFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="bg-alkota-black border border-alkota-iron p-8 relative group hover:border-alkota-orange transition-all duration-500"
                >
                  <Icon className="h-8 w-8 text-alkota-orange mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h4 className="font-barlow-condensed text-2xl font-bold uppercase italic text-white mb-3">
                    {feat.title}
                  </h4>
                  <p className="text-alkota-grey text-xs leading-relaxed uppercase tracking-wider">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call To Action Banner */}
        <div className="bg-alkota-black border border-alkota-iron p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none select-none">
            <Truck className="h-64 w-64 text-white" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-5 w-5 text-alkota-orange" />
                <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.2em] text-alkota-orange">
                  Full UK VTA / IVA Road Compliance Verified
                </span>
              </div>
              
              <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-white mb-4">
                Have a bespoke mobile configuration in mind?
              </h3>
              
              <p className="text-alkota-grey text-sm leading-relaxed max-w-2xl">
                Whether you need a single-axle compact towable or a heavy-duty twin-axle flatbed loaded with multiple washers, steam output systems, and generators—we can finance and construct it to your exact specifications.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex flex-col md:flex-row gap-4 lg:justify-end">
              <Link
                href="/machines/trailers"
                className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-alkota-orange/90 transition-colors no-underline"
              >
                <span>View Range</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
