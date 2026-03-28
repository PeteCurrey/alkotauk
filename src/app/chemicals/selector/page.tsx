'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, Factory, Car, Paintbrush, Target, Droplets, Droplet, Flame, AlertTriangle, Info, Plus } from 'lucide-react';
import Link from 'next/link';

type StepStatus = 'intro' | 'form' | 'generating' | 'results';

interface Question {
  id: string;
  title: string;
  type: 'single' | 'multi';
  options: { label: string; icon?: any }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    title: 'What surface are you cleaning?',
    type: 'single',
    options: [
      { label: 'Vehicle paintwork & bodywork', icon: Car },
      { label: 'Farm machinery & trailers', icon: Factory },
      { label: 'Concrete floors & bays', icon: Factory },
      { label: 'Food processing equipment', icon: Target },
      { label: 'Stone, brick & masonry', icon: Factory },
      { label: 'Aircraft & aviation equipment', icon: Car },
      { label: 'Engine bays & exhausts', icon: Target },
      { label: 'Graffiti on hard surfaces', icon: Paintbrush },
      { label: 'Roads, tarmac & asphalt', icon: Factory },
    ]
  },
  {
    id: 'Q2',
    title: 'What is the contamination?',
    type: 'single',
    options: [
      { label: 'Grease & oil', icon: Droplet },
      { label: 'Mud, soil & general dirt', icon: Target },
      { label: 'Mineral scale & limescale', icon: Target },
      { label: 'Carbon & baked-on residue', icon: Flame },
      { label: 'Paint or graffiti', icon: Paintbrush },
      { label: 'Biological / organic', icon: Target },
      { label: 'Road film & tar', icon: Car },
      { label: 'Mixed / general', icon: Droplets },
    ]
  },
  {
    id: 'Q3',
    title: 'Any restrictions?',
    type: 'multi',
    options: [
      { label: 'Food-safe required', icon: Target },
      { label: 'Environmental discharge concern', icon: Droplet },
      { label: 'Foam lance application needed', icon: Droplets },
      { label: 'None - no restrictions', icon: CheckCircle2 },
    ]
  }
];

