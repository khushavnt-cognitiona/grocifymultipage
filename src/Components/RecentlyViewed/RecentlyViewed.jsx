import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaEye } from 'react-icons/fa';

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setProducts(stored);
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaEye className="text-orange-500" /> Recently Viewed
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div 
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 overflow-hidden group"
          >
            <div className="aspect-square bg-gray-50 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300">
              {product.image}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
              <div className="flex items-center gap-1 text-yellow-400 text-xs my-1">
                <FaStar /> <span>{product.rating}</span>
              </div>
              <p className="font-bold text-orange-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
