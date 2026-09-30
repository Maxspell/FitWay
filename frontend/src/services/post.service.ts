import { BlogPost, Category } from "@/interfaces/blog";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PaginatedPostsResponse {
  posts: BlogPost[];
  pagination: StrapiPagination;
}

/**
 * Fetch a limited set of recent blog posts for home page or sidebars.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/posts?populate[0]=image&populate[1]=author&sort=createdAt:desc&pagination[pageSize]=3`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 600, // 10 minutes
        },
      }
    );

    const result = await response.json();
    return result.data ? result.data : [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

/**
 * Fetch paginated blog posts with populate fields and total page count for blog index & page routes.
 */
export async function getPaginatedBlogPosts(
  page: number = 1,
  pageSize: number = 9
): Promise<PaginatedPostsResponse> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/posts?populate[0]=image&populate[1]=category&populate[2]=author&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 600, // 10 minutes
        },
      }
    );

    if (!response.ok) {
      return {
        posts: [],
        pagination: { page: 1, pageSize, pageCount: 0, total: 0 },
      };
    }

    const result = await response.json();
    return {
      posts: result.data || [],
      pagination: result.meta?.pagination || {
        page,
        pageSize,
        pageCount: Math.ceil((result.data?.length || 0) / pageSize),
        total: result.data?.length || 0,
      },
    };
  } catch (error) {
    console.error(`Error fetching paginated blog posts for page ${page}:`, error);
    return {
      posts: [],
      pagination: { page: 1, pageSize, pageCount: 0, total: 0 },
    };
  }
}

/**
 * Fetch all categories for blog category navigation.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 600, // 10 minutes
      },
    });

    if (!response.ok) return [];
    const result = await response.json();
    return result.data ? result.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
