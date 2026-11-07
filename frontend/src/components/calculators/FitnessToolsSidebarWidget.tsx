"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  Dumbbell,
  Apple,
  PieChart,
  Scale,
  Heart,
  Zap,
} from "lucide-react";

export interface FitnessToolItem {
  slug: string;
  href: string;
  title: string;
  shortName: string;
  badge: string;
  description: string;
  formula: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgAccent: string;
  glowColor: string;
  btnHoverColor: string;
}

export const TOOLS_DATA: FitnessToolItem[] = [
  {
    slug: "one-rep-max-calculator",
    href: "/tools/one-rep-max-calculator",
    title: "1RM & Training Zones",
    shortName: "1RM Max",
    badge: "Strength",
    description: "Calculate your single-rep max and calibrated percentage zones for compound lifts.",
    formula: "Epley & Brzycki formulas",
    icon: Dumbbell,
    accentColor: "text-rose-400",
    bgAccent: "bg-rose-500/10 border-rose-500/25",
    glowColor: "shadow-[0_0_25px_rgba(244,63,94,0.12)]",
    btnHoverColor: "hover:bg-rose-500",
  },
  {
    slug: "calorie-calculator",
    href: "/tools/calorie-calculator",
    title: "Daily Calorie & TDEE",
    shortName: "Calories",
    badge: "Metabolism",
    description: "Determine exact maintenance energy and target deficit/surplus calorie counts.",
    formula: "Mifflin-St Jeor formula",
    icon: Apple,
    accentColor: "text-[#FF8C00]",
    bgAccent: "bg-[#FF8C00]/10 border-[#FF8C00]/25",
    glowColor: "shadow-[0_0_25px_rgba(255,140,0,0.12)]",
    btnHoverColor: "hover:bg-[#FF8C00]",
  },
  {
    slug: "macro-calculator",
    href: "/tools/macro-calculator",
    title: "Macro Splitter (P/F/C)",
    shortName: "Macros",
    badge: "Nutrition",
    description: "Calibrate scientific protein, fat, and carb ratios by weight and meal splits.",
    formula: "ISSN clinical standards",
    icon: PieChart,
    accentColor: "text-emerald-400",
    bgAccent: "bg-emerald-500/10 border-emerald-500/25",
    glowColor: "shadow-[0_0_25px_rgba(16,185,129,0.12)]",
    btnHoverColor: "hover:bg-emerald-500",
  },
  {
    slug: "ideal-weight-calculator",
    href: "/tools/ideal-weight-calculator",
    title: "Ideal Body Weight",
    shortName: "Ideal Wt",
    badge: "Body Comp",
    description: "Discover healthy reference body weight across 4 clinical formulas and WHO standards.",
    formula: "Devine, Robinson & Miller",
    icon: Heart,
    accentColor: "text-purple-400",
    bgAccent: "bg-purple-500/10 border-purple-500/25",
    glowColor: "shadow-[0_0_25px_rgba(168,85,247,0.12)]",
    btnHoverColor: "hover:bg-purple-500",
  },
  {
    slug: "bmi-calculator",
    href: "/tools/bmi-calculator",
    title: "BMI Calculator",
    shortName: "BMI Index",
    badge: "Health",
    description: "Quickly assess body mass index against World Health Organization criteria.",
    formula: "WHO Adult Criteria",
    icon: Scale,
    accentColor: "text-blue-400",
    bgAccent: "bg-blue-500/10 border-blue-500/25",
    glowColor: "shadow-[0_0_25px_rgba(59,130,246,0.12)]",
    btnHoverColor: "hover:bg-blue-500",
  },
];

export interface FitnessToolsSidebarWidgetProps {
  category?: string;
  title?: string;
  className?: string;
}

