'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, ChevronDown, Award, Sparkles } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';
import AmericanHeritageFlagOverlay from './AmericanHeritageFlagOverlay';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ProductCinematicHero({ product }: Props) {
  const brand = product.brand_identity;
  const skus = product.skus || [];
  const minPrice = skus.length > 0 ? Math.min(...skus.map(s => s.price)) : null;

  // Resolve authentic photographic backdrop per formulation family / application
  const resolveHeroImage = () => {
    if (product.hero_image && !product.hero_image.includes('placeholder')) {
      return product.hero_image;
    }
    const family = (product.retail_family || '').toLowerCase();
    const app = (product.primary_application || '').toLowerCase();

    if (family.includes('roadforce') || app.includes('truck') || app.includes('fleet') || app.includes('hgv')) {
      return '/assets/industries/fleet.png';
    }
    if (family.includes('fieldforce') || family.includes('agri') || app.includes('agri')) {
      return '/assets/industries/agriculture.png';
    }
    if (family.includes('greasecut') || family.includes('redline') || app.includes('workshop')) {
      return '/assets/parts/parts-hero-workshop.jpg';
    }
    if (family.includes('aluma') || family.includes('metal') || app.includes('aluminium')) {
      return '/assets/hot-water-gauge-hero.jpg';
    }
    if (family.includes('scale') || family.includes('coil') || app.includes('coil')) {
      return '/assets/engineered-continuous-duty.jpg';
    }
    return '/assets/hero-home-header.jpg';
  };

  const heroImageSrc = resolveHeroImage();

  const scrollToPacks = () => {
    const el = document.getElementById('packs');
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="overview" 
      className="relative min-h-screen w-full flex flex-col justify-between bg-[#0A0A0A] text-white pt-24 sm:pt-28 pb-12 px-6 sm:px-12 lg:px-24 overflow-hidden border-b border-[#222]"
    >
      
      {/* ── CINEMATIC BACKGROUND ATMOSPHERE (Photography + American Flag Overlay) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Authentic Industrial Photography Backdrop */}
        <div className="absolute inset-0 opacity-30 filter grayscale contrast-125 scale-105 transition-transform duration-1000">
          <SafeImage
            src={heroImageSrc}
            alt={product.retail_name}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Ambient Dark Film Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-[#0A0A0A]/60 to-[#0A0A0A]" />

        {/* American Flag Heritage Overlay with Gradual Fade Across Screen */}
        <AmericanHeritageFlagOverlay opacity={0.16} />
      </div>

      {/* ── TOP BREADCRUMB & METRIC INDICATORS ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777]">
          <Link href="/chemicals" className="hover:text-alkota-orange transition-colors">
            Chemicals
          </Link>
          <span>/</span>
          <Link href="/chemicals/applications" className="hover:text-white transition-colors">
            {product.retail_family} Series
          </Link>
          <span>/</span>
          <span className="text-alkota-orange">{product.retail_name}</span>
        </nav>

        <div className="flex items-center gap-4 text-xs font-ibm-plex-mono">
          <div className="flex items-center gap-1.5 text-[#AAA]">
            <Award className="w-3.5 h-3.5 text-alkota-orange" />
            <span className="text-[10px] uppercase tracking-widest">Master Formula:</span>
            <span className="font-bold text-white bg-white/10 px-2.5 py-0.5 border border-white/20">
              {product.originating_master_code}
            </span>
          </div>
          <span className="text-[#444] hidden sm:inline">|</span>
          <div className="flex items-center gap-1 text-emerald-400 text-[10px] uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GB-CLP Verified</span>
          </div>
        </div>
      </div>

      {/* ── MAIN PRODUCT HERO IDENTITY & AUTOMOTIVE TELEMETRY ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-12 sm:py-16">
        <div className="max-w-4xl space-y-6">
          
          {/* Category / Descriptor Subhead */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="h-[1.5px] w-5 bg-alkota-orange shrink-0" />
            <span className="font-ibm-plex-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-alkota-orange font-medium">
              // {brand?.descriptor || product.descriptor || 'Professional Chemical Formulation'}
            </span>
            <span className="text-[#555] font-light">·</span>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#888]">
              {product.primary_application}
            </span>
          </div>

          {/* Monumental Product Title — Automotive Grade Extralight Typography */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extralight text-white tracking-tight leading-[0.95] uppercase">
            {brand?.brand_family || product.retail_name.split(' ')[0]}
            <span className="block text-2xl sm:text-4xl lg:text-5xl font-light text-[#AAA] tracking-tight mt-2 normal-case">
              {product.retail_name.replace(brand?.brand_family || '', '').trim()}
            </span>
          </h1>

          {/* Product Customer Promise */}
          <p className="text-lg sm:text-2xl font-light text-[#DDD] leading-snug max-w-2xl">
            {brand?.product_promise || product.short_description}
          </p>

          {/* Quick Target Contaminants Pill Strip */}
          {brand?.problem_labels && brand.problem_labels.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] mr-1">
                Target Soil:
              </span>
              {brand.problem_labels.slice(0, 4).map((label, idx) => (
                <span
                  key={idx}
                  className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#CCC] bg-white/5 border border-white/10 px-2.5 py-1"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Hero Action Row */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={scrollToPacks}
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-8 py-4 text-xs font-ibm-plex-mono uppercase tracking-[0.2em] transition-all cursor-pointer shadow-xl group font-medium"
            >
              <span>Choose Pack Size</span>
              {minPrice && (
                <span className="text-[#FFE5D0] group-hover:text-alkota-black/70">
                  (From £{minPrice.toFixed(2)})
                </span>
              )}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToStory}
              className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 hover:border-white hover:bg-white hover:text-black text-white px-6 py-4 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all cursor-pointer"
            >
              <span>Explore Chemistry &amp; Action</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* ── BOTTOM METRIC & AMERICAN HERITAGE STRIP ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[#888]">
        <div className="flex flex-wrap items-center gap-6 text-[11px] font-ibm-plex-mono">
          <div>
            <span className="text-[#555] block text-[9px] uppercase tracking-widest">Originating Master</span>
            <span className="text-white font-medium">{product.originating_master_code} — {product.originating_master_name}</span>
          </div>
          <div>
            <span className="text-[#555] block text-[9px] uppercase tracking-widest">Dilution Ratio</span>
            <span className="text-white font-medium">
              {product.dilution_information ? product.dilution_information.split('.')[0] : '1:10 to 1:50'}
            </span>
          </div>
          <div>
            <span className="text-[#555] block text-[9px] uppercase tracking-widest">Substrate Safety</span>
            <span className="text-white font-medium">
              {Array.isArray(product.surface_compatibility) ? product.surface_compatibility.length : 5} Verified Materials
            </span>
          </div>
        </div>

        <div className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666]">
          American Formulation Heritage × UK Commercial Distribution
        </div>
      </div>

    </section>
  );
}
