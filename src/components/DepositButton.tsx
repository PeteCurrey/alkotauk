'use client';

import { useState } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';
import { ShieldCheck, Loader2 } from 'lucide-react';

interface DepositButtonProps {
  machineId: string;
  machineName: string;
  depositAmount: number;
}

export default function DepositButton({ machineId, machineName, depositAmount }: DepositButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    setLoading(true);
    try {
      const { url } = await createCheckoutSession(machineId, depositAmount, machineName);
      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message || 'Payment initialization failed. Ensure Stripe keys are set in the admin panel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDeposit}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-sm border border-alkota-gold/50 bg-alkota-gold/10 px-10 py-5 text-sm font-bold uppercase tracking-widest text-alkota-gold hover:bg-alkota-gold hover:text-black transition-all disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
      Reserve with £{depositAmount} Deposit
    </button>
  );
}
