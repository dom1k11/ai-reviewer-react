import { useState } from "react";

import RepoInputForm from "../RepoInputForm/RepoInputForm";
import ReviewSection from "../ReviewSection/ReviewSection";
import "./ReviewBlock.css";

export default function ReviewBlock() {
  const [reviewResult, setReviewResult] = useState(null);
  return (
    <div className="review-block">
      <RepoInputForm onReviewReady={setReviewResult} />
      <ReviewSection result={reviewResult} />
    </div>
  );
}
