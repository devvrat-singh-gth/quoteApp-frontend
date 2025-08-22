import React from "react";
import { Link } from "react-router";

const BlogCard = ({ blog }) => {
  console.log(blog);
  const formateDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <article className="bg-white rounded-lg shadow-xl p-6 border hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        <Link to={`/blog/${blog._id}`}>{blog.title} </Link>
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>By {blog.author}</span>
        <span>Created at {formateDate(blog.createdAt)}</span>
      </div>
      {blog.tags && blog.tags.length > 0 && (
        <div className="mt-3">
          {blog.tags.map(function (tag, index) {
            return (
              <span
                key="{index}"
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2"
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}
    </article>
  );
};

export default BlogCard;
