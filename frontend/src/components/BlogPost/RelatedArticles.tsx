import type { BlogPost } from "@/interfaces/blog";
import React from 'react';
import RelatedArticle from "@/components/BlogPost/RelatedArticle";

interface RelatedArticlesProps {
  relatedPosts: BlogPost[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ relatedPosts }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-2 gap-8">
        {relatedPosts.map((post) => (
          <RelatedArticle key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;