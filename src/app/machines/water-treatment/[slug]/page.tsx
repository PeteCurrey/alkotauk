'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { notFound } from 'next/navigation';
import { 
  Droplet, Filter, Wind, ChevronRight, ShieldCheck, 
  Settings, CheckCircle2, AlertTriangle, ArrowLeft 
} from 'lucide-react';

const SYSTEMS_DB: Record<string, any> = {
  'vfs': {
    id: 'vfs',
    badge: 'Vacuum System',
    name: 'Alkota 8-VFS-1 Series',
    tagline: 'Portable Water Reclaiming System',
    capacity: 'High Volume Performance',
    size: 'Small Compact Design',
    features: [
      'Reduces 99% of free petroleum hydrocarbons load',
      'On-demand system with high volume performance',
      'Easy to maintain with minimal operational costs',
      'Trailer Mount or portable wheel kit available',
      'Discharge point of choice'
    ],
    description: 'Protecting the environment from wash water runoff and complying with governmental storm drain regulations is simple, economical and effective with the Alkota Vacuum Filtration System (VFS).',
    icon: Filter,
    image: 'https://easttnchemicals.com/wp-content/uploads/2023/11/Water_Treatment_8_VFS_1_Alkota-1024x1024.jpg',
    overview: 'The VFS is designed to be used as a portable or stationary treatment system that guarantees results with ease of service while minimizing disposal cost. This automatic and easy to use zero or controlled discharge system has been uniquely designed to keep businesses operating without expensive filter cost, down time and additional manpower. The first two phases of filtration operate and flow under a vacuum or negative void to enhance flow and extended filter life.',
    specs: [
      { label: 'Hydrocarbon Removal', value: 'Up to 99%' },
      { label: 'Design', value: 'Small Compact Frame' },
      { label: 'Portability', value: 'Trailer or Wheel Kit' },
      { label: 'Filtration', value: 'Negative Void Vacuum' }
    ]
  },
  'csf-10': {
    id: 'csf-10',
    badge: 'Media Filtration',
    name: 'Alkota CSF-10',
    tagline: 'Media Sand Filtration',
    capacity: '10 GPM Capacity',
    size: '300 lbs Sand Capacity',
    features: ['Ultra Low Maintenance', 'High-Efficiency Media', 'Affordable Compliance', 'Automated Backwash Options'],
    description: 'A low-maintenance, cost-effective way of working with strict water conservation regulations that limit waste streams from pressure washers.',
    icon: Droplet,
    image: 'https://www.alkota.com/wp-content/uploads/2020/06/VFS-System.png',
    overview: 'The CSF-10 Media Filtration unit is the definitive solution for stationary wash bays and industrial operations. By passing wastewater through 300 lbs of highly efficient filtration media, it removes suspended solids, oils, and greases, allowing for safe discharge or closed-loop recycling.',
    specs: [
      { label: 'Flow Rate', value: 'Up to 10 GPM' },
      { label: 'Media Capacity', value: '300 lbs Custom Sand/Gravel' },
      { label: 'Maintenance', value: 'Low / Easy Backwash' },
      { label: 'Footprint', value: 'Vertical Space-Saving Tank' }
    ]
  },
  'evaporator': {
    id: 'evaporator',
    badge: 'Wastewater Evaporation',
    name: 'Alkota Evaporator Series',
    tagline: '15/20 NG LP Systems',
    capacity: '20 GPH Evaporation',
    size: 'Maximum 480 Gal/Day',
    features: [
      'Clean Burning & Quiet LP/NG',
      'Defoamer pump standard',
      '4" drain port included',
      '115V High Efficiency Burner',
      'Massively reduces disposal costs'
    ],
    description: 'You need an Alkota evaporator if you have water that is dirty and expensive to dispose of. This system evaporates the bulk of your wastewater cleanly and efficiently.',
    icon: Wind,
    image: 'https://www.alkota.com/wp-content/uploads/2018/07/20-30-Evaporator.jpg',
    overview: 'Operating on LP or natural gas, the Alkota Evaporator Series is clean burning, quiet, and can be used almost anywhere. It effectively evaporates the bulk of your wastewater, leaving only a small fraction of solid waste for disposal. With a maximum rate of 20 gallons per hour (up to 480 gallons per day), it is the ultimate tool for cutting expensive wastewater removal costs.',
    specs: [
      { label: 'Evaporation Rate', value: '20 Gallons Per Hour' },
      { label: 'Max Daily Volume', value: '480 Gallons Per Day' },
      { label: 'Burner Power', value: '115V Electric + LP/NG' },
      { label: 'Hardware', value: 'Defoamer Pump / 4" Drain' }
    ]
  }
};

