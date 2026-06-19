"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Star } from "lucide-react";

const EXPERTS = [
  {
    name: "Richard Botich",
    role: "Head Trainer",
    credentials: "NASM-CPT, ACE",
    bio: "Specializing in strength and conditioning, Richard ensures our AI-generated workouts follow strict safety protocols and optimal biomechanical paths for maximum efficiency.",
    image: "/richard-botich.webp"
  },
  {
    name: "Sarah Johnson",
    role: "Nutrition Specialist",
    credentials: "RD, ISSN",
    bio: "A registered dietitian focused on sports nutrition. Sarah oversees the nutritional logic and metabolic algorithms that power our personalized meal generation tools.",
    image: "/sarah-johnson.webp"
  },
  {
    name: "Mike Chen",
    role: "Fitness Coach",
    credentials: "CSCS, CrossFit L2",
    bio: "Expert in rehabilitation and functional movement, Mike focuses on the longevity and sustainability of our training programs, minimizing injury risk.",
    image: "/mike-chen.webp"
  }
];

export default function ExpertsSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#1B2B3B]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF8C00] text-sm font-medium mb-6"
          >
            <ShieldCheck className="h-4 w-4" />
            Trust & Authority
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Guided by <span className="text-[#FF8C00]">Industry Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Our methodologies are not just AI-generated; they are vetted by certified professionals to ensure your safety, health, and success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERTS.map((expert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/[0.07] transition-all"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF8C00] to-orange-600 animate-spin-slow opacity-50" />
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="relative w-full h-full rounded-full object-cover border-4 border-[#1B2B3B]"
                />
                <div className="absolute -bottom-2 right-0 bg-[#FF8C00] p-1.5 rounded-full text-white">
                  <Award className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{expert.name}</h3>
              <p className="text-[#FF8C00] font-medium mb-2">{expert.role}</p>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-sm mb-4">
                <Star className="h-3 w-3 fill-current text-[#FF8C00]" />
                <span>{expert.credentials}</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {expert.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
