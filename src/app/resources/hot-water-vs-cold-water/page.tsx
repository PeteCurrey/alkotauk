import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Hot vs Cold Water Pressure Washers | Alkota UK',
  description: 'Understand the critical differences between hot and cold water pressure washers and which is right for your industry.',
};

export default function GuideHotVsCold() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          HOT VS COLD <span className="text-alkota-orange">WATER.</span>
        </h1>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-alkota-orange">
          <p className="lead text-2xl text-alkota-silver font-bold">
            The Golden Rule: Cold water pushes dirt. Hot water melts grease.
          </p>
          <p>
            You wouldn't wash greasy dishes in the sink with cold water. The same principle applies to industrial cleaning. If you are cleaning engines, food processing equipment, or a truck chassis heavily coated in road film and oil, you need a hot water pressure washer.
          </p>
          <h2 className="text-3xl mt-12 mb-6">When to Use Cold Water</h2>
          <ul>
            <li>Removing mud and caked-on topsoil from agricultural tractors.</li>
            <li>Washing away loose debris from construction sites.</li>
            <li>General cleaning where no oil, grease, or fat is present.</li>
          </ul>
          <h2 className="text-3xl mt-12 mb-6 border-b-2 border-alkota-orange pb-2 inline-block">When to Use Hot Water</h2>
          <ul className="text-alkota-silver">
            <li><strong>Engine Degreasing:</strong> Hot water breaks down hydrocarbons and synthetic oils instantly.</li>
            <li><strong>Food Hygiene:</strong> Required to meet sanitation standards and kill bacteria in meat processing or agricultural barns.</li>
            <li><strong>Winter De-icing:</strong> Thawing frozen pipes or melting ice buildup on critical infrastructure.</li>
          </ul>
          
          <div className="bg-alkota-iron/30 p-8 mt-16 border-l-4 border-alkota-orange">
             <h3 className="text-xl font-bold uppercase italic text-white mb-2">The Alkota Advantage</h3>
             <p className="text-sm m-0">Our patented hydro-insulated coils allow our hot water machines to reach maximum temperature significantly faster than the competition, while burning less diesel/kerosene.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
