import React from "react";
import { FaTimes, FaBox, FaTruck, FaCheckCircle, FaMapMarkerAlt, FaCreditCard, FaDownload } from "react-icons/fa";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              Order #{order.id}
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium backdrop-blur-md">
                {order.date}
              </span>
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Status: <span className="font-bold uppercase">{order.status}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          
          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaTruck className="text-blue-600" /> Order Tracking
            </h3>
            <div className="relative flex justify-between">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
              {order.trackingSteps.map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all ${
                    step.status === 'completed' 
                      ? 'bg-blue-600 border-blue-100 text-white' 
                      : step.status === 'current'
                      ? 'bg-white border-blue-500 animate-pulse'
                      : 'bg-gray-100 border-gray-50 text-gray-300'
                  }`}>
                    {step.status === 'completed' ? '✓' : idx + 1}
                  </div>
                  <p className="text-[10px] font-bold mt-2 text-gray-600 hidden sm:block">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Items List */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaBox className="text-orange-500" /> Items
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                      <div className="text-4xl bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                      </div>
                      <p className="font-bold text-gray-900">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" /> Delivery
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{order.deliveryAddress}</p>
                <div className="mt-3 text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
                  Est. Delivery: {order.estimatedDelivery}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaCreditCard className="text-purple-500" /> Payment
                </h3>
                <p className="text-sm text-gray-600">Paid via Credit Card</p>
                <p className="text-xs text-gray-400">Transaction ID: #TXN88392</p>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                <FaDownload /> Download Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-gray-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
          >
            Close
          </button>
          <button className="px-6 py-2 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200">
            Track Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsModal;
