'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ShieldCheck, AlertTriangle, Info, Download, Droplet, FileCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

type StepStatus = 'intro' | 'form' | 'leadCapture' | 'generating' | 'results';

const QUESTIONS = [
  {
    id: 'Q1',
    title: 'What type of site is this?',
    options: ['Food processing', 'Agriculture', 'Fleet / transport depot', 'Manufacturing', 'Construction', 'Municipal / council', 'Hospitality', 'Other']
  },
  {
    id: 'Q2',
    title: 'Where does your wash water discharge?',
    options: ['Foul sewer', 'Surface water drain', 'Interceptor or holding tank', 'Soakaway', 'Don\'t know']
  },
  {
    id: 'Q3',
    title: 'What chemicals do you currently use?',
    isTextInput: true,
    placeholder: 'e.g. TFR, Degreaser, none'
  },
  {
    id: 'Q4',
    title: 'Do you have a trade effluent consent?',
    options: ['Yes', 'No', 'Not sure what that is']
  },
  {
    id: 'Q5',
    title: 'Do you have COSHH assessments for your wash chemicals?',
    options: ['Yes, all covered', 'Partial', 'No', 'Not sure']
  },
  {
    id: 'Q6',
    title: 'Is your wash area bunded or contained?',
    options: ['Yes, fully bunded', 'Partially contained', 'No containment', 'Not sure']
  },
  {
    id: 'Q7',
    title: 'Do you wash vehicles or plant that have carried hazardous materials?',
    options: ['Yes (fuel, chemicals, waste)', 'No', 'Occasionally']
  },
  {
    id: 'Q8',
    title: 'Approximate daily wash water volume?',
    options: ['Under 1,000 litres', '1,000–5,000 litres', 'Over 5,000 litres', 'Not sure']
  }
];

