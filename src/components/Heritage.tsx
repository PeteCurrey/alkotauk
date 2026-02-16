import madeInUsa from "@/assets/made-in-usa.png";
import ScrollReveal from "@/components/ScrollReveal";

const Heritage = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal animation="fade-right">
            <div className="inline-block mb-8">
              <div className="w-24 h-px bg-primary mb-6" />
              <p className="text-primary text-sm font-light tracking-[0.3em] uppercase">
                Since 1964
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              Handcrafted in the USA
            </h2>

            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
              Alkota got its start in 1964 building steam cleaners in a
              converted creamery in Alcester, South Dakota — the small rural
              town we still call home. Our name is an homage to our hometown:
              Al- for Alcester and -kota for South Dakota.
            </p>

            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
              In 1983, seven key employees came together to purchase Alkota
              Manufacturing with a common philosophy: treat your customers
              right, treat your employees right, and the rest will follow. That
              philosophy still guides us today.
            </p>

            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Many of our crew have been with us for over twenty years, some
              over thirty — and a few for more than four decades. With this
              depth of experience, our engineers and craftsmen know what it takes
              to deliver the perfect product for any application.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay="200ms">
            <div className="flex items-center justify-center">
              <img
                src={madeInUsa}
                alt="Alkota industrial pressure washers - proudly made in the USA"
                className="w-full max-w-lg object-contain"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Heritage;
