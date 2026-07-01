import { Clock, User, Tag, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPost, Category } from "@/interfaces/blog";
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
  const response = await fetch(`${API_URL}/api/posts?populate[0]=image&populate[1]=category&sort=createdAt:desc`, {
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

async function getCategories() {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const response = await fetch(`${API_URL}/api/categories`, {
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
  const categoriesData: Category[] = await getCategories();

  if (!postsData || postsData.length === 0) {
    notFound();
  }

  const blogPosts = postsData;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": blogPosts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://fitway.com/blog/${post.slug}`,
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
        <h1 className="section-title text-center">Latest Health & Fitness Articles</h1>

        <section className="bg-gray-800 rounded-lg p-8 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Unlock Your Potential with FitWay Insights</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Welcome to the FitWay Blog, your ultimate resource for evidence-based fitness, nutrition, and wellness information.
            Our mission is to empower you with the knowledge and tools to achieve your health goals, whether you're a beginner
            embarking on your fitness journey or an experienced athlete looking to optimize performance. Dive into expertly
            crafted articles covering a wide range of topics, from effective workout routines and cutting-edge training methodologies
            to balanced nutrition plans, mental well-being strategies, and injury prevention tips.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            Each piece of content is developed and reviewed by our team of certified fitness professionals, registered dietitians,
            and health experts, ensuring accuracy, relevance, and actionable advice. We believe in a holistic approach to health,
            integrating the latest scientific research with practical applications to help you build sustainable habits and
            transform your life. Explore our categories to find articles tailored to your interests, and join a community
            dedicated to living a stronger, healthier, and more vibrant life.
          </p>
          <p className="text-gray-300 leading-relaxed">
            From in-depth guides on strength training and cardio to comprehensive breakdowns of macronutrients and meal prep ideas,
            the FitWay Blog is designed to be your go-to source for reliable information. Stay updated with our latest posts and
            discover new ways to elevate your fitness journey. Our content is regularly updated to reflect the evolving landscape
            of health and fitness, providing you with fresh perspectives and proven strategies.
          </p>
        </section>

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
                  {blogPosts[0].author?.name}
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
                  {blogPosts[0].category?.name}
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
            {categoriesData.map(category => (
              <Link key={category.slug} href={`/blog/category/${category.slug}`} className="card hover:bg-[#2d4258] transition-colors block text-center">
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}