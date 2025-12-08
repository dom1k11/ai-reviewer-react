import { useState } from "react";

import RepoInputForm from "../RepoInputForm/RepoInputForm";
import ReviewSection from "../ReviewSection/ReviewSection";
import "./ReviewBlock.css";

export default function ReviewBlock() {
  const [reviewResult, setReviewResult] = useState<{
    review: string;
    score: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="review-block">
      <RepoInputForm
        onReviewReady={setReviewResult}
        setLoading={setIsLoading}
      />

      <ReviewSection result={reviewResult} loading={isLoading} />
    </div>
  );
}
