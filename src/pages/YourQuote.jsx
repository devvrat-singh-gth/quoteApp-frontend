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
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Your Collection</h1>
        <Link
          to="/add-quote"
          className="relative inline-block px-6 py-3 text-white font-semibold rounded-lg overflow-hidden group transition-all duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-black via-pink-800 to-purple-900 rounded-lg blur opacity-90 group-hover:opacity-100 transition duration-200"></span>
          <span className="relative z-10 gradient-text-glow">New Quote</span>
          <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-pink-500 rounded-lg animate-neon-border"></span>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-600">Loading quotes...</div>
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
