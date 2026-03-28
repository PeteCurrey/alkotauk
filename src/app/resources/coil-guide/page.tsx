import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Hydro-Insulated Coil Guide | Alkota UK',
  description: 'Learn why Alkota\'s patented hydro-insulated coils are the most efficient and durable heating elements in the pressure washer industry.',
};

export default function CoilGuidePage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          THE ALKOTA <span className="text-alkota-orange">COIL.</span>
        </h1>
        <article className="prose prose-invert prose-lg max-w-none prose-a:text-alkota-orange prose-headings:font-black prose-headings:italic">
           <p className="lead border-l-4 border-alkota-orange pl-6 py-2 bg-alkota-iron/30">
              The coil is the foundation of any hot water pressure washer. If your machine fails out in the field, 90% of the time, it's a burnt-through or scaled-up coil. We engineered ours so that doesn't happen.
           </p>
           
           <h2>The Cold Water Wrap Advantage</h2>
           <p>Our heating chamber is engineered completely differently from European models. Instead of the flame blasting directly against a thin-walled pipe lined with crumbling refractory cement, an Alkota coil features a "Cold Water Wrap".</p>
           <p>Water from the pump enters the *outside* of the coil structure first, wrapping entirely around the combustion chamber before entering the hot zone. This does three vital things:</p>
           <ol>
             <li><strong>Insulation:</strong> The outside of the combustion chamber stays remarkably cool. You can touch the exterior jacket without burning your hand.</li>
             <li><strong>Efficiency:</strong> Because heat isn't escaping through the outer jacket, 100% of the burner energy is forced inwards to heat your water, drastically reducing your diesel consumption.</li>
             <li><strong>No Refractory Cement:</strong> We don't need heavy, messy cement to insulate our burners. This makes the machine lighter, easier to service, and far less prone to cracking.</li>
           </ol>

           <h2>7-Year Guarantee</h2>
           <p>We are so confident in our Schedule 80 continuous-wound design that we back every coil with a 7-year guarantee. Nobody else in the industry offers this level of confidence.</p>
        </article>
      </div>
    </main>
  );
}
