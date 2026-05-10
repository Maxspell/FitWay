"use client";

import Image from "next/image";

import { Play, Share2, Heart, Clock, Flame, Trophy } from "lucide-react";
import { Workout } from "@/interfaces/workout";
import { motion } from "framer-motion";
import { getStrapiMedia } from "@/lib/utils";

interface Props {
  workout: Workout;
}

export default function WorkoutHero({ workout }: Props) {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end pb-12 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getStrapiMedia(workout.image.url)}
          alt={workout.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3B] via-[#1B2B3B]/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-[#FF8C00] text-white text-xs font-bold rounded-full uppercase tracking-wider">
              {workout.category.replace("-", " ")}
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">
              {workout.difficulty}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight uppercase">
            {workout.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl font-light leading-relaxed">
            {workout.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-white/90">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FF8C00]" />
              <span className="font-semibold">{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FF8C00]" />
              <span className="font-semibold">{workout.calories} kcal</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FF8C00]" />
              <span className="font-semibold">{workout.targetMuscleGroups}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-8 py-4 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-[#FF8C00]/20 transform hover:-translate-y-1">
              <Play className="w-5 h-5 fill-current" />
              START WORKOUT
            </button>
            <button className="flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl transition-all border border-white/10">
              <Heart className="w-5 h-5" />
              SAVE
            </button>
            <button className="flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl transition-all border border-white/10">
              <Share2 className="w-5 h-5" />
              SHARE
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
