import { Filter } from "lucide-react";
import Link from "next/link";
import { Workout } from "@/interfaces/workout";
import Pagination from "@/components/common/Pagination";
import WorkoutCard from "@/components/workouts/WorkoutCard";

interface WorkoutViewProps {
  workouts: Workout[];
  currentPage: number;
  totalPages: number;
  selectedCategory?: string;
  basePath?: string;
}

const filters = [
  { id: "all", label: "All Workouts" },
  { id: "weight-loss", label: "Weight Loss" },
  { id: "muscle-gain", label: "Muscle Gain" },
  { id: "toning", label: "Toning" },
  { id: "flexibility", label: "Flexibility" },
  { id: "strength", label: "Strength" },
];

export default function WorkoutView({
  workouts,
  currentPage,
  totalPages,
  selectedCategory = "all",
  basePath = "/workouts",
}: WorkoutViewProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": workouts.map((workout, index) => ({
      "@type": "ListItem",
      "position": index + 1 + (currentPage - 1) * 9,
      "url": `https://fitway.best/workouts/${workout.slug}`,
      "name": workout.title,
    })),
  };

  return (
    <div className="py-12 bg-[#1B2B3B] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4">
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Workout Library</h1>
            <p className="text-gray-400">
              {currentPage > 1 ? (
                <>
                  Browsing page <span className="text-[#FF8C00] font-semibold">{currentPage}</span> of{" "}
                  <span className="text-[#FF8C00] font-semibold">{totalPages}</span>
                </>
              ) : (
                "Choose the best program for your goals"
              )}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#243447] p-2 rounded-2xl border border-white/5 flex-wrap">
            <Filter className="h-5 w-5 text-[#FF8C00] ml-2 shrink-0" />
            <div className="flex gap-1 flex-wrap">
              {filters.map((filter) => (
                <Link
                  key={filter.id}
                  href={`/workouts${filter.id === "all" ? "" : `?category=${filter.id}`}`}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedCategory === filter.id
                      ? "bg-[#FF8C00] text-white shadow-lg shadow-[#FF8C00]/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {filter.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 9 Workouts Grid */}
        {workouts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workouts.map((workout, index) => (
                <WorkoutCard key={workout.id} workout={workout} index={index} />
              ))}
            </div>

            {/* Pagination Controls right after cards grid */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={basePath}
              queryParams={selectedCategory !== "all" ? { category: selectedCategory } : undefined}
            />
          </>
        ) : (
          <div className="text-center py-24 bg-[#243447] rounded-3xl border border-dashed border-white/10">
            <h2 className="text-2xl font-bold mb-2">No workouts found</h2>
            <p className="text-gray-400 mb-6">Try adjusting your filters or check back later.</p>
            {currentPage > 1 && (
              <Link href="/workouts" className="btn-primary inline-block">
                Back to All Workouts
              </Link>
            )}
          </div>
        )}

        {/* Informative Description Section */}
        <div className="max-w-4xl mx-auto text-gray-400 mt-16 text-center leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Science-Backed Training Programs for Every Goal
          </h2>
          <p className="mb-4">
            Welcome to the FitWay Workout Library, your comprehensive destination for science-backed fitness programming designed to deliver real, sustainable results. Our library is built on the principle of functional movement and progressive overload, ensuring that every routine—whether it's a high-intensity fat-burning session or a focused hypertrophy program—is optimized for safety and effectiveness.
          </p>
          <p className="mb-4">
            We believe that fitness should be accessible and adaptable. That's why our curated collection spans a wide spectrum of goals and experience levels. From beginners looking to build a solid foundation to advanced athletes seeking to break through plateaus, our routines provide the structure and guidance needed to stay consistent and motivated.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left mt-8 mb-8">
            <div className="p-4 bg-[#243447] rounded-xl border border-white/5">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF8C00] rounded-full"></span>
                Weight Loss
              </h4>
              <p className="text-xs">Focuses on metabolic conditioning and caloric expenditure to help you lean out and improve cardiovascular health.</p>
            </div>
            <div className="p-4 bg-[#243447] rounded-xl border border-white/5">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF8C00] rounded-full"></span>
                Muscle Gain
              </h4>
              <p className="text-xs">Emphasizes resistance training and hypertrophy-specific rep ranges to build strength and lean muscle mass.</p>
            </div>
            <div className="p-4 bg-[#243447] rounded-xl border border-white/5">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF8C00] rounded-full"></span>
                Toning
              </h4>
              <p className="text-xs">A balanced approach combining light weights and high reps to define muscle and improve overall body composition.</p>
            </div>
            <div className="p-4 bg-[#243447] rounded-xl border border-white/5">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF8C00] rounded-full"></span>
                Flexibility
              </h4>
              <p className="text-xs">Enhances joint mobility, posture, and elasticity to reduce injury risk, speed up recovery, and support longevity.</p>
            </div>
            <div className="p-4 bg-[#243447] rounded-xl border border-white/5">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF8C00] rounded-full"></span>
                Strength
              </h4>
              <p className="text-xs">Targets heavy compound movements, neuromuscular power, and maximal force production for pure physical strength.</p>
            </div>
          </div>
          <p>
            Each workout is categorized by difficulty, duration, and required equipment, allowing you to seamlessly integrate these professional routines into your daily schedule. Explore the library, choose the path that aligns with your current ambition, and start transforming your physique today.
          </p>
        </div>
      </div>
    </div>
  );
}
