'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Cpu, Flame, Layers, ArrowRight } from 'lucide-react';

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
      image: '/assets/products/hot-water-skid.png'
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
      image: '/assets/products/ged-12v-skid.png'
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
      image: '/assets/products/hot-water-skid.png'
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
    image: '/assets/products/hot-water-skid.png'
  };

  return (
    <section className="bg-white border-b border-[#E5E5E0] py-24 px-6 sm:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] font-mono font-medium uppercase tracking-[0.25em] text-[#FF6900] block mb-2">
              {content.tag}
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-tight mb-6">
              {content.title}
            </h2>
            <p className="font-normal text-sm sm:text-base text-[#555] leading-relaxed mb-8">
              {content.lead}
            </p>

            <div className="space-y-4 font-mono text-xs">
              {content.specs.map((spec, idx) => (
                <div key={idx} className="p-4 bg-[#FAFAF8] border border-[#E5E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-[#888]">{spec.label}</span>
                  <span className="text-[#1A1A18] font-medium sm:text-right">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAEAE5]">
              <Link
                href="/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6900] hover:underline no-underline"
              >
                <span>Read Full Engineering Whitepaper in The Lobby</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] bg-[#FAFAF8] border border-[#E5E5E0] p-8 flex items-center justify-center">
              <Image
                src={content.image}
                alt={content.title}
                fill
                className="object-contain p-6"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-[#E5E5E0] px-3 py-1.5 text-[10px] font-mono text-[#555]">
                // ASTM A53 Cold-Wound Coil Assembly
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
