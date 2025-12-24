import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./ReviewCard.css";

type ReviewCardProps = {
  review: {
    review: string;
    score: number;
  };
  index: number;
};

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);

  const text = review.review;
  const shortText = text.length > 200 ? text.slice(0, 200) + "..." : text;

  return (
    <div className="review-card">
      <div className="review-header">
        <h3 className="review-title">Review #{index + 1}</h3>
        <span className="review-score">{review.score} pts</span>
      </div>

      <div className="review-text md-content markdown-body">
        <ReactMarkdown>
          {expanded ? text : shortText}
        </ReactMarkdown>
      </div>

      {text.length > 200 && (
        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
