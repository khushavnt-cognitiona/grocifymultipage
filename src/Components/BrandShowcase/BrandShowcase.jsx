import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCrown } from "react-icons/fa";

const BrandShowcase = ({ onBrandClick }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mock brand data
  const brands = [
    {
      id: 1,
      name: "Fresh Farms",
      logo: "🌾",
      tagline: "100% Organic",
      productCount: 245,
      rating: 4.8,
      bgColor: "from-green-500 to-emerald-600",
      featured: true
    },
    {
      id: 2,
      name: "Organic Valley",
      logo: "🥬",
      tagline: "Farm to Table",
      productCount: 189,
      rating: 4.9,
      bgColor: "from-blue-500 to-cyan-600",
      featured: true
    },
    {
      id: 3,
      name: "Nature's Best",
      logo: "🍃",
      tagline: "Pure & Natural",
      productCount: 321,
      rating: 4.7,
      bgColor: "from-purple-500 to-pink-600"
    },
    {
      id: 4,
      name: "Green Harvest",
      logo: "🌿",
      tagline: "Sustainably Grown",
      productCount: 156,
      rating: 4.6,
      bgColor: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      name: "Pure Earth",
      logo: "🌍",
      tagline: "Global Quality",
      productCount: 278,
      rating: 4.8,
      bgColor: "from-indigo-500 to-purple-600"
    },
    {
      id: 6,
      name: "Daily Fresh",
      logo: "🥕",
      tagline: "Every Day Fresh",
      productCount: 412,
      rating: 4.9,
      bgColor: "from-yellow-500 to-orange-600",
      featured: true
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

    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    }, 100);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl">
            <FaCrown className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Top Brands</h2>
            <p className="text-gray-600 text-sm">Trusted by millions of customers</p>
          </div>
        </div>
        <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm hidden md:block">
          View All Brands →
        </button>
      </div>

      {/* Brands Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-2xl rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>
        )}

        {/* Brands Grid */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              onClick={() => onBrandClick && onBrandClick(brand)}
              className={`flex-shrink-0 w-64 relative overflow-hidden rounded-2xl cursor-pointer group ${
                brand.featured ? "ring-2 ring-yellow-400" : ""
              }`}
              style={{
                animation: `slideInRight 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Brand Card */}
              <div className={`relative bg-gradient-to-br ${brand.bgColor} p-6 h-48 flex flex-col justify-between overflow-hidden`}>
                {/* Animated Background */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />

                {/* Featured Badge */}
                {brand.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <FaCrown className="text-xs" />
                      Featured
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {brand.logo}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">{brand.name}</h3>
                  <p className="text-white/90 text-sm">{brand.tagline}</p>
                </div>

                {/* Stats */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-semibold">{brand.productCount} Products</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white font-bold">{brand.rating}</span>
                    <span className="text-yellow-300 text-sm">★</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-2xl rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110"
          >
            <FaChevronRight className="text-gray-700" />
          </button>
        )}
      </div>

      {/* Stats Footer */}
      <div className="relative z-10 mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{brands.length}+</p>
          <p className="text-sm text-gray-600">Premium Brands</p>
        </div>
        <div className="text-center border-x border-gray-200">
          <p className="text-2xl font-bold text-gray-900">10K+</p>
          <p className="text-sm text-gray-600">Products</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">4.8★</p>
          <p className="text-sm text-gray-600">Avg. Rating</p>
        </div>
      </div>
    </div>
  );
};

export default BrandShowcase;