export default function ChemicalSelectorPage() {
  const [status, setStatus] = useState<StepStatus>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [results, setResults] = useState<any>(null);

  const handleSelect = (questionId: string, value: string, type: 'single' | 'multi') => {
    if (type === 'single') {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    } else {
      setAnswers(prev => {
        const current = (prev[questionId] as string[]) || [];
        if (value === 'None - no restrictions') {
            return { ...prev, [questionId]: ['None - no restrictions'] };
        }
        const filtered = current.filter(v => v !== 'None - no restrictions');
        if (filtered.includes(value)) {
          return { ...prev, [questionId]: filtered.filter(v => v !== value) };
        } else {
          return { ...prev, [questionId]: [...filtered, value] };
        }
      });
    }
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      generateResults();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      setStatus('intro');
    }
  };

  const generateResults = async () => {
    setStatus('generating');
    
    try {
      const res = await fetch('/api/chemical-selector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surface: answers['Q1'],
          contamination: answers['Q2'],
          restrictions: answers['Q3']
        }),
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      setResults(data);
      setStatus('results');
    } catch (error) {
      console.error(error);
      alert("There was an error generating your recommendation. Please try again.");
      setStatus('form');
    }
  };

  return (
    <main className="min-h-screen bg-alkota-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: INTRO */}
          {status === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-6">
                Chemical <span className="text-alkota-orange">Selector</span>
              </h1>
              <p className="text-xl text-alkota-steel font-bold uppercase tracking-widest mb-4">
                Three questions. The right chemical. No guesswork.
              </p>
              <button
                onClick={() => setStatus('form')}
                className="mt-8 bg-alkota-orange hover:bg-alkota-orange-bright text-white px-8 py-4 rounded-sm font-black uppercase italic tracking-widest text-lg transition-all"
              >
                Find My Chemical →
              </button>
            </motion.div>
          )}

          {/* STATE 2: FORM */}
          {status === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-10"
            >
              {/* Progress */}
              <div className="mb-12">
                <div className="flex justify-between text-alkota-steel text-sm font-bold uppercase tracking-widest mb-4">
                  <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1 w-full bg-alkota-iron rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-alkota-orange"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-8">
                  {QUESTIONS[currentStep].title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {QUESTIONS[currentStep].options.map((option, idx) => {
                    const isSelected = QUESTIONS[currentStep].type === 'single'
                      ? answers[QUESTIONS[currentStep].id] === option.label
                      : (answers[QUESTIONS[currentStep].id] as string[])?.includes(option.label);
                    
                    const Icon = option.icon;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(QUESTIONS[currentStep].id, option.label, QUESTIONS[currentStep].type)}
                        className={`flex flex-col items-center justify-center p-6 text-center border-2 rounded-lg transition-all duration-200 ${
                          isSelected 
                            ? 'border-alkota-orange bg-alkota-orange/10 text-white' 
                            : 'border-alkota-iron bg-alkota-steel hover:border-alkota-steel text-alkota-silver'
                        }`}
                      >
                        {Icon && <Icon className={`h-8 w-8 mb-4 ${isSelected ? 'text-alkota-orange' : 'text-alkota-steel'}`} />}
                        <span className="font-bold uppercase tracking-wider text-sm">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8 border-t border-alkota-iron">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-alkota-steel hover:text-white transition-colors font-bold uppercase text-sm tracking-widest"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!answers[QUESTIONS[currentStep].id] || (Array.isArray(answers[QUESTIONS[currentStep].id]) && (answers[QUESTIONS[currentStep].id] as string[]).length === 0)}
                  className="flex items-center gap-2 bg-alkota-orange disabled:bg-alkota-iron disabled:text-alkota-steel text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-sm transition-all"
                >
                  {currentStep === QUESTIONS.length - 1 ? 'Find My Chemical' : 'Next'} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STATE 3: GENERATING */}
          {status === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-32 flex flex-col items-center"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 border-4 border-alkota-orange rounded-full animate-ping opacity-20" />
                <div className="h-20 w-20 bg-alkota-steel border-2 border-alkota-orange rounded-full flex items-center justify-center relative z-10">
                  <Droplets className="h-8 w-8 text-alkota-orange animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 animate-pulse">
                Matching to APW range...
              </h2>
              <p className="text-alkota-steel uppercase tracking-widest text-sm font-bold">
                Checking application compatibility
              </p>
            </motion.div>
          )}

          {/* STATE 4: RESULTS */}
          {status === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-10 space-y-8"
            >
              <div className="bg-alkota-steel border border-alkota-iron rounded-xl overflow-hidden">
                <div className="p-8 md:p-12 border-b border-alkota-iron bg-gradient-to-br from-alkota-steel to-alkota-black">
                  <p className="text-alkota-orange font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Primary Recommendation
                  </p>
                  <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-6">
                    {results.primaryChemical}
                  </h2>
                  <p className="text-lg text-alkota-silver leading-relaxed max-w-3xl">
                    {results.primaryRationale}
                  </p>
                </div>

                {/* Dilution Guide Table */}
                <div className="border-b border-alkota-iron">
                  <div className="bg-alkota-iron/30 p-4 border-b border-alkota-iron">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-alkota-orange" /> Dilution Guide
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-alkota-iron">
                    <div className="p-6">
                      <p className="text-xs text-alkota-steel uppercase tracking-widest font-bold mb-2">Hot Water Wash</p>
                      <p className="text-white font-medium">{results.dilutionHotWash}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-alkota-steel uppercase tracking-widest font-bold mb-2">Cold Water Wash</p>
                      <p className="text-white font-medium">{results.dilutionColdWash}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-alkota-steel uppercase tracking-widest font-bold mb-2">Foam Lance</p>
                      <p className="text-white font-medium">{results.dilutionFoamLance}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-black text-alkota-steel uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Info className="h-4 w-4" /> Application Method
                    </h3>
                    <p className="text-sm text-alkota-silver leading-relaxed mb-4">
                      {results.applicationMethod}
                    </p>
                    <p className="text-sm font-bold text-white">
                      <span className="text-alkota-steel uppercase tracking-widest mr-2">Contact Time:</span> 
                      {results.contactTime}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-alkota-black border border-red-500/20 p-6 rounded-lg">
                      <h3 className="text-sm font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" /> Do Not Use On
                      </h3>
                      <p className="text-sm text-alkota-silver leading-relaxed">
                        {results.doNotUseOn}
                      </p>
                    </div>

                    {results.safetyNote && (
                      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-lg">
                         <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" /> Safety Note
                        </h3>
                        <p className="text-sm text-alkota-silver leading-relaxed">
                          {results.safetyNote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {results.secondaryChemical && (
                  <div className="border-t border-alkota-iron p-6 md:px-12 bg-alkota-iron/20">
                    <h3 className="text-sm font-black text-alkota-steel uppercase tracking-widest mb-2">Secondary Option: {results.secondaryChemical}</h3>
                    <p className="text-sm text-alkota-silver leading-relaxed">
                      {results.secondaryRationale}
                    </p>
                  </div>
                )}
                
                {/* CTA */}
                <div className="bg-alkota-black p-8 md:p-12 border-t border-alkota-iron flex flex-col sm:flex-row justify-center gap-4">
                   <Link 
                     href={`/chemicals/${results.primaryChemical.toLowerCase().replace(/\s+/g, '-')}`}
                     className="bg-alkota-orange hover:bg-alkota-orange-bright text-white px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2"
                   >
                     Add {results.primaryChemical} to Basket <Plus className="h-4 w-4" />
                   </Link>
                   <Link 
                     href="/chemicals"
                     className="border border-alkota-iron hover:border-alkota-steel text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors text-center"
                   >
                     View Full Chemical Range →
                   </Link>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
