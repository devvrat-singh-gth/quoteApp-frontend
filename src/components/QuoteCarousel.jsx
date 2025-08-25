import React, { useState, useEffect, useRef } from "react";
import QuoteCard from "./QuoteCard";

const QuoteCarousel = ({ quotes }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const timerRef = useRef(null);

  const updateCardsToShow = () => {
    const width = window.innerWidth;
    if (width >= 1024) setCardsToShow(3); // large screens
    else if (width >= 768) setCardsToShow(2); // tablets
    else setCardsToShow(1); // mobile
  };

  useEffect(() => {
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const next = () => {
    setStartIndex((prev) => (prev + cardsToShow) % quotes.length);
  };

  const prev = () => {
    setStartIndex(
      (prev) => (prev - cardsToShow + quotes.length) % quotes.length
    );
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

  const visibleQuotes = quotes.slice(startIndex, startIndex + cardsToShow);
  if (visibleQuotes.length < cardsToShow) {
    visibleQuotes.push(...quotes.slice(0, cardsToShow - visibleQuotes.length));
  }

  const hasMultipleQuotes = quotes.length > 1;

  return (
    <div className="relative flex items-center justify-center max-w-full mx-auto">
      {/* Prev button: show only if multiple quotes */}
      {hasMultipleQuotes && (
        <button
          onClick={prev}
          aria-label="Previous quotes"
          className="z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition mr-4"
        >
          &#8592;
        </button>
      )}

      {/* Carousel container */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 transition-all flex-1">
        {visibleQuotes.map((quote, idx) => (
          <QuoteCard key={idx} quote={quote} />
        ))}
      </div>

      {/* Next button: show only if multiple quotes */}
      {hasMultipleQuotes && (
        <button
          onClick={next}
          aria-label="Next quotes"
          className="z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition ml-4"
        >
          &#8594;
        </button>
      )}
    </div>
  );
};

export default QuoteCarousel;
