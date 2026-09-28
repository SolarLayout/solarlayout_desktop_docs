# Resume prompt — desktop docs update for the 2026-09-21 → 2026-09-28 product changes

Paste everything below the line into a fresh Claude Code session **on the
Windows capture machine**, opened in this repo (`solarlayout_desktop_docs`)
with the product repo (`PVlayout_Advance`) added as a working directory
(`/add-dir <path>`).

---

## Task

SolarLayout Desktop (product repo `PVlayout_Advance`) shipped a batch of
features and fixes between 2026-09-21 and 2026-09-28. This docs site was last
verified against the product on 2026-09-21 (plus a 2026-09-22 update for CAD
import and the cable schedule). Bring the **SolarLayout Desktop** docs
(`content/docs/**`) up to date:

0. Analyse every user-facing change fully (list below) against the current
   product `main`.
1. Update `docs/PRODUCT_FACTS.md` first (every new fact with a `file:line`
   citation), then the pages.
2. Recapture every screenshot the changes made stale.
3. Add new pages for the new capabilities, with screenshots.
4. Open a PR against `main` of this repo.

BESS (`content/bess/**`) is **out of scope** even though BESS PRs (#199, #205,
#245–#250, #256–#263) merged in the same window.

## Rules you must follow

- Read `CLAUDE.md`, `docs/WRITING_GUIDE.md` and `docs/PRODUCT_FACTS.md` before
  touching content. The fact sheet is the only permitted factual source; §18
  lists known-stale sources (including the product's in-app F1 guide).
- **No change-log prose in pages.** Pages document the product as it is — never
  "now", "no longer", "new in this release", "previously", "we changed".
  Change history goes **only** on `content/docs/releases.mdx`, as a compact,
  distilled, user-facing entry. (Standing instruction from the product owner.)
- Never name code identifiers, files or classes in pages; never mention BESS,
  tiers, GitHub, non-Windows platforms.
- Screenshots are never pending: every `content/screenshots.ts` entry has its
  PNG under `public/screenshots/`; delete stale files, never keep an old image
  behind a new id; no desktop screen-grabs, never the maximised window.
- Capture on **Windows, real display** (not `--offscreen`, which drops all
  widget text on Windows). The existing set is Segoe UI with the menu bar
  drawn in-window; a macOS capture renders Helvetica and does not match — that
  is why this work moved to Windows.
- Gates before the PR: `bun run lint && bun run typecheck && bun run build`,
  `bun run test:e2e`, then `bun run screenshots:index`.
- Deployment is manual; pushing never deploys.

## Product changes to cover (merged PRs, product repo)

Baseline for the audit below: product `main` at `ee1d389` (2026-09-28). Check
`git log --first-parent main` for anything merged after that and include it.

| Area | PRs |
|---|---|
| Earthing Design (new window) | #318 (issue #317) |
| Robot count from DXF (new window), new **Tools** menu | #276, #299 |
| AC-capacity study: **ICR block AC** input; banner reserves a fix row | #292, #299 |
| ICR block summary window, ICR-block PDF, ICR-block DXF summary tables | #291, #296 |
| Piles on half tables; pile patterns as saved design inputs | #290, #288, 65c3f8b, #296 |
| ICR count per separate land piece; balancing; second re-check | #274 |
| Electrical grouping: **ACCB & Transformer** card, Summary rows | #301 (issue #227) |
| Transformers on PMaxOut; power transformer from a standard MVA list | #309, #306 |
| AC feeders 3C × 300 mm² Al on IMaxAC; drop as a plant budget | #305 |
| LV-IDT rows carry AC output; LV-IDT for every block; Collection schedule | #308, #310 |
| Automatic SLD never reads the BOM | #303 |
| DC comb routed in full; "(est.)" only above 30 000 tables | #275 |
| Leapfrog wiring defaults (Cables card) | #289 |
| Every inverter/SMB gets a cable; routes contained inside the plant; ICR assignment by in-plant distance within rating | #208 |
| Results say when they are out of date and refuse to export | #302 (issue #77) + follow-ups |
| Design warnings in the Summary, PDF and BOM | #315 (issue #242), 1f1f0bc |
| Location: a DXF keeps its own coordinates; nothing pre-filled | #295 (issue #279) |
| Reopening a project enables exports and layout tools | #298 (issue #293) |
| Leaving Sketch mode does no work when nothing changed | #219 |
| One cable run at a time (cards disabled, edits queued) | #319 (issue #243) |
| Headless BOM core — **no user-visible change** (BOM view still uses the old builder) | #277 |

## Audit findings from the aborted macOS session (leads — re-verify each)

Four read-only audits ran against `ee1d389`. Citations are product-repo
relative; `MW` = `apps/solarlayout-desktop/solarlayout_desktop/main_window.py`,
`IP` = `.../input_panel.py`. Line numbers drift — re-read before citing. The
fifth audit (fresh results #302, design warnings #315, location #295) was
stopped before reporting: **do that one from scratch.**

### A. Cross-cutting (touches many pages)

- Menu bar is **File · Edit-Pile · Tools · Help** (`MW:1315-1323`). **Tools**
  holds **Robot count from DXF…** and **Earthing Design…**. Pages that list
  three menus: `getting-started.mdx`, `workspace/main-window.mdx`,
  `reference/keyboard-and-commands.mdx` ("Three menus, nine items" → four
  menus, eleven items).
- The **Studies** card (Tools tab) has five buttons, in order: 🔆 Simulation
  with AC Capacity · 🤖 Robotic Module Cleaning · Robot count from DXF… ·
  🌓 Shadow View (row spacing) · ⚡ Earthing Design (`MW:1497-1514`). Robot
  count from DXF… is enabled before a layout; the rest after
  (`MW:1512-1513, 4502-4504`). The Tools tab "lock" is only a tooltip,
  *Generate a layout first* (`IP:361-366`). Fix "first of three",
  "second of three", "third button" in `simulation/ac-capacity.mdx`,
  `simulation/robotic-cleaning.mdx`, `energy/shading.mdx`; fact sheet
  §10 (`:1226-1230`), §16, and `:320-321`, `:880`.
- **ICR Block** field shows three decimals (`18.000 MWp`, `IP:1020-1028`);
  the AC-capacity study can write to it.
- Electrical tab card order: String Inverter / SMB · **ACCB & Transformer**
  (central: **Transformer**) · Cables (`IP:291-294, 1327`).

### B. Earthing Design (new page — suggest `simulation/earthing.mdx` or a new "Studies" placement)

- Reached from **Tools ▸ Earthing Design…** (always enabled; with no usable
  layout a box *Generate first* — *"Generate a layout first, then open
  Earthing Design."*, `MW:9131-9136`) or **⚡ Earthing Design** on the Studies
  card. Non-modal window **Earthing Design**, opens 1240×760.
- Seven input groups (`earthing_dialog.py`): **Soil & site**, **Fault data**,
  **Targets**, **Earth pit (maintenance-free)**, **Conductors**, **Equipment
  rules**, **Layout rules** — full label/default/range tables are in the
  dialog (`earthing_dialog.py:158-298`), defaults also in
  `packages/solar-core/solar_core/earthing/calc.py:95-172`. No Run button:
  recalculates 300 ms after any change.
- Method: IEC 60364-5-54 adiabatic conductor sizing (+ corrosion allowance,
  90 mm² / 3 mm minimum), Dwight pit resistance with backfill, EN 50522
  grid R = ρ/(2D), IEC 61936-1 touch voltage, IEC 62305-3 LA earthing;
  IS 3043 and IEEE 80 shown as cross-checks, not governing (design-basis
  table `earthing/report.py:19-28`). Governing grid R = max(IEC, IEEE 80).
- Results tabs **Layout · Calculation · BoQ**; verdict banner
  *"{n} earth pits · plant grid {x.xx} Ω (target ≤ {t} Ω)"*. Calculation
  report sections 1–10 (`report.py:98-214`); BoQ columns S.No · Description ·
  Qty · Unit · Remark (`earthing/layout.py:632-675`).
- Footer exports: **Export PDF report…** (`Earthing_Design.pdf`),
  **Export DXF…** (`Earthing_Layout.dxf`, `EARTH_*` layers),
  **Export BoQ…** (`Earthing_BoQ.csv`). Not in the Export ▾ menu; not in the
  main DXF/KMZ/report/BOM view/Summary.
- **Inputs are not saved in the `.slp`** (kept for the session only,
  `MW:9138-9142`); the window does not follow a later Generate and is never
  marked out of date. Pages to touch: `projects.mdx` (not kept),
  `bom/overview.mdx` (earthing not in the BOM view),
  `layout/lightning-arresters.mdx`, `exports/dxf.mdx`,
  `reference/parameters.mdx`, `reference/keyboard-and-commands.mdx`.
- Product bugs noticed (report to the product owner, do not document as
  behaviour): X/R = 0 is allowed and raises an unexpected-error; the Tools-menu
  tooltip never shows.
- **Check whether a tagged release contains #318** before writing a release
  entry for it (at audit time the latest tag `solarlayout-v2.0.2.0`,
  2026-09-25, did not).

### C. Robot count from DXF (new page or section under `simulation/`)

- Window **Robot count from DXF** (`robotic_dxf_dialog.py`), independent of the
  project; nothing added to the current project. Cards DRAWING (File /
  **Open DXF…**, Structure **Fixed tilt / Tracker**, Gaps found), ROBOT
  (**Travel per charge** 0 = *no limit*; **Standard bridge span** starts at
  the drawing's most common gap; **Skip lines up to**; **Out and back**),
  RESULT verdict; tiles Standard bridges · Wide gaps · Longest segment · One
  full pass; views **Layout · Gaps · Rows · Layers** (layer roles guessed from
  names, editable). Footer **Export PDF…** (`"<stem> - robot count.pdf"`).
  Layer-name keyword rules: `packages/solar-core/solar_core/robotic_dxf.py:82-161`.
- The existing Robotic Module Cleaning window is unchanged since 2026-09-19,
  but the page has pre-existing errors: **Blocked by** only shows under
  **At equipment**; **Bridge all** reads **Preview all** on the Crossing
  filter; header *GAPS IN OPEN GROUND · n* when there are no equipment gaps
  (`robotic_cleaning_dialog.py:315-376`).

### D. AC capacity

- New **ICR block AC** input under the tiles (0–5 000 000 kW, *Not set* = 0):
  *"→ n blocks of x MWp DC"* / *"keeps the input panel's N MWp blocks"*;
  Regenerate writes the block DC (rounded up, 3 dp) into **ICR Block**
  (`ac_capacity_dialog.py:265-290, 547-558`; `MW:9562-9570`). Also document
  the disabled-Regenerate reasons and the AC default rule (pre-existing gaps).

### E. ICR blocks (new page suggested: `layout/icr-blocks.mdx`, after `icr`)

- A block = the tables wired through their inverter/SMB to one ICR; blocks
  never overlap, can be in pieces. **Layers ▾ ▸ ICR blocks** is enabled once
  inverters are grouped. Click a block (not the building), or focus the plot
  and use arrow keys + Enter, to open a modeless summary window
  **"ICR-k — <plant>"**: tiles, rows (area, perimeter, ACCBs, Transformer,
  Transformer load, inverter/AC capacity, DC/AC, cable lengths, LAs, piles),
  footer **PDF…** · **Copy** · **Close** (`icr_block_summary_dialog.py`,
  `solar_core/icr_block_summary.py:237-295`). Energy is not split per block.
- New **Export ▸ Export ICR-Block PDF** (A3; sheet 1 plant with ICR BLOCKS
  table, then one sheet per block with key plan; `solar_core/icr_block_pdf.py`).
  **Export ICR-Block DXF** sheets now carry summary tables (`SUMMARY_TABLE`,
  `ICR{n}_TABLES`, `ICR{n}_BND` layers). Fix `intro.mdx` ("a PDF is produced
  only for the pile drawing"), `troubleshooting.mdx`, `exports/*`,
  `licence/overview.mdx`.
- ICR count (#274): per separate piece of land (tables > 300 m apart), exactly
  k blocks of equal capacity ±5 % (half table = 0.5), your ICR L × W used for
  the fit, a second count re-check after the shadow keep-clear that only ever
  lowers the count (`solar_core/icr_placer.py`, `layout_engine.py:867-958`).
  Touches `layout/icr.mdx`, `how-placement-works.mdx`, `inputs/site.mdx`,
  `reference/parameters.mdx`, `reference/summary-columns.mdx`,
  `troubleshooting.mdx`.

### F. Piles (rewrite `editing/piles.mdx`)

- A full pattern plus a half pattern (derived by default: same end overhang,
  fewest even spans; a half tracker gets a centre drive pile — `solar_core/piles.py:31-121`).
  Pile layout window shows a **Full / Half** switch only when the plant has
  half units, with status lines, **Review**, **Reset to derived**, a ⚠ when
  the full pattern changed since (`pile_dialog.py:137-427`). Footer adds
  *"N piles across the plant"*; new status texts (`MW:5244-5255`).
- Patterns are saved in the project and survive Generate and boundary loads.
  Every output counts each table's own piles (Summary, overlay, Excel with a
  new **Unit** column, PDF with piles, DXF `PILES`, ICR-block outputs). The
  DXF `PILES` layer needs a pattern **and** the Piles overlay ON. Delete the
  "Half tables receive the full pattern" section and the fact sheet §19a
  claim.

### G. Electrical grouping (new page suggested: `inputs/accb-and-transformers.mdx`)

- Card rows (`IP:1320-1411`, defaults `MP:197-212`): **Inverters per ACCB,
  max** 15 · **ACCBs per transformer, max** 4 (central: **Central inverters
  per transformer, max** 4) · **Transformer size limit** 17.2 MVA ·
  **Standard transformer ratings (kVA)** 2500 … 16000 · **MV voltage** 33 kV ·
  **Power transformer margin** 1.00 × · **Power transformer derating** 1.00 × ·
  **Standard power transformer ratings (MVA)** 10 … 100 · **LV voltage** (from
  the OND) · live answer line *"Now: …"*. Rating-list validation messages in
  `solar_core/electrical_grouping.py:72-93`.
- Sizing rules `electrical_grouping.py:96-267`: per ICR block; IDT load =
  Σ PMaxOut (kVA); smallest listed rating ≥ load; windings = feeders + 1;
  power transformer (MCR only) = Σ PMaxOut × margin ÷ derating → next listed
  MVA. Without an OND: counts only, "needs OND".
- Edits regroup without Generate, refresh Summary, rebuild the auto SLD if
  open, flag the BOM for rebuild (discarding manual BOM edits), close ICR
  block windows; saved in the project; do not mark results out of date.
- Summary ELECTRICAL gains **ACCBs** (string only) · **Transformers (IDT)** ·
  **Power transformer (MVA)**. BOM ACCB/IDT/Power Transformer remarks changed
  (`bom_builder.py:165-194`).
- Caveat to verify: the MV voltage tooltip claims it drives the MV cables, but
  the cable schedule stays at 33 kV (`cable_schedule.py:84, 579, 602`).
- SLD (#303): built from the layout, the grouping and the OND — never the BOM.
  `sld/auto-build.mdx` and `sld/overview.mdx` say "from the bill of materials"
  — wrong. Winding symbol caps at 5-Wdg. The Automatic tooltip still says
  "+ BOM" (stale product string — list in fact sheet §18).

### H. Cables and the cable schedule

- Cables card defaults: **Inter-module lead** 0.00 m/module, **String return
  run along table** off (leapfrog), new tooltips (`IP:1512-1531`); the three
  allowances **are saved** in the project — fix `inputs/cables.mdx`,
  `layout/cables.mdx`, `projects.mdx`, `reference/parameters.mdx`.
- Every cable is routed; only plots over 30 000 tables sample the DC comb and
  label the DC trench "(est.)" in BOM/PDF/DOCX (not on screen). Remove the
  "fast geometric estimate" claims (`layout/cables.mdx`,
  `how-placement-works.mdx`, `troubleshooting.mdx`, fact sheet §17).
- Inverter → ICR: nearest along the plant within the building's rating, with
  hand-off to one of the 5 nearest within 1.5 spacings; runs re-routed inside
  the plant rather than clipped (`string_inverter_manager.py:537-543, 794-840, 3151-3160`).
- Cable schedule (`cable_schedule.py`): AC feeders 3C × 300 mm² Al one run,
  stepped up and flagged only when needed; new **Flag** column; A3 line with
  the 1.5 % average LV drop budget / 2.5 % flag; third table **"Collection
  Schedule (ACCB/CINV - IDT - MCR)"** with LV-IDT rows for every block and the
  MV row only with an MCR/USS; new Basis line. Update `exports/dxf.mdx` and
  the fact sheet §13.1.
- #319: while cables route, the Obstructions and Main Control Room & Objects
  cards are disabled with *"Cables are being routed… …"*; edits are queued.
- #219: leaving Sketch mode with no change → status *"Sketch Mode OFF."*, no
  recompute.
- #298: reopening a saved project enables exports and layout tools without a
  Generate; the status may read *"Opened <name> · the layout matches its
  inputs"* (#77 — verify).

### I. Still to audit from scratch

- #302 / #77 fresh results: out-of-date state, stage-tab amber dot, banners in
  the Summary window and ICR-block windows, exports refused — exact strings,
  where they appear, how to clear. Likely a new page (e.g.
  `workspace/out-of-date-results`).
- #315 / #242 design warnings: every warning kind with verbatim text and
  trigger, in the Summary, PDF and BOM; possibly a "Design warnings" chip in
  the KPI strip. Likely `reference/design-warnings`. Find whether the bundled
  sample site produces any warning (for a screenshot).
- #295 / #279 location: the **CAD boundary** location window now opens with
  empty latitude/longitude, a **Place by latitude and longitude / Layout only**
  switch and **Place the drawing here** (confirmed by a test capture) — the
  `dxf-site-coordinates` screenshot and `inputs/cad-boundary.mdx` are stale;
  check the image-boundary flow and the pile Excel's "X drawing / Y drawing"
  columns when not surveyed.

## Screenshots

### Capture tool changes needed in the product repo first

`tools/docs_site_shots.py` (see `CAPTURING_SCREENSHOTS.md`) — make these
changes on a product branch and PR them there:

1. **Bug:** `menus()` zips the menu-bar actions with three names; with the new
   Tools menu a rerun saves the Tools menu as `support/help-menu.png`. Match by
   menu title and add `tools-menu`.
2. Earthing Design is non-modal (`show()`): grab `w._earthing_dialog` directly
   after `w._open_earthing_design()`, per tab (Layout, Calculation, BoQ).
3. Robot count from DXF: after the exports block writes `_files/layout.dxf`,
   open the dialog, `load()` the DXF, wait for the reader thread
   (`tests/test_robotic_dxf_dialog.py:56-63`), capture Layout / Gaps (some
   ticked) / Layers; optionally export its PDF and render page 1.
4. ICR block summary window (`w._open_icr_block_summary(k)`), a
   keyboard-selected block on the plot, and **Export ICR-Block PDF** /
   ICR-block DXF to `_files/` with renders.
5. `grab_card(..., "ACCB & Transformer", ...)` before and after OND + Generate;
   `"Transformer"` in the central phase; consider a full Electrical stage-page
   grab.
6. Half-table pile states: a run with **Add half tables** on — Full tab with
   the derived line, Half tab derived, Half tab own pattern, the ⚠ state.
7. Out-of-date and design-warning states once audited (§I).

Then run the full set:

```bat
uv run python tools\docs_site_shots.py --out "%TEMP%\docs-shots" --pan <Test.PAN> --ond <Test-S.OND>
uv run --with pymupdf python tools\docs_site_shots.py --phase renders --out "%TEMP%\docs-shots"
```

(`Test.PAN` / `Test-S.ond` are the files the existing set used.) Open several
PNGs at 100 % and check that labels have text before trusting the run.

### Known stale (from the audits — not exhaustive)

Recapturing the whole ~140-image set is the cleanest route: every whole-window
frame shows the old three-item menu bar, and #274/#289/#301 shift the sample
site's counts. Known stale ids include: `studies`, `tab-tools`,
`tab-tools-locked`, `ac-capacity`, `export-menu`, `export-menu-piles`,
`pile-editor`, `icr-blocks`, `icr-detail`, `tab-electrical-window`,
`cables-group`, `cables-group-on`, `cables-group-central`, `summary-view`,
`summary-with-energy`, `summary-window`, `summary-multi-plot`,
`summary-tracker-central`, `bom-view`, `bom-page`, `report-page-bom`,
`report-page-summary`, `sld-auto`, `sld-auto-full`, `sld-page`,
`report-page-sld`, `cables-dc-ac`, `cables-dc-ac-detail`, `mcr-mv-cables`,
`dxf-site-coordinates`, `help-menu` (and every `kpi-strip*` if a warnings chip
appears). Update each manifest entry's `alt` / `what` / `state` to match.

### New ids needed (suggested)

`tools-menu`; Earthing: `earthing-layout`, `earthing-calculation`,
`earthing-boq` (+ optional `earthing-inputs-lower`, `earthing-warn`); Robot
count from DXF: `robot-dxf`, `robot-dxf-gaps`, `robot-dxf-layers`; ICR blocks:
`icr-block-summary`, `icr-block-selected`, `icr-block-pdf-plant`,
`icr-block-pdf-block`; `accb-transformer-group`, `accb-transformer-group-ond`,
`transformer-group-central`; piles: `pile-editor-half-derived`,
`pile-editor-half-own`; plus out-of-date and design-warning frames.

## Pages

New pages (add each to its folder's `meta.json`):

- `simulation/earthing.mdx` — Earthing Design (B)
- `simulation/robot-count-from-dxf.mdx` — or a section of robotic-cleaning (C)
- `layout/icr-blocks.mdx` — block summary window and the two block exports (E)
- `inputs/accb-and-transformers.mdx` — the card, sizing rules, what follows it (G)
- `workspace/out-of-date-results.mdx` and/or `reference/design-warnings.mdx` — after the §I audit

Pages to revise: every page named in A–H, plus `releases.mdx` (one compact
entry per shipped release; confirm which tagged release contains each change —
`git tag --contains <sha>` in the product repo — and say only what the reader
gets).

## Suggested order

1. Re-read the rules files; audit §I from scratch; spot-re-verify A–H against
   the product `main` of the day (fan out parallel read-only audits).
2. Update `docs/PRODUCT_FACTS.md` (new sections for Earthing, Robot count from
   DXF, ICR block summary, ACCB & Transformer, fresh results, design warnings;
   header re-verification note; §16 menus; §18 new stale strings).
3. Fix the capture tool (product PR), run the full capture, replace
   `public/screenshots/` desktop folders, rewrite `content/screenshots.ts`.
4. Write new pages, revise existing ones, add the release entry.
5. Run the gates and `screenshots:index`; commit on a `docs/…` branch; open
   the PR with a summary of pages added/changed and screenshots
   recaptured/added/deleted.
