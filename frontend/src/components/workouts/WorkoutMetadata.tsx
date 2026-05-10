import { Dumbbell, Target, RefreshCcw, Info, Box } from "lucide-react";
import { Workout } from "@/interfaces/workout";

interface Props {
  workout: Workout;
}

export default function WorkoutMetadata({ workout }: Props) {
  const items = [
    {
      label: "Equipment",
      value: workout.equipment,
      icon: Dumbbell,
    },
    {
      label: "Target Muscles",
      value: workout.targetMuscleGroups,
      icon: Target,
    },
    {
      label: "Exercises",
      value: `${workout.exercises.length} Movements`,
      icon: Box,
    },
    {
      label: "Frequency",
      value: workout.frequency,
      icon: RefreshCcw,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div 
          key={index}
          className="p-6 rounded-2xl bg-[#243447] border border-white/5 hover:border-[#FF8C00]/30 transition-colors group"
        >
          <div className="flex flex-col items-center text-center">
            <item.icon className="w-8 h-8 text-[#FF8C00] mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">{item.label}</span>
            <span className="text-sm font-bold">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
