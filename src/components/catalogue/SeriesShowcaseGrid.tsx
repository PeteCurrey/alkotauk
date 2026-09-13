'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Gauge, Flame, Zap, ShieldCheck } from 'lucide-react';
import { SeriesInfo, CANONICAL_CATEGORIES } from '@/lib/catalogue/series';

interface SeriesShowcaseGridProps {
  allSeries: SeriesInfo[];
}

export default function SeriesShowcaseGrid({ allSeries }: SeriesShowcaseGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Build category filter options with exact series counts
  const categoryFilters = useMemo(() => {
    const counts: Record<string, number> = {};
    allSeries.forEach(s => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });

    return [
      { slug: 'all', label: 'All 36 Series', count: allSeries.length },
      { slug: 'hot-water', label: 'Hot Water', count: counts['hot-water'] || 0 },
      { slug: 'cold-water', label: 'Cold Water', count: counts['cold-water'] || 0 },
      { slug: 'steam', label: 'Industrial Steam', count: counts['steam'] || 0 },
      { slug: 'parts-washer', label: 'Parts Washers', count: counts['parts-washer'] || 0 },
      { slug: 'water-heater', label: 'Water Heaters', count: counts['water-heater'] || 0 },
      { slug: 'trailer', label: 'Mobile Trailers', count: counts['trailer'] || 0 },
      { slug: 'water-treatment', label: 'Water Treatment', count: counts['water-treatment'] || 0 },
      { slug: 'space-heater', label: 'Space Heaters', count: counts['space-heater'] || 0 },
    ];
  }, [allSeries]);

  // Filter series list
  const filteredSeries = useMemo(() => {
    if (selectedCategory === 'all') return allSeries;
    return allSeries.filter(s => s.category === selectedCategory);
  }, [allSeries, selectedCategory]);

  return (
    <section id="browse-by-series" className="mb-20 pt-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E5E5E0] gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] block mb-1 font-semibold">
            02 // DISCOVERY PATHWAY B
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-[#1A1A18] tracking-tight">
            Browse by Machine Series
          </h2>
        </div>
        <p className="font-mono text-xs text-[#888] uppercase tracking-wider">
          36 Heavy-Duty Manufacturer Series · Direct Factory Lineup
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin scrollbar-thumb-[#DDD] -mx-2 px-2">
        {categoryFilters.map(filter => {
          const isActive = selectedCategory === filter.slug;
          return (
            <button
              key={filter.slug}
              type="button"
              onClick={() => setSelectedCategory(filter.slug)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-[3px] border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1A1A18] text-white border-[#1A1A18] font-bold shadow-xs'
                  : 'bg-white hover:bg-[#FAF9F5] text-[#444] border-[#E0E0DC] hover:border-[#CCC]'
              }`}
            >
              <span>{filter.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#FF6900] text-white font-bold' : 'bg-[#EFEFEA] text-[#666]'
                }`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 36 Series Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSeries.map((series) => {
          const pressureSpan = series.minPressureBar && series.maxPressureBar
            ? `${series.minPressureBar === series.maxPressureBar ? `${series.minPressureBar} BAR` : `${series.minPressureBar}–${series.maxPressureBar} BAR`}`
            : null;
          
          const flowSpan = series.minFlowLpm && series.maxFlowLpm
            ? `${series.minFlowLpm === series.maxFlowLpm ? `${series.minFlowLpm} L/M` : `${series.minFlowLpm}–${series.maxFlowLpm} L/M`}`
            : null;

          return (
            <Link
              key={series.slug}
              href={`/machines/${series.categorySlug}/series/${series.slug}`}
              className="group flex flex-col bg-white border border-[#E5E5E0] hover:border-[#FF6900] rounded-[4px] p-6 shadow-xs hover:shadow-md transition-all duration-300 no-underline"
            >
              {/* Header: Category Badge & Model Count */}
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#FF6900] bg-[#FFF5EB] px-2 py-0.5 rounded border border-[#FFE3CC]">
                  {series.category.replace('-', ' ')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#666] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EAEAEA]">
                  {series.modelCount} {series.modelCount === 1 ? 'Model' : 'Models'}
                </span>
              </div>

              {/* Series Representative Equipment Photography */}
              <div className="relative aspect-[16/10] w-full bg-[#FAF9F5] rounded-[3px] p-5 mb-4 flex items-center justify-center overflow-hidden border border-[#F0F0EC]">
                <img
                  src={series.representativeImage}
                  alt={`${series.displayName} equipment photography`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              {/* Series Title */}
              <h3 className="text-lg font-medium text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-snug mb-2">
                {series.displayName}
              </h3>

              {/* Technical Capability Envelope */}
              {(pressureSpan || series.powerSources.length > 0 || series.heatingFuels.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] font-mono text-[#666]">
                  {pressureSpan && (
                    <span className="inline-flex items-center gap-1 bg-[#F6F6F2] px-2 py-0.5 rounded border border-[#EAEAE5]">
                      <Gauge className="w-3 h-3 text-[#FF6900]" />
                      <span>{pressureSpan}</span>
                    </span>
                  )}
                  {flowSpan && (
                    <span className="inline-flex items-center gap-1 bg-[#F6F6F2] px-2 py-0.5 rounded border border-[#EAEAE5]">
                      <Zap className="w-3 h-3 text-[#FF6900]" />
                      <span>{flowSpan}</span>
                    </span>
                  )}
                  {series.heatingFuels.length > 0 && (
                    <span className="inline-flex items-center gap-1 bg-[#F6F6F2] px-2 py-0.5 rounded border border-[#EAEAE5]">
                      <Flame className="w-3 h-3 text-[#FF6900]" />
                      <span className="truncate max-w-[140px]">{series.heatingFuels[0]}</span>
                    </span>
                  )}
                  {series.powerSources.length > 0 && !pressureSpan && (
                    <span className="inline-flex items-center gap-1 bg-[#F6F6F2] px-2 py-0.5 rounded border border-[#EAEAE5]">
                      <ShieldCheck className="w-3 h-3 text-[#FF6900]" />
                      <span className="truncate max-w-[140px]">{series.powerSources[0]}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Description snippet */}
              <p className="text-xs text-[#555] line-clamp-2 leading-relaxed mb-4 flex-1">
                {series.description || `Continuous-duty American engineering from Alkota. Built with heavy-gauge chassis and verified components for demanding UK operational environments.`}
              </p>

              {/* Footer action link */}
              <div className="pt-3 border-t border-[#F0F0EC] flex items-center justify-between text-xs font-mono text-[#1A1A18] group-hover:text-[#FF6900] transition-colors">
                <span className="uppercase tracking-wider font-semibold">View Series ({series.modelCount} Configurations)</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
