# 📦 Advanced Components Documentation

Complete guide to all advanced e-commerce components in GrocifyMultipage.

---

## 📑 Table of Contents

1. [AdvancedProductCard](#1-advancedproductcard)
2. [QuickView](#2-quickview)
3. [CartDrawer](#3-cartdrawer)
4. [AdvancedSearchBar](#4-advancedsearchbar)
5. [FilterSidebar](#5-filtersidebar)
6. [ProductComparison](#6-productcomparison)
7. [DealTimer](#7-dealtimer)

---

## 1. AdvancedProductCard

**Location:** `src/Components/AdvancedProductCard/AdvancedProductCard.jsx`

### Description
A premium product card component inspired by Flipkart and Amazon, featuring multiple badges, hover effects, and action buttons.

### Features
- ✨ Multiple badge types (Flash Sale, Bestseller, New, Organic)
- 🖼️ Image loading states with spinner
- ❤️ Wishlist toggle button
- 🔄 Compare products button
- 👁️ Quick view overlay on hover
- 🛒 Add to cart button
- ⭐ Star ratings with reviews count
- 🚚 Free delivery indicator
- 📦 Out of stock overlay
- ✅ Trust indicators
- 💫 Hover glow effect

### Props

```javascript
{
  product: {
    id: number,
    title: string,
    price: number,
    originalPrice?: number,
    image: string,
    rating?: number,
    reviews?: number,
    description?: string,
    weight?: string,
    origin?: string,
    discount?: number,
    isBestSeller?: boolean,
    isNew?: boolean,
    inStock?: boolean,
    organic?: boolean,
    freeDelivery?: boolean,
    flashSale?: boolean
  },
  onQuickView?: (product) => void,
  onAddToCart?: (product) => void,
  onAddToWishlist?: (product) => void,
  onCompare?: (product) => void
}
```

### Usage Example

```jsx
import AdvancedProductCard from './Components/AdvancedProductCard/AdvancedProductCard';

function ProductGrid() {
  const handleQuickView = (product) => {
    // Open quick view modal
  };

  const handleAddToCart = (product) => {
    // Add to cart logic
  };

  return (
    <AdvancedProductCard
      product={{
        id: 1,
        title: "Organic Apples",
        price: 4.99,
        originalPrice: 6.99,
        image: "https://...",
        rating: 4.5,
        reviews: 234,
        flashSale: true,
        organic: true,
        freeDelivery: true
      }}
      onQuickView={handleQuickView}
      onAddToCart={handleAddToCart}
    />
  );
}
```

### States
- `isWishlisted` - Track if product is in wishlist
- `isComparing` - Track if product is selected for comparison
- `imageLoaded` - Track image loading state

---

## 2. QuickView

**Location:** `src/Components/QuickView/QuickView.jsx`

### Description
A modal dialog that provides a detailed product preview without leaving the current page.

### Features
- 🖼️ Image gallery with thumbnail navigation
- 🔢 Quantity selector
- ⭐ Rating and reviews display
- 💰 Price with savings calculation
- 📦 Product specifications (weight, origin, SKU)
- 🚚 Delivery information
- 🔗 Share button
- ✅ Verified product badge
- 💚 Trust badges
- ❤️ Add to wishlist
- 🛒 Add to cart with quantity

### Props

```javascript
{
  product: object,    // Product data
  isOpen: boolean,    // Modal visibility
  onClose: function   // Close handler
}
```

### Usage Example

```jsx
import QuickView from './Components/QuickView/QuickView';
import { useState } from 'react';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => {
        setSelectedProduct(product);
        setIsOpen(true);
      }}>
        Quick View
      </button>

      <QuickView
        product={selectedProduct}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
```

### Internal States
- `quantity` - Selected quantity (1-10)
- `selectedImage` - Current image index
- `isWishlisted` - Wishlist toggle state

---

## 3. CartDrawer

**Location:** `src/Components/CartDrawer/CartDrawer.jsx`

### Description
A sliding drawer from the right side displaying shopping cart items with full management capabilities.

### Features
- 🎨 Sliding animation
- 📊 Free delivery progress bar
- ➕➖ Quantity controls
- 🗑️ Remove items
- 🏷️ Promo code system
- 💵 Price breakdown (subtotal, discount, delivery)
- 🛒 Empty cart state
- 📦 Item thumbnails
- ✨ Smooth transitions

### Props

```javascript
{
  isOpen: boolean,      // Drawer visibility
  onClose: function,    // Close handler
  cartItems?: array     // Initial cart items
}
```

### Usage Example

```jsx
import CartDrawer from './Components/CartDrawer/CartDrawer';
import { useState } from 'react';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Fresh Apples",
      price: 4.99,
      quantity: 2,
      image: "https://...",
      weight: "1kg"
    }
  ]);

  return (
    <>
      <button onClick={() => setIsCartOpen(true)}>
        Open Cart
      </button>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
}
```

### Promo Codes
Default promo code: **SAVE10** (10% discount)

### Calculations
- Free delivery on orders above $50
- Delivery fee: $5.99 (if applicable)
- Formula: `total = subtotal - discount + deliveryFee`

---

## 4. AdvancedSearchBar

**Location:** `src/Components/AdvancedSearchBar/AdvancedSearchBar.jsx`

### Description
An intelligent search bar with real-time suggestions, recent searches, and trending items.

### Features
- 🔍 Real-time product suggestions
- 🕐 Recent searches history
- 🔥 Trending searches
- ⌨️ Keyboard navigation ready
- 🎨 Smooth dropdown animations
- 🚫 Click outside to close
- ❌ Clear search button
- 📊 Search statistics

### Props

```javascript
{
  onSearch?: (query: string) => void
}
```

### Usage Example

```jsx
import AdvancedSearchBar from './Components/AdvancedSearchBar/AdvancedSearchBar';

function Header() {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implement search logic
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <AdvancedSearchBar onSearch={handleSearch} />
    </div>
  );
}
```

### Search Sections
1. **Product Suggestions** - Shows matching products with images
2. **Recent Searches** - User's search history (max 5)
3. **Trending Searches** - Popular searches with counts

---

## 5. FilterSidebar

**Location:** `src/Components/FilterSidebar/FilterSidebar.jsx`

### Description
A comprehensive filtering system for products, similar to Amazon's sidebar filters.

### Features
- 💰 Price range slider
- ⭐ Star rating filters
- 📂 Category checkboxes
- 🏷️ Brand filters
- ✅ Availability toggles
- 📊 Active filter count
- 🗑️ Clear all filters
- 📱 Mobile responsive
- 🎯 Collapsible sections

### Props

```javascript
{
  isOpen: boolean,              // Sidebar visibility
  onClose: function,            // Close handler
  onApplyFilters?: function     // Apply filters callback
}
```

### Usage Example

```jsx
import FilterSidebar from './Components/FilterSidebar/FilterSidebar';
import { useState } from 'react';

function ProductPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleApplyFilters = (filters) => {
    console.log('Applied filters:', filters);
    // Filter products based on filters object
  };

  return (
    <div className="flex">
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
      {/* Product grid */}
    </div>
  );
}
```

### Filter Object Structure

```javascript
{
  priceRange: [min, max],
  rating: number | null,
  categories: string[],
  brands: string[],
  inStock: boolean,
  organic: boolean,
  onSale: boolean
}
```

---

## 6. ProductComparison

**Location:** `src/Components/ProductComparison/ProductComparison.jsx`

### Description
Compare up to 3 products side-by-side with detailed specifications.

### Features
- 📊 Side-by-side comparison table
- 🖼️ Product images
- ✅ Visual indicators (checkmarks/crosses)
- 💰 Price comparison with savings
- ⭐ Rating comparison
- 📦 Specifications comparison
- 🛒 Add to cart from comparison
- 📱 Responsive table design

### Props

```javascript
{
  products: array,    // Array of products to compare (max 3)
  isOpen: boolean,    // Modal visibility
  onClose: function   // Close handler
}
```

### Usage Example

```jsx
import ProductComparison from './Components/ProductComparison/ProductComparison';
import { useState } from 'react';

function App() {
  const [compareProducts, setCompareProducts] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const addToCompare = (product) => {
    if (compareProducts.length >= 3) {
      alert('Maximum 3 products allowed');
      return;
    }
    setCompareProducts([...compareProducts, product]);
  };

  return (
    <>
      <button onClick={() => setIsCompareOpen(true)}>
        Compare ({compareProducts.length})
      </button>

      <ProductComparison
        products={compareProducts}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </>
  );
}
```

### Comparison Rows
- Price
- Original Price  
- Savings
- Rating
- Reviews
- Weight
- Origin
- Organic status
- Stock status
- Features list

---

## 7. DealTimer

**Location:** `src/Components/DealTimer/DealTimer.jsx`

### Description
A countdown timer for flash sales and limited-time deals with visual effects.

### Features
- ⏰ Live countdown (hours, minutes, seconds)
- 📊 Progress bar
- ⚡ Urgency indicators
- 🎨 Animated backgrounds
- 🔔 Expiry warnings
- 💫 Pulse animations
- 🎯 Decorative elements

### Props

```javascript
{
  endTime?: Date | string,  // Sale end time
  title?: string,           // Timer title
  isLive?: boolean         // Is sale active
}
```

### Usage Example

```jsx
import DealTimer from './Components/DealTimer/DealTimer';

function FlashSale() {
  // Set end time to 24 hours from now
  const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <DealTimer
      endTime={endTime}
      title="⚡ Flash Sale Ending Soon"
      isLive={true}
    />
  );
}
```

### Timer States
- **Normal** - Regular countdown with white progress
- **Expiring Soon** (< 30 min) - Yellow colors with pulse animation
- **Ended** - Gray theme with "Check back for new deals" message

### Default Behavior
If no `endTime` is provided, defaults to 24 hours from current time.

---

## 🎨 Common Styling Patterns

### Gradients
```jsx
// Orange to Red
className="bg-gradient-to-r from-orange-500 to-red-600"

// Purple to Pink  
className="bg-gradient-to-r from-purple-500 to-pink-600"
```

### Hover Effects
```jsx
// Scale up
className="hover:scale-105 transition-transform"

// Shadow
className="hover:shadow-xl transition-shadow"
```

### Animations
All components use custom animations defined in `index.css`:
- `animate-fadeIn`
- `animate-slideUp`
- `animate-slideDown`
- `animate-pulse-slow`
- `animate-bounce-slow`

---

## 🔗 Component Dependencies

All components require:
- React 19+
- React Icons 5+
- TailwindCSS 4+

Some components use:
- `react-router-dom` for navigation (Link)
- Custom animations from `index.css`

---

## 📱 Responsiveness

All components are fully responsive with:
- Mobile-first design
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Touch-friendly interactions
- Optimized for all screen sizes

---

## 🎯 Best Practices

1. **State Management**: Use React state or context for cart, wishlist, compare
2. **Image Optimization**: Use optimized images (WebP format recommended)
3. **Lazy Loading**: Implement lazy loading for better performance
4. **Error Handling**: Add error boundaries for production
5. **Accessibility**: Add ARIA labels where needed

---

## 🚀 Performance Tips

- Use `React.memo()` for expensive components
- Implement virtual scrolling for large product lists
- Optimize images with lazy loading
- Use code splitting for routes
- Minimize bundle size with tree shaking

---

<div align="center">

**Happy Coding! 🚀**

For more information, check the main [README.md](./README.md)

</div>
