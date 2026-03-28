'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Loader2, CheckCircle2, Factory, Car, Paintbrush, TestTube, Zap, Battery, Wind, AlertTriangle, Cloud, Target, Trash2, Box } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    title: 'What are you cleaning?',
    type: 'single',
    options: [
      { label: 'Vehicles & Plant', icon: Car },
      { label: 'Food Processing Equipment', icon: Target },
      { label: 'Animal Housing & Trailers', icon: Cloud },
      { label: 'Industrial Floors & Bays', icon: Factory },
      { label: 'Agricultural Machinery', icon: Cloud },
      { label: 'Other', icon: Box },
    ]
  },
  {
    id: 'Q2',
    title: 'What type of contamination?',
    type: 'single',
    options: [
      { label: 'Grease & Oil', icon: TestTube },
      { label: 'Mud & Soil', icon: Cloud },
      { label: 'Biological / Organic', icon: Target },
      { label: 'Paint & Coatings', icon: Paintbrush },
      { label: 'Mineral Scale', icon: Battery },
      { label: 'Mixed / Unknown', icon: Zap },
    ]
  },
  {
    id: 'Q3',
    title: 'Where will the machine be used?',
    type: 'single',
    options: [
      { label: 'Fixed wash bay' },
      { label: 'Mobile / on-site' },
      { label: 'Outdoor (exposed)' },
      { label: 'Food-safe environment required' },
    ]
  },
  {
    id: 'Q4',
    title: 'Power source available?',
    type: 'single',
    options: [
      { label: '3-phase electric', icon: Zap },
      { label: 'Single-phase electric', icon: Zap },
      { label: 'Diesel or LPG', icon: Battery },
      { label: 'Need self-contained (no power supply)', icon: Battery },
    ]
  },
  {
    id: 'Q5',
    title: 'How many operators at once?',
    type: 'single',
    options: [
      { label: '1' },
      { label: '2-4' },
      { label: '5 or more' },
    ]
  },
  {
    id: 'Q6',
    title: 'How many hours per day?',
    type: 'single',
    options: [
      { label: 'Less than 2 hrs' },
      { label: '2-6 hrs' },
      { label: '6-12 hrs' },
      { label: 'Heavy duty / continuous use' },
    ]
  },
  {
    id: 'Q7',
    title: 'Budget indicator?',
    type: 'single',
    options: [
      { label: 'Entry-level investment' },
      { label: 'Mid-range' },
      { label: 'Best-in-class' },
      { label: 'Custom / no ceiling' },
    ]
  },
  {
    id: 'Q8',
    title: 'Any specific requirements?',
    type: 'multi',
    options: [
      { label: 'Food-safe rated', icon: Target },
      { label: 'ATEX zone (fuel/gas environment)', icon: AlertTriangle },
      { label: 'Van-mounted', icon: Car },
      { label: 'Trailer unit needed', icon: Car },
      { label: 'None of the above', icon: CheckCircle2 },
    ]
  }
];

