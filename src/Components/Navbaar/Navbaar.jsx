import { useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TbMenu2, TbX } from "react-icons/tb";

const Navbaar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 sm:mb-20">
      <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-[12vh] md:h-[14vh] flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="text-3xl font-bold tracking-wide">
          Khu<span className="text-orange-500 uppercase">SH</span>vant
        </a>

        {/* Menu - Tablet + Desktop */}
        <ul className="hidden md:flex items-center gap-x-6 lg:gap-x-10">
          <li>
            <a href="#" className="font-semibold text-orange-500 transition duration-300">HOME</a>
          </li>
          {["About Us", "Process", "Contact Us"].map((item) => (
            <li key={item}>
              <a href="#" className="font-semibold text-zinc-800 hover:text-orange-500 transition duration-300">{item}</a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">

          {/* Search bar */}
          <div className="flex p-1 border-2 border-orange-500 rounded-full focus-within:ring-2 focus-within:ring-orange-400 transition-all">
            <input
              type="text"
              placeholder="Search"
              autoComplete="off"
              className="flex-1 h-[5vh] px-3 focus:outline-none"
            />
            <button className="bg-gradient-to-b from-red-600 to-orange-800 text-white w-10 h-10 flex justify-center items-center rounded-full text-2xl hover:scale-110 transition-all duration-200">
              <IoMdSearch />
            </button>
          </div>

          {/* Icons */}
          <a href="#" className="text-zinc-800 text-xl hover:text-orange-500 transition duration-300">
            <GoHeartFill />
          </a>
          <a href="#" className="text-zinc-800 text-2xl hover:text-orange-500 transition duration-300">
            <FaShoppingBag />
          </a>
        </div>

        {/* Hamburger - Mobile only */}
        <button
          className="text-zinc-800 text-3xl md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <TbX /> : <TbMenu2 />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div className={`md:hidden bg-white shadow-sm transition-all duration-300 overflow-hidden ${open ? "max-h-[500px] py-4" : "max-h-0"}`}>
        <ul className="flex flex-col gap-4 px-6">
          <li><a className="text-orange-500 font-semibold">HOME</a></li>
          {["About Us", "Process", "Contact Us"].map((item) => (
            <li key={item}><a className="text-zinc-800 font-semibold">{item}</a></li>
          ))}

          {/* Mobile Search */}
          <div className="flex p-1 border-2 border-orange-500 rounded-full mt-3">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-3 py-2 focus:outline-none"
            />
            <button className="bg-gradient-to-b from-red-600 to-orange-800 text-white w-10 h-10 flex justify-center items-center rounded-full">
              <IoMdSearch />
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex gap-6 text-2xl pt-2">
            <GoHeartFill className="text-zinc-800" />
            <FaShoppingBag className="text-zinc-800" />
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbaar;
