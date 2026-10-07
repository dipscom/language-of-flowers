import type { FlipKind } from "./pageFlip";

// The pages in the order they are visited. Moving to an earlier one is going
// back, however it happens: a button, or the browser's back or forward.
const JOURNEY = ["/", "/build-bouquet", "/details", "/success"];

export function flipFor(from: string, to: string): FlipKind {
  const was = JOURNEY.indexOf(from);
  const now = JOURNEY.indexOf(to);
  return was !== -1 && now !== -1 && now < was ? "back" : "forward";
}
