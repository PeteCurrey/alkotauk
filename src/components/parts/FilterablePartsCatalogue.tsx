'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Plus, Check, Filter, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Part } from '@/lib/types/parts';
import { usePartsRequest } from './PartsRequestListContext';

interface Props {
  initialParts: Partial<Part>[];
}

const CATEGORIES = [
  { slug: 'all', label: 'All Categories' },
  { slug: 'pumps', label: 'Pumps & Plungers' },
  { slug: 'hoses', label: 'Hoses & Reels' },
  { slug: 'surface-cleaners', label: 'Surface Cleaners' },
  { slug: 'trigger-guns', label: 'Guns & Wands' },
  { slug: 'lances-nozzles', label: 'Nozzles & Lances' },
  { slug: 'coils', label: 'Heating Coils' },
  { slug: 'burners', label: 'Burner Heads' },
  { slug: 'valves-unloaders', label: 'Valves & Unloaders' },
  { slug: 'filters', label: 'Filters' },
  { slug: 'electrical-switches', label: 'Electrical & Switches' },
  { slug: 'service-kits', label: 'Service Kits' },
  { slug: 'fittings-couplers', label: 'Fittings & Couplers' },
];

const BRANDS = [
  { slug: 'all', label: 'All Brands' },
  { slug: 'alkota', label: 'Alkota OEM' },
  { slug: 'mosmatic', label: 'Mosmatic' },
  { slug: 'cox-reels', label: 'Cox Reels' },
  { slug: 'steel-eagle', label: 'Steel Eagle' },
  { slug: 'dual-pumps', label: 'Dual Pumps' },
];

