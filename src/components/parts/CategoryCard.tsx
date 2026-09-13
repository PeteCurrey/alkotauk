'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getCategoryIcon, resolveCategoryMedia } from '@/lib/parts/category-media';

export interface CategoryCardData {
  id?: string;
  slug: string;
  name: string;
  short_desc?: string | null;
  icon_name?: string | null;
  sort_order?: number;
  hero_image_url?: string | null;
}

interface Props {
  category: CategoryCardData;
  priority?: boolean;
}

export default function CategoryCard({ category, priority = false }: Props) {
  const media = resolveCategoryMedia(category);
  const Icon = getCategoryIcon(category.icon_name, category.slug);

  return (
    <Link
      href={`/parts-attachments/${category.slug}`}
      className="group relative flex flex-col justify-between bg-white border border-[#E6E4DD] hover:border-[#CCC8BD] rounded-[5px] p-5 sm:p-6 min-h-[175px] shadow-[0_2px_6px_rgba(26,25,23,0.03),0_1px_2px_rgba(26,25,23,0.02)] hover:shadow-[0_10px_24px_-2px_rgba(26,25,23,0.07),0_3px_8px_-1px_rgba(26,25,23,0.04)] hover:-translate-y-1 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900] focus-visible:ring-offset-2 overflow-hidden select-none"
    >
      {/* ── BACKGROUND PHOTOGRAPHIC REVEAL LAYER ── */}
      {media && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[5px]">
          {/* Authentic image layer with calm physical emergence */}
          <div className="relative w-full h-full">
            <Image
              src={media.image}
              alt={media.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              className={`transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none ${
                media.objectFit === 'contain'
                  ? 'object-contain p-2 scale-[1.06] group-hover:scale-100 opacity-12 sm:opacity-10 group-hover:opacity-[0.24]'
                  : 'object-cover scale-[1.06] group-hover:scale-100 opacity-12 sm:opacity-10 group-hover:opacity-[0.22]'
              }`}
              style={{
                objectPosition: media.objectPosition,
              }}
            />
          </div>

          {/* Diffuse architectural gradient to guarantee WCAG AAA text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/94 to-white/70 group-hover:via-white/90 group-hover:to-white/60 transition-colors duration-500" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_transparent_40%,_rgba(255,255,255,0.75)_100%)] pointer-events-none" />
        </div>
      )}

      {/* ── CARD FOREGROUND CONTENT ── */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top bar: Icon badge + top micro-indicator */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 rounded-[4px] bg-[#FAF9F5] border border-[#EDECEA] group-hover:border-[#FF6900]/30 group-hover:bg-white flex items-center justify-center text-[#555] group-hover:text-[#FF6900] transition-colors duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <Icon className="w-4 h-4 stroke-[1.5]" />
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B8B5AD] group-hover:text-[#FF6900] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transform-none" />
          </div>

          {/* Department taxonomy label */}
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#94A3B8] block mb-1">
            {media?.departmentCode || 'OEM EQUIPMENT'}
          </span>

          {/* Title */}
          <h3 className="text-[15px] sm:text-base font-normal tracking-tight text-[#0F172A] group-hover:text-[#FF6900] transition-colors duration-300 line-clamp-1">
            {category.name}
          </h3>

          {/* Description */}
          {category.short_desc && (
            <p className="text-[11px] sm:text-xs text-[#64748B] font-light leading-relaxed line-clamp-2 mt-1.5">
              {category.short_desc}
            </p>
          )}
        </div>

        {/* Bottom CTA strip with directional micro-interaction */}
        <div className="mt-4 pt-3 border-t border-[#F0EEE8] flex items-center justify-between">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#8A8780] group-hover:text-[#FF6900] transition-colors duration-300">
            Explore Range
          </span>
          <ArrowRight className="w-3 h-3 text-[#CBD5E1] group-hover:text-[#FF6900] group-hover:translate-x-1 transition-all duration-300 motion-reduce:transform-none" />
        </div>
      </div>
    </Link>
  );
}
