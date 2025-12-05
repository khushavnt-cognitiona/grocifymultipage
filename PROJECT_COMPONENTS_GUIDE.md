# 📚 Project Components & Pages Guide

## 📄 Pages (Main Screens)

| Page Name | Role & Functionality | Usage Location |
|-----------|----------------------|----------------|
| **Home** | **Landing Page:** Displays hero section, featured products, offers, and categories. Main entry point. | Route: `/` |
| **AdvancedShop** | **Product Catalog:** Lists all products with advanced filtering (price, category), sorting, and search. | Route: `/shop` |
| **LoginPage** | **Authentication:** Handles user login/signup and role selection (Admin/Dealer/Customer). Redirects based on role. | Route: `/login` |
| **CheckoutPage** | **Checkout Flow:** Manages the 3-step checkout process: Address Input → Payment Selection → Order Confirmation. | Route: `/checkout` |
| **MyOrders** | **Order History:** Lists customer's past orders with real-time tracking visualization and cancellation options. | Route: `/myorders` |
| **MyProfile** | **User Profile:** Allows users to view/edit personal info, upload profile picture, and view account stats. | Route: `/myprofile` |
| **CustomerDashboard** | **Customer Hub:** Central dashboard for customers showing quick links to orders, profile, wishlist, etc. | Route: `/dashboard` |
| **AdminDashboard** | **Admin Control:** Dashboard for administrators to manage users, view system stats, and oversee operations. | Route: `/admin/dashboard` |
| **DealerDashboard** | **Dealer Control:** Dashboard for dealers to manage inventory, process orders, and view sales. | Route: `/dealer/dashboard` |
| **RealTimePage** | **Live Analytics:** Exclusive admin page showing real-time data like active users, live sales, and price updates. | Route: `/realtime` |

---

## 🧱 Core Components

| Component Name | Role & Functionality | Usage Location |
|----------------|----------------------|----------------|
| **Navbaar** | **Navigation:** Top bar with links, search, cart icon, and dynamic profile dropdown. Adapts to login state. | `App.jsx` (Global) |
| **CartDrawer** | **Shopping Cart:** Slide-out sidebar showing cart items, total price, and checkout button. | `Navbaar` |
| **Hero** | **Banner:** Main visual banner on home page with call-to-action buttons. | `Home.jsx` |
| **AdvancedProductCard** | **Product Item:** Displays single product info (image, price) with "Add to Cart" and "Wishlist" buttons. | `AdvancedShop`, `Home` |
| **AdvancedSearchBar** | **Search:** Search input with auto-suggestions and real-time filtering. | `Navbaar`, `AdvancedShop` |
| **Footer** | **Bottom Section:** Displays site links, social media icons, and copyright info. | `App.jsx` (Global) |

---

## 💳 Checkout Components

| Component Name | Role & Functionality | Usage Location |
|----------------|----------------------|----------------|
| **AddressForm** | **Address Input:** Form to capture delivery details with validation and "Save Address" feature. | `CheckoutPage` |
| **PaymentMethod** | **Payment:** Handles selection and processing of 5 payment modes (Card, UPI, COD, NetBanking, EMI). | `CheckoutPage` |
| **OrderSummary** | **Bill Details:** Sticky sidebar showing item list, subtotal, taxes, shipping, and final total. | `CheckoutPage` |

---

## ⚡ Real-Time Components

| Component Name | Role & Functionality | Usage Location |
|----------------|----------------------|----------------|
| **LiveViewCounter** | **User Tracker:** Shows fake/real active user count (e.g., "125 viewing now"). | `RealTimePage` |
| **LiveSalesCounter** | **Sales Ticker:** Simulates live sales notifications (e.g., "John bought Apple"). | `RealTimePage` |
| **LiveProductFeed** | **Product Updates:** Shows stream of newly added products. | `RealTimePage` |
| **LivePriceUpdates** | **Price Alerts:** Shows real-time price fluctuations. | `RealTimePage` |
| **LiveNotifications** | **System Alerts:** General system notifications feed. | `RealTimePage` |
| **LiveChat** | **Support Chat:** Interactive chat widget for customer support. | `RealTimePage` |

---

## ✨ Feature Components

| Component Name | Role & Functionality | Usage Location |
|----------------|----------------------|----------------|
| **OfferBanner** | **Promotions:** Visual banner highlighting special discounts and deals. | `Home.jsx` |
| **CategoryShowcase** | **Categories:** Grid display of product categories (Fruits, Veggies, etc.). | `Home.jsx` |
| **BrandShowcase** | **Partners:** Carousel of partner brand logos. | `Home.jsx` |
| **Testimonials** | **Reviews:** Slider showing customer feedback and ratings. | `Home.jsx` |
| **Newsletter** | **Subscription:** Form to subscribe to email updates. | `Home.jsx` |

---

## 🧠 Context & Logic

| File Name | Role & Functionality | Usage Location |
|-----------|----------------------|----------------|
| **AuthContext** | **State Management:** Manages global authentication state (user, token, role, login/logout functions). | `App.jsx` (Wrapper) |
| **ProtectedRoute** | **Security:** Higher-Order Component that restricts access to routes based on authentication and role. | `App.jsx` (Routes) |
| **productList.js** | **Data Source:** Static array of product data acting as a mock database. | Various Components |

---

<div align="center">

**Project Architecture Overview**
`App` → `Context` → `Routes` → `Pages` → `Components`

</div>
