import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";

const AddQuote = function () {
  const [quote, setQuote] = useState("");
  const [quoteExplanation, setQuoteExplanation] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const saveToLocalStorage = (newId) => {
    const existing = JSON.parse(localStorage.getItem("myQuotes") || "[]");
    localStorage.setItem("myQuotes", JSON.stringify([...existing, newId]));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const newQuote = {
      title: quote,
      content: quoteExplanation,
      author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      password: password.trim() !== "" ? password.trim() : undefined,
    };

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/v1/quotes",
        newQuote
      );

      // ✅ Save quote ID locally to mark this device's submission
      saveToLocalStorage(response.data._id);

      toast("New Quote Added!");
      navigate("/your-quotes");
    } catch (error) {
      console.log(error);
      toast("Error creating quote. Please try again!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-2xl py-4 mx-auto">
      <h1 className="flex items-center justify-center gap-2 text-4xl text-gray-700 font-bold mb-8 text-center dark:bg-gray-100">
        Share a New Quote <SquarePen width={32} height={32} />
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white-rounded-lg shadow-md p-6"
      >
        {/* Quote */}
        <div className="mb-6">
          <label
            htmlFor="quote"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Quote*
          </label>
          <input
            type="text"
            id="quote"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter the main quote here"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          />
        </div>

        {/* Author */}
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Author*
          </label>
          <input
            type="text"
            id="author"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Author of the Quote"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* Quote Explanation */}
        <div className="mb-6">
          <label
            htmlFor="quoteExplanation"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Quote Explanation*
          </label>
          <textarea
            id="quoteExplanation"
            required
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Explain the meaning or background of the quote..."
            value={quoteExplanation}
            onChange={(e) => setQuoteExplanation(e.target.value)}
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Tags*
          </label>
          <input
            type="text"
            id="tags"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter tags separated by commas (e.g., motivation, life)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Password (optional)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Set a password to protect this quote"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small className="text-sm text-gray-500">
            [Current PWD: {password || "None"}]
          </small>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="relative inline-block px-8 py-3 text-white font-semibold rounded-lg overflow-hidden group transition-all duration-300 disabled:opacity-50"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-fuchsia-500 rounded-lg blur opacity-80 group-hover:opacity-100 transition duration-300"></span>
            <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-pink-500 rounded-lg animate-neon-border"></span>
            <span className="relative z-10">
              {isLoading ? "Publishing..." : "Publish Quote"}
            </span>
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddQuote;
