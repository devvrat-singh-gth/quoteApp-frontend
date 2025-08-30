import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import AllQuotes from "./pages/AllQuotes";
import AddQuote from "./pages/AddQuote";
import SingleQuote from "./pages/SingleQuote";
import YourQuotes from "./pages/YourQuotes";
import EditQuote from "./pages/EditQuote";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [navHeight, setNavHeight] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dark mode state lifted here
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div
        className={`flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800 overflow-x-hidden transition-colors duration-300`}
      >
        <Navbar
          onHeightChange={setNavHeight}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          darkMode={darkMode} // pass darkMode props
          setDarkMode={setDarkMode}
        />

        <div className="flex flex-col flex-grow bg-emerald-100 dark:bg-gray-800">
          <main className={`flex-grow transition-all duration-300 w-full`}>
            <Routes>
              <Route
                path="/"
                element={<HomePage navHeight={navHeight} menuOpen={menuOpen} />}
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/quotes" element={<AllQuotes />} />
              <Route path="/your-quotes" element={<YourQuotes />} />
              <Route path="/add-quote" element={<AddQuote />} />
              <Route path="/quote/:id" element={<SingleQuote />} />
              <Route path="/edit-quote/:id" element={<EditQuote />} />
            </Routes>
            <ToastContainer />
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
