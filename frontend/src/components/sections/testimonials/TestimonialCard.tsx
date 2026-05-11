"use client";

import { motion } from "framer-motion";
import { Star, Quote, TrendingUp } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  avatar: string;
  achievement: string;
  rating: number;
  stats?: {
    label: string;
    value: string;
  };
}

export default function TestimonialCard({ 
  name, 
  role, 
  text, 
  avatar, 
  achievement, 
  rating,
  stats 
}: TestimonialCardProps) {
  return (
    <div className="group relative h-full">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF8C00]/20 to-transparent rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 flex flex-col gap-6 transition-all duration-500 group-hover:translate-y-[-8px] group-hover:border-[#FF8C00]/30">
        
        {/* Quote Icon */}
        <div className="absolute top-6 right-8 text-[#FF8C00]/10 group-hover:text-[#FF8C00]/20 transition-colors">
          <Quote size={48} fill="currentColor" />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#FF8C00]/50 transition-colors">
            <Image 
              src={avatar} 
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white group-hover:text-[#FF8C00] transition-colors">{name}</h4>
            <p className="text-gray-400 text-sm">{role}</p>
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-xs font-bold uppercase tracking-wider">
          <TrendingUp size={14} />
          {achievement}
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-300 leading-relaxed italic flex-grow">
          "{text}"
        </p>

        {/* Footer info */}
        <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
          {/* Rating */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < rating ? "text-[#FF8C00] fill-[#FF8C00]" : "text-white/10"} 
              />
            ))}
          </div>

          {/* Optional Stats */}
          {stats && (
            <div className="text-right">
              <span className="block text-[#FF8C00] font-bold text-lg">{stats.value}</span>
              <span className="block text-gray-500 text-[10px] uppercase tracking-tighter">{stats.label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
