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
deployment.

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
docs/
  PRODUCT_FACTS.md          ← the only permitted factual source for content
  WRITING_GUIDE.md          ← voice, structure, component vocabulary
  screenshot-index.xlsx     ← generated capture worklist
```

### Before writing or editing a page

Read **[`docs/WRITING_GUIDE.md`](./docs/WRITING_GUIDE.md)** and
**[`docs/PRODUCT_FACTS.md`](./docs/PRODUCT_FACTS.md)**.

`PRODUCT_FACTS.md` is a fact sheet built by reading the application's source
code. It exists because the product's own README, code comments and in-app help
contradict the shipping behaviour in fourteen specific places — the wrong
control-room and arrester footprints, the wrong module and loss defaults, a
tier system that does not exist, and two features that cannot be reached from
the shipped interface. §18 lists each one. **Write only from the fact sheet.**

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
  brief, so an un-shot image reads as pending rather than as a broken page.
- **`bun run screenshots:index`**, which writes
  `docs/screenshot-index.xlsx` — the worklist for whoever takes the pictures.

Because both read the same rows, the worklist cannot drift from the pages.

### Taking the screenshots

1. Open `docs/screenshot-index.xlsx`. Sheet **Screenshots** is the worklist;
   sheet **How to capture** holds the conventions — window size, display
   scaling, what to blur, callout style.
2. Filter the **Priority** column and work through `1 — Essential` first.
3. Save each PNG to `public/screenshots/<Image file name>`, creating the
   sub-folder if needed.
4. That is all. No code or content change is required — the placeholder is
   replaced the next time the site builds.
5. Re-run `bun run screenshots:index` to refresh the **Status** column.

The application has a single visual theme, so there is **one image per entry** —
no light and dark pairs.

### Adding a new screenshot

Append an entry to `SCREENSHOTS` in `content/screenshots.ts`, then reference it
as `<Screenshot id="your-id" />`. Regenerate the worklist. Keep the object
shape as-is — the Excel generator parses these literals and fails loudly if
the shape changes.

---

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
