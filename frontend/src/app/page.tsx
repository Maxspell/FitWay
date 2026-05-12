import Hero from "@/components/hero/Hero";
import { ArrowRight, Calendar, User, Phone, ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CalculatorPreview from "@/components/sections/CalculatorPreview";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

import StepsSection from "@/components/sections/steps/StepsSection";
import FAQSection from "@/components/sections/faq/FAQSection";

async function getFAQs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/faqs?sort=order:asc`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const result = await response.json();
    
    if (!result.data || result.data.length === 0) {
      return fallbackFAQs;
    }

    return result.data.map((item: any) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      category: item.category
    }));
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return fallbackFAQs;
  }
}

const fallbackFAQs = [
  {
    id: 1,
    question: "How do I start my fitness journey?",
    answer: "Getting started is easy! We recommend beginning with our Goal Setting tool to define your objectives, then choosing a 'Beginner' workout plan from our collections. Consistency is key!",
    category: "general"
  },
  {
    id: 2,
    question: "Are workouts suitable for beginners?",
    answer: "Absolutely. We have specifically designed programs for every level, from complete beginners to advanced athletes. Each exercise comes with video tutorials to ensure proper form.",
    category: "workouts"
  },
  {
    id: 3,
    question: "Do I need gym equipment?",
    answer: "Not necessarily! We offer many 'Home Workout' plans that require zero equipment. For more advanced strength training, some basic equipment might be recommended.",
    category: "workouts"
  },
  {
    id: 4,
    question: "Are the calculators free to use?",
    answer: "Yes, all our fitness tools including BMI, Daily Calorie, and Meal Plan generators are completely free for all users to help you track your progress.",
    category: "tools"
  }
];

async function getBlogPosts() {
  const response = await fetch("http://localhost:1337/api/posts?populate=image", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      "Content-Type": "application/json"
    }
  });
  const result = await response.json();

  return result.data ? result.data.slice(0, 3) : [];
}

export default async function Home() {
  const [blogPosts, faqs] = await Promise.all([
    getBlogPosts(),
    getFAQs()
  ]);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Steps Journey Section */}
      <StepsSection />

      {/* Calculator Preview Section */}
      <CalculatorPreview />

      {/* Featured Workouts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Featured Workouts</h2>
            <Link 
              href="/workouts" 
              className="group flex items-center gap-2 text-[#FF8C00] hover:text-[#E67E00] transition-colors"
            >
              View All Workouts 
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="card group hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
                  alt="Crossfit"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">CrossFit</h3>
              <p className="text-gray-300 mb-4">High-intensity functional movements</p>
              <Link href="/workouts" className="btn-primary inline-block">Learn More</Link>
            </div>
            <div className="card group hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1574680096145-d05b474e2155"
                  alt="Strength Training"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Strength Training</h3>
              <p className="text-gray-300 mb-4">Build muscle and increase strength</p>
              <Link href="/workouts" className="btn-primary inline-block">Learn More</Link>
            </div>
            <div className="card group hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a"
                  alt="Cardio"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Cardio</h3>
              <p className="text-gray-300 mb-4">Improve endurance and burn fat</p>
              <Link href="/workouts" className="btn-primary inline-block">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Latest from Our Blog</h2>
            <Link 
              href="/blog" 
              className="group flex items-center gap-2 text-[#FF8C00] hover:text-[#E67E00] transition-colors"
            >
              View All Posts 
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {blogPosts.map((post: any, index: number) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.slug}
                className="group"
              >
                <article 
                  className="card h-full flex flex-col hover:-translate-y-2 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <Image 
                      src={process.env.NEXT_PUBLIC_STRAPI_URL + post.image.formats.small.url}
                      alt={post.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-[#FF8C00] text-sm mb-2">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF8C00] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#FF8C00] group-hover:gap-3 transition-all">
                    Read More 
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Newsletter Subscription */}
      <NewsletterSection />
    </>
  );
}