import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Button from "../Button/Button";

const Card = ({ title, price, image }) => {
  return (
    <div className="relative bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">

      {/* Left + Icon */}
      <div className="absolute top-3 left-3 bg-white shadow p-2 rounded-full cursor-pointer text-orange-500 hover:scale-110 transition">
        <FaPlus size={16} />
      </div>

      {/* Right Heart Icon */}
      <div className="absolute top-3 right-3 bg-white shadow p-2 rounded-full cursor-pointer text-red-500 hover:scale-110 transition">
        <FaHeart size={16} />
      </div>

      {/* Product Image */}
      <div className="w-full flex justify-center mt-8 sm:mt-10">
        <img
          src={image}
          alt={title}
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
        />
      </div>

      {/* Content */}
      <div className="text-center mt-4">
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-800">
          {title}
        </h3>

        <p className="text-orange-500 font-bold text-base sm:text-lg mt-1">
          ${price}
        </p>

        <div className="flex justify-center mt-3 sm:mt-4">
          <Button content="Shop Now" />
        </div>
      </div>
    </div>
  );
};

export default Card;
