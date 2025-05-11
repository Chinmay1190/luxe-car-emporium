
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className={`luxury-card group ${className}`}>
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Brand Badge */}
          <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
            {product.brand}
          </div>
          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-gold/80 backdrop-blur-sm text-black px-2 py-1 rounded text-xs font-medium">
            {product.category}
          </div>
        </div>
      </Link>
      
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-lg font-medium group-hover:text-gold transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2">
          {product.description.split(" ").slice(0, 10).join(" ")}...
        </p>
        
        <div className="pt-2 flex items-center justify-between">
          <div>
            <p className="text-gold font-medium">{formatPrice(product.price)}</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-gold hover:bg-gold/10"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
