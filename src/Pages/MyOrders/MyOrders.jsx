import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaShoppingBag, FaArrowLeft, FaHome, FaTruck, FaCheckCircle, 
  FaTimesCircle, FaClock, FaBox, FaMapMarkerAlt, FaPhoneAlt 
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import OrderDetailsModal from "../../Components/OrderDetailsModal/OrderDetailsModal";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    {
      id: "ORD12345",
      date: "Dec 3, 2024",
      status: "delivered",
      total: 89.97,
      items: [
        { name: "Organic Apples", quantity: 2, price: 9.98, image: "🍎" },
        { name: "Fresh Strawberries", quantity: 1, price: 5.99, image: "🍓" }
      ],
      deliveryAddress: "123 Main St, New York, NY 10001",
      estimatedDelivery: "Dec 5, 2024",
      trackingSteps: [
        { label: "Order Placed", status: "completed", date: "Dec 3, 10:00 AM" },
        { label: "Processing", status: "completed", date: "Dec 3, 11:30 AM" },
        { label: "Shipped", status: "completed", date: "Dec 3, 2:00 PM" },
        { label: "Out for Delivery", status: "completed", date: "Dec 4, 9:00 AM" },
        { label: "Delivered", status: "completed", date: "Dec 4, 3:45 PM" }
      ]
    },
    {
      id: "ORD12346",
      date: "Dec 4, 2024",
      status: "shipping",
      total: 45.99,
      items: [
        { name: "Avocados", quantity: 3, price: 23.97, image: "🥑" },
        { name: "Blueberries", quantity: 1, price: 6.99, image: "🫐" }
      ],
      deliveryAddress: "123 Main St, New York, NY 10001",
      estimatedDelivery: "Dec 6, 2024",
      trackingSteps: [
        { label: "Order Placed", status: "completed", date: "Dec 4, 2:00 PM" },
        { label: "Processing", status: "completed", date: "Dec 4, 3:30 PM" },
        { label: "Shipped", status: "current", date: "Dec 5, 10:00 AM" },
        { label: "Out for Delivery", status: "pending", date: "" },
        { label: "Delivered", status: "pending", date: "" }
      ]
    },
    {
      id: "ORD12347",
      date: "Dec 5, 2024",
      status: "processing",
      total: 32.50,
      items: [
        { name: "Bananas", quantity: 2, price: 4.98, image: "🍌" },
        { name: "Oranges", quantity: 3, price: 11.97, image: "🍊" }
      ],
      deliveryAddress: "123 Main St, New York, NY 10001",
      estimatedDelivery: "Dec 7, 2024",
      trackingSteps: [
        { label: "Order Placed", status: "completed", date: "Dec 5, 11:00 AM" },
        { label: "Processing", status: "current", date: "Dec 5, 11:30 AM" },
        { label: "Shipped", status: "pending", date: "" },
        { label: "Out for Delivery", status: "pending", date: "" },
        { label: "Delivered", status: "pending", date: "" }
      ]
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'delivered':
        return { color: 'from-green-500 to-emerald-600', icon: FaCheckCircle, text: 'Delivered' };
      case 'shipping':
        return { color: 'from-blue-500 to-cyan-600', icon: FaTruck, text: 'Shipping' };
      case 'processing':
        return { color: 'from-orange-500 to-red-600', icon: FaClock, text: 'Processing' };
      case 'cancelled':
        return { color: 'from-red-500 to-pink-600', icon: FaTimesCircle, text: 'Cancelled' };
      default:
        return { color: 'from-gray-500 to-gray-600', icon: FaBox, text: 'Unknown' };
    }
  };

  const handleCancelOrder = (orderId) => {
    setSelectedOrder(orderId);
    setShowCancelModal(true);
  };

  const [isCancelling, setIsCancelling] = useState(false);

  const confirmCancelOrder = () => {
    setIsCancelling(true);
    
    // Simulate API call
    setTimeout(() => {
      setOrders(orders.map(order => {
        if (order.id === selectedOrder) {
          // Add 'Cancelled' step to tracking
          const updatedTracking = [
            ...order.trackingSteps.map(step => ({ ...step, status: 'completed' })), // Mark previous as completed (history)
            { 
              label: "Cancelled", 
              status: "cancelled", 
              date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }) 
            }
          ];

          return { 
            ...order, 
            status: 'cancelled',
            trackingSteps: updatedTracking
          };
        }
        return order;
      }));
      
      setIsCancelling(false);
      setShowCancelModal(false);
      setCancelReason("");
      
      // Show success message (could be a toast in a real app)
      // For now, we rely on the UI update which is immediate after the timeout
    }, 1500);
  };

  const canCancelOrder = (status) => {
    return status === 'processing' || status === 'shipping';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all"
              >
                <FaArrowLeft />
              </button>
              <div>
                <h1 className="text-3xl font-bold">My Orders</h1>
                <p className="text-sm opacity-90">Track and manage your orders</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <FaHome />
              <span className="hidden md:inline">Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Orders", value: orders.length, color: "text-blue-600" },
              { label: "Delivered", value: orders.filter(o => o.status === 'delivered').length, color: "text-green-600" },
              { label: "In Progress", value: orders.filter(o => o.status === 'shipping' || o.status === 'processing').length, color: "text-orange-600" },
              { label: "Cancelled", value: orders.filter(o => o.status === 'cancelled').length, color: "text-red-600" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaShoppingBag className="text-gray-300 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                  {/* Order Header */}
                  <div className={`bg-gradient-to-r ${statusConfig.color} text-white p-6`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <statusConfig.icon className="text-3xl" />
                        <div>
                          <h3 className="text-xl font-bold">Order #{order.id}</h3>
                          <p className="text-sm opacity-90">Placed on {order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-90">Total Amount</p>
                        <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-6">
                    {/* Items */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="text-4xl">{item.image}</div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tracking */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Order Tracking</h4>
                      <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200">
                          <div 
                            className={`h-full bg-gradient-to-r ${statusConfig.color} transition-all duration-1000`}
                            style={{ 
                              width: `${(order.trackingSteps.filter(s => s.status === 'completed').length / order.trackingSteps.length) * 100}%` 
                            }}
                          />
                        </div>

                        {/* Steps */}
                        <div className="relative flex justify-between">
                          {order.trackingSteps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center" style={{ flex: 1 }}>
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                                step.status === 'completed' 
                                  ? `bg-gradient-to-r ${statusConfig.color} text-white shadow-lg scale-110` 
                                  : step.status === 'cancelled'
                                  ? 'bg-red-500 text-white shadow-lg scale-110'
                                  : step.status === 'current'
                                  ? 'bg-white border-4 border-orange-500 animate-pulse'
                                  : 'bg-gray-200 text-gray-400'
                              }`}>
                                {step.status === 'completed' ? '✓' : step.status === 'cancelled' ? <FaTimesCircle /> : idx + 1}
                              </div>
                              <p className={`text-xs font-semibold mt-2 text-center ${
                                step.status === 'completed' || step.status === 'current' 
                                  ? 'text-gray-900' 
                                  : 'text-gray-400'
                              }`}>
                                {step.label}
                              </p>
                              {step.date && (
                                <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900">Delivery Address</p>
                          <p className="text-sm text-gray-700">{order.deliveryAddress}</p>
                          <p className="text-xs text-blue-600 mt-2">
                            Estimated Delivery: {order.estimatedDelivery}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-blue-600 transition-all"
                      >
                        View Details
                      </button>
                      {canCancelOrder(order.status) && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                        >
                          <MdCancel />
                          Cancel Order
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <button className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedOrderDetails && (
        <OrderDetailsModal 
          order={selectedOrderDetails} 
          onClose={() => setSelectedOrderDetails(null)} 
        />
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slideUp">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cancel Order?</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel order #{selectedOrder}?
            </p>
            
            <textarea
              placeholder="Reason for cancellation (optional)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none mb-4"
              rows={4}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Keep Order
              </button>
              <button
                onClick={confirmCancelOrder}
                disabled={isCancelling}
                className={`flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2 ${
                  isCancelling ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isCancelling ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Cancelling...
                  </>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
