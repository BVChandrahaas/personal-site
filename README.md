# chandrahaas.dev

Personal site built with Next.js (App Router) + Tailwind CSS v4. Blog posts are plain markdown files with frontmatter, no CMS needed.

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Structure

- `app/page.tsx` — homepage (hero, about, experience, publications, projects, blog preview, contact)
- `app/blog/page.tsx` — blog listing
- `app/blog/[slug]/page.tsx` — individual article page (serif editorial layout)
- `content/blog/*.md` — articles, written in markdown with frontmatter (title, date, readTime, tag, excerpt)
- `lib/blog.ts` — reads and parses markdown files
- `components/` — Nav and Card, shared across pages
- `app/globals.css` — design tokens (colors, light/dark mode, typography)

## Adding a new article

Create a new file in `content/blog/your-slug.md`:

```md
---
title: "Your title"
date: "2026-09-01"
readTime: "5 min"
tag: "ML systems"
excerpt: "One-line summary shown on the listing page."
---

Your article content in markdown.
```

It will automatically appear on `/blog` and the homepage's "Latest articles" strip (top 3, sorted by date).

## Customizing

- Update experience, publications, and project cards directly in `app/page.tsx`
- Update contact links/email in the `#contact` section of `app/page.tsx`
- Add your resume PDF to `public/resume.pdf` (the homepage already links to it)
- Update GitHub/LinkedIn URLs in `components/Nav.tsx` is not needed — those live in `app/page.tsx`'s hero section

## Deploying

Push to GitHub and import the repo on [vercel.com](https://vercel.com) — zero config needed, it will detect Next.js automatically.
