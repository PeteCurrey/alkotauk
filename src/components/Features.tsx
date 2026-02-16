import { Settings, Award, Wrench, Users, Gauge, Phone } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Settings,
      title: "Precision Engineering",
      description:
        "Over 150 years of combined engineering experience. Technology that combines higher pressures, higher volumes, and higher temperatures.",
    },
    {
      icon: Award,
      title: "Industry Leading",
      description:
        "Practices that are now industry standards — better coils, improved pump designs, and more efficient oil burners developed in partnership with Wayne Combustion.",
    },
    {
      icon: Wrench,
      title: "Built to Last",
      description:
        "Handcrafted in Alcester, South Dakota since 1964. Every unit is built with serviceability and longevity in mind.",
    },
    {
      icon: Users,
      title: "Our People",
      description:
        "Masters of the trade with decades of experience. Many of our crew have been with us for over 20, 30, and even 40 years.",
    },
    {
      icon: Gauge,
      title: "Custom Solutions",
      description:
        "Can't find what you need? Our creative engineering staff has distinguished us as the leader in custom-designed pressure washers for unique applications.",
    },
    {
      icon: Phone,
      title: "Distributor Network",
      description:
        "A robust distribution network servicing agriculture, oil and gas, fleet maintenance, industrial operations, and many more industries worldwide.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
            Why Alkota
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            The Alkota Difference
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-border">
                <feature.icon
                  className="w-7 h-7 text-primary"
                  strokeWidth={1}
                />
              </div>
              <h3 className="text-xl font-light tracking-tight mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
