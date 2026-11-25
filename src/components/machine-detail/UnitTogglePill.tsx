'use client';

import { useUnitPreference } from '@/context/UnitPreferenceContext';

interface UnitTogglePillProps {
  dark?: boolean;
  compact?: boolean;
}

export default function UnitTogglePill({ dark = false, compact = false }: UnitTogglePillProps) {
  const { unit, setUnit } = useUnitPreference();

  const containerClass = dark
    ? 'bg-white/10 border-white/15'
    : 'bg-[#EFEFEA] border-[#D8D7D0]';

  const activeClass = 'bg-alkota-orange text-white';
  const inactiveClass = dark
    ? 'text-white/60 hover:text-white'
    : 'text-[#666] hover:text-alkota-black';

  return (
    <div
      role="group"
      aria-label="Specification unit system"
      className={`inline-flex items-center rounded-[4px] border p-0.5 font-mono text-[10px] uppercase tracking-wider ${containerClass}`}
    >
      <button
        type="button"
        onClick={() => setUnit('metric')}
        aria-pressed={unit === 'metric'}
        className={`rounded-[3px] px-2.5 py-1 transition-colors cursor-pointer ${
          unit === 'metric' ? activeClass : inactiveClass
        }`}
      >
        {compact ? 'BAR · L/M' : 'Metric (BAR · L/min)'}
      </button>
      <button
        type="button"
        onClick={() => setUnit('imperial')}
        aria-pressed={unit === 'imperial'}
        className={`rounded-[3px] px-2.5 py-1 transition-colors cursor-pointer ${
          unit === 'imperial' ? activeClass : inactiveClass
        }`}
      >
        {compact ? 'PSI · GPM' : 'Imperial (PSI · GPM)'}
      </button>
    </div>
  );
}
