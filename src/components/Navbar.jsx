import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Si4Chan } from "react-icons/si";

const Navbar = ({ onHeightChange, menuOpen, setMenuOpen }) => {
  const headerRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  // Check the dark mode preference from localStorage or system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Apply the dark mode class on body and update localStorage when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Adjust navbar height when menu is open
  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      onHeightChange(height);
    }
  }, [menuOpen, onHeightChange]);

  return (
    <header
      ref={headerRef}
      className="bg-gradient-to-r from-black via-green-800 to-lime-500 text-white shadow-lg backdrop-blur-sm bg-opacity-80 border-b border-purple-500/30 z-50 relative"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-3xl font-serif">
            <Si4Chan className="text-lime-400" />
            QuoteVault
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {/* Links */}
            <Link
              to="/"
              className="relative text-xl font-semibold gradient-text-glow 
                hover:text-green-800
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-green-800 
                after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="relative text-xl font-semibold gradient-text-glow 
                hover:text-green-800
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-green-800 
                after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </Link>
            <Link
              to="/your-quotes"
              className="relative text-xl font-semibold gradient-text-glow 
                hover:text-green-800
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-green-800 
                after:transition-all after:duration-300 hover:after:w-full"
            >
              Your Quotes
            </Link>
            <Link
              to="/quotes"
              className="relative text-xl font-semibold gradient-text-glow 
                hover:text-green-800
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-green-800 
                after:transition-all after:duration-300 hover:after:w-full"
            >
              All Quotes
            </Link>
          </nav>

          {/* Mobile: Dark mode toggle + menu button */}
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
