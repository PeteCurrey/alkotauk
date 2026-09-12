'use client';

import { useState } from 'react';
import { ArrowRight, FileText, Phone, Scale, Check } from 'lucide-react';
import Link from 'next/link';
import RequestPricingModal from './RequestPricingModal';
import { useMachineComparison } from '@/lib/comparison/context';

interface MachineDetailPricingCtaProps {
  machine: {
    id?: string;
    name: string;
    slug: string;
    category: string;
    series?: string;
    model_code?: string;
    pressure_bar?: number | string;
    flow_rate_lpm?: number | string;
  };
}

export default function MachineDetailPricingCta({ machine }: MachineDetailPricingCtaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isComparing, toggleMachine } = useMachineComparison();
  const comparing = isComparing(machine.slug);

  return (
    <>
      <RequestPricingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={machine}
      />

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex-1 flex items-center justify-center gap-3 bg-alkota-orange p-5 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-orange-600 transition-all cursor-pointer rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
          >
            <span>Request Pricing</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link 
            href={`/contact?enquiry=consultation&product=${machine.slug}&machines=${machine.slug}&model=${machine.model_code || machine.name}`}
            className="flex-1 flex items-center justify-center gap-3 bg-alkota-black p-5 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-neutral-800 transition-all rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
          >
            Technical Consultation
          </Link>
        </div>

        <button
          type="button"
          onClick={() => toggleMachine(machine.slug)}
          className={`w-full flex items-center justify-center gap-2 p-3 text-xs font-mono uppercase tracking-[0.2em] border transition-all cursor-pointer rounded-[4px] ${
            comparing
              ? 'bg-[#FF6900]/10 border-[#FF6900] text-[#FF6900] font-bold'
              : 'bg-white hover:bg-neutral-50 border-alkota-iron text-alkota-black'
          }`}
        >
          {comparing ? <Check className="w-3.5 h-3.5 text-[#FF6900]" /> : <Scale className="w-3.5 h-3.5 text-alkota-orange" />}
          <span>{comparing ? 'In Comparison Queue · Click to Remove' : 'Add to Comparison'}</span>
        </button>
      </div>
    </>
  );
}
