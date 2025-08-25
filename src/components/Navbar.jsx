import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ onHeightChange, menuOpen, setMenuOpen }) => {
  const headerRef = useRef(null);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      onHeightChange(height);
    }
  }, [menuOpen, onHeightChange]);

  return (
    <header
      ref={headerRef}
      className="bg-gradient-to-r from-black via-purple-800 to-pink-800 text-white shadow-lg backdrop-blur-sm bg-opacity-80 border-b border-purple-500/30 z-50 relative"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-serif">
            Quote App
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md hover:bg-purple-200 dark:hover:bg-gray-700 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="text-yellow-400" size={20} />
              ) : (
                <Moon className="text-gray-300" size={20} />
              )}
            </button>

            {/* Links */}
            <Link to="/" className="text-xl font-semibold hover:text-pink-400">
              Home
            </Link>
            <Link
              to="/about"
              className="text-xl font-semibold hover:text-pink-400"
            >
              About
            </Link>
            <Link
              to="/your-quotes"
              className="text-xl font-semibold hover:text-pink-400"
            >
              Your Quotes
            </Link>
            <Link
              to="/quotes"
              className="text-xl font-semibold hover:text-pink-400"
            >
              All Quotes
            </Link>
          </nav>

          {/* MOBILE: Dark mode toggle + menu button */}
          <div className="flex items-center md:hidden space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md hover:bg-purple-200 dark:hover:bg-gray-700 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="text-yellow-400" size={20} />
              ) : (
                <Moon className="text-gray-300" size={20} />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="text-white text-3xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav menu */}
        <nav
          className={`${
            menuOpen ? "flex max-h-[400px]" : "hidden max-h-0"
          } flex-col items-start space-y-4 md:hidden px-4 pb-4 overflow-hidden transition-[max-height] duration-300 ease-in-out`}
          aria-hidden={!menuOpen}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-semibold"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-semibold"
          >
            About
          </Link>
          <Link
            to="/your-quotes"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-semibold"
          >
            Your Quotes
          </Link>
          <Link
            to="/quotes"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-semibold"
          >
            All Quotes
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
