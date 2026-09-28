# SolarLayout Desktop — documentation site

Product documentation for **SolarLayout Desktop**, built with
[Next.js](https://nextjs.org) and [Fumadocs](https://fumadocs.dev).
Content is MDX on disk; there is no CMS and no database.

The stack, visual language and voice deliberately match the SolarLayout web
documentation app, so the two read as one product family.

---

## Requirements

| Tool | Version |
| --- | --- |
| [Bun](https://bun.sh) | 1.3 or later |
| Node.js | 22 or later (Bun uses it for the Excel script) |

---

## Run it

```bash
bun install          # also runs `fumadocs-mdx` to generate the content index
bun run dev          # http://localhost:3007
```

The dev server watches `content/` — saving an MDX file reloads the page.

Adding, renaming or deleting a **file** (rather than editing one) sometimes
needs the content index regenerating. If a new page 404s, restart `bun run dev`.

### Every gate, before you commit

```bash
bun run lint
bun run typecheck
bun run build
```

`typecheck` regenerates the content index and runs `next typegen` first, so run
it rather than bare `tsc`.

### Browser tests

```bash
bun run test:e2e     # headless; builds and serves the site itself
bun run test:e2e:ui  # interactive
```

The Playwright config builds the site and starts it on port 3007 on its own —
you do not need a server running. First run only:

```bash
bunx playwright install chromium
```

To run the same suite against a **deployed** site instead of a local build:

```bash
E2E_BASE_URL=https://your-deployment.vercel.app bun run test:e2e
```

Worth doing after a deployment, because a deployment can fail in ways a local
`next start` cannot — a missing function, a rewrite, a font or image that 404s
from a different origin. Run it from the same commit that was deployed: the
filesystem-backed checks (page enumeration, link validation, the screenshot
manifest) read the local content tree and will otherwise disagree with the site.

These tests are **not** in CI (CI is build-only, by design). Run them before a
deployment. The BESS fact-sheet citation test needs the product repo's path:
`BESS_REPO=../PVlayout_Advance bun run test:e2e`.

---

## Updating the docs after a product change

Use the **`update-docs`** skill in [Claude Code](https://claude.com/claude-code),
from the repo root:

```
/update-docs solarlayout      # SolarLayout Desktop — content/docs
/update-docs bess             # BESS Desktop — content/bess
```

It lists what merged in the product repo (`PVlayout_Advance`) since the fact
sheet was last verified, audits it against the code, updates the fact sheet
first, recaptures the SolarLayout screenshots (or writes BESS capture briefs),
writes and reviews the pages, runs every gate and opens a pull request.

**[`UPDATE_DOCS_USING_SKILL.md`](./UPDATE_DOCS_USING_SKILL.md)** covers the
prerequisites (the product repo checked out beside this one, and for
SolarLayout screenshots a Windows PC with a real display and the test
`.PAN` / `.OND` files), what a run does, the decisions it asks you for, and
troubleshooting. The skill itself is in
[`.claude/skills/update-docs/`](./.claude/skills/update-docs/SKILL.md).

---

## How the content is organised

```
content/
  docs/
    meta.json               ← top-level sidebar order
    intro.mdx               ← the voice and component reference example
    <section>/
      meta.json             ← that section's sidebar order
      <page>.mdx
  screenshots.ts            ← the screenshot manifest (see below)
  bess/                     ← the BESS Desktop tree, served at /docs/bess (own meta.json, screenshots.ts, videos.mjs)
docs/
  PRODUCT_FACTS.md          ← the only permitted factual source for content
  PRODUCT_FACTS.bess.md     ← the same, for the BESS tree
  WRITING_GUIDE.md          ← voice, structure, component vocabulary
  screenshot-index.xlsx     ← generated capture worklist
.claude/skills/update-docs/ ← the docs-update skill (see UPDATE_DOCS_USING_SKILL.md)
```

### Before writing or editing a page

Read **[`docs/WRITING_GUIDE.md`](./docs/WRITING_GUIDE.md)** and
**[`docs/PRODUCT_FACTS.md`](./docs/PRODUCT_FACTS.md)**.

`PRODUCT_FACTS.md` is a fact sheet built by reading the application's source
code; its header records the product commit it was last verified against
(2026-09-28, `e93f6be`). It exists
because the product's own README, code comments and in-app help contradict the
shipping behaviour in a number of specific places — wrong footprints and
defaults, a tier system that does not exist, features that cannot be reached,
and interface descriptions from before the rebuild. §18 lists each one.
**Write only from the fact sheet.**

### Adding a page

1. Create `content/docs/<section>/<page>.mdx` with `title` and `description`
   frontmatter.
2. Add its slug to that section's `meta.json` — a page missing from `meta.json`
   renders but never appears in the sidebar.
3. Link to it from at least one related page.

---

## Screenshots

`content/screenshots.ts` is the single source of truth. Two things read it:

- **`<Screenshot id="…" />`** in MDX. At build time it looks for the file under
  `public/screenshots/`. Found — it renders the image, sized from the file's
  own dimensions. Missing — it renders a placeholder carrying the capture
  brief. **The site never ships a placeholder:** `bun run test:e2e` fails when
  a manifest entry or a referenced id has no file, so every entry is captured
  before it is merged.
- **`bun run screenshots:index`**, which writes
  `docs/screenshot-index.xlsx` — the list of every image, its page and the
  state it shows.

Because both read the same rows, the worklist cannot drift from the pages.

### How the desktop set is captured

The desktop screenshots are not screen-grabs. The application renders its own
widgets to PNG (`QWidget.render()` at 2× on a 1400 × 900 logical window;
dialogs at their own size), driven by the product repository's
`tools/docs_site_shots.py`, with modal dialogs rendered by patching their
`exec_`. It runs on Windows with a real display (offscreen rendering on Windows
draws no text). Inputs: the bundled sample site, a three-plot variant of it,
and a test module (`Test.PAN`) and inverter (`Test-S.ond`) file. See
`CAPTURING_SCREENSHOTS.md` in the product repository for the legibility rules
(fixed logical size, never the maximised window, 2×). The `update-docs` skill
drives the whole capture. The BESS set has no capture script and is taken by
hand from `docs/bess-screenshot-index.xlsx`.

When the interface changes, recapture the affected ids and drop the files at
`public/screenshots/<file>`; no code or content change is needed for an image
whose id and state are unchanged. A new state means a new entry in
`content/screenshots.ts` (keep the object shape — the Excel generator parses
these literals and fails loudly if the shape changes) and a page that uses it.

The application has a single visual theme, so there is **one image per entry** —
no light and dark pairs. Images the application cannot produce (the Microsoft
Store, Google Earth, a CAD program) are described in prose, not promised as
screenshots.

## Product videos

`content/videos.mjs` is the single source of truth for the product video set —
**25 clips, about 76 minutes finished**, one per genuinely distinct feature.

```bash
bun run videos:index    # writes docs/video-index.xlsx
```

The manifest is the reviewable artefact; the workbook is generated output and is
never hand-edited. Nothing on the site renders these rows yet, so the manifest is
plain JavaScript and the generator imports it directly rather than parsing it. If
a `<Video id="…" />` component is ever added, move the array to `videos.ts` and
give it an interface, the way `screenshots.ts` has one.

The workbook is written for somebody who uses the application confidently and
knows nothing about the code, so it is self-contained — five sheets:

| Sheet | Holds |
| --- | --- |
| **Start here** | What the workbook is, the order to work in, what each column means, and what happens to their audio |
| **Videos** | The worklist. One row per clip: the shot list, the sentences to speak, the set-up state, what to hold on, what must not appear |
| **How to record** | 16:9 at 1920×1080, 30 fps, display scaling, clean background, the demonstration file set, no added effects |
| **Narration and audio** | The recorded voice is replaced by an AI narration built from their words — so content and room noise matter, accent and grammar do not |
| **Words to say clearly** | How to pronounce every domain term in the set, so the voice pipeline transcribes it correctly |

Priority is `High` / `Medium` / `Low` (12 / 9 / 4): High is what a new customer
cannot use the product without, Medium is what a working designer reaches for,
Low is depth for a specific workflow. Filter the column and record in waves.

### ⚠️ Every sentence in `say` is spoken verbatim

The recorders are told to speak the `say` lines rather than explain in their own
words — that is deliberate, and it is what keeps a wrong number out of a
published video. So the same rule as the pages applies, harder:
**`docs/PRODUCT_FACTS.md` is the only permitted source for anything in `say`.**
Do not add a number, label or behaviour that is not in the fact sheet.

### Adding or changing a video

Edit `content/videos.mjs` and regenerate. The generator refuses to write a
workbook with a missing field, a blank shot or narration line, a duplicate id or
file, or a priority outside 1–3 — a half-filled row is a build failure rather
than a blank cell somebody has to guess at.

The **Status** column reads `Recorded` when a file of that name exists under
`public/videos/`. Where the finished clips are hosted is a separate decision —
they are not committed to this repository.

---

## Deployment

Hosted on **Vercel**. `vercel.json` sets
`git.deploymentEnabled: false`, so pushing does **not** deploy — deployment is
always the explicit **Deploy** workflow
(`.github/workflows/deployment.yml`, `workflow_dispatch`).

Run it from the Actions tab, choosing `Staging` or `Production`.

`Staging` maps to a **custom Vercel environment** named `staging`, not Vercel's
built-in preview — the same convention every app in solarlayout's
`platform-deployment.yml` uses, so `vercel pull --environment=staging` resolves
that environment's own variables.

### What the deployment needs

Configure these once, in the repository settings, before the first run.

**Secrets** — Settings ▸ Secrets and variables ▸ Actions ▸ Secrets:

| Secret | Where to get it |
| --- | --- |
| `VERCEL_TOKEN` | Vercel ▸ Account Settings ▸ Tokens. Scope it to the team that owns the project. |

**Variables** — the same page, Variables tab:

| Variable | Where to get it |
| --- | --- |
| `VERCEL_ORG_ID` | Vercel ▸ Team Settings ▸ General ▸ Team ID |
| `VERCEL_PROJECT_ID` | Vercel ▸ the project ▸ Settings ▸ General ▸ Project ID |

**Environments** — Settings ▸ Environments. Create `Staging` and `Production`.
The dispatch input is `type: environment`, so the dropdown is populated from
these and cannot drift from what exists.
Add reviewers to `Production` if a production deploy should need approval.

**On the Vercel project itself:**

- **Framework preset:** Next.js.
- **Build command / install command / output directory:** leave as the
  defaults. The workflow runs `vercel build`, which reads them from the
  project.
- **Node version:** 22 or later.
- **Environment variables:** one, per environment — `NEXT_PUBLIC_ASSET_PREFIX`,
  set to that environment's own docs origin:

  | Vercel environment | Value |
  | --- | --- |
  | Production | `https://docs.solarlayout.app` |
  | staging | `https://docs.staging.solarlayout.app` |

  It is not optional if the site is reachable through `solarlayout.app/docs`.
  `solarlayout_web` rewrites that path here, and without an absolute prefix the
  proxied HTML emits relative asset paths that resolve into *its* chunk
  namespace and 404 — an unstyled, unhydrated page. Direct access to the docs
  domain works either way, which is what makes a missing value easy to miss.
  The deploy workflow prints the resolved prefix and warns when it is absent.

  There are no other variables: no API keys, no database, no runtime config.
- **Domain:** attach it in Vercel ▸ Settings ▸ Domains. Nothing in this
  repository hard-codes a hostname — the asset prefix above is the one place a
  domain appears, and it lives in Vercel rather than in the repo.

Every content page is prerendered at build time. The one exception is
`/api/search`, which backs the search dialog and runs as a function — it builds
its index from the same content loader the pages use, so there is no separate
indexing step and nothing to configure.

---

## Continuous integration

`.github/workflows/ci.yml` runs on pushes and pull requests: install, lint,
typecheck, build. Build-only by design — it does not deploy, and it does not
run the browser tests.

### Verifying the proxied path

The site is also reachable at `solarlayout.app/docs`, through a rewrite in
`solarlayout_web`. That path has a failure mode no local test can reach — a
relative asset prefix makes the proxied HTML resolve `/_next/static/*` against
the apex, landing in `solarlayout_web`'s chunk namespace, so every asset 404s
and the page renders unstyled and unhydrated. It shipped that way once.

```bash
E2E_PROXY_URL=https://solarlayout.app bun run test:e2e
```

Opt-in, because it depends on a live deployment of a different app. It asserts
computed style and a hydrated sidebar rather than HTTP status — a stylesheet can
return 200 and still not apply.
