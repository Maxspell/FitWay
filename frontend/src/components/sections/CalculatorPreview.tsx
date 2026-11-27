"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Calculator, Zap, ArrowRight, LayoutGrid } from "lucide-react";
import BmiCalculator from "../calculators/BmiCalculator";
import { ALL_CALCULATORS } from "../calculators/RelatedCalculators";

const CalorieCalculator = dynamic(() => import("../calculators/CalorieCalculator"), {
  loading: () => (
    <div className="min-h-[310px] rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
  ),
});

export default function CalculatorPreview() {
  const [activeTab, setActiveTab] = useState<"bmi" | "calories">("bmi");

  return (
    <section
      aria-labelledby="calculators-preview-heading"
      className="py-12 md:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF8C00]/10 rounded-full blur-[120px] -z-10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 items-center">
          {/* Content + 5-Tool Spoke Directory Column */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF8C00] text-sm font-medium">
              <Zap className="h-4 w-4" aria-hidden="true" />
              Free Fitness Calculators
            </div>

            <div className="space-y-4">
              <h2
                id="calculators-preview-heading"
                className="text-4xl md:text-5xl font-bold leading-tight text-white"
              >
                Calculate Your <br />
                <span className="text-[#FF8C00]">Starting Numbers</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Check your BMI or daily TDEE calories in metric units using WHO criteria and the
                Mifflin-St Jeor equation. Open any dedicated calculator below for macro splits, 1RM
                lift zones, and healthy weight ranges.
              </p>
            </div>

            {/* Direct 5-Spoke Directory + Hub Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-1">
              {ALL_CALCULATORS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00]"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${tool.color}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white group-hover:text-[#FF8C00] transition-colors truncate">
                        {tool.title}
                      </div>
                      <div className="text-xs text-gray-300 truncate">{tool.badge}</div>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 text-gray-300 group-hover:text-[#FF8C00] group-hover:translate-x-0.5 transition-[transform,color] shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}

              <Link
                href="/tools"
                className="group flex items-center gap-3 p-3.5 rounded-2xl bg-[#C25700]/15 hover:bg-[#C25700]/25 border border-[#FF8C00]/30 hover:border-[#FF8C00]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00]"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#C25700] text-white shrink-0">
                  <LayoutGrid className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-white truncate">All 5 Fitness Tools</div>
                  <div className="text-xs text-gray-300 truncate">Guides, formulas &amp; FAQ</div>
                </div>
                <ArrowRight
                  className="h-4 w-4 text-[#FF8C00] group-hover:translate-x-0.5 transition-transform shrink-0"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Interactive Quick-Preview Column */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-[#1B2B3B]/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl relative">
              {/* Tab Switcher */}
              <div
                role="tablist"
                aria-label="Quick calculator preview"
                className="flex bg-white/5 rounded-2xl p-1.5 mb-8 border border-white/5"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "bmi"}
                  onClick={() => setActiveTab("bmi")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-bold transition-colors ${
                    activeTab === "bmi"
                      ? "bg-[#C25700] text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Calculator className="h-4 w-4" aria-hidden="true" />
                  BMI Calculator
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "calories"}
                  onClick={() => setActiveTab("calories")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-bold transition-colors ${
                    activeTab === "calories"
                      ? "bg-[#C25700] text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Zap className="h-4 w-4" aria-hidden="true" />
                  Calories &amp; TDEE
                </button>
              </div>

              {/* Active Calculator Component */}
              <div className="min-h-[300px]" role="tabpanel">
                {activeTab === "bmi" ? (
                  <BmiCalculator showDeepLinks />
                ) : (
                  <CalorieCalculator showDeepLinks />
                )}
              </div>

              <p className="mt-5 text-xs text-gray-300 text-center">
                Metric screening estimates (WHO &amp; Mifflin-St Jeor). Educational reference only, not
                medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
