import type { BlogPost } from "@/interfaces/blog";
import React from 'react';
import { Clock, User } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

interface RelatedArticleProps {
  post: BlogPost;
}

const RelatedArticle: React.FC<RelatedArticleProps> = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
      <article className="card hover:-translate-y-2 transition-all duration-300">
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.image.formats.small.url}`} // TODO: Replace on constant
            alt={post.title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex items-center gap-4 text-[#FF8C00] text-sm mb-2">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF8C00] transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-300">{post.excerpt}</p>
      </article>
    </Link>
  );
};

export default RelatedArticle;