"use client";
import { useState } from "react";
import ReviewCard from "@/components/reviews/review-card";
import { useGetReviewsListQuery } from "@/store/services";

const ratings: number[] = [5, 4, 3, 2, 1]; // Ensure ratings are numbers

export default function Reviews() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const { data, error, isLoading } = useGetReviewsListQuery({
    id: 36, // Replace with the appropriate coach ID
    page: 1, // Adjust as needed for pagination
    limit: 10, // Adjust as needed for pagination
  });

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Failed to load reviews.</p>;

  // Filtering reviews by selected rating
  const filteredReviews = selectedRating
    ? data?.data.reviews.filter((review: any) => {
        return +review.rating === selectedRating;
      })
    : data?.data.reviews;

  console.log("filtered data", filteredReviews);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">My Reviews</h1>
      <div className="flex space-x-2 mb-8">
        <button
          className={`px-4 py-2 rounded ${
            selectedRating === null ? "bg-[#121E31] text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedRating(null)}
        >
          All
        </button>
        {ratings.map((rating) => (
          <button
            key={rating}
            className={`px-4 py-2 rounded ${
              selectedRating === rating
                ? "bg-[#121E31] text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedRating(rating)}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews?.map((review, index) => (
          <ReviewCard
            key={index}
            orderId={review.order_id}
            date={review.createdAt}
            name={review?.user?.fullName}
            rating={review.rating}
            service={review.service}
            review={review.review_text}
          />
        ))}
      </div>
      {filteredReviews && filteredReviews.length > 0 && (
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 bg-[#121E31] text-white rounded-lg">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
