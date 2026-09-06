'use client';

import React from 'react';
import SafeImage from '@/components/ui/SafeImage';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface CategoryEngineeringProps {
  categorySlug: string;
}

export default function CategoryEngineering({ categorySlug }: CategoryEngineeringProps) {
  const content = {
    'hot-water': {
      title: 'Schedule 80 Coil Metallurgy & Hydro-Insulated Burner',
      tag: 'THERMAL FLUID INTEGRITY',
      lead: 'Alkota hot water pressure washers feature our proprietary cold-wound ASTM A53 Schedule 80 seamless carbon steel heating coil. With 34.6% thicker steel walls than standard Schedule 40 tubing, it resists hydrostatic pressure spikes exceeding 300 bar and is backed by an industry-exclusive 7-year warranty.',
      specs: [
        { label: 'Tubing Metallurgy', value: 'ASTM A53 Schedule 80 Seamless Carbon Steel (3.73mm Wall)' },
        { label: 'Winding Process', value: 'Continuous CNC Cold-Wound Helix (Zero Internal Welds)' },
        { label: 'Burner Combustion', value: 'High-Efficiency Ceramic Blanket Insulation with Draft Control' },
        { label: 'Thermal Warranty', value: '7-Year Pro-Rated Heating Coil Warranty Standard' }
      ],
      image: '/assets/products/hot-water-skid.png',
      caption: '// ASTM A53 Cold-Wound Schedule 80 Coil Assembly',
      whitepaperUrl: '/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80'
    },
    'cold-water': {
      title: 'Ceramic Plunger Triplex Pumps & Continuous Duty Drive',
      tag: 'HYDRAULIC DISPLACEMENT',
      lead: 'Industrial cold water washdown demands pumps that operate under continuous multi-shift load without valve cavitation or packings failure. Alkota specifies heavy-duty triplex plunger pumps featuring solid ceramic plungers, forged brass manifolds, and oversized crankcases.',
      specs: [
        { label: 'Pump Architecture', value: 'Industrial Triplex Ceramic Plunger with Forged Brass Head' },
        { label: 'Drive Coupling', value: 'Heavy-Duty Cast Iron Pulleys & Cogged V-Belt or Direct Flange' },
        { label: 'Chassis Integrity', value: 'All-Welded Heavy-Gauge Tubular Steel with Powder Coating' },
        { label: 'Unloader System', value: 'External Bypass Safety Valve with Low-Pressure Detergent Injection' }
      ],
      image: '/assets/products/ged-12v-skid.png',
      caption: '// Industrial Low-RPM Ceramic Triplex Plunger Unit',
      whitepaperUrl: '/lobby/engineering-design/triplex-plunger-pump-mechanics'
    },
    'steam': {
      title: 'High-Temperature Dry Vapour Expansion Chamber',
      tag: 'LATENT HEAT THERMODYNAMICS',
      lead: 'Alkota steam cleaners utilize a specialised restriction orifice and high-temperature thermal exchange coil that elevates water into 140°C–165°C dry vapour steam under controlled low pressure, delivering intense thermal sanitation with minimal liquid moisture.',
      specs: [
        { label: 'Vapour Temperature', value: '140°C to 165°C Saturated Dry Vapour Steam' },
        { label: 'Operating Pressure', value: '10 to 35 bar Precision Delivery Orifice' },
        { label: 'Water Consumption', value: '2.0 to 6.0 Litres/min (Up to 80% Reduction)' },
        { label: 'Thermal Protection', value: 'Dual High-Limit Temperature Switches & Optical Flame Sensor' }
      ],
      image: '/assets/products/steam-oil.png',
      caption: '// High-Temperature Saturated Vapour Generator',
      whitepaperUrl: '/lobby/application-science/vapour-steam-vs-high-pressure-hot-water-thermal-breakdown'
    }
  }[categorySlug] || {
    title: 'Precision Industrial Engineering',
    tag: 'BUILT IN SOUTH DAKOTA',
    lead: 'Every Alkota machine is designed from the ground up for continuous industrial duty, using American metallurgy and heavy-gauge steel components.',
    specs: [
      { label: 'Pump Type', value: 'Industrial Triplex Ceramic Plungers' },
      { label: 'Frame', value: 'Heavy-Gauge Welded Tubular Steel' },
      { label: 'Support', value: 'Full UK Parts & Technical Engineering Backup' }
    ],
    image: '/assets/products/hot-water-skid.png',
    caption: '// Heavy-Duty Industrial Assembly',
    whitepaperUrl: '/lobby'
  };

  return (
    <section className="bg-white border-b border-[#E8E7E0] py-24 sm:py-32 px-6 sm:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline & Rule-Separated Technical Index */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FF6900] block mb-3 font-medium">
              {content.tag}
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#1A1A18] leading-[1.02] mb-6">
              {content.title}
            </h2>
            <p className="font-normal text-base sm:text-lg text-[#555] leading-relaxed mb-10 max-w-2xl">
              {content.lead}
            </p>

            {/* Clean Rule-Based Technical Specification List (No Box Containers) */}
            <div className="border-t border-[#1A1A18] divide-y divide-[#EAE9E2] font-normal mb-8">
              {content.specs.map((spec, idx) => (
                <div key={idx} className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#888] shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-sm font-normal text-[#1A1A18] sm:text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={content.whitepaperUrl}
                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1A1A18] hover:text-[#FF6900] transition-colors no-underline font-medium"
              >
                <span>Read Full Engineering Whitepaper in The Lobby</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#FF6900] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Macro Component Framing */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] bg-[#FAF9F5] p-8 sm:p-10 flex items-center justify-center border border-[#EAE9E2] rounded-[6px] shadow-tactile-sm">
              <SafeImage
                src={content.image}
                alt={content.title}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain p-6 drop-shadow-lg"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-mono text-[#666] tracking-wider border border-[#EAE9E2] rounded-[3px]">
                {content.caption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

