import { supabaseAdmin } from '@/lib/supabase/server';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import MachineCard from '@/components/MachineCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface MachineCategoryPageProps {
  params: {
    category: string;
  };
}

export default async function MachineCategoryPage({ params }: MachineCategoryPageProps) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  
  // Fetch machines for this category from Supabase
  const { data } = await supabaseAdmin
    .from('machines')
    .select('*')
    .eq('category', categorySlug)
    .eq('active', true)
    .order('sort_order');
    
  const machines = data || [];

  const categoryName = categorySlug.replace('-', ' ');

  // Group machines by series
  const groupedMachines = (machines || []).reduce((acc: any, m: any) => {
    const series = m.series || "Other Models";
    if (!acc[series]) acc[series] = { name: series, description: m.series_description, machines: [] };
    acc[series].machines.push(m);
    return acc;
  }, {} as Record<string, { name: string; description: string; machines: any[] }>);

  // Wash Bay Cabinet Series Data for Table (Static)
  const washBayModels = [
    { model: '216B', flow: '2 GPM / 7.6L', pressure: '1600 PSI / 110B', power: '115V/1PH' },
    { model: '311B', flow: '3 GPM / 11.4L', pressure: '1100 PSI / 76B', power: '115V/1PH' },
    { model: '420B', flow: '3.8 GPM/14.4L', pressure: '2000 PSI / 138B', power: '230V/1PH' },
    { model: '430B', flow: '3.8 GPM/14.4L', pressure: '3000 PSI / 207B', power: '230V/1PH' },
    { model: '520B', flow: '5 GPM / 18.9L', pressure: '2000 PSI / 138B', power: '230V/1PH' },
    { model: '530B', flow: '5 GPM / 18.9L', pressure: '3000 PSI / 207B', power: '230V/3PH' },
    { model: '835B', flow: '8 GPM / 30.3L', pressure: '3500 PSI / 241B', power: '230V/3PH' },
    { model: '1030B', flow: '10 GPM/ 37.9L', pressure: '3000 PSI / 207B', power: '230V/3PH' },
  ];

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Background Watermark */}
        <div className="absolute top-20 right-0 pointer-events-none select-none opacity-[0.05] z-0">
          <span className="font-barlow-condensed text-[40vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
            {categorySlug.split('-')[0]}
          </span>
        </div>

        <div className="relative z-10">
          <Breadcrumbs items={[
            { label: 'Machines', href: '/machines' },
            { label: categoryName }
          ]} />
          
          <header className="mb-24 mt-12 max-w-4xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Industrial Specification
              </span>
            </div>
            <h1 className="font-barlow-condensed mb-10 text-7xl font-black text-alkota-black md:text-9xl uppercase italic leading-[0.8] tracking-tighter">
              {categoryName} <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">EQUIPMENT.</span>
            </h1>
            <p className="font-inter max-w-2xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider">
              {categorySlug === 'hot-water' && "Alkota hot water machines have eliminated grease, oil and biological contamination for industrial operators since 1964."}
              {categorySlug === 'cold-water' && "Industrial cold water pressure washers for mud, soil, caked debris and general wash-down. Tough by design."}
              {categorySlug === 'parts-washers' && "Aqueous hot water parts washers using biodegradable detergents. No solvents. No aerosols. Load the parts, set the timer, return when clean."}
              {!['hot-water', 'cold-water', 'parts-washers'].includes(categorySlug) && `Premium ${categoryName} systems engineered for maximum efficiency and durability.`}
            </p>
          </header>

          <div className="space-y-40 pb-40">
            {Object.entries(groupedMachines).map(([series, data]: any) => (
              <section key={series} id={series.toLowerCase().replace(/\s+/g, '-').split('—')[0].trim()}>
                <div className="mb-12 max-w-4xl">
                  <h2 className="font-barlow-condensed text-5xl font-black text-alkota-black uppercase italic tracking-tighter mb-6">
                    {data.name}
                  </h2>
                  <p className="font-inter text-sm text-alkota-silver leading-relaxed uppercase tracking-widest max-w-3xl">
                    {data.description || ""}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron md:grid-cols-2 lg:grid-cols-3">
                  {data.machines.map((machine: any, i: number) => (
                    <MachineCard key={machine.id} machine={machine} index={i} />
                  ))}
                </div>
              </section>
            ))}

            {/* Special Section: Cold Water Wash Bay B Series Spec Table */}
            {categorySlug === 'cold-water' && (
              <section id="wash-bay-series">
                <div className="mb-12 max-w-4xl">
                  <h2 className="font-barlow-condensed text-5xl font-black text-alkota-black uppercase italic tracking-tighter mb-6">
                    Wash Bay Series — Fixed Installation
                  </h2>
                  <p className="font-inter text-sm text-alkota-silver leading-relaxed uppercase tracking-widest max-w-4xl">
                    The Wash Bay Cabinet Series is Alkota's fixed-installation cold water range — built for permanent wash bay environments. Self-contained enclosed cabinet. Stable welded frame. Belt-driven triplex pump. ETL certified to UL-1776. 
                    <br /><br />
                    Sixteen models covering 2 GPM to 10 GPM. Auto start/stop available. The professional's choice for fleet depots, food processing, and agricultural buildings.
                  </p>
                </div>
                
                <div className="overflow-x-auto border border-alkota-iron font-barlow-condensed">
                  <table className="w-full text-left border-collapse bg-white">
                    <thead className="bg-alkota-black text-white text-[10px] uppercase tracking-widest font-bold">
                      <tr>
                        <th className="p-6 border-r border-white/10">Model</th>
                        <th className="p-6 border-r border-white/10">Flow Rate</th>
                        <th className="p-6 border-r border-white/10">Pressure</th>
                        <th className="p-6">Power Source</th>
                      </tr>
                    </thead>
                    <tbody className="text-xl font-bold text-alkota-black italic">
                      {washBayModels.map((row, i) => (
                        <tr key={i} className="border-t border-alkota-iron hover:bg-alkota-bg transition-colors">
                          <td className="p-6 border-r border-alkota-iron">{row.model}</td>
                          <td className="p-6 border-r border-alkota-iron">{row.flow}</td>
                          <td className="p-6 border-r border-alkota-iron">{row.pressure}</td>
                          <td className="p-6">{row.power}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-alkota-black p-12">
                   <div>
                      <h4 className="font-barlow-condensed text-2xl font-black text-white uppercase italic mb-2">Need a different specification?</h4>
                      <p className="font-inter text-[10px] text-alkota-smoke uppercase tracking-widest">Additional models and voltages are available on request to perfectly match your facility.</p>
                   </div>
                   <Link 
                     href="/contact?enquiry=wash-bay"
                     className="bg-alkota-orange px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-alkota-black transition-all flex items-center gap-4"
                   >
                      Specify your wash bay requirements <ArrowRight className="h-4 w-4" />
                   </Link>
                </div>
              </section>
            )}

            {machines.length === 0 && (
              <div className="py-40 text-center border border-alkota-iron bg-white">
                <p className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-[0.2em]">Products coming soon. Contact us for availability.</p>
                <Link href="/contact" className="mt-8 inline-block text-[11px] font-black uppercase tracking-widest text-alkota-orange hover:text-white transition-colors">Contact us →</Link>
              </div>
            )}
          </div>
        </div>
      </div>

    </main>
  );
}
