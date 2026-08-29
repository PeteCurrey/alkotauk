import React, { Suspense } from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import UnifiedServiceRequestForm from '@/components/service/UnifiedServiceRequestForm';

export const metadata = {
  title: 'Book Service, Repair or Commissioning | Alkota UK',
  description:
    'Unified engineering service request portal. Book planned maintenance, report machine breakdowns, schedule pump overhauls, or book on-site commissioning across the UK.',
};

export default function ServiceRequestPage() {
  return (
    <main className="bg-[#FAF9F5] text-alkota-black">
      {/* ── HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/service" className="text-xs font-ibm-plex-mono text-[#888] hover:text-alkota-orange">
              Service
            </Link>
            <span className="text-xs text-[#555]">/</span>
            <span className="text-xs font-ibm-plex-mono text-alkota-orange">Book Service Request</span>
          </div>

          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333] inline-block mb-4">
            Direct Engineering Desk
          </span>

          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-6">
            Book Engineering Service
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-2xl mb-8">
            Complete the engineering triage form below for planned preventive maintenance, emergency breakdown repairs, high-pressure pump rebuilds, or site commissioning.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#777] font-ibm-plex-mono">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-alkota-orange" /> Fast Engineering Triage
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-alkota-orange" /> 100% Genuine OEM Parts
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-alkota-orange" /> Certified Field Technicians
            </span>
          </div>
        </div>
      </section>

      {/* ── UNIFIED FORM SECTION ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <Suspense fallback={<div className="p-12 text-center text-xs font-ibm-plex-mono text-[#888]">Loading Service Intake Form...</div>}>
          <UnifiedServiceRequestForm />
        </Suspense>

        {/* Emergency Assistance Strip */}
        <div className="mt-12 p-6 bg-white border border-[#E8E8E4] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs text-[#555]">
            <span className="font-medium text-alkota-black block mb-0.5">
              Need immediate verbal triage with an engineer?
            </span>
            <span>
              If you have a critical production stoppage, contact our technical desk directly during working hours.
            </span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-[#CCC] hover:border-black text-alkota-black px-6 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-alkota-orange" />
            Contact Service Desk
          </Link>
        </div>
      </section>
    </main>
  );
}
