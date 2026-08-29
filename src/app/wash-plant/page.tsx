'use client';

import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Settings, 
  Factory, 
  ShieldCheck, 
  Zap, 
  Droplets, 
  Cpu, 
  Layout, 
  Sliders, 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function WashPlantPage() {
  const systemConfigurations = [
    {
      title: "MULTI-BAY VEHICLE & FLEET INSTALLATIONS",
      badge: "Fixed Multi-Bay",
      description: "Turnkey multi-bay wash installations for transport depots, bus & rail fleets, municipal yards, and logistics hubs. Centralised pressure generators plumbed to overhead 360° boom arms, high-pressure lances, and automated underbody rinse arrays.",
      specs: [
        "1 to 8 operator bays simultaneously",
        "Overhead 360° stainless steel booms",
        "Integrated high-foam lance stations",
        "Under-chassis automated wash bars",
        "Frost-protected thermal cabinet enclosures"
      ],
      icon: Layout,
      cta: "Configure Multi-Bay System →",
      href: "/industrial/brief"
    },
    {
      title: "AUTOMATED 360° MAT & PANEL WASH PLANTS",
      badge: "Conveyor Cleaning",
      description: "Continuous automated conveyor systems for temporary access roadways, heavy rig mats, and industrial panel cleaning. Delivers 40 GPM at up to 4,000 PSI from 20 rotating cleaning arms, stripping compacted mud and biological contamination in minutes.",
      specs: [
        "Variable-speed automated conveyor",
        "20 synchronized rotating spray arms",
        "Top, bottom & side 360° coverage",
        "Dual 1,000,000 BTU on-demand heaters",
        "Optional chlorination & biosecurity rinse"
      ],
      icon: RefreshCw,
      cta: "View Mat Wash Plant Specs →",
      href: "/industrial/mat-wash-plants"
    },
    {
      title: "CENTRALISED INDUSTRIAL PLANT ROOMS",
      badge: "The Power House",
      description: "Centralised, climate-controlled plant room engineering where heavy multi-pump triplex assemblies and heating systems live away from harsh wash bay environments. Engineered with N+1 redundancy to guarantee 99.9% uptime.",
      specs: [
        "Multi-pump triplex ceramic plungers",
        "Schedule 80 ASTM A53 heating coils",
        "Intelligent load-balanced pressure delivery",
        "Remote operator touchscreens & wireless fobs",
        "Natural gas, LPG, or high-amp electric power"
      ],
      icon: Cpu,
      cta: "Explore Central Plant Rooms →",
      href: "/industrial/wash-installations"
    },
    {
      title: "HYGIENIC FOOD & PHARMA WASH PLANTS",
      badge: "Grade 316 Stainless",
      description: "Sanitary wash plants built for food processing, abattoirs, dairy facilities, and pharmaceutical manufacturing. Engineered with Grade 316 stainless steel reticulation, thermal sanitisation (up to 95°C / 140°C steam), and wash-down electricals.",
      specs: [
        "Full AISI 316 stainless steel construction",
        "High-temperature 95°C hot water + dry steam",
        "Chemical dosing & sanitiser manifold integration",
        "IP66 wash-down control enclosures",
        "Automated CIP (Clean-In-Place) integration"
      ],
      icon: ShieldCheck,
      cta: "Enquire for Food Processing →",
      href: "/contact?enquiry=food-hygiene"
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Site Survey & Drainage Consultation",
      desc: "Our senior application engineers evaluate your site layout, water inflow, power supply, vehicle throughput, and Environment Agency drainage compliance."
    },
    {
      step: "02",
      title: "CAD Schematics & Hydraulic Sizing",
      desc: "We engineer precise 3D CAD models, hydraulic pressure drop calculations, pipework reticulation routes, and plant room layouts tailored to your bay count."
    },
    {
      step: "03",
      title: "Precision Workshop Fabrication",
      desc: "Master assembly with heavy-gauge American frames, Schedule 80 continuous-wound coils, industrial triplex pumps, and rigorous 48-hour pressure testing."
    },
    {
      step: "04",
      title: "On-Site Installation & PPM Handover",
      desc: "Full turnkey mechanical/electrical install, operator training, certification sign-off, and multi-site planned preventative maintenance scheduling."
    }
  ];

  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative z-10">
          <Breadcrumbs items={[
            { label: 'Bespoke Builds', href: '/bespoke' },
            { label: 'Wash Plants' }
          ]} />
          
          {/* Header Section */}
          <header className="mb-20 mt-12 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                // CUSTOM INDUSTRIAL INFRASTRUCTURE
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-barlow-condensed mb-8 text-7xl font-black text-alkota-black md:text-9xl uppercase italic leading-[0.8] tracking-tighter"
            >
              BESPOKE <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">WASH PLANTS.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-inter max-w-3xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider"
            >
              Permanent multi-bay wash installations, high-volume automated conveyor systems, and centralised plant rooms. Custom-engineered around your facility, power supply, throughput, and environmental obligations.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link 
                href="/contact?enquiry=wash-plant"
                className="inline-flex items-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-white hover:bg-alkota-black transition-colors"
              >
                <span>Discuss Wash Plant Build</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/industrial/brief"
                className="inline-flex items-center gap-3 border border-alkota-black/20 bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-alkota-black hover:border-alkota-orange hover:text-alkota-orange transition-colors"
              >
                <span>Request Site Audit</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </header>

          {/* Differentiation Notice: Wash Plants vs Aqueous Parts Washers */}
          <section className="mb-20 bg-white border-l-4 border-alkota-orange p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2 text-alkota-orange font-ibm-plex-mono text-[11px] uppercase tracking-widest font-bold">
                  <Sparkles className="h-4 w-4" />
                  <span>Looking for Component Degreasing Cabinets?</span>
                </div>
                <p className="text-xs md:text-sm text-alkota-silver uppercase tracking-wider font-inter">
                  <strong className="text-alkota-black font-semibold">Wash Plants</strong> are facility-scale installations, multi-bay vehicle bays, and automated mat conveyors. If you are looking for enclosed turntable degreasing cabinets for mechanical parts and engine components, explore our dedicated <strong className="text-alkota-black font-semibold">Aqueous Parts Washers</strong> range.
                </p>
              </div>
              <Link
                href="/machines/parts-washers"
                className="inline-flex items-center gap-2 bg-alkota-bg hover:bg-alkota-black hover:text-white text-alkota-black px-5 py-3 text-xs uppercase tracking-widest font-bold transition-all whitespace-nowrap border border-alkota-iron"
              >
                <span>Aqueous Parts Washers</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* System Configurations Grid */}
          <section className="mb-32">
            <div className="mb-12">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block mb-2">
                // ENGINEERING ARCHITECTURES
              </span>
              <h2 className="font-barlow-condensed text-5xl md:text-7xl font-black text-alkota-black uppercase italic tracking-tighter">
                PURPOSE-BUILT <span className="text-alkota-orange">CONFIGURATIONS.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {systemConfigurations.map((sys, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-alkota-iron p-8 md:p-10 flex flex-col justify-between group hover:border-alkota-orange transition-all duration-300 shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <sys.icon className="h-10 w-10 text-alkota-orange" />
                      <span className="font-ibm-plex-mono text-[10px] font-bold text-white bg-alkota-black px-3 py-1 uppercase tracking-widest">
                        {sys.badge}
                      </span>
                    </div>
                    <h3 className="font-barlow-condensed text-3xl md:text-4xl font-black text-alkota-black uppercase italic leading-tight mb-4">
                      {sys.title}
                    </h3>
                    <p className="font-inter text-xs md:text-sm text-alkota-silver leading-relaxed uppercase tracking-wider mb-8">
                      {sys.description}
                    </p>
                    
                    <div className="space-y-2.5 mb-8 border-t border-b border-alkota-iron/60 py-6">
                      <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase tracking-widest block mb-3 font-bold">
                        Key Capabilities:
                      </span>
                      {sys.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2.5 text-xs uppercase font-medium text-alkota-black tracking-wide">
                          <CheckCircle2 className="h-3.5 w-3.5 text-alkota-orange shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link 
                    href={sys.href}
                    className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-alkota-black group-hover:text-alkota-orange transition-colors pt-2"
                  >
                    <span>{sys.cta}</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Closed-Loop Water Treatment & Environmental Section */}
          <section className="mb-32 bg-alkota-black text-white p-10 md:p-16 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <Droplets className="h-96 w-96 text-white" />
            </div>

            <div className="relative z-10 max-w-4xl">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block mb-4">
                // ENVIRONMENTAL COMPLIANCE & WATER RECOVERY
              </span>
              <h2 className="font-barlow-condensed text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
                CLOSED-LOOP <span className="text-alkota-orange">WATER RECYCLING.</span>
              </h2>
              <p className="font-inter text-sm md:text-base text-alkota-smoke leading-relaxed uppercase tracking-wider mb-8">
                Operating a high-throughput wash plant requires stringent compliance with UK Environment Agency guidelines on trade effluent discharge. Alkota wash plants integrate automated solids separation, coalescing oil-water separation, and multi-stage media filtration to recycle up to 90% of process water.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10 mb-10">
                <div className="space-y-1">
                  <div className="font-barlow-condensed text-4xl font-black text-alkota-orange italic">90%</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-alkota-silver">Water Consumption Reduction</div>
                </div>
                <div className="space-y-1">
                  <div className="font-barlow-condensed text-4xl font-black text-alkota-orange italic">&lt; 5 PPM</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-alkota-silver">Hydrocarbon Discharge Level</div>
                </div>
                <div className="space-y-1">
                  <div className="font-barlow-condensed text-4xl font-black text-alkota-orange italic">EA / SEPA</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-alkota-silver">Full UK Regulatory Compliance</div>
                </div>
              </div>

              <Link 
                href="/water-treatment"
                className="inline-flex items-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-alkota-black transition-all"
              >
                <span>View Water Treatment Systems</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Workflow & Process */}
          <section className="mb-32">
            <div className="mb-12 text-center">
              <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange block mb-2">
                // FROM CONCEPT TO COMMISSIONING
              </span>
              <h2 className="font-barlow-condensed text-5xl md:text-7xl font-black text-alkota-black uppercase italic tracking-tighter">
                THE ENGINEERING <span className="text-alkota-orange">WORKFLOW.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-alkota-iron border border-alkota-iron">
              {workflowSteps.map((wf, idx) => (
                <div key={idx} className="bg-white p-8 md:p-10 flex flex-col justify-between hover:bg-alkota-bg transition-colors">
                  <div>
                    <span className="font-barlow-condensed text-6xl font-black text-alkota-black/15 block mb-4">
                      {wf.step}
                    </span>
                    <h4 className="font-barlow-condensed text-2xl font-black text-alkota-black uppercase italic mb-3">
                      {wf.title}
                    </h4>
                  </div>
                  <p className="font-inter text-xs text-alkota-silver uppercase leading-relaxed tracking-wider mt-4">
                    {wf.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="mb-24 bg-alkota-orange text-white p-12 md:p-16 text-center relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                READY TO ENGINEER YOUR <br />WASH PLANT FACILITY?
              </h2>
              <p className="font-inter text-sm md:text-base text-white/90 uppercase tracking-widest leading-relaxed">
                Connect directly with our UK application engineering team to review site plans, discuss wash throughput, or request an on-site feasibility survey.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact?enquiry=wash-plant"
                  className="bg-alkota-black text-white px-10 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-alkota-black transition-colors"
                >
                  Start Wash Plant Consultation
                </Link>
                <Link
                  href="/industrial/brief"
                  className="bg-white text-alkota-black px-10 py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-alkota-black hover:text-white transition-colors"
                >
                  Submit Project Brief
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
