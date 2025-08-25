import React from "react";
import { Link } from "react-router-dom";

const QuoteCard = ({ quote }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link to={`/quote/${quote._id}`} className="block h-full">
      <article
        className="h-full flex flex-col justify-between bg-white text-black dark:bg-white dark:text-black
        rounded-lg shadow-xl p-6 border hover:shadow-lg hover:bg-indigo-100 transition-all duration-300 ease-in-out cursor-pointer"
      >
        {/* Main Quote */}
        <h3 className="text-2xl font-serif italic mb-2 text-gray-800">
          {quote.title}
        </h3>

        {/* Explanation */}
        <p className="text-gray-600 mb-4 line-clamp-3">{quote.content}</p>

        {/* Author & Date */}
        <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
          <span>By {quote.author}</span>
          <span>Created at {formatDate(quote.createdAt)}</span>
        </div>

        {/* Tags */}
        {quote.tags && quote.tags.length > 0 && (
          <div className="mt-3">
            {quote.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
};

export default QuoteCard;
