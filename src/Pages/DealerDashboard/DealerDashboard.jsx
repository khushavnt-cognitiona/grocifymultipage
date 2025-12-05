import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaStore, FaBox, FaShoppingCart, FaDollarSign, FaTruck, 
  FaChartBar, FaBell, FaSignOutAlt, FaBolt, FaHome, FaPlus 
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const DealerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Real-time stats
  const [stats, setStats] = useState({
    totalProducts: 145,
    totalOrders: 567,
    revenue: 45678,
    pendingOrders: 23,
    deliveredToday: 12,
    lowStock: 8
  });

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 2),
        revenue: prev.revenue + Math.floor(Math.random() * 200),
        pendingOrders: Math.max(10, prev.pendingOrders + Math.floor(Math.random() * 3) - 1),
        deliveredToday: prev.deliveredToday + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const statCards = [
    {
      title: "My Products",
      value: stats.totalProducts,
      icon: FaBox,
      color: "from-blue-500 to-cyan-600",
      change: "+5"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FaShoppingCart,
      color: "from-green-500 to-emerald-600",
      change: "+12"
    },
    {
      title: "Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      icon: FaDollarSign,
      color: "from-purple-500 to-pink-600",
      change: "+18%"
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: FaTruck,
      color: "from-orange-500 to-red-600",
      change: "-3"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <FaStore className="text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Dealer Dashboard</h1>
                <p className="text-sm opacity-90">Welcome, {user?.name}!</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
              >
                <FaHome />
                <span className="hidden md:inline">Home</span>
              </Link>
              
              <Link
                to="/realtime"
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all flex items-center gap-2 animate-pulse"
              >
                <FaBolt />
                <span className="hidden md:inline">Live Stats</span>
              </Link>

              <button className="relative bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all">
                <FaBell />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {stats.lowStock}
                </span>
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
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Add Product Button */}
        <div className="mb-6">
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
            <FaPlus />
            Add New Product
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  stat.change.includes('+') ? 'bg-green-100 text-green-700' : 
                  stat.change.includes('-') ? 'bg-red-100 text-red-700' : 
                  'bg-blue-100 text-blue-700'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Orders */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaShoppingCart className="text-orange-500" />
              Pending Orders
              <span className="ml-auto text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                {stats.pendingOrders} New
              </span>
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border-l-4 border-orange-500">
                  <div>
                    <p className="font-semibold text-gray-900">Order #{5000 + i}</p>
                    <p className="text-sm text-gray-600">Customer • {i + 1} items</p>
                    <p className="text-xs text-gray-500 mt-1">{Math.floor(Math.random() * 60)} mins ago</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">${(Math.random() * 200 + 50).toFixed(2)}</p>
                    <button className="mt-2 bg-green-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-600 transition-all">
                      Process
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Alerts */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaBox className="text-red-500" />
              Low Stock Alerts
              <span className="ml-auto text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full">
                {stats.lowStock} Items
              </span>
            </h3>
            <div className="space-y-3">
              {["Organic Apples", "Fresh Strawberries", "Avocados", "Blueberries", "Tomatoes"].map((product, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {Math.floor(Math.random() * 10)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product}</p>
                      <p className="text-sm text-red-600">Only {Math.floor(Math.random() * 5) + 1} left</p>
                    </div>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-all">
                    Restock
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaChartBar className="text-purple-500" />
            Sales Performance (Last 7 Days)
          </h3>
          <div className="grid grid-cols-7 gap-2 h-64">
            {[65, 80, 70, 90, 85, 95, 88].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="flex-1 flex items-end w-full">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-600 rounded-t-lg hover:scale-105 transition-all cursor-pointer"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">Day {i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;
