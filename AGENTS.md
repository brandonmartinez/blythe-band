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

| Thing                                               | Source                                                                                                                      |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| News, shows, bios, audio metadata, thank yous, blog | `db/production.sql` from the deployed Rails app                                                                             |
| the black e.p. MP3s                                 | `public/mp3/0{1..4}-*.mp3` from the deployed app (2006 96 kbps encodes, unmodified)                                         |
| the e.p. MP3s                                       | `/Volumes/Audio/Logic/Archives/blythe/Mixdowns/*.wav`, dated 2007-06-26 — converted to LAME V2 in 2026, otherwise untouched |
| Audio hosting                                       | Azure Blob, container `blythe` on `martinezmediaclients` — nothing audio ships in this repo (see "Audio & the player")      |
| Cover art                                           | `Artwork/CD Covers/ep - 001.jpg` and `The EP.jpg`, resized to 800px                                                         |
| Flyer PDF                                           | `public/pdf/20060414.pdf` from the deployed app                                                                             |
| Show video                                          | 5 YouTube embeds, uploaded 2018-10-15 from two DVDs burned in 2005–06                                                       |
| Photos                                              | `public/pictures/` — full size plus `_t` thumbnails                                                                         |
| Header art, logo                                    | `public/images/top.jpg`, `logo.psd` (flattened to PNG)                                                                      |
| Domain dates                                        | GoDaddy receipts — registered ~Feb 2006, cancelled 2008-02-09                                                               |

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

## the e.p. — the part that is not a restoration

Everything else on this page was recovered _from the website_. `the e.p.` was
not: four mixdowns dated **2007-06-26** that were never posted, never pressed,
and never online until 2026. Two are new songs (_the beginning_, _when we
fall_); two are re-recordings of black e.p. tracks with Ollie on vocals
(_egotistic lover_, _someone to help_). The site's audio player was already
throwing 500s by then, which is why they never made it up.

Source is the WAV masters in `/Volumes/Audio/Logic/Archives/blythe/Mixdowns/`.
Do not re-encode from the MP3s in this repo — go back to the WAVs.

Not published from that folder: `Beg - 1.wav`, an alternate take of _the
beginning_.

## Show video

Five YouTube embeds, chronological, in `#video`. Dates come from the videos'
own descriptions, not from guesswork:

| Date       | Show                                   | ID            |
| ---------- | -------------------------------------- | ------------- |
| 2005-02-05 | Battle of the Bands, WSCC              | `U5CmF1-Ov6A` |
| 2005-06-15 | Battle of the Bands, Ludington Beach   | `PxsGvn7HvEA` |
| 2005-07-27 | Battle of the Bands, Mason Co. Fair    | `XS7SNvRh1UQ` |
| 2006-02-04 | Battle of the Bands, WSCC (2nd annual) | `duA4Nlm2S7Q` |
| 2006-04-21 | War of the Rockers, the Tiki           | `Sol5Ol1tis0` |

The first three predate the website; the `shows` table in the DB only starts in 2006. On the Apr 21 2006 entry the site says Stearn's Motor Inn and the video
says the Tiki — these are the same place. **The Tiki was the room inside
Stearn's Motor Inn** (confirmed by Brandon, 2026-07-31). Both names are left as
written on their respective sources; the page explains the relationship rather
than picking one.

Use `youtube-nocookie.com` and `loading="lazy"`. Videos are not mirrored here.

### Dates: what is sourced vs. what is testimony

Each video's description carries its own recording date. Two are confirmed by
primary sources and are quoted on the page as blockquotes with citations:

