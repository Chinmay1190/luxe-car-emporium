
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import { Product, Category } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  
  const filters: Category[] = ['All', 'Sports', 'Luxury', 'SUV', 'Electric', 'Convertible'];
  
  const filteredProducts = activeFilter === 'All' 
    ? allProducts.slice(0, 8) 
    : allProducts.filter(product => product.category === activeFilter).slice(0, 8);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Featured Luxury Cars</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our handpicked selection of the most exclusive automobiles, each representing the pinnacle of engineering excellence and luxury design.
            </p>
          </div>
          <div className="flex space-x-2 mt-6 md:mt-0">
            <Button 
              variant="outline" 
              size="icon"
              className="border-gold/30 hover:bg-gold/10 text-gold"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              className="border-gold/30 hover:bg-gold/10 text-gold"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex overflow-x-auto scrollbar-none space-x-4 mb-8 pb-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={activeFilter === filter ? "bg-gold hover:bg-gold/90 text-black" : "border-gold/30 hover:bg-gold/10 text-gold"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 animate-fade-in">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild className="luxury-button px-8 py-6 text-lg">
            <Link to="/products">
              View All Collection
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
