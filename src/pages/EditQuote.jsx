import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import axios from "axios";
import { SquarePen, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const cleanQuote = (str) => {
  if (!str) return "";
  return str
    .trim()
    .replace(/^["'“”]+/, "")
    .replace(/["'“”]+$/, "");
};

const EditQuote = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [password, setPassword] = useState(""); // current password
  const [newPassword, setNewPassword] = useState(""); // new password
  const [existingPassword, setExistingPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const loadQuote = async () => {
      try {
        const quote = location.state?.quote
          ? location.state.quote
          : (
              await axios.get(
                `https://quoteapp-backend-1.onrender.com/api/v1/quotes/${id}?includePassword=true`
              )
            ).data;

        setTitle(cleanQuote(quote.title));
        setContent(quote.content);
        setAuthor(quote.author);
        setTags(quote.tags.join(", "));
        setExistingPassword(quote.password ? quote.password : null);
        setPassword(quote.password || "");
        setNewPassword("");
      } catch (error) {
        toast.error("Error loading quote data");
        navigate("/quotes");
      }
    };

    loadQuote();
  }, [id, location.state, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (existingPassword && !password.trim()) {
      toast.error("Please enter your current password to update the quote.");
      return;
    }

    const cleanedTitle = cleanQuote(title);

    const updatedQuote = {
      title: cleanedTitle,
      content,
      author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      password: password.trim(), // send current password for auth
    };

    // Include newPassword in payload if user entered one
    if (newPassword.trim()) {
      updatedQuote.newPassword = newPassword.trim();
    }

    try {
      setIsLoading(true);

      await axios.put(
        `https://quoteapp-backend-1.onrender.com/api/v1/quotes/${id}`,
        updatedQuote
      );

      toast.success("Quote updated successfully!");
      navigate("/your-quotes");
    } catch (error) {
      toast.error("Failed to update quote. Check password or try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-2xl py-4 mx-auto">
      <h1 className="flex items-center justify-center gap-2 text-4xl font-bold mb-8 text-center text-gray-700 dark:text-gray-200">
        Edit Quote <SquarePen width={32} height={32} />
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 transition-colors duration-300"
      >
        {/* Title */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Quote*
          </label>
          <input
            type="text"
            id="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-500"
            placeholder="Edit your quote"
            value={title}
            onChange={(e) => setTitle(cleanQuote(e.target.value))}
          />
        </div>

        {/* Author */}
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Author*
          </label>
          <input
            type="text"
            id="author"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-500"
            placeholder="Edit author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Quote Explanation*
          </label>
          <textarea
            id="content"
            required
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-500"
            placeholder="Edit quote explanation"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Tags*
          </label>
          <input
            type="text"
            id="tags"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-500"
            placeholder="Edit tags separated by commas"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Current Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Current Password{existingPassword ? "*" : " "}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-500"
              placeholder="Enter current password to authorize changes"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-300"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label
            htmlFor="newPassword"
            className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            New Password (optional)
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-500"
              placeholder="Set a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-300"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="relative inline-block px-8 py-3 text-white font-semibold rounded-lg overflow-hidden group transition-all duration-300 disabled:opacity-50"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-black via-green-600 to-lime-500 rounded-lg blur opacity-80 group-hover:opacity-100 transition duration-300"></span>
            <span className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-green-500 rounded-lg animate-neon-border"></span>
            <span className="relative z-10">
              {isLoading ? "Saving..." : "Save Changes"}
            </span>
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditQuote;
