import { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  FileText,
  FolderTree,
  Dumbbell,
  Users,
  ShieldCheck,
  Calculator,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { getCategories, getAllPostsSummary, PostSummary } from "@/services/post.service";
import { getWorkouts } from "@/services/workout.service";
import { getAuthors } from "@/services/author.service";
import { Workout } from "@/interfaces/workout";
import { Category } from "@/interfaces/blog";
import { Author } from "@/interfaces/author";

// ISR revalidation: refresh HTML sitemap every 1 hour (3600 seconds)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "HTML Sitemap | FitWay Architecture & Navigation",
  description:
    "Complete directory of all pages, workout routines, fitness guides, and health calculators on FitWay. Browse topics, authors, and evidence-based articles.",
  alternates: {
    canonical: "https://fitway.best/sitemap",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Sitemap | FitWay",
    description:
      "Explore the complete index of FitWay workouts, fitness articles, nutritional guides, and health calculators.",
    url: "https://fitway.best/sitemap",
    siteName: "FitWay",
    type: "website",
  },
};

interface StaticPageLink {
  title: string;
  href: string;
  description: string;
  badge?: string;
}

const mainPages: StaticPageLink[] = [
  {
    title: "Home",
    href: "/",
    description: "AI-powered workout plans, expert coaching, and personalized fitness journey starting point.",
  },
  {
    title: "Workouts Library",
    href: "/workouts",
    description: "Complete database of science-backed strength, hypertrophy, and HIIT training programs.",
    badge: "Core",
  },
  {
    title: "Fitness & Nutrition Blog",
    href: "/blog",
    description: "Evidence-based articles on sports nutrition, muscle growth mechanics, and body composition.",
    badge: "Articles",
  },
  {
    title: "Blog Categories Directory",
    href: "/blog/category",
    description: "Taxonomy of fitness subjects: nutrition, weight loss, strength routines, and wellness.",
    badge: "Hub",
  },
  {
    title: "Free Fitness Calculators & Tools",
    href: "/tools",
    description: "Interactive BMI calculator, TDEE, and daily caloric deficit/surplus requirement tools.",
    badge: "Interactive",
  },
  {
    title: "Our Certified Experts & Authors",
    href: "/authors",
    description: "Certified strength and conditioning specialists (CSCS), sports nutritionists, and coaches.",
    badge: "E-E-A-T",
  },
  {
    title: "About FitWay",
    href: "/about",
    description: "Our mission to democratize elite fitness coaching with AI technology and exercise science.",
  },
  {
    title: "Contact & Support",
    href: "/contact",
    description: "Customer service, technical support, general fitness inquiries, and frequently asked questions.",
  },
];

const legalPages: StaticPageLink[] = [
  {
    title: "Editorial Policy & Quality Standards",
    href: "/editorial-policy",
    description: "Fact-checking methodology, peer review workflow, PubMed citations, and medical disclosures.",
    badge: "Trust",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    description: "Details regarding data security, analytics, cookies, and user privacy protection.",
  },
  {
    title: "Terms of Service",
    href: "/terms-of-service",
    description: "User agreements, legal terms of use, and vital medical liability disclaimers.",
  },
];

