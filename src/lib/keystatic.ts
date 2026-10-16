import config from "../../keystatic.config";

/**
 * GitHub mode needs the GitHub App's keys (see README). Local mode always works, and so does
 * `npm run dev`, where Keystatic itself shows the page that creates the GitHub App.
 */
export const keystaticReady =
  config.storage.kind === "local" ||
  process.env.NODE_ENV === "development" ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET &&
      process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
  );
