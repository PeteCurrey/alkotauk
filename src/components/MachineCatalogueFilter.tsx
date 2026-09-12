'use client';

import { useState, useEffect, useTransition } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Droplets, Gauge, Flame, Zap } from 'lucide-react';
import { CANONICAL_CATEGORIES, Product } from '@/lib/products';

interface MachineCatalogueFilterProps {
  initialCategory?: string;
  onFiltered?: (filtered: Product[]) => void;
  allMachines: Product[];
}

export default function MachineCatalogueFilter({
  initialCategory,
  onFiltered,
  allMachines
}: MachineCatalogueFilterProps) {
  const [q, setQ] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [pressureRange, setPressureRange] = useState('all');
  const [fuelType, setFuelType] = useState('all');
  const [isPending, startTransition] = useTransition();

  // Apply filters synchronously across all loaded machines
  useEffect(() => {
    startTransition(() => {
      let filtered = [...allMachines];

      if (selectedCategory && selectedCategory !== 'all') {
        const catKey = selectedCategory === 'parts-washers' ? 'parts-washer' : selectedCategory;
        filtered = filtered.filter(m => m.category === catKey);
      }

      if (q.trim() !== '') {
        const query = q.toLowerCase().trim();
        filtered = filtered.filter(m => 
          m.name.toLowerCase().includes(query) ||
          m.model_code?.toLowerCase().includes(query) ||
          m.series?.toLowerCase().includes(query) ||
          m.tagline?.toLowerCase().includes(query)
        );
      }

      if (pressureRange !== 'all') {
        if (pressureRange === 'under-150') {
          filtered = filtered.filter(m => (m.pressure_bar || 0) > 0 && (m.pressure_bar || 0) < 150);
        } else if (pressureRange === '150-250') {
          filtered = filtered.filter(m => (m.pressure_bar || 0) >= 150 && (m.pressure_bar || 0) <= 250);
        } else if (pressureRange === '250-plus') {
          filtered = filtered.filter(m => (m.pressure_bar || 0) > 250);
        }
      }

      if (fuelType !== 'all') {
        const fLower = fuelType.toLowerCase();
        filtered = filtered.filter(m => 
          (m.heating_fuel || '').toLowerCase().includes(fLower) ||
          (m.power_source || '').toLowerCase().includes(fLower)
        );
      }

      if (onFiltered) {
        onFiltered(filtered);
      }
    });
  }, [q, selectedCategory, pressureRange, fuelType, allMachines]);

  const handleReset = () => {
    setQ('');
    setSelectedCategory('all');
    setPressureRange('all');
    setFuelType('all');
  };

  const hasActiveFilters = q !== '' || selectedCategory !== (initialCategory || 'all') || pressureRange !== 'all' || fuelType !== 'all';

  return (
    <div className="bg-white border border-[#E0E0DC] p-6 mb-12 shadow-sm">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by model, series or spec (e.g. 430XH, Triplex, 200 Bar)..."
            className="w-full bg-[#FAF9F5] border border-[#DDD] pl-11 pr-4 py-3 text-xs font-mono text-alkota-black focus:outline-none focus:border-alkota-orange transition-colors"
          />
        </div>

        {/* Category Dropdown */}
        <div className="w-full lg:w-56">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#FAF9F5] border border-[#DDD] px-4 py-3 text-xs font-mono uppercase text-alkota-black focus:outline-none focus:border-alkota-orange transition-colors cursor-pointer"
          >
            <option value="all">All Machine Categories</option>
            {Object.entries(CANONICAL_CATEGORIES).map(([slug, cat]) => (
              <option key={slug} value={slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Pressure Range */}
        <div className="w-full lg:w-48">
          <select
            value={pressureRange}
            onChange={(e) => setPressureRange(e.target.value)}
            className="w-full bg-[#FAF9F5] border border-[#DDD] px-4 py-3 text-xs font-mono uppercase text-alkota-black focus:outline-none focus:border-alkota-orange transition-colors cursor-pointer"
          >
            <option value="all">Pressure: All Ranges</option>
            <option value="under-150">&lt; 150 BAR (Compact)</option>
            <option value="150-250">150 – 250 BAR (Heavy)</option>
            <option value="250-plus">250+ BAR (Extreme)</option>
          </select>
        </div>

        {/* Fuel / Power Type */}
        <div className="w-full lg:w-48">
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="w-full bg-[#FAF9F5] border border-[#DDD] px-4 py-3 text-xs font-mono uppercase text-alkota-black focus:outline-none focus:border-alkota-orange transition-colors cursor-pointer"
          >
            <option value="all">Power / Fuel: All</option>
            <option value="electric">Electric Motor</option>
            <option value="diesel">Diesel / Kerosene</option>
            <option value="gas">Natural Gas / LP</option>
            <option value="gasoline">Petrol / Gasoline</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#F0F0EE] hover:bg-alkota-orange hover:text-white text-alkota-black text-xs font-mono uppercase tracking-wider transition-colors shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {isPending && (
        <div className="mt-3 font-mono text-[10px] text-alkota-orange uppercase tracking-widest animate-pulse">
          Filtering catalogue...
        </div>
      )}
    </div>
  );
}
