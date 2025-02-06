import { notFound } from "next/navigation";
import { Clock, User, Tag, Calendar } from "lucide-react";
import Image from "next/image";
import { blogPosts } from "../page";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-[500px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3B] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-4 text-[#FF8C00] mb-4">
              <span className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white">{post.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <div className="card prose prose-invert prose-orange max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('##', '').trim()}</h2>;
                }
                if (paragraph.startsWith('-')) {
                  return <li key={index} className="text-gray-300">{paragraph.replace('-', '').trim()}</li>;
                }
                if (paragraph.match(/^\d\./)) {
                  return <li key={index} className="text-gray-300">{paragraph.replace(/^\d\./, '').trim()}</li>;
                }
                return paragraph.trim() && <p key={index} className="text-gray-300 mb-4">{paragraph}</p>;
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Author Card */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">About the Author</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#FF8C00] flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold">{post.author}</h4>
                  <p className="text-gray-300">Fitness Expert</p>
                </div>
              </div>
            </div>

            {/* Related Categories */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Related Categories</h3>
              <div className="flex flex-wrap gap-2">
                {["Fitness", "Workout", "Health", "Training"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#1B2B3B] text-[#FF8C00] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}