- **2005-02-05** — westshore.edu homepage, Wayback `20050204052604`: a press
  release ("at least nine area teen 'garage-style' bands... Sat. Feb. 5, from
  7-11 p.m. ... part of WSCC's 20th Anniversary") plus the events listing.
- **2006-02-04** — a full WSCC press release, dated 12/19/2005, at
  `news/newsrelease.asp?id=107`, Wayback `20060117133859`: "'Battle of the
  Bands' will bring together ten different area teen bands... Sat., Feb. 4, from
  7-11:00 p.m., in the WSCC Recreational Center gymnasium... part of WSCC's
  2005-2006 Cultural Arts Series." It names Dr. Rick Plummer as director of the
  series, Mark Sandstedt as emcee, the $100/$50/$25 prizes, the $3 door, and
  `ludingtonrock@gmail.com` / 231-852-0952 as the band-application contact with
  a Jan 20 deadline. It does **not** name the competing bands, so unlike 2005
  there is no outside record of the lineup. Corroborated by the homepage events
  column, unchanged across Wayback `20060129020114` and `20060205014049`:
  "February 4 - Battle of the Bands, 7-11pm, Recreation Center Arena, ext. 3318
  for information". (An earlier pass cited only that one line; the press release
  was found 2026-07-31 and is the better source. Do not downgrade back.)

- **2005-07-27** — the video names only the venue, but two 2005 sources put the
  **Western Michigan Fair** at those grounds across that date, so the show fell
  during the fair. The Ludington CVB calendar (Wayback `20050406045929`) says
  "July 26 - July 30"; the Michigan Association of Fairs and Exhibitions
  (Wayback `20050217065857`) says "7/23/2005 - 7/30/2005". They disagree on the
  opening day, agree on the close, and carry the same phone numbers. Both are
  quoted on the page and the disagreement is shown, not resolved.

- **2005-06-15** — **unverified, and a plausible lead was checked and ruled
  out.** The video says only "Ludington Beach / Recorded June 15th, 2005." That
  date was a **Wednesday**, and the Ludington Area Jaycees ran a Wednesday
  7:00 PM "Concert in the Park" series all summer 2005 — so the two look like a
  match. They are not. The Jaycees series was held at **Waterfront Park
  Amphitheater**, downtown on Pere Marquette Lake, which the Jaycees' own site
  states in its masthead every year it survives ("Waterfront Park Concerts
  Series," Wayback `20020808194746`, `20030417011533`, `20040219195402`,
  `20040611062436`). The beach at the west end of Ludington Avenue is **Stearns
  Park**, on Lake Michigan — a different place. The CVB confirms Stearns Park is
  the Lake Michigan beach ("Freedom Festival Fireworks @ Stearns Park —
  fireworks begin at dusk over Lake Michigan," `20050406045929`).

  Two further notes for anyone tempted to reopen this. The 2005 CVB lists every
  Jaycees concert as "@ To Be Announced" — unlike 2004, which named Waterfront
  Park outright — so the venue was genuinely unstated that season. And Stearns
  Park did host its own concert series, the "Rainbow Gardens Redoux," but on
  **Fridays** at 8 PM and only in 2003. Neither closes the gap. No third-party
  record of a June 15 2005 Battle of the Bands has been found in the CVB
  calendar, the Jaycees site, or the DB. **The only source for this show is
  Brandon's own video description**, and the page must not imply otherwise.

- **2006-04-21** — **confirmed by the Ludington Daily News**, the only show the
  local paper is known to have covered. Its front page on Monday Apr 24 2006
  carried a photo captioned: _"Debra Bethell-Romer sings 'Stay with me' during
  Friday night's Battle of the Rockers at the Tiki. Tiki owner Randy Bowden
  donated the use of the club for the Battle of the Rockers to raise money for
  Ludington's new skate plaza, to be built north of the Jaycee Mini Golf at
  Stearns Park."_ (Wayback `20060424065913`, photo by Andy Klevorn — the
  photograph itself was not archived.) April 21 2006 was a Friday. The paper
  says **Battle** of the Rockers; the band said **war** of the rockers. Both are
  kept as written.

  This also supplies the fact the band's own site never recorded: **the night
  was a skate-park benefit.** A second LDN item four months later shows the same
  room and the same campaign — _"Local bands will play an all ages show Sunday
  night to raise money for the proposed Ludington Skate Plaza. The concert will
  be at the Tiki Lounge 6 p.m."_ (Wayback `20060822040753`).

  The venue naming is now settled by the venue itself. `stearnsmotorinn.com`
  had a page titled **"Tiki Lounge & Nightclub"** — _"Ludington's premiere
  nightclub… Wednesday is Teen Night! Under 21 welcome. No alcohol.
  Smoke-free."_ (Wayback `20030804103821`). That is how a band of high
  schoolers came to play a nightclub, and it independently confirms Brandon's
  testimony that the Tiki was the room inside Stearn's.

