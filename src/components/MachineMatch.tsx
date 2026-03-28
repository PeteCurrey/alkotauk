'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Target, Factory, Zap, Cloud, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { urlFor, getMockMachines } from '@/sanity/client';
import Link from 'next/link';

interface Option {
  id: string;
  label: string;
  icon?: any;
}

interface Step {
  id: string;
  question: string;
  options: Option[];
}

const steps: Step[] = [
  {
    id: 'industry',
    question: 'Select Sector',
    options: [
      { id: 'agriculture', label: 'Agriculture', icon: Cloud },
      { id: 'manufacturing', label: 'Manufacturing', icon: Factory },
      { id: 'fleet', label: 'Fleet & Transit', icon: Zap },
      { id: 'food-processing', label: 'Food Processing', icon: Target },
    ],
  },
  {
    id: 'environment',
    question: 'Cleaning Zone',
    options: [
      { id: 'indoor', label: 'Indoors / Enclosed' },
      { id: 'outdoor', label: 'Outdoors / Remote' },
      { id: 'both', label: 'Mixed Environments' },
    ],
  },
  {
    id: 'power',
    question: 'Power Source',
    options: [
      { id: 'electric', label: 'Electric' },
      { id: 'petrol', label: 'Petrol / Diesel' },
      { id: 'any', label: 'Professional Consult' },
    ],
  },
];

export default function MachineMatch() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSelect = (optionId: string) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: optionId };
    setAnswers(newAnswers);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      triggerMatch(newAnswers);
    }
  };

  const triggerMatch = async (finalAnswers: Record<string, string>) => {
    setIsMatching(true);
    await new Promise(resolve => setTimeout(resolve, 1800));

    try {
      const allMachines = getMockMachines();
      let filtered = allMachines;

      if (['agriculture', 'manufacturing'].includes(finalAnswers.industry)) {
        filtered = filtered.filter(m => m.category === 'hot-water');
      }

      setResults(filtered.slice(0, 3));
    } catch (error) {
      setResults(getMockMachines().slice(0, 3));
    } finally {
      setIsMatching(false);
      setIsFinished(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
  };

  return (
    <section id="machine-match" className="bg-white py-48 px-6 relative overflow-hidden border-y border-alkota-iron">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="mb-24 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-6 flex justify-center items-center gap-3"
            >
              <div className="h-[1px] w-8 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">Digital Specification Engine</span>
              <div className="h-[1px] w-8 bg-alkota-orange" />
            </motion.div>
            <h2 className="font-barlow-condensed text-6xl font-black text-alkota-black uppercase italic tracking-tighter md:text-8xl lg:text-9xl">
                MACHINE <span className="text-alkota-orange">MATCH.</span>
            </h2>
        </div>

        <div className="bg-alkota-bg/40 border border-alkota-iron min-h-[600px] flex flex-col relative group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-alkota-iron" />
          <AnimatePresence mode="wait">
            {isMatching ? (
                <motion.div 
                    key="matching"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center p-20 flex-1"
                >
                    <Loader2 className="h-20 w-20 text-alkota-orange animate-spin mb-10" />
                    <h3 className="font-barlow-condensed text-4xl font-bold text-alkota-black uppercase italic tracking-tight">Analyzing Spec...</h3>
                    <p className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-[0.2em] mt-4">Cross-referencing {answers.industry} against Elite fleet.</p>
                </motion.div>
            ) : !isFinished ? (
              <motion.div 
                  key="questions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col p-12 md:p-20 flex-1"
              >
                  <div className="flex justify-between items-center mb-16">
                    <span className="font-ibm-plex-mono text-[11px] font-bold uppercase tracking-widest text-alkota-orange">
                      Phase 0{currentStep + 1}
                    </span>
                    <div className="flex gap-2">
                      {steps.map((_, i) => (
                        <div key={i} className={`h-1 w-12 transition-all duration-500 ${i <= currentStep ? 'bg-alkota-orange' : 'bg-alkota-iron/50'}`} />
                      ))}
                    </div>
                  </div>

                  <h2 className="font-barlow-condensed text-5xl font-black text-alkota-black md:text-7xl uppercase tracking-tighter italic mb-16">
                    {steps[currentStep].question}
                  </h2>

                  <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 flex-1">
                    {steps[currentStep].options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleSelect(option.id)}
                          className="flex flex-col items-center justify-center gap-6 border border-alkota-iron bg-white p-10 text-center transition-all hover:border-alkota-orange hover:bg-alkota-orange/5 active:scale-[0.98] group"
                        >
                          {option.icon && <option.icon className="h-8 w-8 text-alkota-smoke transition-colors group-hover:text-alkota-orange" />}
                          <span className="font-barlow-condensed text-2xl font-bold uppercase tracking-tight text-alkota-black group-hover:text-alkota-orange">
                            {option.label}
                          </span>
                        </button>
                    ))}
                  </div>

                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="mt-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-alkota-silver hover:text-alkota-black transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back to Phase 0{currentStep}
                    </button>
                  )}
              </motion.div>
            ) : (
              <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col p-12 md:p-20 flex-1 items-center"
              >
                  <div className="mb-10 w-24 h-[2px] bg-alkota-orange" />
                  <h2 className="font-barlow-condensed text-5xl font-black text-alkota-black uppercase tracking-tight md:text-7xl italic mb-12">
                    THE MATCH.
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron w-full mb-16">
                      {results.map((machine) => (
                          <Link 
                              key={machine._id} 
                              href={`/machines/${machine.category}/${machine.slug}`}
                              className="group flex flex-col bg-white p-6 transition-all hover:bg-alkota-steel/40"
                          >
                              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-alkota-bg">
                                  <img 
                                      src={machine.heroImage?.asset?.url || 'https://alkota.co.uk/assets/hot-water-pressure-washer-DHE0Q-_H.png'}
                                      alt={machine.name}
                                      className="h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                                  <div className="absolute bottom-4 left-4">
                                    <span className="font-ibm-plex-mono text-[9px] font-bold text-alkota-orange uppercase">Spec Match</span>
                                  </div>
                              </div>
                              <h3 className="font-barlow-condensed text-2xl font-black text-alkota-black uppercase italic group-hover:text-alkota-orange transition-colors">{machine.name}</h3>
                              <p className="font-inter text-[10px] text-alkota-silver uppercase tracking-wider mt-2 line-clamp-2">{machine.tagline}</p>
                              <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-alkota-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                Explore <ArrowRight className="h-3 w-3" />
                              </div>
                          </Link>
                      ))}
                  </div>

                  <div className="flex flex-col gap-6 sm:flex-row w-full justify-center">
                    <Link
                      href="/machines"
                      className="border border-alkota-orange bg-alkota-orange/10 px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-alkota-orange hover:bg-alkota-orange hover:text-white transition-all text-center"
                    >
                      Browse All Fleet
                    </Link>
                    <button 
                      onClick={reset}
                      className="border border-alkota-iron bg-transparent px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-alkota-black hover:bg-alkota-iron transition-all"
                    >
                      New Specification
                    </button>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
