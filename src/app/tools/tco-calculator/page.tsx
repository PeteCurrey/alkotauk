'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, TrendingDown, Clock, Droplet, AlertTriangle, PackageOpen, CheckCircle2, Info } from 'lucide-react';
import Link from 'next/link';

type StepStatus = 'intro' | 'form' | 'generating' | 'results';

export default function TCOCalculatorPage() {
  const [status, setStatus] = useState<StepStatus>('intro');
  const [inputs, setInputs] = useState({
    machineType: 'Hot water (up to 200 bar)',
    dailyHours: '2–4 hrs',
    daysPerWeek: '5',
    currentMachine: 'Replacing an existing machine',
    breakdownFrequency: '1–2 times a year',
    repairCost: '250',
    labourCost: '35',
    chemicalSpend: '150',
    powerSource: 'Electric (3 phase)'
  });
  const [results, setResults] = useState<any>(null);

  const calculateTCO = async () => {
    setStatus('generating');

    try {
      const res = await fetch('/api/tco-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs }),
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      setResults(data);
      setStatus('results');
    } catch (error) {
      console.error(error);
      alert("Failed to calculate TCO. Please try again.");
      setStatus('form');
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <main className="min-h-screen bg-alkota-black pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
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
                Total Cost of Ownership <span className="text-alkota-orange">Calculator</span>
              </h1>
              <p className="text-xl text-alkota-steel font-bold uppercase tracking-widest mb-6">
                The premium pays back. See exactly when.
              </p>
              <p className="max-w-3xl mx-auto text-alkota-silver leading-relaxed mb-12">
                A cheap industrial pressure washer costs more over 5 years when you factor in downtime, engineer callouts, higher chemical usage, and earlier replacement cycles. Enter your usage profile to compare a standard generic machine against a premium Alkota system. 
              </p>
              <button
                onClick={() => setStatus('form')}
                className="bg-alkota-orange hover:bg-alkota-orange-bright text-white px-8 py-4 rounded-sm font-black uppercase italic tracking-widest text-lg transition-all"
              >
                Calculate My TCO →
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
               <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-8 border-b border-alkota-iron pb-4">
                 Usage Profile & Costs
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 
                 <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-2">Machine Type Needed</label>
                      <select 
                        value={inputs.machineType} 
                        onChange={e => setInputs({...inputs, machineType: e.target.value})}
                        className="w-full bg-alkota-steel border border-alkota-iron rounded-lg p-4 text-white font-bold focus:border-alkota-orange focus:outline-none transition-colors appearance-none"
                      >
                        <option>Hot water (up to 200 bar)</option>
                        <option>Hot water (200 bar+)</option>
                        <option>Cold water</option>
                        <option>Steam cleaner</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-2">Daily Usage</label>
                        <select 
                          value={inputs.dailyHours} 
                          onChange={e => setInputs({...inputs, dailyHours: e.target.value})}
                          className="w-full bg-alkota-steel border border-alkota-iron rounded-lg p-4 text-white font-bold focus:border-alkota-orange focus:outline-none transition-colors appearance-none"
                        >
                          <option>&lt;2 hrs</option>
                          <option>2–4 hrs</option>
                          <option>4–8 hrs</option>
                          <option>8–12 hrs</option>
                          <option>12+ hrs</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-2">Days per Week</label>
                        <select 
                          value={inputs.daysPerWeek} 
                          onChange={e => setInputs({...inputs, daysPerWeek: e.target.value})}
                          className="w-full bg-alkota-steel border border-alkota-iron rounded-lg p-4 text-white font-bold focus:border-alkota-orange focus:outline-none transition-colors appearance-none"
                        >
                          <option>1–2</option>
                          <option>3–4</option>
                          <option>5</option>
                          <option>6–7</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-2">Power Source</label>
                      <select 
                        value={inputs.powerSource} 
                        onChange={e => setInputs({...inputs, powerSource: e.target.value})}
                        className="w-full bg-alkota-steel border border-alkota-iron rounded-lg p-4 text-white font-bold focus:border-alkota-orange focus:outline-none transition-colors appearance-none"
                      >
                        <option>Electric (single phase)</option>
                        <option>Electric (3 phase)</option>
                        <option>Diesel</option>
                        <option>LPG</option>
                      </select>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-2">Current Situation</label>
                      <div className="space-y-3">
                         <label className="flex items-center gap-3 cursor-pointer p-4 border rounded-lg bg-alkota-steel border-alkota-iron hover:border-alkota-steel transition-colors group">
                           <input type="radio" checked={inputs.currentMachine === 'Looking to buy first machine'} onChange={() => setInputs({...inputs, currentMachine: 'Looking to buy first machine'})} className="accent-alkota-orange w-4 h-4" />
                           <span className="text-sm font-bold text-white uppercase tracking-wider">Buying first machine</span>
                         </label>
                         <label className="flex items-center gap-3 cursor-pointer p-4 border rounded-lg bg-alkota-steel border-alkota-orange transition-colors">
                           <input type="radio" checked={inputs.currentMachine === 'Replacing an existing machine'} onChange={() => setInputs({...inputs, currentMachine: 'Replacing an existing machine'})} className="accent-alkota-orange w-4 h-4" />
                           <span className="text-sm font-bold text-white uppercase tracking-wider">Replacing existing machine</span>
                         </label>
                      </div>
                    </div>

                    {inputs.currentMachine === 'Replacing an existing machine' && (
                      <div className="bg-alkota-iron/30 p-6 rounded-lg space-y-4 border border-alkota-iron">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-white mb-2">Current Breakdown Frequency</label>
                          <select 
                            value={inputs.breakdownFrequency} 
                            onChange={e => setInputs({...inputs, breakdownFrequency: e.target.value})}
                            className="w-full bg-alkota-black border border-alkota-iron rounded-lg p-3 text-white text-sm focus:border-alkota-orange focus:outline-none"
                          >
                            <option>Rarely (less than once a year)</option>
                            <option>1–2 times a year</option>
                            <option>3–4 times a year</option>
                            <option>More than 4 times a year</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-white mb-2">Average Repair Cost (£ per call)</label>
                          <input 
                            type="number"
                            value={inputs.repairCost} 
                            onChange={e => setInputs({...inputs, repairCost: e.target.value})}
                            className="w-full bg-alkota-black border border-alkota-iron rounded-lg p-3 text-white text-sm focus:border-alkota-orange focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-2 flex items-center justify-between">
                          Downtime Cost/Hr 
                          <span className="group relative">
                            <Info className="w-4 h-4 text-alkota-iron hover:text-white transition-colors cursor-help" />
                             <span className="invisible group-hover:visible absolute bottom-full mb-2 right-0 w-48 bg-white text-black text-[10px] p-2 rounded shadow-lg">Include operator wages & lost productivity while machine is down.</span>
                          </span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-alkota-steel font-bold">£</span>
                          <input 
                            type="number"
                            value={inputs.labourCost} 
                            onChange={e => setInputs({...inputs, labourCost: e.target.value})}
                            className="w-full bg-alkota-steel border border-alkota-iron rounded-lg pl-8 pr-4 py-4 text-white font-bold focus:border-alkota-orange focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-2">Chemical Spend/Mo</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-alkota-steel font-bold">£</span>
                          <input 
                            type="number"
                            value={inputs.chemicalSpend} 
                            onChange={e => setInputs({...inputs, chemicalSpend: e.target.value})}
                            className="w-full bg-alkota-steel border border-alkota-iron rounded-lg pl-8 pr-4 py-4 text-white font-bold focus:border-alkota-orange focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                 </div>

               </div>
               
               <div className="pt-8 border-t border-alkota-iron flex justify-between items-center">
                 <button onClick={() => setStatus('intro')} className="text-alkota-steel text-sm font-bold uppercase tracking-widest hover:text-white">← Back</button>
                 <button 
                   onClick={calculateTCO}
                   className="bg-alkota-orange hover:bg-alkota-orange-bright text-white px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-colors flex items-center gap-2"
                 >
                   Calculate My 5-Year Cost <Calculator className="w-4 h-4" />
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
                  <TrendingDown className="h-8 w-8 text-alkota-orange animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 animate-pulse">
                Modelling 5-Year Lifespan...
              </h2>
              <p className="text-alkota-steel uppercase tracking-widest text-sm font-bold">
                Applying UK engineer call-out rates & chemical efficiencies
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
               
               {/* Savings Hero */}
               <div className="bg-gradient-to-r from-alkota-orange to-alkota-steel p-8 md:p-12 rounded-xl border border-alkota-orange shadow-[0_0_30px_rgba(229,53,53,0.15)] flex flex-col md:flex-row items-center justify-between gap-8">
                 <div>
                   <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-2 shadow-black drop-shadow-md">
                     Save {formatCurrency(results.savingsOverFiveYears)} over 5 years
                   </h2>
                   <p className="text-white font-bold uppercase tracking-widest text-sm opacity-90 inline-flex items-center gap-2">
                     <Clock className="w-4 h-4" /> Breakeven: {results.breakevenPoint}
                   </p>
                 </div>
               </div>

               {/* Comparison Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Generic */}
                 <div className="bg-alkota-steel p-8 rounded-xl border border-alkota-iron text-center">
                   <h3 className="font-black uppercase tracking-widest text-alkota-steel mb-8">Generic Machine (5 Year Cost)</h3>
                   <div className="text-5xl font-black text-white mb-6 font-barlow-condensed tracking-tight">{formatCurrency(results.genericMachine?.year5TotalCost)}</div>
                   <p className="text-alkota-silver text-sm leading-relaxed mb-8 bg-alkota-black/50 p-4 rounded-lg">
                     {results.genericMachine?.breakdownNotes}
                   </p>
                   <div className="text-left space-y-3 pt-6 border-t border-alkota-iron">
                     <p className="flex justify-between text-sm"><span className="text-alkota-steel font-bold uppercase">Purchase</span> <span className="text-white">{formatCurrency(results.genericMachine?.purchasePrice)}</span></p>
                     <p className="flex justify-between text-sm"><span className="text-alkota-steel font-bold uppercase">Year 1 Run Cost</span> <span className="text-white">{formatCurrency(results.genericMachine?.year1Cost)}</span></p>
                     <p className="flex justify-between text-sm"><span className="text-alkota-steel font-bold uppercase">Year 3 Run Cost</span> <span className="text-white">{formatCurrency(results.genericMachine?.year3Cost)}</span></p>
                   </div>
                 </div>

                 {/* Alkota */}
                 <div className="bg-black p-8 rounded-xl border-2 border-alkota-orange text-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 bg-alkota-orange text-white text-[10px] uppercase font-black tracking-widest px-4 py-1 rounded-bl-lg">Recommended</div>
                   <h3 className="font-black uppercase tracking-widest text-alkota-orange mb-8">Alkota (5 Year Cost)</h3>
                   <div className="text-5xl font-black text-white mb-6 font-barlow-condensed tracking-tight">{formatCurrency(results.alkotaMachine?.year5TotalCost)}</div>
                   <p className="text-alkota-silver text-sm leading-relaxed mb-8 bg-alkota-steel/50 p-4 rounded-lg">
                     {results.alkotaMachine?.breakdownNotes}
                   </p>
                   <div className="text-left space-y-3 pt-6 border-t border-alkota-iron">
                     <p className="flex justify-between text-sm"><span className="text-alkota-steel font-bold uppercase">Purchase</span> <span className="text-white">{formatCurrency(results.alkotaMachine?.purchasePrice)}</span></p>
                     <p className="flex justify-between text-sm"><span className="text-alkota-steel font-bold uppercase">Year 1 Run Cost</span> <span className="text-white">{formatCurrency(results.alkotaMachine?.year1Cost)}</span></p>
                     <p className="flex justify-between text-sm"><span className="text-alkota-steel font-bold uppercase">Year 3 Run Cost</span> <span className="text-white">{formatCurrency(results.alkotaMachine?.year3Cost)}</span></p>
                   </div>
                 </div>
               </div>

               {/* Metrics Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {results.downtimeCostAnnual > 0 && (
                   <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-xl flex items-start gap-4">
                     <AlertTriangle className="text-amber-500 w-6 h-6 flex-shrink-0" />
                     <div>
                       <h4 className="text-amber-500 font-black uppercase tracking-widest text-xs mb-1">Hidden Drain</h4>
                       <p className="text-white font-bold text-lg mb-2">Downtime is costing {formatCurrency(results.downtimeCostAnnual)}/yr</p>
                       <p className="text-alkota-silver text-sm leading-relaxed">{results.downtimeCostNote}</p>
                     </div>
                   </div>
                 )}

                 {results.chemicalSavingsAnnual > 0 && (
                   <div className="bg-alkota-green/10 border border-alkota-green/30 p-6 rounded-xl flex items-start gap-4">
                     <Droplet className="text-alkota-green w-6 h-6 flex-shrink-0" />
                     <div>
                       <h4 className="text-alkota-green font-black uppercase tracking-widest text-xs mb-1">Efficiency Bonus</h4>
                       <p className="text-white font-bold text-lg mb-2">APW chemicals save {formatCurrency(results.chemicalSavingsAnnual)}/yr</p>
                       <p className="text-alkota-silver text-sm leading-relaxed">Formulated for rapid cut-through at lower dilutions, reducing bulk usage.</p>
                     </div>
                   </div>
                 )}
               </div>

               {/* Key Insights & Recommendation */}
               <div className="bg-alkota-steel rounded-xl border border-alkota-iron overflow-hidden">
                 <div className="p-8 border-b border-alkota-iron">
                   <h3 className="font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                     <PackageOpen className="w-5 h-5 text-alkota-orange" /> The Alkota Verdict
                   </h3>
                   <p className="text-alkota-silver leading-relaxed text-lg mb-8">{results.recommendation}</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {results.keyInsights?.map((insight: string, i: number) => (
                       <div key={i} className="flex gap-3 text-sm">
                         <CheckCircle2 className="text-alkota-orange w-5 h-5 flex-shrink-0 mt-0.5" />
                         <span className="text-alkota-silver leading-relaxed">{insight}</span>
                       </div>
                     ))}
                   </div>
                 </div>

                 {/* CTA */}
                 <div className="bg-alkota-black p-8 text-center flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                      href="/tools/machine-match"
                      className="bg-alkota-orange hover:bg-alkota-orange-bright text-white px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-colors"
                    >
                      Find My Machine →
                    </Link>
                    <Link 
                      href="/quote"
                      className="border border-alkota-iron hover:border-alkota-steel text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
                    >
                      Request a Quote →
                    </Link>
                 </div>
               </div>
               
               <div className="text-center pt-8">
                  <button 
                     onClick={() => {
                        setStatus('intro');
                        setResults(null);
                     }}
                     className="text-alkota-steel font-bold uppercase text-xs tracking-widest hover:text-white"
                   >
                     Start a new calculation
                   </button>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
