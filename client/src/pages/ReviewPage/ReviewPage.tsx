import Header from "../../components/Header/Header";
import ReviewBlock from "./components/ReviewBlock/ReviewBlock";
import { useEffect } from "react";
import { mainOnboarding } from "../../utils/onboarding/mainOnboarding";
const ReviewPage = () => {
  useEffect(() => {
    if (!localStorage.getItem("onboarded")) {
      mainOnboarding();
      localStorage.setItem("onboarded", "true");
    }
  }, []);

  return (
    <>
      <Header></Header>;<ReviewBlock></ReviewBlock>
    </>
  );
};

export default ReviewPage;
