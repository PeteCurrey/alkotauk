'use client';

import Link from 'next/link';
import { ArrowDown, ChevronRight, ShieldCheck, Compass, Sliders, MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function CaseStudyHubHero() {
  const scrollToContent = () => {
    const el = document.getElementById('flagship-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-between bg-[#0D0D0B] text-white px-6 sm:px-12 pt-28 sm:pt-36 pb-12 overflow-hidden">
      {/* Background cinematic image with refined editorial treatment */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=2400&q=85"
          alt="Heavy industrial engineering and high-pressure steam in the field"
          className="w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125"
        />
        {/* Editorial gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-[#0D0D0B]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0B] via-[#0D0D0B]/80 to-transparent" />
      </div>

      {/* Top Breadcrumb & Small Eyebrow */}
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <Breadcrumbs
          items={[
            { label: 'Resources', href: '/resources' },
            { label: 'Case Studies' },
          ]}
        />
      </div>

      {/* Main Editorial Hero Typography */}
      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-12 lg:py-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1.5px] w-8 bg-[#FF6900]" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#FF6900] font-normal">
              Case Studies / Field Proof
            </span>
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight text-white leading-[0.95] mb-8">
            Built for the Job.<br />
            <span className="text-[#FF6900]">Proven in the Field.</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-[#CCC] max-w-3xl leading-relaxed font-normal mb-10">
            From half a mile beneath the Antarctic ice sheet to working yards, farms, fleets and industrial sites across Britain — these are the environments where Alkota engineering earns its reputation.
          </p>

          {/* Editorial Metadata Tags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15 text-xs text-[#AAA]">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#FF6900] shrink-0" />
              <span className="uppercase tracking-wider">Extreme Environments</span>
            </div>
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-[#FF6900] shrink-0" />
              <span className="uppercase tracking-wider">Custom Engineering</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#FF6900] shrink-0" />
              <span className="uppercase tracking-wider">UK Installations</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#FF6900] shrink-0" />
              <span className="uppercase tracking-wider">Documented Field Proof</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA / Scroll cue */}
      <div className="relative z-10 mx-auto max-w-7xl w-full flex items-center justify-between border-t border-white/10 pt-6">
        <button
          onClick={scrollToContent}
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#EEE] hover:text-[#FF6900] transition-colors cursor-pointer group"
        >
          <span>Explore the stories</span>
          <ArrowDown className="h-3.5 w-3.5 text-[#FF6900] transition-transform group-hover:translate-y-1" />
        </button>

        <div className="text-[11px] text-[#777] uppercase tracking-widest hidden sm:block">
          Alkota UK // Editorial Field Journal
        </div>
      </div>
    </section>
  );
}