export default function WaterTreatmentProductPage({ params }: { params: { slug: string } }) {
  const system = SYSTEMS_DB[params.slug];

  if (!system) {
    notFound();
  }

  const Icon = system.icon;

  return (
    <main className="bg-alkota-bg pt-32 pb-0 overflow-x-hidden min-h-screen">
      <Navigation />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Background Watermark */}
        <div className="absolute top-20 right-0 pointer-events-none select-none opacity-[0.03] z-0">
          <span className="font-barlow-condensed text-[30vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
            {system.badge.split(' ')[0]}
          </span>
        </div>

        <div className="relative z-10">
          <Breadcrumbs 
            items={[
              { label: 'Fleet', href: '/machines' }, 
              { label: 'Water Treatment', href: '/#water-treatment' },
              { label: system.name }
            ]} 
          />
          
          <div className="mt-12 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Product Images */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-alkota-iron/20 border border-alkota-iron p-8 lg:p-16 relative group"
            >
              <div className="absolute top-4 left-4 z-20">
                <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border border-cyan-400 text-cyan-500 bg-cyan-950/10 backdrop-blur-sm shadow-xl">
                  {system.badge}
                </span>
              </div>
              <div className="aspect-square relative flex items-center justify-center">
                <img 
                  src={system.image} 
                  alt={system.name}
                  className="w-full h-full object-contain filter drop-shadow-2xl mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Right: Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Icon className="h-8 w-8 text-cyan-500" />
                <h1 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase italic text-alkota-black leading-none">
                  {system.name}
                </h1>
              </div>

              <p className="font-ibm-plex-mono text-xs font-bold text-alkota-orange uppercase tracking-widest mb-8">
                {system.tagline}
              </p>

              <div className="prose prose-lg text-alkota-silver font-medium leading-relaxed mb-12">
                <p>{system.overview}</p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                {system.specs.map((spec: any, i: number) => (
                  <div key={i} className="bg-white border border-alkota-iron p-6">
                    <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-wider text-alkota-silver mb-2">
                      {spec.label}
                    </span>
                    <span className="font-barlow-condensed text-xl font-bold text-alkota-black uppercase">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Core Features */}
              <div className="bg-alkota-black p-8 mb-12">
                <h3 className="font-barlow-condensed text-2xl font-bold text-white uppercase italic mb-6">
                  Key Capabilities
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {system.features.map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-alkota-grey text-sm">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center gap-3 bg-cyan-500 px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-cyan-600 transition-colors"
                >
                  <span>Request Quote</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#water-treatment"
                  className="flex-1 flex items-center justify-center gap-3 bg-white border border-alkota-iron px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-alkota-black hover:bg-alkota-bg transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Range</span>
                </Link>
              </div>

            </motion.div>
          </div>
          
        </div>
      </div>
      
      {/* Environmental Warning Strip */}
      <div className="bg-alkota-black border-y border-alkota-iron py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-8 w-8 text-cyan-500 shrink-0" />
            <div>
              <h4 className="font-barlow-condensed text-xl font-bold text-white uppercase italic">UK Environmental Compliance</h4>
              <p className="text-alkota-grey text-xs">Meets or exceeds local discharge and wastewater containment regulations.</p>
            </div>
          </div>
          <AlertTriangle className="h-8 w-8 text-alkota-orange/20" />
        </div>
      </div>
    </main>
  );
}
