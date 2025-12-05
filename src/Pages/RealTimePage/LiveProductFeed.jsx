import React, { useState, useEffect } from "react";
import { FaShoppingBag, FaFire, FaBolt, FaStar } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";

const LiveProductFeed = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "trending", "new", "hot-deals"];

  // Mock product pool
  const productPool = [
    {
      id: 1,
      title: "Organic Red Apples",
      price: 4.99,
      originalPrice: 6.99,
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=300&fit=crop",
      rating: 4.5,
      views: 234,
      category: "trending",
      badge: "🔥 Hot"
    },
    {
      id: 2,
      title: "Fresh Strawberries",
      price: 5.99,
      originalPrice: 8.99,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop",
      rating: 4.8,
      views: 567,
      category: "new",
      badge: "✨ New"
    },
    {
      id: 3,
      title: "Premium Avocados",
      price: 7.99,
      originalPrice: 10.99,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop",
      rating: 4.9,
      views: 891,
      category: "hot-deals",
      badge: "⚡ Deal"
    },
    {
      id: 4,
      title: "Organic Blueberries",
      price: 6.99,
      originalPrice: 9.99,
      image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&h=300&fit=crop",
      rating: 4.7,
      views: 423,
      category: "trending",
      badge: "🔥 Hot"
    },
    {
      id: 5,
      title: "Fresh Bananas",
      price: 2.49,
      originalPrice: 3.99,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=300&h=300&fit=crop",
      rating: 4.6,
      views: 678,
      category: "hot-deals",
      badge: "⚡ Sale"
    }
  ];

  useEffect(() => {
    // Initialize with some products
    setProducts(productPool.slice(0, 3));

    // Add new product every 4 seconds
    const interval = setInterval(() => {
      const randomProduct = productPool[Math.floor(Math.random() * productPool.length)];
      const newProduct = {
        ...randomProduct,
        id: Date.now(),
        views: Math.floor(Math.random() * 1000) + 100,
        isNew: true
      };

      setProducts(prev => {
        // Remove isNew flag from previous products
        const updated = prev.map(p => ({ ...p, isNew: false }));
        // Add new product at the beginning
        return [newProduct, ...updated].slice(0, 6);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl">
            <FaShoppingBag className="text-white text-2xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Live Product Feed
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </h3>
            <p className="text-sm text-gray-600">Real-time product updates</p>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="hidden md:flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">Loading products...</p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            <div
              key={product.id}
              onClick={() => onProductClick && onProductClick(product)}
              className={`group bg-gradient-to-br from-white to-gray-50 border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                product.isNew 
                  ? "border-orange-500 animate-slideInRight shadow-xl" 
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {product.badge}
                </span>
                {product.isNew && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    NEW
                  </span>
                )}
              </div>

              {/* Image */}
              <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Live Indicator Overlay */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-white text-xs font-semibold">LIVE</span>
                </div>
              </div>

              {/* Content */}
              <h4 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                {product.title}
              </h4>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>

              {/* Rating & Views */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MdTrendingUp className="text-orange-500" />
                  <span>{product.views} views</span>
                </div>
              </div>

              {/* Live Activity Bar */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaBolt className="text-yellow-500" />
                    {Math.floor(product.views / 10)} people viewing
                  </span>
                  <span className="text-green-600 font-semibold">In Stock</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Live Stats Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
          <p className="text-2xl font-bold text-purple-900">{products.length}</p>
          <p className="text-xs text-purple-700">Live Products</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
          <p className="text-2xl font-bold text-blue-900">
            {Math.floor(products.reduce((sum, p) => sum + p.views, 0))}
          </p>
          <p className="text-xs text-blue-700">Total Views</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
          <p className="text-2xl font-bold text-green-900">
            {products.filter(p => p.category === "hot-deals").length}
          </p>
          <p className="text-xs text-green-700">Hot Deals</p>
        </div>
      </div>
    </div>
  );
};

export default LiveProductFeed;
