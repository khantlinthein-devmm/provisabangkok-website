import { collection, config, fields, singleton } from "@keystatic/core";

// Blog editor at /keystatic. Locally it edits the files on disk; on the live site it
// saves each post as a commit to GitHub, and Vercel redeploys the site (about 1–2 minutes).
// Set NEXT_PUBLIC_KEYSTATIC_STORAGE=github locally to use GitHub mode (needed once, to create the GitHub App).

const images = { directory: "public/images/blog", publicPath: "/images/blog/" };
const teamImages = { directory: "public/images/team", publicPath: "/images/team/" };
const useLocal =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "local" ||
  (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== "github");

export default config({
  storage: useLocal
    ? { kind: "local" }
    : { kind: "github", repo: { owner: "khantlinthein-devmm", name: "provisabangkok-website" } },
  ui: { brand: { name: "Pro Visa Bangkok" } },
  singletons: {
    team: singleton({
      label: "Team & photos",
      path: "src/content/team",
      format: { data: "yaml" },
      schema: {
        staff: fields.array(
          fields.object({
            photo: fields.image({ label: "Photo", description: "Portrait (taller than wide) works best.", validation: { isRequired: true }, ...teamImages }),
            name: fields.text({ label: "Name", validation: { length: { min: 1 } } }),
            role: fields.text({ label: "Role", description: "For example: Visa Consultant" }),
          }),
          {
            label: "Staff",
            description: "Shown in the Our team section of the About page. Drag to change the order.",
            itemLabel: (props) => props.fields.name.value || "New person",
          },
        ),
        groupPhotos: fields.array(
          fields.object({
            photo: fields.image({ label: "Photo", validation: { isRequired: true }, ...teamImages }),
            caption: fields.text({ label: "Caption", description: "Optional. Describes the photo for Google and screen readers." }),
          }),
          {
            label: "Group and office photos",
            description: "Shown on the home page photo strip and the Customers page. Drag to change the order.",
            itemLabel: (props) => props.fields.caption.value || "Photo",
          },
        ),
      },
    }),
  },
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
