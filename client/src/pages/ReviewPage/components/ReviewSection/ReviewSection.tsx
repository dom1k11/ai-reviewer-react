import "./ReviewSection.css";
import ReactMarkdown from "react-markdown";
import Loader from "../../../../components/Loader/Loader";
export default function ReviewSection({ result, loading }) {
  if (loading) {
    return (
      <div className="review-section review-loading">
        <Loader size="lg" color="primary" />
      </div>
    );
  }

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
