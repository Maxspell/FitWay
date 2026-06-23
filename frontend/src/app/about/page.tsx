import { Award, Users, Target, Heart } from "lucide-react";
import Image from "next/image";
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

  return (
    <div className="py-12">
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
        <div className="card text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            To inspire and empower individuals to achieve their optimal health and fitness
            through expert guidance, innovative programs, and a supportive community.
          </p>
        </div>
      </div>
    </div>
  );
}
