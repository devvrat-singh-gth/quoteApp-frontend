import { Link } from "react-router";

const Navbar = function () {
  return (
    <header className="bg-amber-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            Blog App
          </Link>
          <nav className="space-x-6">
            <Link to="/" className="hover: text-blue-200 transition-colors">
              Home
            </Link>
            <Link
              to="/about"
              className="hover: text-blue-200 transition-colors"
            >
              About
            </Link>
            <Link
              to="/blogs"
              className="hover: text-blue-200 transition-colors"
            >
              Blogs
            </Link>
            <Link
              to="/add-blog"
              className="hover: text-blue-200 transition-colors"
            >
              Add Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
