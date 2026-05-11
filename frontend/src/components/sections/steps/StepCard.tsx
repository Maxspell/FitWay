"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  visual?: ReactNode;
  isLast?: boolean;
}

export default function StepCard({
  number,
  title,
  description,
  icon: Icon,
  visual,
  isLast = false,
}: StepCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      className="relative group h-full"
    >
      {/* Glow Background */}
      <div className="absolute -inset-2 bg-gradient-to-b from-[#FF8C00]/20 to-transparent rounded-[40px] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10" />

      {/* Card Body */}
      <div className="h-full flex flex-col bg-[#1B2B3B]/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] overflow-hidden relative group-hover:shadow-[#FF8C00]/10">
        {/* Gradient Border Overlay (Visible on Hover) */}
        <div className="absolute inset-0 rounded-[32px] p-[1px] bg-gradient-to-br from-white/20 to-transparent opacity-100 group-hover:from-[#FF8C00] group-hover:to-orange-600/30 transition-all duration-500 -z-10" />
        <div className="absolute inset-[1px] rounded-[31px] bg-[#1B2B3B]/90 -z-10" />

        {/* Step Number Badge */}
        <div className="absolute top-6 right-8 text-6xl font-black text-white/[0.03] select-none group-hover:text-[#FF8C00]/10 group-hover:scale-110 transition-all duration-700">
          0{number}
        </div>

        {/* Icon & Title */}
        <div className="mb-6 relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF8C00] to-[#E67E00] flex items-center justify-center text-white shadow-lg shadow-[#FF8C00]/20 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-7 h-7" />
          </div>
        </div>

        <div className="space-y-4 flex-grow">
          <h3 className="text-2xl font-bold text-white group-hover:text-[#FF8C00] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Interactive Visual Placeholder */}
        <div className="mt-8 relative h-32 w-full flex items-center justify-center bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-all duration-500 overflow-hidden">
          {visual ? visual : (
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="w-1 h-8 bg-white/10 rounded-full group-hover:bg-[#FF8C00]/40 transition-all duration-500" 
                  style={{ 
                    height: `${20 + i * 20}%`,
                    transitionDelay: `${i * 100}ms` 
                  }} 
                />
              ))}
            </div>
          )}
          
          {/* Subtle scanning effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}
