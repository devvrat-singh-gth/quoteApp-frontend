import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import QuoteCard from "../components/QuoteCard";

const YourQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          "https://quoteapp-backend-1.onrender.com/api/v1/quotes"
        );

        // ✅ Get locally stored quote IDs
        const savedIds = JSON.parse(localStorage.getItem("myQuotes") || "[]");

        // ✅ Filter only the quotes that match saved IDs
        const filtered = response.data.filter((quote) =>
          savedIds.includes(quote._id)
        );

        setQuotes(filtered);
      } catch (error) {
        console.error("Error fetching your quotes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <main className="min-h-screen m-auto px-4 py-8 bg-emerald-200 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h1 className="px-1 font-bold text-gray-800 dark:text-white">
          <span className="text-4xl md:text-6xl font-serif">
            Your Collection
          </span>
        </h1>

        <Link
          to="/add-quote"
          className="relative inline-block px-8 py-6 text-white font-semibold rounded-lg overflow-hidden group transition-all duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-black via-green-700 to-lime-700 rounded-lg blur opacity-90 group-hover:opacity-100 transition duration-200"></span>
          <span className="relative z-10  gradient-text-glow whitespace-nowrap">
            New Quote
          </span>
          <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-green-500 rounded-lg animate-neon-border"></span>
        </Link>
      </div>

      {isLoading ? (
        <div>
          <div className="animate-spin rounded-full mt-20 h-20 w-20 border-b-4 border-green-800 mx-auto"></div>
          <h1 className="text-center py-8 text-gray-600 ">Loading quotes...</h1>
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No quotes added yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {quotes.map((quote) => (
            <QuoteCard key={quote._id} quote={quote} />
          ))}
        </div>
      )}
    </main>
  );
};

export default YourQuotes;
