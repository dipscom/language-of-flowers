import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

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
