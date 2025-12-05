import React, { useState } from "react";
import { useCart } from "../../Context/CartContext";
import Navbaar from "../Navbaar/Navbaar";
import Hero from "../Hero/Hero";
import AdvancedProductCard from "../AdvancedProductCard/AdvancedProductCard";
import QuickView from "../QuickView/QuickView";
import CartDrawer from "../CartDrawer/CartDrawer";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import ProductComparison from "../ProductComparison/ProductComparison";
import DealTimer from "../DealTimer/DealTimer";
import AdvancedSearchBar from "../AdvancedSearchBar/AdvancedSearchBar";
import Category from "../Category/Category";
import Values from "../Values/Values";
import Discount from "../Discount/Discount";
import Footer from "../Footer/Footer";
import { FaFilter, FaShoppingCart } from "react-icons/fa";
import { MdCompare } from "react-icons/md";

const AdvancedShop = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { isCartOpen, setIsCartOpen, cartItems, addToCart, cartCount } = useCart();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareProducts, setCompareProducts] = useState([]);
  
  // Mock products data
  const products = [
    {
      id: 1,
      title: "Organic Red Apples",
      price: 4.99,
      originalPrice: 6.99,
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 234,
      description: "Fresh and crispy organic apples, perfect for snacking",
      weight: "1 kg",
      origin: "Washington, USA",
      discount: 29,
      isBestSeller: true,
      inStock: true,
      organic: true,
      freeDelivery: true,
      flashSale: true,
      category: "fruits"
    },
    {
      id: 2,
      title: "Fresh Bananas",
      price: 2.49,
      originalPrice: 3.99,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 567,
      description: "Rich in potassium, perfect for smoothies",
      weight: "500g",
      origin: "Ecuador",
      discount: 38,
      isNew: true,
      inStock: true,
      freeDelivery: true,
      category: "fruits"
    },
    {
      id: 3,
      title: "Strawberries Premium",
      price: 5.99,
      originalPrice: 8.99,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 423,
      description: "Sweet and juicy fresh strawberries",
      weight: "250g",
      origin: "California",
      discount: 33,
      isBestSeller: true,
      inStock: true,
      organic: true,
      freeDelivery: true,
      category: "fruits"
    },
    {
      id: 4,
      title: "Fresh Blueberries",
      price: 6.99,
      originalPrice: 9.99,
      image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 189,
      description: "Antioxidant-rich organic blueberries",
      weight: "200g",
      origin: "Oregon",
      discount: 30,
      inStock: true,
      organic: true,
      category: "fruits"
    },
    {
      id: 5,
      title: "Organic Avocados",
      price: 7.99,
      originalPrice: 10.99,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 678,
      description: "Creamy and nutritious avocados",
      weight: "3 pcs",
      origin: "Mexico",
      discount: 27,
      isBestSeller: true,
      inStock: true,
      organic: true,
      freeDelivery: true,
      category: "fruits"
    },
    {
      id: 6,
      title: "Fresh Tomatoes",
      price: 3.49,
      originalPrice: 4.99,
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 345,
      description: "Juicy and ripe tomatoes for cooking",
      weight: "500g",
      origin: "Local Farm",
      discount: 30,
      inStock: true,
      freeDelivery: false,
      category: "fruits"
    },
    {
      id: 7,
      title: "Green Lettuce",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 156,
      description: "Fresh crispy lettuce for salads",
      weight: "1 head",
      origin: "Local Farm",
      isNew: true,
      inStock: true,
      organic: true,
      category: "fruits"
    },
    {
      id: 8,
      title: "Organic Carrots",
      price: 1.99,
      originalPrice: 2.99,
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 234,
      description: "Crunchy organic carrots, rich in vitamins",
      weight: "1 kg",
      origin: "Local Farm",
      discount: 33,
      inStock: false,
      organic: true,
      category: "fruits"
    }
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleCompare = (product) => {
    setCompareProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert("You can compare maximum 3 products at a time");
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleApplyFilters = (filters) => {
    let result = [...products];

    // Price Range
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    // Rating
    if (filters.rating) {
      result = result.filter(p => p.rating >= filters.rating);
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // In Stock
    if (filters.inStock) {
      result = result.filter(p => p.inStock);
    }

    // Organic
    if (filters.organic) {
      result = result.filter(p => p.organic);
    }

    // On Sale
    if (filters.onSale) {
      result = result.filter(p => p.discount > 0);
    }

    setFilteredProducts(result);
  };

  // Calculate flash sale end time (24 hours from now)
  const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbaar />

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-red-600 text-white p-5 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-110 transition-all group"
      >
        <FaShoppingCart className="text-2xl" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
      </button>

      {/* Compare Floating Button */}
      {compareProducts.length > 0 && (
        <button
          onClick={() => setIsCompareOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all"
        >
          <MdCompare className="text-xl" />
          <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {compareProducts.length}
          </span>
        </button>
      )}

      {/* Hero Section */}
      <div className="pt-[12vh] md:pt-[14vh]">
        <Hero />
      </div>

      {/* Advanced Search Bar Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdvancedSearchBar onSearch={(query) => console.log("Search:", query)} />
      </div>

      {/* Flash Sale Timer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <DealTimer endTime={flashSaleEndTime} title="⚡ Flash Sale Ending Soon" />
      </div>

      {/* Category Section */}
      <Category />

      {/* Main Shop Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-600 transition-all"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApplyFilters={handleApplyFilters}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <AdvancedProductCard
                  key={product.id}
                  product={product}
                  onQuickView={handleQuickView}
                  onAddToCart={handleAddToCart}
                  onCompare={handleCompare}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <Values />

      {/* Discount Section */}
      <Discount />

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <QuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />

      <ProductComparison
        products={compareProducts}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </div>
  );
};

export default AdvancedShop;
