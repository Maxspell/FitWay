import { getPaginatedWorkouts } from "@/services/workout.service";
import WorkoutView from "@/components/workouts/WorkoutView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workout Library",
  description: "Transform your body with FitWay's expert-led workout library. Access science-backed routines for sustainable weight loss, lean muscle gain, and full-body toning. Tailored for all fitness levels to help you achieve maximum results with professional guidance.",
  alternates: {
    canonical: "/workouts",
  },
};

interface Props {
  searchParams: {
    category?: string;
  };
}

export default async function Workouts({ searchParams }: Props) {
  const selectedFilter = searchParams.category || "all";
  const { workouts, pagination } = await getPaginatedWorkouts(1, 9, selectedFilter);

  return (
    <WorkoutView
      workouts={workouts}
      currentPage={1}
      totalPages={pagination.pageCount || 1}
      selectedCategory={selectedFilter}
      basePath="/workouts"
    />
  );
}