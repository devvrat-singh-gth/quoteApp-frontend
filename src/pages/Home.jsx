import { useState, useEffect } from "react";
import QuoteCard from "../components/QuoteCard";
import QuoteCarousel from "../components/QuoteCarousel";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Flower2 } from "lucide-react";
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
      style={{ paddingTop: `clamp(2rem, ${navHeight}px, 2rem)` }}
      className="min-h-screen px-4 py-5 md:px-8 transition-all duration-300 bg-emerald-200 dark:bg-gray-900"
    >
      {/* Hero Section */}
      <section
        className="m-4 sm:m-8 md:m-12 rounded-lg pt-4 pb-6 px-4 sm:pt-10 sm:pb-12 sm:px-6 border-4 border-black shadow-md static-gradient-bg"
        style={{ minHeight: "400px" }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 h-full ">
          {/* Hero Text Container */}
          <div className="flex-1 flex flex-col items-center text-center px-4 sm:px-6">
            <div className="w-full max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-5xl whitespace-nowrap font-serif mb-4 md:mb-10 text-amber-800 gradient-text-glow">
                <Flower2 />
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-red-800 font-serif">
                  Welcome to{" "}
                </span>
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-red-800 font-serif">
                  QuoteVault
                </span>
              </h1>

              <p className="font-medium pt-4 text-gray-800 dark:text-gray-200 gradient-text-glow leading-relaxed sm:text-left">
                A collection of inspiring, thoughtful, and powerful quotes
                shared by you—each one a beacon of insight, reflection, and
                wisdom...
              </p>
              <p className="hidden md:block text-xl text-left font-medium py-1 text-gray-800 dark:text-gray-200 gradient-text-glow leading-relaxed">
                These quotes are not only words but also reflections of life's
                deepest experiences. Each one is a window into the minds of
                thinkers, dreamers, and visionaries who have shaped our world.
              </p>
              <p className="hidden md:block text-xl text-left font-medium py-1 text-gray-800 dark:text-gray-200 gradient-text-glow leading-relaxed">
                Whether these words come from the past or are shared in the
                present moment, they offer valuable lessons for navigating our
                personal and collective journeys.
              </p>
            </div>
          </div>

          {/* Quote of the Day */}
          {recentQuotes.length > 0 && (
            <div className="flex-1 flex flex-col justify-start items-center max-w-lg lg:max-w-md w-full mx-auto mt-0 md:mt-8 lg:mt-0">
              <h2 className="font-bold text-3xl text-black dark:text-white md:text-4xl font-serif mb-2 px-10 underline italic gradient-text-glow text-center lg:text-left whitespace-nowrap">
                Quote of the Day
              </h2>
              <div
                className="
    bg-gray-100/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg 
    p-4 shadow-lg 
    w-[105%] max-w-none min-h-[450px] 
    sm:w-full sm:max-w-4xl sm:min-h-[auto]
    flex items-center justify-center
  "
              >
                <QuoteCard quote={recentQuotes[1]} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recent Quotes Section */}
      <section className="mb-24 max-w-7xl mx-auto px-2 sm:px-4">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-8 text-center underline italic gradient-text-glow">
          Recent Quotes
        </h2>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 dark:border-lime-400 mx-auto"></div>
          </div>
        ) : recentQuotes.length > 0 ? (
          <div className="w-full">
            <QuoteCarousel quotes={recentQuotes} />
          </div>
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
              <span className="absolute inset-0 bg-gradient-to-r from-black via-green-700 to-lime-700  rounded-lg blur opacity-90 group-hover:opacity-100 transition duration-200"></span>
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
