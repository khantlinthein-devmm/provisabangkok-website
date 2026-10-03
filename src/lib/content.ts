import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Markdown content in src/content, migrated from the original WordPress site.
// Each file starts with a front-matter block of `key: "json string"` lines.

const root = path.join(process.cwd(), "src", "content");

type FrontMatter = Record<string, string>;

function read(dir: string, slug: string) {
  const file = path.join(root, dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  // Normalise Windows line endings (git may check files out with CRLF).
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n?/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const data: FrontMatter = {};
  let body = raw;
  if (match) {
    for (const line of match[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) data[line.slice(0, i).trim()] = JSON.parse(line.slice(i + 1).trim());
    }
    body = match[2];
  }
  return { data, html: marked.parse(body, { async: false }) };
}

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  image?: string;
};

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(path.join(root, "posts"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => getPost(f.replace(/\.md$/, ""))!.meta)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getPost(slug: string) {
  const doc = read("posts", slug);
  if (!doc) return null;
  const { title, date, description = "", category = "", image } = doc.data;
  return { meta: { slug, title, date, description, category, image } as Post, html: doc.html };
}

export function getVisaHtml(slug: string) {
  return read("visas", slug)?.html ?? null;
}

export function getPageHtml(slug: string) {
  return read("pages", slug)?.html ?? null;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
