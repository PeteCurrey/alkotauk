'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  FlaskConical, 
  ShieldCheck, 
  RotateCcw,
  Truck,
  Tractor,
  HardHat,
  Car,
  Wrench,
  Flame,
  Building
} from 'lucide-react';
import ChemicalCard from '@/components/chemicals/ChemicalCard';
import { 
  ChemicalApplication, 
  ChemicalCleaningProblem, 
  ChemicalSurface, 
  ChemicalRetailProduct 
} from '@/lib/types/chemical-commerce';

interface Props {
  applications: ChemicalApplication[];
  problems: ChemicalCleaningProblem[];
  surfaces: ChemicalSurface[];
  products: ChemicalRetailProduct[];
}

export default function ChemicalFinderClient({
  applications,
  problems,
  surfaces,
  products,
}: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [selectedProblem, setSelectedProblem] = useState<string>('');
  const [selectedResult, setSelectedResult] = useState<string>('clean');

  // Filter products based on selections
  const getMatches = () => {
    return products.filter((prod) => {
      let match = true;
      if (selectedApp) {
        const app = applications.find(a => a.slug === selectedApp);
        if (app) {
          const appKeyword = app.name.split(' ')[0].toLowerCase();
          match = match && (
            prod.primary_application.toLowerCase().includes(appKeyword) ||
            prod.long_description.toLowerCase().includes(appKeyword)
          );
        }
      }
      return match;
    });
  };

  const matches = getMatches();

  return (
    <div className="max-w-5xl mx-auto font-sans">
      {/* ── STEP PROGRESS BAR ── */}
      <div className="mb-10">
        <div className="flex items-center justify-between font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-2">
          <span>Step {step} of 4</span>
          <span>
            {step === 1 && '1. What are you cleaning?'}
            {step === 2 && '2. What do you need to remove?'}
            {step === 3 && '3. Desired Result'}
            {step === 4 && '4. Matching Chemical Formulations'}
          </span>
        </div>
        <div className="w-full bg-[#E8E8E4] h-1.5 overflow-hidden">
          <div 
            className="bg-alkota-orange h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* ── STEP 1: WHAT ARE YOU CLEANING? ── */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="border-b border-[#E0DEDC] pb-4">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Step 01
            </span>
            <h2 className="text-3xl font-extralight text-alkota-black tracking-tight">
              What are you cleaning?
            </h2>
            <p className="text-sm text-[#666] font-light mt-1">
              Select the primary vehicle type, machinery, or surface environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {applications.map((app) => (
              <button
                key={app.slug}
                type="button"
                onClick={() => {
                  setSelectedApp(app.slug);
                  setStep(2);
                }}
                className={`p-6 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedApp === app.slug
                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                    : 'border-[#E0DEDC] bg-white text-alkota-black hover:border-alkota-orange'
                }`}
              >
                <div>
                  <h3 className="text-lg font-light tracking-tight mb-1">{app.name}</h3>
                  <p className={`text-xs leading-relaxed ${selectedApp === app.slug ? 'text-[#AAA]' : 'text-[#666]'}`}>
                    {app.tagline}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                  <span>Select Application</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 2: WHAT DO YOU NEED TO REMOVE? ── */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="border-b border-[#E0DEDC] pb-4">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Step 02
            </span>
            <h2 className="text-3xl font-extralight text-alkota-black tracking-tight">
              What do you need to remove?
            </h2>
            <p className="text-sm text-[#666] font-light mt-1">
              Choose the primary soil, deposit, or contaminant type.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {problems.map((prob) => (
              <button
                key={prob.slug}
                type="button"
                onClick={() => {
                  setSelectedProblem(prob.slug);
                  setStep(3);
                }}
                className={`p-5 text-left border transition-all cursor-pointer ${
                  selectedProblem === prob.slug
                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                    : 'border-[#E0DEDC] bg-white text-alkota-black hover:border-alkota-orange'
                }`}
              >
                <span className="block font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] mb-1">
                  {prob.category}
                </span>
                <span className="text-sm font-light text-inherit block">{prob.name}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-6 border-t border-[#E0DEDC]">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777] hover:text-black cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: DESIRED RESULT ── */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="border-b border-[#E0DEDC] pb-4">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Step 03
            </span>
            <h2 className="text-3xl font-extralight text-alkota-black tracking-tight">
              What outcome do you need?
            </h2>
            <p className="text-sm text-[#666] font-light mt-1">
              Select the desired finish and chemical action.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'clean', label: 'Fast Touchless Clean', desc: 'Break static road film & organic traffic grime' },
              { id: 'degrease', label: 'Heavy Degrease', desc: 'Emulsify hydraulic oil, bitumen & thick grease' },
              { id: 'brighten', label: 'Acid Brighten', desc: 'Deoxidise weathered aluminium & raw metals' },
              { id: 'protect', label: 'Wax & Protect', desc: 'Hot spray sealant & hydrophobic beading' },
              { id: 'descale', label: 'Coil Descaling', desc: 'Dissolve calcium limescale inside heating coils' },
              { id: 'maintain', label: 'Scale-Stop & Machine Care', desc: 'Continuous water treatment & foam control' },
            ].map((res) => (
              <button
                key={res.id}
                type="button"
                onClick={() => {
                  setSelectedResult(res.id);
                  setStep(4);
                }}
                className={`p-5 text-left border transition-all cursor-pointer ${
                  selectedResult === res.id
                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                    : 'border-[#E0DEDC] bg-white text-alkota-black hover:border-alkota-orange'
                }`}
              >
                <span className="text-sm font-light text-inherit block mb-1">{res.label}</span>
                <span className={`text-[11px] block ${selectedResult === res.id ? 'text-[#AAA]' : 'text-[#777]'}`}>
                  {res.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-6 border-t border-[#E0DEDC]">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777] hover:text-black cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: MATCHING CHEMICAL FORMULATIONS ── */}
      {step === 4 && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E0DEDC] pb-4">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                // Chemical Match Results
              </span>
              <h2 className="text-3xl font-extralight text-alkota-black tracking-tight">
                Recommended Chemistry ({matches.length > 0 ? matches.length : products.slice(0, 4).length})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedApp('');
                setSelectedProblem('');
                setStep(1);
              }}
              className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange hover:text-black cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Matcher</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[#E0DEDC]">
            {(matches.length > 0 ? matches : products.slice(0, 4)).map((prod) => (
              <div key={prod.id} className="bg-[#FAF9F5]">
                <ChemicalCard product={prod} />
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[#E0DEDC] flex justify-between items-center">
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777] hover:text-black cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Modify Parameters
            </button>
            <Link
              href="/chemicals"
              className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange hover:text-black"
            >
              Browse Full Chemical Store →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
