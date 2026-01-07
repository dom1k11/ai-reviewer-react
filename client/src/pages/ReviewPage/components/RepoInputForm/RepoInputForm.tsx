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
  clearReview: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const defaultError = "Something went wrong.";

export default function RepoInputForm({
  onReviewReady,
  clearReview,
  loading,
  setLoading,
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

    setError(null);
    clearReview();
    setLoading(true);

    try {
      const review = await getReview(repoUrl, criteria);
      onReviewReady(review);
    } catch (err: any) {
      setError(err?.message || defaultError);
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
        disabled={loading}
        onChange={(e) => {
          setRepoUrl(e.target.value);
          if (error) setError(null);
        }}
      />

      {error && <div className="error-text">{error}</div>}

      <ReqSelector criteria={criteria} onChangeCriteria={setCriteria} />

      <button
        type="button"
        className="btn btn-primary send-btn"
        onClick={handleSend}
        disabled={!loggedIn || loading}
      >
        {loading
          ? "Reviewing..."
          : loggedIn
          ? "Get review"
          : "Login to get review"}
      </button>
    </div>
  );
}
