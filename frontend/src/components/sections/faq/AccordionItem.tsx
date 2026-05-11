"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import ReactMarkdown from "react-markdown";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function AccordionItem({ question, answer, isOpen, onClick }: AccordionItemProps) {
  return (
    <div 
      className={`group border-b border-white/10 last:border-0 transition-all duration-300 ${
        isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
          isOpen ? "text-[#FF8C00]" : "text-white group-hover:text-white/90"
        }`}>
          {question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
          isOpen 
            ? "border-[#FF8C00] bg-[#FF8C00] text-white rotate-180" 
            : "border-white/20 text-white group-hover:border-white/40"
        }`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="pb-8 text-gray-400 leading-relaxed text-lg max-w-3xl prose prose-invert prose-p:leading-relaxed">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
