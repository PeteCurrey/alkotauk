'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartIndicator from './CartIndicator';
import { useSession } from 'next-auth/react';
import Logo from './Logo';
import { supabase } from '@/lib/supabase/client';

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
  const [sanityCategories, setSanityCategories] = useState<any[]>([]);
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

  // Fetch real machines from Supabase for the mega menu
  useEffect(() => {
    async function fetchMachines() {
      const { data, error } = await supabase
        .from('machines')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Mega menu fetch failed:', error);
      }

      if (data && !error) {
        // Group by category first, but the user wants to see Series
        // We'll create a list of unique Category + Series combinations
        const seriesMap = new Map();
        
        data.forEach(m => {
          const cat = m.category || 'other';
          const ser = m.series || 'Other';
          const key = `${cat}-${ser}`;
          if (!seriesMap.has(key)) {
            seriesMap.set(key, {
              category: cat,
              series: ser,
              name: `${ser} Series`,
              href: `/machines/${cat}?series=${ser}`,
              image: m.image_url || 'https://alkota.co.uk/assets/hot-water-pressure-washer-DHE0Q-_H.png',
              desc: `${cat.replace('-', ' ')} // Industrial Power`
            });
          }
        });

        setSanityCategories(Array.from(seriesMap.values()));
      }
    }
    fetchMachines();
  }, []);

  const buildCategories = [
    { name: 'Bespoke Trailers', href: '/bespoke', image: '/assets/products/trailer-single.png', desc: 'Custom mobile cleaning rigs built to order.' },
    { name: 'Custom Skid Units', href: '/bespoke#skid', image: '/assets/products/ged-12v-skid.png', desc: 'Truck, van or trailer skid mounting.' },
    { name: 'Parts Washers', href: '/machines/parts-washers', image: '/assets/products/model-911.png', desc: 'Automatic aqueous component cleaning.' },
    { name: 'Configurator', href: '/tools/configurator', image: '/assets/products/420x4.png', desc: 'Custom specification engine. Build your machine.' },
  ];

  const chemicalCategories = [
    { name: 'All Chemicals', href: '/chemicals', image: '/assets/products/tr440-farm-soap.png', desc: 'The complete Hydrus formulated range.' },
    { name: 'Degreasers', href: '/chemicals/degreasers', image: '/assets/products/grease-cutter.png', desc: 'Extreme grime and oil removal.' },
    { name: 'Industrial', href: '/chemicals/industrial', image: '/assets/products/truck-plant-wash.png', desc: 'Agricultural and heavy duty detergents.' },
    { name: 'Parts Washers', href: '/chemicals/parts-washer', image: '/assets/products/food-safe-cleaner.png', desc: 'Aqueous, non-foaming, multi-metal.' },
  ];

  const navLinks: NavLink[] = [
    { name: 'Machines', href: '/machines', hasMega: true, data: sanityCategories.length > 0 ? sanityCategories : [] },
    { name: 'Bespoke Builds', href: '/bespoke', hasMega: true, data: buildCategories },
    { name: 'Chemicals', href: '/chemicals', hasMega: true, data: chemicalCategories },
    { name: 'Mess Quest', href: '/mess-quest', hasMega: false },
    { name: 'About', href: '/about', hasMega: false },
    { name: 'Support', href: '/support', hasMega: false },
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
              <button
                className={`flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.15em] transition-all text-alkota-black hover:text-alkota-orange`}
              >
                {link.name}
                {link.hasMega && <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeMenu === link.name ? 'rotate-180' : ''}`} />}
              </button>
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-alkota-orange transition-all duration-300 ${activeMenu === link.name ? 'w-full' : 'w-0 group-hover/nav:w-full'}`} />

              <AnimatePresence>
                {link.hasMega && activeMenu === link.name && (link.data?.length ?? 0) > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] w-[900px] bg-white border border-alkota-iron shadow-2xl z-50 p-2"
                  >
                    <div className="grid grid-cols-4 p-4 gap-4">
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

        <div className="flex items-center gap-6">
          <Link
            href="/tools/configurator"
            className={`hidden border border-alkota-orange px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-alkota-orange hover:text-white md:block text-alkota-black no-underline`}
          >
            Configurator
          </Link>
          <CartIndicator />
          <button className="lg:hidden text-alkota-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="fixed inset-0 z-50 bg-alkota-bg pt-24 px-8 lg:hidden"
          >
            <button className="absolute top-8 right-8 text-alkota-black" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-8 w-8" />
            </button>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-barlow-condensed text-5xl font-black uppercase tracking-tighter text-alkota-black hover:text-alkota-orange no-underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
