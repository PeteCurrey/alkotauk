'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EngineeringIntegritySection() {
  const pillars = [
    {
      num: '01',
      title: 'Schedule 80 Continuous Coils',
      subtitle: '7-Year Boiler Warranty',
      desc: 'Cold-rolled seamless steel pipe wound without internal constriction. Resists thermal fatigue and scale choke points that burn out thinner aftermarket coils.'
    },
    {
      num: '02',
      title: 'Solid 99.8% Alumina Plungers',
      subtitle: 'Zero Micro-Crack Sleeves',
      desc: 'Solid ceramic rods machined to optical tolerances. Will not shatter or fissure when cycling rapidly between cold mains water and 90°C steam.'
    },
    {
      num: '03',
      title: 'Swiss Tungsten Carbide Seals',
      subtitle: 'Mosmatic Rotary Interfaces',
      desc: 'Precision-ground in Switzerland with diamond-polished carbide faces. Operates continuously at 2,000 RPM with zero high-pressure water bypass.'
    },
    {
      num: '04',
      title: 'Heavy Forged Brass Unloaders',
      subtitle: 'Smooth Trigger Release',
      desc: 'Heavy-gauge forged alloy manifolds with spherical stainless seats. Absorbs hydraulic pressure spikes to protect pump heads on trigger release.'
    }
  ];

  return (
    <section className="py-28 px-6 sm:px-12 lg:px-24 bg-white text-alkota-black border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E8E8E4] pb-10">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              Manufacturing Standards
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
            >
              Why genuine parts last.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#666] font-normal leading-relaxed">
            Every component in our catalogue is manufactured to strict commercial tolerances. No lightweight imitation metals or compromised seal packs.
          </p>
        </div>

        {/* Asymmetrical 2x2 Editorial Layout (Not SaaS Boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-14">
          {pillars.map((p) => (
            <div key={p.num} className="space-y-4 border-t border-[#E8E8E4] pt-6">
              <div className="flex items-baseline justify-between">
                <span className="font-ibm-plex-mono text-xs text-[#888] font-light">
                  SPEC {p.num}
                </span>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-alkota-orange font-medium">
                  {p.subtitle}
                </span>
              </div>

              <h3 className="text-2xl font-light text-[#0A0A0A] tracking-tight uppercase">
                {p.title}
              </h3>

              <p className="text-sm text-[#555] font-normal leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Direct Engineering Desk Support */}
        <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] block font-medium">
              UK Technical Desk
            </span>
            <h4 className="text-2xl font-light text-[#0A0A0A] tracking-tight">
              Looking for a part on a custom or older machine?
            </h4>
            <p className="text-xs text-[#666] font-normal max-w-xl leading-relaxed">
              Our UK engineering desk holds factory schematics for all Alkota models. Share your machine serial number or a photo of your data plate for an exact identification.
            </p>
          </div>

          <Link
            href="/parts-attachments/enquiry"
            className="w-full md:w-auto text-center bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium whitespace-nowrap inline-flex items-center justify-center gap-2"
          >
            <span>Submit Parts Enquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
