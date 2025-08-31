import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, PencilLine, Trash2, UserRoundPen } from "lucide-react";
import { toast } from "react-toastify";

import ConfirmDeleteModal from "../components/ConfirmDeleteModals";

const PasswordModal = ({ onClose, onSubmit, error }) => {
  const [inputPassword, setInputPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputPassword);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:text-black p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded"
            placeholder="Password"
            autoFocus
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SingleQuote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(null); // "edit" or "delete"
  const [error, setError] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [yourQuotes, setYourQuotes] = useState([]);

  // Load yourQuotes from localStorage once on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("myQuotes")) || [];
      setYourQuotes(saved);
    } catch {
      setYourQuotes([]);
    }
  }, []);

  // Fetch single quote, refetch if id or enteredPassword changes
  useEffect(() => {
    async function fetchSingleQuote() {
      setIsLoading(true);
      try {
        const url = enteredPassword
          ? `https://quoteapp-backend-1.onrender.com/api/v1/quotes/${id}?password=${enteredPassword}&includePassword=true`
          : `https://quoteapp-backend-1.onrender.com/api/v1/quotes/${id}?includePassword=true`;

        const response = await axios.get(url);
        setQuote(response.data);
      } catch {
        toast.error("Quote not found or incorrect password!");
        navigate("/quotes");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSingleQuote();
  }, [id, navigate, enteredPassword]);

  // Compute if current quote is in yourQuotes list
  const isInYourQuotes = yourQuotes.some((q) => q === id || q._id === id);

  function openPasswordModal(type) {
    if (!quote?.password) {
      if (type === "edit") {
        navigate(`/edit-quote/${id}`);
      } else if (type === "delete") {
        setShowConfirmModal(true);
      }
      return;
    }

    setActionType(type);
    setError("");
    setShowPwdModal(true);
  }

  async function handlePasswordSubmit(inputPassword) {
    try {
      // Validate password before proceeding
      await axios.get(
        `https://quoteapp-backend-1.onrender.com/api/v1/quotes/${id}`,
        {
          params: { password: inputPassword },
        }
      );

      setShowPwdModal(false);
      setEnteredPassword(inputPassword);

      if (actionType === "edit") {
        navigate(`/edit-quote/${id}`, {
          state: { password: inputPassword },
        });
      } else if (actionType === "delete") {
        setShowConfirmModal(true);
      }
    } catch {
      setError("Incorrect password! Please try again.");
    }
  }

  async function handleConfirmDelete() {
    try {
      await axios.delete(
        `https://quoteapp-backend-1.onrender.com/api/v1/quotes/${id}`,
        {
          params: { password: enteredPassword },
        }
      );
      toast.success("Quote Deleted!");
      navigate("/quotes");
    } catch {
      toast.error("Error deleting quote");
    } finally {
      setShowConfirmModal(false);
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-20 w-20 mt-20 border-b-4 border-green-800 mx-auto"></div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Quote Not Found
        </h1>
        <Link
          to="/quotes"
          className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
        >
          Back to All Quotes
        </Link>
      </div>
    );
  }

  const { author, content, createdAt, tags, title } = quote;

  return (
    <main className="mx-auto h-full w-full">
      <div className="w-full max-w-7xl py-10 mx-auto px-2 bg-emerald-100 dark:bg-gray-800">
        <div className="bg-white dark:bg-green-50 rounded-lg shadow-md p-6 sm:p-8 mx-4 sm:mx-10 max-w-full sm:max-w-none">
          <div className="mb-8">
            <Link
              to={isInYourQuotes ? "/your-quotes" : "/quotes"}
              className="text-green-700 hover:text-lime-500 mb-4 flex items-center gap-1"
            >
              <ArrowLeft />
              Back to {isInYourQuotes ? "Your Quotes" : "All Quotes"}
            </Link>
            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {(() => {
                const raw = title?.trim() || "";
                const cleaned = raw
                  .replace(/^["'“”]+/, "")
                  .replace(/["'“”]+$/, "");
                return `"${cleaned}"`;
              })()}
            </h1>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-600 my-8 gap-4">
              <div>
                <h6 className="font-bold italic">
                  By <span className="font-serif"> {author}</span>
                </h6>
                <span className="font-bold italic">Created At </span>
                <span className="font-serif">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg text-md font-semibold hover:bg-green-700 transition-colors"
                  onClick={() => openPasswordModal("edit")}
                >
                  <PencilLine className="mr-2" />
                  Edit Quote
                </button>

                <button
                  className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg text-md font-semibold hover:bg-red-700 transition-colors"
                  onClick={() => openPasswordModal("delete")}
                >
                  <Trash2 className="mr-2" />
                  Delete Quote
                </button>
              </div>
            </div>

            {tags && tags.length > 0 && (
              <div className="mb-6">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-200 hover:bg-purple-200 text-blue-500 hover:text-purple-900 text-sm px-3 py-1 rounded-full mr-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            <div className="text-blue-700 leading-relaxed whitespace-pre-line text-2xl font-serif">
              <h6 className="mt-4 mb-4 text-xl font-semibold text-gray-700 flex items-center">
                <UserRoundPen className="mr-2" />
                Quote Explanation By Author
              </h6>
              {content}
            </div>
          </div>
        </div>
      </div>

      {showPwdModal && (
        <PasswordModal
          onClose={() => setShowPwdModal(false)}
          onSubmit={handlePasswordSubmit}
          error={error}
        />
      )}

      {showConfirmModal && (
        <ConfirmDeleteModal
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  );
};

export default SingleQuote;
