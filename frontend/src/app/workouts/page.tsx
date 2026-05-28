import { Filter, Play, Clock, Dumbbell, Target, User, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getWorkouts } from "@/services/workout.service";
import { getStrapiMedia } from "@/lib/utils";

interface Props {
  searchParams: {
    category?: string;
  };
}

export default async function Workouts({ searchParams }: Props) {
  const selectedFilter = searchParams.category || "all";
  const workouts = await getWorkouts(selectedFilter);

  const filters = [
    { id: "all", label: "All Workouts" },
    { id: "weight-loss", label: "Weight Loss" },
    { id: "muscle-gain", label: "Muscle Gain" },
    { id: "toning", label: "Toning" }
  ];

  return (
    <div className="py-12 bg-[#1B2B3B] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Workout Library</h1>
            <p className="text-gray-400">Choose the best program for your goals</p>
          </div>
          
          <div className="flex items-center gap-4 bg-[#243447] p-2 rounded-2xl border border-white/5">
            <Filter className="h-5 w-5 text-[#FF8C00] ml-2" />
            <div className="flex gap-1">
              {filters.map(filter => (
                <Link
                  key={filter.id}
                  href={`/workouts${filter.id === "all" ? "" : `?category=${filter.id}`}`}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedFilter === filter.id
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

        {workouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workouts.map(workout => (
              <Link 
                key={workout.id} 
                href={`/workouts/${workout.slug}`}
                className="group relative"
              >
                <div className="card h-full flex flex-col border border-white/5 bg-[#243447] hover:bg-[#2d4258] transition-all duration-500 hover:-translate-y-2 overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={workout.image?.url ? getStrapiMedia(workout.image.url) : "https://via.placeholder.com/600x400?text=No+Image"}
                      alt={workout.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#243447] via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                       <span className="px-3 py-1 bg-[#FF8C00] text-white text-[10px] font-black uppercase rounded-lg">
                         {workout.difficulty}
                       </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-[#FF8C00] rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                        <Play className="h-8 w-8 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-grow">
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight group-hover:text-[#FF8C00] transition-colors line-clamp-1">
                      {workout.title}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-gray-300">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                        <Clock className="h-4 w-4 text-[#FF8C00]" />
                        {workout.duration} Min
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                        <Flame className="h-4 w-4 text-[#FF8C00]" />
                        {workout.calories} Kcal
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider col-span-2">
                        <Dumbbell className="h-4 w-4 text-[#FF8C00]" />
                        <span className="truncate">{workout.equipment}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 mt-auto">
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF8C00] to-[#E67E00] flex items-center justify-center text-[10px] font-black">
                             FW
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">FitWay Studio</span>
                       </div>
                       <span className="text-[10px] font-black text-[#FF8C00] uppercase tracking-widest group-hover:mr-2 transition-all">Explore &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#243447] rounded-3xl border border-dashed border-white/10">
            <h2 className="text-2xl font-bold mb-2">No workouts found</h2>
            <p className="text-gray-400">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}