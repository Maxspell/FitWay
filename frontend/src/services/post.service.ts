import { BlogPost } from "@/interfaces/blog";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/posts?populate=image&sort=publishedAt:desc`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json"
      },
      next: {
        revalidate: 600, // 10 minutes
      },
    });
    
    const result = await response.json();
    return result.data ? result.data.slice(0, 3) : [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
