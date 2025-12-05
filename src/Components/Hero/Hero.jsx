import React from 'react';
import { Link } from 'react-router-dom';
import Grocery from '../../assets/images/grocery.png';
import Button from '../Button/Button';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-r from-orange-50 via-white to-green-50 overflow-x-hidden">

      {/* Floating Decorative Shapes */}
      <div className="absolute top-8 -left-8 w-32 h-32 sm:w-40 sm:h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 sm:w-60 sm:h-60 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Hero Container */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center gap-8
                      pt-12 sm:pt-16 md:pt-20 lg:pt-28"> {/* Responsive top padding */}

        {/* Hero Text */}
        <div className="flex-1 text-center lg:text-left relative z-10">
          <span className="bg-orange-100 text-orange-500 text-base sm:text-lg px-4 sm:px-5 py-1 sm:py-2 rounded-full inline-block mb-4 sm:mb-5 shadow-sm">
            Export best qualities...
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-snug sm:leading-tight md:leading-tight mb-4 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500">
            Tasty Organic <span className="text-orange-500">Fruits</span> & <span className="text-green-500">Veggies</span> <br />
            In Your City
          </h1>

          <p className="text-zinc-700 text-base sm:text-lg max-w-[480px] sm:max-w-[530px] mb-6 sm:mb-8 mx-auto lg:mx-0">
            Bred for a high content of beneficial substances, our products are all fresh and healthy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              content="Shop Now"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300"
            />
            
            <Link to="/shop">
              <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-2">
                ✨ Advanced Shop
              </button>
            </Link>

            <Link to="/realtime">
              <button className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-2 animate-pulse">
                ⚡ Real-Time Dashboard
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center lg:justify-end relative z-10">
          <img
            src={Grocery}
            alt="Hero img"
            className="w-64 sm:w-80 md:w-96 lg:w-full max-w-md lg:max-w-lg object-contain transform hover:scale-105 hover:rotate-1 transition-all duration-500"
          />
        </div>

      </div>

      {/* Additional floating blur circles */}
      <div className="absolute top-1/4 right-1/3 w-24 sm:w-32 h-24 sm:h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-20 sm:w-24 h-20 sm:h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>

    </section>
  );
};

export default Hero;
