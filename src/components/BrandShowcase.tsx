
import { useState, useEffect } from 'react';
import { allProducts } from '@/data/products';

// Get unique brands from products
const getUniqueBrands = () => {
  const brands = [...new Set(allProducts.map(product => product.brand))];
  return brands.slice(0, 8); // Limit to 8 brands for showcase
};

export function BrandShowcase() {
  const [brands] = useState(getUniqueBrands());

  // For animation
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % brands.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [brands.length]);

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">Premium Automotive Brands</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <div 
              key={brand} 
              className={`flex flex-col items-center justify-center py-6 px-4 rounded-lg transition-all duration-500 ease-out ${
                index === activeIndex ? 'bg-card/50 scale-105 shadow-lg border border-gold/20' : 'border border-transparent'
              }`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-card flex items-center justify-center rounded-full mb-4 border border-border">
                <span className="font-serif font-bold text-xl md:text-2xl text-gold">{brand.charAt(0)}</span>
              </div>
              <h3 className="text-center font-serif text-lg md:text-xl font-medium">{brand}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
