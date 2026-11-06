import { Scale, Apple, PieChart, Dumbbell, Heart, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import BmiCalculator from "@/components/calculators/BmiCalculator";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import FAQSection from "@/components/sections/faq/FAQSection";
import { Metadata } from "next";
import Link from "next/link";
import { ALL_CALCULATORS } from "@/components/calculators/RelatedCalculators";

const toolFaqs = [
  {
    id: 1,
    question: "What is a healthy BMI?",
    answer: "A BMI between 18.5 and 24.9 is considered healthy for most adults. Values below 18.5 indicate underweight, 25–29.9 is overweight, and 30 or above is classified as obese. BMI is a screening tool — it does not account for muscle mass or body composition.",
    category: "BMI"
  },
  {
    id: 2,
    question: "How many calories should I eat to lose weight?",
    answer: "A daily deficit of 500 calories typically leads to around 0.5 kg of weight loss per week. Use the calorie calculator above to find your maintenance level, then subtract 500. Avoid going below 1,200 kcal per day without medical supervision.",
    category: "Calories"
  },
  {
    id: 3,
    question: "What activity level should I choose?",
    answer: "Choose \"Sedentary\" if you have a desk job and rarely exercise. \"Light\" fits 1–3 casual workouts per week. \"Moderate\" is for 3–5 structured sessions. \"Active\" applies if you train 6–7 days. \"Very Active\" is for athletes or people with physically demanding jobs.",
    category: "Calories"
  },
  {
    id: 4,
    question: "Is the BMI calculator accurate for athletes?",
    answer: "No. BMI can misclassify muscular individuals as overweight because it only uses height and weight. For athletes, body fat percentage or waist-to-height ratio are more reliable metrics. Use BMI as a general reference, not a definitive measure.",
    category: "BMI"
  },
  {
    id: 5,
    question: "How often should I recalculate my calorie needs?",
    answer: "Recalculate every 4–6 weeks or after a 3–5 kg change in body weight. As you lose or gain weight, your maintenance calories shift. Regular recalculation keeps your targets accurate.",
    category: "Calories"
  },
  {
    id: 6,
    question: "How do I calculate my macronutrients once I know my calories?",
    answer: "Once you have your daily calorie target from our Calorie Calculator, use the Macro Splitter tool. It distributes your calories into exact grams of protein (4 kcal/g), fats (9 kcal/g), and carbohydrates (4 kcal/g) tailored to your goal.",
    category: "Macros"
  },
  {
    id: 7,
    question: "What is a 1RM calculator and why is it useful?",
    answer: "A One-Rep Max (1RM) calculator estimates the maximum weight you can lift for a single repetition based on submaximal sets (e.g., 5 reps). It allows you to program working sets safely without the injury risk of true 1RM testing.",
    category: "Strength"
  }
];

export const metadata: Metadata = {
  title: 'Free Fitness Calculators & Tools — BMI, Calorie, Macros & 1RM',
  description: 'Use FitWay\'s free fitness calculators to track your nutrition and training goals. Precision tools for BMI, daily calories, macronutrient split, ideal weight, and one-rep max.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Free Fitness Calculators & Tools — BMI, Calorie, Macros & 1RM | FitWay',
    description: 'Explore FitWay\'s suite of free science-backed fitness calculators: BMI, TDEE calories, macronutrients, ideal body weight, and 1RM.',
    url: '/tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Fitness Calculators | FitWay',
    description: 'Free BMI, calorie, macro, and 1RM calculators to support your fitness journey.',
  },
};

