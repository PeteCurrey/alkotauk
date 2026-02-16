import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, MapPin, Wrench, BookOpen, FileText } from "lucide-react";

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

const Distributors = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Find a Distributor
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Alkota Distributors
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              Find an Alkota Distributor near you. Our distributors are ready to
              help you find the perfect pressure washing equipment and keep you
              running with full machine maintenance, service, and support.
            </p>
          </div>
        </div>
      </section>

      {/* Distributor Finder */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* State Grid */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-light tracking-tight mb-2">
                Select Your State
              </h2>
              <p className="text-sm text-muted-foreground font-light mb-8">
                Click your state or a neighboring state to find Alkota
                distributors in your area.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {usStates.map((state) => (
                  <Link
                    key={state}
                    to="/contact"
                    className="text-xs font-light text-center py-3 px-2 border border-border hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {state}
                  </Link>
                ))}
              </div>

              <div className="mt-8 p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={16} className="text-primary" strokeWidth={1} />
                  <h3 className="text-lg font-light tracking-tight">
                    International Distributors
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground font-light mb-4">
                  Alkota has a worldwide distributor network. Contact us for
                  international distributor information.
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="font-light text-xs tracking-wide">
                    Contact for International
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Phone size={16} className="text-primary" strokeWidth={1} />
                  <h3 className="text-lg font-light tracking-tight">
                    Need Help?
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground font-light mb-4">
                  Can't find a distributor? Give us a call and we'll connect you
                  with the right representative.
                </p>
                <a
                  href="tel:1-800-255-6823"
                  className="text-sm text-primary font-light"
                >
                  1-800-255-6823
                </a>
              </div>

              <div className="p-6 border border-border">
                <h3 className="text-lg font-light tracking-tight mb-4">
                  Support & Resources
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Wrench size={14} className="text-primary mt-1" strokeWidth={1} />
                    <div>
                      <p className="text-sm font-light mb-1">Replacement Parts</p>
                      <p className="text-xs text-muted-foreground font-light">
                        Find parts for your Alkota equipment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen size={14} className="text-primary mt-1" strokeWidth={1} />
                    <div>
                      <p className="text-sm font-light mb-1">Request a Manual</p>
                      <p className="text-xs text-muted-foreground font-light">
                        Get the manual for your specific model
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText size={14} className="text-primary mt-1" strokeWidth={1} />
                    <div>
                      <p className="text-sm font-light mb-1">
                        Warranty Registration
                      </p>
                      <p className="text-xs text-muted-foreground font-light">
                        Register your equipment for warranty coverage
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-primary/30 bg-primary/5">
                <h3 className="text-lg font-light tracking-tight mb-3">
                  Ready to Get a Quote?
                </h3>
                <p className="text-sm text-muted-foreground font-light mb-4">
                  Our American-made pressure washers are ready to tackle your
                  toughest jobs.
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="font-light text-xs tracking-wide">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Distributors;
