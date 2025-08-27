import { useState, useEffect, useRef, useCallback } from "react";
import QuoteCard from "../components/QuoteCard";

const QuoteCarousel = ({ quotes }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const timerRef = useRef(null);

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

  const next = useCallback(() => {
    setStartIndex((prev) => (prev + cardsToShow) % quotes.length);
  }, [cardsToShow, quotes.length]);

  const prev = useCallback(() => {
    setStartIndex(
      (prev) => (prev - cardsToShow + quotes.length) % quotes.length
    );
  }, [cardsToShow, quotes.length]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => next(), 15000);
  }, [next]);

  useEffect(() => {
    resetTimer();

    const events = ["mousemove", "mousedown", "keydown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [resetTimer]);

  // Handle arrow click (no swipe handlers)
  const handleArrowClick = (direction) => {
    if (direction === "prev") prev();
    else next();
    resetTimer();
  };

  const visibleQuotes = [];
  for (let i = 0; i < cardsToShow; i++) {
    visibleQuotes.push(quotes[(startIndex + i) % quotes.length]);
  }

  const hasMultipleQuotes = quotes.length > cardsToShow;

  return (
    <div className="relative flex items-center justify-center max-w-full mx-auto">
      {hasMultipleQuotes && (
        <button
          onClick={() => handleArrowClick("prev")}
          aria-label="Previous quotes"
          className="z-10 bg-pink-600 dark:bg-pink-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition mr-4"
        >
          &#8592;
        </button>
      )}

      <div
        className={`grid gap-6 ${
          cardsToShow === 1
            ? "grid-cols-1"
            : cardsToShow === 2
            ? "grid-cols-2"
            : "grid-cols-3"
        } transition-all flex-1`}
      >
        {visibleQuotes.map((quote, idx) => (
          <div
            key={idx}
            className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
          >
            <QuoteCard quote={quote} />
          </div>
        ))}
      </div>

      {hasMultipleQuotes && (
        <button
          onClick={() => handleArrowClick("next")}
          aria-label="Next quotes"
          className="z-10 bg-pink-600 dark:bg-pink-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition ml-4"
        >
          &#8594;
        </button>
      )}
    </div>
  );
};

export default QuoteCarousel;
