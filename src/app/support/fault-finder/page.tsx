'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Wrench, ShieldAlert,
  Droplets, Flame, Activity, Zap, Volume2, Search,
  AlertTriangle, CheckCircle2, ChevronDown, Clock
} from 'lucide-react';
import Link from 'next/link';

type StepStatus = 'intro' | 'machine' | 'symptom' | 'followups' | 'generating' | 'results';

const SYMPTOMS = [
  { label: 'Machine won\'t start', icon: Zap },
  { label: 'Loss of pressure', icon: Droplets },
  { label: 'Not heating (hot water models)', icon: Flame },
  { label: 'Pressure surging / pulsing', icon: Activity },
  { label: 'Cuts out under load', icon: Zap },
  { label: 'Leaking water', icon: Droplets },
  { label: 'Burner won\'t ignite', icon: Flame },
  { label: 'Not drawing chemical', icon: Droplets },
  { label: 'Unusual noise', icon: Volume2 },
  { label: 'Using excessive fuel', icon: Flame },
];

const getFollowUps = (symptom: string) => {
  if (symptom === 'Loss of pressure') {
    return [
      { id: 'q1', title: 'When did the pressure drop?', options: ['Suddenly', 'Gradually over days', 'Always been low'] },
      { id: 'q2', title: 'Is there any pulsing or surging?', options: ['Yes', 'No'] },
      { id: 'q3', title: 'Have any fittings, hoses or nozzles been changed recently?', options: ['Yes', 'No', 'Not sure'] },
      { id: 'q4', title: 'Is the inlet water supply fully open and flowing well?', options: ['Yes', 'No', 'Not sure'] }
    ];
  }
  if (symptom === 'Not heating (hot water models)' || symptom === 'Burner won\'t ignite') {
    return [
      { id: 'q1', title: 'Is the burner firing at all?', options: ['Yes, briefly then stops', 'No, not igniting', 'Firing but water stays cold'] },
      { id: 'q2', title: 'Any fault lights or error codes showing?', options: ['Yes', 'No'] },
      { id: 'q3', title: 'When was the coil last descaled?', options: ['Within 12 months', 'Over 12 months ago', 'Never / unknown'] }
    ];
  }
  
  // Generic fallback follow-ups
  return [
    { id: 'q1', title: 'When did you first notice the issue?', options: ['Just now', 'A few days ago', 'Weeks ago'] },
    { id: 'q2', title: 'Is the machine operating in typical conditions?', options: ['Yes', 'No, unusually cold', 'No, heavy continuous use'] },
    { id: 'q3', title: 'Any recent maintenance or parts changed?', options: ['Yes', 'No', 'Not sure'] }
  ];
};

