'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartIndicator() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative flex items-center gap-2 rounded-[4px] bg-alkota-steel/50 p-3 text-white transition-all hover:bg-alkota-orange hover:text-white group shadow-button hover:shadow-button-hover btn-tactile"
      aria-label={`View Cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-[3px] bg-alkota-orange text-[10px] font-bold text-white shadow-lg ring-2 ring-alkota-black transition-transform group-hover:scale-110">
          {itemCount}
        </span>
      )}
    </button>
  );
}
