'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  Droplet, Filter, Wind, ChevronRight, ShieldCheck, 
  Settings, CheckCircle2, AlertTriangle, ArrowLeft 
} from 'lucide-react';

interface Props {
  system: any;
  slug: string;
}

export default function WaterTreatmentDetailClient({ system, slug }: Props) {
  const Icon = slug === 'vfs' ? Filter : slug === 'csf-10' ? Droplet : Wind;

  return (
    <main className="bg-alkota-bg pt-32 pb-0 overflow-x-hidden min-h-screen">
      <Navigation />

      {/* Breadcrumbs Top Strip */}
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl mb-8">
        <Breadcrumbs 
          items={[
            { label: 'Water Treatment', href: '/water-treatment' },
            { label: system.name }
          ]} 
        />
      </div>

      {/* Hero Header */}
      <section className="container mx-auto px-6 sm:px-12 max-w-7xl mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#FF6900]/10 text-[#FF6900] border border-[#FF6900]/30 px-3 py-1 font-mono text-xs uppercase tracking-widest font-semibold">
                {system.badge}
              </span>
              <span className="font-mono text-xs text-[#888] uppercase tracking-wider">
                {system.capacity}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extralight uppercase tracking-tight text-white mb-4">
              {system.name}
            </h1>
            
            <p className="text-xl font-light text-[#FF6900] mb-6">
              {system.tagline}
            </p>
            
            <p className="text-base text-[#AAA] leading-relaxed mb-8 max-w-xl">
              {system.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href={`/contact?subject=Water Treatment Inquiry: ${system.name}`}
                className="bg-[#FF6900] hover:bg-[#FF6900]/90 text-white px-8 py-3.5 font-mono text-xs uppercase tracking-widest transition-all font-semibold inline-flex items-center gap-2"
              >
                Request Technical Quote <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/water-treatment"
                className="border border-[#333] hover:border-white text-white px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Range
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border border-[#222] bg-[#111] p-6 group">
              <div className="aspect-square bg-black/40 flex items-center justify-center p-8 relative overflow-hidden">
                <img 
                  src={system.image} 
                  alt={system.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications & Blueprint Grid */}
      <section className="bg-[#111] border-y border-[#222] py-16 mb-16">
        <div className="container mx-auto px-6 sm:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Overview */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-light text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                <Settings className="w-5 h-5 text-[#FF6900]" /> Engineering Overview
              </h2>
              <p className="text-sm text-[#CCC] leading-relaxed font-light mb-8">
                {system.overview}
              </p>

              <h3 className="text-lg font-light text-white mb-4 uppercase tracking-wider">
                Key Architectural Advantages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {system.features.map((feat: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5 bg-black/30 border border-[#222] p-3.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6900] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#AAA] font-light leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Specs Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#161616] border border-[#262626] p-6">
                <span className="font-mono text-xs text-[#FF6900] uppercase tracking-widest block mb-4">
                  System Specifications
                </span>
                <div className="divide-y divide-[#222]">
                  {system.specs.map((spec: any, i: number) => (
                    <div key={i} className="py-3 flex justify-between items-center text-xs">
                      <span className="text-[#888] font-mono">{spec.label}</span>
                      <span className="text-white font-mono font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#222] bg-black/40 p-4 border border-[#333]">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-xs text-white block font-medium">Environmental Compliance</span>
                      <span className="text-[11px] text-[#888] block">Meets UK Environment Agency PPG13 guidance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
