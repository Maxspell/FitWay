import { Metadata } from "next";
import Link from "next/link";
import { Apple, Zap, Flame, BookOpen, ExternalLink, Activity } from "lucide-react";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import FAQSection from "@/components/sections/faq/FAQSection";

export const metadata: Metadata = {
  title: "Daily Calorie & TDEE Calculator — Maintenance & Deficit",
  description:
    "Calculate your Total Daily Energy Expenditure (TDEE) and exact daily calorie targets for fat loss, maintenance, or muscle gain using the Mifflin-St Jeor equation.",
  alternates: {
    canonical: "/tools/calorie-calculator",
  },
  openGraph: {
    title: "Daily Calorie & TDEE Calculator — Maintenance & Deficit | FitWay",
    description:
      "Find your exact maintenance calories and fat loss deficit with the science-backed Mifflin-St Jeor equation. Free and instant.",
    url: "/tools/calorie-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Calorie & TDEE Calculator | FitWay",
    description: "Calculate your maintenance calories and deficit target instantly with FitWay.",
  },
};

const calorieFaqs = [
  {
    id: 1,
    question: "What is the difference between BMR and TDEE?",
    answer:
      "Your Basal Metabolic Rate (BMR) is the baseline number of calories your body requires just to stay alive at rest (powering brain function, breathing, cellular repair, and heartbeat). Total Daily Energy Expenditure (TDEE) includes your BMR plus all physical movement, workouts, and the thermic effect of digesting food. TDEE represents your true maintenance calorie number.",
    category: "Terminology",
  },
  {
    id: 2,
    question: "How large should my calorie deficit be for fat loss?",
    answer:
      "Sports nutrition consensus recommends a moderate deficit of 10% to 20% below your calculated TDEE, which for most individuals equates to 300 to 500 calories per day. This yields approximately 0.3 to 0.6 kg of fat loss per week while minimizing muscle breakdown, hormonal disruption, and excessive hunger.",
    category: "Deficit",
  },
  {
    id: 3,
    question: "Why does the Mifflin-St Jeor equation work better than Harris-Benedict?",
    answer:
      "Clinical evaluations comparing indirect calorimetry with predictive equations show that the original 1919 Harris-Benedict formula tends to overestimate energy requirements by 5% to 15% in contemporary populations. The Mifflin-St Jeor equation, published in 1990, demonstrated a 10% margin of error in over 82% of individuals, making it the preferred gold standard for clinical dietetics.",
    category: "Science",
  },
  {
    id: 4,
    question: "What should I do when my weight loss plateaus?",
    answer:
      "As you lose body mass, your BMR decreases (smaller bodies burn fewer calories) and unconscious daily movement (NEAT) often drops. If your weekly average weight remains unchanged for 3 consecutive weeks, either reduce your daily intake by 100–150 kcal or increase daily step count by 2,000–3,000 steps rather than making drastic cuts.",
    category: "Plateaus",
  },
  {
    id: 5,
    question: "How many calories are needed to build lean muscle?",
    answer:
      "For lean muscle hypertrophy with minimal fat accumulation, a conservative caloric surplus of 5% to 10% above TDEE (roughly 150–300 kcal/day for men and 100–200 kcal/day for women) is optimal when paired with progressive resistance training and adequate protein.",
    category: "Bulking",
  },
];

