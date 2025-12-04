import React, { useState } from "react";
import Heading from "../Heading/Heading";
import productList from "../ProductList/productList";
import Card from "../Card/Card";

const Products = () => {
  const categories = ["All", "Fruits", "Vegetables", "Dairy", "Seafood"];
  const [activeTab, setActiveTab] = useState("All");

  // Filter products
  const filteredProducts =
    activeTab === "All"
      ? productList
      : productList.filter((product) => product.category === activeTab);


  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-10 py-20">
        {/* Heading */}
        <Heading highlight="Our" heading="Products" />

        {/* Category Tabs */}
        <div className="flex gap-3 justify-center mt-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-5 py-2 text-lg rounded-xl cursor-pointer transition-all duration-300
              ${
                activeTab === category
                  ? "bg-gradient-to-b from-orange-400 to-orange-500 text-white shadow-md"
                  : "bg-zinc-100 text-black hover:bg-zinc-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Listing */}
        {/* Product Listing */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
  {filteredProducts.map((product) => (
    <Card
      key={product.id}
      title={product.title}
      price={product.price}
      image={product.image}
      description={product.description}
      rating={product.rating}
      reviews={product.reviews}
      weight={product.weight}
      origin={product.origin}
    />
  ))}
</div>

      </div>
    </section>
  );
};

export default Products;
