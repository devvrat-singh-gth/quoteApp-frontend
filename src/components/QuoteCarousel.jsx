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
    <div className="relative w-full max-w-screen-xl mx-auto px-4">
      {/* Navigation Arrows (responsive placement) */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        {hasMultipleQuotes && (
          <button
            onClick={prev}
            aria-label="Previous quotes"
            className="bg-white dark:bg-gray-800 p-2 lg:p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition text-lg lg:text-2xl"
          >
            &#8592;
          </button>
        )}

        {hasMultipleQuotes && (
          <button
            onClick={next}
            aria-label="Next quotes"
            className="bg-white dark:bg-gray-800 p-2 lg:p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition text-lg lg:text-2xl"
          >
            &#8594;
          </button>
        )}
      </div>

      {/* Quote Cards Carousel */}
      <div className="flex justify-center items-stretch gap-6 overflow-x-auto pb-4">
        {visibleQuotes.map((quote, idx) => (
          <div
            key={idx}
            className="flex-none w-[85vw] sm:w-[45vw] lg:w-[30vw] transition-all duration-300"
          >
            <QuoteCard quote={quote} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteCarousel;
