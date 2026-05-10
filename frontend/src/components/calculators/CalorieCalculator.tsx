"use client";

import { useState, useMemo } from "react";
import { Apple, Info } from "lucide-react";

const ACTIVITY_LEVELS = [
  { label: "Sedentary", multiplier: 1.2, desc: "Little or no exercise" },
  { label: "Light", multiplier: 1.375, desc: "1-3 days/week" },
  { label: "Moderate", multiplier: 1.55, desc: "3-5 days/week" },
  { label: "Active", multiplier: 1.725, desc: "6-7 days/week" },
  { label: "Very Active", multiplier: 1.9, desc: "Hard exercise 2x/day" },
];

export default function CalorieCalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("25");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState<number>(1.2);

  const calories = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);
    if (!h || !w || !a) return null;

    // Mifflin-St Jeor Equation
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = gender === "male" ? bmr + 5 : bmr - 161;
    
    return Math.round(bmr * activity);
  }, [height, weight, age, gender, activity]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Gender</label>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setGender("male")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${gender === "male" ? "bg-[#FF8C00] text-white" : "text-gray-400 hover:text-white"}`}
            >
              Male
            </button>
            <button
              onClick={() => setGender("female")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${gender === "female" ? "bg-[#FF8C00] text-white" : "text-gray-400 hover:text-white"}`}
            >
              Female
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="175"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-400">Activity Level</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {ACTIVITY_LEVELS.map((level) => (
            <button
              key={level.label}
              onClick={() => setActivity(level.multiplier)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                activity === level.multiplier
                  ? "bg-[#FF8C00]/20 border-[#FF8C00] text-white"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
              }`}
            >
              <div className="font-bold mb-0.5">{level.label}</div>
              <div className="opacity-60 text-[10px] leading-tight">{level.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {calories !== null ? (
        <div className="p-6 rounded-2xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm mb-1">Maintenance Calories</p>
              <h4 className="text-4xl font-bold text-[#FF8C00]">{calories} <span className="text-lg font-normal opacity-60">kcal/day</span></h4>
            </div>
            
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Weight Loss</p>
                <p className="text-lg font-bold text-blue-400">{calories - 500}</p>
              </div>
              <div className="text-center px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Weight Gain</p>
                <p className="text-lg font-bold text-green-400">{calories + 500}</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-300 flex gap-2 italic">
            <Info className="h-4 w-4 shrink-0 text-[#FF8C00]" />
            These results are estimates based on your input. Individual metabolism may vary.
          </p>
        </div>
      ) : (
        <div className="p-12 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500">
          <Apple className="h-12 w-12 mb-4 opacity-20" />
          <p>Fill in all fields to calculate your daily needs</p>
        </div>
      )}
    </div>
  );
}
