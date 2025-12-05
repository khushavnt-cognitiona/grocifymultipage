import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaHeart, FaTruck, FaShieldAlt, FaUndo, FaMinus, FaPlus, FaShareAlt } from "react-icons/fa";
import ProductReviews from "../../Components/ProductReviews/ProductReviews";
import RecentlyViewed from "../../Components/RecentlyViewed/RecentlyViewed";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock Product Data (In real app, fetch by ID)
  const product = {
    id: id || 1,
    name: "Organic Bananas",
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.5,
    reviews: 128,
    description: "Fresh, organic bananas sourced directly from certified farms. Rich in potassium and perfect for a healthy snack or smoothie. These bananas are naturally ripened without any chemicals.",
    images: ["🍌", "🥣", "🥞", "🥗"], // Using emojis as placeholders for images
    stock: true,
    features: [
      "100% Organic & Natural",
      "Rich in Potassium",
      "Chemical-free ripening",
      "Farm fresh quality"
    ]
  };

  // Save to Recently Viewed
  React.useEffect(() => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      rating: product.rating
    };
    
    // Remove if already exists to move it to the top
    const filtered = recentlyViewed.filter(item => item.id !== newProduct.id);
    
    // Add to beginning
    const updated = [newProduct, ...filtered].slice(0, 5); // Keep max 5
    
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  }, [product.id]);

  const handleAddToCart = () => {
    // Add to cart logic here
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <span className="hover:text-orange-500 cursor-pointer" onClick={() => navigate('/')}>Home</span> / 
          <span className="hover:text-orange-500 cursor-pointer" onClick={() => navigate('/shop')}> Shop</span> / 
          <span className="text-gray-900 font-semibold"> {product.name}</span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-9xl shadow-inner relative group overflow-hidden">
                <span className="group-hover:scale-110 transition-transform duration-500">{product.images[selectedImage]}</span>
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors">
                  <FaHeart />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-50 rounded-xl flex items-center justify-center text-4xl border-2 transition-all ${
                      selectedImage === idx ? 'border-orange-500 shadow-md' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    {img}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(product.rating) ? "" : "text-gray-200"} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: `Check out ${product.name} on Grocify!`,
                        url: window.location.href,
                      }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  title="Share Product"
                >
                  <FaShareAlt className="text-xl" />
                </button>
              </div>

              <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl font-bold text-orange-600">${product.price}</span>
                <span className="text-xl text-gray-400 line-through mb-1">${product.originalPrice}</span>
                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full mb-2">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <FaCheckCircle className="text-green-500" /> {feature}
                  </div>
                ))}
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 border-t border-b border-gray-100 py-6">
                <div className="flex items-center border border-gray-300 rounded-xl w-max">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    <FaMinus />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-white border-2 border-orange-500 text-orange-600 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                    <FaTruck />
                  </div>
                  <p className="text-xs font-semibold text-gray-600">Free Delivery</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                    <FaShieldAlt />
                  </div>
                  <p className="text-xs font-semibold text-gray-600">Secure Payment</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
                    <FaUndo />
                  </div>
                  <p className="text-xs font-semibold text-gray-600">Easy Returns</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />

        {/* Recently Viewed Section */}
        <RecentlyViewed />

      </div>
    </div>
  );
};

// Helper Icon
const FaCheckCircle = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628 0z"></path></svg>
);

export default ProductDetails;
