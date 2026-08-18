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

## Deployment

Hosted on **Vercel**. `vercel.json` sets
`git.deploymentEnabled: false`, so pushing does **not** deploy — deployment is
always the explicit **Deploy** workflow
(`.github/workflows/deployment.yml`, `workflow_dispatch`).

Run it from the Actions tab, choosing `Preview` or `Production`.

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

**Environments** — Settings ▸ Environments. Create `Preview` and `Production`.
Add reviewers to `Production` if a production deploy should need approval.

**On the Vercel project itself:**

- **Framework preset:** Next.js.
- **Build command / install command / output directory:** leave as the
  defaults. The workflow runs `vercel build`, which reads them from the
  project.
- **Node version:** 22 or later.
- **Environment variables:** none. The site has no runtime configuration, no
  API keys and no database.
- **Domain:** attach it in Vercel ▸ Settings ▸ Domains. Nothing in this
  repository hard-codes a hostname, so no code change is needed.

Every content page is prerendered at build time. The one exception is
`/api/search`, which backs the search dialog and runs as a function — it builds
its index from the same content loader the pages use, so there is no separate
indexing step and nothing to configure.

---

## Continuous integration

`.github/workflows/ci.yml` runs on pushes and pull requests: install, lint,
typecheck, build. Build-only by design — it does not deploy, and it does not
run the browser tests.
