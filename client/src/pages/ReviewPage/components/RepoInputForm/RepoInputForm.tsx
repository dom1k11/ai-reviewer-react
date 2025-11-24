import { useState } from "react";
import "./RepoInputForm.css";
import ReqSelector from "../ReqSelector/ReqSelector";
import { getReview } from "../../../../api/review";

export default function RepoInputForm({ onReviewReady }) {
  const [repoUrl, setRepoUrl] = useState(
    "https://github.com/dom1k11/code-template"
  );

  async function handleSend() {
    console.log("Send request:", repoUrl);
    const review = await getReview(repoUrl); //TODO Send requirements from ReqSelector
    onReviewReady(review);
  }

  return (
    <div className="req-selector">
      <h2>Get your code review</h2>

      <label htmlFor="repo-input">Your repository:</label>
      <input
        id="repo-input"
        className="form-control"
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <ReqSelector></ReqSelector>
      <button className="btn btn-primary send-btn" onClick={handleSend}>
        Get review
      </button>
    </div>
  );
}
