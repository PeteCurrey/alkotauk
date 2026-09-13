import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Gauge, Zap, Flame, ShieldCheck } from 'lucide-react';
import { SeriesInfo, toCategoryRoute } from '@/lib/catalogue/series';

interface CategorySeriesShowcaseProps {
  categorySlug: string;
  categoryName: string;
  seriesList: SeriesInfo[];
  totalModels: number;
}

export default function CategorySeriesShowcase({
  categorySlug,
  categoryName,
  seriesList,
  totalModels,
}: CategorySeriesShowcaseProps) {
  if (!seriesList || seriesList.length === 0) {
    return null;
  }

  const routeCategory = toCategoryRoute(categorySlug);

  return (
    <section 
      id="browse-by-series"
      aria-labelledby="browse-by-series-heading" 
      className="bg-[#FAF9F5] border-t border-b border-[#E5E5E0] py-20 px-6 sm:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-[#FF6900]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] font-semibold">
                Equipment Classification // Machine Families
              </span>
            </div>
            <h2 
              id="browse-by-series-heading" 
              className="text-2xl sm:text-4xl font-light text-[#1A1A18] tracking-tight"
            >
              Browse by Series
            </h2>
            <p className="text-sm text-[#555] mt-2 font-normal max-w-2xl leading-relaxed">
              Explore the Alkota {categoryName.toLowerCase()} range by machine family. {totalModels} verified configurations arranged across {seriesList.length} specialized engineering platforms.
            </p>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#E0E0DC] px-3.5 py-1.5 rounded-[3px] text-xs font-mono text-[#666] uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#FF6900]" />
              <span>{seriesList.length} {seriesList.length === 1 ? 'Series Available' : 'Series Available'}</span>
            </span>
          </div>
        </div>

        {/* Series Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {seriesList.map((series) => {
            const seriesUrl = `/machines/${routeCategory}/series/${series.slug}`;
            const pressureSpan = series.minPressureBar && series.maxPressureBar
              ? `${series.minPressureBar === series.maxPressureBar ? `${series.minPressureBar} BAR` : `${series.minPressureBar}–${series.maxPressureBar} BAR`}`
              : null;

            return (
              <Link
                key={series.slug}
                href={seriesUrl}
                aria-label={`Explore ${series.displayName} (${series.modelCount} models)`}
                className="group flex flex-col justify-between bg-white border border-[#E5E5E0] hover:border-[#FF6900] rounded-[3px] p-5 shadow-xs hover:shadow-md transition-all duration-300 no-underline focus-visible:outline-[#FF6900] focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div>
                  {/* Top Bar: Model Count Badge */}
                  <div className="flex items-center justify-between font-mono text-[11px] mb-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#888]">
                      Alkota USA
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#666] bg-[#FAF9F5] px-2 py-0.5 rounded-[2px] border border-[#EAEAEA] group-hover:border-[#FF6900]/30 transition-colors">
                      {series.modelCount} {series.modelCount === 1 ? 'Model' : 'Models'}
                    </span>
                  </div>

                  {/* Representative Equipment Image */}
                  {series.representativeImage && (
                    <div className="relative aspect-[16/11] w-full bg-[#FAF9F5] rounded-[2px] p-3 mb-4 flex items-center justify-center overflow-hidden border border-[#F0F0EC] group-hover:border-[#EAEAEA] transition-colors">
                      <img
                        src={series.representativeImage}
                        alt={`${series.displayName} machine photography`}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-xs"
                      />
                    </div>
                  )}

                  {/* Series Title */}
                  <h3 className="text-sm font-medium text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-snug mb-2 line-clamp-2">
                    {series.displayName}
                  </h3>

                  {/* Key Envelope Badges */}
                  {(pressureSpan || series.heatingFuels.length > 0 || series.powerSources.length > 0) && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[10px] font-mono text-[#666]">
                      {pressureSpan && (
                        <span className="inline-flex items-center gap-1 bg-[#F6F6F2] px-1.5 py-0.5 rounded-[2px] border border-[#EAEAE5]">
                          <Gauge className="w-2.5 h-2.5 text-[#FF6900]" />
                          <span>{pressureSpan}</span>
                        </span>
                      )}
                      {series.heatingFuels.length > 0 && (
                        <span className="inline-flex items-center gap-1 bg-[#F6F6F2] px-1.5 py-0.5 rounded-[2px] border border-[#EAEAE5] truncate max-w-[130px]">
                          <Flame className="w-2.5 h-2.5 text-[#FF6900]" />
                          <span className="truncate">{series.heatingFuels[0]}</span>
                        </span>
                      )}
                      {series.powerSources.length > 0 && !pressureSpan && (
                        <span className="inline-flex items-center gap-1 bg-[#F6F6F2] px-1.5 py-0.5 rounded-[2px] border border-[#EAEAE5] truncate max-w-[130px]">
                          <ShieldCheck className="w-2.5 h-2.5 text-[#FF6900]" />
                          <span className="truncate">{series.powerSources[0]}</span>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Series Description */}
                  {series.description && (
                    <p className="text-xs text-[#666] line-clamp-2 leading-relaxed mb-4">
                      {series.description}
                    </p>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#F0F0EC] flex items-center justify-between text-xs font-mono text-[#1A1A18] group-hover:text-[#FF6900] transition-colors mt-auto">
                  <span className="uppercase tracking-wider font-semibold text-[11px]">
                    View Series Lineup
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
