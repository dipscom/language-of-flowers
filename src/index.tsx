import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "../styles/index.css"; // must come before component imports so shared styles load first

import AppRoute from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
