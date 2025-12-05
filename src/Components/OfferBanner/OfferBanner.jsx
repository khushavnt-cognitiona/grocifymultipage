import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes, FaTag } from "react-icons/fa";

const OfferBanner = ({ banners = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Default banners if none provided
  const defaultBanners = [
    {
      id: 1,
      title: "🎉 MEGA SALE",
      subtitle: "Get up to 50% OFF on all organic products",
      bgGradient: "from-purple-600 to-pink-600",
      code: "MEGA50",
      endTime: "Ends in 2 hours"
    },
    {
      id: 2,
      title: "🚀 FREE DELIVERY",
      subtitle: "On orders above $50 • No minimum order",
      bgGradient: "from-blue-600 to-cyan-600",
      code: "FREEDEL",
      endTime: "Limited time offer"
    },
    {
      id: 3,
      title: "⚡ FLASH DEAL",
      subtitle: "Buy 2 Get 1 FREE on selected items",
      bgGradient: "from-orange-600 to-red-600",
      code: "BUY2GET1",
      endTime: "Today only"
    },
    {
      id: 4,
      title: "🌱 ORGANIC WEEK",
      subtitle: "Extra 20% OFF on all organic vegetables",
      bgGradient: "from-green-600 to-emerald-600",
      code: "ORGANIC20",
      endTime: "This week only"
    }
  ];

  const displayBanners = banners.length > 0 ? banners : defaultBanners;

  useEffect(() => {
    if (!isPaused && isVisible) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayBanners.length);
      }, 5000); // Auto-rotate every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused, isVisible, displayBanners.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayBanners.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayBanners.length) % displayBanners.length);
  };

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentBanner = displayBanners[currentIndex];

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Content */}
      <div
        className={`relative bg-gradient-to-r ${currentBanner.bgGradient} text-white px-8 py-6 md:py-8 transition-all duration-500`}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 animate-slideInRight">
              {currentBanner.title}
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-3 animate-slideInRight" style={{ animationDelay: "0.1s" }}>
              {currentBanner.subtitle}
            </p>
            
            {/* Offer Code */}
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-white/30 animate-slideInRight" style={{ animationDelay: "0.2s" }}>
              <FaTag className="text-yellow-300" />
              <div className="flex items-center gap-2">
                <span className="text-sm opacity-90">Use code:</span>
                <span className="font-bold text-lg tracking-wider">{currentBanner.code}</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentBanner.code);
                  alert("Code copied!");
                }}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm font-semibold transition-all"
              >
                COPY
              </button>
            </div>

            {/* Timer */}
            <div className="mt-3 text-sm opacity-75 animate-pulse">
              ⏰ {currentBanner.endTime}
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-bounce-slow">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-white/50">
              Shop Now →
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={closeBanner}
          className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all z-20"
        >
          <FaTimes />
        </button>

        {/* Navigation Arrows */}
        {displayBanners.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all z-20 hidden md:block"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-16 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all z-20 hidden md:block"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Progress Dots */}
      {displayBanners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {displayBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all ${
                index === currentIndex
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/70"
              } rounded-full`}
            />
          ))}
        </div>
      )}

      {/* Auto-play Progress Bar */}
      {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden">
          <div
            className="h-full bg-white transition-all"
            style={{
              animation: "progressBar 5s linear infinite",
              animationPlayState: isPaused ? "paused" : "running"
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default OfferBanner;
