import { useOutletContext } from "react-router";

export interface ScrollContainerContext {
  /** Scrolls the shared container back to the top. */
  resetScroll: () => void;
  /** Mount point outside the scroller, for content that must not scroll. */
  footer: HTMLDivElement | null;
}

export default function useScrollContainer() {
  return useOutletContext<ScrollContainerContext>();
}
