import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "@fontsource-variable/fraunces/wght.css";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-700.css";
import "@fontsource/poppins/latin-ext-400.css";
import "@fontsource/poppins/latin-ext-700.css";

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
