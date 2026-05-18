'use client';

import { motion } from 'framer-motion';
import { Droplet, Shield, Filter, Wind, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WaterTreatmentSection() {
  const systems = [
    {
      id: 'vfs',
      badge: 'Vacuum System',
      name: 'Alkota VFS Series',
      tagline: 'Vacuum Filtration System',
      capacity: '5 GPM Capacity',
      size: 'Small Compact Design',
      features: ['Multiple Phase Separation', 'Ease of Service', 'Minimises Disposal Cost'],
      description: 'The VFS is designed as a portable or stationary recovery system that guarantees environmental compliance while minimizing waste water disposal costs.',
      icon: Filter,
      image: '/assets/products/stationary-gas-fired.png',
      link: 'https://alkota.com/products/water-treatment-and-recovery-systems/pressure-washer-recycling-vacuum-filtration-system/'
    },
    {
      id: 'csf10',
      badge: 'Media Filtration',
      name: 'Alkota CSF-10',
      tagline: 'Media Sand Filtration',
      capacity: '10 GPM Capacity',
      size: '300 lbs Sand Capacity',
      features: ['Ultra Low Maintenance', 'High-Efficiency Media', 'Affordable Compliance'],
      description: 'A low-maintenance, cost-effective way of working with strict water conservation regulations that limit waste streams from pressure washers.',
      icon: Droplet,
      image: '/assets/products/industrial-pump.png',
      link: 'https://alkota.com/products/water-treatment-and-recovery-systems/water-treatment-systems/'
    },
    {
      id: 'evap',
      badge: 'Wastewater Evaporation',
      name: 'Alkota Evaporator Series',
      tagline: 'Natural Gas & LP Systems',
      capacity: 'High-Volume Evaporation',
      size: 'Quiet LP/NG Burner',
      features: ['Clean Burning & Quiet', 'Near-Zero Waste Footprint', 'Indoor & Outdoor Safe'],
      description: 'Evaporates the bulk of your wastewater on-site. Operating on clean LPG or natural gas, this stationary unit is clean burning, quiet, and highly efficient.',
      icon: Wind,
      image: '/assets/products/steam-oil.png',
      link: 'https://alkota.com/products/water-treatment-and-recovery-systems/evaporation-systems/'
    }
  ];

  return (
    <section className="bg-alkota-black py-40 px-6 border-t border-alkota-iron relative overflow-hidden z-20">
      {/* Decorative Cyan Water Treatment glow grid */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-cyan-500/5 skew-x-12 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-cyan-400" />
              <span className="font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                Environmental Compliance
              </span>
            </div>
            
            <h2 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase italic text-white leading-tight tracking-tight">
              Water Recovery & <br />
              <span className="text-cyan-400">Filtration Systems</span>
            </h2>
          </div>
          
          <div className="lg:col-span-4">
            <p className="text-alkota-grey font-medium text-lg leading-relaxed">
              Comply with strict environmental and utility regulations prohibiting the discharge of wash water into sewers and streams. Alkota has you covered on-site, mobile, and stationary.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron mb-20">
          {systems.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <div 
                key={sys.id}
                className="group relative flex flex-col justify-between bg-alkota-steel p-10 transition-all overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-alkota-black">
                  <img
                    src={sys.image}
                    alt={sys.name}
                    className="w-full h-full object-cover object-center grayscale opacity-40 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105"
                  />
                  {/* Overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-alkota-steel/90 transition-opacity duration-700 group-hover:bg-alkota-steel/60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-alkota-steel via-alkota-steel/80 to-transparent" />
                </div>

                {/* Upper Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border border-cyan-400/30 text-cyan-400 bg-cyan-950/40 backdrop-blur-sm">
                      {sys.badge}
                    </span>
                    <Icon className="h-6 w-6 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-white mb-2 group-hover:text-cyan-400 transition-colors duration-500">
                    {sys.name}
                  </h3>
                  
                  <p className="font-ibm-plex-mono text-xs font-bold text-alkota-orange uppercase tracking-wider mb-6">
                    {sys.tagline}
                  </p>

                  <p className="text-alkota-grey leading-relaxed mb-8 text-sm group-hover:text-white/90 transition-colors duration-500">
                    {sys.description}
                  </p>

                  {/* Highlights Strip */}
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 mb-8">
                    <div>
                      <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-wider text-alkota-grey mb-1 group-hover:text-cyan-400/80 transition-colors duration-500">Capacity</span>
                      <span className="font-barlow-condensed text-lg font-bold text-white uppercase">{sys.capacity}</span>
                    </div>
                    <div>
                      <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-wider text-alkota-grey mb-1 group-hover:text-cyan-400/80 transition-colors duration-500">Architecture</span>
                      <span className="font-barlow-condensed text-lg font-bold text-white uppercase">{sys.size}</span>
                    </div>
                  </div>

                  {/* Specs Bullets */}
                  <ul className="space-y-3 mb-10">
                    {sys.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-xs text-white/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Button */}
                <Link
                  href={sys.link}
                  className="relative z-10 flex items-center justify-between w-full border border-white/10 bg-alkota-black/50 backdrop-blur-md p-4 text-xs font-bold uppercase tracking-widest text-white transition-all group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:bg-alkota-black"
                >
                  <span>View Specifications</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Environmental Stewardship Banner */}
        <div className="bg-gradient-to-r from-cyan-950/20 via-alkota-steel to-alkota-steel border border-cyan-400/20 p-10 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-cyan-400" />
                <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                  EPA Regulatory Compliance Verified
                </span>
              </div>
              
              <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-white mb-4">
                Regulations limiting wash water discharge?
              </h3>
              
              <p className="text-alkota-grey text-sm leading-relaxed max-w-2xl">
                Alkota systems help you comply with strict local utility and Environmental Agency regulations. By recovering, filtering, and cycling wash water, you prevent toxic runoffs from entering public sewers or surface streams.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/contact"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-cyan-400 px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-alkota-black hover:bg-cyan-300 transition-colors"
              >
                <span>Consult An Advisor</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
