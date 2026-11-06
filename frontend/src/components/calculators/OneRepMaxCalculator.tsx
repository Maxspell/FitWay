"use client";

import { useState, useMemo } from "react";
import { Dumbbell, Info, Zap, Flame, Trophy } from "lucide-react";

const EXERCISES = [
  "Bench Press",
  "Barbell Back Squat",
  "Conventional Deadlift",
  "Overhead Press",
  "Barbell Row",
  "Other Compound",
];

const PERCENTAGES = [
  { pct: 100, reps: 1, zone: "Max Effort", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  { pct: 95, reps: 2, zone: "Peak Strength", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  { pct: 90, reps: 3, zone: "Heavy Strength", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  { pct: 85, reps: 5, zone: "Strength-Hypertrophy", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  { pct: 80, reps: 7, zone: "Hypertrophy Sweet Spot", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  { pct: 75, reps: 10, zone: "Hypertrophy Volume", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  { pct: 70, reps: 12, zone: "Metabolic Stress", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  { pct: 65, reps: 15, zone: "Endurance & Conditioning", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  { pct: 60, reps: 20, zone: "Warm-up / Deload", color: "text-gray-400 bg-gray-400/10 border-gray-400/20" },
];

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState<string>("100");
  const [reps, setReps] = useState<number>(5);
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [exercise, setExercise] = useState<string>("Bench Press");

  const results = useMemo(() => {
    const w = parseFloat(weight);
    const r = reps;
    if (!w || w <= 0 || r < 1 || r > 15) return null;

    if (r === 1) {
      return {
        oneRepMax: Math.round(w),
        epley: Math.round(w),
        brzycki: Math.round(w),
        lombardi: Math.round(w),
        table: PERCENTAGES.map((p) => ({
          ...p,
          weight: Math.round((w * p.pct) / 100),
        })),
      };
    }

    // Epley Formula: w * (1 + r / 30)
    const epley = w * (1 + r / 30);
    // Brzycki Formula: w * (36 / (37 - r))
    const brzycki = w * (36 / (37 - r));
    // Lombardi Formula: w * r^0.10
    const lombardi = w * Math.pow(r, 0.1);

    const avg1RM = Math.round((epley + brzycki + lombardi) / 3);

    const table = PERCENTAGES.map((p) => ({
      ...p,
      weight: Math.round((avg1RM * p.pct) / 100),
    }));

    return {
      oneRepMax: avg1RM,
      epley: Math.round(epley),
      brzycki: Math.round(brzycki),
      lombardi: Math.round(lombardi),
      table,
    };
  }, [weight, reps]);

  return (
    <div className="space-y-6">
      {/* Exercise & Unit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Exercise</label>
          <select
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="w-full bg-[#1B2B3B] border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-all"
          >
            {EXERCISES.map((ex) => (
              <option key={ex} value={ex} className="bg-[#1B2B3B] text-white">
                {ex}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Unit of Measurement</label>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setUnit("kg")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                unit === "kg"
                  ? "bg-[#FF8C00] text-[#1B2B3B] font-bold shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Kilograms (kg)
            </button>
            <button
              type="button"
              onClick={() => setUnit("lbs")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                unit === "lbs"
                  ? "bg-[#FF8C00] text-[#1B2B3B] font-bold shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Pounds (lbs)
            </button>
          </div>
        </div>
      </div>

      {/* Weight & Reps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Weight Lifted ({unit})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="100"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Repetitions Completed (1–12)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={12}
              value={reps}
              onChange={(e) => setReps(parseInt(e.target.value, 10))}
              className="flex-1 accent-[#FF8C00] cursor-pointer"
            />
            <span className="w-12 text-center py-2 px-3 bg-white/5 border border-white/10 rounded-xl font-bold text-white">
              {reps}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            Formula accuracy is highest between 1 and 8 repetitions.
          </span>
        </div>
      </div>

      {/* Results View */}
      {results ? (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#243447] to-[#1B2B3B] border border-white/10 transition-all space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8C00] flex items-center gap-1.5 mb-1">
                <Trophy className="w-4 h-4" /> Estimated 1-Repetition Maximum
              </span>
              <div className="text-4xl font-extrabold text-white">
                {results.oneRepMax} <span className="text-xl font-normal text-gray-400">{unit}</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Calculated for: <strong className="text-white">{exercise}</strong> based on {weight} {unit} × {reps} reps
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400">Epley:</span>{" "}
                <strong className="text-white font-mono">{results.epley} {unit}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400">Brzycki:</span>{" "}
                <strong className="text-white font-mono">{results.brzycki} {unit}</strong>
              </div>
            </div>
          </div>

          {/* Percentage Breakdown Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF8C00]" /> Working Weight & Training Zones
            </h4>

            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-white/5 text-gray-400 uppercase text-[11px] font-semibold border-b border-white/5">
                  <tr>
                    <th className="py-2.5 px-3">Intensity</th>
                    <th className="py-2.5 px-3">Working Weight</th>
                    <th className="py-2.5 px-3">Est. Reps</th>
                    <th className="py-2.5 px-3">Primary Training Goal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  {results.table.map((row) => (
                    <tr key={row.pct} className="hover:bg-white/5 transition-colors">
                      <td className="py-2 px-3 font-bold text-white">
                        {row.pct}%
                      </td>
                      <td className="py-2 px-3 font-mono text-[#FF8C00] font-bold">
                        {row.weight} {unit}
                      </td>
                      <td className="py-2 px-3 text-gray-300">
                        ~{row.reps} {row.reps === 1 ? "rep" : "reps"}
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${row.color}`}>
                          {row.zone}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-gray-400 flex items-start gap-2 italic">
            <Info className="h-4 w-4 shrink-0 text-[#FF8C00] mt-0.5" />
            1RM formulas provide statistical estimations. Always use a spotter or safety pins when testing heavy lifts in the 90–100% intensity zone.
          </p>
        </div>
      ) : (
        <div className="p-12 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-400">
          <Dumbbell className="h-12 w-12 mb-4 opacity-40 text-[#FF8C00]" />
          <p>Enter the weight lifted and number of repetitions to calculate your 1RM</p>
        </div>
      )}
    </div>
  );
}

