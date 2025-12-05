import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaTrash, FaMinus, FaPlus, FaShoppingCart, FaTag, FaTruck } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

const CartDrawer = ({ isOpen, onClose, cartItems = [] }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState(cartItems.length > 0 ? cartItems : [
    {
      id: 1,
      title: "Fresh Organic Apple",
      price: 4.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&h=200&fit=crop",
      weight: "1kg"
    },
    {
      id: 2,
      title: "Premium Bananas",
      price: 2.49,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200&h=200&fit=crop",
      weight: "500g"
    }
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, Math.min(10, newQty)) };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setAppliedPromo({ code: "SAVE10", discount: 10 });
    } else {
      alert("Invalid promo code");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0;
  const deliveryFee = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + deliveryFee;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-[9999] transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="text-2xl" />
            <div>
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <p className="text-sm opacity-90">{items.length} items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-all hover:rotate-90"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Free Delivery Progress */}
        {deliveryFee > 0 && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-blue-900 font-medium">
                <FaTruck className="inline mr-1" />
                Add ${(50 - subtotal).toFixed(2)} for FREE delivery
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <FaShoppingCart className="text-gray-300 text-6xl mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all group"
              >
                {/* Image */}
                <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.weight}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <FaMinus className="text-xs text-gray-600" />
                      </button>
                      <span className="font-semibold min-w-[1.5rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <FaPlus className="text-xs text-gray-600" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-gray-500">${item.price} each</p>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors self-start"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Promo Code */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <MdLocalOffer className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 text-xl" />
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                />
              </div>
              <button
                onClick={applyPromo}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all"
              >
                Apply
              </button>
            </div>
            {appliedPromo && (
              <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                <FaTag />
                <span>Promo code "{appliedPromo.code}" applied! {appliedPromo.discount}% off</span>
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Proceed to Checkout
            </button>

            <p className="text-center text-xs text-gray-500 mt-3">
              Secure checkout • 30-day return policy
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
