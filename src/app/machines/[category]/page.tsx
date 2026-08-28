import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import MachineCard from '@/components/MachineCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProducts, CANONICAL_CATEGORIES } from '@/lib/products';

interface MachineCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: MachineCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const dbCat = category === 'parts-washers' ? 'parts-washer' : category;
  const catInfo = CANONICAL_CATEGORIES[dbCat];
  const categoryName = catInfo?.name || category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return {
    title: `Alkota ${categoryName} | Industrial Specification | Alkota UK`,
    description: catInfo?.description || `Browse Alkota's range of premium industrial ${categoryName.toLowerCase()} systems. Engineered in South Dakota, built for the UK market.`,
    alternates: {
      canonical: `https://alkota.co.uk/machines/${category}`,
    }
  };
}

export default async function MachineCategoryPage({ params }: MachineCategoryPageProps) {
  const { category: categorySlug } = await params;
  const dbCategory = categorySlug === 'parts-washers' ? 'parts-washer' : categorySlug;
  
  const machines = await getProducts({ category: dbCategory });
  const catInfo = CANONICAL_CATEGORIES[dbCategory];
  const categoryName = catInfo?.name || categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Group machines by series
  const groupedMachines: Record<string, { name: string; description?: string; machines: typeof machines }> = {};
  for (const m of machines) {
    const series = m.series || 'Industrial Series';
    if (!groupedMachines[series]) {
      groupedMachines[series] = {
        name: series,
        description: m.engineering_story || m.description || '',
        machines: []
      };
    }
    groupedMachines[series].machines.push(m);
  }

  // Wash Bay Cabinet Series Data for Table (UK Specifications)
  const washBayModels = [
    { model: '216B', flow: '7.6 L/min (2.0 GPM)', pressure: '110 bar (1,600 PSI)', power: '230V / 1PH / 16A' },
    { model: '311B', flow: '11.4 L/min (3.0 GPM)', pressure: '76 bar (1,100 PSI)', power: '230V / 1PH / 16A' },
    { model: '420B', flow: '14.4 L/min (3.8 GPM)', pressure: '138 bar (2,000 PSI)', power: '230V / 1PH / 32A' },
    { model: '430B', flow: '14.4 L/min (3.8 GPM)', pressure: '207 bar (3,000 PSI)', power: '400V / 3PH / 16A' },
    { model: '520B', flow: '18.9 L/min (5.0 GPM)', pressure: '138 bar (2,000 PSI)', power: '400V / 3PH / 16A' },
    { model: '530B', flow: '18.9 L/min (5.0 GPM)', pressure: '207 bar (3,000 PSI)', power: '400V / 3PH / 32A' },
    { model: '835B', flow: '30.3 L/min (8.0 GPM)', pressure: '241 bar (3,500 PSI)', power: '400V / 3PH / 32A' },
    { model: '1030B', flow: '37.9 L/min (10.0 GPM)', pressure: '207 bar (3,000 PSI)', power: '400V / 3PH / 32A' },
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
              {categoryName.split(' ')[0]} <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">
                {categoryName.split(' ').slice(1).join(' ') || 'SYSTEMS.'}
              </span>
            </h1>
            <p className="font-inter max-w-2xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider">
              {catInfo?.description || `Premium ${categoryName} engineered for maximum durability, continuous duty, and superior long-term serviceability.`}
            </p>
          </header>

          <div className="space-y-40 pb-40">
            {Object.entries(groupedMachines).map(([series, data]) => (
              <section key={series} id={series.toLowerCase().replace(/\s+/g, '-').split('—')[0].trim()}>
                <div className="mb-12 max-w-4xl">
                  <h2 className="font-barlow-condensed text-5xl font-black text-alkota-black uppercase italic tracking-tighter mb-6">
                    {data.name}
                  </h2>
                  <p className="font-inter text-sm text-alkota-silver leading-relaxed uppercase tracking-widest max-w-3xl">
                    {data.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron md:grid-cols-2 lg:grid-cols-3">
                  {data.machines.map((machine, i) => (
                    <MachineCard key={machine.id || machine.slug} machine={machine} index={i} />
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
                    The Wash Bay Cabinet Series is Alkota&apos;s fixed-installation cold water range — built for permanent wash bay environments. Self-contained enclosed cabinet. Stable welded frame. Belt-driven triplex pump. Manufactured to the same exacting standards as the full Alkota range.
                    <br /><br />
                    Sixteen models covering 7.6 to 37.9 L/min (2–10 GPM). Auto start/stop available. The professional&apos;s choice for fleet depots, food processing, and agricultural buildings. UK voltage configurations available.
                  </p>
                </div>
                
                <div className="overflow-x-auto border border-alkota-iron font-barlow-condensed">
                  <table className="w-full text-left border-collapse bg-white">
                    <thead className="bg-alkota-black text-white text-[10px] uppercase tracking-widest font-bold">
                      <tr>
                        <th className="p-6 border-r border-white/10">Model</th>
                        <th className="p-6 border-r border-white/10">Flow Rate</th>
                        <th className="p-6 border-r border-white/10">Pressure</th>
                        <th className="p-6">UK Power Spec</th>
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
                      <h4 className="font-barlow-condensed text-2xl font-black text-white uppercase italic mb-2">Need a bespoke wash bay specification?</h4>
                      <p className="font-inter text-[10px] text-alkota-smoke uppercase tracking-widest">Additional models, custom plumbing configurations, and remote controls available on request.</p>
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
