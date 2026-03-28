'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { CheckCircle2, ArrowRight, Package, Wrench } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const type = searchParams.get('type');
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);

  const isShopOrder = type === 'shop';

  useEffect(() => {
    if (isShopOrder) clearCart();
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [sessionId, isShopOrder, clearCart]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-alkota-orange border-t-transparent" />
        <p className="mt-8 text-alkota-steel uppercase tracking-widest font-bold text-sm">
          {isShopOrder ? 'Confirming your order...' : 'Verifying your reservation...'}
        </p>
      </div>
    );
  }

  const headingText = isShopOrder ? 'ORDER' : 'RESERVATION';
  const bodyText = isShopOrder
    ? "Your order has been placed and payment collected. You'll receive a confirmation email shortly with your order details and estimated dispatch date."
    : 'Your deposit has been successfully processed. An Alkota specialist will contact you within 24 hours to finalise your machine configuration and delivery schedule.';
  const ctaLabel = isShopOrder ? 'Continue Shopping' : 'Back to Fleet';
  const ctaHref = isShopOrder ? '/shop' : '/machines';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-alkota-iron bg-alkota-steel/30 p-12 md:p-20 shadow-2xl"
    >
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center bg-alkota-orange/10 text-alkota-orange">
        {isShopOrder ? <Package className="h-12 w-12" /> : <Wrench className="h-12 w-12" />}
      </div>

      <div className="mb-8 flex justify-center">
        <span className="relative flex h-5 w-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alkota-orange opacity-50" />
          <CheckCircle2 className="relative h-5 w-5 text-alkota-orange" />
        </span>
      </div>

      <h1 className="mb-4 text-4xl font-black uppercase italic tracking-tighter text-white sm:text-6xl">
        {headingText} <span className="text-alkota-orange">CONFIRMED.</span>
      </h1>

      <p className="mb-8 text-xl text-alkota-silver leading-relaxed">{bodyText}</p>

      {isShopOrder && (
        <div className="mb-8 inline-flex items-center gap-2 border border-alkota-orange/30 bg-alkota-orange/10 px-4 py-3 text-sm font-bold text-alkota-orange">
          <CheckCircle2 className="h-4 w-4" />
          Free UK delivery on orders over £75
        </div>
      )}

      <div className="mb-12 border border-alkota-iron bg-alkota-black/40 px-6 py-4 text-left">
        <p className="text-[10px] text-alkota-steel uppercase font-bold tracking-widest">Stripe Session ID</p>
        <p className="font-mono text-sm text-alkota-silver mt-1 break-all">{sessionId || 'N/A'}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row justify-center">
        <Link
          href={ctaHref}
          className="flex items-center justify-center gap-2 bg-alkota-orange px-10 py-5 text-xs font-bold uppercase tracking-widest text-white hover:bg-alkota-orange-bright transition-all"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/"
          className="border border-alkota-iron px-10 py-5 text-xs font-bold uppercase tracking-widest text-white hover:bg-alkota-iron transition-all"
        >
          Return Home
        </Link>
      </div>
    </motion.div>
  );
}

export default function ClientSuccessPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24">
      <Navigation />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-alkota-orange border-t-transparent" />
          </div>
        }>
          <CheckoutContent />
        </Suspense>
      </div>
    </main>
  );
}
