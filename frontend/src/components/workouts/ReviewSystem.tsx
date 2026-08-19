"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import useSWR, { mutate } from "swr";

interface ReviewSystemProps {
  workoutTitle: string;
  workoutDocumentId: string;
}

interface Review {
  id: number;
  documentId: string;
  name: string;
  rating: number;
  content: string;
  helpful: number;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReviewSystem({ workoutTitle, workoutDocumentId }: ReviewSystemProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"}/api/reviews?filters[workout][documentId][$eq]=${workoutDocumentId}&sort=createdAt:desc`;

  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  const reviews: Review[] = data?.data || [];
  const averageRating = reviews.length
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitting(true);

    try {
      const payload = {
        data: {
          name,
          rating,
          content,
          helpful: 0,
          workout: {
            connect: [workoutDocumentId]
          }
        },
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setName("");
        setContent("");
        setRating(0);
        mutate(apiUrl); // Revalidate SWR cache
      } else {
        console.log("Status:", res.status);

        const text = await res.text();
        console.log("Response:");
        console.log(text);
        // const errorData = await res.json();
        // console.error("Failed to submit review. Strapi error:\n", JSON.stringify(errorData, null, 2));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 border-t border-white/10 pt-12">
      <div className="flex flex-col md:flex-row gap-12">

        {/* Reviews Summary and Form */}
        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold mb-4">Reviews</h2>

          <div className="flex items-center gap-4 mb-8">
            <div className="text-5xl font-black text-[#FF8C00]">{averageRating}</div>
            <div>
              <div className="flex text-[#FF8C00] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(Number(averageRating)) ? "fill-current" : i === Math.round(Number(averageRating)) ? "fill-current opacity-50" : ""}`} />
                ))}
              </div>
              <p className="text-sm text-gray-400">Based on {reviews.length} reviews</p>
            </div>
          </div>

          <div className="bg-[#243447] p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            {isSubmitted ? (
              <div className="p-4 bg-green-500/20 text-green-400 rounded-xl text-center font-medium">
                Thank you! Your review has been submitted successfully.
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
                          className={`bg-transparent border-none outline-none cursor-pointer transition-colors ${index <= (hover || rating) ? "text-[#FF8C00]" : "text-gray-500"
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-[#1B2B3B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF8C00] transition-colors resize-none"
                    placeholder="What did you think of this workout?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={rating === 0 || isSubmitting}
                  className="w-full py-3 bg-[#FF8C00] text-white rounded-xl font-bold hover:bg-[#E67E00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
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
              <option>Newest</option>
              <option>Most Helpful</option>
              <option>Highest Rated</option>
            </select>
          </div>

          {isLoading && <p className="text-gray-400">Loading reviews...</p>}
          {error && <p className="text-red-400">Failed to load reviews.</p>}
          {!isLoading && !error && reviews.length === 0 && (
            <p className="text-gray-400">No reviews yet. Be the first to review!</p>
          )}

          {reviews.map(review => (
            <div key={review.id} className="bg-[#243447] p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1B2B3B] rounded-full flex items-center justify-center text-[#FF8C00] font-black text-lg">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{review.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex text-[#FF8C00]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-current" : ""}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
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
