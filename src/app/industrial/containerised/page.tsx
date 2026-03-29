'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  ArrowRight, 
  Shield, 
  Truck, 
  Thermometer, 
  Box,
  ChevronDown,
  Lock,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const features = [
  { title: 'Rapid Deployment', icon: Truck, desc: 'ISO standard footprints allow for standard road, rail, or sea transport to any global site.' },
  { title: 'Climate Controlled', icon: Thermometer, desc: 'Insulated interiors with heavy-duty HVAC systems for operation in -20°C to +50°C environments.' },
  { title: 'Turnkey Integration', icon: Zap, desc: 'Pre-piped, pre-wired, and tested at our UK facility. Connect power and water for immediate operation.' },
  { title: 'High Security', icon: Lock, desc: 'Vandal-proof steel enclosures with high-security locking mechanisms to protect your assets on remote sites.' },
];

const configurations = [
  {
    size: '20ft ISO Hub',
    bestFor: 'Compact sites & rapid relocation',
    specs: [
      'Single or Twin Hot Water Units',
      'Dual 1,000L Buffer Tanks',
      'Basic Water Treatment Integration',
      'Personnel Side Door Access'
    ]
  },
  {
    size: '40ft Heavy Hub',
    bestFor: 'High-throughput infrastructure projects',
    specs: [
      'Up to 4 High-Pressure Units',
      'Integrated Multi-Stage Reclamation',
      'Workshop & Spares Storage Area',
      'Full-Width Barn Door Access'
    ]
  }
];

export default function ContainerisedSystems() {
  return (
    <main className="min-h-screen bg-alkota-bg text-alkota-black overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-white border-b border-alkota-iron">
        {/* Steel Plate Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')`,
            backgroundRepeat: 'repeat'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange mb-6 block">
              // Industrial System V.03
            </span>
            <h1 className="font-barlow-condensed text-6xl md:text-8xl lg:text-9xl font-black leading-[0.8] tracking-tighter italic mb-8 uppercase">
              CONTAINERISED <br />
              <span className="text-alkota-orange">WASH SYSTEMS.</span>
            </h1>
            <p className="font-inter text-xl text-alkota-silver max-w-2xl leading-relaxed mb-12">
              Portable, secure, and ready for deployment. Alkota containerised hubs provide a 
              professional, self-contained washing solution for high-security infrastructure 
              projects and remote site operations.
            </p>
            <Link
                href="/industrial/brief"
                className="inline-flex bg-alkota-black text-white px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-alkota-orange transition-all items-center gap-3"
              >
                Request Deployment Brief <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Deployment Advantage Grid */}
      <section className="py-24 px-6 bg-alkota-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white border border-alkota-iron p-8 group hover:border-alkota-orange transition-all">
                <feature.icon className="h-10 w-10 text-alkota-orange mb-8 transition-transform group-hover:scale-110" />
                <h4 className="font-barlow-condensed text-2xl font-black italic mb-4 uppercase">
                  {feature.title}
                </h4>
                <p className="text-xs text-alkota-silver leading-relaxed uppercase tracking-wider font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section (20ft vs 40ft) */}
      <section className="py-24 px-6 bg-alkota-black text-white relative overflow-hidden">
        {/* Abstract Box Sub-texture */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
           <Box className="h-[40vw] w-[40vw] text-white rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 text-center lg:text-left">
             <h2 className="font-barlow-condensed text-6xl md:text-7xl font-black italic tracking-tighter uppercase leading-none mb-4">
               CORE CONFIGURATIONS
             </h2>
             <p className="font-ibm-plex-mono text-[10px] font-black text-alkota-orange uppercase tracking-[0.5em]">
               // ENGINEERED_MODULARITY
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {configurations.map((config, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-12 hover:bg-white/10 transition-colors">
                <h3 className="font-barlow-condensed text-4xl font-black italic mb-2 uppercase text-alkota-orange">
                  {config.size}
                </h3>
                <p className="font-ibm-plex-mono text-[10px] font-bold text-alkota-smoke uppercase tracking-widest mb-10">
                  Best For: {config.bestFor}
                </p>
                <div className="space-y-4">
                  {config.specs.map((spec, j) => (
                    <div key={j} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
                       <div className="h-1 w-4 bg-alkota-orange" />
                       {spec}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Technical Callout */}
      <section className="py-24 px-6 bg-white border-b border-alkota-iron">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="relative aspect-[4/3] bg-alkota-steel overflow-hidden border border-alkota-iron group">
             <img 
               src="https://alkota.co.uk/assets/custom-build-C4FaO6d5.png" 
               alt="Containerised Hub" 
               className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
             />
             <div className="absolute top-6 left-6 bg-alkota-orange px-4 py-2 font-ibm-plex-mono text-[10px] font-black text-white">
               UK_INFRASTRUCTURE_SPEC
             </div>
           </div>

           <div>
             <h2 className="font-barlow-condensed text-5xl font-black italic tracking-tighter mb-8 leading-tight uppercase">
               OFF-GRID PERFORMANCE. <br />
               ON-SITE COMMAND.
             </h2>
             <div className="space-y-6 text-alkota-silver text-lg leading-relaxed font-inter mb-10">
               <p>
                 Alkota containerised wash systems are designed for projects where infrastructure is 
                 non-existent. We can integrate high-capacity diesel generators and advanced 
                 water filtration to create a completely autonomous washing hub.
               </p>
               <p>
                 Inside, the environment is engineered for the operator. Non-slip flooring, 
                 explosion-proof lighting, and ergonomic hose reel mounting ensure that safety 
                 is maintained even in high-pressure operational windows.
               </p>
             </div>
             <Link 
               href="/industrial/brief"
               className="font-ibm-plex-mono text-[11px] font-black uppercase tracking-[0.2em] text-alkota-black hover:text-alkota-orange flex items-center gap-3 transition-colors"
             >
               Configure Your Hub <ChevronDown className="h-3 w-3 -rotate-90" />
             </Link>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
