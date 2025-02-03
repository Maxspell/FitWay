import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-[#243447] py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-[#FF8C00]" />
          <span className="text-2xl font-bold">6FIT</span>
        </Link>
        
        <div className="flex gap-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/workouts" className="nav-link">Workouts</Link>
          <Link to="/tools" className="nav-link">Tools</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;