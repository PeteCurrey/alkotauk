import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import CustomBuild from "@/components/CustomBuild";
import Heritage from "@/components/Heritage";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProductShowcase />
      <CustomBuild />
      <Heritage />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
