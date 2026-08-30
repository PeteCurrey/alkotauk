'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Check, ShoppingBag, ArrowRight, PhoneCall, FileText } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { usePartsRequest } from './PartsRequestListContext';

interface ProductDetailActionsProps {
  part: {
    id: string;
    part_number: string;
    sku?: string | null;
    mpn?: string | null;
    name: string;
    price?: number | null;
    brand?: string | null;
    manufacturer?: string | null;
    image_url?: string | null;
    in_stock: boolean;
  };
}

export default function ProductDetailActions({ part }: ProductDetailActionsProps) {
  const { addItem: addCartItem, items: cartItems, openCart } = useCart();
  const { addItem: addEnquiryItem, items: enquiryItems } = usePartsRequest();
  
  const [quantity, setQuantity] = useState(1);
  const [cartAdded, setCartAdded] = useState(false);
  const [enquiryAdded, setEnquiryAdded] = useState(false);

  const hasPrice = typeof part.price === 'number' && part.price > 0;

  const handleAddToCart = () => {
    if (!hasPrice) return;
    // Add once — CartContext auto-increments quantity on subsequent calls with same id
    for (let i = 0; i < quantity; i++) {
      addCartItem({
        id: part.id,
        name: `${part.name} (${part.part_number})`,
        price: part.price as number,
        image: part.image_url || undefined,
        sku: part.sku || part.part_number,
      });
    }
    setCartAdded(true);
    openCart();
    setTimeout(() => setCartAdded(false), 3000);
  };

  const handleAddToEnquiry = () => {
    addEnquiryItem({
      part_number: part.part_number,
      name: part.name,
      price_each: part.price || null,
      machine_context: part.brand || part.manufacturer || 'OEM Component',
      quantity,
    });
    setEnquiryAdded(true);
    setTimeout(() => setEnquiryAdded(false), 3000);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-[#E8E8E4]">
      {/* Quantity Selector + Main Action */}
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

        {hasPrice ? (
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md ${
              cartAdded
                ? 'bg-green-700 hover:bg-green-800 text-white'
                : 'bg-alkota-orange hover:bg-[#E55D00] text-white'
            }`}
          >
            {cartAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added to Basket ({quantity})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Basket · £{((part.price as number) * quantity).toFixed(2)}</span>
              </>
            )}
          </button>
        ) : (
          <Link
            href={`/parts-attachments/enquiry?part=${encodeURIComponent(part.part_number)}`}
            className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest bg-alkota-orange hover:bg-[#E55D00] text-white transition-all text-center"
          >
            <FileText className="h-4 w-4" />
            <span>Request Price on Application</span>
          </Link>
        )}
      </div>

      {/* Secondary Actions: Trade Enquiry & Phone */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="button"
          onClick={handleAddToEnquiry}
          className="flex-1 py-3 px-4 border border-[#333] bg-[#141414] hover:bg-white hover:text-black text-white font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors text-center"
        >
          {enquiryAdded ? '✓ Added to Quote Desk' : '+ Add to Trade Quote'}
        </button>

        <a
          href="tel:+441234567890"
          className="flex items-center justify-center gap-2 py-3 px-4 border border-[#CCC] bg-white hover:border-alkota-orange text-[#555] hover:text-alkota-black font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors"
        >
          <PhoneCall className="h-3.5 w-3.5 text-alkota-orange" />
          <span>Call Parts Desk</span>
        </a>
      </div>
    </div>
  );
}
