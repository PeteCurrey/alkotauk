'use client';

import { motion } from 'framer-motion';
import { Droplet, Shield, Filter, Wind, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WaterTreatmentSection() {
  const systems = [
    {
      id: 'vfs',
      badge: 'Vacuum System',
      name: 'Alkota 8-VFS-1 Series',
      tagline: 'Portable Water Reclaiming System',
      capacity: 'High Volume Performance',
      size: 'Small Compact Design',
      features: ['Reduces 99% of free petroleum hydrocarbons', 'On-demand system', 'Discharge point of choice'],
      description: 'Protecting the environment from wash water runoff and complying with governmental storm drain regulations is simple, economical and effective with the Alkota Vacuum Filtration System.',
      icon: Filter,
      image: 'https://easttnchemicals.com/wp-content/uploads/2023/11/Water_Treatment_8_VFS_1_Alkota-1024x1024.jpg',
      link: '/machines/water-treatment/vfs'
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
      image: 'https://easttnchemicals.com/wp-content/uploads/2023/11/Water_Treatment_8_VFS_1_Alkota-1024x1024.jpg',
      link: '/machines/water-treatment/csf-10'
    },
    {
      id: 'evap',
      badge: 'Wastewater Evaporation',
      name: 'Alkota Evaporator Series',
      tagline: '15/20 NG LP Systems',
      capacity: '20 GPH Evaporation',
      size: 'Maximum 480 Gal/Day',
      features: ['Clean Burning & Quiet LP/NG', 'Defoamer pump standard', 'Massively reduces disposal costs'],
      description: 'You need an Alkota evaporator if you have water that is dirty and expensive to dispose of. This system evaporates the bulk of your wastewater cleanly and efficiently.',
      icon: Wind,
      image: 'https://www.alkota.com/wp-content/uploads/2018/07/20-30-Evaporator.jpg',
      link: '/machines/water-treatment/evaporator'
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron mb-20 rounded-[6px] shadow-tactile overflow-hidden">
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
                    className="w-full h-full object-cover object-center grayscale opacity-60 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                  {/* Overlay to ensure text readability without completely hiding the image */}
                  <div className="absolute inset-0 bg-alkota-steel/40 transition-opacity duration-700 group-hover:bg-alkota-steel/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-alkota-steel via-alkota-steel/60 to-transparent" />
                </div>

                {/* Upper Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border border-cyan-400/30 text-cyan-400 bg-cyan-950/40 backdrop-blur-sm rounded-[3px]">
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
                  className="relative z-10 flex items-center justify-between w-full border border-white/10 bg-alkota-black/50 backdrop-blur-md p-4 text-xs font-bold uppercase tracking-widest text-white transition-all group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:bg-alkota-black rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
                >
                  <span>View Specifications</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Environmental Stewardship Banner */}
        <div className="bg-gradient-to-r from-cyan-950/20 via-alkota-steel to-alkota-steel border border-cyan-400/20 p-10 md:p-14 rounded-[6px] shadow-tactile">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-cyan-400" />
                <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                  Discharge Compliance — UK Environment Agency
                </span>
              </div>
              
              <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-white mb-4">
                Regulations limiting wash water discharge?
              </h3>
              
              <p className="text-alkota-grey text-sm leading-relaxed max-w-2xl">
                Alkota systems help operators comply with UK Environment Agency and local authority requirements governing trade effluent discharge. By recovering, filtering, and recycling wash water, you prevent contaminated runoff from entering surface drains or watercourses.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/contact"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-cyan-400 px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-alkota-black hover:bg-cyan-300 transition-colors rounded-[4px] shadow-button hover:shadow-button-hover btn-tactile"
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
