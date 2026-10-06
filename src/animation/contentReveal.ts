// Page content stays hidden behind the initial-load animation, which also
// plays the reveals of whatever is on the page at that time. Components that
// mount later (e.g. after a route change) play their own reveal straight away.
let revealed = false;

export function markContentRevealed() {
  revealed = true;
}

export function isContentRevealed() {
  return revealed;
}
