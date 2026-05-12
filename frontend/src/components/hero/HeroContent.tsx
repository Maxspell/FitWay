"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Play, Star, Users } from "lucide-react";
import Link from "next/link";

export default function HeroContent() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col space-y-8"
    >
      {/* Badge */}
      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">
        <span className="flex h-2 w-2 rounded-full bg-[#FF8C00] animate-pulse"></span>
        <span className="text-sm font-medium text-gray-300">The Future of Fitness is Here</span>
      </motion.div>

      {/* Headline */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
          Elevate Your <br />
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#FF8C00] bg-[length:200%_auto] animate-gradient-x">
              Fitness Journey
            </span>
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute -bottom-2 left-0 h-1.5 bg-[#FF8C00]/30 rounded-full"
            />
          </span>
          <br />
          with AI Precision
        </h1>
        <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
          Transform your body with science-backed workout programs, personalized nutrition plans, and real-time progress tracking.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
        <Link 
          href="/workouts" 
          className="group relative px-8 py-4 bg-[#FF8C00] text-white rounded-2xl font-bold transition-all hover:bg-[#E67E00] hover:shadow-[0_0_20px_rgba(255,140,0,0.4)] flex items-center gap-2"
        >
          Start Training
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          href="/blog" 
          className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold transition-all hover:bg-white/10 flex items-center gap-2 backdrop-blur-sm"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Play className="h-4 w-4 fill-current ml-0.5" />
          </div>
          Explore Workouts
        </Link>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div variants={itemVariants} className="pt-8 flex items-center gap-12">
        <div className="flex flex-col">
          <div className="flex -space-x-3 mb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1B2B3B] bg-gray-800 overflow-hidden relative">
                <img 
                  src={`https://i.pravatar.cc/150?u=user${i}`} 
                  alt="User" 
                  className="object-cover"
                />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-[#1B2B3B] bg-[#243447] flex items-center justify-center text-[10px] font-bold text-white">
              10k+
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 text-[#FF8C00] fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-400 font-medium">10,000+ Happy Users</span>
          </div>
        </div>

        <div className="h-12 w-px bg-white/10 hidden md:block"></div>

        <div className="hidden md:flex flex-col justify-center">
          <p className="text-2xl font-bold text-white">4.9/5</p>
          <p className="text-sm text-gray-400">Average Rating</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
