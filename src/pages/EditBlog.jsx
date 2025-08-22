import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      try {
        setIsFetching(true);
        const res = await axios.get(
          `https://blogapp-backend-vx02.onrender.com/api/v1/blogs/${id}`
        );
        const blog = res.data;
        setTitle(blog.title);
        setContent(blog.content);
        setAuthor(blog.author);
        setTags(blog.tags.join(", "));
      } catch (error) {
        toast.error("Failed to load blog data.");
      } finally {
        setIsFetching(false);
      }
    }
    fetchBlog();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedBlog = {
      title,
      content,
      author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    try {
      setIsLoading(true);
      await axios.put(
        `https://blogapp-backend-vx02.onrender.com/api/v1/blogs/${id}`,
        updatedBlog
      );
      toast.success("Blog updated successfully!");
      navigate("/blogs");
    } catch (error) {
      toast.error("Error updating blog. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return (
      <main className="max-w-2xl mx-auto text-center py-20 text-gray-600">
        Loading blog data...
        <div className="animate-spin rounded-full mt-40 h-20 w-20 border-b-2 border-amber-600 mx-auto"></div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto">
      <h1 className="flex items-center justify-center gap-2 text-4xl text-gray-700 font-bold mb-8 text-center dark:bg-gray-100">
        Edit Blog <SquarePen width={32} height={32} />
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter your Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-blue-200 focus:border-transparent"
            placeholder="Your name (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Content*
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-blue-200 focus:border-transparent"
            placeholder="Write your Blog Content here....."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter tags separated by commas (e.g., technology, react, programming)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditBlog;
