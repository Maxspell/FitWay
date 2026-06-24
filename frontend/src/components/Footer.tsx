"use client";

import Link from "next/link";
import { Dumbbell, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#243447] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-8 w-8 text-[#FF8C00]" />
              <span className="text-2xl font-bold">FitWay</span>
            </Link>
            <p className="text-gray-300">
              Transform your body with AI-powered workout programs and science-backed nutrition plans. Start your free fitness journey at FitWay today.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/workouts" className="nav-link">Workouts</Link></li>
              <li><Link href="/authors" className="nav-link">Authors</Link></li>
              <li><Link href="/blog" className="nav-link">Blog</Link></li>
              <li><Link href="/tools" className="nav-link">Tools</Link></li>
              <li><Link href="/about" className="nav-link">About Us</Link></li>
              <li><Link href="/contact" className="nav-link">Contact</Link></li>
            </ul>
            <h3 className="text-xl font-bold mt-8 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="nav-link">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="nav-link">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>456 Wellness Ave</li>
              <li>New York, NY 10001</li>
              <li>Phone: +1 (603) 842-3420</li>
              <li>Email: info@fitway.best</li>
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

        <div className="col-span-4 border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-xs leading-relaxed max-w-4xl mx-auto">
          <p className="mb-4">
            <strong>Medical Disclaimer:</strong> The content provided by FitWay, including text, graphics, images, and other material, is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
          </p>
          <p>&copy; {new Date().getFullYear()} FitWay. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;