
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { BrandShowcase } from "@/components/BrandShowcase";
import { TestimonialSection } from "@/components/TestimonialSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <BrandShowcase />
        <TestimonialSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
