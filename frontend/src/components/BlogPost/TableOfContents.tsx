"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
}

export default function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Gather headings on mount
    const elements = Array.from(document.querySelectorAll(".prose h2"));
    if (elements.length === 0) return;

    const newItems = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
    }));
    
    setItems(newItems);
    if (newItems.length > 0) {
      setActiveId(newItems[0].id);
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          
          // 1. Reading Progress
          const totalScrollable = documentHeight - windowHeight;
          if (totalScrollable > 0) {
            const progress = Math.min(100, Math.max(0, (scrollPosition / totalScrollable) * 100));
            setReadingProgress(progress);
          }

          // 2. Active Heading Scroll Spy
          const headingElements = Array.from(document.querySelectorAll(".prose h2"));
          const scrollOffset = 120; // Offset for header + some breathing room
          
          let currentActiveId = "";
          for (let i = 0; i < headingElements.length; i++) {
            const el = headingElements[i] as HTMLElement;
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            
            if (top <= scrollPosition + scrollOffset) {
              currentActiveId = el.id;
            } else {
              break;
            }
          }
          
          // Default to first if we haven't scrolled past it
          if (!currentActiveId && headingElements.length > 0) {
            currentActiveId = headingElements[0].id;
          }

          if (currentActiveId) {
            setActiveId((prev) => (prev !== currentActiveId ? currentActiveId : prev));
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check to set correct state on load if scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      setActiveId(id);
    }
  };

  if (items.length < 2) {
    return null; // Don't show TOC if there are less than 2 headings
  }

  return (
    <nav className="card backdrop-blur-md bg-[#1B2B3B]/90 border border-white/5 shadow-2xl transition-all duration-300 hidden lg:block">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
          Table of Contents
        </h3>
        <div className="text-xs font-bold text-[#FF8C00] bg-[#FF8C00]/10 px-2 py-1 rounded-md backdrop-blur-sm">
          {Math.round(readingProgress)}%
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-1 bg-black/20 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#FF8C00] to-[#FFA500] rounded-full transition-all duration-200 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="relative">
        {/* Left vertical line track */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

        <ul className="space-y-4 relative z-10">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`
                    group flex items-start gap-4 py-0.5 pr-3 text-sm transition-all duration-300
                    ${isActive ? "text-white" : "text-gray-400 hover:text-gray-200"}
                  `}
                >
                  {/* Indicator Dot/Pill */}
                  <div className="relative flex items-center justify-center w-[15px] pt-1.5 flex-shrink-0">
                    <div 
                      className={`
                        absolute transition-all duration-300
                        ${isActive 
                          ? "h-4 w-1 bg-[#FF8C00] rounded-full shadow-[0_0_12px_rgba(255,140,0,0.8)] scale-y-100" 
                          : "h-1.5 w-1.5 bg-gray-600 rounded-full group-hover:bg-gray-400 group-hover:scale-125"}
                      `}
                    />
                  </div>
                  
                  <span className={`leading-relaxed transition-all duration-300 ${isActive ? "font-medium translate-x-1 text-[#FF8C00]" : ""}`}>
                    {item.text}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
