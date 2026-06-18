"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="main nav" className="hidden md:block">
      <ul className="flex gap-8">
        <li><Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`} title="FitWay Home">
          Home
        </Link></li>
        <li><Link href="/blog" className={`nav-link ${pathname === "/blog" ? "active" : ""}`} title="Fitness Blog">
          Blog
        </Link></li>
        <li><Link href="/workouts" className={`nav-link ${pathname === "/workouts" ? "active" : ""}`} title="Workout Programs & Exercises">
          Workouts
        </Link></li>
        <li><Link href="/tools" className={`nav-link ${pathname === "/tools" ? "active" : ""}`} title="Fitness Calculators">
          Tools
        </Link></li>
        <li><Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`} title="About Us">
          About Us
        </Link></li>
        <li><Link href="/contact" className={`nav-link ${pathname === "/contact" ? "active" : ""}`} title="Contact Us">
          Contact
        </Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;