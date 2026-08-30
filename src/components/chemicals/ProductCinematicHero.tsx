'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { ChemicalRetailProduct, ChemicalSKU } from '@/lib/types/chemical-commerce';
import { usePartsRequest } from '@/components/parts/PartsRequestListContext';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ProductCinematicHero({ product }: Props) {
  const { addItem, setIsDrawerOpen } = usePartsRequest();

  const skus: ChemicalSKU[] = product.skus && product.skus.length > 0
    ? product.skus
    : [
        {
          id: `sku-5l-${product.id}`,
          retail_product_id: product.id,
          sku_code: `ALK-${product.originating_master_code}-5L`,
          pack_size: '5 L Canister',
          volume_litres: 5,
          price: 28.50,
          in_stock: true,
          stock_quantity: 45,
          sort_order: 1,
          active: true,
        },
        {
          id: `sku-20l-${product.id}`,
          retail_product_id: product.id,
          sku_code: `ALK-${product.originating_master_code}-20L`,
          pack_size: '20 L Drum',
          volume_litres: 20,
          price: 84.00,
          in_stock: true,
          stock_quantity: 32,
          sort_order: 2,
          active: true,
        },
        {
          id: `sku-200l-${product.id}`,
          retail_product_id: product.id,
          sku_code: `ALK-${product.originating_master_code}-200L`,
          pack_size: '200 L Barrel',
          volume_litres: 200,
          price: 540.00,
          in_stock: true,
          stock_quantity: 8,
          sort_order: 3,
          active: true,
        },
        {
          id: `sku-1000l-${product.id}`,
          retail_product_id: product.id,
          sku_code: `ALK-${product.originating_master_code}-1000L`,
          pack_size: '1000 L IBC',
          volume_litres: 1000,
          price: 2150.00,
          in_stock: true,
          stock_quantity: 3,
          sort_order: 4,
          active: true,
        },
      ];

  const [selectedSku, setSelectedSku] = useState<ChemicalSKU>(skus[1] || skus[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const priceExVat = selectedSku.price * quantity;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSku.id}`,
      part_number: selectedSku.sku_code,
      name: `${product.retail_name} (${selectedSku.pack_size})`,
      price_each: selectedSku.price,
      quantity,
      pack_size: selectedSku.pack_size,
      machine_context: `${product.retail_family} (${product.originating_master_code})`,
      image: product.hero_image || undefined,
      category: 'chemical',
    });

    setAdded(true);
    setIsDrawerOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section 
      id="overview" 
      className="relative min-h-[92vh] w-full flex flex-col justify-between bg-[#FAF9F5] text-alkota-black pt-36 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#E8E8E4] overflow-hidden"
      aria-label={`${product.retail_name} - Chemical Product Showcase`}
    >
      
      {/* Top Breadcrumb */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between gap-4 border-b border-[#E8E8E4] pb-6">
        <nav className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777]">
          <Link href="/parts-attachments/chemicals" className="hover:text-alkota-orange transition-colors">
            Chemicals
          </Link>
          <span>/</span>
          <span className="text-alkota-black font-semibold">{product.retail_name}</span>
        </nav>

        <div className="flex items-center gap-3 text-xs font-ibm-plex-mono text-[#777]">
          <span>Formula {product.originating_master_code}</span>
          <span className="text-[#DDD]">•</span>
          <span className="text-emerald-800 font-medium">GB-CLP Verified</span>
        </div>
      </div>

      {/* Main Showroom Composition (Apple-Style Desire Stage) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-10">
        
        {/* Left Column: Product Selection & Direct Purchase (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block font-medium">
              {product.descriptor || 'Commercial Formulation'}
            </span>

            <h1 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}
            >
              {product.retail_name}
            </h1>

            <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed pt-1">
              {product.brand_identity?.product_promise || product.short_description}
            </p>
          </div>

          {/* Pack Size Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777]">
                Select Container Format:
              </span>
              <span className="font-ibm-plex-mono text-xs text-[#888]">
                SKU: {selectedSku.sku_code}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {skus.map((sku) => {
                const isSelected = selectedSku.id === sku.id;
                return (
                  <button
                    key={sku.id}
                    type="button"
                    onClick={() => setSelectedSku(sku)}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-black bg-white shadow-sm ring-1 ring-black'
                        : 'border-[#DCDAD4] bg-[#F2F0E8] hover:border-[#BBB]'
                    }`}
                  >
                    <span className="font-ibm-plex-mono text-xs text-alkota-black block font-medium">
                      {sku.pack_size.split(' ')[0]} {sku.pack_size.split(' ')[1]}
                    </span>
                    <span className="font-ibm-plex-mono text-[11px] text-[#777] block mt-0.5">
                      £{sku.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price, Quantity & Add to Cart */}
          <div className="pt-6 border-t border-[#E8E8E4] space-y-4">
            
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase tracking-widest block">Trade Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-ibm-plex-mono text-3xl sm:text-4xl text-alkota-black font-light">
                    £{priceExVat.toFixed(2)}
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">ex VAT</span>
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center border border-[#DCDAD4] bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#777] hover:text-black transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-ibm-plex-mono text-xs text-alkota-black font-medium">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#777] hover:text-black transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Direct Add to Cart Action */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-alkota-black hover:bg-alkota-orange text-white py-4 px-8 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? 'Added to Order ✓' : 'Add to Order'}</span>
              </button>

              <a
                href="#technical"
                className="px-6 py-4 border border-[#DCDAD4] hover:border-black text-alkota-black text-center font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
              >
                Specifications
              </a>
            </div>

          </div>

        </div>

        {/* Right Column: Giant Chemical Bottle Presentation (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px]">
          
          <div className="relative w-full max-w-xl aspect-square flex items-center justify-center p-8 bg-white border border-[#E8E8E4] shadow-sm">
            <div className="absolute inset-x-12 bottom-6 h-12 bg-black/10 blur-xl rounded-full pointer-events-none" />

            <img
              src={product.hero_image || '/assets/industries/fleet.png'}
              alt={product.retail_name}
              className="relative z-10 max-h-[85%] max-w-[85%] object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-500 select-none"
              onError={(e) => {
                (e.target as HTMLElement).setAttribute('src', '/assets/industries/fleet.png');
              }}
            />
          </div>

        </div>

      </div>

      {/* Discreet Bottom Despatch Line */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-xs font-ibm-plex-mono text-[#777]">
        <span>Sourced &amp; Stocked in UK</span>
        <span>Next-Day Courier / Pallet Despatch Across UK Mainland</span>
      </div>

    </section>
  );
}
