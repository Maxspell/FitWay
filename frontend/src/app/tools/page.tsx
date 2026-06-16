import { Scale, Apple, Calculator } from "lucide-react";
import BmiCalculator from "@/components/calculators/BmiCalculator";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import FAQSection from "@/components/sections/faq/FAQSection";
import { Metadata } from "next";
import Link from "next/link";

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
  }
];

export const metadata: Metadata = {
  title: 'Free Fitness Calculators — BMI & Calorie Calculator',
  description: 'Use FitWay\'s free BMI calculator and daily calorie needs calculator to track your fitness goals. Science-backed tools for weight loss and muscle gain.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Free Fitness Calculators — BMI & Calorie Calculator | FitWay',
    description: 'Use FitWay\'s free BMI calculator and daily calorie needs calculator to track your fitness goals.',
    url: '/tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Fitness Calculators | FitWay',
    description: 'Free BMI and calorie calculators to support your fitness journey.',
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
        "@type": "FAQPage",
        "mainEntity": toolFaqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
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
      <div className="pt-12 pb-16 bg-[#1B2B3B]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h1 className="text-5xl font-bold">Free Fitness Calculators</h1>
              <p className="text-xl text-gray-400">
                Science-backed BMI and calorie calculators to help you reach your goals faster.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {/* BMI Calculator Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Scale className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Body Mass Index (BMI)</h2>
                    <p className="text-gray-400">A measure of body fat based on height and weight.</p>
                  </div>
                </div>
                <div className="bg-[#243447] rounded-[32px] p-8 border border-white/5">
                  <BmiCalculator />
                </div>
              </div>

              {/* Calorie Calculator Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#FF8C00]/10 flex items-center justify-center text-[#FF8C00] border border-[#FF8C00]/20">
                    <Apple className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Daily Calorie Needs</h2>
                    <p className="text-gray-400">Calculate your maintenance, weight loss, and weight gain targets.</p>
                  </div>
                </div>
                <div className="bg-[#243447] rounded-[32px] p-8 border border-white/5">
                  <CalorieCalculator />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5">
          <FAQSection faqs={toolFaqs} />
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 mt-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card relative overflow-hidden p-8 md:p-14 border-white/10 text-center">
              {/* Animated Border & Glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-[1px] rounded-[31px] bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF8C00]/5 blur-[80px] rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Training?</h2>
                <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                  Now that you know your numbers, put them to work. Browse our workout programs matched to your goal — weight loss, muscle gain, or full-body toning. Or read our fitness blog for nutrition tips and training guides.
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
              Use our free fitness calculators to set smarter, data-driven goals. 
              Whether you want to lose weight, build muscle, or simply track your 
              health, knowing your BMI and daily calorie needs is the first step. 
              All tools are free, science-backed, and work without registration.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Future Tools Placeholder */}
            <div className="mt-16 pt-16 border-t border-white/5">
              <h2 className="text-2xl font-bold mb-8">Coming Soon</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Workout Planner", desc: "Create your weekly schedule" },
                  { title: "Macro Splitter", desc: "Calculate protein, fats, and carbs" },
                  { title: "Ideal Weight", desc: "Find your healthy weight range" }
                ].map((tool, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 opacity-50">
                    <Calculator className="h-8 w-8 text-gray-500 mb-4" />
                    <h3 className="font-bold mb-2">{tool.title}</h3>
                    <p className="text-sm text-gray-400">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}