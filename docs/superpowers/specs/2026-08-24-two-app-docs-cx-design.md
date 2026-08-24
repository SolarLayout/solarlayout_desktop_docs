# Two-app documentation CX — design spec

**Status:** approved design (2026-08-24). Implementation is follow-on.

**Goal:** Extend the single-product SolarLayout Desktop docs site into a
**two-app family site** that documents both **SolarLayout Desktop** and
**BESS Desktop**, with BESS following the exact same pattern, practice and
authoring discipline already established for SolarLayout.

**Architecture in one line:** SolarLayout stays exactly where it is at
`/docs/*`; BESS is added as a **separate, parallel docs tree at `/bess/*`**,
with a product switcher in the nav and a product-picker landing at `/`. No
SolarLayout URL moves; no redirects.

---

## 1. Context

The site is **Fumadocs v16** (Next.js 16 / React 19 / Tailwind v4, Bun),
MDX-on-disk, no CMS. It currently documents **only** SolarLayout Desktop:
61 pages under `content/docs/`, one `defineDocs` collection, one loader at
`/docs`, one route tree, one search index, no product switcher. The voice
guide today even forbids mentioning BESS.

Two supporting disciplines govern all content and must be replicated for BESS:

- **`docs/PRODUCT_FACTS.md` is the only permitted factual source.** It is
  built by reading the application source, every value carries a `file:line`
  citation, and it flags ~14 places where the app's own README/help/docstrings
  are stale (publish the UI-shipped value, not the code default). The build
  fails on any unresolved `VERIFY`/`TBD`/`TODO`/`FIXME`.
- **Screenshots and videos are index-driven manifests** (`content/screenshots.ts`,
  `content/videos.mjs`): one typed source, two consumers (the in-page
  component + an Excel capture/record worklist), so the worklist can never
  drift from the pages.

Page shape is fixed (WRITING_GUIDE.md): two front-matter fields
(`title`, `description`) → lead-with-the-answer prose (no `#`) → `##`
sentence-case sections → a mandatory closing `<Cards>` cross-link block, using
a fixed component set (`Callout`, `Steps`, `Cards`, `Tabs`, `Accordions`, and
the local `Screenshot`/`Release`).

The BESS app (`apps/bess-tool` in `PVlayout_Advance`) is a standalone tkinter
app for **hybrid RE + battery-storage** project design: 4 project types → 8
input tabs (Data, Peak, Sizing, BESS, Degrad., CAPEX, OPEX, Finance) →
**Simulate / Optimise / Sensitivity** → 4 result tabs (Dashboard, DFR Table,
Financials, Summary) → a full **Plant Layout & SLD** CAD designer → Word / PDF
/ CSV exports. It uses the same Mogambo device-activation model and in-app
support as SolarLayout.

---

## 2. Decisions (locked)

| # | Decision | Choice | Rationale |
|---|---|---|---|
| D1 | Multi-product structure | **Separate `defineDocs` roots + parallel route trees** (SolarLayout `/docs/*`, BESS `/bess/*`) | SolarLayout URLs stay stable; no mass URL move, no redirects, no `solarlayout_web` proxy rewrite of existing paths, no edits to hundreds of internal links or ~115 index rows. |
| D2 | Launch context | Docs site is **pre-launch / not yet linked** | Confirmed; still choosing the stable-URL structure so a later public launch never has to migrate. |
| D3 | BESS base path | **`/bess`** (sibling of `/docs`) | `/docs/bess` collides with the existing `/docs/[...slug]` catch-all; a sibling base is clean. |
| D4 | Licensing section name | **"Access"** (not "Licence") | BESS has no licence file — it is device activation (Device ID → Get Free Access → activate in browser). **Future:** SolarLayout's docs will later adopt "Access" too, to match the new Trial Access experience. |
| D5 | Financial content depth | A dedicated **4-page "The financial model" section**, separate from the result-tab pages | The financial model is a headline BESS capability and warrants conceptual pages of its own. |
| D6 | Session scope | **CX design + this committed spec.** | Implementation (shell change, BESS fact sheet, ~49 BESS pages, worklists) is planned/built as follow-on. |

---

## 3. Site shell — one product → a family

SolarLayout's tree and URLs are untouched. The shell changes are additive.

