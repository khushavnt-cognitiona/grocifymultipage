import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";

const RecentlyViewed = ({ onProductClick }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mock recently viewed products
  const recentlyViewedProducts = [
    {
      id: 201,
      title: "Organic Apples",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&h=200&fit=crop",
      rating: 4.5
    },
    {
      id: 202,
      title: "Fresh Bananas",
      price: 2.49,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200&h=200&fit=crop",
      rating: 4.8
    },
    {
      id: 203,
      title: "Strawberries",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&fit=crop",
      rating: 4.7
    },
    {
      id: 204,
      title: "Blueberries",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&h=200&fit=crop",
      rating: 4.6
    },
    {
      id: 205,
      title: "Avocados",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop",
      rating: 4.9
    },
    {
      id: 206,
      title: "Fresh Tomatoes",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200&h=200&fit=crop",
      rating: 4.4
    }
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newScrollLeft = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth"
    });
  };

  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  if (recentlyViewedProducts.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaEye className="text-orange-500 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
        </div>
        <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
          View All
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110 border border-gray-200"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>
        )}

        {/* Products Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {recentlyViewedProducts.map((product, index) => (
            <div
              key={product.id}
              onClick={() => onProductClick && onProductClick(product)}
              className="flex-shrink-0 w-40 bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              style={{
                animation: `slideInRight 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Image */}
              <div className="relative h-40 bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs">
                    <span className="font-bold">{product.rating}</span>
                    <span>★</span>
                  </div>
                </div>

                {/* Price */}
                <div className="font-bold text-gray-900">
                  ${product.price}
                </div>
              </div>

              {/* Quick Add Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-orange-500 hover:text-white transition-all">
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110 border border-gray-200"
          >
            <FaChevronRight className="text-gray-700" />
          </button>
        )}
      </div>

      {/* View Count Badge */}
      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Based on your browsing history
        </span>
      </div>
    </div>
  );
};

export default RecentlyViewed;
