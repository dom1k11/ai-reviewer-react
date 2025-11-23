import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import StatsPage from "./pages/StatsPage/StatsPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<ReviewPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
