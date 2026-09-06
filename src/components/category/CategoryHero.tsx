'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Droplets, Wind, Sparkles, Sliders, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

interface CategoryHeroProps {
  categorySlug: string;
  categoryName: string;
  tagline: string;
  statement: string;
  heroImage: string;
  accentColor: string;
  metrics: Array<{ label: string; value: string; detail: string }>;
  totalModels: number;
}

export default function CategoryHero({
  categorySlug,
  categoryName,
  tagline,
  statement,
  heroImage,
  accentColor,
  metrics,
  totalModels,
}: CategoryHeroProps) {
  const getIcon = () => {
    switch (categorySlug) {
      case 'hot-water':
        return <Flame className="h-4 w-4 text-[#FF6900]" />;
      case 'cold-water':
        return <Droplets className="h-4 w-4 text-[#38BDF8]" />;
      case 'steam':
        return <Wind className="h-4 w-4 text-[#A78BFA]" />;
      default:
        return <Sparkles className="h-4 w-4 text-[#FF6900]" />;
    }
  };

  const getAccentTag = () => {
    switch (categorySlug) {
      case 'hot-water':
        return 'THERMAL HYDROCARBON DEGREASING';
      case 'cold-water':
        return 'HIGH-FLOW IMPINGEMENT & WASHDOWN';
      case 'steam':
        return '140°C LOW-MOISTURE SANITISATION';
      default:
        return 'INDUSTRIAL SPECIFICATION';
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between bg-[#0A0A0A] text-white border-b border-[#222] px-6 sm:px-12 pt-28 sm:pt-32 pb-14 overflow-hidden">
      {/* Background Image with Controlled Dark Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={heroImage}
          alt={categoryName}
          fill
          priority
          className="object-cover object-center scale-105"
          style={{ filter: 'brightness(0.52) contrast(1.15)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/50" />
      </div>

      {/* Top Nav Breadcrumbs */}
      <div className="relative z-10 mx-auto max-w-7xl w-full pt-2">
        <Breadcrumbs
          items={[
            { label: 'Catalogue', href: '/machines' },
            { label: categoryName }
          ]}
        />
      </div>

      {/* Hero Centrepiece */}
      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono font-medium uppercase tracking-widest text-[#CCC] rounded-[3px]">
              {getIcon()}
              <span>{getAccentTag()}</span>
            </span>
            <span className="text-xs font-mono text-[#888]">
              {totalModels} Models Available
            </span>
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[1.05] mb-6">
            {categoryName}
          </h1>

          <p className="font-light text-lg sm:text-2xl text-[#CCC] leading-relaxed max-w-3xl mb-8">
            {statement}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#architectures"
              className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-6 py-3.5 text-xs font-medium uppercase tracking-widest transition-all no-underline shadow-lg rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>Explore Architectures</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <Link
              href={`/tools/machine-match?category=${categorySlug}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 text-xs font-medium uppercase tracking-widest transition-all no-underline backdrop-blur-sm rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <Sliders className="h-4 w-4 text-[#FF6900]" />
              <span>Launch Category Matcher</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="relative z-10 mx-auto max-w-7xl w-full pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div key={idx} className="border-l border-white/20 pl-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#888] block mb-1">
                {m.label}
              </span>
              <span className="font-extralight text-2xl sm:text-3xl text-white block mb-0.5">
                {m.value}
              </span>
              <span className="text-[11px] text-[#AAA] block font-normal">
                {m.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
