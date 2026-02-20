import heroImage from "@/assets/hero-pressure-gauge.jpg";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}>

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-3xl">
          <ScrollReveal animation="fade-in" delay="200ms">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-6">
              Commercial & Industrial Pressure Washers
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay="400ms">
            <h1 className="text-5xl font-light text-white mb-4 tracking-tight leading-tight md:text-5xl">
              Handcrafted To Perform.
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay="600ms">
            <h2 className="text-5xl font-light text-white/90 tracking-tight leading-tight mb-8 md:text-5xl">
              Engineered To Last.
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay="800ms">
            <p className="text-white/60 max-w-xl mb-10 leading-relaxed text-base font-extralight">
              High performance standard & customised hot or cold pressure washers, steam cleaners, parts washers, self-contained trailer units and accessories — all made in the USA.
            

            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay="1000ms">
            <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="sm" className="font-light tracking-wide transition-all duration-500">
              Get a Quote
            </Button>
            <Button variant="hero" size="sm" className="font-light tracking-wide transition-all duration-500">
              Find a Distributor
            </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent animate-pulse" />
      </div>
    </section>);

};

export default Hero;