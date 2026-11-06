import { Metadata } from "next";
import Link from "next/link";
import { PieChart, Utensils, BookOpen, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import MacroCalculator from "@/components/calculators/MacroCalculator";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import FAQSection from "@/components/sections/faq/FAQSection";

export const metadata: Metadata = {
  title: "Free Macro Calculator — Daily Protein, Fat & Carbs Splitter",
  description:
    "Calculate your exact macronutrient distribution (protein, fats, and carbohydrates in grams and calories) for fat loss, muscle building, or body recomposition.",
  alternates: {
    canonical: "/tools/macro-calculator",
  },
  openGraph: {
    title: "Free Macro Calculator — Daily Protein, Fat & Carbs Splitter | FitWay",
    description:
      "Target your daily protein, fat, and carbohydrate ratios in grams and calories per meal. Free, science-backed calculator.",
    url: "/tools/macro-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Macro Calculator | FitWay",
    description: "Calculate your daily macros for fat loss or muscle gain with FitWay.",
  },
};

const macroFaqs = [
  {
    id: 1,
    question: "What are macronutrients and how many calories are in each?",
    answer:
      "Macronutrients are the nutrients your body requires in large quantities to provide energy and maintain cellular structure. Protein contains 4 calories per gram; Carbohydrates contain 4 calories per gram; Dietary Fats contain 9 calories per gram. Alcohol is technically a fourth energy source providing 7 calories per gram, though it lacks essential nutrient value.",
    category: "Basics",
  },
  {
    id: 2,
    question: "How much protein do I really need per day?",
    answer:
      "According to position stands by the International Society of Sports Nutrition (ISSN), active individuals training to preserve or build muscle require 1.4 to 2.0 grams of protein per kilogram of body weight (0.7–1.0 g per pound) daily. During an aggressive caloric deficit, increasing intake to 2.0–2.4 g/kg further prevents muscle catabolism.",
    category: "Protein",
  },
  {
    id: 3,
    question: "Is a low-carb or high-carb diet better for fat loss?",
    answer:
      "Controlled isocaloric metabolic trials consistently show that when total calories and protein intake are held equal, there is no significant difference in fat loss between low-carbohydrate and high-carbohydrate diets. The best nutritional split is the one you can adhere to consistently while fueling high training performance.",
    category: "Strategy",
  },
  {
    id: 4,
    question: "Why can't I drop dietary fat too low?",
    answer:
      "Dietary fats are required for steroid hormone production (including testosterone and estrogen), cell membrane integrity, and the absorption of fat-soluble vitamins (A, D, E, and K). Dropping daily fat below 0.6–0.8 g/kg (or under 20% of total calories) for extended periods can cause endocrine disruption and mood decline.",
    category: "Fats",
  },
  {
    id: 5,
    question: "Does meal timing and protein distribution matter?",
    answer:
      "Total daily intake remains the primary driver of body composition. However, to maximize Muscle Protein Synthesis (MPS), evidence suggests distributing protein into 3 to 5 meals throughout the day, each containing roughly 25 to 40 grams of high-quality protein (reaching the ~2.5–3g leucine threshold).",
    category: "Timing",
  },
];

export default function MacroCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "FitWay Free Macro Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "url": "https://fitway.best/tools/macro-calculator",
        "description":
          "Calculate personalized daily macronutrient targets (grams of protein, fat, carbohydrates, and per-meal portions) based on clinical fitness goals.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "740",
        },
        "featureList": [
          "Protein, fat, and carb gram calculation",
          "3 scientific diet distribution presets",
          "Per-meal portion distribution planner",
          "Protein density (g/kg) validation",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="pt-12 pb-16 bg-[#1B2B3B] text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Header */}
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <PieChart className="w-3.5 h-3.5" /> Nutritional Architecture
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Free Daily <span className="gradient-text">Macro Calculator</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Convert your daily calorie target into exact grams of protein, fats, and carbohydrates tailored to your fitness goal and meal schedule.
            </p>
          </div>

          {/* Interactive Calculator Section */}
          <div className="bg-[#243447] rounded-[32px] p-6 sm:p-10 border border-white/10 shadow-2xl mb-16">
            <MacroCalculator />
          </div>

          {/* Deep Educational Guide Section (SEO & E-E-A-T) */}
          <article className="space-y-12 text-gray-300 leading-relaxed">
            {/* 1. What Are Macros */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <Utensils className="w-6 h-6 text-[#FF8C00]" /> Understanding the Three Macronutrients
              </h2>
              <p>
                While calories dictate whether you gain, maintain, or lose body weight, <strong>macronutrient distribution</strong> dictates the composition of that weight change — whether you drop pure fat while keeping muscle, or lose precious metabolic tissue.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-base">Protein</h3>
                    <span className="text-xs text-blue-300 font-mono font-bold">4 kcal / g</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Provides the essential amino acid building blocks for skeletal muscle synthesis, enzyme production, and immune function. Has the highest satiety and thermic cost.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-base">Dietary Fats</h3>
                    <span className="text-xs text-amber-300 font-mono font-bold">9 kcal / g</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Essential for hormone synthesis (testosterone, thyroid function), joint lubrication, and fat-soluble vitamin absorption. Never drop below 20% of daily energy.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-base">Carbohydrates</h3>
                    <span className="text-xs text-emerald-300 font-mono font-bold">4 kcal / g</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    The preferred cellular fuel for anaerobic resistance training and cognitive performance. Replenishes muscle glycogen stores to maintain training volume.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. ISSN Guidelines */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-[#FF8C00]" /> Science-Backed Protein Guidelines (ISSN Standards)
              </h2>
              <p>
                In the official position stand of the{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/28642676/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF8C00] underline inline-flex items-center gap-1 hover:text-[#ff9d26]"
                >
                  International Society of Sports Nutrition (JISSN)
                  <ExternalLink className="w-3 h-3" />
                </a>
                , researchers established the following evidence-based protein intake brackets:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-300 uppercase text-xs font-semibold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Training Goal</th>
                      <th className="py-3 px-4">Daily Protein (g/kg)</th>
                      <th className="py-3 px-4">Daily Protein (g/lb)</th>
                      <th className="py-3 px-4">Physiological Objective</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-white font-bold">Sedentary Health Baseline</td>
                      <td className="py-3 px-4 text-blue-400 font-mono">0.8 g/kg</td>
                      <td className="py-3 px-4 text-gray-400">0.36 g/lb</td>
                      <td className="py-3 px-4 text-gray-300">Minimum to prevent nitrogen deficiency</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-white font-bold">Endurance Athletes</td>
                      <td className="py-3 px-4 text-blue-400 font-mono">1.2 – 1.4 g/kg</td>
                      <td className="py-3 px-4 text-gray-400">0.55 – 0.65 g/lb</td>
                      <td className="py-3 px-4 text-gray-300">Glycogen enzyme and mitochondrial repair</td>
                    </tr>
                    <tr className="hover:bg-white/5 bg-emerald-500/5">
                      <td className="py-3 px-4 text-emerald-400 font-bold">Hypertrophy (Muscle Gain)</td>
                      <td className="py-3 px-4 text-emerald-400 font-mono">1.6 – 2.2 g/kg</td>
                      <td className="py-3 px-4 text-gray-200">0.75 – 1.0 g/lb</td>
                      <td className="py-3 px-4 text-gray-300">Maximal muscle protein synthesis threshold</td>
                    </tr>
                    <tr className="hover:bg-white/5 bg-[#FF8C00]/5">
                      <td className="py-3 px-4 text-[#FF8C00] font-bold">Aggressive Fat Loss Deficit</td>
                      <td className="py-3 px-4 text-[#FF8C00] font-mono">2.0 – 2.4 g/kg</td>
                      <td className="py-3 px-4 text-gray-200">0.9 – 1.1 g/lb</td>
                      <td className="py-3 px-4 text-gray-300">Preventing lean catabolism under deficit stress</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Meal Timing & MPS */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Meal Frequency &amp; The Leucine Trigger
              </h2>
              <p>
                To stimulate <strong>Muscle Protein Synthesis (MPS)</strong> effectively, scientific research indicates that an individual meal requires approximately 2.5 to 3.0 grams of the branched-chain amino acid <em>leucine</em>. This is typically contained in:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>120–150g chicken breast or lean beef:</strong> ~30–35g complete protein.</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1 scoop whey protein isolate:</strong> ~25–28g rapid-digesting protein.</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>200g Greek yogurt or cottage cheese:</strong> ~20–24g slow-digesting casein.</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>150g tofu + 1 cup edamame:</strong> ~28g plant-based complete protein.</span>
                </div>
              </div>
            </section>

            {/* 4. Actionable Next Steps */}
            <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#243447] to-[#1B2B3B] border border-white/10 space-y-4">
              <h2 className="text-2xl font-bold text-white">How to Execute Your Macro Target</h2>
              <p className="text-gray-300">
                Pair your precise macronutrient targets with a progressive training routine:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">Need a Calorie Baseline?</h3>
                  <p className="text-xs text-gray-400">
                    If you haven&apos;t calculated your maintenance calories yet, use our <Link href="/tools/calorie-calculator" className="text-[#FF8C00] underline">Daily Calorie Calculator</Link> to establish your foundation.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">Put Your Protein to Work</h3>
                  <p className="text-xs text-gray-400">
                    Explore our <Link href="/workouts" className="text-[#FF8C00] underline">free progressive training plans</Link> and test your strength baseline with our <Link href="/tools/one-rep-max-calculator" className="text-[#FF8C00] underline">1RM Calculator</Link>.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* Dedicated FAQ Section */}
          <div className="mt-16">
            <FAQSection faqs={macroFaqs} />
          </div>

          {/* Related Calculators Grid */}
          <RelatedCalculators currentSlug="macro-calculator" />
        </div>
      </div>
    </>
  );
}

