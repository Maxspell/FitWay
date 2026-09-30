import type { BlogPost } from "@/interfaces/blog";
import React from 'react';
import RelatedArticle from "@/components/BlogPost/RelatedArticle";

interface RelatedArticlesProps {
  relatedPosts: BlogPost[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ relatedPosts }) => {
  if (!relatedPosts || relatedPosts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <RelatedArticle key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;