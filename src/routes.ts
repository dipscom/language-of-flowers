// Shared by the router, the share link and the send-bouquet function.
export const VIEW_BOUQUET_PATH = "/view-bouquet";

// Custom path of the Netlify function (a custom path is required for its rate
// limit). Duplicated as a literal in the function's `config.path`.
export const SEND_BOUQUET_ENDPOINT = "/api/send-bouquet";
