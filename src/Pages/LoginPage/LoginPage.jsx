import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook, FaGithub, FaBolt, FaCrown, FaStore, FaShoppingBag } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('customer');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: 'admin',
      name: 'Admin',
      icon: FaCrown,
      color: 'from-purple-500 to-pink-600',
      description: 'Full system access',
      redirectTo: '/admin/dashboard'
    },
    {
      id: 'dealer',
      name: 'Dealer',
      icon: FaStore,
      color: 'from-blue-500 to-cyan-600',
      description: 'Manage inventory & orders',
      redirectTo: '/dealer/dashboard'
    },
    {
      id: 'customer',
      name: 'Customer',
      icon: FaShoppingBag,
      color: 'from-orange-500 to-red-600',
      description: 'Shop & track orders',
      redirectTo: '/dashboard'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Login with selected role
      const userData = login(formData.email, formData.password, selectedRole);
      setIsLoading(false);

      // Redirect based on role
      const roleConfig = roles.find(r => r.id === selectedRole);
      const from = location.state?.from?.pathname || roleConfig.redirectTo;
      navigate(from);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      login(`${provider.toLowerCase()}@demo.com`, 'social', selectedRole);
      setIsLoading(false);
      const roleConfig = roles.find(r => r.id === selectedRole);
      navigate(roleConfig.redirectTo);
    }, 1500);
  };

  // Demo credentials
  const demoCredentials = {
    admin: { email: 'admin@grocify.com', password: 'admin123' },
    dealer: { email: 'dealer@grocify.com', password: 'dealer123' },
    customer: { email: 'customer@grocify.com', password: 'customer123' }
  };

  const fillDemoCredentials = (role) => {
    setFormData(demoCredentials[role]);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">🛒 Grocify</h1>
            <p className="text-sm opacity-90">
              {isLogin ? "Welcome back! Sign in to your account" : "Create your account"}
            </p>
          </div>
        </div>

        {/* Toggle Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 font-semibold transition-all ${
              isLogin
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 font-semibold transition-all ${
              !isLogin
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-8">
          {/* Role Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Select Your Role
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`relative overflow-hidden rounded-xl p-4 border-2 transition-all ${
                    selectedRole === role.id
                      ? `border-orange-500 bg-gradient-to-br ${role.color} text-white shadow-lg scale-105`
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <role.icon className={`text-3xl mb-2 mx-auto ${
                    selectedRole === role.id ? "text-white" : "text-gray-600"
                  }`} />
                  <p className={`font-bold text-sm ${
                    selectedRole === role.id ? "text-white" : "text-gray-900"
                  }`}>
                    {role.name}
                  </p>
                  <p className={`text-xs mt-1 ${
                    selectedRole === role.id ? "text-white/90" : "text-gray-500"
                  }`}>
                    {role.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Credentials Banner */}
          <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              🎯 Quick Demo Access:
            </p>
            <div className="flex gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => fillDemoCredentials(role.id)}
                  className="flex-1 bg-white border border-blue-300 hover:border-blue-500 rounded-lg px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-all"
                >
                  {role.name} Demo
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Sign Up Only) */}
            {!isLogin && (
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required={!isLogin}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-all"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-all"
              />
            </div>

            {/* Forgot Password (Login Only) */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-orange-600 hover:text-orange-700 font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${
                roles.find(r => r.id === selectedRole).color
              } text-white py-4 rounded-xl font-bold text-lg transition-all ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-xl hover:scale-[1.02]"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : isLogin ? (
                `Login as ${roles.find(r => r.id === selectedRole).name}`
              ) : (
                `Create ${roles.find(r => r.id === selectedRole).name} Account`
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => socialLogin("Google")}
                className="flex items-center justify-center gap-2 border-2 border-gray-300 rounded-xl py-3 hover:border-orange-500 hover:bg-orange-50 transition-all"
              >
                <FaGoogle className="text-red-500 text-xl" />
              </button>
              <button
                type="button"
                onClick={() => socialLogin("Facebook")}
                className="flex items-center justify-center gap-2 border-2 border-gray-300 rounded-xl py-3 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <FaFacebook className="text-blue-600 text-xl" />
              </button>
              <button
                type="button"
                onClick={() => socialLogin("GitHub")}
                className="flex items-center justify-center gap-2 border-2 border-gray-300 rounded-xl py-3 hover:border-gray-700 hover:bg-gray-50 transition-all"
              >
                <FaGithub className="text-gray-800 text-xl" />
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-200">
          <Link
            to="/"
            className="text-gray-600 hover:text-orange-600 font-semibold text-sm transition-colors"
          >
            ← Back to Home
          </Link>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              to="/realtime"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all animate-pulse"
            >
              <FaBolt />
              View Real-Time Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
