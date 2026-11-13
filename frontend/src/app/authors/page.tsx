import { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  RefreshCw, 
  BookOpen, 
  CheckCircle2, 
  Dumbbell, 
  Calculator, 
  Mail, 
  ExternalLink 
} from "lucide-react";
import { getAuthors } from "@/services/author.service";
import AuthorCatalogCard from "@/components/authors/AuthorCatalogCard";

export const metadata: Metadata = {
  title: "Certified Fitness Trainers & Nutrition Reviewers",
  description: "Meet FitWay's certified editorial board: CSCS strength coaches, registered dietitians (RD), and sports scientists reviewing evidence-based fitness programs.",
  alternates: {
    canonical: "https://fitway.best/authors",
  },
  openGraph: {
    title: "Certified Fitness Trainers & Nutrition Reviewers | FitWay",
    description: "Meet FitWay's certified personal trainers and sports nutritionists reviewing our evidence-based workouts and articles.",
    url: "https://fitway.best/authors",
    type: "website",
    siteName: "FitWay",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitWay Editorial Board & Certified Fitness Experts",
    description: "Evidence-based fitness advice reviewed by CSCS coaches and registered dietitians.",
  },
};

export default async function AuthorsPage() {
  const authors = await getAuthors();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://fitway.best/authors/#webpage",
        "url": "https://fitway.best/authors",
        "name": "FitWay Editorial Board & Certified Fitness Experts",
        "description": "Directory of certified personal trainers, registered dietitians, and sports conditioning specialists who write and review FitWay content.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://fitway.best/#website",
          "name": "FitWay",
          "url": "https://fitway.best"
        },
        "about": {
          "@id": "https://fitway.best/#organization"
        },
        "breadcrumb": {
          "@id": "https://fitway.best/authors/#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://fitway.best/authors/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://fitway.best"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Editorial Board & Authors",
            "item": "https://fitway.best/authors"
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://fitway.best/authors/#expert-list",
        "name": "FitWay Certified Experts",
        "itemListElement": authors.map((author, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Person",
            "@id": `https://fitway.best/authors/${author.slug}/#person`,
            "name": author.name,
            "url": `https://fitway.best/authors/${author.slug}`,
            "jobTitle": author.jobTitle || author.credentials || "Fitness Expert",
            "description": author.bio,
            "image": author.photo?.url ? (author.photo.url.startsWith("http") ? author.photo.url : `https://fitway.best${author.photo.url}`) : undefined,
            "worksFor": {
              "@type": "Organization",
              "@id": "https://fitway.best/#organization",
              "name": "FitWay"
            },
            "sameAs": [author.linkedin, author.twitter, author.instagram].filter(Boolean),
            "knowsAbout": author.specializations || [
              "Strength & Conditioning",
              "Sports Nutrition",
              "Exercise Biomechanics"
            ],
            "hasCredential": (author.certifications || []).map((cert: any) => ({
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Professional Certification",
              "name": typeof cert === "string" ? cert : (cert.name || "Certified Fitness Specialist")
            }))
          }
        }))
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#0F1720] text-white py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section 1: Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/20 text-[#FF8C00] text-sm font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            Verified E-E-A-T Editorial Board
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400">
            FitWay Editorial Board & Certified Experts
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Evidence-based fitness guidance requires experienced coaching and clinical rigor. Meet the certified personal trainers, registered dietitians, and sports performance specialists who write, verify, and maintain FitWay content.
          </p>
        </div>

        {/* Section 2: Real-Time Editorial Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-2xl bg-[#1B2B3B]/60 border border-white/5 text-center">
            <div className="text-3xl font-extrabold text-[#FF8C00] mb-1">3+</div>
            <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Certified Specialists</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#1B2B3B]/60 border border-white/5 text-center">
            <div className="text-3xl font-extrabold text-white mb-1">28+</div>
            <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Evidence-Based Guides</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#1B2B3B]/60 border border-white/5 text-center">
            <div className="text-3xl font-extrabold text-[#00C853] mb-1">100%</div>
            <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Peer-Reviewed Content</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#1B2B3B]/60 border border-white/5 text-center">
            <div className="text-3xl font-extrabold text-blue-400 mb-1">20+</div>
            <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Years Total Coaching</div>
          </div>
        </div>

        {/* Section 3: Expert Directory Grid */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Meet Our Vetted Fitness & Nutrition Specialists
              </h2>
              <p className="text-gray-400 text-sm">
                Every contributor possesses verifiable academic credentials or internationally accredited fitness certifications.
              </p>
            </div>
            <Link
              href="/editorial-policy"
              className="text-sm font-semibold text-[#FF8C00] hover:underline inline-flex items-center gap-1 shrink-0"
            >
              Our Editorial Guidelines &rarr;
            </Link>
          </div>

          {authors.length === 0 ? (
            <div className="text-center text-gray-400 py-12 bg-[#1B2B3B]/30 rounded-2xl border border-white/5">
              No author profiles found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map((author) => (
                <AuthorCatalogCard key={author.documentId || author.id} author={author} />
              ))}
            </div>
          )}
        </div>

        {/* Section 4: 4-Step Scientific Verification Workflow */}
        <div className="rounded-3xl bg-gradient-to-br from-[#1B2B3B]/70 to-[#121C26]/70 border border-white/10 p-8 md:p-12 mb-20">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              How Our Experts Vet & Review Every Article
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We eliminate fitness myths and dangerous dietary protocols through a disciplined multi-tier publication framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#0F1720]/80 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#FF8C00]/10 flex items-center justify-center text-[#FF8C00] font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-white mb-2 text-base">Scientific Sourcing</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Topic outlines start with peer-reviewed literature indexed on PubMed, ISSN, and ACSM position stands.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1720]/80 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-white mb-2 text-base">Credentialed Drafting</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Articles are written by certified strength coaches (CSCS) or registered dietitians with verified coaching experience.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1720]/80 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#00C853]/10 flex items-center justify-center text-[#00C853] font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-white mb-2 text-base">Cross Peer Review</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                A second practitioner audits lifting biomechanics, safety contraindications, and nutritional formulas prior to release.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1720]/80 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold mb-4">
                4
              </div>
              <h3 className="font-bold text-white mb-2 text-base">Routine Auditing</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                When new clinical trials emerge or international guidelines change, articles and calculators are promptly refreshed.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Core Domains of Expertise (Topic Cluster Distribution) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Areas of Core Scientific & Coaching Authority
            </h2>
            <p className="text-gray-400 text-sm">
              Our multidisciplinary board guarantees comprehensive coverage across critical health pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#1B2B3B]/40 border border-white/5 hover:border-[#FF8C00]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FF8C00]/10 flex items-center justify-center text-[#FF8C00] mb-4">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Strength & Hypertrophy</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Evidence-based resistance training, mechanical tension, volume landmarks, and compound lifting mechanics.
              </p>
              <Link href="/workouts" className="text-xs font-semibold text-[#FF8C00] hover:underline inline-flex items-center gap-1">
                Explore Expert Workouts &rarr;
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B2B3B]/40 border border-white/5 hover:border-[#FF8C00]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#00C853]/10 flex items-center justify-center text-[#00C853] mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sports Nutrition & Dietetics</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Caloric balance, macronutrient partitioning, protein timing, and clinically validated ergogenic aids.
              </p>
              <Link href="/blog/category/nutrition" className="text-xs font-semibold text-[#FF8C00] hover:underline inline-flex items-center gap-1">
                View Nutrition Articles &rarr;
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B2B3B]/40 border border-white/5 hover:border-[#FF8C00]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Biometrics & Calculations</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Metabolic math powered by Mifflin-St Jeor, Katch-McArdle, and Brzycki one-rep maximum formulas.
              </p>
              <Link href="/tools" className="text-xs font-semibold text-[#FF8C00] hover:underline inline-flex items-center gap-1">
                Use Interactive Calculators &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Section 6: Editorial Disclaimer & Fact-Checking Notice */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#1B2B3B]/30 border border-white/10 mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="text-[#00C853] w-5 h-5" />
                Fact-Checking Standards & Medical Notice
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
                FitWay content is educational in nature and is not a substitute for clinical diagnosis, personalized medical advice, or physician supervision. Always consult a licensed healthcare professional before embarking on strenuous physical conditioning or radical dietary alterations.
              </p>
            </div>
            <Link
              href="/terms-of-service"
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-gray-300 hover:text-white hover:border-[#FF8C00]/40 transition-all whitespace-nowrap"
            >
              Full Medical Terms
            </Link>
          </div>
        </div>

        {/* Section 7: Editorial Questions / Contact CTA */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#1B2B3B] to-[#121C26] border border-[#FF8C00]/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8C00] opacity-5 rounded-full blur-[80px] pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Have Questions or Corrections for Our Editorial Board?
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            If you notice an outdated scientific citation, formula error, or have inquiries regarding our review process, our team responds to reader feedback within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:support@fitway.best"
              className="px-6 py-3 rounded-xl bg-[#FF8C00] text-black font-bold hover:bg-[#FFA533] transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Editorial Desk (support@fitway.best)
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-semibold text-white hover:border-white/20 transition-all"
            >
              Direct Contact Form
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
