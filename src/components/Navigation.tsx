'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface MachineCategory {
  name: string;
  href: string;
  subtitle: string;
  image: string;
  spec: string;
  desc: string;
}

const MACHINE_CATEGORIES: MachineCategory[] = [
  {
    name: 'Hot Water Washers',
    href: '/machines/hot-water',
    subtitle: 'Schedule 80 Thermal Power',
    image: '/assets/products/420x4.png',
    spec: 'Up to 95°C · 345 BAR · 7-Yr Warranty',
    desc: 'Continuous-wound Schedule 80 coils for rapid grease, oil, and bitumen breakdown across heavy fleets and industry.',
  },
  {
    name: 'Cold Water Industrial',
    href: '/machines/cold-water',
    subtitle: 'High Volume Plunger Power',
    image: '/assets/products/4305xd4.png',
    spec: '100 – 350 BAR · Low-RPM Triplex',
    desc: 'Slow-turning ceramic triplex plungers on cold-rolled steel frames for multi-shift plant and site washdown.',
  },
  {
    name: 'Dry Steam Cleaners',
    href: '/machines/steam',
    subtitle: '140°C Saturated Vapour',
    image: '/assets/products/steam-oil.png',
    spec: '140°C Dry Vapour · Low Moisture',
    desc: 'Deep thermal sanitisation, food-contact surface hygiene, and chemical-free engine degreasing.',
  },
  {
    name: 'Aqueous Parts Washers',
    href: '/machines/parts-washers',
    subtitle: 'Automated Turntable Degreasing',
    image: '/assets/products/stationary-gas-fired.png',
    spec: 'Automatic Wash Cycle · Solvent-Free',
    desc: 'Closed-loop aqueous component degreasing with heated spray manifolds for engineering workshops.',
  },
  {
    name: 'Alkota Trailers',
    href: '/trailers',
    subtitle: 'Bespoke Mobile Cleaning Systems',
    image: '/assets/products/trailer-single.png',
    spec: 'Open & Enclosed · Turnkey Road Rigs',
    desc: 'Bespoke mobile industrial cleaning systems engineered in the UK with water storage, power, recovery, and dual-operator capability.',
  },
  {
    name: 'Water Treatment',
    href: '/water-treatment',
    subtitle: 'Recovery, Filtration & Recycling',
    image: '/assets/products/ged-12v-skid.png',
    spec: 'Closed-Loop & EA Compliant',
    desc: 'Multi-stage vacuum recovery, media sand filtration, closed-loop recycling and wastewater evaporation systems.',
  },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredMachineIdx, setHoveredMachineIdx] = useState<number>(0);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setActiveMenu(null);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navRef]);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const navLinks = [
    { name: 'Machines', href: '/machines', hasMega: true },
    { name: 'Dealers', href: '/dealers', hasMega: true },
    { name: 'Bespoke', href: '/bespoke', hasMega: true },
    { name: 'Chemicals', href: '/chemicals', hasMega: true },
    { name: 'Resources', href: '/resources', hasMega: true },
    { name: 'Contact', href: '/contact', hasMega: false },
  ];

  const textColorClass = isScrolled || activeMenu !== null
    ? 'text-alkota-black hover:text-alkota-orange'
    : 'text-white hover:text-alkota-orange';

  const activeMachine = MACHINE_CATEGORIES[hoveredMachineIdx] || MACHINE_CATEGORIES[0];

  return (
    <>
      {/* Subtle page backdrop when mega menu is active */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setActiveMenu(null)}
            className="fixed inset-0 top-0 bg-black/40 backdrop-blur-[2px] z-40 hidden lg:block"
          />
        )}
      </AnimatePresence>

      <nav
        ref={navRef}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 z-50 w-full px-6 sm:px-12 transition-all duration-300 font-normal ${
          isScrolled || activeMenu !== null
            ? 'bg-white py-3 shadow-md border-b border-[#E0E0DE] text-alkota-black'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-6 text-white'
        }`}
        aria-label="Main Navigation"
      >
      <div className="mx-auto flex max-w-7xl w-full items-center justify-between">
        {/* Brand Flame Logo */}
        <Link href="/" className="flex items-center group" aria-label="Alkota UK Home">
          <Logo className={`${isScrolled || activeMenu !== null ? 'h-8' : 'h-10'} transition-all duration-300`} />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-7 xl:gap-8 lg:flex font-normal">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative py-2"
              onMouseEnter={() => link.hasMega && handleMouseEnter(link.name)}
            >
              {!link.hasMega ? (
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-[12px] uppercase tracking-[0.18em] transition-colors no-underline font-normal ${textColorClass}`}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveMenu(activeMenu === link.name ? null : link.name)}
                  aria-expanded={activeMenu === link.name}
                  aria-controls={`mega-menu-${link.name.toLowerCase()}`}
                  className={`flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] transition-colors bg-transparent border-none cursor-pointer p-0 font-normal ${textColorClass}`}
                >
                  <span>{link.name}</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
                      activeMenu === link.name
                        ? 'rotate-180 text-alkota-orange'
                        : isScrolled || activeMenu !== null
                        ? 'text-[#888]'
                        : 'text-white/70'
                    }`}
                  />
                </button>
              )}
              {/* Active Orange Underline */}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] bg-alkota-orange transition-all duration-200 ${
                  activeMenu === link.name ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 sm:gap-4 font-normal">
          <Link
            href="/lobby"
            className="hidden md:inline-flex items-center gap-2 bg-black text-white px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-alkota-orange no-underline group shadow-sm border border-white/20 font-normal"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange group-hover:bg-white animate-pulse" />
            <span>The Lobby</span>
          </Link>
          <Link
            href="/tools/configurator"
            className={`hidden sm:inline-flex px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all no-underline font-normal ${
              isScrolled || activeMenu !== null
                ? 'border border-[#333] text-alkota-black hover:border-alkota-orange hover:text-alkota-orange'
                : 'border border-white/60 bg-black/40 backdrop-blur-sm text-white hover:border-white hover:bg-white hover:text-black'
            }`}
          >
            Configurator
          </Link>
          <button
            className={`${isScrolled || activeMenu !== null ? 'text-alkota-black' : 'text-white'} lg:hidden p-2 cursor-pointer transition-colors bg-transparent border-none`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── DESKTOP MEGA MENUS ────────────────────────────────────────── */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            id={`mega-menu-${activeMenu.toLowerCase()}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 top-full w-full bg-white text-alkota-black border-b border-[#E0E0DE] shadow-2xl hidden lg:block"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-12 py-10">
              {/* 1. MACHINES MEGA MENU */}
              {activeMenu === 'Machines' && (
                <div className="grid grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: Product Family Taxonomy */}
                  <div className="col-span-5 border-r border-[#EBEBE8] pr-8">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-light">
                      Equipment Fleet · Handcrafted
                    </span>
                    <div className="space-y-1">
                      {MACHINE_CATEGORIES.map((cat, idx) => {
                        const isHovered = idx === hoveredMachineIdx;
                        return (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            onMouseEnter={() => setHoveredMachineIdx(idx)}
                            onClick={() => setActiveMenu(null)}
                            className={`group flex items-center justify-between p-2.5 transition-all no-underline ${
                              isHovered ? 'bg-[#F5F5F2]' : 'hover:bg-[#FAFAF8]'
                            }`}
                          >
                            <div>
                              <h4
                                className={`text-sm tracking-tight transition-colors ${
                                  isHovered ? 'text-alkota-orange font-normal' : 'text-alkota-black font-light'
                                }`}
                              >
                                {cat.name}
                              </h4>
                              <p className="text-[11px] text-[#777] font-normal leading-none mt-0.5">
                                {cat.subtitle}
                              </p>
                            </div>
                            <ArrowRight
                              className={`h-3.5 w-3.5 transition-all ${
                                isHovered ? 'text-alkota-orange translate-x-1 opacity-100' : 'opacity-0'
                              }`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#EBEBE8]">
                      <Link
                        href="/machines"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-alkota-orange hover:text-black transition-colors no-underline font-normal"
                      >
                        <span>View Complete Equipment Fleet (127 Models)</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Centre Column: Dynamic Machine Showcase */}
                  <div className="col-span-4 flex flex-col justify-between bg-[#F8F7F4] p-6 border border-[#E8E8E4]">
                    <div>
                      <span className="inline-block bg-white px-2.5 py-1 text-[10px] uppercase tracking-wider text-alkota-black border border-[#DDD] mb-3 font-normal">
                        {activeMachine.spec}
                      </span>
                      <h4 className="text-base uppercase tracking-tight text-alkota-black font-light mb-1">
                        {activeMachine.name}
                      </h4>
                      <p className="text-xs text-[#666] leading-relaxed font-normal">
                        {activeMachine.desc}
                      </p>
                    </div>

                    <div className="aspect-[4/3] flex items-center justify-center p-4 my-2">
                      <img
                        src={activeMachine.image}
                        alt={activeMachine.name}
                        className="h-full w-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <Link
                      href={activeMachine.href}
                      onClick={() => setActiveMenu(null)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors font-normal no-underline"
                    >
                      <span>Explore Category Specifications</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {/* Right Column: Machine Match Utility */}
                  <div className="col-span-3 flex flex-col justify-between bg-[#141412] text-white p-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
                        Application Selector
                      </span>
                      <h3 className="font-extralight text-xl text-white leading-tight mb-3">
                        Not sure which Alkota suits your yard?
                      </h3>
                      <p className="text-xs text-[#bbb] leading-relaxed font-normal mb-6">
                        Answer four questions on power, water volume, and duty cycle for an immediate model recommendation.
                      </p>
                    </div>

                    <div className="space-y-2.5 font-normal">
                      <Link
                        href="/tools/machine-match"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center justify-between w-full bg-alkota-orange text-white px-4 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline"
                      >
                        <span>Launch Machine Match</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href="/dealers/demo-request"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center justify-between w-full border border-white/30 bg-white/5 text-white px-4 py-2.5 text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all no-underline"
                      >
                        <span>Book On-Site Demo</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. DEALERS MEGA MENU */}
              {activeMenu === 'Dealers' && (
                <div className="grid grid-cols-12 gap-8 items-stretch">
                  <div className="col-span-6 space-y-4 pr-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-light">
                      UK Authorised Network
                    </span>
                    <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
                      Local Expertise. Backed by 60 Years of Build.
                    </h3>
                    <p className="text-xs text-[#666] leading-relaxed font-normal mb-6">
                      Every Alkota machine in the UK is supported by authorised regional distributors, certified technicians, and genuine South Dakota replacement parts inventory.
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2 font-normal">
                      <Link
                        href="/dealers"
                        onClick={() => setActiveMenu(null)}
                        className="p-3.5 bg-[#F7F7F5] border border-[#E8E8E4] hover:border-alkota-orange hover:bg-white transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black mb-1 group-hover:text-alkota-orange font-normal">
                          Find a Dealer →
                        </h4>
                        <p className="text-[11px] text-[#777] leading-tight font-normal">
                          Locate your regional sales & service partner.
                        </p>
                      </Link>
                      <Link
                        href="/dealers/demo-request"
                        onClick={() => setActiveMenu(null)}
                        className="p-3.5 bg-[#F7F7F5] border border-[#E8E8E4] hover:border-alkota-orange hover:bg-white transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black mb-1 group-hover:text-alkota-orange font-normal">
                          Book Demonstration →
                        </h4>
                        <p className="text-[11px] text-[#777] leading-tight font-normal">
                          On-site mobile test on your commercial yard.
                        </p>
                      </Link>
                      <Link
                        href="/dealers/become-a-dealer"
                        onClick={() => setActiveMenu(null)}
                        className="p-3.5 bg-[#F7F7F5] border border-[#E8E8E4] hover:border-alkota-orange hover:bg-white transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black mb-1 group-hover:text-alkota-orange font-normal">
                          Become a Dealer →
                        </h4>
                        <p className="text-[11px] text-[#777] leading-tight font-normal">
                          Commercial distributor partnership opportunities.
                        </p>
                      </Link>
                      <Link
                        href="/support"
                        onClick={() => setActiveMenu(null)}
                        className="p-3.5 bg-[#F7F7F5] border border-[#E8E8E4] hover:border-alkota-orange hover:bg-white transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black mb-1 group-hover:text-alkota-orange font-normal">
                          Service & Spares →
                        </h4>
                        <p className="text-[11px] text-[#777] leading-tight font-normal">
                          Factory diagnostics and overnight parts dispatch.
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-6 relative bg-[#141412] text-white p-8 flex flex-col justify-between overflow-hidden">
                    <img
                      src="/assets/industries/fleet.png"
                      alt="Alkota UK Dealer Network"
                      className="absolute inset-0 h-full w-full object-cover filter brightness-[0.45]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                    <div className="relative z-10">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-light">
                        On-Site Verification
                      </span>
                      <h4 className="text-2xl font-light uppercase tracking-tight text-white mb-3">
                        Test an Alkota on Your Real Grime.
                      </h4>
                      <p className="text-xs text-[#ccc] leading-relaxed max-w-md font-normal">
                        We bring a full-power hot water or steam unit to your site. Compare speed, heat, and fuel efficiency against your current equipment.
                      </p>
                    </div>
                    <div className="relative z-10 pt-6">
                      <Link
                        href="/dealers/demo-request"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-3 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline font-normal shadow-lg"
                      >
                        <span>Request Demonstration</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. BESPOKE MEGA MENU */}
              {activeMenu === 'Bespoke' && (
                <div className="grid grid-cols-12 gap-8 items-stretch">
                  <div className="col-span-5 space-y-3 pr-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-light">
                      Custom Engineering
                    </span>
                    <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
                      Engineered Around the Job.
                    </h3>
                    <div className="space-y-2">
                      <Link
                        href="/trailers"
                        onClick={() => setActiveMenu(null)}
                        className="block p-3 bg-[#F7F7F5] hover:bg-white border border-[#E8E8E4] hover:border-alkota-orange transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                          Alkota Trailers & Mobile Systems →
                        </h4>
                        <p className="text-[11px] text-[#777] font-normal mt-0.5">
                          Open deck & enclosed mobile plant rooms with live rig configurator.
                        </p>
                      </Link>
                      <Link
                        href="/trailers/configure"
                        onClick={() => setActiveMenu(null)}
                        className="block p-3 bg-alkota-orange/5 hover:bg-alkota-orange/10 border border-alkota-orange/30 hover:border-alkota-orange transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-orange font-bold">
                          Launch Rig Configurator →
                        </h4>
                        <p className="text-[11px] text-[#777] font-normal mt-0.5">
                          Interactive 13-step mobile cleaning system builder.
                        </p>
                      </Link>
                      <Link
                        href="/bespoke#skid"
                        onClick={() => setActiveMenu(null)}
                        className="block p-3 bg-[#F7F7F5] hover:bg-white border border-[#E8E8E4] hover:border-alkota-orange transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                          Custom Skid Units →
                        </h4>
                        <p className="text-[11px] text-[#777] font-normal mt-0.5">
                          Van, truck, and flatbed mounting configurations.
                        </p>
                      </Link>
                      <Link
                        href="/wash-plant"
                        onClick={() => setActiveMenu(null)}
                        className="block p-3 bg-[#F7F7F5] hover:bg-white border border-[#E8E8E4] hover:border-alkota-orange transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                          Bespoke Wash Plants →
                        </h4>
                        <p className="text-[11px] text-[#777] font-normal mt-0.5">
                          Multi-bay fixed installations, automated mat washers & plant hubs.
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-7 bg-[#F8F7F4] border border-[#E8E8E4] p-6 grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-6">
                      <div className="aspect-[4/3] flex items-center justify-center p-2">
                        <img
                          src="/assets/products/trailer-single.png"
                          alt="Alkota Bespoke Mobile Trailer"
                          className="h-full w-full object-contain filter drop-shadow-md"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 space-y-4">
                      <span className="text-[10px] uppercase tracking-wider text-alkota-orange font-light">
                        Turnkey Mobile Rigs
                      </span>
                      <h4 className="text-lg font-light uppercase tracking-tight text-alkota-black leading-snug">
                        Highway-Certified Cleaning Plants.
                      </h4>
                      <p className="text-xs text-[#666] leading-relaxed font-normal">
                        Designed around your payload, site power, and water supply requirements.
                      </p>
                      <Link
                        href="/tools/configurator"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 bg-alkota-black text-white px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-alkota-orange transition-colors no-underline font-normal"
                      >
                        <span>Launch Configurator</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. CHEMICALS MEGA MENU */}
              {activeMenu === 'Chemicals' && (
                <div className="grid grid-cols-12 gap-8 items-stretch">
                  <div className="col-span-7 space-y-4 pr-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-light">
                      Hydrus Formulated Chemistry
                    </span>
                    <h3 className="font-extralight text-2xl uppercase tracking-tight text-alkota-black leading-tight mb-4">
                      Formulated for Thermal Breakdown.
                    </h3>
                    <p className="text-xs text-[#666] leading-relaxed font-normal mb-4">
                      Alkota chemical formulations are engineered specifically for high-temperature and steam applications to dissolve grime without eroding seals, coils, or pumps.
                    </p>
                    <div className="grid grid-cols-2 gap-3 font-normal">
                      <Link
                        href="/chemicals/industrial"
                        onClick={() => setActiveMenu(null)}
                        className="p-3 bg-[#F7F7F5] border border-[#E8E8E4] hover:border-alkota-orange hover:bg-white transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                          Industrial Detergents →
                        </h4>
                        <p className="text-[11px] text-[#777] font-normal mt-0.5">
                          Agricultural & heavy plant formulations.
                        </p>
                      </Link>
                      <Link
                        href="/chemicals/degreasers"
                        onClick={() => setActiveMenu(null)}
                        className="p-3 bg-[#F7F7F5] border border-[#E8E8E4] hover:border-alkota-orange hover:bg-white transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                          Heavy Degreasers →
                        </h4>
                        <p className="text-[11px] text-[#777] font-normal mt-0.5">
                          Extreme bitumen, grease & oil removal.
                        </p>
                      </Link>
                      <Link
                        href="/chemicals/parts-washer"
                        onClick={() => setActiveMenu(null)}
                        className="p-3 bg-[#F7F7F5] border border-[#E8E8E4] hover:border-alkota-orange hover:bg-white transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                          Parts Washer Chemistry →
                        </h4>
                        <p className="text-[11px] text-[#777] font-normal mt-0.5">
                          Aqueous, non-foaming, multi-metal safe.
                        </p>
                      </Link>
                      <Link
                        href="/chemicals"
                        onClick={() => setActiveMenu(null)}
                        className="p-3 bg-[#F7F7F5] border border-[#E8E8E4] hover:border-alkota-orange hover:bg-white transition-all no-underline group"
                      >
                        <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                          All Formulations →
                        </h4>
                        <p className="text-[11px] text-[#777] font-normal mt-0.5">
                          Complete Hydrus chemical catalog.
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-5 bg-[#F8F7F4] border border-[#E8E8E4] p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-alkota-orange font-light block mb-2">
                        Technical Application Support
                      </span>
                      <h4 className="text-lg font-light uppercase tracking-tight text-alkota-black leading-snug mb-2">
                        Chemical Compatibility Advice.
                      </h4>
                      <p className="text-xs text-[#666] leading-relaxed font-normal">
                        Speak directly with our chemists and application engineers to specify the exact dilution rates and formulations for your effluent compliance.
                      </p>
                    </div>
                    <div className="pt-6">
                      <Link
                        href="/contact"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors font-normal no-underline"
                      >
                        <span>Contact Technical Support</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. RESOURCES MEGA MENU */}
              {activeMenu === 'Resources' && (
                <div className="grid grid-cols-12 gap-8 items-stretch">
                  <div className="col-span-5 space-y-2 pr-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
                      Documentation & Intelligence
                    </span>
                    <Link
                      href="/support"
                      onClick={() => setActiveMenu(null)}
                      className="block p-3 bg-[#F7F7F5] hover:bg-white border border-[#E8E8E4] hover:border-alkota-orange transition-all no-underline group"
                    >
                      <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                        Technical Manuals & Parts Lists →
                      </h4>
                      <p className="text-[11px] text-[#777] font-normal mt-0.5">
                        Schematics, wiring diagrams, and parts breakdowns.
                      </p>
                    </Link>
                    <Link
                      href="/support/warranty"
                      onClick={() => setActiveMenu(null)}
                      className="block p-3 bg-[#F7F7F5] hover:bg-white border border-[#E8E8E4] hover:border-alkota-orange transition-all no-underline group"
                    >
                      <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                        7-Year Heating Coil Warranty →
                      </h4>
                      <p className="text-[11px] text-[#777] font-normal mt-0.5">
                        Schedule 80 ASTM A53 coil guarantee terms.
                      </p>
                    </Link>
                    <Link
                      href="/mess-quest"
                      onClick={() => setActiveMenu(null)}
                      className="block p-3 bg-[#F7F7F5] hover:bg-white border border-[#E8E8E4] hover:border-alkota-orange transition-all no-underline group"
                    >
                      <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                        Mess Quest Documentary Series →
                      </h4>
                      <p className="text-[11px] text-[#777] font-normal mt-0.5">
                        Real-world industrial cleaning performance tests.
                      </p>
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setActiveMenu(null)}
                      className="block p-3 bg-[#F7F7F5] hover:bg-white border border-[#E8E8E4] hover:border-alkota-orange transition-all no-underline group"
                    >
                      <h4 className="text-xs uppercase tracking-wider text-alkota-black group-hover:text-alkota-orange font-normal">
                        The Alkota Story (1964 — Present) →
                      </h4>
                      <p className="text-[11px] text-[#777] font-normal mt-0.5">
                        Six decades of master American engineering.
                      </p>
                    </Link>
                  </div>

                  {/* Featured The Lobby Portal */}
                  <div className="col-span-7 relative bg-[#0D0D0B] text-white p-8 flex flex-col justify-between overflow-hidden border border-[#222]">
                    <div className="relative z-10">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-light">
                        The Lobby // Engineering Journal
                      </span>
                      <h3 className="text-2xl font-light uppercase tracking-tight text-white mb-3">
                        Technical Guidance & UK Regulatory Standards.
                      </h3>
                      <p className="text-xs text-[#bbb] leading-relaxed max-w-lg font-normal mb-6">
                        Whitepapers on coil metallurgy, Barlow&apos;s formula, UK Environment Agency wash bay drainage laws, and thermodynamic steam comparisons.
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 flex items-center gap-4 font-normal">
                      <Link
                        href="/lobby"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2.5 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline shadow-xl"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        <span>Enter The Lobby</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href="/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80"
                        onClick={() => setActiveMenu(null)}
                        className="text-xs uppercase tracking-wider text-[#999] hover:text-white transition-colors no-underline font-normal"
                      >
                        Featured: Schedule 80 Metallurgy →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-50 bg-[#121210] pt-20 px-6 sm:px-8 lg:hidden overflow-y-auto text-white font-normal"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
              <Logo className="h-8" />
              <button
                className="text-white p-2 cursor-pointer bg-transparent border-none"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col gap-5 pb-12 font-normal">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col border-b border-white/10 pb-3">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-light uppercase tracking-tight text-white hover:text-alkota-orange no-underline"
                    >
                      {link.name}
                    </Link>
                    {link.hasMega && (
                      <button
                        onClick={() => setActiveMenu(activeMenu === link.name ? null : link.name)}
                        className="p-2 text-white bg-transparent border-none cursor-pointer"
                        aria-label={`Toggle ${link.name} submenu`}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            activeMenu === link.name ? 'rotate-180 text-alkota-orange' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {link.hasMega && activeMenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-2.5 pl-4 pt-3 mt-2 border-l-2 border-alkota-orange overflow-hidden"
                      >
                        {link.name === 'Machines' &&
                          MACHINE_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.name}
                              href={cat.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-sm font-normal text-[#ccc] hover:text-alkota-orange no-underline py-0.5"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        {link.name === 'Dealers' && (
                          <>
                            <Link href="/dealers" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Find a Dealer</Link>
                            <Link href="/dealers/demo-request" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Book Demonstration</Link>
                            <Link href="/dealers/become-a-dealer" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Become a Dealer</Link>
                          </>
                        )}
                        {link.name === 'Bespoke' && (
                          <>
                            <Link href="/trailers" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Alkota Trailers & Mobile Systems</Link>
                            <Link href="/trailers/configure" onClick={() => setMobileMenuOpen(false)} className="text-sm text-alkota-orange font-bold no-underline py-0.5">Trailer Rig Configurator</Link>
                            <Link href="/bespoke#skid" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Custom Skid Units</Link>
                            <Link href="/wash-plant" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Bespoke Wash Plants</Link>
                            <Link href="/tools/configurator" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Build Configurator</Link>
                          </>
                        )}
                        {link.name === 'Chemicals' && (
                          <>
                            <Link href="/chemicals/industrial" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Industrial Detergents</Link>
                            <Link href="/chemicals/degreasers" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Heavy Degreasers</Link>
                            <Link href="/chemicals" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">All Chemicals</Link>
                          </>
                        )}
                        {link.name === 'Resources' && (
                          <>
                            <Link href="/support" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Technical Manuals & Spares</Link>
                            <Link href="/support/warranty" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">7-Year Coil Warranty</Link>
                            <Link href="/mess-quest" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">Mess Quest Documentary</Link>
                            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#ccc] hover:text-alkota-orange no-underline py-0.5">About Alkota</Link>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="pt-4 flex flex-col gap-3 font-normal">
                <Link
                  href="/lobby"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-alkota-orange text-white py-3.5 text-xs uppercase tracking-[0.2em] no-underline shadow-lg font-normal"
                >
                  Enter The Lobby
                </Link>
                <Link
                  href="/tools/configurator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center border border-white/30 bg-black/60 text-white py-3.5 text-xs uppercase tracking-[0.2em] no-underline font-normal"
                >
                  Build Configurator
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </>
  );
}
