import React from "react";
import {
  Clock,
  User,
  Tag,
  Calendar,
  Dumbbell,
  Apple,
  Flame,
  Zap,
  Heart,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, Category } from "@/interfaces/blog";
import { getPostImage } from "@/utils/image";
import Pagination from "@/components/common/Pagination";

// Mapping category slugs to semantic Lucide icons
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  nutrition: Apple,
  "muscle-building": Dumbbell,
  "weight-loss": Flame,
  training: Zap,
  lifestyle: Heart,
  motivation: Sparkles,
};

const CATEGORY_SUBTITLES: Record<string, string> = {
  nutrition: "Macronutrient splits, meal timing & evidence-based fueling",
  "muscle-building": "Hypertrophy science, mechanical tension & recovery",
  "weight-loss": "Calorie deficits, metabolic health & sustainable cuts",
  training: "Progressive overload, exercise selection & technique cues",
  lifestyle: "Sleep architecture, recovery & sustainable health habits",
  motivation: "Consistency frameworks, mindset & behavioral psychology",
};

interface BlogViewProps {
  posts: BlogPost[];
  categories: Category[];
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function BlogView({
  posts,
  categories,
  currentPage,
  totalPages,
  basePath = "/blog",
}: BlogViewProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4 text-center py-20">
          <h1 className="section-title">Latest Health & Fitness Articles</h1>
          <p className="text-gray-400 text-xl mt-6">No articles published yet. Check back soon!</p>
          {currentPage > 1 && (
            <Link href="/blog" className="btn-primary inline-block mt-8">
              Back to Blog
            </Link>
          )}
        </div>
      </div>
    );
  }

  // On page 1, featured post is the very first post, and remaining 8 posts go into the grid
  // On page 2+, all 9 posts are shown in the grid so the user can easily scan the paginated catalogue
  const isFirstPage = currentPage === 1;
  const featuredPost = isFirstPage ? posts[0] : null;
  const gridPosts = isFirstPage ? posts.slice(1) : posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": posts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1 + (currentPage - 1) * 9,
      "url": `https://fitway.best/blog/${post.slug}`,
      "name": post.title,
      "description": post.excerpt,
    })),
  };

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="section-title mb-4">Latest Health & Fitness Articles</h1>
          {currentPage > 1 ? (
            <p className="text-gray-400 text-base sm:text-lg">
              Browsing page <span className="text-[#FF8C00] font-semibold">{currentPage}</span> of{" "}
              <span className="text-[#FF8C00] font-semibold">{totalPages}</span>
            </p>
          ) : (
            <p className="text-gray-400 text-base sm:text-lg">
              Explore science-backed guides, workout routines, and expert nutrition tips.
            </p>
          )}
        </div>

        {/* Featured Post (Only on Page 1) */}
        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="card mb-12 block hover:ring-2 hover:ring-[#FF8C00] transition-all group"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="w-full md:w-1/2 relative h-56 sm:h-72 md:h-[400px] overflow-hidden rounded-2xl">
                <Image
                  src={getPostImage(featuredPost, "large")}
                  alt={featuredPost.title}
                  fill
                  className="rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#FF8C00] text-sm mb-3 sm:mb-4">
                  {featuredPost.author?.name && (
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4 shrink-0" />
                      {featuredPost.author.name}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 shrink-0" />
                    {new Date(featuredPost.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {featuredPost.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 shrink-0" />
                      {featuredPost.readTime}
                    </span>
                  )}
                  {featuredPost.category?.name && (
                    <span className="flex items-center gap-1.5">
                      <Tag className="h-4 w-4 shrink-0" />
                      {featuredPost.category.name}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 group-hover:text-[#FF8C00] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base mb-5 sm:mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <span className="btn-primary inline-block w-fit">
                  Read More
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Posts Grid */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gridPosts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card block hover:ring-2 hover:ring-[#FF8C00] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 mb-4">
                    <Image
                      src={getPostImage(post, "large")}
                      alt={post.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-[#FF8C00] text-sm mb-2">
                    {post.author?.name && (
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author.name}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {post.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                </div>
                <span className="btn-primary inline-block w-fit">
                  Read More
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Controls right after cards grid */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={basePath}
        />

        {/* Categories Section - Structured 3x2 Grid */}
        {categories.length > 0 && (
          <section className="mt-16">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Explore by Topic
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Browse focused guides categorized by training discipline and nutritional science
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((category) => {
                const slugKey = category.slug.toLowerCase();
                const Icon = CATEGORY_ICONS[slugKey] || Tag;
                const subtitle =
                  CATEGORY_SUBTITLES[slugKey] ||
                  "Evidence-based fitness guides & actionable research";

                return (
                  <Link
                    key={category.slug}
                    href={`/blog/category/${category.slug}`}
                    className="group relative p-6 rounded-2xl bg-[#1B2B3B] border border-white/5 hover:border-[#FF8C00]/40 hover:bg-[#243447] transition-all duration-300 shadow-lg hover:shadow-orange-500/5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#FF8C00] transition-colors mb-1.5 flex items-center justify-between">
                        <span>{category.name}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF8C00]" />
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Evidence-Based Architecture Section (Only on Page 1 to prevent boilerplate duplication on paginated archives) */}
        {isFirstPage && (
          <section className="bg-[#1B2B3B] rounded-3xl p-6 sm:p-10 mt-16 shadow-xl border border-white/5 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Evidence-Based Fitness, Nutrition, and Performance Architecture
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              FitWay publishes actionable, research-backed education to replace fitness folklore with exercise physiology and nutritional biochemistry. Every guide, breakdown, and protocol is written and reviewed by{" "}
              <Link
                href="/authors"
                className="text-[#FF8C00] underline hover:text-[#ffaa40] font-medium"
              >
                credentialed strength coaches and clinical dietitians
              </Link>{" "}
              adhering to a{" "}
              <Link
                href="/editorial-policy"
                className="text-[#FF8C00] underline hover:text-[#ffaa40] font-medium"
              >
                strict editorial policy
              </Link>. We cross-reference clinical trials, meta-analyses from peer-reviewed journals (such as PubMed and ISSN), and real-world athletic applications to ensure every recommendation is safe, practical, and measurable.
            </p>

            <h3 className="text-xl font-bold text-white pt-2">How We Structure Our Fitness Intelligence</h3>
            <ul className="space-y-3 text-gray-300 list-disc list-outside pl-5 text-sm sm:text-base">
              <li>
                <strong className="text-white">Nutritional Science &amp; Fueling:</strong> Deep dives into energy balance, micronutrient density, and{" "}
                <Link
                  href="/blog/category/nutrition"
                  className="text-[#FF8C00] underline hover:text-[#ffaa40]"
                >
                  evidence-based sports nutrition
                </Link>. Learn how to determine optimal protein distributions, master nutrient timing, and avoid over-hyped supplements.
              </li>
              <li>
                <strong className="text-white">Hypertrophy &amp; Strength Principles:</strong> Comprehensive breakdowns of mechanical tension, volume landmarks, and progressive overload in our{" "}
                <Link
                  href="/blog/category/muscle-building"
                  className="text-[#FF8C00] underline hover:text-[#ffaa40]"
                >
                  muscle building guides
                </Link>{" "}
                and{" "}
                <Link
                  href="/blog/category/training"
                  className="text-[#FF8C00] underline hover:text-[#ffaa40]"
                >
                  strength training protocols
                </Link>.
              </li>
              <li>
                <strong className="text-white">Body Recomposition &amp; Fat Loss:</strong> Science-backed approaches to{" "}
                <Link
                  href="/blog/category/weight-loss"
                  className="text-[#FF8C00] underline hover:text-[#ffaa40]"
                >
                  sustainable fat loss
                </Link>, metabolic adaptation, appetite regulation, and lean tissue preservation during a deficit.
              </li>
              <li>
                <strong className="text-white">Longevity &amp; Recovery:</strong> Practical guidance on mobility, sleep architecture, stress modulation, and sustainable{" "}
                <Link
                  href="/blog/category/lifestyle"
                  className="text-[#FF8C00] underline hover:text-[#ffaa40]"
                >
                  lifestyle habits
                </Link>{" "}
                designed for long-term health.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white pt-2">Connecting Knowledge with Practical Execution</h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Reading about exercise science only yields results when translated into physical training. We bridge the gap between theory and execution through our ecosystem of interactive tools:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <h4 className="font-bold text-white text-sm">Calculate Your Baseline Numbers</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Use our science-validated{" "}
                  <Link
                    href="/tools/calorie-calculator"
                    className="text-[#FF8C00] underline hover:text-[#ffaa40]"
                  >
                    daily calorie calculator
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/tools/macro-calculator"
                    className="text-[#FF8C00] underline hover:text-[#ffaa40]"
                  >
                    macro splitter
                  </Link>{" "}
                  to establish precise targets based on the Mifflin-St Jeor formula.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <h4 className="font-bold text-white text-sm">Follow Periodized Programming</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Pair your nutrition with our free library of{" "}
                  <Link
                    href="/workouts"
                    className="text-[#FF8C00] underline hover:text-[#ffaa40]"
                  >
                    structured workout routines
                  </Link>, filtered by split, experience level, and equipment.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
