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

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Marketing Director",
    text: "FitWay completely changed my perspective on fitness. The personalized plans are so easy to follow, and I've lost 12kg in just 4 months without feeling burnt out.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    achievement: "Weight Loss Hero",
    rating: 5,
    stats: { label: "Progress", value: "-12kg" }
  },
  {
    name: "Michael Ross",
    role: "Software Engineer",
    text: "The tracking tools are incredible. I've finally been able to stay consistent with my workouts for over 6 months. My energy levels have never been higher.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    achievement: "Muscle Gain",
    rating: 5,
    stats: { label: "Streak", value: "180 Days" }
  },
  {
    name: "Elena Voronova",
    role: "Yoga Instructor",
    text: "Even as a professional, I find FitWay's nutrition advice and meal plans extremely valuable. It's the perfect companion for anyone serious about their health.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    achievement: "Wellness Master",
    rating: 5,
    stats: { label: "Energy", value: "+40%" }
  },
  {
    name: "David Lawson",
    role: "Business Owner",
    text: "The efficiency of these workouts is what sold me. I can get a high-intensity session done in 30 minutes and see real results in my strength and stamina.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    achievement: "Strength Peak",
    rating: 4,
    stats: { label: "Strength", value: "+25%" }
  },
  {
    name: "Jessica Chen",
    role: "Student",
    text: "FitWay makes fitness accessible. I started as a complete beginner, and now I feel confident in the gym. The community support is just icing on the cake.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    achievement: "Consistency Queen",
    rating: 5,
    stats: { label: "Workouts", value: "120+" }
  }
];

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

export default function TestimonialsSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#1B2B3B]">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#FF8C00]/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#FF8C00] text-sm tracking-widest mb-8"
          >
            <Sparkles size={16} />
            Success Stories
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            Trusted by the <span className="text-[#FF8C00]">FitWay</span> Community
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Join thousands of users who have transformed their lives with our personalized approach to fitness and wellness.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
          className="testimonials-slider relative"
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={30}
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
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/20 !w-3 !h-3 !opacity-100",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-[#FF8C00] !w-8 !rounded-full transition-all duration-300",
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              }
            }}
            className="!pb-20 !px-4"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.name} className="h-auto">
                <TestimonialCard {...testimonial} />
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
