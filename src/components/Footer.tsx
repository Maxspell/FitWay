import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#243447] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-8 w-8 text-[#FF8C00]" />
              <span className="text-2xl font-bold">6FIT</span>
            </Link>
            <p className="text-gray-300">
              Your journey to a healthier lifestyle starts here.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/workouts" className="nav-link">Workouts</Link></li>
              <li><Link to="/blog" className="nav-link">Blog</Link></li>
              <li><Link to="/tools" className="nav-link">Tools</Link></li>
              <li><Link to="/about" className="nav-link">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Fitness Street</li>
              <li>New York, NY 10001</li>
              <li>Phone: (603) 842-342</li>
              <li>Email: info@6fit.com</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 6FIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;