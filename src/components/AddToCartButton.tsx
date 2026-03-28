'use client';

import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  sku?: string;
  variant?: 'primary' | 'secondary';
}

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  sku,
  variant = 'primary',
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, name, price, image, sku });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const base = 'flex w-full items-center justify-center gap-2 py-4 text-sm font-black uppercase tracking-widest transition-all duration-200';
  const styles = {
    primary: `${base} bg-alkota-orange text-white hover:bg-alkota-orange-bright shadow-lg shadow-alkota-orange/20`,
    secondary: `${base} border border-alkota-iron bg-alkota-steel/50 text-white hover:bg-alkota-iron`,
  };

  return (
    <button
      onClick={handleAdd}
      className={added ? `${styles[variant]} opacity-90` : styles[variant]}
      aria-label={`Add ${name} to cart`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Add to Cart — £{price.toFixed(2)}
        </>
      )}
    </button>
  );
}
