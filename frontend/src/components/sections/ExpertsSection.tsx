"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Star } from "lucide-react";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";
import { Author } from "@/interfaces/author";

export default function ExpertsSection({ authors = [] }: { authors: Author[] }) {
  return (
    <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden bg-[#1B2B3B]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8C00]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF8C00]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-10 md:mb-16 lg:mb-20 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF8C00] text-sm font-medium mb-6"
          >
            <ShieldCheck className="h-4 w-4" />
            Trust & Authority
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Guided by <span className="text-[#FF8C00]">Industry Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400"
          >
            Our methodologies are not just AI-generated; they are vetted by certified professionals to ensure your safety, health, and success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {authors.map((author, index) => (
            <motion.div
              key={author.documentId || author.slug || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <Link
                href={`/authors/${author.slug}`}
                className="block h-full"
              >
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/[0.07] hover:border-white/20 transition-colors duration-300 h-full flex flex-col items-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF8C00] to-orange-600 animate-spin-slow opacity-50" />
                    <img
                      src={getStrapiMedia(author.photo?.url)}
                      alt={author.name}
                      className="relative w-full h-full rounded-full object-cover border-4 border-[#1B2B3B]"
                    />
                    <div className="absolute -bottom-2 right-0 bg-[#FF8C00] p-1.5 rounded-full text-white">
                      <Award className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#FF8C00] transition-colors">{author.name}</h3>
                  <p className="text-[#FF8C00] font-medium mb-2">{author.jobTitle || "Expert"}</p>
                  <div className="flex items-center justify-center gap-1 text-gray-400 text-sm mb-4">
                    <Star className="h-3 w-3 fill-current text-[#FF8C00]" />
                    <span>{author.credentials || "Certified Professional"}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    {author.bio}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
