'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowLeft, BookOpen } from 'lucide-react';
import Logo from '@/components/Logo';

const CATEGORIES = [
  { name: 'Engineering', slug: 'engineering-design' },
  { name: 'Regulatory', slug: 'regulatory-compliance' },
  { name: 'Application Science', slug: 'application-science' },
  { name: 'Economics & TCO', slug: 'economics-tco' },
];

export default function LobbyHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColorClass = isScrolled
    ? 'text-alkota-black hover:text-alkota-orange'
    : 'text-white hover:text-alkota-orange';

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 sm:px-12 transition-all duration-300 font-normal ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md py-3 shadow-md border-b border-[#E0E0DE]/80 text-alkota-black'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-6 text-white'
      }`}
      aria-label="The Lobby Navigation"
    >
      <div className="mx-auto flex max-w-7xl w-full items-center justify-between">
        {/* Left: Brand Flame Logo + Desktop Category Nav */}
        <div className="flex items-center gap-8 xl:gap-10">
          <Link href="/lobby" className="flex items-center group shrink-0" aria-label="The Lobby by Alkota UK">
            <Logo className={`${isScrolled ? 'h-8' : 'h-10'} transition-all duration-300`} />
          </Link>

          {/* Desktop category nav — matches main nav link style */}
          <div className="hidden items-center gap-6 xl:gap-7 lg:flex font-normal">
            {CATEGORIES.map(cat => {
              const isActive = pathname.includes(cat.slug);
              return (
                <div key={cat.slug} className="relative py-2">
                  <Link
                    href={`/lobby#${cat.slug}`}
                    className={`flex items-center gap-1 text-[12px] uppercase tracking-[0.18em] transition-colors no-underline font-normal whitespace-nowrap ${
                      isActive ? 'text-alkota-orange' : textColorClass
                    }`}
                  >
                    {cat.name}
                  </Link>
                  {/* Active Orange Underline */}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-alkota-orange transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right actions — mirrors main nav CTA block */}
        <div className="flex items-center gap-3 sm:gap-4 font-normal">
          {/* Alkota Main Site — mirrors "The Lobby" pill in main nav */}
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-2 bg-black text-white px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-alkota-orange no-underline group shadow-sm border border-white/20 font-normal"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Alkota Main Site</span>
          </Link>

          {/* Machine Matcher — mirrors "Configurator" ghost button, only 2xl+ */}
          <Link
            href="/tools/machine-match"
            className={`hidden 2xl:inline-flex px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all no-underline font-normal items-center gap-1.5 ${
              isScrolled
                ? 'border border-[#333] text-alkota-black hover:border-alkota-orange hover:text-alkota-orange'
                : 'border border-white/60 bg-black/40 backdrop-blur-sm text-white hover:border-white hover:bg-white hover:text-black'
            }`}
          >
            <BookOpen className="h-3 w-3" />
            <span>Machine Matcher</span>
          </Link>

          {/* Consult an Engineer — orange solid CTA */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 bg-alkota-orange text-white px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black no-underline font-normal shadow-sm"
          >
            <span>Consult an Engineer</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            className={`${isScrolled ? 'text-alkota-black' : 'text-white'} lg:hidden p-2 cursor-pointer transition-colors bg-transparent border-none`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`border-t px-6 py-4 lg:hidden ${
          isScrolled ? 'bg-white border-[#E0E0DE]' : 'bg-black/90 backdrop-blur-md border-white/10'
        }`}>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-[12px] uppercase tracking-[0.18em] text-alkota-orange border-b border-[#222] font-normal"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Alkota UK</span>
            </Link>
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={`/lobby#${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center py-2 text-[12px] uppercase tracking-[0.18em] font-normal transition-colors ${
                  isScrolled ? 'text-alkota-black hover:text-alkota-orange' : 'text-white/80 hover:text-alkota-orange'
                }`}
              >
                {cat.name}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-[#222] flex flex-col gap-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center bg-alkota-orange text-white px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] font-normal"
              >
                Consult an Engineer
              </Link>
              <Link
                href="/tools/machine-match"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] uppercase tracking-[0.18em] text-alkota-orange font-normal"
              >
                → Machine Matcher
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
