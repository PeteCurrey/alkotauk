'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  X,
  Flame,
  Droplets,
  Layers,
  Truck,
  RotateCcw,
  ArrowRight,
  Info,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MachineIdentifierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MACHINE_CATEGORIES = [
  {
    id: 'hot-water',
    name: 'Hot Water Pressure Washers',
    icon: Flame,
    models: [
      { code: '430XH', name: 'Alkota 430XH (4000 Series)', slug: 'alkota-430xh', desc: '3000 PSI @ 15 LPM Heavy-Duty Oil-Fired' },
      { code: '4358', name: 'Alkota 4358 (4000 Series)', slug: 'alkota-4358', desc: '3500 PSI @ 18 LPM High-Flow Oil-Fired' },
      { code: '216X4', name: 'Alkota 216X4 (200 Series)', slug: 'alkota-216x4', desc: 'Compact Mobile Hot Water Unit' },
      { code: '31105', name: 'Alkota 31105 (300 Series)', slug: 'alkota-31105', desc: 'Electric Stationary Wash Bay Skid' },
    ]
  },
  {
    id: 'cold-water',
    name: 'Cold Water Industrial Washers',
    icon: Droplets,
    models: [
      { code: '5305A', name: 'Alkota 5305A Cold Water', slug: 'alkota-5305a', desc: 'Heavy-Duty Industrial Electric Cold Washer' },
      { code: 'CW-3000', name: 'Alkota CW-3000 Portable', slug: 'alkota-cw3000', desc: 'Petrol-Driven Site Cold Pressure Washer' },
    ]
  },
  {
    id: 'steam',
    name: 'Steam Generators & Cleaners',
    icon: Layers,
    models: [
      { code: '4202-20A', name: 'Alkota 4202-20A Steam Generator', slug: 'alkota-4202-20a', desc: 'High-Temperature Dry / Wet Steam Cleaner' },
    ]
  },
  {
    id: 'parts-washers',
    name: 'Automatic Parts Washers',
    icon: RotateCcw,
    models: [
      { code: 'APW-360', name: 'Alkota APW-360 Rotary Cabinet', slug: 'alkota-apw-360', desc: 'Aqueous Enclosed Rotary Turntable Washer' },
    ]
  },
  {
    id: 'trailers',
    name: 'Mobile High-Pressure Trailer Rigs',
    icon: Truck,
    models: [
      { code: 'TRAILER-STD', name: 'Standard Single-Axle Trailer Rig', slug: 'standard-trailer-single-axle', desc: 'Highway Certified Mobile Wash System' },
    ]
  }
];

export default function MachineIdentifierModal({
  isOpen,
  onClose,
}: MachineIdentifierModalProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>('hot-water');
  const [showSerialGuide, setShowSerialGuide] = useState<boolean>(false);

  const selectedCategory = MACHINE_CATEGORIES.find((c) => c.id === selectedCatId) || MACHINE_CATEGORIES[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white border border-[#DDD] w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col text-alkota-black"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EBEBE8] bg-[#F8F7F4] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange font-bold">
                // MACHINE IDENTIFICATION ASSISTANT
              </span>
            </div>
            <h3 className="text-2xl uppercase font-light text-alkota-black tracking-tight mt-1">
              Select Your Alkota Machine Model
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#777] hover:text-black transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#EBEBE8] min-h-[380px]">
          {/* Left Category List (5 cols) */}
          <div className="md:col-span-5 p-4 space-y-1.5 bg-[#FAFAF8]">
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-wider text-[#888] px-2 block mb-2">
              Equipment Category:
            </span>

            {MACHINE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = cat.id === selectedCatId;

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`p-3.5 cursor-pointer border transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white border-alkota-orange shadow-xs text-alkota-black font-medium'
                      : 'bg-transparent border-transparent hover:bg-white hover:border-[#DDD] text-[#666]'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-alkota-orange' : 'text-[#888]'}`} />
                  <span className="text-xs uppercase tracking-tight leading-tight">
                    {cat.name}
                  </span>
                </div>
              );
            })}

            <div className="pt-4 px-2">
              <button
                type="button"
                onClick={() => setShowSerialGuide(!showSerialGuide)}
                className="inline-flex items-center gap-1.5 text-[11px] font-ibm-plex-mono uppercase text-alkota-orange hover:text-black transition-colors cursor-pointer"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Where is my serial plate?</span>
              </button>
            </div>
          </div>

          {/* Right Models List (7 cols) */}
          <div className="md:col-span-7 p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EBEBE8] mb-4">
                <span className="font-ibm-plex-mono text-xs uppercase text-alkota-orange font-bold">
                  {selectedCategory.name} Models
                </span>
                <span className="text-[10px] font-ibm-plex-mono text-[#777]">
                  {selectedCategory.models.length} Verified Series
                </span>
              </div>

              <div className="space-y-2.5">
                {selectedCategory.models.map((m) => (
                  <Link
                    key={m.code}
                    href={`/parts/machine/${m.slug}`}
                    onClick={onClose}
                    className="p-4 bg-[#F8F7F4] hover:bg-orange-50/50 border border-[#E8E8E4] hover:border-alkota-orange transition-all flex items-center justify-between group no-underline block"
                  >
                    <div>
                      <span className="font-ibm-plex-mono text-xs font-bold text-alkota-black group-hover:text-alkota-orange transition-colors block">
                        {m.name}
                      </span>
                      <span className="text-[11px] text-[#777] font-normal leading-tight mt-0.5 block">
                        {m.desc}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#AAA] group-hover:text-alkota-orange transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {showSerialGuide && (
              <div className="p-4 bg-zinc-50 border border-zinc-200 text-xs space-y-1 mt-4">
                <span className="font-ibm-plex-mono font-bold uppercase text-zinc-900 block">
                  Serial Plate Location Guide
                </span>
                <p className="text-zinc-600 font-normal">
                  On oil-fired hot water units, the stamped aluminium serial tag is riveted to the main lower chassis frame rail near the pump motor base, or on the rear burner inspection cowl.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
