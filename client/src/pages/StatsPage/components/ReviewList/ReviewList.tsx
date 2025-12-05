import ReviewCard from "../ReviewCard/ReviewCard";
import "./ReviewList.css";

type Review = {
  review: string;
  score: number;
};

type ReviewListProps = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: ReviewListProps) {
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
