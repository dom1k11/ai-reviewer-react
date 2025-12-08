import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import StatsPage from "./pages/StatsPage/StatsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { isLoggedIn } from "./helpers/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            isLoggedIn() ? <Navigate to="/app" replace /> : <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn() ? <Navigate to="/app" replace /> : <RegisterPage />
          }
        />
        <Route
          path="/app"
          element={
            isLoggedIn() ? <ReviewPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/stats"
          element={
            isLoggedIn() ? <StatsPage /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
