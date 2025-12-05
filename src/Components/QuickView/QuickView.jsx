import React, { useState } from "react";
import { FaTimes, FaStar, FaHeart, FaShoppingCart, FaMinus, FaPlus, FaShare, FaTruck } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const QuickView = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!isOpen || !product) return null;

  // Mock multiple images (in real app, these would come from product data)
  const images = product.images || [product.image, product.image, product.image];

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= 10) setQuantity(newQty);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto m-4 animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">Quick View</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl transition-all hover:rotate-90 duration-300"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-xl p-8 overflow-hidden group">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-96 object-contain transform group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.discount && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {product.discount}% OFF
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg block">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Share Button */}
              <button className="absolute top-4 right-4 bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-all">
                <FaShare />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === idx ? "border-orange-500 shadow-lg scale-105" : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain bg-gray-50" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
              <div className="flex items-center gap-2">
                <MdVerified className="text-green-500 text-lg" />
                <span className="text-sm text-green-600 font-medium">Verified Product</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded">
                <span className="font-bold">{product.rating || 4.5}</span>
                <FaStar className="text-xs" />
              </div>
              <span className="text-gray-600">
                {product.reviews || 2847} ratings & {Math.floor((product.reviews || 2847) * 0.6)} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                  <span className="text-lg text-green-600 font-semibold">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed border-t pt-4">
              {product.description || "Fresh and organic product delivered straight to your doorstep. Premium quality guaranteed."}
            </p>

            {/* Product Info */}
            <div className="grid grid-cols-2 gap-3 text-sm border-y py-4">
              <div>
                <span className="text-gray-500">Weight:</span>
                <span className="font-semibold ml-2">{product.weight || "1 kg"}</span>
              </div>
              <div>
                <span className="text-gray-500">Origin:</span>
                <span className="font-semibold ml-2">{product.origin || "Local Farm"}</span>
              </div>
              <div>
                <span className="text-gray-500">Stock:</span>
                <span className={`font-semibold ml-2 ${product.inStock !== false ? "text-green-600" : "text-red-600"}`}>
                  {product.inStock !== false ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div>
                <span className="text-gray-500">SKU:</span>
                <span className="font-semibold ml-2">GR{Math.floor(Math.random() * 10000)}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <FaTruck className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900">Free Delivery</h4>
                <p className="text-sm text-blue-700">Estimated delivery: 2-3 business days</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center gap-3 border-2 border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  <FaMinus className="text-gray-600" />
                </button>
                <span className="font-bold text-lg min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity >= 10}
                >
                  <FaPlus className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <FaShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  isWishlisted
                    ? "bg-red-50 border-red-500 text-red-500"
                    : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
                }`}
              >
                <FaHeart className="text-2xl" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-center text-xs">
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="font-semibold">✓ 100% Organic</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="font-semibold">✓ No Preservatives</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="font-semibold">✓ Farm Fresh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
