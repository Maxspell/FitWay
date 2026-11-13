import type { BlogPost } from "@/interfaces/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, User, Tag, Calendar, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RelatedArticles from "@/components/BlogPost/RelatedArticles";
import { getPostImage } from "@/utils/image";
import TableOfContents from "@/components/BlogPost/TableOfContents";
import AuthorBox from "@/components/common/AuthorBox";
import ReviewedByBox from "@/components/common/ReviewedByBox";
import { slugify } from "@/utils/slugify";
import ShareButtons from "@/components/BlogPost/ShareButtons";
import TweetEmbed from "@/components/BlogPost/TweetEmbed";
import FitnessToolsSidebarWidget from "@/components/calculators/FitnessToolsSidebarWidget";
import BlogCategoriesWidget from "@/components/BlogPost/BlogCategoriesWidget";
import { getCategories } from "@/services/post.service";
import React from "react";

// Helper to extract text from ReactMarkdown children
function flatten(text: string, child: React.ReactNode): string {
  if (typeof child === "string") return text + child;
  if (React.isValidElement(child) && child.props.children) {
    return React.Children.toArray(child.props.children).reduce(flatten, text);
  }
  return text;
}

interface Props {
  params: {
    slug: string;
  };
}

// Constants
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Functions
async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${API_URL}/api/posts?populate[0]=image&populate[1]=author.photo&populate[2]=reviewedBy.photo&populate[3]=category&filters[slug][$eq]=${slug}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      next: {
        revalidate: 600, // 10 minutes
      },
    });

    if (!response.ok) return null;
    const result = await response.json();

    if (!result.data || result.data.length === 0) {
      return null;
    }

    return result.data[0];
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

