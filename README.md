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
| `src/content/posts/*.md` | Blog posts, edited at `/keystatic/` (English only, shown with a note in other languages). Cover images in `public/images/blog/<post>/` |
| `src/lib/site.ts` | Phone, email, address, LINE, WhatsApp, Facebook, the "25+ years" figures, **booking days and times** |
| `src/lib/visas.ts` | Visa order and header photos |
| `src/content/team.yaml` | Staff and group photos, edited at `/keystatic/` under **Team & photos** (images in `public/images/team/`) |
| `public/images/` | Photos |

## Blog editor (Keystatic)

Blog posts, and the staff and group photos (**Team & photos**), are edited at **`/keystatic/`** — no code needed. Sign in with GitHub, open **Blog posts**, then **Add**. Fill in the title, date, summary, category and cover image, write the post, and press **Save**. Each save is a commit to GitHub, and Vercel puts it live in 1–2 minutes. The URL is made from the title; don't change it after publishing.

Anyone who writes posts needs a GitHub account with write access to this repository (GitHub → Settings → Collaborators).

Running `npm run dev` locally, `/keystatic/` edits the files on disk instead.

### One-time setup (GitHub App)

1. Locally, add `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` to `.env.local`, run `npm run dev` and open http://localhost:3000/keystatic/.
2. Click **Create GitHub App**, give it a name (e.g. `provisabangkok-blog`) and create it. Keystatic writes four keys into `.env`: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
3. Install the app on the `provisabangkok-website` repository when GitHub asks.
4. In the GitHub App settings, add these callback URLs: `https://provisabangkok-website.vercel.app/api/keystatic/github/oauth/callback` and `https://provisabangkok.com/api/keystatic/github/oauth/callback`.
5. Copy the four keys into Vercel → Settings → Environment Variables (Production), then redeploy. Remove `NEXT_PUBLIC_KEYSTATIC_STORAGE` from `.env.local` afterwards.

Until the keys are set, `/keystatic/` on the live site shows "not set up yet"; the rest of the site works normally.

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

The form posts to `/api/contact/` (`src/app/api/contact/route.ts`), which emails the message to `support@provisabangkok.com` through Hostinger SMTP. Replying to the email goes straight to the visitor.

Set these environment variables (locally in `.env.local`, see `.env.example`; on the host in its project settings):

| Variable | Value |
| --- | --- |
| `SMTP_USER` | `support@provisabangkok.com` |
| `SMTP_PASS` | the mailbox password from Hostinger |

If sending fails, the visitor is shown the email address to write to instead.

## Deploy

The easiest option is Vercel: import the GitHub repo and use the default settings.
