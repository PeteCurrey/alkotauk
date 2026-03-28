'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Briefcase, ShoppingCart, TrendingUp, AlertTriangle, ArrowRight, Truck, Flame, Droplets, Droplet } from 'lucide-react';
import Link from 'next/link';

type MachineCategory = 'hot' | 'cold' | 'steam' | 'trailer';

const CATEGORY_DATA = {
  hot: {
    label: 'Hot water machine (industrial)',
    icon: Flame,
    defaultDayRate: 95,
    benchmarkPurchase: 4500,
    annualMaint: 350,
  },
  cold: {
    label: 'Cold water machine (industrial)',
    icon: Droplets,
    defaultDayRate: 65,
    benchmarkPurchase: 2500,
    annualMaint: 200,
  },
  steam: {
    label: 'Steam cleaner',
    icon: Droplet,
    defaultDayRate: 110,
    benchmarkPurchase: 4800,
    annualMaint: 400,
  },
  trailer: {
    label: 'Mobile trailer system',
    icon: Truck,
    defaultDayRate: 150,
    benchmarkPurchase: 12000,
    annualMaint: 600,
  }
};

export default function HireVsBuyPage() {
  const [category, setCategory] = useState<MachineCategory>('hot');
  const [daysPerYear, setDaysPerYear] = useState(50);
  const [dayRate, setDayRate] = useState(CATEGORY_DATA.hot.defaultDayRate);

  const handleCategoryChange = (cat: MachineCategory) => {
    setCategory(cat);
    setDayRate(CATEGORY_DATA[cat].defaultDayRate);
  };

  const data = CATEGORY_DATA[category];

  const calcBuyCost = (years: number) => {
    let cost = data.benchmarkPurchase;
    // Maintenance kicks in after year 1
    if (years > 1) {
      cost += data.annualMaint * (years - 1);
    }
    // Assume 25% residual value at year 5
    if (years === 5) {
      cost -= data.benchmarkPurchase * 0.25;
    }
    return cost;
  };

  const calcHireCost = (years: number) => {
    return daysPerYear * dayRate * years;
  };

  // Crossover: The number of days/year over 5 years where hire cost == buy cost (net of residual)
  const fiveYearBuyNet = calcBuyCost(5);
  const crossoverDays = Math.ceil(fiveYearBuyNet / (dayRate * 5));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(Math.round(val));
  };


  return (
    <main className="min-h-screen bg-alkota-black pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* INTRO */}
        <div className="text-center py-20">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-6">
            Hire <span className="text-alkota-steel mx-2">vs</span> <span className="text-alkota-orange">Buy</span> Tracker
          </h1>
          <p className="text-xl text-alkota-steel font-bold uppercase tracking-widest mb-6">
            Work out exactly when buying an Alkota machine makes financial sense.
          </p>
          <p className="max-w-3xl mx-auto text-alkota-silver leading-relaxed">
             Hiring is flexible, but it drains cash if you're using equipment regularly. Buying involves capital upfront, but builds an asset and slashes day-to-day costs. Adjust your estimated usage below to find your specific crossover point.
          </p>
        </div>

        {/* INPUT FORM & REALTIME RESULTS */}
        <div className="bg-alkota-steel rounded-xl border border-alkota-iron p-8 md:p-12 mb-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            
            {/* INPUtS */}
            <div className="space-y-8">
               <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-6 flex items-center gap-3">
                 <Calculator className="w-6 h-6 text-alkota-orange" /> 1. Usage Profile
               </h2>

               <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-3">Machine Category</label>
                 <div className="grid grid-cols-2 gap-3">
                   {(Object.keys(CATEGORY_DATA) as MachineCategory[]).map(cat => {
                     const Icon = CATEGORY_DATA[cat].icon;
                     const isSelected = category === cat;
                     return (
                       <button
                         key={cat}
                         onClick={() => handleCategoryChange(cat)}
                         className={`p-4 border-2 rounded-lg text-left transition-colors flex flex-col items-center justify-center text-center gap-2 \${
                           isSelected ? 'border-alkota-orange bg-alkota-orange/10 text-white' : 'border-alkota-iron bg-alkota-black text-alkota-silver hover:border-alkota-steel'
                         }`}
                       >
                         <Icon className={`w-6 h-6 \${isSelected ? 'text-alkota-orange' : 'text-alkota-steel'}`} />
                         <span className="text-xs uppercase font-bold tracking-wider">{CATEGORY_DATA[cat].label.split(' ')[0]}</span>
                       </button>
                     )
                   })}
                 </div>
               </div>

               <div>
                 <label className="flex justify-between text-xs font-bold uppercase tracking-widest text-alkota-steel mb-3">
                   <span>Days Required Per Year</span>
                   <span className="text-white text-lg">{daysPerYear} days</span>
                 </label>
                 <input 
                   type="range"
                   min="1"
                   max="260"
                   value={daysPerYear}
                   onChange={e => setDaysPerYear(parseInt(e.target.value))}
                   className="w-full accent-alkota-orange mb-2"
                 />
                 <div className="flex justify-between text-[10px] text-alkota-steel uppercase font-bold tracking-widest mt-1">
                   <span>Occasional</span>
                   <span>Daily (Mon-Fri)</span>
                 </div>
               </div>

               <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-alkota-steel mb-3">Average Hire Rate (£/day)</label>
                 <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-alkota-steel font-bold">£</span>
                   <input 
                     type="number"
                     value={dayRate}
                     onChange={e => setDayRate(parseInt(e.target.value) || 0)}
                     className="w-full bg-alkota-black border border-alkota-iron rounded-lg pl-8 p-4 text-white font-bold focus:border-alkota-orange focus:outline-none transition-colors"
                   />
                 </div>
                 <p className="text-[10px] text-alkota-steel uppercase font-bold tracking-widest mt-2 bg-alkota-iron/20 p-2 rounded">
                   Pre-filled with Alkota benchmark for {data.label}. Feel free to edit.
                 </p>
               </div>
            </div>

            {/* RESULTS TABLES */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-6 flex items-center gap-3">
                 <TrendingUp className="w-6 h-6 text-alkota-orange" /> 2. Cost Projection
               </h2>

               {/* Hire Cost Table */}
               <div className="bg-alkota-black border border-alkota-iron rounded-xl overflow-hidden">
                 <div className="bg-alkota-iron/30 p-4 border-b border-alkota-iron flex items-center justify-between">
                   <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                     <Briefcase className="w-4 h-4 text-alkota-steel" /> Hire Cost
                   </h3>
                   <span className="text-[10px] text-alkota-steel uppercase tracking-widest bg-black px-2 py-1 rounded">Accumulating Cost</span>
                 </div>
                 <div className="grid grid-cols-3 divide-x divide-alkota-iron text-center">
                   <div className="p-4">
                     <p className="text-[10px] text-alkota-steel font-bold uppercase tracking-widest mb-1">1 Year</p>
                     <p className="text-xl text-white font-bold">{formatCurrency(calcHireCost(1))}</p>
                   </div>
                   <div className="p-4 bg-alkota-iron/10">
                     <p className="text-[10px] text-alkota-steel font-bold uppercase tracking-widest mb-1">3 Years</p>
                     <p className="text-xl text-white font-bold">{formatCurrency(calcHireCost(3))}</p>
                   </div>
                   <div className="p-4 bg-alkota-iron/20">
                     <p className="text-[10px] text-alkota-steel font-bold uppercase tracking-widest mb-1">5 Years</p>
                     <p className="text-2xl text-alkota-orange font-black font-barlow-condensed">{formatCurrency(calcHireCost(5))}</p>
                   </div>
                 </div>
               </div>

               {/* Buy Cost Table */}
               <div className="bg-alkota-black border border-alkota-iron rounded-xl overflow-hidden mt-6">
                 <div className="bg-alkota-green/10 p-4 border-b border-alkota-iron flex items-center justify-between">
                   <h3 className="font-black text-sm uppercase tracking-widest text-white flex items-center gap-2">
                     <ShoppingCart className="w-4 h-4 text-alkota-green" /> Purchase Cost
                   </h3>
                   <span className="text-[10px] text-alkota-green uppercase tracking-widest bg-black px-2 py-1 rounded">Capital Asset</span>
                 </div>
                 <div className="grid grid-cols-3 divide-x divide-alkota-iron text-center">
                   <div className="p-4">
                     <p className="text-[10px] text-alkota-steel font-bold uppercase tracking-widest mb-1">1 Year</p>
                     <p className="text-xl text-white font-bold">{formatCurrency(calcBuyCost(1))}</p>
                   </div>
                   <div className="p-4 bg-alkota-iron/10">
                     <p className="text-[10px] text-alkota-steel font-bold uppercase tracking-widest mb-1">3 Years</p>
                     <p className="text-xl text-white font-bold">{formatCurrency(calcBuyCost(3))}</p>
                   </div>
                   <div className="p-4 bg-alkota-iron/20">
                     <p className="text-[10px] text-alkota-steel font-bold uppercase tracking-widest mb-1">5 Years Net</p>
                     <p className="text-2xl text-alkota-green font-black font-barlow-condensed">{formatCurrency(calcBuyCost(5))}</p>
                   </div>
                 </div>
                 <div className="bg-black/80 px-4 py-2 text-[10px] text-alkota-steel text-center italic border-t border-alkota-iron">
                    Base: ~{formatCurrency(data.benchmarkPurchase)} + maint. Year 5 Net includes 25% residual asset value.
                 </div>
               </div>
            </div>

          </div>

          {/* CROSSOVER DIRECTIVE */}
          <div className="border-t border-alkota-iron pt-10">
             
             {daysPerYear >= crossoverDays ? (
               <div className="bg-alkota-green/10 border border-alkota-green/30 rounded-xl p-8 md:p-12 text-center shadow-lg">
                 <ShoppingCart className="w-12 h-12 text-alkota-green mx-auto mb-4" />
                 <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2 shadow-black drop-shadow-md">
                   Buying is your most economical option
                 </h2>
                 <p className="text-alkota-silver text-lg mb-8 max-w-2xl mx-auto">
                   At <strong>{daysPerYear} days per year</strong>, hiring is draining capital continuously. Your crossover point is just <strong>{crossoverDays} days/year</strong>. Any usage above that makes purchasing an Alkota machine the superior financial decision over 5 years.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                      href="/tools/machine-match"
                      className="bg-alkota-green hover:bg-green-600 text-white px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      Find Your Machine <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link 
                      href="/quote"
                      className="border border-alkota-iron hover:border-alkota-steel text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
                    >
                      Request a Quote
                    </Link>
                 </div>
               </div>
             ) : (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-8 md:p-12 text-center">
                 <Briefcase className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                 <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2 shadow-black drop-shadow-md">
                   Hiring might be the wiser move
                 </h2>
                 <p className="text-alkota-silver text-lg mb-8 max-w-2xl mx-auto">
                   At just <strong>{daysPerYear} days per year</strong>, purchasing a high-end Alkota machine ties up capital for equipment that sits idle. Unless 24/7 immediate availability is critical, hiring remains cheaper. Your crossover threshold is <strong>{crossoverDays} days/year</strong>.
                 </p>
                 <div className="flex justify-center">
                    <Link 
                      href="/resources/hire"
                      className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-colors flex items-center gap-2"
                    >
                      Enquire About Hire Services <ArrowRight className="w-4 h-4" />
                    </Link>
                 </div>
               </div>
             )}
          </div>

        </div>

      </div>
    </main>
  );
}
