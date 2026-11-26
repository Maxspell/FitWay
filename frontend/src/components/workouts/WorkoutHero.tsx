"use client";

import Image from "next/image";

import { Play, Share2, Clock, Flame, Trophy } from "lucide-react";
import { Workout } from "@/interfaces/workout";
import { motion } from "framer-motion";
import { getStrapiMedia } from "@/lib/utils";

interface Props {
  workout: Workout;
}

export default function WorkoutHero({ workout }: Props) {
  return (
    <section className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-end pt-20 sm:pt-24 pb-10 sm:pb-12 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={workout.image?.url ? getStrapiMedia(workout.image.url) : 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438'}
          alt={workout.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2B3B]/75 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3B] via-[#1B2B3B]/65 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-4 sm:mb-6">
            <span className="px-3 py-1 bg-[#C25700] text-white text-xs font-bold rounded-full uppercase tracking-wider">
              {workout.category.replace("-", " ")}
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">
              {workout.difficulty}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-black mb-4 leading-[1.12] uppercase max-w-5xl break-words">
            {workout.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 font-light leading-relaxed max-w-3xl">
            {workout.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 mb-6 sm:mb-8 text-white/90 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FF8C00] shrink-0" />
              <span className="font-semibold">{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FF8C00] shrink-0" />
              <span className="font-semibold">{workout.calories} kcal</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FF8C00] shrink-0" />
              <span className="font-semibold">{workout.targetMuscleGroups}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#first-exercise"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#C25700] hover:bg-[#A34600] text-white font-bold rounded-2xl transition-colors shadow-lg hover:shadow-[#C25700]/25 cursor-pointer text-sm sm:text-base"
            >
              <Play className="w-5 h-5 fill-current shrink-0" />
              START WORKOUT
            </a>
            <a
              href="#share-section"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl transition-colors border border-white/15 hover:border-white/30 cursor-pointer text-sm sm:text-base"
            >
              <Share2 className="w-5 h-5 shrink-0" />
              SHARE
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
