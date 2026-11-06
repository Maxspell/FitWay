import { Metadata } from "next";
import Link from "next/link";
import { Heart, Scale, BookOpen, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import IdealWeightCalculator from "@/components/calculators/IdealWeightCalculator";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import FAQSection from "@/components/sections/faq/FAQSection";

export const metadata: Metadata = {
  title: "Ideal Body Weight Calculator (IBW) — 4 Clinical Formulas",
  description:
    "Calculate your ideal body weight with the 4 validated clinical formulas (Devine, Robinson, Miller, Hamwi). View your WHO healthy weight range and target goal.",
  alternates: {
    canonical: "/tools/ideal-weight-calculator",
  },
  openGraph: {
    title: "Ideal Body Weight Calculator (IBW) — 4 Clinical Formulas | FitWay",
    description:
      "Find your clinical ideal body weight using Devine, Robinson, and Miller formulas. Free, immediate, and evidence-based.",
    url: "/tools/ideal-weight-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideal Body Weight Calculator | FitWay",
    description: "Determine your clinical ideal weight range for your height.",
  },
};

const idealWeightFaqs = [
  {
    id: 1,
    question: "What is Ideal Body Weight (IBW)?",
    answer:
      "Ideal Body Weight (IBW) is a standardized physiological estimate developed primarily for clinical medicine and pharmacokinetics to calculate accurate medication dosages (such as anesthesia and antibiotics). Over time, it became a popular benchmark for general health and target goal setting.",
    category: "Basics",
  },
  {
    id: 2,
    question: "Which ideal weight formula is the most accurate?",
    answer:
      "The Devine Formula (1974) is by far the most widely adopted in clinical practice. The Robinson (1983) and Miller (1983) modifications were developed to better account for modern population datasets. Because individual body structures differ, our calculator averages all four major formulas to present a balanced consensus number.",
    category: "Formulas",
  },
  {
    id: 3,
    question: "How does Ideal Body Weight differ from the WHO Healthy Weight Range?",
    answer:
      "IBW produces a single specific target number (e.g., 65.5 kg), whereas the World Health Organization defines healthy weight as a broad span corresponding to a BMI of 18.5 to 24.9 kg/m² (e.g., 55 to 74 kg for a 172 cm individual). Healthy human bodies naturally thrive across this entire range.",
    category: "Comparison",
  },
  {
    id: 4,
    question: "What if my current weight is higher than the ideal weight number?",
    answer:
      "If you lift weights or participate in athletic sports, having weight above the IBW estimate is completely normal and healthy, reflecting high muscle and bone density rather than excess adipose tissue. If body fat reduction is your goal, use our Calorie Calculator to plan a sustainable 300–500 kcal deficit.",
    category: "Application",
  },
  {
    id: 5,
    question: "Do bone structure and frame size change my ideal weight?",
    answer:
      "Yes. Clinical tradition suggests adjusting the baseline IBW by approximately +10% for large-framed individuals (wide wrists and shoulders) or -10% for small-framed, delicate builds.",
    category: "Anatomy",
  },
];

export default function IdealWeightCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "FitWay Ideal Body Weight Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "url": "https://fitway.best/tools/ideal-weight-calculator",
        "description":
          "Calculate consensus ideal body weight based on Devine, Robinson, Miller, and Hamwi clinical equations compared with WHO BMI ranges.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "620",
        },
        "featureList": [
          "4 validated medical equations comparison",
          "WHO 18.5–24.9 BMI healthy weight range",
          "Sex and height personalized adjustments",
          "Target deficit and surplus actionable advice",
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Body Composition Baseline
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Ideal Body Weight <span className="gradient-text">(IBW) Calculator</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Find your healthy weight target using four validated clinical formulas (Devine, Robinson, Miller, and Hamwi) and compare against the official WHO healthy BMI bracket.
            </p>
          </div>

          {/* Interactive Calculator Section */}
          <div className="bg-[#243447] rounded-[32px] p-6 sm:p-10 border border-white/10 shadow-2xl mb-16">
            <IdealWeightCalculator />
          </div>

          {/* Deep Educational Guide Section (SEO & E-E-A-T) */}
          <article className="space-y-12 text-gray-300 leading-relaxed">
            {/* 1. What is IBW */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-[#FF8C00]" /> Understanding Ideal Body Weight in Modern Science
              </h2>
              <p>
                The concept of <strong>Ideal Body Weight (IBW)</strong> originated in clinical pharmacology to help physicians dose water-soluble medications accurately without overdosing patients with higher body fat levels. Over the decades, it has been embraced by exercise specialists, dietitians, and athletes as a reliable anchor point for long-term body composition targets.
              </p>
              <p>
                Unlike rigid single-number recommendations, healthy human weights exist on a dynamic spectrum governed by skeletal frame size, lean muscle development, and genetic bone density.
              </p>
            </section>

            {/* 2. The 4 Formulas Compared */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                The 4 Clinical Formulas Compared
              </h2>
              <p className="text-sm text-gray-400">
                All major formulas establish a baseline weight for an individual who is 5 feet tall (60 inches or 152.4 cm) and add incremental weight for each additional inch:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-300 uppercase text-xs font-semibold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Formula</th>
                      <th className="py-3 px-4">Men (over 5 ft)</th>
                      <th className="py-3 px-4">Women (over 5 ft)</th>
                      <th className="py-3 px-4">Primary Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    <tr className="hover:bg-white/5 bg-[#FF8C00]/5">
                      <td className="py-3 px-4 text-[#FF8C00] font-bold">Devine (1974)</td>
                      <td className="py-3 px-4 text-white">50.0 kg + 2.3 kg / inch</td>
                      <td className="py-3 px-4 text-white">45.5 kg + 2.3 kg / inch</td>
                      <td className="py-3 px-4 text-gray-400">Clinical gold standard, widely cited in ICU/hospital care</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-blue-400 font-bold">Robinson (1983)</td>
                      <td className="py-3 px-4 text-white">52.0 kg + 1.9 kg / inch</td>
                      <td className="py-3 px-4 text-white">49.0 kg + 1.7 kg / inch</td>
                      <td className="py-3 px-4 text-gray-400">Empirical update to Devine based on Metropolitan Life data</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-emerald-400 font-bold">Miller (1983)</td>
                      <td className="py-3 px-4 text-white">56.2 kg + 1.41 kg / inch</td>
                      <td className="py-3 px-4 text-white">53.1 kg + 1.36 kg / inch</td>
                      <td className="py-3 px-4 text-gray-400">Higher baseline weight; accommodates larger bone frames</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-purple-400 font-bold">Hamwi (1964)</td>
                      <td className="py-3 px-4 text-white">48.0 kg + 2.7 kg / inch</td>
                      <td className="py-3 px-4 text-white">45.5 kg + 2.2 kg / inch</td>
                      <td className="py-3 px-4 text-gray-400">Original rule of thumb popular in American dietetics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Ideal vs BMI Range */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-green-400" /> Ideal Weight vs. Healthy Weight Range
              </h2>
              <p>
                A common misconception is that being even 2–3 kilograms away from your &quot;ideal&quot; weight is suboptimal. In reality, the{" "}
                <a
                  href="https://www.who.int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF8C00] underline inline-flex items-center gap-1 hover:text-[#ff9d26]"
                >
                  World Health Organization
                  <ExternalLink className="w-3 h-3" />
                </a>{" "}
                defines a healthy body mass range of <strong>BMI 18.5 to 24.9 kg/m²</strong>, giving most individuals a 15–20 kg buffer where metabolic markers and cardiovascular health remain at peak levels.
              </p>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-base">Key Takeaways for Lifters:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
                    <span>Muscle tissue is dense and heavy. An athletic lifter with 12% body fat can easily weigh 5–10 kg above their clinical IBW.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
                    <span>Focus on waist circumference, performance, and daily nutrition rather than obsessing over an exact single number.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Actionable Next Steps */}
            <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#243447] to-[#1B2B3B] border border-white/10 space-y-4">
              <h2 className="text-2xl font-bold text-white">How to Reach Your Target Weight</h2>
              <p className="text-gray-300">
                Use your healthy weight range to set realistic, sustainable nutritional goals:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">Calculate Your Deficit or Surplus</h3>
                  <p className="text-xs text-gray-400">
                    Use our <Link href="/tools/calorie-calculator" className="text-[#FF8C00] underline">Daily Calorie Calculator</Link> to establish the exact daily caloric intake required to reach your target weight safely.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">Target Your Daily Macros</h3>
                  <p className="text-xs text-gray-400">
                    Ensure adequate protein intake to protect lean tissue by checking your numbers on our <Link href="/tools/macro-calculator" className="text-[#FF8C00] underline">Macro Splitter</Link>.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* Dedicated FAQ Section */}
          <div className="mt-16">
            <FAQSection faqs={idealWeightFaqs} />
          </div>

          {/* Related Calculators Grid */}
          <RelatedCalculators currentSlug="ideal-weight-calculator" />
        </div>
      </div>
    </>
  );
}

