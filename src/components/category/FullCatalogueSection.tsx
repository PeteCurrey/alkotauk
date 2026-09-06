'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, ArrowRight, Gauge, Droplets, Zap, SlidersHorizontal, Check } from 'lucide-react';
import { Product } from '@/lib/products';

interface FullCatalogueSectionProps {
  categorySlug: string;
  categoryName: string;
  allProducts: Product[];
}

export default function FullCatalogueSection({
  categorySlug,
  categoryName,
  allProducts,
}: FullCatalogueSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPower, setSelectedPower] = useState('all');
  const [selectedDrive, setSelectedDrive] = useState('all');
  const [selectedMobility, setSelectedMobility] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique filter options from actual data
  const powerOptions = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach(p => {
      if (p.power_source) set.add(p.power_source);
    });
    return Array.from(set);
  }, [allProducts]);

  const driveOptions = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach(p => {
      if (p.pump_type) set.add(p.pump_type);
    });
    return Array.from(set);
  }, [allProducts]);

  // Filtered list
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchSearch = 
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.model_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.series?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPower = selectedPower === 'all' || p.power_source === selectedPower;
      const matchDrive = selectedDrive === 'all' || p.pump_type === selectedDrive;
      const matchMobility = 
        selectedMobility === 'all' ||
        (selectedMobility === 'portable' && p.portable) ||
        (selectedMobility === 'stationary' && !p.portable);

      return matchSearch && matchPower && matchDrive && matchMobility;
    });
  }, [allProducts, searchTerm, selectedPower, selectedDrive, selectedMobility]);

  // If not expanded and count is large, show first 9
  const displayedProducts = isExpanded ? filteredProducts : filteredProducts.slice(0, 9);

  return (
    <section id="catalogue" className="bg-[#FAFAF8] border-b border-[#E5E5E0] py-24 px-6 sm:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[10px] font-mono font-medium uppercase tracking-[0.25em] text-[#FF6900] block mb-2">
              Full Inventory Database
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-tight">
              All {categoryName}
            </h2>
            <p className="font-normal text-xs sm:text-sm text-[#666] mt-2">
              Showing {filteredProducts.length} verified industrial configurations built for the UK market.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#999]" />
            <input
              type="text"
              placeholder="Search model, series, specs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#E5E5E0] pl-10 pr-4 py-2.5 text-xs text-[#1A1A18] placeholder-[#999] focus:outline-none focus:border-[#FF6900] font-normal rounded-[5px]"
            />
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-[#E5E5E0] p-4 mb-8 flex flex-wrap items-center gap-4 text-xs font-mono rounded-[6px] shadow-tactile-sm">
          <div className="flex items-center gap-1.5 text-[#888] pr-3 border-r border-[#E5E5E0]">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#FF6900]" />
            <span>Filters:</span>
          </div>

          {/* Power Filter */}
          <select
            value={selectedPower}
            onChange={(e) => setSelectedPower(e.target.value)}
            className="bg-[#FAFAF8] border border-[#E5E5E0] px-3 py-1.5 text-xs text-[#333] focus:outline-none focus:border-[#FF6900] rounded-[4px]"
          >
            <option value="all">Power: All</option>
            {powerOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          {/* Mobility Filter */}
          <select
            value={selectedMobility}
            onChange={(e) => setSelectedMobility(e.target.value)}
            className="bg-[#FAFAF8] border border-[#E5E5E0] px-3 py-1.5 text-xs text-[#333] focus:outline-none focus:border-[#FF6900] rounded-[4px]"
          >
            <option value="all">Mobility: All</option>
            <option value="portable">Portable (Wheel Kit)</option>
            <option value="stationary">Stationary (Skid / Pad)</option>
          </select>

          {/* Reset Filters */}
          {(selectedPower !== 'all' || selectedMobility !== 'all' || searchTerm) && (
            <button
              type="button"
              onClick={() => {
                setSelectedPower('all');
                setSelectedMobility('all');
                setSearchTerm('');
              }}
              className="text-[#FF6900] hover:underline ml-auto text-[11px]"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Catalogue Grid (Responsive layout without empty gaps) */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#E5E5E0] p-12 text-center rounded-[6px] shadow-tactile">
            <p className="text-base text-[#555] font-light mb-4">
              No matching machines found for your current filter criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedPower('all');
                setSelectedMobility('all');
                setSearchTerm('');
              }}
              className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-5 py-2.5 text-xs font-medium uppercase tracking-wider rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/machines/${categorySlug}/${product.slug}`}
                className="group flex flex-col justify-between bg-white border border-[#E5E5E0] hover:border-[#FF6900] transition-colors p-6 no-underline shadow-xs rounded-[6px] shadow-tactile hover:shadow-tactile-hover transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
                    <span className="text-[#FF6900] font-medium uppercase tracking-wider">
                      {product.series || product.category}
                    </span>
                    <span className="text-[#888]">
                      {product.model_code || product.slug}
                    </span>
                  </div>

                  <div className="relative w-full h-44 mb-4 flex items-center justify-center bg-[#FAFAF8] border border-[#F0F0EC] p-3 rounded-[5px] overflow-hidden">
                    <Image
                      src={product.primary_image_url || '/assets/products/hot-water-skid.png'}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  <h3 className="font-light text-xl text-[#1A1A18] group-hover:text-[#FF6900] transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="font-normal text-xs text-[#666] line-clamp-2 leading-relaxed mb-4">
                    {product.tagline || product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0F0EC] flex items-center justify-between font-mono text-xs">
                  <span className="text-[#1A1A18]">
                    {product.pressure_bar ? `${product.pressure_bar} BAR` : ''} {product.flow_rate_lpm ? `• ${product.flow_rate_lpm} L/M` : ''}
                  </span>
                  <span className="text-[#FF6900] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Specs <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Expand / Collapse Button if more than 9 items */}
        {filteredProducts.length > 9 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#1A1A18] hover:text-white border border-[#E5E5E0] text-[#1A1A18] px-8 py-3 text-xs font-mono uppercase tracking-widest transition-all rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
            >
              <span>{isExpanded ? 'Collapse Catalogue' : `View All ${filteredProducts.length} ${categoryName}`}</span>
              <ArrowRight className={`h-3.5 w-3.5 transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
