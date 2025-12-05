import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowLeft, FaHome } from "react-icons/fa";
import AddressForm from "./AddressForm";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [addressData, setAddressData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  
  // Demo cart items (replace with actual cart data)
  const [cartItems] = useState([
    { id: 1, name: "Organic Apples", price: 4.99, quantity: 2, emoji: "🍎" },
    { id: 2, name: "Fresh Strawberries", price: 5.99, quantity: 1, emoji: "🍓" },
    { id: 3, name: "Avocados", price: 7.99, quantity: 3, emoji: "🥑" }
  ]);

  const [totalAmount, setTotalAmount] = useState(0);

  // Saved addresses (demo data)
  const savedAddresses = [
    {
      fullName: "John Doe",
      phone: "1234567890",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      addressType: "home"
    }
  ];

  const steps = [
    { id: 1, title: "Delivery Address", icon: "📍" },
    { id: 2, title: "Payment", icon: "💳" },
    { id: 3, title: "Confirmation", icon: "✅" }
  ];

  const handleAddressComplete = (address) => {
    setAddressData(address);
    setCurrentStep(2);
  };

  const handlePaymentComplete = (payment) => {
    setPaymentData(payment);
    setOrderConfirmed(true);
    setCurrentStep(3);
    
    // Trigger Confetti
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var random = function(min, max) {
      return Math.random() * (max - min) + min;
    };

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleCheckout = ({ total }) => {
    setTotalAmount(total);
    // Already on step 1 by default
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all"
              >
                <FaArrowLeft />
              </button>
              <div>
                <h1 className="text-3xl font-bold">Secure Checkout</h1>
                <p className="text-sm opacity-90">Complete your purchase in 3 easy steps</p>
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

      {/* Progress Steps */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-110"
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {currentStep > step.id ? "✓" : step.icon}
                  </div>
                  <div className="hidden md:block">
                    <p className={`font-semibold ${
                      currentStep >= step.id ? "text-orange-600" : "text-gray-500"
                    }`}>
                      Step {step.id}
                    </p>
                    <p className="text-sm text-gray-600">{step.title}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded transition-all ${
                    currentStep > step.id ? "bg-orange-500" : "bg-gray-200"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!orderConfirmed ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <AddressForm
                  onAddressComplete={handleAddressComplete}
                  savedAddresses={savedAddresses}
                />
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <>
                  {/* Address Confirmation */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaCheckCircle className="text-green-600 text-2xl" />
                      <h3 className="font-bold text-gray-900">Delivery Address Confirmed</h3>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold">{addressData?.fullName}</p>
                      <p>{addressData?.address}</p>
                      <p>{addressData?.city}, {addressData?.state} - {addressData?.zipCode}</p>
                      <p>Phone: {addressData?.phone}</p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="mt-4 text-orange-600 font-semibold hover:underline"
                    >
                      Change Address
                    </button>
                  </div>

                  {/* Payment Form */}
                  <PaymentMethod
                    onPaymentComplete={handlePaymentComplete}
                    totalAmount={totalAmount}
                  />
                </>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        ) : (
          /* Order Confirmation */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <FaCheckCircle className="text-white text-5xl" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for your purchase. Your order has been successfully placed.
              </p>

              {/* Order Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Transaction ID</p>
                    <p className="font-bold text-gray-900">{paymentData?.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount Paid</p>
                    <p className="font-bold text-gray-900">${paymentData?.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-bold text-gray-900 capitalize">{paymentData?.method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-bold text-green-600 capitalize">{paymentData?.status}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/orders')}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Track Order
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
