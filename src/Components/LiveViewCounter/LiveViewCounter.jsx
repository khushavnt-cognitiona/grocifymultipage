import React, { useState, useEffect } from "react";
import { FaEye, FaUsers, FaFire, FaArrowUp, FaArrowDown } from "react-icons/fa";

const LiveViewCounter = () => {
  const [viewCount, setViewCount] = useState(1247);
  const [activeUsers, setActiveUsers] = useState(89);
  const [trend, setTrend] = useState("up");
  const [recentChange, setRecentChange] = useState(0);

  useEffect(() => {
    // Simulate real-time view updates
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 10) - 3; // -3 to +6
      const newCount = Math.max(1000, viewCount + change);
      
      setRecentChange(change);
      setViewCount(newCount);
      setTrend(change >= 0 ? "up" : "down");

      // Update active users (more stable)
      const userChange = Math.floor(Math.random() * 5) - 2;
      setActiveUsers(prev => Math.max(50, Math.min(200, prev + userChange)));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [viewCount]);

  // Pulse animation for live indicator
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulse(p => !p);
    }, 1000);
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Live Indicator */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className={`flex h-4 w-4 ${pulse ? 'scale-100' : 'scale-90'} transition-transform`}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
          </div>
          <span className="text-sm font-bold uppercase tracking-wider">LIVE NOW</span>
        </div>
        <FaFire className="text-yellow-300 text-2xl animate-bounce" />
      </div>

      {/* Main Counter */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <FaEye className="text-4xl" />
          <div>
            <h3 className="text-5xl font-bold tracking-tight animate-slideInRight">
              {viewCount.toLocaleString()}
            </h3>
            <p className="text-sm opacity-90">People viewing this page</p>
          </div>
        </div>

        {/* Trend Indicator */}
        <div className="flex items-center gap-2 mt-4">
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            trend === "up" ? "bg-green-500/30" : "bg-red-500/30"
          }`}>
            {trend === "up" ? (
              <FaArrowUp className="text-green-300" />
            ) : (
              <FaArrowDown className="text-red-300" />
            )}
            <span className="font-semibold text-sm">
              {Math.abs(recentChange)} {trend === "up" ? "increase" : "decrease"}
            </span>
          </div>
          <span className="text-xs opacity-75">in last 3 seconds</span>
        </div>
      </div>

      {/* Active Users */}
      <div className="relative z-10 mt-6 pt-6 border-t border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaUsers className="text-2xl" />
            <div>
              <p className="text-2xl font-bold">{activeUsers}</p>
              <p className="text-xs opacity-75">Active shoppers</p>
            </div>
          </div>

          {/* User Avatars */}
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-xs font-bold"
                style={{
                  animation: `slideInRight 0.5s ease-out ${i * 0.1}s both`
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="relative z-10 mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-2xl font-bold">{Math.floor(viewCount / 10)}</p>
          <p className="text-xs opacity-75">Products viewed</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-2xl font-bold">{Math.floor(activeUsers / 3)}</p>
          <p className="text-xs opacity-75">Items in carts</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-2xl font-bold">{Math.floor(activeUsers / 5)}</p>
          <p className="text-xs opacity-75">Checkouts now</p>
        </div>
      </div>
    </div>
  );
};

export default LiveViewCounter;
