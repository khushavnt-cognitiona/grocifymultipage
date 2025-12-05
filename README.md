# 🛒 Grocify - Enterprise E-Commerce Platform

<div align="center">

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-cyan)
![License](https://img.shields.io/badge/License-MIT-green)

**Complete e-commerce solution with real-time features, role-based authentication, and modern UI**

[Features](#-features) • [Quick Start](#-quick-start) • [Demo](#-demo-credentials) • [Documentation](#-documentation)

</div>

---

## ✨ Features

### 🔐 **Authentication System**
- Role-based access (Admin/Dealer/Customer)
- Secure login with JWT ready
- Session management
- Protected routes

### 🛍️ **E-Commerce**
- Advanced product catalog
- Smart filters & search
- Shopping cart with real-time updates
- 5 Payment methods (Card, UPI, COD, Net Banking, EMI)
- 3-Step checkout flow
- Order tracking & cancellation

### 📊 **Real-Time Dashboard** (Admin Only)
- Live user counter
- Sales feed
- Product updates
- Price changes
- Notifications
- Live chat

### 👤 **Customer Features**
- Order management
- Profile with image upload
- Wishlist
- Address management
- Order cancellation

### 🎨 **Modern UI/UX**
- Responsive design (Mobile/Tablet/Desktop)
- Amazon/Flipkart inspired
- Smooth animations
- Gradient themes
- Dark mode ready

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project
cd grocifymultipage

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:5174
```

---

## 🔑 Demo Credentials

### Admin Access 👑
```
Email: admin@grocify.com
Password: admin123
```

### Dealer Access 🏪
```
Email: dealer@grocify.com
Password: dealer123
```

### Customer Access 🛒
```
Email: customer@grocify.com
Password: customer123
```

---

## 📍 Main Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home page | Public |
| `/shop` | Product catalog | Public |
| `/login` | Authentication | Public |
| `/checkout` | Checkout flow | Public |
| `/myorders` | Order tracking | Auth |
| `/myprofile` | Profile management | Auth |
| `/realtime` | Analytics dashboard | Admin |
| `/admin/dashboard` | Admin panel | Admin |
| `/dealer/dashboard` | Inventory panel | Dealer |

---

## 🎯 Key Features

### **Payment Methods**
- 💳 Credit/Debit Card
- 📱 UPI
- 💵 Cash on Delivery
- 🏦 Net Banking
- 📊 EMI (4 plans)

### **Real-Time Updates**
- Live user counters
- Shopping cart updates
- Order status tracking
- Price change alerts
- Notification feed
- Live chat support

### **Order Management**
- 5-step tracking visualization
- Cancel orders (Processing/Shipping)
- Reorder functionality
- Delivery estimates

---

## 📚 Documentation

Comprehensive documentation available:

- **[COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md)** - Full testing guide
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Project architecture
- **[AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)** - Auth system
- **[CHECKOUT_SYSTEM.md](./CHECKOUT_SYSTEM.md)** - Checkout features
- **[CUSTOMER_SYSTEM.md](./CUSTOMER_SYSTEM.md)** - Customer features
- **[REALTIME_FEATURES.md](./REALTIME_FEATURES.md)** - Real-time components

---

## 🛠️ Tech Stack

- **Frontend:** React 18.x
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** React Icons
- **State:** Context API
- **Authentication:** JWT Ready
- **Real-Time:** setInterval (WebSocket ready)

---

## 📦 Project Structure

```
src/
├── App.jsx                 # Main routing
├── context/
│   └── AuthContext.jsx     # Auth state
├── Pages/
│   ├── LoginPage/          # Authentication
│   ├── CheckoutPage/       # 3-step checkout
│   ├── MyOrders/           # Order management
│   ├── MyProfile/          # Profile settings
│   ├── RealTimePage/       # Live dashboard
│   ├── AdminDashboard/     # Admin panel
│   └── DealerDashboard/    # Dealer panel
└── Components/
    ├── Navbaar/            # Navigation
    ├── CartDrawer/         # Shopping cart
    └── ... (40+ components)
```

---

## 🔄 Real-Time Features

| Feature | Update Interval |
|---------|----------------|
| Cart Counter | 4 seconds |
| Wishlist Counter | 4 seconds |
| Active Users | 4 seconds |
| Sales Feed | 2-5 seconds |
| Product Feed | 4 seconds |
| Price Updates | 5 seconds |
| Notifications | 3-6 seconds |

---

## 📱 Responsive Design

✅ Mobile (< 768px)  
✅ Tablet (768px - 1024px)  
✅ Desktop (> 1024px)

Optimized for all screen sizes with touch-friendly interfaces.

---

## 🎉 Features Checklist

- ✅ Role-based authentication
- ✅ Real-time dashboard
- ✅ 5 Payment methods
- ✅ Order tracking
- ✅ Image upload
- ✅ Mobile responsive
- ✅ Modern UI/UX
- ✅ Cart management
- ✅ Profile system
- ✅ Admin panel
- ✅ Dealer panel
- ✅ Live chat
- ✅ EMI calculator
- ✅ COD support
- ✅ Order cancellation

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with 💻 and ☕ by Khushvant

</div>
