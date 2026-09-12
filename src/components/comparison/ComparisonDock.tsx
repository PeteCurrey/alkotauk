'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, X, ArrowRight, AlertCircle } from 'lucide-react';
import { useMachineComparison } from '@/lib/comparison/context';

export default function ComparisonDock() {
  const pathname = usePathname();
  const { selectedSlugs, removeMachine, clearComparison, notice, clearNotice } = useMachineComparison();

  // Don't show dock when already on the comparison page or when nothing is selected
  if (pathname === '/machines/compare' || selectedSlugs.length === 0) {
    return null;
  }

  const compareHref = `/machines/compare?machines=${selectedSlugs.join(',')}`;

  return (
    <aside
      aria-label="Machine comparison tray"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A1A18] text-white border-t border-white/15 shadow-2xl transition-transform duration-300 transform translate-y-0"
    >
      {notice && (
        <div className="bg-[#FF6900] text-white px-4 py-2 text-xs flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{notice}</span>
          </div>
          <button
            onClick={clearNotice}
            className="hover:opacity-80 p-1"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Indicator & Chips */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-alkota-smoke">
            <Scale className="w-4 h-4 text-[#FF6900]" />
            <span className="hidden sm:inline">Compare Machines</span>
            <span className="bg-[#FF6900] text-white px-2 py-0.5 rounded text-[10px] font-bold">
              {selectedSlugs.length} / 3
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {selectedSlugs.map(slug => {
              const modelCode = slug.replace(/^alkota-/, '').toUpperCase();
              return (
                <div
                  key={slug}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 px-3 py-1.5 rounded text-xs font-mono transition-colors"
                >
                  <span className="font-bold text-white">{modelCode}</span>
                  <button
                    onClick={() => removeMachine(slug)}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label={`Remove ${modelCode} from comparison`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={clearComparison}
            className="text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white px-3 py-2 transition-colors"
          >
            Clear
          </button>

          <Link
            href={compareHref}
            className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-orange-600 text-white font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded font-bold transition-all shadow-lg hover:shadow-orange-500/20"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
