'use client';

import { BookOpen, Award, Clock, ArrowRight, Play, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface TrainingModule {
  id: string;
  code: string;
  title: string;
  type: 'Guide' | 'Certification' | 'Technical' | 'Video Walkthrough';
  duration: string;
  summary: string;
  topics: string[];
}

const MODULES: TrainingModule[] = [
  {
    id: 'tr-1',
    code: 'MOD-01',
    title: 'High-Pressure Safety & Water Jetting Association (WJA) Standards',
    type: 'Certification',
    duration: '45 mins',
    summary: 'Operator safety guidelines, burst pressure hose inspections, emergency shutdown procedures, and PPE requirements for 300+ bar wash equipment.',
    topics: ['WJA Codes of Practice', 'Hydrostatic Burst Ratings', 'Operator Ergonomics', 'Nozzle Safety']
  },
  {
    id: 'tr-2',
    code: 'MOD-02',
    title: 'Commercial Wash Bay Drainage, Silt Traps & Interceptor Maintenance',
    type: 'Guide',
    duration: '30 mins',
    summary: 'Practical protocol for maintaining BS EN 858 Class 1 coalescing interceptors, sediment basket cleaning schedules, and sludge level logging.',
    topics: ['Trade Effluent Compliance', 'Silt Trap Servicing', 'Coalescing Filter Washing', 'Waste Transfer Notes']
  },
  {
    id: 'tr-3',
    code: 'MOD-03',
    title: 'Schedule 80 Coil Descaling, Burner Flue Gas Balancing & Thermal Tuning',
    type: 'Technical',
    duration: '60 mins',
    summary: 'Engineering maintenance guide for diagnosing scale build-up, acid circulating flushes, smoke spot testing, and air-fuel ratio calibration.',
    topics: ['Hoop Stress Resilience', 'Descaling Acid Protocols', 'Flue Gas Analysis', 'Electrodes Calibration']
  },
  {
    id: 'tr-4',
    code: 'MOD-04',
    title: 'Automated Aqueous Parts Washer Operation, pH Monitoring & Oil Skimming',
    type: 'Video Walkthrough',
    duration: '25 mins',
    summary: 'Optimising cleaning cycles on heated rotary parts degreasers, detergent bath maintenance, disc oil skimmer adjustments, and VOC compliance.',
    topics: ['Alkaline Detergents', 'Disc Skimmer Setup', 'Spray Manifold Balancing', 'VOC Compliance']
  }
];

export default function TrainingAndLearning() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-white border-b border-[#E5E5E0]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-light font-mono">
              Chapter 04 // Professional Development
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-none">
              Training & Learning.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666] max-w-md font-normal">
            Operational guides, health & safety modules, and technical engineering curriculum for plant managers, fleet technicians, and operators.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MODULES.map((mod) => (
            <div
              key={mod.id}
              className="bg-[#FAFAF8] border border-[#E5E5E0] p-6 sm:p-8 flex flex-col justify-between hover:border-[#FF6900]/40 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-4">
                  <span className="text-[#FF6900] font-bold">{mod.code}</span>
                  <div className="flex items-center gap-3 text-[#777]">
                    <span className="bg-[#EAEAEA] text-[#333] px-2 py-0.5 text-[10px] uppercase">
                      {mod.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {mod.duration}
                    </span>
                  </div>
                </div>

                <h3 className="font-light text-xl sm:text-2xl text-[#1A1A18] mb-3 leading-snug">
                  {mod.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6 font-normal">
                  {mod.summary}
                </p>

                <div className="mb-6">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-[#888] mb-2">
                    Key Topics Covered:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#444] font-mono">
                    {mod.topics.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle className="h-3 w-3 text-[#FF6900] shrink-0" />
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-between">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#1A1A18] hover:bg-[#FF6900] text-white px-5 py-2.5 text-xs uppercase tracking-widest transition-colors font-normal no-underline"
                >
                  <span>Request Training Access</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <span className="text-[11px] font-mono text-[#888]">
                  Available to UK Operators
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
