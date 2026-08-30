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
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';
import { usePartsRequest } from './PartsRequestListContext';
import { MASTER_TAXONOMY } from '@/lib/parts/taxonomy';

const EXPLORE_LINKS = [
  { name: 'Chemicals & Detergents', href: '/parts-attachments/chemicals', desc: 'RoadForce TFR, degreasers & acid brighteners' },
  { name: 'Shop by Brand', href: '/parts-attachments/brands', desc: 'Giant, Interpump, Mosmatic, CoxREELS & more' },
  { name: 'Shop by Machine', href: '/parts-attachments/machines', desc: 'Guaranteed OEM-compatible components by model' },
  { name: 'Shop by Application', href: '/parts-attachments/applications', desc: 'Fleet wash, hard surfaces, drain jetting' },
  { name: 'Parts Finder Wizard', href: '/parts-attachments/finder', desc: 'Guided component matching in 3 steps' },
  { name: 'All Categories Index', href: '/parts-attachments/categories', desc: 'Full catalogue taxonomy & subcategories' },
];

const HELP_LINKS = [
  { name: 'Find My Part', href: '/parts-attachments/finder' },
  { name: 'Parts Enquiry Desk', href: '/parts-attachments/enquiry' },
  { name: 'Schedule 80 Coils Guide', href: '/parts-attachments/pumps' },
  { name: 'Contact Alkota UK', href: '/contact' },
];

