import { useState, useEffect, useRef } from "react";
import QuoteCard from "../components/QuoteCard";

const QuoteCarousel = ({ quotes }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const timerRef = useRef(null);

  // Responsive cards to show
  const updateCardsToShow = () => {
    const width = window.innerWidth;
    if (width >= 1024) setCardsToShow(3);
    else if (width >= 768) setCardsToShow(2);
    else setCardsToShow(1);
  };

  useEffect(() => {
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // Circular increment/decrement
  const next = () => {
    setStartIndex((prev) => (prev + 1) % quotes.length);
  };

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  // Auto slide after 15 seconds of inactivity
  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(next, 15000);
    };

    resetTimer();
    const events = ["mousemove", "mousedown", "keydown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [cardsToShow]);

  // Duplicate quotes for infinite looping
  const extendedQuotes = [...quotes, ...quotes];

  // Calculate translateX percent (negative) to slide cards smoothly
  // Each card width percentage based on cardsToShow
  const cardWidthPercent = 100 / cardsToShow;
  const translateX = -(startIndex * cardWidthPercent);

  const hasMultipleQuotes = quotes.length > 1;

  return (
    <div className="relative w-full max-w-screen-xl mx-auto px-4 flex items-center">
      {/* Prev Button */}
      {hasMultipleQuotes && (
        <button
          onClick={prev}
          aria-label="Previous quotes"
          className="z-10 bg-pink-600 dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition mr-4"
        >
          &#8592;
        </button>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden flex-1" style={{ maxWidth: "100%" }}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${(extendedQuotes.length * 100) / cardsToShow}%`,
            transform: `translateX(${translateX}%)`,
          }}
        >
          {extendedQuotes.map((quote, idx) => (
            <div
              key={idx}
              style={{
                flex: `0 0 ${cardWidthPercent}%`,
                maxWidth: `${cardWidthPercent}%`,
                padding: "0 0.75rem",
                boxSizing: "border-box",
              }}
            >
              <QuoteCard quote={quote} />
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      {hasMultipleQuotes && (
        <button
          onClick={next}
          aria-label="Next quotes"
          className="z-10 bg-pink-600 dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition ml-4"
        >
          &#8594;
        </button>
      )}
    </div>
  );
};

export default QuoteCarousel;
