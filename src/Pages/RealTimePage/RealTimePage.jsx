import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBolt, FaRocket } from "react-icons/fa";
import LiveViewCounter from "./LiveViewCounter";
import LiveSalesCounter from "./LiveSalesCounter";
import LiveProductFeed from "./LiveProductFeed";
import LivePriceUpdates from "./LivePriceUpdates";
import LiveNotifications from "./LiveNotifications";
import LiveChat, { LiveChatButton } from "./LiveChat";

const RealTimePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <FaHome />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </div>
            
            <div className="text-center flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
                <FaBolt className="text-yellow-300 animate-bounce" />
                Real-Time Dashboard
                <FaRocket className="text-yellow-300 animate-bounce" style={{ animationDelay: "0.2s" }} />
              </h1>
              <p className="text-lg opacity-90">Live updates every second • Watch the magic happen! ✨</p>
            </div>

            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Counters Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <LiveViewCounter />
          <LiveSalesCounter />
        </div>

        {/* Live Product Feed */}
        <div className="mb-8">
          <LiveProductFeed 
            onProductClick={(product) => console.log("Product clicked:", product)}
          />
        </div>

        {/* Live Price Updates */}
        <div className="mb-8">
          <LivePriceUpdates />
        </div>

        {/* Live Notifications */}
        <div className="mb-8">
          <LiveNotifications />
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl shadow-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-3">🔥 Everything Updates in Real-Time! 🔥</h2>
          <p className="text-lg mb-4">
            This dashboard demonstrates real-time features you'd see on platforms like Amazon and Flipkart.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold mb-1">👀</p>
              <p className="text-sm">Live Views</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold mb-1">💰</p>
              <p className="text-sm">Live Prices</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold mb-1">🛒</p>
              <p className="text-sm">Live Sales</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold mb-1">🔔</p>
              <p className="text-sm">Live Alerts</p>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Real-Time Features Implemented
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Live View Counter",
                description: "See how many people are viewing the page in real-time",
                icon: "👁️"
              },
              {
                title: "Live Sales Feed",
                description: "Watch sales happening across the globe as they occur",
                icon: "🛒"
              },
              {
                title: "Live Product Feed",
                description: "New products appear automatically every few seconds",
                icon: "📦"
              },
              {
                title: "Live Price Updates",
                description: "Prices update dynamically with trend indicators",
                icon: "💵"
              },
              {
                title: "Live Notifications",
                description: "Real-time alerts for sales, deliveries, and deals",
                icon: "🔔"
              },
              {
                title: "Live Chat Support",
                description: "Instant messaging with auto-responses (Click bottom right)",
                icon: "💬"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-orange-500 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-4xl">{feature.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Chat */}
      {!isChatOpen && (
        <LiveChatButton onClick={() => setIsChatOpen(true)} />
      )}
      <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default RealTimePage;
