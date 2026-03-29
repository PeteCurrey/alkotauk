'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  ArrowRight, 
  Clock, 
  Droplets, 
  Users, 
  ShieldCheck, 
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  { 
    title: 'Loading', 
    desc: 'Access mats are loaded onto the intake conveyor. Heavy debris is pre-loosened.',
    icon: '01'
  },
  { 
    title: 'High-Pressure Scour', 
    desc: 'Dual-axis spray bars deliver 3,000 PSI at 40 LPM to emulsify compacted mud.',
    icon: '02'
  },
  { 
    title: 'Biosecurity Rinse', 
    desc: 'Heated water ensures elimination of soil-borne pathogens and invasive species.',
    icon: '03'
  },
  { 
    title: 'Water Reclamation', 
    desc: 'Integrated filtration separates solids and oils, recycling 90% of process water.',
    icon: '04'
  },
  { 
    title: 'Deployment', 
    desc: 'Clean mats emerge, ready for immediate transport to sensitive environments.',
    icon: '05'
  }
];

const stats = [
  { label: 'Labour Reduction', value: '75%', icon: Users, desc: 'Compared to manual pressure washing.' },
  { label: 'Water Savings', value: '90%', icon: Droplets, desc: 'Via closed-loop reclamation systems.' },
  { label: 'Throughput', value: '180', icon: Clock, desc: 'Mats cleaned per 8-hour shift.' },
];

const specs = [
  { param: 'Operating Pressure', value: '2,500 - 3,500 PSI' },
  { param: 'Flow Rate per Bay', value: '35 - 45 LPM' },
  { param: 'Process Temperature', value: '60°C - 80°C' },
  { param: 'Power Requirement', value: '3-Phase 400V / 63A' },
  { param: 'Belt Width', value: 'Up to 2.5 Meters' },
  { param: 'Filtration Stage', value: '3-Stage Solid/Oil Separation' },
];

