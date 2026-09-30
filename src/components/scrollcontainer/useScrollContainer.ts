import { useOutletContext } from "react-router";

export interface ScrollContainerContext {
  /** Scrolls the shared container back to the top. */
  resetScroll: () => void;
}

export default function useScrollContainer() {
  return useOutletContext<ScrollContainerContext>();
}
