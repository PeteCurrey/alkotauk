'use client';

import React, { Suspense, useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, RotateCcw, ArrowRight, Layers, HelpCircle, FilterX } from 'lucide-react';
import { Product } from '@/lib/products';
import { SeriesInfo, slugifySeries, toCategoryRoute } from '@/lib/catalogue/series';
import MachineCard from '@/components/MachineCard';
import SeriesNavigationStrip from '@/components/catalogue/SeriesNavigationStrip';

interface FullCatalogueSectionProps {
  categorySlug: string;
  categoryName: string;
  allProducts: Product[];
  seriesList: SeriesInfo[];
}

type SortOption = 'default' | 'pressure-desc' | 'flow-desc' | 'model-asc';

function FullCatalogueSectionInner({
  categorySlug,
  categoryName,
  allProducts,
  seriesList,
}: FullCatalogueSectionProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL query state
  const paramSeries = searchParams.get('series') || 'all';
  const paramQ = searchParams.get('q') || '';
  const paramSort = (searchParams.get('sort') as SortOption) || 'default';
  const paramPressure = searchParams.get('pressure') || 'all';
  const paramPower = searchParams.get('power') || 'all';

  const [selectedSeriesSlug, setSelectedSeriesSlug] = useState<string>(paramSeries);
  const [searchTerm, setSearchTerm] = useState<string>(paramQ);
  const [sortOption, setSortOption] = useState<SortOption>(paramSort);
  const [pressureRange, setPressureRange] = useState<string>(paramPressure);
  const [selectedPower, setSelectedPower] = useState<string>(paramPower);

  // Sync state to URL search parameters
  const updateUrlParams = useCallback((newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'all' || value === 'default') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const newQuery = params.toString();
    const targetUrl = newQuery ? `${pathname}?${newQuery}` : pathname;
    window.history.replaceState(null, '', targetUrl);
  }, [pathname, searchParams]);

  const handleSeriesChange = (slug: string) => {
    setSelectedSeriesSlug(slug);
    updateUrlParams({ series: slug });
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    updateUrlParams({ q: val });
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
    updateUrlParams({ sort });
  };

  // Active series object
  const activeSeriesObj = useMemo(() => {
    if (selectedSeriesSlug === 'all') return null;
    return seriesList.find(s => s.slug === selectedSeriesSlug);
  }, [selectedSeriesSlug, seriesList]);

  // Extract power options from actual data in this category
  const powerOptions = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach(p => {
      if (p.power_source) set.add(p.power_source);
    });
    return Array.from(set).sort();
  }, [allProducts]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Series filter
    if (selectedSeriesSlug !== 'all') {
      result = result.filter(p => slugifySeries(p.series || '') === selectedSeriesSlug);
    }

    // 2. Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.model_code.toLowerCase().includes(q) ||
        (p.series || '').toLowerCase().includes(q) ||
        (p.tagline || '').toLowerCase().includes(q)
      );
    }

    // 3. Pressure filter
    if (pressureRange !== 'all') {
      if (pressureRange === 'under-150') {
        result = result.filter(p => typeof p.pressure_bar === 'number' && p.pressure_bar > 0 && p.pressure_bar < 150);
      } else if (pressureRange === '150-250') {
        result = result.filter(p => typeof p.pressure_bar === 'number' && p.pressure_bar >= 150 && p.pressure_bar <= 250);
      } else if (pressureRange === '250-plus') {
        result = result.filter(p => typeof p.pressure_bar === 'number' && p.pressure_bar > 250);
      }
    }

    // 4. Power filter
    if (selectedPower !== 'all') {
      result = result.filter(p => p.power_source === selectedPower);
    }

    // 5. Sorting
    if (sortOption === 'pressure-desc') {
      result.sort((a, b) => (b.pressure_bar || 0) - (a.pressure_bar || 0));
    } else if (sortOption === 'flow-desc') {
      result.sort((a, b) => (b.flow_rate_lpm || 0) - (a.flow_rate_lpm || 0));
    } else if (sortOption === 'model-asc') {
      result.sort((a, b) => a.model_code.localeCompare(b.model_code));
    } else {
      result.sort((a, b) => (a.sort_order || 999) - (b.sort_order || 999));
    }

    return result;
  }, [allProducts, selectedSeriesSlug, searchTerm, pressureRange, selectedPower, sortOption]);

  const handleResetFilters = () => {
    setSelectedSeriesSlug('all');
    setSearchTerm('');
    setPressureRange('all');
    setSelectedPower('all');
    setSortOption('default');
    updateUrlParams({
      series: null,
      q: null,
      pressure: null,
      power: null,
      sort: null,
    });
  };

  const hasActiveFilters = 
    selectedSeriesSlug !== 'all' || 
    searchTerm !== '' || 
    pressureRange !== 'all' || 
    selectedPower !== 'all' || 
    sortOption !== 'default';

  return (
    <section id="catalogue" className="bg-[#FAF9F5] border-b border-[#E5E5E0] py-20 px-6 sm:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-[#FF6900] block mb-1">
              CATEGORY INVENTORY // {categoryName}
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-[#1A1A18] tracking-tight">
              All Verified {categoryName} Configurations
            </h2>
            <p className="text-xs sm:text-sm text-[#666] mt-1 font-normal">
              Showing {filteredProducts.length} of {allProducts.length} industrial configurations engineered for UK applications.
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-xs font-mono text-[#888] uppercase tracking-wider">
              {seriesList.length} Manufacturer Series Available
            </span>
          </div>
        </div>

        {/* ── 01. SERIES NAVIGATION STRIP ─────────────────────────────────── */}
        <div className="bg-white border border-[#E5E5E0] p-4 sm:p-5 rounded-[4px] mb-8 shadow-xs">
          <SeriesNavigationStrip
            seriesList={seriesList}
            selectedSeriesSlug={selectedSeriesSlug}
            onSelectSeries={handleSeriesChange}
            totalModelsCount={allProducts.length}
          />

          {/* Dedicated Series Page Link if a series is selected */}
          {activeSeriesObj && (
            <div className="mt-4 pt-4 border-t border-[#EFEFEA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] bg-[#FF6900] text-white font-bold px-2 py-0.5 rounded-[2px] uppercase">
                  Selected Series
                </span>
                <span className="font-medium text-[#1A1A18]">
                  {activeSeriesObj.displayName}
                </span>
                <span className="text-[#888] font-mono">
                  ({activeSeriesObj.modelCount} Models)
                </span>
              </div>

              <Link
                href={`/machines/${toCategoryRoute(categorySlug)}/series/${activeSeriesObj.slug}`}
                className="inline-flex items-center gap-1.5 text-[#FF6900] hover:text-[#D55700] font-mono text-[11px] uppercase tracking-wider font-semibold no-underline group"
              >
                <span>View Dedicated Series Specification Page</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>

        {/* ── 02. FILTERS & SORT TOOLBAR ──────────────────────────────────── */}
        <div className="bg-white border border-[#E5E5E0] p-4 rounded-[4px] mb-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
              <input
                type="text"
                placeholder="Search model code or specs..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#DDD] pl-10 pr-3 py-2 text-xs font-mono text-[#1A1A18] placeholder-[#888] rounded-[3px] focus:outline-none focus:border-[#FF6900] transition-colors"
              />
            </div>

            {/* Pressure Selector */}
            <div>
              <select
                value={pressureRange}
                onChange={(e) => {
                  setPressureRange(e.target.value);
                  updateUrlParams({ pressure: e.target.value });
                }}
                className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2 text-xs font-mono uppercase text-[#1A1A18] rounded-[3px] focus:outline-none focus:border-[#FF6900] transition-colors cursor-pointer"
              >
                <option value="all">Pressure: All Envelopes</option>
                <option value="under-150">&lt; 150 BAR (Light / Compact)</option>
                <option value="150-250">150 – 250 BAR (Heavy Industrial)</option>
                <option value="250-plus">250+ BAR (Extreme Pressure)</option>
              </select>
            </div>

            {/* Power Source (if multiple) */}
            <div>
              <select
                value={selectedPower}
                onChange={(e) => {
                  setSelectedPower(e.target.value);
                  updateUrlParams({ power: e.target.value });
                }}
                className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2 text-xs font-mono uppercase text-[#1A1A18] rounded-[3px] focus:outline-none focus:border-[#FF6900] transition-colors cursor-pointer"
              >
                <option value="all">Power Source: All</option>
                {powerOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2 text-xs font-mono uppercase text-[#1A1A18] rounded-[3px] focus:outline-none focus:border-[#FF6900] transition-colors cursor-pointer"
              >
                <option value="default">Sort: Manufacturer Order</option>
                <option value="pressure-desc">Pressure: Highest First</option>
                <option value="flow-desc">Flow: Highest First</option>
                <option value="model-asc">Model Code: A to Z</option>
              </select>
            </div>
          </div>

          {/* Reset Filters Action */}
          {hasActiveFilters && (
            <div className="mt-3 pt-3 border-t border-[#EFEFEA] flex items-center justify-between text-xs font-mono">
              <span className="text-[#666]">
                Filters active: {filteredProducts.length} matching models
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-[#FF6900] hover:text-[#D55700] uppercase font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* ── 03. MODEL GRID ──────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#E5E5E0] p-12 text-center rounded-[4px] shadow-xs">
            <FilterX className="w-10 h-10 text-[#888] mx-auto mb-3" />
            <h3 className="text-lg font-medium text-[#1A1A18] mb-1">
              No Models Found in this Category Criteria
            </h3>
            <p className="text-xs text-[#666] max-w-md mx-auto mb-6">
              Try choosing another series or clearing the search query.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-[3px] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
              <Link
                href="/machines/help-me-choose"
                className="inline-flex items-center gap-2 bg-white text-[#1A1A18] border border-[#DDD] px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-[3px] transition-colors no-underline"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#FF6900]" />
                <span>Use Help Me Choose</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((machine, idx) => (
              <MachineCard
                key={machine.id || machine.slug}
                machine={machine}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function FullCatalogueSection(props: FullCatalogueSectionProps) {
  return (
    <Suspense fallback={
      <section className="bg-[#FAF9F5] border-b border-[#E5E5E0] py-20 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="py-12 font-mono text-xs text-[#888] uppercase tracking-wider animate-pulse">
            Loading {props.categoryName} catalogue...
          </div>
        </div>
      </section>
    }>
      <FullCatalogueSectionInner {...props} />
    </Suspense>
  );
}
