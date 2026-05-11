"use client";

import { motion } from "framer-motion";
import { Activity, Flame, Heart, CheckCircle2, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function HeroVisuals() {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
      {/* Main Image with Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-[300px] h-[450px] lg:w-[380px] lg:h-[550px] z-10"
      >
        <div className="absolute inset-0 bg-[#FF8C00]/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
        <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
          <Image 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop"
            alt="Fitness Training"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3B] via-transparent to-transparent opacity-60"></div>
        </div>
      </motion.div>

      {/* Floating Cards */}
      
      {/* 1. Activity Progress Card */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-10 right-0 lg:-right-10 z-20"
      >
        <div className="bg-[#1B2B3B]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-4 min-w-[200px]">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Weekly Progress</p>
            <p className="text-lg font-bold text-white">+24%</p>
          </div>
          <div className="ml-auto">
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
        </div>
      </motion.div>

      {/* 2. Calories Burned Card */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-20 left-0 lg:-left-12 z-20"
      >
        <div className="bg-[#1B2B3B]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl flex flex-col gap-2 min-w-[160px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF8C00]/20 rounded-full flex items-center justify-center text-[#FF8C00]">
              <Flame className="h-5 w-5" />
            </div>
            <span className="text-xs text-gray-400 font-medium">Calories</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white">1,240</span>
            <span className="text-xs text-gray-400 font-medium">kcal</span>
          </div>
          {/* Mini progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.5, delay: 1 }}
              className="h-full bg-[#FF8C00]"
            />
          </div>
        </div>
      </motion.div>

      {/* 3. Heart Rate Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.6 
        }}
        className="absolute top-1/2 -right-4 lg:-right-8 z-20"
      >
        <div className="bg-[#1B2B3B]/80 backdrop-blur-xl border border-white/10 p-3 rounded-full shadow-xl flex items-center gap-3 pr-5">
          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 animate-pulse">
            <Heart className="h-5 w-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Heart Rate</span>
            <span className="text-lg font-bold text-white leading-none">128 BPM</span>
          </div>
        </div>
      </motion.div>

      {/* 4. Workout Success Toast */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-10 right-4 lg:right-0 z-20"
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 py-2 px-4 rounded-full shadow-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-white">Morning Workout Complete</span>
        </div>
      </motion.div>

      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full -z-10 opacity-50"></div>
    </div>
  );
}
