
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Check, ChevronLeft, Trash2, ShoppingCart, IndianRupee } from "lucide-react";
import { toast } from "sonner";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setCheckoutSuccess(true);
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (checkoutSuccess) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 dark:bg-green-900">
              <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <h1 className="text-3xl font-serif font-bold mb-4">Order Successful!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>
            <div className="py-4 px-6 bg-card rounded-lg border border-border mb-8">
              <p className="text-muted-foreground">
                An email confirmation has been sent to your registered email address with complete details.
              </p>
            </div>
            <Button asChild className="luxury-button">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-serif font-bold mb-2">Your Shopping Cart</h1>
          <p className="text-muted-foreground mb-8">
            {totalItems === 0 ? "Your cart is empty." : `You have ${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart.`}
          </p>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart size={64} className="text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any vehicles to your cart yet.
              </p>
              <Button asChild className="luxury-button">
                <Link to="/products">
                  <ChevronLeft size={16} className="mr-2" /> Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex flex-col sm:flex-row border border-border rounded-lg overflow-hidden">
                    <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex justify-between mb-1">
                        <span className="text-gold text-sm">{product.brand}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <Link to={`/product/${product.id}`} className="font-medium hover:text-gold">
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1 mb-3 line-clamp-2">
                        {product.specifications.engine} • {product.specifications.power}
                      </p>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center h-8 border border-border rounded-md">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{quantity}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="font-medium">{formatPrice(product.price * quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                  <h2 className="text-xl font-serif font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatPrice(totalPrice * 0.18)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium text-lg mb-6">
                    <span>Total</span>
                    <div className="flex items-center">
                      <IndianRupee size={18} className="mr-1 text-gold" />
                      <span className="text-gold">{formatPrice(totalPrice + totalPrice * 0.18)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="luxury-button w-full py-6"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : "Checkout"} {!isCheckingOut && <ArrowRight size={16} className="ml-2" />}
                  </Button>
                  
                  <div className="mt-4">
                    <Button
                      variant="link"
                      asChild
                      className="w-full justify-center text-muted-foreground"
                    >
                      <Link to="/products">
                        <ChevronLeft size={16} className="mr-1" /> Continue Shopping
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="mt-6 text-xs text-center text-muted-foreground">
                    <p>Secure checkout powered by LuxCars</p>
                    <p className="mt-1">All transactions are encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
