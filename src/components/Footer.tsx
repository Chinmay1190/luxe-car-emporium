
import { Link } from "react-router-dom";
import { IndianRupee, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Information */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <IndianRupee size={24} className="text-gold" />
              <span className="font-serif text-2xl font-bold tracking-tight">LuxCars</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Luxury automobile excellence since 2025. Providing the finest selection of premium vehicles to discerning customers across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-gold transition-colors">
                  All Cars
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-gold transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Car Categories */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Car Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/categories/sports" className="text-muted-foreground hover:text-gold transition-colors">
                  Sports Cars
                </Link>
              </li>
              <li>
                <Link to="/categories/luxury" className="text-muted-foreground hover:text-gold transition-colors">
                  Luxury Sedans
                </Link>
              </li>
              <li>
                <Link to="/categories/suv" className="text-muted-foreground hover:text-gold transition-colors">
                  Premium SUVs
                </Link>
              </li>
              <li>
                <Link to="/categories/electric" className="text-muted-foreground hover:text-gold transition-colors">
                  Electric Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Contact Info</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>378 Luxury Lane, South Delhi</li>
              <li>New Delhi, 110001</li>
              <li>Phone: +91 98765 43210</li>
              <li>Email: info@luxcars.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {currentYear} LuxCars. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-sm text-muted-foreground hover:text-gold transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
