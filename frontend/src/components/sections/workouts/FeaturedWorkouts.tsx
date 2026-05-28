"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Flame, Dumbbell, Target, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/interfaces/workout";
import { getStrapiMedia } from "@/lib/utils";

interface FeaturedWorkoutsProps {
  workouts: Workout[];
}

const WorkoutCard = ({ workout, index }: { workout: Workout; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/workouts/${workout.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#243447]/50 backdrop-blur-xl border border-white/5 hover:border-[#FF8C00]/30 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:-translate-y-2">
          
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF8C00]/0 via-[#FF8C00]/0 to-[#FF8C00]/0 group-hover:via-[#FF8C00]/10 transition-all duration-1000 blur-2xl opacity-0 group-hover:opacity-100" />

          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={getStrapiMedia(workout.image?.url)}
              alt={workout.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3B] via-[#1B2B3B]/20 to-transparent opacity-80" />
            <div className="absolute inset-0 bg-[#FF8C00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badges */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#FF8C00] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg shadow-[#FF8C00]/20">
                {workout.difficulty}
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-full border border-white/10">
                {workout.category}
              </span>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
              <div className="w-16 h-16 bg-[#FF8C00] rounded-full flex items-center justify-center shadow-2xl shadow-[#FF8C00]/40 transform">
                <Play className="h-7 w-7 text-white fill-current ml-1" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 relative">
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#FF8C00] transition-colors leading-tight">
              {workout.title}
            </h3>
            
            <p className="text-gray-400 text-sm line-clamp-2 mb-6 group-hover:text-gray-300 transition-colors">
              {workout.description}
            </p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-[#FF8C00]/5 group-hover:border-[#FF8C00]/10 transition-all">
                <div className="w-8 h-8 rounded-xl bg-[#FF8C00]/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#FF8C00]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Duration</span>
                  <span className="text-xs font-bold text-white">{workout.duration} Min</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-[#FF8C00]/5 group-hover:border-[#FF8C00]/10 transition-all">
                <div className="w-8 h-8 rounded-xl bg-[#FF8C00]/10 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-[#FF8C00]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Calories</span>
                  <span className="text-xs font-bold text-white">{workout.calories} Kcal</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#FF8C00]" />
                <span className="text-xs font-medium text-gray-400">{workout.targetMuscleGroups}</span>
              </div>
              <div className="flex items-center gap-1 text-[#FF8C00] font-bold text-xs uppercase tracking-widest group-hover:gap-2 transition-all">
                Start <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const FeaturedWorkoutsSkeleton = () => (
  <section className="py-32 bg-[#1B2B3B]">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-end mb-16">
        <div className="w-1/2 h-20 bg-white/5 rounded-2xl animate-pulse" />
        <div className="w-48 h-14 bg-white/5 rounded-2xl animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-[2rem] bg-[#243447]/50 border border-white/5 overflow-hidden animate-pulse">
            <div className="h-64 bg-white/5" />
            <div className="p-8">
              <div className="h-8 bg-white/5 rounded-lg w-3/4 mb-4" />
              <div className="h-4 bg-white/5 rounded-lg w-full mb-8" />
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="h-14 bg-white/5 rounded-2xl" />
                <div className="h-14 bg-white/5 rounded-2xl" />
              </div>
              <div className="h-10 bg-white/5 rounded-xl w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function FeaturedWorkouts({ workouts }: FeaturedWorkoutsProps) {
  if (!workouts || workouts.length === 0) {
    return (
      <section className="py-24 bg-[#1B2B3B]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No workouts available</h2>
          <p className="text-gray-400 mb-8">Check back later for new training programs.</p>
          <Link href="/workouts" className="btn-primary">Browse All</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 relative overflow-hidden bg-[#1B2B3B]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8C00]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF8C00]/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-sm font-medium mb-6"
            >
              <Dumbbell className="h-4 w-4" />
              Pro Training Programs
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
            >
              Featured <span className="text-[#FF8C00]">Workouts</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/workouts" 
              className="group flex items-center gap-3 bg-white/5 hover:bg-[#FF8C00]/10 border border-white/10 hover:border-[#FF8C00]/30 px-8 py-4 rounded-2xl text-white font-bold transition-all"
            >
              View All Workouts
              <div className="bg-[#FF8C00] rounded-lg p-1 group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="h-4 w-4 text-white" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workouts.slice(0, 3).map((workout, index) => (
            <WorkoutCard key={workout.id} workout={workout} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
