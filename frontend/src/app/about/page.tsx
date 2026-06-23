import { Award, Users, Target, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAuthors } from "@/services/author.service";
import ExpertsSection from "@/components/sections/ExpertsSection";

export const metadata: Metadata = {
  title: "About FitWay | AI-Powered Fitness & Nutrition Experts",
  description: "Meet the team behind FitWay. Discover our mission to transform your health through science-backed workout programs and AI-driven nutrition planning.",
  alternates: {
    canonical: "/about",
  },
};

export default async function About() {
  const authors = await getAuthors();

  const values = [
    {
      icon: <Target className="h-12 w-12 text-[#FF8C00]" />,
      title: "Goal-Oriented",
      description: "We focus on helping you achieve your fitness goals through personalized programs."
    },
    {
      icon: <Users className="h-12 w-12 text-[#FF8C00]" />,
      title: "Community",
      description: "Build lasting relationships with like-minded individuals on their fitness journey."
    },
    {
      icon: <Award className="h-12 w-12 text-[#FF8C00]" />,
      title: "Excellence",
      description: "Committed to providing the highest quality fitness education and training."
    },
    {
      icon: <Heart className="h-12 w-12 text-[#FF8C00]" />,
      title: "Passion",
      description: "We are passionate about helping you live a healthier, more active lifestyle."
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
        "description": "Learn more about FitWay's mission and the expert team of fitness and nutrition specialists.",
        "mainEntity": {
          "@type": "Organization",
          "name": "FitWay",
          "url": "https://fitway.best",
          "logo": "https://fitway.best/favicon.svg"
        }
      },
      ...authors.map((author: any) => ({
        "@type": "Person",
        "name": author.name,
        "jobTitle": author.role,
        "description": author.description,
        "image": author.image,
        "sameAs": author.linkedin ? [author.linkedin] : [],
        "worksFor": {
          "@type": "Organization",
          "name": "FitWay"
        }
      }))
    ]
  };

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="section-title mb-4">About FitWay</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're dedicated to helping you achieve your fitness goals through expert guidance,
            supportive community, and state-of-the-art facilities.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-4 gap-8 mb-16">
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

        {/* Team Section */}
        <div className="mb-16">
          <ExpertsSection authors={authors} />
        </div>

        {/* Mission Section */}
        <div className="card text-left">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission: Redefining Your Fitness Journey</h2>

          <div className="space-y-8">
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
              At FitWay, we believe that fitness is not a one-size-fits-all approach. Our mission is to democratize
              elite-level health coaching by combining cutting-edge AI technology with rigorous exercise science,
              making optimal health accessible to everyone, everywhere.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#FF8C00]">AI-Driven Precision</h3>
                <p className="text-gray-300 leading-relaxed">
                  We move beyond generic templates. By leveraging our
                  <Link href="/tools" className="text-[#FF8C00] hover:underline ml-1">advanced fitness tools</Link>,
                  we help you calculate precise caloric needs and BMI, ensuring your path to weight loss or
                  muscle gain is backed by real data.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#FF8C00]">Science-First Education</h3>
                <p className="text-gray-300 leading-relaxed">
                  Knowledge is the foundation of progress. Through our
                  <Link href="/blog" className="text-[#FF8C00] hover:underline ml-1">educational blog</Link>,
                  we provide evidence-based nutrition guides and training tips that strip away the myths
                  of the fitness industry.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#FF8C00]">Inclusive Training</h3>
                <p className="text-gray-300 leading-relaxed">
                  Whether you're starting your first
                  <Link href="/workouts" className="text-[#FF8C00] hover:underline ml-1">beginner workout</Link>
                  at home or optimizing a professional athlete's routine, our library of science-backed
                  programs ensures safety and efficiency for every body type.
                </p>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-gray-700 mt-8">
              <p className="text-gray-400 italic">
                "Our goal is not just to change bodies, but to change lives by empowering people with
                the right tools and knowledge to take control of their own health."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