export default function WashBayCompliancePage() {
  const [status, setStatus] = useState<StepStatus>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [leadInfo, setLeadInfo] = useState({ name: '', company: '', email: '', followUp: false });
  const [results, setResults] = useState<any>(null);

  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const currentQ = QUESTIONS[currentStep];

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setStatus('leadCapture');
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
      const res = await fetch('/api/wash-bay-compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      setResults(data);
      setStatus('results');
    } catch (error) {
      console.error(error);
      alert("Failed to generate report. Please try again.");
      setStatus('leadCapture');
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
                Wash Bay <span className="text-alkota-orange">Compliance</span> Checker
              </h1>
              <p className="text-xl text-alkota-steel font-bold uppercase tracking-widest mb-6">
                Is your wash bay legally compliant? 8 questions. Instant assessment.
              </p>
              <p className="max-w-3xl mx-auto text-alkota-silver leading-relaxed mb-12">
                Environmental regulations around industrial washing are strict. Ignoring Trade Effluent Consent, COSHH guidelines, or bunding requirements can lead to severe Environment Agency fines and site shutdowns. Check your status anonymously in minutes.
              </p>
              <button
                onClick={() => setStatus('form')}
                className="bg-alkota-orange hover:bg-alkota-orange-bright text-white px-8 py-4 rounded-sm font-black uppercase italic tracking-widest text-lg transition-all"
              >
                Check My Wash Bay →
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
              <div className="mb-12">
                <div className="flex justify-between text-alkota-steel text-sm font-bold uppercase tracking-widest mb-4">
                  <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1 w-full bg-alkota-iron rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-alkota-orange"
                    initial={{ width: 0 }}
                    animate={{ width: `\${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-8">
                  {currentQ.title}
                </h2>
                {currentQ.isTextInput ? (
                  <input
                    type="text"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleSelect(currentQ.id, e.target.value)}
                    placeholder={currentQ.placeholder}
                    className="w-full bg-alkota-steel border-2 border-alkota-iron rounded-lg p-6 text-xl text-white font-bold focus:border-alkota-orange focus:outline-none transition-colors"
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQ.options?.map((opt, idx) => {
                      const isSelected = answers[currentQ.id] === opt;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(currentQ.id, opt)}
                          className={`p-6 border-2 rounded-lg text-left transition-colors \${
                            isSelected ? 'border-alkota-orange bg-alkota-orange/10 text-white' : 'border-alkota-iron bg-alkota-steel hover:border-alkota-steel text-alkota-silver'
                          }`}
                        >
                          <span className="font-bold uppercase tracking-wider text-sm">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

               <div className="flex justify-between items-center pt-8 border-t border-alkota-iron">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-alkota-steel hover:text-white transition-colors font-bold uppercase text-sm tracking-widest"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!answers[currentQ.id]}
                  className="flex items-center gap-2 bg-alkota-orange disabled:bg-alkota-iron disabled:text-alkota-steel text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-sm transition-all"
                >
                  {currentStep === QUESTIONS.length - 1 ? 'Review' : 'Next'} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STATE 2b: LEAD CAPTURE */}
          {status === 'leadCapture' && (
            <motion.div
              key="lead"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-20"
            >
              <div className="bg-alkota-steel border border-alkota-iron rounded-xl p-8 md:p-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Almost there — where should we send your report?</h2>
                <p className="text-alkota-silver mb-8 leading-relaxed text-sm">We'll display your results on screen immediately and email you a copy. We can also follow up with compliance guidance if needed.</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-2">Full Name *</label>
                    <input type="text" value={leadInfo.name} onChange={e => setLeadInfo({...leadInfo, name: e.target.value})} className="w-full bg-alkota-black border border-alkota-iron rounded-sm p-3 text-white focus:border-alkota-orange focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-2">Company Name *</label>
                    <input type="text" value={leadInfo.company} onChange={e => setLeadInfo({...leadInfo, company: e.target.value})} className="w-full bg-alkota-black border border-alkota-iron rounded-sm p-3 text-white focus:border-alkota-orange focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-2">Email Address *</label>
                    <input type="email" value={leadInfo.email} onChange={e => setLeadInfo({...leadInfo, email: e.target.value})} className="w-full bg-alkota-black border border-alkota-iron rounded-sm p-3 text-white focus:border-alkota-orange focus:outline-none transition-colors" />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer mt-4 group">
                    <div className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors \${leadInfo.followUp ? 'bg-alkota-orange border-alkota-orange' : 'border-alkota-steel group-hover:border-white'}`}>
                      {leadInfo.followUp && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={leadInfo.followUp} onChange={() => setLeadInfo({...leadInfo, followUp: !leadInfo.followUp})} />
                    <span className="text-sm text-alkota-silver leading-snug select-none">I'd like an Alkota specialist to follow up with compliance guidance for my wash bay</span>
                  </label>

                  <button 
                    onClick={generateResults}
                    disabled={!leadInfo.name || !leadInfo.company || !leadInfo.email}
                    className="w-full bg-alkota-orange hover:bg-alkota-orange-bright disabled:bg-alkota-iron disabled:text-alkota-steel text-white px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-colors mt-8"
                  >
                    Generate My Compliance Report →
                  </button>
                  <p className="text-center text-xs text-alkota-steel mt-4">We won't spam you. Your details are used only to send your report and, if requested, to follow up.</p>

                  <div className="text-center">
                    <button onClick={() => setStatus('form')} className="text-alkota-steel text-xs uppercase font-bold tracking-widest hover:text-white mt-4">← Back to Questions</button>
                  </div>
                </div>
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
                <div className="absolute inset-0 border-4 inline-block border-alkota-orange rounded-full animate-ping opacity-20" />
                <div className="h-20 w-20 bg-alkota-steel border-2 border-alkota-orange rounded-full flex items-center justify-center relative z-10">
                  <FileCheck className="h-8 w-8 text-alkota-orange animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 animate-pulse">
                Assessing Obligations...
              </h2>
              <p className="text-alkota-steel uppercase tracking-widest text-sm font-bold">
                Checking environmental permit thresholds
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
              <div className="print-container bg-white text-alkota-steel rounded-xl overflow-hidden p-8 md:p-12 mb-8">
                {/* Hero Risk Status */}
                <div className="mb-12 border-b border-gray-200 pb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <ShieldCheck className="w-8 h-8 text-alkota-blue" />
                    <h2 className="text-3xl font-black uppercase tracking-tight">Compliance Report</h2>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded font-black uppercase tracking-widest text-sm mb-6 \${
                    results.overallRiskLevel === 'Compliant' ? 'bg-green-100 text-green-800 border border-green-300' :
                    results.overallRiskLevel === 'Advisory' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                    'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    Overall Risk Level: {results.overallRiskLevel}
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {results.riskSummary}
                  </p>
                </div>

                {/* Compliance Sections Stack */}
                <div className="space-y-8 mb-12">
                  {[
                    { title: 'Trade Effluent', data: results.tradeEffluent, icon: Droplet, keyFlag: 'requiresConsent' },
                    { title: 'COSHH Obligations', data: results.coshhObligations, icon: AlertTriangle, keyFlag: 'assessmentRequired' },
                    { title: 'Environmental Permit', data: results.environmentalPermit, icon: FileCheck, keyFlag: 'mayBeRequired' },
                    { title: 'Bunding & Containment', data: results.bunding, icon: ShieldCheck, isBunding: true }
                  ].map((section, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                           <section.icon className="w-5 h-5 text-alkota-orange" /> {section.title}
                        </h3>
                        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded \${
                          section.isBunding 
                            ? (section.data.recommendationLevel === 'Required' ? 'bg-red-100 text-red-800' : section.data.recommendationLevel === 'Recommended' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800')
                            : (section.data[section.keyFlag as string] ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800')
                        }`}>
                          {section.isBunding ? section.data.recommendationLevel : (section.data[section.keyFlag as string] ? 'Action Needed' : 'No Immediate Action')}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">{section.data.explanation}</p>
                      <div className="bg-white border text-sm border-gray-200 p-4 rounded text-alkota-steel font-medium">
                        <strong className="text-alkota-orange block mb-1">Action Required:</strong>
                        {section.data.actionRequired}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="font-black uppercase tracking-widest mb-4">Recommended Alkota Equipment</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                      {results.recommendedAlkotaEquipment.map((eq: string, i: number) => <li key={i}>{eq}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-widest mb-4">Next Steps</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 font-bold">
                      {results.nextSteps.map((step: string, i: number) => <li key={i}>{step}</li>)}
                    </ol>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-xs text-gray-500 uppercase font-bold text-center">{results.disclaimer}</p>
                </div>
              </div>

              {/* CTAs - Hidden when printing */}
              <div className="text-center space-y-4 no-print">
                <button 
                  onClick={() => window.print()}
                  className="bg-alkota-orange hover:bg-alkota-orange-bright text-white px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <Download className="w-4 h-4" /> Download This Report as PDF
                </button>
                <div className="pt-4">
                   <Link href="/contact?source=compliance-checker" className="text-alkota-silver hover:text-white text-sm font-bold uppercase tracking-widest border border-alkota-iron px-6 py-3 rounded-sm inline-block transition-colors">
                     Speak to an Alkota Compliance Specialist →
                   </Link>
                </div>
              </div>

              {/* Print stylesheet included to format output correctly */}
              <style jsx global>{`
                @media print {
                  body * {
                    visibility: hidden;
                  }
                  .print-container, .print-container * {
                    visibility: visible;
                  }
                  .print-container {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                  }
                  .no-print {
                    display: none;
                  }
                }
              `}</style>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
