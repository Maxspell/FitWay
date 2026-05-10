import { Utensils, Droplets, Zap, ShieldCheck } from "lucide-react";

interface Props {
  advice?: {
    preWorkout?: string;
    postWorkout?: string;
    hydration?: string;
  };
}

export default function NutritionTips({ advice }: Props) {
  if (!advice) return null;

  const sections = [
    {
      title: "Pre-Workout Fuel",
      content: advice.preWorkout || "Consume light carbs 30-60 mins before starting for sustained energy.",
      icon: Zap,
      color: "text-yellow-400",
    },
    {
      title: "Post-Workout Recovery",
      content: advice.postWorkout || "Protein and complex carbs are essential to repair muscle tissues.",
      icon: ShieldCheck,
      color: "text-green-400",
    },
    {
      title: "Hydration Strategy",
      content: advice.hydration || "Sip water throughout the workout. Don't wait until you're thirsty.",
      icon: Droplets,
      color: "text-blue-400",
    },
  ];

  return (
    <div className="p-8 rounded-3xl bg-[#243447] border border-white/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Utensils className="w-32 h-32" />
      </div>

      <h2 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
        <Utensils className="w-6 h-6 text-[#FF8C00]" />
        Nutrition & Fueling Tips
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="space-y-3">
            <div className={`flex items-center gap-2 ${section.color}`}>
              <section.icon className="w-4 h-4" />
              <h3 className="text-xs font-black uppercase tracking-widest">{section.title}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
