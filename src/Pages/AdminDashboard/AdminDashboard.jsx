import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaCrown, FaUsers, FaStore, FaShoppingCart, FaDollarSign, FaChartLine, 
  FaBox, FaBell, FaCog, FaSignOutAlt, FaBolt, FaHome 
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Real-time stats
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalDealers: 89,
    totalCustomers: 1158,
    totalOrders: 3456,
    totalRevenue: 245678,
    totalProducts: 567,
    activeOrders: 234,
    pendingApprovals: 12
  });

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 3),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 500),
        activeOrders: Math.max(200, prev.activeOrders + Math.floor(Math.random() * 10) - 5),
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 2)
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
      title: "Total Users",
      value: stats.totalUsers,
      icon: FaUsers,
      color: "from-blue-500 to-cyan-600",
      change: "+12%"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FaShoppingCart,
      color: "from-green-500 to-emerald-600",
      change: "+8%"
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: FaDollarSign,
      color: "from-purple-500 to-pink-600",
      change: "+15%"
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: FaBox,
      color: "from-orange-500 to-red-600",
      change: "+5%"
    }
  ];

  const quickActions = [
    { title: "Manage Users", icon: FaUsers, link: "/admin/users", color: "blue" },
    { title: "Manage Dealers", icon: FaStore, link: "/admin/dealers", color: "green" },
    { title: "View Orders", icon: FaShoppingCart, link: "/admin/orders", color: "purple" },
    { title: "Products", icon: FaBox, link: "/admin/products", color: "orange" },
    { title: "Analytics", icon: FaChartLine, link: "/admin/analytics", color: "pink" },
    { title: "Settings", icon: FaCog, link: "/admin/settings", color: "gray" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <FaCrown className="text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-sm opacity-90">Welcome back, {user?.name}!</p>
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
                <span className="hidden md:inline">Real-Time</span>
              </Link>

              <button className="relative bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all">
                <FaBell />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {stats.pendingApprovals}
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
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`bg-gradient-to-br from-${action.color}-50 to-${action.color}-100 border-2 border-${action.color}-200 hover:border-${action.color}-400 rounded-xl p-6 text-center transition-all hover:shadow-lg hover:scale-105`}
              >
                <action.icon className={`text-${action.color}-600 text-3xl mx-auto mb-3`} />
                <p className="text-sm font-semibold text-gray-800">{action.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity & Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaShoppingCart className="text-orange-500" />
              Recent Orders
              <span className="ml-auto text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {stats.activeOrders} Active
              </span>
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Order #{1000 + i}</p>
                      <p className="text-xs text-gray-600">Customer-{i + 1} • 2 mins ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${(Math.random() * 100 + 50).toFixed(2)}</p>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaChartLine className="text-purple-500" />
              System Status
            </h3>
            <div className="space-y-4">
              {[
                { label: "Server Status", value: "Online", status: "success" },
                { label: "Database", value: "Healthy", status: "success" },
                { label: "Storage", value: "78% Used", status: "warning" },
                { label: "API Response", value: "45ms", status: "success" },
                { label: "Active Sessions", value: stats.totalUsers, status: "info" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-semibold">{item.label}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.status === 'success' ? 'bg-green-100 text-green-700' :
                    item.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
