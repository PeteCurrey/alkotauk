'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/client';
import { CheckCircle2, Share2, Info, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Simple helper to safely get numeric values for highlighting "best in class" specs
const extractNum = (str: any) => {
  if (!str) return 0;
  const val = typeof str === 'number' ? str : parseFloat(String(str).match(/(\d+(\.\d+)?)/)?.[0] || '0');
  return val;
};

type CompareProps = {
  searchParams: { machines?: string };
};

export default function ComparePage({ searchParams }: CompareProps) {
  const [allMachines, setAllMachines] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(['', '', '']);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all machines for selection
  useEffect(() => {
    client.fetch(`*[_type == "machine"] {
      _id,
      name,
      "slug": slug.current,
      category,
      "series": series->name,
      specs,
      eliteFeatures
    }`).then(data => {
      setAllMachines(data);
      setLoading(false);
    });
  }, []);

  // Initialize from URL params
  useEffect(() => {
    if (searchParams.machines && allMachines.length > 0) {
      const ids = searchParams.machines.split(',').slice(0, 3);
      const newIds = ['', '', ''];
      ids.forEach((id, i) => { 
        // Try to match by ID or slug
        const match = allMachines.find(m => m._id === id || m.slug === id);
        if (match) newIds[i] = match._id;
      });
      setSelectedIds(newIds);
    }
  }, [searchParams, allMachines]);

  const updateUrl = (ids: string[]) => {
    const validIds = ids.filter(Boolean);
    const newUrl = validIds.length > 0 ? `/compare?machines=${validIds.join(',')}` : '/compare';
    window.history.replaceState({ path: newUrl }, '', newUrl);
  };

  const handleSelect = (index: number, id: string) => {
    const newIds = [...selectedIds];
    newIds[index] = id;
    setSelectedIds(newIds);
    updateUrl(newIds);
  };

  const selectedMachines = selectedIds.map(id => allMachines.find(m => m._id === id));
  const activeCount = selectedMachines.filter(Boolean).length;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const groupedMachines = allMachines.reduce((acc, machine) => {
    const cat = machine.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(machine);
    return acc;
  }, {} as Record<string, any[]>);

  const specRows = [
    { label: 'Machine Series', key: 'series', isBest: false },
    { label: 'Pressure (BAR)', key: (m: any) => m.specs?.pressureBar, isBest: true, parse: extractNum },
    { label: 'Flow Rate (LPM)', key: (m: any) => m.specs?.flowRateLPM, isBest: true, parse: extractNum },
    { label: 'Power Source', key: (m: any) => m.specs?.powerSource, isBest: false },
    { label: 'Warranty (Coil)', key: (m: any) => m.specs?.coilWarrantyYears ? `${m.specs.coilWarrantyYears} Years` : 'Standard', isBest: false },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-alkota-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-alkota-orange animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-20 relative overflow-hidden">
       {/* Background Watermark */}
       <div className="absolute top-40 right-0 pointer-events-none select-none opacity-[0.02] z-0">
        <span className="font-barlow-condensed text-[50vw] font-black uppercase italic leading-none text-white whitespace-nowrap">
          COMPARE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-alkota-iron">
          <div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-2 font-barlow-condensed italic">
              ENGINEERING <span className="text-alkota-orange">MATRIX.</span>
            </h1>
            <p className="text-alkota-silver font-black uppercase tracking-widest text-[10px] font-ibm-plex-mono px-1">Side-by-side technical specification // live studio data</p>
          </div>
          <button 
            onClick={handleShare}
            className="flex items-center gap-3 bg-alkota-orange text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white hover:text-alkota-black"
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Link Copied!' : 'Share Comparison'}
          </button>
        </div>

        {/* Machine Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="hidden md:flex items-center">
             <span className="text-alkota-silver uppercase tracking-[0.3em] font-black text-[9px]">Select Fleet Units</span>
          </div>
          {[0, 1, 2].map(index => (
            <div key={index} className="bg-alkota-steel/40 border border-alkota-iron p-6">
               <label className="block text-[8px] text-alkota-orange font-black uppercase tracking-[0.4em] mb-4">Unit Specification 0{index + 1}</label>
               <select 
                 value={selectedIds[index]} 
                 onChange={(e) => handleSelect(index, e.target.value)}
                 className="w-full bg-alkota-black border border-alkota-iron p-3 text-white text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-alkota-orange appearance-none cursor-pointer"
               >
                 <option value="">-- Choose Machine --</option>
                 {(Object.entries(groupedMachines) as [string, any[]][]).map(([type, machines]) => (
                   <optgroup key={type} label={type.replace('-', ' ').toUpperCase()} className="bg-alkota-steel text-alkota-silver text-[9px] uppercase">
                     {machines.map(m => (
                       <option key={m._id} value={m._id} className="text-white text-[11px] bg-alkota-black uppercase">{m.name}</option>
                     ))}
                   </optgroup>
                 ))}
               </select>
            </div>
          ))}
        </div>

        {activeCount === 0 ? (
          <div className="text-center py-40 bg-alkota-steel/10 border border-alkota-iron border-dashed">
            <Info className="w-12 h-12 text-alkota-iron mx-auto mb-6" />
            <h2 className="text-4xl font-black uppercase text-white font-barlow-condensed italic tracking-tight">System Ready for Input</h2>
            <p className="text-alkota-silver text-[10px] uppercase tracking-widest mt-4">Select machines from the dropdowns to begin side-by-side technical analysis.</p>
          </div>
        ) : (
          <div className="relative">
             
             {/* Sticky Headers */}
             <div className="sticky top-20 z-20 bg-alkota-black/95 backdrop-blur-md pt-6 pb-6 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-alkota-orange shadow-2xl">
                <div className="hidden md:flex items-end pb-2">
                  <span className="text-alkota-silver font-black uppercase tracking-widest text-[10px]">Technical KPI</span>
                </div>
                {[0, 1, 2].map(index => {
                  const m = selectedMachines[index];
                  return (
                    <div key={index} className="text-center md:text-left self-end">
                      {m ? (
                        <>
                          <div className="text-[9px] text-alkota-orange font-black uppercase tracking-widest mb-1">{m.series}</div>
                          <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white font-barlow-condensed">{m.name}</h3>
                        </>
                      ) : (
                        <div className="h-px bg-alkota-iron/50 w-full mb-4"></div>
                      )}
                    </div>
                  );
                })}
             </div>

             {/* Specs Table */}
             <div className="mt-8 pb-12 space-y-4">
               {specRows.map((row, i) => {
                 let bestValue = 0;
                 if (row.isBest) {
                   const values = selectedMachines.map(m => m ? row.parse!(typeof row.key === 'function' ? row.key(m) : m[row.key as any]) : 0);
                   bestValue = Math.max(...values);
                 }

                 return (
                   <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 py-8 border-b border-alkota-iron/30 hover:bg-white/5 transition-all">
                     <div className="md:col-span-1 flex items-center">
                       <span className="text-[10px] font-black uppercase tracking-widest text-alkota-silver">{row.label}</span>
                     </div>
                     
                     {[0, 1, 2].map(colIdx => {
                       const m = selectedMachines[colIdx];
                       if (!m) return <div key={colIdx} className="hidden md:block"></div>;
                       
                       const rawVal = typeof row.key === 'function' ? row.key(m) : m[row.key as any];
                       const valStr = String(rawVal || 'N/A');
                       const currentNumValue = row.isBest ? row.parse!(rawVal) : 0;
                       const isHighest = row.isBest && currentNumValue > 0 && currentNumValue === bestValue;

                       return (
                         <div key={colIdx} className="flex justify-between md:justify-start items-center gap-4">
                           <span className="md:hidden text-[8px] uppercase font-black text-alkota-orange w-1/3">{m.name}</span>
                           <span className={`text-base font-bold w-2/3 md:w-auto text-right md:text-left font-ibm-plex-mono \${isHighest ? 'text-alkota-orange' : 'text-white'}`}>
                             {valStr}
                           </span>
                           {isHighest && (
                             <span className="hidden lg:inline-flex bg-alkota-orange text-white text-[7px] font-black uppercase tracking-widest px-2 py-0.5 ml-2">
                               Best In Class
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
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-20">
               <div className="hidden md:flex flex-col justify-end pb-8">
                 <span className="text-alkota-silver font-black uppercase tracking-widest text-[10px]">Final Assessment</span>
               </div>
               
               {[0, 1, 2].map(index => {
                 const m = selectedMachines[index];
                 if (!m) return <div key={index} className="hidden md:block"></div>;
                 
                 return (
                   <div key={index} className="bg-alkota-steel/40 p-8 border border-alkota-iron flex flex-col items-center">
                     <div className="w-full mb-8">
                        <span className="text-[9px] uppercase font-black tracking-[0.3em] text-alkota-orange block mb-6">Elite Features</span>
                        <ul className="space-y-4">
                          {m.eliteFeatures?.map((hlt: string, hi: number) => (
                            <li key={hi} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-alkota-orange flex-shrink-0 mt-0.5" />
                              <span className="text-[10px] font-black text-alkota-silver uppercase tracking-wider leading-relaxed">{hlt}</span>
                            </li>
                          )) || <li className="text-[10px] text-alkota-silver uppercase">Standard specification.</li>}
                        </ul>
                     </div>
                     
                     <div className="w-full flex flex-col gap-3 mt-auto">
                        <Link 
                          href={`/machines/\${m.category}/\${m.slug}`}
                          className="w-full border border-alkota-iron p-4 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-alkota-black transition-all text-center no-underline"
                        >
                          Technical File
                        </Link>
                        <Link 
                          href={`/contact?machine=\${m.modelCode}`}
                          className="w-full bg-alkota-orange p-4 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-alkota-black transition-all text-center no-underline flex items-center justify-center gap-3"
                        >
                          Request Quote <ArrowRight className="w-4 h-4" />
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
