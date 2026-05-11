"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AccordionItem from "./AccordionItem";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(faqs.map(f => f.category).filter(Boolean)))];

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  // Generate JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>?/gm, ''), // Strip HTML tags for JSON-LD
      },
    })),
  };

  return (
    <section className="py-24 relative overflow-hidden" id="faq">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8C00]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF8C00]/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block py-1 px-4 rounded-full bg-[#FF8C00]/10 text-[#FF8C00] text-sm font-bold tracking-wider uppercase mb-4"
            >
              Have Questions?
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-center"
            >
              Frequently Asked <span className="gradient-text">Questions</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto mb-12"
            >
              Everything you need to know about starting your fitness journey with FitWay.
            </motion.p>

            {/* Category Tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat || "all")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeCategory === cat 
                      ? "bg-[#FF8C00] border-[#FF8C00] text-white shadow-[0_0_15px_rgba(255,140,0,0.3)]" 
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                  } capitalize`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-card p-4 md:p-8 overflow-hidden"
          >
            <div className="divide-y divide-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openId === faq.id}
                        onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      />
                    ))
                  ) : (
                    <div className="py-12 text-center text-gray-500">
                      No questions found in this category.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* SEO Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </div>
      </div>
    </section>
  );
}
