import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Coil Technology | Alkota UK',
  description: 'Our industry-leading Schedule 80 hydro-insulated coil technology guarantees maximum fuel efficiency and operator safety.',
};

export default function CoilPage() {
  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="mb-8 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          THE ALKOTA <span className="text-alkota-orange">COIL.</span>
        </h1>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-a:text-alkota-orange">
          <p className="lead text-2xl text-alkota-silver font-bold">
            Guaranteed for 7 Years. Over-engineered for life.
          </p>
          <p>
            The beating heart of every Alkota hot water pressure washer is our exclusive, patented hydro-insulated coil. While competitors use cheap refractory insulation that crumbles and creates hotspots, our engineering is radically different.
          </p>
          <h3 className="text-2xl mt-10 mb-4 text-alkota-orange">Cold Water Wrap</h3>
          <p>
            The Alkota coil features a cold water wrap. Cold water from the pump wraps continuously around the exterior of the heating chamber before entering the hot zone. What does this mean? The exterior of the coil stays cool to the touch, drastically reducing heat loss, increasing burner efficiency, and protecting the operator.
          </p>
          <h3 className="text-2xl mt-10 mb-4 text-alkota-orange">Schedule 80 Steel Pipe</h3>
          <p>
            We don't use thin, rolled tubing. Every coil is rolled on-site from thick, continuous Schedule 80 steel pipe. It handles the highest pressures and resists scale buildup far better than the competition.
          </p>
        </div>
      </div>
    </main>
  );
}
