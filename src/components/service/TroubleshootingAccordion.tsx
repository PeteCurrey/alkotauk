'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
import { TROUBLESHOOTING_GUIDE } from '@/lib/service/seed-data';

export default function TroubleshootingAccordion() {
  const [openId, setOpenId] = useState<string>('low-pressure');

  const toggle = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <div className="space-y-3">
      {TROUBLESHOOTING_GUIDE.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-[#E8E8E4] bg-white transition-all overflow-hidden rounded-[6px] shadow-tactile-sm"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#FAF9F5] transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
                    {item.category} issue
                  </span>
                </div>
                <h4 className="font-light text-lg md:text-xl text-alkota-black tracking-tight">
                  {item.title}
                </h4>
              </div>
              <div
                className={`w-8 h-8 rounded-full border border-[#DDD] flex items-center justify-center shrink-0 transition-transform ${
                  isOpen ? 'rotate-180 bg-alkota-black text-white border-alkota-black' : 'text-[#888]'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-2 border-t border-[#E8E8E4] bg-[#FDFDFC]">
                <p className="text-sm text-[#555] font-normal mb-6 leading-relaxed">
                  {item.summary}
                </p>

                {/* Safe Checks */}
                <div className="mb-6 bg-white border border-[#E8E8E4] p-5 rounded-[5px]">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h5 className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-black font-semibold">
                      Safe Preliminary Checks (Operator Level)
                    </h5>
                  </div>
                  <ul className="space-y-2 text-xs text-[#555]">
                    {item.safeChecks.map((check, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unsafe Warning Box */}
                <div className="mb-6 bg-amber-50/60 border border-amber-300/80 p-5 text-xs text-amber-950 rounded-[5px]">
                  <div className="flex items-center gap-2 mb-2 text-amber-800">
                    <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest font-bold">
                      Safety Warning — Do Not Attempt Internal Disassembly
                    </span>
                  </div>
                  <p className="leading-relaxed text-amber-900 font-normal">
                    {item.unsafeWarning}
                  </p>
                </div>

                {/* Action CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#777]">
                    Still experiencing this issue?
                  </span>
                  <Link
                    href={`/service/request?type=${item.recommendedServiceType}&symptom=${item.id}`}
                    className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-5 py-2.5 font-ibm-plex-mono text-[11px] uppercase tracking-widest transition-colors rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
                  >
                    Book Diagnostic Service
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
