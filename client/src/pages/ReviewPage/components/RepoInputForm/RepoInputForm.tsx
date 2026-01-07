import { useState } from "react";
import "./RepoInputForm.css";
import ReqSelector from "../ReqSelector/ReqSelector";
import { getReview } from "../../../../api/review";
import { isLoggedIn } from "../../../../helpers/auth";
import { validateRepoUrlClient } from "../../validator/repoUrl";
type ReviewResult = {
  review: string;
  score: number;
};

type RepoInputFormProps = {
  onReviewReady: (review: ReviewResult) => void;
  setLoading: (loading: boolean) => void;
    clearReview: () => void;
};

const default_error = "Something went wrong.";

export default function RepoInputForm({
  onReviewReady,
  setLoading,
  clearReview,

}: RepoInputFormProps) {
  const loggedIn = isLoggedIn();

  const [repoUrl, setRepoUrl] = useState(
    "https://github.com/dom1k11/code-template"
  );
  const [criteria, setCriteria] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    const validationError = validateRepoUrlClient(repoUrl);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setError(null);
      clearReview();
      setLoading(true);
      const review = await getReview(repoUrl, criteria);
      onReviewReady(review);
    } catch (err: any) {
      if (err.status === 413) {
        setError(err.message || default_error);
      } else if (err.status === 404) {
        setError(err.message || default_error);
      } else {
        setError(err.message || default_error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="req-selector" id="req-selector">
      <h2>Get your code review</h2>

      <label htmlFor="repo-input">Your repository:</label>
      <input
        id="repo-input"
        className={`form-control ${error ? "is-invalid" : ""}`}
        type="text"
        value={repoUrl}
        onChange={(e) => {
          setRepoUrl(e.target.value);
          if (error) setError(null);
        }}
      />

      {error && <div className="error-text">{error}</div>}

      <ReqSelector criteria={criteria} onChangeCriteria={setCriteria} />

      <button
        className="btn btn-primary send-btn"
        onClick={handleSend}
        disabled={!loggedIn}
      >
        {loggedIn ? "Get review" : "Login to get review"}
      </button>
    </div>
  );
}
