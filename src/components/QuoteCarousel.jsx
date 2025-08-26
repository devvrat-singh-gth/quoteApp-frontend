import React, { useState, useEffect, useRef } from "react";
import QuoteCard from "./QuoteCard";

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

  const next = () => {
    setStartIndex((prev) => (prev + cardsToShow) % quotes.length);
  };

  const prev = () => {
    setStartIndex(
      (prev) => (prev - cardsToShow + quotes.length) % quotes.length
    );
  };

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
    <div className="relative max-w-full mx-auto flex flex-col items-center lg:flex-row lg:items-center lg:justify-center">
      {/* Prev Button - Top on small screens, left on lg+ */}
      {hasMultipleQuotes && (
        <button
          onClick={prev}
          aria-label="Previous quotes"
          className="z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition mb-4 lg:mb-0 lg:mr-4"
        >
          &#8592;
        </button>
      )}

      {/* Quote Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 transition-all w-full">
        {visibleQuotes.map((quote, idx) => (
          <QuoteCard key={idx} quote={quote} />
        ))}
      </div>

      {/* Next Button - Bottom on small screens, right on lg+ */}
      {hasMultipleQuotes && (
        <button
          onClick={next}
          aria-label="Next quotes"
          className="z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition mt-4 lg:mt-0 lg:ml-4"
        >
          &#8594;
        </button>
      )}
    </div>
  );
};

export default QuoteCarousel;
