"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import Navbar from "./Navbar";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 bg-[#243447] py-4 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-[#FF8C00]" />
          <span className="text-2xl font-bold">FITWAY</span>
        </Link>
        
        <Navbar />
      </div>
    </header>
  );
};

export default Header;