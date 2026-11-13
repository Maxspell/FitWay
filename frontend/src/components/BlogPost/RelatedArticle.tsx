import type { BlogPost } from "@/interfaces/blog";
import React from 'react';
import { Clock, User, Calendar, Tag } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

import { getPostImage } from "@/utils/image";

interface RelatedArticleProps {
  post: BlogPost;
}

const RelatedArticle: React.FC<RelatedArticleProps> = ({ post }) => {
  const formattedDate = new Date(
    post.createdAt || post.publishedAt || Date.now()
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="bg-[#243447] rounded-2xl border border-white/5 hover:border-[#FF8C00]/40 p-3.5 sm:p-5 shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full">
        <div>
          {/* Card Media with controlled aspect ratio and responsive height */}
          <div className="relative h-44 sm:h-48 mb-3.5 overflow-hidden rounded-xl w-full bg-[#1B2B3B]">
            <Image
              src={getPostImage(post, "small")}
              alt={post.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Metadata badges with compact responsive spacing */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[#FF8C00] text-xs sm:text-sm mb-2.5">
            {post.author?.name && (
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate max-w-[130px]">{post.author.name}</span>
              </span>
            )}
            <span className="flex items-center gap-1 text-gray-400">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-[#FF8C00]" />
              <span>{formattedDate}</span>
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1 text-gray-400">
                <Clock className="h-3.5 w-3.5 shrink-0 text-[#FF8C00]" />
                <span>{post.readTime}</span>
              </span>
            )}
            {post.category?.name && (
              <span className="flex items-center gap-1">
                <Tag className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate max-w-[120px]">{post.category.name}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#FF8C00] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default RelatedArticle;