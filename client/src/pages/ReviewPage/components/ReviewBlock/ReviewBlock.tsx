import ReqSelector from "../ReqSelector/ReqSelector";
import ReviewSection from "../ReviewSection/ReviewSection";
import "./ReviewBlock.css";

export default function ReviewBlock() {
  return (
    <div className="review-block">
      <ReqSelector />
      <ReviewSection />
    </div>
  );
}
