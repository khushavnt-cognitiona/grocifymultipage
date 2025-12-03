import React from "react";
import Heading from "../Heading/Heading";
import FruiteCat from "../../assets/images/fruits-and-veggies.png";
import SeaFoodCat from "../../assets/images/meat-and-seafood.png";
import DairyCat from "../../assets/images/dairy-and-eggs.png";
import Button from "../Button/Button";

const Category = () => {
  const renderCard = category.map((card) => {
    return (
      <div
  key={card.id}
  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center"
>
  {/* Bigger Image */}
  <div className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 flex items-center justify-center mb-6">
    <img
      src={card.image}
      alt={card.title}
      className="w-full h-full object-contain"
    />
  </div>

  {/* Content */}
  <h3 className="text-xl font-bold text-zinc-800 mb-2">{card.title}</h3>
  <p className="text-zinc-600 text-sm leading-relaxed mb-4">
    {card.description}
  </p>

  <Button content="See All" />
</div>

    );
  });

  return (
    <section className="py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <Heading highlight="Shop" heading="by Category" />

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {renderCard}
        </div>
      </div>
    </section>
  );
};

export default Category;

const category = [
  {
    id: 1,
    title: "Fruits & Veggies",
    description:
      "Fresh organic produce sourced daily from local farms. Explore a wide range of seasonal fruits and crisp vegetables.",
    image: FruiteCat,
  },
  {
    id: 2,
    title: "Dairy & Eggs",
    description:
      "Wholesome dairy products and free-range eggs. From milk and yogurt to artisanal cheese.",
    image: DairyCat,
  },
  {
    id: 3,
    title: "Meat & Seafood",
    description:
      "High-quality, responsibly sourced meat and seafood. Choose from fresh cuts, marinated options, and more.",
    image: SeaFoodCat,
  },
];
