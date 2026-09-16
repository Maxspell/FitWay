import type { BlogPost } from "@/interfaces/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, User, Tag, Calendar, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import RelatedArticles from "@/components/BlogPost/RelatedArticles";
import { getPostImage } from "@/utils/image";
import TableOfContents from "@/components/BlogPost/TableOfContents";
import AuthorBox from "@/components/common/AuthorBox";
import ReviewedByBox from "@/components/common/ReviewedByBox";
import { slugify } from "@/utils/slugify";
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

async function getRelatedBlogPosts(slug: string): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${API_URL}/api/posts?populate[0]=image&populate[1]=author.photo&populate[2]=reviewedBy.photo&filters[slug][$ne]=${slug}&pagination[limit]=2`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) return [];
    const result = await response.json();

    return result.data || [];
  } catch (error) {
    console.error("Error fetching related blog posts:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) return { title: "Blog Post Not Found | FitWay" };

  const imageUrl = getPostImage(post, "large");

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
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
  const post = await getBlogPostBySlug(params.slug);
  const relatedPosts: BlogPost[] = await getRelatedBlogPosts(params.slug);

  if (!post) {
    notFound();
  }

  // First reviewer if available
  const primaryReviewer = post.reviewedBy && post.reviewedBy.length > 0 ? post.reviewedBy[0] : null;

  return (
    <article className="py-12">
      <div className="container mx-auto px-4">
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
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
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
          <div className="w-full lg:col-span-8">
            <div className="card prose prose-invert prose-orange max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => {
                    const text = React.Children.toArray(props.children).reduce(flatten, "");
                    const id = slugify(text);
                    return <h2 id={id} {...props} />;
                  },
                  h3: ({ node, ...props }) => {
                    const text = React.Children.toArray(props.children).reduce(flatten, "");
                    const id = slugify(text);
                    return <h3 id={id} {...props} />;
                  }
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
            
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

            {/* Related Categories */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Category</h3>
              <div className="flex flex-wrap gap-2">
                {post.category && (
                  <Link
                    href={`/blog/category/${post.category.slug}`}
                    className="px-3 py-1 bg-[#1B2B3B] text-[#FF8C00] rounded-full text-sm hover:bg-[#2d4258] transition-colors"
                  >
                    {post.category.name}
                  </Link>
                )}
              </div>
            </div>
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