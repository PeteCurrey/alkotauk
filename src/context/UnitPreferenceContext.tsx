'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UnitSystem } from '@/lib/spec-format';

interface UnitPreferenceContextValue {
  unit: UnitSystem;
  setUnit: (u: UnitSystem) => void;
  toggleUnit: () => void;
}

const UnitPreferenceContext = createContext<UnitPreferenceContextValue>({
  unit: 'metric',
  setUnit: () => {},
  toggleUnit: () => {},
});

export function UnitPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnitState] = useState<UnitSystem>('metric');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('alkota_unit_system');
      if (saved === 'metric' || saved === 'imperial') {
        setUnitState(saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setUnit = (u: UnitSystem) => {
    setUnitState(u);
    try {
      window.localStorage.setItem('alkota_unit_system', u);
    } catch {
      // ignore
    }
  };

  const toggleUnit = () => setUnit(unit === 'metric' ? 'imperial' : 'metric');

  return (
    <UnitPreferenceContext.Provider value={{ unit, setUnit, toggleUnit }}>
      {children}
    </UnitPreferenceContext.Provider>
  );
}

export function useUnitPreference() {
  return useContext(UnitPreferenceContext);
}