export default function FaultFinderPage() {
  const [status, setStatus] = useState<StepStatus>('intro');
  const [machineType, setMachineType] = useState('');
  const [symptom, setSymptom] = useState('');
  const [followUps, setFollowUps] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any>(null);

  const currentQuestions = getFollowUps(symptom);

  const handleFollowUpSelect = (questionId: string, value: string) => {
    setFollowUps(prev => ({ ...prev, [questionId]: value }));
  };

  const generateResults = async () => {
    setStatus('generating');

    // map question IDs to their titles for the API prompt clarity
    const mappedFollowUps: Record<string, string> = {};
    currentQuestions.forEach(q => {
      if (followUps[q.id]) {
        mappedFollowUps[q.title] = followUps[q.id];
      }
    });

    try {
      const res = await fetch('/api/fault-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          machineType,
          symptom,
          followUps: mappedFollowUps
        }),
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      setResults(data);
      setStatus('results');
    } catch (error) {
      console.error(error);
      alert("Failed to generate diagnosis. Please try again.");
      setStatus('intro');
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'immediate':
        return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-red-400">Immediate Action</span>;
      case 'within-week':
        return <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-400">Within a Week</span>;
      default:
        return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-green-400">Non-Urgent</span>;
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
                The Fault <span className="text-alkota-orange">Finder</span>
              </h1>
              <p className="text-xl text-alkota-steel font-bold uppercase tracking-widest mb-6">
                Machine playing up? Describe the symptoms and our diagnostic tool will tell you what's wrong.
              </p>
              
              <div className="bg-alkota-steel/50 border border-alkota-iron p-6 rounded-lg inline-flex items-center gap-4 text-left mb-12 max-w-2xl mx-auto">
                <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0" />
                <p className="text-sm text-alkota-silver leading-relaxed">
                  <strong className="text-white">Note:</strong> For safety, always isolate the machine from 
                  power and water before inspecting any internal components or connections.
                </p>
              </div>

              <div>
                <button
                  onClick={() => setStatus('machine')}
                  className="bg-alkota-orange hover:bg-alkota-orange-bright text-white px-8 py-4 rounded-sm font-black uppercase italic tracking-widest text-lg transition-all"
                >
                  Start Diagnosis →
                </button>
              </div>
            </motion.div>
          )}

          {/* STATE 2: MACHINE TYPE */}
          {status === 'machine' && (
            <motion.div
              key="machine"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-10"
            >
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
                  What type of Alkota machine is this?
                </h2>
                <p className="text-sm text-alkota-steel uppercase font-bold tracking-widest">Step 1 of 3</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Hot Water (Elite / X4 Series)', 'Cold Water (BD Series)', 'Steam Cleaner', 'Trailer or Van Pack System', 'Not sure'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setMachineType(type);
                      setStatus('symptom');
                    }}
                    className="p-6 border-2 border-alkota-iron bg-alkota-steel hover:border-alkota-orange rounded-lg text-left transition-colors"
                  >
                    <span className="font-bold uppercase tracking-wider text-sm text-white">{type}</span>
                  </button>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-alkota-iron">
                 <button onClick={() => setStatus('intro')} className="text-alkota-steel font-bold uppercase text-sm tracking-widest hover:text-white flex items-center gap-2">
                   <ChevronLeft className="w-4 h-4"/> Back
                 </button>
              </div>
            </motion.div>
          )}

          {/* STATE 3: PRIMARY SYMPTOM */}
          {status === 'symptom' && (
            <motion.div
              key="symptom"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-10"
            >
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
                  What's the main problem?
                </h2>
                <p className="text-sm text-alkota-steel uppercase font-bold tracking-widest">Step 2 of 3</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SYMPTOMS.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => {
                        setSymptom(opt.label);
                        setFollowUps({});
                        setStatus('followups');
                      }}
                      className="p-6 border-2 border-alkota-iron bg-alkota-steel hover:border-alkota-orange rounded-lg flex flex-col items-center justify-center text-center transition-colors"
                    >
                      <Icon className="h-8 w-8 mb-4 text-alkota-steel" />
                      <span className="font-bold uppercase tracking-wider text-sm text-white">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

               <div className="mt-8 pt-8 border-t border-alkota-iron">
                 <button onClick={() => setStatus('machine')} className="text-alkota-steel font-bold uppercase text-sm tracking-widest hover:text-white flex items-center gap-2">
                   <ChevronLeft className="w-4 h-4"/> Back
                 </button>
              </div>
            </motion.div>
          )}

          {/* STATE 4: FOLLOW UPS */}
          {status === 'followups' && (
            <motion.div
              key="followups"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-10"
            >
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
                  Just a few more details
                </h2>
                <p className="text-sm text-alkota-steel uppercase font-bold tracking-widest">Step 3 of 3</p>
              </div>
              
              <div className="space-y-10">
                {currentQuestions.map((q) => (
                   <div key={q.id}>
                     <h3 className="text-lg font-bold text-white mb-4">{q.title}</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                       {q.options.map(opt => {
                         const isSelected = followUps[q.id] === opt;
                         return (
                           <button
                             key={opt}
                             onClick={() => handleFollowUpSelect(q.id, opt)}
                             className={`p-4 border-2 rounded-lg text-left text-sm font-bold uppercase tracking-wider transition-colors \${
                               isSelected ? 'border-alkota-orange bg-alkota-orange/10 text-white' : 'border-alkota-iron bg-alkota-steel text-alkota-silver hover:border-alkota-steel'
                             }`}
                           >
                             {opt}
                           </button>
                         );
                       })}
                     </div>
                   </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-alkota-iron flex justify-between items-center">
                 <button onClick={() => setStatus('symptom')} className="text-alkota-steel font-bold uppercase text-sm tracking-widest hover:text-white flex items-center gap-2">
                   <ChevronLeft className="w-4 h-4"/> Back
                 </button>
                 <button 
                  onClick={generateResults}
                  disabled={Object.keys(followUps).length < currentQuestions.length}
                  className="bg-alkota-orange hover:bg-alkota-orange-bright disabled:bg-alkota-iron disabled:text-alkota-steel text-white px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-all flex items-center gap-2"
                 >
                   Run Diagnosis <Search className="w-4 h-4" />
                 </button>
              </div>
            </motion.div>
          )}

          {/* STATE 5: GENERATING */}
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
                  <Wrench className="h-8 w-8 text-alkota-orange animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 animate-pulse">
                Analysing symptoms...
              </h2>
              <p className="text-alkota-steel uppercase tracking-widest text-sm font-bold">
                Cross-referencing fault patterns
              </p>
            </motion.div>
          )}

          {/* STATE 6: RESULTS */}
          {status === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-10"
            >
               <div className="mb-8">
                 <h2 className="text-3xl font-black italic uppercase text-white mb-3">Fault Finder Report</h2>
                 <div className="flex gap-4">
                   {getUrgencyBadge(results.urgency)}
                 </div>
               </div>

               <div className="space-y-6">
                 
                 {/* Likely Cause */}
                 <div className="bg-gradient-to-br from-alkota-steel to-alkota-black border border-alkota-iron rounded-xl p-8">
                   <p className="text-alkota-orange font-black uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                     <Search className="h-4 w-4" /> Primary Diagnosis
                   </p>
                   <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">
                     {results.likelyCause}
                   </h3>
                   <span className="inline-block bg-alkota-iron text-white text-xs font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                     Confidence: {results.confidenceLevel}
                   </span>
                 </div>

                 {/* Safety Note */}
                 {results.safetyNote && (
                   <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex gap-4 items-start">
                     <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                     <div>
                       <h4 className="text-red-500 font-black uppercase tracking-widest text-xs mb-2">Safety Warning</h4>
                       <p className="text-white text-sm leading-relaxed">{results.safetyNote}</p>
                     </div>
                   </div>
                 )}

                 {/* Operator Checks & Secondary Causes Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-alkota-steel border border-alkota-iron rounded-xl p-6">
                     <h4 className="font-black uppercase tracking-widest text-white text-sm flex items-center gap-2 mb-6 border-b border-alkota-iron pb-4">
                       <CheckCircle2 className="h-4 w-4 text-alkota-green" /> Check These Yourself First
                     </h4>
                     <ol className="space-y-4 text-sm text-alkota-silver">
                       {results.operatorChecks.map((check: string, i: number) => (
                         <li key={i} className="flex gap-4 items-start">
                           <span className="flex items-center justify-center w-6 h-6 rounded-full bg-alkota-iron text-white font-bold text-xs flex-shrink-0">
                             {i + 1}
                           </span>
                           <span className="leading-relaxed mt-0.5">{check}</span>
                         </li>
                       ))}
                     </ol>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="bg-alkota-black border border-alkota-iron rounded-xl p-6">
                        <details className="group">
                          <summary className="font-black uppercase tracking-widest text-white text-sm flex items-center justify-between cursor-pointer list-none">
                            <span className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" /> Other Possibilities
                            </span>
                            <ChevronDown className="h-4 w-4 text-alkota-steel group-open:rotate-180 transition-transform" />
                          </summary>
                          <ul className="mt-4 pt-4 border-t border-alkota-iron space-y-2 text-sm text-alkota-silver list-disc list-inside">
                            {results.secondaryCauses.map((cause: string, i: number) => (
                              <li key={i}>{cause}</li>
                            ))}
                          </ul>
                        </details>
                      </div>

                      <div className="bg-alkota-blue/10 border border-alkota-blue/20 rounded-xl p-6">
                        <h4 className="text-alkota-blue font-black uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                          <Search className="h-4 w-4" /> What To Tell Your Engineer
                        </h4>
                        <p className="text-sm text-white italic bg-black/40 p-4 rounded-lg font-mono">
                          "{results.whatToTellEngineer}"
                        </p>
                      </div>

                      {results.isLikelyWarranty && (
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                          <h4 className="text-blue-500 font-black uppercase tracking-widest text-xs mb-2">Warranty Notice</h4>
                          <p className="text-white text-sm leading-relaxed">
                            This fault may be covered under your Alkota warranty. Have your machine serial number and purchase date ready when you contact us.
                          </p>
                        </div>
                      )}
                   </div>
                 </div>

                 {/* CTA block */}
                 <div className={`rounded-xl p-8 border mt-8 \${
                   results.recommendedAction === 'self-resolve' ? 'bg-alkota-green/10 border-alkota-green/30' :
                   results.recommendedAction === 'monitor' ? 'bg-amber-500/10 border-amber-500/30' :
                   'bg-alkota-orange/10 border-alkota-orange/30'
                 }`}>
                    <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 \${
                       results.recommendedAction === 'self-resolve' ? 'text-alkota-green' :
                       results.recommendedAction === 'monitor' ? 'text-amber-500' :
                       'text-alkota-orange'
                    }`}>
                      {results.recommendedAction === 'self-resolve' ? 'You may be able to fix this yourself.' :
                       results.recommendedAction === 'monitor' ? 'Monitor this closely.' :
                       'This needs a qualified engineer.'}
                    </h3>
                    
                    <p className="text-white text-sm mb-6">
                      {results.recommendedAction === 'self-resolve' ? 'If the checks above don\'t resolve it, book a service call.' :
                       results.recommendedAction === 'monitor' ? 'If it worsens, book a service call within the week.' :
                       'The machine structure or critical components require professional attention. Do not use the machine.'}
                    </p>

                    <Link 
                      href={`/support/book-service?fault=\${encodeURIComponent(results.likelyCause)}`}
                      className={`inline-block px-8 py-4 rounded-sm font-black uppercase italic tracking-widest text-sm transition-all text-white \${
                        results.recommendedAction === 'book-service' ? 'bg-alkota-orange hover:bg-alkota-orange-bright' : 'border border-current hover:bg-white/5'
                      }`}
                    >
                      Book a Service Call Now →
                    </Link>
                 </div>

                 <div className="text-center pt-8">
                   <button 
                     onClick={() => {
                        setMachineType('');
                        setSymptom('');
                        setFollowUps({});
                        setStatus('intro');
                     }}
                     className="text-alkota-steel font-bold uppercase text-xs tracking-widest hover:text-white"
                   >
                     Diagnose a different fault
                   </button>
                 </div>

               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
