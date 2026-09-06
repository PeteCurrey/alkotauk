'use client';

import { useState } from 'react';
import { ArrowRight, FileText, Phone } from 'lucide-react';
import Link from 'next/link';
import RequestPricingModal from './RequestPricingModal';

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

  return (
    <>
      <RequestPricingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={machine}
      />

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
          href={`/contact?enquiry=consultation&product=${machine.slug}&model=${machine.model_code || machine.name}`}
          className="flex-1 flex items-center justify-center gap-3 bg-alkota-black p-5 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-neutral-800 transition-all rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
        >
          Technical Consultation
        </Link>
      </div>
    </>
  );
}
