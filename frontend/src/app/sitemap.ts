import { MetadataRoute } from 'next';

const BASE_URL = 'https://fitway.best';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  // 1. Static Pages (Home, About, Contact, Tools, Blog main, Workouts main)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/bmi-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/calorie-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/macro-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/one-rep-max-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/ideal-weight-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog/category`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/workouts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/authors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const fetchStrapiEntries = async (path: string) => {
    if (!apiToken) return [];
    const separator = path.includes('?') ? '&' : '?';
    try {
      const response = await fetch(
        `${strapiUrl}${path}${separator}pagination[pageSize]=250`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          next: { revalidate: 3600 }, // Cache sitemap fetches for 1 hour
        }
      );

      if (!response.ok) return [];
      const result = await response.json();
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      console.error(`Error generating dynamic sitemap for ${path}:`, error);
      return [];
    }
  };

  const [posts, workouts, authors, categories] = await Promise.all([
    fetchStrapiEntries('/api/posts?fields[0]=slug&fields[1]=updatedAt'),
    fetchStrapiEntries('/api/workouts?fields[0]=slug&fields[1]=updatedAt'),
    fetchStrapiEntries('/api/authors?fields[0]=slug&fields[1]=updatedAt'),
    fetchStrapiEntries('/api/categories?fields[0]=slug&fields[1]=updatedAt'),
  ]);

  const blogEntries: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const workoutEntries: MetadataRoute.Sitemap = workouts.map((workout: any) => ({
    url: `${BASE_URL}/workouts/${workout.slug}`,
    lastModified: workout.updatedAt ? new Date(workout.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const authorEntries: MetadataRoute.Sitemap = authors.map((author: any) => ({
    url: `${BASE_URL}/authors/${author.slug}`,
    lastModified: author.updatedAt ? new Date(author.updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category: any) => ({
    url: `${BASE_URL}/blog/category/${category.slug}`,
    lastModified: category.updatedAt ? new Date(category.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogEntries, ...workoutEntries, ...authorEntries, ...categoryEntries];
}
