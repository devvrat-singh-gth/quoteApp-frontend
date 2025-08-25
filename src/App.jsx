import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import AllQuotes from "./pages/AllQuotes";
import AddQuote from "./pages/AddQuote";
import SingleQuote from "./pages/SingleQuote";
import YourQuotes from "./pages/YourQuote";
import EditQuote from "./pages/EditQuote";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [navHeight, setNavHeight] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Changed min-h-screen to min-h-full */}
      <div className="flex flex-col min-h-full bg-gray-50 dark:bg-gray-800">
        <Navbar
          onHeightChange={setNavHeight}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <main
          className="flex-grow transition-all duration-300 container mx-auto px-4"
          style={{ paddingTop: menuOpen ? navHeight - 250 : navHeight - 80 }}
        >
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
        </main>

        <Footer />

        <ToastContainer position="top-center" style={{ marginBottom: 0 }} />
      </div>
    </BrowserRouter>
  );
};

export default App;
