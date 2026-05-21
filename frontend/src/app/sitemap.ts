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
      url: `${BASE_URL}/tools`,
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
      url: `${BASE_URL}/workouts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 2. Dynamic Blog Posts from Strapi
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${strapiUrl}/api/posts?fields[0]=slug&fields[1]=updatedAt`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache sitemap fetches for 1 hour
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.data && Array.isArray(result.data)) {
        blogEntries = result.data.map((post: any) => ({
          url: `${BASE_URL}/blog/${post.slug}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        }));
      }
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap for blog:', error);
  }

  // 3. Dynamic Workouts from Strapi
  let workoutEntries: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${strapiUrl}/api/workouts?fields[0]=slug&fields[1]=updatedAt`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache sitemap fetches for 1 hour
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.data && Array.isArray(result.data)) {
        workoutEntries = result.data.map((workout: any) => ({
          url: `${BASE_URL}/workouts/${workout.slug}`,
          lastModified: workout.updatedAt ? new Date(workout.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
      }
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap for workouts:', error);
  }

  return [...staticPages, ...blogEntries, ...workoutEntries];
}
