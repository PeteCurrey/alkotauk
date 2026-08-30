'use client';

import React, { useState } from 'react';
import { ShoppingBag, Check, Plus, Minus, ShieldCheck, Truck, Sparkles, Box, CheckCircle2 } from 'lucide-react';
import { ChemicalRetailProduct, ChemicalSKU } from '@/lib/types/chemical-commerce';
import { usePartsRequest } from '@/components/parts/PartsRequestListContext';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ProductPackSelector({ product }: Props) {
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
  const vat = priceExVat * 0.2;
  const priceIncVat = priceExVat + vat;

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
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <section id="packs" className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-b border-[#222]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#222] pb-8">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2">
              // Choose Container Format
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight text-white tracking-tight uppercase">
              Select Your Pack Size.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#888] font-light leading-relaxed">
            From single 5L workshop canisters to full 1000L bulk IBCs for multi-bay wash yards. Sourced and stocked in the UK.
          </p>
        </div>

        {/* ── CARD-STYLE PACK SELECTOR GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skus.map((sku) => {
            const isSelected = selectedSku.id === sku.id;
            const pricePerLitre = sku.price / sku.volume_litres;

            return (
              <button
                key={sku.id}
                type="button"
                onClick={() => setSelectedSku(sku)}
                className={`p-6 sm:p-8 text-left transition-all relative flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'border-alkota-orange bg-[#181818] shadow-2xl scale-[1.02]'
                    : 'border-[#222] bg-[#0E0E0E] hover:border-[#444] hover:bg-[#121212]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
                )}

                <div className="space-y-3">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777]">
                    Volume: {sku.volume_litres} Litres
                  </span>
                  <h3 className="text-2xl font-light text-white tracking-tight">
                    {sku.pack_size}
                  </h3>
                  <p className="font-ibm-plex-mono text-[10px] text-[#888]">
                    SKU: {sku.sku_code}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-[#222] space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-light text-white font-mono">
                      £{sku.price.toFixed(2)}
                    </span>
                    <span className="font-ibm-plex-mono text-[10px] text-[#777]">
                      Ex VAT
                    </span>
                  </div>
                  <div className="font-ibm-plex-mono text-[10px] text-alkota-orange">
                    £{pricePerLitre.toFixed(2)} / Litre
                  </div>
                  <div className="text-[10px] font-ibm-plex-mono text-emerald-400 pt-1 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>In Stock · UK Dispatch</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── PURCHASE ACTION BAR & QUANTITY CONTROL ── */}
        <div className="p-8 sm:p-10 bg-[#121212] border border-[#262626] flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
          
          {/* Selected Summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-light text-white">
                {product.retail_name}
              </span>
              <span className="font-ibm-plex-mono text-xs text-alkota-orange px-2 py-0.5 bg-alkota-orange/10 border border-alkota-orange/30">
                {selectedSku.pack_size}
              </span>
            </div>
            <p className="text-xs text-[#888] font-mono">
              Originating Chemistry: {product.originating_master_code} — {product.originating_master_name}
            </p>
          </div>

          {/* Pricing & Cart Action */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            
            {/* Quantity Controller */}
            <div className="flex items-center border border-[#333] bg-[#0A0A0A]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-3 hover:bg-[#222] text-[#AAA] transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 py-3 font-ibm-plex-mono text-sm font-light text-white min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-3 hover:bg-[#222] text-[#AAA] transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Price Calculations */}
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-light text-white font-mono">
                £{priceExVat.toFixed(2)}
              </div>
              <div className="font-ibm-plex-mono text-[10px] text-[#888]">
                £{priceIncVat.toFixed(2)} Inc VAT
              </div>
            </div>

            {/* Add to Basket CTA */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`px-8 py-4 text-xs font-ibm-plex-mono uppercase tracking-[0.2em] transition-all cursor-pointer inline-flex items-center justify-center gap-3 shrink-0 font-medium ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-alkota-orange hover:bg-white hover:text-black text-white shadow-lg'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Order</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Commercial Fulfilment Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-ibm-plex-mono text-[#888] pt-4">
          <div className="flex items-center gap-3">
            <Truck className="w-4 h-4 text-alkota-orange shrink-0" />
            <span>Next-Day UK Courier / Pallet Despatch</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-alkota-orange shrink-0" />
            <span>GB-CLP Registered SDS Included</span>
          </div>
          <div className="flex items-center gap-3">
            <Box className="w-4 h-4 text-alkota-orange shrink-0" />
            <span>Hazard-Rated UN Commercial Packaging</span>
          </div>
        </div>

      </div>
    </section>
  );
}
