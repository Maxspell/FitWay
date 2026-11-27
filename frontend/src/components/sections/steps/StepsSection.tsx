"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Target, ClipboardList, Activity, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";
import StepCard from "./StepCard";

const inlineLinkClass =
  "text-white font-medium underline decoration-[#FF8C00]/75 decoration-2 underline-offset-4 hover:text-[#FF8C00] hover:decoration-[#FF8C00] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] rounded-sm";

const STEPS = [
  {
    number: 1,
    title: "Set Your Baseline",
    ctaLabel: "Open BMI Calculator",
    ctaHref: "/tools/bmi-calculator",
    description: (
      <>
        Decide whether you want to lose fat or build muscle, then check our{" "}
        <Link href="/tools/bmi-calculator" className={inlineLinkClass}>
          BMI
        </Link>{" "}
        and{" "}
        <Link href="/tools/ideal-weight-calculator" className={inlineLinkClass}>
          Ideal Weight
        </Link>{" "}
        calculators to see where you are starting from.
      </>
    ),
    icon: Target,
    visual: (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="flex gap-2">
          {[
            { label: "Loss", color: "bg-red-500/20 text-red-400 border-red-500/30" },
            { label: "Gain", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
            { label: "Strength", color: "bg-[#FF8C00]/20 text-[#FF8C00] border-[#FF8C00]/30" },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${item.color} group-hover:scale-110 transition-transform`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="w-20 h-20 bg-[#FF8C00]/10 rounded-full animate-ping" />
        </div>
      </div>
    )
  },
  {
    number: 2,
    title: "Match Calories to a Workout",
    ctaLabel: "Browse Workout Library",
    ctaHref: "/workouts",
    description: (
      <>
        Find your daily calorie and protein targets with our{" "}
        <Link href="/tools/calorie-calculator" className={inlineLinkClass}>
          TDEE
        </Link>{" "}
        and{" "}
        <Link href="/tools/macro-calculator" className={inlineLinkClass}>
          Macro
        </Link>{" "}
        calculators. From there, pick a program from our{" "}
        <Link href="/workouts" className={inlineLinkClass}>
          workout library
        </Link>{" "}
        by goal and equipment.
      </>
    ),
    icon: ClipboardList,
    visual: (
      <div className="w-full h-full flex flex-col gap-2 p-6 justify-center">
        {[70, 45, 90].map((width, i) => (
          <div key={i} className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${width}%` }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="h-full bg-gradient-to-r from-[#FF8C00] to-orange-400"
            />
          </div>
        ))}
      </div>
    )
  },
  {
    number: 3,
    title: "Train with Clear Form Cues",
    ctaLabel: "Calculate Working Weights",
    ctaHref: "/tools/one-rep-max-calculator",
    description: (
      <>
        Open any{" "}
        <Link href="/workouts" className={inlineLinkClass}>
          workout page
        </Link>{" "}
        for sets, reps, and technique cues on every lift, along with a built-in rest timer. Check our{" "}
        <Link href="/tools/one-rep-max-calculator" className={inlineLinkClass}>
          One-Rep Max calculator
        </Link>{" "}
        when you need safe working weights.
      </>
    ),
    icon: Activity,
    visual: (
      <div className="relative w-full h-full flex items-center justify-center p-4 gap-4">
        <div className="relative h-16 w-16">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="3"
            />
            <motion.path
              initial={{ strokeDasharray: "0, 100" }}
              whileInView={{ strokeDasharray: "75, 100" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FF8C00"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">75%</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-[#FF8C00]" />
          </div>
          <div className="w-8 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-blue-400" />
          </div>
        </div>
      </div>
    )
  },
  {
    number: 4,
    title: "Adjust Nutrition and Recovery",
    ctaLabel: "Read Fitness Guides",
    ctaHref: "/blog",
    description: (
      <>
        Read our{" "}
        <Link href="/blog" className={inlineLinkClass}>
          nutrition and recovery guides
        </Link>{" "}
        when progress slows down, or check{" "}
        <Link href="#testimonials" className={inlineLinkClass}>
          community workout reviews
        </Link>{" "}
        to see how other readers pace each program.
      </>
    ),
    icon: Trophy,
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative">
          <Trophy className="w-12 h-12 text-[#FF8C00] group-hover:scale-110 transition-transform duration-500" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
            className="absolute -inset-2 bg-[#FF8C00]/30 blur-xl rounded-full"
          />
        </div>
        <div className="absolute bottom-4 flex gap-1">
          {[1,2,3,4,5].map(i => (
            <Sparkles key={i} className={`w-3 h-3 text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity delay-[${i*100}ms]`} />
          ))}
        </div>
      </div>
    )
  }
];

export default function StepsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="py-12 md:py-24 lg:py-32 relative overflow-hidden bg-[#1B2B3B]"
    >
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF8C00]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10 md:mb-16 lg:mb-20 text-center md:text-left mx-auto md:mx-0">
          <motion.div 
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF8C00] text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            4-Step Training Workflow
          </motion.div>
          <motion.h2 
            id="how-it-works-heading"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            How to Build Your <span className="text-[#FF8C00]">Training Plan</span>
          </motion.h2>
          <motion.p 
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
            className="text-xl text-gray-300"
          >
            Calculate your starting numbers first, then match them with a workout program you can stick to each week.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={
            prefersReducedMotion
              ? undefined
              : {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }
          }
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Desktop Connectors */}
          <div className="hidden lg:block absolute top-[120px] left-0 w-full px-16 -z-10">
            <div className="w-full flex justify-between">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-[2px] relative">
                   <div className="absolute inset-0 bg-white/5" />
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: "100%" }}
                     transition={{ duration: 1, delay: i * 0.3 }}
                     className="absolute inset-0 bg-gradient-to-r from-[#FF8C00]/0 via-[#FF8C00]/40 to-[#FF8C00]/0" 
                   />
                </div>
              ))}
            </div>
          </div>

          {STEPS.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              ctaLabel={step.ctaLabel}
              ctaHref={step.ctaHref}
              visual={step.visual}
              isLast={step.number === 4}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
