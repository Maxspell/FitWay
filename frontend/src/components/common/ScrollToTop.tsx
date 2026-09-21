"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (scrollHeight > 0) {
      const progress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
      setScrollProgress(progress);
    }

    // Show button if user has scrolled down past threshold (e.g. 100px)
    if (scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circular progress calculation
  // Radius = 20, Circumference = 2 * PI * 20 ≈ 125.66
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-4 pointer-events-none scale-90"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#1e232a]/90 hover:bg-[#252b34] text-white shadow-xl shadow-black/40 backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] group"
      >
        {/* SVG Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
          viewBox="0 0 48 48"
        >
          {/* Background track circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="text-white/15"
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Active progress circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="text-[#FF8C00] transition-[stroke-dashoffset] duration-150 ease-out"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>

        {/* Center Arrow Icon matching the screenshot */}
        <ArrowUp className="w-5 h-5 text-white/90 group-hover:text-white transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={2.5} />
      </button>
    </div>
  );
}
