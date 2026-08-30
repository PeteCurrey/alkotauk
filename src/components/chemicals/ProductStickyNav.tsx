'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { ChemicalRetailProduct } from '@/lib/types/chemical-commerce';

interface Props {
  product: ChemicalRetailProduct;
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'story', label: 'Formulation' },
  { id: 'usage', label: 'Application' },
  { id: 'technical', label: 'Specifications' },
];

export default function ProductStickyNav({ product }: Props) {
  const [activeSection, setActiveSection] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > heroHeight);

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E8E4] text-alkota-black transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between h-14">
        
        {/* Left: Product Name */}
        <div className="flex items-center gap-3 min-w-0 pr-4">
          <button
            onClick={() => scrollTo('overview')}
            className="flex items-baseline gap-2 text-left cursor-pointer group"
          >
            <span className="font-light tracking-tight text-alkota-black group-hover:text-alkota-orange transition-colors text-sm sm:text-base truncate">
              {product.retail_name}
            </span>
            <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] shrink-0">
              {product.originating_master_code}
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777]">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`transition-colors py-1 cursor-pointer relative ${
                activeSection === sec.id
                  ? 'text-alkota-black font-semibold'
                  : 'hover:text-alkota-orange'
              }`}
            >
              <span>{sec.label}</span>
              {activeSection === sec.id && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-[2px] bg-alkota-orange" />
              )}
            </button>
          ))}
        </nav>

        {/* Right: Direct CTA to Buy / Packs */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => scrollTo('overview')}
            className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-5 py-2 text-xs font-ibm-plex-mono uppercase tracking-widest transition-colors cursor-pointer shadow-sm font-medium"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order</span>
          </button>
        </div>

      </div>
    </div>
  );
}
