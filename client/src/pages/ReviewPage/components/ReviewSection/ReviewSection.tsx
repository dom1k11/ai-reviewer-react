import "./ReviewSection.css";
import ReactMarkdown from "react-markdown";
export default function ReviewSection({ result }) {
  if (!result) {
    return (
      <div className="review-section">
        <h2>Review Result</h2>
        <p>No review yet.</p>
      </div>
    );
  }

  return (
    <div className="review-section">
      <h2>Review Result</h2>

      <div className="review-body markdown-body">
        <ReactMarkdown>{result.review}</ReactMarkdown>

        <p>
          <strong>Score:</strong> {result.score}
        </p>
      </div>
    </div>
  );
}
