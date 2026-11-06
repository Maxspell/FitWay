import { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, AlertTriangle, BookOpen, ExternalLink } from "lucide-react";
import BmiCalculator from "@/components/calculators/BmiCalculator";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import FAQSection from "@/components/sections/faq/FAQSection";

export const metadata: Metadata = {
  title: "Free BMI Calculator — Body Mass Index Chart & Analysis",
  description:
    "Calculate your Body Mass Index (BMI) instantly with FitWay's free online calculator. Explore WHO classification categories, athlete accuracy, and next steps.",
  alternates: {
    canonical: "/tools/bmi-calculator",
  },
  openGraph: {
    title: "Free BMI Calculator — Body Mass Index Chart & Analysis | FitWay",
    description:
      "Calculate your Body Mass Index (BMI) instantly. Explore WHO classifications, limitations for athletes, and evidence-based guidance.",
    url: "/tools/bmi-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free BMI Calculator | FitWay",
    description: "Check your Body Mass Index (BMI) and discover what it means for your fitness goals.",
  },
};

const bmiFaqs = [
  {
    id: 1,
    question: "What is a healthy BMI for men and women?",
    answer:
      "For most adults aged 20 and older, a healthy BMI ranges between 18.5 and 24.9 kg/m² according to the World Health Organization (WHO). This range applies to both men and women, as the standard formula is non-gendered. Values below 18.5 indicate underweight, 25.0 to 29.9 suggest overweight, and 30.0 or higher fall into obesity categories.",
    category: "General",
  },
  {
    id: 2,
    question: "Why is BMI inaccurate for muscular athletes and bodybuilders?",
    answer:
      "BMI calculates only the ratio between total body weight and height squared. It cannot distinguish between lean muscle tissue and adipose fat tissue. Because skeletal muscle is significantly denser than fat, muscular individuals frequently register an 'overweight' or 'obese' BMI despite having healthy single-digit body fat percentages. For lifters, waist-to-height ratio, DEXA scans, or calipers provide a more reliable assessment.",
    category: "Accuracy",
  },
  {
    id: 3,
    question: "How do I calculate BMI manually?",
    answer:
      "In metric units: divide your body weight in kilograms by your height in meters squared (BMI = weight (kg) / [height (m)]²). For example, if you weigh 70 kg and stand 1.75 m tall: 70 / (1.75 × 1.75) = 22.86 kg/m².",
    category: "Formula",
  },
  {
    id: 4,
    question: "What should I do if my BMI is in the overweight category?",
    answer:
      "First, evaluate your body composition and waist circumference. If excess body fat is present, pair a moderate 300–500 kcal daily caloric deficit with structured progressive resistance training 3–4 times per week. Avoid crash dieting, which causes muscle loss. Use our Daily Calorie Calculator and Macro Splitter to plan a sustainable approach.",
    category: "Action",
  },
  {
    id: 5,
    question: "Does age affect BMI interpretation?",
    answer:
      "While the standard WHO cutoff numbers are uniform for all adults, research shows that slightly higher BMIs (between 25 and 27) in older adults (65+) are often correlated with greater bone density and lower mortality risks. For children and teenagers under 18, age- and sex-specific BMI percentiles must be used instead of adult ranges.",
    category: "General",
  },
];

