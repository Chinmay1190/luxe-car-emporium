
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { BrandShowcase } from "@/components/BrandShowcase";
import { TestimonialSection } from "@/components/TestimonialSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { scrollToTop } from "@/lib/utils";

const Index = () => {
  useEffect(() => {
    // Scroll to top when landing page loads
    scrollToTop();
  }, []);

  return (
    <>
      <Navbar />
      <main className="animate-fade-in">
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
