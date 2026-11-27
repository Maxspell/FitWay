import { Metadata } from "next";
import Link from "next/link";
import { Dumbbell, Zap, Trophy, BookOpen, ExternalLink, ShieldCheck, Award, CheckCircle2 } from "lucide-react";
import OneRepMaxCalculator from "@/components/calculators/OneRepMaxCalculator";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import FAQSection from "@/components/sections/faq/FAQSection";

export const metadata: Metadata = {
  title: "One-Rep Max Calculator (1RM) & NASM Strength Protocol",
  description:
    "Calculate your 1-repetition maximum (1RM) safely using Epley, Brzycki, and NASM submaximal formulas. View working percentage tables and warmup protocols.",
  alternates: {
    canonical: "https://fitway.best/tools/one-rep-max-calculator",
  },
  openGraph: {
    title: "One-Rep Max Calculator (1RM) & NASM Strength Protocol | FitWay",
    description:
      "Estimate your true 1RM safely from submaximal reps. Complete percentage tables for strength, hypertrophy, and NASM training zones.",
    url: "https://fitway.best/tools/one-rep-max-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One-Rep Max (1RM) Calculator & NASM Protocol | FitWay",
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
    question: "How does the NASM 1RM estimation protocol work?",
    answer:
      "The National Academy of Sports Medicine (NASM) recommends estimating a lifter's 1RM using a controlled 3RM to 5RM submaximal test rather than risking an all-out 100% single. In the NASM OPT model, completing 5 repetitions corresponds to approximately 87% of your 1RM, while 3 repetitions corresponds to 93%. Dividing the weight lifted by the respective percentage yields an accurate estimated 1RM with minimal risk of connective tissue injury.",
    category: "NASM",
  },
  {
    id: 3,
    question: "Why should I calculate 1RM instead of actually testing a true 1RM?",
    answer:
      "Testing a true, max-effort single repetition places extreme mechanical strain on connective tissues, joints, and the central nervous system (CNS), creating a significant injury risk. Calculating your 1RM from a controlled 3-to-6 repetition set provides 97%+ statistical accuracy without the heightened danger of catastrophic technical failure.",
    category: "Safety",
  },
  {
    id: 4,
    question: "Which formula is most accurate: Epley, Brzycki, or NASM?",
    answer:
      "Both Epley (1985) and Brzycki (1993) have strong scientific validation in peer-reviewed exercise physiology literature. The Epley formula performs marginally better for sets of 2 to 5 repetitions, whereas the Brzycki equation is slightly more conservative between 6 and 10 repetitions. The NASM submaximal matrix aligns closely with Epley in the 3–5 rep range and provides practical safety benchmarks for personal trainers.",
    category: "Formulas",
  },
  {
    id: 5,
    question: "How do I choose working weights for hypertrophy using my 1RM?",
    answer:
      "For optimal muscular hypertrophy (muscle building), research recommends training between 70% and 82% of your 1RM for sets of 6 to 12 repetitions within 1–3 reps of technical failure (RIR 1–3). For pure strength development, spend more time in the 85% to 92% zone (3–5 reps).",
    category: "Programming",
  },
  {
    id: 6,
    question: "How often should I re-estimate my 1RM?",
    answer:
      "For beginners and early intermediates following progressive overload, re-calculate every 4 to 6 weeks. For advanced lifters running 8-to-12-week periodized blocks, reassess at the conclusion of each realization or peaking block.",
    category: "Progress",
  },
];

