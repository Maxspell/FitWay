"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import { Users, Award, Dumbbell, Star, Sparkles } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import TestimonialCard from "./TestimonialCard";
import StatCounter from "./StatCounter";
import { Review } from "@/interfaces/review";

interface TestimonialsSectionProps {
  reviews?: Review[];
}

const STATS = [
  {
    value: 15,
    suffix: "k+",
    label: "Active Users",
    description: "Real people achieving their fitness goals daily.",
    icon: Users
  },
  {
    value: 500,
    suffix: "k+",
    label: "Workouts",
    description: "Completed sessions across all difficulty levels.",
    icon: Dumbbell
  },
  {
    value: 4.9,
    suffix: "/5",
    label: "Avg Rating",
    description: "Based on thousands of verified user reviews.",
    icon: Star
  },
  {
    value: 95,
    suffix: "%",
    label: "Success Rate",
    description: "Users who achieved their target within 6 months.",
    icon: Award
  }
];

export default function TestimonialsSection({ reviews = [] }: TestimonialsSectionProps) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Swiper requires enough slides for continuous loop without visual glitches
  const displayReviews =
    reviews.length < 6
      ? [...reviews, ...reviews, ...reviews]
      : reviews.length < 8
      ? [...reviews, ...reviews]
      : reviews;

  return (
    <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden bg-[#1B2B3B]">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#FF8C00]/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16 lg:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#FF8C00] text-sm tracking-widest mb-4 md:mb-8"
          >
            <Sparkles size={16} />
            Success Stories
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 md:mb-8 leading-tight"
          >
            Trusted by the <span className="text-[#FF8C00]">FitWay</span> Community
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Join thousands of users who have transformed their lives with our personalized approach to fitness and wellness.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-20 lg:mb-24">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatCounter 
                value={stat.value} 
                suffix={stat.suffix} 
                label={stat.label} 
                description={stat.description} 
              />
            </motion.div>
          ))}
        </div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="testimonials-slider relative pt-4"
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1.2}
            spaceBetween={24}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/20 !w-3 !h-3 !opacity-100",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-[#FF8C00] !w-8 !rounded-full transition-all duration-300",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="!pb-16 !pt-4 !px-2"
          >
            {displayReviews.map((review, idx) => (
              <SwiperSlide key={`${review.documentId || review.id}-${idx}`} className="h-auto">
                <TestimonialCard
                  id={review.id}
                  documentId={review.documentId}
                  name={review.name}
                  text={review.content}
                  workoutTitle={review.workout?.title}
                  workoutSlug={review.workout?.slug}
                  rating={review.rating}
                  createdAt={review.createdAt}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Glow */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#FF8C00]/0 via-[#FF8C00]/5 to-[#FF8C00]/0 -translate-y-1/2 -z-10 blur-xl" />
        </motion.div>
      </div>
    </section>
  );
}
