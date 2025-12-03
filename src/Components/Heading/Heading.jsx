import React from "react";

const Heading = ({ heading, highlight }) => {
  return (
    <div className="w-fit mx-auto text-center">
      
      {/* Main Heading */}
      <h2 className="md:text-5xl text-4xl font-extrabold tracking-wide">
        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          {highlight}
        </span>{" "}
        <span className="text-zinc-800">{heading}</span>
      </h2>

      {/* Decorative Underline Box */}
      <div className="relative w-32 h-2 mx-auto mt-4 md:mt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>

        {/* Inner Glow Line */}
        <div className="absolute inset-0 w-20 h-1 mx-auto bg-white/60 rounded-full blur-sm mt-[2px]"></div>

        {/* Diamond shapes */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rotate-45"></div>
      </div>

    </div>
  );
};

export default Heading;
