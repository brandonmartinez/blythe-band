# AGENTS.md — blythe-band.com

An **archive site**. blythe was a Christian rock band from Ludington, Michigan,
active 2005–2007. This repo republishes their original website — which ran on
Ruby on Rails 1.1 with a Flash audio player and went offline in February 2008 —
as a static page.

## The rule that matters most

**Do not invent content.** Every news post, show, biography, thank you, track,
and photo on this page came out of the band's own MySQL database
(`data/production-export.json`) or their deployed files. The lowercase styling,
the typos, and the phrasing are theirs. Editorial voice is confined to the
"the story of this page" section and the short section intros.

If you need to add something the band didn't write, mark it clearly as such.

## Provenance

| Thing                     | Source                                                              |
| ------------------------- | ------------------------------------------------------------------- |
| News, shows, bios, audio metadata, thank yous, blog | `db/production.sql` from the deployed Rails app |
| MP3s                      | `public/mp3/0{1..4}-*.mp3` from the deployed app                     |
| Photos                    | `public/pictures/` — full size plus `_t` thumbnails                 |
| Header art, logo          | `public/images/top.jpg`, `logo.psd` (flattened to PNG)               |
| Domain dates              | GoDaddy receipts — registered ~Feb 2006, cancelled 2008-02-09        |

`data/production-export.json` is the parsed export, kept for provenance. It is
**not** read at build time — `src/index.html` is a normal static file that was
generated from it once and is hand-editable now.

## What was deliberately left out

- **The guestbook.** 45 entries, each carrying a real email address. Not
  republished.
- **The `users` table.** SHA-1 password hashes for the band's admin logins.
- **Middle names.** The `bios` table stored each member's full legal name
  (e.g. "joshua ollie dumas"). The site publishes **first and last name only**.
  These are living people and this repo is public. Do not restore middle names,
  even though they are in `data/production-export.json`.
- Any third-party contact detail.

Keep it that way.

## The one non-blythe track

`src/audio/when-youre-no-where-youre-now-here.mp3` is **not a blythe song** — it
is a solo recording by **Joshua Dumas**, who joined blythe in 2006. The file
sat misfiled in the Lost in Sanity Logic archive for twenty years and was
briefly published on lostinsanity.net before the misattribution was caught.

It is hosted here, in its own boxed-off block at the end of the music section,
explicitly labelled "not a blythe song" and credited to him. Do not fold it into
the black e.p. track list and do not drop the credit line.

## Build

Static HTML + Tailwind v4, compiled by a local CLI build, published to GitHub
Pages by `.github/workflows/deploy.yml`.

```sh
npm install
npm run dev     # vite on :4173 with Tailwind watching
npm run build   # emits _site/
```

- **No framework.** No React, no bundler, no CMS. Vite is a dev server only; the
  build is `cp -R src/. _site/`.
- The dependency budget is three dev dependencies: `@tailwindcss/cli`,
  `concurrently`, `vite`. `npm audit` must report zero.
- **Everything under `src/` ships; nothing outside it does.**
- Tailwind output lands at `src/styles.css` (gitignored) so
  `<link href="/styles.css">` resolves identically in dev and in production.
- **Tailwind is v4** — the entry point is `@import "tailwindcss";` and there is
  no `tailwind.config.js`. Customization goes in `@theme`. Don't reintroduce v3's
  `@tailwind base/components/utilities` + `content` glob.
- `CNAME` is load-bearing and is copied into `_site/` by the build.
- **The page must work without JavaScript.** There is none today; keep it that
  way. Audio uses the native `<audio>` element.

## Deploying

The Pages source must be set to Actions, not a branch:

```sh
gh api -X PUT /repos/brandonmartinez/blythe-band/pages -f build_type=workflow
```

Push over the SSH remote (`git@github.com:...`); the HTTPS remote resolves to the
wrong GitHub account on the owner's machine.
