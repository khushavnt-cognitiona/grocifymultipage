import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-14">
      {/* Container */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
          <p className="text-zinc-400 leading-relaxed">
            “Fresh groceries. Real-time delivery. Always affordable.”
            <br />
            “Groceryfy — Freshness at your doorstep, right on time.”
          </p>

          <div className="flex gap-4 mt-5 text-xl">
            <a href="#" className="hover:text-orange-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="/products" className="hover:text-orange-500 transition">Products</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Categories</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <div className="space-y-3 text-zinc-400">
            <p className="flex gap-3">
              <FaMapMarkerAlt className="text-orange-500 mt-1" />
              45, Sai Chowk Road, Hinjewadi Phase 1, Pune, Maharashtra – 411057
            </p>
            <p className="flex gap-3">
              <FaPhone className="text-orange-500 mt-1" />
              8208521420
            </p>
            <p className="flex gap-3">
              <FaEnvelope className="text-orange-500 mt-1" />
              khusujadhao329@gmail.com
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-zinc-400 mb-4">
            Subscribe to get updates on new products & special offers.
          </p>

          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-orange-500 transition"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-zinc-700 mt-10 pt-5 text-center text-zinc-500">
        <p>© {new Date().getFullYear()} Grocify MultiPage. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
