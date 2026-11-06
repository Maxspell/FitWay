"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  FileText, 
  Dumbbell, 
  Calculator, 
  Info, 
  Mail, 
  Menu, 
  X,
  ChevronDown,
  Scale,
  Apple,
  PieChart,
  Heart,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/tools", label: "Tools", icon: Calculator, hasSubmenu: true },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

const toolSubItems = [
  { href: "/tools", label: "All Calculators Hub", icon: Calculator, badge: "Hub" },
  { href: "/tools/bmi-calculator", label: "BMI Calculator", icon: Scale, badge: "Health" },
  { href: "/tools/calorie-calculator", label: "Daily Calorie & TDEE", icon: Apple, badge: "Metabolism" },
  { href: "/tools/macro-calculator", label: "Macro Splitter (P/F/C)", icon: PieChart, badge: "Nutrition" },
  { href: "/tools/one-rep-max-calculator", label: "One-Rep Max (1RM)", icon: Dumbbell, badge: "Strength" },
  { href: "/tools/ideal-weight-calculator", label: "Ideal Body Weight", icon: Heart, badge: "Baseline" },
];

const socialLinks = [
  { href: "https://www.facebook.com/fitway.best/", label: "Facebook", icon: Facebook },
  { href: "https://www.instagram.com/fitway.best/", label: "Instagram", icon: Instagram },
  { href: "https://x.com/fitway_best", label: "X (Twitter)", icon: Twitter },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isToolsExpanded, setIsToolsExpanded] = useState(pathname.startsWith("/tools"));
  const menuRef = useRef<HTMLElement>(null);

  // Close menu on route change & keep tools open if on a tools route
  useEffect(() => {
    setIsOpen(false);
    if (pathname.startsWith("/tools")) {
      setIsToolsExpanded(true);
    }
  }, [pathname]);

  // Handle body scroll and escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const menuVariants = {
    hidden: { x: "100%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
    visible: { 
      x: 0, 
      transition: { 
        duration: 0.4, 
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        when: "beforeChildren",
        staggerChildren: 0.05,
      } 
    },
    exit: { x: "100%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  };

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="relative z-[60] p-2 text-white hover:text-[#FF8C00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] rounded-md"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.nav
              id="mobile-menu"
              ref={menuRef}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-[#1a2635] border-l border-white/5 z-50 flex flex-col overflow-y-auto overscroll-contain shadow-2xl"
              aria-label="Mobile Navigation"
            >
              {/* Drawer Header with Logo & Spacing for Close Button */}
              <div className="h-[72px] px-5 pr-14 flex items-center border-b border-white/5 flex-shrink-0">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 group"
                >
                  <Dumbbell className="h-7 w-7 text-[#FF8C00] group-hover:scale-110 transition-transform" />
                  <span className="text-xl font-bold tracking-tight text-white">FITWAY</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 px-4 py-6 flex flex-col gap-1.5">
                {menuItems.map((item) => {
                  const isActive = item.href === "/" 
                    ? pathname === "/" 
                    : pathname.startsWith(item.href);

                  // Specialized Submenu Item for Tools
                  if (item.hasSubmenu) {
                    return (
                      <motion.div key={item.href} variants={itemVariants} className="space-y-1">
                        <div
                          className={`flex items-center justify-between rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-[#FF8C00]/10 text-[#FF8C00]"
                              : "text-gray-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex-1 flex items-center gap-3.5 px-4 py-3"
                          >
                            <item.icon
                              className={`w-5 h-5 transition-transform duration-300 ${
                                isActive ? "text-[#FF8C00]" : "text-gray-400"
                              }`}
                            />
                            <span className="font-semibold text-base">{item.label}</span>
                          </Link>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsToolsExpanded((prev) => !prev);
                            }}
                            aria-expanded={isToolsExpanded}
                            aria-label="Toggle Tools Submenu"
                            className="p-3 text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] rounded-xl hover:bg-white/5 transition-colors"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                isToolsExpanded ? "rotate-180 text-[#FF8C00]" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {/* Accordion Submenu */}
                        <AnimatePresence initial={false}>
                          {isToolsExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden pl-3 ml-4 border-l border-white/10 space-y-1 pt-1 pb-1"
                            >
                              {toolSubItems.map((sub) => {
                                const isSubActive = pathname === sub.href;
                                const SubIcon = sub.icon;
                                return (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors group ${
                                      isSubActive
                                        ? "bg-white/10 text-[#FF8C00] font-bold border border-[#FF8C00]/30"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <SubIcon
                                        className={`w-3.5 h-3.5 shrink-0 ${
                                          isSubActive
                                            ? "text-[#FF8C00]"
                                            : "text-gray-400 group-hover:text-white"
                                        }`}
                                      />
                                      <span className="truncate">{sub.label}</span>
                                    </div>
                                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 shrink-0 ml-2">
                                      {sub.badge}
                                    </span>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  // Standard Top-Level Menu Items
                  return (
                    <motion.div key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group
                          ${isActive 
                            ? "bg-[#FF8C00]/10 text-[#FF8C00]" 
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                          }
                        `}
                      >
                        <item.icon 
                          className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 
                            ${isActive ? "text-[#FF8C00]" : "text-gray-400 group-hover:text-white"}
                          `} 
                        />
                        <span className="font-semibold text-base">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="px-4 py-5 border-t border-white/5">
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#243447] to-[#1a2635] rounded-2xl p-5 border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#FF8C00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-white font-bold text-base mb-1 relative z-10">Start Your Fitness Journey</h3>
                  <p className="text-gray-400 text-xs mb-3.5 relative z-10">Access science-backed workout routines.</p>
                  <Link 
                    href="/workouts"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-[#FF8C00] hover:bg-[#e67e00] text-[#1B2B3B] font-extrabold text-sm py-2.5 px-4 rounded-xl transition-colors relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00]"
                  >
                    Explore Workouts
                  </Link>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="px-6 pb-6 pt-3 border-t border-white/5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3 text-center">
                  Follow FitWay
                </div>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 flex items-center justify-center text-gray-300 hover:text-[#FF8C00] transition-all hover:scale-105"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
