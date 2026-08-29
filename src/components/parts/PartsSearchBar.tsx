'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Wrench, ArrowRight, CheckCircle2, AlertTriangle, Layers, X } from 'lucide-react';
import { VERIFIED_PARTS, SUPERSEDED_PARTS_MAP } from '@/lib/parts/seed-data';
import { Part } from '@/lib/types/parts';
import Link from 'next/link';

interface PartsSearchBarProps {
  onSelectMachineModalOpen?: () => void;
  className?: string;
}

export default function PartsSearchBar({
  onSelectMachineModalOpen,
  className = '',
}: PartsSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<{
    parts: Part[];
    superseded?: { oldNumber: string; currentNumber: string; name: string; notes: string };
    machineMatch?: string;
  }>({ parts: [] });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query.trim().toUpperCase();
    if (q.length < 2) {
      setResults({ parts: [] });
      setIsOpen(false);
      return;
    }

    // Check superseded map
    const supersededData = SUPERSEDED_PARTS_MAP[q];
    const superseded = supersededData
      ? { oldNumber: q, currentNumber: supersededData.currentPartNumber, name: supersededData.name, notes: supersededData.notes }
      : undefined;

    // Filter parts
    const matchedParts = VERIFIED_PARTS.filter(
      (p) =>
        p.part_number.toUpperCase().includes(q) ||
        p.name.toUpperCase().includes(q) ||
        (p.description && p.description.toUpperCase().includes(q))
    ).slice(0, 5);

    // Check machine model match
    let machineMatch: string | undefined = undefined;
    if (q.includes('430') || q.includes('4000') || q.includes('4358')) {
      machineMatch = 'Alkota 4000 Series / 430XH Hot Water Pressure Washer';
    } else if (q.includes('216') || q.includes('200')) {
      machineMatch = 'Alkota 200 Series Mobile Compact Unit';
    } else if (q.includes('311') || q.includes('300')) {
      machineMatch = 'Alkota 300 Series Heavy Industrial Washer';
    }

    setResults({ parts: matchedParts, superseded, machineMatch });
    setIsOpen(true);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full max-w-3xl mx-auto ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center bg-white border-2 border-alkota-black focus-within:border-alkota-orange shadow-lg transition-all">
        <div className="pl-4 pr-2 text-alkota-orange">
          <Search className="h-5 w-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Enter Model (e.g. 430X4), Part Number (e.g. 20-001), or Keyword (e.g. Unloader)..."
          className="w-full py-4 pr-10 text-sm font-normal text-alkota-black placeholder:text-[#888] focus:outline-none bg-transparent"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-2 text-[#888] hover:text-black transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Live Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DDD] shadow-2xl z-50 overflow-hidden divide-y divide-[#EBEBE8]">
          {/* Superseded Part Alert */}
          {results.superseded && (
            <div className="p-4 bg-amber-50 border-b border-amber-200 text-xs">
              <div className="flex items-center gap-2 text-amber-800 font-ibm-plex-mono font-bold uppercase mb-1">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>Legacy Part Number Detected ({results.superseded.oldNumber})</span>
              </div>
              <p className="text-amber-900 font-normal">
                {results.superseded.notes} Current replacement: <strong>{results.superseded.currentNumber}</strong> ({results.superseded.name}).
              </p>
            </div>
          )}

          {/* Machine Match Shortcut */}
          {results.machineMatch && (
            <div className="p-4 bg-[#F8F7F4] flex items-center justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] uppercase text-alkota-orange font-bold block">
                  Machine Model Identified
                </span>
                <span className="text-xs font-normal text-alkota-black">
                  {results.machineMatch}
                </span>
              </div>
              <Link
                href="/parts/machine/alkota-430xh"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 font-ibm-plex-mono text-[10px] uppercase text-white bg-alkota-black hover:bg-alkota-orange px-3 py-1.5 transition-colors"
              >
                <span>View Assemblies</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}

          {/* Parts List */}
          {results.parts.length > 0 ? (
            <div className="divide-y divide-[#EBEBE8] max-h-80 overflow-y-auto">
              {results.parts.map((part) => (
                <Link
                  key={part.id}
                  href={`/parts/${part.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="p-4 hover:bg-[#F9F9F7] transition-colors flex items-center justify-between group no-underline block"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-ibm-plex-mono text-[11px] font-bold text-alkota-orange">
                        PN: {part.part_number}
                      </span>
                      <span className="font-ibm-plex-mono text-[9px] uppercase px-1.5 py-0.5 bg-[#EEE] text-[#555]">
                        {part.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-normal text-alkota-black group-hover:text-alkota-orange transition-colors mt-0.5">
                      {part.name}
                    </h4>
                  </div>

                  <div className="text-right shrink-0">
                    {part.price && (
                      <span className="font-ibm-plex-mono text-xs font-bold text-alkota-black block">
                        £{part.price.toFixed(2)}
                      </span>
                    )}
                    <span className="font-ibm-plex-mono text-[9px] uppercase text-emerald-600">
                      OEM In Stock
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            !results.superseded && !results.machineMatch && (
              <div className="p-6 text-center space-y-2">
                <p className="text-xs text-[#777] font-ibm-plex-mono uppercase">
                  No direct part number match found for &quot;{query}&quot;.
                </p>
                {onSelectMachineModalOpen && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onSelectMachineModalOpen();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-alkota-orange hover:text-black font-ibm-plex-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Identify via Machine Family instead</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
