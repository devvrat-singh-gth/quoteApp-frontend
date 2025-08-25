import { useState, useEffect } from "react";
import QuoteCard from "../components/QuoteCard";
import { Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const AllQuotes = function () {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchQuotes() {
      try {
        const response = await axios.get(
          "https://quoteapp-backend-1.onrender.com/api/v1/quotes"
        );
        setQuotes(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to get all quotes!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  return (
    <main>
      <div className="text-center mb-8 py-5">
        <h1 className="text-5xl text-gray-700 font-extrabold mb-12 dark:bg-gray-100">
          All Quotes
        </h1>
        <p className="text-gray-600 font-bold text-4xl mb-6">
          Explore all the inspiring thoughts shared by the community!
        </p>
      </div>

      <section>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full mt-20 h-20 w-20 border-b-2 border-pink-800 mx-auto"></div>
          </div>
        ) : quotes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {quotes.map(function (quote) {
              return <QuoteCard key={quote._id} quote={quote} />;
            })}
          </div>
        ) : (
          <div className="text-center py-25">
            <p className="text-gray-500 mb-4">No quotes available yet.</p>
            <Link
              to="/add-quote"
              className="relative inline-block px-6 py-3 text-white font-semibold rounded-lg overflow-hidden group transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-black via-pink-800 to-purple-900 rounded-lg blur opacity-90 group-hover:opacity-100 transition duration-200"></span>
              <span className="relative z-10 gradient-text-glow">
                Write the First Quote
              </span>
              <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-pink-500 rounded-lg animate-neon-border"></span>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default AllQuotes;
