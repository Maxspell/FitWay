import { Metadata } from "next";
import { getPaginatedBlogPosts, getCategories } from "@/services/post.service";
import BlogView from "@/components/BlogPost/BlogView";

export const metadata: Metadata = {
  title: "Fitness & Nutrition Blog",
  description: "Read the latest articles on fitness, workouts, nutrition, and health from the FitWay experts.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const [{ posts, pagination }, categories] = await Promise.all([
    getPaginatedBlogPosts(1, 9),
    getCategories(),
  ]);

  return (
    <BlogView
      posts={posts}
      categories={categories}
      currentPage={1}
      totalPages={pagination.pageCount || 1}
      basePath="/blog"
    />
  );
}