# Two-app docs — Phase 2 (BESS content pages) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write the BESS Desktop documentation pages — the ~49-page tree from the [two-app CX spec](../specs/2026-08-24-two-app-docs-cx-design.md) — as MDX under `content/bess/`, each following the established SolarLayout page pattern and sourced ONLY from `docs/PRODUCT_FACTS.bess.md`.

**Architecture:** Phase 0 (shell) and Phase 1 (fact sheet) already shipped on `main`. This phase adds content only, plus the content infrastructure the pages need (a BESS screenshot manifest, a product-aware `<Screenshot>`, and content guardrail tests for the `/bess` tree). Pages are written section-by-section; each section task ends with its pages rendering, wired into `meta.json`, cross-linked, and passing the guardrails. No SolarLayout page or the shell wiring changes (except re-adding the two BESS nav links once their target pages exist, and updating the BESS landing).

**Tech Stack:** Fumadocs v16 (`fumadocs-core`/`fumadocs-ui` ^16.8.10, `fumadocs-mdx` ^15), Next.js 16, React 19, Tailwind v4, Bun 1.3, Playwright.

## Global Constraints

Copied from `docs/WRITING_GUIDE.md` and the CX spec — every task's requirements implicitly include these:

- **Fact source:** `docs/PRODUCT_FACTS.bess.md` is the ONLY permitted factual source for BESS pages. If a number, label, default, range or behaviour is not in it, do not state it. Never carry a number from another page — look it up. Never infer a "sensible" default. Missing fact → leave `{/* VERIFY: <precise question> */}` and keep writing (used sparingly; must be resolved before the section is done — the content guardrail fails the build on any `VERIFY`/`TBD`/`TODO`/`FIXME`/`XXX`).
- **Audience:** a battery-storage / hybrid-RE project developer or engineer. They know power systems, storage and project finance; they know nothing about how the app is built. **Never name a source file, class, function, module, or code identifier; never say "render/widget/parse".** Describe behaviour ("the dispatch simulation", "the results panel"). The fact sheet's `file:line` citations are provenance for the writer only — they NEVER appear on a page.
- **Never mention (BESS reciprocal rule):** operating systems other than Windows; portable/zip/GitHub/source builds; product tiers or editions; the cloud product; **the SolarLayout solar-PV product** (the family cross-links live in the shell nav/landing, never in a BESS page body); "stopgap"/"flagship"; roadmaps; internal team names.
- **Voice:** second person, imperative for instructions, present tense for behaviour, sentence-case headings, lead with the answer (no "In this guide we will…"), prefer tables for values and `<Steps>` for ordered actions. British spelling in prose (*licence*, *optimise*, *metre*); quote UI labels EXACTLY as the app spells them (the BESS app mixes: menu **License…**, button **Optimise**, **Simulate**). Bold for clickable labels/fields; `▸` for menu paths; `code font` only for file names/extensions/paths (`.slb`, `.docx`).
- **Page structure:** frontmatter = exactly `title` (sentence case, short, no product name) + `description` (one sentence, ≤160 chars). Then 1–2 opening paragraphs (no heading), `##` sections, and a mandatory closing `<Cards>` cross-link block (2–4 related pages; `description` is a fragment, no full stop). 120–400 lines of MDX. No Markdown `#` H1 (the title supplies it).
- **BESS base path is `/bess`.** All internal links are absolute and start `/bess/…` and must resolve to a page listed in a `content/bess/**/meta.json`. A page missing from `meta.json` renders but is invisible in the sidebar.
- **Screenshots:** the only way to show an image is `<Screenshot id="…" />`, and the id MUST exist in `content/bess/screenshots.ts` (Task 1). Namespace every BESS id with a `bess-` prefix. Never pass `alt`/`width`/`height`. Place immediately after the prose that describes it; never write "as shown below".
- **Supplier is "SolarLayout"**; contact is `sales@solarlayout.app` (mail link), given once per page only on pages where the reader must act (activate, access troubleshooting, support).
- **Gates, every commit:** `bun run lint && bun run typecheck && bun run build`, plus the `/bess` content guardrails and render test: `BESS_REPO=… bun run test:e2e -- tests/bess-content.spec.ts tests/bess.spec.ts tests/bess-facts.spec.ts`. (`bun run typecheck` regenerates the fumadocs index; run after adding pages so a new page is picked up.)
- **BESS repo (read-only), for screenshot `state`/`what` briefs only:** `/Users/bhushanv/work/solarlayout/codebase/PVlayout_Advance/apps/bess-tool/`. The fact sheet is the source for page prose; the app is only opened to describe how to reach a screen for a capture brief.

