"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="main nav">
      <ul className="flex gap-8">
        <li><Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          Home
        </Link></li>
        <li><Link href="/blog" className={`nav-link ${pathname === "/blog" ? "active" : ""}`}>
          Blog
        </Link></li>
        <li><Link href="/workouts" className={`nav-link ${pathname === "/workouts" ? "active" : ""}`}>
          Workouts
        </Link></li>
        <li><Link href="/tools" className={`nav-link ${pathname === "/tools" ? "active" : ""}`}>
          Tools
        </Link></li>
        <li><Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>
          About Us
        </Link></li>
        <li><Link href="/contact" className={`nav-link ${pathname === "/contact" ? "active" : ""}`}>
          Contact
        </Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;