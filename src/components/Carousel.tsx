import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";

const Carousel = ({ result }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === result.banner.length - 1 ? 0 : prevIndex + 1,
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [result.banner.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="">
      <img
        src={result.banner[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
        className="h-full w-full object-cover "
      />

      <div className="flex items-center justify-between bg-white px-6 py-4">
        <div className="flex gap-4">
          {result.banner.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-3 w-3 rounded-full ${currentIndex === idx ? "bg-black" : "bg-gray-400"}`}
            ></button>
          ))}
        </div>
        <div>
          <button className="flex items-center gap-2 bg-transparent">
            <span className="font-semibold text-cyan-400">View All</span>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
