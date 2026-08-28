'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ArrowUpRight, BookOpen, Layers, ShieldCheck, Cpu, Flame, BarChart3, Menu, X } from 'lucide-react';

const CATEGORIES = [
  { name: 'Engineering & Metallurgy', slug: 'engineering-design', icon: Cpu },
  { name: 'Regulatory & Compliance', slug: 'regulatory-compliance', icon: ShieldCheck },
  { name: 'Application Science', slug: 'application-science', icon: Flame },
  { name: 'Economics & TCO', slug: 'economics-tco', icon: BarChart3 },
];

export default function LobbyHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#222] bg-[#0A0A0A]/95 backdrop-blur-md">
      {/* Top Editorial Ticker Bar */}
      <div className="border-b border-[#1A1A1A] bg-[#050505] px-4 py-1.5 text-[9px] font-ibm-plex-mono text-[#888]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#FF6900]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6900] animate-pulse" />
              THE LOBBY
            </span>
            <span className="hidden text-[#444] sm:inline">|</span>
            <span className="hidden uppercase tracking-wider text-[#aaa] sm:inline">
              Alkota UK Engineering Intelligence & Regulatory Archive
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/machines"
              className="group flex items-center gap-1 uppercase tracking-widest text-[#888] transition-colors hover:text-white"
            >
              <span>Commercial Catalogue</span>
              <ArrowUpRight className="h-3 w-3 text-[#FF6900] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Masthead Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/lobby" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-[#FF6900] text-white font-black text-lg tracking-tighter">
              A
            </div>
            <div>
              <span className="block font-barlow-condensed text-2xl font-black uppercase tracking-tight text-white leading-none group-hover:text-[#FF6900] transition-colors">
                THE LOBBY
              </span>
              <span className="block font-ibm-plex-mono text-[8px] font-bold uppercase tracking-[0.25em] text-[#666]">
                BY ALKOTA UK
              </span>
            </div>
          </Link>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map(cat => {
              const isActive = pathname.includes(cat.slug);
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/lobby#${cat.slug}`}
                  className={`flex items-center gap-2 px-3 py-1.5 text-[11px] font-ibm-plex-mono uppercase tracking-wider transition-all rounded-sm ${
                    isActive
                      ? 'bg-[#1A1A1A] text-[#FF6900]'
                      : 'text-[#888] hover:bg-[#141414] hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 opacity-70" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/tools/machine-match"
            className="hidden sm:inline-flex items-center gap-2 border border-[#333] bg-[#111] px-3.5 py-1.5 text-[10px] font-ibm-plex-mono uppercase tracking-widest text-[#ccc] transition-colors hover:border-[#FF6900] hover:text-white"
          >
            <BookOpen className="h-3 w-3 text-[#FF6900]" />
            <span>Machine Matcher</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FF6900] px-4 py-1.5 text-[10px] font-ibm-plex-mono font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
          >
            <span>Consult an Engineer</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center border border-[#333] text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-[#222] bg-[#0D0D0D] px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/lobby#${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-xs font-ibm-plex-mono uppercase tracking-wider text-[#ccc] hover:text-[#FF6900]"
                >
                  <Icon className="h-4 w-4 text-[#FF6900]" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-[#222] flex flex-col gap-2">
              <Link
                href="/machines"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-ibm-plex-mono uppercase tracking-wider text-[#FF6900]"
              >
                ← Return to Machine Catalogue
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
