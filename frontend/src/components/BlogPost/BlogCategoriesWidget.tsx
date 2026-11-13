import React from "react";
import Link from "next/link";
import {
  Layers,
  Dumbbell,
  Apple,
  Flame,
  Zap,
  Heart,
  Sparkles,
  Tag,
  ChevronRight,
} from "lucide-react";
import type { Category } from "@/interfaces/blog";

// Mapping category slugs to semantic Lucide icons
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  nutrition: Apple,
  "muscle-building": Dumbbell,
  "weight-loss": Flame,
  training: Zap,
  lifestyle: Heart,
  motivation: Sparkles,
};

// Fallback category roster for resiliency against network or API hiccups
const DEFAULT_CATEGORIES: Array<{ id?: number; name: string; slug: string }> = [
  { name: "Nutrition", slug: "nutrition" },
  { name: "Muscle Building", slug: "muscle-building" },
  { name: "Weight Loss", slug: "weight-loss" },
  { name: "Training", slug: "training" },
  { name: "Lifestyle", slug: "lifestyle" },
  { name: "Motivation", slug: "motivation" },
];

export interface BlogCategoriesWidgetProps {
  categories?: Category[];
  currentCategorySlug?: string;
  className?: string;
}

export default function BlogCategoriesWidget({
  categories = [],
  currentCategorySlug,
  className = "",
}: BlogCategoriesWidgetProps) {
  // Merge loaded categories with fallbacks and guarantee uniqueness
  const baseList = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;
  
  const categoryMap = new Map<string, { id?: number; name: string; slug: string }>();
  baseList.forEach((c) => {
    if (c.slug) categoryMap.set(c.slug.toLowerCase(), c);
  });

  const displayList = Array.from(categoryMap.values());

  return (
    <nav
      aria-label="Blog categories navigation"
      className={`rounded-3xl bg-[#243447] border border-white/10 p-5 sm:p-6 shadow-xl relative overflow-hidden ${className}`}
    >
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-[#FF8C00]/15 border border-[#FF8C00]/30 text-[#FF8C00]">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Explore Topics
          </h3>
        </div>

        <Link
          href="/blog"
          className="text-xs font-medium text-gray-400 hover:text-[#FF8C00] inline-flex items-center gap-0.5 transition-colors group/all"
          title="Browse all blog articles"
        >
          <span>All Posts</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover/all:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {displayList.map((cat) => {
          const isActive = currentCategorySlug
            ? cat.slug.toLowerCase() === currentCategorySlug.toLowerCase()
            : false;
          const Icon = CATEGORY_ICONS[cat.slug.toLowerCase()] || Tag;

          return (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className={`group/item inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#FF8C00] text-white shadow-md shadow-[#FF8C00]/25 ring-1 ring-[#FF8C00]/60 font-semibold"
                  : "bg-[#1B2B3B] text-gray-300 hover:text-white hover:bg-[#2d4258] hover:border-[#FF8C00]/40 border border-white/5"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`w-3.5 h-3.5 shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-[#FF8C00] group-hover/item:scale-110 transition-transform"
                }`}
              />
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

