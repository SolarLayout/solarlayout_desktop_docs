# Two-app docs — Phase 0 (shell) + Phase 1 (BESS fact sheet) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-product SolarLayout Desktop docs site into a two-app
family site — add a parallel **BESS Desktop** docs tree at `/bess/*` with a
product switcher and picker landing (Phase 0), and produce the BESS fact sheet
that all BESS content must be written from (Phase 1). No SolarLayout URL moves.

**Architecture:** Fumadocs v16 supports multiple `defineDocs` roots. We add a
second collection (`content/bess`) + loader (`baseUrl: "/bess"`) + a parallel
`app/bess` route tree that mirrors `app/docs` exactly, leaving every SolarLayout
file and URL untouched. A product switcher lives in the shared nav; `/` becomes
a product picker; search indexes both trees. Phase 1 is a source-cited fact
sheet (`docs/PRODUCT_FACTS.bess.md`) guarded by a citation checker.

**Tech Stack:** Fumadocs v16 (`fumadocs-core`/`fumadocs-ui` ^16.8.10,
`fumadocs-mdx` ^15), Next.js 16, React 19, Tailwind v4, Bun 1.3, Playwright.

## Global Constraints

- **SolarLayout stays put.** Do not move, rename, or change the URL of any
  existing `content/docs/**` page or any `/docs/*` route. No redirects.
- **BESS base path is `/bess`** (a sibling of `/docs`; `/docs/bess` collides
  with the existing `/docs/[...slug]` catch-all).
- **BESS licensing section is named "Access"** (device activation, not a licence
  file). Menu the app exposes is Help ▸ "License…".
- **Voice:** British spelling in prose (*licence*, *optimise*); UI labels quoted
  verbatim exactly as the app spells them (the BESS app mixes: menu "License…",
  button "Optimise", "Simulate").
- **PRODUCT_FACTS discipline:** `docs/PRODUCT_FACTS.bess.md` is the ONLY
  permitted factual source for BESS content pages. Every value carries an
  `apps/bess-tool/bess_tool/<file>:<line>` citation into `PVlayout_Advance`.
- **Gates, every commit:** `bun run lint && bun run typecheck && bun run build`
  (typecheck runs `fumadocs-mdx` first, so it regenerates the content index).
  Run `bun run test:e2e` before any deploy (Playwright is not in CI).
- **No `VERIFY`/`TBD`/`TODO`/`FIXME`/`XXX` in `content/**`** — the content test
  fails the build on any of them.
- **BESS source of truth (read-only):** `PVlayout_Advance/apps/bess-tool/` — GUI
  `bess_tool/seci_bess_gui.py` (8,654 lines) plus `plant_designer.py`,
  `plant_model.py`, `plant_export.py`, `plant_import.py`, `cad_canvas.py`,
  `report_doc.py`, `trial_client.py`, `licensing.py`, `project_io.py`,
  `sld_symbols.py`, `sheet_template.py`, and `apps/bess-tool/CLAUDE.md`.

---

# PART A — Phase 0: the shell

## File map (Phase 0)

| File | Create/Modify | Responsibility |
|---|---|---|
| `source.config.ts` | Modify | add the `bess` MDX collection |
| `lib/source.ts` | Modify | add `bessSource` loader at `/bess` |
| `content/bess/meta.json` | Create | BESS root sidebar order (stub) |
| `content/bess/intro.mdx`, `getting-started.mdx` | Create | two navigable stub pages |
| `components/BessLogo.tsx` | Create | BESS brand mark |
| `lib/layout.shared.tsx` | Modify | split into product-aware `solarlayoutBaseOptions` + `bessBaseOptions`, add the cross-product switch link |
| `app/bess/(sidebar)/layout.tsx` | Create | BESS DocsLayout (mirrors docs) |
| `app/bess/(sidebar)/[...slug]/page.tsx` | Create | BESS page renderer (mirrors docs) |
| `components/ProductPicker.tsx` | Create | the `/` two-card picker |
| `components/BessLanding.tsx` | Create | the `/bess` landing |
| `app/page.tsx` | Modify | render `ProductPicker` instead of `DocsLanding` |
| `app/bess/(landing)/page.tsx` | Create | render `BessLanding` at `/bess` |
| `app/docs/(sidebar)/layout.tsx` | Modify | use `solarlayoutBaseOptions` |
| `app/api/search/route.ts` | Modify | index both trees |
| `tests/navigation.spec.ts` | Modify | assert the BESS switch link |
| `tests/bess.spec.ts` | Create | BESS-tree render + nav + switcher guardrails |

---

### Task 1: BESS docs tree skeleton (collection + loader + route + stub pages)

