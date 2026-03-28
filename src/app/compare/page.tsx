'use client';

import { useState, useEffect } from 'react';
import { MACHINES, MachineData } from '@/lib/machines';
import { CheckCircle2, Copy, Share2, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Simple helper to safely get numeric values for highlighting "best in class" specs
const extractNum = (str: string) => {
  if (!str) return 0;
  const match = str.match(/(\\d+(\\.\\d+)?)/);
  return match ? parseFloat(match[0]) : 0;
};

type CompareProps = {
  searchParams: { machines?: string };
};

export default function ComparePage({ searchParams }: CompareProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['', '', '']);
  const [copied, setCopied] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    if (searchParams.machines) {
      const ids = searchParams.machines.split(',').slice(0, 3);
      const newIds = ['', '', ''];
      ids.forEach((id, i) => { newIds[i] = id });
      setSelectedIds(newIds);
    }
  }, [searchParams]);

  // Update URL manually via history to avoid full re-render jump
  const updateUrl = (ids: string[]) => {
    const validIds = ids.filter(Boolean);
    const newUrl = validIds.length > 0 ? `/compare?machines=\${validIds.join(',')}` : '/compare';
    window.history.replaceState({ path: newUrl }, '', newUrl);
  };

  const handleSelect = (index: number, id: string) => {
    const newIds = [...selectedIds];
    newIds[index] = id;
    setSelectedIds(newIds);
    updateUrl(newIds);
  };

  const selectedMachines = selectedIds.map(id => MACHINES.find(m => m.id === id));
  const activeCount = selectedMachines.filter(Boolean).length;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group machines for the dropdown
  const groupedMachines = MACHINES.reduce((acc, machine) => {
    if (!acc[machine.type]) acc[machine.type] = [];
    acc[machine.type].push(machine);
    return acc;
  }, {} as Record<string, MachineData[]>);

  // Spec rows config
  const specRows = [
    { label: 'Machine Series', key: 'series', isBest: false },
    { label: 'Max Pressure (bar)', key: (m: MachineData) => m.specs.pressureBar, isBest: true, parse: extractNum },
    { label: 'Max Flow (LPM)', key: (m: MachineData) => m.specs.flowLPM, isBest: true, parse: extractNum },
    { label: 'Power Source', key: (m: MachineData) => m.specs.powerSource, isBest: false },
    { label: 'Fuel Type', key: (m: MachineData) => m.specs.fuelType, isBest: false },
    { label: 'Drive Type', key: (m: MachineData) => m.specs.driveType, isBest: false },
    { label: 'Motor Output', key: (m: MachineData) => m.specs.motorKW, isBest: true, parse: extractNum },
    { label: 'Weight (kg)', key: (m: MachineData) => m.specs.weightKG, isBest: false },
    { label: 'Coil Warranty', key: (m: MachineData) => m.specs.coilWarranty, isBest: false },
    { label: 'Certifications', key: (m: MachineData) => m.specs.certifications, isBest: false },
    { label: 'Mobility', key: (m: MachineData) => m.specs.mobility, isBest: false },
    { label: 'Ideal Application', key: (m: MachineData) => m.specs.idealApplication, isBest: false },
  ];

  return (
    <main className="min-h-screen bg-alkota-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-alkota-iron">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
              Compare <span className="text-alkota-orange">Machines</span>
            </h1>
            <p className="text-alkota-steel font-bold uppercase tracking-widest text-sm">Side-by-side technical specification</p>
          </div>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-alkota-steel border border-alkota-iron hover:border-alkota-steel text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider transition-colors"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-alkota-green" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Link Copied!' : 'Share Comparison'}
          </button>
        </div>

        {/* Machine Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="hidden md:block">
            {/* Empty space above row labels */}
          </div>
          {[0, 1, 2].map(index => (
            <div key={index} className="bg-alkota-steel border border-alkota-iron rounded-lg p-4">
               <label className="block text-[10px] text-alkota-steel font-black uppercase tracking-widest mb-2">Machine {index + 1}</label>
               <select 
                 value={selectedIds[index]} 
                 onChange={(e) => handleSelect(index, e.target.value)}
                 className="w-full bg-alkota-black border border-alkota-iron rounded p-2 text-white text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-alkota-orange"
               >
                 <option value="">-- Select Machine --</option>
                 {Object.entries(groupedMachines).map(([type, machines]) => (
                   <optgroup key={type} label={type.replace('-', ' ').toUpperCase()} className="bg-alkota-steel text-alkota-steel text-[10px]">
                     {machines.map(m => (
                       <option key={m.id} value={m.id} className="text-white text-sm bg-alkota-black">{m.name}</option>
                     ))}
                   </optgroup>
                 ))}
               </select>
            </div>
          ))}
        </div>

        {activeCount === 0 ? (
          <div className="text-center py-20 bg-alkota-steel/30 border border-alkota-iron border-dashed rounded-xl">
            <Info className="w-12 h-12 text-alkota-steel mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-black uppercase text-alkota-steel tracking-widest">Select machines to begin</h2>
            <p className="text-alkota-silver text-sm mt-2">Use the dropdowns above to add up to 3 machines for comparison.</p>
          </div>
        ) : (
          <div className="relative">
             
             {/* Sticky Headers */}
             <div className="sticky top-20 z-20 bg-alkota-black/95 backdrop-blur-sm pt-4 pb-4 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-alkota-orange shadow-lg">
                <div className="hidden md:block self-end pb-2">
                  <span className="text-alkota-steel font-black uppercase tracking-widest text-xs">Specification</span>
                </div>
                {[0, 1, 2].map(index => {
                  const m = selectedMachines[index];
                  return (
                    <div key={index} className="text-center md:text-left self-end">
                      {m ? (
                        <>
                          <div className="text-[10px] text-alkota-orange font-black uppercase tracking-widest mb-1">{m.series}</div>
                          <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white">{m.name}</h3>
                        </>
                      ) : (
                        <div className="h-4 border-b border-alkota-iron w-1/2 md:w-full opacity-30 mt-8 mb-2 mx-auto md:mx-0"></div>
                      )}
                    </div>
                  );
                })}
             </div>

             {/* Specs Table */}
             <div className="mt-4 pb-12 space-y-2">
               {specRows.map((row, i) => {
                 
                 // Find the best value (highest number) if this row highlights best specs
                 let bestValue = 0;
                 if (row.isBest) {
                   const values = selectedMachines.map(m => m ? row.parse!(typeof row.key === 'function' ? row.key(m) : m[row.key as keyof MachineData] as any) : 0);
                   bestValue = Math.max(...values);
                 }

                 return (
                   <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 py-4 border-b border-alkota-iron hover:bg-alkota-steel/30 transition-colors">
                     <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                       <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-alkota-steel">{row.label}</span>
                     </div>
                     
                     {[0, 1, 2].map(colIdx => {
                       const m = selectedMachines[colIdx];
                       if (!m) return <div key={colIdx} className="hidden md:block"></div>;
                       
                       const rawVal = typeof row.key === 'function' ? row.key(m) : m[row.key as keyof MachineData];
                       const valStr = String(rawVal);
                       const currentNumValue = row.isBest ? row.parse!(valStr) : 0;
                       const isHighest = row.isBest && currentNumValue > 0 && currentNumValue === bestValue;

                       return (
                         <div key={colIdx} className="flex justify-between md:justify-start items-center gap-2">
                           <span className="md:hidden text-[10px] uppercase font-bold text-alkota-steel text-left w-1/3">{m.name}</span>
                           <span className={`text-sm font-medium w-2/3 md:w-auto text-right md:text-left \${isHighest ? 'text-alkota-orange font-bold' : 'text-white'}`}>
                             {valStr}
                           </span>
                           {isHighest && (
                             <span className="hidden lg:inline-flex bg-alkota-orange/10 border border-alkota-orange/30 text-alkota-orange text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ml-2">
                               Highest
                             </span>
                           )}
                         </div>
                       );
                     })}
                   </div>
                 );
               })}
             </div>

             {/* Highlights & CTAs */}
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-12 border-t border-alkota-iron">
               <div className="hidden md:flex flex-col justify-end pb-8">
                 <span className="text-alkota-steel font-black uppercase tracking-widest text-xs">Action</span>
               </div>
               
               {[0, 1, 2].map(index => {
                 const m = selectedMachines[index];
                 if (!m) return <div key={index} className="hidden md:block"></div>;
                 
                 return (
                   <div key={index} className="bg-alkota-steel p-6 rounded-xl border border-alkota-iron flex flex-col items-center text-center">
                     <ul className="space-y-3 mb-8 text-left w-full border-b border-alkota-iron pb-8">
                       <li className="text-[10px] uppercase font-black tracking-widest text-alkota-steel mb-4 text-center">Key Highlights</li>
                       {m.highlights.map((hlt, hi) => (
                         <li key={hi} className="flex items-start gap-3">
                           <CheckCircle2 className="w-4 h-4 text-alkota-orange flex-shrink-0 mt-0.5" />
                           <span className="text-xs font-bold text-alkota-silver leading-relaxed">{hlt}</span>
                         </li>
                       ))}
                     </ul>
                     
                     <div className="w-full flex flex-col gap-3 mt-auto">
                        <Link 
                          href={m.slug}
                          className="w-full border border-alkota-iron hover:border-alkota-steel text-white px-4 py-3 rounded text-[10px] font-black uppercase tracking-widest transition-colors"
                        >
                          View Full Spec
                        </Link>
                        <Link 
                          href={`/quote?machine=\${m.id}`}
                          className="w-full bg-alkota-orange hover:bg-alkota-orange-bright text-white px-4 py-3 rounded text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                        >
                          Request a Quote <ArrowRight className="w-3 h-3" />
                        </Link>
                     </div>
                   </div>
                 );
               })}
             </div>

          </div>
        )}

      </div>
    </main>
  );
}
