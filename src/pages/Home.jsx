import { useState, useEffect } from "react";
import QuoteCard from "../components/QuoteCard";
import QuoteCarousel from "../components/QuoteCarousel";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../App.css";

const HomePage = ({ navHeight }) => {
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
    <main
      style={{ paddingTop: `clamp(3.5rem, ${navHeight}px, 7rem)` }}
      className="min-h-screen px-4 py-5 md:px-8 transition-all duration-300 bg-white dark:bg-gray-900"
    >
      {/* Hero Section */}
      <section
        className="m-4 sm:m-8 md:m-12 rounded-lg p-6 md:p-8 shadow-md animated-gradient-bg"
        style={{ minHeight: "400px" }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 h-full pt-6">
          {/* Hero Text Container */}
          <div className="flex-1 flex flex-col items-start text-left mt-6">
            <div className="w-full max-w-2xl">
              <h1 className="text-3xl md:text-6xl font-serif mb-4 text-red-800 gradient-text-glow lg:whitespace-nowrap">
                Welcome to{" "}
                <span className="text-blue-800 font-serif">QuoteVault</span>
              </h1>

              <p className="text-xl font-medium py-4 text-gray-100 gradient-text-glow leading-relaxed">
                A collection of inspiring, thoughtful, and powerful quotes
                shared by you—each one a beacon of insight, reflection, and
                wisdom...
              </p>
              <p className="text-xl font-medium py-1 text-gray-100 gradient-text-glow leading-relaxed">
                Here, voices from all walks of life come together to inspire and
                uplift any mind striving for some wise insights....
              </p>
            </div>
          </div>

          {/* Quote of the Day */}
          {recentQuotes.length > 0 && (
            <div className="flex-1 flex flex-col justify-start items-center max-w-md w-full mx-auto mt-6 lg:mt-0">
              <h2 className="font-bold text-3xl text-black dark:text-white md:text-4xl font-serif mb-2 px-10 underline italic gradient-text-glow text-center lg:text-left">
                Quote of the Day
              </h2>
              <div className="bg-gray-100/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg p-6 shadow-lg w-full">
                <QuoteCard quote={recentQuotes[1]} />
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 dark:border-lime-400 mx-auto"></div>
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
              <span className="absolute inset-0 bg-gradient-to-r from-black via-lime-800 to-green-900 dark:from-gray-900 dark:via-lime-900 dark:to-green-950 rounded-lg blur opacity-90 group-hover:opacity-100 transition duration-200"></span>
              <span className="relative z-10 gradient-text-glow">
                Share the First Quote
              </span>
              <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-green-500 rounded-lg animate-neon-border"></span>
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
  );
};

export default HomePage;