**A correction worth not repeating:** an earlier pass concluded the fair "runs in
early August" from 2014–2026 records and nearly published that. It was true for
that era only — the fair ran **late July** in 2005 and 2006 (MAFE lists
7/23/2006 - 7/29/2006) and moved later sometime after. Do not infer a recurring
event's date in one decade from another decade.

Supporting but not conclusive: blythe-tagged photos from the Photos library show a late
practice at Prayer & Praise running 23:07 on Jul 26 to 00:08 on Jul 27, which
Brandon identifies as rehearsal for this event with extra players sitting in.

Photo timestamps are trustworthy — blythe-tagged photos land on 2005-02-05 and
2006-02-04 matching the confirmed shows, and 193 of them on 2006-04-14 matching
the flyer PDF in `src/pdf/`.

**Do not add a date to the page that is not either in a video description, in
the DB, or externally sourced.** Where sources disagree or run out, say so on
the page.

### The Ludington Daily News: what is reachable and what is not

The paper is **not** in Newspapers.com or NewspaperArchive.com (both resolve to
nothing for Ludington), and 2005–2006 is far outside the scope of Chronicling
America and CMU's Digital Michigan Newspapers. The Mason County District
Library's own database list from Feb 2005 does not include it.

Its website _is_ in Wayback, but it was paywalled: _"Articles appearing in the
Ludington Daily News are posted and available for viewing online free of charge
for one week."_ Individual `news.php?story_id=` pages were never archived — only
the section pages and the homepage, which carry headlines plus a
sentence or two of each story. That is enough to search, and it is how the
Apr 24 2006 caption above was found.

Coverage of the relevant windows, checked exhaustively:

