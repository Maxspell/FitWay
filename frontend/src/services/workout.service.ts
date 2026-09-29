import { Workout } from "@/interfaces/workout";
import { Review } from "@/interfaces/review";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function getWorkoutBySlug(slug: string): Promise<Workout | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/workouts?filters[slug][$eq]=${slug}&populate[author][populate]=*&populate[reviewedBy][populate]=*&populate[exercises][populate]=*&populate[image][populate]=*`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    const result = await response.json();

    if (!result.data || result.data.length === 0) {
      // Fallback for development/demo if Strapi is not yet populated
      return getMockWorkout(slug);
    }

    return result.data[0];
  } catch (error) {
    console.error("Error fetching workout:", error);
    return getMockWorkout(slug);
  }
}

export async function getReviewsByWorkoutId(workoutId: string) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/reviews?filters[workout][documentId][$eq]=${workoutId}&sort=createdAt:desc`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        next: { revalidate: 3600 },
      }
    );

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function getLatestReviews(limit: number = 10) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/reviews?populate[workout]=*&sort=createdAt:desc&pagination[limit]=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        next: { revalidate: 3600 },
      }
    );

    const result = await response.json();
    if (result.data && result.data.length > 0) {
      return result.data;
    }
    return getMockLatestReviews();
  } catch (error) {
    console.error("Error fetching latest reviews:", error);
    return getMockLatestReviews();
  }
}

export async function getWorkouts(category?: string): Promise<Workout[]> {
  try {
    const base = category && category !== "all"
      ? `?filters[category][$eq]=${category}&populate=*`
      : "?populate=*";

    const query = `${base}&sort[0]=publishedAt:desc`;

    const response = await fetch(`${STRAPI_URL}/api/workouts${query}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 3600 },
    });

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}

export async function getRelatedWorkouts(category: string, currentSlug: string): Promise<Partial<Workout>[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/workouts?filters[category][$eq]=${category}&filters[slug][$ne]=${currentSlug}&pagination[limit]=3&populate=image`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    return [];
  }
}

// Mock data helper for development and demonstration
function getMockWorkout(slug: string): Workout | null {
  const mocks: Record<string, Workout> = {
    "full-body-hiit": {
      id: 1,
      documentId: "mock-1",
      title: "Full Body HIIT",
      slug: "full-body-hiit",
      description: "A high-intensity interval training session designed to burn maximum calories and improve cardiovascular health. Perfect for those short on time but looking for high impact.",
      difficulty: "Intermediate",
      duration: 45,
      calories: 450,
      category: "weight-loss",
      image: { url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438" },
      equipment: "Dumbbells, Mat",
      targetMuscleGroups: "Full Body, Core",
      frequency: "3-4 times per week",
      nutritionAdvice: {
        preWorkout: "Complex carbs 2 hours before",
        postWorkout: "Protein shake + banana",
        hydration: "2-3 liters daily"
      },
      exercises: [
        {
          id: 101,
          name: "Burpees",
          sets: 4,
          reps: "15",
          technique: "Start standing, drop into a squat, kick feet back, do a pushup, jump feet back in, and jump up.",
          muscles: "Full Body, Heart Rate",
          tips: "Keep your core tight during the pushup phase.",
          commonMistakes: "Arching the back during pushup."
        },
        {
          id: 102,
          name: "Mountain Climbers",
          sets: 4,
          reps: "40 sec",
          technique: "Plank position, bring knees to chest rapidly.",
          muscles: "Abs, Shoulders",
          tips: "Maintain a flat back.",
          commonMistakes: "Bouncing too much."
        }
      ]
    }
  };

  return mocks[slug] || mocks["full-body-hiit"]; // Return default mock if slug doesn't match for demo
}

function getMockLatestReviews(): Review[] {
  return [
    {
      id: 1,
      documentId: "rev-mock-1",
      name: "Sarah Jenkins",
      rating: 5,
      content: "FitWay completely changed my perspective on fitness. The personalized plans are so easy to follow, and I've lost 12kg in just 4 months without feeling burnt out.",
      helpful: 14,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      workout: {
        id: 1,
        documentId: "mock-1",
        title: "Full Body HIIT",
        slug: "full-body-hiit"
      }
    },
    {
      id: 2,
      documentId: "rev-mock-2",
      name: "Michael Ross",
      rating: 5,
      content: "The tracking tools and clear instructions are incredible. I've finally been able to stay consistent with my workouts for over 6 months.",
      helpful: 9,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      workout: {
        id: 1,
        documentId: "mock-1",
        title: "Full Body HIIT",
        slug: "full-body-hiit"
      }
    },
    {
      id: 3,
      documentId: "rev-mock-3",
      name: "Elena Voronova",
      rating: 5,
      content: "Even as a professional, I find FitWay's nutrition advice and workout breakdowns extremely valuable. It's the perfect companion for anyone serious about health.",
      helpful: 21,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      workout: {
        id: 1,
        documentId: "mock-1",
        title: "Full Body HIIT",
        slug: "full-body-hiit"
      }
    },
    {
      id: 4,
      documentId: "rev-mock-4",
      name: "David Lawson",
      rating: 4,
      content: "The efficiency of these workouts is what sold me. I can get a high-intensity session done in 30 minutes and see real results in my strength.",
      helpful: 6,
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      workout: {
        id: 1,
        documentId: "mock-1",
        title: "Full Body HIIT",
        slug: "full-body-hiit"
      }
    },
    {
      id: 5,
      documentId: "rev-mock-5",
      name: "Jessica Chen",
      rating: 5,
      content: "FitWay makes fitness accessible. I started as a complete beginner, and now I feel confident in the gym. The community support is wonderful.",
      helpful: 18,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      workout: {
        id: 1,
        documentId: "mock-1",
        title: "Full Body HIIT",
        slug: "full-body-hiit"
      }
    }
  ];
}
