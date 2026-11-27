import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import { getWorkouts, getLatestReviews } from "@/services/workout.service";
import { getBlogPosts } from "@/services/post.service";
import { getAuthors } from "@/services/author.service";
import { getStrapiMedia } from "@/lib/utils";
import { Review } from "@/interfaces/review";

const StepsSection = dynamic(() => import("@/components/sections/steps/StepsSection"));
const WhyFitWay = dynamic(() => import("@/components/sections/WhyFitWay"));
const ExpertsSection = dynamic(() => import("@/components/sections/ExpertsSection"));
const CalculatorPreview = dynamic(() => import("@/components/sections/CalculatorPreview"));
const FeaturedWorkouts = dynamic(() => import("@/components/sections/workouts/FeaturedWorkouts"));
const TestimonialsSection = dynamic(
  () => import("@/components/sections/testimonials/TestimonialsSection")
);
const LatestPosts = dynamic(() => import("@/components/sections/blog/LatestPosts"));
const FAQSection = dynamic(() => import("@/components/sections/faq/FAQSection"));
const NewsletterSection = dynamic(() => import("@/components/sections/NewsletterSection"));

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
    answer: "Start by checking your baseline with our BMI and Daily Calorie calculators, then choose a Beginner workout plan from our library. Staying consistent two to three days a week matters most.",
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
    answer: "Yes, all our fitness tools including the BMI, Daily Calorie, Macro, One-Rep Max, and Ideal Weight calculators are completely free to use.",
    category: "tools"
  }
];


export default async function Home() {
  const [blogPosts, faqs, workouts, authors, reviews] = await Promise.all([
    getBlogPosts(),
    getFAQs(),
    getWorkouts(),
    getAuthors(),
    getLatestReviews(10)
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fitway.best";

  const reviewsAvgRating = reviews.length
    ? (reviews.reduce((acc: number, curr: Review) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "4.9";

  const heroExperts = authors
    .filter((author) => author.name && author.slug)
    .slice(0, 4)
    .map((author) => ({
      name: author.name,
      slug: author.slug,
      photoUrl: author.photo?.url ? getStrapiMedia(author.photo.url) : undefined,
    }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "FitWay",
        "url": siteUrl,
        "logo": `${siteUrl}/favicon.svg`,
        "description": "Evidence-based fitness platform offering structured workout programs, expert-reviewed nutrition guides, and free health calculators.",
        "sameAs": [
          "https://www.pinterest.com/fitway_best/",
          "https://www.instagram.com/fitway.best/",
          "https://x.com/fitway_best"
        ],
        ...(reviews.length > 0 && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": reviewsAvgRating,
            "reviewCount": reviews.length,
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": reviews.map((rev: Review) => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": rev.name,
            },
            "datePublished": rev.createdAt,
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": rev.rating,
              "bestRating": "5",
              "worstRating": "1",
            },
            "reviewBody": rev.content,
          })),
        }),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <Hero
        avgRating={parseFloat(reviewsAvgRating)}
        experts={heroExperts}
        coachesCount={authors.length}
        reviewsCount={reviews.length}
      />

      {/* Steps Journey Section */}
      <StepsSection />

      {/* Why FitWay - Scientific Proof */}
      <WhyFitWay />

      {/* Experts Section - Human Authority */}
      <ExpertsSection authors={authors} />

      {/* Calculator Preview Section */}
      <CalculatorPreview />

      {/* Featured Workouts */}
      <FeaturedWorkouts workouts={workouts} />

      {/* Testimonials Section */}
      <TestimonialsSection 
        reviews={reviews} 
        stats={{
          workoutsCount: workouts.length,
          avgRating: parseFloat(reviewsAvgRating),
          coachesCount: authors.length,
          reviewsCount: reviews.length,
        }}
      />

      {/* Latest Blog Posts */}
      <LatestPosts posts={blogPosts} />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Newsletter Subscription */}
      <NewsletterSection />
    </>
  );
}
