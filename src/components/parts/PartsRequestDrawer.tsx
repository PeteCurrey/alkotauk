'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePartsRequest } from './PartsRequestListContext';
import {
  ShoppingCart,
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Lock,
  Layers,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createCartCheckoutSession } from '@/app/actions/stripe';

export default function PartsRequestDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearList,
    isDrawerOpen,
    setIsDrawerOpen,
    totalItemsCount,
    subtotal,
    vatAmount,
    shippingAmount,
    totalAmount,
  } = usePartsRequest();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      // Map items to CartLineItem format for Stripe
      const lineItems = items.map((item) => ({
        id: item.id || item.part_number,
        name: `${item.name}${item.pack_size ? ` (${item.pack_size})` : ''}`,
        price: Number(item.price_each) || 0,
        quantity: item.quantity,
        sku: item.part_number || item.sku || undefined,
        image: item.image || undefined,
      }));

      const result = await createCartCheckoutSession(lineItems);
      if (result?.url) {
        window.location.href = result.url;
      } else {
        throw new Error('Could not create Stripe checkout session.');
      }
    } catch (err: any) {
      console.error('Stripe checkout error:', err);
      setCheckoutError(err.message || 'Checkout failed. Please try again or request an invoice.');
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Floating Cart Badge (Visible when items > 0 and drawer is closed) */}
      {!isDrawerOpen && totalItemsCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-3 bg-alkota-orange text-white px-5 py-3.5 shadow-2xl hover:bg-white hover:text-black transition-all border border-alkota-orange/40 font-ibm-plex-mono text-xs uppercase tracking-widest cursor-pointer group"
            title="Open Cart"
            aria-label="Open Cart"
          >
            <ShoppingCart className="h-4 w-4 text-white group-hover:text-black" />
            <span>Cart</span>
            <span className="bg-black text-white px-2 py-0.5 text-[10px] font-bold group-hover:bg-alkota-orange">
              {totalItemsCount}
            </span>
            <span className="hidden sm:inline font-mono font-bold text-xs border-l border-white/30 pl-2">
              £{totalAmount.toFixed(2)}
            </span>
          </button>
        </div>
      )}

      {/* Slide-Over Drawer Backdrop */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="w-screen max-w-md bg-[#141414] border-l border-[#2A2A2A] text-white flex flex-col justify-between shadow-2xl"
              >
                {/* Header */}
                <div className="p-6 border-b border-[#222] bg-[#0E0E0E] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-alkota-orange" />
                      <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange font-bold">
                        // SHOPPING CART
                      </span>
                    </div>
                    <h3 className="text-xl uppercase font-light text-white tracking-tight mt-1">
                      Your Cart ({totalItemsCount})
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-[#666] hover:text-white p-2 transition-colors cursor-pointer"
                    aria-label="Close Cart"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Items Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#222]">
                  {items.length === 0 ? (
                    <div className="py-20 text-center space-y-3">
                      <Layers className="h-12 w-12 text-[#444] mx-auto opacity-50" />
                      <p className="text-xs uppercase font-ibm-plex-mono text-[#777] tracking-wider">
                        Your cart is currently empty.
                      </p>
                      <p className="text-[11px] text-[#555] max-w-xs mx-auto">
                        Add components, attachments, or retail chemicals to begin checkout.
                      </p>
                      <div className="pt-4">
                        <Link
                          href="/parts-attachments"
                          onClick={() => setIsDrawerOpen(false)}
                          className="inline-block bg-alkota-orange text-white px-6 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                        >
                          Shop Parts &amp; Tooling
                        </Link>
                      </div>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.part_number || item.id} className="pt-4 first:pt-0 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange font-bold block">
                              {item.part_number ? `PN: ${item.part_number}` : (item.sku || 'PRODUCT')}
                            </span>
                            <h4 className="text-sm font-normal text-white leading-snug">
                              {item.name}
                            </h4>
                            {item.pack_size && (
                              <span className="text-[10px] text-[#AAA] block font-ibm-plex-mono mt-0.5">
                                Pack Size: {item.pack_size}
                              </span>
                            )}
                            {item.machine_context && (
                              <span className="text-[10px] text-[#777] block font-ibm-plex-mono mt-0.5">
                                Brand / Application: {item.machine_context}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.part_number || item.id || '')}
                            className="text-[#555] hover:text-red-400 transition-colors p-1 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Quantity & Item Subtotal */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center border border-[#333] bg-[#0A0A0A]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.part_number || item.id || '', -1)}
                              className="px-2.5 py-1 text-[#888] hover:text-white transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1 font-ibm-plex-mono text-xs text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.part_number || item.id || '', 1)}
                              className="px-2.5 py-1 text-[#888] hover:text-white transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-ibm-plex-mono text-xs text-white block">
                              £{((Number(item.price_each) || 0) * item.quantity).toFixed(2)}
                            </span>
                            <span className="font-ibm-plex-mono text-[9px] text-[#777]">
                              Excl. VAT
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Financial Summary & Actions */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-[#222] bg-[#0E0E0E] space-y-4">
                    {/* Error Banner */}
                    {checkoutError && (
                      <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{checkoutError}</span>
                      </div>
                    )}

                    {/* Cost Breakdown */}
                    <div className="space-y-1.5 font-ibm-plex-mono text-xs border-b border-[#222] pb-3 text-[#AAA]">
                      <div className="flex justify-between">
                        <span>Subtotal (Excl. VAT):</span>
                        <span className="text-white">£{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VAT (20%):</span>
                        <span className="text-white">£{vatAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>UK Delivery:</span>
                        <span className={shippingAmount === 0 ? 'text-emerald-400' : 'text-white'}>
                          {shippingAmount === 0 ? 'FREE (Orders over £75)' : `£${shippingAmount.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#222]">
                        <span>Total Due (Incl. VAT):</span>
                        <span className="text-alkota-orange">£{totalAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Primary Stripe Checkout Button */}
                    <button
                      type="button"
                      disabled={isCheckingOut}
                      onClick={handleCheckout}
                      className="w-full flex items-center justify-center gap-2 bg-alkota-orange text-white py-3.5 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-medium shadow-xl cursor-pointer disabled:opacity-50"
                    >
                      {isCheckingOut ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Connecting to Secure Stripe Checkout...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4" />
                          <span>Proceed to Checkout</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    {/* Secondary B2B / Quote Link */}
                    <div className="flex items-center justify-between pt-1 text-[10px] font-ibm-plex-mono text-[#777]">
                      <Link
                        href="/parts/request"
                        onClick={() => setIsDrawerOpen(false)}
                        className="hover:text-white underline transition-colors"
                      >
                        Need an official PO quote instead?
                      </Link>
                      <button
                        type="button"
                        onClick={clearList}
                        className="hover:text-red-400 transition-colors cursor-pointer"
                      >
                        Clear Cart
                      </button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex items-center justify-center gap-4 pt-2 text-[9px] font-ibm-plex-mono text-[#555] border-t border-[#1C1C1C]">
                      <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#777]" /> 256-Bit SSL Encrypted
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#777]" /> Stripe Certified
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
