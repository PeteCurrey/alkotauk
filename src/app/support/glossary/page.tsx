import Navigation from '@/components/Navigation';
import { safeFetch } from '@/sanity/client';

export const metadata = {
  title: 'Pressure Washer Glossary | Alkota UK',
  description: 'Understand industrial pressure washing terminology, from GPM and PSI to Schedule 80 and Hydro-Insulated Coils.',
};

export default async function GlossaryPage() {
  const query = `*[_type == "glossaryTerm"] | order(term asc) {
    term,
    definition
  }`;
  
  const terms = await safeFetch(query, []);
  const isMock = terms.length === 0;

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-4 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          TERMINOLOGY <span className="text-alkota-orange">GLOSSARY.</span>
        </h1>
        <p className="mb-12 text-xl text-alkota-silver">A comprehensive guide to the technical language of industrial cleaning.</p>
        
        <div className="space-y-8">
           {isMock ? (
              <>
                <div className="border-l-2 border-alkota-orange pl-6 py-2">
                  <h3 className="text-2xl font-bold text-white mb-2">GPM (Gallons Per Minute)</h3>
                  <p className="text-alkota-silver">The volume of water a pressure washer outputs over one minute. GPM determines how fast you can flush away dirt once the pressure (PSI) has broken the bond. We display specs in both Imperial GPM and Metric LPM.</p>
                </div>
                <div className="border-l-2 border-alkota-orange pl-6 py-2">
                  <h3 className="text-2xl font-bold text-white mb-2">PSI (Pounds per Square Inch)</h3>
                  <p className="text-alkota-silver">The measure of pressure the machine generates. This dictates the machine's "stripping power" to break the bond between the surface and the grime.</p>
                </div>
                <div className="border-l-2 border-alkota-orange pl-6 py-2">
                  <h3 className="text-2xl font-bold text-white mb-2">Schedule 80 Pipe</h3>
                  <p className="text-alkota-silver">A thick-walled steel pipe used in the construction of heating coils. It is significantly more durable, handles higher pressures, and resists burn-through better than thinner alternatives.</p>
                </div>
              </>
           ) : (
              terms.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-alkota-orange pl-6 py-2">
                  <h3 className="text-2xl font-bold text-white mb-2">{item.term}</h3>
                  <p className="text-alkota-silver">{item.definition}</p>
                </div>
              ))
           )}
        </div>
      </div>
    </main>
  );
}
