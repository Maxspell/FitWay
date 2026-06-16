import { BlogPost } from "@/interfaces/blog";
import { ArrowRight, Calendar, User, ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/utils";

interface LatestPostsProps {
  posts: BlogPost[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Latest from Our Blog</h2>
          <Link 
            href="/blog" 
            className="group flex items-center gap-2 text-[#FF8C00] hover:text-[#E67E00] transition-colors"
          >
            View All Posts 
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug}
              className="group"
            >
              <article 
                className="card h-full flex flex-col hover:-translate-y-2 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <Image 
                    src={getStrapiMedia(post.image?.formats?.small?.url)}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[#FF8C00] text-sm mb-2">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishedAt || post.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF8C00] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[#FF8C00] group-hover:gap-3 transition-all">
                  Read More 
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
