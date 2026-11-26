import { Metadata } from "next";
import Link from "next/link";
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
import AuthorSidebarCard from "@/components/common/AuthorSidebarCard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ShareButtons from "@/components/BlogPost/ShareButtons";
import { getStrapiMedia } from "@/lib/utils";
import FitnessToolsSidebarWidget from "@/components/calculators/FitnessToolsSidebarWidget";

interface Props {
  params: {
    slug: string;
  };
}

function getAbsoluteImageUrl(url?: string): string {
  if (!url) return "";
  let imageUrl = getStrapiMedia(url);
  if (imageUrl && !imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fitway.best";
    imageUrl = `${siteUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  }
  return imageUrl;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const workout = await getWorkoutBySlug(params.slug);

  if (!workout) return { title: "Workout Not Found" };

  const imageUrl = getAbsoluteImageUrl(workout.image?.url);

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
    title: workout.title,
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

  const absoluteImageUrl = getAbsoluteImageUrl(workout.image?.url);
  const averageRating = reviews.length
    ? (reviews.reduce((acc: number, curr: any) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";
  const reviewCount = reviews.length;

  return (
    <div className="min-h-screen bg-[#1B2B3B] text-white">
      {/* Hero Section */}
      <WorkoutHero workout={workout} />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 min-w-0">
            <WorkoutMetadata workout={workout} />
            <ExerciseList exercises={workout.exercises} />
            <NutritionTips advice={workout.nutritionAdvice} />
            {workout.text && (
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed prose-headings:text-white prose-strong:text-white prose-a:text-[#FF8C00] hover:prose-a:text-[#FFA500]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, children, ...props }) => (
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-4" {...props}>
                        {children}
                      </h2>
                    ),
                    table: ({ node, children, ...props }) => (
                      <div className="my-6 w-full overflow-hidden rounded-xl border border-white/10 bg-[#1A2634]/60 shadow-md">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[520px] border-collapse text-left text-xs sm:text-sm" {...props}>
                            {children}
                          </table>
                        </div>
                      </div>
                    ),
                    thead: ({ node, children, ...props }) => (
                      <thead className="bg-[#121C26]/90 text-[#FF8C00] text-xs uppercase tracking-wider font-semibold border-b border-white/10" {...props}>
                        {children}
                      </thead>
                    ),
                    th: ({ node, children, ...props }) => (
                      <th className="px-3.5 sm:px-4 py-3 font-semibold text-white/90 border-b border-white/10 whitespace-nowrap" {...props}>
                        {children}
                      </th>
                    ),
                    td: ({ node, children, ...props }) => (
                      <td className="px-3.5 sm:px-4 py-3 border-b border-white/5 text-gray-300 text-xs sm:text-sm leading-normal" {...props}>
                        {children}
                      </td>
                    ),
                    a: ({ node, href, children, ...props }) => {
                      const isExternal = href?.startsWith("http://") || href?.startsWith("https://");
                      if (isExternal) {
                        return (
                          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                            {children}
                          </a>
                        );
                      }
                      return (
                        <Link href={href || "#"} {...props}>
                          {children}
                        </Link>
                      );
                    },
                  }}
                >
                  {workout.text}
                </ReactMarkdown>
              </div>
            )}
            <ExpertTips category={workout.category} expertTips={workout.expertTips} />
            {workout.reviewedBy && workout.reviewedBy.length > 0 && (
              <WorkoutExpertReviewBox reviewer={workout.reviewedBy[0]} />
            )}
            {/* Social Share Section */}
            <ShareButtons
              id="share-section"
              title={workout.title}
              description={workout.description}
              subtitle="Share the workout"
              heading="Found this workout useful? Share it!"
              url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://fitway.best'}/workouts/${workout.slug}`}
            />

            <ReviewSystem
              workoutTitle={workout.title}
              workoutDocumentId={workout.documentId}
              initialReviews={reviews}
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 min-w-0">
            {/* Author Box */}
            {workout.author && (
              <AuthorSidebarCard author={workout.author} />
            )}

            <RelatedWorkouts workouts={relatedWorkouts} />

            {/* Sticky Fitness Tools Suite Widget */}
            <div className="lg:sticky lg:top-24">
              <FitnessToolsSidebarWidget category={workout.category} />
            </div>
          </aside>
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
            "image": absoluteImageUrl,
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
    </div>
  );
}
