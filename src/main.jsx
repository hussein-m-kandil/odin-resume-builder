import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ResumeBuilder from "./components/ResumeBuilder";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResumeBuilder />
  </StrictMode>
);
