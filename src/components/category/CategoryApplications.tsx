'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Truck, Factory, Wheat, Utensils, Construction, ArrowRight } from 'lucide-react';

interface CategoryApplicationsProps {
  categorySlug: string;
}

export default function CategoryApplications({ categorySlug }: CategoryApplicationsProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const applications = [
    {
      title: 'Transport & Fleet Haulage',
      icon: Truck,
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
      challenge: 'Road grime, diesel soot, and salt build-up on chassis and curtain-siders requiring fast turnarounds to keep vehicles on the road.',
      solution: 'High-pressure continuous hot water or high-flow cold water wash bays that strip traffic film in a single pass without paint damage.'
    },
    {
      title: 'Plant Hire & Heavy Earthmoving',
      icon: Construction,
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      challenge: 'Compacted clay, aggregate slurry, and hydraulic leaks on excavators, dumpers, and access mats.',
      solution: 'High-output 300+ bar hot water skids and high-flow cold wash plants built to operate continuously in wet, harsh yard conditions.'
    },
    {
      title: 'Agriculture & Livestock Facilities',
      icon: Wheat,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      challenge: 'Biosecurity compliance, pathogen eradication, and dried muck removal across poultry houses, livestock transport, and tractors.',
      solution: 'Thermal steam sanitisation combined with high-flow pressure washing to eliminate pathogens without excessive chemical runoff.'
    },
    {
      title: 'Food & Beverage Processing',
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      challenge: 'Fats, proteins, sugars, and Listeria biofilms on conveyors, packaging equipment, and stainless food preparation lines.',
      solution: '140°C dry vapour steam cleaners that sanitise on contact with low moisture, preventing floor flooding and bacterial aerosolization.'
    }
  ];

  const current = applications[activeTab];

  return (
    <section className="bg-[#FAFAF8] border-b border-[#E5E5E0] py-24 px-6 sm:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-medium uppercase tracking-[0.25em] text-[#FF6900] block mb-2">
            Real-World Sector Applications
          </span>
          <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-tight mb-4">
            Built for UK Industrial Environments
          </h2>
          <p className="font-normal text-sm sm:text-base text-[#666] leading-relaxed">
            Alkota systems are specified by operations managers across the United Kingdom where equipment failure is not an option.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {applications.map((app, idx) => {
            const Icon = app.icon;
            const isSelected = idx === activeTab;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`p-4 border text-left transition-all rounded-[4px] ${
                  isSelected
                    ? 'bg-[#1A1A18] text-white border-[#1A1A18]'
                    : 'bg-white text-[#555] border-[#E5E5E0] hover:border-[#CCC]'
                }`}
              >
                <Icon className={`h-5 w-5 mb-2 ${isSelected ? 'text-[#FF6900]' : 'text-[#888]'}`} />
                <span className="block font-medium text-xs uppercase tracking-wider">{app.title}</span>
              </button>
            );
          })}
        </div>

        {/* Application Card */}
        <div className="bg-white border border-[#E5E5E0] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm rounded-[6px] shadow-tactile">
          <div className="lg:col-span-7 relative min-h-[320px] bg-[#EEE]">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6900] block mb-1">
                Sector Case Overview
              </span>
              <h3 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-[#1A1A18] mb-6">
                {current.title}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <strong className="font-mono text-[10px] uppercase tracking-wider text-[#888] block mb-1">Operational Challenge:</strong>
                  <p className="text-[#555] font-normal leading-relaxed">{current.challenge}</p>
                </div>

                <div>
                  <strong className="font-mono text-[10px] uppercase tracking-wider text-[#FF6900] block mb-1">Alkota Solution:</strong>
                  <p className="text-[#2A2A28] font-normal leading-relaxed">{current.solution}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E5E0] mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1A1A18] hover:text-[#FF6900] no-underline"
              >
                <span>Discuss Your Site Requirements</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
