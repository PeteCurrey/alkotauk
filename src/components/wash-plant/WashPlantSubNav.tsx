'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SUB_NAV_ITEMS = [
  { label: 'Overview', href: '/wash-plant' },
  { label: 'Wash Plant Architect', href: '/wash-plant/architect' },
  { label: 'Projects', href: '/wash-plant/projects' },
  { label: 'Service & Maintenance', href: '/wash-plant/service-maintenance' },
  { label: 'Asset Management', href: '/wash-plant/asset-management' },
  { label: 'Refurbishment & Upgrades', href: '/wash-plant/refurbishment-upgrades' },
  { label: 'Specification Support', href: '/contact?enquiry=wash-plant-spec' },
];

interface WashPlantSubNavProps {
  /** On the flagship landing page the subnav appears beneath a full-screen hero.
   *  Pass true to start transparent and transition to solid on scroll. */
  heroOverlay?: boolean;
}

export default function WashPlantSubNav({ heroOverlay = false }: WashPlantSubNavProps) {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(!heroOverlay);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!heroOverlay) return;
    const onScroll = () => {
      // Transition after ~80% of viewport height
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [heroOverlay]);

  const isSolid = !heroOverlay || pastHero;

  return (
    <>
      {/* Desktop Sub-Nav */}
      <div
        className={`
          hidden lg:block sticky z-40 transition-all duration-300
          ${heroOverlay ? 'top-0' : 'top-20'}
          ${isSolid
            ? 'bg-[#0F0F0F] border-b border-[#252525] shadow-md'
            : 'bg-transparent border-b border-white/10'}
        `}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-12 flex items-center gap-1 py-2">
          <span className={`font-ibm-plex-mono text-[9px] uppercase tracking-[0.35em] pr-4 border-r mr-2 shrink-0 ${isSolid ? 'text-alkota-orange border-[#2A2A2A]' : 'text-alkota-orange/70 border-white/10'}`}>
            WASH PLANT
          </span>

          <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto font-ibm-plex-mono text-[11px] uppercase tracking-wider" aria-label="Wash Plant Division Navigation">
            {SUB_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 whitespace-nowrap transition-all flex items-center ${
                    isActive
                      ? 'text-white bg-alkota-orange'
                      : isSolid
                        ? 'text-[#999] hover:text-white hover:bg-white/5'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Sub-Nav */}
      <div className="lg:hidden sticky top-20 z-40 bg-[#0F0F0F] border-b border-[#252525]">
        <div className="px-4 py-2 flex items-center justify-between">
          <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.35em] text-alkota-orange">
            WASH PLANT
          </span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="font-ibm-plex-mono text-[10px] uppercase text-[#999] hover:text-white transition-colors"
            aria-expanded={mobileOpen}
            aria-label="Toggle wash plant navigation"
          >
            {mobileOpen ? 'Close ×' : 'Navigate ↓'}
          </button>
        </div>

        {mobileOpen && (
          <nav className="px-4 pb-3 flex flex-col gap-0.5" aria-label="Wash Plant Navigation Mobile">
            {SUB_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 font-ibm-plex-mono text-[11px] uppercase tracking-wider transition-all ${
                    isActive
                      ? 'text-white bg-alkota-orange'
                      : 'text-[#999] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </>
  );
}
