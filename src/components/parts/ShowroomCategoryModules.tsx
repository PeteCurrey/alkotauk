'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { MASTER_TAXONOMY, PartCategoryDefinition } from '@/lib/parts/taxonomy';

interface Props {
  categories?: PartCategoryDefinition[];
}

export default function ShowroomCategoryModules({ categories = MASTER_TAXONOMY }: Props) {
  const editorialCategories = [
    {
      num: '01',
      title: 'Spray Guns & Lances',
      desc: 'Alkota Easy-Pull insulated guns, 1000mm stainless lances, and high-temperature steam dump valves.',
      href: '/parts-attachments/trigger-guns',
      price: 'From £28.00 ex VAT',
      image: '/assets/products/trigger-gun.png',
    },
    {
      num: '02',
      title: 'Nozzles & Turbo Tips',
      desc: 'Quick-release colour-coded fan tips, rotating ceramic dirt-killers, and downstream chemical injectors.',
      href: '/parts-attachments/lances-nozzles',
      price: 'From £5.50 ex VAT',
      image: '/assets/products/spray-nozzles.png',
    },
    {
      num: '03',
      title: 'Heating Coils & Burners',
      desc: 'Schedule 80 continuous seamless coils, Beckett AFG burner heads, and 240V ignition transformers.',
      href: '/parts-attachments/burners',
      price: 'OEM Factory Stock',
      image: '/assets/products/430s.png',
    },
    {
      num: '04',
      title: 'Cleaning Chemistry',
      desc: 'RoadForce touchless TFR, GreaseCut high-alkaline degreasers, and AlumaRestore acid brighteners.',
      href: '/parts-attachments/chemicals',
      price: 'From £28.50 ex VAT',
      image: '/assets/industries/fleet.png',
    },
  ];

  return (
    <section className="py-32 px-6 sm:px-12 lg:px-24 bg-white text-alkota-black border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E8E8E4] pb-10">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange block mb-2 font-medium">
              Component Range
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
            >
              Shop by component.
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="text-sm text-[#666] font-normal leading-relaxed">
              Every part, assembly, and attachment organized by task. Direct-fit spares, Swiss rotary tooling, and heavy-duty hose management.
            </p>
            <Link
              href="/parts-attachments/categories"
              className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs text-alkota-black hover:text-alkota-orange uppercase tracking-wider transition-colors font-medium"
            >
              <span>View all 16 categories index</span>
              <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
            </Link>
          </div>
        </div>

        {/* Unboxed 4-Column Editorial Runway */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {editorialCategories.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="group flex flex-col justify-between space-y-6 no-underline text-inherit"
            >
              {/* Product Visual Area on Soft Neutral Canvas (No Box Borders) */}
              <div className="relative aspect-square bg-[#FAF9F5] flex items-center justify-center p-8 overflow-hidden transition-colors group-hover:bg-[#F2F0E8]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-[85%] max-w-[85%] object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 font-ibm-plex-mono text-xs text-[#888] font-light">
                  {item.num}
                </span>
              </div>

              {/* Editorial Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-light text-[#0A0A0A] tracking-tight uppercase group-hover:text-alkota-orange transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#666] font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Price & Link */}
              <div className="pt-3 border-t border-[#E8E8E4] flex items-center justify-between font-ibm-plex-mono text-xs">
                <span className="text-[#888] text-[10px]">{item.price}</span>
                <span className="text-alkota-black group-hover:text-alkota-orange uppercase tracking-wider font-medium flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-alkota-orange" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
