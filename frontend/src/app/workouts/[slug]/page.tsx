import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkoutBySlug, getRelatedWorkouts } from "@/services/workout.service";
import WorkoutHero from "@/components/workouts/WorkoutHero";
import WorkoutMetadata from "@/components/workouts/WorkoutMetadata";
import ExerciseList from "@/components/workouts/ExerciseList";
import RelatedWorkouts from "@/components/workouts/RelatedWorkouts";
import NutritionTips from "@/components/workouts/NutritionTips";
import ExpertTips from "@/components/workouts/ExpertTips";
import ReviewSystem from "@/components/workouts/ReviewSystem";
import ReactMarkdown from "react-markdown";
import { Workout } from "@/interfaces/workout";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const workout = await getWorkoutBySlug(params.slug);

  if (!workout) return { title: "Workout Not Found | FitWay" };

  return {
    title: `${workout.title} | Premium Fitness Workout | FitWay`,
    description: workout.description,
    openGraph: {
      title: workout.title,
      description: workout.description,
      images: [workout.image.url],
    },
    twitter: {
      card: "summary_large_image",
      title: workout.title,
      description: workout.description,
      images: [workout.image.url],
    },
  };
}

export default async function WorkoutDetailsPage({ params }: Props) {
  const workout = await getWorkoutBySlug(params.slug);

  if (!workout) {
    notFound();
  }

  const relatedWorkouts = await getRelatedWorkouts(workout.category, workout.slug);

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
            <ExpertTips category={workout.category} />
            <ReviewSystem workoutTitle={workout.title} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-24">
              <RelatedWorkouts workouts={relatedWorkouts} />

              {/* Promotion or AdSense placeholder */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#FF8C00] to-[#E67E00] text-white shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Upgrade to Pro</h4>
                <p className="text-white/90 mb-4 text-sm">Get unlimited access to all workout programs and expert nutrition plans.</p>
                <button className="w-full py-3 bg-white text-[#FF8C00] rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  Get Access Now
                </button>
              </div>
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
            "image": workout.image.url,
            "educationalLevel": workout.difficulty,
            "provider": {
              "@type": "Organization",
              "name": "FitWay",
              "sameAs": "https://fitway.best"
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online"
            }
          }),
        }}
      />
    </main>
  );
}
