import React, { useState } from "react";
import { FaStar, FaUserCircle, FaThumbsUp, FaCheckCircle } from "react-icons/fa";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Alice Johnson",
      rating: 5,
      date: "Dec 1, 2024",
      comment: "Absolutely fresh and delicious! Will order again.",
      verified: true,
      likes: 12
    },
    {
      id: 2,
      user: "Bob Smith",
      rating: 4,
      date: "Nov 28, 2024",
      comment: "Good quality but delivery was a bit late.",
      verified: true,
      likes: 5
    }
  ]);

  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      user: "You",
      rating: newReview.rating,
      date: new Date().toLocaleDateString(),
      comment: newReview.comment,
      verified: true,
      likes: 0
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: "" });
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-all"
        >
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-xl animate-slideDown">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className={`text-2xl transition-colors ${
                    star <= newReview.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  <FaStar />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
              rows="3"
              placeholder="Share your experience..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-all"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-gray-400 text-3xl" />
                <div>
                  <p className="font-bold text-gray-900 flex items-center gap-2">
                    {review.user}
                    {review.verified && (
                      <span className="text-green-500 text-xs flex items-center gap-1">
                        <FaCheckCircle /> Verified Buyer
                      </span>
                    )}
                  </p>
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? "" : "text-gray-200"} />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-600 mb-3">{review.comment}</p>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
              <FaThumbsUp /> Helpful ({review.likes})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