| Window              | LDN captures        | Result                          |
| ------------------- | ------------------- | ------------------------------- |
| Feb 2005 (WSCC #1)  | homepage only       | nothing                         |
| **Jun–Jul 2005**    | **homepage only**   | **nothing — no section crawls** |
| Feb 2006 (WSCC #2)  | homepage + Feb 7–11 | nothing                         |
| **Apr 2006 (Tiki)** | homepage + 66 pages | **hit — see above**             |

Entertainment is `category_id=29`; Top News is `3`. Sections were reachable as
`news.php?viewdate=YYYY-MM-DD&category_id=N`. Entertainment was never crawled in
June or July 2005, which is why the beach show has no paper trail here.
**The remaining path for June 15 2005 is LDN microfilm at the Mason County
District Library.** Do not re-run the Wayback sweep; it has been done.

### Everything else that was swept and came back empty (2026-07-31)

A second, wider sweep found the WSCC press release above and **nothing else**.
Do not re-run any of these:

- **westshore.edu** — news release IDs 104–121 were enumerated; only 107 is the
  BOTB. IDs 108–109, 116 and 120 were never captured at all. `news/nrarchive.asp`
  renders a title and no content; `home.php/calendars` renders a blurb and no
  calendar; `media/docs/update.pdf` ("West Shore Update", linked from every 2006
  homepage) was never archived; the 2006 board-minutes PDFs are in CDX but not
  publicly served; the Cultural Arts pages only survive from June 2006.
- **Ludington Daily News** — `category_id=11` (Feb 7–11 2006) and `category_id=14`
  render as URL strings only. Entertainment (`29`) has no captures in Jan–Feb 2006.
- **Radio** — wmom.fm has no news pages archived from Feb 2006 and its
  `appearances.htm` covers only Mar 2005; wkla.com's calendar has no Feb 2006
  captures at all (earliest is Mar 16 2006, and those are metadata-only).
- **Regional papers** — mlive.com has no Ludington/Mason County content in CDX
  for 2005–2006; news-advocate.com and oceanaherald.com are effectively
  unarchived; manistee.com is a tourism directory.
- **Civic** — pureludington.com has zero captures Jun 2005 → mid-2007;
  masoncounty.net, ludington.org, mcdl.info and ludingtonjaycees.org (which was
  SEO-spammed by 2005) have no usable event content.
- **Fairs** — masoncountyfair.com is robots.txt only; westernmichiganfair.com is
  not in Wayback.
- **Music platforms & present-day web** — no purevolume or MySpace captures for
  blythe; search engines return nothing for "blythe band ludington", the WSCC
  battle, "Debra Bethell-Romer", "Mark Sandstedt", or `ludingtonrock@gmail.com`.

Remaining offline-only leads, in rough order of promise: LDN microfilm at MCDL
(the week of Feb 6–12 2006 would carry results and names); WSCC's own "West
Shore Update" and "Shore Lines" alumni newsletter, via College Relations; the
Feb 13 2006 WSCC board minutes; Mark Sandstedt / MS Creative Services; whoever
was behind `ludingtonrock@gmail.com`; Ludington High School yearbooks 2005–06;
Mason County Fair Association program booklets for 2005.

## Inline HTML in DB body text

Two records carry real HTML inside their text: the Apr 14 2006 show links the
flyer PDF, and the john redman thank you wraps its last line in `<em>`. Escaping
the whole field renders those as visible `<a href="...">` gibberish. The
generator handles this with a **tight allowlist** (`esc_body()`), not by
skipping escaping. If you add DB-derived prose, use `esc_body`, and extend the
allowlist only for markup you have actually seen in the dump.

## The one non-blythe track

`solo/when-youre-no-where-youre-now-here.mp3` in the blob container is **not a
blythe song** — it is a solo recording by **Joshua Dumas**, who joined blythe in 2006. The file sat misfiled in the Lost in Sanity Logic archive for twenty years
and was briefly published on lostinsanity.net before the misattribution was
caught.

It is hosted here, in its own boxed-off block at the end of the music section,
explicitly labelled "not a blythe song" and credited to him. Do not fold it into
the black e.p. track list and do not drop the credit line.

**It is not the song from the March 10, 2006 news post.** An earlier pass tied
the two together — the post says Dumas "even showed us one of his own (you can
hear a peview of it in the audio section)" — but that preview is not in the
`audios` table and did not survive. Brandon's recollection (2026-07-31) is that
the song he played for the band was **_egotistic lover_**, which blythe went on
to record for the black e.p.; this file is a separate submission of his. The
page now says that, hedged as recollection. Do not re-assert the news-post link.

## Audio & the player

**No audio ships in this repo.** All nine MP3s live in public Azure Blob
Storage and are referenced by absolute URL:

```
https://martinezmediaclients.blob.core.windows.net/blythe/albums/2006-the-black-ep/*.mp3
https://martinezmediaclients.blob.core.windows.net/blythe/albums/2007-the-ep/*.mp3
https://martinezmediaclients.blob.core.windows.net/blythe/solo/*.mp3
```

Container `blythe` on the `martinezmediaclients` account, anonymous access set
to **Blob** — never Container, which would let anyone enumerate the archive. The
staging tree that was uploaded is
`~/src/_archive/_staging/blythe-audio/` (see its README for per-file
provenance). Plain `<audio src>` playback is cross-origin but needs **no CORS
headers**; only `crossorigin` or the Web Audio API would.

Verify every URL after a change:

```sh
grep -o 'https://martinezmediaclients[^"]*' src/index.html | sort -u \
  | xargs -I{} sh -c 'printf "%s %s\n" "$(curl -s -o /dev/null -w "%{http_code} %{content_type}" {})" {}'
```

### The markup contract

`src/player.js` is vanilla, dependency-free, and reads **all** its state from
the DOM. There is one shared `new Audio()` — never one element per track.

- A track is any element matching `.track[data-src]`, carrying `data-src`,
  `data-title`, and `data-seconds`.
- `data-seconds` mirrors the printed duration so the bar reads correctly before
  metadata loads. Keep the two in sync.
- Each track needs a `.track-btn` (containing `.i-play` and `.i-pause` SVGs),
  a `.track-title`, a `.track-seek` > `.track-fill`, and a `.track-elapsed`.
- Playlists are scoped by the nearest `[data-playlist]` ancestor, labelled with
  `data-record`. Auto-advance, prev, and next stay **inside one record** — the
  black e.p. does not roll into the e.p. `closest()` matches the element
  itself, which is how the single Dumas track gets its own one-item playlist.
- `body.has-player` adds bottom padding so the fixed bar never covers content.
- Prev/next are `hidden sm:grid` so the scrubber keeps room at 390px.

### Tailwind v4 trap — read before restyling

In v4, **utilities beat `@layer components` regardless of selector
specificity.** A `text-stone-100` utility on an `<h3 class="track-title">` will
silently defeat `.track.is-active .track-title { @apply text-amber-500; }`, with
no error and no visible cause. That is why `.track-title` sets its _resting_
font, size, case, and color in the component layer and the markup carries no
color utility. Do not "fix" this with `!important` — remove the utility.

## The photo lightbox

`src/lightbox.js` upgrades the `#photos` grid in place. It is progressive
enhancement, not a replacement: the markup stays a list of ordinary
`<a href="photos/N.jpg">` links wrapping the `_t` thumbnails, and with JS off
(or on a cmd/ctrl/shift/alt-click) the browser just opens the full image.

- The gallery is any `[data-lightbox]` container; its `a[href]` children become
  the sequence, in DOM order. Adding a photo means adding a link — nothing in
  the JS is a list of filenames.
- Alt text is read off the thumbnail, so the two never drift.
- Overlay is `#lightbox` (`z-60`, above the `z-50` player bar) with `#lb-img`,
  `#lb-prev`, `#lb-next`, `#lb-close`, `#lb-count`.
- Navigation does **not** wrap; the end buttons go `[disabled]`, which
  `.lb-nav[disabled]` renders as `pointer-events-none opacity-0`.
- Esc / arrows / Home / End / swipe all work, Tab is trapped in the three
  buttons, and closing returns focus to the thumbnail you were last viewing.
  `player.js` ignores its own keyboard shortcuts while `body.lightbox-open` is
  set, so arrows don't scrub audio behind the overlay.
- The photos are 500px originals. They are shown at native size, never upscaled
  — a full-bleed lightbox would just be a blurry 2006 JPEG.
- `.lb-nav` carries only shape and resting color; each button's position lives
  in the markup (bottom bar at mobile, screen sides at `sm:`).

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
- `src/player.js` and `src/lightbox.js` are the only JavaScript, both vanilla
  and dependency-free. Everything except audio playback — every word, image,
  show, and link — still works with JS disabled; keep it that way. The photo
  grid is plain `<a href="photos/N.jpg">`; `lightbox.js` intercepts the click
  only for unmodified left-clicks, so JS-off and cmd-click still open the full
  image directly.

## Deploying

The Pages source must be set to Actions, not a branch:

```sh
gh api -X PUT /repos/brandonmartinez/blythe-band/pages -f build_type=workflow
```

Push over the SSH remote (`git@github.com:...`); the HTTPS remote resolves to the
wrong GitHub account on the owner's machine.
