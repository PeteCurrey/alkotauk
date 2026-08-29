'use client';

import { CleaningEquationVariable } from '@/lib/messQuestEpisodes';

interface CleaningEquationProps {
  equation: {
    pressure: CleaningEquationVariable;
    flow: CleaningEquationVariable;
    heat: CleaningEquationVariable;
    chemistry: CleaningEquationVariable;
    time: CleaningEquationVariable;
    summary: string;
  };
  className?: string;
}

const LEVEL_STYLES: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  LOW: {
    bg: 'bg-[#1C1C1A]',
    text: 'text-[#888]',
    border: 'border-[#333]',
    bar: 'bg-[#555] w-1/4',
  },
  MEDIUM: {
    bg: 'bg-[#222]',
    text: 'text-[#CCC]',
    border: 'border-[#444]',
    bar: 'bg-[#888] w-2/4',
  },
  HIGH: {
    bg: 'bg-alkota-orange/10',
    text: 'text-alkota-orange',
    border: 'border-alkota-orange/30',
    bar: 'bg-alkota-orange w-3/4',
  },
  MAX: {
    bg: 'bg-alkota-orange/20',
    text: 'text-alkota-orange',
    border: 'border-alkota-orange',
    bar: 'bg-alkota-orange w-full',
  },
};

export default function CleaningEquation({ equation, className = '' }: CleaningEquationProps) {
  const variables = [
    { key: 'PRESSURE', data: equation.pressure, description: 'Kinetic blast impact at substrate surface' },
    { key: 'FLOW', data: equation.flow, description: 'Volumetric flushing & material displacement' },
    { key: 'HEAT', data: equation.heat, description: 'Thermal breakdown & grease liquefaction' },
    { key: 'CHEMISTRY', data: equation.chemistry, description: 'Surfactant bond cleavage & saponification' },
    { key: 'TIME', data: equation.time, description: 'Chemical dwell & thermal soak duration' },
  ];

  return (
    <div className={`border border-[#E0E0DC] bg-white p-6 sm:p-10 font-normal ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E0E0DC] mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-alkota-orange block mb-2 font-light">
            Thermodynamic & Mechanical Balance // Educational Model
          </span>
          <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-alkota-black leading-none">
            The Alkota Cleaning Equation.
          </h3>
        </div>
        <div className="font-mono text-[11px] text-[#777] uppercase tracking-wider">
          Formula: <span className="text-alkota-black font-medium">RESULT = P + F + H + C + T</span>
        </div>
      </div>

      {/* 5-Column Variable Instrument Meter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {variables.map((item, idx) => {
          const style = LEVEL_STYLES[item.data.level] || LEVEL_STYLES.MEDIUM;
          const isElevated = item.data.level === 'HIGH' || item.data.level === 'MAX';

          return (
            <div
              key={item.key}
              className={`p-5 border flex flex-col justify-between transition-all ${
                isElevated
                  ? 'border-alkota-orange/40 bg-[#FAF9F5]'
                  : 'border-[#E8E8E4] bg-[#FCFCFA]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#888]">
                    0{idx + 1} · {item.key}
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 border ${style.bg} ${style.text} ${style.border}`}
                  >
                    {item.data.level}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="font-extralight text-xl sm:text-2xl text-alkota-black leading-tight">
                    {item.data.label}
                  </p>
                  <p className="text-[11px] text-alkota-orange font-normal mt-1 leading-snug">
                    {item.data.role}
                  </p>
                </div>
              </div>

              <div>
                {/* Visual Meter Bar */}
                <div className="h-1.5 w-full bg-[#E5E5E0] overflow-hidden mb-3">
                  <div className={`h-full ${style.bar} transition-all duration-500`} />
                </div>

                <p className="text-[11px] text-[#777] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Note */}
      <div className="bg-[#F8F7F4] border-l-2 border-alkota-orange p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-alkota-orange block mb-1">
            Application Weighting Analysis
          </span>
          <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
            {equation.summary}
          </p>
        </div>
        <span className="text-[10px] text-[#999] uppercase tracking-widest font-mono shrink-0">
          Alkota Applied Physics
        </span>
      </div>
    </div>
  );
}
