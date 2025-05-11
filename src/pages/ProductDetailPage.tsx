
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, Check, ShoppingCart, Share2 } from "lucide-react";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  
  // Find the product by ID
  const product = allProducts.find((p) => p.id === productId);
  
  // If product not found, show error and return to products page
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Return to Products</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  // Set default selected color if not set
  if (selectedColor === "" && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }

  // Find similar products (same category, different ID)
  const similarProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Handle quantity change
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      <Navbar />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex text-sm">
              <Button variant="ghost" size="sm" className="font-normal hover:bg-transparent p-0 h-auto" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link to="/products" className="text-muted-foreground hover:text-gold">Cars</Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link to={`/categories/${product.category.toLowerCase()}`} className="text-muted-foreground hover:text-gold">{product.category}</Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="font-medium">{product.name}</span>
            </nav>
          </div>

          {/* Product Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer border-2 rounded-md overflow-hidden flex-shrink-0 w-20 h-20 ${
                      activeImageIndex === index ? "border-gold" : "border-border"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-1">
                  <span className="text-gold font-medium">{product.brand}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{product.category}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{product.name}</h1>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gold">{formatPrice(product.price)}</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                          selectedColor === color ? "border-gold" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color} color`}
                      >
                        {selectedColor === color && (
                          <Check
                            size={16}
                            className={`text-${
                              color === "#FFFFFF" || color === "#F9E547" ? "black" : "white"
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center w-32 h-10">
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center border border-border rounded-l-md bg-secondary"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center border-t border-b border-border">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center border border-border rounded-r-md bg-secondary"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="luxury-button flex-1 py-6">
                  <ShoppingCart size={18} className="mr-2" /> Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="border-gold/30 text-gold hover:bg-gold/10 py-6">
                  <Share2 size={18} />
                </Button>
              </div>

              {/* Key Features */}
              <div className="border-t border-border pt-6">
                <h3 className="font-serif text-lg font-medium mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                  {product.features.slice(0, 6).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-gold mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-16">
            <Tabs defaultValue="specifications">
              <TabsList className="w-full justify-start border-b rounded-none">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="luxury-card p-4">
                    <h4 className="text-sm text-muted-foreground mb-1">Engine</h4>
                    <p className="font-medium">{product.specifications.engine}</p>
                  </div>
                  
                  <div className="luxury-card p-4">
                    <h4 className="text-sm text-muted-foreground mb-1">Power</h4>
                    <p className="font-medium">{product.specifications.power}</p>
                  </div>
                  
                  <div className="luxury-card p-4">
                    <h4 className="text-sm text-muted-foreground mb-1">Top Speed</h4>
                    <p className="font-medium">{product.specifications.topSpeed}</p>
                  </div>
                  
                  <div className="luxury-card p-4">
                    <h4 className="text-sm text-muted-foreground mb-1">Acceleration</h4>
                    <p className="font-medium">{product.specifications.acceleration}</p>
                  </div>
                  
                  <div className="luxury-card p-4">
                    <h4 className="text-sm text-muted-foreground mb-1">Transmission</h4>
                    <p className="font-medium">{product.specifications.transmission}</p>
                  </div>
                  
                  <div className="luxury-card p-4">
                    <h4 className="text-sm text-muted-foreground mb-1">Drive</h4>
                    <p className="font-medium">{product.specifications.drive}</p>
                  </div>
                  
                  <div className="luxury-card p-4">
                    <h4 className="text-sm text-muted-foreground mb-1">Fuel Type</h4>
                    <p className="font-medium">{product.specifications.fuelType}</p>
                  </div>
                  
                  <div className="luxury-card p-4">
                    <h4 className="text-sm text-muted-foreground mb-1">Seats</h4>
                    <p className="font-medium">{product.specifications.seats}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="pt-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-gold mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Similar Vehicles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
