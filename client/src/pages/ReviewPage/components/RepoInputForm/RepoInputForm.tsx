import { useState } from "react";
import "./RepoInputForm.css";
import ReqSelector from "../ReqSelector/ReqSelector";
import { getReview } from "../../../../api/review";

export default function RepoInputForm({ onReviewReady }) {
  const [repoUrl, setRepoUrl] = useState(
    "https://github.com/dom1k11/code-template"
  );
  const [criteria, setCriteria] = useState([]);
  console.log(criteria);
  async function handleSend() {
    const review = await getReview(repoUrl, criteria);
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

      <ReqSelector criteria={criteria} onChangeCriteria={setCriteria} />

      <button className="btn btn-primary send-btn" onClick={handleSend}>
        Get review
      </button>
    </div>
  );
}
