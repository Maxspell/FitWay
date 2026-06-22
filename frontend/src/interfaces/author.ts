export interface Author {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  photo?: {
    url: string;
    alternativeText?: string;
  };
  credentials?: string;
  jobTitle?: string;
  bio?: string;
  fullBio?: string;
  yearsExperience?: number;
  specializations?: string[];
  certifications?: string[];
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}
