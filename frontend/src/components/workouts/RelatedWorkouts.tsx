import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Flame } from "lucide-react";
import { Workout } from "@/interfaces/workout";
import { getStrapiMedia } from "@/lib/utils";

interface Props {
  workouts: Partial<Workout>[];
}

export default function RelatedWorkouts({ workouts }: Props) {
  if (!workouts || workouts.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black uppercase tracking-tight flex items-center justify-between">
        Recommended For You
        <Link href="/workouts" className="text-[10px] text-[#FF8C00] hover:underline">View All</Link>
      </h3>

      <div className="space-y-4">
        {workouts.map((workout) => (
          <Link 
            key={workout.slug} 
            href={`/workouts/${workout.slug}`}
            className="group block p-3 rounded-2xl bg-[#243447] border border-white/5 hover:border-[#FF8C00]/30 transition-all"
          >
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <Image 
                  src={getStrapiMedia(workout.image?.url)} 
                  alt={workout.title || ""} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="font-bold text-sm mb-2 truncate group-hover:text-[#FF8C00] transition-colors">
                  {workout.title}
                </h4>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
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
