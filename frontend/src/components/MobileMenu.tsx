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
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/tools", label: "Tools", icon: Calculator },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://twitter.com", label: "X / Twitter", icon: Twitter },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle body scroll and escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll and avoid layout shift by checking scrollbar width
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
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
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
              {/* Header Spacer (matches height of actual header) */}
              <div className="h-[72px] flex-shrink-0" />

              {/* Navigation Links */}
              <div className="flex-1 px-6 py-8 flex flex-col gap-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
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
                        <span className="font-medium text-lg">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="px-6 py-6 border-t border-white/5">
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#243447] to-[#1a2635] rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#FF8C00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-white font-bold text-lg mb-2 relative z-10">Start Your Fitness Journey</h3>
                  <p className="text-gray-400 text-sm mb-4 relative z-10">Get access to premium workout programs.</p>
                  <Link 
                    href="/workouts"
                    className="flex items-center justify-center gap-2 w-full bg-[#FF8C00] hover:bg-[#e67e00] text-white font-bold py-3 px-4 rounded-xl transition-colors relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a2635] focus-visible:ring-[#FF8C00]"
                  >
                    Explore Workouts
                  </Link>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="px-6 pb-8 pt-4 flex justify-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-gray-400 hover:text-[#FF8C00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] rounded-full p-1"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
