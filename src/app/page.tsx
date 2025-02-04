import { ArrowRight, Calendar, User, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
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
            <Link href="/workouts" className="btn-primary inline-flex items-center gap-2">
              Start Your Workout Now! <ArrowRight />
            </Link>
          </div>
          <div className="w-1/2 relative h-[400px]">
            <Image 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
              alt="Fitness"
              fill
              className="rounded-lg shadow-xl object-cover"
              priority
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
              <div className="relative h-48 mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
                  alt="Crossfit"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">CrossFit</h3>
              <p className="text-gray-300 mb-4">High-intensity functional movements</p>
              <Link href="/workouts" className="btn-primary inline-block">Learn More</Link>
            </div>
            <div className="card">
              <div className="relative h-48 mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1574680096145-d05b474e2155"
                  alt="Strength Training"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Strength Training</h3>
              <p className="text-gray-300 mb-4">Build muscle and increase strength</p>
              <Link href="/workouts" className="btn-primary inline-block">Learn More</Link>
            </div>
            <div className="card">
              <div className="relative h-48 mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a"
                  alt="Cardio"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Cardio</h3>
              <p className="text-gray-300 mb-4">Improve endurance and burn fat</p>
              <Link href="/workouts" className="btn-primary inline-block">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}