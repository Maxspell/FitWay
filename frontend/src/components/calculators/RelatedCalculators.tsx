import Link from "next/link";
import { Scale, Apple, PieChart, Dumbbell, Heart, ArrowRight } from "lucide-react";

export interface CalculatorItem {
  slug: string;
  href: string;
  title: string;
  badge: string;
  description: string;
  icon: any;
  color: string;
}

export const ALL_CALCULATORS: CalculatorItem[] = [
  {
    slug: "bmi-calculator",
    href: "/tools/bmi-calculator",
    title: "BMI Calculator",
    badge: "Health Screening",
    description: "Assess your body mass index based on World Health Organization adult criteria.",
    icon: Scale,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    slug: "calorie-calculator",
    href: "/tools/calorie-calculator",
    title: "Daily Calorie & TDEE",
    badge: "Metabolism",
    description: "Calculate your maintenance calories, weight loss deficit, and surplus with Mifflin-St Jeor.",
    icon: Apple,
    color: "text-[#FF8C00] bg-[#FF8C00]/10 border-[#FF8C00]/20",
  },
  {
    slug: "macro-calculator",
    href: "/tools/macro-calculator",
    title: "Macro Splitter (P/F/C)",
    badge: "Nutrition",
    description: "Target your daily protein, fat, and carbohydrate ratios in grams and calories per meal.",
    icon: PieChart,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    slug: "one-rep-max-calculator",
    href: "/tools/one-rep-max-calculator",
    title: "1RM & Training Zones",
    badge: "Strength",
    description: "Estimate your 1-repetition maximum for bench, squat, and deadlift with Epley & Brzycki.",
    icon: Dumbbell,
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  {
    slug: "ideal-weight-calculator",
    href: "/tools/ideal-weight-calculator",
    title: "Ideal Body Weight",
    badge: "Body Composition",
    description: "Determine your clinical healthy weight using Devine, Robinson, Miller, and WHO formulas.",
    icon: Heart,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
];

interface RelatedCalculatorsProps {
  currentSlug?: string;
  title?: string;
  subtitle?: string;
}

export default function RelatedCalculators({
  currentSlug,
  title = "Explore Other Free Fitness Calculators",
  subtitle = "Precision science-backed calculation tools designed to accelerate your training and nutrition.",
}: RelatedCalculatorsProps) {
  const filtered = currentSlug
    ? ALL_CALCULATORS.filter((c) => c.slug !== currentSlug)
    : ALL_CALCULATORS;

  return (
    <section className="mt-16 pt-16 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">{subtitle}</p>
        </div>
        <Link
          href="/tools"
          className="text-xs sm:text-sm font-bold text-[#FF8C00] hover:text-[#ff9d26] inline-flex items-center gap-1.5 transition-colors group"
        >
          View All Calculators Hub
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.slice(0, 4).map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={tool.href}
              className="p-5 rounded-2xl bg-[#243447]/60 hover:bg-[#243447] border border-white/5 hover:border-white/15 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${tool.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-[#FF8C00] transition-colors mb-1">
                  {tool.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#FF8C00] font-semibold">
                <span>Calculate now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

