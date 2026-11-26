"use client";

import { useState, useMemo } from "react";
import { Star, ThumbsUp } from "lucide-react";
import useSWR, { mutate } from "swr";
import type { Review } from "@/interfaces/review";

interface ReviewSystemProps {
  workoutTitle: string;
  workoutDocumentId: string;
  initialReviews?: Review[];
}

type SortOption = "newest" | "helpful" | "highest" | "lowest";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReviewSystem({
  workoutTitle,
  workoutDocumentId,
  initialReviews,
}: ReviewSystemProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"}/api/reviews?filters[workout][documentId][$eq]=${workoutDocumentId}&sort=createdAt:desc&pagination[pageSize]=50`;

  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    fallbackData: initialReviews ? { data: initialReviews } : undefined,
  });

  const reviews: Review[] = useMemo(() => data?.data || [], [data]);
  const averageRating = reviews.length
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const sortedReviews = useMemo(() => {
    const list = [...reviews];
    switch (sortBy) {
      case "highest":
        return list.sort((a, b) => b.rating - a.rating || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "lowest":
        return list.sort((a, b) => a.rating - b.rating || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "helpful":
        return list.sort((a, b) => {
          const aKey = a.documentId || String(a.id);
          const bKey = b.documentId || String(b.id);
          const aCount = (a.helpful || 0) + (helpfulVotes[aKey] ? 1 : 0);
          const bCount = (b.helpful || 0) + (helpfulVotes[bKey] ? 1 : 0);
          return bCount - aCount || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      case "newest":
      default:
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [reviews, sortBy, helpfulVotes]);

  const toggleHelpful = (key: string) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-label={`Reviews for ${workoutTitle}`} className="mt-16 border-t border-white/10 pt-12">
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">

        {/* Reviews Summary and Form */}
        <div className="xl:w-1/3">
          <h2 className="text-3xl font-bold mb-4">Reviews</h2>

          <div className="flex items-center gap-4 mb-8">
            <div className="text-5xl font-black text-[#FF8C00]">{averageRating}</div>
            <div>
              <div className="flex text-[#FF8C00] mb-1" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(Number(averageRating)) ? "fill-current" : i === Math.round(Number(averageRating)) ? "fill-current opacity-50" : ""}`} />
                ))}
              </div>
              <p className="text-sm text-gray-300">Based on {reviews.length} reviews</p>
            </div>
          </div>

          <div className="bg-[#243447] p-5 sm:p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            {isSubmitted ? (
              <div className="p-4 bg-green-500/20 text-green-300 rounded-xl text-center font-medium">
                Thank you! Your review has been submitted successfully.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="block text-sm font-bold text-gray-300 mb-2">Rating</span>
                  <div className="flex flex-wrap gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        aria-label={`Rate ${star} out of 5 stars`}
                        aria-pressed={rating === star}
                        className={`bg-transparent border-none p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] cursor-pointer transition-colors ${star <= (hover || rating) ? "text-[#FF8C00]" : "text-gray-500"}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(rating)}
                      >
                        <Star className="h-7 w-7 sm:h-8 sm:w-8 fill-current" />
                      </button>
                    ))}
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
                  className="w-full py-3 bg-[#C25700] text-white rounded-xl font-bold hover:bg-[#A34600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="xl:w-2/3 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h3 className="text-xl font-bold">Recent Reviews</h3>
            <select
              aria-label="Sort reviews"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#243447] border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF8C00]"
            >
              <option value="newest">Newest</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>

          {isLoading && !initialReviews && <p className="text-gray-400">Loading reviews...</p>}
          {error && !initialReviews && <p className="text-red-400">Failed to load reviews.</p>}
          {!isLoading && !error && sortedReviews.length === 0 && (
            <p className="text-gray-300">No reviews yet. Be the first to review!</p>
          )}

          {sortedReviews.map((review) => {
            const reviewKey = review.documentId || String(review.id);
            const isVoted = Boolean(helpfulVotes[reviewKey]);
            const displayHelpful = (review.helpful || 0) + (isVoted ? 1 : 0);

            return (
              <div 
                key={review.id} 
                id={`review-${reviewKey}`} 
                className="bg-[#243447] p-5 sm:p-6 rounded-2xl border border-white/5 scroll-mt-24 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 bg-[#1B2B3B] rounded-full flex items-center justify-center text-[#FF8C00] font-black text-lg">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{review.name}</h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex text-[#FF8C00]" aria-label={`${review.rating} out of 5 stars`}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-current" : ""}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            timeZone: "UTC",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {review.content}
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => toggleHelpful(reviewKey)}
                    aria-pressed={isVoted}
                    className={`flex items-center gap-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] rounded-lg px-2 py-1 -ml-2 ${
                      isVoted ? "text-[#FF8C00] font-semibold" : "text-gray-300 hover:text-[#FF8C00]"
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({displayHelpful})
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
