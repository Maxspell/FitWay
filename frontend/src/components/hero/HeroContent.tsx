"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface HeroExpert {
  name: string;
  slug: string;
  photoUrl?: string;
}

interface HeroContentProps {
  avgRating?: number;
  experts?: HeroExpert[];
  coachesCount?: number;
  reviewsCount?: number;
}

export default function HeroContent({
  avgRating,
  experts = [],
  coachesCount = 0,
  reviewsCount = 0,
}: HeroContentProps) {
  const ratingValue =
    typeof avgRating === "number" && Number.isFinite(avgRating) ? avgRating : 4.9;
  const formattedRating = ratingValue.toFixed(1);
  const displayCoachesCount = coachesCount > 0 ? coachesCount : experts.length;
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
      initial={false}
      animate="visible"
      className="flex flex-col space-y-6 lg:space-y-7"
    >
      {/* Badge */}
      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">
        <span className="flex h-2 w-2 rounded-full bg-[#FF8C00] animate-pulse"></span>
        <span className="text-sm font-medium text-gray-300">Coach-Reviewed Fitness &amp; Nutrition</span>
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
          </span>{" "}
          <br />
          with Proven Science
        </h1>
        <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
          Follow structured workout programs, evidence-based nutrition guides, and free fitness calculators reviewed by certified coaches. From home beginner routines to daily calorie and macro targets, every resource gives you clear numbers and exercise form cues.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-1 lg:pt-2">
        <Link 
          href="/workouts" 
          className="group relative px-8 py-4 bg-[#C25700] text-white rounded-2xl font-bold transition-all hover:bg-[#A34600] hover:shadow-[0_0_20px_rgba(194,87,0,0.4)] flex items-center gap-2"
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
      <motion.div variants={itemVariants} className="pt-2 lg:pt-4 flex items-center gap-8 md:gap-12">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2.5">
            {experts.length > 0 ? (
              <div className="flex -space-x-3">
                {experts.map((expert) => (
                  <Link
                    key={expert.slug}
                    href={`/authors/${expert.slug}`}
                    title={expert.name}
                    aria-label={`View profile of ${expert.name}`}
                    className="relative z-0 hover:z-20 w-10 h-10 rounded-full border-2 border-[#1B2B3B] hover:border-[#FF8C00] bg-[#243447] overflow-hidden flex items-center justify-center transition-colors shrink-0"
                  >
                    {expert.photoUrl ? (
                      <Image
                        src={expert.photoUrl}
                        alt={expert.name}
                        width={40}
                        height={40}
                        sizes="40px"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-xs font-bold text-[#FF8C00]">
                        {expert.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </Link>
                ))}
                {displayCoachesCount > 0 && (
                  <Link
                    href="/authors"
                    aria-label={`View all ${displayCoachesCount} certified coaches`}
                    className="relative z-10 w-10 h-10 rounded-full border-2 border-[#1B2B3B] hover:border-[#FF8C00] bg-[#243447] flex items-center justify-center text-[11px] font-bold text-white hover:text-[#FF8C00] transition-colors shrink-0"
                  >
                    {displayCoachesCount}+
                  </Link>
                )}
              </div>
            ) : (
              <Link
                href="/authors"
                aria-label="Meet FitWay certified coaches"
                className="w-10 h-10 rounded-full border-2 border-[#1B2B3B] bg-[#243447] flex items-center justify-center text-[#FF8C00] hover:border-[#FF8C00] transition-colors shrink-0"
              >
                <ShieldCheck className="h-5 w-5" />
              </Link>
            )}
            <Link
              href="/authors"
              className="text-xs sm:text-sm text-gray-300 hover:text-[#FF8C00] font-medium transition-colors"
            >
              {displayCoachesCount > 0
                ? `Vetted by ${displayCoachesCount}+ Certified Coaches`
                : "Vetted by Certified Coaches"}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div
              role="img"
              className="flex items-center gap-0.5"
              aria-label={`Rated ${formattedRating} out of 5`}
            >
              {[1, 2, 3, 4, 5].map((i) => {
                const fillPercent = Math.round(
                  Math.min(Math.max(ratingValue - (i - 1), 0), 1) * 100
                );
                return (
                  <div key={i} className="relative h-4 w-4" aria-hidden="true">
                    <Star className="h-4 w-4 text-white/15" />
                    {fillPercent > 0 && (
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: `${fillPercent}%` }}
                      >
                        <Star className="h-4 w-4 text-[#FF8C00] fill-current" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <Link
              href="#testimonials"
              className="text-sm text-gray-300 hover:text-[#FF8C00] font-medium transition-colors"
            >
              {reviewsCount > 0 ? `${reviewsCount}+ Verified Reviews` : "Verified Community Rating"}
            </Link>
          </div>
        </div>

        <div className="h-12 w-px bg-white/10 hidden md:block"></div>

        <div className="hidden md:flex flex-col justify-center">
          <p className="text-2xl font-bold text-white">{formattedRating}/5</p>
          <p className="text-sm text-gray-300">Average Rating</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
