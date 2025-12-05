import React from "react";
import Button from "../Button/Button";
import DisCountImg from "../../assets/images/fresh-fruits.png";

const Discount = () => {
  return (
    <section className="bg-zinc-100 py-16">
      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 items-center gap-10">

        {/* LEFT TEXT SIDE */}
        <div className="text-center md:text-left">
          <span className="text-7xl md:text-8xl lg:text-[150px] font-bold text-orange-500 leading-none">
            20%
          </span>

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            First Order Discount
          </h3>

          <p className="text-zinc-700 my-6 max-w-[600px] text-lg">
            Enjoy an exclusive first-order discount on our grocery website!  
            Shop fresh essentials and save big on your first purchase.  
            Fast delivery and quality guarantee.
          </p>

          <Button content="Get a Discount" />
        </div>

        {/* RIGHT IMAGE SIDE */}
        <div className="flex justify-center md:justify-end">
          <img
            src={DisCountImg}
            alt="Discount"
            className="
              w-60        /* Mobile */
              sm:w-72     /* Small screens */
              md:w-[350px] /* Tablets */
              lg:w-[450px] /* Laptop */
              xl:w-[550px] /* Big screens */
              object-contain
            "
          />
        </div>
      </div>
    </section>
  );
};

export default Discount;
