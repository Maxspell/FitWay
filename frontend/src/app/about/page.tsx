import { Award, Users, Target, Heart } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about FitWay's mission, values, and the expert team behind our fitness community.",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  const team = [
    {
      name: "Richard Botich",
      role: "Head Trainer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      description: "Certified personal trainer with 10+ years of experience in fitness and nutrition.",
      certifications: ["NASM-CPT", "ACE"],
      linkedin: "https://linkedin.com/in/richardbotich"
    },
    {
      name: "Sarah Johnson",
      role: "Nutrition Specialist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      description: "Registered dietitian specializing in sports nutrition and weight management.",
      certifications: ["RD", "ISSN"],
      linkedin: "https://linkedin.com/in/sarahjohnson"
    },
    {
      name: "Mike Chen",
      role: "Fitness Coach",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      description: "Specializes in strength training and rehabilitation exercises.",
      certifications: ["CSCS", "CrossFit L2"],
      linkedin: "https://linkedin.com/in/mikechen"
    }
  ];

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
        <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <div key={index} className="card">
              <div className="relative h-64 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF8C00] transition-colors" title="LinkedIn Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
              </div>
              <p className="text-[#FF8C00] mb-3">{member.role}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {member.certifications?.map((cert, i) => (
                  <span key={i} className="text-xs font-bold bg-[#FF8C00]/10 text-[#FF8C00] px-2 py-1 rounded-md border border-[#FF8C00]/20">
                    {cert}
                  </span>
                ))}
              </div>
              <p className="text-gray-300">{member.description}</p>
            </div>
          ))}
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