import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import CustomBuild from "@/components/CustomBuild";
import Heritage from "@/components/Heritage";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Alkota Cleaning Systems",
  url: "https://alkota.com",
  logo: "https://alkota.com/logo.png",
  foundingDate: "1964",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Alcester",
    addressRegion: "SD",
    addressCountry: "US"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-800-255-6823",
    contactType: "sales"
  },
  sameAs: []
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Alkota Cleaning Systems — Industrial Pressure Washers Since 1964"
        description="American-made industrial pressure washers, steam cleaners, and cleaning systems. Precision-engineered equipment built to last since 1964. Get a quote today."
        path="/"
        structuredData={organizationSchema} />

      <Navigation className="bg-zinc-50/[0.28]" />
      <Hero />
      <ProductShowcase />
      <CustomBuild />
      <Heritage />
      <Features />
      <Footer />
    </div>);

};

export default Index;