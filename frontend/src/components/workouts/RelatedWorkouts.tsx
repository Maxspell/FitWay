import Link from "next/link";
import Image from "next/image";
import { Clock, Flame } from "lucide-react";
import { Workout } from "@/interfaces/workout";
import { getStrapiMedia } from "@/lib/utils";

interface Props {
  workouts: Partial<Workout>[];
}

export default function RelatedWorkouts({ workouts }: Props) {
  if (!workouts || workouts.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-black uppercase tracking-tight">
          Recommended For You
        </h2>
        <Link href="/workouts" className="text-xs font-semibold text-[#FF8C00] hover:underline shrink-0">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {workouts.map((workout) => (
          <Link 
            key={workout.slug} 
            href={`/workouts/${workout.slug}`}
            className="group block p-3 rounded-2xl bg-[#243447] border border-white/5 hover:border-[#FF8C00]/30 transition-all"
          >
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#1B2B3B]">
                {workout.image?.url ? (
                  <Image 
                    src={getStrapiMedia(workout.image.url)} 
                    alt={workout.title || "Workout thumbnail"} 
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-bold uppercase text-gray-400">
                    FitWay
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-[#FF8C00] transition-colors">
                  {workout.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 font-bold uppercase tracking-tighter">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#FF8C00]" />
                    {workout.duration} Min
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#FF8C00]" />
                    {workout.calories} Kcal
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
