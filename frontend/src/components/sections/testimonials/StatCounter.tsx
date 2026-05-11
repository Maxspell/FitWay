"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  description: string;
}

export default function StatCounter({ value, label, suffix = "", description }: StatCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <div ref={ref} className="text-center md:text-left p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF8C00]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#FF8C00]/10 transition-colors" />
      
      <div className="relative z-10">
        <div className="text-3xl md:text-4xl font-bold text-white mb-1 flex items-baseline justify-center md:justify-start gap-1">
          <motion.span>{displayValue}</motion.span>
          <span className="text-[#FF8C00]">{suffix}</span>
        </div>
        <div className="text-[#FF8C00] font-bold text-sm uppercase tracking-widest mb-2">{label}</div>
        <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
