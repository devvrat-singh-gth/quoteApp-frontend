import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const SingleBlog = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(
    function () {
      async function fetchSingleBlog() {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/blogs/${id}`
          );
          setBlog(response.data);
          console.log(response.data);
        } catch {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchSingleBlog();
    },
    [id]
  );
  async function deleteBlog(id) {
    try {
      await axios.delete(`http://localhost:8080/api/v1/blogs/${id}`);
      toast("Blog Deleted!!!");
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      toast("Error deleting blog");
    }
  }
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
      </div>
    );
  }
  if (!blog) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Blog Not Found
        </h1>
        <Link
          to={"/blogs"}
          className="bg-amber-500 text-white px-6 py-3 rounded-lg font-smeibold hover: bg-amber-700 transition-colors"
        >
          Back to All Blogs
        </Link>
      </div>
    );
  }
  const { author, content, createdAt, tags, title, _id } = blog;
  return (
    <main>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header Section */}
          <div className="mb-8">
            <Link
              to={"/blogs"}
              className="text-amber-500 hover:text-amber-700 mb-4 flex items-center gap-1"
            >
              <ArrowLeft />
              Back to All Blogs
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>

            <div className="flex justify-between items-center text-gray-600 mb-6">
              <div>
                <span className="font-medium">By {author}</span>
                <span className="mx-2">.</span>
                <span>
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                onClick={() => deleteBlog(_id)}
              >
                Delete Blog
              </button>
            </div>
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="mb-6">
                {tags.map(function (tag, index) {
                  return (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2"
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          {/* Content */}

          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {content}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleBlog;
