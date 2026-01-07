import { useState } from "react";

import RepoInputForm from "../RepoInputForm/RepoInputForm";
import ReviewSection from "../ReviewSection/ReviewSection";
import "./ReviewBlock.css";

type ReviewResult = {
  review: string;
  score: number;
};

export default function ReviewBlock() {
  const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="review-block">
      <RepoInputForm
        onReviewReady={setReviewResult}
        clearReview={() => setReviewResult(null)}
        loading={isLoading}
        setLoading={setIsLoading}
      />

      <ReviewSection result={reviewResult} loading={isLoading} />
    </div>
  );
}
