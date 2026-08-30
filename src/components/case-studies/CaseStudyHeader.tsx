import Link from 'next/link';
import { ShieldCheck, MapPin, Calendar, Tag, Clock } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CaseStudy } from '@/lib/case-studies/types';

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyHeader({ caseStudy }: Props) {
  return (
    <header className="relative min-h-[75vh] lg:min-h-[85vh] w-full flex flex-col justify-between bg-[#0D0D0B] text-white px-6 sm:px-12 pt-28 sm:pt-36 pb-12 overflow-hidden border-b border-[#222]">
      {/* Background cinematic image with subtle parallax/opacity */}
      <div className="absolute inset-0 z-0">
        <img
          src={caseStudy.heroImage}
          alt={caseStudy.heroAlt}
          className="w-full h-full object-cover object-center filter grayscale contrast-125 opacity-35"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B] via-[#0D0D0B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0B] via-[#0D0D0B]/75 to-transparent" />
      </div>

      {/* Top Breadcrumbs */}
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <Breadcrumbs
          items={[
            { label: 'Resources', href: '/resources' },
            { label: 'Case Studies', href: '/resources/case-studies' },
            { label: caseStudy.shortTitle },
          ]}
        />
      </div>

      {/* Hero Typography & Eyebrow */}
      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-10 lg:py-14">
        <div className="max-w-4xl">
          {/* Verification Badge & Sector Eyebrow */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#1A1A18] border border-white/20 text-[11px] uppercase tracking-wider text-[#FF6900]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{caseStudy.sourceType}</span>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#AAA] font-normal">
              {caseStudy.eyebrow}
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight text-white leading-[0.95] mb-6">
            {caseStudy.headline}
          </h1>

          {/* Standfirst */}
          <p className="text-lg sm:text-xl lg:text-2xl text-[#CCC] max-w-3xl leading-relaxed font-normal">
            {caseStudy.standfirst}
          </p>
        </div>
      </div>

      {/* Bottom Telemetry Bar / Metadata */}
      <div className="relative z-10 mx-auto max-w-7xl w-full pt-6 border-t border-white/15">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-[#888] block uppercase text-[10px] tracking-wider mb-1">Sector</span>
            <span className="text-white font-normal">{caseStudy.sector}</span>
          </div>
          <div>
            <span className="text-[#888] block uppercase text-[10px] tracking-wider mb-1">Location</span>
            <span className="text-white font-normal">{caseStudy.location}</span>
          </div>
          <div>
            <span className="text-[#888] block uppercase text-[10px] tracking-wider mb-1">Timeline</span>
            <span className="text-white font-normal">{caseStudy.date}</span>
          </div>
          <div>
            <span className="text-[#888] block uppercase text-[10px] tracking-wider mb-1">Classification</span>
            <span className="text-[#FF6900] font-normal">{caseStudy.sourceType}</span>
          </div>
        </div>

        {caseStudy.heroCaption && (
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#888]">
            <span>{caseStudy.heroCaption}</span>
            {caseStudy.heroCredit && (
              <span className="text-[#666] uppercase tracking-wider text-[10px]">
                {caseStudy.heroCredit}
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
