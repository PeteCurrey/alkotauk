import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Tractor,
  Fuel,
  Truck,
  Factory,
  UtensilsCrossed,
  HardHat,
  Building2,
  Ship,
  Wheat,
  Wrench,
} from "lucide-react";

const industries = [
  {
    icon: Tractor,
    title: "Agriculture",
    description:
      "Farm equipment, livestock facilities, and agricultural machinery require regular deep cleaning. Alkota pressure washers remove caked-on dirt, mud, and organic materials to keep your operation running efficiently and maintain equipment value.",
    applications: ["Farm equipment cleaning", "Livestock facility sanitation", "Grain bin maintenance", "Barn & stable washing"],
  },
  {
    icon: Fuel,
    title: "Oil & Gas",
    description:
      "The oil and gas industry demands equipment that can handle the toughest grease, oil, and hydrocarbon buildup. Alkota's hot water pressure washers and steam cleaners power through stubborn deposits in refineries, drilling sites, and pipelines.",
    applications: ["Rig & derrick cleaning", "Pipeline maintenance", "Refinery degreasing", "Tank cleaning"],
  },
  {
    icon: Truck,
    title: "Fleet Maintenance",
    description:
      "Keep your fleet looking professional and running efficiently. From long-haul trucking to municipal vehicles, Alkota wash systems remove road grime, salt, and contaminants that cause corrosion and reduce vehicle lifespan.",
    applications: ["Truck & trailer washing", "Bus fleet maintenance", "Municipal vehicle cleaning", "Heavy equipment wash"],
  },
  {
    icon: Factory,
    title: "Industrial Operations",
    description:
      "Manufacturing floors, heavy machinery, and industrial facilities need consistent, powerful cleaning. Alkota's stationary and portable systems handle everything from routine maintenance to heavy decontamination.",
    applications: ["Manufacturing floor cleaning", "Heavy machinery degreasing", "Facility maintenance", "Conveyor system cleaning"],
  },
  {
    icon: UtensilsCrossed,
    title: "Food Processing",
    description:
      "Food safety regulations demand rigorous cleaning standards. Alkota steam cleaners and hot water systems sanitize processing equipment, vats, and surfaces to meet FDA and USDA compliance requirements.",
    applications: ["Processing equipment sanitation", "Cold storage cleaning", "USDA compliance cleaning", "Vat & barrel sterilization"],
  },
  {
    icon: HardHat,
    title: "Construction",
    description:
      "Construction sites generate massive amounts of dirt, concrete, and debris. Alkota's rugged trailer-mounted and portable systems clean heavy equipment, vehicles, and job sites quickly and efficiently.",
    applications: ["Equipment cleaning on-site", "Concrete removal", "Post-construction cleanup", "Tool & machinery wash"],
  },
  {
    icon: Building2,
    title: "Government & Military",
    description:
      "Military bases, government facilities, and municipal operations trust Alkota for reliable, American-made cleaning equipment. Our trailer systems are perfect for remote deployments and field maintenance.",
    applications: ["Vehicle & equipment wash", "Base facility maintenance", "Field deployment cleaning", "Hangar & runway maintenance"],
  },
  {
    icon: Ship,
    title: "Marine & Maritime",
    description:
      "Salt, barnacles, and marine growth require powerful hot water and steam cleaning. Alkota systems handle hull cleaning, deck washing, and engine compartment detailing for commercial and industrial marine operations.",
    applications: ["Hull cleaning", "Deck washing", "Engine room degreasing", "Port facility maintenance"],
  },
  {
    icon: Wheat,
    title: "Grain & Feed",
    description:
      "Grain elevators, feed mills, and storage facilities need regular cleaning to prevent contamination and maintain quality. Alkota's cleaning systems handle dust, residue, and buildup efficiently.",
    applications: ["Grain elevator cleaning", "Feed mill sanitation", "Storage bin washing", "Transport vehicle cleaning"],
  },
  {
    icon: Wrench,
    title: "Automotive & Repair",
    description:
      "Auto shops, dealerships, and repair facilities use Alkota parts washers and pressure washers to degrease engines, clean parts, and maintain professional-grade facility cleanliness.",
    applications: ["Engine degreasing", "Parts washing", "Shop floor cleaning", "Vehicle detailing"],
  },
];

const Industries = () => {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Industries We Serve"
        description="Alkota pressure washers serve agriculture, oil & gas, food processing, construction, fleet maintenance, and more. Find the right cleaning solution for your industry."
        path="/industries"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Industries We Serve
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Cleaning Solutions for Every Industry
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              From agriculture to aerospace, Alkota's industrial-grade pressure
              washers and cleaning systems are trusted by professionals across
              dozens of industries worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="border border-border p-8 group hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-5 mb-5">
                  <div className="inline-flex items-center justify-center w-12 h-12 border border-border shrink-0">
                    <industry.icon
                      className="w-6 h-6 text-primary"
                      strokeWidth={1}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-light tracking-tight mb-2">
                      {industry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </div>
                <div className="ml-17 pl-[68px]">
                  <p className="text-xs text-primary font-light tracking-wide uppercase mb-3">
                    Common Applications
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {industry.applications.map((app, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground font-light flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-primary rounded-full shrink-0" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            Don't See Your Industry?
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto mb-8">
            We build custom cleaning solutions for unique applications. Our
            engineering team has 150+ years of combined experience — if you can
            dream it, we can build it.
          </p>
          <Link to="/contact">
            <Button variant="outline" size="sm" className="font-light tracking-wide">
              Tell Us About Your Application
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industries;
