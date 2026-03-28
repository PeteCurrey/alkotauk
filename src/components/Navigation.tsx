'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Trophy, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartIndicator from './CartIndicator';
import { useSession, signOut } from 'next-auth/react';
import Logo from './Logo';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession() as { data: any };
  
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
    { name: 'Elite Series HW', href: '/machines/hot-water', image: 'https://alkota.co.uk/assets/hot-water-pressure-washer-DHE0Q-_H.png', desc: 'The industrial gold standard in hot water performance.' },
    { name: 'Cold Water BD', href: '/machines/cold-water', image: 'https://alkota.co.uk/assets/cold-water-pressure-washer-D9J_Sudm.png', desc: 'Heavy duty belt-drive cold wash systems.' },
    { name: 'Steam Generators', href: '/machines/steam', image: 'https://alkota.co.uk/assets/steam-cleaner-Bdrp7P2V.png', desc: 'Precision industrial steam for degreasing.' },
    { name: 'Space Heaters', href: '/machines/space-heaters', image: 'https://alkota.com/wp-content/uploads/2023/11/Home-Page-Made-In-USA-Alkota.png', desc: 'High-output portable heating solutions.' },
  ];

  const environmentalCategories = [
    { name: 'Vacuum Filtration', href: '/water-treatment/vacuum-filtration', image: 'https://alkota.co.uk/assets/water-treatment-CkILM82j.png', desc: 'VFS systems for wash-bay water recycling.' },
    { name: 'Media Filtration', href: '/water-treatment/media-filtration', image: 'https://alkota.co.uk/assets/custom-build-C4FaO6d5.png', desc: 'Multi-stage filtration for trade effluent.' },
    { name: 'Wastewater Evap', href: '/water-treatment/evaporators', image: 'https://alkota.co.uk/assets/hot-water-pressure-washer-DHE0Q-_H.png', desc: 'Zero liquid discharge evaporation systems.' },
    { name: 'Compliance Hub', href: '/water-treatment', image: 'https://alkota.com/wp-content/uploads/2025/04/2025-Elite-Series-Collage-no-logo.png', desc: 'PPG2 & Trade Effluent regulatory guidance.' },
  ];

  const buildCategories = [
    { name: 'Trailer Systems', href: '/machines/trailers', image: 'https://alkota.co.uk/assets/pressure-washer-trailer-L2Zp9v78.png', desc: 'Bespoke mobile cleaning rigs built to order.' },
    { name: 'Parts Washers', href: '/machines/parts-washers', image: 'https://alkota.co.uk/assets/custom-build-C4FaO6d5.png', desc: 'Automatic aqueous component cleaning.' },
    { name: 'Configurator', href: '/machines/trailers/configure', image: 'https://alkota.co.uk/assets/custom-build-C4FaO6d5.png', desc: 'Digital trailer systems design tool.' },
  ];

  const navLinks = [
    { name: 'Machines', href: '/machines', hasMega: true, data: machineCategories },
    { name: 'Water Treatment', href: '/water-treatment', hasMega: true, data: environmentalCategories },
    { name: 'Bespoke Builds', href: '/machines/trailers', hasMega: true, data: buildCategories },
    { name: 'Mess Quest', href: '/mess-quest', hasMega: false },
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
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Logo className={isScrolled ? "h-8" : "h-11"} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group/nav py-2">
              <button
                onClick={(e) => link.hasMega ? setActiveMenu(activeMenu === link.name ? null : link.name) : null}
                className={`flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.15em] transition-all ${
                  isScrolled || activeMenu === link.name ? 'text-alkota-black hover:text-alkota-orange' : 'text-alkota-black hover:text-alkota-orange'
                }`}
              >
                {link.name}
                {link.hasMega && <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeMenu === link.name ? 'rotate-180' : ''}`} />}
              </button>
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-alkota-orange transition-all duration-300 ${activeMenu === link.name ? 'w-full' : 'w-0 group-hover/nav:w-full'}`} />

              {/* Mega Menu */}
              <AnimatePresence>
                {link.hasMega && activeMenu === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] w-[900px] bg-white border border-alkota-iron shadow-2xl z-50"
                  >
                    <div className="grid grid-cols-4 p-6 gap-3">
                      {link.data?.map((cat: any) => (
                        <Link 
                          key={cat.name} 
                          href={cat.href}
                          onClick={() => setActiveMenu(null)}
                          className="group/item flex flex-col bg-alkota-steel/30 border border-transparent p-4 transition-all hover:border-alkota-orange/50"
                        >
                          <div className="aspect-video overflow-hidden mb-4 grayscale group-hover/item:grayscale-0 transition-all duration-500">
                            <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
                          </div>
                          <h4 className="font-barlow-condensed text-lg font-bold uppercase tracking-tight text-alkota-black mb-1 group-hover/item:text-alkota-orange">
                            {cat.name}
                          </h4>
                          <p className="text-[10px] text-alkota-silver uppercase tracking-wider leading-relaxed">
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

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link
            href="/machines/trailers/configure"
            className={`hidden border border-alkota-orange px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-alkota-orange hover:text-white md:block ${
              isScrolled ? 'text-alkota-black' : 'text-alkota-black'
            }`}
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
                  className="font-barlow-condensed text-5xl font-black uppercase tracking-tighter text-alkota-black hover:text-alkota-orange"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/machines/trailers/configure"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 border-2 border-alkota-orange py-4 text-center font-barlow-condensed text-2xl font-black uppercase tracking-widest text-alkota-orange"
              >
                Start Build →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
