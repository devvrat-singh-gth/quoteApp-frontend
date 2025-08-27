import { useState, useEffect, useRef } from "react";
import QuoteCard from "../components/QuoteCard";

const QuoteCarousel = ({ quotes }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

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
    setStartIndex((prev) => (prev + 1) % quotes.length);
  };

  const prev = () => {
    setStartIndex((prev) =>
      prev === 0 ? quotes.length - 1 : (prev - 1) % quotes.length
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
      clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) next();
    else if (diff < -50) prev();
  };

  const hasMultipleQuotes = quotes.length > 1;

  // Determine width per card in %
  const cardWidthPercent = 100 / cardsToShow;
  const translateX = -(startIndex * cardWidthPercent);

  return (
    <div
      className="relative overflow-hidden max-w-full mx-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {hasMultipleQuotes && (
        <button
          onClick={prev}
          aria-label="Previous quotes"
          className="z-10 bg-pink-600 dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition
          absolute top-1/2 left-2 transform -translate-y-1/2 sm:static"
        >
          &#8592;
        </button>
      )}

      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${quotes.length * cardWidthPercent}%`,
            transform: `translateX(${translateX}%)`,
          }}
        >
          {quotes.map((quote, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 px-2"
              style={{ width: `${cardWidthPercent}%` }}
            >
              <div
                className={`mx-auto w-full ${
                  cardsToShow === 1
                    ? "max-w-[360px]"
                    : "max-w-xs sm:max-w-sm lg:max-w-md"
                }`}
              >
                <QuoteCard quote={quote} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {hasMultipleQuotes && (
        <button
          onClick={next}
          aria-label="Next quotes"
          className="z-10 bg-pink-600 dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-purple-700 hover:text-white transition
          absolute top-1/2 right-2 transform -translate-y-1/2 sm:static"
        >
          &#8594;
        </button>
      )}
    </div>
  );
};

export default QuoteCarousel;
