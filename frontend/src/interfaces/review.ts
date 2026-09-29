export interface Review {
  id: number;
  documentId: string;
  name: string;
  rating: number;
  content: string;
  helpful: number;
  createdAt: string;
  workout?: {
    id: number;
    documentId: string;
    title: string;
    slug: string;
  };
}
