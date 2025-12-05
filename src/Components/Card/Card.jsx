import React from "react";
import { FaPlus, FaHeart, FaStar } from "react-icons/fa";
import Button from "../Button/Button";

const Card = ({ title, price, image, description, rating, reviews, weight, origin }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 relative hover:shadow-lg transition-all flex flex-col">

      {/* Heart Icon - Left Top */}
      <button className="absolute top-3 left-3 text-red-500 text-xl">
        <FaHeart />
      </button>

      {/* Plus Button - Right Top */}
      <button className="absolute top-3 right-3 bg-orange-500 text-white p-2 rounded-full shadow">
        <FaPlus />
      </button>

      {/* Image */}
      <div className="flex justify-center my-4">
        <img src={image} alt={title} className="w-32 h-32 object-contain" />
      </div>

      {/* Content Center */}
      <div className="text-center flex-1 flex flex-col items-center">

        <h3 className="text-xl font-semibold">{title}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 my-1 justify-center">
          <FaStar className="text-yellow-500" />
          <span className="font-medium">{rating}</span>
          <span className="text-sm text-gray-500">({reviews} reviews)</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm my-2">
          {description}
        </p>

        {/* Extra Info */}
        <p className="text-gray-500 text-sm">Weight: {weight}</p>
        {origin && (
          <p className="text-gray-500 text-sm">Origin: {origin}</p>
        )}

        {/* Price */}
        <p className="text-lg font-bold mt-2">${price}</p>
      </div>

      {/* Button Always Bottom */}
      <div className="mt-4 flex justify-center">
        <Button content="Shop Now" />
      </div>

    </div>
  );
};

export default Card;
