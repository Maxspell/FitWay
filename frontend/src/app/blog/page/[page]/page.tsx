import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getPaginatedBlogPosts, getCategories } from "@/services/post.service";
import BlogView from "@/components/BlogPost/BlogView";

interface PageProps {
  params: {
    page: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageNum = parseInt(params.page, 10);
  if (isNaN(pageNum) || pageNum < 1) {
    return {
      title: "Blog - Page Not Found",
    };
  }

  // Canonical for page 1 is always the root /blog to prevent duplicate content
  const canonicalUrl = pageNum === 1 ? "/blog" : `/blog/page/${pageNum}`;

  return {
    title: `Fitness & Nutrition Blog - Page ${pageNum}`,
    description: `Browse page ${pageNum} of fitness articles, workout routines, and expert nutrition advice from FitWay.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Fitness & Nutrition Blog - Page ${pageNum}`,
      description: `Browse page ${pageNum} of fitness articles, workout routines, and expert nutrition advice from FitWay.`,
      url: canonicalUrl,
    },
  };
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const pageNum = parseInt(params.page, 10);

  // If someone requests page 1 via /blog/page/1, redirect permanently to /blog for clean SEO
  if (pageNum === 1) {
    redirect("/blog");
  }

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  const [{ posts, pagination }, categories] = await Promise.all([
    getPaginatedBlogPosts(pageNum, 9),
    getCategories(),
  ]);

  // If page exceeds available pageCount (when total > 0), return 404
  if (pagination.pageCount > 0 && pageNum > pagination.pageCount) {
    notFound();
  }

  return (
    <BlogView
      posts={posts}
      categories={categories}
      currentPage={pageNum}
      totalPages={pagination.pageCount || 1}
      basePath="/blog"
    />
  );
}
