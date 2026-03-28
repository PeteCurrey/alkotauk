'use client';

import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { createCartCheckoutSession } from '@/app/actions/stripe';

export default function CartDrawer() {
  const { items, itemCount, subtotal, isOpen, closeCart, removeItem, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const result = await createCartCheckoutSession(items);
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err: any) {
      setError(err.message || 'Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-alkota-black/80 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-alkota-black border-l border-alkota-iron shadow-2xl"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-alkota-iron px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-alkota-orange" />
            <span className="text-sm font-black uppercase tracking-widest text-white">
              Cart ({itemCount})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center border border-alkota-iron text-alkota-steel transition-colors hover:border-alkota-orange hover:text-alkota-orange"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Item list */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="h-16 w-16 text-alkota-iron" />
              <p className="text-lg font-bold uppercase italic text-alkota-steel">Your cart is empty.</p>
              <button
                onClick={closeCart}
                className="text-xs font-bold uppercase tracking-widest text-alkota-orange hover:underline"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map(item => (
                <li key={item.id} className="flex gap-4 border-b border-alkota-iron pb-6 last:border-0">
                  {/* Image */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-alkota-iron bg-alkota-steel/30">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-alkota-iron" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold uppercase tracking-tight text-white leading-tight">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-alkota-steel transition-colors hover:text-alkota-orange"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center border border-alkota-iron">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-alkota-steel transition-colors hover:bg-alkota-iron hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="flex h-8 w-8 items-center justify-center text-sm font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-alkota-steel transition-colors hover:bg-alkota-iron hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-sm font-black text-white">
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-alkota-iron px-6 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-widest text-alkota-steel">Subtotal (excl. VAT)</span>
              <span className="text-2xl font-black text-white">£{subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-alkota-steel">VAT calculated at checkout. Free UK delivery on orders over £75.</p>

            {error && (
              <p className="rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400">{error}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 bg-alkota-orange py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-alkota-orange-bright disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Redirecting to Stripe...
                </>
              ) : (
                <>
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full border border-alkota-iron py-3 text-center text-xs font-bold uppercase tracking-widest text-alkota-steel transition-all hover:border-alkota-steel hover:text-white"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
