"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/interfaces/blog";
import BlogPostCard from "@/components/BlogPost/BlogPostCard";

interface LatestPostsProps {
  posts: BlogPost[];
}

export const LatestPostsSkeleton = () => (
  <section className="py-14 md:py-24 lg:py-28 bg-[#1B2B3B]" aria-label="Loading latest blog posts">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-10 md:mb-14">
        <div className="w-full max-w-xl space-y-4">
          <div className="h-7 w-48 bg-white/5 rounded-full animate-pulse mx-auto md:mx-0" />
          <div className="h-12 w-3/4 bg-white/5 rounded-2xl animate-pulse mx-auto md:mx-0" />
          <div className="h-5 w-full bg-white/5 rounded-xl animate-pulse" />
        </div>
        <div className="h-12 w-48 bg-white/5 rounded-2xl animate-pulse shrink-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-[2rem] bg-[#243447]/90 border border-white/10 overflow-hidden animate-pulse flex flex-col"
          >
            <div className="aspect-[16/10] w-full bg-white/5" />
            <div className="p-5 sm:p-7 flex flex-col flex-grow">
              <div className="h-6 bg-white/5 rounded-lg w-5/6 mb-2" />
              <div className="h-6 bg-white/5 rounded-lg w-2/3 mb-4" />
              <div className="h-4 bg-white/5 rounded-lg w-full mb-2" />
              <div className="h-4 bg-white/5 rounded-lg w-full mb-2" />
              <div className="h-4 bg-white/5 rounded-lg w-3/4 mb-6" />
              <div className="border-t border-white/10 pt-4 mt-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-24 bg-white/5 rounded" />
                    <div className="h-3 w-20 bg-white/5 rounded" />
                  </div>
                </div>
                <div className="h-7 w-16 bg-white/5 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function LatestPosts({ posts }: LatestPostsProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!posts || posts.length === 0) {
    return null;
  }

  const displayedPosts = posts.slice(0, 3);

  return (
    <section
      className="py-14 md:py-24 lg:py-28 relative overflow-hidden bg-[#1B2B3B]"
      aria-labelledby="latest-blog-heading"
    >
      {/* Subtle Ambient Depth */}
      <div
        className="absolute top-0 left-0 w-[460px] h-[460px] bg-[#FF8C00]/[0.04] rounded-full blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[460px] h-[460px] bg-sky-500/[0.04] rounded-full blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-8 mb-10 md:mb-14 text-center md:text-left">
          <div className="max-w-2xl">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/25 text-[#FF8C00] text-xs sm:text-sm font-semibold tracking-wide mb-5"
            >
              <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Evidence-Based Journal</span>
            </motion.div>

            <motion.h2
              id="latest-blog-heading"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.06 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight text-balance mb-4"
            >
              Latest from <span className="gradient-text">Our Blog</span>
            </motion.h2>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.12 }}
              viewport={{ once: true }}
              className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0"
            >
              Science-backed training breakdowns, sports nutrition guides, and practical recovery strategies.
            </motion.p>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.16 }}
            viewport={{ once: true }}
            className="w-full sm:w-auto flex justify-center md:justify-end shrink-0"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-[#FF8C00]/10 border border-white/10 hover:border-[#FF8C00]/30 px-8 py-4 rounded-2xl text-white font-bold transition-all w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2B3B]"
            >
              View All Posts
              <span
                className="inline-flex bg-[#C25700] rounded-lg p-1 group-hover:rotate-45 transition-transform"
                aria-hidden="true"
              >
                <ArrowUpRight className="h-4 w-4 text-white" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* 3-Column Editorial Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
              }}
              viewport={{ once: true }}
              className="h-full"
            >
              <BlogPostCard post={post} headingAs="h3" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
