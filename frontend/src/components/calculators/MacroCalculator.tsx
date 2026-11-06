"use client";

import { useState, useMemo } from "react";
import { PieChart, Info, Sparkles, Utensils } from "lucide-react";

type Goal = "loss" | "maintenance" | "gain";
type DietStyle = "balanced" | "high-protein" | "low-carb";

interface MacroSplit {
  proteinPercent: number;
  carbPercent: number;
  fatPercent: number;
}

const DIET_SPLITS: Record<DietStyle, Record<Goal, MacroSplit>> = {
  balanced: {
    loss: { proteinPercent: 35, carbPercent: 35, fatPercent: 30 },
    maintenance: { proteinPercent: 30, carbPercent: 40, fatPercent: 30 },
    gain: { proteinPercent: 25, carbPercent: 50, fatPercent: 25 },
  },
  "high-protein": {
    loss: { proteinPercent: 40, carbPercent: 30, fatPercent: 30 },
    maintenance: { proteinPercent: 35, carbPercent: 35, fatPercent: 30 },
    gain: { proteinPercent: 30, carbPercent: 45, fatPercent: 25 },
  },
  "low-carb": {
    loss: { proteinPercent: 40, carbPercent: 20, fatPercent: 40 },
    maintenance: { proteinPercent: 30, carbPercent: 25, fatPercent: 45 },
    gain: { proteinPercent: 30, carbPercent: 30, fatPercent: 40 },
  },
};