Delivers a navigable `/bess/intro` with the full DocsLayout chrome, proving the
second tree renders. Uses a temporary local base options; the real switcher
lands in Task 2.

**Files:**
- Modify: `source.config.ts`
- Modify: `lib/source.ts`
- Create: `content/bess/meta.json`, `content/bess/intro.mdx`, `content/bess/getting-started.mdx`
- Create: `components/BessLogo.tsx`
- Modify: `lib/layout.shared.tsx` (add `bessBaseOptions`; leave `baseOptions` as-is)
- Create: `app/bess/(sidebar)/layout.tsx`, `app/bess/(sidebar)/[...slug]/page.tsx`
- Test: `tests/bess.spec.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `bess` collection (from `collections/server`); `bessSource` (from
  `@/lib/source`) with `.getPageTree()`, `.getPage(slug)`, `.generateParams()`,
  `.getPages()`; `bessBaseOptions: BaseLayoutProps` (from `@/lib/layout.shared`);
  `BessLogo` component (from `@/components/BessLogo`); a live `/bess/intro` and
  `/bess/getting-started`.

- [ ] **Step 1: Write the failing test** — `tests/bess.spec.ts`

```ts
import { test, expect } from "@playwright/test"

test("the BESS intro page renders with the docs chrome", async ({ page }) => {
  const res = await page.goto("/bess/intro")
  expect(res?.status(), "/bess/intro did not return 200").toBe(200)

  await expect(
    page.getByRole("heading", { level: 1, name: /BESS Desktop/i }),
  ).toBeVisible()

  await expect(page.locator("#nd-sidebar")).toBeVisible()
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `bun run test:e2e -- tests/bess.spec.ts`
Expected: FAIL — `/bess/intro` returns 404 (route does not exist yet).

- [ ] **Step 3: Add the `bess` collection** — `source.config.ts`

Insert a second `defineDocs`, identical in shape to `docs`, right after it:

```ts
export const bess = defineDocs({
  dir: "content/bess",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
})
```

- [ ] **Step 4: Add the loader** — `lib/source.ts`

```ts
import { loader } from "fumadocs-core/source"
import { docs, bess } from "collections/server"

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})

/** Source loader for the BESS Desktop content tree under `content/bess/`. */
export const bessSource = loader({
  baseUrl: "/bess",
  source: bess.toFumadocsSource(),
})
```

- [ ] **Step 5: Regenerate the generated content index**

Run: `bun run postinstall`
(Equivalent to `bunx fumadocs-mdx`; makes `collections/server` export `bess`.
`bun run typecheck` also does this, but run it now so the next edits type-check.)

- [ ] **Step 6: Create the BESS content stubs**

`content/bess/meta.json`:

```json
{
  "title": "Documentation",
  "pages": ["intro", "getting-started"]
}
```

`content/bess/intro.mdx` (identity only — no numbers; full content arrives in
Phase 2 from the fact sheet):

```mdx
---
title: What BESS Desktop does
description: A Windows application for designing hybrid renewable-energy and battery-storage projects.
---

BESS Desktop is a Windows application for designing hybrid renewable-energy and
battery-storage projects — sizing solar, wind and battery together, simulating
how the plant meets its contracted delivery, and producing the financial model
and drawings a project needs.

## Where to go next

<Cards>
  <Card title="Getting started" href="/bess/getting-started" description="Prerequisites and a tour of the window" />
</Cards>
```

`content/bess/getting-started.mdx`:

```mdx
---
title: Getting started
description: What you need before your first analysis, and how the window is laid out.
---

This section will walk through the prerequisites and the layout of the main
window. Start from the introduction if you have not read it yet.

## Where to go next

<Cards>
  <Card title="What BESS Desktop does" href="/bess/intro" description="The one-paragraph overview" />
</Cards>
```

- [ ] **Step 7: Create the BESS brand mark** — `components/BessLogo.tsx`

Mirror `SolarLayoutLogo` exactly, swapping the fill for the BESS identity
(navy disc; a distinct mark so the two products read as siblings):

```tsx
/**
 * BESS brand mark — solid navy disc, mirroring SolarLayoutLogo's construction
 * so the two products read as siblings. Inline SVG, hard-coded `#1a3a5c`
 * (the app's banner navy) with a `monochrome` escape hatch.
 */
import type { SVGAttributes } from "react"

export interface BessLogoProps extends SVGAttributes<SVGSVGElement> {
  monochrome?: boolean
}

export function BessLogo({ className, monochrome = false, ...props }: BessLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className ? `shrink-0 ${className}` : "shrink-0"}
      {...props}
    >
      <circle cx="50" cy="50" r="50" fill={monochrome ? "currentColor" : "#1a3a5c"} />
    </svg>
  )
}
```

- [ ] **Step 8: Add `bessBaseOptions`** — `lib/layout.shared.tsx`

Append below the existing `baseOptions` (leave `baseOptions` unchanged in this
task). The leading link is the switch back to SolarLayout:

```tsx
import { BessLogo } from "@/components/BessLogo"

export const bessBaseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="inline-flex items-center gap-[8px] font-medium">
        <BessLogo className="size-[18px]" />
        <span>BESS Desktop Docs</span>
      </span>
    ),
  },
  links: [
    { text: "SolarLayout Desktop", url: "/docs" },
    { text: "Docs", url: "/bess" },
    { text: "Install", url: "/bess/install/windows" },
    { text: "Release notes", url: "/bess/releases" },
  ],
}
```

- [ ] **Step 9: Create the BESS route tree**

`app/bess/(sidebar)/layout.tsx` (mirror of `app/docs/(sidebar)/layout.tsx`):

```tsx
import { DocsLayout } from "fumadocs-ui/layouts/notebook"
import type { ReactNode } from "react"
import { bessBaseOptions } from "@/lib/layout.shared"
import { bessSource } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={bessSource.getPageTree()} {...bessBaseOptions}>
      {children}
    </DocsLayout>
  )
}
```

`app/bess/(sidebar)/[...slug]/page.tsx` (mirror of the docs page renderer, using
`bessSource`; keep the same `AugmentedPageData` shape and `getMDXComponents()`):

```tsx
import { notFound } from "next/navigation"
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/layouts/notebook/page"
import type { ComponentType } from "react"
import { bessSource } from "@/lib/source"
import { getMDXComponents } from "@/mdx-components"

