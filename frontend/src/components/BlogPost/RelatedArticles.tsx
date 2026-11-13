import type { BlogPost } from "@/interfaces/blog";
import React from 'react';
import RelatedArticle from "@/components/BlogPost/RelatedArticle";

interface RelatedArticlesProps {
  relatedPosts: BlogPost[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ relatedPosts }) => {
  if (!relatedPosts || relatedPosts.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {relatedPosts.map((post) => (
          <RelatedArticle key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;