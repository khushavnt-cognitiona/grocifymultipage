import React from "react";
import Heading from "../Heading/Heading";
import { FaHeart, FaLeaf, FaSeedling, FaShieldAlt } from "react-icons/fa";
import BasketFullImg from "../../assets/images/basket-full-vegetables.png";

const Values = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        <Heading highlight="Our" heading="Values" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mt-14">

          {/* Left Values */}
          <div className="flex flex-col gap-10 flex-1 w-full">
            {values.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className="flex gap-6 items-center lg:flex-row-reverse 
                text-center lg:text-right group"
              >
                <span className="flex justify-center items-center text-3xl text-white 
                  bg-gradient-to-b from-orange-400 to-orange-600 
                  w-16 h-16 rounded-full shadow-md group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-zinc-800 text-2xl font-semibold">{item.title}</h3>
                  <p className="text-zinc-600 mt-1">{item.para}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Image */}
         
<div className="flex justify-center items-center flex-1">
  <img
    src={BasketFullImg}
    alt="Basket full vegetables"
    className="
      w-[70%] 
      sm:w-[60%]
      md:w-[75%]
      lg:w-[90%] 
      xl:w-[95%]
      max-w-[500px]
      object-contain
      drop-shadow-xl 
      hover:scale-105 
      transition-all 
      duration-500
    "
  />
</div>


          {/* Right Values */}
          <div className="flex flex-col gap-10 flex-1 w-full">
            {values.slice(2, 4).map((item) => (
              <div
                key={item.id}
                className="flex gap-6 items-center group"
              >
                <span className="flex justify-center items-center text-3xl text-white 
                  bg-gradient-to-b from-orange-400 to-orange-600 
                  w-16 h-16 rounded-full shadow-md group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-zinc-800 text-2xl font-semibold">{item.title}</h3>
                  <p className="text-zinc-600 mt-1">{item.para}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Values;


const values = [
  {
    id: 1,
    title: "Trust",
    para: "We build trust by delivering fresh, safe, and honest products that you can rely on every day.",
    icon: <FaHeart />,
  },
  {
    id: 2,
    title: "Always Fresh",
    para: "Our produce is sourced daily to ensure everything you get is naturally fresh, clean, and full of nutrients.",
    icon: <FaLeaf />,
  },
  {
    id: 3,
    title: "Food Safety",
    para: "We follow strict quality and safety standards to provide food that is pure, clean, and responsibly handled.",
    icon: <FaShieldAlt />,
  },
  {
    id: 4,
    title: "100% Organic",
    para: "All our products are grown organically without chemicals, giving you healthier and more natural choices.",
    icon: <FaSeedling />,
  },
];
