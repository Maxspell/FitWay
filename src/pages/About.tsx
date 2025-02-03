import React from 'react';
import { Award, Users, Target, Heart } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Richard Botich',
      role: 'Head Trainer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Certified personal trainer with 10+ years of experience in fitness and nutrition.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Nutrition Specialist',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Registered dietitian specializing in sports nutrition and weight management.'
    },
    {
      name: 'Mike Chen',
      role: 'Fitness Coach',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Specializes in strength training and rehabilitation exercises.'
    }
  ];

  const values = [
    {
      icon: <Target className="h-12 w-12 text-[#FF8C00]" />,
      title: 'Goal-Oriented',
      description: 'We focus on helping you achieve your fitness goals through personalized programs.'
    },
    {
      icon: <Users className="h-12 w-12 text-[#FF8C00]" />,
      title: 'Community',
      description: 'Build lasting relationships with like-minded individuals on their fitness journey.'
    },
    {
      icon: <Award className="h-12 w-12 text-[#FF8C00]" />,
      title: 'Excellence',
      description: 'Committed to providing the highest quality fitness education and training.'
    },
    {
      icon: <Heart className="h-12 w-12 text-[#FF8C00]" />,
      title: 'Passion',
      description: 'We are passionate about helping you live a healthier, more active lifestyle.'
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="section-title mb-4">About 6FIT</h1>
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
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-[#FF8C00] mb-2">{member.role}</p>
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
};

export default About;