export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: {
    formats: {
      small: {
        url: string;
      },
      large: {
        url: string;
      };
    };
  };
  author: string;
  date: string;
  category: string;
  readTime: string;
  publishedAt: string;
}