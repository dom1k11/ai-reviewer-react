import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./StatsPage.css";

export default function StatsPage() {
  const [loading, setLoading] = useState(true);

  async function fetchReviews() {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 700));
    setLoading(false);
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <Header />

      <div className="stats-container">
        <h2>Your Reviews</h2>

        {loading && <div className="loader">Loading...</div>}

        <p className="empty-msg">No reviews yet</p>
      </div>
    </>
  );
}
