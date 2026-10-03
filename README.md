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

All content lives in `src/lib/`. You don't need to touch the page code to change it:

| File | What it holds |
| --- | --- |
| `src/lib/site.ts` | Business name, phone, email, address, opening hours, WhatsApp, navigation |
| `src/lib/visas.ts` | Visa pages (Thailand Privilege, Retirement, LTR, Education, Muay Thai, SMART, Follower) |
| `src/lib/services.ts` | Additional services list |
| `src/lib/posts.ts` | Blog articles |

Visa pages and blog posts are served at top-level URLs such as `/retirement-visa/`, the same as the original WordPress site, so existing links and SEO keep working.

## Pages

- `/` Home
- `/visas/` all visas, plus one page per visa at `/<slug>/`
- `/services/`, `/about/`, `/contact/`, `/blog/`
- `/o-retirement-visas-features-comparison-chart/`
- `/sitemap.xml`, `/robots.txt`

## Contact form

There's no backend yet. The form opens the visitor's email app with the message filled in, addressed to the email in `site.ts`. To receive submissions directly, connect a service such as Formspree or Resend, or add a Next.js route handler.

## Deploy

The easiest option is Vercel: import the GitHub repo and use the default settings.
