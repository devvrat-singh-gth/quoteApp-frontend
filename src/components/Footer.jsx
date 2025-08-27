import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-lime-700 via-green-900 to-emerald-800 text-white shadow-inner py-4 md:py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-base font-serif opacity-90">
          &copy; {new Date().getFullYear()} QuoteVault. All rights reserved.
        </p>
        <nav className="flex flex-wrap gap-4 justify-center sm:justify-end text-sm sm:text-base font-semibold">
          <Link to="/" className="hover:text-green-300 transition duration-300">
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-green-300 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/your-quotes"
            className="hover:text-green-300 transition duration-300"
          >
            Your Quotes
          </Link>
          <Link
            to="/quotes"
            className="hover:text-green-300 transition duration-300"
          >
            All Quotes
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
