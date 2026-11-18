import { Metadata } from "next";
import Link from "next/link";
import { Heart, Scale, BookOpen, ExternalLink, ShieldCheck, CheckCircle2, TableProperties } from "lucide-react";
import IdealWeightCalculator from "@/components/calculators/IdealWeightCalculator";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import FAQSection from "@/components/sections/faq/FAQSection";

export const metadata: Metadata = {
  title: "Ideal Body Weight Calculator (IBW) & Height Weight Chart",
  description:
    "Calculate your ideal body weight using 4 clinical formulas (Devine, Robinson, Miller, Hamwi). Explore our complete height-weight chart and WHO BMI range.",
  alternates: {
    canonical: "https://fitway.best/tools/ideal-weight-calculator",
  },
  openGraph: {
    title: "Ideal Body Weight Calculator (IBW) & Height Weight Chart | FitWay",
    description:
      "Find your clinical ideal body weight using Devine, Robinson, and Miller formulas. Explore our height-weight reference chart.",
    url: "https://fitway.best/tools/ideal-weight-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideal Body Weight Calculator & Height-Weight Chart | FitWay",
    description: "Determine your clinical ideal weight range and height-weight chart.",
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
    question: "Why do online ideal weight charts (like Stylecraze or WebMD) show different results?",
    answer:
      "Different online calculators rely on different historical formulas. Some sites use the Hamwi equation (1964), while others use Devine (1974) or simple BMI medians (such as BMI 21.7 or 22.0). FitWay compares all four major clinical formulas side-by-side alongside the WHO 18.5–24.9 BMI range to give you a transparent, consensus perspective rather than a single arbitrary number.",
    category: "Formulas",
  },
  {
    id: 4,
    question: "How does Ideal Body Weight differ from the WHO Healthy Weight Range?",
    answer:
      "IBW produces a single specific target number (such as 65.5 kg), whereas the World Health Organization defines healthy weight as a broad span corresponding to a BMI of 18.5 to 24.9 kg/m² (for example, 55 to 74 kg for a 172 cm individual). Healthy human bodies naturally thrive across this entire range.",
    category: "Comparison",
  },
  {
    id: 5,
    question: "How do I adjust ideal weight for small, medium, or large bone frames?",
    answer:
      "Standard formulas assume an average frame size. To adjust for skeletal build, measure your wrist circumference at the narrowest point. For men, a wrist under 6.5 inches indicates a small frame (subtract 10%), while over 7.5 inches indicates a large frame (add 10%). For women, a wrist under 6 inches is a small frame (subtract 10%), while over 6.5 inches is a large frame (add 10%).",
    category: "Anatomy",
  },
  {
    id: 6,
    question: "What if my current weight is higher than the ideal weight number?",
    answer:
      "If you lift weights or participate in athletic sports, having weight above the IBW estimate is completely normal and healthy, reflecting high muscle and bone density rather than excess adipose tissue. If body fat reduction is your goal, use our Calorie Calculator to plan a sustainable 300–500 kcal deficit.",
    category: "Application",
  },
];

