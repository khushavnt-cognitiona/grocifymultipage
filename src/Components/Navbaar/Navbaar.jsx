import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { FaShoppingBag, FaUser, FaBolt, FaBell, FaSignOutAlt, FaTachometerAlt, FaHeart, FaMapMarkerAlt, FaCreditCard, FaCog, FaChevronDown, FaBox, FaUsers } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TbMenu2, TbX } from "react-icons/tb";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../Context/CartContext";

const Navbaar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  
  // Real-time counts
  const [wishlistCount, setWishlistCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(2);
  const [activeUsers, setActiveUsers] = useState(127);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Real-time updates for counts
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time wishlist updates
      setWishlistCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(0, Math.min(10, prev + change));
      });



      // Simulate real-time notification updates
      if (Math.random() > 0.7) {
        setNotificationCount(prev => Math.min(10, prev + 1));
      }

      // Update active users count
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(50, Math.min(500, prev + change));
      });
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  return (
    <header className="bg-gradient-to-r from-white via-orange-50 to-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b-2 border-orange-200">
      <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-[12vh] md:h-[14vh] flex items-center justify-between">

        {/* Logo - Clickable to Home with Real-time Badge */}
        <Link to="/" className="text-3xl font-bold tracking-wide hover:scale-105 transition-transform relative">
          Khu<span className="text-orange-500 uppercase">SH</span>vant
          <span className="absolute -top-2 -right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
            LIVE
          </span>
        </Link>

        {/* Menu - Tablet + Desktop */}
        <ul className="hidden md:flex items-center gap-x-6 lg:gap-x-10">
          <li>
            <Link to="/" className="font-semibold text-orange-500 transition duration-300 hover:scale-110 inline-block">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/shop" className="font-semibold text-zinc-800 hover:text-orange-500 transition duration-300 hover:scale-110 inline-block">
              SHOP
            </Link>
          </li>
          
          {/* Real-Time Link - Admin Only */}
          {isAuthenticated && isAdmin && (
            <li>
              <Link to="/realtime" className="relative group">
                <div className="font-semibold text-zinc-800 hover:text-purple-600 transition duration-300 hover:scale-110 inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border-2 border-transparent hover:border-purple-400">
                  <FaBolt className="text-yellow-500 animate-pulse" />
                  <span>REAL-TIME</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </div>
                {/* Hover tooltip */}
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {activeUsers} users online now
                </div>
              </Link>
            </li>
          )}
          
          <li>
            <a href="#about" className="font-semibold text-zinc-800 hover:text-orange-500 transition duration-300 hover:scale-110 inline-block">
              ABOUT
            </a>
          </li>
          <li>
            <a href="#contact" className="font-semibold text-zinc-800 hover:text-orange-500 transition duration-300 hover:scale-110 inline-block">
              CONTACT
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex p-1 border-2 border-orange-500 rounded-full focus-within:ring-2 focus-within:ring-orange-400 transition-all hover:shadow-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              autoComplete="off"
              className="flex-1 h-[5vh] px-3 focus:outline-none bg-transparent"
            />
            <button 
              type="submit"
              className="bg-gradient-to-b from-red-600 to-orange-800 text-white w-10 h-10 flex justify-center items-center rounded-full text-2xl hover:scale-110 transition-all duration-200 shadow-lg"
            >
              <IoMdSearch />
            </button>
          </form>

          {/* Notifications Icon - NEW! */}
          <button 
            onClick={clearNotifications}
            className="text-zinc-800 text-xl hover:text-blue-500 transition duration-300 hover:scale-110 relative"
            title="Notifications"
          >
            <FaBell className={notificationCount > 0 ? "animate-bounce" : ""} />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Wishlist Icon - Only for Non-Admin Users */}
          {!isAdmin && (
            <button 
              onClick={() => alert(`${wishlistCount} items in wishlist`)}
              className="text-zinc-800 text-xl hover:text-pink-500 transition duration-300 hover:scale-110 relative group"
              title="Wishlist"
            >
              <GoHeartFill className={wishlistCount > 0 ? "text-pink-500" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {wishlistCount}
                </span>
              )}
              {/* Real-time indicator */}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </button>
          )}

          {/* Cart Icon - Only for Authenticated Non-Admin Users */}
          {isAuthenticated && !isAdmin && (
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-zinc-800 text-xl hover:text-orange-500 transition duration-300 hover:scale-110 relative group"
              title="Shopping Cart"
            >
              <FaShoppingBag className={cartCount > 0 ? "text-orange-500" : ""} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
                  {cartCount}
                </span>
              )}
              {/* Real-time indicator */}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </button>
          )}

          {/* Login/User Button */}
          {/* Login/User Dropdown */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full hover:shadow-md transition-all"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${
                  isAdmin ? "bg-gradient-to-r from-purple-500 to-indigo-600" : "bg-gradient-to-r from-orange-500 to-red-600"
                }`}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Hello,</p>
                  <p className="text-sm font-bold text-gray-900 leading-none">{user?.name?.split(' ')[0]}</p>
                </div>
                <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slideUp origin-top-right">
                  {/* Header */}
                  <div className={`p-6 text-white relative overflow-hidden ${
                    isAdmin 
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600" 
                      : "bg-gradient-to-r from-orange-500 to-red-600"
                  }`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-xl shadow-lg ${
                        isAdmin ? "text-purple-600" : "text-orange-600"
                      }`}>
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-lg leading-tight">{user?.name}</p>
                        <p className="text-xs opacity-90">{isAdmin ? 'Administrator' : user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {isAdmin ? (
                      // Admin Menu Items
                      <>
                        <Link 
                          to="/admin/dashboard" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-xl text-gray-700 hover:text-purple-600 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <FaTachometerAlt />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Admin Dashboard</p>
                            <p className="text-xs text-gray-500">Manage System</p>
                          </div>
                        </Link>

                        <Link 
                          to="/admin/products" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 rounded-xl text-gray-700 hover:text-indigo-600 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                            <FaBox />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Products</p>
                            <p className="text-xs text-gray-500">Add & Edit Items</p>
                          </div>
                        </Link>

                        <Link 
                          to="/admin/users" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 rounded-xl text-gray-700 hover:text-blue-600 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <FaUsers />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Users</p>
                            <p className="text-xs text-gray-500">Manage Customers</p>
                          </div>
                        </Link>
                      </>
                    ) : (
                      // User Menu Items
                      <>
                        <Link 
                          to="/dashboard" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 rounded-xl text-gray-700 hover:text-orange-600 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                            <FaTachometerAlt />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Dashboard</p>
                            <p className="text-xs text-gray-500">Overview & Stats</p>
                          </div>
                        </Link>

                        <Link 
                          to="/myorders" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 rounded-xl text-gray-700 hover:text-blue-600 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <FaShoppingBag />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">My Orders</p>
                            <p className="text-xs text-gray-500">Track & Buy Again</p>
                          </div>
                        </Link>

                        <Link 
                          to="/wishlist" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 rounded-xl text-gray-700 hover:text-pink-600 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                            <FaHeart />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Wishlist</p>
                            <p className="text-xs text-gray-500">Saved Items</p>
                          </div>
                        </Link>
                      </>
                    )}

                    <div className="h-px bg-gray-100 my-2"></div>
                    
                    <button
                      onClick={() => {
                        logout();
                        navigate('/login');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl text-red-600 hover:text-red-700 transition-all font-semibold"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login"
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <FaUser className="text-sm relative z-10" />
              <span className="relative z-10">Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-4xl text-zinc-800 hover:text-orange-500 transition-all relative"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <TbX /> : <TbMenu2 />}
          {/* Live indicator on mobile menu */}
          {(wishlistCount > 0 || cartCount > 0 || notificationCount > 0) && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
          )}
        </button>
      </nav>

      {/* Real-time Status Bar - Admin Only */}
      {isAuthenticated && isAdmin && (
        <div className="hidden md:block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white py-1 px-6">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="font-semibold">{activeUsers} shoppers online</span>
              </span>
              <span>🔥 {Math.floor(activeUsers / 5)} sales today</span>
              <span>⚡ Flash deals active</span>
            </div>
            <Link to="/realtime" className="hover:underline font-semibold animate-pulse">
              View Live Dashboard →
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-y-5 py-6">
          <li>
            <Link 
              to="/" 
              className="font-semibold text-orange-500 text-lg"
              onClick={() => setOpen(false)}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link 
              to="/shop" 
              className="font-semibold text-zinc-800 hover:text-orange-500 text-lg"
              onClick={() => setOpen(false)}
            >
              SHOP
            </Link>
          </li>
          
          {/* Real-Time Link - Admin Only (Mobile) */}
          {isAuthenticated && isAdmin && (
            <li>
              <Link 
                to="/realtime" 
                className="font-semibold text-zinc-800 hover:text-purple-600 text-lg flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full"
                onClick={() => setOpen(false)}
              >
                <FaBolt className="text-yellow-500 animate-pulse" />
                REAL-TIME
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">LIVE</span>
              </Link>
            </li>
          )}
          
          <li>
            <a 
              href="#about" 
              className="font-semibold text-zinc-800 hover:text-orange-500 text-lg"
              onClick={() => setOpen(false)}
            >
              ABOUT
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="font-semibold text-zinc-800 hover:text-orange-500 text-lg"
              onClick={() => setOpen(false)}
            >
              CONTACT
            </a>
          </li>
          
          {/* Mobile Stats */}
          <li className="pt-4 border-t border-gray-200 w-full px-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold text-center mb-2">🔴 Live Stats</p>
              <div className="flex justify-around text-xs">
                <div className="text-center">
                  <p className="font-bold text-blue-600">{activeUsers}</p>
                  <p className="text-gray-600">Online</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-orange-600">{cartCount}</p>
                  <p className="text-gray-600">In Cart</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-pink-600">{wishlistCount}</p>
                  <p className="text-gray-600">Wishlist</p>
                </div>
              </div>
            </div>
          </li>

          {/* Mobile Action Buttons */}
          <li className="w-full flex flex-col items-center gap-3">
            <Link 
              to="/login"
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg flex items-center gap-2"
            >
              <FaUser />
              Login
            </Link>
            <div className="flex gap-6">
              <button 
                onClick={() => {
                  clearNotifications();
                  setOpen(false);
                }}
                className="text-zinc-800 text-2xl hover:text-blue-500 relative"
              >
                <FaBell />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                    {notificationCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => {
                  alert(`${wishlistCount} items in wishlist`);
                  setOpen(false);
                }}
                className="text-zinc-800 text-2xl hover:text-pink-500 relative"
              >
                <GoHeartFill />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => {
                  alert(`${cartCount} items in cart`);
                  setOpen(false);
                }}
                className="text-zinc-800 text-2xl hover:text-orange-500 relative"
              >
                <FaShoppingBag />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbaar;