export default function MachineMatchPage() {
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
        if (value === 'None of the above') {
            return { ...prev, [questionId]: ['None of the above'] };
        }
        const filtered = current.filter(v => v !== 'None of the above');
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
    
    // Format answers for API
    const formattedAnswers: Record<string, string> = {};
    Object.keys(answers).forEach(key => {
        formattedAnswers[key] = Array.isArray(answers[key]) 
            ? (answers[key] as string[]).join(', ') 
            : answers[key] as string;
    });

    try {
      const res = await fetch('/api/machine-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: formattedAnswers }),
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
                Machine <span className="text-alkota-orange">Match</span>
              </h1>
              <p className="text-xl text-alkota-steel font-bold uppercase tracking-widest mb-4">
                Tell us the job. We'll find your machine.
              </p>
              <p className="text-alkota-silver max-w-2xl mx-auto mb-12">
                Answer 8 quick questions about your cleaning application and our AI will match you to the right Alkota machine, chemical and accessories. Instant recommendation.
              </p>
              <button
                onClick={() => setStatus('form')}
                className="bg-alkota-orange hover:bg-alkota-orange-bright text-white px-8 py-4 rounded-sm font-black uppercase italic tracking-widest text-lg transition-all"
              >
                Start Machine Match →
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
                  {currentStep === QUESTIONS.length - 1 ? 'Find My Machine' : 'Next'} <ChevronRight className="h-4 w-4" />
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
                  <Zap className="h-8 w-8 text-alkota-orange animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 animate-pulse">
                Analysing your application...
              </h2>
              <p className="text-alkota-steel uppercase tracking-widest text-sm font-bold">
                Matching to the Alkota range
              </p>
            </motion.div>
          )}

          {/* STATE 4: RESULTS */}
          {status === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-10"
            >
              <div className="bg-alkota-steel border border-alkota-iron rounded-xl overflow-hidden mb-8">
                {/* Hero */}
                <div className="p-8 md:p-12 border-b border-alkota-iron bg-gradient-to-br from-alkota-steel to-alkota-black">
                  <p className="text-alkota-orange font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Your Alkota Match
                  </p>
                  <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-2">
                    {results.recommendedMachine}
                  </h2>
                  <p className="text-xl text-alkota-silver font-bold uppercase tracking-widest mb-8">
                    {results.series}
                  </p>
                  <p className="text-lg text-alkota-steel leading-relaxed max-w-3xl">
                    {results.whyThisMachine}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-b border-alkota-iron">
                  {results.keySpecs.map((spec: string, i: number) => (
                    <div key={i} className="p-6 border-b md:border-b-0 md:border-r border-alkota-iron last:border-0">
                      <Zap className="h-5 w-5 text-alkota-gold mb-3" />
                      <p className="text-white font-bold">{spec}</p>
                    </div>
                  ))}
                </div>

                {/* Sub sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
                  <div className="space-y-8">
                    {/* Chemical */}
                    <div className="bg-alkota-black border border-alkota-iron p-6 rounded-lg">
                      <h3 className="text-sm font-black text-alkota-steel uppercase tracking-widest flex items-center gap-2 mb-4">
                        <TestTube className="h-4 w-4" /> Recommended Chemical
                      </h3>
                      <p className="text-xl font-bold text-white mb-2">{results.recommendedChemical}</p>
                      <p className="text-sm text-alkota-silver leading-relaxed mb-4">{results.chemicalRationale}</p>
                      <div className="bg-alkota-steel p-3 rounded text-xs text-alkota-steel uppercase tracking-wider font-bold mb-4">
                        Dilution: {results.dilutionGuide}
                      </div>
                      <Link href="/shop" className="text-alkota-orange hover:text-white font-bold uppercase tracking-widest text-xs transition-colors">
                        Add to Basket →
                      </Link>
                    </div>

                    {/* Accessories */}
                    <div>
                      <h3 className="text-sm font-black text-alkota-steel uppercase tracking-widest mb-4">Recommended Accessories</h3>
                      <ul className="space-y-3">
                        {results.recommendedAccessories.map((acc: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-alkota-silver">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-alkota-green mt-0.5" />
                            <span>{acc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8">
                     {/* Important Notes */}
                     <div className="bg-alkota-gold/10 border border-alkota-gold/20 p-6 rounded-lg">
                      <h3 className="text-sm font-black text-alkota-gold uppercase tracking-widest flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-4 w-4" /> Important Notes
                      </h3>
                      <p className="text-sm text-alkota-silver leading-relaxed">
                        {results.importantNotes}
                      </p>
                    </div>

                    {/* Alternative */}
                    <div className="border border-alkota-iron p-6 rounded-lg">
                      <h3 className="text-sm font-black text-alkota-steel uppercase tracking-widest flex items-center gap-2 mb-3">
                        <Wind className="h-4 w-4" /> Also Consider
                      </h3>
                      <p className="text-lg font-bold text-white mb-2">{results.alternativeMachine}</p>
                      <p className="text-sm text-alkota-silver leading-relaxed">
                        {results.alternativeRationale}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-alkota-black p-8 md:p-12 border-t border-alkota-iron text-center">
                   <h3 className="text-2xl font-black uppercase text-white mb-2">Ready to get this machine?</h3>
                   <p className="text-alkota-steel text-sm mb-8">Machines are quote-only. We'll get back to you within 1 working day.</p>
                   <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link 
                        href={`/quote?machine=${encodeURIComponent(results.recommendedMachine)}&source=machine-match`}
                        className="bg-alkota-orange hover:bg-alkota-orange-bright text-white px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-colors"
                      >
                        Request a Quote for This Machine →
                      </Link>
                      <button 
                        onClick={() => {
                          setAnswers({});
                          setCurrentStep(0);
                          setStatus('intro');
                        }}
                        className="border border-alkota-iron hover:border-alkota-steel text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
                      >
                        Start Again
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
