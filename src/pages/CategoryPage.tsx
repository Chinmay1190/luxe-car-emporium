
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import { Category } from "@/types/product";
import { Button } from "@/components/ui/button";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryProducts, setCategoryProducts] = useState([]);

  // Capitalize first letter for display
  const displayCategory = categoryId 
    ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) as Category
    : "All";

  useEffect(() => {
    const filtered = categoryId 
      ? allProducts.filter(product => product.category.toLowerCase() === categoryId.toLowerCase())
      : allProducts;
    
    setCategoryProducts(filtered);
  }, [categoryId]);

  // Background images for different categories
  const getCategoryImage = () => {
    switch(categoryId?.toLowerCase()) {
      case 'sports':
        return "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=80";
      case 'luxury':
        return "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1920&q=80";
      case 'suv':
        return "https://images.unsplash.com/photo-1546832639-4473f4e1f469?auto=format&fit=crop&w=1920&q=80";
      case 'electric':
        return "https://images.unsplash.com/photo-1619405399517-cf4b425b6dac?auto=format&fit=crop&w=1920&q=80";
      case 'convertible':
        return "https://images.unsplash.com/photo-1619405399517-cf4b425b6dac?auto=format&fit=crop&w=1920&q=80";
      case 'sedan':
        return "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=1920&q=80";
      default:
        return "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80";
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Category Banner */}
        <div className="relative h-64 md:h-80 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10"></div>
          <img 
            src={getCategoryImage()}
            alt={displayCategory}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                {displayCategory} Cars
              </h1>
              <p className="text-white/80 max-w-lg mx-auto">
                Discover our collection of exceptional {displayCategory.toLowerCase()} vehicles
              </p>
            </div>
          </div>
        </div>
        
        {/* Categories Menu */}
        <div className="bg-card border-y border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto scrollbar-none space-x-4">
              <Button 
                asChild
                variant={!categoryId ? "default" : "outline"}
                className={!categoryId 
                  ? "bg-gold hover:bg-gold/90 text-black" 
                  : "border-gold/30 hover:bg-gold/10 text-gold"
                }
              >
                <Link to="/categories">All Categories</Link>
              </Button>
              <Button 
                asChild
                variant={categoryId === 'sports' ? "default" : "outline"}
                className={categoryId === 'sports' 
                  ? "bg-gold hover:bg-gold/90 text-black" 
                  : "border-gold/30 hover:bg-gold/10 text-gold"
                }
              >
                <Link to="/categories/sports">Sports</Link>
              </Button>
              <Button 
                asChild
                variant={categoryId === 'luxury' ? "default" : "outline"}
                className={categoryId === 'luxury' 
                  ? "bg-gold hover:bg-gold/90 text-black" 
                  : "border-gold/30 hover:bg-gold/10 text-gold"
                }
              >
                <Link to="/categories/luxury">Luxury</Link>
              </Button>
              <Button 
                asChild
                variant={categoryId === 'suv' ? "default" : "outline"}
                className={categoryId === 'suv' 
                  ? "bg-gold hover:bg-gold/90 text-black" 
                  : "border-gold/30 hover:bg-gold/10 text-gold"
                }
              >
                <Link to="/categories/suv">SUV</Link>
              </Button>
              <Button 
                asChild
                variant={categoryId === 'sedan' ? "default" : "outline"}
                className={categoryId === 'sedan' 
                  ? "bg-gold hover:bg-gold/90 text-black" 
                  : "border-gold/30 hover:bg-gold/10 text-gold"
                }
              >
                <Link to="/categories/sedan">Sedan</Link>
              </Button>
              <Button 
                asChild
                variant={categoryId === 'convertible' ? "default" : "outline"}
                className={categoryId === 'convertible' 
                  ? "bg-gold hover:bg-gold/90 text-black" 
                  : "border-gold/30 hover:bg-gold/10 text-gold"
                }
              >
                <Link to="/categories/convertible">Convertible</Link>
              </Button>
              <Button 
                asChild
                variant={categoryId === 'electric' ? "default" : "outline"}
                className={categoryId === 'electric' 
                  ? "bg-gold hover:bg-gold/90 text-black" 
                  : "border-gold/30 hover:bg-gold/10 text-gold"
                }
              >
                <Link to="/categories/electric">Electric</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          {categoryProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-medium mb-4">No vehicles found in this category</h2>
              <Button asChild className="luxury-button">
                <Link to="/products">Browse All Vehicles</Link>
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-8">
                Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'vehicle' : 'vehicles'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
