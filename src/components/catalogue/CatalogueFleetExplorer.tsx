'use client';

import React, { Suspense, useState, useMemo, useEffect, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  RotateCcw, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Layers, 
  HelpCircle, 
  ArrowRight, 
  ExternalLink,
  FilterX
} from 'lucide-react';
import { Product } from '@/lib/products';
import { SeriesInfo, CategoryDetails, slugifySeries, toCategoryRoute } from '@/lib/catalogue/series';
import MachineCard from '@/components/MachineCard';
import SeriesNavigationStrip from './SeriesNavigationStrip';

interface CatalogueFleetExplorerProps {
  initialMachines: Product[];
  allSeries: SeriesInfo[];
  categories: CategoryDetails[];
  initialCategory?: string;
  initialSeries?: string;
}

type SortOption = 'default' | 'pressure-desc' | 'flow-desc' | 'model-asc';

function CatalogueFleetExplorerInner({
  initialMachines,
  allSeries,
  categories,
  initialCategory = 'all',
  initialSeries = 'all',
}: CatalogueFleetExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial states from URL params if present
  const paramCat = searchParams.get('category') || initialCategory;
  const paramSeries = searchParams.get('series') || initialSeries;
  const paramQ = searchParams.get('q') || '';
  const paramSort = (searchParams.get('sort') as SortOption) || 'default';
  const paramPressure = searchParams.get('pressure') || 'all';
  const paramPower = searchParams.get('power') || 'all';
  const paramFuel = searchParams.get('fuel') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(paramCat);
  const [selectedSeriesSlug, setSelectedSeriesSlug] = useState<string>(paramSeries);
  const [searchQuery, setSearchQuery] = useState<string>(paramQ);
  const [sortOption, setSortOption] = useState<SortOption>(paramSort);
  const [pressureRange, setPressureRange] = useState<string>(paramPressure);
  const [powerSource, setPowerSource] = useState<string>(paramPower);
  const [heatingFuel, setHeatingFuel] = useState<string>(paramFuel);
  const [isPending, startTransition] = useTransition();

  // Sync state to URL search params
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

  // Handle category change
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSeriesSlug('all');
    updateUrlParams({ category: cat, series: null });
  };

  // Handle series change
  const handleSeriesChange = (slug: string) => {
    setSelectedSeriesSlug(slug);
    updateUrlParams({ series: slug });
  };

  // Handle search query change
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    updateUrlParams({ q: val });
  };

  // Handle sort change
  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
    updateUrlParams({ sort });
  };

  // Filter series options relevant to active category
  const activeSeriesList = useMemo(() => {
    if (selectedCategory === 'all') {
      return allSeries;
    }
    return allSeries.filter(s => s.category === selectedCategory);
  }, [selectedCategory, allSeries]);

  // Selected series object (if any)
  const activeSeriesObj = useMemo(() => {
    if (selectedSeriesSlug === 'all') return null;
    return allSeries.find(s => s.slug === selectedSeriesSlug);
  }, [selectedSeriesSlug, allSeries]);

  // Filtering and Sorting Algorithm
  const filteredMachines = useMemo(() => {
    let result = [...initialMachines];

    // 1. Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(m => m.category === selectedCategory);
    }

    // 2. Series filter
    if (selectedSeriesSlug !== 'all') {
      result = result.filter(m => slugifySeries(m.series || '') === selectedSeriesSlug);
    }

    // 3. Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(m => {
        const modelCode = (m.model_code || '').toLowerCase();
        const name = m.name.toLowerCase();
        const series = (m.series || '').toLowerCase();
        const tagline = (m.tagline || '').toLowerCase();
        const desc = (m.description || '').toLowerCase();
        return (
          modelCode.includes(q) ||
          name.includes(q) ||
          series.includes(q) ||
          tagline.includes(q) ||
          desc.includes(q)
        );
      });
    }

    // 4. Pressure Range filter
    if (pressureRange !== 'all') {
      if (pressureRange === 'under-150') {
        result = result.filter(m => typeof m.pressure_bar === 'number' && m.pressure_bar > 0 && m.pressure_bar < 150);
      } else if (pressureRange === '150-250') {
        result = result.filter(m => typeof m.pressure_bar === 'number' && m.pressure_bar >= 150 && m.pressure_bar <= 250);
      } else if (pressureRange === '250-plus') {
        result = result.filter(m => typeof m.pressure_bar === 'number' && m.pressure_bar > 250);
      }
    }

    // 5. Power Source filter
    if (powerSource !== 'all') {
      const pLower = powerSource.toLowerCase();
      result = result.filter(m => (m.power_source || '').toLowerCase().includes(pLower));
    }

    // 6. Heating Fuel filter
    if (heatingFuel !== 'all') {
      const fLower = heatingFuel.toLowerCase();
      result = result.filter(m => (m.heating_fuel || '').toLowerCase().includes(fLower));
    }

    // 7. Deterministic Sorting
    if (sortOption === 'pressure-desc') {
      result.sort((a, b) => (b.pressure_bar || 0) - (a.pressure_bar || 0));
    } else if (sortOption === 'flow-desc') {
      result.sort((a, b) => (b.flow_rate_lpm || 0) - (a.flow_rate_lpm || 0));
    } else if (sortOption === 'model-asc') {
      result.sort((a, b) => (a.model_code || a.name).localeCompare(b.model_code || b.name));
    } else {
      // Default: Manufacturer order (sort_order asc)
      result.sort((a, b) => (a.sort_order || 999) - (b.sort_order || 999));
    }

    return result;
  }, [
    initialMachines,
    selectedCategory,
    selectedSeriesSlug,
    searchQuery,
    pressureRange,
    powerSource,
    heatingFuel,
    sortOption
  ]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSeriesSlug('all');
    setSearchQuery('');
    setPressureRange('all');
    setPowerSource('all');
    setHeatingFuel('all');
    setSortOption('default');
    updateUrlParams({
      category: null,
      series: null,
      q: null,
      pressure: null,
      power: null,
      fuel: null,
      sort: null,
    });
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' ||
    selectedSeriesSlug !== 'all' ||
    searchQuery !== '' ||
    pressureRange !== 'all' ||
    powerSource !== 'all' ||
    heatingFuel !== 'all' ||
    sortOption !== 'default';

  return (
    <div className="w-full">
      {/* ── 01. CATEGORY TABS (8 CANONICAL CATEGORIES) ─────────────────────── */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#666] font-semibold">
            Select Equipment Category
          </span>
          <span className="text-[11px] font-mono text-[#888]">
            8 Canonical Categories
          </span>
        </div>

        <div 
          role="tablist"
          aria-label="Categories"
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#DDD] -mx-2 px-2"
        >
          {/* All Fleet Tab */}
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            onClick={() => handleCategoryChange('all')}
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider rounded-[3px] border transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#1A1A18] text-white border-[#1A1A18] font-bold shadow-xs'
                : 'bg-white hover:bg-[#FAF9F5] text-[#333] border-[#E0E0DC]'
            }`}
          >
            <span>All Fleet</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedCategory === 'all' ? 'bg-[#FF6900] text-white font-bold' : 'bg-[#EFEFEA] text-[#666]'
            }`}>
              {initialMachines.length}
            </span>
          </button>

          {/* 8 Specific Categories */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider rounded-[3px] border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A1A18] text-white border-[#1A1A18] font-bold shadow-xs'
                    : 'bg-white hover:bg-[#FAF9F5] text-[#333] border-[#E0E0DC]'
                }`}
              >
                <span>{cat.name.replace('Pressure Washers', '').replace('Systems', '').trim()}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-[#FF6900] text-white font-bold' : 'bg-[#EFEFEA] text-[#666]'
                }`}>
                  {cat.modelCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 02. DYNAMIC SERIES NAVIGATION STRIP ───────────────────────────── */}
      <div className="bg-[#FAF9F5] border border-[#E5E5E0] p-4 sm:p-5 rounded-[4px] mb-8">
        <SeriesNavigationStrip
          seriesList={activeSeriesList}
          selectedSeriesSlug={selectedSeriesSlug}
          onSelectSeries={handleSeriesChange}
          totalModelsCount={
            selectedCategory === 'all'
              ? initialMachines.length
              : initialMachines.filter(m => m.category === selectedCategory).length
          }
        />

        {/* Selected Series Callout / Direct Deep Link */}
        {activeSeriesObj && (
          <div className="mt-4 pt-4 border-t border-[#E5E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] bg-[#FF6900] text-white font-bold px-2 py-0.5 rounded-[2px] uppercase">
                Active Series
              </span>
              <span className="font-medium text-[#1A1A18]">
                {activeSeriesObj.displayName}
              </span>
              <span className="text-[#888] font-mono">
                ({activeSeriesObj.modelCount} Models)
              </span>
            </div>

            <Link
              href={`/machines/${toCategoryRoute(activeSeriesObj.category)}/series/${activeSeriesObj.slug}`}
              className="inline-flex items-center gap-1.5 text-[#FF6900] hover:text-[#D55700] font-mono text-[11px] uppercase tracking-wider font-semibold no-underline group"
            >
              <span>Explore Dedicated Series Dossier</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>

      {/* ── 03. FILTER & SEARCH TOOLBAR ───────────────────────────────────── */}
      <div className="bg-white border border-[#E5E5E0] p-4 sm:p-5 rounded-[4px] mb-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Quick Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search model code, series or spec (e.g. 4308, X4, Triplex)..."
              className="w-full bg-[#FAF9F5] border border-[#DDD] pl-10 pr-4 py-2.5 text-xs font-mono text-[#1A1A18] placeholder-[#888] rounded-[3px] focus:outline-none focus:border-[#FF6900] transition-colors"
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
              className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2.5 text-xs font-mono uppercase text-[#1A1A18] rounded-[3px] focus:outline-none focus:border-[#FF6900] transition-colors cursor-pointer"
            >
              <option value="all">Pressure: All Envelopes</option>
              <option value="under-150">&lt; 150 BAR (Compact / Light)</option>
              <option value="150-250">150 – 250 BAR (Standard Heavy)</option>
              <option value="250-plus">250+ BAR (Extreme Pressure)</option>
            </select>
          </div>

          {/* Power Source Selector */}
          <div>
            <select
              value={powerSource}
              onChange={(e) => {
                setPowerSource(e.target.value);
                updateUrlParams({ power: e.target.value });
              }}
              className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2.5 text-xs font-mono uppercase text-[#1A1A18] rounded-[3px] focus:outline-none focus:border-[#FF6900] transition-colors cursor-pointer"
            >
              <option value="all">Drive: All Power Units</option>
              <option value="electric">Electric Motor</option>
              <option value="diesel">Diesel Engine</option>
              <option value="gasoline">Petrol / Gasoline</option>
            </select>
          </div>

          {/* Sorting Selector */}
          <div>
            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2.5 text-xs font-mono uppercase text-[#1A1A18] rounded-[3px] focus:outline-none focus:border-[#FF6900] transition-colors cursor-pointer"
            >
              <option value="default">Sort: Manufacturer Order</option>
              <option value="pressure-desc">Pressure: Highest First</option>
              <option value="flow-desc">Flow Rate: Highest First</option>
              <option value="model-asc">Model Code: A to Z</option>
            </select>
          </div>
        </div>

        {/* Active Filter Indicator & Reset Action */}
        {hasActiveFilters && (
          <div className="mt-4 pt-3 border-t border-[#EFEFEA] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#666] flex-wrap">
              <span className="text-[10px] uppercase tracking-wider text-[#888]">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-[#FAF9F5] border border-[#DDD] px-2 py-0.5 rounded text-[11px]">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedSeriesSlug !== 'all' && (
                <span className="bg-[#FAF9F5] border border-[#DDD] px-2 py-0.5 rounded text-[11px]">
                  Series: {activeSeriesObj?.displayName || selectedSeriesSlug}
                </span>
              )}
              {searchQuery && (
                <span className="bg-[#FAF9F5] border border-[#DDD] px-2 py-0.5 rounded text-[11px]">
                  Search: "{searchQuery}"
                </span>
              )}
              {pressureRange !== 'all' && (
                <span className="bg-[#FAF9F5] border border-[#DDD] px-2 py-0.5 rounded text-[11px]">
                  Pressure: {pressureRange}
                </span>
              )}
              {powerSource !== 'all' && (
                <span className="bg-[#FAF9F5] border border-[#DDD] px-2 py-0.5 rounded text-[11px]">
                  Drive: {powerSource}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-[#FF6900] hover:text-[#D55700] uppercase tracking-wider font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* ── 04. RESULTS COUNTER & HEADER ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E5E5E0]">
        <div className="font-mono text-xs uppercase tracking-wider text-[#666]">
          Showing <span className="font-bold text-[#1A1A18]">{filteredMachines.length}</span> of {initialMachines.length} Machines
        </div>
        <div className="font-mono text-xs text-[#888] uppercase tracking-wider hidden sm:block">
          All machines verified to Alkota USA technical specifications
        </div>
      </div>

      {/* ── 05. MACHINE GRID OR EMPTY STATE ───────────────────────────────── */}
      {filteredMachines.length === 0 ? (
        <div className="bg-white border border-[#E5E5E0] p-12 text-center rounded-[4px] shadow-xs my-8">
          <FilterX className="w-10 h-10 text-[#888] mx-auto mb-3" />
          <h3 className="text-lg font-medium text-[#1A1A18] mb-1">
            No Industrial Machines Match This Criteria
          </h3>
          <p className="text-xs text-[#666] max-w-md mx-auto mb-6">
            We could not find any configurations matching your selected series, pressure, or fuel options. Try broadening your query or start over.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-[3px] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>

            <Link
              href="/machines/help-me-choose"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF9F5] text-[#1A1A18] border border-[#DDD] px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-[3px] transition-colors no-underline"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#FF6900]" />
              <span>Use Help Me Choose</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMachines.map((machine, idx) => (
            <MachineCard 
              key={machine.id || machine.slug} 
              machine={machine} 
              index={idx} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CatalogueFleetExplorer(props: CatalogueFleetExplorerProps) {
  return (
    <Suspense fallback={
      <div className="py-16 text-center">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#FF6900] border-t-transparent mb-3" />
        <p className="font-mono text-xs text-[#888] uppercase tracking-wider">
          Loading fleet explorer...
        </p>
      </div>
    }>
      <CatalogueFleetExplorerInner {...props} />
    </Suspense>
  );
}
