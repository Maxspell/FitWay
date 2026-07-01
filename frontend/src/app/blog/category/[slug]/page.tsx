import { Clock, User, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPost, Category } from "@/interfaces/blog";
import { getPostImage } from "@/utils/image";
import { Metadata } from "next";

async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const response = await fetch(`${API_URL}/api/categories?filters[slug][$eq]=${slug}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    next: { revalidate: 600 },
  });
  const result = await response.json();
  return result.data && result.data.length > 0 ? result.data[0] : null;
}

async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const response = await fetch(`${API_URL}/api/posts?filters[category][slug][$eq]=${categorySlug}&populate[0]=image&populate[1]=author&sort=createdAt:desc`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    next: { revalidate: 600 },
  });
  const result = await response.json();
  return result.data ? result.data : [];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return { title: "Category Not Found" };
  }
  return {
    title: `${category.name} Articles | FitWay`,
    description: `Explore the latest articles in ${category.name} to elevate your fitness and health journey.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(slug);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-12">{category.name} Articles</h1>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No articles found in this category yet.</p>
            <Link href="/blog" className="btn-primary inline-block mt-6">
              Back to all posts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {posts.map(post => (
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
        )}
      </div>
    </div>
  );
}
