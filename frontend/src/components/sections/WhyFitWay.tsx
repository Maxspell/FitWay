"use client";

import { motion } from "framer-motion";
import { Zap, Target, Brain, Activity } from "lucide-react";

const PILLARS = [
  {
    title: "Bio-Individual Analysis",
    description: "Every body reacts differently. Our AI considers your age, weight, activity level, and goals to calculate precise caloric needs and training volumes, ensuring you're neither under-training nor over-reaching.",
    icon: Brain,
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  {
    title: "Progressive Overload Logic",
    description: "Stagnation is the enemy of progress. We utilize the core principle of progressive overload, systematically increasing stress on the body through volume, intensity, and frequency to trigger continuous adaptation.",
    icon: Target,
    color: "text-[#FF8C00]",
    bg: "bg-[#FF8C00]/10"
  },
  {
    title: "Metabolic Optimization",
    description: "Nutrition isn't just about calories; it's about hormonal response. Our plans optimize macronutrient ratios to support muscle protein synthesis and metabolic flexibility, fueling your workouts and recovery.",
    icon: Activity,
    color: "text-green-400",
    bg: "bg-green-500/10"
  },
  {
    title: "Data-Driven Periodization",
    description: "We avoid the 'plateau' by implementing structured periodization. By alternating between intensity and volume phases, we maximize strength gains while ensuring the central nervous system fully recovers.",
    icon: Zap,
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  }
];

export default function WhyFitWay() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#1B2B3B]">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
         <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FF8C00] rounded-full blur-[150px]" />
         <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF8C00] text-sm font-medium mb-6"
          >
            <Zap className="h-4 w-4" />
            The FitWay Methodology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            The Science of <span className="text-[#FF8C00]">Precision Fitness</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Where AI Intelligence Meets Human Physiology. We don't believe in one-size-fits-all routines. Our platform is built on the intersection of algorithmic precision and established exercise science.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <pillar.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
