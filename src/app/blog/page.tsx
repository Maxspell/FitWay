import { Clock, User, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to HIIT Workouts",
      excerpt: "High-Intensity Interval Training (HIIT) is one of the most effective ways to burn fat and improve cardiovascular fitness...",
      image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Fitness Programs"
    },
    {
      id: 2,
      title: "Nutrition Tips for Muscle Building",
      excerpt: "Building muscle requires more than just lifting weights. Learn about the essential nutrients and meal timing...",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
      author: "Mike Thompson",
      date: "March 12, 2024",
      category: "Nutrition"
    },
    {
      id: 3,
      title: "Mental Health Benefits of Exercise",
      excerpt: "Regular exercise not only improves your physical health but also has significant benefits for your mental wellbeing...",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
      author: "Dr. Emily Chen",
      date: "March 10, 2024",
      category: "Health"
    }
  ];

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
              <Link href={`/blog/${blogPosts[0].id}`} className="btn-primary inline-block">
                Read More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Recent Posts Grid */}
        <div className="grid grid-cols-2 gap-8">
          {blogPosts.slice(1).map(post => (
            <div key={post.id} className="card">
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
              <Link href={`/blog/${post.id}`} className="btn-primary inline-block">
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