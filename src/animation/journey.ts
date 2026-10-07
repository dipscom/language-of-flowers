import type { FlipKind } from "./pageFlip";
import {
  BUILD_BOUQUET_PATH,
  DETAILS_PATH,
  INTRODUCTION_PATH,
  SUCCESS_PATH,
} from "../routes";

// The pages in the order they are visited. Moving to an earlier one is going
// back, however it happens: a button, or the browser's back or forward.
const JOURNEY = [
  INTRODUCTION_PATH,
  BUILD_BOUQUET_PATH,
  DETAILS_PATH,
  SUCCESS_PATH,
];

export function flipFor(from: string, to: string): FlipKind {
  const was = JOURNEY.indexOf(from);
  const now = JOURNEY.indexOf(to);
  return was !== -1 && now !== -1 && now < was ? "back" : "forward";
}
