
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Car"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 md:py-40 lg:py-48 relative z-20">
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-block text-gold mb-3 text-sm md:text-base tracking-wider font-medium">DISCOVER EXCELLENCE</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Experience Unparalleled Automotive Luxury
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
            Discover the finest collection of premium automobiles crafted for those who demand nothing but perfection. Your journey to automotive excellence begins here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="luxury-button text-lg px-8 py-6"
            >
              <Link to="/products">
                Explore Collection <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white text-lg px-8 py-6"
            >
              <Link to="/about">
                About Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20"></div>
    </div>
  );
}
