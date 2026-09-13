import React from 'react';
import Link from 'next/link';
import { Sparkles, Layers, SlidersHorizontal, ArrowLeft, Wrench, ShieldCheck } from 'lucide-react';
import { EnquirySource } from '@/lib/enquiries/schema';

interface ContextBannerProps {
  source: EnquirySource;
  machineCount: number;
  primaryModel?: string;
  selectorParams?: string;
  comparisonParams?: string;
}

export default function ContextBanner({
  source,
  machineCount,
  primaryModel,
  selectorParams,
  comparisonParams,
}: ContextBannerProps) {
  switch (source) {
    case 'MACHINE_DETAIL':
      return (
        <div className="bg-neutral-50 border border-neutral-200 p-4 md:p-6 mb-8 rounded-[2px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-neutral-900 text-alkota-orange rounded-[2px]">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
                  Authoritative Equipment Specification Request
                </span>
                <p className="text-neutral-900 font-sans text-sm md:text-base font-semibold">
                  You are enquiring about Alkota model <span className="text-alkota-orange font-mono">{primaryModel || 'Machinery'}</span>
                </p>
              </div>
            </div>
            <Link
              href="/machines"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-alkota-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse all models</span>
            </Link>
          </div>
        </div>
      );

    case 'MACHINE_SELECTOR':
      return (
        <div className="bg-neutral-50 border border-neutral-200 p-4 md:p-6 mb-8 rounded-[2px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-neutral-900 text-alkota-orange rounded-[2px]">
                <SlidersHorizontal className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
                  Deterministic Selector Consultation
                </span>
                <p className="text-neutral-900 font-sans text-sm md:text-base font-semibold">
                  Based on your operational requirements, we’ve prepared your shortlisted configuration ({machineCount} {machineCount === 1 ? 'model' : 'models'}).
                </p>
              </div>
            </div>
            <Link
              href={`/machines/help-me-choose${selectorParams ? `?${selectorParams}` : ''}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-alkota-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Adjust requirements</span>
            </Link>
          </div>
        </div>
      );

    case 'MACHINE_COMPARISON':
      return (
        <div className="bg-neutral-50 border border-neutral-200 p-4 md:p-6 mb-8 rounded-[2px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-neutral-900 text-alkota-orange rounded-[2px]">
                <Layers className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
                  Fleet Comparison Matrix Consultation
                </span>
                <p className="text-neutral-900 font-sans text-sm md:text-base font-semibold">
                  Comparing {machineCount} models — our application engineers will review side-by-side suitability.
                </p>
              </div>
            </div>
            <Link
              href={`/machines/compare${comparisonParams ? `?${comparisonParams}` : ''}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-alkota-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit comparison queue</span>
            </Link>
          </div>
        </div>
      );

    case 'PARTS':
    case 'ATTACHMENTS':
    case 'CHEMICALS':
      return (
        <div className="bg-neutral-50 border border-neutral-200 p-4 md:p-6 mb-8 rounded-[2px]">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-neutral-900 text-alkota-orange rounded-[2px]">
              <Wrench className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
                Product & Consumables Enquiry
              </span>
              <p className="text-neutral-900 font-sans text-sm md:text-base font-semibold">
                Direct UK distributor parts, attachments, and industrial chemical support.
              </p>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-neutral-50 border border-neutral-200 p-4 md:p-6 mb-8 rounded-[2px]">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-neutral-900 text-alkota-orange rounded-[2px]">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
                Direct Factory Consultation
              </span>
              <p className="text-neutral-900 font-sans text-sm md:text-base font-semibold">
                Connect directly with Alkota UK application engineers for bespoke requirements.
              </p>
            </div>
          </div>
        </div>
      );
  }
}
