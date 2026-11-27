"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Dumbbell } from "lucide-react";
import Link from "next/link";
import { Workout } from "@/interfaces/workout";
import WorkoutCard from "@/components/workouts/WorkoutCard";

interface FeaturedWorkoutsProps {
  workouts: Workout[];
}

export const FeaturedWorkoutsSkeleton = () => (
  <section className="py-14 md:py-24 lg:py-32 bg-[#1B2B3B]" aria-label="Loading featured workouts">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-10 md:mb-16">
        <div className="w-full max-w-xl h-20 bg-white/5 rounded-2xl animate-pulse" />
        <div className="w-48 h-14 bg-white/5 rounded-2xl animate-pulse shrink-0" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
  const prefersReducedMotion = useReducedMotion();

  if (!workouts || workouts.length === 0) {
    return (
      <section className="py-24 bg-[#1B2B3B]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No workouts available</h2>
          <p className="text-gray-300 mb-8">Check back later for new training programs.</p>
          <Link href="/workouts" className="btn-primary">Browse All</Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-12 md:py-24 lg:py-32 relative overflow-hidden bg-[#1B2B3B]"
      aria-labelledby="featured-workouts-heading"
    >
      {/* Background Decor */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8C00]/5 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF8C00]/5 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-10 md:mb-16 text-center md:text-left">
          <div className="max-w-2xl">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-sm font-medium mb-6"
            >
              <Dumbbell className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Pro Training Programs</span>
            </motion.div>
            <motion.h2
              id="featured-workouts-heading"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.08 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.12]"
            >
              Featured <span className="text-[#FF8C00]">Workouts</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.16 }}
            viewport={{ once: true }}
            className="w-full sm:w-auto flex justify-center md:justify-end shrink-0"
          >
            <Link 
              href="/workouts" 
              className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-[#FF8C00]/10 border border-white/10 hover:border-[#FF8C00]/30 px-8 py-4 rounded-2xl text-white font-bold transition-colors w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2B3B]"
            >
              View All Workouts
              <span
                className="inline-flex bg-[#C25700] rounded-lg p-1 group-hover:rotate-45 transition-transform"
                aria-hidden="true"
              >
                <ArrowUpRight className="h-4 w-4 text-white" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {workouts.slice(0, 3).map((workout, index) => (
            <WorkoutCard key={workout.documentId || workout.id} workout={workout} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
