import ReviewCard from "../ReviewCard/ReviewCard";
import './ReviewList.css'
export default function ReviewList({ reviews }) {
  if (!reviews.length) {
    return <div className="no-reviews">No reviews yet.</div>;
  }

  return (
    <div className="review-list">
      {reviews.map((r, i) => (
        <ReviewCard key={i} review={r} index={i} />
      ))}
    </div>
  );
}
