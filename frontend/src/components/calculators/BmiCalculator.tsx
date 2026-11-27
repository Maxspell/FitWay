"use client";

import { useState, useMemo, useId } from "react";
import Link from "next/link";
import { Scale, Info, ArrowRight } from "lucide-react";

interface BmiCalculatorProps {
  showDeepLinks?: boolean;
}

const BMI_MIN = 10;
const BMI_MAX = 40;
const BMI_RANGE = BMI_MAX - BMI_MIN;

export default function BmiCalculator({ showDeepLinks = false }: BmiCalculatorProps) {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const heightId = useId();
  const weightId = useId();

  const bmi = useMemo(() => {
    const hCm = parseFloat(height);
    const w = parseFloat(weight);
    if (!Number.isFinite(hCm) || !Number.isFinite(w) || hCm <= 0 || w <= 0) return null;
    const h = hCm / 100;
    return Math.round((w / (h * h)) * 10) / 10;
  }, [height, weight]);

  const getBmiStatus = (val: number) => {
    if (val < 18.5) return { label: "Underweight", color: "text-blue-400", bg: "bg-blue-400/10" };
    if (val < 25) return { label: "Normal weight", color: "text-green-400", bg: "bg-green-400/10" };
    if (val < 30) return { label: "Overweight", color: "text-yellow-400", bg: "bg-yellow-400/10" };
    return { label: "Obesity", color: "text-red-400", bg: "bg-red-400/10" };
  };

  const status = bmi !== null ? getBmiStatus(bmi) : null;
  const indicatorLeftPct =
    bmi !== null ? Math.min(Math.max(((bmi - BMI_MIN) / BMI_RANGE) * 100, 2), 98) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-colors"
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
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {bmi !== null ? (
        <div className={`p-6 rounded-2xl border border-white/10 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500 ${status?.bg}`}>
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-gray-300 text-sm mb-1">Your BMI (WHO Adult Criteria)</p>
              <div className={`text-4xl font-bold ${status?.color}`}>{bmi}</div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${status?.bg} ${status?.color} border border-current/20`}>
                {status?.label}
              </span>
            </div>
          </div>

          {/* Scale aligned to 10-40 BMI range: <18.5 (28.33%), 18.5-25 (21.67%), 25-30 (16.67%), 30-40 (33.33%) */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden flex" aria-hidden="true">
            <div className="h-full bg-blue-400" style={{ width: "28.33%" }} />
            <div className="h-full bg-green-400" style={{ width: "21.67%" }} />
            <div className="h-full bg-yellow-400" style={{ width: "16.67%" }} />
            <div className="h-full bg-red-400" style={{ width: "33.33%" }} />
          </div>
          <div className="relative w-full h-2 mt-1" aria-hidden="true">
            <div
              className="absolute top-1/2 w-2.5 h-2.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg ring-2 ring-[#1B2B3B]"
              style={{ left: `${indicatorLeftPct}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-gray-300 flex gap-2">
            <Info className="h-4 w-4 shrink-0 text-[#FF8C00] mt-0.5" aria-hidden="true" />
            <span>
              {bmi < 18.5 && "Focus on nutrient-dense foods and strength training to build muscle mass."}
              {bmi >= 18.5 && bmi < 25 && "Within the WHO healthy weight range. Maintain balanced nutrition and regular training."}
              {bmi >= 25 && bmi < 30 && "Consider increasing daily activity and checking your calorie balance."}
              {bmi >= 30 && "Consider consulting a healthcare professional to build a sustainable plan."}
            </span>
          </p>

          {showDeepLinks && (
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-3 text-xs font-semibold">
              <Link
                href="/tools/bmi-calculator"
                className="inline-flex items-center gap-1 text-[#FF8C00] hover:text-white transition-colors"
              >
                Full WHO Chart &amp; Guide
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/tools/ideal-weight-calculator"
                className="inline-flex items-center gap-1 text-gray-300 hover:text-[#FF8C00] transition-colors"
              >
                Check Ideal Weight Range
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="p-10 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center text-gray-300">
          <Scale className="h-11 w-11 mb-3 opacity-50" aria-hidden="true" />
          <p className="font-medium">Enter height (cm) and weight (kg) to see your BMI</p>
          <p className="text-xs text-gray-300 mt-1">Uses WHO adult screening categories (metric units)</p>
        </div>
      )}
    </div>
  );
}
