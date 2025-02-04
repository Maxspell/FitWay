import React from 'react';
import { ArrowRight, Calendar, User, Phone } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-[#1B2B3B]">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="w-1/2">
            <h1 className="text-6xl font-bold mb-4">
              PUTTING YOUR HEALTH<br />IN THE FIRST WAY
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Make your day better and train your body in one of our new gyms
            </p>
            <button className="btn-primary flex items-center gap-2">
              Start Your Workout Now! <ArrowRight />
            </button>
          </div>
          <div className="w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Fitness"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-[#243447] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            <div className="card">
              <Calendar className="w-12 h-12 text-[#FF8C00] mb-4" />
              <h3 className="text-xl font-bold mb-2">Choose Workout</h3>
              <p className="text-gray-300">Split your Training</p>
            </div>
            <div className="card">
              <User className="w-12 h-12 text-[#FF8C00] mb-4" />
              <h3 className="text-xl font-bold mb-2">Trainer</h3>
              <p className="text-gray-300">Richard Botich</p>
            </div>
            <div className="card">
              <Phone className="w-12 h-12 text-[#FF8C00] mb-4" />
              <h3 className="text-xl font-bold mb-2">Phone Number</h3>
              <p className="text-gray-300">(603) 842-342</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workouts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Featured Workouts</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="card">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Crossfit"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">CrossFit</h3>
              <p className="text-gray-300 mb-4">High-intensity functional movements</p>
              <button className="btn-primary">Learn More</button>
            </div>
            <div className="card">
              <img 
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Strength Training"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Strength Training</h3>
              <p className="text-gray-300 mb-4">Build muscle and increase strength</p>
              <button className="btn-primary">Learn More</button>
            </div>
            <div className="card">
              <img 
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Cardio"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Cardio</h3>
              <p className="text-gray-300 mb-4">Improve endurance and burn fat</p>
              <button className="btn-primary">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;