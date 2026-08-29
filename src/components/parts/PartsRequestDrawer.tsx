'use client';

import React from 'react';
import Link from 'next/link';
import { usePartsRequest } from './PartsRequestListContext';
import {
  Wrench,
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2,
  Layers,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PartsRequestDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearList,
    isDrawerOpen,
    setIsDrawerOpen,
    totalItemsCount,
  } = usePartsRequest();

  return (
    <>
      {/* Floating Request List Badge (Visible when items > 0 and drawer is closed) */}
      {!isDrawerOpen && totalItemsCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-3 bg-alkota-orange text-white px-5 py-3.5 shadow-2xl hover:bg-white hover:text-black transition-all border border-alkota-orange/40 font-ibm-plex-mono text-xs uppercase tracking-widest cursor-pointer group"
          >
            <Wrench className="h-4 w-4 text-white group-hover:text-black" />
            <span>Parts Request List</span>
            <span className="bg-black text-white px-2 py-0.5 text-[10px] font-bold group-hover:bg-alkota-orange">
              {totalItemsCount}
            </span>
          </button>
        </div>
      )}

      {/* Slide-Over Drawer Backdrop */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="w-screen max-w-md bg-[#141414] border-l border-[#2A2A2A] text-white flex flex-col justify-between shadow-2xl"
              >
                {/* Header */}
                <div className="p-6 border-b border-[#222] bg-[#0E0E0E] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-alkota-orange" />
                      <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange font-bold">
                        // PARTS PROCUREMENT LIST
                      </span>
                    </div>
                    <h3 className="text-xl uppercase font-light text-white tracking-tight mt-1">
                      Your Selected Spares ({totalItemsCount})
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-[#666] hover:text-white p-2 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Items Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#222]">
                  {items.length === 0 ? (
                    <div className="py-20 text-center space-y-3">
                      <Layers className="h-12 w-12 text-[#444] mx-auto opacity-50" />
                      <p className="text-xs uppercase font-ibm-plex-mono text-[#777] tracking-wider">
                        Your parts list is currently empty.
                      </p>
                      <p className="text-[11px] text-[#555] max-w-xs mx-auto">
                        Add components from exploded diagrams, service kits, or parts specification sheets.
                      </p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.part_number} className="pt-4 first:pt-0 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange font-bold block">
                              PN: {item.part_number}
                            </span>
                            <h4 className="text-sm font-normal text-white leading-snug">
                              {item.name}
                            </h4>
                            {item.machine_context && (
                              <span className="text-[10px] text-[#777] block font-ibm-plex-mono mt-0.5">
                                Machine: {item.machine_context}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.part_number)}
                            className="text-[#555] hover:text-red-400 transition-colors p-1 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center border border-[#333] bg-[#0A0A0A]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.part_number, -1)}
                              className="px-2.5 py-1 text-[#888] hover:text-white transition-colors cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1 font-ibm-plex-mono text-xs text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.part_number, 1)}
                              className="px-2.5 py-1 text-[#888] hover:text-white transition-colors cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {item.price_each && (
                            <span className="font-ibm-plex-mono text-xs text-[#CCC]">
                              £{(item.price_each * item.quantity).toFixed(2)} excl. VAT
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Actions */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-[#222] bg-[#0E0E0E] space-y-3">
                    <div className="flex items-center justify-between text-xs font-ibm-plex-mono text-[#888] pb-1">
                      <span>Total Line Items:</span>
                      <span className="text-white">{items.length} ({totalItemsCount} units)</span>
                    </div>

                    <Link
                      href="/parts/request"
                      onClick={() => setIsDrawerOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-alkota-orange text-white py-3.5 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal shadow-lg cursor-pointer"
                    >
                      <span>Proceed to Request Quotation</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <div className="flex items-center justify-between pt-2 text-[10px] font-ibm-plex-mono text-[#666]">
                      <button
                        type="button"
                        onClick={clearList}
                        className="hover:text-red-400 transition-colors cursor-pointer"
                      >
                        Clear List
                      </button>
                      <span>UK Same-Day Dispatch Available</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
