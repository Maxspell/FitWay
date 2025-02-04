"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-[#243447] py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-[#FF8C00]" />
          <span className="text-2xl font-bold">6FIT</span>
        </Link>
        
        <div className="flex gap-8">
          <Link href="/" className={`nav-link ${pathname === "/" ? "text-white" : ""}`}>
            Home
          </Link>
          <Link href="/blog" className={`nav-link ${pathname === "/blog" ? "text-white" : ""}`}>
            Blog
          </Link>
          <Link href="/workouts" className={`nav-link ${pathname === "/workouts" ? "text-white" : ""}`}>
            Workouts
          </Link>
          <Link href="/tools" className={`nav-link ${pathname === "/tools" ? "text-white" : ""}`}>
            Tools
          </Link>
          <Link href="/about" className={`nav-link ${pathname === "/about" ? "text-white" : ""}`}>
            About Us
          </Link>
          <Link href="/contact" className={`nav-link ${pathname === "/contact" ? "text-white" : ""}`}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;