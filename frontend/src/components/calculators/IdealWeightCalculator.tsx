"use client";

import { useState, useMemo } from "react";
import { Scale, Info, CheckCircle2, Heart } from "lucide-react";

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState<"male" | "female">("female");
  const [heightCm, setHeightCm] = useState<string>("168");
  const [currentWeight, setCurrentWeight] = useState<string>("68");

  const results = useMemo(() => {
    const hCm = parseFloat(heightCm);
    const currW = parseFloat(currentWeight);
    if (!hCm || hCm < 130 || hCm > 230) return null;

    // Convert cm to inches for clinical formulas
    const totalInches = hCm / 2.54;
    const inchesOver60 = Math.max(0, totalInches - 60);

    // 1. Devine Formula (1974)
    const devine =
      gender === "male"
        ? 50.0 + 2.3 * inchesOver60
        : 45.5 + 2.3 * inchesOver60;

    // 2. Robinson Formula (1983)
    const robinson =
      gender === "male"
        ? 52.0 + 1.9 * inchesOver60
        : 49.0 + 1.7 * inchesOver60;

    // 3. Miller Formula (1983)
    const miller =
      gender === "male"
        ? 56.2 + 1.41 * inchesOver60
        : 53.1 + 1.36 * inchesOver60;

    // 4. Hamwi Formula (1964)
    const hamwi =
      gender === "male"
        ? 48.0 + 2.7 * inchesOver60
        : 45.5 + 2.2 * inchesOver60;

    // Average Clinical Ideal Weight
    const avgIdeal = Math.round(((devine + robinson + miller + hamwi) / 4) * 10) / 10;

    // WHO Healthy BMI Weight Range (BMI 18.5 – 24.9)
    const hMeters = hCm / 100;
    const bmiMin = Math.round(18.5 * hMeters * hMeters * 10) / 10;
    const bmiMax = Math.round(24.9 * hMeters * hMeters * 10) / 10;

    let difference = null;
    let comparison = null;
    if (currW && currW > 0) {
      const diff = Math.round((currW - avgIdeal) * 10) / 10;
      difference = diff;
      if (currW < bmiMin) {
        comparison = {
          label: "Below Healthy Range",
          color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
          advice: "Consider a structured surplus with progressive strength training to build lean tissue.",
        };
      } else if (currW > bmiMax) {
        comparison = {
          label: "Above Healthy Range",
          color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
          advice: "A moderate 10–20% caloric deficit with resistance training can help normalize body composition.",
        };
      } else {
        comparison = {
          label: "Within Healthy Range",
          color: "text-green-400 bg-green-400/10 border-green-400/20",
          advice: "Your weight sits comfortably inside the clinical healthy range for your height.",
        };
      }
    }

    return {
      avgIdeal,
      devine: Math.round(devine * 10) / 10,
      robinson: Math.round(robinson * 10) / 10,
      miller: Math.round(miller * 10) / 10,
      hamwi: Math.round(hamwi * 10) / 10,
      bmiMin,
      bmiMax,
      difference,
      comparison,
    };
  }, [gender, heightCm, currentWeight]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gender */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Biological Sex</label>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setGender("male")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                gender === "male"
                  ? "bg-[#C25700] text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender("female")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                gender === "female"
                  ? "bg-[#C25700] text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Height */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Height (cm)</label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            placeholder="170"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-all"
          />
        </div>

        {/* Current Weight */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Current Weight (kg) — optional
          </label>
          <input
            type="number"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            placeholder="70"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Results View */}
      {results ? (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#243447] to-[#1B2B3B] border border-white/10 transition-all space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8C00] flex items-center gap-1.5 mb-1">
                <Heart className="w-4 h-4 text-rose-400" /> Consensus Ideal Body Weight
              </span>
              <div className="text-4xl font-extrabold text-white">
                {results.avgIdeal} <span className="text-xl font-normal text-gray-400">kg</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Calculated from 4 validated clinical models (Devine, Robinson, Miller, Hamwi).
              </p>
            </div>

            {results.comparison && (
              <div className="text-right">
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border inline-block ${results.comparison.color}`}>
                  {results.comparison.label}
                </span>
                {results.difference !== null && (
                  <p className="text-xs text-gray-400 mt-1">
                    {results.difference > 0
                      ? `+${results.difference} kg vs ideal average`
                      : `${results.difference} kg vs ideal average`}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* WHO Healthy Weight Span */}
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-green-300">
                WHO Healthy Weight Range for {heightCm} cm
              </div>
              <p className="text-xs text-gray-300">
                Corresponds to the optimal adult BMI bracket (18.5 – 24.9 kg/m²).
              </p>
            </div>
            <div className="text-xl sm:text-2xl font-black text-green-400">
              {results.bmiMin} – {results.bmiMax} <span className="text-sm font-normal text-gray-300">kg</span>
            </div>
          </div>

          {/* Clinical Formulas Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-gray-400 block mb-0.5">Devine (1974)</span>
              <strong className="text-lg text-white font-mono">{results.devine} kg</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-gray-400 block mb-0.5">Robinson (1983)</span>
              <strong className="text-lg text-white font-mono">{results.robinson} kg</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-gray-400 block mb-0.5">Miller (1983)</span>
              <strong className="text-lg text-white font-mono">{results.miller} kg</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-gray-400 block mb-0.5">Hamwi (1964)</span>
              <strong className="text-lg text-white font-mono">{results.hamwi} kg</strong>
            </div>
          </div>

          {results.comparison && (
            <p className="text-xs text-gray-300 flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF8C00] mt-0.5" />
              <span>{results.comparison.advice}</span>
            </p>
          )}

          <p className="text-xs text-gray-400 flex items-start gap-2 italic">
            <Info className="h-4 w-4 shrink-0 text-[#FF8C00] mt-0.5" />
            Ideal body weight formulas are population-level estimates. They do not distinguish between muscle mass and adipose tissue. Athletes and strength trainers may naturally exceed these numbers while remaining exceptionally healthy.
          </p>
        </div>
      ) : (
        <div className="p-12 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-400">
          <Scale className="h-12 w-12 mb-4 opacity-40 text-[#FF8C00]" />
          <p>Enter your biological sex and height to calculate your ideal body weight</p>
        </div>
      )}
    </div>
  );
}