| Surface | Today | Two-app design |
|---|---|---|
| Landing | `DocsLanding` renders at both `/` and `/docs` | `/` → **product picker** (two cards: SolarLayout Desktop · BESS Desktop, each linking into its tree); `/docs` → SolarLayout landing (unchanged); `/bess` → a new **BESS landing** |
| Source wiring | one `defineDocs` (`source.config.ts`) + one loader (`lib/source.ts`, baseUrl `/docs`) | add `export const bess = defineDocs({ dir: "content/bess", … })` and `export const bessSource = loader({ baseUrl: "/bess", source: bess.toFumadocsSource() })` |
| Routes | `app/docs/(sidebar)` + `app/docs/(landing)` | add parallel `app/bess/(sidebar)/layout.tsx`, `app/bess/(sidebar)/[...slug]/page.tsx`, `app/bess/(landing)/page.tsx`, mirroring the `docs` route group exactly |
| Nav title + switcher | `lib/layout.shared.tsx` → "SolarLayout Desktop Docs" + 3 links | product-aware base options: SolarLayout title on `/docs/*`, "BESS Desktop Docs" on `/bess/*`; a **product dropdown/link** in the top nav on both, so a reader can cross to the other app |
| Search | `createFromSource(source)` (one route) | index **both** sources; results labelled by product (two indexed sources, one search dialog) |
| Branding | `SolarLayoutLogo` (`#d36e31`); token bridge in `app/global.css` | add a `BessLogo` component + one BESS accent hex drawn from the app's navy/amber identity; the BESS route tree points its base options at the BESS mark. Palette continues to flow through `--color-fd-*` tokens |
| Proxy (`solarlayout_web`) | rewrites `/docs` (and `/screenshots`) | add a sibling `/bess` rewrite (and BESS asset path) — trivial and low-risk pre-launch |
| Tests | `tests/navigation.spec.ts`, `tests/content.spec.ts` (partly URL-hardcoded to `/docs`) | mirror them for the `/bess` tree; keep the existing SolarLayout assertions unchanged (they keep passing because SolarLayout URLs do not move) |

**Non-goals (YAGNI):** no Fumadocs native root-toggle (rejected as D1); no
moving/renaming any SolarLayout page; no shared "generic" pages between the two
products (each app owns its full tree even where a page is near-identical —
app name, Device ID dialog, and store link all differ per app); no CMS; no
change to the SolarLayout content in this project (the "Access" rename is a
separate future task).

---

## 4. BESS documentation tree (`content/bess/`, served at `/bess/*`)

~49 pages, in sidebar (`meta.json`) order. Sections marked ▸ are generic
scaffolding that mirror SolarLayout near-mechanically; the rest is BESS-domain
content written from the BESS fact sheet.

Root `content/bess/meta.json` order:
`intro, getting-started, install, access, first-analysis, project-types,
inputs, concepts, analysis, results, financials, plant, exports, projects,
reference, troubleshooting, releases, support`

