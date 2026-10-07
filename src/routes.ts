// Shared by the router, the share link and the send-bouquet function.
export const INTRODUCTION_PATH = "/";
export const BUILD_BOUQUET_PATH = "/build-bouquet";
export const DETAILS_PATH = "/details";
export const VIEW_BOUQUET_PATH = "/view-bouquet";
export const SUCCESS_PATH = "/success";

// Every routed page other than the Introduction, which is also the fallback
// for any path not listed here.
const OTHER_PATHS = [
  BUILD_BOUQUET_PATH,
  DETAILS_PATH,
  VIEW_BOUQUET_PATH,
  SUCCESS_PATH,
];

export function isIntroductionPath(pathname: string) {
  return !OTHER_PATHS.includes(pathname);
}

// Custom path of the Netlify function (a custom path is required for its rate
// limit). Duplicated as a literal in the function's `config.path`.
export const SEND_BOUQUET_ENDPOINT = "/api/send-bouquet";

// External page about floriography, linked from the bouquet details.
export const FLORIOGRAPHY_URL =
  "https://en.wikipedia.org/wiki/Language_of_flowers";
