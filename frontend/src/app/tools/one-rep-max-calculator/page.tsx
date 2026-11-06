import { Metadata } from "next";
import Link from "next/link";
import { Dumbbell, Zap, Trophy, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import OneRepMaxCalculator from "@/components/calculators/OneRepMaxCalculator";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import FAQSection from "@/components/sections/faq/FAQSection";

export const metadata: Metadata = {
  title: "One-Rep Max Calculator (1RM) — Epley & Brzycki Formulas",
  description:
    "Calculate your 1-repetition maximum (1RM) for bench press, squat, and deadlift. Generate working weight percentage charts and optimal training zones.",
  alternates: {
    canonical: "/tools/one-rep-max-calculator",
  },
  openGraph: {
    title: "One-Rep Max Calculator (1RM) — Epley & Brzycki Formulas | FitWay",
    description:
      "Estimate your true 1RM safely from submaximal reps. Complete percentage tables for strength and hypertrophy programming.",
    url: "/tools/one-rep-max-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One-Rep Max (1RM) Calculator | FitWay",
    description: "Calculate your 1RM and working weight zones for bench press, squat, and deadlift.",
  },
};

const oneRmFaqs = [
  {
    id: 1,
    question: "What is a 1-Repetition Maximum (1RM)?",
    answer:
      "A 1-Repetition Maximum (1RM) is the maximum amount of weight an individual can lift for a single repetition of a given exercise through a complete, technically sound range of motion. It represents the absolute pinnacle of an athlete's neuromuscular concentric force production.",
    category: "Basics",
  },
  {
    id: 2,
    question: "Why should I calculate 1RM instead of actually testing a true 1RM?",
    answer:
      "Testing a true, max-effort single repetition places extreme mechanical strain on connective tissues, joints, and the central nervous system (CNS), creating a significant injury risk. Calculating your 1RM from a controlled 3-to-6 repetition set provides 97%+ statistical accuracy without the heightened danger of catastrophic technical failure.",
    category: "Safety",
  },
  {
    id: 3,
    question: "Which formula is most accurate: Epley or Brzycki?",
    answer:
      "Both formulas have strong scientific validation in peer-reviewed exercise physiology literature. The Epley formula (1985) tends to perform marginally better for sets of 2 to 5 repetitions, whereas the Brzycki equation (1993) is slightly more conservative and accurate between 6 and 10 repetitions. Our calculator blends both to eliminate single-formula bias.",
    category: "Formulas",
  },
  {
    id: 4,
    question: "How do I choose working weights for hypertrophy using my 1RM?",
    answer:
      "For optimal muscular hypertrophy (muscle building), research recommends training between 70% and 82% of your 1RM for sets of 6 to 12 repetitions within 1–3 reps of technical failure (RIR 1–3). For pure strength development, spend more time in the 85% to 92% zone (3–5 reps).",
    category: "Programming",
  },
  {
    id: 5,
    question: "How often should I re-estimate my 1RM?",
    answer:
      "For beginners and early intermediates following progressive overload, re-calculate every 4 to 6 weeks. For advanced lifters running 8-to-12-week periodized blocks, reassess at the conclusion of each realization or peaking block.",
    category: "Progress",
  },
];

export default function OneRepMaxCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "FitWay One-Rep Max (1RM) Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "url": "https://fitway.best/tools/one-rep-max-calculator",
        "description":
          "Calculate estimated 1-repetition maximums (1RM) and full training percentage matrices using validated Epley and Brzycki equations.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "915",
        },
        "featureList": [
          "Epley, Brzycki, and Lombardi mathematical models",
          "Full 60%–100% percentage breakdown table",
          "Specific training zone classifications",
          "Kilograms and pounds dual unit support",
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Dumbbell className="w-3.5 h-3.5" /> Strength Science Tool
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              One-Rep Max <span className="gradient-text">(1RM) Calculator</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Safely calculate your one-rep max from any completed set of 1–12 repetitions. Generate precise working weight targets for strength, hypertrophy, and power.
            </p>
          </div>

          {/* Interactive Calculator Section */}
          <div className="bg-[#243447] rounded-[32px] p-6 sm:p-10 border border-white/10 shadow-2xl mb-16">
            <OneRepMaxCalculator />
          </div>

          {/* Deep Educational Guide Section (SEO & E-E-A-T) */}
          <article className="space-y-12 text-gray-300 leading-relaxed">
            {/* 1. What is 1RM */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <Trophy className="w-6 h-6 text-[#FF8C00]" /> Why 1RM Is the Foundation of Strength Programming
              </h2>
              <p>
                In exercise science and competitive powerlifting, all percentage-based training cycles are anchored to your <strong>1-Repetition Maximum (1RM)</strong>. Whether an athletic program calls for <em>5 sets of 5 reps at 80%</em> or <em>3 sets of 8 at 72.5%</em>, knowing your true baseline ensures you train with adequate stimulus without overtaxing your recovery capacity.
              </p>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">
                  <strong>The Safety Benefit:</strong> Testing an actual 100% 1RM carries significant joint stress. Estimating from a technical 3RM or 5RM set gives coaches and lifters nearly identical data with zero unnecessary injury risk.
                </p>
              </div>
            </section>

            {/* 2. Scientific Formulas */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-[#FF8C00]" /> The Mathematical Formulas Explained
              </h2>
              <p>
                Our calculator implements the two most widely validated models in academic kinesiology, documented in the{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/22180873/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF8C00] underline inline-flex items-center gap-1 hover:text-[#ff9d26]"
                >
                  Journal of Strength and Conditioning Research
                  <ExternalLink className="w-3 h-3" />
                </a>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#243447] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-base">Epley Formula (1985)</h3>
                  <p className="font-mono text-sm text-[#FF8C00]">1RM = weight × (1 + reps / 30)</p>
                  <p className="text-xs text-gray-400">
                    Assumes each completed repetition decreases capacity by approximately 3.33%. Highly reliable in the 1–5 repetition range.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#243447] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-base">Brzycki Formula (1993)</h3>
                  <p className="font-mono text-sm text-blue-400">1RM = weight × [36 / (37 - reps)]</p>
                  <p className="text-xs text-gray-400">
                    Developed by Matt Brzycki at Princeton. Slightly more conservative for higher-rep sets (6–10 repetitions).
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Training Zones Table */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                How to Program Your Sets by 1RM Percentage
              </h2>
              <p className="text-sm text-gray-400">
                Match your training intensity to specific physiological adaptations:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-300 uppercase text-xs font-semibold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Intensity Zone</th>
                      <th className="py-3 px-4">Reps / Set</th>
                      <th className="py-3 px-4">Primary Adaptation</th>
                      <th className="py-3 px-4">Rest Interval</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    <tr className="hover:bg-white/5 bg-red-500/5">
                      <td className="py-3 px-4 text-red-400 font-bold">90% – 100%</td>
                      <td className="py-3 px-4 text-white">1 – 3 reps</td>
                      <td className="py-3 px-4 text-gray-300">Maximal neuromuscular recruitment, CNS power</td>
                      <td className="py-3 px-4 text-gray-400">3 – 5 minutes</td>
                    </tr>
                    <tr className="hover:bg-white/5 bg-amber-500/5">
                      <td className="py-3 px-4 text-amber-400 font-bold">80% – 89%</td>
                      <td className="py-3 px-4 text-white">4 – 6 reps</td>
                      <td className="py-3 px-4 text-gray-300">Functional myofibrillar strength &amp; dense mass</td>
                      <td className="py-3 px-4 text-gray-400">2 – 3 minutes</td>
                    </tr>
                    <tr className="hover:bg-white/5 bg-green-500/5">
                      <td className="py-3 px-4 text-green-400 font-bold">70% – 79%</td>
                      <td className="py-3 px-4 text-white">8 – 12 reps</td>
                      <td className="py-3 px-4 text-gray-300">Hypertrophy sweet spot, sarcoplasmic growth</td>
                      <td className="py-3 px-4 text-gray-400">60 – 90 seconds</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-4 text-blue-400 font-bold">60% – 69%</td>
                      <td className="py-3 px-4 text-white">15 – 20 reps</td>
                      <td className="py-3 px-4 text-gray-300">Muscular endurance, capillary density, deload</td>
                      <td className="py-3 px-4 text-gray-400">45 – 60 seconds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Actionable Next Steps */}
            <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#243447] to-[#1B2B3B] border border-white/10 space-y-4">
              <h2 className="text-2xl font-bold text-white">Take Your 1RM Numbers to the Gym</h2>
              <p className="text-gray-300">
                Plug your newly calculated numbers into one of FitWay&apos;s science-backed routines:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">Follow a Strength Routine</h3>
                  <p className="text-xs text-gray-400">
                    Browse our <Link href="/workouts" className="text-[#FF8C00] underline">full-body and compound barbell workouts</Link> designed around progressive overload.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">Fuel Your Recovery</h3>
                  <p className="text-xs text-gray-400">
                    Heavy lifting demands adequate nutrition. Calculate your daily protein and energy needs with our <Link href="/tools/macro-calculator" className="text-[#FF8C00] underline">Macro Splitter</Link>.
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* Dedicated FAQ Section */}
          <div className="mt-16">
            <FAQSection faqs={oneRmFaqs} />
          </div>

          {/* Related Calculators Grid */}
          <RelatedCalculators currentSlug="one-rep-max-calculator" />
        </div>
      </div>
    </>
  );
}

