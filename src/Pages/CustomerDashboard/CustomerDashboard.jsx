import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaShoppingBag, FaHeart, FaMapMarkerAlt, FaCog, FaArrowLeft, FaHome,
  FaUser, FaBox, FaTruck, FaStar, FaGift, FaSignOutAlt
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardCards = [
    {
      title: "My Orders",
      icon: FaShoppingBag,
      color: "from-blue-500 to-cyan-600",
      description: "Track your orders",
      count: "12",
      link: "/myorders"
    },
    {
      title: "My Profile",
      icon: FaUser,
      color: "from-purple-500 to-pink-600",
      description: "Manage your account",  
      count: "",
      link: "/myprofile"
    },
    {
      title: "My Wishlist",
      icon: FaHeart,
      color: "from-pink-500 to-red-600",
      description: "Saved items",
      count: "8",
      link: "/wishlist"
    },
    {
      title: "My Addresses",
      icon: FaMapMarkerAlt,
      color: "from-green-500 to-emerald-600",
      description: "Manage addresses",
      count: "3",
      link: "/addresses"
    },
    {
      title: "My Reviews",
      icon: FaStar,
      color: "from-yellow-500 to-orange-600",
      description: "Your reviews",
      count: "5",
      link: "/reviews"
    },
    {
      title: "My Rewards",
      icon: FaGift,
      color: "from-indigo-500 to-purple-600",
      description: "Loyalty points",
      count: "450",
      link: "/rewards"
    }
  ];

  const recentOrders = [
    { id: "ORD12345", status: "Delivered", amount: 89.97, date: "Dec 3, 2024" },
    { id: "ORD12346", status: "Shipping", amount: 45.99, date: "Dec 4, 2024" },
    { id: "ORD12347", status: "Processing", amount: 32.50, date: "Dec 5, 2024" }
  ];

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
                <h1 className="text-3xl font-bold">My Dashboard</h1>
                <p className="text-sm opacity-90">Welcome back, {user?.name || 'Customer'}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
              >
                <FaHome />
                <span className="hidden md:inline">Home</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
              >
                <FaSignOutAlt />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Hello, {user?.name || 'Customer'}! 👋</h2>
            <p className="text-lg opacity-90">Manage your account and track your orders from here</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-r ${card.color} p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                  <card.icon className="text-white text-3xl" />
                </div>
                {card.count && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">
                    {card.count}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
              <div className="mt-4 flex items-center text-orange-600 font-semibold">
                <span>View Details</span>
                <span className="ml-2 group-hover:ml-4 transition-all">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Recent Orders</h3>
            <Link
              to="/myorders"
              className="text-orange-600 font-semibold hover:underline"
            >
              View All Orders →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <FaBox className="text-orange-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${order.amount.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipping' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <Link
                    to={`/order/${order.id}`}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
                  >
                    Track
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/shop')}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl hover:shadow-xl transition-all text-center"
          >
            <FaShoppingBag className="text-3xl mx-auto mb-2" />
            <p className="font-semibold">Continue Shopping</p>
          </button>
          <button
            onClick={() => navigate('/wishlist')}
            className="bg-gradient-to-r from-pink-500 to-red-600 text-white p-6 rounded-xl hover:shadow-xl transition-all text-center"
          >
            <FaHeart className="text-3xl mx-auto mb-2" />
            <p className="font-semibold">My Wishlist</p>
          </button>
          <button
            onClick={() => navigate('/myprofile')}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl hover:shadow-xl transition-all text-center"
          >
            <FaUser className="text-3xl mx-auto mb-2" />
            <p className="font-semibold">My Profile</p>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-6 rounded-xl hover:shadow-xl transition-all text-center"
          >
            <FaCog className="text-3xl mx-auto mb-2" />
            <p className="font-semibold">Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
