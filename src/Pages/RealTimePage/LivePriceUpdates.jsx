import React, { useState, useEffect } from "react";
import { FaDollarSign, FaArrowUp, FaArrowDown, FaChartLine } from "react-icons/fa";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

const LivePriceUpdates = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Apples",
      currentPrice: 4.99,
      previousPrice: 4.99,
      trend: "stable",
      change: 0,
      updateCount: 0
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      currentPrice: 5.99,
      previousPrice: 5.99,
      trend: "stable",
      change: 0,
      updateCount: 0
    },
    {
      id: 3,
      name: "Premium Avocados",
      currentPrice: 7.99,
      previousPrice: 7.99,
      trend: "stable",
      change: 0,
      updateCount: 0
    },
    {
      id: 4,
      name: "Organic Blueberries",
      currentPrice: 6.99,
      previousPrice: 6.99,
      trend: "stable",
      change: 0,
      updateCount: 0
    }
  ]);

  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Update prices randomly every 5 seconds
    const interval = setInterval(() => {
      setProducts(prevProducts => {
        return prevProducts.map(product => {
          // Random price change between -0.50 and +0.50
          const priceChange = (Math.random() - 0.5) * 1;
          const newPrice = Math.max(1, product.currentPrice + priceChange);
          const roundedPrice = Math.round(newPrice * 100) / 100;

          const change = roundedPrice - product.currentPrice;
          const trend = change > 0 ? "up" : change < 0 ? "down" : "stable";

          return {
            ...product,
            previousPrice: product.currentPrice,
            currentPrice: roundedPrice,
            trend,
            change,
            updateCount: product.updateCount + 1
          };
        });
      });
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-xl">
            <FaChartLine className="text-white text-2xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Live Price Tracker
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </h3>
            <p className="text-xs text-gray-600">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Auto-Update Indicator */}
        <div className="bg-green-50 border-2 border-green-500 px-4 py-2 rounded-lg">
          <p className="text-green-800 font-bold text-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Auto-Update ON
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={`relative bg-gradient-to-r rounded-xl p-5 border-2 transition-all duration-500 ${
              product.trend === "up"
                ? "from-green-50 to-emerald-50 border-green-500"
                : product.trend === "down"
                ? "from-red-50 to-pink-50 border-red-500"
                : "from-gray-50 to-gray-100 border-gray-300"
            }`}
          >
            {/* Trend Animation */}
            {product.trend !== "stable" && (
              <div className="absolute -top-1 -right-1">
                <div className={`${
                  product.trend === "up" ? "bg-green-500" : "bg-red-500"
                } text-white p-2 rounded-full animate-bounce`}>
                  {product.trend === "up" ? (
                    <MdTrendingUp className="text-lg" />
                  ) : (
                    <MdTrendingDown className="text-lg" />
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              {/* Product Info */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h4>
                <p className="text-xs text-gray-600">Update #{product.updateCount}</p>
              </div>

              {/* Price Display */}
              <div className="text-right">
                <div className="flex items-baseline gap-2 justify-end">
                  <span className={`text-3xl font-bold transition-all duration-300 ${
                    product.trend === "up"
                      ? "text-green-600 scale-110"
                      : product.trend === "down"
                      ? "text-red-600 scale-110"
                      : "text-gray-900"
                  }`}>
                    ${product.currentPrice.toFixed(2)}
                  </span>
                  
                  {/* Change Indicator */}
                  {product.change !== 0 && (
                    <div className={`flex items-center gap-1 ${
                      product.change > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {product.change > 0 ? (
                        <FaArrowUp className="text-sm animate-bounce" />
                      ) : (
                        <FaArrowDown className="text-sm animate-bounce" />
                      )}
                      <span className="font-semibold">
                        ${Math.abs(product.change).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Previous Price */}
                {product.previousPrice !== product.currentPrice && (
                  <p className="text-sm text-gray-400 line-through mt-1">
                    Was: ${product.previousPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Price Change Bar */}
            {product.change !== 0 && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Price Change:</span>
                  <span className={`font-semibold ${
                    product.change > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {((product.change / product.previousPrice) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      product.change > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(Math.abs((product.change / product.previousPrice) * 100) * 10, 100)}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
        <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center justify-center gap-1 text-green-600 mb-2">
            <FaArrowUp />
            <span className="text-2xl font-bold">
              {products.filter(p => p.trend === "up").length}
            </span>
          </div>
          <p className="text-xs text-green-700 font-semibold">Price Increased</p>
        </div>

        <div className="text-center bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
          <div className="flex items-center justify-center gap-1 text-red-600 mb-2">
            <FaArrowDown />
            <span className="text-2xl font-bold">
              {products.filter(p => p.trend === "down").length}
            </span>
          </div>
          <p className="text-xs text-red-700 font-semibold">Price Decreased</p>
        </div>

        <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
            <FaDollarSign />
            <span className="text-2xl font-bold">
              {products.filter(p => p.trend === "stable").length}
            </span>
          </div>
          <p className="text-xs text-gray-700 font-semibold">Stable</p>
        </div>
      </div>
    </div>
  );
};

export default LivePriceUpdates;
