import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
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
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
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
              className="px-4 py-2 border rounded hover:bg-gray-100"
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

  useEffect(() => {
    async function fetchSingleQuote() {
      try {
        // Build URL with entered password if available
        const url = enteredPassword
          ? `https://quoteapp-backend-1.onrender.com/api/v1/quotes/${id}?password=${enteredPassword}&includePassword=true`
          : `https://quoteapp-backend-1.onrender.com/api/v1/quotes/${id}?includePassword=true`;

        const response = await axios.get(url);
        setQuote(response.data);
      } catch (error) {
        toast.error("Quote not found or incorrect password!");
        navigate("/quotes");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSingleQuote();
  }, [id, navigate, enteredPassword]);

  // Open password modal if quote is password protected; else navigate or show delete confirm
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
      // Try fetching quote with the given password to validate
      await axios.get(
        `https://quoteapp-backend-1.onrender.com/api/v1/quotes/${id}`,
        {
          params: { password: inputPassword },
        }
      );

      // Password valid - proceed
      setShowPwdModal(false);
      setEnteredPassword(inputPassword);

      if (actionType === "edit") {
        navigate(`/edit-quote/${id}`, {
          state: { password: inputPassword }, // pass password to edit page
        });
      } else if (actionType === "delete") {
        setShowConfirmModal(true);
      }
    } catch (error) {
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
    } catch (error) {
      toast.error("Error deleting quote");
    } finally {
      setShowConfirmModal(false);
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-800 mx-auto"></div>
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
    <main>
      <div className="max-w-4xl py-10 mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <Link
              to="/quotes"
              className="text-purple-700 hover:text-pink-500 mb-4 flex items-center gap-1"
            >
              <ArrowLeft />
              Back to All Quotes
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>

            <div className="flex justify-between items-center text-gray-600 mb-6">
              <div>
                <h6 className="font-bold">
                  By <span> {author}</span>
                </h6>
                <span className="font-semibold">Created At </span>
                <span>
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-md font-semibold hover:bg-green-700 transition-colors"
                  onClick={() => openPasswordModal("edit")}
                >
                  Edit Quote
                </button>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-md font-semibold hover:bg-red-700 transition-colors"
                  onClick={() => openPasswordModal("delete")}
                >
                  Delete Quote
                </button>
              </div>
            </div>

            {tags && tags.length > 0 && (
              <div className="mb-6">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 hover:bg-purple-100 text-blue-500 hover:text-purple-900 text-sm px-3 py-1 rounded-full mr-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            <div className="text-blue-700 leading-relaxed whitespace-pre-line text-2xl font-serif">
              <h6 className="mt-4 mb-4 text-xl font-semibold text-gray-700">
                Quote Explanation By Author!!!!!!
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