async function getRelatedBlogPosts(slug: string, categorySlug?: string): Promise<BlogPost[]> {
  try {
    let url = `${API_URL}/api/posts?populate[0]=image&populate[1]=author.photo&populate[2]=reviewedBy.photo&populate[3]=category&filters[slug][$ne]=${slug}&sort=createdAt:desc&pagination[limit]=3`;

    if (categorySlug) {
      url += `&filters[category][slug][$eq]=${categorySlug}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      next: {
        revalidate: 600,
      }
    });

    if (!response.ok) return [];
    const result = await response.json();
    let posts = result.data || [];

    // Fallback if not enough category-specific posts exist
    if (posts.length < 3 && categorySlug) {
      const fallbackUrl = `${API_URL}/api/posts?populate[0]=image&populate[1]=author.photo&populate[2]=reviewedBy.photo&populate[3]=category&filters[slug][$ne]=${slug}&sort=createdAt:desc&pagination[limit]=3`;
      const fallbackRes = await fetch(fallbackUrl, {
        headers: {
          "Authorization": `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json"
        },
        next: { revalidate: 600 }
      });
      if (fallbackRes.ok) {
        const fallbackResult = await fallbackRes.json();
        const fallbackPosts = fallbackResult.data || [];
        const existingSlugs = new Set(posts.map((p: BlogPost) => p.slug));
        for (const fbPost of fallbackPosts) {
          if (!existingSlugs.has(fbPost.slug) && posts.length < 3) {
            posts.push(fbPost);
            existingSlugs.add(fbPost.slug);
          }
        }
      }
    }

    return posts;
  } catch (error) {
    console.error("Error fetching related blog posts:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) return { title: "Blog Post Not Found" };

  let imageUrl = getPostImage(post, "large");
  // Ensure the image URL is strictly absolute
  if (imageUrl && !imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fitway.best";
    imageUrl = `${siteUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  }

  const imageObj = imageUrl
    ? [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ]
    : [];

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${params.slug}`,
      type: "article",
      images: imageObj,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

// Component
export default async function BlogPost({ params }: Props) {
  const [post, categories] = await Promise.all([
    getBlogPostBySlug(params.slug),
    getCategories(),
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts: BlogPost[] = await getRelatedBlogPosts(params.slug, post.category?.slug);

  // First reviewer if available
  const primaryReviewer = post.reviewedBy && post.reviewedBy.length > 0 ? post.reviewedBy[0] : null;

  return (
    <article className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="relative h-72 sm:h-96 md:h-[500px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={getPostImage(post, "large")}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3B] via-[#1B2B3B]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#FF8C00] text-xs sm:text-sm mb-3 sm:mb-4">
              {post.author && (
                <Link 
                  href={`/authors/${post.author.slug}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <User className="h-4 w-4 shrink-0" />
                  <span>By {post.author.name}</span>
                </Link>
              )}

              {primaryReviewer && (
                <Link
                  href={`/authors/${primaryReviewer.slug}`}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00C853]/20 text-[#00E676] border border-[#00C853]/40 text-xs font-medium hover:bg-[#00C853]/30 transition-colors"
                  title={`Reviewed by ${primaryReviewer.name}`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>Reviewed by {primaryReviewer.name}</span>
                </Link>
              )}

              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 shrink-0" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 shrink-0" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4 shrink-0" />
                {post.category?.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          <div className="w-full lg:col-span-8 min-w-0">
            <div className="card p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl prose prose-invert prose-orange max-w-none break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, children, ...props }) => {
                    // Check if children contain a TweetEmbed by checking child elements
                    return (
                      <div
                        className="mb-4 text-gray-300 text-[15px] sm:text-base leading-relaxed sm:leading-loose"
                        {...props}
                      >
                        {children}
                      </div>
                    );
                  },
                  h2: ({ node, ...props }) => {
                    const text = React.Children.toArray(props.children).reduce(flatten, "");
                    const id = slugify(text);
                    return (
                      <h2
                        id={id}
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-8 mb-4 tracking-tight scroll-mt-24"
                        {...props}
                      />
                    );
                  },
                  h3: ({ node, ...props }) => {
                    const text = React.Children.toArray(props.children).reduce(flatten, "");
                    const id = slugify(text);
                    return (
                      <h3
                        id={id}
                        className="text-lg sm:text-xl md:text-2xl font-semibold text-white mt-6 mb-3 tracking-tight scroll-mt-24"
                        {...props}
                      />
                    );
                  },
                  ul: ({ node, children, ...props }) => (
                    <ul className="my-4 space-y-2 list-disc list-outside pl-5 sm:pl-6 text-gray-300 text-[15px] sm:text-base leading-relaxed" {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({ node, children, ...props }) => (
                    <ol className="my-4 space-y-2 list-decimal list-outside pl-5 sm:pl-6 text-gray-300 text-[15px] sm:text-base leading-relaxed" {...props}>
                      {children}
                    </ol>
                  ),
                  li: ({ node, children, ...props }) => (
                    <li className="pl-1 text-gray-300 leading-relaxed" {...props}>
                      {children}
                    </li>
                  ),
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
                  blockquote: ({ node, children, ...props }) => (
                    <blockquote className="my-5 border-l-4 border-[#FF8C00] bg-white/[0.03] rounded-r-xl px-4 py-3 text-gray-300 italic text-sm sm:text-base" {...props}>
                      {children}
                    </blockquote>
                  ),
                  pre: ({ node, children, ...props }) => (
                    <div className="my-5 w-full overflow-hidden rounded-xl border border-white/10 bg-[#121C26]">
                      <div className="overflow-x-auto p-4">
                        <pre className="text-xs sm:text-sm font-mono text-gray-200" {...props}>
                          {children}
                        </pre>
                      </div>
                    </div>
                  ),
                  code: ({ node, className, children, ...props }) => {
                    const isInline = !className && typeof children === "string";
                    if (isInline) {
                      return (
                        <code className="px-1.5 py-0.5 rounded bg-white/10 text-[#FF8C00] font-mono text-xs sm:text-sm" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return <code className={className} {...props}>{children}</code>;
                  },
                  a: ({ node, href, children, ...props }) => {
                    if (href) {
                      // Support twitter.com and x.com status links
                      const twitterMatch = href.match(
                        /(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/i
                      );
                      if (twitterMatch && twitterMatch[2]) {
                        return <TweetEmbed id={twitterMatch[2]} />;
                      }
                    }

                    const isExternal = href?.startsWith("http://") || href?.startsWith("https://");
                    if (isExternal) {
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        >
                          {children}
                        </a>
                      );
                    }
                    return (
                      <Link href={href || "#"} {...props}>
                        {children}
                      </Link>
                    );
                  }
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
            
            {/* Social Share Section */}
            <ShareButtons 
              title={post.title} 
              description={post.excerpt}
              heading="Found this article helpful? Share it!"
              url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://fitway.best'}/blog/${post.slug}`}
            />

            {/* Reviewer Verification Box (E-E-A-T) */}
            {primaryReviewer && (
              <ReviewedByBox 
                reviewer={primaryReviewer} 
                reviewDate={post.publishedAt}
                isMedical={post.category?.slug === 'nutrition' || post.category?.slug === 'supplements'}
              />
            )}

            {/* Full Author Box below content */}
            {post.author && <AuthorBox author={post.author} />}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
            <TableOfContents />

            {/* Explore Topics (Categories Silo Navigation) */}
            <BlogCategoriesWidget
              categories={categories}
              currentCategorySlug={post.category?.slug}
            />

            {/* Smart Fitness Tools Suite Widget */}
            <FitnessToolsSidebarWidget category={post.category?.name || post.category?.slug} />
          </div>
        </div>

        {/* Related Articles */}
        <RelatedArticles relatedPosts={relatedPosts} />
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": getPostImage(post, "large"),
            ...(post.author && {
              "author": {
                "@type": "Person",
                "name": post.author.name,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fitway.best'}/authors/${post.author.slug}`
              }
            }),
            ...(post.reviewedBy && post.reviewedBy.length > 0 && {
              "reviewedBy": post.reviewedBy.map(reviewer => ({
                "@type": "Person",
                "name": reviewer.name,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fitway.best'}/authors/${reviewer.slug}`
              }))
            }),
            "datePublished": post.publishedAt,
            "articleSection": post.category?.name,
          }),
        }}
      />
    </article>
  );
}