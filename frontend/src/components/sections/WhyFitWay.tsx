"use client";

import { motion } from "framer-motion";
import { Zap, Target, Brain, Activity } from "lucide-react";

const PILLARS = [
  {
    title: "Clinical Health Formulas",
    description: "Our free calculators use established equations like Mifflin-St Jeor, Epley, and WHO standards to estimate your TDEE, macros, BMI, and one-rep max based on your body metrics and weekly activity.",
    icon: Brain,
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  {
    title: "Progressive Overload",
    description: "Strength and muscle gains require a gradual increase in training demand. Our workout guides show how to add weight, reps, or sets each week while keeping proper exercise form across every split.",
    icon: Target,
    color: "text-[#FF8C00]",
    bg: "bg-[#FF8C00]/10"
  },
  {
    title: "Macro & Calorie Balance",
    description: "Lasting body composition changes depend on energy balance and adequate protein. Our nutrition articles and macro tools help you set realistic calorie targets for fat loss, maintenance, or lean muscle gain.",
    icon: Activity,
    color: "text-green-400",
    bg: "bg-green-500/10"
  },
  {
    title: "Peer-Reviewed Standards",
    description: "Certified coaches and registered dietitians check our guides against PubMed and ACSM research. Every routine pairs effective training volume with recovery guidelines so you stay consistent without burnout.",
    icon: Zap,
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  }
];

export default function WhyFitWay() {
  return (
    <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden bg-[#1B2B3B]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8C00]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-10 md:mb-16 lg:mb-20 text-center md:text-left mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF8C00] text-sm font-medium mb-6"
          >
            <Zap className="h-4 w-4" />
            The FitWay Methodology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Training Built on <span className="text-[#FF8C00]">Exercise Science</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400"
          >
            Every workout program, nutrition guide, and calculator on FitWay relies on peer-reviewed research and clinical formulas. Certified coaches review our materials so you get clear, practical guidance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-300 h-full">
                <div className={`w-14 h-14 rounded-2xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <pillar.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
