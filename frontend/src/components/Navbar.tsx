"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Scale,
  Apple,
  PieChart,
  Dumbbell,
  Heart,
  ArrowRight,
  Calculator,
  Sparkles,
} from "lucide-react";

export const TOOL_SUBITEMS = [
  {
    href: "/tools/bmi-calculator",
    label: "BMI Calculator",
    desc: "Body Mass Index screening & WHO health brackets",
    icon: Scale,
    badge: "Health",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    href: "/tools/calorie-calculator",
    label: "Daily Calorie & TDEE",
    desc: "Maintenance, deficit & muscle surplus with Mifflin-St Jeor",
    icon: Apple,
    badge: "Metabolism",
    color: "text-[#FF8C00] bg-[#FF8C00]/10 border-[#FF8C00]/20",
  },
  {
    href: "/tools/macro-calculator",
    label: "Macro Splitter (P/F/C)",
    desc: "Daily protein, fats & carbs by grams & meal portions",
    icon: PieChart,
    badge: "Nutrition",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    href: "/tools/one-rep-max-calculator",
    label: "One-Rep Max (1RM)",
    desc: "Epley & Brzycki formula with working weight zones",
    icon: Dumbbell,
    badge: "Strength",
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  {
    href: "/tools/ideal-weight-calculator",
    label: "Ideal Body Weight (IBW)",
    desc: "Devine, Robinson, Miller clinical formulas & WHO range",
    icon: Heart,
    badge: "Baseline",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuContainerRef = useRef<HTMLLIElement>(null);

  const isToolsActive = pathname === "/tools" || pathname.startsWith("/tools/");

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsToolsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsToolsOpen(false);
    }, 180);
  };

  // Close dropdown on route change
  useEffect(() => {
    setIsToolsOpen(false);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsToolsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav aria-label="main nav" className="hidden md:block">
      <ul className="flex items-center gap-8">
        <li>
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
            title="FitWay Home"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`nav-link ${pathname.startsWith("/blog") ? "active" : ""}`}
            title="Fitness Blog"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/workouts"
            className={`nav-link ${pathname.startsWith("/workouts") ? "active" : ""}`}
            title="Workout Programs & Exercises"
          >
            Workouts
          </Link>
        </li>

        {/* Tools Dropdown Item */}
        <li
          ref={menuContainerRef}
          className="relative py-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-1">
            <Link
              href="/tools"
              className={`nav-link inline-flex items-center gap-1.5 ${
                isToolsActive ? "active" : ""
              }`}
              title="Fitness Calculators Hub"
              onClick={() => setIsToolsOpen(false)}
            >
              Tools
            </Link>
            <button
              type="button"
              onClick={() => setIsToolsOpen((prev) => !prev)}
              aria-expanded={isToolsOpen}
              aria-haspopup="true"
              aria-label="Toggle Tools submenu"
              className={`p-1 rounded-md text-white/70 hover:text-[#FF8C00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] ${
                isToolsActive ? "text-[#FF8C00]" : ""
              }`}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isToolsOpen ? "rotate-180 text-[#FF8C00]" : ""
                }`}
              />
            </button>
          </div>

          {/* Premium Desktop Dropdown */}
          <AnimatePresence>
            {isToolsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 pt-2 z-50 w-[450px] pointer-events-auto"
              >
                <div className="relative rounded-2xl bg-[#1a2635]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-3 overflow-hidden">
                  {/* Subtle Top Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#FF8C00]/40 to-transparent" />

                  {/* Header Link to All Tools Hub */}
                  <div className="p-2.5 mb-1.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 flex items-center justify-center text-[#FF8C00] shrink-0">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white uppercase tracking-wider block">
                          Fitness Calculators Suite
                        </span>
                        <span className="text-[11px] text-gray-400 block truncate">
                          5 free science-backed calculation tools
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/tools"
                      onClick={() => setIsToolsOpen(false)}
                      className="text-xs font-bold text-[#FF8C00] hover:text-[#ff9d26] inline-flex items-center gap-1 group/hub transition-colors shrink-0 ml-2"
                    >
                      <span>All Tools Hub</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/hub:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  {/* 5 Tools List */}
                  <div className="grid grid-cols-1 gap-1">
                    {TOOL_SUBITEMS.map((item) => {
                      const Icon = item.icon;
                      const isCurrent = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsToolsOpen(false)}
                          className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 group/tool ${
                            isCurrent
                              ? "bg-white/10 border border-[#FF8C00]/30 shadow-sm"
                              : "hover:bg-white/5 border border-transparent hover:border-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${item.color} group-hover/tool:scale-105 transition-transform`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-sm font-bold truncate transition-colors ${
                                    isCurrent
                                      ? "text-[#FF8C00]"
                                      : "text-white group-hover/tool:text-[#FF8C00]"
                                  }`}
                                >
                                  {item.label}
                                </span>
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10 hidden sm:inline-block">
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 truncate mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </div>

                          <ArrowRight className="w-4 h-4 text-gray-500 opacity-0 group-hover/tool:opacity-100 group-hover/tool:translate-x-0.5 transition-all text-[#FF8C00] shrink-0 ml-2" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>

        <li>
          <Link
            href="/about"
            className={`nav-link ${pathname === "/about" ? "active" : ""}`}
            title="About Us"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
            title="Contact Us"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
