export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  author: string;
  date: string;
  category: string;
  readTime: string;
  publishedAt: string;
}