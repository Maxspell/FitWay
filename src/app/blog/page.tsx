import { Clock, User, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const blogPosts = [
  {
    slug: "ultimate-guide-hiit-workouts",
    title: "The Ultimate Guide to HIIT Workouts",
    excerpt: "High-Intensity Interval Training (HIIT) is one of the most effective ways to burn fat and improve cardiovascular fitness...",
    content: `
      High-Intensity Interval Training (HIIT) has revolutionized the way we approach fitness. This comprehensive guide will walk you through everything you need to know about HIIT workouts, from their scientific benefits to practical implementation.

      ## What is HIIT?
      HIIT combines short bursts of intense exercise with periods of lower-intensity recovery. This training method not only burns calories during the workout but also creates an "afterburn effect," known as excess post-exercise oxygen consumption (EPOC).

      ## Benefits of HIIT
      - Increased metabolic rate for hours after exercise
      - Improved cardiovascular health
      - Enhanced fat burning
      - Time-efficient workouts
      - No equipment necessary

      ## Sample HIIT Workout
      1. Warm-up (5 minutes)
      2. 30 seconds Burpees
      3. 30 seconds Rest
      4. 30 seconds Mountain Climbers
      5. 30 seconds Rest
      6. 30 seconds Jump Squats
      7. 30 seconds Rest
      8. Repeat 3-4 times
      9. Cool-down (5 minutes)

      Remember to start slowly and gradually increase intensity as your fitness improves. Always listen to your body and maintain proper form throughout the exercises.
    `,
    image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    category: "Fitness Programs",
    readTime: "8 min read"
  },
  {
    slug: "nutrition-tips-muscle-building",
    title: "Nutrition Tips for Muscle Building",
    excerpt: "Building muscle requires more than just lifting weights. Learn about the essential nutrients and meal timing...",
    content: `
      Building muscle is a complex process that requires both proper training and nutrition. This guide will help you understand the nutritional aspects of muscle building and how to optimize your diet for maximum gains.

      ## The Basics of Muscle Building
      Muscle growth occurs when protein synthesis exceeds protein breakdown. This process, known as muscle protein synthesis, requires adequate protein intake and proper training stimulus.

      ## Key Nutrients for Muscle Growth
      1. Protein: The building block of muscle tissue
      2. Carbohydrates: Fuel for workouts and recovery
      3. Healthy Fats: Hormonal support and energy
      4. Vitamins and Minerals: Essential for recovery and growth

      ## Meal Timing
      - Pre-workout: Complex carbs and moderate protein
      - Post-workout: Fast-digesting protein and carbs
      - Throughout the day: Balanced meals every 3-4 hours

      Remember that consistency is key, and results take time. Focus on gradual progress and sustainable habits.
    `,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    author: "Mike Thompson",
    date: "March 12, 2024",
    category: "Nutrition",
    readTime: "10 min read"
  },
  {
    slug: "mental-health-benefits-exercise",
    title: "Mental Health Benefits of Exercise",
    excerpt: "Regular exercise not only improves your physical health but also has significant benefits for your mental wellbeing...",
    content: `
      Exercise is not just about physical fitness; it's a powerful tool for maintaining and improving mental health. Let's explore the various ways physical activity can benefit your mental wellbeing.

      ## How Exercise Affects Mental Health
      Regular physical activity has been shown to:
      - Reduce anxiety and depression
      - Improve mood and self-esteem
      - Enhance cognitive function
      - Reduce stress levels
      - Promote better sleep

      ## Best Exercises for Mental Health
      1. Yoga and Meditation
      2. Running or Jogging
      3. Group Fitness Classes
      4. Swimming
      5. Nature Walks

      ## Creating a Routine
      Start small with 10-15 minutes of daily activity and gradually increase duration and intensity. The key is consistency rather than intensity.

      Remember that any movement is better than none, and finding activities you enjoy will help you maintain a regular exercise routine.
    `,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    author: "Dr. Emily Chen",
    date: "March 10, 2024",
    category: "Health",
    readTime: "6 min read"
  }
];

export default function Blog() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center">Latest Health & Fitness Articles</h1>
        
        {/* Featured Post */}
        <div className="card mb-12">
          <div className="flex gap-8">
            <div className="w-1/2 relative h-[400px]">
              <Image 
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
            <div className="w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-[#FF8C00] mb-4">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {blogPosts[0].author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {blogPosts[0].date}
                </span>
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {blogPosts[0].category}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-300 mb-6">{blogPosts[0].excerpt}</p>
              <Link href={`/blog/${blogPosts[0].slug}`} className="btn-primary inline-block">
                Read More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Recent Posts Grid */}
        <div className="grid grid-cols-2 gap-8">
          {blogPosts.slice(1).map(post => (
            <div key={post.slug} className="card">
              <div className="relative h-48 mb-4">
                <Image 
                  src={post.image}
                  alt={post.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex items-center gap-4 text-[#FF8C00] text-sm mb-2">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.date}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="btn-primary inline-block">
                Read More
              </Link>
            </div>
          ))}
        </div>
        
        {/* Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="grid grid-cols-4 gap-4">
            {["Fitness Programs", "Nutrition", "Health", "Psychology"].map(category => (
              <button key={category} className="card hover:bg-[#2d4258] transition-colors">
                <h3 className="text-lg font-semibold text-center">{category}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}