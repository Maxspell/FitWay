import { Clock, User, Tag, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, Category } from "@/interfaces/blog";
import { getPostImage } from "@/utils/image";
import Pagination from "@/components/common/Pagination";

interface BlogViewProps {
  posts: BlogPost[];
  categories: Category[];
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function BlogView({
  posts,
  categories,
  currentPage,
  totalPages,
  basePath = "/blog",
}: BlogViewProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4 text-center py-20">
          <h1 className="section-title">Latest Health & Fitness Articles</h1>
          <p className="text-gray-400 text-xl mt-6">No articles published yet. Check back soon!</p>
          {currentPage > 1 && (
            <Link href="/blog" className="btn-primary inline-block mt-8">
              Back to Blog
            </Link>
          )}
        </div>
      </div>
    );
  }

  // On page 1, featured post is the very first post, and remaining 8 posts go into the grid
  // On page 2+, all 9 posts are shown in the grid so the user can easily scan the paginated catalogue
  const isFirstPage = currentPage === 1;
  const featuredPost = isFirstPage ? posts[0] : null;
  const gridPosts = isFirstPage ? posts.slice(1) : posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": posts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1 + (currentPage - 1) * 9,
      "url": `https://fitway.best/blog/${post.slug}`,
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
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="section-title mb-4">Latest Health & Fitness Articles</h1>
          {currentPage > 1 ? (
            <p className="text-gray-400 text-base sm:text-lg">
              Browsing page <span className="text-[#FF8C00] font-semibold">{currentPage}</span> of{" "}
              <span className="text-[#FF8C00] font-semibold">{totalPages}</span>
            </p>
          ) : (
            <p className="text-gray-400 text-base sm:text-lg">
              Explore science-backed guides, workout routines, and expert nutrition tips.
            </p>
          )}
        </div>

        {/* Featured Post (Only on Page 1) */}
        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="card mb-12 block hover:ring-2 hover:ring-[#FF8C00] transition-all group"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="w-full md:w-1/2 relative h-56 sm:h-72 md:h-[400px] overflow-hidden rounded-2xl">
                <Image
                  src={getPostImage(featuredPost, "large")}
                  alt={featuredPost.title}
                  fill
                  className="rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[#FF8C00] text-sm mb-3 sm:mb-4">
                  {featuredPost.author?.name && (
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4 shrink-0" />
                      {featuredPost.author.name}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 shrink-0" />
                    {new Date(featuredPost.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {featuredPost.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 shrink-0" />
                      {featuredPost.readTime}
                    </span>
                  )}
                  {featuredPost.category?.name && (
                    <span className="flex items-center gap-1.5">
                      <Tag className="h-4 w-4 shrink-0" />
                      {featuredPost.category.name}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 group-hover:text-[#FF8C00] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base mb-5 sm:mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <span className="btn-primary inline-block w-fit">
                  Read More
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Posts Grid */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gridPosts.map(post => (
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
                    {post.author?.name && (
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author.name}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {post.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    )}
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

        {/* Pagination Controls right after cards grid */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={basePath}
        />

        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Explore by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map(category => (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  className="card hover:bg-[#2d4258] transition-colors block text-center py-6"
                >
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* About FitWay Insights Section */}
        <section className="bg-gray-800 rounded-3xl p-6 sm:p-10 mt-16 shadow-xl border border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Unlock Your Potential with FitWay Insights
          </h2>
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
      </div>
    </div>
  );
}
