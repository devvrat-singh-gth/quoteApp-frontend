import { useState, useEffect } from "react";
import { dummyBlogs } from "../data";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const HomePage = function () {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(function () {
    async function fetchRecentBlogs() {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/blogs");
        setRecentBlogs(response.data.slice(0, 3));
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch recent blogs!!!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentBlogs();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-amber-300 to-orange-600 text-white rounded-lg mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to BlogApp
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem, ab.
        </p>
      </section>

      {/* recent blogs section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Recent Blogs
        </h2>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          </div>
        ) : recentBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recentBlogs.map(function (blog) {
              return <BlogCard key={blog._id} blog={blog} />;
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No blogs available yet.</p>
            <Link
              to="/add-blog"
              className="bg-amber-300 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Write the First Blog
            </Link>
          </div>
        )}
        {recentBlogs.length > 0 && (
          <div className="text-center">
            <Link
              to={"/blogs"}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700"
            >
              View All Blogs
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
