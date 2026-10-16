import config from "../../keystatic.config";

/** GitHub mode needs the GitHub App's keys (see README). Local mode always works. */
export const keystaticReady =
  config.storage.kind === "local" ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET &&
      process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
  );
