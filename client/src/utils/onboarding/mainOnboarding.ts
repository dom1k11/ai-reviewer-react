import introJs from "intro.js";
import "intro.js/introjs.css";

export function mainOnboarding() {
  const steps: any[] = [
    {
      intro: "Welcome! Let's take a quick tour.",
    },
  ];

  if (document.querySelector("#req-selector")) {
    steps.push({
      element: "#req-selector",
      intro: "This is the main section of requesting the review",
    });
  }
  if (document.querySelector("#presets")) {
    steps.push({
      element: "#presets",
      intro: "You can customize your review style",
    });
  }
  if (document.querySelector("#review-section")) {
    steps.push({
      element: "#review-section",
      intro: "Here you will see your detailed review",
    });
  }
  if (document.querySelector("#repo-input")) {
    steps.push({
      element: "#repo-input",
      intro: "Enter your github repository and get the review!",
    });
  }

  introJs()
    .setOptions({
      steps,
      showProgress: true,
      hidePrev: true,
      showStepNumbers: false,
      overlayOpacity: 0.6,
      exitOnOverlayClick: false,
      nextLabel: "Next →",
      prevLabel: "← Back",
      doneLabel: "Got it!",
    })
    .start();
}
