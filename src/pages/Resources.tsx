import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Wrench,
  HelpCircle,
  Video,
  Shield,
} from "lucide-react";

const blogPosts = [
  {
    title: "Electric Commercial Power Washer Safety in Wet or Confined Workspaces",
    excerpt:
      "In wet or confined workspaces, safety isn't optional – it's foundational. Facilities such as food processing plants, manufacturing floors, wash bays, and maintenance rooms all require careful consideration.",
    date: "January 2026",
  },
  {
    title: 'Cross-Comparing Brand Specs: What "Best Commercial Pressure Washer" Really Means',
    excerpt:
      "Search online for the best commercial pressure washer, and you'll find endless spec sheets filled with PSI ratings, flow rates, and feature lists. While numbers matter, here's what to really look for.",
    date: "January 2026",
  },
  {
    title: "Benefits: Steam Pressure Washers vs. Hot Water Pressure Washers",
    excerpt:
      "Steam pressure washer vs. hot water pressure washers, what's best for your cleaning needs? Alkota has been manufacturing both since 1964.",
    date: "Industry Guide",
  },
  {
    title: "NEW Gas Fired Hot Water Pressure Washers from Alkota",
    excerpt:
      "We are proud to introduce our new and improved line of gas fired hot water commercial pressure washers. We've taken your feedback to improve upon our already industry-leading designs.",
    date: "Product Launch",
  },
  {
    title: "Hot Water Pressure Washers – What Fuel Is Best?",
    excerpt:
      "Ever wonder what type of fuel is best to run in your industrial hot water pressure washer? Diesel, kerosene, LP, natural gas — we break it down.",
    date: "Buyer's Guide",
  },
  {
    title: "Hose Reels for Industrial Pressure Washers",
    excerpt:
      "The hose reel is usually at the top of most people's lists when it comes to hot or cold water pressure washer accessories. Here's what to know.",
    date: "Accessories",
  },
  {
    title: "GPM vs. PSI in Pressure Washers — What's The Difference?",
    excerpt:
      "Pressure washers are must-have tools for industrial, commercial, and agricultural purposes. Understanding GPM vs PSI helps you choose the right machine.",
    date: "Education",
  },
  {
    title: "How to Choose the Pressure Washer Surface Cleaner",
    excerpt:
      "When purchasing a pressure washer surface cleaner, the number one question is, how do you know what unit to buy? There are many surface cleaners to consider.",
    date: "Buyer's Guide",
  },
  {
    title: "How to Winterize a Hot Water Pressure Washer",
    excerpt:
      "It's winter time again, and that means it's time to either let those hot water pressure washers inside or winterize. Here's our step-by-step guide.",
    date: "Maintenance",
  },
];

const supportResources = [
  {
    icon: Wrench,
    title: "Replacement Parts",
    description:
      "Find genuine Alkota replacement parts for your pressure washer, steam cleaner, or parts washer. Contact your local distributor for availability.",
  },
  {
    icon: BookOpen,
    title: "Request a Manual",
    description:
      "Need the operating manual for your specific Alkota model? Contact us with your model number and we'll send it right over.",
  },
  {
    icon: Shield,
    title: "Warranty Registration",
    description:
      "Register your Alkota equipment for warranty coverage. Our equipment is backed by our commitment to quality and customer service.",
  },
  {
    icon: Video,
    title: "Training & Education",
    description:
      "We offer continued education on our products for distributors and end users. Ask your distributor about training opportunities.",
  },
  {
    icon: HelpCircle,
    title: "Technical Support",
    description:
      "Our team of experienced engineers and technicians is ready to help troubleshoot any issues. Email sales@alkota.co.uk for support.",
  },
  {
    icon: FileText,
    title: "Product Catalogs",
    description:
      "Browse our complete pressure washer catalog with detailed specifications, features, and options for every Alkota product line.",
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Resources & Knowledge Base"
        description="Pressure washing tips, maintenance guides, technical support, and product catalogs. Everything you need to get the most from your Alkota cleaning equipment."
        path="/resources"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Resources & Support
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Good Clean Knowledge
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              Expert articles, buying guides, maintenance tips, and support
              resources to help you get the most from your Alkota cleaning
              equipment.
            </p>
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-tight mb-4">
              Support & Services
            </h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto">
              Everything you need to keep your Alkota equipment running at peak
              performance
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {supportResources.map((resource, index) => (
              <div
                key={index}
                className="border border-border p-6 hover:border-primary/30 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 border border-border mb-4">
                  <resource.icon
                    className="w-5 h-5 text-primary"
                    strokeWidth={1}
                  />
                </div>
                <h3 className="text-lg font-light tracking-tight mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>

          {/* Blog / Articles */}
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Good Clean News
            </p>
            <h2 className="text-3xl font-light tracking-tight">
              Articles & Guides
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="border border-border p-6 hover:border-primary/30 transition-colors group"
              >
                <span className="text-xs text-primary font-light tracking-wide uppercase">
                  {post.date}
                </span>
                <h3 className="text-lg font-light tracking-tight mt-2 mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="text-xs text-primary font-light tracking-wide">
                  Read Article →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-light tracking-tight mb-4">
            Have a Question?
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto mb-8">
            Our team is here to help. Whether you need technical support, want
            to explore financing options, or are ready to get a quote — we're
            just a call away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="outline" size="sm" className="font-light tracking-wide">
                Contact Us
              </Button>
            </Link>
            <a href="tel:1-800-255-6823">
              <Button variant="outline" size="sm" className="font-light tracking-wide">
                Call 1-800-255-6823
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
