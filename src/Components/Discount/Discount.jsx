import React from "react";

const Discount = () => {
  return (
    <section className="bg-zinc-100">
      <div className="py-10 text-center max-w-xl mx-auto px-4">
        <span className="text-3xl font-bold text-orange-500">20%</span>

        <div className="mt-4">
          <h3 className="text-2xl font-semibold">First Order Discount</h3>
          <p className="mt-2 text-zinc-700">
            Enjoy an exclusive first-order discount on our grocery website!  
            Shop fresh essentials and save big on your first purchase.  
            Fast delivery and quality guarantee.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Discount;
