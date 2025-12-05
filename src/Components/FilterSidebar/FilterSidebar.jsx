import React, { useState } from "react";
import { FaFilter, FaStar, FaTimes, FaCheck } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const FilterSidebar = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    rating: null,
    categories: [],
    brands: [],
    inStock: false,
    organic: false,
    onSale: false
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rating: true,
    category: true,
    brand: false,
    availability: false
  });

  const categories = [
    { id: "fruits", name: "Fruits & Vegetables", count: 234 },
    { id: "dairy", name: "Dairy Products", count: 156 },
    { id: "bakery", name: "Bakery", count: 89 },
    { id: "meat", name: "Meat & Seafood", count: 123 },
    { id: "beverages", name: "Beverages", count: 178 }
  ];

  const brands = [
    { id: "organic-valley", name: "Organic Valley", count: 45 },
    { id: "fresh-farms", name: "Fresh Farms", count: 67 },
    { id: "green-harvest", name: "Green Harvest", count: 34 },
    { id: "nature-pure", name: "Nature Pure", count: 56 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryToggle = (categoryId) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleBrandToggle = (brandId) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brandId)
        ? prev.brands.filter(b => b !== brandId)
        : [...prev.brands, brandId]
    }));
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = Number(value);
    setFilters(prev => ({ ...prev, priceRange: newRange }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 100],
      rating: null,
      categories: [],
      brands: [],
      inStock: false,
      organic: false,
      onSale: false
    });
  };

  const applyFilters = () => {
    if (onApplyFilters) onApplyFilters(filters);
    onClose();
  };

  const activeFilterCount = 
    filters.categories.length + 
    filters.brands.length + 
    (filters.rating ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.organic ? 1 : 0) +
    (filters.onSale ? 1 : 0);

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-full sm:w-80 bg-white shadow-xl z-[9999] lg:z-0 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaFilter className="text-2xl" />
            <div>
              <h2 className="text-xl font-bold">Filters</h2>
              {activeFilterCount > 0 && (
                <p className="text-sm opacity-90">{activeFilterCount} active</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:bg-white/20 p-2 rounded-full transition-all"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Filters Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          
          {/* Price Range */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("price")}
              className="w-full flex items-center justify-between mb-3 font-semibold text-gray-800 hover:text-orange-600 transition-colors"
            >
              <span>Price Range</span>
              {expandedSections.price ? <MdKeyboardArrowUp className="text-xl" /> : <MdKeyboardArrowDown className="text-xl" />}
            </button>
            
            {expandedSections.price && (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-600">Min</label>
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(0, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <span className="text-gray-400 mt-5">-</span>
                  <div className="flex-1">
                    <label className="text-xs text-gray-600">Max</label>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(1, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("rating")}
              className="w-full flex items-center justify-between mb-3 font-semibold text-gray-800 hover:text-orange-600 transition-colors"
            >
              <span>Customer Rating</span>
              {expandedSections.rating ? <MdKeyboardArrowUp className="text-xl" /> : <MdKeyboardArrowDown className="text-xl" />}
            </button>
            
            {expandedSections.rating && (
              <div className="space-y-2">
                {[4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFilters(prev => ({ ...prev, rating: prev.rating === star ? null : star }))}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      filters.rating === star ? "bg-orange-100 border-2 border-orange-500" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < star ? "text-yellow-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-700">& Up</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("category")}
              className="w-full flex items-center justify-between mb-3 font-semibold text-gray-800 hover:text-orange-600 transition-colors"
            >
              <span>Categories</span>
              {expandedSections.category ? <MdKeyboardArrowUp className="text-xl" /> : <MdKeyboardArrowDown className="text-xl" />}
            </button>
            
            {expandedSections.category && (
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brands */}
          <div className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleSection("brand")}
              className="w-full flex items-center justify-between mb-3 font-semibold text-gray-800 hover:text-orange-600 transition-colors"
            >
              <span>Brands</span>
              {expandedSections.brand ? <MdKeyboardArrowUp className="text-xl" /> : <MdKeyboardArrowDown className="text-xl" />}
            </button>
            
            {expandedSections.brand && (
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label
                    key={brand.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand.id)}
                      onChange={() => handleBrandToggle(brand.id)}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900">
                      {brand.name}
                    </span>
                    <span className="text-xs text-gray-500">({brand.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Availability & Features */}
          <div className="pb-4">
            <button
              onClick={() => toggleSection("availability")}
              className="w-full flex items-center justify-between mb-3 font-semibold text-gray-800 hover:text-orange-600 transition-colors"
            >
              <span>Availability & Features</span>
              {expandedSections.availability ? <MdKeyboardArrowUp className="text-xl" /> : <MdKeyboardArrowDown className="text-xl" />}
            </button>
            
            {expandedSections.availability && (
              <div className="space-y-3">
                <label className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">In Stock Only</span>
                </label>
                
                <label className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.organic}
                    onChange={(e) => setFilters(prev => ({ ...prev, organic: e.target.checked }))}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Organic Only</span>
                </label>
                
                <label className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => setFilters(prev => ({ ...prev, onSale: e.target.checked }))}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">On Sale</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 space-y-3">
          <button
            onClick={applyFilters}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <FaCheck />
            Apply Filters
          </button>
          
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
            >
              Clear All ({activeFilterCount})
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
