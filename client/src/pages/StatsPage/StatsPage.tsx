import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { fetchReviews } from "../../api/review";
import ReviewList from "./components/ReviewList/ReviewList";
import { getUserId } from "../../helpers/auth";

export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  async function load() {
    setLoading(true);
    const userId = getUserId();
    const data = await fetchReviews(userId);

    setReviews(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Header />

      <div className="stats-container">
        {loading && <div className="loader">Loading...</div>}
        {!loading && <ReviewList reviews={reviews} />}
      </div>
    </>
  );
}