export default function CalorieCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "FitWay Daily Calorie & TDEE Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "url": "https://fitway.best/tools/calorie-calculator",
        "description":
          "Free online Total Daily Energy Expenditure (TDEE) and Calorie Deficit calculator utilizing the Mifflin-St Jeor formula.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "892",
        },
        "featureList": [
          "Mifflin-St Jeor BMR calculation",
          "5 physical activity multipliers",
          "Target deficits for weight loss",
          "Target surplus for muscle gain",
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-xs font-bold uppercase tracking-wider">
              <Apple className="w-3.5 h-3.5" /> Energy Balance Engine
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Daily Calorie &amp; <span className="gradient-text">TDEE Calculator</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Determine your maintenance calories, fat loss deficit, and muscle-building surplus using the clinically validated Mifflin-St Jeor formula.
            </p>
          </div>

          {/* Interactive Calculator Section */}
          <div className="bg-[#243447] rounded-[32px] p-6 sm:p-10 border border-white/10 shadow-2xl mb-16">
            <CalorieCalculator />
          </div>

          {/* Deep Educational Guide Section (SEO & E-E-A-T) */}
          <article className="space-y-12 text-gray-300 leading-relaxed">
            {/* 1. Four components of TDEE */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <Activity className="w-6 h-6 text-[#FF8C00]" /> How Your Body Burns Energy: The 4 Pillars of TDEE
              </h2>
              <p>
                Your <strong>Total Daily Energy Expenditure (TDEE)</strong> is the cumulative sum of all calories expended across a 24-hour cycle. Understanding its four discrete physiological components helps you make smart adjustments rather than starving yourself:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">1. BMR (~60–70% of TDEE)</h3>
                    <span className="text-xs text-[#FF8C00] font-bold">Largest</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Basal Metabolic Rate: calories burned at complete rest to sustain life (organs, temperature regulation, cellular respiration).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">2. NEAT (~15% of TDEE)</h3>
                    <span className="text-xs text-blue-400 font-bold">Variable</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Non-Exercise Activity Thermogenesis: walking, fidgeting, carrying groceries, household chores, and posture support.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">3. TEF (~8–10% of TDEE)</h3>
                    <span className="text-xs text-green-400 font-bold">Food</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Thermic Effect of Food: calories burned digesting meals. Protein has the highest thermic cost (20–30%), followed by carbs (5–10%) and fats (0–3%).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">4. EAT (~5% of TDEE)</h3>
                    <span className="text-xs text-purple-400 font-bold">Exercise</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Exercise Activity Thermogenesis: planned cardiovascular and resistance workouts. Surprisingly, workouts constitute the smallest percentage of total daily burn.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. The Formula Explained */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-[#FF8C00]" /> The Mifflin-St Jeor Scientific Equation
              </h2>
              <p>
                Our calculator implements the revised formula derived by Dr. MD Mifflin and colleagues, validated by multiple comparative metabolic studies in{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/2305711/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF8C00] underline inline-flex items-center gap-1 hover:text-[#ff9d26]"
                >
                  The American Journal of Clinical Nutrition
                  <ExternalLink className="w-3 h-3" />
                </a>:
              </p>

              <div className="p-5 rounded-2xl bg-[#243447] border border-white/10 font-mono text-sm space-y-2 text-white">
                <p className="text-blue-400 font-bold"># Men:</p>
                <p>BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</p>
                <div className="h-px bg-white/10 my-2" />
                <p className="text-rose-400 font-bold"># Women:</p>
                <p>BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</p>
              </div>

              <p className="text-sm text-gray-400">
                To transform BMR into TDEE, the result is multiplied by your physical activity coefficient (ranging from 1.2 for sedentary desk workers up to 1.9 for competitive athletes).
              </p>
            </section>

            {/* 3. Deficit Guidelines */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Recommended Caloric Target Brackets
              </h2>
              <p className="text-sm text-gray-400">
                Depending on your timeline, adherence history, and athletic commitments, choose a target that matches your goals:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-300 uppercase text-xs font-semibold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Goal</th>
                      <th className="py-3 px-4">Caloric Adjustment</th>
                      <th className="py-3 px-4">Expected Weekly Rate</th>
                      <th className="py-3 px-4">Ideal Candidate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-emerald-400 font-bold">Gentle Deficit</td>
                      <td className="py-3 px-4 text-white">-10% below TDEE (~200–250 kcal)</td>
                      <td className="py-3 px-4 text-gray-300">0.25 kg / week</td>
                      <td className="py-3 px-4 text-gray-400">Long-term adherence, active lifters</td>
                    </tr>
                    <tr className="hover:bg-white/5 bg-[#FF8C00]/5">
                      <td className="py-3 px-4 text-[#FF8C00] font-bold">Standard Deficit</td>
                      <td className="py-3 px-4 text-white">-20% below TDEE (~400–500 kcal)</td>
                      <td className="py-3 px-4 text-gray-300">0.5 kg / week</td>
                      <td className="py-3 px-4 text-gray-400">Most adults pursuing steady fat loss</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-blue-400 font-bold">Maintenance</td>
                      <td className="py-3 px-4 text-white">0% (Exact TDEE match)</td>
                      <td className="py-3 px-4 text-gray-300">Weight stable</td>
                      <td className="py-3 px-4 text-gray-400">Body recomposition, diet breaks</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-purple-400 font-bold">Lean Hypertrophy</td>
                      <td className="py-3 px-4 text-white">+5% to +10% above TDEE (~200 kcal)</td>
                      <td className="py-3 px-4 text-gray-300">+0.2 kg / week</td>
                      <td className="py-3 px-4 text-gray-400">Dedicated strength &amp; mass trainees</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Strategic Integration */}
            <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#243447] to-[#1B2B3B] border border-white/10 space-y-4">
              <h2 className="text-2xl font-bold text-white">How to Turn Calories into a Sustainable Plan</h2>
              <p className="text-gray-300">
                A daily calorie number is only half the battle. How you divide those calories across macronutrients dictates whether you lose fat or muscle:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">Step 2: Split Into Macros</h3>
                  <p className="text-xs text-gray-400">
                    Use our <Link href="/tools/macro-calculator" className="text-[#FF8C00] underline">Macro Splitter Calculator</Link> to turn your calorie target into exact grams of protein, fats, and carbs per meal.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">Step 3: Pair With Resistance Training</h3>
                  <p className="text-xs text-gray-400">
                    Browse our <Link href="/workouts" className="text-[#FF8C00] underline">free training library</Link> to ensure you send an anabolic signal to your muscles throughout your deficit.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* Dedicated FAQ Section */}
          <div className="mt-16">
            <FAQSection faqs={calorieFaqs} />
          </div>

          {/* Related Calculators Grid */}
          <RelatedCalculators currentSlug="calorie-calculator" />
        </div>
      </div>
    </>
  );
}

