import { Award, Users, Target, Heart, ArrowRight, Dumbbell, Calculator, Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { getAuthors } from "@/services/author.service";
import ExpertsSection from "@/components/sections/ExpertsSection";
import { Author } from "@/interfaces/author";
import { getStrapiMedia } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us: FitWay Team, Mission & Methodology",
  description:
    "Meet the certified coaches and sports nutritionists behind FitWay. Learn how we build science-backed workout programs, clinical health calculators, and nutrition guides.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us: FitWay Team, Mission & Methodology | FitWay",
    description:
      "Meet the certified coaches and sports nutritionists behind FitWay. Explore our exercise science methodology and editorial standards.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About FitWay | Certified Coaches & Exercise Science",
    description:
      "Meet the certified coaches and nutrition specialists behind FitWay's workouts, guides, and free calculators.",
  },
};

export default async function About() {
  const authors = await getAuthors();

  const values = [
    {
      icon: <Target className="h-12 w-12 text-[#FF8C00]" aria-hidden="true" />,
      title: "Goal-Focused Programs",
      description: "Structured workout routines built around fat loss, strength, hypertrophy, and mobility."
    },
    {
      icon: <Users className="h-12 w-12 text-[#FF8C00]" aria-hidden="true" />,
      title: "Coach-Reviewed Guides",
      description: "Every training plan and nutrition breakdown is reviewed by certified fitness specialists."
    },
    {
      icon: <Award className="h-12 w-12 text-[#FF8C00]" aria-hidden="true" />,
      title: "Research Standards",
      description: "Calculators and guides grounded in clinical formulas and peer-reviewed PubMed studies."
    },
    {
      icon: <Heart className="h-12 w-12 text-[#FF8C00]" aria-hidden="true" />,
      title: "Practical Consistency",
      description: "Clear exercise cues, realistic calorie targets, and sustainable weekly training habits."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://fitway.best/about",
        "url": "https://fitway.best/about",
        "name": "About FitWay",
        "description": "Learn more about FitWay's methodology, editorial standards, and team of certified fitness and nutrition specialists.",
        "mainEntity": {
          "@type": "Organization",
          "@id": "https://fitway.best/#organization",
          "name": "FitWay",
          "url": "https://fitway.best",
          "logo": "https://fitway.best/favicon.svg"
        }
      },
      ...authors.map((author: Author) => {
        const photoUrl = author.photo?.url ? getStrapiMedia(author.photo.url) : undefined;
        const sameAs = [author.linkedin, author.twitter, author.instagram].filter(
          (url): url is string => Boolean(url)
        );
        return {
          "@type": "Person",
          "name": author.name,
          "url": `https://fitway.best/authors/${author.slug}`,
          ...(author.jobTitle ? { "jobTitle": author.jobTitle } : {}),
          ...(author.bio ? { "description": author.bio } : {}),
          ...(photoUrl ? { "image": photoUrl } : {}),
          ...(sameAs.length > 0 ? { "sameAs": sameAs } : {}),
          "worksFor": {
            "@type": "Organization",
            "@id": "https://fitway.best/#organization",
            "name": "FitWay"
          }
        };
      })
    ]
  };

  return (
    <div className="py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="section-title mb-4">About FitWay</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Structured workout programs, clinical health calculators, and nutrition guides reviewed by
            certified coaches and sports nutritionists.
          </p>

          {/* Prominent Brand & Hub CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/workouts"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#C25700] hover:bg-[#A34600] text-white font-bold transition-colors shadow-[0_0_20px_rgba(194,87,0,0.3)]"
            >
              <Dumbbell className="h-5 w-5" />
              <span>Explore Workout Programs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold transition-colors"
            >
              <Calculator className="h-5 w-5 text-[#FF8C00]" />
              <span>Open Fitness Calculators</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-200 hover:text-white font-semibold transition-colors"
            >
              <HomeIcon className="h-5 w-5 text-[#FF8C00]" />
              <span>FitWay Home</span>
            </Link>
          </div>
        </div>

        {/* Values Section */}
        <section aria-labelledby="core-values-heading">
          <h2 id="core-values-heading" className="sr-only">Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-16">
            {values.map((value, index) => (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <div className="mb-8 md:mb-16">
          <ExpertsSection authors={authors} />
        </div>

        {/* Mission Section */}
        <div className="card text-left">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission: Practical Exercise Science</h2>

          <div className="space-y-8">
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
              FitWay brings together structured workout programs, clinical health calculators, and nutrition
              guides reviewed by certified coaches and sports nutritionists. Every routine and article follows
              peer-reviewed exercise science so you can plan your training around clear numbers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#FF8C00]">Formula-Based Precision</h3>
                <p className="text-gray-300 leading-relaxed">
                  Use our{" "}
                  <Link href="/tools" className="text-[#FF8C00] hover:underline">free fitness calculators</Link>{" "}
                  to estimate BMI, TDEE maintenance calories, macro splits, ideal weight ranges, and 1RM working
                  weights with established equations like Mifflin-St Jeor, Epley, and WHO criteria.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#FF8C00]">Science-First Education</h3>
                <p className="text-gray-300 leading-relaxed">
                  Through our{" "}
                  <Link href="/blog" className="text-[#FF8C00] hover:underline">educational blog</Link>{" "}
                  and{" "}
                  <Link href="/editorial-policy" className="text-[#FF8C00] hover:underline">Editorial Policy</Link>,
                  we publish evidence-based nutrition guides and training breakdowns backed by PubMed citations
                  and coach review.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#FF8C00]">Training for Every Level</h3>
                <p className="text-gray-300 leading-relaxed">
                  Whether you are starting your first{" "}
                  <Link href="/workouts" className="text-[#FF8C00] hover:underline">beginner workout</Link>{" "}
                  at home or refining a structured lifting split, our workout library covers strength,
                  hypertrophy, fat loss, and mobility with clear form cues.
                </p>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-gray-700 mt-8">
              <p className="text-sm text-gray-300 max-w-2xl mx-auto">
                All guides and calculators on FitWay are reviewed under our{" "}
                <Link href="/editorial-policy" className="text-[#FF8C00] hover:underline">Editorial Policy</Link>{" "}
                for educational reference and do not replace individualized medical advice. Read our{" "}
                <Link href="/terms-of-service" className="text-[#FF8C00] hover:underline">Terms of Service</Link>{" "}
                for full health disclaimers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