export default function FilterablePartsCatalogue({ initialParts }: Props) {
  const { addItem, setIsDrawerOpen } = usePartsRequest();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<'default' | 'price_asc' | 'price_desc'>('default');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredParts = useMemo(() => {
    return initialParts.filter((part) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = part.name?.toLowerCase().includes(q);
        const matchesNumber = part.part_number?.toLowerCase().includes(q);
        const matchesDesc = part.description?.toLowerCase().includes(q);
        const matchesBrand = part.brand?.toLowerCase().includes(q);
        const matchesMfr = part.manufacturer?.toLowerCase().includes(q);
        if (!matchesName && !matchesNumber && !matchesDesc && !matchesBrand && !matchesMfr) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && part.category !== selectedCategory) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'all' && part.brand !== selectedBrand) {
        return false;
      }

      // Stock
      if (inStockOnly && !part.in_stock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'price_asc') {
        return (a.price ?? 99999) - (b.price ?? 99999);
      }
      if (sortOrder === 'price_desc') {
        return (b.price ?? 0) - (a.price ?? 0);
      }
      return (a.sort_order ?? 99) - (b.sort_order ?? 99);
    });
  }, [initialParts, search, selectedCategory, selectedBrand, inStockOnly, sortOrder]);

  const handleAddToCart = (part: Partial<Part>) => {
    if (!part.id || !part.part_number || !part.name) return;

    addItem({
      id: part.id,
      part_number: part.part_number,
      name: part.name,
      price_each: part.price ?? null,
      quantity: 1,
      image: part.image_url ?? undefined,
      category: part.category,
    });

    setAddedIds((prev) => ({ ...prev, [part.id!]: true }));
    setIsDrawerOpen(true);
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [part.id!]: false }));
    }, 2000);
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setInStockOnly(false);
    setSortOrder('default');
  };

  const hasActiveFilters = search || selectedCategory !== 'all' || selectedBrand !== 'all' || inStockOnly || sortOrder !== 'default';

  return (
    <section id="catalogue" className="w-full py-24 px-6 sm:px-12 lg:px-16 bg-[#EBEAE5] border-t border-[#D8D6CE]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Heading & Trust Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D6CE]">
          <div className="space-y-1">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6900] font-semibold block">
              FULL SPECIFICATION DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extralight text-[#111110] tracking-tight uppercase">
              Browse Full Catalogue ({filteredParts.length} Parts)
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-ibm-plex-mono text-[#666]">
            <span>Next-Day UK Mainland Delivery</span>
            <span>•</span>
            <span>OEM Direct Pricing</span>
          </div>
        </div>

        {/* ── SEARCH & FILTER CONTROLS ── */}
        <div className="bg-[#DFDDD6] p-6 border border-[#D0CEC5] space-y-6">
          
          {/* Top Search Bar & Sort Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search part number, description, machine model (e.g. TS2021, 4305, DL-UHD)..."
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#C8C6BD] text-xs font-ibm-plex-mono text-[#111110] placeholder-[#888] focus:outline-none focus:border-[#FF6900]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="md:col-span-4 flex items-center gap-3">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full py-3.5 px-3 bg-white border border-[#C8C6BD] text-xs font-ibm-plex-mono text-[#111110] focus:outline-none focus:border-[#FF6900]"
              >
                <option value="default">Sort: Default Order</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>

              <label className="flex items-center gap-2 text-xs font-ibm-plex-mono text-[#444] cursor-pointer whitespace-nowrap px-2">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#FF6900]"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
              Filter by Category:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1.5 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? 'bg-[#111110] text-white font-semibold shadow-sm'
                        : 'bg-[#ECEAE3] text-[#555] hover:bg-white hover:text-black border border-[#D5D3CA]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand Filter Pills */}
          <div className="space-y-2">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
              Filter by Brand Partner:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {BRANDS.map((b) => {
                const active = selectedBrand === b.slug;
                return (
                  <button
                    key={b.slug}
                    type="button"
                    onClick={() => setSelectedBrand(b.slug)}
                    className={`px-3 py-1.5 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? 'bg-[#FF6900] text-white font-semibold shadow-sm'
                        : 'bg-[#ECEAE3] text-[#555] hover:bg-white hover:text-black border border-[#D5D3CA]'
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-3 py-1.5 font-ibm-plex-mono text-[10px] uppercase tracking-wider text-rose-700 hover:underline ml-auto flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ── PARTS RESULTS GRID / TABLE ── */}
        {filteredParts.length === 0 ? (
          <div className="bg-[#DFDDD6] p-12 text-center border border-[#D0CEC5] space-y-4">
            <span className="font-ibm-plex-mono text-xs text-[#777] uppercase tracking-widest block">
              No Parts Found Matching Your Criteria
            </span>
            <p className="text-sm text-[#555] max-w-md mx-auto font-normal">
              Try broadening your search term or resetting the filters. Our UK parts desk can source any component for any Alkota machine.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-6 py-2.5 bg-[#111110] text-white font-ibm-plex-mono text-xs uppercase tracking-widest hover:bg-[#FF6900] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredParts.map((part) => {
              const isAdded = addedIds[part.id!] ?? false;
              return (
                <div
                  key={part.id || part.slug}
                  className="bg-[#ECEAE3] border border-[#D5D3CA] hover:border-[#111110] transition-all p-5 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Header line: Part Number & Stock Status */}
                    <div className="flex items-center justify-between font-ibm-plex-mono text-[10px]">
                      <span className="text-[#FF6900] font-semibold uppercase">
                        {part.part_number}
                      </span>
                      <span className={`flex items-center gap-1.5 ${part.in_stock ? 'text-emerald-700' : 'text-amber-700'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${part.in_stock ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                        <span>{part.in_stock ? 'In Stock' : 'Check Stock'}</span>
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-light text-base text-[#111110] group-hover:text-black leading-snug line-clamp-2 min-h-[44px]">
                      {part.name}
                    </h3>

                    {/* Brand & OEM Badge */}
                    <div className="flex items-center gap-2 text-[10px] font-ibm-plex-mono text-[#777]">
                      <span className="uppercase">{part.manufacturer || part.brand || 'Alkota OEM'}</span>
                      {part.oem_genuine && (
                        <span className="bg-[#DFDDD6] text-emerald-800 px-1.5 py-0.5 font-semibold text-[9px]">
                          OEM GENUINE
                        </span>
                      )}
                    </div>

                    {/* Description snippet */}
                    {part.description && (
                      <p className="text-xs text-[#666] line-clamp-2 font-normal leading-relaxed">
                        {part.description}
                      </p>
                    )}
                  </div>

                  {/* Price & Add to Cart Footer */}
                  <div className="pt-5 border-t border-[#DCDAD2] mt-4 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase block">Trade Price</span>
                        <span className="font-ibm-plex-mono text-lg font-light text-[#111110]">
                          {part.price ? `£${part.price.toFixed(2)}` : 'POA'}
                        </span>
                      </div>
                      <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">ex VAT</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(part)}
                        className="w-full bg-[#111110] hover:bg-[#FF6900] text-white py-2.5 px-3 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-colors font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{isAdded ? 'Added ✓' : 'Add to Order'}</span>
                      </button>

                      <Link
                        href={`/parts-attachments/product/${part.slug || part.part_number?.toLowerCase()}`}
                        className="w-full py-2.5 border border-[#C5C3BB] hover:border-black text-[#111110] text-center font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-colors bg-white/40"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