export default function FitnessToolsSidebarWidget({
  category,
  title = "Fitness Calculators",
  className = "",
}: FitnessToolsSidebarWidgetProps) {
  // Determine smart recommendation based on category context
  const recommendedSlug = useMemo(() => {
    const cat = (category || "").toLowerCase();
    if (
      cat.includes("strength") ||
      cat.includes("muscle") ||
      cat.includes("hypertrophy") ||
      cat.includes("workout") ||
      cat.includes("chest") ||
      cat.includes("legs") ||
      cat.includes("back") ||
      cat.includes("powerlifting")
    ) {
      return "one-rep-max-calculator";
    }
    if (
      cat.includes("nutrition") ||
      cat.includes("diet") ||
      cat.includes("macro") ||
      cat.includes("protein") ||
      cat.includes("supplement")
    ) {
      return "macro-calculator";
    }
    if (
      cat.includes("weight") ||
      cat.includes("fat-loss") ||
      cat.includes("loss") ||
      cat.includes("calorie") ||
      cat.includes("burn")
    ) {
      return "calorie-calculator";
    }
    if (cat.includes("wellness") || cat.includes("health") || cat.includes("recovery")) {
      return "ideal-weight-calculator";
    }
    return "calorie-calculator";
  }, [category]);

  const [activeSlug, setActiveSlug] = useState<string>(recommendedSlug);

  const activeTool = useMemo(
    () => TOOLS_DATA.find((t) => t.slug === activeSlug) || TOOLS_DATA[0],
    [activeSlug]
  );

  const ActiveIcon = activeTool.icon;
  const isRecommended = activeTool.slug === recommendedSlug && Boolean(category);

  return (
    <div
      className={`rounded-3xl bg-[#243447] border border-white/10 p-6 shadow-xl relative overflow-hidden group ${activeTool.glowColor} transition-shadow duration-500 ${className}`}
    >
      {/* Subtle background glow effect matching active tool */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-44 h-44 rounded-full bg-[#FF8C00]/5 blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FF8C00]/15 text-[#FF8C00] border border-[#FF8C00]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FitWay Suite</span>
        </div>

        <Link
          href="/tools"
          className="text-xs font-medium text-gray-400 hover:text-white inline-flex items-center gap-1 transition-colors group/link"
          title="Open all tools catalog"
        >
          <span>All Tools</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          Calibrate your training & nutrition with scientifically validated formulas.
        </p>
      </div>

      {/* Mini Icon Tabs Selector */}
      <div className="grid grid-cols-5 gap-1.5 p-1.5 bg-[#1B2B3B]/80 rounded-2xl border border-white/5 mb-5">
        {TOOLS_DATA.map((tool) => {
          const Icon = tool.icon;
          const isActive = tool.slug === activeSlug;
          const isRec = tool.slug === recommendedSlug && Boolean(category);

          return (
            <button
              key={tool.slug}
              type="button"
              onClick={() => setActiveSlug(tool.slug)}
              title={`${tool.title} ${isRec ? "(Recommended)" : ""}`}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? `${tool.bgAccent} border text-white shadow-sm`
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
              }`}
            >
              {isRec && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF8C00] ring-2 ring-[#243447]" />
              )}
              <Icon className={`w-4 h-4 ${isActive ? tool.accentColor : ""}`} />
              <span className="text-[10px] font-medium mt-1 truncate max-w-full">
                {tool.shortName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tool Interactive Preview Card */}
      <div className="p-4 rounded-2xl bg-[#1B2B3B] border border-white/5 space-y-3 relative">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${activeTool.bgAccent}`}>
              <ActiveIcon className={`w-5 h-5 ${activeTool.accentColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">{activeTool.title}</h4>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-semibold text-gray-400">
                  {activeTool.badge}
                </span>
                {isRecommended && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#FF8C00]/20 text-[#FF8C00] border border-[#FF8C00]/40">
                    <Zap className="w-2.5 h-2.5 fill-[#FF8C00]" />
                    Recommended
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          {activeTool.description}
        </p>

        <div className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 font-mono bg-black/30 px-2.5 py-1 rounded-lg border border-white/5 w-full truncate">
          <span className="text-[#FF8C00] font-bold">Standard:</span>
          <span className="truncate">{activeTool.formula}</span>
        </div>

        {/* CTA Launch Button */}
        <Link
          href={activeTool.href}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#E67E00] text-white text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#FF8C00]/20 transition-all group/btn"
        >
          <span>Calculate Now</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Footer cross-link to Central Hub */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
        <span>5 Free Interactive Tools</span>
        <Link
          href="/tools"
          className="text-[#FF8C00] hover:text-[#FFA500] font-semibold inline-flex items-center gap-1 transition-colors"
        >
          View Hub
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

