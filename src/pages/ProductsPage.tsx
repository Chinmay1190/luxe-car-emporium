
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import { Product, Category } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
];

const categoryOptions: Category[] = ["All", "Sports", "Luxury", "SUV", "Sedan", "Convertible", "Electric"];

const MAX_PRICE = 100000000; // 10 Crore

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    (searchParams.get("category") as Category) || "All"
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get("minPrice") || "0"),
    parseInt(searchParams.get("maxPrice") || String(MAX_PRICE))
  ]);
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sort") || "price-asc"
  );

  // Products per page and pagination
  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Apply filters and sort
  useEffect(() => {
    let result = [...allProducts];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    result.sort((a, b) => {
      switch (selectedSort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, selectedSort]);

  // Update URL params when filters change
  useEffect(() => {
    const params: Record<string, string> = {};

    if (searchQuery) params.search = searchQuery;
    if (selectedCategory !== "All") params.category = selectedCategory;
    if (priceRange[0] > 0) params.minPrice = priceRange[0].toString();
    if (priceRange[1] < MAX_PRICE) params.maxPrice = priceRange[1].toString();
    if (selectedSort) params.sort = selectedSort;

    setSearchParams(params);
  }, [searchQuery, selectedCategory, priceRange, selectedSort, setSearchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceRange([0, MAX_PRICE]);
    setSelectedSort("price-asc");
    setSearchParams({});
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Luxury Car Collection</h1>
            <p className="text-muted-foreground max-w-3xl">
              Browse our exclusive selection of premium luxury vehicles from the world's most prestigious automotive manufacturers.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          {/* Search and Filters Desktop */}
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md mb-4 md:mb-0">
              <Input
                type="text"
                placeholder="Search cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </form>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {!isMobile && (
                <>
                  <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              
              {isMobile && (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal size={18} className="mr-2" /> 
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              )}
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && isMobile && (
            <div className="bg-card border border-border rounded-lg p-4 mb-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X size={16} className="mr-1" /> Clear
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Sort by</label>
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Price Range</label>
                    <span className="text-sm text-muted-foreground">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    max={MAX_PRICE}
                    step={1000000}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={handlePriceChange}
                    className="py-4"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop Filters Sidebar and Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Filters Sidebar - Desktop Only */}
            {!isMobile && (
              <div className="hidden md:block">
                <div className="bg-card border border-border rounded-lg p-5 sticky top-20">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X size={16} className="mr-1" /> Clear
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Price Range</h4>
                      <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                      <Slider
                        defaultValue={[priceRange[0], priceRange[1]]}
                        max={MAX_PRICE}
                        step={1000000}
                        value={[priceRange[0], priceRange[1]]}
                        onValueChange={handlePriceChange}
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Categories</h4>
                      <div className="space-y-2">
                        {categoryOptions.map((category) => (
                          <div key={category} className="flex items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`justify-start px-2 w-full ${
                                selectedCategory === category
                                  ? "text-gold font-medium"
                                  : "text-foreground"
                              }`}
                              onClick={() => setSelectedCategory(category)}
                            >
                              {category}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products Grid */}
            <div>
              {/* Results count */}
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
              </p>
              
              {/* No results */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No matching vehicles found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </div>
              )}
              
              {/* Products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} className="h-full" />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={18} />
                    </Button>
                    
                    {/* Page numbers */}
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => {
                          // Show first, last, and pages around current page
                          return (
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1
                          );
                        })
                        .map((page, i, arr) => (
                          <React.Fragment key={page}>
                            {i > 0 && arr[i - 1] !== page - 1 && (
                              <span className="text-muted-foreground px-2">...</span>
                            )}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              className={currentPage === page ? "bg-gold hover:bg-gold/90 text-black" : ""}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          </React.Fragment>
                        ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