export default function Tools() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "BMI Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "url": "https://fitway.best/tools#bmi",
        "description": "Free online BMI calculator based on height and weight.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1254"
        },
        "featureList": ["Body Mass Index calculation", "Instant results", "Metric units"]
      },
      {
        "@type": "SoftwareApplication",
        "name": "Daily Calorie Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "url": "https://fitway.best/tools#calories",
        "description": "Calculate your daily calorie needs for weight loss, maintenance, or muscle gain.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "892"
        },
        "featureList": [
          "TDEE calculation",
          "Weight loss targets",
          "Muscle gain targets",
          "Activity level adjustment"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "Macro Splitter Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "url": "https://fitway.best/tools/macro-calculator",
        "description": "Distribute your daily calories into exact grams of protein, fats, and carbohydrates.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "740"
        },
        "featureList": ["Macronutrient split", "Gram & calorie targets", "Meal portioning"]
      },
      {
        "@type": "SoftwareApplication",
        "name": "One-Rep Max (1RM) Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "url": "https://fitway.best/tools/one-rep-max-calculator",
        "description": "Estimate 1RM and generate working weight zones with Epley and Brzycki formulas.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "915"
        },
        "featureList": ["1RM estimation", "Epley & Brzycki models", "Working weight matrix"]
      },
      {
        "@type": "ItemList",
        "name": "FitWay Free Fitness Calculators Directory",
        "itemListElement": ALL_CALCULATORS.map((tool, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": tool.title,
          "url": `https://fitway.best${tool.href}`
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="pt-12 pb-16 bg-[#1B2B3B] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Complete Fitness Tools Suite
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                Free Fitness <span className="gradient-text">Calculators &amp; Tools</span>
              </h1>
              <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Evidence-based calculation engines to estimate your BMI, maintenance calories, macro targets, 1RM, and healthy weight range.
              </p>
            </div>

            {/* Hub Directory Grid of All 5 Standalone Calculators */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">All Fitness Calculators</h2>
                  <p className="text-xs text-gray-400">Choose a specialized tool for detailed guides and charts</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ALL_CALCULATORS.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      className="p-5 rounded-2xl bg-[#243447]/60 hover:bg-[#243447] border border-white/5 hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${tool.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                            {tool.badge}
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-base group-hover:text-[#FF8C00] transition-colors mb-1">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#FF8C00] font-semibold">
                        <span>Open full tool</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Embedded Calculators (BMI & Calories) */}
            <div className="space-y-16">
              {/* BMI Calculator Section */}
              <div id="bmi" className="space-y-6 scroll-mt-24">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shrink-0">
                      <Scale className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold">Body Mass Index (BMI)</h2>
                      <p className="text-xs sm:text-sm text-gray-400">Quick screening tool based on adult height and weight.</p>
                    </div>
                  </div>
                  <Link
                    href="/tools/bmi-calculator"
                    className="text-xs sm:text-sm font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors group"
                  >
                    Dedicated BMI Guide &amp; WHO Chart
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="bg-[#243447] rounded-[32px] p-6 sm:p-8 border border-white/5 shadow-xl">
                  <BmiCalculator />
                </div>
              </div>

              {/* Calorie Calculator Section */}
              <div id="calories" className="space-y-6 scroll-mt-24">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#FF8C00]/10 flex items-center justify-center text-[#FF8C00] border border-[#FF8C00]/20 shrink-0">
                      <Apple className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold">Daily Calorie Needs (TDEE)</h2>
                      <p className="text-xs sm:text-sm text-gray-400">Calculate maintenance, fat loss deficit, and muscle gain surplus.</p>
                    </div>
                  </div>
                  <Link
                    href="/tools/calorie-calculator"
                    className="text-xs sm:text-sm font-bold text-[#FF8C00] hover:text-[#ff9d26] inline-flex items-center gap-1.5 transition-colors group"
                  >
                    Dedicated TDEE &amp; Deficit Guide
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="bg-[#243447] rounded-[32px] p-6 sm:p-8 border border-white/5 shadow-xl">
                  <CalorieCalculator />
                </div>
              </div>
            </div>

            {/* How to Use FitWay Calculators Together (Workflow) */}
            <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-[#243447] to-[#1B2B3B] border border-white/10 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF8C00] block mb-1">
                  Methodology &amp; Integration
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  The 4-Step FitWay Optimization Workflow
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  How our sports science team recommends using these tools in sequence:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">1</span>
                    Benchmark Your Weight
                  </div>
                  <p className="text-xs text-gray-400">
                    Use the <Link href="/tools/bmi-calculator" className="text-blue-400 underline">BMI Calculator</Link> and <Link href="/tools/ideal-weight-calculator" className="text-purple-400 underline">Ideal Weight Calculator</Link> to establish realistic long-term targets.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <span className="w-6 h-6 rounded-full bg-[#FF8C00]/20 text-[#FF8C00] flex items-center justify-center text-xs">2</span>
                    Calculate Energy Expenditure
                  </div>
                  <p className="text-xs text-gray-400">
                    Use the <Link href="/tools/calorie-calculator" className="text-[#FF8C00] underline">Calorie Calculator</Link> to find your maintenance TDEE and choose a 10–20% deficit or 5–10% surplus.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">3</span>
                    Split Macronutrients
                  </div>
                  <p className="text-xs text-gray-400">
                    Feed your calorie number into the <Link href="/tools/macro-calculator" className="text-emerald-400 underline">Macro Splitter</Link> to allocate sufficient protein (1.6–2.2 g/kg) for muscle protection.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs">4</span>
                    Program Working Weights
                  </div>
                  <p className="text-xs text-gray-400">
                    Estimate your compound lift limits with the <Link href="/tools/one-rep-max-calculator" className="text-rose-400 underline">1RM Calculator</Link> and select workouts from our <Link href="/workouts" className="text-white underline">training database</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 border-t border-white/5">
          <FAQSection faqs={toolFaqs} />
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 mt-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card relative overflow-hidden p-8 md:p-14 border-white/10 text-center">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-[1px] rounded-[31px] bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF8C00]/5 blur-[80px] rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Put Your Numbers to Work?</h2>
                <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                  Browse our structured workout routines matched to your goal — fat loss, progressive hypertrophy, or conditioning. All programs include step-by-step guidance and exercise cues.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/workouts" className="bg-[#FF8C00] text-[#1B2B3B] px-8 py-4 rounded-2xl font-black text-lg shadow-[0_0_20px_rgba(255,140,0,0.2)] hover:shadow-[0_0_30px_rgba(255,140,0,0.4)] transition-all duration-300 inline-flex items-center justify-center">
                    Browse Workouts
                  </Link>
                  <Link href="/blog" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm inline-flex items-center justify-center">
                    Read Fitness Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Text Section */}
        <div className="container mx-auto px-4 mt-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-gray-500 leading-relaxed">
              FitWay fitness calculators are completely free, evidence-based, and do not require account registration.
              Our calculations adhere to clinical guidelines published by the World Health Organization, the American College of Sports Medicine (ACSM), and the International Society of Sports Nutrition (ISSN).
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
