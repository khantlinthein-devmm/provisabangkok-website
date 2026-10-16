import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { parse as parseYaml } from "yaml";

// Markdown content in src/content, migrated from the original WordPress site.
// Each file starts with a YAML front-matter block. Blog posts are edited with Keystatic (/keystatic/).

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
    const parsed: Record<string, unknown> = parseYaml(match[1]) ?? {};
    for (const [key, value] of Object.entries(parsed)) if (value != null) data[key] = String(value);
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

/** Visa page body in the requested language (falling back to English), with ids on its h2 sections. */
export function getVisaContent(slug: string, lang: string) {
  const html = (read(`visas/${lang}`, slug) ?? read("visas/en", slug))?.html ?? "";
  const headings: { id: string; text: string }[] = [];
  const withIds = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const id = `section-${headings.length + 1}`;
    headings.push({ id, text: inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim() });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: withIds, headings };
}
