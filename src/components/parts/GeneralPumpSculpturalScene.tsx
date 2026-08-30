'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { usePartsRequest } from './PartsRequestListContext';

export default function GeneralPumpSculpturalScene() {
  const { addItem, setIsDrawerOpen } = usePartsRequest();

  const handleAddPump = () => {
    addItem({
      id: 'featured-gp-ts2021',
      part_number: 'ALK-PMP-001',
      name: 'General Pump TS2021 High-Pressure Triplex Pump',
      price_each: 645.00,
      quantity: 1,
      image: '/assets/products/industrial-pump.png',
      category: 'pumps',
    });
    setIsDrawerOpen(true);
  };

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 lg:px-24 bg-[#F2F0E8] text-alkota-black overflow-hidden border-t border-[#E5E3DC]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Massive Pump Cutout (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[540px]">
          <div className="absolute inset-x-12 bottom-6 h-16 bg-black/10 blur-2xl rounded-full pointer-events-none" />

          <img
            src="/assets/products/industrial-pump.png"
            alt="General Pump TS2021 High Pressure Triplex Pump"
            className="relative z-10 w-full h-auto max-w-[560px] object-contain filter drop-shadow-[0_28px_48px_rgba(0,0,0,0.15)] hover:scale-[1.03] transition-transform duration-700 select-none"
            onError={(e) => {
              (e.target as HTMLElement).setAttribute('src', '/assets/products/420x4.png');
            }}
          />
        </div>

        {/* Right Column: Editorial Narrative & Price (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block font-medium">
              General Pump · High-Pressure Triplex
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
              style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)' }}
            >
              Built to<br />
              <span className="text-[#777] font-light">keep pumping.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed pt-2">
              Solid 99.8% alumina ceramic plungers and heavy forged brass manifold. Engineered for continuous daily hot or cold washdown in the harshest UK environments.
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#DCDAD4] font-ibm-plex-mono text-xs text-[#555]">
            <div>
              <span className="text-[#888] block text-[9px] uppercase tracking-wider">Flow</span>
              <span className="text-alkota-black font-medium">15 L/min</span>
            </div>
            <div>
              <span className="text-[#888] block text-[9px] uppercase tracking-wider">Pressure</span>
              <span className="text-alkota-black font-medium">200 Bar</span>
            </div>
            <div>
              <span className="text-[#888] block text-[9px] uppercase tracking-wider">Plungers</span>
              <span className="text-alkota-black font-medium">Solid Ceramic</span>
            </div>
          </div>

          {/* Direct Order Actions */}
          <div className="pt-6 border-t border-[#DCDAD4] space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase tracking-widest block">Trade Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-ibm-plex-mono text-3xl text-alkota-black font-light">£645.00</span>
                  <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">ex VAT</span>
                </div>
              </div>
              <span className="font-ibm-plex-mono text-[10px] text-emerald-800 bg-emerald-50 px-2.5 py-1 font-medium border border-emerald-200">
                In Stock · UK Warehouse
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddPump}
                className="flex-1 bg-alkota-black hover:bg-alkota-orange text-white py-4 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Add to Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/parts-attachments/product/general-pump-ts2021"
                className="px-6 py-4 border border-[#CCC] hover:border-black text-alkota-black text-center font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
              >
                View Details
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
