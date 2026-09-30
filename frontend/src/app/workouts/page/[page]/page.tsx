import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getPaginatedWorkouts } from "@/services/workout.service";
import WorkoutView from "@/components/workouts/WorkoutView";

interface Props {
  params: {
    page: string;
  };
  searchParams: {
    category?: string;
  };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const pageNum = parseInt(params.page, 10);
  if (isNaN(pageNum) || pageNum < 1) {
    return {
      title: "Workouts - Page Not Found",
    };
  }

  const category = searchParams.category;
  const canonicalUrl = pageNum === 1 ? "/workouts" : `/workouts/page/${pageNum}`;

  const categoryTitle = category && category !== "all"
    ? ` - ${category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`
    : "";

  return {
    title: `Workout Library - Page ${pageNum}${categoryTitle}`,
    description: `Browse page ${pageNum} of expert-led workout routines, training programs, and exercise guides on FitWay.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Workout Library - Page ${pageNum}${categoryTitle}`,
      description: `Browse page ${pageNum} of expert-led workout routines, training programs, and exercise guides on FitWay.`,
      url: canonicalUrl,
    },
  };
}

export default async function WorkoutsPaginatedPage({ params, searchParams }: Props) {
  const pageNum = parseInt(params.page, 10);

  // If someone visits /workouts/page/1, redirect to /workouts (preserving category if present)
  if (pageNum === 1) {
    const query = searchParams.category && searchParams.category !== "all"
      ? `?category=${encodeURIComponent(searchParams.category)}`
      : "";
    redirect(`/workouts${query}`);
  }

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  const selectedFilter = searchParams.category || "all";
  const { workouts, pagination } = await getPaginatedWorkouts(pageNum, 9, selectedFilter);

  if (pagination.pageCount > 0 && pageNum > pagination.pageCount) {
    notFound();
  }

  return (
    <WorkoutView
      workouts={workouts}
      currentPage={pageNum}
      totalPages={pagination.pageCount || 1}
      selectedCategory={selectedFilter}
      basePath="/workouts"
    />
  );
}
