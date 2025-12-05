import React, { useState } from "react";
import { FaTimes, FaHeart, FaShoppingCart, FaTrash, FaShare } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";

const WishlistDrawer = ({ isOpen, onClose, wishlistItems = [] }) => {
  const [items, setItems] = useState(wishlistItems.length > 0 ? wishlistItems : [
    {
      id: 1,
      title: "Organic Strawberries",
      price: 5.99,
      originalPrice: 8.99,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&fit=crop",
      inStock: true,
      discount: 33
    },
    {
      id: 2,
      title: "Fresh Blueberries",
      price: 6.99,
      originalPrice: 9.99,
      image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&h=200&fit=crop",
      inStock: true,
      discount: 30
    },
    {
      id: 3,
      title: "Premium Avocados",
      price: 7.99,
      originalPrice: 10.99,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop",
      inStock: false,
      discount: 27
    }
  ]);

  const removeFromWishlist = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addAllToCart = () => {
    const availableItems = items.filter(item => item.inStock);
    alert(`Added ${availableItems.length} items to cart!`);
  };

  const shareWishlist = () => {
    alert("Wishlist link copied to clipboard!");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-[9999] transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-red-600 text-white px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <FaHeart className="text-2xl animate-pulse" />
              <div>
                <h2 className="text-2xl font-bold">My Wishlist</h2>
                <p className="text-sm opacity-90">{items.length} items saved</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-all hover:rotate-90"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Action Buttons */}
          {items.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={addAllToCart}
                className="flex-1 bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <FaShoppingCart />
                Add All to Cart
              </button>
              <button
                onClick={shareWishlist}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
              >
                <FaShare />
              </button>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <MdFavoriteBorder className="text-gray-300 text-8xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Save items you love to buy them later</p>
              <button
                onClick={onClose}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-all font-semibold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all group animate-slideInRight"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {item.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.discount}% OFF
                        </div>
                      )}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
                      
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-lg font-bold text-gray-900">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                        )}
                      </div>

                      {item.inStock ? (
                        <div className="flex gap-2">
                          <button className="flex-1 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-1">
                            <FaShoppingCart className="text-xs" />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors px-2"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            disabled
                            className="flex-1 bg-gray-300 text-gray-500 px-3 py-2 rounded-lg text-sm font-semibold cursor-not-allowed"
                          >
                            Out of Stock
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors px-2"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600">Total Savings</span>
              <span className="text-2xl font-bold text-green-600">
                ${items.reduce((sum, item) => sum + (item.originalPrice - item.price || 0), 0).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-center text-gray-500">
              💡 Items in your wishlist are not reserved. Shop now before they're gone!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistDrawer;
