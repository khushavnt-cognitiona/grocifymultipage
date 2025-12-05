import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './Components/Home/Home';
import AdvancedShop from './Components/AdvancedShop/AdvancedShop';
import RealTimePage from './Pages/RealTimePage/RealTimePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import DealerDashboard from './Pages/DealerDashboard/DealerDashboard';
import CustomerDashboard from './Pages/CustomerDashboard/CustomerDashboard';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage';
import MyOrders from './Pages/MyOrders/MyOrders';
import MyProfile from './Pages/MyProfile/MyProfile';
import WishlistPage from './Pages/WishlistPage/WishlistPage';
import SavedAddresses from './Pages/SavedAddresses/SavedAddresses';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import RewardsPage from './Pages/RewardsPage/RewardsPage';

import AIChatbot from './Components/AIChatbot/AIChatbot';

import OrderDetails from './Pages/OrderDetails/OrderDetails';

import ProductDetails from './Pages/ProductDetails/ProductDetails';

import { CartProvider } from './Context/CartContext';

// Unauthorized Page Component
const UnauthorizedPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
      <div className="text-6xl mb-4">🚫</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
      <p className="text-gray-600 mb-6">
        You don't have permission to access this page.
      </p>
      <a
        href="/login"
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-block"
      >
        Go to Login
      </a>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AIChatbot />
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<AdvancedShop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/realtime" element={<RealTimePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/addresses" element={<SavedAddresses />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected Routes - Admin Only */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Protected Routes - Dealer Only */}
          <Route
            path="/dealer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['dealer']}>
                <DealerDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* catch all - redirect to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