interface Params {
  slug?: string[]
}

interface AugmentedPageData {
  title: string
  description?: string
  full?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toc: any
  body: ComponentType<{ components: unknown }>
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const page = bessSource.getPage(slug)
  if (!page) notFound()

  const data = page.data as unknown as AugmentedPageData
  const MDX = data.body

  return (
    <DocsPage toc={data.toc} full={data.full} tableOfContent={{ style: "clerk" }}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return bessSource.generateParams()
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const page = bessSource.getPage(slug)
  if (!page) notFound()
  const data = page.data as unknown as AugmentedPageData
  return { title: data.title, description: data.description }
}
```

- [ ] **Step 10: Run the gates and the test**

Run: `bun run lint && bun run typecheck && bun run build`
Then: `bun run test:e2e -- tests/bess.spec.ts`
Expected: all green; `/bess/intro` renders with an h1 and the sidebar.

- [ ] **Step 11: Commit**

```bash
git add source.config.ts lib/source.ts content/bess components/BessLogo.tsx \
  lib/layout.shared.tsx "app/bess" tests/bess.spec.ts
git commit -m "feat(bess): add the BESS docs tree skeleton at /bess"
```

---

### Task 2: Product switcher on the SolarLayout tree

Adds the reciprocal switch link so both trees can reach each other, and updates
the existing nav test. SolarLayout's three cross-surface links stay intact.

**Files:**
- Modify: `lib/layout.shared.tsx`
- Modify: `app/docs/(sidebar)/layout.tsx`
- Modify: `tests/navigation.spec.ts`

**Interfaces:**
- Consumes: `bessBaseOptions` and `/bess/*` (Task 1).
- Produces: `solarlayoutBaseOptions` (renamed from `baseOptions`) carrying a
  leading `{ text: "BESS Desktop", url: "/bess" }` switch link.

- [ ] **Step 1: Extend the existing nav test** — `tests/navigation.spec.ts`

Replace the final test body with one that also asserts the switch link:

```ts
test("the top navigation offers the cross-surface and product-switch links", async ({ page }) => {
  await page.goto("/docs/intro")
  for (const label of ["Docs", "Install", "Release notes"]) {
    await expect(page.getByRole("link", { name: label, exact: true }).first()).toBeVisible()
  }
  // The product switcher: a link to the BESS tree.
  await expect(page.getByRole("link", { name: "BESS Desktop", exact: true }).first()).toBeVisible()
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `bun run test:e2e -- tests/navigation.spec.ts`
Expected: FAIL — no "BESS Desktop" link in the SolarLayout nav yet.

- [ ] **Step 3: Rename and extend the SolarLayout base options** — `lib/layout.shared.tsx`

Rename `export const baseOptions` → `export const solarlayoutBaseOptions`, and
add the switch link as the first entry in `links`:

```tsx
export const solarlayoutBaseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="inline-flex items-center gap-[8px] font-medium">
        <SolarLayoutLogo className="size-[18px]" />
        <span>SolarLayout Desktop Docs</span>
      </span>
    ),
  },
  links: [
    { text: "BESS Desktop", url: "/bess" },
    { text: "Docs", url: "/docs" },
    { text: "Install", url: "/docs/install/windows" },
    { text: "Release notes", url: "/docs/releases" },
  ],
}
```

- [ ] **Step 4: Point the SolarLayout layout at the renamed export** — `app/docs/(sidebar)/layout.tsx`

```tsx
import { solarlayoutBaseOptions } from "@/lib/layout.shared"
// ...
<DocsLayout tree={source.getPageTree()} {...solarlayoutBaseOptions}>
```

- [ ] **Step 5: Run the gates and both nav-affecting tests**

Run: `bun run lint && bun run typecheck && bun run build`
Then: `bun run test:e2e -- tests/navigation.spec.ts tests/bess.spec.ts`
Expected: green. (No other file imports `baseOptions` — confirm with
`grep -rn "baseOptions" app lib` showing only the two product exports and their
two layouts.)

- [ ] **Step 6: Commit**

```bash
git add lib/layout.shared.tsx "app/docs/(sidebar)/layout.tsx" tests/navigation.spec.ts
git commit -m "feat(bess): add product-switch links across both docs trees"
```

---

### Task 3: Product picker at `/` and the BESS landing at `/bess`

`/` becomes a family picker; `/docs` keeps the SolarLayout landing unchanged;
`/bess` gets its own landing.

**Files:**
- Create: `components/ProductPicker.tsx`, `components/BessLanding.tsx`
- Modify: `app/page.tsx`
- Create: `app/bess/(landing)/page.tsx`
- Modify: `tests/bess.spec.ts` (add picker + landing assertions)

**Interfaces:**
- Consumes: `SolarLayoutLogo`, `BessLogo`, `/docs`, `/bess/intro`,
  `/bess/getting-started`.
- Produces: `/` picker; `/bess` landing.

- [ ] **Step 1: Add failing tests** — append to `tests/bess.spec.ts`

```ts
test("the root shows a product picker linking to both apps", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("link", { name: /SolarLayout Desktop/i }).first()).toBeVisible()
  await expect(page.getByRole("link", { name: /BESS Desktop/i }).first()).toBeVisible()
  // The BESS card lands on the BESS tree.
  await page.getByRole("link", { name: /BESS Desktop/i }).first().click()
  await expect(page).toHaveURL(/\/bess(\/|$)/)
})

test("the /bess landing links into the BESS tree", async ({ page }) => {
  await page.goto("/bess")
  await expect(page.getByRole("link", { name: /What BESS Desktop does|Get started|Start reading/i }).first()).toBeVisible()
})
```

- [ ] **Step 2: Run to confirm failure**

Run: `bun run test:e2e -- tests/bess.spec.ts`
Expected: FAIL — `/` still renders the SolarLayout landing; `/bess` 404s.

- [ ] **Step 3: Create the product picker** — `components/ProductPicker.tsx`

```tsx
/**
 * ProductPicker — the family landing at `/`. Two cards, one per desktop app,
 * each linking into that app's docs tree. All colour flows through the
 * Fumadocs `--color-fd-*` tokens so light and dark both work.
 */
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SolarLayoutLogo } from "@/components/SolarLayoutLogo"
import { BessLogo } from "@/components/BessLogo"

