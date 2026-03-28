import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Why Alkota? | Industrial Pressure Washers',
  description: 'Understand the difference. Why Alkota is the Platinum Standard in hot and cold water pressure washers.',
};

export default function WhyAlkotaPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          WHY <span className="text-alkota-orange">ALKOTA?</span>
        </h1>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-alkota-orange">
          <p className="lead text-2xl text-alkota-silver font-bold">
            There are pressure washers, and then there is the Platinum Standard.
          </p>
          <p>
            Alkota machines are an investment in up-time. Our customers operate in industries where failure costs thousands of pounds in lost production or penalties. They choose Alkota because they cannot afford for their equipment to fail.
          </p>
          
          <ul className="mt-12 space-y-8 list-none pl-0">
            <li className="flex gap-4 items-start">
              <span className="text-alkota-orange font-black text-2xl">01/</span>
              <div>
                <strong className="block text-xl uppercase italic mb-2">Unmatched Durability</strong>
                No structural plastics. We weld solid steel, protecting the vital components inside a truly industrial housing.
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-alkota-orange font-black text-2xl">02/</span>
              <div>
                <strong className="block text-xl uppercase italic mb-2">Serviceability First</strong>
                If your machine ever needs maintenance, it’s designed to be worked on. Wide-open layouts, standard fittings, and intuitive engineering so your technician isn't fighting the machine.
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-alkota-orange font-black text-2xl">03/</span>
              <div>
                <strong className="block text-xl uppercase italic mb-2">Custom Built Options</strong>
                Need a trailer setup? A specialized hot box? Custom voltage for a marine application? Our production line is designed around bespoke orders. If you can dream it, we can build it.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