```
intro                 What BESS Desktop does — hybrid RE + battery sizing, 15-min dispatch → bankable report
getting-started       Prereqs, a tour of the banner + 8 input tabs + 4 result tabs, the order of work

install/  (Install) ▸
  windows             Install BESS Desktop from the Microsoft Store, first launch, publisher/requirements
  updates             How Store updates arrive, checking by hand, why activation survives, reinstalling

access/  (Access) ▸    device activation — no licence file; the app's Help ▸ "License…" window
  overview            Device-based free trial / paid access; what activation unlocks (Simulate, Optimise,
                      Export) vs what is free (load data, Sensitivity, Plant Designer, Save/Open)
  activate            Copy the Device ID, click Get Free Access, sign in and activate in the browser,
                      return and Refresh
  troubleshooting     Every access state (active / expired / revoked / none) and message, the 3-day
                      offline grace, and the fix for each

first-analysis        Your first run: pick a project type, load a generation CSV, set the peak window,
                      run Simulate, read the Dashboard and Financials, export a report (Solar+Wind+BESS)
project-types         The four types (Solar+BESS, Wind+BESS, Solar+Wind+BESS, Standalone grid-charged)
                      and what each enables/disables across the inputs

inputs/  (Inputs)      the eight input tabs
  data                Generation CSV (columns, resolution, per-MW values, auto-detect/upsample) and the
                      generation-charged peak-shift option; Standalone builds its own calendar
  peak-window         Marking peak hours (presets or the 24-hour grid), peak vs off-peak for dispatch,
                      and the empty-peak CC-firming case
  sizing              Contracted Capacity (fixed or CSV profile), the five DFR targets, project/contract
                      life, and the initial Solar/Wind/BESS sizing
  bess                RTE, DoD, SOH, C-rate, EOL basis (years or cycles), replacement vs augmentation,
                      and the SOH degradation curve
  degradation         Year-1 and annual generation loss for solar and wind
  capex               Capital cost per MW / MWh for solar, wind and battery
  opex                O&M and escalation, PPA tariff and penalty multiplier, the annual CUF cap,
                      third-party export price, grid-charging price, and the optimisation target IRR
  finance             Discount rate and escalations, LCOE basis, working-capital/payment-delay terms,
                      optional debt (levered) and tax (post-tax), advanced techno-economic inputs

concepts/  (Concepts)  the model — the "why"
  how-dispatch-works  The 15-minute annual simulation: generation vs contracted capacity, battery
                      charge/discharge, peak-shift, CC-firming, standalone grid charging
  dfr                 Delivery Fulfilment Ratio at 15-min/peak/off-peak/monthly/annual; how targets are
                      set and how shortfalls become penalties
  battery-model       Usable energy = nameplate × DoD × SOH; round-trip efficiency; C-rate; SOC tracking
  degradation-and-eol SOH degradation curves, end-of-life by years vs cycles, replacement vs
                      augmentation, and the declining battery cost

analysis/  (Analysis)
  simulate            What a simulation computes and the run summary; what it needs first
  optimise            The differential-evolution size search, the three scenarios (your peak / suggested
                      peak / hit-target-IRR), and applying a scenario from the comparison dialog
  sensitivity         The five methods: single-variable sweep, tornado, 2-variable heatmap, breakeven
                      solver, and Monte Carlo (P-values)

results/  (Reading results)   the four result tabs
  dashboard           The six panels (generation vs CC, charge/SOC, monthly DFR, DFR penalty, revenue vs
                      OPEX, cumulative cashflow), the 7-day scroll and maximize
  dfr-table           The monthly DFR table: every column, the met/missed shading, shortfall & penalty
  financials          The headline metrics and the per-year cash-flow columns, with shading conventions
  summary             The plain-text project report and its own export toolbar

financials/  (The financial model)   the money model — the "why"
  metrics             IRR and equity IRR, NPV, simple and discounted payback, DSCR and DSRA, MoIC, PI,
                      WACC, LCOE and LCOS — what each means and where it appears
  tariffs-and-revenue PPA tariff and escalation, the annual CUF cap, third-party export pricing (flat or
                      15-minute market price), grid-charging cost, and DFR penalties
  debt-and-tax        Levered analysis (gearing, tenor, moratorium, interest, DSRA) and post-tax analysis
                      (corporate/MAT rates, WDV/straight-line depreciation)
  working-capital     Receivable lag, working-capital rate, late-payment surcharge and facility fee, and
                      their effect on IRR/NPV

plant/  (Plant layout & SLD)
  overview            The designer's two tabs, the shared input form, the auto-placement engine + CAD editor
  generate-layout     Auto-placing containers → PCS → LV → transformers → MV to scale, wired with power
                      buses, and the equipment counts
  generate-sld        The same topology drawn as IEC schematic symbols (battery, PCS, 2/3/5-winding tx)
  cad-editor          The CAD toolbar (draw/measure/dimension/rotate), layers, sheet sizes and title
                      blocks, snapping/ortho, and importing a DXF/KMZ background
  symbols             The IEC symbol library, making a reusable symbol from a selection, custom symbols
  export              Writing the layout or SLD out as a titled PDF, a DXF, or a georeferenced KMZ

exports/  (Exports)
  pdf-report          The multi-page PDF project report and the two ways to produce it
  word-report         The Detailed Project Report (.docx): its eight sections incl. the recommendation
  data-exports        DFR CSV (+15-minute detail), the full 15-minute time-series CSV, the dashboard plot
                      (PNG/PDF), and the text report

projects              The .slb project file keeps a whole session (inputs, generation data, last results,
                      plant-layout + SLD drawings)

reference/  (Reference)
  parameters          Every input across the eight tabs: default, range, unit, and what it changes
  results-columns     Every column of the DFR and Financials tables and the reading conventions
  formulas            The financial and dispatch formulas exactly as the app's Formulas guide states them
  glossary            Every BESS term used across the docs, defined, with shipped values

troubleshooting       Common symptoms (no results, a failed optimisation, a wrong-looking DFR, an empty
                      export) each mapped to the input behind it
releases              What changed in each BESS Desktop release and how to check the installed version
support               The in-app Formulas guide, these docs, filing an in-app support ticket, what to include
```

