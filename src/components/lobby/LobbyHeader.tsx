'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowLeft, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Ask The Lobby', href: '/lobby#ask-the-lobby', isAsk: true },
  { name: 'Good Clean News', href: '/lobby/good-clean-news' },
  { name: 'Knowledge', href: '/lobby/knowledge' },
  { name: 'Workshop', href: '/lobby/workshop' },
  { name: 'Field Notes', href: '/lobby/field-notes' },
  { name: 'Trade Desk', href: '/lobby/trade-desk' },
];

export default function LobbyHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentDate, setCurrentDate] = useState('Saturday, 29 August 2026');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      if (formatted) setCurrentDate(formatted);
    } catch (e) {}
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full px-4 sm:px-8 lg:px-12 transition-all duration-300 font-normal ${
        isScrolled
          ? 'bg-[#0A0A08]/95 backdrop-blur-md py-3 shadow-xl border-b border-white/10 text-white'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5 text-white'
      }`}
      aria-label="The Lobby Navigation"
    >
      <div className="mx-auto flex max-w-7xl w-full items-center justify-between gap-4 flex-nowrap relative">
        {/* ── LEFT GROUP: Parent site context + Lobby Identity + Date (flex-1 for balanced centering) ─────── */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-1 justify-start min-w-0 shrink-0 flex-nowrap">
          <Link
            href="/"
            className="flex items-center gap-1 text-[11px] xl:text-xs text-white/70 hover:text-white transition-colors no-underline uppercase tracking-[0.14em] xl:tracking-[0.18em] font-normal whitespace-nowrap"
          >
            <ArrowLeft className="h-3 w-3 text-alkota-orange shrink-0" />
            <span className="hidden sm:inline">Alkota.co.uk</span>
            <span className="sm:hidden">Alkota</span>
          </Link>

          <span className="text-white/25 font-light">|</span>

          <Link
            href="/lobby"
            className="text-[11px] xl:text-xs font-light uppercase tracking-[0.2em] xl:tracking-[0.25em] text-white hover:text-alkota-orange transition-colors no-underline whitespace-nowrap"
          >
            The Lobby
          </Link>

          <span className="hidden 2xl:inline text-white/25 font-light">|</span>

          <span className="hidden 2xl:inline text-[10px] font-mono text-white/40 tracking-wider whitespace-nowrap">
            {currentDate}
          </span>
        </div>

        {/* ── CENTRE GROUP: Exactly Centered Horizontal Editorial Nav ─────────────────── */}
        <nav className="hidden lg:flex items-center justify-center gap-3.5 xl:gap-5 2xl:gap-6 font-normal flex-nowrap whitespace-nowrap shrink-0" aria-label="Lobby editorial sections">
          {NAV_ITEMS.map(item => {
            if (item.isAsk) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-1 text-[11px] xl:text-xs uppercase tracking-[0.14em] xl:tracking-[0.18em] text-alkota-orange hover:text-white transition-colors font-medium whitespace-nowrap no-underline"
                >
                  <Sparkles className="h-3 w-3 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            }
            return (
              <Link
                key={item.name}
                href={item.href}
                className="text-[11px] xl:text-xs uppercase tracking-[0.14em] xl:tracking-[0.18em] text-white/75 hover:text-alkota-orange transition-colors no-underline font-normal whitespace-nowrap"
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* ── RIGHT GROUP: Commercial Links + Consult CTA (flex-1 for balanced centering) ─────────────────── */}
        <div className="flex items-center gap-2.5 sm:gap-4 font-normal flex-1 justify-end shrink-0 flex-nowrap">
          <Link
            href="/tools/machine-match"
            className="hidden 2xl:inline text-[11px] uppercase tracking-[0.14em] text-white/70 hover:text-alkota-orange transition-colors no-underline font-normal whitespace-nowrap"
          >
            Machine Match
          </Link>

          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center bg-alkota-orange hover:bg-white hover:text-black text-white px-3.5 py-1.5 xl:px-4 xl:py-2 text-[10px] xl:text-xs uppercase tracking-[0.14em] xl:tracking-[0.18em] font-normal transition-all shadow-sm whitespace-nowrap no-underline"
          >
            Consult an Engineer
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-1.5 cursor-pointer bg-transparent border-none flex items-center justify-center shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU DROPDOWN ─────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 px-6 py-5 lg:hidden bg-[#0A0A08]/98 backdrop-blur-xl mt-3">
          <div className="flex flex-col gap-3.5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-xs uppercase tracking-[0.18em] text-alkota-orange border-b border-white/10 font-normal no-underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Alkota UK Main Site</span>
            </Link>

            {NAV_ITEMS.map(item => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 text-xs uppercase tracking-[0.18em] font-normal transition-colors no-underline ${
                  item.isAsk ? 'text-alkota-orange font-medium flex items-center gap-2' : 'text-white/80 hover:text-alkota-orange'
                }`}
              >
                {item.isAsk && <Sparkles className="h-3.5 w-3.5" />}
                <span>{item.name}</span>
              </Link>
            ))}

            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <Link
                href="/tools/machine-match"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.18em] text-white/70 hover:text-alkota-orange font-normal"
              >
                → Machine Matcher Tool
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center bg-alkota-orange text-white px-4 py-2.5 text-xs uppercase tracking-[0.18em] font-normal"
              >
                Consult an Engineer
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
