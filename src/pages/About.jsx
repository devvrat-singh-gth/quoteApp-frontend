import Footer from "../components/Footer";

const AboutPage = function () {
  return (
    <>
      <main className="min-h-screen px-6 py-12 bg-emerald-100 dark:bg-gray-900 transition-colors duration-300">
        <h1 className="text-5xl font-bold mb-6 text-gray-700 dark:text-gray-200">
          About
        </h1>
        <p className="text-lg max-w-3xl leading-relaxed text-gray-600 dark:text-gray-300">
          Welcome to QuoteVault, your trusted source for inspiring, thoughtful,
          and powerful quotes shared by a passionate community of users.
          <br />
          <br />
          Our mission is to create a space where words have the power to uplift,
          motivate, and provoke deep reflection.
          <br />
          <br />
          Feel free to explore, share, and add your favorite quotes!
        </p>
      </main>
    </>
  );
};

export default AboutPage;
