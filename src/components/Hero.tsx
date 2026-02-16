import heroImage from "@/assets/hero-pressure-gauge.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-3xl">
          <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-6">
            Commercial & Industrial Pressure Washers
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-4 tracking-tight leading-tight">
            Handcrafted To Perform.
          </h1>
          <h2 className="text-4xl md:text-6xl font-light text-white/90 tracking-tight leading-tight mb-8">
            Engineered To Last.
          </h2>
          <p className="text-white/60 font-light text-lg max-w-xl mb-10 leading-relaxed">
            High performance standard and customized hot or cold pressure
            washers, steam cleaners, parts washers, self-contained trailer
            units, and accessories — all made in the USA.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" size="sm" className="font-light tracking-wide border-white/30 text-white hover:bg-white/10">
              Get a Quote
            </Button>
            <Button variant="outline" size="sm" className="font-light tracking-wide border-white/30 text-white hover:bg-white/10">
              Find a Distributor
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