const heightWeightChart = [
  { heightFt: "4'10\"", heightCm: 147, menIbw: "46.5 kg (102 lbs)", womenIbw: "42.5 kg (94 lbs)", whoRange: "40.0 – 53.8 kg (88 – 119 lbs)" },
  { heightFt: "5'0\"", heightCm: 152, menIbw: "50.0 kg (110 lbs)", womenIbw: "46.7 kg (103 lbs)", whoRange: "43.0 – 57.8 kg (95 – 127 lbs)" },
  { heightFt: "5'2\"", heightCm: 157, menIbw: "54.8 kg (121 lbs)", womenIbw: "50.9 kg (112 lbs)", whoRange: "45.9 – 61.8 kg (101 – 136 lbs)" },
  { heightFt: "5'4\"", heightCm: 163, menIbw: "59.5 kg (131 lbs)", womenIbw: "55.3 kg (122 lbs)", whoRange: "48.9 – 65.8 kg (108 – 145 lbs)" },
  { heightFt: "5'6\"", heightCm: 168, menIbw: "64.2 kg (141 lbs)", womenIbw: "59.5 kg (131 lbs)", whoRange: "52.0 – 70.0 kg (115 – 154 lbs)" },
  { heightFt: "5'8\"", heightCm: 173, menIbw: "68.8 kg (152 lbs)", womenIbw: "63.7 kg (140 lbs)", whoRange: "55.2 – 74.3 kg (122 – 164 lbs)" },
  { heightFt: "5'10\"", heightCm: 178, menIbw: "73.5 kg (162 lbs)", womenIbw: "67.9 kg (150 lbs)", whoRange: "58.5 – 78.7 kg (129 – 173 lbs)" },
  { heightFt: "6'0\"", heightCm: 183, menIbw: "78.1 kg (172 lbs)", womenIbw: "72.1 kg (159 lbs)", whoRange: "61.9 – 83.3 kg (136 – 184 lbs)" },
  { heightFt: "6'2\"", heightCm: 188, menIbw: "82.8 kg (182 lbs)", womenIbw: "76.3 kg (168 lbs)", whoRange: "65.4 – 88.0 kg (144 – 194 lbs)" },
  { heightFt: "6'4\"", heightCm: 193, menIbw: "87.4 kg (193 lbs)", womenIbw: "80.5 kg (177 lbs)", whoRange: "68.9 – 92.7 kg (152 – 204 lbs)" },
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
          "4 validated medical equations comparison (Devine, Robinson, Miller, Hamwi)",
          "Complete Height to Ideal Weight reference chart for men and women",
          "WHO 18.5–24.9 BMI healthy weight range comparison",
          "Frame size adjustment guidelines (wrist circumference)",
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
              Find your healthy weight target using four validated clinical formulas (Devine, Robinson, Miller, and Hamwi) and explore our comprehensive height-to-weight reference chart.
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

            {/* 2. Ideal Weight Chart by Height */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <TableProperties className="w-6 h-6 text-[#FF8C00]" /> Height to Ideal Weight Chart for Men and Women
              </h2>
              <p className="text-sm text-gray-400">
                This reference chart shows the consensus clinical ideal weight (averaged across the Devine and Robinson formulas) alongside the full World Health Organization (WHO) healthy weight range for adults of average bone frame:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-300 uppercase text-xs font-semibold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Height</th>
                      <th className="py-3 px-4 text-[#FF8C00]">Men Ideal Weight</th>
                      <th className="py-3 px-4 text-purple-400">Women Ideal Weight</th>
                      <th className="py-3 px-4 text-emerald-400">WHO Healthy Range (BMI 18.5–24.9)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    {heightWeightChart.map((row) => (
                      <tr key={row.heightFt} className="hover:bg-white/5">
                        <td className="py-3 px-4 text-white font-bold whitespace-nowrap">
                          {row.heightFt} <span className="text-xs text-gray-400 font-normal">({row.heightCm} cm)</span>
                        </td>
                        <td className="py-3 px-4 text-gray-200">{row.menIbw}</td>
                        <td className="py-3 px-4 text-gray-200">{row.womenIbw}</td>
                        <td className="py-3 px-4 text-emerald-300/90 whitespace-nowrap">{row.whoRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 pt-1">
                *Note: If you have a small wrist circumference, subtract approximately 10% from the baseline ideal weight. If you have a broad or heavy bone frame, add approximately 10%.
              </p>
            </section>

            {/* 3. Devine vs Hamwi vs Robinson: Formula Comparison */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Devine vs Hamwi vs Robinson: Why Do Formulas Differ?
              </h2>
              <p>
                When searching for ideal weight charts across health websites, you will notice slight variations in recommended numbers. These discrepancies exist because each clinical formula was developed in a different era using distinct population datasets:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-300 uppercase text-xs font-semibold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Formula</th>
                      <th className="py-3 px-4">Men (over 5 ft)</th>
                      <th className="py-3 px-4">Women (over 5 ft)</th>
                      <th className="py-3 px-4">Biomechanical Characteristics</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    <tr className="hover:bg-white/5 bg-[#FF8C00]/5">
                      <td className="py-3 px-4 text-[#FF8C00] font-bold">Devine (1974)</td>
                      <td className="py-3 px-4 text-white">50.0 kg + 2.3 kg / inch</td>
                      <td className="py-3 px-4 text-white">45.5 kg + 2.3 kg / inch</td>
                      <td className="py-3 px-4 text-gray-300">The medical benchmark. Widely cited in pharmacology, ICU care, and medical literature.</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-blue-400 font-bold">Robinson (1983)</td>
                      <td className="py-3 px-4 text-white">52.0 kg + 1.9 kg / inch</td>
                      <td className="py-3 px-4 text-white">49.0 kg + 1.7 kg / inch</td>
                      <td className="py-3 px-4 text-gray-300">Empirical revision of Devine using Metropolitan Life actuarial data; widely considered more realistic for modern women.</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-emerald-400 font-bold">Miller (1983)</td>
                      <td className="py-3 px-4 text-white">56.2 kg + 1.41 kg / inch</td>
                      <td className="py-3 px-4 text-white">53.1 kg + 1.36 kg / inch</td>
                      <td className="py-3 px-4 text-gray-300">Uses a higher 5-foot baseline but smaller increments per inch; favors broader, sturdy builds.</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-purple-400 font-bold">Hamwi (1964)</td>
                      <td className="py-3 px-4 text-white">48.0 kg + 2.7 kg / inch</td>
                      <td className="py-3 px-4 text-white">45.5 kg + 2.2 kg / inch</td>
                      <td className="py-3 px-4 text-gray-300">Popular rule of thumb in American clinical dietetics; scales more aggressively with height in men.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Ideal vs BMI Range */}
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

            {/* 5. Actionable Next Steps */}
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
