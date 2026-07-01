import { Author } from './author';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

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
  author?: Author;
  reviewedBy?: Author[];
  date: string;
  category: Category | null;
  readTime: string;
  publishedAt: string;
  createdAt: string;
}