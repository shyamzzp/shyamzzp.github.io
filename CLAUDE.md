# shyamzzp.github.io — Portfolio

Personal portfolio (React + CRA, TypeScript), deployed to GitHub Pages.

## Package manager

`pnpm` (not npm). Run `pnpm install` before build/test if `node_modules` is missing.

## Deploy process

Deploys to the `gh-pages` branch, served at https://shyamzzp.github.io.

```
pnpm run deploy        # runs predeploy (pnpm run build) then gh-pages -d build
```

If `pnpm run deploy` fails to run the build step, do it explicitly:

```
CI=false pnpm run build
./node_modules/.bin/gh-pages -d build
```

- Use `CI=false` so ESLint warnings don't fail the production build.
- Only deploy when the user explicitly asks.
- Live site is CDN-cached; changes appear ~1-2 min after "Published".

## Local dev + testing

Run the dev server (port 3000 is often already taken — use 3001):

```
BROWSER=none PORT=3001 pnpm run dev
```

Verify a change by screenshotting the running SPA with headless Chrome, then
reading the PNG (CRA is client-rendered, so `--virtual-time-budget` is needed to
let JS/fonts/images settle):

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,900 --force-device-scale-factor=2 \
  --virtual-time-budget=9000 --screenshot=/tmp/shot.png \
  "http://localhost:3001/"
```

Then `Read` `/tmp/shot.png`. Check both a wide (1440) and narrow (1024) width —
the layout is responsive and the projects panel reflows.

There are no unit tests (the old `src/App.test.tsx` was removed). Verification is
visual via the screenshot flow above.

## Theme

Editorial, MELLENE-inspired. Strict rules:

- **Monochrome only.** Palette: near-black `#111827`, cream `#f7f6ee` /
  `#f2f1ea`, greys `rgba(17, 24, 39, α)`, white. No brand/accent colors —
  colored logos and project images are forced to grayscale via CSS `filter`.
- **Departure Mono everywhere.** Loaded in `public/index.html` via Google Fonts;
  set as the base font on `body`/`.app`. Used for body, titles, and labels.
- **No border-radius on any container.** Everything is square
  (`border-radius: 0`). Only exception: circular controls (nav arrows use
  `50%`). Do not introduce rounded corners.
- **Section labels** — small, uppercase, letter-spaced Departure Mono in grey
  (e.g. `01 / ABOUT`, `02 / PROJECTS`, `CONNECT`, `BUILT WITH`, `ADD-ONS`).
  Reuse this style for any new label so the panels stay cohesive.

## Layout / structure

- `src/Home.tsx` — the whole portfolio.
  - Two-panel grid: left `#about` (1 col), right `#projects` (spans 2 cols).
  - **Projects** are a horizontal carousel driven by `projectIndex`. Data lives
    in the `projects` array at the top of the file (title, category,
    description, `usps`, `stack`, `image`, optional `addOns`/`testimonials`/
    `liveUrl`/`githubUrl`). Fork projects get `[fork]` in the category and an
    `ADD-ONS` section.
  - Carousel navigation: on-screen `‹ ›` arrows (absolutely positioned on the
    panel so they don't move with content), dots, and Left/Right arrow keys.
  - **Resume viewer** opens on double-click of the name OR double-tap Shift;
    closes on Esc / backdrop click. PDF is `public/ShyamSS-resume.pdf`.
- `src/components/SocialMedia/SocialMedia.tsx` — the `CONNECT` icon row
  (`links` array). Icons in `src/img/` (SVGs are monochrome/grayscaled).
- `src/App.css` — all styling. `src/index.css` sets the base font.

## Adding a new project (rules)

Projects live in the `projects: Project[]` array at the top of `src/Home.tsx`.
Follow these rules so every card stays consistent. Verify with a screenshot
(deep-link `?project=<slug>`) before deploying.

### Required fields (every project)

- **`slug`** — kebab-case, unique. Powers `?project=<slug>` deep-linking and
  reload persistence. Match the GitHub repo name where possible.
- **`titleLead` + `titleRest`** — the title is two-tone: `titleLead` renders
  bold, `titleRest` light. Split the name so the distinctive word is the lead
  (e.g. `OWNSCRIBE` / `LOCAL TRANSCRIPTION`). Keep it UPPERCASE.
- **`category`** — ` · `-separated tags, e.g. `On-Device AI · Python`.
- **`description`** — an ARRAY of paragraphs (`string[]`), never one long
  string. Split into 2 short paragraphs when there's more than ~2 sentences;
  they render full-width with a break between for readability.
- **`usps`** — 2–4 short outcome statements. Render as the **Highlights**
  block grid. Always present.
- **`challenges`** — 2–4 real problems solved during research/dev. Render as
  the **Challenges solved** block grid. Always present — this is what gives the
  card credibility; don't skip it.
- **`stack`** — technologies, shown as the ` · `-joined **Built with** line.
- **`image`** — 16:6 banner. Prefer a real screenshot or a custom monochrome
  SVG mockup (see `src/img/installr-mockup.svg`) over stock. Images are forced
  to grayscale by CSS regardless.

### Conditional fields

- **`addOns?`** — ONLY for forks. When a project is a fork:
  1. add `· [fork]` to the `category`, and
  2. list what the fork adds in `addOns` (renders as an **Add-ons** block grid).
  Do NOT add a separate "fork" tag next to the Add-ons label — the `[fork]` in
  the category already says it. Non-fork projects omit `addOns` entirely.
- **`testimonials?`** — only include REAL quotes (`quote` / `author` / `role`).
  Never ship placeholder testimonials ("Add a name"). Omit the field if there
  are none.
- **`liveUrl?`** — only if there is a PUBLIC, reachable URL (renders a
  "Visit site" pill). Do not link private/401 pages (e.g. a private HF Space).
- **`githubUrl?`** — the repo URL (renders a "GitHub" pill).
- **`terms?`** — key phrases to emphasize inside the Overview. They render
  **bold** (monochrome, never colored) via `highlightTerms`. Pick 4–7 of the
  most important nouns/features; match the exact substring as it appears in the
  `description` text (case-insensitive).

### Section order in the card (fixed)

banner image → title → category → Overview (paragraphs) → Highlights →
Add-ons (forks only) → Challenges solved → Built with → Testimonials (if real)
→ links (Visit site / GitHub).

### Section styling

All section labels ("Overview", "Highlights", "Add-ons", "Challenges solved",
"Built with", "Testimonials") use `.project-stack-label` (small, uppercase,
letter-spaced Departure Mono grey). Highlights / Add-ons / Challenges all use the
same `.project-usp-grid` + `.project-usp-block` block style — keep them uniform;
do not turn one into a plain list.

## Resume

`public/ShyamSS-resume.pdf` is the source of truth for the About copy, role,
and project facts. When the user says "update from the latest resume", copy the
newest resume PDF from `~/Downloads` over `public/ShyamSS-resume.pdf` and refresh
the copy in `Home.tsx` from it.
