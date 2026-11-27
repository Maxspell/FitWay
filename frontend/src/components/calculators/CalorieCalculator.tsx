"use client";

import { useState, useMemo, useId } from "react";
import Link from "next/link";
import { Apple, Info, ArrowRight } from "lucide-react";

const ACTIVITY_LEVELS = [
  { label: "Sedentary", multiplier: 1.2, desc: "Little or no exercise" },
  { label: "Light", multiplier: 1.375, desc: "1-3 days/week" },
  { label: "Moderate", multiplier: 1.55, desc: "3-5 days/week" },
  { label: "Active", multiplier: 1.725, desc: "6-7 days/week" },
  { label: "Very Active", multiplier: 1.9, desc: "Hard exercise 2x/day" },
];

interface CalorieCalculatorProps {
  showDeepLinks?: boolean;
}

export default function CalorieCalculator({ showDeepLinks = false }: CalorieCalculatorProps) {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("25");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState<number>(1.2);

  const ageId = useId();
  const heightId = useId();
  const weightId = useId();

  const estimate = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);
    if (!Number.isFinite(h) || !Number.isFinite(w) || !Number.isFinite(a) || h <= 0 || w <= 0 || a <= 0) {
      return null;
    }

    // Mifflin-St Jeor Equation
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = gender === "male" ? bmr + 5 : bmr - 161;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(bmr * activity),
    };
  }, [height, weight, age, gender, activity]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <span className="block text-sm font-medium text-gray-300">Gender</span>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10" role="group" aria-label="Gender">
            <button
              type="button"
              onClick={() => setGender("male")}
              aria-pressed={gender === "male"}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${gender === "male" ? "bg-[#C25700] text-white" : "text-gray-300 hover:text-white"}`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender("female")}
              aria-pressed={gender === "female"}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${gender === "female" ? "bg-[#C25700] text-white" : "text-gray-300 hover:text-white"}`}
            >
              Female
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor={ageId} className="block text-sm font-medium text-gray-300">
            Age
          </label>
          <input
            id={ageId}
            type="number"
            min={1}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor={heightId} className="block text-sm font-medium text-gray-300">
            Height (cm)
          </label>
          <input
            id={heightId}
            type="number"
            min={1}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="175"
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-400 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor={weightId} className="block text-sm font-medium text-gray-300">
            Weight (kg)
          </label>
          <input
            id={weightId}
            type="number"
            min={1}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-400 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <span className="block text-sm font-medium text-gray-300">Activity Level</span>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2" role="group" aria-label="Activity Level">
          {ACTIVITY_LEVELS.map((level) => (
            <button
              key={level.label}
              type="button"
              onClick={() => setActivity(level.multiplier)}
              aria-pressed={activity === level.multiplier}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                activity === level.multiplier
                  ? "bg-[#FF8C00]/20 border-[#FF8C00] text-white"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:text-white"
              }`}
            >
              <div className="font-bold mb-0.5">{level.label}</div>
              <div className="opacity-75 text-[10px] leading-tight">{level.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {estimate !== null ? (
        <div className="p-6 rounded-2xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm mb-1">Maintenance Calories (TDEE)</p>
              <div className="text-4xl font-bold text-[#FF8C00]">
                {estimate.tdee} <span className="text-lg font-normal text-gray-300">kcal/day</span>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                Estimated BMR: {estimate.bmr} kcal/day (Mifflin-St Jeor)
              </p>
            </div>

            <div className="flex gap-4">
              <div className="text-center px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[10px] text-gray-300 uppercase tracking-wider mb-1">
                  Weight Loss (-500)
                </p>
                <p className="text-lg font-bold text-blue-400">{estimate.tdee - 500}</p>
              </div>
              <div className="text-center px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[10px] text-gray-300 uppercase tracking-wider mb-1">
                  Weight Gain (+500)
                </p>
                <p className="text-lg font-bold text-green-400">{estimate.tdee + 500}</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-300 flex gap-2">
            <Info className="h-4 w-4 shrink-0 text-[#FF8C00] mt-0.5" aria-hidden="true" />
            <span>
              These results are estimates based on your inputs. Individual metabolism may vary.
            </span>
          </p>

          {showDeepLinks && (
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs font-semibold">
              <Link
                href="/tools/macro-calculator"
                className="inline-flex items-center gap-1 text-[#FF8C00] hover:text-white transition-colors"
              >
                Split these calories into Macros
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/tools/calorie-calculator"
                className="inline-flex items-center gap-1 text-gray-300 hover:text-[#FF8C00] transition-colors"
              >
                Full TDEE &amp; Deficit Guide
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="p-10 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center text-gray-300">
          <Apple className="h-11 w-11 mb-3 opacity-50" aria-hidden="true" />
          <p className="font-medium">Fill in all fields to calculate your daily TDEE</p>
          <p className="text-xs text-gray-300 mt-1">Uses the Mifflin-St Jeor equation (metric units)</p>
        </div>
      )}
    </div>
  );
}
