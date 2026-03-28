import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Pressure Washer Buying Guide | Alkota UK',
  description: 'The ultimate guide to choosing the correct industrial pressure washer for your needs.',
};

export default function BuyingGuidePage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          BUYING <span className="text-alkota-orange">GUIDE.</span>
        </h1>
        <article className="prose prose-invert prose-lg max-w-none prose-a:text-alkota-orange prose-headings:font-black prose-headings:italic">
           <p className="lead border-l-4 border-alkota-orange pl-6 py-2 bg-alkota-iron/30">
              Purchasing an industrial pressure washer is a significant capital investment. The wrong machine will cost you thousands in lost productivity and maintenance.
           </p>
           <h2>1. Determine the Application</h2>
           <p>Are you cleaning mud off a tractor, or degreasing a heavy-duty engine block? As a rule of thumb, if grease, oil, or fat is involved, you absolutely must use hot water.</p>
           
           <h2>2. Power Source vs Mobility</h2>
           <p>Where are you cleaning? If you have reliable 3-Phase power at a static wash bay, an electric belt-drive machine is infinitely quieter and requires less maintenance than an engine-driven one. If you are cleaning out in the field, you'll need a petrol (Honda) or diesel (Kubota) powered unit.</p>
        </article>
      </div>
    </main>
  );
}
