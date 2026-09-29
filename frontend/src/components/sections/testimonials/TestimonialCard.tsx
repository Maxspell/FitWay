"use client";

import { Star, Quote, Dumbbell } from "lucide-react";
import Link from "next/link";

interface TestimonialCardProps {
  id: number | string;
  documentId?: string;
  name: string;
  text: string;
  workoutTitle?: string;
  workoutSlug?: string;
  rating: number;
  createdAt?: string;
}

export default function TestimonialCard({
  id,
  documentId,
  name,
  text,
  workoutTitle,
  workoutSlug,
  rating,
  createdAt,
}: TestimonialCardProps) {
  const targetId = documentId || id;
  const reviewHref = workoutSlug
    ? `/workouts/${workoutSlug}#review-${targetId}`
    : `/workouts#review-${targetId}`;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="pt-4 pb-2 h-full">
      <Link href={reviewHref} className="group relative block h-full select-none cursor-pointer">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF8C00]/20 to-transparent rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 flex flex-col gap-6 transition-all duration-500 group-hover:translate-y-[-6px] group-hover:border-[#FF8C00]/30 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* Quote Icon */}
        <div className="absolute top-6 right-8 text-[#FF8C00]/10 group-hover:text-[#FF8C00]/25 transition-colors">
          <Quote size={48} fill="currentColor" />
        </div>

        {/* User Info with letter avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1B2B3B] border-2 border-white/10 group-hover:border-[#FF8C00]/50 flex items-center justify-center text-[#FF8C00] font-black text-2xl transition-colors shadow-inner flex-shrink-0">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="min-w-0 pr-8">
            <h3 className="text-xl font-bold text-white group-hover:text-[#FF8C00] transition-colors truncate">
              {name}
            </h3>
            {formattedDate && (
              <p className="text-gray-400 text-xs mt-0.5">{formattedDate}</p>
            )}
          </div>
        </div>

        {/* Workout Achievement Badge */}
        {workoutTitle && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-xs font-bold uppercase tracking-wider w-fit group-hover:bg-[#FF8C00]/20 transition-colors">
            <Dumbbell size={14} className="flex-shrink-0" />
            <span className="truncate max-w-[220px]">{workoutTitle}</span>
          </div>
        )}

        {/* Testimonial Text */}
        <p className="text-gray-300 leading-relaxed italic flex-grow line-clamp-4">
          &ldquo;{text}&rdquo;
        </p>

        {/* Footer info: Rating */}
        <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < rating
                    ? "text-[#FF8C00] fill-[#FF8C00]"
                    : "text-white/10"
                }
              />
            ))}
          </div>

          <span className="text-xs text-[#FF8C00] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Read review &rarr;
          </span>
        </div>
      </div>
    </Link>
    </div>
  );
}

