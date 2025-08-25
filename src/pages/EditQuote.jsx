import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";

const EditQuote = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [password, setPassword] = useState(""); // current password (required if existing)
  const [newPassword, setNewPassword] = useState(""); // new password (optional)
  const [existingPassword, setExistingPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill form with quote data
  useEffect(() => {
    if (location.state?.quote) {
      const quote = location.state.quote;
      setTitle(quote.title);
      setContent(quote.content);
      setAuthor(quote.author);
      setTags(quote.tags.join(", "));
      setExistingPassword(quote.password || null);
      setPassword(""); // Reset current password input
      setNewPassword(""); // Reset new password input
    } else {
      async function fetchQuote() {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/quotes/${id}?includePassword=true`
          );
          const quote = response.data;
          setTitle(quote.title);
          setContent(quote.content);
          setAuthor(quote.author);
          setTags(quote.tags.join(", "));
          setExistingPassword(quote.password || null);
          setPassword("");
          setNewPassword("");
        } catch (error) {
          toast.error("Error loading quote data");
          navigate("/quotes");
        }
      }
      fetchQuote();
    }
  }, [id, location.state, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    // Only require current password if quote currently has a password
    if (existingPassword && !password.trim()) {
      toast.error("Please enter your current password to update the quote.");
      return;
    }

    const updatedQuote = {
      title,
      content,
      author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      // If no existing password, don't send current password
      ...(existingPassword ? { password: password.trim() } : {}),
      // Send new password only if provided, otherwise don't send
      ...(newPassword.trim() ? { newPassword: newPassword.trim() } : {}),
    };

    try {
      setIsLoading(true);
      await axios.put(
        `http://localhost:8080/api/v1/quotes/${id}`,
        updatedQuote
      );
      toast.success("Quote updated successfully!");
      navigate(`/quote/${id}`);
    } catch (error) {
      console.log(error);
      toast.error("Error updating quote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-2xl py-10 mx-auto">
      <h1 className="flex items-center justify-center gap-2 text-4xl text-gray-700 font-bold mb-8 text-center dark:bg-gray-100">
        Edit Quote <SquarePen width={32} height={32} />
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        {/* Title */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter your Quote Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            name="author"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Author of the quote"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Quote Content*
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Write the quote here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            name="tags"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="e.g., motivation, happiness, life"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Current Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Current Password{existingPassword ? "*" : " (Not required)"}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required={!!existingPassword}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder={
              existingPassword
                ? "Enter your current password to edit"
                : "No current password set"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label
            htmlFor="newPassword"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            New Password (optional)
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Set or change password to protect this quote"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <small className="text-sm text-gray-500">
            [Current Password: {existingPassword || "None"}]
          </small>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="relative inline-block px-8 py-3 text-white font-semibold rounded-lg overflow-hidden group transition-all duration-300 disabled:opacity-50"
          >
            {/* Glowing animated background */}
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-fuchsia-500 rounded-lg blur opacity-80 group-hover:opacity-100 transition duration-300"></span>

            {/* Animated border */}
            <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-pink-500 rounded-lg animate-neon-border"></span>

            {/* Button text */}
            <span className="relative z-10">
              {isLoading ? "Updating..." : "Update Quote"}
            </span>
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditQuote;
