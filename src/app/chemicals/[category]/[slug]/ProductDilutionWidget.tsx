'use client';

import { useState } from 'react';
import { calculateChemicalDosing, COMMON_TANK_PRESETS } from '@/lib/chemicals/dilution-calculator';
import { Droplets, Info } from 'lucide-react';

interface ProductDilutionWidgetProps {
  productName: string;
  dilutionHot?: string;
  dilutionCold?: string;
}

export default function ProductDilutionWidget({
  productName,
  dilutionHot = '1:60',
  dilutionCold = '1:30',
}: ProductDilutionWidgetProps) {
  const [totalLitres, setTotalLitres] = useState<number>(25);
  const [ratioMode, setRatioMode] = useState<'hot' | 'cold' | 'custom'>('hot');
  const [customRatio, setCustomRatio] = useState<number>(50);

  // Extract base ratio number from strings like "1:50 to 1:120"
  const getRatioNum = (): number => {
    if (ratioMode === 'hot') {
      const match = dilutionHot.match(/1:(\d+)/);
      return match ? parseInt(match[1], 10) : 60;
    }
    if (ratioMode === 'cold') {
      const match = dilutionCold.match(/1:(\d+)/);
      return match ? parseInt(match[1], 10) : 30;
    }
    return customRatio;
  };

  const currentRatio = getRatioNum();
  const result = calculateChemicalDosing(totalLitres, currentRatio);

  return (
    <div className="bg-[#141414] border border-[#262626] p-5 sm:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#222]">
        <div>
          <h4 className="text-sm uppercase tracking-wider text-white font-normal">
            Solution Batch Calculator — {productName}
          </h4>
          <span className="text-[10px] text-[#777] font-normal block mt-0.5">
            1:{currentRatio} ratio (1 part chemical : {currentRatio} parts water)
          </span>
        </div>

        {/* Ratio Selector Buttons */}
        <div className="flex items-center gap-1 bg-[#1C1C1C] p-1 border border-[#333]">
          <button
            type="button"
            onClick={() => setRatioMode('hot')}
            className={`px-3 py-1 text-[10px] font-ibm-plex-mono uppercase transition-colors ${
              ratioMode === 'hot'
                ? 'bg-alkota-orange text-white'
                : 'text-[#888] hover:text-white'
            }`}
          >
            Hot Water ({dilutionHot.split(' ')[0] || '1:60'})
          </button>
          <button
            type="button"
            onClick={() => setRatioMode('cold')}
            className={`px-3 py-1 text-[10px] font-ibm-plex-mono uppercase transition-colors ${
              ratioMode === 'cold'
                ? 'bg-alkota-orange text-white'
                : 'text-[#888] hover:text-white'
            }`}
          >
            Cold Water ({dilutionCold.split(' ')[0] || '1:30'})
          </button>
        </div>
      </div>

      {/* Tank Volume Selector */}
      <div className="space-y-2">
        <label className="block text-[10px] font-ibm-plex-mono uppercase tracking-widest text-[#888]">
          Target Final Solution Volume:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_TANK_PRESETS.slice(1, 6).map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setTotalLitres(preset.value)}
              className={`px-3 py-1.5 text-xs font-ibm-plex-mono transition-colors border ${
                totalLitres === preset.value
                  ? 'bg-[#262626] border-alkota-orange text-white'
                  : 'bg-[#181818] border-[#333] text-[#888] hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Volumes Display */}
      <div className="grid grid-cols-2 gap-3 p-4 bg-black/60 border border-[#222]">
        <div className="space-y-1">
          <span className="block text-[9px] font-ibm-plex-mono uppercase text-[#777]">
            Chemical Required
          </span>
          <span className="text-xl sm:text-2xl font-ibm-plex-mono text-alkota-orange font-bold">
            {result.chemicalVolumeLiters.toFixed(2)} L
          </span>
          <span className="block text-[9px] font-ibm-plex-mono text-[#555]">
            ({result.chemicalVolumeMl} ml)
          </span>
        </div>
        <div className="space-y-1">
          <span className="block text-[9px] font-ibm-plex-mono uppercase text-[#777]">
            Water to Add
          </span>
          <span className="text-xl sm:text-2xl font-ibm-plex-mono text-white font-bold">
            {result.waterVolumeLiters.toFixed(2)} L
          </span>
          <span className="block text-[9px] font-ibm-plex-mono text-[#555]">
            (Total {result.totalVolumeLiters} L batch)
          </span>
        </div>
      </div>

      {/* Mandatory Regulatory Disclaimer */}
      <div className="flex items-start gap-2 pt-1 text-[10px] text-[#666] leading-relaxed">
        <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-alkota-orange/60" />
        <span>
          Always follow the current product label and site-specific COSHH documentation. The calculator is a convenience estimate based on published application rates.
        </span>
      </div>
    </div>
  );
}
