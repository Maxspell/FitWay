"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, Flame, Target, ChevronRight, Play, Dumbbell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/interfaces/workout";
import { getStrapiMedia } from "@/lib/utils";

interface WorkoutCardProps {
  workout: Workout;
  index?: number;
  headingAs?: "h2" | "h3";
  priority?: boolean;
}

function getWorkoutCoverUrl(workout: Workout): string {
  const rawUrl =
    workout.image?.formats?.medium?.url ||
    workout.image?.formats?.large?.url ||
    workout.image?.formats?.small?.url ||
    workout.image?.url;

  return rawUrl ? getStrapiMedia(rawUrl) : "";
}

export default function WorkoutCard({
  workout,
  index = 0,
  headingAs = "h3",
  priority = false,
}: WorkoutCardProps) {
  const HeadingTag = headingAs;
  const prefersReducedMotion = useReducedMotion();
  const coverUrl = getWorkoutCoverUrl(workout);

  return (
    <motion.div
      initial={priority || prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : (index % 9) * 0.08,
      }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      <Link
        href={`/workouts/${workout.slug}`}
        className="block h-full rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2B3B]"
      >
        <article className="relative h-full flex flex-col overflow-hidden rounded-[2rem] bg-[#243447] border border-white/10 hover:border-[#FF8C00]/40 transition-[transform,border-color,box-shadow] duration-300 ease-out shadow-[0_12px_36px_rgba(0,0,0,0.22)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.38)] group-hover:-translate-y-1.5 transform-gpu">
          {/* Image Container */}
          <div className="relative h-64 w-full overflow-hidden bg-[#1B2B3B] shrink-0">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={workout.image?.alternativeText || workout.title}
                fill
                priority={priority}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover scale-[1.01] transition-transform duration-500 ease-out group-hover:scale-[1.06] transform-gpu"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1B2B3B]" aria-hidden="true">
                <Dumbbell className="h-12 w-12 text-[#FF8C00]/30" />
              </div>
            )}

            {/* Overlays (1px overbleed prevents subpixel seams on hover) */}
            <div
              className="absolute -inset-px bg-gradient-to-t from-[#243447] via-[#243447]/20 to-black/25 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-[#FF8C00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Badges */}
            <div className="absolute top-5 left-5 right-5 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#C25700] text-white text-[11px] font-black uppercase tracking-wider rounded-full shadow-lg shadow-black/25">
                {workout.difficulty}
              </span>
              <span className="px-3 py-1 bg-[#1B2B3B]/85 backdrop-blur-md text-gray-100 text-[11px] font-black uppercase tracking-wider rounded-full border border-white/15">
                {workout.category}
              </span>
            </div>

            {/* Play Button Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 scale-90 group-hover:scale-100 pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-16 h-16 bg-[#C25700] rounded-full flex items-center justify-center shadow-2xl shadow-black/40">
                <Play className="h-7 w-7 text-white fill-current ml-1" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 relative flex flex-col flex-grow">
            <HeadingTag className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#FF8C00] transition-colors leading-snug line-clamp-2">
              {workout.title}
            </HeadingTag>

            <p className="text-gray-300 text-sm line-clamp-2 mb-6">
              {workout.description}
            </p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 mt-auto">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-[#FF8C00]/5 group-hover:border-[#FF8C00]/15 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-[#FF8C00]/10 flex items-center justify-center shrink-0" aria-hidden="true">
                  <Clock className="w-4 h-4 text-[#FF8C00]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-gray-300 uppercase font-bold tracking-wider">Duration</span>
                  <span className="text-xs font-bold text-white tabular-nums">{workout.duration} Min</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-[#FF8C00]/5 group-hover:border-[#FF8C00]/15 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-[#FF8C00]/10 flex items-center justify-center shrink-0" aria-hidden="true">
                  <Flame className="w-4 h-4 text-[#FF8C00]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-gray-300 uppercase font-bold tracking-wider">Calories</span>
                  <span className="text-xs font-bold text-white tabular-nums">{workout.calories} Kcal</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 pt-5 border-t border-white/10">
              <div className="flex items-center gap-2 min-w-0">
                <Target className="w-4 h-4 text-[#FF8C00] shrink-0" aria-hidden="true" />
                <span className="text-xs font-medium text-gray-300 truncate">{workout.targetMuscleGroups}</span>
              </div>
              <div className="flex items-center gap-1 text-[#FF8C00] font-bold text-xs uppercase tracking-widest shrink-0">
                <span>Start</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
