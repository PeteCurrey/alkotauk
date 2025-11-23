import { Settings, Award, Wrench } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Settings,
      title: "Precision Engineering",
      description: "Every component is carefully selected and engineered for optimal performance and longevity.",
    },
    {
      icon: Award,
      title: "Industry Leading",
      description: "Trusted by professionals worldwide for over six decades of proven reliability.",
    },
    {
      icon: Wrench,
      title: "Built to Last",
      description: "Handcrafted in the USA with heavy-duty materials designed for years of service.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-border">
                <feature.icon className="w-7 h-7 text-primary" strokeWidth={1} />
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