export default function PartsHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { totalItemsCount, setIsDrawerOpen } = usePartsRequest();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/parts-attachments/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMegaMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 z-50 w-full font-sans text-white select-none transition-all duration-300 ${
      isScrolled
        ? 'bg-black/85 backdrop-blur-md border-b border-white/10 shadow-xl'
        : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent border-b border-transparent'
    }`}>
      {/* ── TOP UTILITY STRIP ── */}
      <div className={`px-4 sm:px-8 py-1.5 text-[11px] font-ibm-plex-mono text-[#AAA] flex items-center justify-between transition-all duration-300 ${
        isScrolled ? 'bg-black/40 border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#BBB] hover:text-white transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-3 h-3 text-alkota-orange" />
            <span>alkota.co.uk</span>
          </Link>
          <span className="text-[#444] hidden sm:inline">|</span>
          <span className="text-[#888] hidden sm:inline uppercase tracking-widest text-[10px]">
            UK Parts & Attachments Store
          </span>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/parts-attachments/finder"
            className="flex items-center gap-1.5 text-alkota-orange hover:text-white transition-colors uppercase tracking-widest text-[10px]"
          >
            <Sparkles className="w-3 h-3" />
            <span>Parts Finder</span>
          </Link>
          <span className="text-[#444] hidden md:inline">|</span>
          <Link
            href="/parts-attachments/enquiry"
            className="text-[#999] hover:text-white transition-colors uppercase tracking-widest text-[10px] hidden md:inline"
          >
            Parts Enquiry Desk
          </Link>
        </div>
      </div>

      {/* ── MAIN NAVIGATION BAR ── */}
      <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <Link href="/parts-attachments" className="flex items-center gap-3 no-underline">
            <Logo className="h-6 sm:h-7 w-auto" />
            <div className="border-l border-white/20 pl-3 py-0.5 hidden sm:block">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block">
                Parts &amp; Tooling
              </span>
              <span className="text-[11px] font-extralight text-white/90 uppercase tracking-widest block -mt-0.5">
                Department
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav Trigger & Search */}
        <div className="hidden lg:flex items-center gap-6 flex-1 max-w-2xl mx-6">
          {/* Mega Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
            className={`flex items-center gap-2 px-3.5 py-2 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all cursor-pointer ${
              megaMenuOpen 
                ? 'bg-white text-alkota-black' 
                : 'text-[#DDD] hover:text-white hover:bg-white/10'
            }`}
          >
            <span>Catalogue</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-alkota-black' : 'text-alkota-orange'}`} />
          </button>

          {/* Quick Direct Nav Links */}
          <Link
            href="/parts-attachments/chemicals"
            className="text-xs uppercase tracking-widest font-ibm-plex-mono text-alkota-orange hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Chemicals</span>
          </Link>
          <Link
            href="/parts-attachments/brands"
            className="text-xs uppercase tracking-widest font-ibm-plex-mono text-[#BBB] hover:text-white transition-colors"
          >
            Brands
          </Link>
          <Link
            href="/parts-attachments/machines"
            className="text-xs uppercase tracking-widest font-ibm-plex-mono text-[#BBB] hover:text-white transition-colors"
          >
            Machines
          </Link>
          <Link
            href="/parts-attachments/applications"
            className="text-xs uppercase tracking-widest font-ibm-plex-mono text-[#BBB] hover:text-white transition-colors"
          >
            Applications
          </Link>

          {/* Inline Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by part number, brand, machine..."
              className="w-full bg-white/10 border border-white/15 text-white text-xs px-3.5 py-2 pr-9 focus:outline-none focus:border-alkota-orange focus:bg-black/60 transition-all font-normal placeholder:text-white/40"
            />
            <button type="submit" className="absolute right-2.5 top-2.5 text-[#AAA] hover:text-alkota-orange transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right: Enquiry Bag & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Parts Request Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 bg-white/10 hover:bg-alkota-orange text-white px-3.5 py-2 transition-all cursor-pointer border border-white/15"
            title="Open Parts Enquiry Bag"
          >
            <ShoppingBag className="w-4 h-4 text-alkota-orange group-hover:text-white" />
            <span className="font-ibm-plex-mono text-xs uppercase tracking-wider hidden sm:inline">
              Enquiry Bag
            </span>
            {totalItemsCount > 0 && (
              <span className="bg-alkota-orange text-white text-[10px] font-ibm-plex-mono font-normal h-4 w-4 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-alkota-orange transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── UNIFIED EDITORIAL MEGA MENU PANEL ── */}
      <AnimatePresence>
        {megaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#0A0A0A] border-b border-[#222] shadow-2xl text-white z-40 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                {/* Column 1: SHOP (6 Cols) */}
                <div className="md:col-span-6 space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-2">
                      01 / Shop Components
                    </span>
                    <h3 className="font-extralight text-xl text-white tracking-tight">
                      By Category
                    </h3>
                  </div>
                  <div className="h-px bg-[#222]" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {MASTER_TAXONOMY.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/parts-attachments/${cat.slug}`}
                        onClick={() => setMegaMenuOpen(false)}
                        className="text-sm font-light text-[#BBB] hover:text-alkota-orange transition-colors py-1 block"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 2: EXPLORE (3 Cols) */}
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-[#777] block mb-2">
                      02 / Discovery
                    </span>
                    <h3 className="font-extralight text-xl text-white tracking-tight">
                      Explore
                    </h3>
                  </div>
                  <div className="h-px bg-[#222]" />

                  <div className="space-y-4">
                    {EXPLORE_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMegaMenuOpen(false)}
                        className="group block"
                      >
                        <span className="text-sm font-light text-white group-hover:text-alkota-orange transition-colors flex items-center justify-between">
                          {link.name}
                          <ArrowRight className="w-3 h-3 text-[#555] group-hover:text-alkota-orange group-hover:translate-x-1 transition-all" />
                        </span>
                        <span className="font-ibm-plex-mono text-[10px] text-[#666] block mt-0.5">
                          {link.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: HELP & SOURCING (3 Cols) */}
                <div className="md:col-span-3 space-y-6 bg-[#111] p-6 border border-[#222]">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-2">
                      03 / Factory Desk
                    </span>
                    <h3 className="font-extralight text-xl text-white tracking-tight">
                      Parts Sourcing
                    </h3>
                  </div>
                  <p className="text-xs text-[#888] font-normal leading-relaxed">
                    Can't find your schematic code? Send a serial number or machine photo directly to our UK technical team.
                  </p>

                  <div className="space-y-2 pt-2">
                    <Link
                      href="/parts-attachments/finder"
                      onClick={() => setMegaMenuOpen(false)}
                      className="block w-full text-center bg-alkota-orange hover:bg-white hover:text-alkota-black text-white px-4 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors"
                    >
                      Parts Finder Wizard
                    </Link>
                    <Link
                      href="/parts-attachments/enquiry"
                      onClick={() => setMegaMenuOpen(false)}
                      className="block w-full text-center border border-white/20 hover:border-white text-[#CCC] hover:text-white px-4 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-colors"
                    >
                      Submit Parts Enquiry
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE SLIDE-DOWN DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A0A0A] border-b border-[#222] px-6 py-8 space-y-6 text-white max-h-[85vh] overflow-y-auto"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search part number, brand, model..."
                className="w-full bg-[#141414] border border-[#333] text-white text-xs px-3.5 py-3 pr-9 focus:outline-none focus:border-alkota-orange"
              />
              <button type="submit" className="absolute right-3 top-3.5 text-[#AAA]">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Core Exploration Links */}
            <div className="space-y-3 pt-2">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange block">
                // Navigation
              </span>
              <Link
                href="/parts-attachments/finder"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-light text-white hover:text-alkota-orange py-1.5"
              >
                <span>Parts Finder Wizard</span>
                <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
              </Link>
              <Link
                href="/parts-attachments/chemicals"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-light text-alkota-orange hover:text-white py-1.5"
              >
                <span>Chemicals &amp; Detergents</span>
                <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
              </Link>
              <Link
                href="/parts-attachments/brands"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-light text-white hover:text-alkota-orange py-1.5"
              >
                Shop by Brand Partner
              </Link>
              <Link
                href="/parts-attachments/machines"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-light text-white hover:text-alkota-orange py-1.5"
              >
                Shop by Machine Model
              </Link>
              <Link
                href="/parts-attachments/applications"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-light text-white hover:text-alkota-orange py-1.5"
              >
                Shop by Application
              </Link>
              <Link
                href="/parts-attachments/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-light text-white hover:text-alkota-orange py-1.5"
              >
                All Categories
              </Link>
            </div>

            {/* Categories List */}
            <div className="space-y-2 pt-4 border-t border-[#222]">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#777] block mb-2">
                // Component Categories
              </span>
              <div className="grid grid-cols-1 gap-2">
                {MASTER_TAXONOMY.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/parts-attachments/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-light text-[#AAA] hover:text-white py-1 block"
                  >
                    {cat.name}
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
