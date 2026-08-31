'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Check, Search, Filter, X, ArrowRight, ShieldCheck, Droplets } from 'lucide-react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';
import { usePartsRequest } from '@/components/parts/PartsRequestListContext';
import { CHEMICAL_APPLICATIONS } from '@/lib/chemicals/seed-data';

interface Props {
  products: ChemicalRetailProduct[];
}

export default function FacetedChemicalDirectory({ products }: Props) {
  const { addItem, setIsDrawerOpen } = usePartsRequest();
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = prod.retail_name.toLowerCase().includes(q);
        const matchesCode = prod.originating_master_code.toLowerCase().includes(q);
        const matchesDesc = prod.short_description.toLowerCase().includes(q);
        const matchesFamily = prod.retail_family.toLowerCase().includes(q);
        const matchesApp = prod.primary_application.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesDesc && !matchesFamily && !matchesApp) {
          return false;
        }
      }

      // Sector facet
      if (selectedSector !== 'all') {
        const app = CHEMICAL_APPLICATIONS.find(a => a.slug === selectedSector);
        if (app) {
          const appKeyword = app.name.toLowerCase().split(' ')[0];
          const matchesPrimary = prod.primary_application.toLowerCase().includes(appKeyword);
          const matchesLong = prod.long_description.toLowerCase().includes(appKeyword);
          const matchesFamily = prod.retail_family.toLowerCase().includes(appKeyword);
          if (!matchesPrimary && !matchesLong && !matchesFamily) {
            return false;
          }
        }
      }

      return true;
    });
  }, [products, selectedSector, search]);

  const handleAddToCart = (product: ChemicalRetailProduct) => {
    const sku = (product.skus && product.skus[1]) || (product.skus && product.skus[0]) || {
      sku_code: `ALK-${product.originating_master_code}-20L`,
      pack_size: '20 L Drum',
      price: 84.00,
    };

    addItem({
      id: `${product.id}-${sku.sku_code}`,
      part_number: sku.sku_code,
      name: `${product.retail_name} (${sku.pack_size})`,
      price_each: sku.price,
      quantity: 1,
      pack_size: sku.pack_size,
      machine_context: `${product.retail_family} (${product.originating_master_code})`,
      image: product.hero_image || undefined,
      category: 'chemical',
    });

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setIsDrawerOpen(true);
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section id="catalogue" className="w-full py-24 px-6 sm:px-12 lg:px-16 bg-[#EBEAE5] border-t border-[#D8D6CE]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header & Sector Count */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D6CE]">
          <div className="space-y-1">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6900] font-semibold block">
              FORMULATION DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extralight text-[#111110] tracking-tight uppercase">
              All Formulations ({filteredProducts.length} Products)
            </h2>
          </div>
          <p className="text-xs font-ibm-plex-mono text-[#666] max-w-sm">
            100% GB-CLP verified master chemical formulations engineered for high-pressure hot water delivery.
          </p>
        </div>

        {/* ── 8-SECTOR APPLICATION FACET BAR ── */}
        <div className="bg-[#DFDDD6] p-6 border border-[#D0CEC5] space-y-6">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search formulation name, master code (e.g. TR-407, DE-703, TS-602), application..."
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

          {/* 8 Sector Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block">
                Faceted by Application Sector:
              </span>
              {(selectedSector !== 'all' || search) && (
                <button
                  type="button"
                  onClick={() => { setSelectedSector('all'); setSearch(''); }}
                  className="font-ibm-plex-mono text-[10px] text-rose-700 hover:underline uppercase"
                >
                  Reset Filters
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedSector('all')}
                className={`px-3.5 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                  selectedSector === 'all'
                    ? 'bg-[#111110] text-white font-semibold shadow-sm'
                    : 'bg-[#ECEAE3] text-[#555] hover:bg-white hover:text-black border border-[#D5D3CA]'
                }`}
              >
                All Sectors ({products.length})
              </button>

              {CHEMICAL_APPLICATIONS.map((app) => {
                const active = selectedSector === app.slug;
                return (
                  <button
                    key={app.slug}
                    type="button"
                    onClick={() => setSelectedSector(app.slug)}
                    className={`px-3.5 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? 'bg-[#FF6900] text-white font-semibold shadow-sm'
                        : 'bg-[#ECEAE3] text-[#555] hover:bg-white hover:text-black border border-[#D5D3CA]'
                    }`}
                  >
                    {app.name}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── FORMULATION GRID (UNBOXED EDITORIAL CARDS) ── */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#DFDDD6] p-12 text-center border border-[#D0CEC5] space-y-4">
            <span className="font-ibm-plex-mono text-xs text-[#777] uppercase tracking-widest block">
              No Chemical Formulations Found
            </span>
            <p className="text-sm text-[#555] max-w-md mx-auto font-normal">
              Try resetting the sector filter or searching for a specific soil type or master code.
            </p>
            <button
              type="button"
              onClick={() => { setSelectedSector('all'); setSearch(''); }}
              className="px-6 py-2.5 bg-[#111110] text-white font-ibm-plex-mono text-xs uppercase tracking-widest hover:bg-[#FF6900] transition-colors"
            >
              Show All Formulations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const isAdded = addedIds[prod.id] ?? false;
              const minPrice = (prod.skus && prod.skus.length > 0) ? Math.min(...prod.skus.map(s => s.price)) : 35;
              const packLabels = prod.skus && prod.skus.length > 0 ? prod.skus.map(s => s.pack_size.split(' ')[0]).join(' · ') : '5L · 20L · 200L';

              return (
                <div
                  key={prod.id}
                  className="bg-[#ECEAE3] border border-[#D5D3CA] hover:border-[#111110] transition-all p-6 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header: Master Code + GB-CLP Badge */}
                    <div className="flex items-center justify-between font-ibm-plex-mono text-[10px]">
                      <span className="bg-[#111110] text-white px-2 py-0.5 font-bold tracking-widest uppercase">
                        {prod.originating_master_code}
                      </span>
                      <span className="text-emerald-800 font-semibold text-[9px] uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>GB-CLP</span>
                      </span>
                    </div>

                    {/* Product Name */}
                    <div>
                      <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#FF6900] block mb-1">
                        {prod.descriptor || prod.retail_family}
                      </span>
                      <h3 className="font-light text-lg text-[#111110] group-hover:text-black leading-snug">
                        {prod.retail_name}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-[#555] line-clamp-3 font-normal leading-relaxed">
                      {prod.short_description}
                    </p>

                    {/* Engineering Specs: Dilution & Pack sizes */}
                    <div className="pt-2 space-y-1.5 text-[10px] font-ibm-plex-mono text-[#666] border-t border-[#DCDAD2]">
                      <div className="flex justify-between">
                        <span className="text-[#888]">PACK SIZES</span>
                        <span className="text-[#111110] font-medium">{packLabels}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#888]">APPLICATION</span>
                        <span className="text-[#111110] truncate max-w-[140px] text-right">{prod.primary_application}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Add to Cart Footer */}
                  <div className="pt-6 border-t border-[#DCDAD2] mt-4 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase block">Trade Price</span>
                        <span className="font-ibm-plex-mono text-xl font-light text-[#111110]">
                          From £{minPrice.toFixed(2)}
                        </span>
                      </div>
                      <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">ex VAT</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(prod)}
                        className="w-full bg-[#111110] hover:bg-[#FF6900] text-white py-2.5 px-3 font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-colors font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{isAdded ? 'Added ✓' : 'Add to Order'}</span>
                      </button>

                      <Link
                        href={`/chemicals/product/${prod.slug}`}
                        className="w-full py-2.5 border border-[#C5C3BB] hover:border-black text-[#111110] text-center font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-colors bg-white/40"
                      >
                        Dossier →
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
