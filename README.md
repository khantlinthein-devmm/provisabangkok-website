# Pro Visa Bangkok — Website

Website for [Pro Visa Bangkok](https://provisabangkok.com), a Thailand visa consultant, built with **Next.js (App Router) + TypeScript + Tailwind CSS**. Every page is statically generated.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Editing content

The text, photos and blog posts were migrated from the original WordPress site.

| Where | What it holds |
| --- | --- |
| `src/lib/site.ts` | Phone, email, address, LINE, WhatsApp, Facebook, the "25+ years" figures, navigation |
| `src/lib/visas.ts` | Visa list: titles, short summaries, the "At a glance" facts, header photos |
| `src/content/visas/*.md` | Full text of each visa page (Markdown) |
| `src/content/posts/*.md` | Blog posts (Markdown, with title, date and image at the top) |
| `src/lib/services.ts` | "We go beyond just visa processing" services |
| `src/lib/testimonials.ts` | Client reviews and the customer photo list |
| `public/images/` | Photos (customer photos are in `public/images/customers/`) |

To add a blog post, copy any file in `src/content/posts/`, change the top block and the text, and save it under a new file name. The file name becomes the URL.

All URLs match the original site, for example `/retirement-visa/`, `/contact-us/` and `/customer/`, so links from Google keep working. Old URLs such as `/blog-2/` and `/find-your-perfect-visa/` redirect (see `next.config.ts`).

## Pages

- `/` Home
- `/service/` all visas and additional services, plus one page per visa at `/<slug>/`
- `/about/`, `/customer/`, `/blog/` (with 21 posts at `/<slug>/`), `/contact-us/`, `/privacy-policy-2/`
- `/sitemap.xml`, `/robots.txt`

## Contact form

There's no backend yet. The form opens the visitor's email app with the message filled in, addressed to the email in `site.ts`. To receive submissions directly, connect a service such as Formspree or Resend, or add a Next.js route handler.

## Deploy

The easiest option is Vercel: import the GitHub repo and use the default settings.
