'use client';

import React, { useState } from 'react';
import { ShoppingBag, Check, Plus, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { ChemicalRetailProduct, ChemicalSKU } from '@/lib/types/chemical-commerce';
import { useCart } from '@/context/CartContext';

interface Props {
  product: ChemicalRetailProduct;
}

export default function ChemicalProductInteractive({ product }: Props) {
  const { addItem } = useCart();
  const skus = product.skus || [];
  const [selectedSkuId, setSelectedSkuId] = useState<string>(skus[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const selectedSku = skus.find(s => s.id === selectedSkuId) || skus[0];
  const price = selectedSku ? selectedSku.price : 0;
  const priceTotal = price * quantity;

  const handleAddToCart = () => {
    if (!selectedSku) return;

    addItem({
      id: selectedSku.id,
      productId: product.id,
      productSlug: product.slug,
      name: `${product.retail_name} (${selectedSku.pack_size})`,
      category: 'chemical',
      price: selectedSku.price,
      quantity,
      variantName: selectedSku.pack_size,
      maxQuantity: selectedSku.stock_quantity || 20,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* ── PACK SIZE SELECTOR ── */}
      <div>
        <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#666] mb-3">
          Select Container / Pack Size:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {skus.map((sku) => {
            const isSelected = sku.id === selectedSkuId;
            return (
              <button
                key={sku.id}
                type="button"
                onClick={() => setSelectedSkuId(sku.id)}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-md'
                    : 'border-[#E0DEDC] bg-white text-alkota-black hover:border-alkota-orange'
                }`}
              >
                <span className="block font-ibm-plex-mono text-xs font-bold">{sku.pack_size}</span>
                <span className={`block font-mono text-[11px] mt-1 ${isSelected ? 'text-alkota-orange' : 'text-[#666]'}`}>
                  £{sku.price.toFixed(2)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PRICE & STOCK DISPLAY ── */}
      <div className="p-5 bg-[#FAF9F5] border border-[#E8E8E4] space-y-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-ibm-plex-mono uppercase tracking-widest text-[#888] block">
              Unit Price (Ex VAT):
            </span>
            <span className="text-3xl font-extralight text-alkota-black font-mono">
              £{price.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              In Stock · Next-Day Dispatch
            </span>
          </div>
        </div>

        <div className="font-ibm-plex-mono text-[10px] text-[#777] pt-1">
          SKU: <span className="text-alkota-black font-bold">{selectedSku?.sku_code}</span> · {selectedSku?.volume_litres} Litres Net
        </div>
      </div>

      {/* ── QUANTITY & ADD TO BASKET ── */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="flex items-center border border-[#E0DEDC] bg-white w-32 shrink-0">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-12 flex items-center justify-center text-base hover:bg-[#FAF9F5] cursor-pointer"
          >
            -
          </button>
          <span className="flex-1 text-center font-mono text-sm font-bold text-alkota-black">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-12 flex items-center justify-center text-base hover:bg-[#FAF9F5] cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 py-4 px-8 font-ibm-plex-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
            added
              ? 'bg-emerald-600 text-white'
              : 'bg-alkota-orange hover:bg-black text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Basket</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Basket (£{priceTotal.toFixed(2)})</span>
            </>
          )}
        </button>
      </div>

      {/* Trust badging */}
      <div className="pt-2 flex flex-wrap items-center gap-6 text-[11px] font-ibm-plex-mono text-[#777] border-t border-[#F0EFEB]">
        <span className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-alkota-orange" />
          Direct UK Mainland Dispatch
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-alkota-orange" />
          Verified GB-CLP Compliant
        </span>
      </div>
    </div>
  );
}
