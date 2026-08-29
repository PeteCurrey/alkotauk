'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Wrench, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import { CaseStudyWorkflowStep } from '@/lib/case-studies/types';

interface Props {
  steps: CaseStudyWorkflowStep[];
}

export default function CaseStudyBespokeWorkflow({ steps }: Props) {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const activeStep = steps[activeStepIdx] || steps[0];

  return (
    <section className="my-20 bg-[#0D0D0B] text-white p-8 sm:p-14 border border-[#222] font-normal">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/15 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FF6900] mb-2">
            <Wrench className="h-4 w-4" />
            <span>UK Engineering Process // 12-Stage Lifecycle</span>
          </div>
          <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white">
            The Bespoke Rig Architecture
          </h3>
        </div>
        <div>
          <Link
            href="/trailers/configure"
            className="inline-flex items-center gap-2 bg-[#FF6900] text-white px-6 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors font-normal no-underline"
          >
            <span>Launch Configurator</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Interactive Step Navigator & Detailed Stage Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: 12-Step Horizontal/Vertical selector */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
          {steps.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStepIdx(idx)}
              className={`text-left p-3.5 border transition-all cursor-pointer ${
                activeStepIdx === idx
                  ? 'bg-white text-black border-white'
                  : 'bg-[#181816] text-[#CCC] border-white/10 hover:border-white/30'
              }`}
            >
              <span className={`text-[10px] block uppercase tracking-wider font-mono mb-0.5 ${
                activeStepIdx === idx ? 'text-[#FF6900]' : 'text-[#888]'
              }`}>
                Stage {s.step}
              </span>
              <span className="text-xs uppercase tracking-tight block truncate font-medium">
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Right Column: Detailed Active Stage Card */}
        <div className="lg:col-span-7 bg-[#161614] p-8 sm:p-10 border border-white/15 flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#FF6900] font-mono">
                Stage {activeStep.step} of 12
              </span>
              <span className="text-xs uppercase px-2.5 py-0.5 bg-[#222] text-[#AAA] border border-[#333]">
                Alkota UK Standard
              </span>
            </div>

            <h4 className="font-extralight text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
              {activeStep.title}
            </h4>
            <p className="text-xs text-[#FF6900] uppercase tracking-wider mb-6 font-normal">
              {activeStep.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#CCC] leading-relaxed mb-8 font-normal">
              {activeStep.description}
            </p>
          </div>

          <div className="p-4 bg-[#0D0D0B] border border-white/10 text-xs">
            <span className="text-[#888] uppercase tracking-wider text-[10px] block mb-1">
              Engineering Focus
            </span>
            <span className="text-[#EEE] font-normal">
              {activeStep.engineeringFocus}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
