import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <main className="welcome">
      <div className="welcome-box">
        <h1 className="title">AI Reviewer</h1>
        <p className="subtitle">Get structured code review from AI</p>

        <Link to="/app">
          <button className="start-btn btn btn-light btn-lg">
            Get started
          </button>
        </Link>
      </div>
    </main>
  );
}
