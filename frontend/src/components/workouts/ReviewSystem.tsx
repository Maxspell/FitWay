"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";

interface ReviewSystemProps {
  workoutTitle: string;
}

export default function ReviewSystem({ workoutTitle }: ReviewSystemProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Static SEO-friendly placeholder reviews
  const reviews = [
    {
      id: 1,
      name: "Alex M.",
      date: "2 weeks ago",
      rating: 5,
      content: `I've been doing the ${workoutTitle} routine for a month now and the results are amazing. Highly recommend it for anyone trying to build consistency!`,
      helpful: 12
    },
    {
      id: 2,
      name: "Jamie T.",
      date: "1 month ago",
      rating: 4,
      content: "Great structure and easy to follow. The expert tips section really helped me avoid the mistakes I usually make when training.",
      helpful: 8
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would send the review data to the backend here.
  };

  return (
    <div className="mt-16 border-t border-white/10 pt-12">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Reviews Summary and Form */}
        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold mb-4">Reviews</h2>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="text-5xl font-black text-[#FF8C00]">4.8</div>
            <div>
              <div className="flex text-[#FF8C00] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "fill-current" : i === 4 ? "fill-current opacity-50" : ""}`} />
                ))}
              </div>
              <p className="text-sm text-gray-400">Based on 24 reviews</p>
            </div>
          </div>

          <div className="bg-[#243447] p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            {isSubmitted ? (
              <div className="p-4 bg-green-500/20 text-green-400 rounded-xl text-center font-medium">
                Thank you! Your review has been submitted for moderation.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className={`bg-transparent border-none outline-none cursor-pointer transition-colors ${
                            index <= (hover || rating) ? "text-[#FF8C00]" : "text-gray-500"
                          }`}
                          onClick={() => setRating(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          <Star className="h-8 w-8 fill-current" />
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full bg-[#1B2B3B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF8C00] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2" htmlFor="review">Review</label>
                  <textarea 
                    id="review"
                    required
                    rows={4}
                    className="w-full bg-[#1B2B3B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF8C00] transition-colors resize-none"
                    placeholder="What did you think of this workout?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={rating === 0}
                  className="w-full py-3 bg-[#FF8C00] text-white rounded-xl font-bold hover:bg-[#E67E00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:w-2/3 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Reviews</h3>
            <select className="bg-[#243447] border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF8C00]">
              <option>Most Helpful</option>
              <option>Newest</option>
              <option>Highest Rated</option>
            </select>
          </div>

          {reviews.map(review => (
            <div key={review.id} className="bg-[#243447] p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1B2B3B] rounded-full flex items-center justify-center text-[#FF8C00] font-black text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{review.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex text-[#FF8C00]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-current" : ""}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {review.content}
              </p>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#FF8C00] transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
