import { supabaseAdmin } from '@/lib/supabase/server';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import MachineCard from '@/components/MachineCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function MachinesPage() {
  // Fetch all machines from Supabase
  const { data } = await supabaseAdmin
    .from('machines')
    .select('*')
    .eq('active', true)
    .order('sort_order');
    
  const machines = data || [];
  
  
  // Unique categories from real data
  const categories = Array.from(new Set((machines || []).map((m: any) => m.category))).map(cat => ({
    name: (cat as string).replace('-', ' '),
    slug: cat as string
  }));

  return (
    <main className="min-h-screen bg-alkota-bg pt-32 pb-0">
      <Navigation />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Background Watermark */}
        <div className="absolute top-20 right-0 pointer-events-none select-none opacity-[0.05] z-0">
          <span className="font-barlow-condensed text-[40vw] font-black uppercase italic leading-none text-alkota-black whitespace-nowrap">
            FLEET
          </span>
        </div>

        <div className="relative z-10">
          <Breadcrumbs items={[{ label: 'Fleet' }]} />
          
          <header className="mb-24 mt-12 max-w-4xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-alkota-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
                Industrial Performance Fleet
              </span>
            </div>
            <h1 className="font-barlow-condensed mb-10 text-7xl font-black text-alkota-black md:text-9xl uppercase italic leading-[0.8] tracking-tighter">
              INDUSTRIAL <br />
              <span className="text-alkota-orange [text-stroke:1px_rgba(0,0,0,0.1)]">COMMAND.</span>
            </h1>
            <p className="font-inter max-w-2xl text-lg text-alkota-silver leading-relaxed uppercase tracking-wider">
              The definitive standard in industrial cleaning. From extreme-volume hot water systems to precision-engineered stationary units.
            </p>
          </header>

          {/* Categories Horizontal Strip */}
          <section className="mb-40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-alkota-iron border border-alkota-iron">
              {categories.slice(0, 4).map((cat, i) => (
                <Link 
                  key={cat.slug}
                  href={`/machines/${cat.slug}`}
                  className="group relative flex flex-col justify-end bg-white p-10 h-[350px] transition-all duration-500 hover:bg-alkota-bg"
                >
                  <div className="relative z-10">
                    <span className="font-ibm-plex-mono text-[9px] font-black text-alkota-orange uppercase mb-4 block opacity-0 group-hover:opacity-100 transition-opacity">
                      [ SERIES_0{i+1} ]
                    </span>
                    <h3 className="font-barlow-condensed text-4xl font-black text-alkota-black uppercase italic leading-none group-hover:text-alkota-orange transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <div className="mt-8 flex items-center gap-4 text-[10px] font-black text-alkota-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                      Access Range <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                  
                  {/* Background Watermark */}
                  <div className="absolute -right-4 -bottom-4 text-alkota-black/[0.03] text-9xl font-black italic uppercase select-none group-hover:text-alkota-orange/5 transition-colors duration-500">
                    {cat.name.split(' ')[0][0]}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-1 bg-alkota-orange transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          </section>

          {/* Full Catalogue Section */}
          <section className="relative">
            <div className="space-y-32 mb-40">
              {Object.entries(
                (machines || []).reduce((acc: any, m: any) => {
                  const series = m.series || 'Other';
                  if (!acc[series]) acc[series] = [];
                  acc[series].push(m);
                  return acc;
                }, {})
              ).map(([series, items]: [string, any], groupIndex) => (
                <div key={series}>
                  <div className="mb-12 flex items-center gap-8">
                    <h2 className="font-barlow-condensed text-5xl font-black text-alkota-black uppercase italic tracking-tighter md:text-7xl">
                      {series} <span className="text-alkota-orange">SERIES.</span>
                    </h2>
                    <div className="h-px flex-1 bg-alkota-iron hidden md:block" />
                    <span className="font-ibm-plex-mono text-[10px] text-alkota-silver uppercase tracking-widest">
                      UNIT_COUNT: {items.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron md:grid-cols-2 lg:grid-cols-3">
                    {items.map((machine: any, i: number) => (
                      <MachineCard key={machine.id} machine={machine} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
