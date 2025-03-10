"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCardLarge from "@/components/project/ProjectCardLarge";

export default function ProjectCarousel({ projects }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth;
      const totalWidth = containerWidth * (projects.length / visibleCards);
      setMaxScroll(totalWidth - containerWidth);
    }
  }, [projects.length, visibleCards]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth / visibleCards;
      const newPosition = Math.max(scrollPosition - cardWidth, 0);
      setScrollPosition(newPosition);
      carouselRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth / visibleCards;
      const newPosition = Math.min(scrollPosition + cardWidth, maxScroll);
      setScrollPosition(newPosition);
      carouselRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-1 shadow-md"
        disabled={scrollPosition <= 0}
      >
        <ChevronLeft size={24} className={scrollPosition <= 0 ? "text-gray-300" : "text-black"} />
      </button>

      <div
        ref={carouselRef}
        className="flex overflow-x-hidden scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
      {projects.map((project, index) => (
        <div
          key={project.id || `project-${index}`} // Ensures a unique key, even if `id` is missing
          className={`flex-shrink-0 px-1 ${
            visibleCards === 1 ? "w-full" : visibleCards === 2 ? "w-1/2" : "w-1/3"
          }`}
        >
          <ProjectCardLarge project={project} />
        </div>
      ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-1 shadow-md"
        disabled={scrollPosition >= maxScroll}
      >
        <ChevronRight size={24} className={scrollPosition >= maxScroll ? "text-gray-300" : "text-black"} />
      </button>
    </div>
  );
}
