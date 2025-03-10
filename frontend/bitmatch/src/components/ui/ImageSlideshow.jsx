"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImageSlideshow({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (slideIndex) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(slideIndex);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    },
    [isTransitioning]
  );

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, items.length, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, items.length, goToSlide]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (!isTransitioning) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [goToNext, isTransitioning]);

  if (!items || items.length === 0) return null;

  const slideContentClasses = "absolute bottom-10 left-10 pl-20 pb-20 mr-40 z-10 text-left transition-transform duration-500 ease-in-out";
  const navButtonClasses = "absolute top-1/2 -translate-y-1/2 cursor-pointer z-20 hover:scale-110 transition-transform";

  return (
    <a href={items[currentIndex]?.link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="relative w-full h-[600px] bg-gray-200 overflow-hidden">
        <div className="h-full relative cursor-pointer">
          {items.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute top-0 left-0 w-full h-full z-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Darker Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50">
                <div className={`${slideContentClasses} ${index === currentIndex ? "translate-y-0 opacity-100 max-w-xl" : "translate-y-8 opacity-0"}`} >
                  <h2 className="text-3xl font-bold text-white mb-3">{slide.title}</h2>
                  <p className="mb-4 text-white">{slide.description}</p>
                  <Button variant="outline" className="bg-white hover:bg-gray-100">
                    View Project
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <div className={`${navButtonClasses} bg-white rounded-full p-1 shadow-md left-4`} onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
          <ChevronLeft size={36} className="text-black" />
        </div>

        {/* Right Arrow */}
        <div className={`${navButtonClasses} bg-white rounded-full p-1 shadow-md right-4`} onClick={(e) => { e.stopPropagation(); goToNext(); }}>
          <ChevronRight size={36} className="text-black" />
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center absolute bottom-4 left-0 right-0 z-20">
          {items.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={(e) => { e.stopPropagation(); goToSlide(slideIndex); }}
              className={`mx-1 w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                slideIndex === currentIndex ? "bg-white scale-110" : "border-2 border-white bg-gray-600 hover:bg-white"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </a>
  );
}
