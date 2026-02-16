import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import aboutCleaning from "@/assets/about-cleaning-loader.png";
import aboutCoil from "@/assets/about-coil.png";
import aboutCleaningAction from "@/assets/about-cleaning.png";
import madeInUsa from "@/assets/made-in-usa.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const milestones = [
  { year: "1964", event: "Alkota founded in a converted creamery in Alcester, South Dakota, building steam cleaners." },
  { year: "1983", event: "Seven key employees purchase Alkota Manufacturing with a shared philosophy: treat customers and employees right." },
  { year: "1990s", event: "Expanded product lines to include hot and cold water pressure washers, parts washers, and trailer units." },
  { year: "2000s", event: "Pioneered industry-standard practices in electric motors, improved coils, and pump designs." },
  { year: "2010s", event: "Partnered with Wayne Combustion for more efficient, user-friendly oil burners." },
  { year: "2016", event: "Alkota UK established, bringing American-made industrial cleaning power to the United Kingdom market." },
  { year: "2020s", event: "Alkota UK expands operations across Europe, the UAE, and the wider Middle East — delivering Alkota's proven quality to new industries and territories." },
  { year: "Today", event: "A worldwide distributor network spanning the UK, Europe, and Middle East, with a diverse product line and decades of combined expertise." },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="About Alkota"
        description="Since 1964, Alkota has handcrafted industrial pressure washers in Alcester, South Dakota. Learn about our heritage, engineering philosophy, and American-made quality."
        path="/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Alkota Cleaning Systems",
          description: "American-made industrial pressure washers since 1964.",
        }}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              About Alkota
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Pressure Washer Manufacturer Since 1964
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              Top-quality power washers and industrial cleaning equipment are the
              specialty of made-in-America Alkota Cleaning Systems. With over 60
              years of experience, we are committed to delivering exceptional
              customer service and tailored cleaning solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="w-24 h-px bg-primary mb-6" />
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                Alkota got its start all the way back in 1964 building steam
                cleaners in a converted creamery in Alcester, South Dakota —
                the small rural town we still call home. Our very name is an
                homage to our hometown: Al- for Alcester and -kota for South
                Dakota.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                When a competing pressure washer company in Vermillion sold to
                an outside bidder in 1983, seven of its key employees came
                together to purchase Alkota Manufacturing. The investors had a
                common business philosophy: treat your customers right, treat
                your employees right, and the rest will follow. That philosophy
                still guides us today.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed">
                While several of the original owners have passed on or retired,
                two of the seven remain involved to this day — a testament to
                the enduring commitment that defines Alkota.
              </p>
            </div>
            <div className="space-y-4">
              <img
                src={aboutCleaning}
                alt="Man cleaning a front loader with an Alkota pressure washer"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Innovation */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
              <img
                src={aboutCleaningAction}
                alt="Pressure washer in action"
                className="w-full object-cover"
              />
              <img
                src={aboutCoil}
                alt="The Alkota coil — precision engineering"
                className="w-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="w-24 h-px bg-primary mb-6" />
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
                Innovation & Engineering
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                A good many of our crew have been with us for more than twenty
                years, some over thirty — and yes, even a few for more than
                four decades. With this many years of experience, our engineers
                and craftsmen know the industry and what it takes to deliver the
                perfect product for any application.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                Over the years, Alkota has developed and perfected technology
                that combines higher pressures, higher volumes, and higher
                temperatures, resulting in an excellent balance between
                performance and efficiency.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed">
                We have worked to develop practices that are now becoming
                industry standards, such as the use of different types of
                electric motors, better coils, improved designs in pumps and
                accessories, as well as partnering with Wayne Combustion to make
                oil burners more user-friendly and efficient.
              </p>
            </div>
          </div>

          {/* Our People */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-24 h-px bg-primary mb-6" />
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
                Our People
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                Today Alkota has a diverse line of products and a worldwide
                distributor base. We offer these distributors continued education
                on our products and personal support for any issues that arise.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                Everything we do starts with the devotion and care of our
                people — masters of the trade with an unrivaled ability to
                solve problems and custom-build solutions as durable as the
                commitment they bring to work every day.
              </p>
              <p className="text-lg text-foreground font-light leading-relaxed italic mb-8">
                "When you take an Alkota pressure washer to work, you take more
                wisdom, know-how, and back-up than any other equipment in the
                business."
              </p>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="font-light tracking-wide">
                  Talk to Us About Your Needs
                </Button>
              </Link>
            </div>
            <div>
              <img
                src={madeInUsa}
                alt="Alkota pressure washers - proudly made in the USA"
                className="w-full max-w-md mx-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Our Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              60+ Years of Excellence
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex gap-8 mb-8 last:mb-0"
              >
                <div className="w-20 shrink-0 text-right">
                  <span className="text-primary text-sm font-light tracking-wide">
                    {milestone.year}
                  </span>
                </div>
                <div className="relative pl-8 border-l border-border pb-8 last:pb-0">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 bg-primary rounded-full" />
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
