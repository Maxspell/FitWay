"use client";

import { useState } from "react";
import BmiCalculator from "../calculators/BmiCalculator";
import CalorieCalculator from "../calculators/CalorieCalculator";
import { Calculator, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function CalculatorPreview() {
  const [activeTab, setActiveTab] = useState<"bmi" | "calories">("bmi");

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF8C00]/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Content Column */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF8C00] text-sm font-medium">
              <Zap className="h-4 w-4" />
              Interactive Tools
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Measure Your Progress <br />
                <span className="text-[#FF8C00]">Scientifically</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-xl">
                Knowing your numbers is the first step to a healthier you. Use our precision tools to track your metrics and get personalized recommendations.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                { icon: Target, text: "Accurate health metrics in seconds" },
                { icon: Target, text: "Personalized nutritional guidelines" },
                { icon: Target, text: "Science-based calculation models" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="h-6 w-6 rounded-full bg-[#FF8C00]/20 flex items-center justify-center text-[#FF8C00]">
                    <item.icon className="h-4 w-4" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link 
                href="/tools" 
                className="inline-flex items-center gap-2 text-white hover:text-[#FF8C00] font-semibold transition-colors group"
              >
                Explore all fitness tools
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Calculator Column */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-[#1B2B3B]/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative">
              {/* Tab Switcher */}
              <div className="flex bg-white/5 rounded-2xl p-1.5 mb-8 border border-white/5">
                <button
                  onClick={() => setActiveTab("bmi")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === "bmi" 
                      ? "bg-[#FF8C00] text-white shadow-lg" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Calculator className="h-4 w-4" />
                  BMI Index
                </button>
                <button
                  onClick={() => setActiveTab("calories")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === "calories" 
                      ? "bg-[#FF8C00] text-white shadow-lg" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  Daily Calories
                </button>
              </div>

              {/* Active Calculator Component */}
              <div className="min-h-[300px]">
                {activeTab === "bmi" ? <BmiCalculator /> : <CalorieCalculator />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
