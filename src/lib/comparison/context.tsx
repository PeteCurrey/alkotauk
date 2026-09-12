'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ComparisonContextValue {
  selectedSlugs: string[];
  addMachine: (slug: string) => boolean;
  removeMachine: (slug: string) => void;
  toggleMachine: (slug: string) => void;
  clearComparison: () => void;
  isComparing: (slug: string) => boolean;
  maxLimit: number;
  notice: string | null;
  clearNotice: () => void;
}

const STORAGE_KEY = 'alkota_comparison_slugs';
const MAX_MACHINES = 3;

const ComparisonContext = createContext<ComparisonContextValue | null>(null);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedSlugs(parsed.slice(0, MAX_MACHINES));
        }
      }
    } catch {
      // Ignore parse error
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSlugs));
    } catch {
      // Ignore write error
    }
  }, [selectedSlugs, isInitialized]);

  const addMachine = useCallback((slug: string): boolean => {
    const clean = slug.toLowerCase().trim();
    if (selectedSlugs.includes(clean)) return true;

    if (selectedSlugs.length >= MAX_MACHINES) {
      setNotice(`Maximum ${MAX_MACHINES} machines can be compared side-by-side. Remove a machine first.`);
      return false;
    }

    setSelectedSlugs(prev => [...prev, clean]);
    setNotice(null);
    return true;
  }, [selectedSlugs]);

  const removeMachine = useCallback((slug: string) => {
    const clean = slug.toLowerCase().trim();
    setSelectedSlugs(prev => prev.filter(s => s !== clean));
    setNotice(null);
  }, []);

  const toggleMachine = useCallback((slug: string) => {
    const clean = slug.toLowerCase().trim();
    if (selectedSlugs.includes(clean)) {
      removeMachine(clean);
    } else {
      addMachine(clean);
    }
  }, [selectedSlugs, addMachine, removeMachine]);

  const clearComparison = useCallback(() => {
    setSelectedSlugs([]);
    setNotice(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const isComparing = useCallback((slug: string) => {
    return selectedSlugs.includes(slug.toLowerCase().trim());
  }, [selectedSlugs]);

  const clearNotice = useCallback(() => {
    setNotice(null);
  }, []);

  return (
    <ComparisonContext.Provider
      value={{
        selectedSlugs,
        addMachine,
        removeMachine,
        toggleMachine,
        clearComparison,
        isComparing,
        maxLimit: MAX_MACHINES,
        notice,
        clearNotice,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useMachineComparison() {
  const ctx = useContext(ComparisonContext);
  if (!ctx) {
    throw new Error('useMachineComparison must be used within a ComparisonProvider');
  }
  return ctx;
}
