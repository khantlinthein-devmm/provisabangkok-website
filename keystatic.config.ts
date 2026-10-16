import { collection, config, fields } from "@keystatic/core";

// Blog editor at /keystatic. Locally it edits the files on disk; on the live site it
// saves each post as a commit to GitHub, and Vercel redeploys the site (about 1–2 minutes).
// Set NEXT_PUBLIC_KEYSTATIC_STORAGE=github locally to use GitHub mode (needed once, to create the GitHub App).

const images = { directory: "public/images/blog", publicPath: "/images/blog/" };
const useLocal =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "local" ||
  (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== "github");

export default config({
  storage: useLocal
    ? { kind: "local" }
    : { kind: "github", repo: { owner: "khantlinthein-devmm", name: "provisabangkok-website" } },
  ui: { brand: { name: "Pro Visa Bangkok" } },
  collections: {
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: { label: "URL", description: "The page address, e.g. retirement-visa-guide. Don't change it after publishing." },
        }),
        date: fields.date({ label: "Date", defaultValue: { kind: "today" }, validation: { isRequired: true } }),
        description: fields.text({
          label: "Summary",
          description: "One or two sentences. Shown on Google and in the blog list.",
          multiline: true,
          validation: { length: { max: 300 } },
        }),
        category: fields.text({ label: "Category", description: "For example: Retirement Visa, Work Permit, Visa Thailand" }),
        image: fields.image({ label: "Cover image", ...images }),
        content: fields.mdx({
          label: "Content",
          extension: "md",
          options: { image: images },
        }),
      },
    }),
  },
});