export default function MatWashPlants() {
  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-white border-b border-alkota-iron">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange mb-6 block">
              // Industrial System V.02
            </span>
            <h1 className="font-barlow-condensed text-6xl md:text-8xl lg:text-9xl font-black leading-[0.8] tracking-tighter italic mb-8 uppercase">
              ACCESS MAT <br />
              <span className="text-alkota-orange">WASH PLANTS.</span>
            </h1>
            <p className="font-inter text-xl text-alkota-silver max-w-2xl leading-relaxed mb-12">
              The authoritative solution for high-volume biosecurity cleaning. 
              Engineered for the Oil & Gas, Renewables, and Utilities sectors 
              to ensure absolute compliance on sensitive site deployments.
            </p>
            <Link
                href="/industrial/brief"
                className="inline-flex bg-alkota-black text-white px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-alkota-orange transition-all items-center gap-3"
              >
                Request Technical Brief <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5-Step Visual Process */}
      <section className="py-24 px-6 relative overflow-hidden bg-alkota-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
             <h2 className="font-barlow-condensed text-5xl font-black italic tracking-tighter">THE SYSTEM PROCESS</h2>
             <div className="h-1 w-24 bg-alkota-orange mt-4" />
          </div>

          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-0 lg:items-start">
             {/* Progress Line */}
             <div className="hidden lg:block absolute top-10 left-0 w-full h-px border-t border-dashed border-alkota-silver/50 z-0" />
             
             {steps.map((step, i) => (
               <div key={i} className="relative z-10 lg:w-1/5">
                 <div className="flex flex-col items-center lg:items-start">
                   <div className="w-20 h-20 bg-alkota-black border-4 border-alkota-orange flex items-center justify-center font-barlow-condensed text-4xl font-black text-white mb-6 italic transition-all group-hover:bg-alkota-orange">
                     {step.icon}
                   </div>
                   <h4 className="font-barlow-condensed text-2xl font-black italic mb-3 group-hover:text-alkota-orange transition-colors">
                     {step.title}
                   </h4>
                   <p className="text-xs text-alkota-silver leading-relaxed uppercase tracking-wider text-center lg:text-left pr-4">
                     {step.desc}
                   </p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ROI & Impact Stats */}
      <section className="py-24 px-6 bg-alkota-black text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
             {stats.map((stat, i) => (
               <div key={i} className="bg-alkota-black p-12 text-center group">
                 <stat.icon className="h-8 w-8 text-alkota-orange mx-auto mb-8 transition-transform group-hover:scale-110" />
                 <div className="font-barlow-condensed text-8xl font-black italic leading-none mb-4 group-hover:text-alkota-orange transition-colors">
                   {stat.value}
                 </div>
                 <h4 className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                   {stat.label}
                 </h4>
                 <p className="text-xs text-alkota-smoke uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
                   {stat.desc}
                 </p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Technical Specification Table */}
      <section className="py-24 px-6 bg-white overflow-hidden relative">
        {/* Steel Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')`,
            backgroundRepeat: 'repeat'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="font-barlow-condensed text-5xl font-black italic tracking-tighter mb-10">SYSTEM PERFORMANCE</h2>
            <div className="border-t border-alkota-iron">
              {specs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-5 border-b border-alkota-iron group/row">
                  <span className="font-ibm-plex-mono text-[11px] font-black uppercase tracking-widest text-alkota-silver group-hover/row:text-alkota-orange transition-colors">
                    {spec.param}
                  </span>
                  <span className="font-barlow-condensed text-2xl font-black text-alkota-black italic">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-alkota-bg p-8 border border-alkota-iron">
              <div className="flex gap-4">
                <Info className="h-6 w-6 text-alkota-orange shrink-0" />
                <p className="font-inter text-sm text-alkota-silver leading-relaxed italic">
                  Systems can be modularly expanded to support twin-lane processing or integrated with site-wide wash bay management software.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-alkota-steel/30 p-12 border border-alkota-iron">
             <h3 className="font-barlow-condensed text-4xl font-black italic mb-8 uppercase leading-tight">
               ENGINEERED FOR <br />
               ENVIRONMENTAL <br />
               PERMITTING COMPLIANCE.
             </h3>
             <div className="space-y-6 text-alkota-silver text-lg leading-relaxed mb-10">
               <p>
                 Our mat wash plants are designed specifically to meet the cross-contamination 
                 protocols required for Tier 1 contractors.
               </p>
               <p>
                 By integrating three-stage solid/oil separation, we ensure that process water 
                 meets the required discharge standards or is retained within a zero-emission 
                 closed-loop circuit.
               </p>
             </div>
             <Link 
               href="/industrial/brief"
               className="font-ibm-plex-mono text-[11px] font-black uppercase tracking-[0.2em] text-alkota-black hover:text-alkota-orange flex items-center gap-3 transition-colors"
             >
               Start Project Brief <ChevronDown className="h-3 w-3 -rotate-90" />
             </Link>
          </div>
        </div>
      </section>

      {/* Legal & Regulatory Cards */}
      <section className="py-24 px-6 bg-alkota-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-barlow-condensed text-5xl font-black italic tracking-tighter uppercase leading-none">
              REGULATORY CONTEXT
            </h2>
            <p className="font-ibm-plex-mono text-[10px] font-black text-alkota-orange uppercase tracking-[0.4em] mt-2">
              // COMPLIANCE_FRAMEWORK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Environmental Permitting Regulations 2016',
                desc: 'Preventing the unauthorised discharge of silt and oily water into the UK water table. Our systems exceed discharge quality standards.'
              },
              {
                title: 'Biosecurity Protocols',
                desc: 'Strict adherence to pathogenic soil-borne pathogen removal. Heated wash cycles ensure 99.9% elimination of invasive flora/fauna.'
              },
              {
                title: 'SSSI Protected Sites',
                desc: 'Approved for operation adjacent to Sites of Special Scientific Interest (SSSI). Zero-leak containment provided as standard.'
              },
              {
                title: 'ISO 14001 Integration',
                desc: 'Full documentation and data logging capability to support corporate environmental management system requirements.'
              }
            ].map((card, i) => (
              <div key={i} className="bg-white border-l-4 border-alkota-black p-10 shadow-sm hover:shadow-xl transition-all">
                <h4 className="font-barlow-condensed text-2xl font-black italic mb-4 uppercase">
                  {card.title}
                </h4>
                <p className="text-sm text-alkota-silver leading-relaxed uppercase tracking-wider font-medium">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Link 
               href="https://www.gov.uk/guidance/pollution-prevention-for-businesses" 
               target="_blank"
               className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-alkota-silver hover:text-alkota-orange transition-colors"
             >
               View UK Pollution Prevention Guidelines <ExternalLink className="h-3 w-3" />
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
