'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { PartRequestItem } from '@/lib/types/parts';

interface PartsRequestContextType {
  items: PartRequestItem[];
  addItem: (item: Omit<PartRequestItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (partNumber: string) => void;
  updateQuantity: (partNumber: string, delta: number) => void;
  clearList: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItemsCount: number;
  itemCount: number;
  subtotal: number;
  vatAmount: number;
  shippingAmount: number;
  totalAmount: number;
}

const PartsRequestContext = createContext<PartsRequestContextType | undefined>(undefined);

const STORAGE_KEY = 'alkota_uk_parts_cart_v2';
const LEGACY_STORAGE_KEY = 'alkota_uk_parts_request_list_v1';

export function PartsRequestProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PartRequestItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from storage:', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart:', e);
      }
    }
  }, [items, isHydrated]);

  const addItem = useCallback((item: Omit<PartRequestItem, 'quantity'> & { quantity?: number }) => {
    const qty = item.quantity || 1;
    setItems((prev) => {
      const key = item.part_number || item.id || item.name;
      const existingIdx = prev.findIndex((i) => (i.part_number || i.id) === key);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setIsDrawerOpen(true);
  }, []);

  const removeItem = useCallback((partNumber: string) => {
    setItems((prev) => prev.filter((i) => (i.part_number || i.id) !== partNumber));
  }, []);

  const updateQuantity = useCallback((partNumber: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if ((i.part_number || i.id) === partNumber) {
            const newQty = Math.max(1, i.quantity + delta);
            return { ...i, quantity: newQty };
          }
          return i;
        })
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearList = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsDrawerOpen(true), []);
  const closeCart = useCallback(() => setIsDrawerOpen(false), []);

  const totalItemsCount = useMemo(() => items.reduce((acc, curr) => acc + curr.quantity, 0), [items]);
  const itemCount = totalItemsCount;

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.price_each) || 0) * item.quantity, 0);
  }, [items]);

  const vatAmount = useMemo(() => subtotal * 0.20, [subtotal]);
  const shippingAmount = useMemo(() => (subtotal > 75 || subtotal === 0 ? 0 : 8.50), [subtotal]);
  const totalAmount = useMemo(() => subtotal + vatAmount + (subtotal > 0 ? shippingAmount : 0), [subtotal, vatAmount, shippingAmount]);

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
        openCart,
        closeCart,
        totalItemsCount,
        itemCount,
        subtotal,
        vatAmount,
        shippingAmount,
        totalAmount,
      }}
    >
      {children}
    </PartsRequestContext.Provider>
  );
}

export function usePartsRequest() {
  const ctx = useContext(PartsRequestContext);
  if (!ctx) {
    // Safe fallback if called outside provider
    return {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearList: () => {},
      isDrawerOpen: false,
      setIsDrawerOpen: () => {},
      openCart: () => {},
      closeCart: () => {},
      totalItemsCount: 0,
      itemCount: 0,
      subtotal: 0,
      vatAmount: 0,
      shippingAmount: 0,
      totalAmount: 0,
    };
  }
  return ctx;
}

export function usePartsCart() {
  return usePartsRequest();
}
