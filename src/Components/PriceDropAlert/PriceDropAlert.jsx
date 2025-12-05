import React, { useState } from "react";
import { FaBell, FaTimes, FaChartLine, FaTag } from "react-icons/fa";
import { MdTrendingDown } from "react-icons/md";

const PriceDropAlert = ({ product, onClose, onNotifyMe }) => {
  const [email, setEmail] = useState("");
  const [targetPrice, setTargetPrice] = useState(product.price - 2);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const currentPrice = product.price || 9.99;
  const originalPrice = product.originalPrice || 14.99;
  const lowestPrice = product.lowestPrice || 8.49;
  const priceHistory = [12.99, 11.49, 10.99, 9.99, 10.49, 9.99];

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    setIsSubscribed(true);
    if (onNotifyMe) onNotifyMe(email, targetPrice);
    setTimeout(() => {
      if (onClose) onClose();
    }, 2000);
  };

  const priceDrop = ((originalPrice - currentPrice) / originalPrice * 100).toFixed(0);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full blur-3xl" />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
      >
        <FaTimes className="text-xl" />
      </button>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full">
            <MdTrendingDown className="text-white text-2xl animate-bounce" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Price Drop Alert</h3>
            <p className="text-sm text-gray-600">Never miss a great deal!</p>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
          <img
            src={product.image || "https://via.placeholder.com/80"}
            alt={product.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 line-clamp-1">{product.title}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-green-600">${currentPrice}</span>
              <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                {priceDrop}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Chart Mini */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FaChartLine className="text-orange-500" />
            Price History (7 days)
          </span>
          <span className="text-xs text-green-600 font-semibold">
            Lowest: ${lowestPrice}
          </span>
        </div>
        
        {/* Mini Chart */}
        <div className="flex items-end justify-between h-20 gap-1 bg-gradient-to-t from-green-50 to-transparent p-3 rounded-xl">
          {priceHistory.map((price, index) => {
            const height = ((price - lowestPrice) / (originalPrice - lowestPrice)) * 100;
            const isLowest = price === currentPrice;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group relative"
              >
                <div
                  className={`w-full ${isLowest ? 'bg-green-500' : 'bg-gray-300'} rounded-t transition-all group-hover:bg-green-400`}
                  style={{ height: `${Math.max(height, 10)}%` }}
                />
                <span className="text-[10px] text-gray-500 mt-1">{index + 1}d</span>
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  ${price}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Set Target Price */}
      <div className="relative z-10 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <FaTag className="inline mr-2 text-orange-500" />
          Notify me when price drops to:
        </label>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">$</span>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(parseFloat(e.target.value))}
            min={lowestPrice}
            max={currentPrice}
            step="0.1"
            className="flex-1 text-2xl font-bold border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => setTargetPrice(lowestPrice)}
            className="text-xs text-orange-600 hover:text-orange-700 font-semibold"
          >
            Set to lowest (${lowestPrice})
          </button>
          <span className="text-xs text-gray-500">
            {targetPrice < currentPrice ? `${((currentPrice - targetPrice) / currentPrice * 100).toFixed(0)}% drop needed` : "Target reached!"}
          </span>
        </div>
      </div>

      {/* Email Input */}
      {!isSubscribed ? (
        <div className="relative z-10 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaBell className="inline mr-2 text-orange-500" />
            Your Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-orange-500 focus:outline-none"
          />
        </div>
      ) : (
        <div className="relative z-10 mb-4 bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center animate-slideInRight">
          <div className="text-4xl mb-2">✅</div>
          <h4 className="text-green-800 font-bold text-lg mb-1">Alert Set Successfully!</h4>
          <p className="text-green-700 text-sm">
            We'll notify you at <strong>{email}</strong> when the price drops to <strong>${targetPrice}</strong>
          </p>
        </div>
      )}

      {/* Action Button */}
      {!isSubscribed && (
        <button
          onClick={handleSubscribe}
          className="relative z-10 w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <FaBell />
          Set Price Alert
        </button>
      )}

      {/* Info */}
      <p className="relative z-10 text-center text-xs text-gray-500 mt-4">
        🔒 We'll never spam you. Unsubscribe anytime.
      </p>
    </div>
  );
};

export default PriceDropAlert;
