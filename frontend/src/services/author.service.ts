import { Author } from "@/interfaces/author";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/authors?populate=photo`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 3600 },
    });
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/authors?filters[slug][$eq]=${slug}&populate[0]=photo&populate[1]=articles.image&populate[2]=workoutsCreated.image&populate[3]=articlesReviewed.image&populate[4]=workoutsReviewed.image`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 3600 },
    });
    const result = await response.json();
    if (!result.data || result.data.length === 0) return null;
    return result.data[0];
  } catch (error) {
    console.error("Error fetching author:", error);
    return null;
  }
}
