import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Tractor,
  HardHat,
  Fuel,
  UtensilsCrossed,
  Building2,
  Factory,
  Truck,
  Trash2,
  Anchor,
} from "lucide-react";

const industries = [
  { icon: Tractor, name: "Agriculture", desc: "Farmers, ranchers, and growers trust Alkota for superior cleaning solutions." },
  { icon: HardHat, name: "Construction", desc: "Construction pros rely on Alkota for cleaning equipment, job sites, and more." },
  { icon: Fuel, name: "Oil, Gas & Mining", desc: "Cleaning with hot water is a game changer — quicker and better cleaning with Alkota." },
  { icon: UtensilsCrossed, name: "Food Processing", desc: "Hot water and steam cleaning solutions perfect for clean, safe, and compliant environments." },
  { icon: Building2, name: "Facility Maintenance", desc: "From campuses to warehouses and docks, Alkota's dependable equipment is a perfect fit." },
  { icon: Factory, name: "Manufacturing", desc: "Efficient cleaning solutions to keep your operations running smoothly." },
  { icon: Truck, name: "Transportation", desc: "Alkota keeps your fleet clean and operating at peak performance." },
  { icon: Trash2, name: "Waste Management", desc: "Oil, grime, muck, and yuk don't stand a chance with Alkota on the job." },
  { icon: Anchor, name: "Marine", desc: "Keep your marine equipment clean — saves you time, effort, and money." },
];

const benefits = [
  { title: "Low Initial Investment", desc: "Start with a manageable investment and grow at your own pace." },
  { title: "High Margins", desc: "Distributors can achieve margins of 30% and higher with Alkota equipment." },
  { title: "Existing Customer Opportunities", desc: "Seamlessly sell Alkota equipment to your current customers while expanding your base." },
  { title: "Flexible Financing", desc: "Flooring financing options available to help get your business up and running." },
  { title: "Made in the USA", desc: "Proudly support American-made, high-quality products trusted worldwide." },
  { title: "Factory Support", desc: "A dedicated, USA-based factory ensures quick support and service." },
  { title: "Proven Track Record", desc: "Over 60 years of durability and performance you can count on." },
  { title: "Comprehensive Training", desc: "Factory training and service support to ensure you succeed." },
  { title: "Sales & Marketing Assistance", desc: "Leverage a dedicated team to support your growth across your territory." },
  { title: "Distributor Rewards", desc: "Participate in exclusive incentive programmes and annual sales award programmes." },
];

const BecomeDistributor = () => {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Become an Alkota Distributor"
        description="Join the Alkota UK distributor network. Grow your business with American-made industrial cleaning equipment across the UK, Europe, UAE, and Middle East."
        path="/become-distributor"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Partner With Us
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Become an Alkota Distributor
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              At Alkota, we take pride in creating industry-leading cleaning
              systems designed and manufactured in the United States. With over
              60 years of expertise, we produce robust, high-performance
              equipment trusted by professionals across a range of industries.
              Alkota UK is now expanding its distributor network across the UK,
              Europe, the UAE, and the Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* Why Customers Choose Alkota */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <div className="w-24 h-px bg-primary mb-6" />
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
              Why Do Customers Choose Alkota?
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              Our customers include a broad spectrum of businesses, from
              contractors to agricultural operations, food processing,
              manufacturing, and more. By becoming an Alkota distributor, you'll
              find that many of your current customers align perfectly with
              Alkota's diverse customer base — providing incredible growth
              potential.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                <p className="text-muted-foreground font-light">
                  <strong className="font-normal text-foreground">Built to last.</strong>{" "}
                  Our equipment is designed in-house with reliability and longevity in mind.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                <p className="text-muted-foreground font-light">
                  <strong className="font-normal text-foreground">Easy to use and repair.</strong>{" "}
                  Built for the working man and woman — quick and simple to service if the need arises.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                <p className="text-muted-foreground font-light">
                  <strong className="font-normal text-foreground">Exceptional customer service.</strong>{" "}
                  Alkota takes care of its customers, with the best coil warranty in the business.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                <p className="text-muted-foreground font-light">
                  <strong className="font-normal text-foreground">60+ years of innovation.</strong>{" "}
                  Innovators in the cleaning equipment business since 1964, with a reputation to back it up.
                </p>
              </div>
            </div>
          </div>

          {/* Industries Grid */}
          <h3 className="text-2xl font-light tracking-tight mb-8">
            Industries We Serve
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="border border-border p-6 hover:border-primary/30 transition-colors"
              >
                <industry.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1} />
                <h4 className="text-lg font-light mb-2">{industry.name}</h4>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {industry.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sell Alkota */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Distributor Benefits
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Why Sell Alkota?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-3xl font-light text-primary/30 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-normal mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Alkota Family */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-24 h-px bg-primary mb-6 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
              The Alkota Family
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              Becoming an Alkota distributor means more than gaining access to
              world-class cleaning equipment — you become part of the Alkota
              family. We pride ourselves on helping businesses grow for
              generations while fostering a collaborative, supportive
              atmosphere.
            </p>
            <blockquote className="border-l-2 border-primary pl-6 text-left mb-12">
              <p className="text-lg text-foreground font-light italic leading-relaxed mb-2">
                "Working with Alkota is awesome; it is a family atmosphere."
              </p>
              <footer className="text-sm text-muted-foreground font-light">
                — Westly Bennett, Second Generation Alkota Distributor
              </footer>
            </blockquote>

            <h3 className="text-2xl font-light tracking-tight mb-4">
              How to Get Started
            </h3>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              Ready to grow your business? Becoming an Alkota UK distributor
              starts with a conversation. Whether you're looking to expand your
              product line or target new markets across the UK, Europe, or the
              Middle East, we'll provide the tools, support, and expertise you
              need.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="sm" className="font-light tracking-wide">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeDistributor;
