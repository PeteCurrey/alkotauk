'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Logo from './Logo';
import { supabase } from '@/lib/supabase/client';
import { resolveMachineImage } from '@/lib/images';
import canonicalData from '../../scripts/data/alkota-canonical-catalogue.json';

interface NavLink {
  name: string;
  href: string;
  hasMega?: boolean;
  data?: any[];
}

function mapMachinesToCategories(items: any[]) {
  const seriesMap = new Map();
  items.forEach(m => {
    let cat = m.category || m.type || 'other';
    // Normalize category slug for DB vs static array differences
    if (cat === 'parts-washers') cat = 'parts-washer';
    if (cat === 'wash-plants') cat = 'wash-plant';

    const ser = m.series || 'Other';
    const key = `${cat}-${ser}`;
    if (!seriesMap.has(key)) {
      const modelCode = m.model_code || m.id || m.slug?.replace('alkota-', '').toUpperCase() || m.name;
      const imgPath = resolveMachineImage(m.primary_image_url || m.image_url, modelCode, cat);
      const urlCategory = cat === 'parts-washer' ? 'parts-washers' : cat;

      seriesMap.set(key, {
        category: cat,
        series: ser,
        name: `${ser} Series`,
        href: `/machines/${urlCategory}?series=${ser}`,
        image: imgPath,
        desc: `${cat.replace('-', ' ')} // Industrial Power`
      });
    }
  });
  return Array.from(seriesMap.values());
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [sanityCategories, setSanityCategories] = useState<any[]>(() => mapMachinesToCategories(canonicalData));
  const navRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession() as any;
  
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

  // Fetch real products from Supabase for the mega menu
  useEffect(() => {
    async function fetchMachines() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Mega menu fetch failed:', error);
      }

      if (data && !error && data.length > 0) {
        setSanityCategories(mapMachinesToCategories(data));
      }
    }
    fetchMachines();
  }, []);

  const buildCategories = [
    { name: 'Bespoke Trailers', href: '/machines/trailers', image: '/assets/products/trailer-single.png', desc: 'Custom mobile cleaning rigs built to order.' },
    { name: 'Custom Skid Units', href: '/bespoke#skid', image: '/assets/products/ged-12v-skid.png', desc: 'Truck, van or trailer skid mounting.' },
    { name: 'Parts Washers', href: '/machines/parts-washers', image: '/assets/products/stationary-gas-fired.png', desc: 'Automatic aqueous component cleaning.' },
    { name: 'Configurator', href: '/tools/configurator', image: '/assets/products/420x4.png', desc: 'Custom specification engine. Build your machine.' },
  ];

  const chemicalCategories = [
    { name: 'All Chemicals', href: '/chemicals', image: '/assets/products/industrial-pump.png', desc: 'The complete Hydrus formulated range.' },
    { name: 'Degreasers', href: '/chemicals/degreasers', image: '/assets/products/whirl-away-surface-cleaner.png', desc: 'Extreme grime and oil removal.' },
    { name: 'Industrial', href: '/chemicals/industrial', image: '/assets/products/spray-nozzles.png', desc: 'Agricultural and heavy duty detergents.' },
    { name: 'Parts Washers', href: '/chemicals/parts-washer', image: '/assets/products/jetter-series.png', desc: 'Aqueous, non-foaming, multi-metal.' },
  ];

  const dealerCategories = [
    { name: 'Find a Dealer', href: '/dealers', image: '/assets/industries/fleet.png', desc: 'Locate your regional authorised sales & service centre.' },
    { name: 'Book a Demonstration', href: '/dealers/demo-request', image: '/assets/products/420x4.png', desc: 'On-site mobile performance verification on your yard.' },
    { name: 'Become a Dealer', href: '/dealers/become-a-dealer', image: '/assets/industries/manufacturing.png', desc: 'Commercial distributor & service partner opportunities.' },
  ];

  const resourceCategories = [
    { name: 'The Lobby', href: '/lobby', image: '/assets/industries/manufacturing.png', desc: 'Engineering intelligence, whitepapers & UK compliance.' },
    { name: 'Machine Matcher', href: '/tools/machine-match', image: '/assets/industries/construction.png', desc: 'Interactive cleaning requirements and equipment selector.' },
    { name: 'About Alkota', href: '/about', image: '/assets/industries/manufacturing.png', desc: 'Our heritage, master craftsmanship, and industrial power.' },
    { name: 'Support & Docs', href: '/support', image: '/assets/products/whirl-away-surface-cleaner.png', desc: 'Technical documentation, service, and expert assistance.' },
  ];

  const navLinks: NavLink[] = [
    { name: 'Machines', href: '/machines', hasMega: true, data: sanityCategories.length > 0 ? sanityCategories : [] },
    { name: 'Dealers', href: '/dealers', hasMega: true, data: dealerCategories },
    { name: 'Bespoke', href: '/bespoke', hasMega: true, data: buildCategories },
    { name: 'Chemicals', href: '/chemicals', hasMega: true, data: chemicalCategories },
    { name: 'Resources', href: '/resources', hasMega: true, data: resourceCategories },
    { name: 'Contact', href: '/contact', hasMega: false },
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? 'bg-alkota-bg/90 py-3 shadow-xl border-b border-alkota-iron/50 backdrop-blur-md' : 'bg-transparent py-8'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center group">
          <Logo className={isScrolled ? "h-8" : "h-11"} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 lg:flex">
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
                  className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.15em] transition-all text-alkota-black hover:text-alkota-orange no-underline"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.15em] transition-all text-alkota-black hover:text-alkota-orange bg-transparent border-none cursor-pointer"
                >
                  {link.name}
                  {link.hasMega && <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeMenu === link.name ? 'rotate-180' : ''}`} />}
                </button>
              )}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-alkota-orange transition-all duration-300 ${activeMenu === link.name ? 'w-full' : 'w-0 group-hover/nav:w-full'}`} />

              <AnimatePresence>
                {link.hasMega && activeMenu === link.name && (link.data?.length ?? 0) > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] w-[900px] bg-white border border-alkota-iron shadow-2xl z-50 p-2"
                  >
                    <div className={`grid ${link.data?.length === 3 ? 'grid-cols-3' : 'grid-cols-4'} p-4 gap-4`}>
                      {link.data?.map((cat: any) => (
                        <Link 
                          key={cat.name} 
                          href={cat.href}
                          onClick={() => setActiveMenu(null)}
                          className="group/item flex flex-col bg-alkota-steel/30 border border-transparent p-4 transition-all hover:border-alkota-orange/50 no-underline"
                        >
                          <div className="aspect-video overflow-hidden mb-4 grayscale group-hover/item:grayscale-0 transition-all duration-500 bg-alkota-bg">
                            <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
                          </div>
                          <h4 className="font-barlow-condensed text-lg font-bold uppercase tracking-tight text-alkota-black mb-1 group-hover/item:text-alkota-orange">
                            {cat.name}
                          </h4>
                          <p className="text-[9px] text-alkota-silver uppercase tracking-wider leading-relaxed">
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

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/lobby"
            className="hidden md:inline-flex items-center gap-2 bg-alkota-black text-white px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-alkota-orange no-underline group shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange group-hover:bg-white animate-pulse" />
            <span>The Lobby</span>
          </Link>
          <Link
            href="/tools/configurator"
            className="hidden border border-alkota-orange px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-alkota-orange hover:text-white md:block text-alkota-black no-underline"
          >
            Configurator
          </Link>
          <button className="lg:hidden text-alkota-black p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation menu">
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-50 bg-alkota-bg pt-24 px-8 lg:hidden overflow-y-auto"
          >
            <button className="absolute top-8 right-8 text-alkota-black" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-8 w-8" />
            </button>
            <div className="flex flex-col gap-8 pb-12">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-barlow-condensed text-5xl font-black uppercase tracking-tighter text-alkota-black hover:text-alkota-orange no-underline"
                    >
                      {link.name}
                    </Link>
                    {link.hasMega && (
                      <button
                        onClick={() => setActiveMenu(activeMenu === link.name ? null : link.name)}
                        className="p-2 text-alkota-black bg-transparent border-none cursor-pointer"
                        aria-label={`Toggle ${link.name} submenu`}
                      >
                        <ChevronDown className={`h-8 w-8 transition-transform duration-300 ${activeMenu === link.name ? 'rotate-180 text-alkota-orange' : ''}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {link.hasMega && activeMenu === link.name && link.data && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-4 pl-6 pt-4 border-l-2 border-alkota-orange/30 overflow-hidden"
                      >
                        {link.data.map((sub: any) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-barlow-condensed text-2xl font-bold uppercase tracking-tight text-alkota-black/70 hover:text-alkota-orange no-underline py-1"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
