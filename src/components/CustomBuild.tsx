import customBuild from "@/assets/custom-build.png";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const CustomBuild = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal animation="fade-right">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Custom Engineering
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Can't Find Your Dream Pressure Washer?
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-4">
              Custom is our middle name. We love creating custom pressure washers
              to meet our customers' unique needs. Our engineering staff has a
              combined 150+ years of experience in the industry.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              If you can dream it, we can build it. Complete the form to get in
              touch with a local Alkota distributor and make your dreams come
              true.
            </p>
            <Button variant="outline" size="sm" className="font-light tracking-wide">
              Get a Quote
            </Button>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay="200ms">
            <div className="flex items-center justify-center">
              <img
                src={customBuild}
                alt="Custom industrial pressure washer builds from Alkota"
                className="w-full max-w-md object-contain"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CustomBuild;
