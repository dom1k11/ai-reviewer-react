import "./ReviewSection.css";

export default function ReviewSection() {
  return (
    <div className="review-section">
      <>
        <h2>Review Result</h2>
        <div className="review-body">
          {/* parsed score */}
          <p>
            <strong>Score:</strong> ??
          </p>
        </div>
      </>
    </div>
  );
}
