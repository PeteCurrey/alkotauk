'use client';

import Navigation from '@/components/Navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { createCartCheckoutSession } from '@/app/actions/stripe';

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vatAmount = subtotal * 0.20;
  const total = subtotal + vatAmount;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const result = await createCartCheckoutSession(items);
      if (result.url) window.location.href = result.url;
    } catch (err: any) {
      setError(err.message || 'Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-6xl px-6">
        <h1 className="mb-12 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          YOUR <span className="text-alkota-orange">CART.</span>
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
            <ShoppingBag className="h-24 w-24 text-alkota-iron" />
            <h2 className="text-3xl font-black uppercase italic text-alkota-steel">Your cart is empty.</h2>
            <p className="text-alkota-silver">Add some parts or accessories to get started.</p>
            <Link
              href="/shop"
              className="mt-4 inline-flex items-center gap-2 bg-alkota-orange px-8 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-alkota-orange-bright transition-colors"
            >
              Browse the Shop <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-1">
              {/* Header */}
              <div className="hidden grid-cols-5 border-b border-alkota-iron pb-4 sm:grid">
                <span className="col-span-2 text-xs font-bold uppercase tracking-widest text-alkota-steel">Product</span>
                <span className="text-xs font-bold uppercase tracking-widest text-alkota-steel text-right">Price</span>
                <span className="text-xs font-bold uppercase tracking-widest text-alkota-steel text-center">Qty</span>
                <span className="text-xs font-bold uppercase tracking-widest text-alkota-steel text-right">Total</span>
              </div>

              {items.map(item => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-4 border-b border-alkota-iron py-6 items-center"
                >
                  {/* Image + Name */}
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 border border-alkota-iron bg-alkota-steel/30">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-alkota-iron" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold uppercase leading-tight text-white">{item.name}</p>
                      {item.sku && <p className="text-xs text-alkota-steel mt-1">SKU: {item.sku}</p>}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 flex items-center gap-1 text-xs text-alkota-steel hover:text-alkota-orange transition-colors"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="text-right">
                    <span className="text-sm text-alkota-silver sm:block hidden">£{item.price.toFixed(2)}</span>
                    <span className="text-xs text-alkota-steel sm:block hidden">excl. VAT</span>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center border border-alkota-iron">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center text-alkota-steel hover:bg-alkota-iron hover:text-white transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="flex h-9 w-9 items-center justify-center text-sm font-bold text-white border-x border-alkota-iron">
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center text-alkota-steel hover:bg-alkota-iron hover:text-white transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <span className="text-lg font-black text-white">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-6">
                <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-alkota-steel hover:text-white transition-colors">
                  ← Continue Shopping
                </Link>
                <button onClick={clearCart} className="text-xs font-bold uppercase tracking-widest text-alkota-steel hover:text-alkota-orange transition-colors">
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-alkota-iron bg-alkota-steel/20 p-8 sticky top-32">
                <h2 className="mb-6 text-xl font-black uppercase italic tracking-tight">Order Summary</h2>

                <div className="space-y-4 pb-6 border-b border-alkota-iron">
                  <div className="flex justify-between text-sm">
                    <span className="text-alkota-silver">Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                    <span className="font-bold text-white">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-alkota-silver">VAT (20%)</span>
                    <span className="font-bold text-white">£{vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-alkota-silver">Shipping</span>
                    <span className="font-bold text-alkota-orange">{subtotal > 75 ? 'FREE' : 'Calculated at checkout'}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline py-6 border-b border-alkota-iron">
                  <span className="font-bold uppercase tracking-wider text-alkota-steel text-sm">Total (incl. VAT)</span>
                  <span className="text-3xl font-black text-white">£{total.toFixed(2)}</span>
                </div>

                {/* Promo Code */}
                <div className="mt-6 mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-alkota-steel" />
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="w-full bg-alkota-black border border-alkota-iron pl-10 pr-4 py-3 text-sm text-white focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                    <button className="border border-alkota-iron px-4 text-xs font-bold uppercase tracking-wider text-alkota-steel hover:border-alkota-orange hover:text-alkota-orange transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 rounded border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                    {error}
                  </div>
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

                <div className="mt-6 space-y-2">
                  <p className="flex items-center gap-2 text-xs text-alkota-steel">
                    <span className="text-alkota-orange">✓</span> Secure payment via Stripe
                  </p>
                  <p className="flex items-center gap-2 text-xs text-alkota-steel">
                    <span className="text-alkota-orange">✓</span> UK delivery on all orders
                  </p>
                  <p className="flex items-center gap-2 text-xs text-alkota-steel">
                    <span className="text-alkota-orange">✓</span> OEM-certified genuine parts
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
