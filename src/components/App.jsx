import { useEffect, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router";
import flowers from "../data/flowers";
import products from "../data/products";
import Background from "./Background";
import Overlay from "./Overlay";
import Introduction from "./Introduction";
import Description from "./Description";
import Form from "./Form";
import Confirmation from "./Confirmation";
import Success from "./Success";
import MyBouquet from "./MyBouquet";
import Share from "./Share";
import { AppStateProvider } from "../state/AppStateContext";

function App({ location }) {
  return (
    <div id="container">
      <Background location={location} />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/description" element={<Description />} />
        <Route path="/buildbouquet" element={<Form />} />
        <Route path="/viewbouquet" element={<Form />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/success" element={<Success />} />
        <Route path="/mybouquet" element={<MyBouquet />} />
        <Route path="/share" element={<Share />} />
        <Route path="*" element={<Introduction />} />
      </Routes>
      <Overlay />
    </div>
  );
}

// Reads the bouquet/recipient/sender query string used for shared-bouquet
// links (?bouquet=...&name=...&email=...&sender=...) and bounces back to "/"
// when it's missing or incomplete on a deep-linked, non-root path.
export default function AppRoute() {
  const location = useLocation();
  const navigate = useNavigate();

  const { initialOverrides, needsRedirect } = useMemo(() => {
    const query = new URLSearchParams(location.search);
    if ([...query.keys()].length !== 0) {
      if (
        query.get("bouquet") &&
        query.get("name") &&
        query.get("email") &&
        query.get("sender")
      ) {
        return {
          initialOverrides: {
            bouquet: query.get("bouquet").split(","),
            recipient: {
              name: query.get("name"),
              email: query.get("email"),
            },
            sender: { name: query.get("sender") },
            steps: { current: 0 },
          },
          needsRedirect: false,
        };
      }
      return {
        initialOverrides: null,
        needsRedirect: location.pathname !== "/",
      };
    }
    return { initialOverrides: null, needsRedirect: location.pathname !== "/" };
    // Only re-derive when the query string itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    if (needsRedirect) {
      navigate("/", { replace: true });
    }
  }, [needsRedirect, navigate]);

  return (
    <AppStateProvider
      flowers={flowers}
      products={products}
      overrides={initialOverrides}
    >
      <App location={location} />
    </AppStateProvider>
  );
}
