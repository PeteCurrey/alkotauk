'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface NavLink {
  name: string;
  href: string;
  hasMega?: boolean;
  data?: any[];
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navRef]);

  const machineCategories = [
    { name: 'Hot Water Washers', href: '/machines/hot-water', image: '/assets/products/420x4.png', desc: 'Schedule 80 coils, up to 345 bar and 95°C.' },
    { name: 'Cold Water Industrial', href: '/machines/cold-water', image: '/assets/products/4305xd4.png', desc: 'Heavy plunger pumps for site washdown.' },
    { name: 'Dry Steam Cleaners', href: '/machines/steam', image: '/assets/products/steam-oil.png', desc: '140°C vapour sanitisation and food hygiene.' },
    { name: 'Aqueous Parts Washers', href: '/machines/parts-washers', image: '/assets/products/stationary-gas-fired.png', desc: 'Automated turntable component degreasing.' },
    { name: 'Bespoke Mobile Trailers', href: '/machines/trailers', image: '/assets/products/trailer-single.png', desc: 'Highway-certified turnkey wash plants.' },
    { name: 'Water Recovery Skids', href: '/water-treatment', image: '/assets/products/ged-12v-skid.png', desc: 'Closed-loop Environment Agency compliance.' },
  ];

  const dealerCategories = [
    { name: 'Find a Dealer', href: '/dealers', image: '/assets/industries/fleet.png', desc: 'Locate your regional authorised sales & service centre.' },
    { name: 'Book a Demonstration', href: '/dealers/demo-request', image: '/assets/products/420x4.png', desc: 'On-site mobile performance verification on your yard.' },
    { name: 'Become a Dealer', href: '/dealers/become-a-dealer', image: '/assets/industries/manufacturing.png', desc: 'Commercial distributor & service partner opportunities.' },
  ];

  const buildCategories = [
    { name: 'Bespoke Trailers', href: '/machines/trailers', image: '/assets/products/trailer-single.png', desc: 'Custom mobile cleaning rigs built to order.' },
    { name: 'Custom Skid Units', href: '/bespoke#skid', image: '/assets/products/ged-12v-skid.png', desc: 'Truck, van or trailer skid mounting.' },
    { name: 'Parts Washers', href: '/machines/parts-washers', image: '/assets/products/stationary-gas-fired.png', desc: 'Automatic aqueous component cleaning.' },
    { name: 'Configurator', href: '/tools/configurator', image: '/assets/products/420x4.png', desc: 'Custom specification engine. Build your machine.' },
  ];

  const chemicalCategories = [
    { name: 'All Chemicals', href: '/chemicals', image: '/assets/products/industrial-pump.png', desc: 'The complete Hydrus formulated range.' },
    { name: 'Degreasers', href: '/chemicals/degreasers', image: '/assets/products/whirl-away-surface-cleaner.png', desc: 'Extreme grime and oil removal.' },
    { name: 'Industrial Detergents', href: '/chemicals/industrial', image: '/assets/products/spray-nozzles.png', desc: 'Agricultural and heavy duty formulations.' },
    { name: 'Parts Washer Chemistry', href: '/chemicals/parts-washer', image: '/assets/products/jetter-series.png', desc: 'Aqueous, non-foaming, multi-metal safe.' },
  ];

  const resourceCategories = [
    { name: 'The Lobby', href: '/lobby', image: '/assets/industries/manufacturing.png', desc: 'Engineering intelligence, whitepapers & UK compliance.' },
    { name: 'Machine Matcher', href: '/tools/machine-match', image: '/assets/industries/construction.png', desc: 'Interactive cleaning requirements and equipment selector.' },
    { name: 'About Alkota', href: '/about', image: '/assets/industries/manufacturing.png', desc: 'Our heritage, master craftsmanship, and industrial power.' },
    { name: 'Support & Docs', href: '/support', image: '/assets/products/whirl-away-surface-cleaner.png', desc: 'Technical documentation, service, and expert assistance.' },
  ];

  const navLinks: NavLink[] = [
    { name: 'Machines', href: '/machines', hasMega: true, data: machineCategories },
    { name: 'Dealers', href: '/dealers', hasMega: true, data: dealerCategories },
    { name: 'Bespoke', href: '/bespoke', hasMega: true, data: buildCategories },
    { name: 'Chemicals', href: '/chemicals', hasMega: true, data: chemicalCategories },
    { name: 'Resources', href: '/resources', hasMega: true, data: resourceCategories },
    { name: 'Contact', href: '/contact', hasMega: false },
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 py-3 shadow-md border-b border-[#E0E0DE] backdrop-blur-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12">
        <Link href="/" className="flex items-center group">
          <Logo className={isScrolled ? "h-8" : "h-9"} />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group/nav py-2"
              onMouseEnter={() => link.hasMega && setActiveMenu(link.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {!link.hasMega ? (
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.18em] transition-colors text-alkota-black hover:text-alkota-orange no-underline"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  onClick={() => setActiveMenu(activeMenu === link.name ? null : link.name)}
                  className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.18em] transition-colors text-alkota-black hover:text-alkota-orange bg-transparent border-none cursor-pointer p-0"
                >
                  <span>{link.name}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activeMenu === link.name ? 'rotate-180 text-alkota-orange' : 'text-[#888]'}`} />
                </button>
              )}
              <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-alkota-orange transition-all duration-200 ${activeMenu === link.name ? 'w-full' : 'w-0 group-hover/nav:w-full'}`} />

              <AnimatePresence>
                {link.hasMega && activeMenu === link.name && (link.data?.length ?? 0) > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] w-[880px] bg-white border border-[#D5D5D2] shadow-2xl z-50 p-6"
                  >
                    <div className={`grid ${link.data?.length === 3 ? 'grid-cols-3' : link.data?.length === 6 ? 'grid-cols-3' : 'grid-cols-4'} gap-4`}>
                      {link.data?.map((cat: any) => (
                        <Link 
                          key={cat.name} 
                          href={cat.href}
                          onClick={() => setActiveMenu(null)}
                          className="group/item flex flex-col bg-[#F7F7F5] border border-transparent p-4 transition-all hover:border-alkota-orange/40 hover:bg-white no-underline"
                        >
                          <div className="aspect-[4/3] overflow-hidden mb-3 bg-[#EBEBE8] flex items-center justify-center p-2">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="h-full w-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover/item:scale-105"
                            />
                          </div>
                          <h4 className="font-barlow-condensed text-base font-bold uppercase tracking-tight text-alkota-black mb-1 group-hover/item:text-alkota-orange">
                            {cat.name}
                          </h4>
                          <p className="font-inter text-[10px] text-[#777] leading-relaxed line-clamp-2">
                            {cat.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/lobby"
            className="hidden md:inline-flex items-center gap-2 bg-alkota-black text-white px-4 py-2 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-alkota-orange no-underline group shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange group-hover:bg-white animate-pulse" />
            <span>The Lobby</span>
          </Link>
          <Link
            href="/tools/configurator"
            className="hidden sm:inline-flex border border-[#333] px-4 py-2 font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:border-alkota-orange hover:text-alkota-orange text-alkota-black no-underline"
          >
            Configurator
          </Link>
          <button
            className="lg:hidden text-alkota-black p-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-50 bg-[#F7F7F5] pt-20 px-6 sm:px-8 lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#DCDCD8] pb-4 mb-6">
              <Logo className="h-8" />
              <button
                className="text-alkota-black p-2 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6 pb-12">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col border-b border-[#E5E5E2] pb-4">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-barlow-condensed text-3xl font-black uppercase tracking-tight text-alkota-black hover:text-alkota-orange no-underline"
                    >
                      {link.name}
                    </Link>
                    {link.hasMega && (
                      <button
                        onClick={() => setActiveMenu(activeMenu === link.name ? null : link.name)}
                        className="p-2 text-alkota-black bg-transparent border-none cursor-pointer"
                        aria-label={`Toggle ${link.name} submenu`}
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${activeMenu === link.name ? 'rotate-180 text-alkota-orange' : ''}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {link.hasMega && activeMenu === link.name && link.data && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-3 pl-4 pt-3 mt-2 border-l-2 border-alkota-orange overflow-hidden"
                      >
                        {link.data.map((sub: any) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-inter text-sm font-semibold text-[#555] hover:text-alkota-orange no-underline py-1"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/lobby"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-alkota-black text-white py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] no-underline"
                >
                  Enter The Lobby
                </Link>
                <Link
                  href="/tools/configurator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center border border-[#333] bg-white text-alkota-black py-3.5 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] no-underline"
                >
                  Build Configurator
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
