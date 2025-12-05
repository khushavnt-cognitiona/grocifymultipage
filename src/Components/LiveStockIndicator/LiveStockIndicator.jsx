import React from "react";
import { FaBolt, FaBox, FaTruck } from "react-icons/fa";

const LiveStockIndicator = ({ stock = 15, threshold = 10, productName }) => {
  const getStockStatus = () => {
    if (stock === 0) return "out";
    if (stock <= threshold) return "low";
    return "available";
  };

  const status = getStockStatus();

  const config = {
    out: {
      color: "bg-red-500",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: FaBox,
      message: "Out of Stock",
      subMessage: "Notify me when available"
    },
    low: {
      color: "bg-orange-500",
      textColor: "text-orange-700",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: FaBolt,
      message: `Only ${stock} left!`,
      subMessage: "⚡ Hurry! Limited stock"
    },
    available: {
      color: "bg-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: FaTruck,
      message: "In Stock",
      subMessage: "Ready to ship"
    }
  };

  const { color, textColor, bgColor, borderColor, icon: Icon, message, subMessage } = config[status];

  // Calculate stock percentage for animation
  const stockPercentage = Math.min((stock / 50) * 100, 100);

  return (
    <div className={`${bgColor} ${borderColor} border-2 rounded-xl p-4 mb-4`}>
      <div className="flex items-start gap-3">
        {/* Animated Icon */}
        <div className={`${color} p-3 rounded-full ${status === "low" ? "animate-pulse" : ""}`}>
          <Icon className="text-white text-xl" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`${textColor} font-bold text-lg`}>{message}</h3>
            {status !== "out" && (
              <span className={`${textColor} text-sm font-semibold`}>{stock} units</span>
            )}
          </div>

          <p
            className={`text-sm ${textColor} mb-3 ${
              status === "low" ? "font-semibold animate-pulse" : ""
            }`}
          >
            {subMessage}
          </p>

          {/* Stock Bar */}
          {status !== "out" && (
            <div className="relative">
              <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                <div
                  className={`${color} h-full transition-all duration-1000 ease-out ${
                    status === "low" ? "animate-pulse" : ""
                  }`}
                  style={{
                    width: `${stockPercentage}%`,
                    animation: status === "low" ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : ""
                  }}
                />
              </div>

              {/* Live Indicator */}
              {status === "low" && (
                <div className="absolute -top-8 right-0 flex items-center gap-1">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                  <span className="text-xs text-orange-600 font-semibold">LIVE</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            {status === "out" ? (
              <button className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-900 transition-all">
                Notify Me
              </button>
            ) : (
              <>
                {status === "low" && (
                  <div className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-lg font-semibold text-center animate-pulse">
                    ⚡ Order Now!
                  </div>
                )}
              </>
            )}
          </div>

          {/* Real-time Update Indicator */}
          {status === "low" && (
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
              <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span>Live stock count • Updates every 5 min</span>
            </div>
          )}
        </div>
      </div>

      {/* Stock Activity Indicator */}
      {status === "low" && (
        <div className="mt-4 pt-4 border-t border-orange-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <span className={textColor}>
                <strong>24 people</strong> viewing this
              </span>
            </div>
            <span className={`${textColor} font-semibold`}>🔥 Trending</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStockIndicator;
