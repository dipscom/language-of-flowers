import { useLayoutEffect } from "react";
import { useOutletContext } from "react-router";

export interface ScrollContainerContext {
  /** Scrolls the shared container back to the top. */
  resetScroll: () => void;
  /** Shrinks or restores the logo at the top of the shared container. */
  setSmallLogo: (small: boolean) => void;
}

export default function useScrollContainer() {
  return useOutletContext<ScrollContainerContext>();
}

/** Shrinks the shared logo while the calling component is mounted. */
export function useSmallLogo() {
  const { setSmallLogo } = useScrollContainer();

  // A layout effect so the logo changes size in the same frame as the route.
  useLayoutEffect(() => {
    setSmallLogo(true);
    return () => setSmallLogo(false);
  }, [setSmallLogo]);
}
