import { Clock, User, Tag, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPost } from "@/interfaces/blog";
import { getPostImage } from "@/utils/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fitness & Nutrition Blog",
  description: "Read the latest articles on fitness, workouts, nutrition, and health from the FitWay experts.",
  alternates: {
    canonical: "/blog",
  },
};

async function getBlogPosts() {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const response = await fetch(`${API_URL}/api/posts?populate=image&sort=createdAt:desc`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    next: {
      revalidate: 600, // 10 minutes
    },
  });
  const result = await response.json();

  return result.data ? result.data : [];
}

export default async function Blog() {
  const postsData: BlogPost[] = await getBlogPosts();

  if (!postsData || postsData.length === 0) {
    notFound();
  }

  const blogPosts = postsData;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center">Latest Health & Fitness Articles</h1>

        {/* Featured Post */}
        <Link href={`/blog/${blogPosts[0].slug}`} className="card mb-12 block hover:ring-2 hover:ring-[#FF8C00] transition-all">
          <div className="flex gap-8">
            <div className="w-1/2 relative h-[400px]">
              <Image
                src={getPostImage(blogPosts[0], "large")}
                alt={blogPosts[0].title}
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
            <div className="w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-[#FF8C00] mb-4">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {blogPosts[0].author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(blogPosts[0].createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {blogPosts[0].readTime}
                </span>
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {blogPosts[0].category}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-300 mb-6">{blogPosts[0].excerpt}</p>
              <span className="btn-primary inline-block w-fit">
                Read More
              </span>
            </div>
          </div>
        </Link>

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-2 gap-8">
          {blogPosts.slice(1).map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card block hover:ring-2 hover:ring-[#FF8C00] transition-all">
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
                  {post.author}
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
              <span className="btn-primary inline-block w-fit">
                Read More
              </span>
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="grid grid-cols-4 gap-4">
            {["Fitness Programs", "Nutrition", "Health", "Psychology"].map(category => (
              <button key={category} className="card hover:bg-[#2d4258] transition-colors">
                <h3 className="text-lg font-semibold text-center">{category}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}