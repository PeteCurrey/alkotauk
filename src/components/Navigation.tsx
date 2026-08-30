'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight, Search, FileText, Phone, Wrench, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import SafeImage from './ui/SafeImage';

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
    { name: 'Service', href: '/service', hasMega: true },
    { name: 'Dealers', href: '/dealers', hasMega: true },
    { name: 'Bespoke', href: '/bespoke', hasMega: true },
    { name: 'Chemicals', href: '/chemicals', hasMega: true },
    { name: 'Resources', href: '/resources', hasMega: true },
    { name: 'Contact', href: '/contact', hasMega: false },
  ];

  const textColorClass = isScrolled || activeMenu !== null
    ? 'text-[#1A1A18] hover:text-alkota-orange'
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
            ? 'bg-white/95 backdrop-blur-md py-3.5 shadow-md border-b border-[#E8E7E0] text-[#1A1A18]'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-6 text-white'
        }`}
        aria-label="Main Navigation"
      >
        <div className="mx-auto flex max-w-7xl w-full items-center justify-between gap-4 flex-nowrap relative">
          {/* Brand Logo (flex-1 for balanced centering) */}
          <div className="flex items-center flex-1 justify-start shrink-0">
            <Link href="/" className="flex items-center group shrink-0" aria-label="Alkota UK Home">
              <Logo className={`${isScrolled || activeMenu !== null ? 'h-7 sm:h-8' : 'h-8 sm:h-10'} transition-all duration-300`} />
            </Link>
          </div>

          {/* Desktop Nav Links (Centered) */}
          <div className="hidden items-center justify-center gap-3.5 xl:gap-6 2xl:gap-7 lg:flex font-normal flex-nowrap whitespace-nowrap shrink-0">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative py-1.5 shrink-0"
                onMouseEnter={() => link.hasMega && handleMouseEnter(link.name)}
              >
                {!link.hasMega ? (
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-[11px] xl:text-[12px] uppercase tracking-[0.14em] xl:tracking-[0.18em] transition-colors no-underline font-normal whitespace-nowrap ${textColorClass}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveMenu(activeMenu === link.name ? null : link.name)}
                    aria-expanded={activeMenu === link.name}
                    aria-controls={`mega-menu-${link.name.toLowerCase()}`}
                    className={`flex items-center gap-1 text-[11px] xl:text-[12px] uppercase tracking-[0.14em] xl:tracking-[0.18em] transition-colors bg-transparent border-none cursor-pointer p-0 font-normal whitespace-nowrap ${textColorClass}`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 shrink-0 ${
                        activeMenu === link.name
                          ? 'rotate-180 text-alkota-orange'
                          : isScrolled || activeMenu !== null
                          ? 'text-[#888]'
                          : 'text-white/70'
                      }`}
                    />
                  </button>
                )}
                {/* Active Orange Indicator */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-alkota-orange transition-all duration-200 ${
                    activeMenu === link.name ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Right Action CTAs (flex-1 for balanced centering) */}
          <div className="flex items-center gap-2 sm:gap-3 font-normal flex-1 justify-end shrink-0 flex-nowrap">
            <Link
              href="/lobby"
              className="hidden xl:inline-flex items-center gap-1.5 bg-black text-white px-3 py-1.5 text-[10px] xl:text-[11px] uppercase tracking-[0.18em] transition-all hover:bg-alkota-orange no-underline group shadow-sm border border-white/20 font-normal whitespace-nowrap"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-alkota-orange group-hover:bg-white animate-pulse shrink-0" />
              <span>The Lobby</span>
            </Link>
            <Link
              href="/tools/configurator"
              className={`hidden 2xl:inline-flex px-3 py-1.5 text-[10px] xl:text-[11px] uppercase tracking-[0.18em] transition-all no-underline font-normal whitespace-nowrap ${
                isScrolled || activeMenu !== null
                  ? 'border border-[#333] text-[#1A1A18] hover:border-alkota-orange hover:text-alkota-orange'
                  : 'border border-white/60 bg-black/40 backdrop-blur-sm text-white hover:border-white hover:bg-white hover:text-black'
              }`}
            >
              Configurator
            </Link>
            <button
              className={`${isScrolled || activeMenu !== null ? 'text-[#1A1A18]' : 'text-white'} lg:hidden p-2 cursor-pointer transition-colors bg-transparent border-none shrink-0`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* ── DESKTOP 3-ZONE EDITORIAL MEGA MENUS ────────────────────────────── */}
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
              className="absolute left-0 top-full w-full bg-[#FAF9F5] text-[#1A1A18] border-b border-[#E8E7E0] shadow-2xl hidden lg:block"
            >
              <div className="mx-auto max-w-7xl px-6 sm:px-12 py-10">

                {/* 1. MACHINES MEGA MENU */}
                {activeMenu === 'Machines' && (
                  <div className="grid grid-cols-12 gap-10 items-stretch">
                    {/* Zone 1: Unboxed Taxonomy */}
                    <div className="col-span-5 border-r border-[#E0DFD8] pr-8">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-medium">
                        Equipment Fleet // 127 Models
                      </span>
                      <div className="divide-y divide-[#EAE9E2] border-t border-[#1A1A18]">
                        {MACHINE_CATEGORIES.map((cat, idx) => {
                          const isHovered = idx === hoveredMachineIdx;
                          return (
                            <Link
                              key={cat.name}
                              href={cat.href}
                              onMouseEnter={() => setHoveredMachineIdx(idx)}
                              onClick={() => setActiveMenu(null)}
                              className="group flex items-center justify-between py-3 transition-colors no-underline"
                            >
                              <div>
                                <h4 className={`text-sm tracking-tight transition-colors ${isHovered ? 'text-alkota-orange font-normal' : 'text-[#1A1A18] font-light'}`}>
                                  {cat.name}
                                </h4>
                                <p className="text-[11px] text-[#777] font-normal mt-0.5">
                                  {cat.subtitle}
                                </p>
                              </div>
                              <ArrowRight className={`h-3.5 w-3.5 transition-all ${isHovered ? 'text-alkota-orange translate-x-1 opacity-100' : 'opacity-0'}`} />
                            </Link>
                          );
                        })}
                      </div>
                      <div className="pt-4 mt-2">
                        <Link
                          href="/machines"
                          onClick={() => setActiveMenu(null)}
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1A1A18] hover:text-alkota-orange transition-colors no-underline font-medium"
                        >
                          <span>Explore All Machine Series →</span>
                        </Link>
                      </div>
                    </div>

                    {/* Zone 2: Large Visual Showcase */}
                    <div className="col-span-4 flex flex-col justify-between bg-white p-6 border border-[#E8E7E0]">
                      <div>
                        <span className="inline-block font-mono text-[9px] uppercase tracking-wider text-[#666] bg-[#FAF9F5] border border-[#E0DFD8] px-2.5 py-0.5 mb-3 font-medium">
                          {activeMachine.spec}
                        </span>
                        <h4 className="text-xl font-light tracking-tight text-[#1A1A18] mb-1">
                          {activeMachine.name}
                        </h4>
                        <p className="text-xs text-[#666] leading-relaxed font-normal">
                          {activeMachine.desc}
                        </p>
                      </div>

                      <div className="relative aspect-[4/3] flex items-center justify-center p-4 my-3 bg-[#FAF9F5]">
                        <SafeImage
                          src={activeMachine.image}
                          alt={activeMachine.name}
                          fill
                          className="object-contain p-4 drop-shadow-md transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      <Link
                        href={activeMachine.href}
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1A1A18] hover:text-alkota-orange transition-colors font-medium no-underline"
                      >
                        <span>Explore Specifications</span>
                        <ArrowRight className="h-3.5 w-3.5 text-alkota-orange" />
                      </Link>
                    </div>

                    {/* Zone 3: Contextual Tools */}
                    <div className="col-span-3 flex flex-col justify-between bg-[#141412] text-white p-6 border border-[#222]">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-3 font-medium">
                          Selection Guidance
                        </span>
                        <h3 className="font-light text-xl text-white leading-tight mb-3">
                          Find the right machine for your yard.
                        </h3>
                        <p className="text-xs text-[#BBB] leading-relaxed font-normal mb-6">
                          Answer 4 technical questions on power, water volume, and duty cycle for an immediate model recommendation.
                        </p>
                      </div>

                      <div className="space-y-2.5 font-normal">
                        <Link
                          href="/tools/machine-match"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full bg-alkota-orange text-white px-4 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline font-medium shadow-md"
                        >
                          <span>Run Machine Match</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href="/dealers/demo-request"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full border border-white/20 bg-white/5 text-white px-4 py-2.5 font-mono text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all no-underline font-normal"
                        >
                          <span>Book On-Site Demo</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SERVICE MEGA MENU */}
                {activeMenu === 'Service' && (
                  <div className="grid grid-cols-12 gap-10 items-stretch">
                    {/* Zone 1: Unboxed Links */}
                    <div className="col-span-4 border-r border-[#E0DFD8] pr-8">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-medium">
                        Lifecycle Engineering
                      </span>
                      <div className="divide-y divide-[#EAE9E2] border-t border-[#1A1A18]">
                        {[
                          { title: 'Service & Support Hub', desc: 'Nationwide engineering overview', href: '/service' },
                          { title: 'Parts & Attachments', desc: 'OEM spares, Mosmatic, Cox Reels & tooling', href: '/parts-attachments' },
                          { title: 'Planned Maintenance (PPM)', desc: 'Hours-based & annual schedules', href: '/service/planned-maintenance' },
                          { title: 'Breakdown & Repairs', desc: 'Emergency triage & mobile dispatch', href: '/service/repairs' },
                          { title: 'Pump Overhaul Workshop', desc: 'General Pump & CAT bench rebuild', href: '/service/pump-repair' },
                          { title: 'Site Commissioning', desc: 'Utilities verification & training', href: '/service/commissioning' },
                          { title: 'Register Alkota Machine', desc: 'Activate 7-Year coil warranty', href: '/service/machine-registration' },
                          { title: 'Fleet Service Contracts', desc: 'Multi-site SLA agreements', href: '/service/contracts' },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className="group flex items-center justify-between py-2.5 transition-colors no-underline"
                          >
                            <div>
                              <h4 className="text-xs font-normal uppercase tracking-wider text-[#1A1A18] group-hover:text-alkota-orange">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-[#777] font-normal mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-alkota-orange opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Zone 2: Featured Visual Story */}
                    <div className="col-span-5 bg-white border border-[#E8E7E0] p-7 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                          Verified Field Engineering
                        </span>
                        <h4 className="text-2xl font-light tracking-tight text-[#1A1A18] mb-3">
                          18+ Mobile Service Vans Across the UK.
                        </h4>
                        <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal mb-6">
                          Factory-trained engineers carrying genuine American OEM replacement valves, packings, ceramic plungers, and burner electrodes for first-time fix rates.
                        </p>
                      </div>

                      <div className="relative aspect-[16/9] bg-[#FAF9F5] mb-4 border border-[#E8E7E0] flex items-center justify-center overflow-hidden">
                        <SafeImage
                          src="/assets/hot-water-gauge-hero.jpg"
                          alt="Alkota Field Engineering"
                          fill
                          className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute bottom-2 left-3 text-[10px] font-mono text-white tracking-wider">
                          // Rapid Mobile Van Dispatch
                        </span>
                      </div>

                      <Link
                        href="/service/planned-maintenance"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1A1A18] hover:text-alkota-orange transition-colors font-medium no-underline"
                      >
                        <span>Explore PPM Service Schedules</span>
                        <ArrowRight className="h-3.5 w-3.5 text-alkota-orange" />
                      </Link>
                    </div>

                    {/* Zone 3: Dispatch Action */}
                    <div className="col-span-3 bg-[#141412] text-white p-6 border border-[#222] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                          Dispatch Desk
                        </span>
                        <h3 className="text-xl font-light uppercase tracking-tight text-white mb-2">
                          Book Service or Emergency Triage.
                        </h3>
                        <p className="text-xs text-[#AAA] leading-relaxed font-normal mb-6">
                          Direct intake for scheduled maintenance, emergency pump repair, and commissioning.
                        </p>
                      </div>

                      <div className="space-y-2.5 font-normal">
                        <Link
                          href="/service/request"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full bg-alkota-orange text-white px-4 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline shadow-md font-medium"
                        >
                          <span>Book Service Online</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href="/service/request?type=breakdown&urgency=machine_down"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full border border-red-500/40 bg-red-950/40 text-red-300 px-4 py-2.5 font-mono text-xs uppercase tracking-widest hover:border-red-400 hover:bg-red-900/60 transition-all no-underline font-normal"
                        >
                          <span>Emergency Breakdown</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-red-400" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. DEALERS MEGA MENU */}
                {activeMenu === 'Dealers' && (
                  <div className="grid grid-cols-12 gap-10 items-stretch">
                    {/* Zone 1: Unboxed Links */}
                    <div className="col-span-4 border-r border-[#E0DFD8] pr-8">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-medium">
                        Accredited Network
                      </span>
                      <div className="divide-y divide-[#EAE9E2] border-t border-[#1A1A18]">
                        {[
                          { title: 'Find Your Regional Dealer', desc: 'Direct postcode and county directory', href: '/dealers' },
                          { title: 'Book On-Site Demo', desc: 'We bring the machine to your site', href: '/dealers/demo-request' },
                          { title: 'Become an Approved Dealer', desc: 'Regional distribution accreditation', href: '/dealers/apply' },
                          { title: 'Factory Spares & Support', desc: 'Overnight OEM parts dispatch', href: '/support' },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className="group flex items-center justify-between py-3 transition-colors no-underline"
                          >
                            <div>
                              <h4 className="text-xs font-normal uppercase tracking-wider text-[#1A1A18] group-hover:text-alkota-orange">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-[#777] font-normal mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-alkota-orange opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Zone 2: Large Visual Showcase */}
                    <div className="col-span-5 bg-white border border-[#E8E7E0] p-7 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                          Field Performance Verification
                        </span>
                        <h4 className="text-2xl font-light tracking-tight text-[#1A1A18] mb-3">
                          Test an Alkota on Your Real Grime.
                        </h4>
                        <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal mb-6">
                          We bring a full-power hot water or steam unit to your site. Compare speed, heat, and water volume directly against your existing equipment.
                        </p>
                      </div>

                      <div className="relative aspect-[16/9] bg-[#FAF9F5] mb-4 border border-[#E8E7E0] overflow-hidden">
                        <SafeImage
                          src="/assets/industries/fleet.png"
                          alt="Alkota Demonstration Fleet"
                          fill
                          className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-2 left-3 text-[10px] font-mono text-white tracking-wider">
                          // Commercial Yard Trials
                        </span>
                      </div>

                      <Link
                        href="/dealers/demo-request"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1A1A18] hover:text-alkota-orange transition-colors font-medium no-underline"
                      >
                        <span>Book On-Site Demonstration</span>
                        <ArrowRight className="h-3.5 w-3.5 text-alkota-orange" />
                      </Link>
                    </div>

                    {/* Zone 3: Postcode Lookup */}
                    <div className="col-span-3 bg-[#141412] text-white p-6 border border-[#222] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                          Direct Lookup
                        </span>
                        <h3 className="text-xl font-light uppercase tracking-tight text-white mb-2">
                          Locate Your Alkota Dealer.
                        </h3>
                        <p className="text-xs text-[#AAA] leading-relaxed font-normal mb-6">
                          Match your postcode with verified sales, service, and parts centres across the UK.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        <Link
                          href="/dealers/find"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full bg-alkota-orange text-white px-4 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline shadow-md font-medium"
                        >
                          <span>Search Postcode</span>
                          <Search className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href="/dealer"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full border border-white/20 bg-white/5 text-white px-4 py-2.5 font-mono text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all no-underline font-normal"
                        >
                          <span>Dealer Portal Login</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. BESPOKE MEGA MENU */}
                {activeMenu === 'Bespoke' && (
                  <div className="grid grid-cols-12 gap-10 items-stretch">
                    {/* Zone 1: Unboxed Links */}
                    <div className="col-span-4 border-r border-[#E0DFD8] pr-8">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-medium">
                        Custom Engineering
                      </span>
                      <div className="divide-y divide-[#EAE9E2] border-t border-[#1A1A18]">
                        {[
                          { title: 'Alkota Trailers Flagship', desc: 'Bespoke road-towable mobile wash units', href: '/trailers' },
                          { title: 'Trailer Rig Configurator', desc: '13-step automotive-grade builder', href: '/trailers/configure' },
                          { title: 'Wash Plant Infrastructure', desc: 'Fixed multi-bay & conveyor systems', href: '/wash-plant' },
                          { title: 'Wash Plant Architect', desc: '9-step capital project scoping tool', href: '/wash-plant/architect' },
                          { title: 'Projects Archive', desc: 'Real UK bespoke build case studies', href: '/wash-plant/projects' },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className="group flex items-center justify-between py-3 transition-colors no-underline"
                          >
                            <div>
                              <h4 className="text-xs font-normal uppercase tracking-wider text-[#1A1A18] group-hover:text-alkota-orange">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-[#777] font-normal mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-alkota-orange opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Zone 2: Large Visual Showcase */}
                    <div className="col-span-5 bg-white border border-[#E8E7E0] p-7 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                          Capital Project Engineering
                        </span>
                        <h4 className="text-2xl font-light tracking-tight text-[#1A1A18] mb-3">
                          Engineered Around the Job.
                        </h4>
                        <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal mb-6">
                          From £150k custom road-tow highway rigs to turnkey multi-bay vehicle wash infrastructure with closed-loop water treatment recycling.
                        </p>
                      </div>

                      <div className="relative aspect-[16/9] bg-[#FAF9F5] mb-4 border border-[#E8E7E0] overflow-hidden">
                        <SafeImage
                          src="/assets/products/trailer-single.png"
                          alt="Alkota Custom Trailer Rigs"
                          fill
                          className="object-contain p-4 drop-shadow-md"
                        />
                      </div>

                      <Link
                        href="/bespoke"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1A1A18] hover:text-alkota-orange transition-colors font-medium no-underline"
                      >
                        <span>Explore Bespoke Solutions</span>
                        <ArrowRight className="h-3.5 w-3.5 text-alkota-orange" />
                      </Link>
                    </div>

                    {/* Zone 3: Scoping Tools */}
                    <div className="col-span-3 bg-[#141412] text-white p-6 border border-[#222] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                          Interactive Tools
                        </span>
                        <h3 className="text-xl font-light uppercase tracking-tight text-white mb-2">
                          Configure Your Bespoke Rig.
                        </h3>
                        <p className="text-xs text-[#AAA] leading-relaxed font-normal mb-6">
                          Select chassis architecture, water capacity, pump drive, and recovery options.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        <Link
                          href="/trailers/configure"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full bg-alkota-orange text-white px-4 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline shadow-md font-medium"
                        >
                          <span>Launch Rig Builder</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href="/wash-plant/architect"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full border border-white/20 bg-white/5 text-white px-4 py-2.5 font-mono text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all no-underline font-normal"
                        >
                          <span>Wash Plant Scoping</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. CHEMICALS MEGA MENU */}
                {activeMenu === 'Chemicals' && (
                  <div className="grid grid-cols-12 gap-10 items-stretch">
                    {/* Zone 1: Unboxed Links */}
                    <div className="col-span-4 border-r border-[#E0DFD8] pr-8">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-medium">
                        Industrial Formulations
                      </span>
                      <div className="divide-y divide-[#EAE9E2] border-t border-[#1A1A18]">
                        {[
                          { title: 'Trucks & Commercial HGV', desc: 'RoadForce Fleet TR-407 & heavy road film', href: '/chemicals/applications/trucks-hgv' },
                          { title: 'Agricultural Machinery', desc: 'FieldForce TR-428 & slurry/mud removal', href: '/chemicals/applications/agriculture' },
                          { title: 'Plant & Heavy Equipment', desc: 'Forge TS-608 & heavy carbon/oil strippers', href: '/chemicals/applications/plant-machinery' },
                          { title: 'Aluminium & Metal Care', desc: 'AlumaRestore TS-602 acid brighteners', href: '/chemicals/applications/aluminium-metal' },
                          { title: 'Machine & Coil Care', desc: 'ScaleGuard SD-927 coil scale protection', href: '/chemicals/applications/machine-care' },
                          { title: 'All Chemical Applications', desc: 'Explore all 8 commercial industry sectors', href: '/chemicals/applications' },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className="group flex items-center justify-between py-2.5 transition-colors no-underline"
                          >
                            <div>
                              <h4 className="text-xs font-normal uppercase tracking-wider text-[#1A1A18] group-hover:text-alkota-orange">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-[#777] font-normal mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-alkota-orange opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Zone 2: Large Visual Showcase */}
                    <div className="col-span-5 bg-white border border-[#E8E7E0] p-7 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                          Thermal Saponification
                        </span>
                        <h4 className="text-2xl font-light tracking-tight text-[#1A1A18] mb-3">
                          Formulated for Hot Water Synergy.
                        </h4>
                        <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal mb-6">
                          Alkota chemistry features heat-stable surfactants that accelerate grease emulsification under high temperatures while preserving pump valves and heating coils.
                        </p>
                      </div>

                      <div className="relative aspect-[16/9] bg-[#FAF9F5] mb-4 border border-[#E8E7E0] flex items-center justify-center overflow-hidden">
                        <SafeImage
                          src="/assets/industries/fleet.png"
                          alt="Alkota Chemical Application"
                          fill
                          className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-2 left-3 text-[10px] font-mono text-white tracking-wider">
                          // High-Concentration Concentrates
                        </span>
                      </div>

                      <Link
                        href="/chemicals"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1A1A18] hover:text-alkota-orange transition-colors font-medium no-underline"
                      >
                        <span>View Complete Chemical Roster</span>
                        <ArrowRight className="h-3.5 w-3.5 text-alkota-orange" />
                      </Link>
                    </div>

                    {/* Zone 3: Diagnostic Engine */}
                    <div className="col-span-3 bg-[#141412] text-white p-6 border border-[#222] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                          Diagnostic Tool
                        </span>
                        <h3 className="text-xl font-light uppercase tracking-tight text-white mb-2">
                          Chemical Match.
                        </h3>
                        <p className="text-xs text-[#AAA] leading-relaxed font-normal mb-6">
                          Match your exact contamination and surface metallurgy against safe dilution and dosing parameters.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        <Link
                          href="/chemicals/match"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full bg-alkota-orange text-white px-4 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline shadow-md font-medium"
                        >
                          <span>Run Chemical Match</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href="/chemicals/safety-data"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full border border-white/20 bg-white/5 text-white px-4 py-2.5 font-mono text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all no-underline font-normal"
                        >
                          <span>SDS Download Portal</span>
                          <FileText className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. RESOURCES MEGA MENU */}
                {activeMenu === 'Resources' && (
                  <div className="grid grid-cols-12 gap-10 items-stretch">
                    {/* Zone 1: Unboxed Links */}
                    <div className="col-span-4 border-r border-[#E0DFD8] pr-8">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-4 font-medium">
                        Intelligence &amp; Proof
                      </span>
                      <div className="divide-y divide-[#EAE9E2] border-t border-[#1A1A18]">
                        {[
                          { title: 'Case Studies & Field Proof', desc: 'Heavy industrial documentary stories', href: '/resources/case-studies' },
                          { title: 'Genuine Parts & Schematics', desc: 'Interactive exploded parts diagrams', href: '/parts' },
                          { title: 'Attachments & Accessories', desc: 'Hose reels, foam lances & surface cleaners', href: '/attachments' },
                          { title: '7-Year Heating Coil Warranty', desc: 'Schedule 80 ASTM A53 coil guarantee', href: '/support/warranty' },
                          { title: 'Mess Quest Journal', desc: 'Authentic proof-of-capability archives', href: '/mess-quest' },
                          { title: 'The Alkota Story (1964 — Present)', desc: 'Six decades of South Dakota engineering', href: '/about' },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className="group flex items-center justify-between py-2.5 transition-colors no-underline"
                          >
                            <div>
                              <h4 className="text-xs font-normal uppercase tracking-wider text-[#1A1A18] group-hover:text-alkota-orange">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-[#777] font-normal mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-alkota-orange opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Zone 2: Large Visual Showcase */}
                    <div className="col-span-5 bg-white border border-[#E8E7E0] p-7 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                          Technical Knowledge
                        </span>
                        <h4 className="text-2xl font-light tracking-tight text-[#1A1A18] mb-3">
                          Engineering Manuals &amp; UK Standards.
                        </h4>
                        <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal mb-6">
                          Access comprehensive wiring schematics, plumbing diagrams, burner fuel calibration guides, and trade effluent compliance documentation.
                        </p>
                      </div>

                      <div className="relative aspect-[16/9] bg-[#FAF9F5] mb-4 border border-[#E8E7E0] overflow-hidden">
                        <SafeImage
                          src="/assets/hot-water-gauge-hero.jpg"
                          alt="Alkota Technical Documentation"
                          fill
                          className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute bottom-2 left-3 text-[10px] font-mono text-white tracking-wider">
                          // Verified Factory Schematics
                        </span>
                      </div>

                      <Link
                        href="/support"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1A1A18] hover:text-alkota-orange transition-colors font-medium no-underline"
                      >
                        <span>Access Technical Support Library</span>
                        <ArrowRight className="h-3.5 w-3.5 text-alkota-orange" />
                      </Link>
                    </div>

                    {/* Zone 3: Direct The Lobby Link */}
                    <div className="col-span-3 bg-[#141412] text-white p-6 border border-[#222] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
                          Engineering Journal
                        </span>
                        <h3 className="text-xl font-light uppercase tracking-tight text-white mb-2">
                          The Lobby.
                        </h3>
                        <p className="text-xs text-[#AAA] leading-relaxed font-normal mb-6">
                          Deep research whitepapers on coil metallurgy, steam thermodynamics, and Environment Agency rules.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        <Link
                          href="/lobby"
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center justify-between w-full bg-alkota-orange text-white px-4 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors no-underline shadow-md font-medium"
                        >
                          <span>Enter The Lobby</span>
                          <ArrowRight className="h-3.5 w-3.5" />
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
                                className="text-sm font-normal text-[#CCC] hover:text-alkota-orange no-underline py-0.5"
                              >
                                {cat.name}
                              </Link>
                            ))}
                          {link.name === 'Service' && (
                            <>
                              <Link href="/service" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Service &amp; Support Hub</Link>
                              <Link href="/service/planned-maintenance" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Planned Maintenance (PPM)</Link>
                              <Link href="/service/repairs" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Breakdown &amp; Repairs</Link>
                              <Link href="/service/pump-repair" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Pump Overhaul Workshop</Link>
                              <Link href="/service/request" onClick={() => setMobileMenuOpen(false)} className="text-sm text-alkota-orange font-medium no-underline py-0.5">Book Service Online →</Link>
                            </>
                          )}
                          {link.name === 'Dealers' && (
                            <>
                              <Link href="/dealers" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Find a Dealer</Link>
                              <Link href="/dealers/demo-request" onClick={() => setMobileMenuOpen(false)} className="text-sm text-alkota-orange font-medium no-underline py-0.5">Book Demonstration →</Link>
                              <Link href="/dealers/apply" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Become a Dealer</Link>
                            </>
                          )}
                          {link.name === 'Bespoke' && (
                            <>
                              <Link href="/trailers" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Alkota Trailers & Mobile Systems</Link>
                              <Link href="/trailers/configure" onClick={() => setMobileMenuOpen(false)} className="text-sm text-alkota-orange font-medium no-underline py-0.5">Trailer Rig Configurator →</Link>
                              <Link href="/wash-plant" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Bespoke Wash Plants</Link>
                            </>
                          )}
                          {link.name === 'Chemicals' && (
                            <>
                              <Link href="/chemicals/fleet-vehicle" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Fleet & Transport</Link>
                              <Link href="/chemicals/degreasers" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Industrial Degreasers</Link>
                              <Link href="/chemicals" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">All Chemicals</Link>
                            </>
                          )}
                          {link.name === 'Resources' && (
                            <>
                              <Link href="/resources/case-studies" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white hover:text-alkota-orange no-underline py-0.5 font-normal">Case Studies & Field Stories</Link>
                              <Link href="/support" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">Technical Manuals & Spares</Link>
                              <Link href="/support/warranty" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">7-Year Coil Warranty</Link>
                              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-sm text-[#CCC] hover:text-alkota-orange no-underline py-0.5">About Alkota</Link>
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
                    className="w-full text-center bg-alkota-orange text-white py-3.5 text-xs uppercase tracking-[0.2em] no-underline shadow-lg font-medium"
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
