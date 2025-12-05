import React from "react";
import { FaBox, FaTruck, FaHome, FaCheckCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const OrderTracker = ({ orderNumber = "ORD-2024-12345", currentStatus = 2 }) => {
  const statuses = [
    {
      id: 1,
      title: "Order Placed",
      description: "We have received your order",
      icon: FaBox,
      date: "Dec 3, 2024",
      time: "10:30 AM",
      completed: true
    },
    {
      id: 2,
      title: "Processing",
      description: "Your order is being prepared",
      icon: MdLocalShipping,
      date: "Dec 4, 2024",
      time: "2:15 PM",
      completed: true
    },
    {
      id: 3,
      title: "Shipped",
      description: "Your order is on the way",
      icon: FaTruck,
      date: "Dec 5, 2024",
      time: "Expected",
      completed: currentStatus >= 3
    },
    {
      id: 4,
      title: "Out for Delivery",
      description: "Order is out for delivery",
      icon: FaTruck,
      date: "Dec 6, 2024",
      time: "Expected",
      completed: currentStatus >= 4
    },
    {
      id: 5,
      title: "Delivered",
      description: "Order delivered successfully",
      icon: FaHome,
      date: "Dec 6, 2024",
      time: "Expected by 8 PM",
      completed: currentStatus >= 5
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Track Your Order</h2>
          <p className="text-gray-600">Order #{orderNumber}</p>
        </div>
        <div className="bg-green-50 border-2 border-green-500 px-4 py-2 rounded-lg">
          <p className="text-green-800 font-bold">
            {statuses.find(s => s.id === currentStatus)?.title || "Processing"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-12">
        {/* Background Line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10" />
        
        {/* Progress Line */}
        <div
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 -z-10 transition-all duration-1000"
          style={{ width: `${((currentStatus - 1) / (statuses.length - 1)) * 100}%` }}
        />

        {/* Status Points */}
        <div className="flex justify-between">
          {statuses.map((status, index) => (
            <div key={status.id} className="flex flex-col items-center" style={{ flex: 1 }}>
              {/* Icon Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  status.completed
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg scale-110"
                    : "bg-gray-200"
                } ${currentStatus === status.id ? "ring-4 ring-green-200 animate-pulse" : ""}`}
              >
                {status.completed ? (
                  <FaCheckCircle className="text-white text-xl" />
                ) : (
                  <status.icon className="text-gray-400 text-xl" />
                )}
              </div>

              {/* Status Text */}
              <div className="mt-4 text-center max-w-[120px]">
                <h3
                  className={`text-sm font-bold mb-1 ${
                    status.completed ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {status.title}
                </h3>
                <p
                  className={`text-xs ${
                    status.completed ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {status.description}
                </p>
                {status.completed && (
                  <div className="mt-2">
                    <p className="text-xs text-green-600 font-semibold">{status.date}</p>
                    <p className="text-xs text-gray-500">{status.time}</p>
                  </div>
                )}
              </div>

              {/* Animated Pulse for Current Status */}
              {currentStatus === status.id && (
                <div className="absolute -top-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Status Details */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 p-3 rounded-full">
            {React.createElement(statuses.find(s => s.id === currentStatus)?.icon || FaBox, {
              className: "text-white text-2xl"
            })}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              {statuses.find(s => s.id === currentStatus)?.title}
            </h3>
            <p className="text-blue-700 mb-3">
              {statuses.find(s => s.id === currentStatus)?.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <span className="font-semibold">Last Updated:</span>
              <span>{statuses.find(s => s.id === currentStatus)?.date} at {statuses.find(s => s.id === currentStatus)?.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Estimated Delivery */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <FaTruck className="text-orange-500" />
            Estimated Delivery
          </h4>
          <p className="text-2xl font-bold text-gray-900">Dec 6, 2024</p>
          <p className="text-sm text-gray-600">By 8:00 PM</p>
        </div>

        {/* Delivery Address */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <FaHome className="text-orange-500" />
            Delivery Address
          </h4>
          <p className="text-sm text-gray-700">
            123 Main Street,<br />
            Apartment 4B,<br />
            New York, NY 10001
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-orange-500 hover:text-orange-600 transition-all">
          View Details
        </button>
        <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-xl hover:scale-[1.02] transition-all">
          Contact Support
        </button>
      </div>

      {/* Help Text */}
      <p className="text-center text-xs text-gray-500 mt-4">
        Need help? Call us at <a href="tel:1800123456" className="text-orange-600 font-semibold">1-800-123-456</a>
      </p>
    </div>
  );
};

export default OrderTracker;
