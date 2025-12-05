import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaBolt, FaFire, FaCheckCircle } from "react-icons/fa";

const LiveSalesCounter = () => {
  const [todaySales, setTodaySales] = useState(1234);
  const [recentSales, setRecentSales] = useState([]);
  const [flashAnimation, setFlashAnimation] = useState(false);

  // Mock product names for sales
  const products = [
    "Organic Apples",
    "Fresh Bananas",
    "Strawberries",
    "Avocados",
    "Blueberries",
    "Tomatoes",
    "Lettuce",
    "Carrots"
  ];

  const locations = [
    "New York, USA",
    "London, UK",
    "Tokyo, Japan",
    "Mumbai, India",
    "Sydney, Australia",
    "Toronto, Canada"
  ];

  useEffect(() => {
    // Add new sale every 2-5 seconds
    const interval = setInterval(() => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const randomPrice = (Math.random() * 20 + 5).toFixed(2);

      const newSale = {
        id: Date.now(),
        product: randomProduct,
        location: randomLocation,
        price: randomPrice,
        time: "Just now"
      };

      setRecentSales(prev => [newSale, ...prev.slice(0, 4)]);
      setTodaySales(prev => prev + 1);
      setFlashAnimation(true);
      
      setTimeout(() => setFlashAnimation(false), 500);
    }, Math.random() * 3000 + 2000); // Random interval 2-5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-full">
            <FaShoppingCart className="text-2xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Live Sales</h3>
            <p className="text-sm opacity-90">Happening right now</p>
          </div>
        </div>
        <FaFire className="text-yellow-300 text-3xl animate-bounce" />
      </div>

      {/* Today's Sales Counter */}
      <div className="relative z-10 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-75 mb-1">Today's Sales</p>
              <p className={`text-4xl font-bold transition-all duration-300 ${
                flashAnimation ? 'scale-110 text-yellow-300' : 'scale-100'
              }`}>
                {todaySales.toLocaleString()}
              </p>
            </div>
            <FaBolt className={`text-5xl text-yellow-300 ${flashAnimation ? 'animate-ping' : ''}`} />
          </div>
        </div>
      </div>

      {/* Recent Sales Feed */}
      <div className="relative z-10">
        <h4 className="text-sm font-semibold opacity-75 mb-3 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-300"></span>
          </span>
          RECENT PURCHASES
        </h4>

        <div className="space-y-2">
          {recentSales.length === 0 ? (
            <div className="text-center py-4 opacity-60">
              <p className="text-sm">Waiting for sales...</p>
            </div>
          ) : (
            recentSales.map((sale, index) => (
              <div
                key={sale.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 animate-slideInRight"
                style={{
                  animation: `slideInRight 0.5s ease-out`,
                  opacity: 1 - (index * 0.15)
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <FaCheckCircle className="text-green-300 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate">{sale.product}</p>
                      <p className="text-xs opacity-75 truncate">📍 {sale.location}</p>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="font-bold">${sale.price}</p>
                    <p className="text-xs opacity-75">{sale.time}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-center">
        <div>
          <p className="text-2xl font-bold">${(todaySales * 12.5).toFixed(0)}</p>
          <p className="text-xs opacity-75">Revenue Today</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{Math.floor(todaySales / 24)}</p>
          <p className="text-xs opacity-75">Sales/Hour</p>
        </div>
      </div>
    </div>
  );
};

export default LiveSalesCounter;
