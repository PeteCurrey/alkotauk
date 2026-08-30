'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Flame, Cpu, Wrench, ArrowRight, CheckCircle2, Award } from 'lucide-react';

export default function EngineeringIntegritySection() {
  const pillars = [
    {
      number: '01',
      icon: Flame,
      title: 'Schedule 80 Heating Coils',
      subtitle: '7-Year Factory Warranty',
      spec: 'Cold-Rolled Seamless Steel Pipe',
      description: 'Continuous cold-rolled structural steel bent with zero internal seam constriction. Eliminates hotspots and scale choke points that burn out thinner aftermarket coils.'
    },
    {
      number: '02',
      icon: ShieldCheck,
      title: 'Solid Ceramic Plungers',
      subtitle: 'Zero Micro-Crack Sleeves',
      spec: '99.8% Pure Industrial Alumina',
      description: 'Solid pure alumina ceramic plunger rods. Unlike cheap ceramic-sleeved pistons, they will not shatter or crack under thermal shock when switching from cold to hot water.'
    },
    {
      number: '03',
      icon: Cpu,
      title: 'Swiss Rotary Seals',
      subtitle: 'Mosmatic Carbide Interfaces',
      spec: 'Tungsten Carbide Mating Faces',
      description: 'Precision-ground in Switzerland with polished tungsten carbide seal faces. Built to operate continuously up to 2,000 RPM with zero high-pressure water bypass.'
    },
    {
      number: '04',
      icon: Wrench,
      title: 'Forged Brass Unloaders',
      subtitle: 'Smooth Trigger Release',
      spec: 'Heavy Forged Alloy + Stainless Seats',
      description: 'Heavy-gauge forged brass valve manifolds with stainless steel spherical poppets. Eliminates harsh hydraulic spikes and pump head shock when the spray gun is released.'
    }
  ];

  return (
    <section className="py-28 px-6 sm:px-12 lg:px-24 bg-white text-alkota-black border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E8E8E4] pb-10">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              // The OEM Difference
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
            >
              Why genuine parts last.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#666] font-normal leading-relaxed">
            Every component in our parts catalogue is manufactured to strict commercial tolerances. No lightweight imitation metals or compromised seal packs.
          </p>
        </div>

        {/* 4 Pillars Grid (Clean, Light Architectural Staging) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-[#FAF9F5] border border-[#E8E8E4] p-8 flex flex-col justify-between space-y-8 hover:border-black transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-ibm-plex-mono text-xs text-[#888] font-light">
                      PILLAR {p.number}
                    </span>
                    <Icon className="h-5 w-5 text-alkota-orange" />
                  </div>

                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-1">
                      {p.subtitle}
                    </span>
                    <h3 className="text-xl font-light text-[#0A0A0A] tracking-tight leading-snug">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#666] font-normal leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E8E4] flex items-center justify-between text-[10px] font-ibm-plex-mono text-[#777]">
                  <span className="text-alkota-black truncate">{p.spec}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 ml-2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Support Box */}
        <div className="bg-[#F5F4EF] border border-[#E0DED8] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="h-12 w-12 bg-white border border-[#DCDAD4] flex items-center justify-center shrink-0 hidden sm:flex">
              <Award className="w-6 h-6 text-alkota-orange" />
            </div>
            <div className="space-y-1">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block font-medium">
                UK Technical Parts Desk
              </span>
              <h4 className="text-2xl font-light text-[#0A0A0A] tracking-tight">
                Looking for a part on a custom or older machine?
              </h4>
              <p className="text-xs text-[#666] font-normal max-w-2xl leading-relaxed">
                Our UK engineering desk holds factory schematics for all Alkota models. Send us your machine serial number or a photo of your data plate and we will identify the exact part.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0 w-full md:w-auto">
            <Link
              href="/parts-attachments/enquiry"
              className="w-full md:w-auto text-center bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium whitespace-nowrap inline-flex items-center justify-center gap-2"
            >
              <span>Submit Parts Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
