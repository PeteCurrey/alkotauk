'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Flame, Cpu, Wrench, ArrowRight, CheckCircle2, Award, ChevronRight } from 'lucide-react';

export default function EngineeringIntegritySection() {
  const pillars = [
    {
      number: '01',
      icon: Flame,
      title: 'Schedule 80 Coil Metallurgy',
      subtitle: '7-Year Factory Warranty',
      spec: 'Cold-Rolled Seamless Structural Steel',
      description: 'Continuous cold-rolled structural steel pipe bent with zero internal seam constriction, eliminating thermal hotspot burn-throughs and scale choke points.'
    },
    {
      number: '02',
      icon: ShieldCheck,
      title: 'Solid Ceramic Plungers',
      subtitle: 'Zero Micro-Crack Sleeves',
      spec: '99.8% Pure Industrial Alumina',
      description: 'Machined from 99.8% pure solid alumina ceramic — not cheap hollow sleeves that shatter under thermal shock when switching from cold to hot water.'
    },
    {
      number: '03',
      icon: Cpu,
      title: 'Swiss Precision Rotary Seals',
      subtitle: 'Mosmatic Carbide Interfaces',
      spec: '4,000 RPM Tungsten Carbide Faces',
      description: 'Rotating unions precision-ground in Switzerland with tungsten carbide mechanical faces for zero water bypass at high rotational speeds.'
    },
    {
      number: '04',
      icon: Wrench,
      title: 'Forged Brass Unloader Bodies',
      subtitle: 'Trapped Pressure Safety',
      spec: 'Heavy Forged Alloy + Stainless Poppets',
      description: 'Ultra-heavy forged brass valve bodies with stainless steel spherical poppets that eliminate dangerous hydraulic spike pressures upon trigger release.'
    }
  ];

  return (
    <section className="py-28 px-6 sm:px-12 lg:px-24 bg-[#0F0F0D] text-white border-b border-[#1A1A1A] relative overflow-hidden">
      
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#222] pb-10">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              // Mechanical Architecture
            </span>
            <h2 
              className="font-extralight text-white tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
            >
              The OEM Standard.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#888] font-light leading-relaxed">
            Why genuine components outlast aftermarket copies: strict American metallurgy, forged alloys, and zero compromises on pressure containment.
          </p>
        </div>

        {/* 4 Architectural Pillars Grid (Luxury Minimalist Finish) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-gradient-to-b from-[#161614] to-[#0D0D0B] border border-[#262624] hover:border-alkota-orange/80 transition-all duration-300 p-8 flex flex-col justify-between space-y-8 shadow-xl group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-ibm-plex-mono text-xs text-[#555] font-light">
                      PILLAR {p.number}
                    </span>
                    <Icon className="h-5 w-5 text-alkota-orange" />
                  </div>

                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-1">
                      {p.subtitle}
                    </span>
                    <h3 className="text-xl font-light text-white tracking-tight leading-snug">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#999] font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#222] flex items-center justify-between text-[10px] font-ibm-plex-mono text-[#777]">
                  <span className="text-[#AAA] truncate">{p.spec}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Strip for Parts Desk & Identification Support */}
        <div className="bg-gradient-to-r from-[#1A1A18] via-[#141412] to-[#0F0F0D] border border-[#2A2A28] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="h-14 w-14 bg-black/60 border border-alkota-orange/30 flex items-center justify-center shrink-0 hidden sm:flex">
              <Award className="w-7 h-7 text-alkota-orange" />
            </div>
            <div className="space-y-1">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block">
                Direct Engineering Support
              </span>
              <h4 className="text-2xl sm:text-3xl font-extralight text-white tracking-tight">
                Tracing a component for a bespoke or vintage machine?
              </h4>
              <p className="text-xs text-[#AAA] font-light max-w-2xl leading-relaxed">
                Our UK engineering parts desk maintains complete technical schematics dating back six decades. Share your machine model code or data plate photo.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0 w-full md:w-auto">
            <Link
              href="/parts-attachments/enquiry"
              className="w-full md:w-auto text-center bg-alkota-orange hover:bg-white hover:text-black text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-medium whitespace-nowrap shadow-lg inline-flex items-center justify-center gap-2"
            >
              <span>Submit Parts Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
