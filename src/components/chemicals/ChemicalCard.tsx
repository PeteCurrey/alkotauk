'use client';

import React from 'react';
import Link from 'next/link';
import { FlaskConical, Plus, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';
import { useCart } from '@/context/CartContext';

interface ChemicalCardProps {
  product: ChemicalRetailProduct;
}

export default function ChemicalCard({ product }: ChemicalCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = React.useState(false);

  const baseSku = product.skus && product.skus.length > 0 ? product.skus[0] : null;
  const priceDisplay = baseSku ? `£${baseSku.price.toFixed(2)}` : 'POA';
  const packDisplay = baseSku ? baseSku.pack_size : '5 L';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!baseSku) return;

    addItem({
      id: baseSku.id,
      productId: product.id,
      productSlug: product.slug,
      name: `${product.retail_name} (${baseSku.pack_size})`,
      category: 'chemical',
      price: baseSku.price,
      quantity: 1,
      variantName: baseSku.pack_size,
      maxQuantity: baseSku.stock_quantity || 20,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-[#EDECEA] hover:border-[#C0BDB8] transition-all duration-300 overflow-hidden">
      {/* ── IMAGE AREA ── */}
      <Link
        href={`/chemicals/product/${product.slug}`}
        className="relative aspect-[3/4] bg-[#F5F4F0] flex items-center justify-center p-6 overflow-hidden no-underline"
      >
        {product.hero_image ? (
          <SafeImage
            src={product.hero_image}
            alt={product.retail_name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[#BBB] gap-2 text-center">
            <FlaskConical className="h-8 w-8 text-[#CCC] group-hover:text-alkota-orange transition-colors" />
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#AAA]">
              {product.originating_master_code}
            </span>
          </div>
        )}

        {/* Master Code Subtle Tag */}
        <span className="absolute top-3 left-3 bg-[#0A0A0A] text-white px-2 py-0.5 font-ibm-plex-mono text-[8px] uppercase tracking-widest">
          {product.originating_master_code}
        </span>

        {/* UK CLP Verified Pill */}
        {product.compliance_status === 'VERIFIED_UK_CLP' && (
          <span className="absolute top-3 right-3 bg-emerald-700/90 text-white px-1.5 py-0.5 font-ibm-plex-mono text-[8px] uppercase tracking-widest">
            UK CLP
          </span>
        )}
      </Link>

      {/* ── CARD BODY ── */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        {/* Family & Application */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange truncate">
            {product.retail_family} Series
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" title="In Stock" />
        </div>

        {/* Retail Product Name */}
        <h3 className="text-sm font-light text-alkota-black tracking-tight leading-snug mb-1 group-hover:text-alkota-orange transition-colors line-clamp-2">
          <Link href={`/chemicals/product/${product.slug}`} className="no-underline text-inherit">
            {product.retail_name}
          </Link>
        </h3>

        {/* Originating Master Formula Reference */}
        <span className="font-ibm-plex-mono text-[10px] text-[#888] mb-3">
          Formula: <span className="text-[#333] font-normal">{product.originating_master_code} ({product.originating_master_name})</span>
        </span>

        {/* Price & Add to Cart */}
        <div className="mt-auto pt-3 border-t border-[#F0EFEB] flex items-center justify-between gap-2">
          <div>
            <span className="block font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#999]">
              From ({packDisplay}) · Ex VAT
            </span>
            <span className="font-ibm-plex-mono text-sm text-alkota-black font-normal">
              {priceDisplay}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`h-7 w-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white'
                : 'border border-[#E0DEDC] bg-white text-alkota-black hover:bg-alkota-orange hover:border-alkota-orange hover:text-white'
            }`}
            title="Add 5L to Basket"
            aria-label="Add to Basket"
          >
            {added ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
