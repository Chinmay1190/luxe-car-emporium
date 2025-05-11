
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Sun, Moon, ShoppingCart, Menu, X, Search, IndianRupee } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
          <div className="flex items-center">
            <IndianRupee size={24} className="text-gold" />
            <span className="font-serif text-2xl font-bold tracking-tight">LuxCars</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-gold transition-colors">Home</Link>
            <Link to="/products" className="font-medium hover:text-gold transition-colors">Cars</Link>
            <Link to="/categories" className="font-medium hover:text-gold transition-colors">Categories</Link>
            <Link to="/about" className="font-medium hover:text-gold transition-colors">About</Link>
            <Link to="/contact" className="font-medium hover:text-gold transition-colors">Contact</Link>
          </div>
        )}

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <Search size={20} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <Link to="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Shopping cart"
              className="relative"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile menu button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
        </div>
      </div>

      {/* Search bar that appears when search is toggled */}
      {showSearch && (
        <div className="py-3 px-4 border-t border-border bg-background/95 backdrop-blur-lg animate-fade-in">
          <div className="container mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for luxury cars..."
                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-gold/50"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={toggleSearch}
                aria-label="Close search"
              >
                <X size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isOpen && isMobile && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md animate-fade-in pt-20">
          <div className="container mx-auto px-4 py-8 flex flex-col space-y-6 text-center">
            <Link to="/" className="text-xl font-medium py-2 hover:text-gold transition-colors" onClick={toggleMenu}>Home</Link>
            <Link to="/products" className="text-xl font-medium py-2 hover:text-gold transition-colors" onClick={toggleMenu}>Cars</Link>
            <Link to="/categories" className="text-xl font-medium py-2 hover:text-gold transition-colors" onClick={toggleMenu}>Categories</Link>
            <Link to="/about" className="text-xl font-medium py-2 hover:text-gold transition-colors" onClick={toggleMenu}>About</Link>
            <Link to="/contact" className="text-xl font-medium py-2 hover:text-gold transition-colors" onClick={toggleMenu}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
