'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Flame, Cpu, Wrench, ArrowRight, CheckCircle2, Award } from 'lucide-react';

export default function EngineeringIntegritySection() {
  const pillars = [
    {
      icon: Flame,
      title: 'Schedule 80 Coil Metallurgy',
      subtitle: '7-Year Factory Warranty',
      description: 'Continuous cold-rolled structural steel pipe bent with zero internal seam constriction, preventing thermal hotspot burn-throughs and scale choke points.'
    },
    {
      icon: ShieldCheck,
      title: 'Solid Ceramic Plungers',
      subtitle: 'Zero Micro-Crack Sleeves',
      description: 'Machined from 99.8% pure solid industrial alumina ceramic — not cheap hollow sleeves that shatter under thermal shock when switching from cold to hot water.'
    },
    {
      icon: Cpu,
      title: 'Swiss Precision Rotary Seals',
      subtitle: 'Mosmatic Carbide Interfaces',
      description: 'Rotating unions precision-ground in Switzerland with tungsten carbide mechanical faces for zero water bypass at up to 4000 RPM.'
    },
    {
      icon: Wrench,
      title: 'Forged Brass Unloader Manifolds',
      subtitle: 'Trapped Pressure Safety',
      description: 'Ultra-heavy forged brass valve bodies with stainless steel spherical poppets that eliminate dangerous hydraulic spike pressures upon trigger release.'
    }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#F5F4F0] border-b border-[#E0DEDC]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E0DEDC] pb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              // Mechanical Architecture
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-alkota-black tracking-tight uppercase">
              The OEM Standard.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#666] font-light leading-relaxed">
            Why genuine components outlast aftermarket copies: strict American metallurgy, forged alloys, and zero compromises on pressure containment.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-white border border-[#E0DEDC] p-8 flex flex-col justify-between space-y-6 hover:border-alkota-orange transition-colors shadow-sm"
              >
                <div>
                  <div className="h-12 w-12 bg-[#0A0A0A] text-alkota-orange flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1 font-medium">
                    {p.subtitle}
                  </span>
                  <h3 className="text-xl font-light text-alkota-black tracking-tight mb-3">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#666] font-normal leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F0EFEB] flex items-center gap-2 text-xs font-ibm-plex-mono text-[#888]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Factory Verified Spec</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Strip for Parts Desk & Identification Support */}
        <div className="bg-[#0A0A0A] text-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <Award className="w-10 h-10 text-alkota-orange shrink-0 hidden sm:block" />
            <div>
              <h4 className="text-2xl font-light text-white tracking-tight mb-1">
                Need to trace a part for a vintage or custom machine?
              </h4>
              <p className="text-xs text-[#AAA] font-normal max-w-2xl leading-relaxed">
                Our UK engineering parts desk has complete technical schematics dating back six decades. Share your serial number or a photo of your data plate.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/parts-attachments/enquiry"
              className="bg-alkota-orange hover:bg-white hover:text-black text-white px-8 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all font-medium whitespace-nowrap"
            >
              Submit Parts Request
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