const nasmConversionTable = [
  { reps: 1, percentage: "100%", factor: "1.000", adaptation: "Peak Neuromuscular Output / 1RM" },
  { reps: 2, percentage: "95%", factor: "1.053", adaptation: "Maximal Strength & Neural Drive" },
  { reps: 3, percentage: "93%", factor: "1.075", adaptation: "Heavy Strength (NASM Preferred Test)" },
  { reps: 4, percentage: "90%", factor: "1.111", adaptation: "Max Strength / Myofibrillar Hypertrophy" },
  { reps: 5, percentage: "87%", factor: "1.149", adaptation: "Strength & Dense Hypertrophy (NASM Test)" },
  { reps: 6, percentage: "85%", factor: "1.176", adaptation: "Functional Hypertrophy Sweet Spot" },
  { reps: 7, percentage: "83%", factor: "1.205", adaptation: "Muscular Hypertrophy & Work Capacity" },
  { reps: 8, percentage: "80%", factor: "1.250", adaptation: "Hypertrophy Volume Foundation" },
  { reps: 9, percentage: "77%", factor: "1.299", adaptation: "Strength-Endurance & Capillarization" },
  { reps: 10, percentage: "75%", factor: "1.333", adaptation: "Muscular Endurance & Metabolic Stress" },
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
          "Calculate estimated 1-repetition maximums (1RM) and full training percentage matrices using validated Epley, Brzycki, and NASM submaximal equations.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "featureList": [
          "Epley, Brzycki, and Lombardi mathematical models",
          "NASM submaximal 1RM estimation protocol & conversion table",
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
              Safely calculate your one-rep max from any completed set of 1–12 repetitions. Generate precise working weight targets using Epley, Brzycki, and the NASM submaximal protocol.
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

            {/* 2. NASM Submaximal 1RM Protocol Section */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <Award className="w-6 h-6 text-[#FF8C00]" /> The NASM 1RM Estimation Protocol
              </h2>
              <p>
                The <strong>National Academy of Sports Medicine (NASM)</strong> establishes strict safety guidelines for assessing client strength. In professional personal training practice, certified trainers like FitWay Head Trainer{" "}
                <Link href="/authors/richard-botich" className="text-[#FF8C00] underline hover:text-[#ff9d26]">
                  Richard Botich (NASM-CPT, CES)
                </Link>{" "}
                rely on submaximal testing protocols (typically 3 to 5 repetitions) to calculate maximal strength without exposing the athlete to the joint strain of a true 1RM single.
              </p>
              <div className="p-5 rounded-2xl bg-[#243447] border border-white/10 space-y-3">
                <h3 className="font-bold text-white text-base">Standard 4-Step NASM Assessment Protocol:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                  <li><strong>Warm-up Set 1:</strong> 8 to 10 repetitions with a light load (roughly 50% of estimated 1RM). Rest 1 minute.</li>
                  <li><strong>Warm-up Set 2:</strong> 3 to 5 repetitions with a moderate load (70% to 75% of estimated 1RM). Rest 2 minutes.</li>
                  <li><strong>Assessment Set:</strong> Perform 3 to 5 repetitions with a heavy working weight until technical failure (the point where form begins to break down). Rest 2 to 4 minutes.</li>
                  <li><strong>Calculation:</strong> Divide the weight lifted by the corresponding NASM percentage factor from the table below.</li>
                </ol>
              </div>

              {/* NASM Conversion Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 mt-4">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-300 uppercase text-xs font-semibold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Reps Completed</th>
                      <th className="py-3 px-4 text-[#FF8C00]">% of 1RM</th>
                      <th className="py-3 px-4 text-blue-400">Multiplier Factor</th>
                      <th className="py-3 px-4 text-emerald-400">Target Training Adaptation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    {nasmConversionTable.map((row) => (
                      <tr key={row.reps} className={`hover:bg-white/5 ${row.reps === 3 || row.reps === 5 ? "bg-[#FF8C00]/5" : ""}`}>
                        <td className="py-3 px-4 text-white font-bold whitespace-nowrap">
                          {row.reps} {row.reps === 1 ? "rep" : "reps"}
                          {(row.reps === 3 || row.reps === 5) && (
                            <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-[#FF8C00]/20 text-[#FF8C00] font-semibold">
                              NASM Recommended
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-[#FF8C00] font-semibold">{row.percentage}</td>
                        <td className="py-3 px-4 text-gray-300 font-mono text-xs">{row.factor}</td>
                        <td className="py-3 px-4 text-gray-300 text-xs">{row.adaptation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 pt-1">
                *Example: If you complete 5 clean repetitions with 100 kg, divide 100 by 0.87 (or multiply 100 × 1.149), giving an estimated 1RM of 114.9 kg.
              </p>
            </section>

            {/* 3. Scientific Formulas */}
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

            {/* 4. Training Zones Table */}
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

            {/* 4B. 1RM Percentage Chart (50% to 95%) */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                1RM Percentage Chart (50% to 95% Load Reference)
              </h2>
              <p className="text-sm text-gray-300">
                Use this quick <strong>1RM percentage</strong> chart to load the barbell for squat, bench press, and deadlift cycles without recalculating every session:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-gray-300 uppercase text-xs font-semibold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">% of 1RM</th>
                      <th className="py-3 px-4">100 kg (225 lb) Max</th>
                      <th className="py-3 px-4">140 kg (315 lb) Max</th>
                      <th className="py-3 px-4">180 kg (405 lb) Max</th>
                      <th className="py-3 px-4">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    {[
                      { pct: "95%", w1: "95 kg / 214 lb", w2: "133 kg / 299 lb", w3: "171 kg / 385 lb", use: "2-rep heavy peak" },
                      { pct: "90%", w1: "90 kg / 203 lb", w2: "126 kg / 284 lb", w3: "162 kg / 365 lb", use: "3-4 rep strength work" },
                      { pct: "85%", w1: "85 kg / 191 lb", w2: "119 kg / 268 lb", w3: "153 kg / 344 lb", use: "5-6 rep heavy compound" },
                      { pct: "80%", w1: "80 kg / 180 lb", w2: "112 kg / 252 lb", w3: "144 kg / 324 lb", use: "7-8 rep strength-hypertrophy" },
                      { pct: "75%", w1: "75 kg / 169 lb", w2: "105 kg / 236 lb", w3: "135 kg / 304 lb", use: "8-10 rep hypertrophy volume" },
                      { pct: "70%", w1: "70 kg / 158 lb", w2: "98 kg / 221 lb", w3: "126 kg / 284 lb", use: "10-12 rep volume sets" },
                      { pct: "60%", w1: "60 kg / 135 lb", w2: "84 kg / 189 lb", w3: "108 kg / 243 lb", use: "Speed work or deload" },
                      { pct: "50%", w1: "50 kg / 113 lb", w2: "70 kg / 158 lb", w3: "90 kg / 203 lb", use: "Warm-up and technique" },
                    ].map((row) => (
                      <tr key={row.pct} className="hover:bg-white/5">
                        <td className="py-3 px-4 text-[#FF8C00] font-bold">{row.pct}</td>
                        <td className="py-3 px-4 text-white">{row.w1}</td>
                        <td className="py-3 px-4 text-white">{row.w2}</td>
                        <td className="py-3 px-4 text-white">{row.w3}</td>
                        <td className="py-3 px-4 text-gray-300 text-xs">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 5. Actionable Next Steps */}
            <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#243447] to-[#1B2B3B] border border-white/10 space-y-4">
              <h2 className="text-2xl font-bold text-white">Take Your 1RM Numbers to the Gym</h2>
              <p className="text-gray-300">
                Plug your newly calculated numbers into one of FitWay&apos;s science-backed routines:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">Follow a Strength Routine</h3>
                  <p className="text-xs text-gray-300">
                    Try our <Link href="/workouts/advanced-powerlifting-workout-maximum-strength-gym" className="text-[#FF8C00] underline">advanced powerlifting workout</Link> or read our guide to the <Link href="/blog/best-compound-exercises-muscle-growth" className="text-[#FF8C00] underline">best compound exercises</Link>.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <h3 className="font-bold text-white text-sm">Fuel Your Recovery</h3>
                  <p className="text-xs text-gray-300">
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
