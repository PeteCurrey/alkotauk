'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, ShieldCheck, Compass, Sliders, MapPin, Layers, Award, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function CaseStudyHubHero() {
  const scrollToContent = () => {
    const el = document.getElementById('flagship-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-between bg-[#0D0D0B] text-white px-6 sm:px-12 pt-28 sm:pt-36 pb-12 overflow-hidden border-b border-[#222]">
      {/* Background cinematic image with refined editorial treatment */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=2400&q=85"
          alt="Heavy industrial engineering and high-pressure steam in the field"
          className="w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125"
        />
        {/* Editorial gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-[#0D0D0B]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0B] via-[#0D0D0B]/85 to-transparent" />
      </div>

      {/* Top Breadcrumb */}
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <Breadcrumbs
          items={[
            { label: 'Resources', href: '/resources' },
            { label: 'Case Studies' },
          ]}
        />
      </div>

      {/* Main Editorial Hero Typography */}
      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-10 lg:py-16">
        <div className="max-w-4xl">
          {/* Subtle provenance monoline matching homepage */}
          <div className="mb-5 inline-flex items-center gap-3 font-normal">
            <span className="h-[1.5px] w-5 bg-[#FF6900]" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-light">
              Alkota UK // Field Proof & Engineering Journal
            </span>
          </div>

          {/* Primary Statement — Extra Light matching homepage clamp & leading */}
          <h1
            className="font-extralight uppercase tracking-tight text-white leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)' }}
          >
            Built for the Job.<br />
            <span className="text-[#FF6900]">Proven in the Field.</span>
          </h1>

          {/* Concise supporting paragraph — clean Normal Work Sans matching homepage */}
          <p className="text-[#E0E0DC] text-base sm:text-lg leading-relaxed mb-10 max-w-2xl font-normal">
            From a research station beneath the Antarctic ice to working cranes, industrial facilities, farms, vessels and bespoke mobile systems — these stories show what happens when pressure-washing equipment has to do more than look good in a catalogue.
          </p>

          {/* Editorial Introduction Callout */}
          <div className="p-6 bg-black/60 border border-white/15 backdrop-blur-sm max-w-2xl mb-10">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF6900] mb-1.5 font-light">
              The Engineering Reality
            </div>
            <p className="text-sm text-[#E0E0DC] leading-relaxed font-normal">
              A pressure washer is easy to specify. The hard part is specifying the <span className="text-white font-medium">right one</span>. Every operation has different contamination, surfaces, water availability, power, duty cycle, mobility, environmental requirements and operator workflow. These field stories explore those exact engineering problems.
            </p>
          </div>

          {/* Editorial Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-xs text-[#AAA] font-mono">
            <div className="flex flex-col">
              <span className="text-[#FF6900] text-lg font-light">08</span>
              <span className="uppercase text-[10px] tracking-wider text-[#888]">Field Stories</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#FF6900] text-lg font-light">06+</span>
              <span className="uppercase text-[10px] tracking-wider text-[#888]">UK Industries</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#FF6900] text-lg font-light">01</span>
              <span className="uppercase text-[10px] tracking-wider text-[#888]">Bespoke Rig Platform</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#FF6900] text-lg font-light">100%</span>
              <span className="uppercase text-[10px] tracking-wider text-[#888]">Continuous Duty Coils</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA / Scroll cue & Verification Legend Preview */}
      <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
        <button
          onClick={scrollToContent}
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#EEE] hover:text-[#FF6900] transition-colors cursor-pointer group"
        >
          <span>Explore the Field Stories</span>
          <ArrowDown className="h-3.5 w-3.5 text-[#FF6900] transition-transform group-hover:translate-y-1" />
        </button>

        <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#777] uppercase tracking-wider font-mono">
          <span className="flex items-center gap-1.5 text-[#AAA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
            Historical Sources
          </span>
          <span className="flex items-center gap-1.5 text-[#AAA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Named Customer
          </span>
          <span className="flex items-center gap-1.5 text-[#AAA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Industry Application
          </span>
          <span className="flex items-center gap-1.5 text-[#AAA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6900]" />
            Bespoke System
          </span>
        </div>
      </div>
    </section>
  );
}
