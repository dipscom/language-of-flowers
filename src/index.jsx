import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(DrawSVGPlugin, ScrollToPlugin);

import AppRoute from "./components/App";

import "../styles/index.css";

createRoot(document.getElementById("app")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<AppRoute />} />
    </Routes>
  </BrowserRouter>,
);