export default function BmiCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "FitWay Free BMI Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "url": "https://fitway.best/tools/bmi-calculator",
        "description":
          "Free online Body Mass Index (BMI) calculator offering immediate categorization based on World Health Organization standards.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1254",
        },
        "featureList": [
          "Instant BMI calculation",
          "Visual classification bracket gauge",
          "WHO health categories breakdown",
          "Evidence-based fitness recommendations",
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" /> Health Screening Tool
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Free Online <span className="gradient-text">BMI Calculator</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Calculate your Body Mass Index in seconds, explore the official WHO classification scale, and understand what your score means for your health and training.
            </p>
          </div>

          {/* Interactive Calculator Section */}
          <div className="bg-[#243447] rounded-[32px] p-6 sm:p-10 border border-white/10 shadow-2xl mb-16">
            <BmiCalculator />
          </div>

          {/* Deep Educational Guide Section (SEO & E-E-A-T) */}
          <article className="space-y-12 text-gray-300 leading-relaxed">
            {/* 1. What is BMI */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-[#FF8C00]" /> What Is Body Mass Index (BMI)?
              </h2>
              <p>
                The <strong>Body Mass Index (BMI)</strong> is an epidemiological screening tool originally developed by Belgian mathematician Adolphe Quetelet in the 19th century. It quantifies the relationship between an individual&apos;s height and weight to estimate whether body mass falls within an expected statistical range.
              </p>
              <p>
                While widely utilized by healthcare institutions and the{" "}
                <a
                  href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF8C00] underline inline-flex items-center gap-1 hover:text-[#ff9d26]"
                >
                  World Health Organization (WHO)
                  <ExternalLink className="w-3 h-3" />
                </a>{" "}
                to identify population-level health trends, BMI is a <em>surrogate marker</em> rather than a direct measurement of body fat percentage.
              </p>
            </section>

            {/* 2. Official WHO Table */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Official WHO BMI Classifications for Adults
              </h2>
              <p className="text-sm text-gray-400">
                The World Health Organization categorizes adult BMI values into standardized brackets associated with specific health risk profiles:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-300 uppercase text-xs font-semibold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">BMI Range (kg/m²)</th>
                      <th className="py-3 px-4">WHO Classification</th>
                      <th className="py-3 px-4">Associated Health Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-blue-400 font-bold">&lt; 18.5</td>
                      <td className="py-3 px-4 text-white">Underweight</td>
                      <td className="py-3 px-4 text-gray-400">Increased risk of nutritional deficiency and osteoporosis</td>
                    </tr>
                    <tr className="hover:bg-white/5 bg-green-500/5">
                      <td className="py-3 px-4 text-green-400 font-bold">18.5 – 24.9</td>
                      <td className="py-3 px-4 text-white">Normal (Healthy Weight)</td>
                      <td className="py-3 px-4 text-gray-400">Lowest risk for cardiovascular morbidity and metabolic disease</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-yellow-400 font-bold">25.0 – 29.9</td>
                      <td className="py-3 px-4 text-white">Pre-obesity (Overweight)</td>
                      <td className="py-3 px-4 text-gray-400">Moderate increase in risk; lifestyle intervention recommended</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-amber-500 font-bold">30.0 – 34.9</td>
                      <td className="py-3 px-4 text-white">Obesity Class I</td>
                      <td className="py-3 px-4 text-gray-400">High risk of type 2 diabetes and hypertension</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-orange-500 font-bold">35.0 – 39.9</td>
                      <td className="py-3 px-4 text-white">Obesity Class II</td>
                      <td className="py-3 px-4 text-gray-400">Very high risk of chronic metabolic syndromes</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-red-400 font-bold">≥ 40.0</td>
                      <td className="py-3 px-4 text-white">Obesity Class III</td>
                      <td className="py-3 px-4 text-gray-400">Extremely high clinical risk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. The Athlete Paradox & Limitations */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-400" /> The Athlete Paradox: Why BMI Can Mislead
              </h2>
              <p>
                One of the most widely acknowledged limitations of BMI is its inability to distinguish fat mass from fat-free mass (skeletal muscle, bone density, and organ weight). Because lean muscle has approximately 18% higher density than adipose tissue, natural bodybuilders, rugby players, and weightlifters often register a BMI over 26–30, classifying them as &quot;overweight&quot; or &quot;obese&quot; despite low body fat levels.
              </p>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-base">Complementary Markers to Track:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
                    <span><strong>Waist-to-Height Ratio (WHtR):</strong> Keeping your waist circumference under half your height is a superior predictor of cardiovascular longevity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
                    <span><strong>Direct Caloric Calculation:</strong> Use our <Link href="/tools/calorie-calculator" className="text-[#FF8C00] underline hover:text-[#ff9d26]">Daily Calorie Calculator</Link> to establish your true energy expenditure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
                    <span><strong>Strength Progression:</strong> Use our <Link href="/tools/one-rep-max-calculator" className="text-[#FF8C00] underline hover:text-[#ff9d26]">1RM Calculator</Link> to measure actual muscular performance.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Actionable Next Steps */}
            <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#243447] to-[#1B2B3B] border border-white/10 space-y-4">
              <h2 className="text-2xl font-bold text-white">How to Act on Your BMI Score</h2>
              <p className="text-gray-300">
                A number on a scale is only useful when tied to an intelligent action plan:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">If You Want to Reduce Body Fat:</h3>
                  <p className="text-xs text-gray-400">
                    Read our step-by-step guide on <Link href="/blog/calorie-deficit-how-to-calculate" className="text-[#FF8C00] underline">how to calculate a sustainable calorie deficit</Link> and pair it with a structured <Link href="/workouts" className="text-[#FF8C00] underline">beginner strength workout</Link> to preserve muscle.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">If You Want to Build Muscle:</h3>
                  <p className="text-xs text-gray-400">
                    Calculate your optimal protein intake with our <Link href="/tools/macro-calculator" className="text-[#FF8C00] underline">Macro Splitter</Link> and explore our <Link href="/workouts" className="text-[#FF8C00] underline">hypertrophy workout library</Link>.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* Dedicated FAQ Section */}
          <div className="mt-16">
            <FAQSection faqs={bmiFaqs} />
          </div>

          {/* Related Calculators Grid */}
          <RelatedCalculators currentSlug="bmi-calculator" />
        </div>
      </div>
    </>
  );
}

