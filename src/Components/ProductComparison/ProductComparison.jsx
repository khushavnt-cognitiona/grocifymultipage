import React, { useState } from "react";
import { FaTimes, FaCheck, FaStar, FaShoppingCart } from "react-icons/fa";
import { MdCompare } from "react-icons/md";

const ProductComparison = ({ products = [], isOpen, onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState(
    products.length > 0 ? products.slice(0, 3) : []
  );

  // Mock products for demo
  const demoProducts = selectedProducts.length > 0 ? selectedProducts : [
    {
      id: 1,
      title: "Organic Red Apples",
      price: 4.99,
      originalPrice: 6.99,
      rating: 4.5,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=300&fit=crop",
      weight: "1 kg",
      origin: "Washington, USA",
      organic: true,
      inStock: true,
      features: ["100% Organic", "Fresh Daily", "No Pesticides", "Vitamin Rich"]
    },
    {
      id: 2,
      title: "Premium Fuji Apples",
      price: 5.99,
      originalPrice: 7.99,
      rating: 4.8,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
      weight: "1 kg",
      origin: "Japan",
      organic: false,
      inStock: true,
      features: ["Sweet & Crispy", "Premium Quality", "Import", "High Fiber"]
    },
    {
      id: 3,
      title: "Green Granny Smith",
      price: 3.99,
      originalPrice: 5.49,
      rating: 4.3,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=300&fit=crop",
      weight: "1 kg",
      origin: "Australia",
      organic: true,
      inStock: false,
      features: ["Tart Flavor", "Organic", "Great for Baking", "Long Shelf Life"]
    }
  ];

  const comparisonRows = [
    { label: "Price", key: "price", type: "price" },
    { label: "Original Price", key: "originalPrice", type: "price" },
    { label: "You Save", key: "savings", type: "savings" },
    { label: "Rating", key: "rating", type: "rating" },
    { label: "Reviews", key: "reviews", type: "number" },
    { label: "Weight", key: "weight", type: "text" },
    { label: "Origin", key: "origin", type: "text" },
    { label: "Organic", key: "organic", type: "boolean" },
    { label: "In Stock", key: "inStock", type: "boolean" },
    { label: "Features", key: "features", type: "features" }
  ];

  const renderCell = (product, row) => {
    switch (row.type) {
      case "price":
        return <span className="text-lg font-bold text-gray-900">${product[row.key]}</span>;
      
      case "savings":
        const savings = product.originalPrice - product.price;
        return (
          <span className="text-green-600 font-semibold">
            ${savings.toFixed(2)} ({Math.round((savings / product.originalPrice) * 100)}%)
          </span>
        );
      
      case "rating":
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
              <span className="font-bold">{product.rating}</span>
              <FaStar className="text-xs" />
            </div>
          </div>
        );
      
      case "number":
        return <span className="text-gray-700">{product[row.key].toLocaleString()}</span>;
      
      case "boolean":
        return product[row.key] ? (
          <FaCheck className="text-green-600 text-xl mx-auto" />
        ) : (
          <FaTimes className="text-red-500 text-xl mx-auto" />
        );
      
      case "features":
        return (
          <ul className="space-y-1 text-sm">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        );
      
      default:
        return <span className="text-gray-700">{product[row.key]}</span>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden m-4 animate-slideUp flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MdCompare className="text-3xl" />
            <div>
              <h2 className="text-2xl font-bold">Product Comparison</h2>
              <p className="text-sm opacity-90">Compare up to {demoProducts.length} products side by side</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-all hover:rotate-90"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="border-r border-gray-200 p-4 text-left font-semibold text-gray-700 w-48">
                  Specifications
                </th>
                {demoProducts.map((product) => (
                  <th key={product.id} className="border-r last:border-r-0 border-gray-200 p-4 min-w-[250px]">
                    <div className="space-y-3">
                      {/* Product Image */}
                      <div className="relative bg-gray-100 rounded-lg overflow-hidden group">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Product Title */}
                      <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
                      
                      {/* Add to Cart Button */}
                      <button
                        disabled={!product.inStock}
                        className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                          product.inStock
                            ? "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <FaShoppingCart />
                        {product.inStock ? "Add to Cart" : "Unavailable"}
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-orange-50 transition-colors`}
                >
                  <td className="border-r border-t border-gray-200 p-4 font-semibold text-gray-700">
                    {row.label}
                  </td>
                  {demoProducts.map((product) => (
                    <td
                      key={product.id}
                      className="border-r last:border-r-0 border-t border-gray-200 p-4 text-center"
                    >
                      {renderCell(product, row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            💡 Tip: Choose products based on your priorities - price, quality, or features
          </p>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
