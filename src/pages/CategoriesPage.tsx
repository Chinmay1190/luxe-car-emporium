
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CategoriesPage = () => {
  // Get unique categories and count products in each
  const categories = [
    { id: "sports", name: "Sports Cars", count: allProducts.filter(p => p.category === "Sports").length, image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80" },
    { id: "luxury", name: "Luxury Sedans", count: allProducts.filter(p => p.category === "Luxury").length, image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80" },
    { id: "suv", name: "Premium SUVs", count: allProducts.filter(p => p.category === "SUV").length, image: "https://images.unsplash.com/photo-1546832639-4473f4e1f469?auto=format&fit=crop&w=800&q=80" },
    { id: "convertible", name: "Convertibles", count: allProducts.filter(p => p.category === "Convertible").length, image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80" },
    { id: "sedan", name: "Sedans", count: allProducts.filter(p => p.category === "Sedan").length, image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&q=80" },
    { id: "electric", name: "Electric Vehicles", count: allProducts.filter(p => p.category === "Electric").length, image: "https://images.unsplash.com/photo-1619405399517-cf4b425b6dac?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Vehicle Categories</h1>
            <p className="text-muted-foreground max-w-3xl">
              Browse our extensive luxury car collection by category to find your perfect vehicle.
            </p>
          </div>
        </div>
        
        {/* Categories Grid */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="luxury-card overflow-hidden group block h-[300px] relative"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10 group-hover:opacity-90 transition-opacity"></div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                  <h2 className="text-white text-2xl font-serif font-bold mb-1 group-hover:text-gold transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-white/80 mb-4">
                    {category.count} vehicles
                  </p>
                  <Button className="luxury-button group-hover:translate-x-1 transition-transform">
                    View Collection <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoriesPage;