export default async function SitemapPage() {
  const [categories, posts, workouts, authors] = await Promise.all([
    getCategories(),
    getAllPostsSummary(),
    getWorkouts(),
    getAuthors(),
  ]);

  // Group posts by Category slug for structured scanning
  const categoryMap = new Map<string, Category>();
  categories.forEach((cat) => {
    if (cat.slug) categoryMap.set(cat.slug, cat);
  });

  const postsByCategory: { [key: string]: { categoryName: string; categorySlug: string; posts: PostSummary[] } } = {};
  const uncategorizedPosts: PostSummary[] = [];

  // Initialize buckets for all known categories so empty ones aren't lost or can show count
  categories.forEach((cat) => {
    postsByCategory[cat.slug] = {
      categoryName: cat.name || cat.title || cat.slug,
      categorySlug: cat.slug,
      posts: [],
    };
  });

  posts.forEach((post) => {
    const catSlug = post.category?.slug;
    if (catSlug && postsByCategory[catSlug]) {
      postsByCategory[catSlug].posts.push(post);
    } else if (catSlug) {
      // Dynamic category not in getCategories list
      if (!postsByCategory[catSlug]) {
        postsByCategory[catSlug] = {
          categoryName: post.category?.name || catSlug,
          categorySlug: catSlug,
          posts: [],
        };
      }
      postsByCategory[catSlug].posts.push(post);
    } else {
      uncategorizedPosts.push(post);
    }
  });

  // Active category groups with posts
  const populatedCategoryGroups = Object.values(postsByCategory).filter(
    (group) => group.posts.length > 0
  );

  const totalIndexedLinks =
    mainPages.length +
    legalPages.length +
    categories.length +
    posts.length +
    workouts.length +
    authors.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://fitway.best/sitemap",
        "url": "https://fitway.best/sitemap",
        "name": "Sitemap | FitWay",
        "description": "Comprehensive HTML sitemap indexing all canonical pages, workouts, guides, and tools on FitWay.",
        "isPartOf": {
          "@type": "WebSite",
          "name": "FitWay",
          "url": "https://fitway.best",
        },
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Main Site Navigation",
        "url": "https://fitway.best/sitemap",
      },
    ],
  };

  return (
    <div className="py-12 md:py-20 min-h-screen relative overflow-hidden bg-[#1B2B3B] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-b from-[#FF8C00]/10 via-[#FF8C00]/5 to-transparent blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-[40rem] -left-32 w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-[80rem] -right-32 w-[600px] h-[600px] bg-sky-500/5 blur-[160px] -z-10" />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Hero Section */}
        <header className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Compass className="w-4 h-4 text-[#FF8C00] animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-300">
              Site Architecture & Index
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            FitWay <span className="gradient-text">HTML Sitemap</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            A comprehensive, clean index of all verified workout routines, evidence-based nutrition articles, interactive fitness calculators, and verified author profiles.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-white/10 text-left">
            <div className="bg-[#243447]/60 border border-white/5 p-4 rounded-2xl">
              <span className="text-xs text-gray-400 block mb-1">Total Indexed</span>
              <span className="text-2xl font-bold text-white">{totalIndexedLinks}</span>
              <span className="text-[11px] text-[#FF8C00] block mt-0.5">Live Canonical URLs</span>
            </div>
            <div className="bg-[#243447]/60 border border-white/5 p-4 rounded-2xl">
              <span className="text-xs text-gray-400 block mb-1">Articles</span>
              <span className="text-2xl font-bold text-white">{posts.length}</span>
              <span className="text-[11px] text-emerald-400 block mt-0.5">Peer-Reviewed</span>
            </div>
            <div className="bg-[#243447]/60 border border-white/5 p-4 rounded-2xl">
              <span className="text-xs text-gray-400 block mb-1">Programs</span>
              <span className="text-2xl font-bold text-white">{workouts.length}</span>
              <span className="text-[11px] text-sky-400 block mt-0.5">Workout Routines</span>
            </div>
            <div className="bg-[#243447]/60 border border-white/5 p-4 rounded-2xl">
              <span className="text-xs text-gray-400 block mb-1">Taxonomies</span>
              <span className="text-2xl font-bold text-white">{categories.length}</span>
              <span className="text-[11px] text-purple-400 block mt-0.5">Topic Clusters</span>
            </div>
          </div>
        </header>

        {/* Anchor Quick-Jump Ribbon */}
        <nav aria-label="Sitemap Quick Jump" className="mb-14">
          <div className="bg-[#243447]/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold">
            <span className="text-gray-400 hidden md:inline-flex items-center gap-1.5 px-2">
              <FolderTree className="w-4 h-4 text-[#FF8C00]" /> Jump to:
            </span>
            <a href="#main-sections" className="px-3 py-1.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors">
              Core Pages
            </a>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <a href="#blog-categories" className="px-3 py-1.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors">
              Categories ({categories.length})
            </a>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <a href="#blog-articles" className="px-3 py-1.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors">
              Blog Articles ({posts.length})
            </a>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <a href="#workouts" className="px-3 py-1.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors">
              Workouts ({workouts.length})
            </a>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <a href="#authors" className="px-3 py-1.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors">
              Authors ({authors.length})
            </a>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <a href="#legal-trust" className="px-3 py-1.5 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-colors">
              Legal & Trust
            </a>
          </div>
        </nav>

        {/* Section 1: Main Core Pages */}
        <section id="main-sections" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 flex items-center justify-center text-[#FF8C00]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Main Website Sections</h2>
              <p className="text-sm text-gray-400">Primary landing hubs, tools, and discovery interfaces</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainPages.map((page) => (
              <div
                key={page.href}
                className="card bg-[#243447]/50 hover:bg-[#243447] border border-white/5 hover:border-white/15 p-6 rounded-2xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <Link
                    href={page.href}
                    className="text-lg font-bold text-white group-hover:text-[#FF8C00] transition-colors inline-flex items-center gap-2"
                  >
                    {page.title}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                  {page.badge && (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300 uppercase tracking-wider">
                      {page.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  {page.description}
                </p>
                <div className="text-xs text-gray-500 font-mono">
                  {`https://fitway.best${page.href}`}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Blog Categories (Taxonomies) */}
        <section id="blog-categories" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Blog Categories & Topic Clusters</h2>
              <p className="text-sm text-gray-400">Categorical archives targeting specific wellness domains</p>
            </div>
          </div>

          {categories.length === 0 ? (
            <div className="card text-center py-10 text-gray-400">No categories found.</div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/blog/category/${category.slug}`}
                    className="card block bg-[#243447]/50 hover:bg-[#243447] border border-white/5 hover:border-purple-500/30 p-5 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                        {category.title?.trim() || category.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
                    </div>
                    {category.intro && (
                      <p className="text-xs text-gray-300 line-clamp-2 mb-2">
                        {category.intro}
                      </p>
                    )}
                    <div className="text-[11px] text-gray-500 font-mono">
                      /blog/category/{category.slug}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Section 3: Published Blog Articles (Grouped by Category) */}
        <section id="blog-articles" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                All Published Articles ({posts.length})
              </h2>
              <p className="text-sm text-gray-400">Grouped by topical discipline for quick research</p>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="card text-center py-12 text-gray-400">
              No blog posts published yet.
            </div>
          ) : (
            <div className="space-y-8">
              {populatedCategoryGroups.map((group) => (
                <div
                  key={group.categorySlug}
                  className="card bg-[#243447]/40 border border-white/5 p-6 rounded-2xl"
                >
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      {group.categoryName}
                      <span className="text-xs text-gray-400 font-normal">
                        ({group.posts.length} {group.posts.length === 1 ? "article" : "articles"})
                      </span>
                    </h3>
                    <Link
                      href={`/blog/category/${group.categorySlug}`}
                      className="text-xs text-[#FF8C00] hover:underline flex items-center gap-1"
                    >
                      View Category &rarr;
                    </Link>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0">
                    {group.posts.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-transparent hover:border-white/10 transition-all block group"
                        >
                          <div className="text-sm font-semibold text-gray-200 group-hover:text-[#FF8C00] transition-colors leading-snug">
                            {post.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-500">
                            <span className="font-mono text-gray-400">/blog/{post.slug}</span>
                            {post.publishedAt && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-gray-500" />
                                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Uncategorized articles if any exist */}
              {uncategorizedPosts.length > 0 && (
                <div className="card bg-[#243447]/40 border border-white/5 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-white/5">
                    General Fitness & Health Guides ({uncategorizedPosts.length})
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0">
                    {uncategorizedPosts.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-transparent hover:border-white/10 transition-all block group"
                        >
                          <div className="text-sm font-semibold text-gray-200 group-hover:text-[#FF8C00] transition-colors leading-snug">
                            {post.title}
                          </div>
                          <div className="text-[11px] text-gray-400 font-mono mt-1">
                            /blog/{post.slug}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Section 4: Workouts Library */}
        <section id="workouts" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Workout Programs & Routines ({workouts.length})
              </h2>
              <p className="text-sm text-gray-400">
                Exercise routines classified with sets, reps, and biomechanics
              </p>
            </div>
          </div>

          {workouts.length === 0 ? (
            <div className="card text-center py-10 text-gray-400">
              No workout programs found.
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
              {workouts.map((workout) => (
                <li key={workout.slug}>
                  <Link
                    href={`/workouts/${workout.slug}`}
                    className="card block bg-[#243447]/50 hover:bg-[#243447] border border-white/5 hover:border-sky-500/30 p-5 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-base font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                        {workout.title}
                      </span>
                      {workout.difficulty && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 shrink-0">
                          {workout.difficulty}
                        </span>
                      )}
                    </div>
                    {workout.description && (
                      <p className="text-xs text-gray-300 line-clamp-2 mb-3">
                        {workout.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-white/5">
                      <span className="font-mono text-gray-400">/workouts/{workout.slug}</span>
                      {workout.duration && <span>{workout.duration} min</span>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Section 5: Authors & Medical Reviewers */}
        <section id="authors" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Authors & Reviewers Directory ({authors.length})
              </h2>
              <p className="text-sm text-gray-400">
                E-E-A-T verified contributors, trainers, and nutrition specialists
              </p>
            </div>
          </div>

          {authors.length === 0 ? (
            <div className="card text-center py-10 text-gray-400">
              No author profiles found.
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
              {authors.map((author) => (
                <li key={author.slug}>
                  <Link
                    href={`/authors/${author.slug}`}
                    className="card block bg-[#243447]/50 hover:bg-[#243447] border border-white/5 hover:border-amber-500/30 p-5 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {author.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
                    </div>
                    {(author.jobTitle || author.credentials) && (
                      <p className="text-xs text-[#FF8C00] font-medium mb-2">
                        {author.jobTitle || author.credentials}
                      </p>
                    )}
                    <div className="text-[11px] text-gray-500 font-mono">
                      /authors/{author.slug}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Section 6: Legal, Editorial Standards & Trust */}
        <section id="legal-trust" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Legal, Trust & Policies</h2>
              <p className="text-sm text-gray-400">
                Editorial verification, scientific fact-checking, and user governance policies
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {legalPages.map((page) => (
              <div
                key={page.href}
                className="card bg-[#243447]/50 hover:bg-[#243447] border border-white/5 hover:border-rose-500/30 p-6 rounded-2xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <Link
                    href={page.href}
                    className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    {page.title}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                  {page.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      {page.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  {page.description}
                </p>
                <div className="text-xs text-gray-500 font-mono">
                  {`https://fitway.best${page.href}`}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* XML Sitemap Footer Note for Bots */}
        <div className="card rounded-2xl p-6 border border-white/10 bg-[#243447]/60 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF8C00]" />
              Machine-Readable XML Sitemap
            </h4>
            <p className="text-xs text-gray-300">
              For search console crawlers and automated aggregators, refer to the XML protocol.
            </p>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
          >
            <span>Open sitemap.xml</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FF8C00]" />
          </a>
        </div>
      </div>
    </div>
  );
}
