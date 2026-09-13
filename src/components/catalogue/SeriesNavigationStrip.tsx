'use client';

import React, { useRef } from 'react';
import { SeriesInfo } from '@/lib/catalogue/series';
import { ChevronRight, Layers } from 'lucide-react';

interface SeriesNavigationStripProps {
  seriesList: SeriesInfo[];
  selectedSeriesSlug: string; // 'all' or specific slug
  onSelectSeries: (slug: string) => void;
  totalModelsCount: number;
  className?: string;
  showTitle?: boolean;
}

export default function SeriesNavigationStrip({
  seriesList,
  selectedSeriesSlug,
  onSelectSeries,
  totalModelsCount,
  className = '',
  showTitle = true,
}: SeriesNavigationStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (seriesList.length <= 1) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#666]">
            <Layers className="w-3.5 h-3.5 text-[#FF6900]" />
            <span className="font-semibold text-[#1A1A18]">Manufacturer Series</span>
            <span>({seriesList.length} Series Available)</span>
          </div>
          <span className="text-[10px] font-mono text-[#888] hidden sm:inline">
            Select a series to filter fleet
          </span>
        </div>
      )}

      {/* Horizontally scrollable strip on small screens, flex-wrap on larger screens */}
      <div 
        ref={scrollRef}
        role="tablist"
        aria-label="Filter machines by manufacturer series"
        className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-thin scrollbar-thumb-[#DDD] scrollbar-track-transparent -mx-2 px-2"
      >
        {/* All Series Button */}
        <button
          type="button"
          role="tab"
          aria-selected={selectedSeriesSlug === 'all'}
          onClick={() => onSelectSeries('all')}
          className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-[3px] border transition-all cursor-pointer ${
            selectedSeriesSlug === 'all'
              ? 'bg-[#1A1A18] text-white border-[#1A1A18] font-bold shadow-xs'
              : 'bg-white hover:bg-[#FAF9F5] text-[#444] border-[#E0E0DC] hover:border-[#CCC]'
          }`}
        >
          <span>All Series</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            selectedSeriesSlug === 'all' ? 'bg-[#FF6900] text-white font-bold' : 'bg-[#EFEFEA] text-[#666]'
          }`}>
            {totalModelsCount}
          </span>
        </button>

        {/* Individual Series Chips */}
        {seriesList.map((series) => {
          const isSelected = selectedSeriesSlug === series.slug;
          return (
            <button
              key={series.slug}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectSeries(series.slug)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-[3px] border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1A1A18] text-white border-[#1A1A18] font-bold shadow-xs'
                  : 'bg-white hover:bg-[#FAF9F5] text-[#444] border-[#E0E0DC] hover:border-[#CCC]'
              }`}
            >
              <span className="truncate max-w-[200px]">{series.displayName}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-[#FF6900] text-white font-bold' : 'bg-[#EFEFEA] text-[#666]'
              }`}>
                {series.modelCount}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
