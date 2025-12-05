import React, { useState } from "react";
import { FaHeart, FaStar, FaShoppingCart, FaEye, FaExchangeAlt, FaTruck, FaBolt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const AdvancedProductCard = ({ 
  product,
  onQuickView,
  onAddToCart,
  onAddToWishlist,
  onCompare
}) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    id,
    title,
    price,
    originalPrice,
    image,
    rating = 4.5,
    reviews = 234,
    description,
    weight,
    origin,
    discount,
    isBestSeller,
    isNew,
    inStock = true,
    organic = false,
    freeDelivery = false,
    flashSale = false
  } = product;

  const savings = originalPrice ? originalPrice - price : 0;
  const discountPercent = originalPrice ? Math.round((savings / originalPrice) * 100) : 0;

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onAddToWishlist) onAddToWishlist(product);
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    setIsComparing(!isComparing);
    if (onCompare) onCompare(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
    >
      
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 space-y-2">
          {flashSale && (
            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
              <FaBolt className="text-yellow-300" />
              FLASH SALE
            </div>
          )}
          {discount > 0 && (
            <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {discountPercent}% OFF
            </div>
          )}
          {isBestSeller && (
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              BESTSELLER
            </div>
          )}
          {isNew && (
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              NEW
            </div>
          )}
          {organic && (
            <div className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ORGANIC
            </div>
          )}
        </div>

        {/* Top Right Action Buttons */}
        <div className="absolute top-3 right-3 z-10 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlist}
            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
              isWishlisted 
                ? "bg-red-500 text-white" 
                : "bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-500"
            }`}
            title="Add to Wishlist"
          >
            <FaHeart className="text-lg" />
          </button>
          
          <button
            onClick={handleCompare}
            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
              isComparing 
                ? "bg-blue-500 text-white" 
                : "bg-white/90 text-gray-700 hover:bg-blue-50 hover:text-blue-500"
            }`}
            title="Compare"
          >
            <FaExchangeAlt className="text-lg" />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-64 flex items-center justify-center p-6">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={image}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleQuickView}
            className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-xl hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105"
          >
            <FaEye />
            Quick View
          </button>
        </div>

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-xl">
              OUT OF STOCK
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
            <span className="font-bold">{rating}</span>
            <FaStar className="text-xs" />
          </div>
          <span className="text-sm text-gray-500">
            ({reviews?.toLocaleString()} reviews)
          </span>
          {rating >= 4.5 && (
            <MdVerified className="text-blue-500 text-lg" title="Verified Quality" />
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Product Details */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          {weight && <span>📦 {weight}</span>}
          {origin && <span>🌍 {origin}</span>}
        </div>

        {/* Free Delivery Badge */}
        {freeDelivery && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-semibold mb-3">
            <FaTruck />
            <span>Free Delivery</span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">${price}</span>
            {originalPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
                <span className="text-sm text-green-600 font-semibold">
                  Save ${savings.toFixed(2)}
                </span>
              </>
            )}
          </div>
          {originalPrice && (
            <div className="text-xs text-gray-500 mt-1">
              Inclusive of all taxes
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            inStock
              ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-[1.02]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FaShoppingCart />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-1 mt-3 text-center text-[10px] text-gray-600">
          <div>✓ Quality</div>
          <div>✓ Fresh</div>
          <div>✓ Secure</div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.3)]" />
      </div>
    </div>
  );
};

export default AdvancedProductCard;
