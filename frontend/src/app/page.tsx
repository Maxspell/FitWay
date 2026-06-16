import Hero from "@/components/hero/Hero";
import CalculatorPreview from "@/components/sections/CalculatorPreview";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import FeaturedWorkouts from "@/components/sections/workouts/FeaturedWorkouts";
import LatestPosts from "@/components/sections/blog/LatestPosts";
import { getWorkouts } from "@/services/workout.service";
import { getBlogPosts } from "@/services/post.service";

import StepsSection from "@/components/sections/steps/StepsSection";
import FAQSection from "@/components/sections/faq/FAQSection";

async function getFAQs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/faqs?sort=order:asc`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const result = await response.json();
    
    if (!result.data || result.data.length === 0) {
      return fallbackFAQs;
    }

    return result.data.map((item: any) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      category: item.category
    }));
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return fallbackFAQs;
  }
}

const fallbackFAQs = [
  {
    id: 1,
    question: "How do I start my fitness journey?",
    answer: "Getting started is easy! We recommend beginning with our Goal Setting tool to define your objectives, then choosing a 'Beginner' workout plan from our collections. Consistency is key!",
    category: "general"
  },
  {
    id: 2,
    question: "Are workouts suitable for beginners?",
    answer: "Absolutely. We have specifically designed programs for every level, from complete beginners to advanced athletes. Each exercise comes with video tutorials to ensure proper form.",
    category: "workouts"
  },
  {
    id: 3,
    question: "Do I need gym equipment?",
    answer: "Not necessarily! We offer many 'Home Workout' plans that require zero equipment. For more advanced strength training, some basic equipment might be recommended.",
    category: "workouts"
  },
  {
    id: 4,
    question: "Are the calculators free to use?",
    answer: "Yes, all our fitness tools including BMI, Daily Calorie, and Meal Plan generators are completely free for all users to help you track your progress.",
    category: "tools"
  }
];


export default async function Home() {
  const [blogPosts, faqs, workouts] = await Promise.all([
    getBlogPosts(),
    getFAQs(),
    getWorkouts()
  ]);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Steps Journey Section */}
      <StepsSection />

      {/* Calculator Preview Section */}
      <CalculatorPreview />

      {/* Featured Workouts */}
      <FeaturedWorkouts workouts={workouts} />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Latest Blog Posts */}
      <LatestPosts posts={blogPosts} />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Newsletter Subscription */}
      <NewsletterSection />
    </>
  );
}