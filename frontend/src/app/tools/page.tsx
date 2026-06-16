import { Scale, Apple, Calculator } from "lucide-react";
import BmiCalculator from "@/components/calculators/BmiCalculator";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import { Metadata } from "next";

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
        "featureList": [
          "TDEE calculation",
          "Weight loss targets",
          "Muscle gain targets",
          "Activity level adjustment"
        ]
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

            {/* Future Tools Placeholder */}
            <div className="mt-24 pt-24 border-t border-white/5">
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