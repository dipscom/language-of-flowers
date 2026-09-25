import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import AppRoute from "./components/App";

import "../styles/index.css";

createRoot(document.getElementById("app")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<AppRoute />} />
    </Routes>
  </BrowserRouter>,
);
