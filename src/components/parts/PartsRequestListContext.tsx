'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PartRequestItem } from '@/lib/types/parts';

interface PartsRequestContextType {
  items: PartRequestItem[];
  addItem: (item: Omit<PartRequestItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (partNumber: string) => void;
  updateQuantity: (partNumber: string, delta: number) => void;
  clearList: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  totalItemsCount: number;
}

const PartsRequestContext = createContext<PartsRequestContextType | undefined>(undefined);

const STORAGE_KEY = 'alkota_uk_parts_request_list_v1';

export function PartsRequestProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PartRequestItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load parts request list from storage:', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save parts request list:', e);
      }
    }
  }, [items, isHydrated]);

  const addItem = (item: Omit<PartRequestItem, 'quantity'> & { quantity?: number }) => {
    const qty = item.quantity || 1;
    setItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.part_number === item.part_number);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (partNumber: string) => {
    setItems((prev) => prev.filter((i) => i.part_number !== partNumber));
  };

  const updateQuantity = (partNumber: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.part_number === partNumber) {
            const newQty = Math.max(1, i.quantity + delta);
            return { ...i, quantity: newQty };
          }
          return i;
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const clearList = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <PartsRequestContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearList,
        isDrawerOpen,
        setIsDrawerOpen,
        totalItemsCount,
      }}
    >
      {children}
    </PartsRequestContext.Provider>
  );
}

export function usePartsRequest() {
  const ctx = useContext(PartsRequestContext);
  if (!ctx) {
    throw new Error('usePartsRequest must be used within a PartsRequestProvider');
  }
  return ctx;
}
