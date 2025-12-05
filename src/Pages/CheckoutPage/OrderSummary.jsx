import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTag, FaTruck, FaDollarSign, FaClock, FaCheckCircle } from "react-icons/fa";

const OrderSummary = ({ cartItems = [], onCheckout }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(5.99);
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [savings, setSavings] = useState(0);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  // Real-time price calculation
  useEffect(() => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const calculatedSubtotal = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      
      setSubtotal(calculatedSubtotal);
      
      // Free shipping over $50
      const shippingCost = calculatedSubtotal > 50 ? 0 : 5.99;
      setShipping(shippingCost);
      
      // Calculate discount
      let discountAmount = 0;
      if (promoApplied) {
        discountAmount = calculatedSubtotal * 0.1; // 10% discount
      }
      setDiscount(discountAmount);
      
      // Calculate total
      const calculatedTotal = calculatedSubtotal + shippingCost - discountAmount;
      setTotal(calculatedTotal);
      
      // Calculate savings
      const totalSavings = discountAmount + (calculatedSubtotal > 50 ? 5.99 : 0);
      setSavings(totalSavings);
      
      setIsCalculating(false);
    }, 300);
  }, [cartItems, promoApplied]);

  // Estimated delivery date
  useEffect(() => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    }));
  }, []);

  const handleApplyPromo = () => {
    const validCodes = ['SAVE10', 'WELCOME', 'FIRST ORDER'];
    if (validCodes.includes(promoCode.toUpperCase())) {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code!');
    }
  };

  const removePromo = () => {
    setPromoApplied(false);
    setPromoCode("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
          <FaShoppingCart className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
          <p className="text-sm text-gray-600">{cartItems.length} items in cart</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-lg flex items-center justify-center text-2xl">
              {item.emoji || '📦'}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <FaTag className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo Code"
              disabled={promoApplied}
              className={`w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none ${
                promoApplied 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 focus:border-orange-500'
              }`}
            />
          </div>
          {!promoApplied ? (
            <button
              onClick={handleApplyPromo}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Apply
            </button>
          ) : (
            <button
              onClick={removePromo}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
            >
              Remove
            </button>
          )}
        </div>
        {promoApplied && (
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <FaCheckCircle />
            Promo code applied successfully!
          </p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Try: SAVE10, WELCOME, FIRST ORDER
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pb-4 border-b-2 border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className={`font-semibold transition-all ${isCalculating ? 'opacity-50' : ''}`}>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span className="flex items-center gap-1">
              <FaTag />
              Discount (10%):
            </span>
            <span className="font-semibold">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-gray-600">
            <FaTruck />
            Shipping:
          </span>
          <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {subtotal >= 50 && shipping === 0 && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <FaCheckCircle />
            You've unlocked FREE shipping!
          </p>
        )}

        {subtotal < 50 && (
          <p className="text-xs text-orange-600">
            Add ${(50 - subtotal).toFixed(2)} more for FREE shipping
          </p>
        )}
      </div>

      {/* Total */}
      <div className="py-4 border-b-2 border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-gray-900">Total:</span>
          <span className={`text-3xl font-bold text-gray-900 transition-all ${
            isCalculating ? 'opacity-50 scale-95' : 'scale-100'
          }`}>
            ${total.toFixed(2)}
          </span>
        </div>
        
        {savings > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-700 font-semibold flex items-center gap-2">
              <FaCheckCircle />
              You're saving ${savings.toFixed(2)} on this order!
            </p>
          </div>
        )}
      </div>

      {/* Delivery Estimate */}
      <div className="py-4 border-b-2 border-gray-200">
        <div className="flex items-center gap-2 text-gray-600">
          <FaClock className="text-blue-500" />
          <div>
            <p className="text-sm font-semibold">Estimated Delivery</p>
            <p className="text-lg font-bold text-gray-900">{estimatedDelivery}</p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => onCheckout && onCheckout({ total, subtotal, discount, shipping })}
        disabled={cartItems.length === 0}
        className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all ${
          cartItems.length > 0
            ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-[1.02]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Proceed to Checkout
      </button>

      {/* Trust Indicators */}
      <div className="mt-6 space-y-2">
        {[
          { icon: FaCheckCircle, text: "Secure checkout", color: "text-green-600" },
          { icon: FaTruck, text: "Free delivery over $50", color: "text-blue-600" },
          { icon: FaDollarSign, text: "Best price guarantee", color: "text-orange-600" }
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-2 ${item.color} text-sm`}>
            <item.icon />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
