import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft, FaHome } from "react-icons/fa";

const WishlistPage = () => {
  const navigate = useNavigate();
  
  // Demo Wishlist Data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Organic Bananas",
      price: 4.99,
      image: "🍌",
      stock: "In Stock",
      rating: 4.5
    },
    {
      id: 2,
      name: "Fresh Avocados",
      price: 8.50,
      image: "🥑",
      stock: "In Stock",
      rating: 4.8
    },
    {
      id: 3,
      name: "Red Apples",
      price: 3.99,
      image: "🍎",
      stock: "Out of Stock",
      rating: 4.2
    }
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const addToCart = (item) => {
    // Logic to add to cart would go here
    alert(`Added ${item.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all"
              >
                <FaArrowLeft />
              </button>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <FaHeart className="text-white" /> My Wishlist
                </h1>
                <p className="text-sm opacity-90">{wishlistItems.length} items saved</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <FaHome />
              <span className="hidden md:inline">Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="bg-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="text-pink-500 text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Explore more and shortlist some items.</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
                <div className="relative h-48 bg-gray-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                  {item.image}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full text-gray-400 hover:text-red-500 shadow-md hover:bg-red-50 transition-all"
                    title="Remove from wishlist"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
                        <span>★</span>
                        <span className="text-gray-500">({item.rating})</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">${item.price}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      item.stock === 'In Stock' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.stock}
                    </span>
                    
                    <button
                      onClick={() => addToCart(item)}
                      disabled={item.stock !== 'In Stock'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                        item.stock === 'In Stock'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:shadow-lg hover:scale-105'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