export default function MacroCalculator() {
  const [caloriesInput, setCaloriesInput] = useState<string>("2000");
  const [bodyWeight, setBodyWeight] = useState<string>("75");
  const [goal, setGoal] = useState<Goal>("loss");
  const [dietStyle, setDietStyle] = useState<DietStyle>("high-protein");
  const [mealsCount, setMealsCount] = useState<number>(4);

  const results = useMemo(() => {
    const totalKcal = parseFloat(caloriesInput);
    const weightKg = parseFloat(bodyWeight) || 0;
    if (!totalKcal || totalKcal < 800 || totalKcal > 10000) return null;

    const split = DIET_SPLITS[dietStyle][goal];

    const proteinKcal = (totalKcal * split.proteinPercent) / 100;
    const carbKcal = (totalKcal * split.carbPercent) / 100;
    const fatKcal = (totalKcal * split.fatPercent) / 100;

    // 4 kcal per gram of protein and carbs, 9 kcal per gram of fat
    const proteinGrams = Math.round(proteinKcal / 4);
    const carbGrams = Math.round(carbKcal / 4);
    const fatGrams = Math.round(fatKcal / 9);

    const proteinPerKg = weightKg > 0 ? (proteinGrams / weightKg).toFixed(1) : null;

    const perMeal = {
      protein: Math.round(proteinGrams / mealsCount),
      carbs: Math.round(carbGrams / mealsCount),
      fats: Math.round(fatGrams / mealsCount),
      calories: Math.round(totalKcal / mealsCount),
    };

    return {
      totalKcal,
      split,
      protein: { grams: proteinGrams, kcal: Math.round(proteinKcal) },
      carbs: { grams: carbGrams, kcal: Math.round(carbKcal) },
      fats: { grams: fatGrams, kcal: Math.round(fatKcal) },
      proteinPerKg,
      perMeal,
    };
  }, [caloriesInput, bodyWeight, goal, dietStyle, mealsCount]);

  return (
    <div className="space-y-6">
      {/* Primary Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Daily Calorie Target (kcal)
          </label>
          <input
            type="number"
            value={caloriesInput}
            onChange={(e) => setCaloriesInput(e.target.value)}
            placeholder="2000"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-all"
          />
          <span className="text-xs text-gray-500">
            Tip: Use our Calorie Calculator if you need to calculate your target first.
          </span>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Body Weight (kg) — optional for g/kg
          </label>
          <input
            type="number"
            value={bodyWeight}
            onChange={(e) => setBodyWeight(e.target.value)}
            placeholder="75"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-all"
          />
          <span className="text-xs text-gray-500">
            Used to verify protein intake relative to your body mass.
          </span>
        </div>
      </div>

      {/* Goal Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-400">Primary Goal</label>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: "loss", label: "Fat Loss", desc: "Higher protein to spare muscle" },
              { id: "maintenance", label: "Maintenance", desc: "Energy & performance balance" },
              { id: "gain", label: "Muscle Gain", desc: "Higher carbs to fuel training" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setGoal(item.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                goal === item.id
                  ? "bg-[#FF8C00]/20 border-[#FF8C00] text-white shadow-[0_0_15px_rgba(255,140,0,0.15)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <div className="text-sm font-bold">{item.label}</div>
              <div className="text-[11px] opacity-70 hidden sm:block">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Diet Style & Meals Count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Nutritional Strategy</label>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            {(
              [
                { id: "high-protein", label: "High Protein" },
                { id: "balanced", label: "Balanced" },
                { id: "low-carb", label: "Low Carb" },
              ] as const
            ).map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setDietStyle(style.id)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  dietStyle === style.id
                    ? "bg-[#FF8C00] text-[#1B2B3B] font-bold shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Meals per Day (for portioning)
          </label>
          <div className="flex gap-2">
            {[3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setMealsCount(num)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  mealsCount === num
                    ? "bg-white/20 border-white/40 text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {num} meals
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results View */}
      {results ? (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#243447] to-[#1B2B3B] border border-white/10 transition-all space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8C00] flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Your Macronutrient Target
              </span>
              <div className="text-3xl font-extrabold text-white">
                {results.totalKcal}{" "}
                <span className="text-sm font-normal text-gray-400">kcal/day</span>
              </div>
            </div>
            {results.proteinPerKg && (
              <div className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                Protein density: <strong className="font-bold text-white">{results.proteinPerKg} g/kg</strong>
              </div>
            )}
          </div>

          {/* Three Macro Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Protein */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-1">
              <div className="flex justify-between items-center text-xs text-blue-300 font-semibold uppercase">
                <span>Protein</span>
                <span>{results.split.proteinPercent}%</span>
              </div>
              <div className="text-3xl font-extrabold text-blue-400">
                {results.protein.grams} <span className="text-sm font-normal text-gray-300">g</span>
              </div>
              <p className="text-[11px] text-gray-400">
                {results.protein.kcal} kcal (4 kcal/g)
              </p>
            </div>

            {/* Fats */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <div className="flex justify-between items-center text-xs text-amber-300 font-semibold uppercase">
                <span>Fats</span>
                <span>{results.split.fatPercent}%</span>
              </div>
              <div className="text-3xl font-extrabold text-amber-400">
                {results.fats.grams} <span className="text-sm font-normal text-gray-300">g</span>
              </div>
              <p className="text-[11px] text-gray-400">
                {results.fats.kcal} kcal (9 kcal/g)
              </p>
            </div>

            {/* Carbs */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <div className="flex justify-between items-center text-xs text-emerald-300 font-semibold uppercase">
                <span>Carbohydrates</span>
                <span>{results.split.carbPercent}%</span>
              </div>
              <div className="text-3xl font-extrabold text-emerald-400">
                {results.carbs.grams} <span className="text-sm font-normal text-gray-300">g</span>
              </div>
              <p className="text-[11px] text-gray-400">
                {results.carbs.kcal} kcal (4 kcal/g)
              </p>
            </div>
          </div>

          {/* Ratio bar */}
          <div className="space-y-1.5">
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
              <div
                className="bg-blue-400 transition-all duration-500"
                style={{ width: `${results.split.proteinPercent}%` }}
                title={`Protein: ${results.split.proteinPercent}%`}
              />
              <div
                className="bg-amber-400 transition-all duration-500"
                style={{ width: `${results.split.fatPercent}%` }}
                title={`Fats: ${results.split.fatPercent}%`}
              />
              <div
                className="bg-emerald-400 transition-all duration-500"
                style={{ width: `${results.split.carbPercent}%` }}
                title={`Carbohydrates: ${results.split.carbPercent}%`}
              />
            </div>
            <div className="flex justify-between text-[11px] text-gray-400 px-1">
              <span className="text-blue-400">● Protein {results.split.proteinPercent}%</span>
              <span className="text-amber-400">● Fats {results.split.fatPercent}%</span>
              <span className="text-emerald-400">● Carbs {results.split.carbPercent}%</span>
            </div>
          </div>

          {/* Per-meal breakdown */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-300">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Utensils className="w-4 h-4 text-[#FF8C00]" />
              <span>Per meal target ({mealsCount} meals):</span>
            </div>
            <div className="flex flex-wrap gap-3 font-medium">
              <span className="text-blue-300"><strong>{results.perMeal.protein}g</strong> protein</span>
              <span className="text-gray-500">•</span>
              <span className="text-amber-300"><strong>{results.perMeal.fats}g</strong> fats</span>
              <span className="text-gray-500">•</span>
              <span className="text-emerald-300"><strong>{results.perMeal.carbs}g</strong> carbs</span>
              <span className="text-gray-500">•</span>
              <span className="text-white">~{results.perMeal.calories} kcal</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 flex items-start gap-2 italic">
            <Info className="h-4 w-4 shrink-0 text-[#FF8C00] mt-0.5" />
            ISSN guidelines recommend 1.6–2.2 g of protein per kg of body weight for active individuals in a calorie deficit to protect lean mass.
          </p>
        </div>
      ) : (
        <div className="p-12 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-400">
          <PieChart className="h-12 w-12 mb-4 opacity-40 text-[#FF8C00]" />
          <p>Enter your daily calorie target to compute your macronutrient distribution</p>
        </div>
      )}
    </div>
  );
}

