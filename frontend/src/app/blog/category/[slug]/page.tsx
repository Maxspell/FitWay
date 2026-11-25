import { Clock, User, Calendar, Calculator, BookOpen, ArrowDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPost, Category } from "@/interfaces/blog";
import { getPostImage } from "@/utils/image";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CATEGORY_QUICK_TOOLS: Record<string, { label: string; href: string; takeaway: string }> = {
  nutrition: {
    label: "Open Macro Calculator",
    href: "/tools/macro-calculator",
    takeaway: "Dial in daily protein, carbohydrate, and fat targets matched to peer-reviewed clinical ranges.",
  },
  "weight-loss": {
    label: "Open Calorie Deficit Calculator",
    href: "/tools/calorie-calculator",
    takeaway: "Set a sustainable 300-500 kcal deficit to lose body fat while preserving lean muscle mass.",
  },
  "muscle-building": {
    label: "Open 1RM Strength Calculator",
    href: "/tools/one-rep-max-calculator",
    takeaway: "Anchor your hypertrophy working sets to exact percentages of your submaximal one-rep max.",
  },
  training: {
    label: "Open 1RM Strength Calculator",
    href: "/tools/one-rep-max-calculator",
    takeaway: "Structure progressive overload, training splits, and mobility drills with clear load targets.",
  },
  lifestyle: {
    label: "Open Ideal Weight Calculator",
    href: "/tools/ideal-weight-calculator",
    takeaway: "Pair sustainable sleep, recovery, and daily movement habits with realistic body composition baselines.",
  },
  motivation: {
    label: "Open BMI & Health Calculator",
    href: "/tools/bmi-calculator",
    takeaway: "Turn short-term bursts into automatic training habits backed by behavioral psychology.",
  },
};

async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(`${API_URL}/api/categories?filters[slug][$eq]=${slug}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      next: { revalidate: 600 },
    });
    if (!response.ok) return null;
    const result = await response.json();
    return result.data && result.data.length > 0 ? result.data[0] : null;
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
}

async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(`${API_URL}/api/posts?filters[category][slug][$eq]=${categorySlug}&populate[0]=image&populate[1]=author&sort=createdAt:desc&pagination[pageSize]=250`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      next: { revalidate: 600 },
    });
    if (!response.ok) return [];
    const result = await response.json();
    return result.data ? result.data : [];
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return { title: "Category Not Found" };
  }

  const title = category.metaTitle?.trim()
    ? category.metaTitle.trim()
    : `${category.name} Articles`;

  const description = category.metaDescription?.trim()
    ? category.metaDescription.trim()
    : `Explore the latest articles in ${category.name} to elevate your fitness and health journey.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/category/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/blog/category/${params.slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(slug);
  const displayTitle = category.title?.trim() ? category.title.trim() : `${category.name} Articles`;
  const quickTool = CATEGORY_QUICK_TOOLS[slug] ?? {
    label: "Explore Fitness Calculators",
    href: "/tools",
    takeaway: "Combine evidence-based articles with FitWay calculators and structured training routines.",
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <header className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="section-title text-center mb-4">{displayTitle}</h1>
          {category.intro?.trim() && (
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {category.intro}
            </p>
          )}
        </header>

        {/* Above-the-fold Quick Start & Interactive Tool Hub */}
        <section
          aria-label="Category Quick Start"
          className="mb-10 rounded-2xl bg-[#243447] border border-white/10 p-4 sm:p-6 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF8C00]">
                <BookOpen className="h-4 w-4" />
                <span>Quick Start &amp; Key Takeaways</span>
                <span className="text-gray-300 font-normal normal-case">
                  ({posts.length} {posts.length === 1 ? "peer-reviewed guide" : "peer-reviewed guides"})
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {quickTool.takeaway}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {category.text?.trim() && (
                <a
                  href="#category-guide"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-gray-200 transition-colors"
                >
                  <span>Read Topic Guide &amp; FAQ</span>
                  <ArrowDownRight className="h-4 w-4 text-[#FF8C00]" />
                </a>
              )}
              <Link
                href={quickTool.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C25700] hover:bg-[#A34600] text-sm font-bold text-white transition-colors"
              >
                <Calculator className="h-4 w-4" />
                <span>{quickTool.label}</span>
              </Link>
            </div>
          </div>
        </section>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No articles found in this category yet.</p>
            <Link href="/blog" className="btn-primary inline-block mt-6">
              Back to all posts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
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
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author?.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
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

        {category.text?.trim() && (
          <section id="category-guide" className="mt-16 pt-12 border-t border-white/10 scroll-mt-24">
            <div className="card p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl prose prose-invert prose-orange max-w-none break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ node, children, ...props }) => (
                    <div className="my-6 w-full overflow-hidden rounded-xl border border-white/10 bg-[#1A2634]/60 shadow-md">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[520px] border-collapse text-left text-xs sm:text-sm" {...props}>
                          {children}
                        </table>
                      </div>
                    </div>
                  ),
                  thead: ({ node, children, ...props }) => (
                    <thead className="bg-[#121C26]/90 text-[#FF8C00] text-xs uppercase tracking-wider font-semibold border-b border-white/10" {...props}>
                      {children}
                    </thead>
                  ),
                  th: ({ node, children, ...props }) => (
                    <th className="px-3.5 sm:px-4 py-3 font-semibold text-white/90 border-b border-white/10 whitespace-nowrap" {...props}>
                      {children}
                    </th>
                  ),
                  td: ({ node, children, ...props }) => (
                    <td className="px-3.5 sm:px-4 py-3 border-b border-white/5 text-gray-300 text-xs sm:text-sm leading-normal" {...props}>
                      {children}
                    </td>
                  ),
                  tr: ({ node, children, ...props }) => (
                    <tr className="border-b border-white/5 transition-colors hover:bg-white/[0.03] last:border-b-0" {...props}>
                      {children}
                    </tr>
                  ),
                }}
              >
                {category.text}
              </ReactMarkdown>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
