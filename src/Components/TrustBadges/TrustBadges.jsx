import React from "react";
import { FaShieldAlt, FaTruck, FaUndo, FaCreditCard, FaLock, FaCheckCircle } from "react-icons/fa";
import { MdVerified, MdSecurity } from "react-icons/md";

const TrustBadges = () => {
  const badges = [
    {
      icon: FaShieldAlt,
      title: "100% Secure",
      description: "SSL Encrypted",
      color: "from-blue-500 to-cyan-600",
      iconColor: "text-blue-600"
    },
    {
      icon: FaTruck,
      title: "Free Shipping",
      description: "On orders $50+",
      color: "from-green-500 to-emerald-600",
      iconColor: "text-green-600"
    },
    {
      icon: FaUndo,
      title: "Easy Returns",
      description: "30-day guarantee",
      color: "from-orange-500 to-red-600",
      iconColor: "text-orange-600"
    },
    {
      icon: FaCreditCard,
      title: "Safe Payment",
      description: "Multiple options",
      color: "from-purple-500 to-pink-600",
      iconColor: "text-purple-600"
    }
  ];

  const certifications = [
    {
      icon: MdVerified,
      label: "Verified Seller",
      color: "text-green-600"
    },
    {
      icon: FaLock,
      label: "256-bit SSL",
      color: "text-blue-600"
    },
    {
      icon: MdSecurity,
      label: "PCI Compliant",
      color: "text-purple-600"
    },
    {
      icon: FaCheckCircle,
      label: "Quality Assured",
      color: "text-orange-600"
    }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "MasterCard", icon: "💳" },
    { name: "PayPal", icon: "💰" },
    { name: "Google Pay", icon: "📱" },
    { name: "Apple Pay", icon: "🍎" },
    { name: "Bitcoin", icon: "₿" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop with Confidence</h2>
        <p className="text-gray-600">Your security and satisfaction are our top priorities</p>
      </div>

      {/* Main Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            style={{
              animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
            }}
          >
            <div className={`bg-gradient-to-r ${badge.color} p-3 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform`}>
              <badge.icon className="text-white text-2xl" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{badge.title}</h3>
            <p className="text-sm text-gray-600">{badge.description}</p>
          </div>
        ))}
      </div>

      {/* Certifications Bar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <cert.icon className={`${cert.color} text-xl`} />
              <span className="text-sm font-semibold text-gray-700">{cert.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-center text-sm font-semibold text-gray-700 mb-4">
          We Accept
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl group-hover:scale-110 transition-transform">{method.icon}</span>
                <span className="text-xs font-semibold text-gray-700">{method.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Score */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-green-600 p-4 rounded-full">
              <FaCheckCircle className="text-white text-3xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-900">98.5% Trust Score</h3>
              <p className="text-sm text-green-700">Based on 50,000+ verified reviews</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-500 text-2xl">★</span>
            ))}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 border-t border-green-200 pt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-900">1M+</p>
            <p className="text-xs text-green-700">Happy Customers</p>
          </div>
          <div className="text-center border-x border-green-200">
            <p className="text-2xl font-bold text-green-900">24/7</p>
            <p className="text-xs text-green-700">Support</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-900">99.8%</p>
            <p className="text-xs text-green-700">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
          <FaLock className="text-green-600" />
          Your information is protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
};

export default TrustBadges;