**Page → fact-sheet source map** (every content task cites the exact `§` it draws from):

| Page(s) | Fact sheet source |
|---|---|
| intro, getting-started (main-window tour) | §1, §2 (Main-window layout, Menu items) |
| project-types | §4.1 |
| first-analysis (walkthrough) | §2, §4.1–§4.3, §5.2, §6.1, §8 |
| install/windows, install/updates | §2 (Packaging, Launch) |
| access/overview, activate, troubleshooting | §3 |
| inputs/data…finance (8 pages) | §4.2 … §4.9 respectively |
| concepts/how-dispatch-works | §5.1 |
| concepts/dfr | §6.2 + §5.1 (DFR targets in §4.4) |
| concepts/battery-model | §4.5, §10.2 |
| concepts/degradation-and-eol | §4.5 (EOL), §4.6, §10.2 |
| analysis/simulate, optimise, sensitivity | §5.2, §5.3, §5.4 |
| results/dashboard, dfr-table, financials, summary | §6.1, §6.2, §6.3, §6.4 |
| financials/metrics | §6.5, §10.4 |
| financials/tariffs-and-revenue | §4.8, §6.5, §10.3 |
| financials/debt-and-tax | §4.9, §6.5 |
| financials/working-capital | §4.9, §6.5 |
| plant/* (6 pages) | §7.1–§7.8 |
| exports/pdf-report, word-report, data-exports | §8, §8.1 |
| reference/parameters | §4 (all tabs) |
| reference/results-columns | §6.2, §6.3 |
| reference/formulas | §6.5 |
| reference/glossary | §10 |
| troubleshooting | §3, §5 (base-case-required warnings), §4.2 (CSV errors) |
| releases | (release-notes shell page; `<Release>` component) |
| support | §3 (in-app support), §9 |

---

## Task 1: Content infrastructure (screenshot manifest, product-aware `<Screenshot>`, `/bess` content guardrails, WRITING_GUIDE update)

Unblocks all content. Delivers: BESS pages can reference `<Screenshot id="bess-…">`; the `/bess` tree is guarded by the same content checks as `/docs`; the WRITING_GUIDE states the BESS reciprocal rule.

**Files:**
- Create: `content/bess/screenshots.ts`
- Modify: `components/ui/screenshot.tsx`
- Create: `scripts/build-bess-screenshot-index.mjs` (or generalize the existing one — see Step 4)
- Create: `tests/bess-content.spec.ts`
- Modify: `tests/helpers.ts` (add `/bess`-tree variants) — inspect first; if helpers are hard-coded to `/docs`, add parallel `bess*` helpers rather than changing the `/docs` ones
- Modify: `docs/WRITING_GUIDE.md`
- Modify: `package.json` (add a `screenshots:index:bess` script if a separate script is used)

**Interfaces:**
- Produces: `content/bess/screenshots.ts` exporting `SCREENSHOTS: ScreenshotSpec[]` and `SCREENSHOTS_BY_ID` (same `ScreenshotSpec` interface as `content/screenshots.ts`); a `<Screenshot>` that resolves ids from BOTH manifests; `tests/bess-content.spec.ts` guardrails.

- [ ] **Step 1: Write the failing guardrail test** — `tests/bess-content.spec.ts`

Mirror `tests/content.spec.ts` for the `/bess` tree: enumerate `content/bess/**/*.mdx`; assert each renders (200, non-empty h1, no raw MDX artefact, no "Unknown screenshot id", no console errors); every page is reachable from a `content/bess/**/meta.json`; every internal `/bess/…` link resolves to a real page; no `VERIFY`/`TBD`/`TODO`/`FIXME`/`XXX` in `content/bess/**`; every `<Screenshot id>` referenced in `content/bess/**` exists in `content/bess/screenshots.ts`. Reuse `tests/helpers.ts` (add `/bess` variants: `allBessDocsPaths()`, `bessNavSlugs()`, `bessManifestIds()`, `bessReferencedScreenshotIds()` — read the existing helpers first and copy their shape, pointed at `content/bess` and base `/bess`).

- [ ] **Step 2: Run it to confirm it fails**

Run: `bun run test:e2e -- tests/bess-content.spec.ts`
Expected: FAIL — no `content/bess/screenshots.ts`, and (once created empty) the screenshot-id / helper wiring not yet present.

- [ ] **Step 3: Create the BESS screenshot manifest** — `content/bess/screenshots.ts`

Copy the header docstring and the `ScreenshotSpec` interface from `content/screenshots.ts` verbatim (or import the type — but a standalone copy matches the "no cross-manifest coupling" style; prefer `import type { ScreenshotSpec } from "@/content/screenshots"` to avoid drift, then define `SCREENSHOTS: ScreenshotSpec[] = []` and `SCREENSHOTS_BY_ID`). Start with an EMPTY `SCREENSHOTS` array (content tasks append rows). Build `SCREENSHOTS_BY_ID` the same way `content/screenshots.ts` does (line ~1222 there).

- [ ] **Step 4: Make `<Screenshot>` resolve BOTH manifests** — `components/ui/screenshot.tsx`

Change the lookup so BESS ids resolve. Merge the two id-maps:

```tsx
import { SCREENSHOTS_BY_ID } from "@/content/screenshots"
import { SCREENSHOTS_BY_ID as BESS_SCREENSHOTS_BY_ID } from "@/content/bess/screenshots"
// ...
const spec = SCREENSHOTS_BY_ID[id] ?? BESS_SCREENSHOTS_BY_ID[id]
```

Everything else in the component is unchanged (it already renders image/placeholder/error by `spec`). Because BESS ids are `bess-`-prefixed, there is no collision with SolarLayout ids.

- [ ] **Step 5: BESS screenshot worklist script** — `scripts/build-bess-screenshot-index.mjs`

Copy `scripts/build-screenshot-index.mjs` and point it at `content/bess/screenshots.ts` → `docs/bess-screenshot-index.xlsx`. Add `"screenshots:index:bess": "node scripts/build-bess-screenshot-index.mjs"` to `package.json`. (Keep the object-literal shape the generator parses.)

- [ ] **Step 6: Update the WRITING_GUIDE to be product-aware** — `docs/WRITING_GUIDE.md`

Add a short subsection under §1 stating: this guide's voice/structure/component rules apply to BOTH product trees; for BESS pages the fact source is `PRODUCT_FACTS.bess.md`, the audience is a battery-storage/hybrid-RE developer, and the "never mention" list inverts — BESS pages never mention the solar-PV product (SolarLayout pages continue to never mention BESS); the family cross-links live only in the shell nav/landing. Do not weaken the existing SolarLayout rules.

- [ ] **Step 7: Run gates + guardrails**

Run: `bun run lint && bun run typecheck && bun run build`
Then: `BESS_REPO=/Users/bhushanv/work/solarlayout/codebase/PVlayout_Advance bun run test:e2e -- tests/bess-content.spec.ts tests/bess.spec.ts tests/bess-facts.spec.ts`
Expected: green (guardrails pass against the two existing stubs, which have no screenshots and resolve their links).

- [ ] **Step 8: Commit**

```bash
git add content/bess/screenshots.ts components/ui/screenshot.tsx \
  scripts/build-bess-screenshot-index.mjs tests/bess-content.spec.ts tests/helpers.ts \
  docs/WRITING_GUIDE.md package.json
git commit -m "feat(bess): content infra — screenshot manifest, guardrails, writing-guide"
```

---

## Content tasks — shared shape

Every content task below follows the same cycle; the task body only lists the pages, their structure, sources, screenshots and links.

For each page in the task:
1. Create `content/bess/<section>/<slug>.mdx` with `title` + `description` frontmatter, opening paragraphs, `##` sections per the "cover" list, a closing `<Cards>` block, all prose sourced from the named fact-sheet `§`.
2. For each distinct UI surface the page describes (a tab, dialog, window, or panel), append a row to `content/bess/screenshots.ts`: `id: "bess-<slug>-<surface>"`, `page: "/bess/<section>/<slug>"`, `title`/`alt`/`what`/`state` written from the fact sheet's description of that surface, `annotations: ""`, `priority: 1` for the page's primary surface else `2`; then reference it with `<Screenshot id="bess-<slug>-<surface>" />`. (The PNG is captured later; the placeholder is expected.)
3. Add the section folder's `meta.json` (title = the sidebar group label; `pages` = the slugs in reading order), and add the section to `content/bess/meta.json`'s `pages` array in the position given by the IA. Never list a page that does not yet exist.
4. Cross-link: every page's closing `<Cards>` links 2–4 related pages; link the first mention of another page's topic inline once.

Then run the gates + guardrails (Global Constraints) and commit `docs(bess): <section> pages`.

`content/bess/meta.json` final `pages` order (built up across tasks):
`intro, getting-started, first-analysis, project-types, install, access, inputs, concepts, analysis, results, financials, plant, exports, reference, troubleshooting, releases, support`

---

### Task 2: Onboarding — rewrite `intro` + `getting-started`, add `first-analysis`, `project-types`

**Files:** Modify `content/bess/intro.mdx`, `content/bess/getting-started.mdx`; Create `content/bess/first-analysis.mdx`, `content/bess/project-types.mdx`; Modify `content/bess/meta.json`, `content/bess/screenshots.ts`.

- [ ] **intro** — Title "What BESS Desktop does" · desc: one sentence. Rewrite the stub into the real overview: a Windows application that sizes and financially models hybrid renewable-energy + battery-storage projects, from a 15-minute dispatch simulation to a bankable report and plant drawings. Cover: what it takes in (generation profile, contracted capacity, costs/tariffs), what it produces (sizing, DFR performance, financial model, layout/SLD). Source §1, §2. Screenshot `bess-intro-window` (the main window). Cards → getting-started, first-analysis, project-types.
- [ ] **getting-started** — Title "Getting started" · The prerequisites (installed app; device activation for Simulate/Optimise/Export; a 15-minute generation CSV, or Standalone mode which needs none), a tour of the main window (the top banner; the left input notebook with **▶ Simulate** / **⚙ Optimise** and its 8 tabs; the right result notebook's 4 tabs; the status bar), and the order the work happens in. Source §2 (Main-window layout, Menu items), §3 (activation gate). Screenshots `bess-getting-started-window`, `bess-getting-started-tabs`. Cards → first-analysis, access/activate, inputs/data.
- [ ] **first-analysis** — Title "Your first analysis" · A complete first run as one `<Steps>` block: pick a project type → load a generation CSV → set the peak window → **Simulate** → read the Dashboard and Financials → export a report. Source §2, §4.1, §4.2, §4.3, §5.2, §6.1, §8. Screenshots `bess-first-analysis-simulate`, `bess-first-analysis-dashboard`. Cards → project-types, inputs/data, analysis/simulate, results/dashboard.
- [ ] **project-types** — Title "Choosing a project type" · The four project types (**1. Solar + BESS**, **2. Wind + BESS**, **3. Solar + Wind + BESS** (default), **4. Standalone BESS (grid-charged)**) and what each enables/disables across the inputs, plus the generation-charged Peak-Shift option. Use a `<Tabs>` or a table. Source §4.1. Screenshot `bess-project-types-radio`. Cards → inputs/data, concepts/how-dispatch-works.

Add `first-analysis`, `project-types` to root `meta.json` (after `getting-started`).

### Task 3: Install — `install/windows`, `install/updates`

**Files:** Create `content/bess/install/{windows,updates}.mdx`, `content/bess/install/meta.json`; modify root `meta.json`, `screenshots.ts`.

- [ ] **install/windows** — Title "Install on Windows" · Install BESS Desktop from the Microsoft Store, first launch (opens fully; no startup gate — activation is prompted only when you Simulate/Optimise/Export), publisher and system requirements. Source §2 (Packaging, Launch). Screenshot `bess-install-store`. Cards → access/overview, getting-started.
- [ ] **install/updates** — Title "Updates and reinstalling" · How Store updates arrive, checking by hand, that activation survives an update/reinstall (it is device-based, not a file), reinstalling/removing. Source §2, §3 (device-based access). Cards → access/troubleshooting, releases.

Section `meta.json` title "Install", pages `["windows","updates"]`; add `install` to root meta after `project-types`.

### Task 4: Access — `access/{overview,activate,troubleshooting}`

**Files:** Create `content/bess/access/{overview,activate,troubleshooting}.mdx`, `content/bess/access/meta.json`; modify root meta, screenshots.

- [ ] **access/overview** — Title "How access works" · Device-based free trial and paid access via SolarLayout; what activation unlocks (**Simulate**, **Optimise**, every **Export**) versus what is free (loading data, **Sensitivity Analysis…**, the plant designer, saving/opening projects); the offline grace. `sales@solarlayout.app` once. Source §3. Cards → activate, troubleshooting.
- [ ] **access/activate** — Title "Activate this device" · A `<Steps>` walkthrough: open **Help ▸ License…**, copy the **Device ID**, click **Get Free Access**, sign in and activate in the browser, return and click **Refresh**. Source §3. Screenshots `bess-access-license-window`, `bess-access-activate-web`. `sales@solarlayout.app` once. Cards → overview, troubleshooting, support.
- [ ] **access/troubleshooting** — Title "Access problems" · An `<Accordions>` list — each access state and message (active / expired / revoked / none), the 3-day offline grace, and the fix for each. Source §3. `sales@solarlayout.app` once. Cards → overview, support.

Section meta title "Access", pages `["overview","activate","troubleshooting"]`; add `access` to root meta after `install`.

### Task 5: Inputs — the 8 tab pages

**Files:** Create `content/bess/inputs/{data,peak-window,sizing,bess,degradation,capex,opex,finance}.mdx`, `content/bess/inputs/meta.json`; modify root meta, screenshots.

One page per tab, each opening with what the tab configures, then a **parameter table** (columns: Field, Default, Range, What it does) for that tab's fields, drawn verbatim from the fact-sheet subsection. Add one `bess-inputs-<slug>` screenshot per page (the tab). Sources and coverage:

- [ ] **inputs/data** — "Generation data" — the generation CSV contract (columns `datetime, solar_pu, wind_pu`; per-1-MW 0–1 values; 35,040 / 8,760 / 30-min rows auto-detected and upsampled; auto-matched columns), **Browse…** / **Load & Preview CSV**, and the generation-charged Peak-Shift option; Standalone builds its own calendar. Source §4.2 (+ §4.1 Peak-Shift). Cards → project-types, peak-window, concepts/how-dispatch-works.
- [ ] **inputs/peak-window** — "Peak and off-peak window" — the **Quick Preset** options, the 24-hour grid, peak vs off-peak for dispatch, the empty-peak CC-firming case. Source §4.3. Cards → concepts/how-dispatch-works, concepts/dfr.
- [ ] **inputs/sizing** — "Capacity and DFR targets" — Contracted Capacity (Fixed Value / CSV Profile, column `cc_mw`), Project/Contract Life, the five DFR Targets, Initial Sizing (Solar/Wind/BESS). Source §4.4. Cards → concepts/dfr, analysis/optimise.
- [ ] **inputs/bess** — "Battery parameters" — RTE (Fixed / Custom Year-by-Year), DoD, SOH, C-rate, EOL basis (Years / Total Cycles) and its sub-fields, EOL strategy (Replacement / Augmentation), SOH degradation (Linear / Custom). Source §4.5. Cards → concepts/battery-model, concepts/degradation-and-eol.
- [ ] **inputs/degradation** — "Generation degradation" — solar/wind Year-1 and Year-2+ generation loss. Source §4.6. Cards → inputs/bess, concepts/degradation-and-eol.
- [ ] **inputs/capex** — "CAPEX" — Solar/Wind/BESS capital cost per MW/MWh. Source §4.7. Cards → inputs/opex, financials/metrics.
- [ ] **inputs/opex** — "OPEX, revenue and penalties" — O&M + escalation, PPA Tariff, Penalty Multiplier, Annual CUF Cap, Export Price (Fixed / CSV), Grid Charging Price + backup + max limit, Optimisation Target IRR. Source §4.8. Cards → financials/tariffs-and-revenue, analysis/optimise.
- [ ] **inputs/finance** — "Financing and discounting" — Discount Rate, PPA Tariff Escalation, Terminal/Salvage Value, LCOE Energy Basis, Payment Delay/Working Capital, Debt Financing, Tax & Depreciation, Advanced Tech-Economic. Source §4.9. Cards → financials/debt-and-tax, financials/working-capital.

Section meta title "Inputs", pages in the order above; add `inputs` to root meta after `access`.

### Task 6: Concepts — `concepts/{how-dispatch-works,dfr,battery-model,degradation-and-eol}`

**Files:** Create the 4 pages + `content/bess/concepts/meta.json`; modify root meta, screenshots.

- [ ] **concepts/how-dispatch-works** — "How dispatch works" — the 15-minute annual simulation (35,040 steps, DT 0.25 h), generation charging, peak vs off-peak, Peak-Shift, CC-firming, Standalone grid charging. Source §5.1. Cards → inputs/peak-window, analysis/simulate, dfr.
- [ ] **concepts/dfr** — "Delivery Fulfilment Ratio (DFR)" — what DFR measures at 15-min/peak/off-peak/monthly/annual, how targets are set, how shortfalls become penalties. Source §6.2 (columns), §4.4 (targets), §6.5 (penalty). Cards → inputs/sizing, results/dfr-table.
- [ ] **concepts/battery-model** — "The battery model" — usable energy = nameplate × DoD × SOH; round-trip efficiency; C-rate; state-of-charge tracking. Source §4.5, §10.2. Cards → inputs/bess, degradation-and-eol.
- [ ] **concepts/degradation-and-eol** — "Degradation, EOL and augmentation" — SOH degradation curves, end-of-life by years vs cycles, replacement vs augmentation, declining battery cost. Source §4.5 (EOL), §4.6, §10.2. Cards → inputs/bess, inputs/degradation.

Section meta title "Concepts"; add `concepts` to root meta after `inputs`.

### Task 7: Analysis — `analysis/{simulate,optimise,sensitivity}`

**Files:** Create 3 pages + `content/bess/analysis/meta.json`; modify root meta, screenshots.

- [ ] **analysis/simulate** — "Simulate" — what a simulation computes, that it needs data (and activation) first, the run summary, and that results fill the four tabs. Source §5.2. Screenshot `bess-analysis-simulate-run`. Cards → results/dashboard, optimise.
- [ ] **analysis/optimise** — "Optimise" — the size search over Solar/Wind/BESS, the three scenarios (**Max IRR • Your Peak Hours**, **Max IRR • Suggested Peak Hours**, **Hits Target IRR (±0.5%)** / Closest Achievable), and applying a scenario from the comparison window. Source §5.3. Screenshot `bess-analysis-optimise-comparison`. Cards → inputs/opex, results/financials.
- [ ] **analysis/sensitivity** — "Sensitivity analysis" — requires a base case first; the five methods (single-variable sweep, tornado, 2-variable heatmap, breakeven solver, Monte Carlo with P-values). Source §5.4. Screenshot `bess-analysis-sensitivity`. Cards → financials/metrics, results/financials.

Section meta title "Analysis"; add `analysis` to root meta after `concepts`.

### Task 8: Reading results — `results/{dashboard,dfr-table,financials,summary}`

**Files:** Create 4 pages + `content/bess/results/meta.json`; modify root meta, screenshots.

- [ ] **results/dashboard** — "The dashboard" — the six panels (generation vs contracted capacity, charge/SOC, monthly DFR, DFR penalty, revenue vs OPEX, cumulative cashflow), the 7-day scroll, **Maximize**. Source §6.1. Screenshot `bess-results-dashboard`. Cards → dfr-table, financials.
- [ ] **results/dfr-table** — "The DFR table" — the monthly table; describe the column groups (delivery %, met/missed flags, shortfalls, penalty, export) and the green/red shading. Full column reference lives in reference/results-columns. Source §6.2. Cards → concepts/dfr, reference/results-columns.
- [ ] **results/financials** — "The financials table" — the headline metrics and the per-year cash-flow columns (grouped), the shading conventions. Full column reference in reference/results-columns; metric definitions in financials/metrics. Source §6.3. Cards → financials/metrics, reference/results-columns.
- [ ] **results/summary** — "The summary report" — the plain-text project report and its export toolbar (**📥 Export PDF**, **💾 Save Plot**, **📄 Save Report**, **📊 Save DFR CSV**, **🕒 Time-Series CSV**, **📈 Sensitivity**). Source §6.4. Cards → exports/pdf-report, exports/data-exports.

Section meta title "Reading results"; add `results` to root meta after `analysis`.

### Task 9: The financial model — `financials/{metrics,tariffs-and-revenue,debt-and-tax,working-capital}`

**Files:** Create 4 pages + `content/bess/financials/meta.json`; modify root meta, screenshots.

- [ ] **financials/metrics** — "Return metrics" — IRR, Equity IRR, NPV, simple & discounted payback, DSCR & DSRA, MoIC, PI, WACC, LCOE (its three energy bases), LCOS — one-line definitions as the app's Formulas guide states them. Source §6.5, §10.4. Cards → tariffs-and-revenue, reference/formulas.
- [ ] **financials/tariffs-and-revenue** — "Tariffs, export and penalties" — PPA tariff + escalation, the annual CUF cap, third-party export pricing (flat or 15-minute market price), grid-charging cost, DFR penalties. Source §4.8, §6.5, §10.3. Cards → inputs/opex, concepts/dfr.
- [ ] **financials/debt-and-tax** — "Debt and tax" — levered analysis (gearing, tenor, moratorium, interest, DSRA) and post-tax analysis (corporate/MAT rates, WDV/straight-line depreciation). Source §4.9, §6.5. Cards → inputs/finance, metrics.
- [ ] **financials/working-capital** — "Payment delay and working capital" — receivable lag, working-capital rate, late-payment surcharge, facility fee, and their effect on IRR/NPV. Source §4.9, §6.5. Cards → inputs/finance, metrics.

Section meta title "The financial model"; add `financials` to root meta after `results`.

### Task 10: Plant layout & SLD — `plant/{overview,generate-layout,generate-sld,cad-editor,symbols,export}`

**Files:** Create 6 pages + `content/bess/plant/meta.json`; modify root meta, screenshots.

- [ ] **plant/overview** — "Plant layout and SLD" — the designer's two tabs, the shared input form (the `_FIELDS` inputs as a table), the auto-placement + drawing editor. Source §7.1. Screenshot `bess-plant-overview`. Cards → generate-layout, generate-sld.
- [ ] **plant/generate-layout** — "Generating the layout" — auto-placing containers → PCS → LV → transformers → MV to scale, wired with power buses, the equipment counts. Source §7.2. Screenshot `bess-plant-layout`. Cards → generate-sld, cad-editor.
- [ ] **plant/generate-sld** — "Generating the SLD" — the same topology as IEC schematic symbols. Source §7.3. Screenshot `bess-plant-sld`. Cards → symbols, export.
- [ ] **plant/cad-editor** — "The drawing editor" — the drawing tools (draw/measure/dimension/rotate…), layers, sheet sizes and title blocks, snapping/ortho, importing a DXF/KMZ background. Source §7.5, §7.6. Cards → symbols, export.
- [ ] **plant/symbols** — "Symbols and custom symbols" — the IEC symbol library, making a reusable symbol from a selection, managing custom symbols. Source §7.4. Cards → generate-sld, cad-editor.
- [ ] **plant/export** — "Exporting the drawing" — writing the layout or SLD out as a titled PDF, a DXF, or a georeferenced KMZ; and that the designer's inputs + drawings save into the `.slb` project. Source §7.7, §7.8. Cards → exports/pdf-report, generate-layout.

Section meta title "Plant layout & SLD"; add `plant` to root meta after `financials`.

### Task 11: Exports — `exports/{pdf-report,word-report,data-exports}`

**Files:** Create 3 pages + `content/bess/exports/meta.json`; modify root meta, screenshots.

- [ ] **exports/pdf-report** — "The PDF report" — the multi-page PDF project report and the two ways to produce it (**Export PDF Report…** / the Summary toolbar). Source §8. Cards → word-report, data-exports.
- [ ] **exports/word-report** — "The Word report" — **Save Project Report (Word)…**: the Detailed Project Report (`.docx`) and its eight sections including the business recommendation. Source §8.1. Cards → pdf-report, results/summary.
- [ ] **exports/data-exports** — "Data exports" — a table of every data export with its exact label and file type: DFR CSV (+15-min detail), the full 15-minute time-series CSV, the dashboard plot (PNG/PDF), the text report; and Save/Open of the `.slb` project. Source §8. Cards → projects (if present) or results/summary, plant/export.

Section meta title "Exports"; add `exports` to root meta after `plant`. (Note: a standalone `projects` page for `.slb` save/open is optional; if omitted, cover save/open inside `exports/data-exports` — do not create a dangling link to a `projects` page that does not exist.)

### Task 12: Reference — `reference/{parameters,results-columns,formulas,glossary}`

**Files:** Create 4 pages + `content/bess/reference/meta.json`; modify root meta, screenshots.

- [ ] **reference/parameters** — "Every input and its default" — the complete input reference across the 8 tabs, one parameter table per tab (Field, Default, Range, What it does), consolidating §4.2–§4.9. Mostly tables. Source §4. Cards → inputs/data, results-columns.
- [ ] **reference/results-columns** — "Result table columns" — every DFR-table column and every Financials per-year column, each with what it reports and the reading conventions. Two tables. Source §6.2, §6.3. Cards → results/dfr-table, results/financials.
- [ ] **reference/formulas** — "Formula reference" — the financial and dispatch formulas exactly as the app's Formulas guide states them (plain-language, no code). Source §6.5. Cards → financials/metrics, glossary.
- [ ] **reference/glossary** — "Glossary" — every BESS term used across the docs, defined, with shipped values where they apply. Source §10. Cards → concepts/how-dispatch-works, financials/metrics.

Section meta title "Reference"; add `reference` to root meta after `exports`.

### Task 13: Help — `troubleshooting`, `releases`, `support`

**Files:** Create `content/bess/{troubleshooting,releases,support}.mdx`; modify root meta, screenshots.

- [ ] **troubleshooting** — "Troubleshooting" — an `<Accordions>` list of common symptoms mapped to the input/state behind them: no results (needs data / a base case), a failed optimisation, a wrong-looking DFR, an empty or missing export, an access-gated action. Source §3, §5 (base-case warnings), §4.2 (CSV requirements). Cards → access/troubleshooting, support.
- [ ] **releases** — "Release notes" — a short intro + `<Release>` entries; note where to check the installed version (Microsoft Store Library). Source: shell page (no fact-sheet numbers beyond the current version if present in §1/§2). Cards → install/updates, support.
- [ ] **support** — "Getting help" — the in-app Formulas guide, these docs, filing an in-app support ticket (needs an activated device), and what to include; `sales@solarlayout.app` once. Source §3 (support), §9. Cards → access/activate, troubleshooting.

Add `troubleshooting`, `releases`, `support` to root meta (the tail, after `reference`).

### Task 14: Wire the BESS landing + restore the BESS nav links

Now that the pages exist, replace the two-link stub landing with a full topic grid and restore the nav links dropped in Phase 0's polish wave.

**Files:** Modify `components/BessLanding.tsx`, `lib/layout.shared.tsx`; possibly `tests/bess.spec.ts` (landing assertion).

- [ ] **Step 1:** In `components/BessLanding.tsx`, mirror `components/DocsLanding.tsx`'s composition — a "Start here" highlight row (install / activate / first-analysis) and a topic grid (Onboarding, Inputs, Concepts, Analysis, Results, Financial model, Plant & SLD, Reference, Help) with 3–4 `/bess/…` links each — every link resolving to a page created in Tasks 2–13. Keep the BESS mark/accent.
- [ ] **Step 2:** In `lib/layout.shared.tsx`, re-add to `bessBaseOptions.links` the two entries removed in Phase 0 — `{ text: "Install", url: "/bess/install/windows" }` and `{ text: "Release notes", url: "/bess/releases" }` — now that both pages exist.
- [ ] **Step 3:** Update the `/bess` landing test in `tests/bess.spec.ts` if it asserted the old stub links.
- [ ] **Step 4:** Gates + full e2e (`bun run test:e2e`); commit `feat(bess): wire the BESS landing and restore nav links`.

### Task 15 (cleanup): tighten the deferred fact-sheet citation ranges

Address the three deferred minors from Phase 1's final review (facts are correct; only the cited line ranges are loose).

**Files:** Modify `docs/PRODUCT_FACTS.bess.md`.

- [ ] Fix §7.3 (symbol 3 m × 3 m sizing) to cite `plant_designer.py:102-105` (not the name-map dict at :84-85); the §8 **Export PDF Report…** row to cite the full `_export_pdf` range; and the `load_project` range + attribute "restores inputs" to `_apply_project`. Verify with `BESS_REPO=… node scripts/check-bess-facts-citations.mjs` (still resolves) and re-open each cited line to confirm it now supports the claim. Commit `docs(bess): tighten three fact-sheet citation ranges`.

---

## Self-review

- **Spec coverage:** every page in the CX spec's BESS IA (§4 of the spec) has a task: onboarding (Task 2), install (3), access (4), inputs ×8 (5), concepts (6), analysis (7), results (8), financial model (9), plant/SLD (10), exports (11), reference (12), help (13). Infra (screenshot manifest, product-aware component, `/bess` content guardrails, WRITING_GUIDE reciprocal rule) is Task 1 — the spec's authoring-discipline items. Landing/nav wiring (14) and the deferred-minor cleanup (15) close the spec's remaining follow-ons. The `solarlayout_web` `/bess` proxy rewrite remains a deploy step (Phase 0's committed note), not a docs-repo task.
- **No placeholders:** each page carries a concrete title/description, an explicit "cover" list, a named fact-sheet `§` source, named screenshots, and named cross-links — not "write appropriate content". The prose itself is composed from the fact sheet at execution (the fact sheet IS the exact content for a docs page), which is the correct analogue of "exact code" for a content plan.
- **Consistency:** the root `meta.json` `pages` order is stated once (Content-tasks shared shape) and each task adds its section in that order; screenshot ids follow one convention (`bess-<slug>-<surface>`); every page ends in `<Cards>`; every task runs the same gate set. Section slugs used in cross-links match the slugs each task creates.
- **Right-sizing:** one task per IA section (a reviewer can gate a section independently). Task 5 (8 input pages) is the largest; if it runs long in execution, it can be split at the tab boundary without changing any interface.
