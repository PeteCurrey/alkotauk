'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { usePartsRequest } from './PartsRequestListContext';

export default function CoxReelsDarkScene() {
  const { addItem, setIsDrawerOpen } = usePartsRequest();

  const handleAddReel = () => {
    addItem({
      id: 'featured-cox-1125',
      part_number: 'COX-HR-001',
      name: 'Cox Reels 1125-3-100 Hand-Crank Hose Reel (30m)',
      price_each: 285.00,
      quantity: 1,
      image: '/assets/products/high-pressure-hose.png',
      category: 'hoses',
    });
    setIsDrawerOpen(true);
  };

  return (
    <section className="w-full flex flex-col lg:flex-row min-h-[90vh] bg-[#111110] text-white overflow-hidden">
      
      {/* Left Column: Dark Narrative & Direct Order (5/12) */}
      <div className="flex flex-col justify-center px-10 sm:px-16 lg:px-20 xl:px-24 py-24 bg-[#111110] lg:w-5/12 space-y-8 z-10">
        <div className="space-y-3">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block font-medium">
            Cox Reels USA · Industrial Hose Management
          </span>
          <h2 
            className="font-extralight text-white tracking-tight uppercase leading-[0.92]"
            style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)' }}
          >
            All-steel hose<br />
            <span className="text-white/40 font-light">management.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#AAA] font-normal leading-relaxed max-w-sm pt-2">
            Keep 30 metres of high-pressure hose tidy, protected from vehicle runovers, and ready to deploy in seconds. Heavy-gauge welded A-frame with CPC brass live swivel.
          </p>
        </div>

        {/* Spec Strip */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#262626] font-ibm-plex-mono text-xs text-[#AAA]">
          <div>
            <span className="text-[#666] block text-[9px] uppercase tracking-wider">Capacity</span>
            <span className="text-white font-medium">30m (3/8")</span>
          </div>
          <div>
            <span className="text-[#666] block text-[9px] uppercase tracking-wider">Rating</span>
            <span className="text-white font-medium">300 Bar</span>
          </div>
          <div>
            <span className="text-[#666] block text-[9px] uppercase tracking-wider">Mount</span>
            <span className="text-white font-medium">Floor / Wall</span>
          </div>
        </div>

        {/* Price & Add to Order */}
        <div className="pt-6 border-t border-[#262626] space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="font-ibm-plex-mono text-[9px] text-[#777] uppercase tracking-widest">Trade Price</span>
            <span className="font-ibm-plex-mono text-3xl text-white font-light">£285.00</span>
            <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">ex VAT</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddReel}
              className="flex-1 bg-white hover:bg-alkota-orange text-black hover:text-white py-4 px-6 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Add to Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <Link
              href="/parts-attachments/product/cox-reels-1125-3-100"
              className="px-6 py-4 border border-[#333] hover:border-white text-white text-center font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column: Monumental Floating Product on Dark Canvas (7/12) */}
      <div className="relative lg:w-7/12 min-h-[50vh] lg:min-h-0 flex items-center justify-center bg-[#0D0D0C] overflow-hidden p-8 lg:p-16">
        <div className="absolute inset-x-20 bottom-10 h-28 bg-black/70 blur-3xl rounded-full pointer-events-none" />
        <img
          src="/assets/products/high-pressure-hose.png"
          alt="Cox Reels 1125 Industrial High Pressure Hose Reel"
          className="relative z-10 w-full h-auto max-w-[560px] object-contain filter drop-shadow-[0_36px_64px_rgba(0,0,0,0.75)] hover:scale-[1.03] transition-transform duration-700 select-none"
          onError={(e) => {
            (e.target as HTMLElement).setAttribute('src', '/assets/products/216x4.png');
          }}
        />
      </div>

    </section>
  );
}
