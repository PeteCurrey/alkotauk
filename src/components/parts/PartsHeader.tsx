'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';
import { usePartsRequest } from './PartsRequestListContext';
import { PartCategoryAdmin } from '@/lib/types/parts';

const FALLBACK_CATEGORIES: { slug: string; name: string }[] = [
  { slug: 'all', name: 'All Parts' },
  { slug: 'pumps', name: 'Pumps & Components' },
  { slug: 'burners', name: 'Burners & Ignition' },
  { slug: 'coils', name: 'Heating Coils' },
  { slug: 'hoses', name: 'Hoses & Reels' },
  { slug: 'trigger-guns', name: 'Trigger Guns' },
  { slug: 'lances-nozzles', name: 'Lances & Nozzles' },
  { slug: 'surface-cleaners', name: 'Surface Cleaners' },
  { slug: 'valves-unloaders', name: 'Valves & Unloaders' },
  { slug: 'filters', name: 'Filters & Strainers' },
  { slug: 'electrical-switches', name: 'Electrical & Controls' },
  { slug: 'seals-o-rings', name: 'Seals & O-Rings' },
  { slug: 'service-kits', name: 'Service Kits' },
  { slug: 'attachments', name: 'Attachments' },
];

export default function PartsHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { totalItemsCount, setIsDrawerOpen } = usePartsRequest();

  const [categories, setCategories] = useState<Array<{ slug: string; name: string }>>(FALLBACK_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentCat = pathname.startsWith('/parts-attachments/') && !pathname.startsWith('/parts-attachments/product') && !pathname.startsWith('/parts-attachments/brands') && !pathname.startsWith('/parts-attachments/enquiry')
    ? pathname.split('/')[2]
    : searchParams.get('cat') || 'all';

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/admin/parts/categories');
        if (res.ok) {
          const data: PartCategoryAdmin[] = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCategories([{ slug: 'all', name: 'All Parts' }, ...data.map(c => ({ slug: c.slug, name: c.name }))]);
          }
        }
      } catch (err) {
        console.error('Failed to load categories in PartsHeader', err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/parts-attachments/all?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/parts-attachments/all');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0A] border-b border-[#222222] text-white shadow-xl">
      {/* Top Meta Strip */}
      <div className="hidden md:flex items-center justify-between px-6 sm:px-12 py-1.5 bg-[#050505] border-b border-[#1A1A1A] font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#777]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-alkota-orange">
            <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange animate-pulse" />
            OEM PARTS & ATTACHMENTS DEPARTMENT
          </span>
          <span className="text-[#333]">|</span>
          <span>Next-Day UK Despatch on Stocked Lines</span>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-1 text-[#888] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-2.5 w-2.5" />
            <span>Back to Alkota.co.uk Main Site</span>
          </Link>
          <span className="text-[#333]">|</span>
          <Link href="/service" className="text-[#888] hover:text-white transition-colors">
            Service & Support Hub
          </Link>
          <span className="text-[#333]">|</span>
          <a href="tel:+441234567890" className="text-[#888] hover:text-alkota-orange transition-colors">
            Parts Helpline: 01234 567 890
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Section Title */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <Link href="/parts-attachments" className="flex items-center group">
            <Logo className="h-7 sm:h-8" />
          </Link>
          <div className="hidden sm:block h-6 w-px bg-[#262626]" />
          <Link 
            href="/parts-attachments" 
            className="hidden sm:flex flex-col no-underline group"
          >
            <span className="font-barlow-condensed uppercase tracking-wider text-sm font-normal text-white group-hover:text-alkota-orange transition-colors">
              Parts & Attachments
            </span>
            <span className="font-ibm-plex-mono text-[8px] uppercase tracking-widest text-[#666]">
              Catalogue & Spares
            </span>
          </Link>
        </div>

        {/* Global Search Bar */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex-1 max-w-xl relative hidden md:block mx-2"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-[#666] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 500+ parts, part numbers (e.g. 20-001), Mosmatic, Cox Reels..."
              className="w-full bg-[#141414] border border-[#2A2A2A] focus:border-alkota-orange text-white text-xs pl-10 pr-24 py-2.5 rounded-none font-inter transition-all placeholder:text-[#555] focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1.5 bg-[#222] hover:bg-alkota-orange text-white font-ibm-plex-mono text-[9px] uppercase tracking-widest transition-colors cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* Action Controls (Basket, Enquiry, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Back to main on mobile */}
          <Link 
            href="/" 
            className="md:hidden flex items-center justify-center p-2 text-[#888] hover:text-white transition-colors"
            title="Back to Alkota Home"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          {/* Parts Request Drawer Trigger (Cart) */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center gap-2 bg-[#141414] border border-[#2A2A2A] hover:border-alkota-orange px-3.5 py-2 transition-colors group cursor-pointer"
            aria-label="View Parts Enquiry Basket"
          >
            <ShoppingBag className="h-4 w-4 text-alkota-orange group-hover:scale-105 transition-transform" />
            <span className="hidden sm:inline font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#CCC]">
              Enquiry Basket
            </span>
            {totalItemsCount > 0 && (
              <span className="h-4 min-w-4 px-1 rounded-full bg-alkota-orange text-white font-ibm-plex-mono text-[9px] flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Fast Quote / Enquiry Direct Link */}
          <Link
            href="/parts-attachments/enquiry"
            className="hidden lg:inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-4 py-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-all shadow-sm"
          >
            <span>Quote Enquiry</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          {/* Mobile Navigation Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white bg-[#141414] border border-[#2A2A2A] cursor-pointer"
            aria-label="Toggle Category Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Category Horizontal Pill Navigation Bar (Desktop) */}
      <nav 
        className="hidden md:block border-t border-[#1C1C1C] bg-[#0E0E0E] overflow-x-auto no-scrollbar"
        aria-label="Parts Categories"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-1 py-1.5 whitespace-nowrap">
          {categories.map((cat) => {
            const isActive = currentCat === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={cat.slug === 'all' ? '/parts-attachments/all' : `/parts-attachments/${cat.slug}`}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] font-normal transition-all no-underline shrink-0 relative ${
                  isActive
                    ? 'text-white bg-[#1C1C1C] border-b-2 border-alkota-orange'
                    : 'text-[#888] hover:text-white hover:bg-[#141414]'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
          <div className="h-4 w-px bg-[#262626] mx-2 shrink-0" />
          <Link
            href="/parts-attachments/brands/mosmatic"
            className="px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-alkota-orange/90 hover:text-white hover:bg-[#141414] transition-all no-underline shrink-0"
          >
            Mosmatic
          </Link>
          <Link
            href="/parts-attachments/brands/cox-reels"
            className="px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-alkota-orange/90 hover:text-white hover:bg-[#141414] transition-all no-underline shrink-0"
          >
            Cox Reels
          </Link>
          <Link
            href="/parts-attachments/brands/steel-eagle"
            className="px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-alkota-orange/90 hover:text-white hover:bg-[#141414] transition-all no-underline shrink-0"
          >
            Steel Eagle
          </Link>
          <Link
            href="/parts-attachments/brands/dual-pumps"
            className="px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-alkota-orange/90 hover:text-white hover:bg-[#141414] transition-all no-underline shrink-0"
          >
            Dual Pumps
          </Link>
        </div>
      </nav>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#222] bg-[#0E0E0E] px-4 py-6 space-y-6"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search parts, part numbers..."
                className="w-full bg-[#161616] border border-[#333] text-white text-xs pl-9 pr-4 py-2.5 focus:outline-none focus:border-alkota-orange"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#777]" />
            </form>

            {/* Mobile Categories */}
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666] block mb-3">
                // Browse Categories
              </span>
              <div className="grid grid-cols-1 gap-1 divide-y divide-[#1A1A1A] border-y border-[#1A1A1A]">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={cat.slug === 'all' ? '/parts-attachments/all' : `/parts-attachments/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 text-xs uppercase tracking-wider text-[#CCC] hover:text-alkota-orange no-underline"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="h-3 w-3 text-[#555]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Brands */}
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block mb-3">
                // Partner Brands
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { slug: 'alkota', name: 'Alkota Genuine' },
                  { slug: 'mosmatic', name: 'Mosmatic Swiss' },
                  { slug: 'cox-reels', name: 'Cox Reels USA' },
                  { slug: 'steel-eagle', name: 'Steel Eagle' },
                  { slug: 'dual-pumps', name: 'Dual Pumps' },
                ].map((b) => (
                  <Link
                    key={b.slug}
                    href={`/parts-attachments/brands/${b.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 bg-[#141414] border border-[#222] text-xs text-white hover:border-alkota-orange transition-colors no-underline block"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-[#222] space-y-2">
              <Link
                href="/parts-attachments/enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-alkota-orange text-white py-3 font-ibm-plex-mono text-xs uppercase tracking-widest no-underline"
              >
                <span>Submit Parts Enquiry</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#181818] text-[#999] hover:text-white py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest no-underline"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Return to Alkota.co.uk</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
