import React, { useState, useEffect, useRef } from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { FaClock, FaFire, FaChartLine } from "react-icons/fa";

const AdvancedSearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    "Organic Apples",
    "Fresh Vegetables",
    "Dairy Products"
  ]);
  const searchRef = useRef(null);

  // Mock trending searches
  const trendingSearches = [
    { term: "Strawberries", count: "2.5k searches" },
    { term: "Protein Powder", count: "1.8k searches" },
    { term: "Olive Oil", count: "1.2k searches" }
  ];

  // Mock product suggestions
  const mockProducts = [
    { id: 1, name: "Organic Apple", category: "Fruits", price: 4.99 },
    { id: 2, name: "Fresh Banana", category: "Fruits", price: 2.49 },
    { id: 3, name: "Strawberry Jam", category: "Preserves", price: 6.99 },
    { id: 4, name: "Almond Milk", category: "Dairy", price: 5.49 },
    { id: 5, name: "Whole Grain Bread", category: "Bakery", price: 3.99 },
    { id: 6, name: "Greek Yogurt", category: "Dairy", price: 4.49 },
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (term) => {
    setSearchQuery(term);
    if (term && !recentSearches.includes(term)) {
      setRecentSearches([term, ...recentSearches.slice(0, 4)]);
    }
    if (onSearch) onSearch(term);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      {/* Search Input */}
      <div
        className={`flex items-center bg-white border-2 rounded-full overflow-hidden transition-all duration-300 ${
          isFocused ? "border-orange-500 shadow-lg ring-4 ring-orange-100" : "border-gray-300"
        }`}
      >
        <IoMdSearch className="text-gray-400 text-2xl ml-4" />
        <input
          type="text"
          placeholder="Search for products, brands, and more..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="flex-1 px-4 py-3 focus:outline-none text-gray-800"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="text-gray-400 hover:text-red-500 transition-colors mr-2"
          >
            <IoMdClose className="text-xl" />
          </button>
        )}
        <button
          onClick={() => handleSearch(searchQuery)}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 font-semibold hover:from-orange-600 hover:to-red-700 transition-all"
        >
          Search
        </button>
      </div>

      {/* Dropdown Suggestions */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[9999] max-h-[70vh] overflow-y-auto animate-slideDown">
          {/* Product Suggestions */}
          {suggestions.length > 0 && (
            <div className="border-b border-gray-200">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700 text-sm">PRODUCTS</h3>
              </div>
              <div>
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSearch(product.name)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-orange-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <IoMdSearch className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-orange-600">${product.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {searchQuery === "" && recentSearches.length > 0 && (
            <div className="border-b border-gray-200">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                  <FaClock className="text-orange-500" />
                  RECENT SEARCHES
                </h3>
                <button
                  onClick={() => setRecentSearches([])}
                  className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                >
                  Clear All
                </button>
              </div>
              <div>
                {recentSearches.map((search, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(search)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-orange-50 transition-colors group"
                  >
                    <FaClock className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                    <span className="text-gray-700 group-hover:text-gray-900">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {searchQuery === "" && (
            <div>
              <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-200">
                <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                  <FaFire className="text-orange-500" />
                  TRENDING SEARCHES
                </h3>
              </div>
              <div>
                {trendingSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(item.term)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-orange-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FaChartLine className="text-orange-500 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700 font-medium group-hover:text-gray-900">{item.term}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchQuery.length > 0 && suggestions.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500">No products found for "{searchQuery}"</p>
              <p className="text-sm text-gray-400 mt-2">Try searching with different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchBar;
