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
  ChevronDown,
  Layers,
  Wrench,
  Gauge,
  Activity,
  Flame,
  Target,
  RotateCcw,
  Link2,
  Sparkles,
  Truck,
  Cpu,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';
import { useCart } from '@/context/CartContext';
import { usePartsRequest } from './PartsRequestListContext';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';

const FEATURED_BRANDS = [
  { slug: 'alkota', name: 'Alkota OEM' },
  { slug: 'giant-pumps', name: 'Giant Pumps' },
  { slug: 'interpump', name: 'Interpump' },
  { slug: 'general-pump', name: 'General Pump' },
  { slug: 'cat-pumps', name: 'CAT Pumps' },
  { slug: 'pa', name: 'PA SpA' },
  { slug: 'mosmatic', name: 'Mosmatic' },
  { slug: 'suttner', name: 'Suttner' },
  { slug: 'cox-reels', name: 'CoxREELS' },
  { slug: 'steel-eagle', name: 'Steel Eagle' },
  { slug: 'dual-pumps', name: 'Dual Pumps' },
];

export default function PartsHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { itemCount } = useCart();
  const { totalItemsCount, setIsDrawerOpen } = usePartsRequest();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMegaOpen, setProductsMegaOpen] = useState(false);
  const [brandsMegaOpen, setBrandsMegaOpen] = useState(false);
  const [machinesMegaOpen, setMachinesMegaOpen] = useState(false);
  const [appsMegaOpen, setAppsMegaOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/parts-attachments/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const closeAllMenus = () => {
    setProductsMegaOpen(false);
    setBrandsMegaOpen(false);
    setMachinesMegaOpen(false);
    setAppsMegaOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full font-sans bg-[#0A0A0A] border-b border-[#222] text-white select-none">
      {/* ── TOP UTILITY STRIP ── */}
      <div className="bg-[#050505] border-b border-[#1A1A1A] px-4 sm:px-8 py-1.5 text-[11px] font-ibm-plex-mono text-[#777] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-[#666] hover:text-[#CCC] transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-3 h-3 text-alkota-orange" />
            <span>alkota.co.uk</span>
          </Link>
          <span className="hidden md:inline text-[#333]">|</span>
          <span className="hidden md:inline text-[#888]">
            OEM Spares · Specialist Attachments · Next-Day UK Despatch
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/parts-attachments/finder" className="text-alkota-orange hover:underline uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Parts Finder
          </Link>
          <a href="tel:01234567890" className="hover:text-white transition-colors">
            Parts Desk: 01234 567 890
          </a>
        </div>
      </div>

      {/* ── MAIN NAVIGATION BAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 lg:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/parts-attachments" className="flex items-center gap-2 group" onClick={closeAllMenus}>
              <Logo />
              <div className="flex flex-col border-l border-[#333] pl-2.5 ml-1">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange leading-tight">
                  Parts & Spares
                </span>
                <span className="text-[10px] text-[#888] tracking-wider leading-tight">
                  Commerce Hub
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Discovery Routes (5 First-Class Entries) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs uppercase tracking-widest font-ibm-plex-mono">
            {/* 1. Shop Products */}
            <div 
              className="relative"
              onMouseEnter={() => { closeAllMenus(); setProductsMegaOpen(true); }}
              onMouseLeave={() => setProductsMegaOpen(false)}
            >
              <button 
                className={`px-3 py-2 flex items-center gap-1 transition-colors ${
                  productsMegaOpen ? 'text-alkota-orange' : 'text-[#BBB] hover:text-white'
                }`}
              >
                Products
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Products Mega Menu Dropdown */}
              <AnimatePresence>
                {productsMegaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-[640px] bg-[#121212] border border-[#282828] shadow-2xl p-6 grid grid-cols-2 gap-4 z-50"
                  >
                    <div className="col-span-2 flex items-center justify-between pb-3 border-b border-[#222]">
                      <span className="text-[10px] font-ibm-plex-mono text-alkota-orange tracking-widest">
                        // MASTER PRODUCT TAXONOMY
                      </span>
                      <Link 
                        href="/parts-attachments/categories" 
                        onClick={closeAllMenus}
                        className="text-[10px] text-[#888] hover:text-white flex items-center gap-1 tracking-widest"
                      >
                        All Categories <ArrowRight className="w-3 h-3 text-alkota-orange" />
                      </Link>
                    </div>
                    {MASTER_TAXONOMY.slice(0, 10).map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/parts-attachments/${cat.slug}`}
                        onClick={closeAllMenus}
                        className="group flex flex-col p-2.5 rounded hover:bg-[#1A1A1A] transition-colors"
                      >
                        <span className="text-xs font-normal text-white group-hover:text-alkota-orange transition-colors">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-[#666] line-clamp-1 mt-0.5 normal-case font-sans">
                          {cat.shortDesc}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Shop by Brand */}
            <div 
              className="relative"
              onMouseEnter={() => { closeAllMenus(); setBrandsMegaOpen(true); }}
              onMouseLeave={() => setBrandsMegaOpen(false)}
            >
              <button 
                className={`px-3 py-2 flex items-center gap-1 transition-colors ${
                  brandsMegaOpen ? 'text-alkota-orange' : 'text-[#BBB] hover:text-white'
                }`}
              >
                Brands
                <ChevronDown className="w-3 h-3" />
              </button>

              <AnimatePresence>
                {brandsMegaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-[480px] bg-[#121212] border border-[#282828] shadow-2xl p-6 z-50"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#222] mb-3">
                      <span className="text-[10px] font-ibm-plex-mono text-alkota-orange tracking-widest">
                        // LEADING MANUFACTURER PARTNERS
                      </span>
                      <Link 
                        href="/parts-attachments/brands" 
                        onClick={closeAllMenus}
                        className="text-[10px] text-[#888] hover:text-white flex items-center gap-1 tracking-widest"
                      >
                        View All 25+ <ArrowRight className="w-3 h-3 text-alkota-orange" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {FEATURED_BRANDS.map((b) => (
                        <Link
                          key={b.slug}
                          href={`/parts-attachments/brands/${b.slug}`}
                          onClick={closeAllMenus}
                          className="px-3 py-2 text-xs font-normal text-[#CCC] hover:text-white hover:bg-[#1A1A1A] transition-colors rounded flex items-center justify-between"
                        >
                          <span>{b.name}</span>
                          <span className="text-[9px] text-[#555]">→</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Shop by Machine */}
            <Link
              href="/parts-attachments/machines"
              className="px-3 py-2 text-[#BBB] hover:text-white transition-colors"
            >
              Machines
            </Link>

            {/* 4. Shop by Application */}
            <Link
              href="/parts-attachments/applications"
              className="px-3 py-2 text-[#BBB] hover:text-white transition-colors"
            >
              Applications
            </Link>

            {/* 5. Parts Finder */}
            <Link
              href="/parts-attachments/finder"
              className="px-3 py-2 text-alkota-orange hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Finder
            </Link>
          </nav>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xs sm:max-w-md relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search part number, brand, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#161616] border border-[#333] hover:border-[#444] focus:border-alkota-orange rounded-none text-xs text-white placeholder-[#777] pl-9 pr-8 py-2.5 focus:outline-none transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#777] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Right Action Icons: Cart & Enquiry */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Ecommerce Cart Trigger */}
            <Link
              href="/cart"
              className="relative p-2.5 text-[#AAA] hover:text-white hover:bg-[#1A1A1A] transition-colors border border-transparent hover:border-[#333]"
              title="View Ecommerce Shopping Basket"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-alkota-orange text-white text-[9px] font-bold h-4.5 min-w-4.5 px-1 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Direct Technical Quote Desk Button */}
            <Link
              href="/parts-attachments/enquiry"
              className="hidden sm:inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-4 py-2.5 text-[10px] font-ibm-plex-mono uppercase tracking-widest transition-all"
            >
              <span>Quote Desk</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#AAA] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── SECONDARY HORIZONTAL CATEGORY BAR ── */}
      <div className="bg-[#111] border-t border-[#1F1F1F] px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2 min-w-max text-[11px] font-ibm-plex-mono uppercase tracking-wider text-[#888]">
          <Link
            href="/parts-attachments"
            className={`px-3 py-1 rounded transition-colors ${
              pathname === '/parts-attachments' ? 'bg-[#222] text-white font-medium' : 'hover:text-white hover:bg-[#181818]'
            }`}
          >
            Overview
          </Link>
          <Link
            href="/parts-attachments/categories"
            className="px-3 py-1 hover:text-white hover:bg-[#181818] transition-colors"
          >
            All Categories
          </Link>
          {MASTER_TAXONOMY.slice(0, 8).map((cat) => (
            <Link
              key={cat.slug}
              href={`/parts-attachments/${cat.slug}`}
              className={`px-3 py-1 rounded transition-colors ${
                pathname === `/parts-attachments/${cat.slug}` ? 'bg-alkota-orange text-white' : 'hover:text-white hover:bg-[#181818]'
              }`}
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/parts-attachments/brands"
            className="px-3 py-1 text-alkota-orange hover:underline transition-colors"
          >
            Brands →
          </Link>
        </div>
      </div>

      {/* ── MOBILE MENU PANEL ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#0F0F0F] border-b border-[#222] px-6 py-6 space-y-6 overflow-hidden"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-ibm-plex-mono text-alkota-orange uppercase tracking-widest block">
                // Discovery Routes
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/parts-attachments/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-[#181818] text-xs font-light text-white rounded"
                >
                  Browse Categories
                </Link>
                <Link
                  href="/parts-attachments/brands"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-[#181818] text-xs font-light text-white rounded"
                >
                  Shop by Brand
                </Link>
                <Link
                  href="/parts-attachments/machines"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-[#181818] text-xs font-light text-white rounded"
                >
                  Shop by Machine
                </Link>
                <Link
                  href="/parts-attachments/applications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-[#181818] text-xs font-light text-white rounded"
                >
                  Shop by Application
                </Link>
              </div>
              <Link
                href="/parts-attachments/finder"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-3 bg-alkota-orange text-white text-center text-xs font-ibm-plex-mono uppercase tracking-widest font-medium mt-2"
              >
                Open Parts Finder Wizard →
              </Link>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#222]">
              <span className="text-[10px] font-ibm-plex-mono text-[#777] uppercase tracking-widest block">
                Top Categories
              </span>
              <div className="grid grid-cols-1 gap-1">
                {MASTER_TAXONOMY.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/parts-attachments/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-sm text-[#CCC] hover:text-white border-b border-[#1A1A1A] flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[#555] text-xs">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
