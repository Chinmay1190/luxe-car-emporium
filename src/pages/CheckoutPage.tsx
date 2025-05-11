
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, IndianRupee } from "lucide-react";
import { PaymentForm } from "@/components/PaymentForm";
import { BillingForm } from "@/components/BillingForm";
import { toast } from "sonner";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [currentStep, setCurrentStep] = useState<"billing" | "payment">("billing");

  // Check if cart is empty and redirect to cart page if it is
  React.useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  const handleBillingSubmit = (formData: typeof billingDetails) => {
    setBillingDetails(formData);
    setCurrentStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = (formData: typeof paymentDetails) => {
    setPaymentDetails(formData);
    processPayment();
  };

  const processPayment = () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      setIsProcessingPayment(false);
      toast.success("Payment successful!");
      navigate("/cart", { state: { checkoutSuccess: true } });
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-serif font-bold mb-2">Checkout</h1>
          <div className="flex items-center gap-2 mb-8">
            <Link 
              to="/cart"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" /> Back to cart
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Forms Section */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                {currentStep === "billing" ? (
                  <BillingForm 
                    initialValues={billingDetails} 
                    onSubmit={handleBillingSubmit} 
                  />
                ) : (
                  <PaymentForm 
                    initialValues={paymentDetails} 
                    onSubmit={handlePaymentSubmit}
                    isProcessing={isProcessingPayment}
                    onBackToBilling={() => setCurrentStep("billing")}
                  />
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-serif font-bold mb-4">Order Summary</h2>
                
                <div className="max-h-60 overflow-y-auto mb-4">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center py-3 border-b border-border">
                      <div className="w-16 h-16 flex-shrink-0 mr-3 overflow-hidden rounded">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(product.price * quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
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
                
                <div className="mt-6 text-xs text-center text-muted-foreground">
                  <p>All transactions are encrypted and secure</p>
                  <p className="mt-1">By proceeding, you agree to our Terms of Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
