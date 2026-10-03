# Pro Visa Bangkok — Website

Website for [Pro Visa Bangkok](https://provisabangkok.com), a Thailand visa consultant, built with **Next.js (App Router) + TypeScript + Tailwind CSS**. Every page is statically generated.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Languages

The site is in English, Thai, Russian, Chinese (Simplified) and Korean.

- English keeps the original URLs: `/retirement-visa/`
- Other languages add a prefix: `/th/retirement-visa/`, `/ru/…`, `/zh/…`, `/ko/…`

`src/proxy.ts` maps un-prefixed URLs to the English pages. All pages live under `src/app/[lang]/`.

## Editing content

| Where | What it holds |
| --- | --- |
| `src/i18n/dictionaries/en.ts` | All English text: menus, home page, visa summaries and facts, tools, checklists. The other languages (`th.ts`, `ru.ts`, `zh.ts`, `ko.ts`) have exactly the same structure, and TypeScript flags any missing key. |
| `src/content/visas/<lang>/*.md` | Full text of each visa page, per language (falls back to English if a file is missing) |
| `src/content/posts/*.md` | Blog posts (English only, shown with a note in other languages) |
| `src/lib/site.ts` | Phone, email, address, LINE, WhatsApp, Facebook, the "25+ years" figures, **booking days and times** |
| `src/lib/visas.ts` | Visa order and header photos |
| `src/lib/testimonials.ts` | Customer photo list |
| `public/images/` | Photos |

To add a blog post, copy any file in `src/content/posts/`, change the top block and the text, and save it under a new file name. The file name becomes the URL.

Old URLs such as `/blog-2/` redirect (see `next.config.ts`).

## Free tools

All tools run in the visitor's browser. Nothing is sent until the visitor chooses to message you.

| URL | Tool |
| --- | --- |
| `/find-your-perfect-visa/` | Visa Finder: 4 questions, recommends up to 3 visas (logic in `components/tools/VisaFinder.tsx`) |
| `/visa-funds-checker/` | Checks savings and income against the retirement, O-X and marriage visa rules |
| `/document-checklist/` | Printable checklist per visa; ticks are saved on the device |
| `/90-day-report-calculator/` | 90-day report dates and a calendar file (.ics) |
| `/book-consultation/` | Pick a day, time and meeting type; sends the request by WhatsApp or email |

## Pages

- `/` Home, `/service/` all visas, one page per visa at `/<slug>/`, `/tools/`
- `/about/`, `/customer/`, `/blog/` (21 posts at `/<slug>/`), `/contact-us/`, `/privacy-policy-2/`
- `/sitemap.xml` (all languages, with hreflang), `/robots.txt`

## Contact form

There's no backend yet. The form opens the visitor's email app with the message filled in, addressed to the email in `site.ts`. To receive submissions directly, connect a service such as Formspree or Resend, or add a Next.js route handler.

## Deploy

The easiest option is Vercel: import the GitHub repo and use the default settings.
