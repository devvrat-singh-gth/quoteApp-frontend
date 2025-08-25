import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-700 via-purple-900 to-fuchsia-800 text-white shadow-inner py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-base font-serif opacity-90">
          &copy; {new Date().getFullYear()} QuoteVault. All rights reserved.
        </p>
        <nav className="flex gap-6 text-lg font-semibold">
          <Link to="/" className="hover:text-pink-400 transition duration-300">
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-pink-400 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/your-quotes"
            className="hover:text-pink-400 transition duration-300"
          >
            Your Quotes
          </Link>
          <Link
            to="/quotes"
            className="hover:text-pink-400 transition duration-300"
          >
            All Quotes
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
