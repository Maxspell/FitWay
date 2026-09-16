import { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileCheck2, 
  Award, 
  RefreshCw, 
  Scale, 
  AlertCircle, 
  BookOpen, 
  CheckCircle2,
  Users
} from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Policy & Quality Standards | FitWay",
  description: "Learn how FitWay creates, fact-checks, and medically reviews fitness and nutrition content. Our commitment to E-E-A-T, scientific accuracy, and integrity.",
  alternates: {
    canonical: "/editorial-policy",
  },
  openGraph: {
    title: "Editorial Policy & Standards | FitWay",
    description: "Our standards for evidence-based fitness advice, expert medical review, and transparent nutritional guidance.",
    url: "https://fitway.best/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Editorial Policy & Review Process",
    "url": "https://fitway.best/editorial-policy",
    "description": "Editorial standards, expert verification process, and fact-checking methodology at FitWay.",
    "publisher": {
      "@type": "Organization",
      "name": "FitWay",
      "url": "https://fitway.best",
      "logo": "https://fitway.best/favicon.svg"
    }
  };

  return (
    <main className="min-h-screen bg-[#0F1720] text-white py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-sm font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            Integrity & Transparency
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Editorial Guidelines & Standards
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            At FitWay, your health and physical safety come first. Here is how our certified experts research, verify, and continuously update all fitness and nutrition guidance.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="card bg-[#1B2B3B]/60 border border-white/5 p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-[#FF8C00]/10 flex items-center justify-center text-[#FF8C00] mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-white">Evidence-Based Research</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Every training guideline and nutritional recommendation is grounded in peer-reviewed scientific literature (PubMed, ISSN, NIH, ACSM), avoiding fad diets and unverified fitness myths.
            </p>
          </div>

          <div className="card bg-[#1B2B3B]/60 border border-white/5 p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-[#00C853]/10 flex items-center justify-center text-[#00C853] mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-white">Certified Expert Authors</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our articles and workout routines are written and evaluated by credentialed personal trainers, certified strength and conditioning specialists (CSCS), and registered dietitians.
            </p>
          </div>

          <div className="card bg-[#1B2B3B]/60 border border-white/5 p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-white">Multi-Tier Review Process</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Drafts undergo editorial scrutiny, anatomical validation, and technical peer review before publication to ensure safe execution parameters and accurate macro/calorie metrics.
            </p>
          </div>

          <div className="card bg-[#1B2B3B]/60 border border-white/5 p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-white">Regular Fact Audits</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Exercise science evolves. We periodically audit and update published articles and calculators when new clinical trials or guidelines from international health bodies emerge.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="card bg-[#1B2B3B]/40 border border-white/10 rounded-2xl p-6 md:p-10 space-y-10 text-left">
          {/* Section 1 */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-[#FF8C00] flex items-center gap-2">
              1. Our Mission and Quality Pledge
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              FitWay is dedicated to making elite-level fitness coaching and evidence-based nutrition accessible to everyone. Because fitness and health directly impact wellbeing (categorized as <strong className="text-white">Your Money or Your Life (YMYL)</strong> by search quality evaluators), we adhere to the highest standards of informational accuracy, reader safety, and practical utility.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We do not promote extreme starvation protocols, unverified thermogenic supplements, or high-risk exercise techniques. Every recommendation is formulated to build sustainable, long-term habits.
            </p>
          </section>

          {/* Section 2: Verification Workflow */}
          <section className="border-t border-gray-800 pt-8">
            <h3 className="text-2xl font-bold mb-4 text-[#FF8C00] flex items-center gap-2">
              2. The 4-Step Verification & Publishing Workflow
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#FF8C00]/20 text-[#FF8C00] font-bold flex items-center justify-center shrink-0 mt-0.5 text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white">Literature & Scientific Sourcing</h4>
                  <p className="text-sm text-gray-400">
                    Topic ideation begins with clinical evidence. We prioritize meta-analyses, systematic reviews, and guidelines from reputable organizations like the American College of Sports Medicine (ACSM), the International Society of Sports Nutrition (ISSN), and the National Strength and Conditioning Association (NSCA).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#FF8C00]/20 text-[#FF8C00] font-bold flex items-center justify-center shrink-0 mt-0.5 text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white">Drafting by Qualified Specialists</h4>
                  <p className="text-sm text-gray-400">
                    Content is drafted by experienced trainers and sports dietitians with verified field experience. Exercise instructions must detail proper biomechanics, target muscle groups, common faults, and regressions for beginners.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#FF8C00]/20 text-[#FF8C00] font-bold flex items-center justify-center shrink-0 mt-0.5 text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white">Technical & Editorial Peer Review</h4>
                  <p className="text-sm text-gray-400">
                    A second practitioner reviews formulas, exercise safety warnings, and dosage citations. Articles featuring complex nutritional science or supplement overviews (such as creatine, protein synthesis, or caloric deficits) undergo rigorous verification against current clinical consensus.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#FF8C00]/20 text-[#FF8C00] font-bold flex items-center justify-center shrink-0 mt-0.5 text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-white">Publication & Maintenance</h4>
                  <p className="text-sm text-gray-400">
                    Published articles clearly display the primary author, reviewer credentials, publication date, and last modified timestamp. Feedback from readers or changes in scientific consensus trigger immediate editorial audits.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Meet the Team */}
          <section className="border-t border-gray-800 pt-8">
            <h3 className="text-2xl font-bold mb-4 text-[#FF8C00] flex items-center gap-2">
              3. Our Reviewers and Authors
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Our editorial and program design team brings hands-on coaching and academic expertise:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0F1720]/80 border border-white/5">
                <h4 className="font-bold text-white">Richard Botich</h4>
                <p className="text-xs text-[#FF8C00] mb-2 font-medium">Head Strength Coach • CSCS, NASM-CPT</p>
                <p className="text-xs text-gray-400">
                  Over 10 years of experience designing progressive overload protocols, barbell mechanics, and compound lifting programs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1720]/80 border border-white/5">
                <h4 className="font-bold text-white">Sarah Johnson</h4>
                <p className="text-xs text-[#FF8C00] mb-2 font-medium">Nutrition Specialist • RD, ISSN</p>
                <p className="text-xs text-gray-400">
                  Registered dietitian specializing in sports metabolic rate, macronutrient partitioning, and evidence-based supplementation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1720]/80 border border-white/5">
                <h4 className="font-bold text-white">Mike Chen</h4>
                <p className="text-xs text-[#FF8C00] mb-2 font-medium">Fitness Coach • CSCS, CrossFit L2</p>
                <p className="text-xs text-gray-400">
                  Functional movement specialist focused on injury prevention, joint mobility, cardiovascular conditioning, and beginner onboarding.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/authors" className="text-sm font-semibold text-[#FF8C00] hover:underline inline-flex items-center gap-1">
                <Users className="w-4 h-4" /> Explore all author credentials and biographies &rarr;
              </Link>
            </div>
          </section>

          {/* Section 4: Corrections and Medical Disclaimer */}
          <section className="border-t border-gray-800 pt-8">
            <h3 className="text-2xl font-bold mb-4 text-[#FF8C00] flex items-center gap-2">
              4. Corrections & Medical Notice
            </h3>
            <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
              <p>
                <strong className="text-white">Corrections Policy:</strong> If a fact, calculation formula, or cited study requires correction, we make updates promptly and maintain transparent versioning. If you notice an inaccuracy or broken reference, please contact us directly at <a href="mailto:info@fitway.best" className="text-[#FF8C00] underline">info@fitway.best</a>.
              </p>
              <div className="p-4 rounded-xl bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-gray-300">
                <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#FF8C00]" /> Medical Disclaimer Reminder
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  FitWay content is intended strictly for educational and informational purposes and does not substitute for personalized medical diagnosis or professional clinical advice. Always consult a physician prior to commencing vigorous physical training or significant dietary modifications. See our full <Link href="/terms-of-service" className="text-[#FF8C00] underline">Terms of Service</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <div className="pt-6 border-t border-gray-800 text-xs text-gray-500 flex flex-wrap justify-between items-center gap-2">
            <span>Published by FitWay Editorial Board</span>
            <span>Last reviewed: September 2026</span>
          </div>
        </div>
      </div>
    </main>
  );
}
