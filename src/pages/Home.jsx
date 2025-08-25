import { useState, useEffect, useRef } from "react";
import QuoteCard from "../components/QuoteCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/Footer"; // Import footer
import "../App.css";

const QuoteCarousel = ({ quotes }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const timerRef = useRef(null);

  const updateCardsToShow = () => {
    const width = window.innerWidth;
    if (width >= 1024) setCardsToShow(3);
    else if (width >= 768) setCardsToShow(2);
    else setCardsToShow(1);
  };

  useEffect(() => {
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const next = () => {
    setStartIndex((prev) => (prev + cardsToShow) % quotes.length);
  };

  const prev = () => {
    setStartIndex(
      (prev) => (prev - cardsToShow + quotes.length) % quotes.length
    );
  };

  // Auto slide after 15 seconds of inactivity
  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(next, 15000);
    };

    resetTimer();
    const events = ["mousemove", "mousedown", "keydown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [cardsToShow]);

  const visibleQuotes = quotes.slice(startIndex, startIndex + cardsToShow);
  if (visibleQuotes.length < cardsToShow) {
    visibleQuotes.push(...quotes.slice(0, cardsToShow - visibleQuotes.length));
  }

  // Show arrows only if more than one quote
  const hasMultipleQuotes = quotes.length > 1;

  return (
    <div className="relative flex items-center justify-center max-w-full mx-auto">
      {/* Prev Button */}
      {hasMultipleQuotes && (
        <button
          onClick={prev}
          aria-label="Previous quotes"
          className="z-10 bg-pink-600 dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition mr-4"
        >
          &#8592;
        </button>
      )}

      {/* Quote Cards Container */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 transition-all flex-1">
        {visibleQuotes.map((quote, idx) => (
          <QuoteCard key={idx} quote={quote} />
        ))}
      </div>

      {/* Next Button */}
      {hasMultipleQuotes && (
        <button
          onClick={next}
          aria-label="Next quotes"
          className="z-10 bg-pink-600 dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition ml-4"
        >
          &#8594;
        </button>
      )}
    </div>
  );
};

const HomePage = ({ navHeight, menuOpen }) => {
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentQuotes() {
      try {
        const response = await axios.get(
          "https://quoteapp-backend-1.onrender.com/api/v1/quotes"
        );
        setRecentQuotes(response.data.slice(0, 10));
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch recent quotes!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentQuotes();
  }, []);

  return (
    <>
      <main
        style={{
          paddingTop: `clamp(3.5rem, ${navHeight}px, 7rem)`,
        }}
        className="min-h-screen px-4 py-5 md:px-8 transition-all duration-300 bg-white dark:bg-gray-900"
      >
        {/* Hero Section */}
        <section
          className="m-4 sm:m-8 md:m-12 rounded-lg p-6 md:p-8 shadow-md animated-gradient-bg"
          style={{ minHeight: "400px" }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 h-full pt-6">
            {/* Left Side: Welcome Content */}
            <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left mt-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-400 gradient-text-glow">
                Welcome to <span className="text-lime-200">QuoteVault</span>
              </h1>

              <p className="text-xl font-medium max-w-xl py-6 text-emerald-100 gradient-text-glow text-center lg:text-left">
                A collection of inspiring, thoughtful, and powerful quotes
                shared by you.
              </p>
            </div>

            {/* Right Side: Quote of the Day */}
            {recentQuotes.length > 0 && (
              <div className="flex-1 flex flex-col justify-start items-center max-w-md w-full mx-auto mt-6 lg:mt-0">
                <h2 className="font-bold text-3xl md:text-4xl font-serif mb-2 px-10 underline italic gradient-text-glow text-center lg:text-left">
                  Quote of the Day
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-full">
                  <QuoteCard quote={recentQuotes[0]} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Recent Quotes Section */}
        <section className="mb-24 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8 text-center underline italic gradient-text-glow">
            Recent Quotes
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-800 dark:border-pink-400 mx-auto"></div>
            </div>
          ) : recentQuotes.length > 0 ? (
            <QuoteCarousel quotes={recentQuotes} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                No quotes available yet.
              </p>
              <Link
                to="/add-quote"
                className="relative inline-block px-6 py-3 text-white font-semibold rounded-lg overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-black via-pink-800 to-purple-900 dark:from-gray-900 dark:via-pink-900 dark:to-purple-950 rounded-lg blur opacity-90 group-hover:opacity-100 transition duration-200"></span>
                <span className="relative z-10 gradient-text-glow">
                  Share the First Quote
                </span>
                <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-pink-500 rounded-lg animate-neon-border"></span>
              </Link>
            </div>
          )}

          {recentQuotes.length > 0 && (
            <div className="text-center mt-8">
              <Link
                to="/quotes"
                className="relative inline-block px-6 py-3 text-white font-semibold rounded-lg overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-black via-pink-800 to-purple-900 dark:from-gray-900 dark:via-pink-900 dark:to-purple-950 rounded-lg blur opacity-90 group-hover:opacity-100 transition duration-200"></span>
                <span className="relative z-10 gradient-text-glow">
                  View All Quotes
                </span>
                <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-pink-500 rounded-lg animate-neon-border"></span>
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default HomePage;
