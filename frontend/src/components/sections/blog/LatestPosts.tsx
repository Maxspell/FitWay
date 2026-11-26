"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/interfaces/blog";
import { getStrapiMedia } from "@/utils/image";

interface LatestPostsProps {
  posts: BlogPost[];
}

function getPostCoverUrl(post: BlogPost): string {
  const rawUrl =
    post.image?.formats?.medium?.url ||
    post.image?.formats?.large?.url ||
    post.image?.formats?.small?.url ||
    post.image?.url ||
    null;

  return getStrapiMedia(rawUrl);
}

function formatPostDate(dateInput?: string): string {
  if (!dateInput) return "";
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function getAuthorInitial(name?: string): string {
  const trimmed = name?.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "F";
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
              className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF8C00]/40 px-6 sm:px-7 py-3.5 rounded-2xl text-white font-semibold text-sm sm:text-base transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2B3B] w-full sm:w-auto"
            >
              <span>View All Posts</span>
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#C25700] group-hover:bg-[#A34600] text-white transition-colors duration-200"
                aria-hidden="true"
              >
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* 3-Column Editorial Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedPosts.map((post, index) => {
            const coverUrl = getPostCoverUrl(post);
            const rawDate = post.publishedAt || post.createdAt;
            const formattedDate = formatPostDate(rawDate);
            const authorName = post.author?.name?.trim() || "FitWay Editorial";
            const authorPhotoUrl = post.author?.photo?.url
              ? getStrapiMedia(post.author.photo.url)
              : null;

            return (
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
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2B3B]"
                >
                  <article className="h-full flex flex-col rounded-[2rem] bg-[#243447]/90 border border-white/10 group-hover:border-[#FF8C00]/40 overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.22)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.38)] transition-[transform,border-color,box-shadow] duration-300 ease-out group-hover:-translate-y-1.5">
                    {/* Edge-to-Edge Cover Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1B2B3B]">
                      <Image
                        src={coverUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Bottom Scrim Blending Into Card Surface */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#243447] via-[#243447]/20 to-black/25 pointer-events-none"
                        aria-hidden="true"
                      />

                      {/* Floating Glassmorphic Category & Read-Time Pills */}
                      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                        {post.category?.name ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B2B3B]/85 backdrop-blur-md border border-white/15 text-[#FF8C00] text-xs font-semibold tracking-wide shadow-sm min-w-0 max-w-[65%]">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] shrink-0"
                              aria-hidden="true"
                            />
                            <span className="truncate">{post.category.name}</span>
                          </span>
                        ) : (
                          <span aria-hidden="true" />
                        )}

                        {post.readTime && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1B2B3B]/85 backdrop-blur-md border border-white/15 text-gray-200 text-xs font-medium shrink-0 shadow-sm">
                            <Clock
                              className="h-3.5 w-3.5 text-[#FF8C00] shrink-0"
                              aria-hidden="true"
                            />
                            <span>{post.readTime}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-7 flex flex-col flex-grow">
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-3 line-clamp-2 group-hover:text-[#FF8C00] transition-colors duration-200 text-pretty">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 mb-6 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Grounded Editorial Footer */}
                      <div className="border-t border-white/10 pt-4 mt-auto flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {authorPhotoUrl ? (
                            <div
                              className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/15 bg-[#1B2B3B]"
                              aria-hidden="true"
                            >
                              <Image
                                src={authorPhotoUrl}
                                alt=""
                                fill
                                sizes="36px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div
                              className="w-9 h-9 rounded-full shrink-0 border border-[#FF8C00]/30 bg-[#FF8C00]/15 text-[#FF8C00] font-bold text-xs flex items-center justify-center"
                              aria-hidden="true"
                            >
                              {getAuthorInitial(authorName)}
                            </div>
                          )}

                          <div className="flex flex-col min-w-0">
                            <span className="text-xs sm:text-sm font-semibold text-gray-200 truncate">
                              {authorName}
                            </span>
                            {formattedDate && (
                              <time
                                dateTime={rawDate}
                                className="text-xs text-gray-400 tabular-nums truncate"
                              >
                                {formattedDate}
                              </time>
                            )}
                          </div>
                        </div>

                        <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 group-hover:bg-[#C25700] border border-white/10 group-hover:border-[#C25700] text-gray-200 group-hover:text-white text-xs font-semibold transition-colors duration-200">
                          <span>Read</span>
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
