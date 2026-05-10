"use client";

import { useState, useMemo } from "react";
import { Scale, Info } from "lucide-react";

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const bmi = useMemo(() => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return null;
    return Math.round((w / (h * h)) * 10) / 10;
  }, [height, weight]);

  const getBmiStatus = (val: number) => {
    if (val < 18.5) return { label: "Underweight", color: "text-blue-400", bg: "bg-blue-400/10" };
    if (val < 25) return { label: "Normal weight", color: "text-green-400", bg: "bg-green-400/10" };
    if (val < 30) return { label: "Overweight", color: "text-yellow-400", bg: "bg-yellow-400/10" };
    return { label: "Obesity", color: "text-red-400", bg: "bg-red-400/10" };
  };

  const status = bmi ? getBmiStatus(bmi) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="175"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition-all"
          />
        </div>
      </div>

      {bmi !== null ? (
        <div className={`p-6 rounded-2xl border border-white/10 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 ${status?.bg}`}>
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Your BMI</p>
              <h4 className={`text-4xl font-bold ${status?.color}`}>{bmi}</h4>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${status?.bg} ${status?.color} border border-current/20`}>
                {status?.label}
              </span>
            </div>
          </div>
          
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-400" style={{ width: '18.5%' }}></div>
            <div className="h-full bg-green-400" style={{ width: '6.5%' }}></div>
            <div className="h-full bg-yellow-400" style={{ width: '5%' }}></div>
            <div className="h-full bg-red-400" style={{ width: '70%' }}></div>
          </div>
          {/* Indicator cursor */}
          <div className="relative w-full h-1 mt-1">
             <div 
               className="absolute top-0 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"
               style={{ left: `${Math.min(Math.max((bmi / 40) * 100, 5), 95)}%` }}
             ></div>
          </div>

          <p className="mt-4 text-sm text-gray-300 flex gap-2">
            <Info className="h-4 w-4 shrink-0 text-[#FF8C00]" />
            {bmi < 18.5 && "Focus on nutrient-dense foods and strength training to build muscle mass."}
            {bmi >= 18.5 && bmi < 25 && "Great job! Keep up your balanced diet and regular physical activity."}
            {bmi >= 25 && bmi < 30 && "Consider increasing cardio and reviewing your daily caloric intake."}
            {bmi >= 30 && "We recommend consulting with a professional to create a sustainable health plan."}
          </p>
        </div>
      ) : (
        <div className="p-12 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500">
          <Scale className="h-12 w-12 mb-4 opacity-20" />
          <p>Enter your details to see your result</p>
        </div>
      )}
    </div>
  );
}
