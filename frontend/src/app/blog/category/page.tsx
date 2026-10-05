import { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/services/post.service";
import { 
  Dumbbell, 
  Apple, 
  HeartPulse, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Brain, 
  Activity, 
  ArrowRight, 
  BookOpen,
  Compass
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog Categories | Explore Fitness, Nutrition & Health Guides",
  description: "Browse all FitWay fitness, workout, nutrition, and wellness article categories. Discover expert advice, scientific training routines, and healthy living insights.",
  alternates: {
    canonical: "/blog/category",
  },
  openGraph: {
    title: "Blog Categories | FitWay",
    description: "Browse all FitWay fitness, workout, nutrition, and wellness article categories.",
    url: "https://fitway.best/blog/category",
    type: "website",
  },
};

// Map category slug / keywords to curated icon and color themes
function getCategoryDesign(slug: string, name: string) {
  const s = (slug + " " + name).toLowerCase();

  if (s.includes("nutrit") || s.includes("diet") || s.includes("food") || s.includes("eat")) {
    return {
      icon: Apple,
      gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      borderHover: "hover:border-emerald-500/50",
      accentColor: "text-emerald-400",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      iconGlow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]",
      defaultDescription: "Evidence-based meal strategies, micronutrients, supplementation, and fuel for peak athletic performance.",
    };
  }

  if (s.includes("workout") || s.includes("train") || s.includes("muscle") || s.includes("strength") || s.includes("fit")) {
    return {
      icon: Dumbbell,
      gradient: "from-[#FF8C00]/20 via-[#FF8C00]/5 to-transparent",
      borderHover: "hover:border-[#FF8C00]/50",
      accentColor: "text-[#FF8C00]",
      badgeBg: "bg-[#FF8C00]/10 text-[#FF8C00] border-[#FF8C00]/20",
      iconGlow: "group-hover:shadow-[0_0_30px_rgba(255,140,0,0.35)]",
      defaultDescription: "Hypertrophy science, biomechanics, full-body splits, and progressive overload principles for strength gains.",
    };
  }

  if (s.includes("weight") || s.includes("fat") || s.includes("cardio") || s.includes("burn") || s.includes("loss")) {
    return {
      icon: Flame,
      gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
      borderHover: "hover:border-rose-500/50",
      accentColor: "text-rose-400",
      badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      iconGlow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.35)]",
      defaultDescription: "Metabolic conditioning, sustainable caloric management, HIIT protocols, and body composition optimization.",
    };
  }

  if (s.includes("recover") || s.includes("health") || s.includes("sleep") || s.includes("wellness")) {
    return {
      icon: HeartPulse,
      gradient: "from-sky-500/20 via-sky-500/5 to-transparent",
      borderHover: "hover:border-sky-500/50",
      accentColor: "text-sky-400",
      badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      iconGlow: "group-hover:shadow-[0_0_30px_rgba(14,165,233,0.35)]",
      defaultDescription: "Sleep hygiene, CNS recovery, mobility protocols, and joint longevity backed by sports medicine.",
    };
  }

  if (s.includes("mind") || s.includes("mental") || s.includes("motivat") || s.includes("habit")) {
    return {
      icon: Brain,
      gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
      borderHover: "hover:border-purple-500/50",
      accentColor: "text-purple-400",
      badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      iconGlow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]",
      defaultDescription: "Psychological resilience, behavioral momentum, focus enhancement, and long-term consistency tools.",
    };
  }

  return {
    icon: Sparkles,
    gradient: "from-[#FFA500]/20 via-[#FFA500]/5 to-transparent",
    borderHover: "hover:border-[#FFA500]/50",
    accentColor: "text-[#FFA500]",
    badgeBg: "bg-[#FFA500]/10 text-[#FFA500] border-[#FFA500]/20",
    iconGlow: "group-hover:shadow-[0_0_30px_rgba(255,165,0,0.35)]",
    defaultDescription: "Deep dive articles, expert breakdowns, and science-backed fitness insights crafted for results.",
  };
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "FitWay Blog Categories",
    "description": "Explore fitness, workout, nutrition, and health guides organized by category.",
    "url": "https://fitway.best/blog/category",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": categories.map((cat, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": cat.name,
        "url": `https://fitway.best/blog/category/${cat.slug}`,
      })),
    },
  };

  return (
    <div className="py-12 md:py-16 min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Atmospheric Background Glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#FF8C00]/10 to-transparent blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-96 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[140px] -z-10" />

      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <header className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Compass className="w-4 h-4 text-[#FF8C00] animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-300">
              Curated Knowledge Hub
            </span>
          </div>

          <h1 className="section-title text-center mb-6">
            Explore by <span className="gradient-text">Topic & Category</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Navigate through our comprehensive collection of science-backed guides, training principles, and nutrition strategies tailored to elevate your performance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF8C00]" />
              Evidence-based Content
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600 hidden sm:inline" />
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#FF8C00]" />
              Peer-Reviewed Studies
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600 hidden sm:inline" />
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#FF8C00]" />
              {categories.length} Specialized Topics
            </span>
          </div>
        </header>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="card text-center py-20 max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-[#FF8C00] mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-2">No Categories Found</h2>
            <p className="text-gray-400 mb-6">We are currently organizing our blog archives.</p>
            <Link href="/blog" className="btn-primary inline-block">
              Return to Blog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category) => {
              const design = getCategoryDesign(category.slug, category.name);
              const IconComponent = design.icon;
              const description =
                category.intro?.trim() ||
                category.metaDescription?.trim() ||
                design.defaultDescription;

              return (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  className={`group relative card block p-8 rounded-[32px] overflow-hidden border border-white/10 ${design.borderHover} transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between`}
                >
                  {/* Subtle Gradient Backlight */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${design.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  {/* Top: Icon + Badge */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 ${design.iconGlow} group-hover:scale-110 group-hover:bg-[#1B2B3B]`}
                      >
                        <IconComponent className={`w-7 h-7 ${design.accentColor} transition-transform duration-500`} />
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${design.badgeBg} uppercase tracking-wider`}>
                        Category
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FF8C00] transition-colors duration-300">
                      {category.title?.trim() || category.name}
                    </h2>

                    <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 mb-6">
                      {description}
                    </p>
                  </div>

                  {/* Bottom: Action Link */}
                  <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                    <span className="flex items-center gap-1.5">
                      Explore Articles
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF8C00] group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom Navigation & CTA Banner */}
        <div className="mt-16 md:mt-20">
          <div className="relative card rounded-[32px] p-8 md:p-12 overflow-hidden border border-white/10 bg-gradient-to-r from-[#243447] via-[#1F2E3E] to-[#243447]">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Looking for All Articles in One Place?
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Check out our chronological blog stream with the latest breaking fitness studies, expert routines, and in-depth reviews.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/blog" className="btn-primary inline-flex items-center gap-2">
                  <span>View All Posts</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/workouts"
                  className="px-6 py-4 rounded-2xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300"
                >
                  Workout Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