**Page-count parity:** ~49 BESS pages vs 61 SolarLayout — comparable depth.
About 10 pages (intro, getting-started, install×2, access×3, projects, releases,
support) are near-mechanical mirrors of SolarLayout's generic scaffolding; the
rest is BESS-domain content.

---

## 5. Authoring discipline for BESS (replicate the SolarLayout practice)

1. **A BESS fact sheet is a hard prerequisite for all BESS content.** Create
   `docs/PRODUCT_FACTS.bess.md`, source-cited from `apps/bess-tool` in
   `PVlayout_Advance`, as the **only** permitted factual source for BESS pages.
   It must pin every default, range, unit, label and behaviour with a
   `file:line` citation and flag any stale in-app text (e.g. the About box says
   "25-year financial model" while the default Project Life is 20 years —
   publish 20). No BESS page states a number/label absent from this sheet.
2. **Per-product manifests:** `content/bess/screenshots.ts` and
   `content/bess/videos.mjs`, mirroring the SolarLayout shape exactly; the index
   scripts (`scripts/build-screenshot-index.mjs`, `build-video-index.mjs`)
   generalized (or duplicated) to emit BESS worklists. Keep object shapes
   identical so the Excel generators keep parsing.
3. **One shared `WRITING_GUIDE.md`** for voice/structure/component vocabulary
   (product-neutral), with a per-product **terminology + "never mention"**
   block. Two edits: (a) relax SolarLayout's current "never mention BESS" so the
   shell can cross-link the two products; (b) add BESS's reciprocal rule — BESS
   pages never carry solar-plant content, cloud product, or tier/edition
   framing. British spelling in prose; UI labels quoted verbatim (the BESS app
   mixes: menu "License…", button "Optimise").
4. **Same gates before commit:** `bun run lint && bun run typecheck &&
   bun run build`; the Playwright suite before a deploy. No `VERIFY`/`TBD` may
   survive; every internal link resolves; every `<Screenshot id>` exists in the
   BESS manifest; every on-disk BESS page is listed in a `meta.json`.

---

## 6. Implementation phasing (for the follow-on plan)

0. **Shell** — second source/loader (`content/bess` → `/bess`), parallel
   `app/bess` route tree, product-aware base options + nav product switcher,
   `/` product picker + `/bess` landing, `BessLogo` + accent token, mirrored
   `navigation`/`content` tests, `solarlayout_web` `/bess` rewrite. Deliverable:
   an empty-but-navigable BESS tree with a working switcher and search.
1. **`docs/PRODUCT_FACTS.bess.md`** — blocks all content; do first.
2. **Generic mirror pages** (~10): intro, getting-started, install×2, access×3,
   projects, releases, support.
3. **Domain pages** in reading order: inputs → concepts → analysis → results →
   financials → plant → exports → reference.
4. **Screenshot + video worklists** — populate `content/bess/screenshots.ts` /
   `videos.mjs` as pages are written; capture is a separate pass.

Each phase ends green on the three gates.

---

## 7. Open items / future work (out of scope here)

- **SolarLayout "Access" rename:** a later, separate task will migrate the
  SolarLayout docs' "Licence" section to "Access" to match the new Trial Access
  experience. Keep the BESS "Access" naming and structure reusable for that.
- **BESS brand accent + `BessLogo`:** the exact hex/mark is finalized during
  shell implementation (drawn from the app's navy `#1a3a5c` / amber identity).
- **Combined vs product-scoped search:** default is one search dialog indexing
  both trees with product-labelled results; revisit if it feels noisy.
- **Deployment:** the docs `deployment.yml` already builds the whole Next app,
  so the BESS tree ships with the same Deploy workflow; only the
  `solarlayout_web` `/bess` rewrite is new.
