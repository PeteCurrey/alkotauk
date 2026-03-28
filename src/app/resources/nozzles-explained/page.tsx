import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Pressure Washer Nozzles Explained | Alkota UK',
  description: 'Understand color-coded pressure washer nozzles, spray angles, and which tip to use for your application.',
};

export default function NozzlesGuidePage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          NOZZLES <span className="text-alkota-orange">EXPLAINED.</span>
        </h1>
        <article className="prose prose-invert prose-lg max-w-none prose-a:text-alkota-orange prose-headings:font-black prose-headings:italic">
           <p className="lead border-l-4 border-alkota-orange pl-6 py-2 bg-alkota-iron/30">
              Using the wrong nozzle can destroy a surface or render your 4000 PSI machine totally ineffective.
           </p>
           
           <h3 className="text-alkota-orange">0° Nozzle (Red) - Direct Jet</h3>
           <p>Fires a concentrated, pencil-thin stream of water. Extremely powerful and dangerous. Use for blasting caked-on mud from solid steel construction equipment. Never use on wood, siding, or tires.</p>
           
           <h3 className="text-yellow-500">15° Nozzle (Yellow) - Heavy Duty</h3>
           <p>Provides a narrow fan pattern. Excellent for paint stripping, removing heavy mildew, and tough degreasing on concrete.</p>
           
           <h3 className="text-green-500">25° Nozzle (Green) - General Cleaning</h3>
           <p>The workhorse nozzle. Creates a wide fan pattern safe for most sturdy surfaces. Ideal for washing vehicles, brickwork, and decks.</p>
           
           <h3 className="text-white">40° Nozzle (White) - Gentle Wash</h3>
           <p>A broad fan pattern that drastically reduces impact pressure. Safest choice for windows, fragile surfaces, and rinsing.</p>
           
           <h3 className="text-gray-900 bg-alkota-iron p-2 inline-block">65° Nozzle (Black) - Chemical/Soap Tip</h3>
           <p>This wide, low-pressure nozzle triggers the chemical injector on your machine to draw detergent through the line.</p>
        </article>
      </div>
    </main>
  );
}
