'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Check, ShoppingBag, ArrowRight, PhoneCall } from 'lucide-react';
import { usePartsRequest } from './PartsRequestListContext';

interface ProductDetailActionsProps {
  part: {
    id: string;
    part_number: string;
    name: string;
    price?: number | null;
    brand?: string | null;
    manufacturer?: string | null;
    in_stock: boolean;
  };
}

export default function ProductDetailActions({ part }: ProductDetailActionsProps) {
  const { addItem, items, setIsDrawerOpen } = usePartsRequest();
  const [quantity, setQuantity] = useState(1);
  const isAdded = items.some((i) => i.part_number === part.part_number);

  const handleAdd = () => {
    addItem({
      part_number: part.part_number,
      name: part.name,
      price_each: part.price || null,
      machine_context: part.brand || part.manufacturer || 'OEM Component',
      quantity,
    });
  };

  return (
    <div className="space-y-4 pt-4 border-t border-[#E8E8E4]">
      {/* Quantity + Add to Enquiry Basket */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex items-center border border-[#CCC] bg-white">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3.5 py-3 text-sm hover:bg-[#F5F5F2] transition-colors cursor-pointer text-[#555]"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4 py-3 font-ibm-plex-mono text-xs text-center min-w-10">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-3.5 py-3 text-sm hover:bg-[#F5F5F2] transition-colors cursor-pointer text-[#555]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md ${
            isAdded
              ? 'bg-green-700 hover:bg-green-800 text-white'
              : 'bg-alkota-orange hover:bg-[#E55D00] text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span>Added to Basket ({quantity})</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Add to Parts Enquiry</span>
            </>
          )}
        </button>
      </div>

      {/* Secondary Fast Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link
          href={`/parts-attachments/enquiry?part=${encodeURIComponent(part.part_number)}`}
          className="flex-1 text-center py-3 px-4 border border-[#222] bg-[#141414] hover:bg-white hover:text-black text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors no-underline"
        >
          Fast Quote Enquiry
        </Link>
        <a
          href="tel:+441234567890"
          className="flex items-center justify-center gap-2 py-3 px-4 border border-[#CCC] bg-white hover:border-alkota-orange text-[#555] hover:text-alkota-black font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors no-underline"
        >
          <PhoneCall className="h-3 w-3 text-alkota-orange" />
          <span>Call Desk</span>
        </a>
      </div>
    </div>
  );
}
