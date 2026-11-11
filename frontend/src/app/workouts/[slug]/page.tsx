import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkoutBySlug, getRelatedWorkouts, getReviewsByWorkoutId } from "@/services/workout.service";
import WorkoutHero from "@/components/workouts/WorkoutHero";
import WorkoutMetadata from "@/components/workouts/WorkoutMetadata";
import ExerciseList from "@/components/workouts/ExerciseList";
import RelatedWorkouts from "@/components/workouts/RelatedWorkouts";
import NutritionTips from "@/components/workouts/NutritionTips";
import ExpertTips from "@/components/workouts/ExpertTips";
import ReviewSystem from "@/components/workouts/ReviewSystem";
import WorkoutExpertReviewBox from "@/components/common/WorkoutExpertReviewBox";
import AuthorBox from "@/components/common/AuthorBox";
import AuthorSidebarCard from "@/components/common/AuthorSidebarCard";
import ReactMarkdown from "react-markdown";
import { Workout } from "@/interfaces/workout";
import ShareButtons from "@/components/BlogPost/ShareButtons";
import { getStrapiMedia } from "@/lib/utils";
import FitnessToolsSidebarWidget from "@/components/calculators/FitnessToolsSidebarWidget";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const workout = await getWorkoutBySlug(params.slug);

  if (!workout) return { title: "Workout Not Found" };

  let imageUrl = workout.image?.url ? getStrapiMedia(workout.image.url) : "";
  if (imageUrl && !imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fitway.best";
    imageUrl = `${siteUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  }

  const imageObj = imageUrl
    ? [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: workout.title,
        },
      ]
    : [];

  return {
    title: `${workout.title} | Premium Fitness Workout`,
    description: workout.description,
    alternates: {
      canonical: `/workouts/${params.slug}`,
    },
    openGraph: {
      title: workout.title,
      description: workout.description,
      url: `/workouts/${params.slug}`,
      type: "article",
      images: imageObj,
    },
    twitter: {
      card: "summary_large_image",
      title: workout.title,
      description: workout.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function WorkoutDetailsPage({ params }: Props) {
  const workout = await getWorkoutBySlug(params.slug);

  if (!workout) {
    notFound();
  }

  const [relatedWorkouts, reviews] = await Promise.all([
    getRelatedWorkouts(workout.category, workout.slug),
    getReviewsByWorkoutId(workout.documentId)
  ]);

  const averageRating = reviews.length
    ? (reviews.reduce((acc: number, curr: any) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";
  const reviewCount = reviews.length;

  return (
    <main className="min-h-screen bg-[#1B2B3B] text-white">
      {/* Hero Section */}
      <WorkoutHero workout={workout} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <WorkoutMetadata workout={workout} />
            <ExerciseList exercises={workout.exercises} />
            <NutritionTips advice={workout.nutritionAdvice} />
            {workout.text && (
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                <ReactMarkdown>{workout.text}</ReactMarkdown>
              </div>
            )}
            <ExpertTips category={workout.category} expertTips={workout.expertTips} />
            
            {/* Social Share Section */}
            <ShareButtons 
              id="share-section"
              title={workout.title}
              description={workout.description}
              subtitle="Share the workout"
              heading="Found this workout useful? Share it!"
              url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://fitway.best'}/workouts/${workout.slug}`}
            />

            <ReviewSystem workoutTitle={workout.title} workoutDocumentId={workout.documentId} />
            {workout.reviewedBy && workout.reviewedBy.length > 0 && (
              <WorkoutExpertReviewBox reviewer={workout.reviewedBy[0]} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Author Box */}
              {workout.author && (
                <AuthorSidebarCard author={workout.author} />
              )}

              <RelatedWorkouts workouts={relatedWorkouts} />

              {/* Fitness Tools Suite Widget */}
              <FitnessToolsSidebarWidget category={workout.category} />
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["ExercisePlan", "Course"],
            "name": workout.title,
            "description": workout.description,
            "exerciseType": workout.category,
            "duration": `PT${workout.duration}M`,
            "image": workout.image?.url || "",
            "educationalLevel": workout.difficulty,
            ...(reviewCount > 0 && {
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": averageRating,
                "reviewCount": reviewCount,
              },
              "review": reviews.slice(0, 5).map((rev: any) => ({
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": rev.name,
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": rev.rating,
                },
                "reviewBody": rev.content,
              })),
            }),
            ...(workout.author && {
              "author": {
                "@type": "Person",
                "name": workout.author.name,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fitway.best'}/authors/${workout.author.slug}`
              }
            }),
            ...(workout.reviewedBy && workout.reviewedBy.length > 0 && {
              "reviewedBy": workout.reviewedBy.map(reviewer => ({
                "@type": "Person",
                "name": reviewer.name,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fitway.best'}/authors/${reviewer.slug}`
              }))
            }),
            "provider": {
              "@type": "Organization",
              "name": "FitWay",
              "sameAs": "https://fitway.best"
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "courseSchedule": {
                "@type": "Schedule",
                "duration": `PT${workout.duration}M`
              }
            }
          }),
        }}
      />
    </main>
  );
}