const PRODUCTS = [
  {
    Logo: SolarLayoutLogo,
    name: "SolarLayout Desktop",
    blurb: "Design utility-scale solar PV plants: layout, energy yield, single-line diagrams, bills of materials and drawing exports.",
    href: "/docs",
  },
  {
    Logo: BessLogo,
    name: "BESS Desktop",
    blurb: "Design hybrid renewable-energy and battery-storage projects: dispatch simulation, optimisation, the financial model, and plant layout.",
    href: "/bess",
  },
] as const

export function ProductPicker() {
  return (
    <main className="mx-auto w-full max-w-[860px] px-[24px] py-[64px] md:px-[48px] md:py-[96px]">
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">
        SolarLayout · Desktop documentation
      </div>
      <h1 className="mt-[14px] text-[28px] leading-[1.15] font-normal tracking-[-0.02em] text-fd-foreground">
        Choose an application.
      </h1>
      <div className="mt-[32px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
        {PRODUCTS.map(({ Logo, name, blurb, href }) => (
          <Link
            key={name}
            href={href}
            className="group relative flex flex-col items-start gap-[12px] rounded-[12px] border border-fd-border bg-fd-card p-[20px] transition-colors hover:border-fd-foreground/30 hover:bg-fd-muted"
          >
            <Logo className="size-[28px]" />
            <div className="text-[15px] font-semibold text-fd-foreground">{name}</div>
            <p className="text-[13px] leading-[1.6] text-fd-muted-foreground">{blurb}</p>
            <span className="mt-[4px] inline-flex items-center gap-[4px] text-[13px] font-medium text-fd-foreground">
              Open the docs
              <ArrowUpRight className="size-[14px]" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Point `/` at the picker** — `app/page.tsx`

```tsx
import { ProductPicker } from "@/components/ProductPicker"

export default function HomePage() {
  return <ProductPicker />
}
```

- [ ] **Step 5: Create the BESS landing** — `components/BessLanding.tsx`

A lean landing mirroring `DocsLanding`'s composition (hero + a small link list),
linking only to pages that exist in Phase 0. Later phases expand the topic list.

```tsx
/**
 * BessLanding — the `/bess` index (rendered in the (landing) route group so the
 * DocsLayout chrome does not wrap it). Mirrors DocsLanding's composition;
 * topic links grow as the BESS tree is written.
 */
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BessLogo } from "@/components/BessLogo"

const LINKS = [
  { label: "What BESS Desktop does", href: "/bess/intro" },
  { label: "Getting started", href: "/bess/getting-started" },
]

export function BessLanding() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-[24px] py-[64px] md:px-[48px] md:py-[80px]">
      <div className="relative flex flex-col">
        <div className="inline-flex items-center gap-[8px] font-mono text-[10px] tracking-[0.16em] uppercase text-fd-muted-foreground">
          <BessLogo aria-hidden="true" className="size-[12px]" />
          <span>BESS Desktop · Documentation</span>
        </div>
        <h1 className="mt-[14px] text-[28px] leading-[1.15] font-normal tracking-[-0.02em] text-fd-foreground">
          Design a project with <span className="font-semibold">BESS Desktop.</span>
        </h1>
        <p className="mt-[14px] max-w-[640px] text-[14px] leading-[1.6] text-fd-muted-foreground">
          Walkthroughs and reference for the Windows application: hybrid
          renewable-energy and battery-storage sizing, dispatch simulation, the
          financial model, and plant layout and single-line diagrams.
        </p>
        <ul className="mt-[28px] flex flex-col gap-[8px]">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group inline-flex items-center gap-[4px] text-[14px] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="size-[12px] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
```

- [ ] **Step 6: Add the `/bess` landing route** — `app/bess/(landing)/page.tsx`

```tsx
/**
 * `/bess` index — a full-width landing surface (layout-free `(landing)` route
 * group), mirroring `/docs`. `/bess/<slug>` gets the DocsLayout chrome via the
 * sibling `(sidebar)` group.
 */
import { BessLanding } from "@/components/BessLanding"

export default function BessIndexPage() {
  return <BessLanding />
}
```

- [ ] **Step 7: Run gates and tests**

Run: `bun run lint && bun run typecheck && bun run build`
Then: `bun run test:e2e -- tests/bess.spec.ts`
Expected: green — `/` shows both products, `/bess` shows the BESS landing.

- [ ] **Step 8: Commit**

```bash
git add components/ProductPicker.tsx components/BessLanding.tsx \
  app/page.tsx "app/bess/(landing)/page.tsx" tests/bess.spec.ts
git commit -m "feat(bess): product picker at / and the BESS landing at /bess"
```

---

### Task 4: Search across both trees

The search dialog is global (one `RootProvider`). Index both loaders in the one
search route so a query from either tree finds pages in both.

**Files:**
- Modify: `app/api/search/route.ts`
- Modify: `tests/bess.spec.ts` (add a BESS search assertion)

**Interfaces:**
- Consumes: `source`, `bessSource` (each exposes `.getPages()` returning pages
  with `.url` and `.data.title`/`.data.description`/`.data.structuredData`).
- Produces: a combined search index served at `/api/search`.

- [ ] **Step 1: Add a failing BESS-search test** — append to `tests/bess.spec.ts`

```ts
test("search finds a BESS page from the BESS tree", async ({ page }) => {
  await page.goto("/bess/intro")
  await page.keyboard.press("ControlOrMeta+k")
  const input = page.getByRole("searchbox").or(page.getByPlaceholder(/search/i)).first()
  await expect(input).toBeVisible()
  await input.fill("battery")
  const dialog = page.getByRole("dialog")
  const result = dialog.getByRole("button", { name: /BESS Desktop|Getting started/i }).first()
  await expect(result, "search returned no BESS result — check /api/search indexes bessSource").toBeVisible({ timeout: 15_000 })
  await result.click()
  await expect(page).toHaveURL(/\/bess\//)
})
```

- [ ] **Step 2: Run to confirm failure**

Run: `bun run test:e2e -- tests/bess.spec.ts`
Expected: FAIL — `/api/search` only indexes SolarLayout, so no `/bess/*` result.

- [ ] **Step 3: Index both sources** — `app/api/search/route.ts`

Replace the single-source export with a combined advanced index built from both
loaders' pages (keeps SolarLayout results unchanged, adds BESS):

```ts
import { createSearchAPI } from "fumadocs-core/search/server"
import { source, bessSource } from "@/lib/source"

/**
 * Search backend for the global Fumadocs dialog. One index spans BOTH product
 * trees, so a query from either /docs or /bess finds pages in both. Results
 * carry their own absolute URL, so a hit navigates to the right product.
 */
type Loader = typeof source

const toIndexes = (loader: Loader) =>
  loader.getPages().map((page) => ({
    id: page.url,
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    // structuredData is emitted by fumadocs-mdx for search; it is what the
    // single-source createFromSource used under the hood.
    structuredData: (page.data as { structuredData?: unknown }).structuredData,
  }))

export const { GET } = createSearchAPI("advanced", {
  indexes: [...toIndexes(source), ...toIndexes(bessSource)] as never,
})
```

> If `bun run typecheck` rejects the `structuredData` field for the installed
> `fumadocs-core` version, the alternative that needs no field-mapping is a
> variadic/array `createFromSource(source, bessSource)` (supported in newer
> v16 minors) — swap the import back to `createFromSource` and pass both
> sources. The e2e test above is the acceptance check either way.

- [ ] **Step 4: Run gates and both search tests**

Run: `bun run lint && bun run typecheck && bun run build`
Then: `bun run test:e2e -- tests/navigation.spec.ts tests/bess.spec.ts`
Expected: green — the SolarLayout search test (`lightning`) still passes AND the
BESS search test (`battery`) passes.

- [ ] **Step 5: Commit**

```bash
git add "app/api/search/route.ts" tests/bess.spec.ts
git commit -m "feat(bess): index both docs trees in one search endpoint"
```

---

### Task 5: Deployment coordination note (no code in this repo)

A short, committed note so the follow-on deploy is not forgotten. The `/bess`
tree ships with the same Vercel Deploy workflow (it is one Next app); the only
external change is the proxy.

**Files:**
- Create: `docs/superpowers/notes/bess-deploy-coordination.md`

- [ ] **Step 1: Write the note**

```md
# BESS docs — deployment coordination

The `/bess` tree is part of this one Next app and ships with the existing
**Deploy** workflow (Vercel). `NEXT_PUBLIC_ASSET_PREFIX` already covers it.

**One external change, in `solarlayout_web` (do before the public launch):**
add a `/bess` rewrite mirroring the existing `/docs` rewrite
(`solarlayout.app/bess/:path* → DOCS_URL/bess/:path*`), so the proxied path
resolves. Direct access to `docs.solarlayout.app/bess` works without it.

Pre-launch, this is not blocking: the docs deployment is reachable on its own
domain regardless.
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/notes/bess-deploy-coordination.md
git commit -m "docs(bess): record the /bess proxy deployment coordination step"
```

**Phase 0 done-when:** `/` is a product picker; `/docs/*` is byte-for-byte the
same SolarLayout site; `/bess/intro`, `/bess/getting-started` and `/bess` render
with the docs chrome; the nav switches between products both ways; search spans
both trees; `bun run lint && typecheck && build` and `bun run test:e2e` are
green.

---

# PART B — Phase 1: `docs/PRODUCT_FACTS.bess.md` (the BESS fact sheet)

**Nature:** research-and-write, not code. The "test" is a **citation checker**
that fails if any `apps/bess-tool/.../file.py:LINE` citation points at a file
that does not exist or a line beyond the file's length. It does not verify the
claim — that is the writer's job — but it stops citation rot cold.

**Source of truth:** the BESS app code (Global Constraints) — open each cited
file at the line to copy the exact label/default/range. A ready-made map of the
menus, tabs, dialogs, labels and file layout was produced during design and, if
still available in the session scratchpad (`analysis/03-bess-inventory.md`),
speeds the pinning; it is optional context, never a substitute for reading the
code.

## File map (Phase 1)

| File | Create | Responsibility |
|---|---|---|
| `docs/PRODUCT_FACTS.bess.md` | Create | the BESS fact sheet |
| `scripts/check-bess-facts-citations.mjs` | Create | citation checker |
| `tests/bess-facts.spec.ts` | Create | run the checker as a test |

The checker resolves citations against the BESS repo, whose path is passed in an
env var so it works on any checkout:

```
BESS_REPO=/Users/bhushanv/work/solarlayout/codebase/PVlayout_Advance
```

---

### Task 6: The citation checker (write it first, before any facts)

**Files:**
- Create: `scripts/check-bess-facts-citations.mjs`
- Create: `tests/bess-facts.spec.ts`
- Create: `docs/PRODUCT_FACTS.bess.md` (header only, so the checker has a target)

**Interfaces:**
- Produces: `node scripts/check-bess-facts-citations.mjs` exits non-zero and
  prints each dangling citation; exits zero when all resolve.

- [ ] **Step 1: Write the checker** — `scripts/check-bess-facts-citations.mjs`

```js
import fs from "node:fs"
import path from "node:path"

// Citations look like: apps/bess-tool/bess_tool/seci_bess_gui.py:1234
const CITE = /\bapps\/bess-tool\/[\w./-]+\.py:(\d+)\b/g
const FACTS = path.join(process.cwd(), "docs", "PRODUCT_FACTS.bess.md")
const REPO = process.env.BESS_REPO
if (!REPO) {
  console.error("Set BESS_REPO to the PVlayout_Advance checkout path.")
  process.exit(2)
}

const lineCounts = new Map()
function lines(rel) {
  if (lineCounts.has(rel)) return lineCounts.get(rel)
  const abs = path.join(REPO, rel)
  const n = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8").split("\n").length : -1
  lineCounts.set(rel, n)
  return n
}

const src = fs.readFileSync(FACTS, "utf8")
const bad = []
src.split("\n").forEach((line, i) => {
  for (const m of line.matchAll(CITE)) {
    const rel = m[0].split(":")[0]
    const ln = Number(m[1])
    const total = lines(rel)
    if (total === -1) bad.push(`${FACTS}:${i + 1}  missing file: ${rel}`)
    else if (ln < 1 || ln > total) bad.push(`${FACTS}:${i + 1}  ${rel}:${ln} out of range (1..${total})`)
  }
})

if (bad.length) {
  console.error(`Dangling BESS fact citations:\n  ${bad.join("\n  ")}`)
  process.exit(1)
}
console.log("All BESS fact citations resolve.")
```

- [ ] **Step 2: Write the fact-sheet header** — `docs/PRODUCT_FACTS.bess.md`

```md
# BESS Desktop — product facts

**This file is the only permitted factual source for BESS Desktop docs.** If a
number, label, or behaviour is not in this file, do not state it on a page.
Every value cites its source as `apps/bess-tool/.../file.py:LINE` in the
`PVlayout_Advance` repo. Publish the value the shipped UI uses; where the code's
default and the shipped UI disagree, note it under "Known-stale" and publish the
UI value.

Source-file aliases used below:
- **GUI** — `apps/bess-tool/bess_tool/seci_bess_gui.py`
- **PM** — `apps/bess-tool/bess_tool/plant_model.py`
- **PD** — `apps/bess-tool/bess_tool/plant_designer.py`
- **RD** — `apps/bess-tool/bess_tool/report_doc.py`
- **TC** — `apps/bess-tool/bess_tool/trial_client.py`
- **LC** — `apps/bess-tool/bess_tool/licensing.py`

## 1. Product identity
BESS Desktop — window title "BESS Project Design Solution   │   Hybrid RE +
Battery Energy Storage System" (GUI:LINE). Standalone tkinter app; entry point
`bess-tool` (GUI:LINE).
```

(Replace each `LINE` as you pin the citation in the next tasks. Leave no `LINE`
literal behind — the checker ignores it, but the writing gate does not once
this content is referenced from pages, so resolve them here.)

- [ ] **Step 3: Wire the checker as a test** — `tests/bess-facts.spec.ts`

```ts
import { test, expect } from "@playwright/test"
import { execFileSync } from "node:child_process"

test("every BESS fact-sheet citation resolves to a real file:line", () => {
  let out = ""
  try {
    out = execFileSync("node", ["scripts/check-bess-facts-citations.mjs"], {
      encoding: "utf8",
      env: { ...process.env },
    })
  } catch (e) {
    throw new Error((e as { stderr?: string }).stderr || String(e))
  }
  expect(out).toContain("All BESS fact citations resolve.")
})
```

- [ ] **Step 4: Run it**

Run: `BESS_REPO=/Users/bhushanv/work/solarlayout/codebase/PVlayout_Advance node scripts/check-bess-facts-citations.mjs`
Expected: "All BESS fact citations resolve." (header has real citations) — or a
listed dangling citation to fix. Then `bun run test:e2e -- tests/bess-facts.spec.ts`.

- [ ] **Step 5: Commit**

```bash
git add scripts/check-bess-facts-citations.mjs tests/bess-facts.spec.ts docs/PRODUCT_FACTS.bess.md
git commit -m "docs(bess): fact-sheet header + citation checker"
```

---

### Tasks 7–12: fill the fact sheet, one app area per task

Each task adds one numbered section, every value carrying a real
`file:line` citation, then runs the checker. Section order mirrors
`PRODUCT_FACTS.md` (identity → inputs → pipeline → outputs → known-stale) and
the BESS journey. For each: open the cited file at the line, copy the exact
default/range/label, write the fact, run the checker, commit.

- [ ] **Task 7 — §2 Install & launch, §3 Access & licensing.** Packaging
  (one-dir PyInstaller, MSIX `Rensaar.BESSDesktop`), launch behaviour (no startup
  gate; geometry `1600x900`), the menu bar (File/Run/Help exact items), the
  banner buttons. Access: `machine_id()` (LC), the License window states
  (Active / No access / Waiting), "Get Free Access" → `open_activation()` to
  `https://solarlayout.app/desktop/bess?device=<id>` (TC), `Refresh` →
  `check_status(force=True)`, the trial states (active/expired/revoked/none),
  the 3-day grace and 5-min fresh window, and `_require_license` gating of
  Simulate / Optimise / every Export.
- [ ] **Task 8 — §4 Inputs, tab by tab.** The eight tabs (Data, Peak, Sizing,
  BESS, Degrad., CAPEX, OPEX, Finance): every field's exact label, default,
  range and unit, and the four project types. This is the largest section —
  give every default a citation. (Defaults seen in the inventory, e.g. CAPEX
  5/7/1, degradation 1%/0.4% — re-pin each to its GUI line.)
- [ ] **Task 9 — §5 Dispatch & analyses.** The 15-minute dispatch (35,040 steps,
  DT 0.25 h), peak-shift and CC-firming, `simulate()`; `Optimise` (SciPy
  `differential_evolution`, the three scenarios and their exact titles);
  Sensitivity's five methods and their exact button labels.
- [ ] **Task 10 — §6 Results & the financial model.** The four result tabs and
  their exact column headers (Dashboard's six `_ptitle`s; the DFR table columns;
  the Financials headline lines + per-year columns); the metric definitions
  (IRR, NPV, DSCR, LCOE, LCOS, …) as the Formulas guide (`_HELP_FINANCE`) states
  them.
- [ ] **Task 11 — §7 Plant layout & SLD, §8 Exports.** The designer inputs
  (`_FIELDS`), Generate Layout / Generate SLD, the CAD toolbar tools, import,
  the three drawing exports (PDF/DXF/KMZ); and the file-menu exports table with
  exact labels and file types, plus the Word report's eight sections (RD).
- [ ] **Task 12 — §9 Known-stale list & glossary seed.** Record each place the
  app's own text disagrees with shipping behaviour (e.g. About says "25-year
  financial model" while default Project Life is 20 — publish 20), with a `⚠️`
  and the citation; seed the BESS glossary terms (DFR, RTE, DoD, SOH, C-rate,
  CC, CUF cap, DSRA, LCOS, augmentation, …).

Each task ends: `node scripts/check-bess-facts-citations.mjs` green, then commit
`docs(bess): fact sheet §N — <area>`.

**Phase 1 done-when:** `docs/PRODUCT_FACTS.bess.md` covers every app area a BESS
page will draw from, every value cites a resolving `file:line`, the citation
test is green, and no `LINE` placeholder literal remains.

---

## Self-review notes

- **Spec coverage:** Phase 0 implements D1 (separate roots), D3 (`/bess`), the
  shell table (source/loader/routes/nav/landing/search/tests/proxy) and the
  brand mark; Phase 1 implements the fact-sheet prerequisite. The ~49 content
  pages, per-product screenshot/video manifests, the product-aware `<Screenshot>`
  component, and the WRITING_GUIDE reciprocal-rule edits are **out of scope**
  here (Phase 2+), by design — this plan stops at a navigable shell + the fact
  sheet, matching the spec's phasing.
- **Deferred, flagged (not placeholders):** the multi-source search field
  mapping (Task 4) carries a concrete primary implementation plus a named
  fallback, both real code, with the e2e as the acceptance gate.
- **Type consistency:** `bessSource`, `bessBaseOptions`, `solarlayoutBaseOptions`,
  `BessLogo`, `ProductPicker`, `BessLanding` are used with the same names
  everywhere they appear. `baseOptions` is fully renamed to
  `solarlayoutBaseOptions` (Task 2 verifies no other importer remains).
```
