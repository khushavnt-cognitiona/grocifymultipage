import React, { useState, useEffect } from "react";
import { FaBell, FaShoppingCart, FaTruck, FaTag, FaStar, FaTimes } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

const LiveNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(true);

  const notificationTypes = [
    {
      type: "sale",
      icon: FaShoppingCart,
      color: "from-green-500 to-emerald-600",
      messages: [
        "{user} just purchased {product}",
        "New order from {location}",
        "{product} sold out in {location}"
      ]
    },
    {
      type: "delivery",
      icon: FaTruck,
      color: "from-blue-500 to-cyan-600",
      messages: [
        "Order delivered to {location}",
        "{product} arriving today in {location}",
        "Express delivery started for {product}"
      ]
    },
    {
      type: "deal",
      icon: FaTag,
      color: "from-orange-500 to-red-600",
      messages: [
        "Flash sale on {product} - 50% OFF!",
        "Limited time: Buy 1 Get 1 on {product}",
        "Price drop alert: {product} now ${price}"
      ]
    },
    {
      type: "review",
      icon: FaStar,
      color: "from-purple-500 to-pink-600",
      messages: [
        "{user} rated {product} 5 stars",
        "New review on {product}",
        "{product} trending with 4.8★ rating"
      ]
    }
  ];

  const products = ["Organic Apples", "Fresh Strawberries", "Avocados", "Blueberries"];
  const users = ["John", "Sarah", "Mike", "Emma", "Alex"];
  const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

  useEffect(() => {
    // Add notification every 3-6 seconds
    const interval = setInterval(() => {
      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];
      
      const notification = {
        id: Date.now(),
        type: randomType.type,
        icon: randomType.icon,
        color: randomType.color,
        message: randomMessage
          .replace("{user}", users[Math.floor(Math.random() * users.length)])
          .replace("{product}", products[Math.floor(Math.random() * products.length)])
          .replace("{location}", locations[Math.floor(Math.random() * locations.length)])
          .replace("{price}", (Math.random() * 10 + 5).toFixed(2)),
        time: "Just now",
        isNew: true
      };

      setNotifications(prev => {
        // Remove isNew flag from previous notifications
        const updated = prev.map(n => ({ ...n, isNew: false }));
        // Add new notification
        return [notification, ...updated].slice(0, 10);
      });
    }, Math.random() * 3000 + 3000); // 3-6 seconds

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 p-3 rounded-xl relative">
            <FaBell className="text-white text-2xl" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {notifications.length}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Live Notifications
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </h3>
            <p className="text-sm text-gray-600">Real-time activity feed</p>
          </div>
        </div>

        <button
          onClick={() => setShowPanel(!showPanel)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          {showPanel ? "Hide" : "Show"}
        </button>
      </div>

      {/* Notifications Panel */}
      {showPanel && (
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <FaBell className="text-gray-300 text-6xl mx-auto mb-4" />
              <p className="text-gray-400">Waiting for notifications...</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`relative bg-gradient-to-r ${notification.color} p-4 rounded-xl text-white shadow-lg transition-all duration-500 ${
                  notification.isNew ? "animate-slideInRight scale-105" : ""
                }`}
                style={{
                  opacity: 1 - (index * 0.08)
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="absolute top-2 right-2 hover:bg-white/20 p-1 rounded-full transition-all"
                >
                  <FaTimes className="text-sm" />
                </button>

                <div className="flex items-start gap-3 pr-6">
                  {/* Icon */}
                  <div className="bg-white/20 p-2 rounded-full flex-shrink-0">
                    {React.createElement(notification.icon, { className: "text-xl" })}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{notification.message}</p>
                    <p className="text-xs opacity-90">{notification.time}</p>
                  </div>

                  {/* New Badge */}
                  {notification.isNew && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      NEW
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-4 gap-3 text-center">
        {notificationTypes.map((type, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className={`bg-gradient-to-r ${type.color} w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2`}>
              {React.createElement(type.icon, { className: "text-white text-lg" })}
            </div>
            <p className="text-lg font-bold text-gray-900">
              {notifications.filter(n => n.type === type.type).length}
            </p>
            <p className="text-xs text-gray-600 capitalize">{type.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveNotifications;
