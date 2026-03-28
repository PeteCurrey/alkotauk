'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor, getMockIndustries, safeFetch } from '@/sanity/client';
import { Cloud, Zap, Factory, Layout, Car, Box, Target, Trash2 } from 'lucide-react';
import BorderBeam from './ui/BorderBeam';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
  Cloud,
  Zap,
  Factory,
  Layout,
  Car,
  Box,
  Target,
  Trash2,
};

export default function IndustryGrid() {
  const [industries, setIndustries] = useState<any[]>([]);

  useEffect(() => {
    async function fetchIndustries() {
      const query = `*[_type == "industry"] | order(name asc) {
        _id,
        name,
        slug,
        icon,
        image,
        description
      }`;
      const data = await safeFetch(query, getMockIndustries());
      setIndustries(data);
    }
    fetchIndustries();
  }, []);

  return (
    <section className="bg-alkota-bg py-48 px-6 relative overflow-hidden">
      {/* Cinematic background label */}
      <div className="absolute top-20 left-10 pointer-events-none select-none opacity-[0.05]">
        <span className="font-barlow-condensed text-[30vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
          SECTORS
        </span>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-32 flex flex-col lg:flex-row items-end justify-between gap-12">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Operational Environments
              </span>
            </motion.div>
            <h2 className="font-barlow-condensed text-6xl font-black text-alkota-black md:text-8xl lg:text-9xl uppercase italic leading-[0.8] tracking-tighter">
              BUILT FOR YOUR <br />
              <span className="text-alkota-orange">INDUSTRY.</span>
            </h2>
          </div>
          <div className="max-w-md pb-4">
            <p className="font-inter text-xs uppercase tracking-[0.15em] text-alkota-silver leading-relaxed">
              Alkota systems are engineered for the world's most aggressive environments. Choose your sector to filter the fleet.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-alkota-iron border border-alkota-iron">
          {industries.map((industry: any, index: number) => {
            const Icon = iconMap[industry.icon] || Factory;
            const industrySlug = industry.slug?.current || industry.slug;
            
            // Per-industry fallback images
            const fallbackImages: Record<string, string> = {
              'agriculture': '/assets/industries/agriculture.png',
              'oil-gas': '/assets/industries/oil-gas.png',
              'mining': '/assets/industries/mining.png',
              'construction': '/assets/industries/construction.png',
              'fleet': '/assets/industries/fleet.png',
              'manufacturing': '/assets/industries/manufacturing.png',
              'food-processing': '/assets/industries/food-processing.png',
              'waste-management': '/assets/industries/waste-management.png'
            };

            const imageSrc = industry.image 
              ? (typeof industry.image === 'string' ? industry.image : urlFor(industry.image).url())
              : (fallbackImages[industrySlug] || '/assets/industries/construction.png');

            return (
              <Link 
                key={industry._id || industry.name}
                href={`/industries/${industrySlug}`}
                className="group relative h-[450px] overflow-hidden bg-white transition-all duration-500 hover:bg-alkota-bg"
              >
                {/* Background Image Reveal */}
                <div className="absolute inset-0 z-0 opacity-0 grayscale transition-all duration-1000 ease-out group-hover:opacity-60 group-hover:grayscale-0 group-hover:scale-110">
                  <Image 
                    src={imageSrc}
                    alt={industry.name}
                    fill
                    className="object-cover"
                    unoptimized={imageSrc.startsWith('http') || imageSrc.startsWith('/')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-alkota-bg via-transparent to-transparent" />
                </div>

                <BorderBeam 
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  size={400}
                  duration={12}
                  colorFrom="var(--color-alkota-orange)"
                  colorTo="var(--color-alkota-iron)"
                />

                <div className="relative z-10 flex h-full flex-col p-10 justify-between">
                  <div className="flex justify-between items-start">
                    <div className="border border-alkota-iron bg-alkota-bg/50 p-5 transition-all group-hover:border-alkota-orange/50 group-hover:bg-alkota-orange/10">
                      <Icon className="h-6 w-6 text-alkota-silver transition-colors group-hover:text-alkota-orange" />
                    </div>
                    <span className="font-ibm-plex-mono text-[10px] font-bold text-alkota-smoke group-hover:text-alkota-orange/40 transition-colors">
                      [ SEC_{index + 1} ]
                    </span>
                  </div>

                  <div>
                    <h3 className="font-barlow-condensed text-3xl font-black text-alkota-black uppercase italic tracking-tight mb-4 group-hover:text-alkota-orange transition-colors duration-300">
                      {industry.name}
                    </h3>
                    <div className="h-1 w-0 bg-alkota-orange transition-all duration-500 group-hover:w-full" />
                    <p className="mt-6 text-[9px] font-black uppercase tracking-[0.3em] text-alkota-silver opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      Access Infrastructure →
                    </p>
                  </div>
                </div>

                {/* Subtle ID watermark */}
                <div className="absolute bottom-4 right-4 text-[4vw] font-black text-alkota-black/5 italic select-none">
                    0{index + 1}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
