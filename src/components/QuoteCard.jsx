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
        className="group h-full flex flex-col justify-between bg-white text-black 
        rounded-[25px] border-double border-10 border-black p-6 shadow-md transition-all duration-300 ease-in-out 
        hover:shadow-xl hover:bg-green-100 cursor-pointer"
      >
        <h3
          className="text-xl sm:text-2xl italic mb-2 font-bold break-words leading-snug"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {quote.title}
        </h3>

        <div className="mt-auto text-sm font-handwriting mt-6">
          <p className="text-left self-start mt-2 text-sm text-gray-600 font-semibold transition-colors duration-300 group-hover:text-purple-700 w-full">
            Click to learn about quote
          </p>

          <p className="mt-2">
            <span className="font-semibold group-hover:underline">By</span>{" "}
            {quote.author}
            <br />
            <span className="font-semibold group-hover:underline">
              Created at
            </span>{" "}
            {formatDate(quote.createdAt)}
          </p>
        </div>

        {quote.tags && quote.tags.length > 0 && (
          <div className="mt-3">
            {quote.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 hover:bg-purple-100 hover:text-purple-600 text-xs px-2 py-1 rounded mx-2 mb-5"
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

// import React from "react";
// import { Link } from "react-router-dom";

// const QuoteCard = ({ quote }) => {
//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <Link to={`/quote/${quote._id}`} className="block h-full">
//       <article
//         className="h-full flex flex-col justify-between bg-white text-black dark:bg-white dark:text-black
//         rounded-lg shadow-xl p-6 border hover:shadow-lg hover:bg-indigo-100 transition-all duration-300 ease-in-out cursor-pointer"
//       >
//         {/* Main Quote */}
//         <h3 className="text-2xl font-serif italic mb-2 text-gray-800">
//           {quote.title}
//         </h3>

//         {/* Explanation */}
//         <p className="text-gray-600 mb-4 line-clamp-3">{quote.content}</p>

//         {/* Author & Date */}
//         <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
//           <span>By {quote.author}</span>
//           <span>Created at {formatDate(quote.createdAt)}</span>
//         </div>

//         {/* Tags */}
//         {quote.tags && quote.tags.length > 0 && (
//           <div className="mt-3">
//             {quote.tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         )}
//       </article>
//     </Link>
//   );
// };

// export default QuoteCard;
