# SolarLayout Desktop — verified product facts

**This file is the only permitted factual source for content in this repo.**

Every value below was read from executing code in the product repository
(`PVlayout_Advance`, branch `main`) and carries a `file:line`-style citation.
The sheet was rebuilt on 2026-09-21 after the interface rebuild of issues
#156, #203, #210 and #213, and **re-verified 2026-11-05 against `main` at `5e54979`**,
after 150 product changes since `e93f6be` (the BOM builder, the design checks, the
Workings view, Advanced settings, the deliverables package and revisions, the
Company window, the SLD view's review and edit, the Plant and By block Summary,
Earthing inside the project, transformer forms, arresters by mast and shadow, the
shade-free row pitch, one energy run, Clean boundary). Which change is in which
release is in [§21](#21-release-mapping).
Where the product's own README, module docstrings, code comments, tooltips or
in-app F1 help state something different, **they are stale and must not be
used**. A list of the specific known-stale claims is in
[§18](#18-known-stale-sources--do-not-repeat-these); product defects that must
not be described as behaviour are in [§20](#20-product-issues--not-behaviour-to-document).

Citations are relative to the product repo root. A citation on a passage the
2026-11-05 audits rewrote is at `5e54979`. Line numbers in passages they confirmed
without changing can have drifted; the facts themselves were not contradicted.
"[ran]" marks what was also seen in a headless run of the real code. Abbreviations:

| Short | Path |
|---|---|
| `APP` | `apps/solarlayout-desktop/solarlayout_desktop` |
| `SC` | `packages/solar-core/solar_core` |
| `SU` | `packages/solar-ui/solar_ui` |
| `DL` | `SC/deliverables` |
| `BR` | `SC/boundary_review` |
| `IP` | `APP/input_panel.py` |
| `MW` | `APP/main_window.py` |
| `CBD` | `APP/clean_boundary_dialog.py` |
| `CC` | `APP/checks_controller.py` |
| `MP` | `SC/models/project.py` |
| `RI` | `SC/run_inputs.py` (fresh results) |
| `GR` | `SC/georef.py` |
| `SRV` / `SRD` | `SC/site_reference_verdict.py` / `APP/site_reference_dialog.py` |
| `EG` | `SC/electrical_grouping.py` |
| `CS` | `SC/cable_schedule.py` |
| `SA` | `SC/sld_autobuild.py` |
| `SS` / `VM` | `SC/sld_session.py` / `SC/sld_view_model.py` |
| `PW` | `SC/placement_words.py` |
| `SIM` | `SC/string_inverter_manager.py` |
| `CE` | `SC/cable_edits.py` |
| `PD` | `APP/pile_dialog.py` |
| `ED` | `APP/earthing_dialog.py`; `EA/` = `SC/earthing/` (`calc.py`, `layout.py`, `report.py`, `plot.py`, `export.py`) |
| `RDD` / `RDX` / `RDR` | `APP/robotic_dxf_dialog.py` / `SC/robotic_dxf.py` / `SC/robotic_dxf_report.py` |
| `RC` / `RCD` | `SC/robotic_cleaning.py` / `APP/robotic_cleaning_dialog.py` |
| `ACD` / `ACS` / `ACV` | `APP/ac_capacity_dialog.py` / `SC/ac_capacity_sim.py` / `SC/ac_capacity_verdict.py` |

> **Rule for writers:** if a number, label, or behaviour is not in this file,
> do not state it. Describe the capability without the number, or leave a
> `{/* VERIFY: … */}` comment for a follow-up pass.

---

## 1. Product identity

- Application name: the ribbon brand and the window title read **SolarLayout**
  (`APP_TITLE`, `MW:1283`; the title is *"SolarLayout  [Fixed Tilt  |  String Inverter]"*);
  the Windows application name is still **SolarLayout.Desktop** (`APP/entrypoints.py:141`).
  In prose, write **SolarLayout Desktop**; quote the dotted form only when quoting a
  literal string that carries it.
- Platform documented: **Microsoft Windows only.**
- Distribution documented: **Microsoft Store**, published by **Rensaar**.
  Store-distributed packages are signed and updated by Microsoft and are
  exempt from SmartScreen warnings — `docs/superpowers/specs/2026-08-03-msix-store-packaging-design.md §1`.
- The one link pages may publish for getting the application is the
  first-party download page, **https://solarlayout.app/downloads/solarlayout**
  (SolarLayout/solarlayout#1239, live 2026-09-10). Its Store button opens the
  Store on the listing; the page itself decides between the Store and the
  alternative for PCs without one. Pages link there and do **not** describe
  the alternative. The one consequence pages may state: a copy that did not
  come from the Store receives no Store updates, and the download page always
  carries the current version.
### 1.1 System requirements — from the shipped package manifest

Authoritative, because the Store enforces them —
`apps/solarlayout-desktop/msix/AppxManifest.template.xml:7, 14`:

| Requirement | Value |
|---|---|
| Architecture | **x64 only** (`ProcessorArchitecture="x64"`) |
| Minimum OS | **Windows 10 version 1809** (build 10.0.17763) or later |
| Tested up to | **Windows 11 22H2** (build 10.0.22621) |

The Store will not offer the application to a machine below that floor, so a
reader on an older or 32-bit Windows cannot install it at all.

RAM, disk and screen size are **not specified anywhere** in the product. Do not
invent figures. Describe what the work needs qualitatively — the panel and the
plot sit side by side, so a wider screen helps — and note that the Store listing
shows the requirements it enforces.

Manifest display strings, if a page needs to quote them: display name
**SolarLayout Desktop**, publisher **Rensaar**, description
*"Automated solar PV plant layout"*.

- **Never mention:** other operating systems, portable/zip builds, GitHub
  Releases, `.dmg`, source builds, PyInstaller, product tiers or editions,
  the cloud product, or the BESS product.
- There is **no feature tiering**. Nothing in the app imports `edition.py`;
  every button is created unconditionally. Do not write "Pro", "Pro Plus",
  or "available in your plan".

## 2. Launch: design selection

A modal **SolarLayout · New design** window appears at every launch before the
main window (`startup_dialog.py`, a `ResultDialog`, 620 px wide). It asks two
questions as two segmented controls, shows a summary card, and has one gold
**Continue** button — `startup_dialog.py:52-104`:

| Control | Options (left is the default) |
|---|---|
| **MOUNTING** | **Fixed tilt** · **Single-axis tracker** |
| **INVERTER** | **String inverter** · **Central inverter** |

The card updates live. Its three lines, per combination — `startup_dialog.py:22-46, 108-114`:

| Mounting | Inverter | Card title | Chain line | Note |
|---|---|---|---|---|
| Fixed tilt | String inverter | Fixed tilt + string inverters | Modules → MMS table → String inverter → ICR | South-facing tilted panels on fixed racks. Tilt and row pitch come from the site latitude. |
| Fixed tilt | Central inverter | Fixed tilt + central inverter | Modules → MMS table → SMB → Central inverter | (same) |
| Single-axis tracker | String inverter | Single-axis tracker + string inverters | Modules → Tracker → String inverter → ICR | Horizontal N–S axis, panels sweep east to west. You set the E–W pitch. |
| Single-axis tracker | Central inverter | Single-axis tracker + central inverter | Modules → Tracker → SMB → Central inverter | (same) |

- Footer hint, verbatim: *"You can switch later with “Move to String / Central Window”."*
- Closing the window without **Continue** quits the launch.
- ⛔ There are no longer four cards with **Select** buttons. Do not describe cards.
- Single-axis tracker is **horizontal, N–S axis**; panels sweep E–W.
- The choice controls which input cards appear on the **Array** tab (§4): a
  tracker design replaces *MMS-Table Configuration* **and** *Spacing & Tilt*
  with a single *Tracker Configuration* card — `IP:174-180`.
- Central inverter renames the inverter card to *SMB – String Monitoring Box*,
  adds *Max SMB per Central Inverter*, and relabels the cable loss rows — `IP:1043-1065`.
- The main window's title reads `SolarLayout  [Fixed Tilt  |  String Inverter]` (or the other combinations).
- **Changing the design later:** the ribbon's **design chip** (reads
  *"Fixed tilt · String inverter ▾"*, *"Tracker · Central inverter ▾"*, …) or
  **File ▸ Move to String / Central Window…** (**Ctrl+N**) opens the same
  New design window and launches a **new, independent window** for the chosen
  combination; the current window stays open, so two designs can be compared
  side by side. It is not a mode switch applied to the work in progress —
  side by side. It is not a mode switch applied to the work in progress.
  ⚠️ The MOUNTING chip's tooltip on the Array tab says *"Chosen on the start screen. Use File ▸ New Project to
  change it."* (`IP:454`): stale. **File ▸ New Project** (Ctrl+Shift+N) opens a fresh
  window at defaults in the *same* design, so the accurate route to a different
  design is the design chip / Move to… item.

## 3. Boundary input

The **Site** tab opens with the **Input Boundary File** card — `IP:331-396`:
a read-only path field with the placeholder *"Select a boundary file…"*, a
**Browse…** button, and a round **ⓘ** icon button (tooltip *"Open the boundary
file preparation guide"*) that opens the **KMZ File Preparation Guide** window.
Under the field a small line reads *"Supported formats: KMZ, KML, DXF, DWG, JPG,
PNG, GIF, BMP, TIFF"* (its tooltip: *"DWG files need the free ODA File Converter
installed (or save the drawing as DXF)."*) and, while the field is empty, a link
**Open sample site** (also **File ▸ Open Sample Site**) loads the bundled
`sample-demo.kmz` — one boundary with a pond, a transmission line and an
obstruction — `IP:35-38, 382-396, 1674-1682`. Once a file is read the line
becomes the boundary summary, e.g. *"1 boundary · 1 obstacle · 1 line
obstruction"* — `IP:404-411`, `MW:7700-7703`.

⛔ The card is not called "Input KMZ File" any more and the field has no
label. Quote **Input Boundary File**.

Accepted extensions (the **Select boundary file** dialog, filter *"Boundary
Files"*) — `IP:41-53, 1661-1672`:
`.kmz .kml .dxf .dwg .jpg .jpeg .png .gif .bmp .tif .tiff`

A `.kmz` / `.kml` carries its own coordinates (`GR:123-126`), so it asks for no
location. It goes through the **Clean boundary** review (§3.1), which opens a
window only when there is something to decide. A CAD drawing or an image first opens the
**Site reference** window (§3.2, §3.3) **before** the file is taken; **Cancel**
there leaves the file unloaded and the previously loaded file in place —
`IP:2056-2130`, `tests/test_location_wiring.py:70-79`.

### 3.1 KMZ / KML

**One reading.** Every KMZ / KML is read through the Clean boundary review:
`parse_kmz` runs `inspect_kmz`, takes the review's recommended answers and gives
the engine the result — `SC/kmz_parser.py:270-288`. It finds plots, areas, lines
and pins. Browse runs it under a progress card; the file loads straight away
when there is nothing to ask — `SC/boundary_review/model.py:113-130`. The card: §3.1a.

**What is a plot** — `SC/boundary_review/inspect.py:175-260, 508-516`,
`SC/boundary_review/types.py:12-15, 37-41`:
- A top-level polygon. A polygon inside another is an area.
- A polygon clear of every plot is **another plot**, unless its name is a water
  word, when it is listed as *"Outside the plots, not used"* (probed 2026-11-05).
- A line drawn closed (ends within 0.5 m).
- A polygon inside another with a plot word or Google Earth's own name opens the
  review, default *No tables here* unless the name is a plot word (`inspect.py:382-413`).
- A line that may be a plot drawn as a line: no name, Google Earth's own name
  (*Untitled Path*, *Polygon 7*), or a plot word (`boundary plot plant site land
  parcel survey khasra field acre acres block phase zone stage`). Its ends within
  **50 m** are offered as a closed plot. A water-word line never is.
- ⛔ Any other open line is a line to keep clear, not a plot. So is an open line
  with a gap over 50 m.

**Water.** The only thing a name sets: a whole-word match, any case, on `pond
lake reservoir water waterbody wetland swamp marsh talab talav tank pokhar canal
channel drain drainage nala nalla nallah nullah river stream creek flood` —
`SC/boundary_review/types.py:41-44, 67-71`. `Pondicherry store` is not water;
`Drainage tank` is. A water area or line is drawn and booked as water; the
**Water** tick changes it. ⛔ There are no transmission-line or road keywords and
no road width attribute: every line is a line, under the corridor
(`SC/boundary_review/types.py:1-8`; an `Access road` with a `width` attribute
probed as a plain line).

**Areas, lines and pins** — `SC/boundary_review/model.py:17-24`:
- Area: *"Area: no tables here"* / *"Water: no tables here"*; the Area setback
  applies (§4.5).
- Line: *"Line: no tables within the line corridor (Site tab)"* / *"Water line: …"*.
  Kept up to **500 m** from a plot (`LINE_REACH_M`, `types.py:24`); beyond that
  *"Outside the plots, not used"*.
- Pin: *"Pin: a label unless you keep it"*. Kept, a spot of 1 m radius
  (`types.py:21`).
- A hole cut in a plot polygon: *"No tables here (land cut out of the plot)"*.
- A height on an area or kept pin: tables stay out of its shadow when **Clear
  tables in shadows** is on — `clean_boundary_dialog.py:1233-1237`.

**When the window opens by itself** — `SC/boundary_review/model.py:113-130`: a
survey map; a finished layout opened as a boundary; a CAD export's loose lines
rebuilt; a plot row needing attention; a pin inside a plot; in a clean copy, only
what was added or redrawn since.

**Loose CAD lines.** Unnamed two-point lines with their layer in the description
are named from it and rejoined; a layer's two banks become one area, a small
tangle one spot — `SC/boundary_review/kml_read.py`, `cad_lines.py`,
`types.py:27-35`. Added in #662.

**The Clean boundary window** — `clean_boundary_dialog.py:549, 615, 703-707`:
title **Clean boundary**; caption *"What the file holds"*; columns **Keep**,
**Item**, **Found**, **Action**, **Water**, **Height** (**Merge** shows only in
Merge selected, `:65, 630, 1001`); footer *"Saves <name>_clean.kmz beside the
original"*, **Cancel**, **Save clean KMZ and load** (disabled with *"Keep at least
one plot"*, `:945`). The choices — `inspect.py:190-254, 302-312, 382-403`:

| Found | Choices (first is the default, except as noted) |
|---|---|
| *Open line, ends N m apart* | **Close the N m gap**, **Keep as a line**, **Remove** |
| *Drawn in N pieces, ends … m apart* | **Join into one plot**, **Keep as N lines**, **Remove** |
| *Outline crosses itself* | **Fix the crossing (N ac)**, **Keep as drawn**, **Leave out** |
| *Same as X (100 % overlap)* | **Remove duplicate**, **Merge with X** |
| *Overlaps X by N ac* | **Merge with X**, **Cut the overlap out of this plot**, **Remove** |
| *Inside X* | **This is the plot**, **No tables here**, **Leave out** |
| *Outline around N plot* | **Context only**, **Lay it out too**, **Leave out** |

Save writes `<name>_clean.kmz` beside the original, which is not changed, and
loads it; a clean file keeps its own name — `clean_kmz.py:55-58`,
`clean_boundary_dialog.py:958`, `IP:2711-2723`. A folder it cannot write to asks
for another (`IP:2725-2749`). **Cancel** leaves the file unloaded (`IP:2706-2710`).
**Review boundary…** on the card, for a KMZ / KML that is not the sample, opens
the review even with nothing to ask, and adds **Keep separate**, **One outer
boundary**, **Merge selected** — `IP:746, 2759-2772`, `clean_boundary_dialog.py:751-753`.
Warnings before saving: §3.1b; their thresholds are Advanced settings ▸ Clean
boundary (§6.9).

**Check boundaries.** At **Generate Layout**, on its worker, under the overlay, not on load: a
top-level polygon whose ring is open by more than 0.0001° (about 11 m) on either axis —
`MW:600-612, 4533-4538`, `SC/kmz_parser.py:180-182, 254-265`. The review does not flag
such a ring (probed: loads straight away). The window
(`APP/boundary_validation_dialog.py:39-159`): a warning banner *"1 boundary has a problem"* /
*"N boundaries have a problem"* (the app passes no total, `MW:4569`; ⛔ *"2 of 4 boundaries have
a problem"* appears only in a docs capture, §18) with the detail *"Leave them
out and continue with the others, or fix them in Google Earth and load the file
again."*; a table with columns **Leave out** · **Boundary** · **Problem** (*"Ring
is NOT CLOSED  (gap between first and last point ≈ 42.7 m)"*), every row ticked by
default; the note *"An unticked boundary is kept as it is and may produce a wrong
layout."*; footer buttons **All**, **None**, **Fix in Google Earth first**, and the
primary **Continue without N** (**Continue with all boundaries** when nothing is
ticked). **Fix in Google Earth first** ends the run.
⛔ The window is not called "Boundary Validation Issues" and has no plain Cancel.
All left out: **No Boundaries Remaining** / *"All plant boundaries have been excluded.\nThere is
nothing left to generate a layout for.\n\nPlease fix the KMZ file and try again."* (`MW:4585-4590`).
The check failing: **KMZ Read Error** / *"Could not read the KMZ file:\n\n<msg>\n\nMake sure the
file is a valid KMZ/KML exported from Google Earth or a GIS tool."*, status *"Layout not
generated: the boundary file could not be read."* (`MW:4551-4556`).

#### 3.1a The progress card — `IP:2559-2752`, `MW:11112-11174`

KMZ / KML only: a CAD or image file goes to Site reference and loads with no card, and
the bundled sample skips the review and the card (`IP:2559-2572`). The card takes clicks
at once but paints only after 300 ms (`OPEN_CARD_DELAY_MS`, `MW:11112, 11121`), so a
plain file never flashes it. Each step's title is also the status-bar message
(`MW:11148-11150`):

| Step | Card title | Sub-line |
|---|---|---|
| 1 | *"Opening your boundary file…"* | *"<name> · <size>"* (`823 KB`, or `12.4 MB` from 10 MB up), with **Cancel** (`IP:2657-2658, 68-74`) |
| 2 | *"Checking the site…"* | *"<n> shape(s) read: looking for plots, lines and obstructions"* (`IP:2673-2675`) |
| 3 | *"Preparing the review…"* | e.g. *"1 plot · 7,874 obstructions · a finished layout"*, only when the window will open (`IP:2706, 77-84`) |
| 4 | the review, then *"Saving the clean copy…"* | *"<name>_clean.kmz, next to the original"*, no Cancel (`IP:2728-2729`) |
| 5 | *"Drawing the site…"* | *"<name>"* (`MW:11169`) |

- Ends: Cancel gives *"Opening cancelled. Nothing changed."* (`MW:11139`), the button
  reading *"Cancelling…"* meanwhile (`MW:368`). Loaded: *"Loaded <name>: N plot(s), A
  acres"* (`MW:11173-11174`). **Cancel** in the review window: no status line, the previous
  file stays (`IP:2715-2719`).
- Browse, the sample, **Review boundary…**, Generate and Open project do nothing while a
  file is opening (`IP:2523, 2544, 2771`, `MW:3683, 4382`). Closing the window stops the
  reading thread and waits for it (`MW:4157`, `IP:2603-2610`).
- A review that crashes never blocks: the file loads as it is (`IP:2686-2690`).
- A clean copy that cannot be written: **Could not save the clean KMZ** / *"<name> could
  not be saved next to the original (<reason>). Choose another folder."*, then a **Save
  clean KMZ** file dialog (`IP:2745-2752`). Saving a clean copy needs no access (`IP:2724`).

#### 3.1b Land warnings before saving — `BR/size_check.py`, `SC/resources/settings/design.json:104-120`

Each warns and leaves **Save** on. Thresholds are in §6.9.

| Setting | Default, range | Verdict |
|---|---|---|
| **Outer boundary over its plots** | 1.25 ×, 1.01–10 | *"The outer boundary adds N ac"* / *"A ac is 1.5× the B ac of plots inside it; the extra land may not be yours."* (`BR/size_check.py:28-36`) |
| **Survey map picked** | 50 %, 1–100 | *"You picked 62 % of the survey map"* / *"N parcels, A ac. Check the window caught only your land."* (`BR/size_check.py:45-49`) |
| **Plots of the file's drawing** | 5 %, 0.1–100 | *"The plots cover 3 % of what this file draws"* / *"A ac of plots; the file's other lines span B ac. Check the map: the boundary may not have been read."* (`BR/size_check.py:55-70`) |

- More than 500 kept obstructions: *"N obstructions to lay out around: Generate takes longer
  with this many."* (`BR/model.py:14`, `CBD:1046`).
- Ready verdict: *"Ready: N plot(s), A acres, N obstruction(s) kept"* / *"Saves a clean copy
  and loads it. The original is not changed."*; none left: *"No plot left to lay out"* /
  *"Every plot is left out or removed. Keep at least one."* (`CBD:1029-1031, 1044-1048`).

#### 3.1c Survey maps (#373) — `BR/survey.py`, `CBD:609-610, 719-726, 793-807`

- Recognised by survey-number data (`survey_no`, `gat_no`, `khasra`, `plot_no`, …) or a
  polygon holding ≥ 10 others that cover ≥ 50 % of it (`BR/survey.py:18-32`). Number pins
  such as `235`, `235/1`, `12A`, or `Gaothan` are labels. Parcels within 0.5 m touch and
  become one plot (`BR/survey.py:34`).
- Window: chips *N villages*, *N survey parcels*, *N obstructions*, latitude. Village combo
  (tooltip *"Survey numbers repeat from village to village: pick the village first"*);
  field placeholder *"Survey numbers, e.g. 235, 236/1, 240-245"*, tooltip *"235 picks 235
  and its sub-divisions (235/1, 235/A); 235/1 only that one; 240-245 every number from 240
  to 245. Or click parcels on the map."*; **Pick**, **Clear** (*"Unpick every parcel"*).
- Map: *"Click, or Shift+drag a window, to pick · wheel zooms · drag pans · double-click
  shows all"*; left to right takes parcels fully inside, right to left every parcel it
  touches; a picked parcel is unpicked.
- Verdict before a pick *"Pick your parcels"* / *"Type survey numbers, click parcels, or
  Shift+drag a window on the map."*, reason *"Pick at least one parcel"* (`CBD:1024-1026`).
  Notes: *"Picked N parcels in <village>"*, *"Not found in <village>: …"*, *"N parcels
  picked · A ac"*, *"No parcels picked yet"* (`CBD:1100-1101, 1544-1547`).

#### 3.1d A finished layout opened as a boundary (#614) — `BR/layout_export.py`

- Three kinds recognised: the older KMZ export's folders; the package's K1 (§13.9); or ≥ 200
  identical rectangles (areas within 2 %, each ≤ 2 000 m²), ≥ 90 % of them inside other
  polygons (`BR/layout_export.py:10-13, 47-50, 143-181`).
- Banner title *"This file is a finished layout"*. By folders: *"It holds 7,874 tables, 62
  inverters or SMBs, 4 buildings and 12 arresters from an earlier layout. A new layout uses
  the site and its obstructions only."* By pattern: *"N identical rectangles inside the site
  look like the tables of an earlier layout. They are kept as obstructions; if they are an
  old layout, choose Use the site only."* (`BR/layout_export.py:65-82`).
- Segmented **Use the site only** · **Keep everything**; default **Use the site only** for a
  recognised export, **Keep everything** for the rectangles (`BR/layout_export.py:58-62`,
  `CBD:626-628`). Keeping: *"Every table and building of the old layout becomes an
  obstruction, so little land is left for new tables."* (`CBD:62`).

#### 3.1e A field survey of points only (#666) — `BR/point_runs.py`, `CBD:603-606, 1055, 1274-1296` [ran]

- Applies only when **every** placemark is a point, at least 4 of them, and at least one
  run closes. Otherwise nothing is guessed: the review is as for pins
  (`BR/point_runs.py:9-10, 99, 111-118`).
- A point name splits into code + trailing number (`rasta 12` → `rasta`, 12; any case;
  separators space, `_`, `-`). Points of a code sort by number when no number repeats; a
  number that does not rise starts a new run; if no run closes that way, the file's own
  order is tried (`BR/point_runs.py:41-49, 67-80, 111-118`).
- A run closes when: ≥ 4 points; closing gap ≤ 50 m and < 25 % of its length; the ring does
  not cross itself; area > 100 m²; compactness ≥ 0.15; wider than 30 m; the code is not a
  water word (`BR/point_runs.py:52-64, 107-109`).
- What each run becomes (`BR/point_runs.py:133-150`): closing → a boundary; one point → a pin
  named by its code, off; 3+ points within 30 m enclosing ≥ 1 m² → an area with no tables; a
  water-coded run that closes → a water area; otherwise a line, asked about when it has 3+
  points and is inside, unused with 2 points. A water-coded open run is kept as a water line
  and **not asked** ([ran]: *"Water line: no tables within the line corridor (Site tab)"*).
  Two runs of one code read *"<code>, run 2"* (`BR/point_runs.py:127-129`).
- Window: chips *Survey points*, *N points*, *N runs*, latitude. Caption *"What the points
  trace · N to answer"*. Plot row Found [ran] *"41 points, ends 22.2 m apart"* (or *"41 points,
  closed"*), choices **Close the 22.2 m gap**, **Keep as a line**, **Remove**, hint *"Joined from
  the points in survey order. Please check it against your survey."* Other Found:
  *"4 points, 611 m, inside"*, *"1 point, inside"*, *"N points, about W × H m, inside"*, *"N
  points, on the boundary"* (`BR/point_runs.py:154-179`). Action words: *Choose…*, *Line to
  keep clear*, *Water line*, *Water: no tables*, *Area: no tables*, *Spot: no tables*, *Pin: a
  label*, *Not used*, *Nothing to keep clear* (`BR/model.py:191-203`).
- Verdict while a code waits [ran]: *"Boundary found: 278.89 acres. Please check it"* /
  *"Joined from the points in survey order. The last edge closes a 22.2 m gap."* (several:
  *"N boundaries found: A acres. Please check them"*). Footer reason *"Say what rasta is"*;
  **Save is disabled until every code is answered** (`BR/point_runs.py:192-201`, `CBD:1035, 1050`).
- The answer: selecting one run selects every run of its code; heading *"rasta: N runs inside
  the boundary. What is it?"*; segmented **Line to keep clear** · **Water line** · **Nothing to
  keep clear** (`BR/model.py:186-188`); caption *"What a line would take, of A ac inside the
  perimeter road"* with tiles **Nothing kept clear**, **3 m each side**, **5 m each side** and the
  Site tab's corridor (`CBD:559, 769-774, 1288`). Hints: *"We cannot read this code. Your surveyor
  will know what it is."*, *"Tables may be placed across it."*, *"Tables stay 15 m each side.
  Change a line's width on the Site tab after loading."* (`CBD:1293-1296`).
- Tiles **Boundary area**, **Surveyed** (*"N m"*, sub *"N m longest step"*), **To answer**. Legend
  *"Blue: boundary · Amber: closed edge, lines to answer · Filled: no tables · Grey: not used"*
  (`CBD:717-718, 735-737, 1073, 1081`).

#### 3.1f A file with no plot (#664) — `SC/kmz_parser.py:212-213`, `BR/clean_kmz.py:47-48` [ran]

- A closed path alone is a plot: **loads with no window** (Found *"No problem found (drawn as a
  closed line)"*, `BR/inspect.py:223`).
- A named open line, or only a nala: nothing to ask, no window, then the box **Boundary read
  error** / *"Could not read the boundary file:\n\nThe file has no plot: draw the site boundary
  as a closed polygon."* (`MW:9896-9898`, `BR/clean_kmz.py:47`). What follows the box is a defect
  (§20); pages state only the correct route: draw the boundary as a closed polygon.
- Pins only: the window opens, 0 plots, Save disabled with *"Keep at least one plot"*.
- A survey map read without picking: *"This file is a village survey map. Pick its parcels in
  the boundary review first."* (`BR/clean_kmz.py:48`).

#### The preparation guide (ⓘ)

**KMZ File Preparation Guide** (`kmz_help_dialog.py:53-213`): an intro paragraph,
then the sections *1 ▸ Plant / Site Boundary*, *2 ▸ Water Bodies (Ponds, Lakes,
Canals …)*, *3 ▸ Transmission Lines (TL) / Canals / Roads*, *4 ▸ Buildings /
Obstruction Areas*, *5 ▸ Common Mistakes to Avoid*, and a **Quick Reference**
table with the columns Feature / KML type / Name rule / Colour on map; one
**Close** button. Its water list (*"pond lake reservoir river canal water wetland
swamp tank"*) is a subset of the full list above.

### 3.2 DXF / DWG

#### The Site reference window (#295) — `SRD`, `SRV`, `GR`

CAD drawings carry no guaranteed geographic position, so choosing a `.dxf` /
`.dwg` opens **Site reference** (a modal `ResultDialog`, 560 px, `SRD:62`;
shells `dxf_latlon_dialog.py`, `image_scale_dialog.py`). **Nothing is
pre-filled** (`tests/test_ux203_boundary_site.py:186-195`). **Cancel** closes it
and the file is **not loaded**; the previous file stays (`IP:2056-2069`).

**Navy strip** — the file name (or *"CAD boundary"* / *"Image boundary"*) and a
second line — `SRD:115-138`, `SRV:83-91`:

| File | Second line |
|---|---|
| CAD drawing whose coordinates look like UTM | *"Drawing 1.03 × 4.42 km · centre E 632,996 · N 2,995,328"* |
| CAD drawing in local coordinates | *"Drawing 0.60 × 0.50 km · centre x 300 · y 250 (local)"* |
| CAD drawing whose coordinates cannot be read | *"Couldn't read the drawing's coordinates. Place it by latitude and longitude."* |
| Image | *"Image boundary · scale needed"* |

**LOCATION** — a caption, then a segmented control of up to three modes; the
**first one offered is selected** — `SRD:42-46, 80-93`:

- **Drawing's coordinates** — offered **only** for a CAD file whose boundary
  coordinates look like UTM metres (every extent E 100 000–900 000 m and
  N 0–10 000 000 m; `GR:38-40, 129-131`, `dxf_parser.py:422-432`). Such a file
  opens in this mode.
- **Place by latitude and longitude** — the first mode for a local CAD drawing
  and for an image.
- **Layout only** — always offered.

Card per mode — `SRD:207-289`:

| Mode | Card content (verbatim) |
|---|---|
| Drawing's coordinates, zone declared in the DXF (GEODATA; WGS 84 / UTM only, EPSG 32601–32660 and 32701–32760, `GR:164-174`) | **Coordinate system** *"WGS 84 / UTM zone 42N · EPSG:32642"*; note *"Declared in the drawing (GEODATA). The coordinates are used as they are."*; readout *"Site centre: 27.0710° N, 70.3387° E"* and **Check on Google Maps ↗** |
| Drawing's coordinates, no GEODATA | **UTM zone** combo (*"Pick a zone"*, *"Zone 1"* … *"Zone 60"*) + a **North / South** segmented control + (after an earlier pick) a **Last used: 42N** shortcut button — **never a pre-selected zone** (`tests/test_ux203_boundary_site.py:263-269`); note *"The coordinates look like UTM metres. Pick the zone the drawing was made in; the readout shows where that puts the site."*; readout *"Pick a zone to see where the site lands."* until picked, then *"Site centre: …"* and **Check on Google Maps ↗** |
| Place by latitude and longitude | note *"Latitude and longitude of the centre of the site boundary. In Google Earth or Google Maps, right-click the middle of the site to copy them."*; **Latitude** (placeholder *e.g. 27.0739*) *"° N (negative for south)"*; **Longitude** (placeholder *e.g. 70.3413*) *"° E (negative for west)"*; readout *"Both values are needed."* until valid, then *"The boundary centre goes to 27.0739° N, 70.3413° E"* and **Check on Google Maps ↗** (opens Google Maps at that point) |
| Layout only | **Latitude** (placeholder *optional*) *"° N, for tilt and row pitch"*; note *"Longitude isn't needed for tilt and row pitch. Without a latitude, set them by hand under Array."* |

Degrees accept a typographic minus "−" (`SRV:50-58`); an invalid value outlines
the field (`SRD:324-330`). The footer is [reason] · **Cancel** · primary
(`SRD:107-110`). Verdict banner, primary button and reason — `SRV:94-162`:

| State | Banner title / detail (tone) | Primary | Enabled / reason |
|---|---|---|---|
| Drawing, no zone picked | *Nothing is placed yet* / *"The drawing is used exactly as drawn once the zone is known."* (neutral) | **Use UTM zone …** | no — *"Pick the zone the drawing uses."* |
| Drawing, zone picked | **Located from the drawing** / *"Drawings and the DXF keep the drawing's own coordinates. KMZ, automatic tilt and row pitch, and energy yield are available."* (good) | **Use UTM zone 42N**, or **Use the drawing's coordinates** when GEODATA declares it | yes |
| Drawing, site beyond 60° latitude | *"Zone 42N puts the site at 72.1234° N"* / *"Check the hemisphere. A plant this far north is unlikely."* (warn) | as above | yes |
| Drawing, outside 80° S–84° N | same title / *"UTM covers 80° S to 84° N. Check the zone and hemisphere."* (warn) | as above | no — *"Pick a zone that puts the site on the map."* |
| Place, empty or one value | *Nothing is placed yet* / *"The drawing keeps its own coordinates in every export; this only says where it is on Earth."* | **Place the drawing here** | no — *"Enter the latitude and longitude."* |
| Place, out of range | *"Latitude must be between −90 and 90"* (or *"Longitude must be between −180 and 180"*) / *"Check the value you typed."* (warn) | **Place the drawing here** | no — *"Fix the highlighted value."* |
| Place, valid | **Placed by hand** (warn) — see ⛔ below for the detail | **Place the drawing here** | yes |
| Layout only, with or without a latitude | **Layout only** (warn) — see ⛔ below for the detail | **Continue with layout only** | yes; no — *"Latitude must be between −90 and 90."* when the typed latitude is invalid |

The **Placed by hand** and **Layout only** details end in sentences that say
*"The design report lists it as placed by hand (check C-01)."* / *"… the design
report lists the location as unknown (check C-01)."* (`SRV:21-26`). Both now exist:
check **C-01** *Location surveyed or confirmed* (§6.7; `DL/checks/completeness.py:23`), and
the design report prints *"Placed by the user: …"* / *"Unknown: …"*
(`DL/report/build.py:223-231`). ⚠️ The report's words differ slightly, and since #585 the
check is on the Checks view, not in the package. The other parts:
*"Drawings and the DXF keep the drawing's
own coordinates. KMZ, tilt, row pitch and energy use this location."* (placed);
*"… There is no KMZ and no energy yield … Automatic tilt, row pitch and
building-shadow clearance are off until you enter a latitude."* (layout only;
with a latitude it ends *"… Tilt and row pitch use 27.0739° N."*).

⛔ There is no *I know the site coordinates* checkbox, no default 20° N / 78° E,
no **Use this location** or **Continue without coordinates**, and the window is
not called "DXF Site Coordinates".

**What each choice means** — `GR:1-20, 177-202`, `dxf_parser.py:9-21, 470-500`:

| | **Drawing's coordinates** | **Placed by hand** | **Layout only** |
|---|---|---|---|
| Where the site is | The drawing's numbers **are** UTM metres in that zone, used as they are (`layout_engine.py:493-496`, `tests/test_location_engine.py:35-42`) | The boundary centre — the **centroid of all boundaries together** (`dxf_parser.py:395-406`) — is put at the typed latitude/longitude; the drawing is translated, never scaled or rotated | **Unknown.** Nothing treats it as a site. ⛔ **The old 20° N 78° E fallback is gone** (`tests/test_dxf_location.py:96-111`) |
| Automatic tilt and row pitch | from the site | from the typed latitude | from the typed latitude, if one was given; **with none, tick both overrides under Array** and set them by hand; otherwise **Generate Layout** is disabled (below; `GR:213-228`) |
| Building-shadow clearance | on | on | skipped without a latitude (`layout_engine.py:427-440`) |
| Automatic shading value (Yield) | computed | computed | without a latitude the line reads *"Auto → — (needs the site's latitude)"* (`IP:2531-2543`) |
| Energy | yes | yes | **off** — Calculate Energy disabled; tooltip and Yield status *"Energy yield is off: the site's location is unknown (layout only)."*; the Energy view says the same (`GR:54-55`, `MW:4696-4699, 7704-7709, 7745`) |
| KMZ in the package (§13.9) | yes | yes | the row is unticked and disabled, reason *"The site's location is unknown (layout only), so a KMZ would put the plant in the wrong place."* (`GR:51`) |
| Satellite | yes | yes | refused: *"Satellite imagery needs the site's location."* (`MW:5476-5483`) |
| Shadow View | yes | yes | without a latitude, refused: *"Shadow view needs the site's latitude: pick the boundary file again and enter one."* (`MW:9173-9178`) |
| Terrain | a contour DXF in the drawing's (UTM) coordinates; CSV and satellite DEM as usual | a contour DXF **in the boundary drawing's coordinates** | the same, but a longitude/latitude CSV is refused and the satellite DEM is never fetched (`GR:59-64`) |
| Plot units note | *"UTM 42N · metres"* | *"Drawing coordinates · metres"* | *"Drawing coordinates · metres"* (`GR:220-228`) |
| Axis ticks, cursor read-out, pile labels | UTM | the drawing's own coordinates (`tests/test_location_wiring.py:378-405`) | the drawing's own coordinates |
| The package's DXF twin (§13.4) | the drawing's own coordinates (UTM − the offset, 0 for this case) | **the drawing's own coordinates**, so it overlays the source drawing (`DL/render/dxf.py:1-21`) | the drawing's own coordinates |
| `piles.csv` (§13.10) | E / N in the drawing's coordinates + lat / lon | E / N in the drawing's coordinates + lat / lon | E / N in the drawing's coordinates; lat / lon **blank** (`DL/piles_csv.py:19`) |

- The choice is **saved in the project** (`IP:3019-3022`) and **reused at
  Generate without asking** (`tests/test_location_wiring.py:147-161`). An older
  project with a CAD or image boundary and no saved choice is asked at
  Generate; **Cancel** there gives *"Layout not generated: say where the drawing
  sits first."*, and **Place Object** before a Generate gives
  *"Say where the drawing sits first."*
- **The latitude refusal** (#366, #411; `GR:48-50, 213-228`, `MW:11033, 11069-11110`): fixed
  tilt, **Layout only**, no latitude, and tilt or pitch left automatic disables **Generate
  Layout**, with tooltip and hint *"Automatic tilt and row pitch need the site's latitude. Pick
  the boundary file again and enter a latitude, or set tilt and row pitch by hand under
  Array."*, then two links **Set tilt and pitch** (focuses the tilt override) · **Enter a
  latitude** (reopens Site reference). The Array tab carries a gold dot with the same tooltip
  (`MW:11100`). A tracker never needs a latitude; a site with both overrides passes.
- The window opens from **Browse…** and from **Enter a latitude**, and it opens on the answer
  already given, keeping an image's scale (`IP:2838-2851`). Re-picking the file replaces the
  layout with a preview.
- When Generate finds the boundary moved, it carries the reader's
  obstructions, MCR, USS, objects and sketch annotations to the new location
  and the status line adds *"Kept your obstructions, MCR, …, moved to the
  drawing's new location."* or *"The boundary changed since the project was
  saved: 2 obstructions were not kept. Place them again."*
  (`SC/frame_carry.py:262-274`).
- The last UTM zone picked is remembered between sessions (the **Last used**
  button; `IP:2086-2101`).
- ⚠️ **Drawing units — unconfirmed.** The parser appears to auto-detect the
  drawing unit (metres first when the span is 10 m–100 km, then `$INSUNITS`,
  then mm, cm, ft, km — `dxf_parser.py:161-189, 264`), and the drawing-frame
  exports only undo the offset, not a rescale. Not yet confirmed with the
  product owner (§19): pages must not state that a drawing must be in metres,
  nor that other units are converted.

#### How the drawing's content is read

- **Import is layer-aware** (PVlayout_Advance 61db8c9 + 6dc4cd7, 2026-09-16;
  `tests/test_dxf_layers.py`). The layer NAME classifies each polyline —
  `dxf_parser.py:57-87` (`_WATER_WORDS` / `_LINE_WORDS` / `_OBSTACLE_WORDS`,
  case-insensitive substring; `tl` whole-token only):
  - water: pond, water, lake, reservoir, lagoon, tank → `water_obstacles` (blue)
  - line: tl, transmission, power line, powerline, ht line, ht_line, road,
    canal, river, highway, railway, nala, drain → a CLOSED ring is an
    obstacle; an OPEN polyline or a `LINE` is a corridor appended to
    `line_obstructions`, buffered by `tl_setback_m` per side like a KMZ line
    (`dxf_parser.py:242-253, 526-548`)
  - obstruction: obstruction, obstacle, keep out, keepout, keep-out,
    exclusion, building, sand dune, sand, dune, structure, tower, forest,
    graveyard, temple → `obstacles`
  - water is tested first, then line, then obstruction.
- **Boundaries:** every closed ring on a NON-keep-clear layer that is not
  contained in another such ring is a plant boundary — multi-boundary works
  across one layer or several — `dxf_parser.py:425-441`. Keep-clear areas
  attach to the boundary containing them (`_parent_boundary`, 482-524). If
  nothing qualifies, the largest ring is the boundary (471-478). Any closed
  ring inside a boundary on an unnamed layer is a generic obstacle
  (unchanged behaviour).
- **`INSERT` blocks on a keep-clear layer are exploded** (recursively) and
  inherit the layer kind; blocks on neutral layers (title blocks, north
  arrows, legends) are NOT exploded — `dxf_parser.py:229-241`.
- **Entities read: `LWPOLYLINE`, `POLYLINE`, and `LINE` only on a line
  layer** — `dxf_parser.py:242-253`. Circles, splines, arcs and hatches are
  ignored. The application's own error text tells the reader to draw the
  boundary as a closed `LWPOLYLINE` or `POLYLINE`.
- ⛔ The image-boundary path is unchanged: kinds default to normal, so an
  image gives one boundary and nothing else.
- `.dwg` needs the free ODA File Converter installed (the formats line's
  tooltip). ⛔ **The converter is NOT bundled** — nothing in
  `specs/solarlayout_desktop*.spec` ships it; `dxf_parser.py:325-348`,
  `terrain.py:128-132` and `dxf_sld_import.py:56-68` call
  `ezdxf.addons.odafc`, which shells out to an `ODAFileConverter.exe` the user
  installed separately, and raise if it is absent. **DWG is not a tested
  route (Arun, 2026-09-22): the docs name `.dxf` only and mention `.dwg` in
  one sentence per input page.** Quoted UI strings (the formats line, the
  file-picker filters, the **⬇ Export SLD to DWG** button) stay verbatim.

### 3.3 Raster image

- Choosing an image opens the same **Site reference** window (§3.2) with an
  extra **SCALE** card first (`image_scale_dialog.py`, `SRD:140-181`): one
  sentence row, *"[100.00 m] on site is drawn as [10.00 mm]"* (site
  0.1–1 000 000 m, drawing 0.01–100 000 mm), with the live hint *"1 : 10,000.
  Measure any known distance on the drawing."*; the strip reads *"Image
  boundary · scale needed"*. Then the LOCATION card with **two** modes —
  **Place by latitude and longitude** (selected) and **Layout only** — and the
  footer [reason] · **Cancel** · primary (**Place the drawing here** /
  **Continue with layout only**). **Cancel** does not load the file. The scale
  is saved in the project (`IP:3019-3022`).
- An image never offers **Drawing's coordinates**; the parser refuses it with
  *"An image has no coordinates of its own. Place it by latitude and longitude,
  or continue with layout only."* (`image_boundary_parser.py`).
  ⛔ The window is not called "Image Boundary — Scale & Coordinates", and it has
  no **Layout only** / **Use this location** button pair.
- The largest closed outline in the image becomes the boundary —
  `image_boundary_parser.py:1-9`.
- Scale maths — `image_boundary_parser.py:10-20`:
  `mm_per_pixel = 25.4 / dpi`; `site_m_per_mm = site_distance_m / drawing_distance_mm`;
  `m_per_pixel = mm_per_pixel × site_m_per_mm`. DPI is read from image
  metadata, defaulting to **96**.
- Default scale: **100 m site / 10 mm drawing** — `site_reference_dialog.py:64-65`.
  (The module docstring's "1000 m / 10 mm" example is stale.)

## 4. Input defaults — as shipped in the UI

⚠️ **Publish these values, not the dataclass defaults in `MP`.** Several
dataclass defaults are never seen by a reader because the input panel's
widgets override them. Divergences are marked ⚠️.

### 4.0 The five stage tabs — `IP:63-82, 240-297`, `MW:1507-1514, 1640-1747`

Inputs live in five tabs under the pinned **Generate Layout** button, named
**Site · Array · Electrical · Yield · Tools**. Every card is a collapsible
group (a ⊖ button in its header), expanded by default. Tab tooltips: Site —
*"Boundary-level settings: roads, arresters, ICR blocks, keep-clear, terrain"*;
Array — *"Module, mounting, table geometry, tilt and pitch"*; Electrical —
*"Inverter sizing and cable options"*; Yield — *"Weather source, site
conditions, losses and the energy run"*; Tools — *"Edit the generated layout:
obstructions, MCR, objects and studies"*.

| Tab | Cards, in order (exact titles) |
|---|---|
| **Site** | Input Boundary File · Site Parameters · Structures & Shadow (keep-clear) · Topography (slope-aware exclusion) |
| **Array** | a read-only **MOUNTING** chip (*"Fixed-tilt MMS tables"* or *"Single-axis tracker"*) · Module Specifications · then **MMS-Table Configuration** + **Spacing & Tilt** (fixed tilt) or **Tracker Configuration** (tracker) |
| **Electrical** | String Inverter *(or)* SMB – String Monitoring Box · **ACCB & Transformer** *(string design)* / **Transformer** *(central design)* (§4.8c) · Cables |
| **Yield** | Run Energy Calculation · Energy Yield |
| **Tools** | Obstructions · the tip *"Tip: In Sketch Mode, drag a blue ICR to move it."* (hidden until a run has placed ICRs, `MW:2044-2047, 5233`) · **Grid connection & Objects** (§5a, §7) · Studies (§10) |

**The Tools tab is never locked** — it can be opened at any time. Before a
layout exists only its **tab tooltip** changes, to *"Obstructions, the MCR and most studies
need a layout; Robot count from DXF works without one"* (`MW:862`); it goes after a Generate or
an Open. What is actually unavailable is the buttons: Draw Rectangle / Draw Polygon / Undo Last /
Clear All, Place MCR / Remove MCR and four of the five Studies buttons are disabled
until a layout exists; **Place Object** is enabled once there is a boundary (`MW:9835-9842`);
**Robot count from DXF…** is enabled from the start. ⛔ Do not write "the Tools tab is
locked"; write "its buttons are greyed out until a layout exists, except
**Robot count from DXF…** and, with a boundary, **Place Object**".

While any input differs from the last run, an 8 px amber dot follows the name
of each tab that holds a change (§6.6).

### 4.1 Module Specifications — `IP:403-477` (Array tab)

| Field | Default | Range | Unit |
|---|---|---|---|
| Module file | *"No .PAN file loaded"*, buttons **Load .PAN** and **View** (View enabled once a file loads) | — | — |
| Length (long side) | 2.38 | 0.5–5.0 | m |
| Width (short side) | 1.13 | 0.5–3.0 | m |
| Wattage | **610** ⚠️ (`MP` says 580) | 100–1000 | Wp |
| Max series fuse | 0, shown as *Not set* | 0–100 | A, tooltip *"From the module datasheet; PAN files don't carry it.\nBlank: no check. The BOM warns when the string fuse is above it."* (`IP:838-842`); a compared input, saved (`RI:79`, `IP:3769`) |
| Bifacial module | off | — | — |
| Bifaciality factor (φ) | 0.70 (enabled only when Bifacial is on) | 0.50–0.95 | — |

- **Load .PAN** (file dialog **Select PVsyst Module File**) parses a PVsyst
  module file and auto-fills wattage, long side, short side, and — when the
  file declares it — turns on Bifacial and fills φ. It also recomputes the
  temperature loss. The file row then shows the module label in green (its
  tooltip carries μ_Pmpp, NOCT and *"⚡ Bifacial detected φ = …"*) —
  `IP:1735-1822`.
- The PAN file's **path is saved in the project**. On reopening, a file that
  is missing reads *"Not found: <file>"* and one that cannot be read *"Could not
  load: <file>"*; the path is kept for the next save, and the layout opens out
  of date (§6.6) — `IP:2912-2922, 2958-2970`.
- ⛔ **Loading a module file no longer asks anything.** The old *"Calculate the
  number of modules in series automatically?"* Auto / Manual prompt is gone
  (`IP:1820-1822`). String sizing is opened from the **Size…** button beside
  **Modules per row** (fixed tilt) or **Modules per string (N–S)** (tracker) —
  see §4.8a.
- **View** opens the read-only viewer **Module (PAN) — <file>** with the tabs
  *Basic data*, *Sizes and technology*, *Model parameters*, *Additional data*,
  *Graphs*; the Graphs tab draws the I–V and P–V curves titled *"STC (1000 W/m²,
  25 °C)"* — `pan_viewer_dialog.py:156-179, 274`.
- PAN dimension values are accepted in metres (< 100) or millimetres
  (≥ 100) — `pan_parser.py:9-11`.
- The nominal operating cell temperature **is** read from the file, from any of
  the `NOCT`, `NOCTemp` or `FAIMAN_c1` keys, falling back to **45 °C** when the
  file carries none — `pan_parser.py:148-149`. It feeds the string-sizing hot
  case (§4.8a).
- ⛔ There is **no north–south table gap field**. `table_gap_ns` exists in the
  model (`MP:121`) but has no widget, so the **Gap between MMS-Tables** field
  is east–west only. Do not describe a north–south table gap; north–south
  spacing is the row pitch (§4.3).

### 4.2 MMS-Table Configuration (Fixed Tilt only) — `IP:479-527`

| Field | Default | Range | Unit |
|---|---|---|---|
| Orientation | Portrait (or Landscape) | — | — |
| Modules per row *(with the **Size…** button)* | 28 | 1–100 | — |
| Rows per MMS-Table | 2 | 1–10 | — |
| Gap between modules E-W | **0.020** ⚠️ (`MP` says 0) | 0.0–5.0 | m |
| Gap between modules N-S | **0.020** ⚠️ (`MP` says 0) | 0.0–5.0 | m |
| Gap between MMS-Tables | 1.0 | 0.0–20.0 | m — **east–west only**, between tables in the same row |
| Maximize placement | off | — | — |
| Add half tables | **off** ⚠️ (`MP` says on) | — | — |

Table dimensions — `MP:45-65`, also in the gap tooltips (`IP:490-495`):
- Portrait: module short side → E-W, long side → N-S. Landscape: reversed.
- `table_width  = modules_in_row × mod_ew + (modules_in_row − 1) × gap_ew`
- `table_height = rows_per_table × mod_ns + (rows_per_table − 1) × gap_ns`

**Maximize placement** positions each row independently to hug the exact
boundary edge, fitting extra tables near diagonal or curved fences. Table
columns will **not** be vertically aligned across rows, and computation takes
longer on large sites — `IP:720-729`.

**Half tables** drop in wherever a full table will not fit, holding whole strings only (§4.2a);
the tooltip adds *"Half tables are also available in Sketch Mode."* — `IP:912-918`.

### 4.2a Whole strings on placed modules (#264) — `SC/units.py:1-22, 145-170, 202-206`, `IP:301-316`

Every placed module sits on a whole string. A half unit holds `full strings // 2`.

- **Fixed tilt, R rows of M modules (one string per row):** a half table is `ceil(M/2)` modules
  wide (with E-W gaps), **full height**, and holds `R // 2` strings, each running along one half
  row and back along the next. Odd R leaves one row empty. **1P (R = 1) has no half table.**
- **Tracker, S strings, M modules per string, A modules across:** A = 1: half is `S // 2` strings
  long; a 1-string tracker has none. A ≥ 2: half the length (`ceil(S·M/2)` modules per column),
  `(A·S) // 2` strings.
- **Half weight** = half modules ÷ full modules; ICR counting and block balancing use it
  (`layout_engine.py:1053, 1070`, `SC/icr_placer.py:116-120, 175-193`). ⛔ So "a half unit counts
  0.5" is true only for even R or S. The DC cap and the cleaning **Skip lines up to** threshold do
  count a half unit 0.5 (`RC:436`, §10.2).

Run (0.02 m gaps, 1.13 × 2.38 m module):

| Config | Full | Half: width or length, strings, modules, module slots | Half weight |
|---|---|---|---|
| R1 M28 | 32.18 m, 1 string, 28 | none | 0 |
| R2 M28 | 32.18 m, 2, 56 | 16.08 m, 1, 28, 28 | 0.5 |
| R3 M28 | 32.18 m, 3, 84 | 16.08 m, 1, 28, 42 | **0.333** |
| R4 M28 | 32.18 m, 4, 112 | 16.08 m, 2, 56, 56 | 0.5 |
| R2 M27 | 31.03 m, 2, 54 | 16.08 m, 1, 27, 28 (one slot empty) | 0.5 |
| Tracker A1 S2 M28 | 63.28 m, 2, 56 | 31.64 m, 1, 28 | 0.5 |
| Tracker A1 S1 | | none | 0 |
| Tracker A1 S3 | 94.92 m, 3, 84 | 31.64 m, 1, 28 | **0.333** |
| Tracker A2 S1 | 31.64 m, 2, 56 | 15.82 m, 1, 28 | 0.5 |
| Tracker A2 S3 M27 | 91.53 m, 6, 162 | 46.33 m, 3, 81, 82 | 0.5 |

**On the card**, live as Rows / Modules change (`IP:301-316`): no half possible: **Add half tables**
(or **Add half trackers**) is **disabled**, and the hint reads *"A half table here would hold only
half a string."* / *"A half tracker here would hold only half a string."* Fixed tilt with odd rows:
*"Each half table carries {n} string[s]; its third|fifth|seventh|ninth row stays empty."* Otherwise
the hint is hidden. The engine ignores the tick when no half exists (`layout_engine.py:958-960`).
In Sketch Mode **➕ Half Table** is disabled with the same words (`MW:6547-6553`).

### 4.2b A table's ground footprint (#280) — `SC/units.py:76-90`, `layout_engine.py:919-931`

A table's north–south size in the plant is its **plan depth**: slope length × cos(tilt). Placement
tests, the drawing, gaps and arrester row gaps all use it. A tracker lies flat: slope length = its
height, tilt 0. The visible row gap = pitch − plan depth. **GCR stays slope length ÷ pitch**, not
footprint ÷ pitch. The pitch formula is worked from the slope length. Run: sample site, L 4.78 m,
tilt 8.43° → 4.728 m on the ground, pitch 5.287 m, GCR 0.9041.

### 4.3 Spacing & Tilt (Fixed Tilt only) — `IP:529-594`

| Field | Default | Range | Unit |
|---|---|---|---|
| Override tilt angle | off → the line under it reads *"Auto (latitude-based)"* | — | — |
| Tilt angle (when overridden) | 20.0 | 0.0–90.0 | ° |
| Override row pitch | off → *"Auto (no-shading, latitude-based)"* | — | — |
| Row pitch (when overridden) | 7.0 | 1.0–50.0 | m |

- Auto tilt: `0.76 × |latitude| + 3.1`, **clipped to 5°–40°** (`SC/spacing_calc.py:43-53`). Southern
  sites use |latitude|. Tooltip `IP:932-938`.
- **Auto pitch keeps rows shade-free across the Shadow Window on 21 December** (#453; the window is
  on the Site tab, §4.6, 09:00–15:00 solar time by default; tooltip `IP:967-972`). For one solar
  hour: `pitch = L·cos(tilt) + L·sin(tilt)·cos(azimuth) / tan(elevation)`, the sun at day 355 at
  |latitude|, azimuth 0 = the equator (`SC/spacing_calc.py:58-63`). Hours used: the window's start,
  its end, and 12.0; the largest wins. Elevation floored at 5°. Rounded **up** to the millimetre
  (`SC/spacing_calc.py:95-98`). Window start = end = 12 gives noon only.
  ⛔ It is no longer the winter-solstice solar-noon pitch.
- Run, L = 4.78 m:

  | Latitude | Auto tilt | Noon-only pitch | 09–15 pitch | 09–16 pitch | Plan depth |
  |---|---|---|---|---|---|
  | 12° | 12.22° | 5.393 | 5.633 | 6.012 | 4.672 |
  | 20° | 18.30° | 5.961 | 6.427 | 7.240 | 4.538 |
  | 28° | 24.38° | 6.830 | 7.708 | 9.479 | 4.354 |

- After a layout runs, the auto lines read *"Auto → 12.3° (latitude-based)"*
  and *"Auto → 7.42 m (no-shading, latitude-based)"* and the values are
  pre-filled into the (still greyed-out) boxes — `IP:3202-3236`.
- Reported **GCR** = slope length ÷ row pitch (§4.2b).
- ⛔ **The trailing asterisk is gone:** Summary values carry no `*` on auto tilt or pitch; the Workings
  view says how each was reached (`MW:11724-11725`, §6.8).
- Without a latitude: §3.2's latitude refusal.

### 4.4 Tracker Configuration (SAT only) — `IP:596-744`

Card tooltip *"Horizontal single-axis tracker, N/S axis"*; dividers
*— Tracker Geometry —*, *— Row Spacing —*, *— Tracker Parameters —*.

| Field | Default | Range | Unit |
|---|---|---|---|
| No. of strings per tracker | 2 | 1–20 | — |
| Modules across tracker (E–W) | 1 | 1–8 | — |
| Module orientation | P config (Portrait) — long side E–W | — | — |
| Modules per string (N–S) *(with the **Size…** button)* | 28 | 4–120 | — |
| Gap between modules E–W | 0.020 | 0.0–5.0 | m |
| Gap between modules N–S | 0.020 | 0.0–5.0 | m |
| Tracker E-W pitch | 5.5 | 1.0–30.0 | m |
| N–S service gap between units | 2.0 | 0.0–20.0 | m |
| Max rotation angle (±) | 55.0 | 5.0–75.0 | ° |
| Tracker height from ground | 1.5 | 0.5–10.0 | m |
| Maximize placement | off | — | — |
| Add half trackers | off | — | — |

- **L config (Landscape)** puts the module long edge N–S along the torque tube.
- Tracker unit dimensions **as actually placed** — `tracker_layout_engine.py:352-357`.
  `n_ns` is the total module count along the tube:
  - `n_ns = strings_per_tracker × modules_per_string`
  - `aperture (E-W) = modules_across × mod_ew + (modules_across − 1) × gap_ew`
  - `length (N-S)   = n_ns × mod_ns + (n_ns − 1) × gap_ns`
  - `modules per tracker = modules_across × strings_per_tracker × modules_per_string`
  - `N-S step between units in a column = length + N-S service gap`
- A green **live preview line** under the parameters reads *"Aperture (E-W):
  x.xx m | Length (N-S): x.xx m | GCR: x.xxx | Modules/tracker: n"* —
  `IP:768-773`. ⚠️ **It under-reports:** it computes the first two **without
  the module gaps** (`IP:763-764`). On the shipped defaults the previewed
  north–south length is **1.10 m short** of the placed length (56 modules
  leave 55 gaps of 0.020 m). Publish the relations above, and describe the
  preview as indicative rather than exact.
- ⚠️ **The east-west pitch has a silent floor** —
  `tracker_layout_engine.py:365`: `pitch = max(aperture + 0.5, your pitch)`. A
  pitch at or below the aperture is raised to aperture + 0.5 m without a
  warning, and the reported ground coverage ratio uses the effective pitch:
  `gcr = aperture / effective pitch`.
- Tooltips: *"Typical range: 14–30 modules per string."*; *"Typical HSAT pitch:
  4.5–7 m (GCR ≈ aperture / pitch)"* — `IP:646, 674`. Tracker height and max
  angle are reference / shading-analysis inputs.
- Placement sweep is the mirror of fixed tilt: outer loop E-W across tracker
  columns, inner loop N-S along units in the column — `tracker_layout_engine.py:19-21`.
- Half trackers are half the **length**, by whole strings (§4.2a): a 3-string tracker's half has one
  string, weight ⅓. Tooltip `IP:1132-1135`; the hint and disabled state are in §4.2a.

### 4.5 Site Parameters — `IP:993-1050` (Site tab)

| Field | Default | Range | Unit |
|---|---|---|---|
| Perimeter road width | 6.0 | 0.0–50.0 | m |
| Place Lightning Arresters | off | — | — |
| LA protection radius | 100.0 (enabled only when LA is on) | 10.0–500.0 | m |
| ICR Block | 18.000 (three decimals; the field shows **18.000  MWp**) | 0.1–500.0 | MWp |
| Line corridor (each side) | 15.0 (30 m total) | 0.0–500.0 | m |
| Area setback | 0.0 | 0.0–100.0 | m |

- **ICR Block** has three decimals because the AC-capacity study writes the
  block DC into it (§10.1) — `IP:1202-1208`.
- **The number of ICRs is counted per separate piece of land**, not from the
  plant total: Σ over pieces of `ceil(piece MWp ÷ ICR Block)`, half tables at their
  half weight (§4.2a, §5.1). It equals `ceil(total plant MWp ÷ ICR Block)` only on a
  site in one piece — `SC/icr_placer.py:110-201`. ⚠️ The field's tooltip still
  gives the plant-total formula (`IP:1204-1206`; §18).
- With Lightning Arresters **off**, no arresters are placed and tables fill
  the whole usable area; they can be added by hand in Sketch Mode, with the limits in §5.2.
  ⚠️ The radius tooltip's *"spacing equal to this radius"* is stale: the grid is 1.4 × the radius
  (`IP:1189-1193`; §5.2, §18).
- The corridor and setback fields are `IP:1203-1217`. Under each, a loaded
  file adds **one row per line and per area**, with its name and its length or
  size (`SC/kmz_parser.py:100-123`). The common value moves every row still at the
  old value; a row edited on its own keeps its value — `IP:1340-1351`.
- The setback grows areas with a **square-cornered** buffer, default 0 = tables up to the edge; a
  line takes the corridor with **flat caps**; an item's own width replaces the common one
  (`layout_engine.py:608-618, 675-680`).
- The application's guidance is to raise the corridor for higher-voltage lines
  (e.g. 30 m per side for 400 kV).

### 4.6 Structures & Shadow (keep-clear) — `IP:1392-1440` (Site tab)

A grid with column headers **L**, **W**, **H**: Length (E-W) × Width (N-S),
plus a Height that drives the shadow footprint. The compact fields carry no
unit suffix; the row labels do (*"ICR (m):"*). **Three rows** (`IP:1392-1396`):

| Structure | Length | Width | Height | Unit |
|---|---|---|---|---|
| ICR | **10.0** | **4.0** | 5.0 | m |
| MCR | **15.0** | **8.0** | 5.0 | m |
| USS | 5.0 | 4.0 | 5.0 | m |

Ranges: **Length 0.0–500.0 m**, **Width 0.0–500.0 m**, **Height 0.0–200.0 m**, one decimal.
⛔ **The Object row is gone:** an object's size is asked when it is placed (§7), and is not a run input.

| Other row | Default | Range | Unit |
|---|---|---|---|
| LA (m): height | 9.0 | 0.0–100.0 | m |
| LA (m): *pile Ø* | 0.30 | 0.0–5.0 | m |
| Shadow Window (h): | **9.0 to 15.0** | 4–12 / 12–20 | solar hours |
| Clear tables in shadows: | **on** | — | — |
| *— Street Light —* Pile Ø / Height: | 0.30 / 6.0 | 0.0–5.0 / 0.0–50.0 | m |
| Span / Setback: | 40.0 / 0.20 | 1.0–500.0 / 0.0–50.0 | m |
| Place street lights: | **off** | — | — |

- Shadow-window tooltip: *"Solar-time window the design keeps shade-free. It sets the auto row pitch
  (no row shades the next in this window on 21 December) and the keep-clear the buildings' shadows
  sweep on every day of the year. 9 to 15 h is the usual design window (winter solstice governs). A
  wider window widens every row gap and roughly doubles the ground each 5 m building sterilises."*
  — `IP:1420-1426`. Both ends are run inputs.
- **USS (Unit Substation):** in a multi-plot file, *Place MCR* first drops a
  USS of this size in every plot **except** the one holding the MCR; each
  plot's ICRs route their MV cables to their USS.
  The USS→MCR link itself is an overhead line or buried cable handled
  outside the automatic MV routing — `MP:271-276`.
- **Clear tables in shadows** removes tables/trackers inside the year-round shadow of the ICR, MCR,
  USS, objects and street lights during the window (`layout_engine.py:361-365`). ⚠️ **It does not
  govern arrester masts:** with the box off, 26 masts still removed 89 tables on the sample site
  ([ran], `SC/la_manager.py`, §5.2, §20). The Layers ▸ Shadows layer shows the
  keep-clear whatever the box says (§6.2).
- **LA height and pile Ø change the design** (#454): the pile sets the mast's footprint (floor 0.2 m,
  `SC/la_manager.py:132-134`), the height and the Shadow Window its shadow, and tables under either are
  removed; height 0 clears the pile only. The height prints in the arrester's BOM line (*Level IV, 9 m
  mast*). ⛔ Do not repeat "no design effect".
- **Street lights** on: place poles along the perimeter spaced by the span,
  just inside the fence, and clear tables their shadow touches. Count ≈
  perimeter ÷ span.

### 4.7 Topography (slope-aware exclusion) — `IP:1150-1253` (Site tab)

| Field | Default | Range | Unit |
|---|---|---|---|
| Avoid steep ground | off | — | — |
| Contour data | button **Load contour / levels…**, label *"Auto (satellite DEM)"* | — | — |
| Satellite DEM if no file | on | — | — |
| Max N–S slope | 10.0 | 0.0–45.0 | ° |
| Max E–W slope | 15.0 | 0.0–100.0 | % |
| Max height var / table | 5.0 | 0.0–30.0 | m |
| Exclude depressions | **off** ⚠️ (`MP` says on) | — | — |

- **Contour data** accepts a DXF contour file **drawn in the boundary file's
  coordinates** (UTM for a KMZ or a drawing located by its own coordinates; the
  drawing's own coordinates for a CAD boundary placed by hand or layout only),
  or a CSV of `lon,lat,elevation`. The button tooltip, verbatim: *"Optional. DXF
  contour file, drawn in the boundary file's coordinates (UTM for a KMZ), or CSV
  of lon,lat,elevation. Leave empty to auto-build the DEM from public satellite
  data (SRTM). A layout-only site (location unknown) takes the DXF only."*
  (`IP:1169-1173`). On a layout-only site a CSV is refused and no satellite DEM
  is fetched (`GR:59-64`). File dialog **Select contour / spot-level file**,
  filter `*.dxf *.dwg *.csv *.txt`.
- The contour file's path is saved in the project; a missing one reads
  *"Not found: <name>"* on reopening (`IP:2887, 3112, 3294`). The contour file
  counts as an input for out-of-date purposes only while **Avoid steep ground**
  is on (`RI:184`).
- With no file and the satellite option on, the DEM is built from public
  satellite elevation data (SRTM) — needs an internet connection.
- Excluded ground: slope steeper than the limits, and (when enabled)
  depressions / water-pooling cells — `terrain.py:5-11`.
- **Max height var / table** is the ground relief allowed within one table
  footprint — the pile-reveal differential.
- Any terrain failure (no network, bad file) is non-fatal: the layout simply
  proceeds without terrain exclusion — `terrain.py:16-18`.
- ⛔ **Do not document a reduced-level (RL) band.** `terrain_min_rl` /
  `terrain_max_rl` exist in `MP:205-206` but have **no widgets**, so a reader
  cannot set them, although the enable tooltip still mentions an RL band.
- Contours are drawn green (low) → blue → red (high) and toggled by the
  **Contour / terrain** row of the Layers popover (§6); the excluded area is
  reported in acres.

### 4.8 String Inverter / SMB card — `IP:1254-1319` (Electrical tab)

Card title **String Inverter** (string design) or **SMB – String Monitoring
Box** (central design).

| Field | Default | Range | Notes |
|---|---|---|---|
| Max strings per inverter *(String)* / Max strings per SMB *(Central)* | 20 | 1–500 | *"Maximum number of solar strings per inverter|SMB.\n1 string = 1 row of modules within a MMS-Table."* |
| DC harness | One string per input | or Y, two strings per input | §4.8d |
| String fuses | by design | four options | §4.8d |
| Communication | by design | two options | §4.8e |
| Weather stations | At the MCR | three options | §4.8e |
| Max SMB per Central Inverter *(Central only)* | 10 | 1–200 | §4.8f |
| OND (inverter) | *"No OND file loaded"*, buttons **Load .OND** and **View** | — | View enabled once a file loads |

These combos are compared run inputs, saved with the project (`IP:199, 225`, `RI`); they take effect
at the next Generate. Device count: `num = ceil(plant kWp ÷ (fillable cap × string kWp))`, the fillable
cap being the highest load ≤ the max strings that whole tables can reach (2-string tables with no half
tables: 23 acts as 22). Run: 54,280 kWp ÷ 341.6 → 159 (`SIM:424-437, 5105-5145`). A string plant under
an AC simulation: `min(max(num, floor), tables)`.

- **Load .OND** (file dialog **Load Inverter OND File**) parses a PVsyst
  inverter file; the row then shows *Manufacturer Model* — `IP:1560-1580`.
  **Plant AC capacity, Inverter AC capacity and the DC / AC ratios use the nominal
  AC power (Pnom) first**, PmaxOut only when Pnom is missing
  (`SC/plant_ac.py:83-107`), unless an AC-capacity study set the AC target. The button's
  tooltip *"The nominal AC power (Pnom) will be used to calculate total plant AC
  capacity and DC/AC ratio."* (`IP:1298-1303`) is accurate. (Corrected
  2026-09-28 in review; earlier versions of this sheet said PmaxOut first.)
- The OND also feeds the **ACCB & Transformer** card (§4.8c): PMaxOut sets the
  transformer loads and the power transformer, VOutConv the LV voltage, IMaxAC
  the inverter → ACCB feeder current (§4.8b) — `EG:52-68`, `CS:201-215`. Loading an OND after a layout regroups at once and marks
  the layout out of date (the OND is a run input) — `MW:8864-8896`, `RI:176`.
- The OND **path is saved in the project**; a missing file reads *"Not found:
  <file>"*, an unreadable one *"Could not load: <file>"* (`IP:2924-2931`).
- **View** opens the read-only viewer **Inverter (OND) — <file>** with **five**
  tabs: *Main parameters*, *Efficiency curve*, *Additional parameters*,
  *Output parameters*, *Sizes and technology* — `ond_viewer_dialog.py:51-58`.
  (There is no *Commercial data* tab.)
- ⛔ The cable option is **not** in this card — see §4.8b.

### 4.8a String sizing — `string_sizing.py`, `string_sizing_dialog.py`

Opened from the **Size…** button (tooltip *"Open the string-sizing
calculator"*) beside **Modules per row** (fixed tilt) or **Modules per string
(N–S)** (tracker) — `IP:1824-1837`. It needs both files — `IP:1839-1863`:

- No module file → an information box **Module PAN file required**: *"String
  sizing reads the module voltages from a PAN file. Use Load .PAN under Module
  Specifications, then choose Size… again."*
- No inverter file → **Inverter OND file required**: *"String sizing needs the
  inverter's MPPT window from an OND file. Select it now."*, then the Load OND
  file dialog opens at once.
- An OND without an MPPT range → a warning **MPPT range missing**: *"The OND
  file has no MPPT voltage range, so the string length cannot be sized
  automatically. Enter it manually."*

The three constraints, all evaluated at module/cell temperature, not ambient —
`string_sizing.py:1-22`:

1. `Voc_cold × N ≤ V_system` — the hard insulation / equipment limit.
2. `Vmp_cold × N ≤ Vmpp_max` — so the operating point is trackable on a cold,
   sunny morning.
3. `Vmp_hot × N ≥ Vmpp_min` — so the inverter can still track on a hot
   afternoon.

Cold therefore sets the **maximum** string length and hot the **minimum**.

The **String sizing** window (a `ResultDialog`, 860 px; `string_sizing_dialog.py`):

- A context strip: *Module <maker model> <Wp>*, *Voc … V · Vmp … V*, and an
  *Inverter MPPT <min>–<max> V* chip.
- Left, **SITE**: **System voltage** (editable combo: 1000 V, 1100 V, **1500 V**,
  2000 V), **Coldest day** (−5.0 °C, −40–40; hint *sets Voc*), **Hottest day**
  (45.0 °C, 10–70; hint *sets Vmp*).
- **CELL TEMPERATURE**: **Model** — *Sandia (wind-based)* (default) or *NOCT
  model*; **Wind speed** 3.0 m/s (0–15, Sandia only) or **NOCT** (30–60 °C,
  from the module file; hint *typ. 42–48*, or *estimated* when the file has
  none); **Irradiance, hot case** 1000 W/m² (100–1200).
  Relations: NOCT `T_cell = T_amb + ((NOCT − 20) / 800) × G`;
  Sandia `T_cell = T_amb + G × (0.0126 − 0.0029 × wind)`.
- An expander **Override voltage temperature coefficient** (summary *"−0.280
  %/°C from PAN"* or *"not in PAN"*; opened only when the file lacks it), field
  **Coefficient** (−1.0 to −0.05 %/°C; default the file's Voc coefficient, else
  −0.28), applied to both Voc and Vmp.
- Right, **RESULT · updates as you type**: a verdict banner, a range bar, the
  pick — **Modules in series** (tracker: **Modules per string**) and **Parallel
  strings per table** (tracker: **Strings per tracker**), both 1–200 — and two
  tiles, *String Voc at −5 °C* (sub-text *limit 1,500 V* or *over the 1,500 V
  limit*) and *String Vmp at <hot cell> °C cell* (*floor 850 V* / *below the
  850 V floor* / *no MPPT floor in the OND file*). Until edited, the series
  count follows the largest feasible string.
- Verdicts — `string_sizing.py:238-287`: *"<n_min> to <n_max> modules in series
  are feasible"* (or *"Only <n> modules in series are feasible"*) with a detail
  naming the binding constraint at each end, e.g. *"The cold-day voltage caps
  the string at N; the hot-day MPPT floor needs at least M."*; *"No string
  length fits these limits"* with *"No feasible string length. Raise the system
  voltage or check the temperatures."*; *"The string length cannot be sized"*.
  An out-of-range pick explains itself: *"Over 1,500 V on the coldest day.
  Choose N or fewer."*, *"Below the 850 V MPPT floor on the hottest day. Choose
  M or more."*
- Footer: **Cancel** and the primary **Use this string**, which reads **Use 26 in
  series × 2 strings** once the pick is valid. Accepting writes **Modules per
  row** / **Rows per MMS-Table** (fixed tilt) or **Modules per string (N–S)** /
  **No. of strings per tracker** (tracker) — `IP:1885-1890`. The window
  remembers its inputs for the session.

⛔ There is no green *"Feasible: …"* line and no red warning line any more;
do not describe *Site min temperature* / *Site max temperature* fields.

### 4.8b Cables card — `IP:1474-1531` (Electrical tab, third card)

The **third** card on the Electrical tab, after the inverter card and **ACCB &
Transformer** / **Transformer** (`IP:290-294`). Spin boxes show the unit after
two spaces, e.g. `0.00  m/module`, `10.0  %` (`IP:2009-2010`).

| Field | Default | Range | Unit |
|---|---|---|---|
| Calculate cables | **off** | — | — |
| Inter-module lead | **0.00** (2 decimals, step 0.1) | 0.00–2.00 | m/module |
| String return run along table | **off** | — | — |
| DC cable slack | 10.0 (1 decimal, step 1.0) | 0.0–30.0 | % |
| DC string cable laying: | Buried, in conduit | or Buried directly / Above ground, in conduit on concrete blocks | — |
| AC cable laying: *(string)* / DC trunk laying: *(central)* | Buried directly | or Above ground, on concrete blocks | — |
| MV cable laying: | Buried directly | or On cable tray | — |
| DC trunk conductor *(central)* | Aluminium | or Copper | — |
| Voltage-drop limits | *"all at defaults"* / *"N changed"* with **Advanced…** | opens Advanced settings on that subgroup (§6.9) | — |

Defaults changed by #289 (inter-module lead was 0.5, return run was on); the
model agrees — `MP:166-168`.

- Ticking **Calculate cables** raises **Cable Calculation — Performance
  Notice**: *"Cable calculation can take a long time on large or complex
  layouts."* — *"It is recommended to generate the plant layout first without
  cable calculation, review the result, and then enable cable calculation for
  the final run. Do you want to enable cable calculation now?"* Buttons
  **Enable Now** / **Not Now (Recommended)** (the default; unticks the box) —
  `IP:1588-1616`. Reopening a project sets the tick without raising it
  (`IP:3236-3240`).
- Tooltips, verbatim (line breaks shown as spaces) — `IP:1486-1530`:
  - **Calculate cables**, string design: *"When checked, string DC cables (MMS →
    String Inverter) and AC cables (String Inverter → ICR) are routed and their
    total lengths shown in the results table. Uncheck to skip cable routing —
    useful for a fast first-pass layout when cable lengths are not yet
    needed."*; central design: *"When checked, string DC cables (MMS → SMB) and
    DC cables (SMB → Central Inverter, ×2 for +/– conductors) are routed and
    their total lengths shown in the results table. …"* (same ending).
  - **Inter-module lead**: *"Extra string cable per module for the inter-module
    leads. 0 by default: the module supplier provides these leads. Counted once
    per string. Fixed-tilt tables only."*
  - **String return run along table**: *"Tick for daisy-chain wiring: the
    string's two leads end at opposite ends of the table, so one conductor runs
    back along the table to exit beside the other. Leave off for leapfrog wiring
    (the default), whose leads exit the same end. Fixed-tilt only."*
  - **DC cable slack**: *"Slack / wastage added to the DC string-cable total
    (BOQ convention 10 %)."*
- The lead and the return run apply to fixed-tilt tables only (the code adds 0
  for tracker units); the **slack applies to every DC string total, trackers
  included** — `SIM:497-523`. The fields are not greyed out on a tracker design.
- With cables off, inverter/SMB counts are still computed and the cable
  figures read `—` — `MP:139-141`.
- **All three allowances are saved in the project** (`IP:163, 3107-3111,
  3286-3291`) and are compared inputs: changing one marks the layout out of
  date, listed as *Inter-module lead*, *String return run along table*, *DC
  cable slack* (`RI:131-133`).
- **Laying** (#231, #425; `IP:1915-1942`, `SC/laying.py:77-79`), tooltips: DC *"Buried, in conduit: each DC route's cables in one 40 mm HDPE
  conduit, in a trench.\nBuried directly: in a trench, no conduit.\nAbove ground: in the conduit, on concrete blocks; no trench."*; AC / trunk
  *"Buried directly: in a trench.\nAbove ground: on concrete blocks, clamped; no trench."*; MV *"Buried directly: in a trench.\nOn cable tray: no trench;
  the BOM measures the tray along the MV route."* Only buried classes count as trench (ran all above ground + tray: trench 0, DC route 14,870 m). A plot
  records the laying it was routed with, so changing the combo alone changes nothing until Generate. BOM lines: §12.8. Summary rows read *laid above
  ground* / *on cable tray* (§6.4).
- **DC trunk conductor** (#384; `IP:1978-1981`, `CS:644-648`): trunk current = strings × Imp, sized by drop and ampacity, derate 0.9, two single-core
  conductors. Lugs follow the metal: **DC cable lug, bimetallic** M16 for aluminium, **Cable lug, copper** tinned M12 for copper. Ran: 150 mm² Al vs 120 mm² Cu.
- **Inverter → ACCB feeders** (#380; `CS:201-254`): one run of the plant's size A or B. A = smallest standard size whose derated ampacity (× 0.9) carries
  the current; B = next up; A unless its drop exceeds **LV feeder drop limit** (§6.9); never a third size or a second run. Flags *"no single run carries {i}
  A"*, *"drop {v} % > {limit} %"*. Current from the OND, else max strings × string Wp. Ran on the demo: 185 and 240 mm². Aluminium ampacity = copper × 0.78
  (`CS:52`). LV-IDT 300 or 400 mm² aluminium, parallel runs (`CS:93, 278-306`). MV voltage: the card's (`CS:145-149`).
- ⛔ Do not repeat the old tooltip wording (*"BOQ convention 0.5 m"*, *"Untick
  for U-wired strings"*) or say the allowances are not saved.

### 4.8c ACCB & Transformer card and the electrical grouping — `IP:1714-1875`, `EG` (Electrical tab, second card; #301, #308, #550, #554)

Title **ACCB & Transformer** in a string design, **Transformer** in a central
design. ACCB is the **AC combiner box**. Spin boxes show the unit after two spaces
(`17.2  MVA`, `1.00  ×`). Rows, top to bottom:

| Field (verbatim label) | Design | Default | Range | Unit | Tooltip (verbatim) |
|---|---|---|---|---|---|
| **Inverters per ACCB, max:** | string | 15 | 1–60 | — | *"Most string inverters on one AC combiner box (ACCB). Each ICR block gets its own ACCBs, the inverters shared evenly."* |
| **Transformer forms (windings):** chip list | both | `5, 3, 2` (largest first; `SC/resources/electrical/defaults.json`) | whole numbers 2–13 | windings | *"The transformer forms this project allows, by total windings (5 = one MV + four ACCBs|inverters). Each ICR takes the largest form first, every transformer full."* |
| **Transformer size limit:** | both | 17.2 (1 dp) | 0.5–100.0 | MVA | *"Largest transformer allowed. A block whose load is bigger gets more transformers. Never above the largest listed rating."* Hint at the defaults: *"Capped at 16,000 kVA, the largest listed rating"* (`EG:81-87`) |
| **Standard transformer ratings (kVA):** chip list | both | `2,500, 3,150, 5,000, 6,300, 8,000, 10,000, 12,500, 16,000` | positive | kVA | *"Each transformer takes the smallest rating at or above its load."* |
| **MV voltage:** | both | 33.0 (1 dp) | 0.4–400.0 | kV | *"The transformers' MV side, and the MV cables to the MCR."* |
| **Power transformer margin:** | both | 1.00 (2 dp, step 0.05) | 1.00–3.00 | × | *"Power transformer at the MCR ≥ the plant's maximum AC (every inverter at PMaxOut) × this margin ÷ the derating, rounded up to the next listed rating. Rounding up already leaves headroom."* |
| **Power transformer derating:** | both | 1.00 (2 dp, step 0.05) | 0.50–1.00 | × | *"Below 1.00 for a site above about 40 °C ambient or 1,000 m altitude: the power transformer then needs a higher rating for the same load."* |
| **Standard power transformer ratings (MVA):** chip list | both | `10, 12.5, 16, 20, 25, 31.5, 40, 50, 63, 80, 100` | positive | MVA | *"The power transformer takes the smallest rating at or above the plant's need; above the largest, as many transformers as that needs."* |
| **LV voltage:** | both | read-only: *"needs the OND file"*, *"{v} V · from the OND"*, or *"not in the OND file"* | — | V | — (`IP:1870-1875`) |
| (answer line, full width) | both | *"Now: Generate a layout first"* | — | — | lists each unrated transformer (`MW:10333-10338`) |

⛔ **ACCBs per transformer, max** and **Central inverters per transformer, max** are gone (#550, #554).

**Lists are chip editors** (#508; `SC/size_list.py:56-75`, `SU/size_list.py`), not text fields: type in the **Add…** box and press Enter;
a pasted list goes in at once; separators comma, semicolon, space (*16,000* is one size, *4000,20000* two). A **Reset to standard** link
appears when changed (tooltip *"Back to {list} {unit}"*); a chip's × has the tooltip *Remove*; the last chip cannot be removed. Reasons:
*"“x” is not a number."*, *"x is not a positive rating."*, *"{v} windings is outside 2–13 windings."*, *"{v} is already listed."* What
cannot go in stays as typed; the list keeps what it had. ⛔ The *"Keeping …"* hint is gone.

**The answer line**, prefixed **`Now: `**:

| State | Text |
|---|---|
| No layout / grouping yet | *"Now: Generate a layout first"* |
| String design, OND loaded, all rated | *"Now: 12 ACCBs · 8 transformers: 4 × 5,000 + 1 × 8,000 + 3 × 10,000 kVA"* ([ran] sample site, PMax 330) |
| No OND | *"Now: 12 ACCBs · 4 transformers · ratings need the OND file"* |
| Central design | *"Now: 16 central inverters · 4 transformers: …"* / *"… · ratings need the OND file"* |
| A load fits no listed rating within the limit | *"Now: … transformers: … · <k> with no listed rating"*; tooltip *"ICR-{i}'s transformer load {x} kVA fits no listed rating"* (plot first on a multi-plot site); BOM remark *"No listed rating: …"* (`EG:624-647`) |

The answer line never mentions the power transformer.

**Grouping rules, per ICR block** (`EG:90-109, 229-309`):

- Devices are the ICR's string inverters (string) or SMBs (central).
- **ACCBs** (string): `ceil(inverters ÷ Inverters per ACCB)`, shared in order, sizes differ by ≤ 1.
- **Central inverters** (central): §4.8f.
- **Feeders on transformers:** largest form first, **every transformer full**. A count the forms cannot cover exactly backs off larger forms
  first. No cover at all: the cover with the fewest spare windings, spare on the last transformer (check E-15, §6.7).
- **The limit:** while any transformer's load is over the limit, the largest form is dropped **for that block** and the feeders refilled; the
  smallest form is kept whatever the limit. The limit is **Transformer size limit**, **never above the largest listed rating** (16,000 kVA by default).
- **Load** = the feeders' inverters × PMaxOut (PNomConv with no PMaxOut, `EG:63-68`). **Rating** = the smallest listed rating with
  `load ≤ rating ≤ limit`, else unrated.
- **Windings** = the form; spare = windings − 1 − feeders.
- **Voltages:** LV = the OND's VOutConv; MV = the card's **MV voltage**, which also reaches the cables' sizing (`CS:145-149`, #398).
- **Without an OND:** counts only; loads, ratings and LV are empty.

Run, forms 5, 3, 2 (feeders → transformers as feeders, windings):

| Feeders | Transformers |
|---|---|
| 1 | (1,2) |
| 2 | (2,3) |
| 3 | (2,3),(1,2) |
| 4 | (4,5) |
| 5 | (4,5),(1,2) |
| 6 | (4,5),(2,3) |
| 7 | (4,5),(2,3),(1,2) |
| 8 | (4,5),(4,5) |
| 10 | (4,5),(4,5),(2,3) |

Forms 5, 3 with 7: (4,5),(3,5), the last with one spare winding. Forms 5, 4 with 6: (3,4),(3,4). Form 5 alone with 3: (3,5).
Run, 300 kVA PMaxOut, defaults: 60 inverters → 4 ACCBs; a 5-winding would be 18,000 kVA, over 16,000, so 3-winding: 2 × (2 feeders, 9,000 kVA → 10,000).
53 → one 5-winding, 15,900 → 16,000. 41 → 3 ACCBs [14,14,13]: (2,3) 8,400 → 10,000 and (1,2) 3,900 → 5,000.

**Power transformer** (whole plant, at the MCR; `EG:243-370`): exists only when
a plot holds an MCR, an OND is loaded and a grouping exists. Units = every
plot's inverters (string) or central inverters (central), because the other
plots feed through their USS. `need = units × PMaxOut ÷ 1000 × margin ÷
derating` MVA; `count = max(1, ceil(need ÷ largest listed))`, each unit the
smallest listed MVA ≥ `need ÷ count`. Its basis reads *"Σ PMaxOut 58.1 MVA × margin 1 ÷ derating 1 =
58.1 MVA → next listed rating"*. By others (§5a) it is left out.

**What an edit on the card does** (`MW:10307-10331`):

- Every accepted change **regroups every plot at once, without a Generate** — nothing moves, nothing is re-placed or
  re-routed. It does nothing before the first layout.
- It refreshes the **Now:** line and the Summary, closes the Earthing Design window, and redraws the earthing layer if on.
- It does **not** mark the layout out of date: the card's fields are not run inputs (§6.6). Loading an OND does (§4.8).
- **BOM:** recounted the next time it is opened; **edits are kept** (§12.3).
- **SLD:** an untouched automatic diagram rebuilds at once; an edited one is marked out of date (§11.2).
- **Saved in the project:** the rules are restored without re-running the grouping (`IP:3971-3990`).

**Where the grouping shows:** Summary rows **ACCBs**, **Transformers (IDT)**, **Transformer load (kVA)**, **Power transformer (MVA)** (§6.4); the Workings row
**Transformers (IDT)**, naming the forms, limit, ratings and which form was left out (*"{w}-winding left out, over {limit} kVA full"*, *"every form over {limit} kVA full;
the smallest kept"*; `SC/workings.py:660-720`); the BOM (§12.8); the automatic SLD (§11); D5 and S1 (§13). All read the same grouping.

### 4.8d DC harness and string fuses (#230, #399) — `IP:1593-1616`, `SC/units.py:216-268`

- **DC harness:** *One string per input* (default) / *Y, two strings per input*. Tooltip, verbatim, device
  = SMB or inverter (`IP:1597-1601`): *"One string per input: every string has its own cable to its own
  {device} input.\nY: two strings share one cable from the Y to the {device}, so that cable is halved;\neach
  string's own cable before the Y (along the table or tracker) stays its own.\nTables with one string share a
  Y with a neighbour on the same {device}:\nalong the row first, then the next row."*
- **String fuses:** *Inline, at the connector* / *Inside the {device}* / *Inline and inside the {device}* /
  *None*. Defaults: string plant Inline; central Inside the SMB; central with Y both (`SC/units.py:262-268`).
  The combo follows the harness while at the harness's default; a choice stays (`IP:325-332`).
- Y across tables (`SIM:3754-3765`, `SC/units.py:216-227`): two strings of a table share a Y; an odd one runs
  alone; with a Y, one-string tables (1P, 1-string tracker, half unit) of the same device pair up.
- BOM (ran on both plants, §12.8): 1:1: DC connector, male and female, 1 per string + spare; inline or both: also
  **DC connector set with inline fuse**. Y: **Y connector set with fused arms** (inline, both) or **Y connector
  set** (device, none), 1 per pair. The DC cable splits: own cable before the Y at **String cable size**, shared
  after at **Y pair cable size** (§6.9).

### 4.8e Communication and weather stations (#236, #407, #419) — `IP:1620-1642`, `SC/comms.py`

- **Communication:** *Power-line, over the AC cable* (string default) / *RS485, daisy-chained*. On a central plant
  RS485, combo disabled, tooltip *"SMBs are on the DC side; they talk over RS485."*
- **Weather stations:** *At the MCR* (default) / *At the MCR, module sensors at every ICR* / *None*; by others
  (§5a) *On site* / *On site, module sensors at every ICR* (`IP:618-620`).
- Chains (`SC/comms.py:138-161`): consecutive groups by angle round the ICR, nearest first within a group, as few
  as keep within **RS485: devices per chain** (20) and **RS485: chain length** (1,200 m; §6.9); a device farther than
  the limit gets its own over-limit chain, and the BOM line carries *"{n} RS485 chain(s) is/are longer than {limit} m
  (worst {w} m): a device is that far from its ICR"* (`SC/comms.py:200-201`). Lengths are Manhattan; nothing is drawn.
- Every ICR with an MV run: optical fibre as long as that run; conduit = RS485 + fibre (`SC/comms.py:64-79`). So no
  fibre without an MCR, USS or handover point. BOM lines: §12.8.

### 4.8f Central inverters — `EG:129-207`, `IP:1649-1663, 1704-1712`

- **No per-ICR limit** (#445). Without a simulation: `max(1, ceil(block SMBs ÷ Max SMB per Central Inverter))` per
  ICR. Run, Max SMB 2: blocks of 39, 35, 40, 45 SMBs → 20, 18, 20, 23 central inverters. ⛔ "At most four per building"
  and "topped up" are gone.
- **With an AC-capacity simulation** (#509): the count is `ceil(plant AC ÷ PNomConv)`, exactly (§10.1). Split: full ICRs
  of (block AC ÷ PNomConv, rounded down) first, the rest in the last; without a block AC spread evenly. Largest counts go
  to the ICRs with most SMBs; each ICR at least one and no more inverters than SMBs. SMBs are shared evenly over each ICR's
  inverters. An inverter over the Overload limit is finding E-14 (§6.7), never more inverters.
- **Max SMB per Central Inverter** tooltip: `IP:1649-1654`. While a capped central plant has a simulated count the field is
  **greyed**, with the hint *"Set by the AC simulation: the busiest inverter's SMBs. The inverter count comes from the plant
  AC."* (`MW:11399-11404`). Regenerate writes strings per SMB and the busiest inverter's SMBs there (`MW:11302-11318`).
- **Rating rows** (#446, #455; `SC/plant_ac.py:45, 65-74`, `SC/summary_sheet.py:27-64`), exact Summary labels: **Plant AC capacity
  (MWac)**, **DC / AC ratio** (DC ÷ plant AC; plant AC = the simulation's AC shared by units, else installed); **Inverter AC capacity
  (MW)**, **DC / AC on inverters** (installed PNomConv × units; shown only when a plot's two AC figures differ by > 0.0005 MW); **Largest
  DC load per inverter (kWp)**; **Largest DC load per SMB (kWp)**; **DC limit per central inverter (kWp)** (SMB kWp × Max SMB); **Inverter AC
  rating (kW)**. Run: 47.7 MWac both (DC/AC 1.138, second pair hidden); with a 20 MW target: 20.0 / 47.7, 2.714 / 1.138.

### 4.8g Module and inverter facts (#283) — `SC/equipment.py:154-165`, `MW:10293-10305`

Stamped on each Generate and on loading a datasheet: make, model, ratings and source (file name + hash, or manual). Printed names:
*"{make} {model} ({wp} Wp)"* or *"{wp} Wp module (not from a datasheet)"*; *"{make} {model} ({pnom} kW)"* or *"Inverter (not from a datasheet)"*.
Check C-04 reads them (§6.7).

### 4.9 Energy Yield card — `IP:1247-1626` (Yield tab)

The Yield tab opens with the **Run Energy Calculation** card (§9) and then this
card. Top to bottom:

**— Weather Data Source —** — two mutually exclusive tick boxes — `IP:1258-1288`:
- **PVGIS API (auto-fetch)** — default. EU JRC service, no API key. Falls back
  to **NASA POWER** when PVGIS has no data.
- **Hourly GHI file (CSV)** — reveals the row **GHI file (CSV):** (*"No file
  loaded"* + **Browse…**). Ticking it pops **Hourly GHI File — Required
  Format**: *"The CSV file must contain exactly 3 columns in this order:"* —
  Column 1 Hourly timestamp (e.g. 2023-01-01 00:30), Column 2 GHI (W/m²),
  Column 3 Ambient temperature (°C) — *"The file should cover a full year (8 760
  hourly rows). A header row is optional — the parser detects it
  automatically."* — `IP:1899-1927`. After a load the row reads e.g. *"<file>
  8760 h | GHI 1850 kWh/m²/yr | GTI from GHI+tilt | T_avg 27.3 °C ✓ Temp data
  loaded"* and the source line *"Source: Hourly file (8760 h) | GTI calculated
  after layout | Monthly T from file"* — `IP:1955-1973`.

  The parser itself is more tolerant than that dialog: it accepts flexible
  column names and an optional GTI column — `pvgis_file_parser.py:1-25`.
  Time: `time`, `datetime`, `date`, `timestamp`, `time(utc)`, `time(local)`,
  `date/time`. GHI: `ghi`, `g(h)`, `gh`, `global_horizontal`,
  `global horizontal irradiance`, `irradiance`, `solar irradiance`,
  `allsky_sfc_sw_dwn`. GTI: `gti`, `g(i)`, `gi`, `in-plane irradiance`.
  When a temperature column is present, monthly averages come from the file
  instead of the sinusoidal seasonal model.

  The hourly file's path is saved in the project; a missing one reads *"Not
  found: …"*, an unreadable one *"Could not load: …"* (`IP:2933-2939`). The
  weather file counts as an input for out-of-date purposes only while **Hourly
  GHI file (CSV)** is selected (`MW:4175`).

**— Irradiance —** and site conditions:

| Field | Default | Range | Unit |
|---|---|---|---|
| GHI | 0.0 (auto-filled) | 0–3000 | kWh/m²/yr |
| GTI (in-plane) | 0.0 (auto-filled) | 0–3500 | kWh/m²/yr |
| *(source line)* | *"Source: —"* → *"Source: PVGIS (EU JRC) — auto fetched"* / *"Source: NASA POWER — auto fetched"* / *"Source: Auto-fetch failed — switch to GHI file"* (red) | | |
| Avg. ambient temp. | 28.0 | −10–55 | °C |
| Mounting type | Open Rack – Ground Mount | 4 options | — |
| Avg. wind speed | 3.0 | 0.5–15.0 | m/s |
| *(formula trace, after a module file loads)* | e.g. *"Sandia: 28 + 600×exp(-3.56+-0.075×3.0) = 41.2 °C / μPmpp = -0.340 %/°C → Temp loss = 5.51 %"* | | |
| **— Bifacial Ground Albedo —** Ground albedo (ρ) | 0.25 | 0.05–0.80 | — |

Sandia mounting options and coefficients — `IP:1359-1365`, `energy_calculator.py:436-444`:
Open Rack – Ground Mount `a=−3.56, b=−0.075`; Roof Mount – Close
`a=−2.81, b=−0.0455`; Stand-off Mount `a=−3.23, b=−0.130`;
Insulated Back `a=−2.81, b=−0.0455`.

**Weather data correction** (#457) is not on this card: Advanced settings ▸ Yield ▸ Weather data, default **1.05**, §9. The GHI and GTI
fields show the source's figures, unmultiplied (`SC/energy_calculator.py:704-708`). Defaults come from one file,
`SC/resources/energy/defaults.json` (version 2, #388), and match the tables above; **Bifaciality** 0.70, 0.5–0.95.
**ADVANCED** — three expanders, **collapsed by default**, each header carrying
a live summary — `IP:1423-1425, 1595-1623`:

**Performance-ratio losses** (summary *"≈ 19.0 % combined"* on the defaults) —
publish the UI defaults ⚠️ (all differ from `MP:487-496`):

| Loss / factor | Default | Range | Notes |
|---|---|---|---|
| String / Central Inverter efficiency | 97.0 % | 50–100 | label follows the design |
| String DC cable losses | 1.0 % | 0–20 | *(MMS → SMB in a central design)* |
| AC cable losses (Str. Inv. → ICR) | 1.0 % | 0–20 | *(DC cable losses (SMB → Central Inv.) in a central design)* |
| Soiling losses | 2.0 % | 0–20 | dust, dirt, bird droppings |
| Temperature losses | 6.0 % | 0–20 | auto-computed once a PAN is loaded |
| ↳ Module temp. (Sandia) | read-only *"—"* → *"41.2 °C (G = 600 W/m², W = 3.0 m/s)"* | — | |
| Module mismatch | 1.0 % | 0–10 | |
| Shading losses | 1.0 % | 0–20 | **greyed out** while auto-compute is on |
| ↳ Auto (row-to-row, GCR) | **on** | — | line under it: *"Auto (row-to-row, computed on Generate)"* → *"Auto → 1.23% (row-to-row, computed)"*; on a layout-only site without a latitude *"Auto → — (needs the site's latitude)"* (`IP:2531-2544`) |
| ↳ Module ground clearance | 0.5 m | 0.0–5.0 | lower-edge height above ground |
| Availability | 99.0 % | 50–100 | |
| Transformer losses | 1.0 % | 0–10 | |
| Other losses | 2.0 % | 0–10 | monitoring, auxiliary, misc |

Temperature model — `IP:1461-1472`, `energy_calculator.py`:
`T_module = T_ambient + G × exp(a + b × W)`, then
`Loss (%) = |muPmpp| × (T_module − 25)`. `G` is the average operating
irradiance derived from GTI as `min(900, GTI × 1000 / (365 × 8))` W/m², or
600 W/m² when GTI is 0 — `IP:1996`.

**Degradation & lifetime** (summary *"0.40 %/yr · 30 yr"*) — `IP:1529-1545`:

| Field | Default | Range | Unit |
|---|---|---|---|
| 1st year degradation | **1.0** ⚠️ | 0–10 | % |
| Annual degradation | **0.4** ⚠️ | 0–5 | %/yr |
| Plant lifetime | **30** ⚠️ | 1–50 | years |

**Uncertainty & exceedance** (summary *"P50 / P75 / P90"*) — `IP:1552-1590`:

| Field | Default | Range | Unit |
|---|---|---|---|
| Combined uncertainty (1σ) | **5.0** ⚠️ | 0.1–30.0 | % |
| Exceedance prob. 1 | 50.0 | 1.0–99.9 | % |
| Exceedance prob. 2 | 75.0 | 1.0–99.9 | % |
| Exceedance prob. 3 | 90.0 | 1.0–99.9 | % |

Tooltip formulas: `P75 = P50 × (1 − 0.674 × σ)`, `P90 = P50 × (1 − 1.282 × σ)`.
All three are user-set exceedance probabilities; the Summary view's rows and
the sheet's column headers are built from them, so they read `P50Yr1(MWh)`
etc. and change when the reader changes the probabilities.

Bifacial model — `MP:495-501`:
`GTI_rear ≈ GHI × ground_albedo × F_ground_rear × (1 − GCR)` where
`F_ground_rear = (1 + cos(tilt)) / 2`; `bifacial_gain = φ × GTI_rear / GTI_front`.
Bifaciality tooltip states a typical bifacial energy gain of **5–15 %** over
a monofacial module and a typical φ range of **0.65–0.80**.

### 4.10 What a project file keeps — `MW:3577-3604`

**Every input on the five stage tabs is saved** (the project format is version 2):

- **Boundary and location:** the boundary file path (the sample site as a
  token), the **Site reference** choice and the **image scale** (§3.2, §3.3).
- **Files:** the PAN, OND, hourly weather and contour file **paths** — kept
  even when the file is missing (§6.6).
- **Array:** module size and wattage, **Max series fuse**, bifacial and φ; table orientation,
  modules per row, rows per table, the gaps; tilt and pitch override ticks and
  values; all ten tracker fields; **Maximize placement**; **half tables**.
- **Site:** road width, the **Place Lightning Arresters** tick, LA radius, ICR
  Block (three decimals), corridor and setback with each item's own row; everything in **Structures & Shadow**
  (ICR/MCR/USS L-W-H, LA height and pile Ø, the shadow window,
  **Clear tables in shadows**, the street-light tick and its four fields);
  everything in **Topography**.
- **Electrical:** max strings per inverter/SMB, DC harness, String fuses, Communication, Weather stations, max SMB
  per central inverter, the **Calculate cables** tick, the three cable allowances, the laying choices, the DC trunk
  conductor, and the **ACCB & Transformer** card's rules.
- **Yield:** weather source, GHI/GTI, every loss, the shading auto tick and
  ground clearance, ambient / wind / mounting / albedo, degradation, lifetime,
  uncertainty and P1–P3.
- **Pile patterns** — full, half, the half pattern's "based on" record and the
  radius (§8) — ride inside the saved layout settings.

**Also saved:** the layout, ICRs, inverters, cables, MCR / USS / handover points / objects, drawn obstructions,
sketch elements, hand-drawn trenches, the terrain result, the energy result (with its basis), the electrical grouping, the OND figures,
the record of what produced the layout (§6.6), and these sections:

| Section | Holds | Bad value on opening |
|---|---|---|
| **SLD** (`SS:207-216`) | elements, source, Summary or Full, signatures, the figures it was built from, legend, paper, builder, traced background | — |
| `bom` (`SC/bom/saving.py:3-7, 94-104`) | the profile as used, the decisions (entry and line edits, on/off, added lines and types, BOM settings). **Quantities are never saved: they are counted again on open** | box *"The BOM section had problems"* / *"Some of the saved BOM couldn't be used:"* |
| `deliverables` (`DL/identity.py:150-184`) | project details, the company copy (logo included), check acceptances, every issued revision with its frozen snapshot, the output folder | — |
| `settings` (`SC/settings.py:234-249`) | Advanced settings off their default | box **Advanced settings had problems** / *"Some saved settings couldn't be used:"* |
| `earthing` (`EA/project.py:38-41`) | Earthing Design inputs off their default (#412) | box **The earthing section had problems** / *"Some saved earthing inputs couldn't be used:"* |
| `ac_sim_inputs` (`ACV:157-171`), `first_gen_dc_mwp` | the AC-capacity window's inputs, ICR block AC included (#415); the first-run DC. A PAN / OND loaded only in that window is not kept | — |
| `grid_connection`, `structure` | §5a; the structure kit, kept unused (§12.7) | — |

The robotic fleet's answers come back from the saved fleet (`RC:582-588`, `MW:10920-10927`).

**Not saved:**

- **Robot count from DXF** — never touches the project; its answers and last drawing path last the session (§10.3);
- Shadow View, Energy chart and Auto grid last values: the session only (`MW:1571-1575`);
- the object size last used in Place object (session, `MW:1483-1486`);
- the SLD's undo history, Diagram / Sheet and zoom (`SS:256`);
- view state: Layers toggles, Satellite, Wireframe, **Piles** (off on open, `MW:3741-3745`), Summary's Plant | By block
  (opens on **By block** when it has blocks, `MW:3735`), Hide passed on Checks.

**On this computer, outside the project:** `~/SolarLayout_Company` (`DL/identity.py:217`), `~/SolarLayout_BOM_Profiles`
(`SC/bom/store.py:61`), `~/SolarLayout_Symbols` (`SC/sld_custom_symbols.py:33-40`), the default package folder `Documents/SolarLayout/Exports` (`MW:13621-13623`).

**Older projects** are repaired from their saved layout settings on opening; the status then reads *"Opened <name>, saved by an earlier
version: 1 input was restored from its saved layout"* / *"…: N inputs were restored from its saved layout"* (`RI:551-557`).



## 5. Layout pipeline

Order of operations — `layout_engine.py:1-11`, `MW:544-577, 4400-4471, 5095-5240`:

1. Parse the boundary file → boundaries, each with obstacles and line
   obstructions.
2. Project WGS84 → the local **UTM** zone (metres). All internal geometry is
   UTM metres; conversion happens only at the edges.
3. Shrink the boundary inward by the **perimeter road width**.
4. Subtract polygon obstacles and the buffered LineString corridors.
5. Apply terrain exclusions (when enabled).
6. Place the table grid. Rows run **E–W**; panels face the equator (south in
   the northern hemisphere, north in the southern).
7. Tables are placed only where they fit **entirely** inside the usable area.
8. Count and place the ICRs per separate piece of land (§5.1); remove tables
   overlapping their footprints; **re-check the count** against the capacity
   left (it can rise or fall).
9. Street lights, the half-unit gap sweep (when half tables are on) and the
   **building-shadow keep-clear** (when **Clear tables in shadows** is on); then
   a **second ICR re-check** that can only lower the count (fixed tilt only).
10. Carry the reader's MCR, USS, handover points, obstructions, roads, objects, annotations and drawn trenches
    onto the new layout and clear tables under them; apply the AC-capacity DC
    target when one is set (§10.1) — `SC/frame_carry.py:46`.
11. Place **Lightning Arresters** (when enabled) and clear tables under their pile and shadow; top a
    DC-capped plant back up to its target — `MW:747-767`.
12. Place inverters/SMBs — always, whether or not cables are calculated — and
    route DC / AC / DC-trunk cables when **Calculate cables** is on (§5.3).
13. Route MV cables for every plot that holds an MCR, USS or handover point, **only with Calculate cables on**;
    with it off none is routed and any left is cleared (`tests/test_mv_only_with_cables_346.py`).
14. Compute trench totals, write the status line and draw under one overlay (§17). The BOM is counted
    when its view or an export first needs it (`MW:8898-8919`); the checks run once the plant is drawn (`MW:5149, 11994`).

⛔ Arresters are placed **before** inverters and cables, not after.

- **`usable_polygon`** is the authoritative layout area (boundary − road
  band − obstacles − corridors − terrain exclusions). LA placement and DC
  routing validate against it.
- **Cable containment** (#208): DC runs are
  clipped to the usable area, so they stay off the perimeter road band. AC
  feeders and central-design DC trunks are held inside the plant boundary on a
  best-effort basis; a run that cannot be re-routed inside keeps its original
  path and is reported by check E-07 (§6.7). ⛔ Do not write that every cable is guaranteed to stay
  inside the fence.
- The perimeter road band is exactly `boundary − boundary.buffer(−road_width)`, shared by the plot
  and the deliverables — `SC/perimeter_road.py:1-13`. A self-intersecting fence becomes its valid shape, the
  largest piece (#617; `SC/perimeter_road.py`).
- **The land account** (#284; `SC/area_account.py`): gross site → each exclusion kind (obstacle, water, corridor, perimeter road,
  buildings and shadows, arrester keep-clear, drawn obstructions), booked in a fixed order, net of earlier kinds → usable →
  under tables. It feeds the Workings' Site group (§6.8), S1's Area account sheet, R1 §2.3 and check R-05.

### 5.1 ICR count and placement — `SC/icr_placer.py` (#274)

**Count — per separate piece of land** (`icr_placer.py:110-201`):

- The tables are split into **separate pieces of land**: two tables share a
  piece when a chain of tables links them with no edge-to-edge gap in the
  chain over **300 m** (`SEPARATE_LAND_GAP_M`). Internal roads, corridors and
  setbacks never split a piece.
- A piece's MWp is the plant MWp shared by module weight (a half table at its
  **half weight**, §4.2a). Each piece needs **`ceil(piece MWp ÷ ICR Block)`** ICRs; the
  plant count is the sum over pieces.
- On a site in one piece this equals `ceil(total MWp ÷ ICR Block)`. Several
  distant pieces can need more rooms than that: each small far-off piece gets
  its own.
- The reader cannot set the count directly; it follows capacity (so road
  width, obstructions and the shadow keep-clear can change it) and how the land
  splits.

**Blocks — equal capacity, never across pieces** (`icr_placer.py:204-372`):
each piece is divided into exactly *k* blocks by k-means++ (fixed seed) and then
**capacity balancing** until every block is within **±5 %** of the mean — a
target, not a guarantee: after 80 iterations the best result is kept. Blocks
stay compact; half tables at their half weight throughout. Each block is therefore about
`piece MWp ÷ k`, at most one ICR Block and usually less — ⛔ there is no
"leftover small block" any more.

**Placement** (`icr_placer.py:32-103, 419-483`):

- Each ICR goes to the centroid of its block's tables, searched north–south
  first (±100 m in 1 m steps), then in rings (±300 m in 5 m steps). The
  building must fit **fully inside** the usable polygon, at the reader's
  **ICR L × W** (Structures & Shadow; `layout_engine.py:862-865, 892-895,
  946-949`, `tracker_layout_engine.py:479-482, 493-496`).
- **An ICR that finds no valid spot is counted, not silently dropped**: it
  surfaces as check **E-11** *Every block's ICR placed* (§6.7; `SC/icr_placer.py:432-433`).
- ICRs are numbered 1…n; any table overlapping an ICR footprint is removed.

**Re-checks** (`layout_engine.py:859-956`):

- **After the ICR clearance:** the count is recomputed from the modules left
  and compared with the count asked for (placed + not placed); if they differ
  the ICRs are placed again. This can raise or lower the count. (Skipped on
  plants over 50,000 tables when the difference is within max(1, 2 %).)
- **After the building-shadow keep-clear** (#241): the count is computed again
  and, **only if it is lower** and the plant has ≤ 50,000 tables, the lower
  count is tried and kept if the settled result still needs no more. This step
  **only ever lowers** the count, and exists **on fixed tilt only** — the
  tracker engine has only the first re-check (`tracker_layout_engine.py:475-498`).

**Moving:** an ICR moves by a drag in **Sketch Mode only**; the tables rebuild on
release, an invalid drop snaps back, and the count does not change (§7). Drags
are ignored while cables are being routed (§5.4).

**What an ICR block is** (`SC/icr_blocks.py:1-12, 65-85`): for every
output that talks about blocks — the Layers row, Summary ▸ By block, D2, K1 — a block is **one ICR and the tables wired to it**
through their inverter or SMB (the electrical grouping), **not** the placement
cluster above. The two differ slightly because of the inverter-to-ICR
assignment (§5.3). Before inverters are placed a block has no tables.

### 5.2 Lightning Arresters — `SC/la_manager.py` (#454, #565)

Site tab: **Place Lightning Arresters:** off, **LA protection radius:** 100.0 m, 10–500, disabled until ticked (`IP:1179-1198`); **LA (m):**
height 9.0, pile Ø 0.30 (§4.6). **The rules are the same for fixed tilt and trackers** (`SC/la_manager.py:1-19`):

1. **Grid spacing = 1.4 × radius**, centred on the usable polygon's centroid; a grid square's farthest point is spacing ÷ √2 = 0.99 R. Default: 140 m
   (`SC/la_manager.py:35, 349`).
2. **Each grid point moves to the nearest gap:** fixed tilt, Y snaps to the nearest gap between rows; tracker, X snaps to the nearest gap between columns.
   It is kept only if the snapped point is inside the usable polygon; duplicates count once (`SC/la_manager.py:343-372`).
3. **Coverage top-up:** any table centre, **ICR, MCR or USS centre** beyond the radius from every mast gets one more, in the nearest gap, nudged inside
   (`SC/la_manager.py:307-313, 376-381`).
4. **Keep-clear:** every table or tracker touched by the mast's pile, or by its shadow swept over the Shadow Window on every day of the year, is removed
   (`SC/la_manager.py:156-171, 215-241`). Pile footprint = `max(pile Ø, 0.2)` square. Without a latitude, or at height 0, only the pile clears.
5. The count and MWp removed go to the Workings' **Lightning arresters** row; capacity is recounted and the land account books the keep-clear.

⛔ **The 30 × 7 m rectangle, the 1 × 1 m tracker marker and "no tracker units removed" are gone.** ⛔ Grid spacing is not the radius, and the 0.707 / 29 % figures are gone.

Run on the sample site [ran]:

| Design | Masts (grid + coverage) | Tables removed | MWp removed |
|---|---|---|---|
| Fixed tilt, 54.28 MWp, 1,589 tables | 26 (17 + 9) | 89 | 3.04 |
| Tracker, 19.88 MWp, 582 units | 21 (16 + 5) | 90 | 3.07 |

Height 0: 26 masts, 0 tables removed. With **Clear tables in shadows** off: still 89 removed.

Where it shows: masts and *LA-n* labels draw with **Plant layout**; the protection circles are the Layers row **Arrester coverage**; the keep-clear is
**Shadows (keep-clear)** (§6.2). Summary **Lightning arresters** row in Electrical, and the chip, when the design has arresters. Checks C-02 and E-09 (§6.7).

⚠️ **A mast placed by hand** (Sketch ➕ LA) stands at the click, not snapped to a gap, and removes the tables under its pile and shadow. Do not state its
radius or size, and do not promise it lasts: it does not read the project's fields, and it is dropped on leaving Sketch while **Place Lightning Arresters**
is on, or at the next Generate while it is off (§20, resolved 2026-11-05).

### 5.3 Inverters and cables — `string_inverter_manager.py`, `mv_cable_router.py`

- Inverters are placed from **K-means clusters** of tables, sited in the gap
  bands between rows.
- A placed string inverter is drawn as a **2 m (E-W) × 1 m (N-S)** marker —
  `MP:309-317`.
- **String inverter mode:** DC string cables run table → inverter (counted
  ×2 for + / − conductors); AC cables run inverter → its assigned ICR (×1,
  three-phase) — `MP:335-341`.
- **Which ICR a device feeds** (#208, #274; `SIM:530-569, 745-855,
  4817-4845`): each inverter / SMB starts on the ICR **nearest along the
  plant** (a path over a coarse grid of the boundary, not a straight line), up
  to that building's **rating** — `ceil(ICR Block MWp × 1000 ÷ inverter-or-SMB
  kWp)` devices (all devices when there is one ICR). An over-full building
  hands devices on in chains of single hops (up to 8), each only to one of the
  device's **5 nearest ICRs** within **1.5 ICR spacings** of its nearest; if no
  chain finds room the excess is levelled across lighter buildings, and a
  building still over its rating is reported by check **E-06** *ICR inverter count*
  (§6.7). ⛔ Do not write "each inverter goes to the nearest ICR".
- **Every inverter / SMB gets its own routed feeder** — the device → ICR leg is
  routed, drawn and booked in full on every plant, with no sampling
  (`SIM:4343-4350`).
- **Central inverter mode:** DC string cables run table → SMB (×2); a DC
  trunk runs SMB → ICR (×2). There is **no AC leg**, because the central
  inverter sits **inside** the ICR building — `MP:342-347`.
- AC routing is **Manhattan only** — horizontal and vertical segments, no
  diagonals. Patterns are tried in order A, A2, B, C, D, E, **E2** (a lane-graph
  zig-zag kept strictly inside the polygon, #208), F, ending in a best-effort
  centroid path that always returns something connected; a budgeted "escape"
  search re-routes runs that leave the plant — `SIM:1-22, 2333, 2548-2565`.
  Containment: §5.
- Duplicate segments shared by several inverters through the same corridor
  are de-duplicated at draw time.
- **MV cables** run ICR → MCR over a **minimum spanning tree** across all ICR
  exit points plus the MCR entry point, so nearby ICRs share a trunk and
  merge into one trench rather than running parallel lines. Termination
  allowance is 10 m per MST edge — `mv_cable_router.py:1-20`.
- **Trench** totals are the de-duplicated path length per cable type, and are
  distinct from conductor totals — many cables share one trench.
  Only buried classes count as trench (§4.8b). They are recomputed **after every cable run**, including the re-route
  of a drawn obstruction (#403; `MW:4462-4471`).
- **Hand-drawn trenches** (Sketch Mode, §7): a drawn trench of a type
  **replaces every automatic run of that type** in the plot holding its middle (nearest if none), and both the
  cable and trench totals then come from what was drawn. In a central design the 🔴 AC Trench tool
  draws the SMB → central-inverter **DC trunk**. **Drawn trenches survive Generate**, carried with the other edits
  (`SC/frame_carry.py:46, 190-205`). A deleted automatic trench stays deleted until a re-route, which asks first (§7).

#### 5.3a Very large plots: the DC comb sample and "(est.)" (#275) — `SIM:4011-4033, 4247-4256, 4378-4400, 4629-4631`

- **No plant skips cable routing.** ⛔ The old "fast geometric estimation on
  very large plants" is gone.
- On a plot with **more than 200 inverters / SMBs**, devices are clustered per
  ICR block and snapped to a gap corner, but every cable is still routed,
  drawn and booked in full.
- On a plot with more than 200 devices **and more than 30 000 tables**, the DC
  comb is drawn for a **sample of 8 clusters per ICR block**; only those appear
  on the DC cable layer and drawing; the DC string cable is booked from a model
  calibrated on the sample, and the **DC trench is the drawn trench scaled by
  all tables ÷ drawn tables**. The inverter → ICR and SMB → ICR legs are still
  routed in full.
- That scaled figure is marked: in the Summary the trench carries **" (est.)"** (`SC/summary_sheet.py:291`, `CE:102`); the BOM's DC cable,
  conduit, blocks and clamps carry the note *"Estimated: the DC strings were routed for a sample of the plot"* on the line and in the
  workbook (`CE:114-116`); S1's Trenches sheet has a **DC drawn sample** column (§13.7). ⛔ There is no *DC String Trench (est.)* row.
- Deleting a sampled DC trench in Sketch Mode scales the deletion by the same
  factor; a hand-drawn DC trench is measured as drawn.

### 5.4 One cable run at a time (#319) — `MW:933-936, 8740-8818`

While an edit's own cable routing is running (after drawing an obstruction,
placing or moving an MCR / USS / object, dragging an ICR, and so on):

- the **Obstructions** and **Grid connection & Objects** cards on the Tools
  tab are disabled as whole cards; their tooltip and the status bar read
  *"Cables are being routed… Obstruction, MCR and object tools and ICR
  dragging are back when they finish."* (the status line is also mirrored to
  the ribbon);
- **dragging an ICR is ignored** while any cable run is going — an edit's run
  or the background run after Generate or leaving Sketch Mode
  (`MW:687-688, 8740-8746, 10728`).

Edits that arrive meanwhile **wait instead of nesting**, and the status reads
*"Cables are being routed… Your change will be applied as soon as they
finish."* (`MW:8748-8759`). They then run in order once the current run ends:
ICR / MCR / USS / object moves (a later move of the same thing replaces a
waiting one), obstruction drawn, **Undo Last**, **Clear All**, an MCR or object
placement click, **Remove MCR**, **Remove Objects**, **Generate Layout** and
leaving Sketch Mode (`MW:3765, 5856-6005, 8261, 8407-8719`).

Closing the window during an edit's run is held back with *"Closing as soon as
the cables are routed..."*, and the window closes itself when the queue drains
(`MW:3619-3627, 8797-8799`). The **Generate Layout** button, the **Sketch**
button and the Studies card are not disabled.

## 5a. Grid connection by others

Verified 2026-11-05 against `main` at `5e54979` (product PR #670; first in v2.1.19.0, §21), with headless runs of the sample site in all states and a
Windows capture.

- **The card** is **Grid connection & Objects** on the Tools tab, once a layout is
  on screen: **Grid connection**, **On this site** | **By others**; default On this
  site (`MW:9788`, `MW:9804`). Saved in the project; a project from before it opens as
  On this site (`MW:3602`).
- **By others, buttons:** **Place handover point**, **Remove point**. While no point is
  placed the card reads *"Optional. Place one to route MV and fibre to it. Without one,
  the MV cable stops at each ICR's outgoing breaker."* (`MW:1210`, `MW:9788`).
- **Handover point:** a position, named HP-1, HP-2…; no tables removed, no shadow, no
  earth pits (`MP:503`). One per plot, optional; no USS by others (`MW:9392`). May stand
  in the plot, on the fence, or outside it up to **Handover point reach**: default 200 m,
  range 0–5,000 m, Advanced settings ▸ Layout (`SC/resources/settings/design.json:152`,
  `SC/grid_connection.py:30`). Further out: *"This spot is more than 200 m outside the
  boundary. Move closer to the plot."* (`SC/placement_words.py:69`). Beyond the fence the
  route stays inside the boundary and one leg runs on from the fence (`SC/mv_cable_router.py:698`).
- **Prompts:** *"Click the plot, its fence or just outside it to place the handover point."*;
  with several plots *"Click a plot to place its handover point."* Result with cables on:
  *"MV cable and fibre routed to it: n m."*; off: *"To route its MV cables, tick Calculate
  cables and generate again."* (`SC/placement_words.py:82`).
- **Cables:** choosing By others with nothing placed, and placing, moving or removing a point,
  keep the DC and AC cables (`MW:9749`, `MW:9804`). Choosing By others on a plant with an MCR or USSs
  removes them; tables return and the cables must be generated again: *"MCR removed. n tables
  back in the layout. Generate again to route the cables."* (`SC/placement_words.py:89`).
  Choosing On this site removes the points.
- **Move:** Sketch Mode, as other buildings.
- **BOM** (built-in profile v21; fact `design.grid_connection`, `SC/takeoff/__init__.py:57`):
  by others, out: MCR building, furniture, water tank, wiring, power transformer, HT panel, HT
  feeder, 50 kVA auxiliary transformer, MCR earth pits; the transformer's body pits and NIFPS unit
  drop with it. With a point: MV cable, outdoor kit at the ICR, far-end kit "at the handover point"
  (Outdoor by default), joints, fibre, conduit, MV trench strip stay. No point: those go too; ICR
  breaker panels stay. Weather station stays, "on site" (`SC/takeoff/providers/comms.py:26`,
  `SC/resources/bom/profiles/solarlayout-standard.json:38, 53, 91, 143, 170`). Manual lines the park may
  cover (metering yard, modem, CCTV, CAT-6, borewell and RO, security cabin, main gate) are not changed.
- **Outputs:** report sentences (`SC/deliverables/report/build.py:66`); SLD note and links
  (`SC/deliverables/sheets/d5_sld.py:493`, `SC/deliverables/sheets/d5_facts.py:79`); schedules' Feeds
  (`SC/deliverables/schedules.py:273`); check C-03 passes with a point, not applicable without
  (`SC/deliverables/checks/completeness.py:37`); Summary and Workings read *by others*
  (`SC/summary_sheet.py:265`, `SC/workings.py:884`).
- **On this site with nothing placed** reads as unfinished, as before: C-03 fails.
- **Placing an MCR:** prompt *"Click inside the boundary to place the MCR."*; outside: *"This spot
  is outside the boundary. Move inside the plot."* The card keeps *"MCR placed in <plot>. n tables
  removed under it and its shadow."* (`SC/placement_words.py`).

## 6. The main window: ribbon, left column, views

### 6.0 Chrome — `MW:1782-1854, 2897-2918`

- **Menu bar:** File · Edit-Pile · **Tools** · Help (§16).
- **Ribbon** (navy bar), left to right: the brand **SolarLayout**; the **design chip** reading
  *"Fixed tilt · String inverter  ▾"* / *"Tracker · Central inverter  ▾"* etc.
  (tooltip *"Open another window for a different design: fixed tilt or tracker,
  string or central inverter. This window stays open."*, `MW:1791-1793`); the **Advanced settings** chip, only while a
  setting is changed (§6.9); a spacer; the **access chip** and button (§15); a status mirror (gold italic) that repeats most
  status-bar messages; a **Docs** button (opens https://solarlayout.app/docs/solarlayout, `SC/trial_client.py:125-127`) and a **Support** button (§15).
- **Left column:** the pinned gold **Generate Layout** button (**F5**) with a
  hint line under it — *"Select a boundary file on the Site tab to generate a
  layout."* while no file is selected, or the latitude refusal (§3.2) — then the five stage
  tabs (§4.0). While any input differs from the last run the button reads
  **Regenerate Layout** with a second line inside it (§6.6). While Sketch, SLD or
  BOM owns the column a **mode banner** replaces the button (§7, §11, §12). Tooltip *"Generate the plant layout for the
  selected boundary file (F5)"* (`MW:11028`).
- **Right side:** a view header, the view itself, and the plant chips.
- **Status bar:** progress and result messages on the left; on the right the
  live **cursor position** — UTM metres for a KMZ or a drawing located by its
  own coordinates, **the drawing's own coordinates** for a CAD or image
  boundary placed by hand or layout only (§3.2) — and the **app version**. The
  version shows the four-part build number with a trailing `.0` dropped, e.g.
  build 2.1.19.0 displays **v2.1.19** (*dev* when run from source) —
  `APP/app_version.py:14-21`. There is no idle instruction.

### 6.1 Views — `MW:1293-1294, 3076-3078, 8237-8278`

**Seven** tabs across the top of the right side: **Layout · Summary · Checks · Workings · Energy · BOM · SLD** (**Ctrl+1 … Ctrl+7**: Energy Ctrl+5, BOM Ctrl+6,
SLD Ctrl+7). They are views of the same plant, so each takes the whole area under the header. The Energy tab reads **Energy  •** when a
result landed while another view was up (`MW:1299, 8634-8636`). Tools sit to the right of the tabs:

| View | Tools |
|---|---|
| Every view | **Save project** · **Export ▾** (§13) |
| Layout only | **Satellite** · **Wireframe** · **Piles: OFF** (**Piles: ON** when on) · **Layers ▾** · **Sketch** · the three navigation icons **Home**, **Pan**, **Zoom** · **⛶** (expand) |
| Summary | **Open in window** |
| Energy | **Copy** · **Open in window** |
| Checks, Workings, BOM, SLD | nothing more. SLD's controls are on its canvas (§11) |

⛔ The Summary has no **Copy** (`MW:3046-3053`). Leaving Layout for any view stops a building placement and leaves Sketch Mode (`MW:8200-8214`).

- **Satellite** (disabled until a layout exists): an Esri World Imagery aerial
  photo behind the layout, geo-aligned to the file's latitude/longitude; needs
  internet. Refused on a layout-only site with *"Satellite imagery needs the
  site's location."* (§3.2). **Wireframe**: tables / trackers as outlines only. **Piles**
  (disabled until a layout exists): the pile overlay; first use opens the Pile
  layout editor (§8). **Sketch**: Sketch Mode (§7).
- **When the tools do not fit** beside the tabs, Satellite / Wireframe / Piles
  move to the top of the Layers popover as ON/OFF rows (labelled *Satellite
  image*, *Wireframe tables*, *Piles*) and the button reads **Layers ▾  +3**; Layout view only (`MW:1298, 8259-8278`).
- **⛶ Expand** opens **SolarLayout — Expanded View**: the plot in a large
  resizable window with a full toolbar and a **⟵ Return to Main Window**
  button; the main window shows *"Plot is open in the Expanded View window.
  Close that window to return the plot here."* meanwhile. Its Save is refused while out of date or without access (`MW:3483, 5043-5045`).

### 6.1a Moving round the plot (#595, #611) — `SU/plot_navigator.py`, `MW:2871-2878, 12475-12519`

Connected once for the life of the canvas; off while the SLD view shows, which has its own (§11.4).

| Gesture | Effect | Where |
|---|---|---|
| Middle button drag | pans, always (Layout, Sketch, while placing, while drawing) | `SU/plot_navigator.py:113-114` |
| Space + left drag | pans; hand cursor while Space is held, closed hand while dragging | `SU/plot_navigator.py:117-118, 193-204` |
| Plain left drag | pans only if nothing claims the press: no Sketch, no obstruction being drawn, no MCR / object / AC-anchor click awaited | `MW:12504-12519` |
| Trackpad pinch | zooms at the pointer | `SU/plot_navigator.py:87-89, 175-190` |
| Mouse wheel | zooms at the cursor | `MW:12475-12484` |
| **F** | fits the whole plant (needs canvas focus; a pan press gives it) | `SU/plot_navigator.py:126-127, 163-164` |

- **Home, Pan, Zoom stay** on the toolbar ([ran] all three shown, `MW:1296, 3028`); Back / Forward, Subplots, Customize and the toolbar's Save are gone. While
  the toolbar's Pan or Zoom is on, the gestures above do nothing (`SU/plot_navigator.py:102-104`). The view you set persists across redraws until Home, a new layout or a new boundary file.
- **The Layout view is read-only** (#611): with Sketch off a drag on an ICR, MCR, USS, handover point or object pans; in Sketch Mode the same drag moves it (§7). `MW:925-951, 12738-12741`.
- ⛔ The arrow keys and Enter no longer select an ICR block; there is no block click.

### 6.2 Layers popover — `MW:2167-2376`

**Layers ▾** opens a 260 px popover (header *Layers*, × to close) of ON/OFF
pills: **ten rows in three groups** (`MW:2360-2370`, [ran]):

| Group | Row | Default | Enabled | Notes |
|---|---|---|---|---|
| EQUIPMENT | **Plant layout** | **ON** | after a layout | *"Show the plant: tables, buildings, inverters, arresters, street lights and roads."* OFF shows only the boundary and obstacles |
| | **Arrester coverage** | OFF | after a layout | *"Show each lightning arrester's protection circle."* Circles only; masts and *LA-n* labels are Plant layout (`MW:11535-11542, 13326-13360`) |
| | **ICR blocks** | OFF | once inverters are placed | colours and outlines each block (the tables **wired** to that ICR, §5.1). It only colours: no click, no window. Its tooltip is stale (§18) |
| CABLES | **AC cables (Inv→ICR)** — *DC cables (SMB→CI)* in a central design | OFF | with cables | AC comes before DC (`MW:2191-2196`) |
| | **DC string cables (Tbl→Inv)** | OFF | with cables | |
| | **MV cables (ICR→MCR)** | OFF | an MCR or point, and cables | |
| | **Earthing** | OFF | always | *"Show the project's earthing design on the plan: its strips, jumpers and pits.\nTools ▸ Earthing Design edits it."* First show computes under the card *"Working out the earthing…"*; hidden with Plant layout (`MW:1209, 2309-2318, 11569-11612`) |
| SITE & ANALYSIS | **Shadows (keep-clear)** | OFF | after a layout | *"Show the ground kept clear for the shadows of buildings, arresters and street lights. Showing it changes nothing in the layout."* A grey hatched patch, shown whatever **Clear tables in shadows** says; hidden with Plant layout (`MW:10825-10850, 11520-11533`) |
| | **Contour / terrain** + *RL:* readout | OFF | with terrain data | *"RL: min – max m · Excluded: x ac / v m³"* |
| | **Checks** | OFF | yes | badges for open checks (§6.7) |

⛔ The **Legend**, **Lightning arresters** and **Plant totals** rows are gone; the plant chip strip always shows.

- **Legend chip:** a small **Legend ▾** button in the plot's top-right corner (Layout view only); the legend is folded by default; when open the chip reads
  **Legend ▴** and the legend can be dragged, and keeps its place across a rebuild (`MW:3351-3354, 8300-8306, 11544-11567`). It lists **only what shows**, rebuilt on every layer toggle: e.g. no *LA Protection Zone* while Arrester coverage is off. Labels:
  *Obstacle, Water Body, Contours (RL m), Obstruction, ICR, MCR, USS, Handover point, LA Protection Zone, Lightning Arrester, Perimeter Road, Shadow keep-clear* (`MW:10841, 10863, 12869-13350`).
- The plot carries a units note bottom-left: *"UTM 38N · metres"* for a KMZ or
  a drawing located by its own coordinates, *"Drawing coordinates · metres"* for
  a CAD or image boundary placed by hand or layout only — `GR:220-228`.
- While out of date the plot dims and carries an amber note at its top-left (§6.6).
- Canvas colours — `MW:369-382`: tables blue; ICR dark blue; MCR violet
  (`#EE82EE`); string inverters violet (`#8B00FF`); DC string cable **green**
  (`#00b050`); AC cable red; MV cable dark green (`#006400`); arrester circles
  orange-red (`#FF4500`); obstacles / transmission corridor red; water blue;
  the perimeter road band grey.

### 6.3 Plant chips (KPI strip) — `SU/chip_row.py:192-208`, `MW:3331-3346, 12136-12145, 12387-12416`

One row under every view, never wrapping, in this order: **Out of date** (when so) · **Design checks** (when open) · **Site area** (*88.94 acres*) · **DC capacity** (*54.28 MWp*) ·
**Plants** (multi-plot only) · **Tables** / **Trackers** · **Modules** · **ICR blocks** · **Lightning arresters** (only when some are placed) · **Year-1 P50 energy** (*98,377 MWh*, or *—*). This is the only place plant totals are shown.

- **Clicks:** the energy chip opens Energy; **Design checks** opens Checks; every other chip, Out of date included, opens Summary.
- **When the row is too narrow** a chip that does not fit is hidden, never clipped: Lightning arresters first, then Plants, ICR blocks, Tables, Modules; Site area, DC capacity, energy last; the two state chips never.
- **Before Generate** a boundary preview fills Site area and Plants; the others read *—* ([ran]).
- **Out of date**: amber, value *Out of date*, caption *figures from the last run*; every other chip greyed (§6.6; `RI:496-497`).
- **Design checks**: caption *Design checks*, value *1 check* / *N checks*, warning tone, tooltip *"Open the Checks view"*. It counts **open and to re-confirm, can't check included**; before the first report *Checking…*, on failure *Checks didn't run*; absent at 0 and with no layout. Because E-04 and E-05 can't be checked until accepted, a real plant shows it (§6.7; `DL/check_report.py:118-121`).
- ⚠️ The caption stays *Year-1 P50 energy* when the first exceedance is changed; the value follows the first P column.

### 6.4 The Summary view — `MW:3121-3179, 8340-8513`, `SC/summary_sheet.py` (#516)

**Above the sheet, in order:** the out-of-date banner (§6.6) · the failed-checks line · the settings note · the bar.

- **Failed-checks line** (`MW:3152-3157, 12177-12191`): *"1 design check failed"* / *"N design checks failed"*; detail the first three as *"E-06 ICR inverter count · …"*, then *"and N more"*; button **Open Checks**. It counts every **fail** open or to re-confirm, **completeness and reconciliation included**; can't-check and accepted rows are left out (`DL/check_remarks.py:38-46`). Hidden while a report is pending. [ran]: *"6 design checks failed"*.
- **Settings note** (`MW:3160-3176, 12097-12099`): *"Changed in Advanced settings: MV voltage drop 3.0 % (default 2.0 %) · …"* with link **Edit…**. Design settings only, not BOM.
- **Bar:** segmented **Plant | By block**, a meta line on the right. Default **By block**, in a new window and whenever a project opens; the choice lasts while the project is open and is not saved. Meta, By block: *"4 blocks · 11.92 to 15.37 MWp · the smallest is 78 % of the largest"* or *"1 block · X MWp"*; Plant: *"Click a plant's name to show it on the layout"*; no blocks: **By block** greyed, *"By block needs ICR blocks on the layout"* (`SC/summary_sheet.py:551, 772-774`, `MW:8344, 8432-8443`).
- Empty: *"Generate a layout to see the per-plant summary here."*
- ⛔ No **Metric-only** sheet under SITE · ARRAY · ELECTRICAL · CABLES · ENERGY; no **Copy**; no trailing `*`; no dash where a reason can be given.

**Plant sheet** (`SC/summary_sheet.py:323-504`). Column heads: *Metric*, plants as *"Demo  ›"* (a link that shows it on the Layout), *Total* with several. One plant on a wide stage: two tables, left Capacity, Site, Array; right Electrical, Cables & trenches, Energy, Other.

| Group | Rows |
|---|---|
| **Capacity** | DC capacity (MWp) · Plant AC capacity (MWac) · DC / AC ratio · [Inverter AC capacity (MW) · DC / AC on inverters, when they differ, §4.8f] · the first P year-1 row · CUF on DC (%) · CUF on AC (%), once energy exists |
| **Site** | Plant area (acres) · Boundary length (m) · DC per acre (MWp) · Street lights · Cleaning robots (the last two only when the design has some) |
| **Array** | Full / Half tables or trackers · Modules · Piles · Tilt (°) or Max tracking angle (°) · Pitch (m) · GCR |
| **Electrical** | ICR blocks · SMBs · Largest DC load per SMB (kWp) · Central inverters · String inverters · Inverter AC rating (kW) · Largest DC load per inverter (kWp) · DC limit per central inverter (kWp) · ACCBs · Transformers (IDT) · Power transformer (MVA) · Lightning arresters (only with arresters on) |
| **Cables & trenches** | String DC cable (m) · AC cable to ICR (m) or DC cable to central inverter (m) · MV cable (m) · DC trench (m) · AC trench (m) or DC trunk trench (m) · MV trench (m) · String DC cable per MWp (m) |
| **Energy** (once calculated) | the other P rows · *P50 energy, 25 years (MWh)* |

- Rounding: tilt 1 decimal, pitch 2, DC 2, counts 0. Features unused are left out, and a whole group with no rows disappears.
- **Plant area** is the gross boundary area before the road setback (§19a).
- **Reasons, in place of a dash** (`SC/summary_sheet.py:152-160`), painted as links to the field or card (`MW:8499-8513`): *needs an OND file*, *rating needs an OND file* (after the count: *"8 · …"*), *not calculated yet*, *no pile pattern*, *needs Calculate cables*, *needs an MCR on the layout*, *by others*, *laid above ground*, *on cable tray*.
- **How?** (`SU/summary_sheet_view.py:43, 366`) appears at the right of a label when hovered or selected, only if the figure has a working (`SC/summary_sheet.py:178-195`); it opens the Workings view at that row. None on Plant area, Boundary length, Modules, DC per acre, Inverter AC rating, or the trench rows.
- **Transformers (IDT)** reads *"4 × 16,000 kVA"*, *"2 × 12,500 + 2 × 16,000 kVA"*, *"4 · rating needs an OND file"*, *"4 · 1 with no listed rating"*.
- ⚠️ **"P50 energy, 25 years" is mislabelled** and fixed: the row's name comes from the fixed header `25yrP50(MWh)` (`MW:11714`, `SC/summary_sheet.py:117`), so it does not follow **Plant lifetime** (default **30**). The value is the lifetime total, scaled to the first exceedance (`MW:11801`). Document it as the lifetime total. The status line's *25yr* is the same (§6.5).

**By block sheet** (`SC/summary_sheet.py:623-781`). Columns: block labels (*ICR-1*, or *P1-ICR-1* with several plots), **Shared**, **Total**; a band naming each plant with several. A block head fits the Layout to that block's outline (`MW:8446-8470`).

| Group | Rows |
|---|---|
| **Block size** | DC capacity (MWp), with a bar against the largest · Share of plant DC (%) · Area (acres) · Full / Half tables or trackers · Modules · Piles (with a pattern) |
| **Equipment** | String inverters + ACCBs, or SMBs + Central inverters · AC capacity (MWac) · DC / AC ratio · Transformers (IDT) (*"2 × 12,500 kVA"*) · Transformer load (kVA) (*"13,200 · 83 %"*, a bar against the block's rating) · Power transformer (MVA) · Lightning arresters |
| **Cables & trenches** | String DC, feeder and MV per block; trench rows in Shared and Total only |
| **Plant-wide** | Boundary length · Street lights · Cleaning robots · year-1 P row · CUF on DC · CUF on AC |

- **Total is the Plant sheet's own figure, never a sum.** Shared area = Total less the blocks as shown.
- Pinned note [ran]: *"Shared: what belongs to no single block: 19.73 acres of roads, gaps and the MCR's ground, the trench networks, the boundary, the power transformer and energy."* (by-others wording `SC/summary_sheet.py:775-780`), then rounding notes: *"DC capacity (MWp): the blocks add up to 54.27; the Total is the plant's own 54.28."*
- **By block replaced the ICR block window** (§18). Block figures live here and in D2 (§13.4). A block is one ICR and the tables wired to it (§5.1).

**Open in window** (`MW:8727-8769`; tooltip *"Open the summary and monthly energy in a separate window, for example on a second monitor."*): title *"… — Summary"*, tabs **Summary**, **Monthly energy (Year 1)** (second enabled once energy exists), non-modal, follows the layout, shows the sheet currently chosen, carries the out-of-date banner, no failed-checks line or settings note, no working head links.

### 6.5 The Energy view — `MW:3228-3290, 8582-8719`

Before a run: the title **No energy result yet**, a note — *"Generate a layout
first. Energy is calculated for the generated layout."* with no layout, *"Uses
the weather source and losses set on the Yield tab. With PVGIS selected,
irradiance is fetched for the site (needs internet)."* when ready, or *"Energy
yield is off: the site's location is unknown (layout only)."* on a layout-only
site (§3.2) — and a gold **Calculate energy** button that does what the Yield
tab's button does. While a fetch runs: the status or *"Fetching weather data for the site…"*.

- **Out of date, no energy yet:** title **No energy result yet**, note *"Energy
  calculation is not available right now."*, status line *"Regenerate the
  layout first: inputs changed since the last run."*, **Calculate energy**
  disabled (§6.6).
- **After a Generate that replaced a layout with energy:** title **Layout
  regenerated**, note *"The energy result belonged to the previous layout, so
  it was cleared. Calculate energy again on the Yield tab for this layout."*
- With an energy result and the layout out of date, a banner sits above the tiles and the figures are greyed (§6.6).

After a run: **five tiles** — **Year-1 energy** (MWh), **Specific yield** (kWh/kWp), **Performance ratio** (%), **CUF on DC** (%), **CUF on AC** (%, `—` with the note *needs an OND file*) —
then the monthly table, **eleven columns**: **Month · GHI (kWh/m²) · H_i (kWh/m²) · T_amb (°C) · T_cell (°C) · Y_r (h) · Y_f (kWh/kWp) · PR (%) · Energy (MWh) · CUF DC (%) · CUF AC (%)**; rows `Jan`…`Dec` and **TOTAL / Annual**
(T_amb and T_cell `—` there); *"Monthly Energy Breakdown — IEC 61724-1 — Year 1 (all plants combined)"*; under it the chart **In-plane irradiation (kWh/m², bars) and performance ratio (%, line)**, and on the right **Monthly energy, Year 1 (MWh)**. The irradiation chart steps aside on a short window.

**The tiles and TOTAL read the run's own figures**, not a re-sum, so one year-1 energy holds on every surface (`MW:5721-5723, 5785-5791`, §9). ⛔ "The tiles can differ slightly from the annual figures" is gone. **Copy**: *"Copy the monthly energy table to the clipboard (paste into Excel)."*

The Yield tab's status line after a run [ran]: *"PR: 83.1%  |  Yr1: 96,080 MWh  |  CUF on DC: 20.2%  |  CUF on AC: —  |  25yr: 2,721.3 GWh  |  Monthly table updated"* (`SC/energy_calculator.py:1123-1139`).

### 6.6 Results that know they are out of date (#302, issue #77) — `RI`, `MW:3957-4361`

**The model.** When Generate starts it records the inputs it reads; the record
is kept when the run finishes (`MW:3957, 4029-4035`). From then on the live
inputs are compared with that record (`RI:370-398`): the layout is **current**
while nothing differs and **out of date** while anything does. **Changing a
value back makes it current again** — numbers are compared at their displayed
precision (`RI:271-287`). Input files are compared by **content**, not date
(`RI:241-265, 344-367`).

The check runs on any input change, on loading a boundary / PAN / OND / weather
/ contour file, **whenever the window becomes active again** (so a file edited
in another program is caught when the reader switches back), and before every
export (`MW:1454, 3682-3689, 4355-4361`).

**What marks results out of date** — every input on the five stage tabs
(`RI:71-179`), with these conditions:

| Input | Counts |
|---|---|
| Array: design, module size and Wp, **Max series fuse**, bifacial and φ, orientation, modules per row, rows per table, gaps, table gap, the **Override tilt** / **Override row pitch** ticks, Maximize placement, half tables, every tracker field | always |
| **Tilt angle** / **Row pitch** | only while its override is ticked (`RI:88, 90`) |
| Site: road width, LA tick and radius, ICR Block, corridor and setback (each item's row too), ICR / MCR / USS L-W-H, LA height and pile Ø, shadow window, Clear tables in shadows, street lights and their fields, every Topography field | always |
| Electrical: max strings, DC harness, String fuses, Communication, Weather stations, max SMBs, **Calculate cables**, the three cable allowances, the laying choices, DC trunk conductor | always |
| Yield: weather source, **every loss**, ambient, wind, mounting, albedo, degradation, lifetime, uncertainty, P1–P3 | always |
| **Temperature losses** | only while no PAN file is loaded (`RI:143`) |
| **Shading losses** | only while automatic shading is off (`RI:146`) |
| Tools: the AC-capacity target, inverter count, block AC, overload limit and start point | always (`IP:558-562`, `MW:4869-4870`) |
| The **Site reference** choice and the **image scale** | always |
| **Advanced settings** with the pill *Sizes cables · Generate again*, one row per setting: tab *advanced*, *"MV voltage drop 2.0 % → 3.0 %"* (§6.9) | always (`MW:4876`, `RI:204`) |
| Boundary, PAN, OND files | always |
| Contour file | only while **Avoid steep ground** is on |
| Weather file | only while **Hourly GHI file (CSV)** is selected |

⚠️ **Changing any Yield-tab loss makes the whole layout out of date**, so
Calculate Energy is refused until the reader regenerates
(`tests/test_fresh_results.py:222-236`).

**What does NOT mark results out of date:** **GHI** and **GTI**;
values the application fills in itself (auto tilt and pitch, the auto shading
value, the temperature loss recomputed from a PAN); the **ACCB & Transformer**
card (it regroups live, §4.8c); Advanced settings of the other four effects, **Weather data correction** included (§6.9, resolved 2026-11-05);
Earthing Design inputs; project details, the company and the output folder (§13.3); **hand edits** — Sketch Mode, building moves, drawn
obstructions, Place MCR / Object, pile patterns (§8), layer toggles, views; and
re-picking an unchanged file at the same path.

**How a change reads in the list** (`RI:298-367`): a number with its unit
(*"610.0 Wp"*); a flag *on* / *off*; location *"not set"* / *"drawing's
coordinates, UTM 42N"* / *"placed at 27.0739, 70.3413"* / *"layout only"*;
scale *"100 m on site = 10 mm"*; AC start point *"E 1,234.5, N 6,789.0"*;
files — edited on disk *"as at the last run → changed on disk"*, missing
*"<name> → not found at <path>"*, locked *"… → can't be read"*, added *"none →
<name>"*, swapped *"<old> → <new>"*.

**Every surface while out of date** (verbatim; `RI:431-557`):

| Where | What the reader sees |
|---|---|
| **Generate button** | **Regenerate Layout**, second line *"Module wattage changed since the last run"* / *"2 inputs changed since the last run"* |
| **Changed fields** | turn amber; tooltip *"Module wattage: 610.0 Wp at the last run"*; the normal tooltip returns when current |
| **Stage tabs** | an 8 px amber dot after the name of each tab (Site, Array, Electrical, Yield or Tools) holding a change; tooltip *"Inputs on this tab differ from the last run"* |
| **Layout view** | the plot dims; an amber note top-left: ***Out of date:*** *module wattage changed after this layout was generated.* (several: *inputs changed after this layout was generated.*), with a link **Show 1 change** / **Show 2 changes** (**Hide changes** while open). Layout view only, not SLD |
| **List of changes** (popover under the note) | title *"Changed since the last run"*; one row per change: tab · field · ~~was~~ → **now**; footer *"Click a change to go to its input. Change a value back and the layout is current again."* Clicking a row opens the tab, unfolds the card, scrolls to the field and focuses it; a setting's row opens Advanced settings (`MW:12101-12111`) |
| **Plant chips** | the **Out of date** chip first; every other chip greyed (§6.3); **Design checks** stays |
| **Summary view** | banner ***Out of date.*** *These figures are from the last run, and 2 inputs have changed since: Module wattage 610.0 Wp → 700.0 Wp, Soiling losses 2.0 % → 3.0 %. Regenerate the layout to update them.* (one: *"…and 1 input has changed since: …"*); sheet greyed (`RI:534-537`, `MW:4994-5000`) |
| **Workings view** | the same banner; values greyed (`MW:4993-4995, 5011`) |
| **Summary window** | the same banner on its Summary tab; the energy banner on Monthly energy (Year 1) when energy exists |
| **Checks view** | the report stays on screen, and a checks limit still re-runs at once; it is hidden only while the plant is being rewritten (§6.7) |
| **Earthing Design window** | banner ***Out of date.*** *These figures are from the last run, and n inputs have changed since. Regenerate the layout to update them.*; exports off with *"Inputs changed since the last run. Regenerate first."* (`ED:623-643`, `MW:5004-5006`) |
| **Energy view, with energy** | banner ***Out of date.*** *This energy was calculated for the last run, and 2 inputs have changed since. Regenerate the layout, then calculate energy again.*; tiles and table greyed, bars muted, **Copy** disabled (`RI:546-548`) |
| **Energy view, no energy** | §6.5 |
| **Yield tab** | **Calculate Energy** disabled; tooltip and status line (warning tone) *"Regenerate the layout first: inputs changed since the last run."* |
| **Status bar** | *"Out of date: module wattage changed since the last run. Regenerate the layout to update results and exports."* / *"Out of date: 2 inputs changed since the last run. Regenerate the layout to update results and exports."* — not mirrored to the ribbon |
| **Export ▾ menu** | an amber row at the top, *"Inputs changed since the last run. Regenerate first."*; **Export deliverables… stays enabled** and opens saying so (§13.2); the other four items disabled with that reason (`MW:6024-6048`) |
| **BOM view** | no banner; it shows the last run's plant and input edits don't recount until Generate |
| **SLD view** | no layout banner; its own out-of-date state is separate (§11.2) |

**Exports refused while out of date**, with the status-bar sentence *"Inputs changed since the last run. Regenerate first."* (`RI:491`): **BOM · Excel workbook…**, **BOM · PDF…**, **Earthing layout (DXF)…**, **Export Image (PNG)**, **Export TMY data CSV**, the SLD's **PDF…** and **DWG…**, the Earthing Design window's three exports, and the expanded view's Save. The package waits inside its own dialog (§13.2). **Calculate Energy** is
refused with *"Regenerate the layout first: inputs changed since the last run."* **Save project is allowed.**

**How it clears:** change the values back, or **Generate / Regenerate
Layout**; loading a boundary file also clears it (the layout is replaced by a
table-free preview, `MW:4202-4205`). Nothing else.

**Energy has no staleness of its own** — it follows the layout's record
(`MW:4304-4306`). **Every Generate that replaces a layout carrying an energy
result clears that result, even when no input changed**
(`MW:4022-4024, 4105-4116`; `tests/test_fresh_results_marks.py:383-392`): the
Energy view shows **Layout regenerated** (§6.5), the Yield status reads
*"Layout regenerated: calculate energy again for this layout."*, and the status
bar *"Layout ready | the energy result was cleared: calculate energy again"*
(the note is added once, `MW:4492, 4641, 10359-10370`).

**Saving and reopening** (`MW:3282-3283`; `tests/test_fresh_results.py:336-359`,
`tests/test_fresh_results_reopen.py:82-194`):

- Save stores the record; saving while out of date is allowed.
- A project saved out of date **opens out of date**, with the same status line.
- A project whose PAN, OND, weather or contour file is missing or moved opens
  out of date: each reads *"not found at <path>"* in the list, the file row
  reads *"Not found: <name>"*, exports stay refused, and the path is kept on
  the next save. (The boundary file follows the same code path — `IP:3140-3145`
  — inferred, not tested.)
- Opening a project restores exactly its own files, never another window's.
- The reopen status lines are in §14.

### 6.7 Design checks (#278, #443, #553, #585) — `SU/check_list.py`, `DL/check_report.py`, `DL/checks/`, `CC`

⛔ **Design warnings are gone** (`design_verdict.py` deleted): no warning banner, no *Design warnings* chip, no *DESIGN WARNINGS* block in any file, no **Check:** remark in any exported file, no *Design warning* row in the BOM.

**How reached.** Tab **Checks**; the **Design checks** chip; **Open Checks** on the Summary's line (`MW:3188-3206`). Not modal; the same list appears on the export dialog's right side (§13.2).

**When it runs.** Off the UI thread, automatically whenever the Summary is repopulated and on a checks-effect setting change; last request wins; a run is dropped if the plant starts moving (`CC:1-13, 194-210`, `MW:11949-11994`). After Generate it waits until the plant has been drawn. There is no Run button except **Run again** after a failure.

**Header** (`SU/check_list.py:31-64, 232-241, 295-313`): no layout *"Generate the layout to run the design checks"*; a report [ran] *"Design checks · 6 failed · 9 can't check · 12 pass"* (groups in order failed, can't check, to re-confirm, accepted, pass; a group of 0 is left out; not-applicable checks are not counted); running *"Design checks · Checking…"*, last rows greyed; failed *"Checks didn't run: <reason>"* with **Run again**. **Limits…** (tooltip *"The limits the checks judge against, in Advanced settings."*) opens Advanced settings on *Checks and limits*, with a note *"· N changed"*. **Hide passed**, default on, hides pass and not-applicable rows; accepted rows stay; not saved.

**Row** (`SU/check_list.py:47-58, 98-168`): glyph · ID · title · one-line result · Fix link or note · Show on layout · Accept… / Confirm… / Withdraw. Order: open, re-confirm, accepted, pass, not applicable; within each R, C, E by number. One row expanded at a time. Glyphs: tick for pass; **exclamation** for fail and re-confirm; grey question mark for can't check; grey tick for accepted; none for not applicable. Never a cross.

**Result text** (`DL/check_report.py:171-189`): `value ≤ limit` on pass, `value > limit` on fail (`=` / `≠` for R-01); else counted findings, *"3 > 0"*, *"9 missing"*; a can't-check shows what it needs. [ran]: *"3.0 % > 2.5 %"*, *"88,984 = 88,984"*, *"0.00 ha (0.00 acres) ≤ 0.01 ha (0.02 acres)"*. **Detail on click:** the finding sentences; the basis; *"Affects: a, b and N more"* (first 20); *"Not on the layout"*; the acceptance line; *"Nothing more to show."*

**The 29 checks**, titles verbatim. Limit = an Advanced setting (§6.9). Note A = *"No setting changes this: send us the project"*; note B = *"Comes with a later release"* (`CC:56-57`), plain text, ⛔ do not quote B (§18). Fix table `CC:59-102`.

| ID | Title | Limit | Fix label | Source |
|---|---|---|---|---|
| R-01 | Modules = Σ tables × modules per table | | note A | `DL/checks/reconciliation.py:30` |
| R-02 | Strings agree: per inverter = per table | | note A | `:45` |
| R-03 | Block quantities sum to the plant | | note A | `:62` |
| R-04 | S1 cable totals = takeoff | ±0.5 % or 1 m | note A | `:90` |
| R-05 | Land account closes | ±0.01 ha | note A | `:135` |
| R-06 | Drawn trench = scheduled | ±0.5 % | note A | `:174` |
| R-07 | SLD counts and ratings = snapshot | | note A | `:205` |
| C-01 | Location surveyed or confirmed | | Fix: Site tab | `DL/checks/completeness.py:23` |
| C-02 | Lightning protection designed | | Fix: Site tab | `:29` |
| C-03 | MV collection designed | | Fix: Tools tab | `:35` |
| C-04 | Module and inverter from datasheets | | Fix: Array tab (Electrical tab when only the OND is missing) | `:47` |
| C-05 | Project and title-block fields complete | | Fix: Project details (opens the export dialog on its details) | `:56` |
| C-06 | Cables computed | | Fix: Electrical tab | `:62` |
| C-07 | Pile pattern defined | | Fix: Piles (opens the pile dialog) | `:68` |
| E-01 | IDT loading | 100 % | Fix: Electrical tab | `DL/checks/engineering.py:53` |
| E-02 | LV feeder drop and MV drop | 2.5 %, 1.5 %, 2.0 % | Fix: Electrical tab | `:75` |
| E-03 | Inverter DC:AC band | ±15 % | Fix: Electrical tab | `:119` |
| E-04 | String voltage window | | note B | `:152` |
| E-05 | Shading window | | note B | `:159` |
| E-06 | ICR inverter count | the design's own cap | Fix: Site tab | `:165` |
| E-07 | Trenches inside the plant, not under tables | 0 runs | Fix: Sketch Mode | `:209` |
| E-08 | DC string drop | 1.5 % | Fix: Electrical tab | `:225` |
| E-09 | Tables inside arrester cover | 0 tables | Fix: Site tab | `:244` |
| E-10 | Clearances | | Fix: Site tab | `:290` |
| E-11 | Every block's ICR placed | | Fix: Site tab | `:339` |
| E-12 | DC trunks buildable | 2 runs | Fix: Electrical tab | `:351` |
| E-13 | Building shadows cleared | | Fix: Site tab | `:374` |
| E-14 | Central inverter DC/AC | the AC simulation's limit | Fix: Tools tab | `:390` |
| E-15 | Transformer forms | | Fix: Electrical tab | `:188` |

- C basis strings are in `DL/checks/completeness.py`; e.g. C-02 *"Lightning arresters placed (Site ▸ Site Parameters ▸ Place Lightning Arresters)."*; C-03 *"An MCR or a USS placed, or the grid connection set to By others."* (by others: passes with a point, not applicable without). C-04 *"The module's PAN and the inverter's OND file loaded."*. C-05's missing list: Company name, Company logo, Drawing-number pattern, Project name, Project code, Client, Location, Drawn by, Checked by, Approved by (`DL/identity.py:143-146, 186-194`).
- **E-04 and E-05 always read can't check** (not built): *"Not checked in this version: check the string length against the inverter's DC voltage window (cold Voc, hot Vmp) by hand."*, *"Not checked in this version: check the row pitch against the shading window by hand."* (`DL/checks/engineering.py:152-163`).
- Not applicable: E-12 *"A string-inverter plant has no DC trunks."*; E-14 *"A string-inverter plant has no central inverters."* or *"Without an AC-capacity simulation the central inverters are counted from the SMBs, and no DC/AC limit applies."*; R-04 and R-06 in stated cases.
- Common can't-check texts: *"Load the inverter file (OND) for the IDT loads."*, *"Load the inverter file (OND) for the inverters' AC rating."*, *"The cables are not routed. Turn on Calculate cables and generate the layout."*, *"No lightning arresters are placed (C-02)."*, *"No trenches are drawn. Turn on Calculate cables and generate the layout."*
- Finding sentences are verbatim in `DL/checks/words.py:61-122`; on a multi-plant site the plot's name leads. [ran]: *"5 AC feeders drop more than 2.5 % (worst 2.98 %): 321–372 m (longest: ICR3-INV-42)."*, *"The plant's LV AC drop averages 1.56 %, over the 1.5 % budget."* E-06: *"ICR {i} carries {load} inverters|SMBs; it is rated for {cap}."* E-14: *"{n} of the {units} central inverters carr[y|ies] more DC than the {limit} DC/AC limit (worst {w}, ICR {i}). Lower the DC/AC ratio or the strings per SMB, size the ICR blocks by AC, or raise the overload limit."* E-15, basis *"Each transformer against the allowed forms ({forms} windings): every LV winding carries an inverter|an ACCB."*, finding *"ICR {i}: {n} ACCB[s] on a {w}-winding transformer, {s} LV winding[s] spare. Add a {n+1}-winding form or change the block[s]."* (`DL/checks/engineering.py:182-203`).

**Accept / Confirm / Withdraw** (`DL/check_report.py:21, 100-105, 135-141, 248-283`; `SU/check_list.py:67-76, 149-154, 394-446`):
- **Accept…** only on an open completeness or engineering row, fail or can't check. Reconciliation (R) is never accepted.
- Dialog title *"Accept E-05"*; rows **Result**, **Reason** (placeholder *"Why the design stands as it is"*), **Initials** (defaults to the company's), **Date** (today, read-only); note *"Saved with the project. The check opens again if its result changes."*; **Cancel**, **Accept check**, disabled with *"Give a reason"*. [ran]
- A fingerprint of status, value, limit and affected objects is kept. A changed result moves it to **to re-confirm**: exclamation, **Confirm…** (title *"Confirm E-05"*, button **Confirm check**, reason and initials pre-filled) and **Withdraw**; line *"The result changed since AP accepted it on 2026-11-05: …"*.
- Accepted: line *"Accepted by AP on 2026-11-05: by hand"*, button **Withdraw**. It leaves the chip count, the banner, the badges and the BOM remarks.
- Marks the project changed; re-reads without re-running; saved in the `deliverables` section (`MW:12339-12348, 3599`).

**Fix** goes to the tab, not the field (`MW:12240-12256`): switches to Layout and shows the stage tab; Sketch switches Sketch Mode on; Piles opens the pile dialog; Project details opens the export dialog on its details. **Show on layout** shows only when the open check has plan objects: Layout, the **Checks** layer on, fitted (10 % pad, at least 40 m; `MW:12218-12238, 12289-12301`).

**Canvas badges** (Layers ▸ Site & analysis ▸ **Checks**, tooltip *"Mark each object an open design check touches with the check's ID.\nThe Checks view lists every check."*): one badge per place, *"! E-02"*, several stacked *"! E-02 · E-06"*; over 12 objects of one kind in one block for one check, one badge at the block's ICR, *"! E-09 · 340 tables"* (`DL/check_anchors.py:49, 424-482`). Fixed size at any zoom, hidden with Plant layout off and in the SLD view. E-07's badges are on the drawn feeders and trunks that leave the boundary or cross a table, so their count can differ from the engine's.

**Out of date:** an input change does not clear the report. It is hidden only while the plant is being rewritten: badges off, line hidden, BOM remarks held; a landed report clears that (`MW:12323-12337`).

**Where the results go.** The BOM view shows *"Check: E-06 · <sentence>; E-02 · <sentence>"* on the entry's lines (§12.9); **no exported file carries them** (`DL/check_remarks.py:3-8, 54-69`). **No check gates an issue and the package carries no design check** (#585; `tests/test_issue_any_checks_585.py`, §13.3). R1 prints the limits and settings tables, not the check table (`DL/report/build.py:500-505, 641-660`).

### 6.8 The Workings view (#476) — `SC/workings.py`, `SU/workings_list.py`, `MW:8253-8254, 8393-8412`

How each number was reached. **Reached:** tab **Workings**; **How?** in the Summary. Nothing is recomputed: it reads the run's stored basis (`SC/workings.py:1-7`); a project from before it shows the regenerate reason.

**Empty:** *"No workings yet"* / *"Generate a layout to see how each number is reached: the rule, the inputs it used, and which rule decided it."* (`SU/workings_list.py:238-240`).

**Layout:** a header per group *"Site · 4 workings"*; a row per working: caret, title (*"Title · plot"* with several plots), missing reason, value + unit. Click opens one at a time, Enter or Space by keyboard. Opens into **Rule**, **Working** (arithmetic, selectable), **Inputs** (each with a key links to that field), **Decided by**, and a table **By ICR** / **By piece** / by kind, columns *ICR | Value | Working | (Show on layout)* (`SU/workings_list.py:100-130, 157-231`). A row with a missing reason cannot open. Out of date: banner, values greyed.

| Group | Title | Missing reason |
|---|---|---|
| Site | Usable land (By kind table) · Land under tables · Coverage · Fence | *Regenerate to see the working* |
| Array | Tables / Trackers · DC capacity · Tilt / Max rotation · Row pitch and GCR / Tracker pitch and GCR | same |
| Electrical | Modules per string · Strings per inverter / SMB · String inverters / SMBs · ACCBs (string) · Transformers (IDT) | same |
| | Central inverters (central) | *Turn on Calculate cables and regenerate to see the ICRs* |
| | Power transformer | *by others*, *needs an MCR on the layout*, cables, *needs an OND file* |
| AC | AC capacity and DC/AC | *needs an OND file*, regenerate |
| | ICRs (By piece) | regenerate |
| | Lightning arresters | *Turn on Lightning arresters and regenerate* |
| | DC string cable · AC cable, inverters to ICRs / DC trunk cable, SMBs to central inverters | cables |
| | MV cable, ICRs to the MCR / MV cable, ICRs to the handover point / MV cable | *needs an MCR on the layout*, *by others* |
| Energy | Year-1 energy · CUF on DC | *Calculate energy on the Yield tab to see the working*, *Calculate energy again to see the working* |
| | CUF on AC | first, or *needs an OND file* |

(Row list `SC/workings.py:32, 1247-1254`, [ran] on a string design; central, tracker and multi-plot were not run.)

- Several plots: one row per plot (*"Tables · East"*) then a plant row (*"Tables · plant"*, rule *"The sum of the plots."*); **How?** opens the plant row, else the first plot's (`SC/workings.py:977-1054, 1221-1244`).
- Example [ran]: rule *"Rows stay shade-free from 09:00 to 15:00 solar time on 21 December at 7.02° N. …"*, working *"4.78 m × (cos 8.43° + sin 8.43° × 0.797) = 5.2867 m, rounded up to 5.287 m"*, decided by *"The shadow rule set the pitch: no GCR and no row spacing were entered. A GCR would have won over the shadow rule, and a row spacing over both."*
- Input links go to Layout and focus the field (`MW:12258-12262`). **Show on layout** on an ICR row fits to the ICR building, not the block outline; Piece rows and land rows have none (`SC/workings.py:549-558`). Land rows carry each named line and area at its own setback (`SC/workings.py:176-183`).
- Workings are not exported as such; R1's design basis prints the working (§13.5).

### 6.9 Advanced settings (#383) — `APP/advanced_settings_dialog.py`, `SC/settings_form.py`, `SC/resources/settings/design.json`

**Ways in** (`MW:1733-1738, 1799-1810, 12086-12091`): **File ▸ Advanced settings…**, reading *"Advanced settings… (N changed)"* when N > 0; the ribbon chip *"Advanced settings · N changed"* (tooltip *"Settings this project changed from their defaults. Click to see them."*, an orange dot while a layout setting differs from the last run; opens on Changed only); the Summary note's **Edit…**; Checks' **Limits…**; the Cables card's **Advanced…** beside *"all at defaults"* / *"N changed"* (`IP:1989-2009`); the BOM panel's **Edit…**; an out-of-date list row; the BOM inspector's *All N lines*.

**The window**: modal, title *Advanced settings*, width 880. Strip: *"**This project only.** Defaults come from SolarLayout's standard list and the project's BOM profile."*, chip *"All at defaults"* / *"N changed"*. Left: groups with a note under each, *"12 settings"*, *"N changed"*, *"From the BOM profile"*, *"N matches"*; a gold dot, tooltip *"Edits not applied yet"*. Right: **Search settings**, **Changed only**, **Reset this group**. Empty: *"No setting matches “zzz”."*, *"No setting is changed in this project. Every value is at its default."* **Row:** label; help; effect pill; check pill; field with unit; side lines (*"default 2.0 %"*, *"was 2.0 %"*, invalid *"0.1–10 %"*; BOM: *"used by N lines"*); reset arrow, tooltip *"Back to default 2.0 %"* / *"Back to profile …"* (`SC/settings_form.py:240-252`). **Footer:** *"Every setting is at its default"*, *"1 setting differs from its default"*, *"N settings differ from their defaults"*, *"1 edit · 1 sizes cables"*, *"1 edit, 1 not valid"*; **Cancel**; gold *"Apply"* / *"Apply 2 changes"* / *"Apply 1 change · layout out of date"*; reason *"Nothing to apply"* / *"Fix MV voltage drop: 0.1–10 %"*. Edits are held until Apply.

**Effect pills** (`SC/settings_form.py:20-22`, `MW:12008-12028, 12068-12073`):

| Pill | A change | |
|---|---|---|
| *Sizes cables · Generate again* | **out of date at once**; change it back and the layout is current; carried on the run at Generate; the checks use the run's value until then | §6.6 |
| *Checks · applies now* | not out of date; re-runs the checks now, refreshes an open export dialog | ⚠️ Handover point reach has this pill and no check reads it (§20) |
| *BOM · applies now* | only the BOM recounts | not out of date |
| *Clean boundary · next review* | nothing now; the next review reads it | `IP:233` |
| *Yield · run the energy calculation again* | **not out of date**, no banner, the existing energy stays; the next **Calculate Energy** reads it | `MW:4876`, `IP:3471`, [ran] 2026-11-05 |

Every change marks the project modified.

**Every setting** (`SC/resources/settings/design.json`, version 15; 24 of 25 shown, the 25th, *Inverters per ICR*, is hidden). Sources print in R1 (§13.5); help lines are the file's `help` keys (`design.json:13-158`).

| Group ▸ subgroup | Label | Default | Range | Pill | Check |
|---|---|---|---|---|---|
| Checks and limits ▸ Voltage drop | DC string voltage drop | 1.5 % | 0.1–10 | Sizes cables | E-08 |
| | LV feeder drop limit | 2.5 % | 0.1–10 | Sizes cables | E-02 |
| | Plant LV drop budget | 1.5 % | 0.1–10 | Checks | E-02 |
| | MV voltage drop | 2.0 % | 0.1–10 | Sizes cables | E-02 |
| ▸ Electrical checks | DC trunk parallel runs | 2 runs | 1–10 | Checks | E-12 |
| | IDT loading | 100 % | 50–150 | Checks | E-01 |
| | Inverter DC:AC band | ± 15 % | 1–50 | Checks | E-03 |
| ▸ Site and drawing checks | Tables outside arrester cover | 0 tables | 0–10000 | Checks | E-09 |
| | Trenches outside the plant or under tables | 0 runs | 0–1000 | Checks | E-07 |
| | Land account closure | ± 0.01 ha | 0.01–1 | Checks | R-05 |
| | Drawn vs scheduled trench | ± 0.5 % | 0.1–10 | Checks | R-06 |
| | S1 cable totals against the takeoff | ± 0.5 % | 0.1–10 | Checks | R-04 |
| Cables ▸ DC string cable | String cable size | 4 mm² | 4–50 | Sizes cables | E-08 |
| | Y pair cable size | 6 mm² | 4–50 | Sizes cables | E-08 |
| Clean boundary ▸ Too much land | Outer boundary over its plots | 1.25 × | 1.01–10 | Clean boundary | |
| | Survey map picked | 50 % | 1–100 | Clean boundary | |
| ▸ Too little land | Plots of the file's drawing | 5.0 % | 0.1–100 | Clean boundary | |
| Communication ▸ RS485 | RS485: devices per chain | 20 devices | 1–256 | Sizes cables | |
| | RS485: chain length | 1200 m | 50–5000 | Sizes cables | |
| Yield ▸ Weather data | Weather data correction | 1.05 | 0.8–1.3 | Yield | |
| Layout ▸ Sketch roads | Road angle that moves rows | 10 ° | 0–45 | Sizes cables | |
| | Road to MMS clearance | 0.0 m | 0–10 | Sizes cables | |
| ▸ Grid connection | Handover point reach | 200 m | 0–5000 | Checks | |
| ▸ Site | Fence line inside the boundary | 0.0 m | 0–50 | Sizes cables | |

**BOM group**: the BOM settings, §12.6, pill *BOM · applies now*, note *"Defaults from the project's BOM profile: <name>. A change here is for this project only. To keep it for every project, save it into a profile."* (`SC/settings_form.py:218-234`).

**Saved:** the `.slp` `settings` section, values off default only. A bad value on opening is dropped, in a box **Advanced settings had problems** / *"Some saved settings couldn't be used:"*, with *"Advanced settings: 'x' is not a setting this version knows, so it was left out."*, *"… is not a number, so … is used."*, *"… is outside …, so … is used."*, *"Advanced settings: the project's section is from a newer version, so every setting is at its default."* (`SC/settings.py:257-272`). **Reports:** R1 prints them with *default* / *changed in this project*.

## 7. Sketch Mode — `APP/sketch_manager.py`, `MW:2400-2622, 6519-6615, 9158-9220`

**Sketch** (Layout view tools) switches it on. The left column is taken over:
an orange banner **● Sketch Mode** with the table count on the right and one
button **Exit Sketch Mode — apply edits, recalc totals**; leaving the Layout
view also switches Sketch off. Status on entry: *"Sketch Mode ON — select a
tool from the left panel."*

**Leaving Sketch Mode** compares the plot with how it was on entry; a purely cosmetic edit such as a line colour does not count:

- **Nothing changed:** nothing is recomputed; the status reads *"Sketch Mode OFF."*
- **Only trenches changed:** no re-route; *"Sketch changes applied — trench totals updated."* A deleted automatic trench stays deleted (`MW:9176-9186`).
- **The layout changed:** *"Sketch changes applied — recalculating inverter placement and cables…"* (cables on) or *"Sketch changes applied — placing inverters/SMBs on revised layout…"* (off), then the finish line starts **"Sketch changes applied"** in place of "Layout ready" ([ran]: *"Sketch changes applied | 11 tables cleared for building shadows"*; `MW:4455-4460`).
- ⛔ *"Sketch Mode OFF — plant totals updated."* no longer exists.
- If leaving would re-route and restore deleted trenches, the question below comes first; **Cancel** stays in Sketch on the Layout view.

**Re-route cables** (#346; `CE:145-150`, `MW:4429-4453`), only with Calculate cables on: a re-route that would restore trenches you deleted asks first. Box **Re-route cables**, *"Re-routing restores the automatic trenches you deleted.\nThe trenches you drew are kept."*; buttons **{Action} and restore trenches** and **Cancel** (default). Actions: *Generate, Leave Sketch, Add obstruction, Remove obstruction, Clear obstructions, Move ICR, Move MCR, Move USS, Move handover point*. An MCR, USS or point move asks only about that plot's MV.

The palette is grouped (the unit reads *Tracker* on a tracker design):

| Group | Tools |
|---|---|
| **PLANT OBJECTS** | ➕ Table · ➕ Half Table · ➕ LA · 🚧 Road · ⚡ T-Line |
| **CABLE TRENCHES** | 🟢 DC Trench · 🔴 AC Trench · 🟩 MV Trench · ✂ Del Trench |
| **DRAW** | ╱ Line · ⌒ Polyline · □ Rect · ○ Circle · an expander **More shapes** (◜ Arc · ⬭ Ellipse · ∿ Spline · ▨ Fill/Zone) |
| **ANNOTATE** | 🅣 Text · 📏 Measure · 📐 Dimension · 🧭 Scale bar + N |
| **SELECT & EDIT** | ↖ Move · ⎘ Copy · 🗑 Delete |
| **MODIFY SELECTION** | ⟳ Rotate · ⤢ Scale · ⇋ Mirror · ⇥ Offset · ▤ Array · ⧉ Group · ⿲ Ungroup — greyed until a selection can be acted on |
| **IMPORT & CLEAR** | 📂 Import DXF · 🗑 Clear Annotations |
| **COMMAND** | a command line, placeholder *"cmd: L PL REC C ARC EL SPL H DIM RO SC MI O AR ↵"* |

Hint under the palette: *"Shift+Click = multi · Ctrl+Arrow = nudge 1 m ·
Ctrl+C/V = copy/paste · Ctrl+Z/Y = undo/redo · Esc = cancel. Rubber-band: drag
→right = window, ←left = crossing. Click a start point, then type len<bearing /
dx,dy ↵ in the bar above the plot."*

Tool behaviour (tooltips, `MW:1795-1861`):

| Tool | Behaviour |
|---|---|
| ↖ Move | Click any object to select it, then drag to move. Shift+Click adds to the selection; drag on empty space to rubber-band select. Ctrl+Arrow nudges 1 m. |
| ⎘ Copy | Click a table to place a copy 5 m east and 5 m north of it. To copy several, select them with Move, then Ctrl+C and Ctrl+V. |
| 🗑 Delete | Click any object to remove it. |
| ➕ Table / ➕ Half Table | Click to place a full unit, or a half unit (half the E-W modules / capacity; N-S strings on a tracker). |
| ➕ LA | Click to place a lightning arrester at that spot (tables under its pile and shadow are removed). ⚠️ Limits: §5.2. |
| 🚧 Road | **Drag a straight centre-line, then enter the road width (m)** in a **Road width** prompt (default 5.0 m). *"The rows on each side move apart to make room; a road at a slant to the rows removes the MMS under it."* (`MW:2421-2424`). Rule below. |
| ⚡ T-Line | Drag a straight centre-line, then enter the corridor width (m) in a **Transmission line corridor** prompt (default 10.0 m). The red line is placed and tables in the corridor are removed. |
| ╱ Line / ⌒ Polyline | Draw, then a **Line width** prompt: 0 = line only, more than 0 = a corridor that removes tables under it. Polyline: click vertices, right-click to finish. |
| □ Rect / ○ Circle / ◜ Arc / ⬭ Ellipse / ∿ Spline / ▨ Fill/Zone | Annotation shapes (arc: start, end, then a point on it; spline and fill: click points, right-click or double-click to finish). |
| 🅣 Text | Click to add multi-line text (an **Add text** prompt); move it with Move. |
| 📏 Measure | Click points; snaps to corners / edge midpoints / centres. 2 points = distance + bearing; 3 or more then double- or right-click = area + perimeter; angles at each vertex; Esc clears. Not saved. |
| 📐 Dimension | A permanent dimension between two points (click-drag, or click a start point then type a length); saved, redrawn, exported to DXF. |
| 🧭 Scale bar + N | Shows a metric scale bar and a north arrow (toggle). |
| 🟢 / 🔴 / 🟩 trench | Click vertices, right-click to finish. A drawn trench **replaces every automatic run of that type** in the plot holding its middle, and the totals come from what was drawn; it **survives leaving Sketch Mode and a Generate**. Generate's status: *"Kept your drawn {DC|AC|MV} trench on {plot}: it replaces the automatic {kind} routes there."* / *"Kept your {n} drawn {kind} trenches on {plot}: they replace the automatic {kind} routes there."* (`CE:160-176`). In a central design 🔴 draws the SMB → central-inverter DC trunk. |
| ✂ Del Trench | Click any trench (automatic or manual) to delete it. A deleted automatic run **stays deleted** on leaving Sketch when only trenches changed; a re-route would restore it, and asks first (above). With Calculate cables off nothing asks. |
| ⟳ Rotate / ⤢ Scale / ⇋ Mirror / ⇥ Offset / ▤ Array | Act on the selection: a typed angle (° clockwise); a factor; left↔right or top↔bottom; a perpendicular distance; a rectangular or polar pattern. |
| ⧉ Group / ⿲ Ungroup | Group selected annotations so they select and move together (Group needs 2+ annotations selected). |
| 📂 Import DXF | Editable elements on the active layer, in the boundary's own frame (§19a). |

The palette has no Pan / Zoom buttons: the middle button or Space + drag pans under any tool, the wheel zooms, and a plain drag is the tool's (§6.1a; `MW:12508-12509`).

**Sketch roads move rows** (#495; `SC/road_shift.py:1-22, 51-65, 137-155`, `SC/road_manager.py:33-40`). The road stays where drawn.

- Within **Road angle that moves rows** (10°, 0–45°, §6.9) of **along** the rows, the rows move (fixed tilt N-S, tracker E-W), each side just enough to clear it plus **Road to MMS clearance** (0 m, 0–10), rows beyond following, every pitch kept, until the plot's edge or an earlier road; only tables beside the road move.
- Within the limit of **across** the rows, each row opens sideways.
- Beyond the limit: tables under the corridor are removed.
- A table pushed off the land or into a keep-out is dropped; moved rows on wider ground gain full tables, not on a plant capped to an AC target. Moved tables can't land on ICRs, MCR, USS, objects, arrester piles or the buildings' shadow.
- Status: *"Road placed: rows moved {m} m {way}[ and …]; {n} tables dropped, {k} added."* or *"…; no tables dropped or added."* ([ran] *"Road placed: rows moved 4.6 m south; 3 tables dropped, 0 added."*); *"Road placed: it fits the gap, no rows moved."*; *"Road at {a}° to the rows: the {n} tables under it were removed. Rows move only for roads within {limit}° of along or across the rows (Advanced settings ▸ Layout)."*, *"…: no tables were under it. …"*.
- Generate and ICR moves re-apply it, so results agree; a road saved before this keeps removing and never moves on its own. **⚡ T-Line** and **╱ Line / ⌒ Polyline** with width > 0 still remove the tables.

**Contextual bar** (orange strip above the plot, Sketch Mode only), in order —
`MW:2013-2111`: **🧲 Snap** (on) · **⊾ Ortho** · **▦ Grid** + spacing (10.0 m,
0.5–1000) · **🎨 Colour** (default `#FF4500`) · **Layer** combo (*0*) · **＋**
new layer · **👁** show / hide the active layer · a numeric entry (*"len<bearing
or dx,dy → Enter"*: `25.4<30` = 25.4 m at bearing 30°, `10,5` = 10 m east and 5
m north, `25.4` = along the cursor direction or a radius) · the live cursor
readout *"E: — N: —"* · **↶ Undo** · **↷ Redo**.

Command aliases — `MW:5776-5824` (the map the command line actually uses;
case-insensitive): `L`/`LINE` Line · `PL`/`POLY` Polyline · `REC`/`RECT`/`R`
Rect · `C`/`CIR` Circle · `ARC`/`A` Arc · `EL`/`ELL` Ellipse · `SPL`/`SP` Spline
· `H`/`HATCH`/`FILL` Fill/Zone · `DIM`/`D` Dimension · `T`/`TEXT` Text ·
`M`/`MEA` Measure · `S`/`SEL` Move (select) · `RO`/`ROTATE` · `SC`/`SCALE` ·
`MI`/`MIRROR` · `O`/`OFFSET` · `AR`/`ARRAY` · `U`/`UNDO` · `RE`/`REDO` ·
`G`/`GROUP` · `UG`/`UNGROUP`. An unknown token reports *"Unknown command
'…'."* in the status bar; a tool alias reports *"Command 'X' → tool activated."*

Annotation elements carry a layer and an optional group; the default stroke is
`#FF4500` at 1.5 pt — `MP:413-427`.

**Moving a building** (#611): **Sketch Mode only** (§6.1a). A press on an ICR, MCR, USS, handover point or object moves it, under any palette tool, unless Space is held, a toolbar tool is on or a cable run is busy (`MW:937-951`). An ICR's drop must be fully inside the usable area, else it snaps back; the others drop anywhere (`MW:975-997, 13096, 13225-13275`). The Tools tab shows *"Tip: In Sketch Mode, drag a blue ICR to move it."* once a run has placed ICRs.

**Obstructions** (Tools tab) are internally called roads; every label says
*Obstruction*. **Draw Rectangle** (*"Click and drag on the plot to draw a
rectangular obstruction."*), **Draw Polygon** (*"Click to add vertices.
Double-click or right-click to close."*), **Undo Last**, **Clear All** —
`MW:6449-6501`. Status after a draw: *"Obstruction added — n tables |
m modules | x MWp"*; *"Last obstruction removed."*; after Clear All the status still reads *"All roads cleared."*
A drawn obstruction re-places the inverters and, with cables on, re-routes; trench totals are recomputed on that run (§5.3). All three ask the re-route question first.

**Grid connection & Objects** (Tools tab; §5a for By others):

- **Place MCR** enabled after a layout, reads **Cancel Placement** while armed; **Remove MCR**; **Place Object** enabled once there is a boundary (a selected file or a plot on screen), no Generate needed; **Remove Objects** (`MW:5095, 9565, 9835-9842, 2126-2131`).
- **Place object window** (#566; `APP/place_object_dialog.py`), title **Place object**, width 400: caption **Object {n}**; **Length (E-W)**, **Width (N-S)**, **Height**: m, one decimal, step 0.5; L and W 0–500, H 0–200. On first open **5.0 × 5.0 × 10.0**; after that the last size used, in the session only. Line *"Footprint {L×W} m² · {H} m tall"* / *"Footprint {L×W} m² · no shadow"* at H = 0. Hint *"Next, click the layout where the object stands. The {tables|trackers} under it and under its shadow are removed."* Buttons **Cancel** (first) / **Done** (later) and **Place on layout**, disabled with *"Length and width must be more than 0"*. Height tooltip: *"Height above ground. It sets the shadow the object casts during the Shadow Window (Site ▸ Structures & Shadow). 0 m: no shadow, only the footprint is kept clear."* After each object the window reopens with *"✓ {Obj-n placed in 'plot'. …}"*; **Done** ends (`MW:10036-10065`).
- **The cue on the plot** (#625; `MW:9298-9500`, `PW`, `SU/placement_overlay.py`). Any start switches to the Layout view. A prompt bar over the plot, mirrored to the status bar; a frame round the plot; a cross cursor; a ghost at true scale under the pointer, *"MCR · 15 × 8 m"* / *"USS · …"* / *"Object · 5 × 5 m"*; Esc. Prompts: *"Click inside the boundary to place the MCR."* / *"…the object."* with meta **Space + drag pans**; button **Cancel · Esc** (**Stop · Esc** for several plots). Multi-plot: *"Click a plot to place its USS. The last plot gets the MCR."*, *"Click the last plot to place the MCR."*, meta *"{done} of {n} plots done"*, a *✓ MCR/USS* mark on done plots.
- **Refusals**, under the pointer as well as on the click; the tool stays armed: *"This spot is outside the boundary. Move inside the plot."* (ghost *"Outside the boundary"*); *"{plot} already has its USS or MCR. Click a different plot."* (ghost *"Already placed"*); *"Every plot already has its USS or MCR."* + *"Remove them first to place them again."*
- **The work** runs on a worker under a card that paints only after 300 ms: *"Placing the MCR…"*, *"Clearing the tables under it and its shadow, then re-placing the inverters."* (no tables: *"Working out its shadow."*), then *"Drawing the layout…"*.
- **Result**, kept 12 s or until ×: *"MCR placed. {n} tables removed, DC capacity {a} → {b} MWp."* / *"MCR placed. No tables removed."*; multi: *"All plots assigned. MCR in {plot}, USS in the rest."*; next step (`PW:133-141`): *"The cables on this plot were cleared. Generate again to route them."*, *"Generate again to route the MV cables."*, *"To route its MV cables, tick Calculate cables and generate again."* (button **Go to Calculate cables**). Between plots: *"{what} placed in {plot}. {n} plot(s) left. Click the next plot."* Left column: *"MCR placed in {plot}. {n} tables removed under it and its shadow."*
- Esc: *"Placement cancelled."* Failure: *"The building could not be placed. Nothing else changed."* + *"Generate the layout again, then place it."* Leaving the Layout view, Generate, Open and Sketch stop placing. Multi-plot completion still opens the **USS → MCR connection** box (`MW:9731-9742`). Object clicks: *"Select a boundary file first, then place the object."*, *"No boundary available to place an object."*

## 8. Piles — `PD`, `SC/piles.py` (#288 spec, #290, #296)

**Piles: OFF** in the Layout tools, or **Edit-Pile ▸ Define Pile Layout…**,
opens **Pile layout** (a `ResultDialog`, 860 px, left column 320 px). The
Piles button tooltip: *"Turn the pile (foundation) overlay ON / OFF. First use
opens the Pile Layout editor: define piles on a full table (and, when the plant
has half tables, on a half table; by default it follows the full one). Piles
stay visible even when the plant layout is switched OFF. Re-open the editor
from Edit-Pile ▸ Define Pile Layout…"* (`MW:2758-2764`).

**Two patterns: full and half.** The **full pattern** goes on full tables
(trackers). **Half tables** carry a **half pattern** — by default **derived**
from the full one, or the reader's **own** half pattern. With no full pattern
there are no piles anywhere. One function decides every unit's piles, so every
output agrees (`SC/piles.py:90-112`). A fixed-tilt half table is half the
**width** (X, east); a half tracker is half the **length** (Y, north); offsets
are measured from the half unit's own south-west corner (`SC/piles.py:5-6,
111`).

**The derived half pattern** (`SC/piles.py:31-81`):

1. The full pattern's piles are grouped into **frames** along the long axis
   (piles within 0.3 m form one frame).
2. The half unit **keeps the full unit's end overhangs**: its first frame sits
   where the full unit's first frame sits, its last frame the same distance
   from its far end.
3. It gets the **fewest frames for which no span exceeds the full unit's
   largest span**, evenly spaced.
4. **Tracker:** one frame sits at the half unit's **centre — the drive pile** —
   and each side is filled by the same rule.
5. Too little room gives a single frame at the centre.
6. Each frame copies the posts of the full frame at the nearest relative
   position; values are rounded to 1 mm.

Worked examples (run on main): a fixed-tilt full table 20 m long with frames
at x = 1, 7, 13, 19 and posts at y = 0.5 / 3.5 (8 piles) gives the 10 m half
table frames at x = 1, 5, 9 — **6 piles**; a tracker 60 m long with piles at
y = 2, 20, 40, 58 gives the 30 m half tracker y = 2, **15 (drive)**, 28 — **3
piles**.

**The window** (`PD:105-573`):

- **Strip:** the unit title — **"One table"** / **"One tracker"** when the
  plant has no half units, else **"Full table"** / **"Half table"** (tracker)
  following the switch — the size **"w × h m"** of the unit being edited (a
  half shows its half size), *"origin at the bottom-left corner · X east, Y
  north"*, and a chip *"n piles"* / *"1 pile"*.
- **Full / Half switch** — a segmented control **"Full table · 1,234"** |
  **"Half table · 56"** (tracker wording on a tracker), **shown only when the
  plant has half units**.
- **Status strip** under the switch (only with half units). Three kinds:
  *meta* (a muted line), *info* (a bordered strip), *warn* (a tinted strip with
  an exclamation icon, never a red cross). Verbatim, *table* → *tracker* on a
  tracker design (`PD:233-313`):

  | Tab | State | Kind | Text | Button |
  |---|---|---|---|---|
  | Full | no full pattern | meta | *"Half tables follow this pattern once you place piles."* | — |
  | Full | own half pattern, full changed since | **warn** | *"Half tables use your own pattern, made for an earlier full table."* | **Review** |
  | Full | own half pattern | info | *"Half tables use your own pattern: {n} piles each."* | **Review** |
  | Full | derived | meta | *"Half tables follow this pattern: {n} piles each, derived with the same end overhang and even spans."* | — |
  | Half | own, full changed since | **warn** | *"Your own pattern. The full table has changed since."* | **Reset to derived** |
  | Half | own | info | *"Your own pattern for half tables."* | **Reset to derived** |
  | Half | no full pattern | meta | *"Place piles on the full table first. Half tables follow it."* | — |
  | Half | derived | info | *"Derived from the full table: same end overhang, even spans. Editing it makes it your own."* (tracker: *"…, drive pile at the centre."*) | — |

  **Review** switches to the Half tab; **Reset to derived** drops the own
  pattern. The warn state appears when an own half pattern was made on a
  different full pattern from the current one.
- **The first edit on the Half tab makes the half pattern the reader's own** —
  Add, a click, a cell edit, Remove, Clear and Auto grid all count
  (`PD:356-364`). **Clear** on the Half tab leaves half units with **0 piles**.
  With no full pattern the Half tab's tools are disabled.
- **Toolbar:** **+ Add** (*"Add a pile at the centre of the table; then edit its
  X / Y in the list."*), **Auto grid…** (*"Fill a regular grid of piles (rows ×
  columns) inside the table."*), **Remove** (*"Remove the selected pile(s)."*),
  **Clear** (*"Remove every pile."*).
- **List:** **# · X (m) · Y (m)**, editable, 3 decimals; empty text *"Click
  inside the outline to place a pile, or use Auto grid for an even pattern."*
- **Pile radius:** 0.01–2.0 m, 3 decimals, step 0.05, default **0.15**; one
  radius for full and half.
- **Auto grid** — **Piles per row** (*along X, east*, 1–100, default 4) and
  **Rows of piles** (*along Y, north*, 1–100, default 2); note *"Evenly spaced,
  inset 6% from the ends and 10% from the sides · replaces the piles placed so
  far"*; **Cancel** / **Place n piles**. It works on the **current tab's** unit
  and remembers the last counts.
- **Preview:** the unit being edited, with a red origin square *"(0, 0)"* and
  gold numbered piles; axes *"X, east (m)"* / *"Y, north (m)"*. On the Half tab
  the full unit is drawn dashed, labelled *"full table"* / *"full tracker"*.
- **Footer:** a line *"{N} piles across the plant"* (full units × full pattern + half units × half pattern), **Close**, and the
  primary **"Apply to all {N} tables"** (**"Apply to whole plant"** when the
  count is unknown; disabled with *"Place at least one pile"* when there is no
  pattern; **"Remove piles from all {N} tables"** when the pattern was emptied). ⛔ **Export to Excel…** is gone (`PD` has no export; §13.10).

**After applying** (`MW:5209-5258`): the overlay turns on and the button
reads **Piles: ON**. Status, verbatim:

| Case | Status |
|---|---|
| plant with half units | *"Piles applied: {n} per full table, {m} per half table · {total} piles."* |
| no half units | *"Piles applied: {n} per table · {total} piles."* |
| pattern emptied | *"Piles removed from all {N} tables."* |

(*tracker* for *table* on a tracker design.)

- The pattern's origin (0, 0) is the unit's bottom-left (south-west) corner,
  so a pile sits at `(unit.x + X, unit.y + Y)` — in UTM for a KMZ or a drawing
  located by its own coordinates, in the drawing's own coordinates for a CAD /
  image boundary placed by hand or layout only (§3.2).
- The overlay (circles, plus coordinate labels for the piles in view) stays
  visible even with Plant layout off.
- **Pile patterns are design inputs, saved in the project**, and carried
  across **Generate** and a new boundary file (`SC/piles.py:148-159`). The overlay's ON / OFF is not saved: it is off on Open (`MW:3741-3745`).
  Pile edits do **not** make the layout out of date (§6.6). Frames are grouped by running mean within 0.3 m (`SC/piles.py:21, 28-43`). **Auto grid** remembers its counts in the session, across windows (`MW:5972-5975`, `PD:129, 490-499`).

**Every output that counts or draws piles** (each unit counts its own piles). **A pattern is enough: the overlay's state does not matter** except on the plot.

| Output | When | Detail |
|---|---|---|
| Summary **Piles** row (Array; By block too) | a full pattern exists | Σ each unit's own piles; without a pattern the reason *no pile pattern*, a link to the window (§6.4) |
| Plot overlay | pattern exists and **Piles: ON** | circles `#ffcc00`, labels for piles in view |
| **D4 pile layout sheets** in the drawing set, and their DXF layouts | a pattern; else left out, D0 says *"Not in this set: D4, Pile layout. Piles are placed from the pile pattern, and none is defined."* | §13.4 |
| **piles.csv** in the package | written with the drawing set when D4 exists | §13.10 |
| S1 **Tables** (Piles column) and **Piles** sheet | a pattern; else *"No table carries a pile pattern."* | §13.7 |
| DXF twin | a pattern | a pattern block per table type (§13.4) |
| BOM **MMS pile** | fixed tilt, a pattern; else *Needs design input*, *"Piles are counted from the pile pattern, and none is defined."*, **Go** opens the window | tracker posts: an entry off by default (§12.7) |
| Check C-07 | | §6.7 |
| K1 | never | §13.9 |

⛔ Do not write that the pattern is stamped onto every table, or that half
tables count at full weight — both were true before #290 and are not now.

## 9. Energy calculation — `SC/energy_calculator.py:641-826` (#300, #388, #457, #458)

**Run Energy Calculation** card (first on the Yield tab) — `MW:1978-2041`:
**Calculate Energy**, **📊  Show Energy Chart**, **Interval:** (1 min, 10 min,
**15 min**, 30 min, 1 hour) and **Export TMY data CSV**, plus a status line. All disabled until a layout exists; the Energy view's **Calculate energy**
button is the same action. **Calculate Energy** is also disabled while the
layout is out of date (§6.6) and on a layout-only site (§3.2).

Status lines (`MW:1303, 4771-4778, 5485-5634, 11960-11971`): after a layout *"Layout ready.  Select a weather data source above, then click  'Calculate Energy'."*; fetching *"Fetching irradiance from PVGIS…"*, overlay *"Fetching Weather Data from PVGIS…"*, then *"Calculating Energy…"*; fetched *"Irradiance fetched from {PVGIS (EU JRC)|NASA POWER}: GHI n  |  GTI n kWh/m²/yr  |  12 monthly values"*; a run: §6.5; **both services failing** [ran]: *"GTI is 0.  Switch to 'PVGIS API' and click Calculate Energy, or load a GHI hourly file."*, tone bad, source line *"Source: Auto-fetch failed — switch to GHI file"* (⛔ *"PVGIS fetch failed — …"* is effectively unreachable, §20); a replaced layout *"Layout regenerated: calculate energy again for this layout."*; an unlocated project, status bar *"Energy yield needs the site's location."* (`GR:55`).

Irradiance priority (`SC/energy_calculator.py:81-125, 267-362`): PVGIS PVcalc v5.2 (EU JRC, no key; trackers: PVGIS horizontal monthly GHI + own HSAT transposition) → NASA POWER climatology → zeros `unavailable`. With PVGIS API selected a click **always refetches**, overwriting a typed GHI / GTI. The hourly fetch also runs, best effort (`MW:816-833`). With a PAN the temperature-loss field is overwritten by the Sandia result (`IP:3120-3155`, `MW:5625-5628`). Fetched series are not saved (§4.10).

**One energy run, one year-1 energy** (#300). Two models, chosen by the data (`SC/energy_calculator.py:712-730`):

- **Monthly**, when the run has twelve monthly GTI values: PVGIS API, NASA POWER and an hourly file all give twelve. Each month `E_m = kWp × GTI_m × PR_m × gain / 1000` MWh. Year 1 = Σ months. **Year's PR = Σ(GTI_m × PR_m) ÷ Σ GTI_m**, months weighted by their sunlight.
- **Annual**, only for a yearly figure alone: `year1 = kWp × GTI × PR × gain / 1000`, PR = the ten factors (§19a), with the entered temperature loss.

Then (`SC/energy_calculator.py:710, 733-759`):

- `gain = LID × (1 + bifacial gain) × weather correction`, with `LID = 1 − 1st year degradation/100`.
- **Specific yield = year-1 energy ÷ DC capacity** (IEC final yield, kWh/kWp), so it includes LID, the bifacial gain and the correction. ⛔ It is not GTI × PR.
- **CUF on DC** = year 1 ÷ (kWp × 8760). **CUF on AC** = year 1 ÷ (plant AC × 8760); plant AC = the AC typed in the simulation while its cap is on, shared by units, else installed inverter AC; a plant total is Σ energy ÷ (Σ AC × 8760), `—` if any plot lacks an AC; `—` with *needs an OND file* (`SC/plant_ac.py:37-39, 83-107, 158-166`). Workings: *"Tenders and PPAs state the CUF on the contracted AC: CUF on AC = CUF on DC × DC/AC = …"* (`SC/workings.py:1181-1212`).
- **Year n** = year 1 × (1 − annual deg)^(n−1); year 1 already carries LID.
- **P-values:** `year1 × max(0, 1 − z × σ)`, z from Abramowitz & Stegun 26.2.23 (`SC/energy_calculator.py:45-69`).

**Monthly PR** (`SC/energy_calculator.py:846-885, 961-976`): `PR_m = PR_without_temperature × (1 − loss_m)`; `G_m = min(900, GTI_m × 1000 / (days × 8))`; `T_mod = T_amb_m + G_m × exp(a + b × wind)`; `loss_m = μ × max(0, T_mod − 25)`.

- μ = the PAN's |muPmpp|. **Without a PAN**, μ = entered Temperature losses ÷ (T_mod,year − 25); if that exceeds **1.0 %/°C** (`SC/resources/energy/defaults.json`) the entered loss is used flat for every month. So on the monthly model the entered figure is not itself applied unless flat. The reported temperature factor is the yearly equivalent, so the ten factors still multiply to the year's PR.
- Monthly ambient: an hourly temperature series with ≥ 365 values, **including a PVGIS API hourly fetch's T2m**, not only a file's column; else `T_avg + max(3, |lat|×0.45) × cos(2π(m−phase)/12)`, phase 6 north, 0 south.
- Monthly figures follow **IEC 61724-1**: `Y_r = H_i / G_STC` (h), `Y_f = E_AC / P_0` (kWh/kWp), `PR_m = Y_f / Y_r`.

**Weather data correction** (#457; `SC/energy_calculator.py:632-638, 704-708`, `SC/resources/settings/design.json`): Advanced settings ▸ Yield ▸ Weather data, default **1.05**, 0.8–1.3, help *"Multiplies the year-1 energy of modelled weather."* **1.0 for an hourly file**; otherwise the setting, so PVGIS and its NASA POWER fallback get it. It replaced a hidden ×1.10×1.05 on PVGIS irradiance: irradiance now reads as the source publishes it. It is not on the Yield tab or the Energy view; it is in the Workings' Year-1 energy (*"× 1.05 weather data correction"*; with a file *"A measured hourly file: no weather data correction."*, `SC/workings.py:1095-1133`) and R1 §9.3 (*"× 1.05 on the year's energy"* / *"none"*, `DL/report/build.py:1193-1195`). Changing it does **not** mark results out of date (§6.9).

[ran] 50 MWp, GTI 2050, defaults, no PAN:

| Case | Model | Year 1 MWh | PR % | Specific yield | CUF DC % | Correction |
|---|---|---|---|---|---|---|
| Twelve months, PVGIS | monthly | 87,111 | 81.76 | 1742.2 | 19.89 | 1.05 |
| Yearly figure only | annual | 87,844 | 82.44 | 1756.9 | 20.06 | 1.05 |
| Twelve months, hourly file | monthly | 82,963 | 81.76 | 1659.3 | 18.94 | 1.0 |

**Near shading:** Auto on → once per run from lat, tilt, GCR, azimuth, tracker flags and hourly GHI when available (`SC/energy_calculator.py:663-687`); ground clearance is not passed to it. Model below.

**Plots** (`MW:5474-5477, 5593-5595, 5645-5650`): lat/lon are the first plot's boundary vertex mean; tilt and GCR the first plot's; every plot gets the same parameters and its own kWp. `plant_energy()` sums plots; `spread_energy()` shares each month's energy among its steps by in-plane irradiance, so **the chart and the TMY CSV add up to the Energy view's months and year 1** (`SC/energy_calculator.py:902-945`).

GHI → GTI transposition — `solar_transposition.py:1-24`: solar position
(declination, hour angle, zenith) → **Erbs (1982)** decomposition into beam
and diffuse via the clearness index → **Hay-Davies** tilt model
`GTI = Gb·Rb + Gd·(1+cos β)/2 + ρ·GHI·(1−cos β)/2`. Panels are assumed to
face the equator; timestamps are treated as local solar time.

Near-shading — `shading.py`: for parallel rows on flat ground the shaded
length `s` up the rear collector is
`s/L = 1 − 1/(GCR · (cos β + sin β · cot ψ))`, where ψ is the solar profile
angle (`tan ψ = tan α / cos(γ_s − γ_c)`). It is evaluated for every hour of a
representative year, weighted by in-plane beam, and returned as an annual
beam near-shading loss in %. The same model feeds the Shadow View.

**📊  Show Energy Chart** — `APP/energy_timeseries_window.py`: a window titled
*"Hourly energy · {MWp} MWp · {Fixed tilt|Single-axis tracker} · PR {x.x} %"*; min 760×480, opens 1180×800 clamped. One toolbar: a combo **Daily (hourly)** / **Monthly (yearly)**; **◀** ▶ (*Previous day*, *Next day*), a date field (tooltip *"Day shown — type a date, step it, or open the calendar to jump to any month"*); chips *Energy {x}*, *Peak {x}* (daily) or *Best month {Mon · x}* (monthly), *Irradiance {x}*. Axes *"Energy, {kWh|MWh} per hour"*, *"Inclined irradiance (GTI), W/m²"*; monthly *"Energy, MWh per month · year 1"*, *"Inclined irradiance (GTI), kWh/m² per month"*. Hints *"Drag along the month strip or use ◀ ▶ · hover the chart for hourly values"*, *"Monthly view · each bar is that month's total"*; hover *"{HH:00 – HH:59} · energy {x} ({x} average) · irradiance {n} W/m²"*; *"Full year {year} · monthly totals"*. Energy per hour is `spread_energy`, so the window's months are the Energy view's (`tests/test_energy_view_300.py:76`). It reopens on the view and day last shown, in the session (`MW:5914-5926`); default Daily, day one. Data source priority: loaded GTI → GHI transposed → synthetic from twelve months → annual distributed by latitude → flat (`APP/energy_timeseries_window.py:84-132`).

**Export TMY data CSV** — `SC/energy_calculator.py:1032-1120`, `MW:5817-5885`: full-year series at **1 / 10 / 15 / 30 / 60 min**, default **15 min** (dialog **Export TMY Irradiance & Energy Data**, default `tmy_energy_15min.csv`). **Per-step energy is the run's month shared by GTI**; the total is year 1, bifacial gain and correction included. ⛔ Not `kWp × GTI × PR × LID × dt`. Columns *DateTime (local)* (PVGIS API) or *DateTime* (file), *GHI (W/m²)*, *GTI (W/m²)*, *Energy (kWh)  [plant {kWp} kWp]*. Refusals: stale (§6.6); box **TMY Export** *"Hourly irradiance data is needed for the TMY export.\n\nEither load a PVGIS hourly file, or use PVGIS API weather and click 'Calculate Energy' first (that fetches the hourly series)."*; box **Export TMY CSV** *"Please run 'Calculate Energy' first."*; needs active access. Success: box **Export Complete**, status *"TMY CSV exported: {path}  ({n} rows @ {label})"*.

**🌓 Shadow View (row spacing)** (Studies, Tools tab; `APP/shadow_view_dialog.py`, `SC/shading.py:468`, #410, #572): modal window **Shadow View**, min 760×480, opens 780×640, tabs **Between rows (side view)** and **Object shadow (plan / keep-clear)**. **Both tabs carry the same two sliders, one moment**: **Day of year** 1–365, default 355 (*21 Dec*), **Solar time** 5.0–19.0 h, 0.1 steps, default 12.0 (*12:00*).

- **Between rows:** a cross-section of three rows; **Tilt angle** 0–60°, **Row pitch** 1–60 m, **Lower-edge height** 0–5 m, *"Analysis only — the layout is unchanged"*. Verdicts: *"The sun is below the horizon {when}"*, *"The sun is behind the array plane {when}"*, *"The rear row is shade-free {when}"*, warn *"{n} % of the rear row is shaded {when}"*, `{when}` = *"at 12:00 on 21 Dec"*.
- **Object shadow:** *"Shadow swept by a vertical object over the year. The grey area is the keep-clear zone: a table or tracker placed there is shaded at some time in the chosen window. Use it for a lightning arrester, ICR / MCR building, tree or wind turbine."* **Object length (E–W)** 2.0 m (0.1–200), **Width (N–S)** 2.0 m (0.1–200), **Height** 10.0 m (0.5–200), **Solar time from** 9.0 h (4–12) **to** 15.0 h (12–20). Plot: grey **Keep-clear zone** (never re-swept by the sliders), the object in navy, the moment's shadow in red. Legend *"Keep-clear zone"* + *"Shadow at {12:00} on {21 Dec}"* or *"No shadow at {06:00} on {21 Dec}: sun too low"*. Verdict (zone only): warn *"Keep {a} m² clear — the shadow reaches up to {r} m"*, detail *"{L} × {W} m object, {H} m tall · {h0}–{h1} h solar time · no table or tracker inside the grey zone"*; good *"This object casts no shadow in the chosen window"*, *"… · nothing to keep clear"*. [ran] *"Keep 432 m² clear — the shadow reaches up to 17.3 m"* at latitude 26.9.
- **Reopen:** day, time, object, window and the tab shown come back in the session; tilt, pitch and clearance restart from the layout every time; not saved (`APP/shadow_view_dialog.py:100-122`). Refusals: *"Generate a layout first, then open the Shadow View."*, box **No rows** *"No tables placed yet."*, on a layout-only site without a latitude *"Shadow view needs the site's latitude: pick the boundary file again and enter one."* (`MW:10686-10716`). The Layers ▸ Shadows layer is a separate thing (§6.2).

## 10. Studies (Tools tab) — `MW:1457-1514, 4502-4507`

The **Studies** card holds **five** buttons, in this order, each labelled with
two spaces after its emoji (`MW:1510-1514`):

| # | Button | Tooltip (verbatim) | Before a layout |
|---|---|---|---|
| 1 | **🔆  Simulation with AC Capacity** | *"Size the plant from a target AC capacity and DC/AC ratio using the PAN + OND files, then rebuild the layout at the resulting DC capacity (must be ≤ the first-run DC)."* | disabled |
| 2 | **🤖  Robotic Module Cleaning** | *"Count the cleaning lines and size the robotic cleaning fleet from the robot's battery range, the to-and-fro requirement and the bridges between tables."* | disabled |
| 3 | **Robot count from DXF…** (no emoji) | *"Open any plant layout DXF and size the cleaning-robot fleet from its tables or trackers — no layout needed."* | **enabled** |
| 4 | **🌓  Shadow View (row spacing)** | (unchanged) | disabled |
| 5 | **⚡  Earthing Design** | *"IEC earthing calculation for this layout (IS 3043 / IEEE 80 cross-check): how many earth pits, which GI strip / Cu cable size for each connection, the earthing plan, report and BoQ."* | disabled |

All five are present from the start. Buttons 1, 2, 4 and 5 are enabled after every cable run **and on Open** (`MW:5122-5131`, [ran]); **Robot count from DXF…**
is always enabled. **Robot count from DXF…** and **Earthing Design…** are also on the **Tools** menu, which copies each button's enabled state and tooltip (§16).

### 10.1 Simulation with AC Capacity — `ac_capacity_dialog.py`, `ac_capacity_sim.py`, `dc_cap.py`, `ac_capacity_verdict.py`

Needs a module file and an inverter file (otherwise: *"Load a PAN module file
and an OND inverter file first (in the input panel), then run the AC-capacity
simulation."*). The window **Simulation with AC Capacity** (880 px):

- Strip: *This layout holds* **x MWp** *DC · the target cannot exceed it*, chips
  *String inverter* / *Central inverter* and *"n-string tables"*.
- **TARGET** (`ACD:111-135, 359-364`):

  | Field | Default | Range | Unit |
  |---|---|---|---|
  | **AC capacity** (with *= x.xx MW* beside it; tooltip *"Target plant AC capacity."*) | the largest multiple of 100 kW that fits the first-run DC at ratio 1.30 — `floor(first DC MWp × 1000 ÷ 1.30 ÷ 100) × 100`, or 100,000 when that is under 100 — so the window opens on **Fits this layout** | 1.0–5,000,000 (1 dp, step 100) | kW |
  | **DC/AC ratio** (meta *target*) | **1.30** | 0.80–2.50 (3 dp, step 0.01) | — |
  | **Overload limit** (meta *typ. 1.5* / *typ. 1.4*) | **1.5** string / **1.4** central — the design overload limit, not the inverter's nameplate DC input | 1.00–2.00 (2 dp) | — |
  | **Modules per string**, with a **Size…** button (§4.8a) | the panel's **Modules per row** (fixed tilt) or **Modules per string (N–S)** (tracker) — `MW:9370-9372`, `ACD:138-139` | 1–200 | — |
- **EQUIPMENT**: the **MODULE · PAN** and **INVERTER · OND** rows with **View**
  and **Replace…**, a one-line spec of each, and an expander **Override
  nameplate values** (**Module Pmax** 0–2000 W, default the PAN's PNom;
  **Inverter rated AC** 0–100,000 kW, default the OND's PNomConv — `ACD:179-188`). When a nameplate value is missing the expander opens with
  *"The PAN file has no module power (PNom). Enter it to run the simulation."*
  or *"The OND file has no rated AC power (PNomConv). Enter it to run the
  simulation."* (`ACD:497-505`).
- **RESULT · updates as you type**: a verdict banner, *Target DC* and
  *Headroom* over a capacity meter (*"layout holds x MWp"*), and tiles
  **Inverters**,
  **Strings per inverter**, **Installed AC** (sub-line *"requested {x} MW"*), **Target DC**,
  **DC/AC ratio**, **DC per inverter**. Then the **ICR block AC** row (`ACD:265-290, 547-558`): a spin 0–5,000,000 **kW** (step 100) that reads
  **Not set** at 0; tooltip *"AC capacity one ICR block serves. ICR block DC = block AC × DC/AC ratio; ICR blocks = plant AC ÷ block AC, rounded up.
  Regenerate writes the block DC into the input panel's ICR Block. Leave at 0 to keep the input panel's ICR Block."*; beside it *"→ {n} blocks of {x.xxx} MWp DC"* when set,
  *"keeps the input panel's {ICR Block} MWp blocks"* when not set, `—` when the inputs are invalid. On a central design *"→ **n** blocks of **x** MWp DC · {f} inverters, {y} MW each · {split} inverters"*;
  if blocks hold fewer than the count, *"→ **m** blocks ({f} inverters, {y} MW each) · {split} inverters"* (split e.g. `10 × 3 + 2`; `ACD:610-631`). A central design then adds
  **Strings per SMB** (default 20, range 1–500), answering *"→ {a–b or n} SMBs per inverter  DC/AC up to {x.xx}"*, or in warning colour *"⚠ DC/AC up to {x} > {limit}"*, a warning, never a refusal; tooltip
  *"{smbs} SMBs ({strings} strings ÷ {per}, rounded up) shared evenly between {n} central inverters (plant AC ÷ PNomConv). The busiest inverter takes {k} SMBs: {kW} kW DC, DC/AC {x}, within the {limit} overload limit."*
  / *", over the {limit} overload limit. Lower the DC/AC ratio or the strings per SMB, or raise the limit."* (`ACD:651-686`, `ACS:313-330`).
- Verdicts (kind): **Fits this layout** (good) — *"Target DC uses n % of the x
  MWp placed. Regenerating trims the layout to y MWp."*; **Needs x MWp more than
  this layout holds** (warn) — *"… Lower the target, or make room in the layout
  (tighter pitch, more area) and generate again."* with fix buttons *Set AC
  capacity to … kW* / *Set ratio to …*; **DC/AC ratio is over the inverter's
  limit** (bad) — *"You asked for r; the overload limit is m. DC beyond the
  limit is clipped. Figures below use the limit."* with *Set ratio to …* /
  *Raise limit to …*; **Missing input** (bad) — *"Module Pmax and
  modules-per-string are required."* / *"Inverter rated AC power (Pac_rated) is
  required."* (`ACD:44-45`, `ACS:180-188`). The banner reserves the height of
  one row of fix buttons from the start, so the window never grows (a verdict
  without fixes leaves a blank strip; #299, `SU/verdict_banner.py:60-69`).
- Footer: a checkbox **Let me choose where placement starts** (*"After
  regenerating, click a point on the plot; the tables nearest it are kept."*),
  a reason label, **Close**, and the primary — **Regenerate layout at x.xx MWp**
  when the verdict fits, otherwise **Regenerate layout**, disabled, with the
  reason *"Complete the inputs first."* / *"Lower the ratio or raise the
  limit."* / *"Target DC exceeds the layout."* (`ACD:481-485`, `ACV:74, 89, 105`).
- Maths: `num_inverters = ceil(AC_capacity / Pac_rated)` — never under-sizes;
  `installed_ac = num_inverters × Pac_rated ≥ AC_capacity`; target DC =
  requested AC × ratio. Modules-in-series come from the string-sizing method;
  parallel strings per inverter from the inverter's current and DC-power
  limits, rounded to whole tables on a string design. With ICR block AC set:
  `ICR block DC = block AC × ratio` (the overload limit when the ratio is over
  it) and `ICR blocks = max(1, ceil(AC capacity ÷ block AC))` (`ACS:53-64,
  216-220`).
- **What Regenerate writes:** with ICR block AC set, the input panel's **ICR
  Block** becomes the block DC **rounded up** to three decimals (e.g. 12,500 kW
  × 1.325 = 16.5625 → **16.563 MWp**), clamped to 0.1–500; the change is
  reported as *"ICR block {old} MWp → {new} MWp"* in the rebuild message
  *"Rebuilding layout capped to … Input panel updated: …."* and in the final
  status *" | Input panel updated from the AC simulation: …"*
  (`MW:9547-9570, 9651-9657, 4483-4491`). In a capped layout the ICRs are
  counted against the **DC target**, not the trimmed plant, and placed at the
  reader's ICR L × W (`MW:9067-9081`).
- The delivered DC lands **at or just above** target, never below. Trimmed
  tables are held in reserve and put back after later stages clear ground;
  half tables count as 0.5 — `dc_cap.py:1-24`. After a regenerate the status
  line reads *"… | DC target x MWp met"* or warns *"⚠ DC x MWp is BELOW the y
  MWp target — the site has no room left; reduce the AC capacity or DC/AC
  ratio"*.
- **Central inverters from the plant AC** (#509): with the simulation on a central plant the count is `ceil(AC ÷ PNomConv)` exactly, not derived from the SMBs (§4.8f). String plants: a floor (`MW:10994-10997`, `ACS:66-81`). [ran] 100,000 kW / 3,200 kW / ratio 1.3 / 28 × 580 W / block 12,500 kW: 32 inverters, 102.4 MW installed, 130 MWp target, 8 blocks of 16.25 MWp, 3 per full ICR, split `[3×10, 2]` (so 11 ICRs), 8,005 strings, 401 SMBs at 20, `12–13` per inverter, DC/AC up to 1.319.
- **Reopens on the inputs it closed with**, Close or Regenerate (#411, `MW:10965-10967`): AC capacity, ratio, limit, ICR block AC, modules per string, Pmax, rated AC, **Let me choose where placement starts**, strings per SMB, and a PAN / OND loaded in the window. Modules per string and files come back only while the panel's are unchanged (`ACV:192-212`). **Saved with the project** (#415, §4.10). A new boundary file clears them (`MW:11190`).
- **Baseline:** the first-run DC is saved. If unknown (an older capped project) the strip reads *"This layout's full DC is **not known**"*, verdict warn **This layout's full DC is not known**, *"The project was saved by an earlier version while the layout was capped, so the DC it holds uncapped was never recorded. The figures below are right; whether they fit the layout cannot be checked."*, reason *"The layout's full DC is not known."*, Headroom `—` (`ACD:126-128, 594, 641`, `ACV:77-83`).

### 10.2 Robotic Module Cleaning — `robotic_cleaning_dialog.py`, `robotic_cleaning.py`

Window **Robotic module cleaning** (900 px, maximisable). Strip: **n cleaning
lines**, *robots travel west–east along each table row* (tracker:
*north–south along each tracker column*), chip *n tables*.

**ROBOT** card:

| Field | Default | Notes |
|---|---|---|
| **Travel per charge** (m) | 0 — hint *0 = no limit* | how far the robot goes on one charge |
| **Standard bridge span** (m) | the configured gap — **Gap between MMS-Tables** (1.0 m) on fixed tilt, **N–S service gap between units** (2.0 m) on a tracker; 2.0 m if that is zero | widest gap a standard bridge spans |
| **Skip lines up to** (tables / trackers, steps of 0.5) | 0 | a line carrying this many units or fewer gets no robot |
| **Out and back** (*must return on the same charge*) | ticked | doubles the distance to cover |

Ranges: **Travel per charge** 0–100,000 m (shows **no limit** at 0), **Standard bridge span** 0–50 m,
**Skip lines up to** 0–1,000. **The window reopens with the fleet's answers and ticks** (#347; `MW:10743`, `RCD:94-95, 145-178`), only after **Add**: Close without adding keeps nothing. A reopened project restores them from the saved fleet.

Field details (`RCD:133-186`, `RC:23-70, 443-541`): **Skip lines up to**
applies per **segment** (a whole line, or a stretch between unbridged gaps),
a half unit counting 0.5; its tooltip adds *"half steps are allowed (e.g. 0.5
skips a lone half {unit})"*. **Out and back** tooltip: *"When ticked, the
distance to cover is twice the segment length, so a shorter range is needed to
finish a row."* A gap counts as standard up to the **span + 0.25 m** (placement
tolerance, `RC:49-52, 476`).

**RESULT** — the same verdict as Robot count from DXF (`RCD:475-479`, `RDX:771-808`): good *"{n} robot(s) — one per {row|column}"* with *"{r} rows, no wide gap left unbridged."* / *"{r} rows, {k} wide gap(s) bridged."*; otherwise warn *"{n} robots with {k} bridge(s)"* or *"{n} robots at most"*, detail *"+a for split rows, +b for battery range, −c for skipped segments."* Crossing previews append *" n crossing bridge(s) is/are preview only."* No tables: warn **No tables placed**, *"Generate a layout first, then size the cleaning fleet."*, the primary **Add to BOM**, disabled, reason *"No tables to clean"*.

Tiles and their sub-lines: **Standard bridges** (*"+ n supported"* or *"gaps up to x m"*), **Longest segment** (whole metres; *"+n robot(s) for range"*, *"within range"* or *"no range limit"*), **Cleaning segments** (*"k skipped · −n robot(s)"*, *"n unbridged gap(s)"* or *"no broken lines"*), **One full pass** (*"out and back"* or *"one way"*). Lengths are whole metres with separators, never km (`RC:675-678`); gap widths 0.1 m.

Right — `RCD:221-387`: the header reads **GAPS TOO WIDE FOR A STANDARD BRIDGE
· n** only when some gaps are at equipment, otherwise **GAPS IN OPEN GROUND ·
n** (n = all wide gaps). A filter **Inside the boundary · n / Crossing it · n /
At equipment · n** — the last only when such gaps exist. **Bridge all n**
(**Preview all n** on the Crossing filter) and **None** act **only on the rows
the filter shows**. Table **Bridge · Table row** (**Tracker column** on a
tracker) **· Gap · Saves · Blocked by**: cells *"Row n"* / *"Column n"*;
**Saves** *"1 robot"*, *"up to 1 robot"* once a range or skip threshold is set,
or *"none · leaves the site"*; **Blocked by** is **shown only on the At
equipment filter** (the cause, plus *" · crosses boundary"*). The note under
the table: Inside — *"These gaps are open plant area, not equipment. Bridge one
only if the tables there will really be connected."*; Crossing — *"A straight
bridge here would leave the plant boundary. Tick one to draw it on the plot in
red and check the crossing; it does not reduce the fleet."*; Equipment — *"A
robot can cross these only if a properly supported bridge joins the tables
either side. A gap marked as crossing the boundary is drawn for checking
only."*; each with *" Sorted shortest first."*; with no wide gaps *"No wide gaps
— every cleaning line is continuous at the {x} m bridge span."*

Ticking a gap means the reader will install a supported bridge, so the fleet
count drops; unticked, the line stays broken and that stretch keeps its own
robot. **Nothing is bridged unless ticked**; bridges preview on the plot as they
are ticked (crossing gaps red, bridged pink, skipped segments amber); a bridge
that would leave the site is preview only; **Close** restores the plot's
earlier overlays. Footer: the meta *"Bridges preview on the
plot as you tick them."*, **Close** and the primary **Add n robot(s) + m
bridge(s) to BOM** (`RCD:501`). Status *"Robotic cleaning: {n} robot(s) for {m} cleaning line(s) — added to the BOM."* (`MW:10885-10887`).
Results feed the Summary's *Cleaning robots* row, the BOM's **Cleaning robot** and **Cleaning robot bridge** lines, R1 (*"Robotic cleaning sized"* / *"No robotic cleaning sized; no O&M building"*), and are saved with the project.

**It follows the layout** (`MW:10889-10929`, `RC:656-666`): each ticked gap carries to the same gap in the new layout; those gone are said once in the status, *" | Robotic cleaning: 1 ticked gap no longer exists and was dropped"* / *"{n} ticked gaps no longer exist and were dropped"*. **A new site** drops the fleet: *"Robotic cleaning: the fleet was sized for the previous site and was dropped. Size it again under Tools."*

### 10.3 Robot count from DXF (#276, #299) — `RDD`, `RDX`, `RDR`, `RC`

Sizes a cleaning-robot fleet from **any plant layout DXF**, with no layout
generated. Opened from **Tools ▸ Robot count from DXF…** or the Studies button
of the same name (both always enabled). **It needs active access, to open and again for its report** (`MW:10752, 10762-10766`; refusal *"Exports need active access."*). A modal window; **nothing is written
into the current project, layout, BOM or Summary** — the footer says
*"Nothing is added to the current project."* It is the same counting engine and the same verdict as Robotic Module Cleaning (§10.2).
**In the session it reopens** with travel, skip and out and back; the message page gets a second button **Open {name} again** while the file exists, which puts back roles, structure, span and ticks (`RDD:141-146, 440-445, 532-545`). Never saved.

**Window** — title **Robot count from DXF**, 1180 px (the columns stack below
900 px), maximisable; the view area is a fixed 280 px (`RDD:48-101`).

**Strip** — a large value, a phrase and chips (`RDD:146-150, 505-529`):

| State | Value | Phrase |
|---|---|---|
| empty | *"No drawing open"* | *"open a plant layout DXF with MMS tables or trackers"* |
| reading | *"Reading drawing…"* | the file name |
| error | *"Drawing not read"* | the file name |
| no tables | *"No tables found"* | *"in {file}"* |
| loaded | *"n cleaning line(s)"* | *"robots travel west–east along each table row"* / *"robots travel north–south along each tracker column"* |

Chips: *"{n} tables"* or *"{n} tables · {k} half"* (loaded only); *"Fixed tilt
· auto"* / *"Single-axis tracker · auto"* (" · auto" dropped once the reader
picks a structure); the unit read, *"metres"*, *"millimetres"*,
*"centimetres"*, *"inches"*, *"feet"*, *"kilometres"* or *"× {s} m"*.

**DRAWING** card (`RDD:152-186, 443-448`): **File** — *"None"*, *"{name} — not
read"* or the file name, with **Open DXF…** (**Replace…** once read; dialog
*"Open plant layout DXF"*, filter *"DXF drawing (*.dxf)"* — DXF only);
**Structure** — **Fixed tilt | Tracker** (tooltip *"Read from the drawing: long
sides running north–south are trackers. The robot count does not change, only
the words."*); **Gaps found** — the two commonest gap widths then the rest, e.g.
`1 m ×12 · 40 m ×4 · other ×3` (*"none"*, or *"—"* with no drawing; tooltip
*"The gaps between neighbouring tables in the drawing, most common first. The
standard bridge span starts at the most common one."*).

**ROBOT** card (`RDD:218-256`):

| Field | Default | Range | Unit | Tooltip |
|---|---|---|---|---|
| **Travel per charge** | 0, shown as **no limit** | 0–100000 (step 50) | m | *"How far the robot travels on a single charge. 0 = no battery limit (one robot per cleaning segment)."* |
| **Standard bridge span** | the drawing's most common gap (to 0.1 m), reset on every new file; 2.0 if the drawing has no gaps | 0–50 (2 dp) | m | *"Widest gap a standard bridge spans. Starts at the most common gap between tables in the drawing. Anything wider splits the line until you tick it under Gaps."* |
| **Skip lines up to** | 0 | 0–1000 (step 0.5) | tables / trackers | *"A cleaning line (or broken-line segment) carrying this many {unit}s or fewer is too short to warrant its own robot, so it is not counted. A half {unit} counts as 0.5. 0 = count every line."* |
| **Out and back** (*must return on the same charge*) | ticked | — | — | *"When ticked, the distance to cover is twice the segment length, so a shorter range is needed to finish a line."* |

**RESULT** is the verdict banner (`RDD:607-621`, `RDX:771-813`):

| When | Kind | Headline | Detail |
|---|---|---|---|
| no drawing | warn | *Open a layout DXF* | *"Tables as closed rectangles or one block per table, fixed tilt or tracker, in any unit."* |
| reading | warn | *Reading the drawing…* | *"Finding tables, layers and the boundary."* |
| unreadable | warn | *The drawing could not be read* | *"Save it as DXF from your CAD program and open it again."* |
| no tables | warn | *No tables found* | *"Pick the layer that holds the MMS tables under Layers."* |
| nothing split, no range robots, nothing skipped | good | *"{n} robot(s) — one per row"* (or *column*) | *"{r} rows, no wide gap left unbridged."* / *"{r} rows, {k} wide gap(s) bridged."* |
| otherwise, bridges ticked | warn | *"{n} robots with {k} bridge(s)"* | parts joined ", ": *"+{a} for split rows"* (*columns*), *"+{b} for battery range"*, *"−{c} for skipped segments"*, each only when non-zero |
| otherwise, nothing ticked | warn | *"{n} robots at most"* | the same parts |

**Tiles** (`—` with no result): **Standard bridges** (*"gaps up to {span} m"*), **Wide gaps** (*"{k} bridged · {m} split"*),
**Longest segment** (whole metres; *"+n robot(s) for range"*, *"{2x} out and back"* or *"one way"*), **One full pass** (whole metres, never km; *"all robots together"*; `RDD:958-964`).

**Views** — **Layout · Gaps · Rows · Layers** (live labels *"Gaps · {n}"*,
*"Rows"* / *"Columns"*, *"Layers · {used} of {all}"*); the first three need
tables, Layers only a drawing, and a drawing without tables opens on Layers
(`RDD:282-587`):

- **Layout** — the plan in the drawing's own orientation: boundary dashed
  green, roads and equipment brown, arresters red, tables navy, half tables
  light blue; wide gaps gold (splits a row), green (bridged), red (a crossing
  bridge ticked for checking), grey (skipped); *N ↑* and a scale bar; tooltip
  *"Wheel to zoom, drag to pan, double-click to fit."*; a legend of only what
  is drawn.
- **Gaps** — as in §10.2: filter *Inside the boundary · n / Crossing it · n /
  At equipment · n* (the last only when present), **Bridge all n** (**Preview
  all n** on Crossing) / **None** acting on the rows shown; columns **Bridge ·
  Table row** (*Tracker column*) **· Gap · Saves · Blocked by** (Blocked by
  only on At equipment); clicking a row toggles it; *" Sorted shortest first."*
  or *"No wide gaps — every cleaning line is continuous at the {x} m bridge
  span."*
- **Rows** — **Row** (*Column*) **· Tables** (*Trackers*) **· Segments ·
  Longest segment · Robots**, with a bold **Total** row.
- **Layers** — **Layer · Role · Shapes**; Role is a combo of **MMS tables /
  trackers · Lightning arrester · ICR / MCR building · Inverter / SMB · Road /
  obstruction · Plant boundary · Ignore**. Notes: *"No layer looks like MMS
  tables. Set the role of the layer that holds them to “MMS tables /
  trackers”."* (no tables); *"The most repeated rectangles are on “{layer}”
  ({n} of them)."*; otherwise *"Roles are guessed from layer names. Only the
  tables are needed; equipment and roads only change what a wide gap is blamed
  on."* ⚠️ Changing a role or the Structure clears every ticked gap.

**Message page** (empty / reading / error): *"Open a plant layout DXF"* —
*"Tables as closed rectangles or blocks · fixed tilt or tracker · any unit"*
with **Open DXF…**; *"Reading {file}"* — *"Large drawings take a few
seconds."*; *"Open a different file"* — the error, with **Open DXF…**. Read
errors: *"Cannot open the file: {error}"*, *"The file is not a readable DXF
drawing. Save it again from your CAD program as DXF and retry."*, *"The drawing
could not be read ({error})."*

**Footer:** the hint (*"Nothing is added to the current project."* while
empty / reading / in error; *"Worst case: no wide gap bridged."* or *"{n}
bridge(s) ticked."*, plus *" Tick the gaps you will bridge, under Gaps, to
lower the count."* while an inside gap is unbridged; *"Saved {file}"* after an
export), a reason (*"Open a drawing first"* / *"Set the tables layer first"*),
**Close** and the primary **Export PDF…** (tooltip *"Save the robot count, the
inputs, the plan and every line and wide gap as a PDF report."*).

**PDF** (`RDD:961-991`, `RDR:273-370`): default `<drawing stem> - robot
count.pdf` beside the drawing, dialog *"Export robot count"*; A4 landscape.
Page 1: header *"Robot count — {file}"* with *"{Fixed tilt | Single-axis
tracker} · {unit} · {date} · SolarLayout"*, the verdict, key figures (cleaning
lines, tables, standard bridges, wide gaps split / bridged, longest segment,
one full pass, travel per charge, out and back, skip lines up to, wide gaps by
cause), analysis notes, and the plan. Following pages: *"Cleaning lines —
{file}"* (Row · Tables · Segments · Longest m · Robots, Total) and *"Wide gaps
— {file}"* (Row · Gap m · Cause · Bridged). Key figure **Standard bridges** reads *"{n} (≤ {span+0.25} m incl. 0.25 m tolerance)"* (`RDR:285-287`). The notes: *"{n} table(s) drawn twice were counted once."*, *"{n} shape(s) on
the table layers are not table-sized and were left out."*, *"No closed plant
boundary found, so no bridge is flagged as leaving the site."*, *"Tables run at
{a}° in the drawing; the layout is read along that direction."* Errors (box
**Export PDF**): *"{file} is open in another program. Close it and export
again."*, *"The PDF could not be written: {error}"*.

**How the drawing is read** (`RDX`):

- **Tables:** a closed four-corner polyline (right angles and opposite sides
  within 2 %), or a block insert (its largest rectangle when that covers ≥ 70 %
  of the block, else nested inserts expanded to depth 4, else the block's
  extent; arrays expanded).
- **Units:** `$INSUNITS` first, else the first of ×1, ×0.001, ×0.01, ×0.0254,
  ×0.3048, ×1000 that makes the median table length 1.5–300 m.
- Shapes more than ±15 % off the commonest table width are dropped; duplicates
  (same centre and size to 0.1 m) count once.
- **Half tables:** length ≤ 60 % of the full length (the longest length held
  by ≥ 10 % of tables).
- **Structure:** a dominant long-side angle of 45–135° is a tracker; the plan
  is turned so the count is the same either way.
- **Lines:** tables grouped across the travel axis within max(0.5 m, 25 % of
  the typical cross size). **Standard vs wide:** standard up to span + 0.25 m.
- **Blame for a wide gap:** the equipment shape covering ≥ 50 % of the gap
  (ties: arrester, building, inverter, obstruction), else an equipment or road
  line crossing it, else *Open ground*. A building layer named with "mcr",
  "substation", "pss" or "uss" is *MCR building*, any other *ICR building*.
  Cause texts: *Lightning arrester*, *ICR building*, *MCR building*, *Inverter /
  SMB*, *Obstruction / road*, *Open ground*.
- **Leaves the site:** the bridge's straight centre-line is not covered by the
  boundary-role shapes; with no boundary nothing is flagged.
- **Layer roles are guessed from the layer name** — each word matched by
  prefix, in this order: an ignore word (text, annot, number, dim, title,
  label, legend, coord, grid, shadow, yard, viewport, north, logo, note, hatch,
  defpoint) → **Ignore**; a table word (mms, table, tracker, module, panel,
  spv, array, or "pv") → **tables**; a boundary word (bnd, bound, fenc) →
  **boundary** (Ignore if it also names a building, inverter or "block"); "la",
  lightn, arrest → **LA**; icr, mcr, build, control, substation, pss, uss, css,
  transf, room → **building**; inv, smb, scb, ajb, combin → **inverter**; road,
  obstruct, obstacle, drain, nala, canal, water, pond, lake, tower, transm,
  keep, exclu, river, rail, pipe, "tl", "ht" → **obstruction**; else the
  commonest block name on the layer is tested for table words; else
  **Ignore**. If no layer is guessed as tables, the layer with the most
  rectangles (at least 10) is (`RDX:81-161, 613-622`).

**Count:** `travel = segment length × (2 if Out and back)`; a segment needs 1
robot when the range is 0 or travel ≤ range, else `ceil(travel ÷ range)`; a
segment at or below **Skip lines up to** gets none; a ticked gap whose bridge
leaves the site is never honoured (`RC:23-37, 443-541`).

### 10.4 Earthing Design (#234, #341, #412, #564) — `ED`, `EA/`, `MW:1763, 5115-5120, 10578-10682`

The project's earthing design: how many earth pits, which GI strip / Cu cable size for each connection, the earthing plan, a calculation report and a bill of quantities, on the IEC calculation with IS 3043 and IEEE 80 shown as cross-checks. The sizing follows IEC; the one place a cross-check enters the result is the plant grid resistance, carried forward as the larger of the IEC and IEEE 80 values (`EA/report.py:19-28`). **It is now saved with the project and read by the BOM, the plan, the package and Layers**, without opening the window (below).

**Opening it:** **Tools ▸ Earthing Design…** or the Studies button **⚡  Earthing Design**, both disabled until a layout exists. *"Generate a layout first, then open Earthing Design."* (box **Generate first**) remains only for a results list with no plant plots (`MW:10590-10594`). One window: reopening raises it. Water plots and plots without tables are left out.

**The window** — title **Earthing Design**, **non-modal**, 1240 × 760 clamped, minimum 760 × 480. A verdict banner across the top; inputs on the left (scrolling); results on the right in tabs **Layout · Calculation · BoQ**; the footer. The frequency is fixed at 50 Hz. **There is no Run button:** it calculates when it opens, then 300 ms after any input change.

**It follows the layout:** a layout replaced (Generate, Open, a cable refresh, a regroup) **closes the window** (`MW:3733, 4601, 9514, 10195, 10325`); inputs out of date show the banner and turn its exports off (§6.6).

**Inputs** — defaults `SC/resources/earthing/defaults.json` (version 4), eight groups ([ran] read off the widgets):

**0. Array earthing:** **Rule**, segmented **Jumpers and a ring** (default) | **A strip along each row** (`ED:181-185`).

**1. Soil & site**

| Field | Default | Range | Unit | Tooltip / effect |
|---|---|---|---|---|
| Soil resistivity | **50.0** | **0–100000; 0 shows *Unknown*** | Ω·m | *"Measured soil resistivity (Wenner 4-pin test); 50 Ω·m assumed until it is measured.\nUnknown (0): one pit per earthing point, nothing sized from it,\nthe grid not checked"*; × Season factor = the design resistivity (75 Ω·m on the defaults). Exactly 50 reads as assumed (`EA/calc.py:285-290`) |
| Season factor | 1.50 | 1–5 | — | *"Dry-season multiplier when the test was done in the wet season"* |
| Gravel resistivity | 3000 | 0–100000 | Ω·m | *"Gravel / crushed-rock layer at the ICR / MCR yard"*; surface layer in the touch / step limits |
| Gravel thickness | 0.10 | 0–1 | m | used only in the IEEE 80 surface-layer factor |
| Soil corrosion | Medium | Low / Medium / High | — | sets Corrosion allowance to 15 / 25 / 40 %; otherwise a report label |
| Corrosion allowance | 25 | 0–200 | % | *"Extra cross-section added for corrosion over the design life"* |
| Design life | 25 | 1–60 | years | report label only |

**2. Fault data**

| Field | Default | Range | Unit | Tooltip / effect |
|---|---|---|---|---|
| LV fault current | 5.0 | 0.1–200 | kA | *"Inverter AC side earth fault"*; sizes the array strip and the Cu cable |
| LV fault time | 1.00 | 0.05–5 | s | the same |
| MV voltage | 33.0 | 1–66 | kV | label only (the duty name and the report) |
| MV fault current | 25.0 | 0.1–200 | kA | sizes the MV strip; also the grid current for touch / step |
| MV fault time | 1.00 | 0.05–5 | s | MV strip sizing only |
| MV neutral | Solidly earthed | Solidly earthed / Resistance earthed (NGR) | — | *"For an NGR, enter the NGR-limited current as MV fault current"*; report label only |
| HV voltage (kV) | 132 | 66 / 132 / 220 | kV | sets HV fault current to 31.5 / 40 / 50 kA |
| HV fault current | 40.0 | 0.1–200 | kA | report-only HV duty |
| HV fault time | 1.00 | 0.05–5 | s | the same |
| Show HV in report | off | — | — | *"HV is out of scope (the design stops at the MCR); its strip size is shown in the report only"* |
| Touch / step duration | 1.00 | 0.05–5 | s | *"Fault duration used for touch / step"* |
| Split factor | 1.00 | 0.05–1 | — | *"Share of the MV earth fault current flowing into the grid"* |
| X/R | 10.0 | **0.1–60** | — | *"System X/R for the decrement factor"* |

**3. Targets**

| Field | Default | Range | Unit | Effect |
|---|---|---|---|---|
| Whole plant | 1.00 | 0.05–50 | Ω | the plant grid target; drives the verdict and supplementary pits |
| Each earth pit | 5.0 | 0.1–100 | Ω | the per-point target |
| LA earth pit | 10.0 | 0.1–100 | Ω | each arrester's pit ring |
| Pit rule | **One pit per point, bonded to grid** | or **Add pits until each point meets target** | — | tooltip *"One pit: every equipment pit is bonded to the main grid, so the whole-plant value applies at each point. Add pits: each point gets as many pits as it needs to meet the pit target on its own."* |

**4. Earth pit (maintenance-free)**

| Field | Default | Range | Unit | Tooltip |
|---|---|---|---|---|
| Electrode length | 3.0 | 1–60 | m | — |
| Rod diameter | 17.2 | 5–100 | mm | *"Cu-bonded rod diameter"* |
| Bore diameter | 150 | 20–500 | mm | *"Bore filled with backfill compound"* |
| Backfill resistivity | 0.20 | 0.01–50 | Ω·m | *"Backfill compound resistivity"* |
| Pit spacing | 6.0 | 1–50 | m | *"Spacing between pits (≥ 2 × length)"* |
| Strip depth | 0.60 | 0.3–3 | m | *"GI strip burial depth"* |

**5. Conductors**

| Field | Default | Range | Unit | Tooltip |
|---|---|---|---|---|
| Initial temperature | 30 | 0–60 | °C | — |
| Final temperature | 300 | 150–500 | °C | *"Max. temperature of buried galvanised steel during a fault"* |
| GI strip sizes | `25x3, 25x6, 32x6, 40x6, 50x6, 50x10, 50x12, 65x10, 75x12` | text | mm | *"GI strip sizes available (width x thickness, mm)"* |
| Cu cable sizes | `4, 6, 10, 16, 25, 35, 50, 70, 95, 120` | text | mm² | *"Cu earthing cable sizes available (mm²)"* |
| Wastage | 5 | 0–50 | % | applied to every strip and cable total |

Size lists are read on Enter or leaving the field. A bad list puts the **last list back**, with a hint under the field: *"“abc” is not width x thickness (e.g. 50x6). The last list is kept."*, *"List at least one strip size."*, *"“x” is not a number."*, *"“x” is not a finite size."*, *"“x” is smaller than 1 mm."*, *"List at least one cable size."* (`EA/calc.py:135-168`). ⛔ The banner **Check the size lists** is gone.

A failed calculation (`ED:669-681`): banner bad **Could not calculate with these inputs**, *"Check {field names}: {why}. The plan and tables show the last good result; exports are off."*; reason *"Fix the inputs to export"*.

**6. Equipment rules**

| Field | Default | Range | Unit | Tooltip / effect |
|---|---|---|---|---|
| IDT per ICR (fallback) | 2 | 0–10 | — | *"Used only when the layout has no transformer grouping"* |
| Pits per ICR / USS | **10** | **0–30** | — | spread on the ring |
| Body pits per IDT | 2 | 0–8 | — | *"Body pits beside each IDT (inverter duty transformer)"* |
| Neutral pits per IDT | **0** | 0–8 | — | — |
| Pits for MCR | **10** | **0–30** | — | spread on the ring |
| Pits per power transformer | 2 | 0–8 | — | *"Body pits for each power transformer, at the MCR"* |
| Pits per string inverter | 1 | 0–4 | — | *"Pits at each string inverter (central plants' SMBs bond to the table structure)"* |
| Aux transformer at MCR | on | — | — | adds auxiliary-transformer neutral pits and a body link |
| Aux TX neutral pits | 2 | 0–8 | — | — |
| Pits per LA | **2** | 1–12 | — | *"At least this many; with a measured soil, more when the LA target needs them"* |
| Fence pit every | 50 | 0–1000 | m | *"0 = no fence pits"* |
| Gates per plot | 1 | 0–20 | — | *"Each plot has its own fence and gates"* |
| CCTV pole every | **0** | 0–2000 | m | *"0 = no CCTV poles"* |
| Weather stations | **0** | 0–10 | — | *"For the whole site, next to the MCR"* |
| Serrated washers / module | 4 | 0–12 | — | *"Serrated washers per module (frame bonding)"* |
| Tracker bonding jumper | 16 | 6–120 | mm² | *"Trackers: flexible tinned Cu braid across each bearing and the slew drive"* |
| Jumper length | 0.50 | 0.1–5 | m | — |
| Bearing spacing (no piles) | 7.5 | 1–30 | m | *"Trackers without a pile pattern: jumpers are estimated from the tracker length at this bearing spacing"* |

**7. Layout rules**

| Field | Default | Range | Unit | Tooltip / effect |
|---|---|---|---|---|
| Jumper: the gap + | 0.30 | 0–2 | m | *"Jumpers and a ring: a jumper is the gap + this"* |
| A break: a gap over | 2.0 | 0.1–50 | m | |
| Longest break bridged | 50 | 2–1000 | m | *"…a longer break splits its row in two, each part joined at its ends"* |
| Ring inside the fence | 1.0 | 0–20 | m | |
| Ring pit every | 100 | 0–1000 | m | *"0 = no ring pits"* |
| Strip in AC / MV trenches | on | — | — | lays strip along the MV and AC cable routes and hand-drawn trenches; when off, or with no MV route, an L-shaped MV backbone joins each ICR ring to the USS / MCR ring |
| MMS link length | 2.0 | 0–20 | m | *"Strip per MMS table (riser + clamp)"* — counted, not drawn; **A strip along each row** only |
| Equipment link length | 5.0 | 0–50 | m | *"Strip per equipment body link"* |
| Fence / pole link length | 3.0 | 0–50 | m | counted per fence, CCTV and street-light pit |
| Row runner gap split | 15 | 1–200 | m | *"Break a row runner at bigger gaps"*; **A strip along each row** only |
| Max cross-link length | 30 | 1–200 | m | *"Longest row-to-row cross link"*; **A strip along each row** only |

**Method** (`EA/calc.py:1-26, 174-616`; the report's design basis,
`EA/report.py:19-28`):

- **Design resistivity** = soil resistivity × season factor (75 Ω·m on the defaults).
- **Conductor sizing — IEC 60364-5-54 Annex A**, `S = I·√t / k`; k for
  galvanised steel from the temperatures (**k = 68.7** for 30 → 300 °C);
  required area = max(S, **90 mm²**) × (1 + corrosion); the pick is the
  smallest listed strip meeting it **and at least 3 mm thick** (IEC 62561-2 /
  IEC 60364-5-54 Table 54.1). Duties: **Main grid — {kV} kV** (ICR / MCR rings,
  IDT body and neutral, HT panel, MV backbone), **Array field — LV** (row
  runners, cross links, MMS links, AC-trench strip, central inverter),
  **Lightning arrester** and **Fence, gates & poles** (minimum-size duties),
  optional **HV switchyard — {kV} kV (report only)**. Cu earthing cable (inverter
  / SMB → row runner): `S = I_LV·√t / 143`, smallest listed ≥ max(S, 6 mm²), no
  corrosion allowance. Defaults give **50x10** (MV), **25x6** (LV, LA, fence)
  and **35 mm²** Cu. If no strip is big enough the note reads *"No strip in the
  size list is big enough for '{duty}' ({n} mm² needed) — add a larger size."*
- **One earth pit:** IEC (governing) — Dwight on the backfill column plus a
  backfill shell term (BS 7430 / EN 50522 practice); IS 3043 alongside.
  [ran] defaults: **16.24 Ω** IEC, 17.44 Ω IS 3043.
- **Pits per point:** *One pit per point* (default) gives 1 pit at each
  equipment point, bonded to the grid (note when one pit misses its target:
  *"One pit alone is {R} Ω (> {target} Ω). Each equipment pit is bonded to the
  main grid, so the plant grid value applies at every point."*); *Add pits*
  adds pits in a line until each point meets **Each earth pit** (up to 50). [ran] section 4: *"1 → 16.24 Ω (! Not met vs 5 Ω); IS 3043 needs 5"*. **LA:** a ring of at least **Pits per LA**
  until ≤ **LA earth pit** (IEC 62305-3 type A; [ran] *"2 on a ring → 9.11 Ω (✓ OK vs 10 Ω)"*). The
  report also gives the electrode length one pit would need ([ran] 13.3 m).
  Warnings: *"Electrode shorter than 2.5 m — below IEC 62305-3 type A vertical
  minimum for LPS class III/IV."*, *"Rod diameter below 15 mm — below IEC
  60364-5-54 minimum for copper-bonded steel rod."*, *"Pit spacing is less than 2
  × electrode length — pits screen each other; resistance gain from extra pits
  is reduced."*
- **Soil unknown (0):** one pit at each earthing point, nothing sized from it, the grid not checked; section 4 is the short form with *"Soil resistivity unknown: one pit at each earthing point and the pit counts as set; enter a measured value to size the pits and check the grid."* Report row *"50 Ω·m (assumed, not measured)"* / *"(measured)"* / *"unknown"*.
- **Plant grid resistance, per plot:** IEC (EN 50522) `R = ρ / (2D)`, D the
  diameter of the circle of equal area — **it depends only on area and
  resistivity**; IS 3043 (strip electrode in parallel with the pits) and IEEE 80
  (Sverak) alongside; governing = the larger of IEC and IEEE 80.
  **Supplementary pits** are added along the array mesh until IS 3043 and
  IEEE 80 meet **Whole plant**; notes *"Plant area alone limits resistance to
  {x} Ω (IEEE 80) — extra pits cannot reach the target; extend the grid outside
  the array (counterpoise) or treat the soil."* and *"IEC (EN 50522) value is set
  by plant area only — it does not improve with more pits."*
- **Touch and step (MV earth fault):** decrement factor from X/R and duration;
  grid current = MV fault current × split factor × decrement; EPR = grid
  current × governing R; IEC 61936-1 / EN 50522 permissible touch voltage with
  IEC 60479-1 body data, 1000 Ω footwear and the gravel layer; IEEE 80 mesh and
  step voltages (the mesh count capped at 25 with a note) and 50 kg limits.
  **IEC passes** if EPR ≤ the permissible touch voltage, otherwise if the mesh
  touch voltage is.

**What gets earthed** (per land plot; `EA/layout.py:330-403, 448-650`):

- **Jumpers and a ring** (default): a GI jumper across each gap between neighbouring tables of a row, length gap + allowance, or a **break bridge** across a gap wider than **A break** if it stays inside the fence and ≤ **Longest break bridged**; a longer one, or one leaving the plot, splits the row. Row ends joined row to row by straight strips at both ends. A **main ring** on MV duty, 1 m inside each fence, a pit every 100 m. The tables' structure carries the bond between jumpers (not counted).
- **A strip along each row:** row runners, cross links, the MMS riser allowance.
- **Both:** Cu cable to the nearest array conductor; trench strip along MV, AC and hand-drawn routes; rings 1.5 m round each ICR, USS and MCR, pits spread on them; IDT body and neutral pits south of each ICR; power transformer body pits north of the MCR, auxiliary neutral pits south; weather-station pits on one plot; a ring of pits round each arrester; a **fence strip** along the whole fence joining its pits; gate pits on the first fence; CCTV and street-light pits; a string inverter's own pits on string plants only (`EA/layout.py:483-487`). **Trackers** also get bonding jumpers, one per pile of the pattern, else estimated from the bearing spacing.

Pit categories: ICR body, USS body, IDT body, IDT neutral, MCR body, Power transformer body, String inverter, Main ring, Aux transformer neutral, Lightning arrester, Fence & gate, CCTV pole, Street light pole, Weather station, Supplementary (grid) (`EA/layout.py:56-70`). Totals are drawn length + allowances, × (1 + Wastage). A multi-plot site gets one network and one grid check per plot; the banner uses the worst.

**Results:**

- **Verdict banner** (`EA/report.py:137-179`) — good or warn, bad on a failed calculation. Known soil: *"{pits} earth pits · plant grid {R} Ω (target ≤ {T} Ω)"*; unknown: *"{pits} earth pits · soil resistivity unknown"*. Detail: lengths, then warn reasons *"No listed size fits the {duty} — extend the size list."*, the LA cap text, *"Each equipment point needs more than 50 pits to reach {T} Ω — treat the soil or lower the target."*, *"The grid misses its IEC target or touch limit — see Calculation."*; or good *" One pit alone is {R} Ω; bonded to the grid it takes the plant value."*; *" Soil resistivity assumed at 50 Ω·m, not measured: enter the measured value to confirm the grid."*; unknown *" Enter a measured soil resistivity to check the grid."* [ran] sample site: *"315 earth pits · plant grid 0.06 Ω (target ≤ 1 Ω)"*, *"GI 50x10 3,942 m, GI 25x6 7,993 m, Cu 35 mm² 177 m. One pit alone is 16 Ω; bonded to the grid it takes the plant value. Soil resistivity assumed at 50 Ω·m, not measured: enter the measured value to confirm the grid."* At 100 Ω·m: warn, 0.12 Ω, the touch limit failing, not the 1 Ω target. Counts [ran]: ICR body 40, IDT body 16, String inverter 159, Main ring 33, Fence & gate 67. The pit count changes with the design; do not quote it as a property of the sample site.
- **Layout** tab — the earthing plan with a standard plot toolbar: boundary,
  tables, ICRs (*ICR-n*), MCR and inverters in the background; strips coloured
  by duty (main grid red, array / AC trench blue, LA purple, fence / poles
  grey, Cu cable green dashed); a marker per pit category; a legend below
  (`EA/plot.py`).
- **Calculation** tab — a report with checks marked **"✓ OK"** or **"! Not
  met"** (amber, never red), in sections **1. Design basis**, **2. Key
  inputs**, **3. Conductor sizing (GI strip / Cu cable)**, **4. Earth pit
  design**, **5. Plant earth grid resistance (Ω)** (one row per boundary),
  **6. Touch & step voltage (MV earth fault)**, **7. Where each earthing
  connection goes**, **8. Earth pit count**, **9. Bill of quantities**, **10.
  Notes** (only when there are notes) — `EA/report.py:94-215`.
- **BoQ** tab — **S.No · Description · Qty · Unit · Remark**: the
  maintenance-free earth pit (*"Maintenance-free earth pit — {rod} mm Cu-bonded
  rod × {L} m, backfill compound in Ø{bore} mm bore, with inspection
  chamber"*), one GI strip row per size (*"GI strip, hot-dip galvanised, {W x T}
  mm"*, *"incl. {n}% wastage"*), the Cu cable, *"Earthing jumper or break bridge, bolted to the MMS at both ends"* (jumpers) or *"MMS earthing connection (strip riser, clamp, bolts)"* (runners),
  serrated washers, tracker bonding jumpers (trackers), and LA test joints.

**Footer and exports** (`ED:708-742`, `EA/export.py`, `MW:10668-10682`): **Export DXF…**,
**Export BoQ…**, a status label, **Close**, and the primary **Export PDF
report…**. Each is refused while a run is on (*"A layout or cable run is in progress. Export when it finishes."*), while out of date, or without active access (*"Exports need active access."*).

| Export | Dialog | Default file | Contents |
|---|---|---|---|
| PDF | **Export earthing report** | `Earthing_Design.pdf` | *"Earthing Design Report — {project}"*; A4 portrait pages for sections 1–10, then an A3 landscape **Earthing Layout** page |
| DXF | **Export earthing DXF** | `Earthing_Layout.dxf` | in the layout's own coordinates; layers `REF_LAYOUT`, `EARTH_GI_{size}_{duty}` (e.g. `EARTH_GI_50X10_MV`, `EARTH_GI_25X6_LV`), `EARTH_CU_CABLE_{n}SQMM`, and one `EARTH_PIT_…` layer per pit category |
| BoQ | **Export earthing BoQ** | `Earthing_BoQ.csv` | CSV (UTF-8 with BOM): `S.No,Description,Qty,Unit,Remark` |

After a save the footer reads *"Saved {path}"*. A write error shows *"Could not save the file: …"*.

**How it relates to the rest of the application** (⛔ the old "not saved, not in the BOM, does not follow the layout" is gone):

- **Saved** in the project: the inputs that differ from the defaults (§4.10). Editing marks the window modified and re-feeds the BOM; it does **not** make results out of date (`MW:10618-10634`). **File ▸ New Project** starts at the defaults.
- **BOM:** strip by class, jumpers, pits by kind, bolt sets are measured lines (§12.8; `SC/takeoff/providers/earthing.py`). Trench strip drops with Calculate cables off, note *"The strip in the cable trenches comes from the cable calculation, which is off."* ⚠️ The BOM's inverter Cu cable is a rule (15 m each), not the design's, so the BOM and this window's BoQ can differ.
- **Layers ▸ Earthing** (§6.2), **Export ▾ Earthing layout (DXF)…** (§13.1), **D6 sheets** and the DXF twin's `E-ERTH-*` layers (§13.4), **R1 §8** (soil line *"…, assumed, not measured: the grid check stands once a soil test confirms it"*, *"Unknown: the grid is checked once a measured value is entered"*; `DL/report/build.py:1342-1346`). No Summary row.


## 11. SLD view (#418, #450, #468) — `APP/sld_panel.py`, `APP/sld_canvas.py`, `APP/sld_manager.py`, `SS`, `VM`, `SA`

⛔ **Gone:** the row **Generate: Automatic / Manual**, the **SLD TOOLS** panel, the **Full SLD** checkbox, **Hide Layout & Energy Summary**, ✋ Pan / 🔍 Zoom buttons, a typed rotate angle, the 🗑 Delete tool, **⬇ Export SLD to DWG / PDF**, *rating needs OND* on the sheet, **DOC. NO.** and the four default notes. Nothing reads the bill of materials (`SA:5`, `tests/test_sld_never_reads_bom.py`).

### 11.1 Review first — `MW:7226-7280`, `APP/sld_panel.py:86-192`, `VM`

**SLD** tab (Ctrl+7); a blue banner **SLD Preparation** / **Exit SLD** stays. With a layout and no diagram, the automatic diagram **builds on entry, no question**. The panel opens in **review**, the canvas on **Diagram**; the status comes from `VM:336-349`: *"SLD up to date with the layout."*, *"No layout yet."*, *"No SLD yet."*, *"Opened a hand-drawn SLD."*, *"The layout changed: {mwp}. Your SLD has {n edits|your edits} and was kept."*, *"Your SLD is kept out of date."*, *"Couldn't build the SLD: {error}."*

**Empty** (no layout, no diagram): *"No layout yet"*, *"Generate a layout and the single line diagram is built from it."*, **Back to Layout** (`VM:288-290`).

**DIAGRAM** card: verdict + **Summary | Full** + note + notice.

| State | Verdict |
|---|---|
| No layout [ran] | *"Waiting for a layout"* / *"The diagram is built from the layout's inverters, ACCBs and transformers."*; note *"Available once a layout exists."*, switch disabled |
| Current [ran] | *"Up to date with the layout"* / *"Automatic · 54.28 MWp · 159 inverters · 8 transformers"*, *" · 1 edit"* and button **Rebuild — discards 1 edit** once edited |
| Out of date | *"Out of date"* / *"The layout changed after this diagram was built. See the note above the drawing."* (`VM:154-155`, `SS:183-190`) |
| Hand | *"Drawn by hand"* / *"It doesn't follow the layout. It has {n} element(s)[ over a traced background]."* with **Replace with the automatic diagram…**, which asks inline (*"Replace your drawing with the automatic diagram?"* … **Replace drawing** / **Cancel**, `VM:137-148`); the traced background goes too; Undo brings both back |
| Error | *"Couldn't build the diagram"* / *"{error}.[ The diagram on screen is kept.]"* |

Notes: *"One chain for the whole plant."*; *"Every {ACCB|central inverter} and transformer: {n} rows."*; *" Switching rebuilds and discards your edits (undoable)."*; *"Only for the automatic diagram."* Notices (`VM:171-180`): *"Transformer ratings need the inverter file (OND)."* **Load OND…**; *"{n} transformer(s) fit(s) no listed rating, so the sheet prints “— kVA”."* **Electrical tab…**; *"The inverter file has no output voltage, so the sheet prints “— V”."* Without an OND the sheet prints *— kVA*, *33 kV / — V* [ran].

**EXPORT** card: §11.6. Then **Edit diagram** (*"Move symbols, add text, or draw your own."*), or **Draw by hand** (*"Start a blank sheet. It won't follow the layout."*) with no layout.

### 11.2 Following the layout — `SS:259-321`, `MW:7817-7842`

- **Untouched automatic:** rebuilds at once, one undo step, status *"SLD rebuilt from the new layout ({mwp}). It had no edits."*
- **Edited automatic:** kept, **out of date** when the layout's build differs. Over the drawing a banner *"The layout changed after this diagram was built"* / *"This diagram: {figs}. Layout now: {figs}."* with **Rebuild — discards {n edits}** (gold) and **Keep this diagram**. **Keep** → *"Kept your SLD. It stays marked out of date until you rebuild."*; a chip *"Kept · out of date"* / *"shows {a} MWp, layout is {b} MWp"*; a further change marks it again. Keep is not undoable.
- **Hand-drawn:** never follows. A diagram saved by an older builder is re-signed on Open, never read as "the layout changed".
- ⛔ A Generate, a grouping edit or an OND load no longer leaves a stale diagram unmarked.

### 11.3 Edit diagram — `APP/sld_panel.py:421-590`, `VM:39-64, 272-276`

Pinned header **Editing diagram**, Undo (*"Undo (Ctrl+Z)"*), Redo (*"Redo (Ctrl+Shift+Z)"*), **Done**, line *"No changes yet · Space + drag pans · scroll zooms"* / *"{n} change(s) in this session · …"*. Status *"Editing the SLD. Ctrl+Z undoes."* Done: *"No changes."* / *"{n} change(s) kept. The diagram is marked edited."*

**Select | Wire | Text.** Hints: *"Click to select · drag to move · Delete removes"*, *"Drag to draw a wire"*, *"Click to add text"*, armed *"Click to place · Esc to stop"*; review *"Scroll to zoom · drag to pan"*. Select: click selects; drag on a selected element moves; otherwise a marquee; Shift adds; double-click a text or relay edits it (`APP/sld_manager.py:378-418`). Text opens **SLD text**: *"Text (press Enter for a new line)"*, **Font**, **Size** 4–96 pt (default 8), **Colour** (default `#222222`).

**SYMBOLS** card: search *"Find a symbol"*, no hit *"No symbol has that name."*; groups, one open at a time, tiles three across, tooltip *"Place: {name}"*:

| Group | Symbols |
|---|---|
| Generation | PV module, Y harness, SMB, SMB without fuses, String inverter, Central inverter |
| LV switchgear | ACCB, Fuse, MCB, MCCB, CB on / off / trip, Isolator + earth, ISO + earth sw. |
| Transformers | 2-winding, 3-winding, 4-winding, Multi-winding, Power transformer |
| MV & protection | MV panel, VCB, VT (2 core), VT (open delta), CT, Relay, Lightning arr., MFM, Voltmeter, VSS, R-Y-B phase |
| My symbols | your symbols, then **Import image…** (*"Import an image and trace it into a symbol of your own"*); note *"Right-click one of your symbols to remove it."* |

A tile arms the symbol and stays armed (*"Placed a symbol. Esc stops placing."*); pressing it again or Esc goes back to Select. **Relay** asks: window **Protection relay**, **Device number** (a choice or typed; hint *"Pick an ANSI device number, or type your own · it is drawn inside the relay symbol"*), **Place relay**. **Pre-rotation:** PV module, inverter, 2-, 3-, 4- and multi-winding are placed at 270°; **Power transformer is not** (`APP/sld_manager.py:42-49`).

**SELECTION** card: name, **Rotate 90°**, **Copy**, **Delete**, **Group**, **Ungroup**; *"Nothing selected"* / *"Click a symbol, a wire or a text to select it."* Only 90° steps. Copy offset 8 right, 8 down (sheet mm).

**More ▸** (`APP/sld_panel.py:497-530`): **Start a blank sheet**, **Trace over a PDF / DXF…**, **Remove the traced background** (only with one), **Clear the diagram** (disabled with *"Only the traced background is left. “Remove the traced background” takes it away."* / *"Nothing to clear."*); note *"Ctrl+Z undoes a blank sheet, a clear, a trace or removing the traced background."*

**Undo** (`SS`, `MW:2847-2860`): 100 steps; every edit and every replacing choice (rebuild, replace, blank, clear, Summary / Full, following the layout, trace, background). Works in review as well: Ctrl+Z, Ctrl+Shift+Z, Ctrl+Y; Delete, Backspace, Esc. *"Undid: {label}."*, *"Nothing to undo."*, *"Redid: …"*. A toast with **Undo** after Rebuild, Replace, a switch that discards edits, a blank sheet, a clear, removing or replacing the background. **History is not saved.**

**Tracing** (#450, #468, #483; `MW:7560-7641`, `SC/pdf_sld_import.py`, `SC/dxf_sld_import.py`): filter *"SLD Files (*.pdf *.dxf *.dwg)"*. **CAD and vector PDF become editable elements** (polylines, wires, labels), in the sheet's drawing area, aspect kept: *"Imported {n} editable elements. Ctrl+Z undoes the import."* A hand drawing from then on. Over a diagram, More asks inline: *"Replace the diagram with “{file}”?"* / *"Replace discards your {n} element(s)[ and the traced background]; Add on top keeps {it|them}. Ctrl+Z undoes either."* **Replace diagram / Add on top / Cancel** (`VM:431-452`). **Only a scanned PDF becomes a background**: first page, longest side ≤ 2600 px, *"This PDF has no vector lines (it may be scanned), so it is a background to trace over. Draw on top, then export."* It shows faint on screen, full strength on paper. A CAD file with nothing: *"Nothing to Import"*. A DWG needs the ODA File Converter (§3.2).

**Custom symbols** (`MW:7314-7362`, `SC/sld_custom_symbols.py:33-40, 319-345`): **Import image…**, *"Images (*.png *.jpg *.jpeg *.bmp *.gif)"* → trace → **Symbol Editor — edit, then Accept** (*"Traced symbol — use Pen to draw, Erase to remove a stroke, then Accept."*, ✏ Pen, 🧽 Erase, 🗑 Clear, Accept / Reject) → window **Symbol name** (**Name**, **Save symbol**, hint *"Shown on its tile under My symbols · an existing name is replaced"*) → *"Saved the symbol “{name}”. It is under My symbols."* Stored in `~/SolarLayout_Symbols`. Errors: *"Could not extract an outline from this image.\nTry a clearer line drawing / higher-contrast image."*; *"The symbol is empty — nothing to save."* Removing: right-click, *"Remove “{name}” from My symbols…"*, inline *"Its file is deleted. Undo can't bring it back."* **Remove symbol** / **Cancel**. Placed copies keep their strokes, also on another machine.

### 11.4 Diagram, Sheet and navigation — `APP/sld_canvas.py:165-264, 374-384`, `SC/sld_view.py:16-19`

Bottom right: **Diagram | Sheet**, **− 100 % +**, **Fit** (tooltips *"Zoom out (−)"*, *"Fit (F)"*, *"Zoom in (+)"*). **Diagram** frames the drawing; **Sheet** shows the A3 sheet as it prints. Not saved. The **wheel zooms at the pointer**; 25 %–800 % of the fit; **in review a plain drag pans**; in Edit Space + drag or the middle button; **F** fits; **+ =** and **−** step 20 %.

### 11.5 The sheet — `SC/sld_sheet.py:168-205, 285-318`, `SA:110-118, 287, 466-470, 563`

- **Title block** [ran]: **COMPANY** (with logo), **PROJECT** (*"name · code"*, else the file name in muted italic), **CLIENT**, **LOCATION**, **DRAWING TITLE** (*"Single line diagram — Summary"* / *"— Full"*; hand: *"Single line diagram"*), **DRAWN** (project's, else company initials), **CHECKED**, **APPROVED**, **DRAWING NO.**, **REV.**, **DATE** (today), **SCALE** NTS, **SHEET** 1 of 1, **PAPER**. Filled from File ▸ Company… and the project details (§13.2); **"—"** where unknown. DRAWING NO. and REV. print "—" here.
- **NOTES, three:** *"1.  All dimensions/ratings are indicative and shall be confirmed against the final GTP / BOM."*, *"2.  Cable sizing and protection to be finalised separately."*, *"3.  Quantities marked ×N are per-plant multiplicities."*
- **Paper:** ≤ 10 rows A3, ≤ 28 A1, else A0 ([ran] 12 rows → A1).
- **Automatic diagram, Summary** [ran]: PV → (fuse mark when inline) → String Inverter → ACCB → transformer → MV panel; labels e.g. *"88,984 ×\n610Wp"*, *"PV Array\n3,178 strings"*, *"String Inverter\n×159"*, *"560 modules\n20 strings"*, *"ACCB ×12"*, *"15 Str.Inv"*, *"Transformer ×8\n(3-Wdg)"*, *"2 ACCB"*, *"33 kV Switchgear"*, *"8 Tx"*, *"GRID\n33 kV"*, *"54.28 MWp DC · String Inverter · 4 ICR"*, *"SINGLE-LINE DIAGRAM"*. **Full:** column heads *PV array, String inverters, ACCB, Transformer…*, rows *ACCB-1…*, *"TX-{k} · {ICR}"*. Y harness and inline fuses are marks on the wire. Its counts, ratings and voltages are the grouping's (§4.8c); the label follows the windings while one multi-winding symbol draws every form above 4 windings (`SA:100-107`). It needs no energy run.

### 11.6 SLD exports — `MW:7666-7746`, `VM:191-210, 305-313`, `SC/sld_print.py`, `SC/sld_dxf_export.py`

The Export card: **PDF…** (*"Export the SLD to a PDF"*), **DWG…** (*"Export the SLD to a CAD file (DWG, or DXF)"*), and a note. Off: *"There is no SLD to export yet."*; the layout out of date: its stale reason; the diagram out of date: *"Exports wait until you rebuild or keep this diagram (see the note above the drawing)."*, tooltip *"The SLD is out of date: open the SLD view and rebuild it or keep it."*; kept: *"Exports this diagram as it is ({a} MWp); the layout is {b} MWp."* ⛔ Do not repeat the other note, *"The project report's SLD page uses this diagram too."*: false (§18).

- **PDF…**: *"Export SLD to PDF"*, `SLD.pdf`; A3 / A1 / A0 with the title block; background at full strength; one page. Status *"SLD exported to {path}"*.
- **DWG…**: *"Export SLD to CAD"*, `SLD.dwg`, filters *"AutoCAD Drawing (*.dwg);;DXF Drawing (*.dxf)"*; sheet frame and elements, title block included; **the traced background is not written**. No ODA: *"Saved as DXF, not DWG, because the ODA File Converter was not found: {path}"*. DWG is not a tested route (§3.2).
- Both need active access.
- **The package's D5 is a separate, automatic diagram** (§13.4): nothing under `DL/` reads the diagram's elements or background, so **edits and tracing do not reach the package**, and the package doesn't wait for the SLD.
- **Saved:** §4.10.

## 12. BOM view (#222, #269, #270, #381, #382) — `APP/bom_view.py`, `APP/bom_builder_panel.py`, `SC/bom/`

⛔ **The old BOM is gone** (`tests/test_old_bom_gone_269.py`): no five-column editable table, no **BOM TOOLS**, no **➕ Add Row**, no **⚙ Rebuild from Layout**, no templates or **Load Template**, no **Replace plant BOM**, no cell editing, no tinted rows, no *Plant AC Capacity* or *Design warning* row. It is a builder driven by a **profile**.

### 12.1 Reaching it — `MW:1208, 8832-8919`

View **BOM**, **Ctrl+6**. The left column becomes the builder under a green banner titled **Bill of Materials**, button **Exit BOM**; the stage shows the BOM, the canvas hidden. Status on entry: *"BOM Mode ON — select a line to see how it is counted; edits apply as you type."*, unless the default profile could not load: *"{name} couldn't be loaded; using SolarLayout standard"* (`SC/bom/store.py:425-427`). Leaving clears the status bar. Sketch and SLD are mutually exclusive with it.

Counted **lazily**: after Generate the results are held, and the count runs when the view opens or an export needs it, under *"Working out the bill of materials…"*. Before Generate: *"Generate a layout to count the plant."*; the Readiness card hidden; Add a line says *"Generate a layout first."* Water plots and plots with no tables are not counted (`SC/bom/session.py:36, 210-211`). Out of date: no banner, the last run's plant, exports refused (§6.6).

### 12.2 The stage: Plant and By block — `APP/bom_view.py:5, 25-26, 105-136, 270-319`, `SC/bom/export/view.py:25-30, 193-198`

Head row: segmented **Plant | By block**; segmented **All N | Needs attention N**; block combo (By block only; first item **All blocks**); search, placeholder *"Search items, specifications, makes"*. **Nothing is edited in cells**: selecting a row fills the inspector.

**Plant table**, columns **Item & specification · Makes · Order qty · Basis · Source · Status**.

- Group row: *"{category} · {n}"*, plus *" · 1 needs attention"* / *" · {a} need attention"*.
- Item cell: name, purpose after *" · "*, then the specification on a new line. Its tooltip carries notes and warnings.
- Order qty cell: order quantity, then the design quantity on a second line, with *" + {allowance} %"* when there is one; `—` when none.
- Source: *Measured / Rule / Manual*. Status: *✓ Ready* or *! Needs design input* / *! Needs factor* / *! Needs quantity* / *! Needs specification*, in that precedence (`SC/bom/model.py:28-29`).

**By block grid:** **Item & specification**, one column per block (*ICR-1*…), **Shared**, **Total**, **Unit**. Empty for zero. **Total is the design quantity, not the order quantity** (`SC/bom/session.py:771`). The block combo filters to lines with a quantity in that block; columns and totals stay the whole plant.

Categories, in order: PV modules; Inverters & DC collection; Structure & foundations; DC cabling & connectors; LV AC system; MV system; Earthing & lightning protection; Communication, SCADA & security; Aux power & lighting; Civil works; Safety & fire; O&M & water; Services; Mandatory spares. 102 item types, 173 entries in built-in profile v21. [ran] 114 lines (demo, fixed, string, no MCR), 132 (designed, MCR); *"114 lines from 106 of the profile's 173 entries"*. Do not quote these as fixed.

### 12.3 The left column — `APP/bom_builder_panel.py:164-686`, `SC/bom/session.py:62-113, 621-763`, `APP/bom_fixes.py:26-43`

Caption **BILL OF MATERIALS**. Collapsible cards.

**Profile:** name; sub *"{Built-in|Company|Client} · version {v} · {n} entries"*; **Change…** (*"Choose, create, import or export BOM profiles"*). A newer version on this machine, non-built-in only: *"Version {v} is on this machine"* + **Update to v{v}**, then *"Updated to v{v}"*. **THIS PROJECT:** *"No edits yet. Select a line to change it for this project."*, or *"{n} edit(s) · {k} can go into a profile"*, or *"{n} edit(s) · all design-specific"*; **Save as profile…**. *"BOM settings: 10, none changed"* or *"… {k} changed"*, **Edit…** (*"The numbers several lines share, in Advanced settings ▸ BOM"*). **IN THIS BOM:** *"{n} lines from {m} of the profile's {t} entries"*, *"…, {a} added in this project"*; expandable counts **Not for this design**, **Switched off**, **None on this layout**, each opening the entry names; *"{name} · your edit kept"*. Structure kit note, only with a kit: §12.7.

**Readiness** (hidden before Generate): *"✓ All {n} lines ready"* or *"! {r} of {n} lines ready"*; filter chips; a row per missing design input: *"{fix} · {where} · {n} line(s)"* and **Go**. **Go** leaves BOM mode, then opens:

| Reason on the line | Go text | Opens |
|---|---|---|
| *"The AC rating comes from the inverter's OND file."* / *"Transformer ratings come from the inverter's OND file."* | Load an OND file · Electrical tab | Electrical, inverter card |
| *"The module's Isc comes from its PAN file."* | Load the module's PAN file · Array tab | Array, module card |
| *"Cable quantities come from the cable calculation, which is off."* | Turn on Calculate cables · Electrical tab | Cables card |
| *"No listed transformer rating is large enough for its load."* | Add a larger transformer rating · Electrical tab | grouping card |
| *"Piles are counted from the pile pattern, and none is defined."* | Define a pile pattern · Layout ▸ Piles | Pile dialog |
| *"No inverters are placed yet."* | Generate the layout · Generate Layout | focus on Generate |

⚠️ A fresh plant is never "all ready": 49 manual lines need a quantity, three a factor (ICR cable tray, its canopy, yard light; central also two earthing lines), and **MMS table package** needs **Basic wind speed**, the tracker package **Basic wind speed** and **OEM and model**, the power transformer **Voltage ratio** (`SC/resources/bom/catalog.json`).

**No longer in the design ({n}):** an edit whose line or entry has left the design; its name and words (*"make Comet; 3 % allowance"*), **Dismiss**, which deletes the edit for good. It opens itself when a new one appears. Names: *"{name} · no longer in the profile"*, *"{item} · not for this design"*.

**Line, the inspector.** Empty: *"Select a line to see how it is counted."* + **+ Add a line**. On a line:

- Head *"{category} · {Source} · {Supply|Works} · ✓/! {status}"*; warning *"! Check: …"*, tooltip *"A design warning: it never changes a quantity"*.
- With several lines in the entry: **All N sizes | This size only**; an edit lands on the entry or that line.
- Quantity by kind: blocked, the reason and a fix button; **Measured**, *"{qty} {unit} · {basis}"*, read-only; Rule, **Factor** (0–1e9, 3 dp, zero shows `—`) and **Design qty** *"{factor} × {driver} {label} = {qty} {unit}"*; Manual, **Quantity**.
- **Allowance** 0–100 %, 1 dp. A field following a BOM setting gets **This line | All {n} lines** and a hint *"BOM setting · {label} · {value}"*; **Use the setting** drops the line's own number.
- **Order qty** = design × (1 + allowance %), rounded up to the unit's precision; LS and MWp not rounded. Units: Nos, set, m (0 decimals), t, m², m³ (2), LS, MWp (3) (`SC/bom/units.py:17-50`).
- Design values read-only with origin (*from Array tab*); spec fields editable, a combo where the type lists choices, required ones marked *" *"*.
- **Makes:** locked *"{make} from the file"* for PV module and inverter, else chips and *"Add a make"*. **Remarks.**
- **Turn this entry off**, or **Remove this line** for a line you added; no confirmation. ⚠️ An entry cannot be switched back on from the screen (§20); do not tell the reader to switch off-by-default lines on.

**Add a line:** **Catalog** (Item type, Quantity), **Rule** (Item type, Design quantity, Factor), **New type** (Name, Category, Unit, Design quantity, Factor); a preview *"Preview: {qty} {unit}"*; **Add**. Added item types are supply. ⚠️ The Design quantity combo prints internal keys (§20); do not quote it or show it uncropped.

**Edits are per project and are never lost on Generate:** a regeneration keeps every edit ([ran]); an edit whose line is gone joins *No longer in the design*. ⛔ Do not repeat "a rebuild discards your edits". A grouping or BOM-setting change recounts; edits stay.

### 12.4 Profiles — `APP/bom_profiles_dialog.py`, `APP/bom_save_profile_dialog.py`, `SC/bom/store.py:23, 60-61, 157-160`, `SC/bom/edits.py`

Layers: **SolarLayout standard** built in; a **Company** profile extends it; a **Client** profile extends a company one. Files: `~/SolarLayout_BOM_Profiles/<slug>.bom-profile.json`. The default for new projects is per computer (`MW:1260`).

**Profiles** (from Change…), modal, width 760. Strip **This project uses**, **New projects use**, *"{n} profile(s)"*. Left: list grouped BUILT-IN / COMPANY / CLIENT, *"version v"*, *" · default for new projects"*, or *"can't be loaded"*; **New…**, **Duplicate**, **Import…**. Right: name; *"version {v} · ships with the app"* or *"version {v} · saved {d Mon yyyy} · extends {parent}"*; tiles **entries changed / entries added / own item types** (built-in **entries / item types / extends**); table **Entry | What it changes**; built-in note *"The built-in profile covers every design type; the design decides which entries apply. It can't be changed. Duplicate it to make your own."*; tick **Use for new projects**; **Export…** (*"The built-in profile is part of the app; duplicate it to export a copy."*); **Delete** (*"The built-in profile can't be deleted."*, *"{child} extends it. Delete that first."*), no confirmation. Footer **Close**; primary **Use {name} for this project**, disabled *"This project already uses it"*; after: *"Using {name} v{n} for this project"*.

- **New:** **Name** (placeholder *"Your company standard"*), **Extends**, hint *"An empty profile over the selected one: it changes nothing until edits are saved into it."*; **Create**; reasons *"Give the profile a name"*, *"A profile called {name} already exists."*, *"Use at least one letter or digit (A–Z, 0–9) in the name."*
- **Duplicate:** hint *"A copy of {name}'s own changes, under a new name."* or *"The built-in changes nothing, so the copy starts empty."* ⚠️ Its BOM settings don't copy (§20).
- **Import:** *"BOM profile (*.bom-profile.json)"*; a preview, nothing added until **Import {name}**; first 8 changes, *"+ {n} more change(s)"*; notice *"It extends {parent} v{a}; you have v{b}. It will extend your v{b}[, and {n} of its changes override(s) a v{b} change ({names})]."*; refusals *"It isn't a profile file."*, *"The built-in profile is part of the app and can't be imported."*, *"{name} v{a} is already here; the file is v{b}."*, *"It extends {id}, which isn't on this machine. Import that first."*
- **Export:** *"Export the profile"*, `{name}.bom-profile.json`. Free without access.
- Changing profile (`SC/bom/session.py:223-242`): decisions stay; entry edits reattach by id, line edits by identity; an edit whose entry is gone joins *No longer in the design*. A project keeps its profile snapshot until changed.

**Save edits as a profile** (Save as profile…), modal, width 720. Strip **This project**, **Uses**. **SAVE TO**: **A new profile | An existing profile** (*"No company or client profile is on this machine yet"*); new: name + *"extends {profile}"*; existing: combo *"{name} (v{v})"*, *"becomes v{v+1}"*. **EDITS TO KEEP**, **Select all / Select none**, table **(tick) | Entry | Edit | Value | In the profile now**. Fold **Stay with this project ({n})**, *"These belong to this design, so a profile can't keep them."*, reasons *"manual quantities belong to this site"*, *"set for one size of this design only"*, *"{target} has no {entry}"*. Offered: makes, allowance, factor, spec, notes, on/off, added entries with their item types, BOM settings. Primary *"Save {n} edit(s) to {target}"* / *"Save … to a new profile"*; reasons *"Nothing here can go into a profile"*, *"Tick the edits to save"*. Status *"Saved {n} edit(s) to {name} (v{v})"*. The project is untouched by a save.

### 12.5 Statuses and the workbook's Open items

A line **not ready** goes to Open items, and **its quantity is not on the BOM sheet**, even when known; a typed 0 is dropped; category Mandatory spares has its own sheet / section; else the BOM (`SC/bom/export/view.py:305-317`). An incomplete BOM still exports.

### 12.6 BOM settings (#381) — `SC/resources/bom/profiles/solarlayout-standard.json`, `SC/settings_form.py:218-234`

Reached: **Edit…** on the Profile card; File ▸ Advanced settings… ▸ **BOM**; the inspector's **All N lines**. Pill *BOM · applies now*. A change recounts only the BOM, marks the project changed, does **not** make results out of date (`MW:12067-12073`).

| Group | Label | Unit | Default | Range | Help |
|---|---|---|---|---|---|
| Spares | Spare for discrete consumables | % | 5.0 | 0–50 | Added to lugs, glands, connectors, bolt sets and the like. |
| Terminations | Lugs per 3-core cable end | lugs | 3 | 1–6 | One per core, on LV AC and LV-IDT cable ends. |
| DC protection | Bifacial current gain | % | 10.0 | 0–30 | Added to the module's Isc when it is bifacial (light on the rear side). |
| | String fuse factor | × | 1.56 | 1–3 | Times the design Isc; the fuse is the next size up. |
| | DC disconnector factor | × | 1.25 | 1–2 | Times the strings per SMB and the design Isc; the next size up. |
| | String fuse sizes | A | 15, 20, 25, 30, 32, 50, 63 | each 1–200 | The standard fuse sizes to choose from. |
| | DC disconnector sizes | A | 250, 320, 400, 500, 630 | each 50–2000 | The standard DC disconnector sizes to choose from. |
| Cables | MV cable drum length | m | 500 | 50–2000 | One drum's length of MV cable; a run longer than a drum needs a straight joint per extra drum, per parallel cable. |
| | Concrete block spacing | m | 0.8 | 0.3–3 | Cable laid above ground rests on a concrete block every this many metres. |
| | Cable tie spacing | m | 0.50 | 0.1–2 | DC cable is tied to the table or tracker every this many metres. |

Size lists are chips (§4.8c). Other settings feed the BOM: String cable size, Y pair cable size, LV feeder drop limit, DC trunk parallel runs, RS485 (§6.9).

### 12.7 Structure — `SC/resources/bom/profiles/solarlayout-standard.json`, `SC/structure_kit.py` (#265, #526)

- Fixed tilt: **MMS table (supply package)**, per table type: *"2P × 28 portrait, full table (56 modules); module 2,380 × 1,130 mm, 580 Wp; tilt 8.4°; clearance 0.5 m; wind …; Hot-dip galvanised"*. Note *"Includes the structure, fasteners and module mounting hardware, as per the supplier's design"*. Finish choices: Hot-dip galvanised, Pre-galvanised, Zn-Al-Mg coated, Mixed, as per the supplier.
- Tracker: **Tracker (supply package)**, set, plus **Tracker control system**, 1 LS. Note *"Includes the structure, posts, drive, controller and module mounting hardware, as per the OEM. Not split into interior and perimeter trackers"*.
- **MMS pile:** fixed tilt only, per full and half, needs a pattern. Off by default: Module mounting structure steel, MMS fasteners, Module mounting bolt set, Module earthing washer, tracker posts.
- A project's structure kit is kept, unused. Note: *"This project has a structure kit. The BOM lists the structure as a package; the kit is kept for later."* or, for a profile older than v20, *"This project's BOM profile still lists the structure kit's parts. Update the profile to buy the structure as a package; the kit can no longer be edited."* (`SC/bom/session.py:65-68`).

### 12.8 What feeds the lines

**Protection** (#382; `SC/bom/protection.py:43-150`). Inputs: the PAN's Isc; **Bifacial module**; **Max series fuse**. Design Isc = Isc, × (1 + gain %) if bifacial. Inline string fuse = factor × design Isc → next listed size; SMB input fuse = factor × strings per input × design Isc → next size; DC disconnector = factor × max strings per SMB × design Isc → next size. SMB inputs = max strings per SMB; with a Y that pairs, the most inputs any SMB uses. Workings lines [ran]: *"String fuse: 1.56 × 15.62 A = 24.3672 A → 25 A (Isc 14.2 A + 10 % bifacial)"*, *"Inputs: {n}, the most any SMB uses (two strings per input)"*, *"Inputs: {s} strings per SMB, one string per input"*, *"String fuse: none in the SMB (the fuses are inline)"*, *"String fuse: none"*. Warnings, which never change status: *"The {noun} needs {n} A, above the largest size in its list ({largest} A)."*, *"The {a} A string fuse is above the module's {b} A maximum series fuse."* SMB spec [ran]: *"20 inputs, 25 A string fuses (+ve), 400 A DC disconnector, Shunt-type monitoring, RS485 / Modbus; Outdoor, IP65, ambient up to 60 °C, with inside and outside temperature sensors"*.

**Harness and fuses:** §4.8d. **Cables:** §4.8b. **Comms:** §4.8e. PLC: **SACU** and **PLC box**, 1 per ICR. RS485: **RS485 cable**, **Communication cable termination · RS485**, 8 per cable end. Always per ICR: **RTU panel**. Manual: CCTV, modem, CAT-6, RJ45. Each weather station brings 50 m RS485, 50 m conduit, 16 lugs; the ICR sensor is **Weather monitoring station · module temperature only**.

**Laying** (`SC/bom/laying_supports.py:37-39, 71-82`, `SC/takeoff/providers/laying.py:36-39`): **HDPE DWC conduit · for DC cables** (route length, conduit and above ground, one per route) and five conduit fittings (manual; only then). Above ground: **Concrete block…** ceil(route ÷ spacing) in Civil works; **UPVC clamp · above-ground laying** one per DC block; **UPVC clamp · …of LV AC cable** ceil(each AC cable ÷ spacing); DC trunk blocks, no clamps. **Ladder cable tray · for MV cable** along the MV route. **Cable tie · DC cable along the tables and trackers**, with or without cables. **Cable trench** exists but is **off by default**.

**MV network** (#235; `SC/mv_network.py`, `SC/bom/mv_joints.py:31-33`): radial. **MV breaker panel (ICOG)** one per ICR, *"{IDTs} in, 1 out"*; **HT panel · at the MCR**, incomers = feeders + USS links; **HT panel · at a USS**. Handover point: no panel. **MV cable** per schedule row, length × runs. **MV termination kit** · at the IDT outdoor; · at the MCR indoor; · at the handover point outdoor. **MV straight-through joint kit**: runs × max(0, ceil(run ÷ drum) − 1). **HT feeder panel · for the auxiliary transformer**, **Auxiliary transformer · outdoor, fed by the HT feeder** 50 kVA: 1 per MCR. **Auxiliary transformer · part of the ACCB panel** / **· part of the LT panel / ACDB** 15 kVA, **ACDB panel**, **UPS** 5 kVA 1 hour: 1 per ICR. **Power transformer** requires **Voltage ratio**, so it always starts Needs specification. **Inverter duty transformer**: *"{rating}, {mv} kV / {lv} V, {w}-winding, ONAN, Aluminium windings"*, split per rating and windings. **NIFPS** 1 per transformer. By others: §5a.

**Earthing** is in the BOM, measured from the project's design without opening its window (§10.4): pits by duty, strips by class, bolt sets 2 per jumper or bridge; rules: arrester strip 50 m each, inverter earthing cable 15 m, lugs 4. ⛔ Do not repeat "earthing is not in the BOM". **Fleet:** **Cleaning robot**, **Cleaning robot bridge** (*"{kind} bridge"*, standard / supported), only once sized. **Arrester:** **Lightning arrester, ESE** *"{level}, {mast_height} mast"*.

### 12.9 Check remarks — `DL/check_remarks.py:7, 27-35`, `tests/test_bom_files_no_checks_585.py`, `MW:8871-8896`

*"Check: {ID} · {sentence}; …"* for an open or re-confirm FAIL with a worded finding, **only in the app's BOM view**: the Plant table's item tooltip and the inspector's *"! Check: …"*. No tint, no extra row, **no exported file**. An accepted check leaves. Mapping: ICR over rating or not placed → ICR building; central overloaded → Central inverter; IDT spare winding → Inverter duty transformer; feeder over flag, no single run, drop over budget → LV AC cable; trunk too long → DC trunk cable; DC string drop → DC solar cable; run outside or under a table → Cable trench (off by default, so nowhere, §20); shadow skipped → PV module.

Files do carry **design notes**: *"Estimated: the DC strings were routed for a sample of the plot"*, *"No listed rating: …"*, the RS485 sentence, the protection warnings.

### 12.10 Exports — `MW:2799-2802, 6043-6048, 9074-9095`, `SC/bom/export/`

On **Export ▾**: **BOM · Excel workbook…**, **BOM · PDF…**. Disabled with *"Inputs changed since the last run. Regenerate first."* or *"Generate a layout first"*. Need active access. Dialogs **BOM · Excel workbook**, **BOM · PDF**; filters *"Excel Workbook (*.xlsx)"*, *"PDF Document (*.pdf)"*; default `BOM - {project} - {yyyy-mm-dd}.xlsx`, project from the `.slp` name, else the boundary file. Failure: *"Could not write {file}:\n{exc}"*. Status *"Exported {n} lines[ · {k} open items on their own sheet]"*.

**Workbook** (also S2 of the package, §13.8), sheets [ran]: **BOM**, **Block-wise**, **Open items** (if any), **Mandatory spares** (if any), **Design quantities**.

- BOM header rows: Project, Capacity (*"47.55 MWp DC · AC not designed: the AC rating comes from the inverter's OND file"*), Design, Profile (*"SolarLayout standard · v21"*), one **BOM setting** row per setting (*"Spare for discrete consumables: 3.0 % (profile 5.0 %, changed in this project)"*), Generated, Status (*"! Incomplete · 56 open items"* / *"✓ Complete · 21 lines"*), Revision + Issued on an issued package, Remark rows for notes with no line. Columns: S.No, Category, Item, Specification, Makes, Nature, Unit, Design qty, Allowance %, Order qty, Source, Basis, Remarks.
- Block-wise: Item, Specification, Unit, one per block, Shared, Total, Check (*"✓ adds up"* / *"! off by N"*).
- Open items: S.No, Item, Status, What's needed, Where to fix it.
- Design quantities: Key, What, Attributes, Unit, one per block, Shared, Total, Note. ⚠️ Its Key and Attributes columns print internal keys (§20). Do not show this sheet or describe its columns on a page.

**PDF** (`SC/bom/export/pdf.py`): every page a header (Bill of materials, project or *Untitled project*, capacity · design · profile, status badge) and footer (*"Generated … · {app}"*, *Prepared with SolarLayout*, *Page n of m*). Body: *Remark(s) not on a line*; table S.No, Item & specification, Makes, Unit, Order qty, Basis (*"incl. {a} % allowance"*), or *"No line is ready yet."*; **Mandatory spares**; **Open items** on a new page; **BOM settings** (Setting, Value used, Profile, Lines; *changed in this project*).

R1 §11 prints the same pages (*"…the same lines, quantities and open items as the BOM workbook. Nothing is recomputed here."*, `DL/report/build.py:1270-1279`).

### 12.11 What the project keeps

§4.10: the profile as used and the decisions; quantities are counted again on open. An inputs-only file resets the BOM to the default profile. On opening, *"The project's BOM section is from another version of the app, so the BOM starts fresh."*, *"Entry decision on {name} dropped: …"* (`SC/bom/saving.py`). Projects from before the rewrite: assumed to drop their line edits with that sentence; such a file was not opened in the audit. ⚠️ Line edits don't mark the project changed, so closing asks nothing (§20); tell the reader to save.

### 12.12 Line reference: built-in profile v21, every entry — `SC/resources/bom/profiles/solarlayout-standard.json:1`, `SC/resources/bom/catalog.json:1`

Generated from the profile on the real code. Format: name · unit · nature if Works · quantity rule · condition · allowance. `[off]` = off by default. `spare` = follows Spare for discrete consumables (5 %). `measured` = counted from the design; `× n` = factor; `manual` = you enter it; `factor blank` = Needs factor. Conditions are design facts in shorthand: string / central, fixed / tracker, harness, fuses, comms, laying, grid site / others, fleet sized. ⛔ The `{…}` in a spec are template fields; pages print the filled words, and never the shorthand.

**PV modules**

- PV module · Nos · measured · spec `{rated_power} module, cable leads {lead_length}`

**Inverters & DC collection**

- String inverter · Nos · measured · spec `{dc_per_inverter} DC · {ac_rating} AC` · when topology=string
- Central inverter · Nos · measured · spec `{ac_rating} AC` · when topology=central
- String monitoring box (SMB) · Nos · measured · spec `{inputs}, {fuse} string fuses (+ve), {disconnector} DC disconnector, {monitoring} monitoring, {comms}; {enclosure}` · when topology=central
- Inverter mounting stand · Nos · × 1 per string inverter · spec `{material}` · when topology=string

**Structure & foundations**

- MMS table (supply package) · Nos · measured · spec `{table}; module {module}; tilt {tilt}; clearance {clearance}; wind {wind}; {finish}` · when mounting=fixed_tilt
- Module mounting structure steel · t · factor blank kg per table · spec `{structure}, {size}, {finish}` · when mounting=fixed_tilt [off]
- Tracker (supply package) · set · measured · spec `{tracker}; module {module}; rotation {rotation}; wind {wind}; {oem}` · when mounting=tracker
- MMS pile · Nos · measured · spec `{type}, Ø {diameter}, {size} unit` · when mounting=fixed_tilt
- MMS pile · tracker posts, when not in the OEM's package · Nos · measured · spec `{type}, Ø {diameter}, {size} unit` · when mounting=tracker [off]
- Tracker control system · LS · measured · spec `{oem}` · when mounting=tracker
- Module mounting bolt set · set · × 4 per module · spec `{size}, {material}; {set}` · spare [off]
- Module earthing washer · Nos · × 4 per module · spec `{type}, {material}` · spare [off]
- MMS fasteners · t · factor blank kg per table · spec `{structure}, {size}, {finish}` · when mounting=fixed_tilt [off]

**DC cabling & connectors**

- DC solar cable · m · measured · spec `1C × {size_mm2} mm² {conductor}, {insulation}, {voltage}; {colour}`
- DC connector, male · Nos · × 1 per string · spec `{type}, {rated_voltage}` · spare
- DC connector, female · Nos · × 1 per string · spec `{type}, {rated_voltage}` · spare
- DC connector set with inline fuse · set · × 1 per string · spec `{type}, fuse {fuse_rating}` · when fuse_location=inline/both · spare
- Y connector set · set · × 1 per string pair · spec `{type}` · when harness=y, fuse_location=device/none · spare
- Y connector set with fused arms · set · × 1 per string pair · spec `{type}, fuse {fuse_rating} in each arm` · when harness=y, fuse_location=inline/both · spare
- DC trunk cable (SMB → central inverter) · m · measured · spec `1C × {size_mm2} mm² {material}, {insulation}` · when topology=central
- Cable gland, single compression · Nos · × 1 per conductor end · spec `{type}, {gland_material}, for {cores}C × {size_mm2} mm² unarmoured cable` · when topology=central · spare
- Cable lug, copper · Nos · × 1 per conductor end · spec `{type}, {finish} copper, {stud} stud, for {size_mm2} mm² {material}` · when topology=central · spare
- DC cable lug, bimetallic · Nos · × 1 per conductor end · spec `{type}, {stud} stud, for {size_mm2} mm² {material}` · when topology=central · spare
- HDPE DWC conduit · for DC cables · m · measured · spec `{grade}, {size}` · when dc_string=conduit/above_ground
- Cable tie · DC cable along the tables and trackers · Nos · measured · spec `{material}` · spare
- Conduit fitting · coupler · Nos · manual · spec `{fitting} for {size} conduit` · when dc_string=conduit/above_ground · spare
- Conduit fitting · T joint · Nos · manual · spec `{fitting} for {size} conduit` · when dc_string=conduit/above_ground · spare
- Conduit fitting · L joint · Nos · manual · spec `{fitting} for {size} conduit` · when dc_string=conduit/above_ground · spare
- Conduit fitting · 3-way · Nos · manual · spec `{fitting} for {size} conduit` · when dc_string=conduit/above_ground · spare
- Conduit fitting · 4-way · Nos · manual · spec `{fitting} for {size} conduit` · when dc_string=conduit/above_ground · spare
- UPVC clamp · above-ground laying · Nos · measured · spec `{size}, to hold {holds}` · when dc_string=above_ground · spare
- UPVC clamp · above-ground laying of LV AC cable · Nos · measured · spec `{size}, to hold {holds}` · when ac_lv=above_ground · spare

**LV AC system**

- AC combiner box (ACCB) · Nos · measured · spec `{enclosure}` · when topology=string
- LV AC cable · m · measured · spec `{cores}C × {size_mm2} mm² {material}, {insulation}, {armour} armoured, {grade}` · when topology=string
- Cable gland · Nos · × 1 per cable end · spec `{type}, {gland_material}, for {cores}C × {size_mm2} mm² armoured cable` · when topology=string · spare
- Cable lug, bimetallic · source end · Nos · × 3 per source-end cable end · spec `{type}, {stud} stud, for {size_mm2} mm² {material}` · when topology=string · spare
- Cable lug, aluminium · receiving end · Nos · × 3 per receiving-end cable end · spec `{type}, {stud} stud, for {size_mm2} mm² {material}` · when topology=string · spare
- LV AC cable · ACCB / central inverter → transformer · m · measured · spec `{cores}C × {size_mm2} mm² {material}, {insulation}, {armour} armoured, {grade}`
- Cable gland · ACCB / central inverter → transformer · Nos · × 1 per cable end · spec `{type}, {gland_material}, for {cores}C × {size_mm2} mm² armoured cable` · spare
- Cable lug, bimetallic · ACCB / central inverter → transformer, at the ACCB / inverter · Nos · × 3 per source-end cable end · spec `{type}, {stud} stud, for {size_mm2} mm² {material}` · spare
- Cable lug, aluminium · ACCB / central inverter → transformer, at the transformer · Nos · × 3 per receiving-end cable end · spec `{type}, {stud} stud, for {size_mm2} mm² {material}` · spare
- Ladder cable tray · at the ICR · m · factor blank per ICR · spec `{type}, {width}, {detail}`
- Cable tray canopy and support · at the ICR · m · factor blank per ICR · spec `{scope}`
- Ladder cable tray · for MV cable · m · measured · spec `{type}, {width}, {detail}` · when mv=tray

**MV system**

- Inverter duty transformer · Nos · measured · spec `{rating}, {mv_kv} kV / {lv_v} V, {windings}-winding, {cooling}, {winding} windings`
- MV cable · m · measured · spec `{cores}C × {size_mm2} mm² {material}, {grade}`
- MV termination kit · at the IDT · Nos · × 1 per cable end · spec `{placement}, for {cores}C × {size_mm2} mm² cable`
- MV termination kit · at the MCR · Nos · × 1 per cable end · spec `{placement}, for {cores}C × {size_mm2} mm² cable` · when grid_connection=site
- MV termination kit · at the handover point · Nos · × 1 per cable end · spec `{placement}, for {cores}C × {size_mm2} mm² cable` · when grid_connection=others
- Power transformer · Nos · measured · spec `{rating}, {ratio}, {cooling}`
- MV breaker panel (ICOG) · Nos · × 1 per ICR · spec `{type}, {configuration}`
- HT panel · at the MCR · Nos · × 1 per MCR · spec `{type}, {configuration}`
- HT panel · at a USS · Nos · × 1 per USS · spec `{type}, {configuration}`
- HT feeder panel · for the auxiliary transformer · Nos · × 1 per MCR · spec `{type}`
- MV straight-through joint kit · Nos · × 1 per joint · spec `{grade}, for {cores}C × {size_mm2} mm² cable`
- Metering yard · set · manual · spec `{scope}`

**Earthing & lightning protection**

- Lightning arrester, ESE · Nos · measured · spec `{level}, {mast_height} mast`
- Earth pit · for arresters · Nos · measured · spec `{electrode}; {chamber}; {compound}`
- Earthing strip · for arresters · m · × 50 per arrester · spec `{strip}`
- Earthing cable · for string inverters · m · × 15 per string inverter · spec `{cable}` · when topology=string
- Earth pit · for string inverters · Nos · measured · spec `{electrode}; {chamber}; {compound}` · when topology=string
- Earth pit · for transformers (body) · Nos · measured · spec `{electrode}; {chamber}; {compound}`
- Earth pit · for other equipment at the ICR · Nos · measured · spec `{electrode}; {chamber}; {compound}`
- Earth pit · for other equipment at the MCR · Nos · measured · spec `{electrode}; {chamber}; {compound}`
- Earth pit · for the USSs · Nos · measured · spec `{electrode}; {chamber}; {compound}`
- Earth pit · to meet the plant grid target · Nos · measured · spec `{electrode}; {chamber}; {compound}`
- Earth pit · for the fence, poles and other equipment · Nos · measured · spec `{electrode}; {chamber}; {compound}`
- Earthing strip · main earthing ring · m · measured · spec `{size} mm {material} flat`
- Earth pit · for the main earthing ring · Nos · measured · spec `{electrode}; {chamber}; {compound}`
- Earthing strip · array mesh · m · measured · spec `{size} mm {material} flat`
- Earthing strip · in the cable trenches · m · measured · spec `{size} mm {material} flat`
- Earthing strip · round the ICRs, MCR and USSs · m · measured · spec `{size} mm {material} flat` · when grid_connection=site
- Earthing strip · round the ICRs · m · measured · spec `{size} mm {material} flat` · when grid_connection=others
- Earthing strip · for the fence, poles and other equipment · m · measured · spec `{size} mm {material} flat`
- Earthing strip · copper · m · manual · spec `{strip}`
- Earthing bolt set · array mesh jumpers · set · × 2 per jumper or bridge · spec `{size}, {material}; {set}` · spare
- Earthing cable lug · for string inverters · Nos · × 4 per string inverter · spec `{type}, {material}, for {size} earthing cable` · when topology=string · spare
- Earthing cable · for central inverters · m · factor blank per central inverter · spec `{cable}` · when topology=central
- Earthing cable lug · for central inverters · Nos · factor blank per central inverter · spec `{type}, {material}, for {size} earthing cable` · when topology=central · spare
- Earthing cable · for SACU, PLC box and SMB · m · manual · spec `{cable}`
- Earthing cable lug · for SACU, PLC box and SMB · Nos · manual · spec `{type}, {material}, for {size} earthing cable` · spare

**Communication, SCADA & security**

- SACU (smart array control unit) · Nos · × 1 per ICR block · spec `{enclosure}` · when comms=plc
- CCTV system · set · manual · spec `{scope}`
- Weather monitoring station · set · × 1 at the MCR · spec `{sensors}` · when grid_connection=site
- Weather monitoring station · on site · set · × 1 on site · spec `{sensors}` · when grid_connection=others
- PLC box · Nos · × 1 per ICR · spec `{rating}, {feeders}` · when comms=plc
- RTU panel · set · × 1 per ICR · spec `{switch}; {scope}`
- Modem for remote monitoring · set · manual · spec `{scope}`
- RS485 cable · m · measured · spec `{construction}` · when comms=rs485
- RS485 cable · to the weather stations · m · × 50 per weather station · spec `{construction}`
- CAT-6 cable · m · manual · spec `{construction}`
- Optical fibre cable · m · measured · spec `{construction}`
- Conduit for communication cable · m · measured · spec `{construction}`
- Conduit for communication cable · for the weather station links · m · × 50 per weather station · spec `{construction}`
- Communication cable termination · RS485 · Nos · × 8 per cable end (one per core of the 4-pair cable) · spec `{kind} for {cable}` · when comms=rs485 · spare
- Communication cable termination · RS485, to the weather stations · Nos · × 16 per weather station (8 at each end) · spec `{kind} for {cable}` · spare
- Communication cable termination · CAT-6 · Nos · manual · spec `{kind} for {cable}` · spare
- Weather monitoring station · module temperature only · set · × 1 per ICR · spec `{sensors}`

**Civil works**

- ICR building · Nos · measured · spec `{construction}, {footprint}`
- Fence · boundary · m · measured · spec `{type}`
- Gate · main · Nos · manual · spec `{width} wide`
- Road · perimeter · m · Works · measured · spec `{width}, {surface}` [off]
- Cable trench · m · Works · measured · spec `{carries} cables, shared paths counted once` [off]
- Equipment foundation · for string inverters · Nos · Works · × 1 per string inverter · spec `{type}` · when topology=string [off]
- Equipment foundation · for transformers · Nos · Works · × 1 per transformer · spec `{type}` [off]
- Hume pipe · road crossings · Nos · manual · spec `Ø {diameter}, {length} long`
- MCR building · Nos · measured · spec `{construction}, {footprint}`
- MCR furniture and air conditioning · set · manual · spec `{scope}` · when grid_connection=site
- MCR wiring and lighting · LS · Works · manual · spec `{scope}` · when grid_connection=site [off]
- Security cabin · set · manual · spec `{construction}, {size}`
- Fence · ICR yard · m · × 120 per ICR · spec `{type}`
- Gate · ICR yard · Nos · × 2 per ICR · spec `{width} wide`
- Gravel · ICR yard · m3 · × 40 per ICR · spec `{size}`
- Road · internal · m · Works · manual · spec `{width}, {surface}` [off]
- Road · approach · m · Works · manual · spec `{width}, {surface}` [off]
- Drain · m · Works · manual · spec `{type}` [off]
- Concrete block for above-ground laying · DC conduit, above ground · Nos · measured · spec `{size}, {spacing}` · when dc_string=above_ground
- Concrete block for above-ground laying · LV AC cable, above ground · Nos · measured · spec `{size}, {spacing}` · when ac_lv=above_ground
- Concrete block for above-ground laying · DC trunk cable, above ground · Nos · measured · spec `{size}, {spacing}` · when dc_trunk=above_ground
- Equipment foundation · for central inverters · Nos · Works · × 1 per central inverter · spec `{type}` · when topology=central [off]
- Equipment foundation · for SMBs · Nos · Works · × 1 per SMB · spec `{type}` · when topology=central [off]
- Equipment foundation · for ACCBs · Nos · Works · × 1 per ACCB · spec `{type}` · when topology=string [off]
- Equipment foundation · for ACDB panels · Nos · Works · × 1 per ICR · spec `{type}` [off]
- Equipment foundation · for ICOG panels · Nos · Works · × 1 per ICR · spec `{type}` [off]
- Equipment foundation · for NIFPS · Nos · Works · × 1 per IDT · spec `{type}` [off]
- Equipment foundation · for PLC boxes · Nos · Works · × 1 per ICR · spec `{type}` · when comms=plc [off]
- Equipment foundation · for the HT panel · Nos · Works · × 1 per HT panel · spec `{type}` [off]

**Aux power & lighting**

- Street light (perimeter) · set · measured · spec `{pole_height} {pole} pole, {fixture}, {accessories}`
- ACDB panel · Nos · × 1 per ICR · spec `{rating}, {type}`
- Auxiliary transformer · part of the ACCB panel · Nos · × 1 per ICR · spec `{rating}` · when topology=string
- Auxiliary transformer · part of the LT panel / ACDB · Nos · × 1 per ICR · spec `{rating}` · when topology=central
- Auxiliary transformer · outdoor, fed by the HT feeder · Nos · × 1 per MCR · spec `{rating}`
- UPS · Nos · × 1 per ICR · spec `{rating}, {backup} backup`
- Equipment-yard light · equipment yard · set · factor blank per ICR · spec `{pole} pole, {fixture}, {accessories}`
- Aux power cable · 3C × 25 mm² Al · m · manual · spec `{cores}C × {size_mm2} mm² {conductor}, {construction}, {grade}`
- Aux power cable · 4C × 10 mm² Cu · m · manual · spec `{cores}C × {size_mm2} mm² {conductor}, {construction}, {grade}`
- Aux power cable · 4C × 16 mm² Al · m · manual · spec `{cores}C × {size_mm2} mm² {conductor}, {construction}, {grade}`
- Aux power cable · 4C × 35 mm² Al · m · manual · spec `{cores}C × {size_mm2} mm² {conductor}, {construction}, {grade}`
- Aux power cable · 2C × 4 mm² Cu · m · manual · spec `{cores}C × {size_mm2} mm² {conductor}, {construction}, {grade}`
- Aux power cable · 2C × 2.5 mm² Cu · m · manual · spec `{cores}C × {size_mm2} mm² {conductor}, {construction}, {grade}`
- Control cable · 19C × 1.5 mm² · m · manual · spec `{cores}C × {size_mm2} mm² {conductor}, {construction}, {grade}`
- Control cable · NIFPS to ICOG panel · m · manual · spec `{cores}C × {size_mm2} mm² {conductor}, {construction}, {grade}`
- Control cable · 2C × 1.5 mm² · m · manual · spec `{cores}C × {size_mm2} mm² {conductor}, {construction}, {grade}`
- Gland for aux and control cable · 2C × 1.5 mm² · Nos · manual · spec `{type}, {gland_material}, for {cores}C × {size_mm2} mm² cable` · spare
- Gland for aux and control cable · 19C × 1.5 mm² · Nos · manual · spec `{type}, {gland_material}, for {cores}C × {size_mm2} mm² cable` · spare
- Gland for aux and control cable · 2C × 2.5 mm² · Nos · manual · spec `{type}, {gland_material}, for {cores}C × {size_mm2} mm² cable` · spare
- Gland for aux and control cable · 2C × 4 mm² · Nos · manual · spec `{type}, {gland_material}, for {cores}C × {size_mm2} mm² cable` · spare
- Gland for aux and control cable · 3C × 25 mm² · Nos · manual · spec `{type}, {gland_material}, for {cores}C × {size_mm2} mm² cable` · spare
- Gland for aux and control cable · 4C × 10 mm² · Nos · manual · spec `{type}, {gland_material}, for {cores}C × {size_mm2} mm² cable` · spare
- Gland for aux and control cable · 4C × 16 mm² · Nos · manual · spec `{type}, {gland_material}, for {cores}C × {size_mm2} mm² cable` · spare
- Lug for aux and control cable · pin, 1.5 mm² · Nos · manual · spec `{type}, {material}, for {size_mm2} mm² {cable}` · spare
- Lug for aux and control cable · bimetallic pin, 2.5 mm² · Nos · manual · spec `{type}, {material}, for {size_mm2} mm² {cable}` · spare
- Lug for aux and control cable · bimetallic ring, 2.5 mm² · Nos · manual · spec `{type}, {material}, for {size_mm2} mm² {cable}` · spare
- Lug for aux and control cable · bimetallic pin, 4 mm² · Nos · manual · spec `{type}, {material}, for {size_mm2} mm² {cable}` · spare
- Lug for aux and control cable · bimetallic ring, 10 mm² · Nos · manual · spec `{type}, {material}, for {size_mm2} mm² {cable}` · spare
- Lug for aux and control cable · bimetallic ring, 16 mm² · Nos · manual · spec `{type}, {material}, for {size_mm2} mm² {cable}` · spare
- Lug for aux and control cable · bimetallic ring, 25 mm² · Nos · manual · spec `{type}, {material}, for {size_mm2} mm² {cable}` · spare

**O&M & water**

- Cleaning robot · Nos · measured · spec `{type}` · when robotic_cleaning=sized
- Cleaning robot bridge · Nos · measured · spec `{kind} bridge` · when robotic_cleaning=sized
- Water tank · module cleaning · set · manual · spec `{type}, {capacity}`
- Water tank · MCR · set · manual · spec `{type}, {capacity}` · when grid_connection=site
- Borewell and RO plant · set · manual · spec `{scope}`

**Services**

- Installation of structure and modules · MWp · Works · measured · spec `{scope}` [off]
- Installation and commissioning, DC side · MWp · Works · measured · spec `{scope}` [off]
- Cable termination works · communication cables · LS · Works · manual · spec `{scope}` [off]

**Safety & fire**

- Fire extinguisher · set · manual · spec `{type}`
- Fire bucket stand · set · manual · spec `{scope}`
- First-aid box · Nos · manual · spec `{scope}`
- Danger and notice board · Nos · manual · spec `{scope}`
- Safety kit · set · manual · spec `{scope}`
- NIFPS (nitrogen injection fire protection) · set · × 1 per transformer · spec `{scope}`

**Mandatory spares**

- Mandatory spares · LS · manual · spec `{scope}`

## 13. Exports (#431, #439, #441) — `APP/export_deliverables_dialog.py`, `DL/package.py`

⛔ **Gone:** Export KMZ and *Export KMZ — location unknown*, Export DXF, Export ICR-Block DXF, Export ICR-Block PDF, Export Cable Schedule (Excel), Export PDF (with Piles), the pile window's Export to Excel…, the block window's PDF…, and **the Word report** (Export Detailed Project Report). The modules are deleted (#439, #491). `SC/cable_schedule.py` remains as a sizing engine with no workbook of its own.

### 13.1 The Export menu — `MW:2774-2810, 6024-6065`

**Export ▾**, in the view header beside Save project; tooltip *"Export the generated layout: the deliverables package, the BOM's files, the earthing layout and an image"*. In order ([ran]):

| Item | Enabled | Tooltip |
|---|---|---|
| amber row *"Inputs changed since the last run. Regenerate first."* | visible only while out of date | |
| **Export deliverables…** | any generated layout, **even out of date** | *"The drawing set, the design report, the schedules, the bill of materials, the KMZ and a manifest, into one folder."* / *"Generate a layout first"* |
| **BOM · Excel workbook…**, **BOM · PDF…** | the BOM has a plant, not out of date | §12.10 |
| **Earthing layout (DXF)…** | a layout, not out of date | dialog **Export earthing layout**, `Earthing_Layout.dxf`, status *"Earthing layout saved: <name>"*; box **Generate first** *"Generate a layout first, then export its earthing."*; *"A layout or cable run is in progress. Export when it finishes."*; errors **Export failed** (`MW:10636-10680`) |
| **Export Image (PNG)** | a layout, not out of date | *"Save the plot as it is on screen to an image file."*; access checked (`MW:6057-6065`) |

Exports elsewhere: the Earthing Design window's three (§10.4); the SLD view's **PDF…**, **DWG…** (§11.6); **Export TMY data CSV** (§9); Robot count from DXF's **Export PDF…** (§10.3); the expanded view's Save. Free without access by design (`tests/test_export_gates_static.py:22-27`): the project, a BOM profile file, the clean KMZ copy, a company file.

### 13.2 The Export deliverables window — `APP/export_deliverables_dialog.py`, `MW:9097-9115, 13608-13724`

Title **Export deliverables**, width 1040, **not modal**; a second ask raises it. It needs active access when asked for, not again at the write (`MW:9104`). No layout: *"Generate a layout first."* Context strip *"<project name or file stem or This plant> · <n.nn> MWp · <Fixed tilt|Tracker> · <String|Central inverter>"*.

**Left column.** **Preset** (segmented, `DL/package.py:41-43`): **Full set** (default) · **Drawings only** (drawing set PDF and DXF) · **Report only** (report, schedules) · **KMZ only**.

**Deliverables**, a tick per row, in order; each with a count, file name and a note ([ran], no project code; *Counting…* while counting; a row that can't go is unticked and disabled):

| Row | Count | File | Can't go |
|---|---|---|---|
| Drawing set | *"13 sheets · PDF"*, note with D4 *"With piles.csv: every pile's coordinates, for the pile layout sheets (D4)"* | `PROJ-E-DS-001.pdf` | *"The drawing set could not be built: <first line>"* |
| Drawing set (DXF) | *"13 layouts · DXF"* | `PROJ-E-DS-001.dxf` | same |
| Design report | *"12 sections · PDF"* | `PROJ-G-DR-001.pdf` | |
| Schedules workbook | *"8 sheets · Excel"* | `PROJ-G-S1-001.xlsx` | |
| Bill of materials | *"35 lines · Excel"*, note *"Incomplete: 76 open items, on their own sheet"* | `PROJ-G-S2-001.xlsx` | *"The bill of materials is counted after Generate."* |
| KMZ | *"4 blocks · KMZ"* | `PROJ-G-K1-001.kmz` | *"The site's location is unknown (layout only), so a KMZ would put the plant in the wrong place."* (`GR:51`) |
| Manifest | *JSON* | `manifest.json` | always ticked, never a choice |

**Revisions** card, once something was issued: *"A · For review · 5 Nov 2026 · AB · Tender set"* and *"Each issued revision is kept in the project file with its design, 719 KB so far."* (⚠️ the figure is uncompressed; say "grows the project file", no figure).

**Project details** card. Empty: *"Not filled in"*, *"The title blocks print placeholders: project name, code, client, location, drawn, checked, approved"*, **Fill in ▾**. Filled: *"<name> · <code>"*, *"<client> · <location> · drawn X · checked — · approved —"*, **Edit ▾**; open: **Done ▴**. Fields: Project name, Project code, Client, Developer (*optional*), Location, Drawn, Checked, Approved (the last three max 8 characters). Written on Enter or leaving the field; marks the project changed; never makes the layout out of date.

**Company** card. None: *"Not set"*, *"Every title block and the report's cover print "Company not set""*, **Choose ▾**. Set: name, *"<address> · initials XY · <D1 drawing number>"*, **Change ▾**. Menu: the saved companies, **Edit this company…**, **New company…**, **Manage companies…**.

**Save into**: a read-only path, **Browse…** (*"Save the package into"*), under it *"Creates PROJ · Rev A · DRAFT · 2026-11-05"*. Default `Documents/SolarLayout/Exports`; the last folder is saved in the project.

**Right column.** Verdict banner; Issue card; the checks list (§6.7). A Fix for project details opens the form here; any other Fix or Show on layout closes the dialog and goes to the window. While writing, the checks give way to the progress bar and one line per file.

| State | Banner | Primary | Secondary | Reason |
|---|---|---|---|---|
| Out of date | **The layout is out of date** / *"The checks and the package read the last run, so export waits for Generate."* | Export draft package, disabled | Close | *"Inputs changed since the last run. Regenerate first."* |
| Cables routed | **Cables are being routed** / *"The window shows the new design; the package waits for its cables, then counts it."* | same | Close | *"Cables are being routed. Export waits for the run."* |
| Checks running | same banner (§20) | same | Close | *"The design checks are running. Export waits for them."* |
| Current, never saved | *"Draft: …"* | Issue A for review, **disabled** | Export draft package | *"Save the project first: the issued revision is kept in it."* |
| Current, saved | *"Draft: 6 checks failed, 9 can't be checked yet"* [ran] (warn); *"Draft: every check passed"*, *", 2 accepted"* (good); before a report *"Draft: the checks have not run yet"*; after an issue *"Draft after A: "* | Issue A for review, with the split **▾** | Export draft package | |
| No tick | | disabled | | *"Tick a deliverable to export."* |
| Writing | *"Writing the package…"* / *"Into <folder>"*, *"3 of 7 files · design report"* | disabled | Cancel, *"Cancelling…"* | |
| Done | *"Package written: 7 files, 2.9 MB"* / folder, *"In <parent>"* | Open folder | Close | |
| Count failed | **The deliverables could not be counted** | | | |
| Write failed | **The package could not be written** | | | |

Detail in the ready states: *"The package exports now, stamped DRAFT on every sheet and page. Issuing stamps every sheet and page, keeps this design in the project as A, and adds the row to the revision history."* Footer: *"Writes 7 files · AUD · Rev B · For review · 2026-11-05 · then saves the project"*, *"Writes 7 files into a new folder"*; writing *"The app stays usable; this runs in the background"*. Enter never writes.

**Writing:** one snapshot, off the UI thread; lines *"○ <title> · waiting"*, *"● <title> · writing"*, *"✓ <file> · <title> · <detail> · <size>"*; status *"Package written: 7 files into <folder>"*. **Once written the dialog is finished:** another package means closing and reopening. **Cancel** is checked between files; the folder is removed: *"Cancelled: nothing was written"* / *"The half-written folder was removed."* Close, Esc and the close box during a write act as Cancel. A layout change during a write stops it: *"The layout changed while the package was written. Nothing was kept: export again."*; a check limit or energy run: *"A check limit or the energy changed while the package was written. Nothing was kept: export again."*

**Folder** (`DL/package.py:88-119`): *"<code or PROJ> · Rev <R> · DRAFT · <yyyy-mm-dd>"* or, issued, *"<code> · Rev A · For review · <date>"*; characters Windows refuses become `-`; a second one the same day gets *" (2)"*, never overwritten. A cancel or failure leaves no folder.

**File names** follow the company's pattern; default `{PROJ}-{DISC}-{TYPE}-{SEQ}` (`DL/identity.py:33`, `DL/sheets/context.py:22-28`); `{SEQ}` is three digits within the type; no project code prints `PROJ`.

| Series | DISC | TYPE | Title |
|---|---|---|---|
| D0 | G | CV | Cover and drawing register |
| D1 | E | GA | General arrangement |
| D2 | E | BL | Block layout |
| D4 | C | PL | Pile layout |
| D5 | E | SL | Single line diagram |
| D6 | E | ER | Earthing layout |
| Drawing set file | E | DS | |
| R1 | G | DR | Design report |
| S1, S2, K1 | G | S1, S2, K1 | |

### 13.3 Issuing a revision (#441, #585) — `APP/issue_card.py`, `DL/revisions.py:69-104`, `APP/export_deliverables_dialog.py:551-584, 812-842, 942-967`

**No check gates anything** (#585): the Issue card and issuing depend only on a current layout, no run in progress and a saved project. [ran] issued with 6 failed and 9 can't-check. **The package carries no design check**; S2's Block-wise **Check** is a sum check, not a design check.

**Issue card**, caption **Issue**: **Purpose** For review (default) · For approval · For construction; **Revision** *"A · 5 Nov 2026"*, read only; **Description**, max 120, placeholder *"What this issue is for, in one line · "Tender set" · "Client comments of 12 Oct applied""*, optional; **Issued by**, max 8, fills from the company's initials, hint *"From the company's initials; printed as Drawn when Drawn is empty"*; empty: *"Initials are needed."* Split **▾**: *"Issue A for review"*, *"Issue A for approval"*, *"Issue A for construction"*; choosing one sets the purpose and issues at once.

**Schemes** (`DL/identity.py:36-38, 409-411`): **A, B, C…** (default): one past the newest; first A; Z is the end. **P01 / C01**: review and approval count P, construction counts C; after C01 and P01, review gives P02; the menu reads *"Issue P01 for review"*, *"Issue C01 for construction"*. Changing scheme after an A: letters on record stay; next is P01. A draft never uses up a revision.

**What an issue does:** (1) saves the project, a failure stops with **The project could not be saved**; (2) writes the package with the revision and purpose, banner *"Issuing A for review"* / *"Writing <name>. The app stays usable."*; (3) adds a record and saves again, line *"✓ A recorded in the project"*. Result [ran]: *"A issued for review · 5 Nov 2026 · AC"* / *"Saved in probe.slp. The next change to the design starts B · DRAFT."*; status *"Rev A issued for review: 7 files into <folder>"*. Failures: *"A was written but could not be recorded in the project"*; *"A is recorded, but the project could not be saved"* / *"<reason>. Save it with File ▸ Save project to keep A."*

**The record** (`DL/revisions.py:95-104`): revision, purpose, date, initials, description, drawn, checked, approved, the manifest, and **the frozen snapshot**. No screen opens it and nothing rebuilds a package from it; say "kept", not "restorable".

**Where the issue shows** [ran]: every title block REV A and STATUS FOR REVIEW (*FOR APPROVAL*, *FOR CONSTRUCTION*); D0's band *"FOR REVIEW"* / *"Issued 5 Nov 2026 by AC."*; D0's and R1 §12.1's revision history (Rev · Date · Purpose · Description · Drawn · Checked · Approved); R1 cover and footer; S1 README rows Revision, Status, Issued; S2 header rows; the manifest; the folder name. The description reaches the history and the manifest, never a folder name.

**A draft** prints REV **—**, STATUS DRAFT, R1 footer *"Rev — · DRAFT"*, D0's band *"Draft · not issued"* / *"Not for construction."* (`DL/sheets/context.py:122-124`, `DL/sheets/d0_register.py:179-186`). ⚠️ Its folder name says Rev A (§20): describe a draft as stamped DRAFT, with no revision on its sheets.

### 13.3a File ▸ Company… (#442) — `APP/company_dialog.py`, `DL/identity.py:33-74, 215-232, 369-411`, `DL/company_preview.py:37-46`

File menu, before Advanced settings…; tooltip *"Your company's name, logo and drawing-number pattern for the title blocks; saved on this computer, a copy in each project."* Also from the export dialog's Company menu. Modal, title **Company**, width 1000; context *"This project uses: <name>"* / *"This project uses: no company"*.

- **Your companies** list: ★ the default; sub-lines *"Default for new projects · in this project"*, *"Default for new projects"*, *"In this project"*, *"Logo file missing"*, else *"A, B, C… · International"*. A project's company not saved here shows first, italic, read-only: *"In this project · not on this computer"*. **New**, **Import…**.
- Form: **Name** (*"Required: printed on every title block"*) · **Logo** (*"PNG or SVG"*, **Choose…**, **Remove**) · **Address line** (*"One line, under the name"*) · **Drawing no.** (legend *"{PROJ} project code · {DISC} discipline · {TYPE} drawing type · {SEQ} sheet number"*) · **Revisions** (A, B, C… | P01 / C01) · **Digit grouping** (International | Indian; *"DC string cable prints 1,65,992 m"*) · **Default initials** (*"“Drawn” when the project details leave it blank"*) · tick **Default for new projects** · **Export…**, **Delete**.
- Pattern: tokens `{PROJ} {DISC} {TYPE} {SEQ}`, each at most once, `{SEQ}` required, the rest letters, digits, spaces and `- _ . /`. Messages: *"{X} is not a token; use {PROJ}, {DISC}, {TYPE} or {SEQ}."*, *"{X} appears more than once."*, *"A brace is not closed."*, *"The pattern needs {SEQ}, the sheet's number."*
- Verdict: **No name yet** / *"Title blocks print "Company not set" until it has one."*; **The pattern can't number sheets** / *"Drawing numbers and file names fall back to the default pattern until it is fixed."*; **Ready, without a logo** / *"Title blocks print the name and address only; check C-05 lists the logo as missing."*; **Ready for title blocks** / *"Every field C-05 checks is filled in."* Then **Title block, as it prints (D1)**, tiles **Drawing set file**, **Design report**.
- Buttons: **Close**, **Save**, primary **Use in this project** (disabled *"This project already uses it"*), **Save and use in this project** (disabled *"Give the company a name first"*, *"Fix the drawing-number pattern first"*), **Save to my companies**.
- Notices in place, no boxes: *"Discard the changes to X?"*, *"Delete X from this computer? Projects that use it keep their copy."*, *"X is saved on this computer already. Replace it with the one in <file>?"*, *"The logo must be a PNG or SVG file."*, *"A company named 'X' is saved already."*, *"Not an exported company."*, *"Exported to <name>."* Filter *Company (*.company.json)*.
- Storage: `~/SolarLayout_Company/<slug>.company.json` with its logo beside it; an export is one file.
- **A project keeps its own copy**: editing a saved company doesn't change a project until it is chosen again. New projects and a project opened without a company take the default: *"Company set to X, the default"*; *"The default company 'X' is no longer on this computer."* Applying: *"Company: X"*, marks the project changed, re-runs checks (`MW:3771-3775, 3989-3992, 8954-9007`).

### 13.4 The drawing set, PDF and DXF twin — `DL/drawing_set.py:33-57`, `DL/render/`

Order **D0, D1 (and continuation), D2, D4, D6, D5**, numbered through, one PDF, a bookmark a sheet (*"4 · D2 · Block B01 — layout"*). A series that can't be drawn is left out and D0 says so: *"Not in this set: D4, Pile layout. Piles are placed from the pile pattern, and none is defined."*; others *"No table has piles."*, *"The plant has no ICR blocks."*, *"The snapshot has no earthing design."* ⛔ D3 (cable routing) does not exist.

| Series | Sheets | Paper / scale | Holds |
|---|---|---|---|
| D0 | 1 | A3, no scale | Cover: project, client, developer, location with coordinates, coordinate system and how the location is known (*from the survey coordinates* / *placed by the user* / *location not known*), MWp DC, MW inverter AC, DC : AC; status band; revision history; *In this package*; site key plan; drawing register (Sheet · Drawing no. · Title · Size · Scale · Rev); series summary |
| D1 | 1, plus *"General arrangement — panel continued"* (A3, *As shown*) when the panel overflows | A1, or A0 when A1 would need 1:10000 or smaller (`DL/sheets/compose.py:29-30`) | *"General arrangement — all blocks"*; Block schedule; DESIGN BASIS box (*"Workings: R1 §3 Design basis."*); ELECTRICAL CHAIN; up to three typical details; lettered notes (*"Not on this sheet: table IDs, inverter tags, DC routes, piles and arrester protection circles."*) |
| D2 | one per block, split into tiles with match lines when large (*"Block P2-B01 — layout · tile 1 of 2"*) | A3, one scale for the set | Table IDs or row ranges, inverter zones, the block's data; *"Not on this sheet: piles, DC string routes and cable sizes (see the cable schedule)."* |
| D4 | *Typical pile pattern* then one per D2 tile; only with a pile pattern | A3 | Pattern dimensioned at 1:150 for full and half units, *PILE DATA*; block sheets: setting-out points SP1, SP2, SP3 with ID, E, N, lat, lon; a dot per pile; *"Every pile's coordinates, by its ID: piles.csv in this package…"* |
| D6 | one per D2 tile | A3 | Earthing strip m, Earth pits, Conductors, Earth grid (IEC Ω, target), Earth grid check; legend by duty; *"Soil resistivity not measured: checked once a value is entered"* |
| D5 | overview *"Single line diagram — plant overview"* plus *"typical block A"…* per kind; tables on sheets of their own when they overflow | A3 / A1 / A0 by ICR count, NTS | Grid to each ICR's PV array; a rating on every device; *"Not designed"* or *"by others"* where so; *"A rating marked Not designed needs the inverter's datasheet."* The automatic diagram (§11.6) |

Every title block: company, logo, address, project, client, location, title, drawing no., rev, status, scale, size, sheet *"1 of 13"*, drawn, checked, approved, date, basis *"Snapshot 6eba-66bc · source sample-demo.kmz (sha256 c258cb45)"*, CRS, *"Prepared with SolarLayout"* [ran].

**DXF twin** (`DL/render/dxf.py:1-21`) [ran]: R2010, metres, Arial. **Model space holds the design once**, in the drawing's own coordinates (UTM minus the location's offset); **one paper layout per sheet, named by its drawing number**, viewports at the sheet's scale with other layers frozen. Layers (written only when used) use standard names, e.g. `C-SITE-BNDY`, `C-ROAD-PERI`, `C-SITE-EXCL-OBST|TLCR|WATR`, `C-BLDG`, `E-PV-TABL`, `E-PV-ZONE`, `E-INVR`, `E-IDT`, `E-ERTH-*`, `E-SLD-*`, `G-ANNO-*`, `G-BLCK-…` (`DL/sheets/symbology.py`). Tables are blocks without attributes, one per shape (`PV-TABLE-32180x4728`); devices are blocks with ID, block, strings, kWp; buildings carry their ID; piles a pattern block per table type. Table IDs not written. No logo. GEODATA when located (`DL/render/dxf_geo.py`). Sheets name `grayscale.ctb`. Same snapshot and date give the same bytes. ⛔ The old layers (`BOUNDARY`, `TABLES`, `ICR`…) are gone. Unsure, found by grep only, no sketched project read back: sketch annotations, dimensions and user layers do not reach the twin (only hand-drawn cable routes do; `DL/providers/geometry.py:96`), and street lights and contours are absent.

### 13.5 R1 the design report — `DL/report/build.py`, `DL/render/report_pdf.py`

A4 PDF; bookmarks Cover then twelve sections [ran]: **1** Summary · **2** Site (2.1 Location, 2.2 Boundary, 2.3 Land account) · **3** Design basis (3.1 Module, 3.2 Inverter, 3.3 Table configuration, 3.4 Pitch, tilt and string sizing: the working, 3.5 Design settings, stated as defaults, 3.6 Design limits and their sources) · **4** Plant configuration (4.1 Inverter variants, 4.2 Grouping, 4.3 MV collection and evacuation) · **5** Block schedule · **6** Cables and trenches (6.1 Totals by class, 6.2 Voltage drop, 6.3 Longest feeders or DC trunks) · **7** Civil and other systems · **8** Earthing (8.1 Inputs, 8.2 Conductor sizing, 8.3 Earth grid check, 8.4 Quantities) · **9** Energy (9.1 Basis, 9.2 Monthly, 9.3 Losses) · **10** Assumptions, exclusions and open items (10.1, 10.2) · **11** Bill of materials · **12** Revision history and drawing register (12.1, 12.2, 12.3 In this package) (`DL/report/build.py:50-53`).

- *Not designed* in words wherever an input is missing: no OND gives *"Not designed"* for inverter AC and DC : AC.
- No energy: section 9 stays and reads *"Energy was not calculated for this design. This section prints when the yield has been run; its figures are indicative and are not a bankable yield assessment."* ⛔ Never use *bankable* in a page except inside that quotation (Writing guide).
- §10.2 fixed exclusions: *"Costs, CAPEX and LCOE."*, *"A bankable yield assessment (section 9 is indicative)."*, *"Structural design of the mounting structure and the buildings."*
- A central plant speaks its own terms (#587): *table to SMB*, *LV, central inverter to IDT*, 6.3 *Longest DC trunks*, 4.2 *Grouping: SMB → central inverter → IDT → MV*.
- PDF metadata: title *"<project> · Design report"*, subject *"Design report · <number>"*, author the company.

### 13.6 Your SLD and the package

§11.6: D5 is automatic; your edited or traced SLD leaves only through its own **PDF…** / **DWG…**.

### 13.7 S1 the schedules workbook (#433) — `DL/schedules.py:26-27, 49`, `DL/render/schedules_xlsx.py`

Eight sheets, always all present: README · Blocks · Tables · Inverters · Cables · Trenches · Piles · Area account; frozen header, autofilter, numbers as numbers, no merged cells. **One workbook for the plant, no sheet per ICR block.** ⛔ It replaces the Cable Schedule workbook: its per-sheet basis and LV-drop lines no longer print. Columns [ran]:

| Sheet | Columns |
|---|---|
| Blocks | Block, Plot, ICR, Tables, Strings, Modules, DC (kWp), Devices, ACCBs, IDTs, IDT rating (kVA), Feeds, Feeder runs, Feeder length (m) |
| Tables | Table, Plot, Block, Device, Unit, Strings, Modules, Easting (m), Northing (m), Latitude, Longitude, Piles |
| Inverters | Device, Kind, Plot, Block, ICR, ACCB, Tables, Strings, DC (kWp), AC (kVA), DC:AC, Feeder circuit, Feeder length (m), Feeder size (mm²), Feeder drop (%), Flag |
| Cables | Circuit, Class, Plot, Block, From, To, Strings, Cores, Runs, Size (mm²), Length (m), Cable (m), Before Y (m), Before Y size (mm²), Current (A), Drop (%), Flag. Classes: DC string, AC feeder, DC trunk, LV to IDT, MV |
| Trenches | Plot, Class, Laying, Routes, Drawn by hand, Route length (m), Trench length (m), DC drawn sample |
| Piles | Plot, Block, Unit, Tables, Piles per unit, Piles |
| Area account | Plot, Item, Area (m²), Area (ha), Net (m²), Length (m), Count, Note; rows per plot then Plant: Gross site, each exclusion, Layout area, Usable for tables, Under tables, Coverage, Fence, Closure |
| README | Project, Code, Client, Revision, Status, (Issued), Company, Snapshot ID, Schema, App version, Written, Boundary file, Coordinates, Latitude/longitude, Piles.csv, then a description of each sheet and column; an empty sheet's reason |

Empty-sheet reasons: *"No cable routes were drawn: tick Calculate cables and Generate"*, *"No table carries a pile pattern."*, *"The plant has no ICR blocks."*, *"The plant has no cable circuits."*, *"The plant has no inverters or SMBs."*, *"The plant has no tables."*

### 13.8 S2 the BOM workbook

The BOM's own workbook (§12.10) under its package name, from the session at that moment, with Revision and Issued rows when issued. `DL/package.py:41-49, 311`.

### 13.9 K1 the KMZ (#438) — `DL/render/kmz.py`

From the snapshot, at the real location; one `doc.kml` in the zip. Document name *"AUD · K1 · 2026-11-05"*, with a plant pop-up: DC MWp, AC MW, Tables (full + half), Modules, Strings, Inverters, ICRs, Arresters, Area ha, Snapshot (`DL/render/kmz.py:62-64, 192-210`). Folders [ran]:

- **Site** (a polygon per plot), **Perimeter road**, **Exclusions** ▸ Water, Obstacle, Transmission-line corridor, Road, Steep ground, Drawn obstruction (only those present).
- **Blocks** ▸ a placemark *B01* (outline; pop-up Tables (full + half), Modules, Strings, DC MWp, Inverters, ACCBs, AC MVA, DC:AC, IDT kVA, Area ha), *B01-ICR*, and a folder *B01* with **Tables** (one geometry, drawn once the block is 128 px on screen, no per-table pop-up) and each device as a labelled point *B01-INV-01*.
- MCR, USSs and handover point; **Arresters** with labelled points, protection radii hidden; MV routes *MV route n* (`DL/render/kmz.py:365-386`; read only, not in the file run).
- Not carried, by grep of the writer: DC and AC routes, piles, street lights, contours.

Refused for an unlocated site, or with no grouping.

### 13.10 piles.csv and manifest.json — `DL/piles_csv.py:19`, `DL/manifest.py:13`

**piles.csv:** written with the drawing set when D4 exists. Header `pile_id,table,block,plot,easting_m,northing_m,latitude,longitude`; IDs `P1-B01-T0001-P01`; E/N in the drawing's coordinates to the mm; lat/lon to 7 places, blank when unlocated; UTF-8, LF. It replaces the pile window's Excel.

**manifest.json:** schema 3, snapshot_id, app_version, created (UTC), revision, purpose, issued, files `{name: sha256}`; hashes every other file, piles.csv included. No check results.

## 14. Projects — `SC/project_io.py`, `MW:3577-3992`

- **Save project** in the view header, or **File ▸ Save Project…** (**Ctrl+S**);
  **File ▸ Open Project…** (**Ctrl+O**). Save dialog **Save Project**, filter
  *"PV Layout Project (*.slp);;All Files (*)"*; `.slp` appended; status *"Project saved (full): …"*. Saving needs no access and is allowed while the layout is out of date.
- **Save waits for a run** (#647, `MW:3657-3671, 13610`) [ran]: during a layout, cable, weather or edit run the status reads *"Saving c.slp when the layout finishes…"* and the file is not written; when it ends *"Project saved (full): c.slp"*. Open or a new project drops the waiting save. Issuing during a run refuses: *"The layout is still being worked out. Save again when it finishes."* Open during an edit's run: *"The layout is still being worked out. Open a project when it finishes."* (`MW:1222, 3685-3687, 13609`).
- **A failed save leaves the old file whole** (#638; `SC/project_io.py:36-37, 74-95, 127-142`): written beside it, then replaced; five tries for a brief Windows hold. Words (#657) [ran]: **Save Failed** / *"Could not save project file:\n\nNo such file or directory"* or *"…Permission denied"*. Held target: *"The project file could not be replaced: it may be open in another program. The copy on disk is unchanged. Close that program and save again."*
- **Open failures**, under **Open Failed** / *"Could not open project file:"* (`SC/project_io.py:144-169, 196-204`): *"This file is not a valid PV Layout project file (.slp).\nIt may have been created by a different application or is corrupted."*; *"Project file is corrupted (base64 decode failed)."*; *"Project file integrity check failed.\nThe file may have been modified outside the application or is corrupted."*; *"Could not read project data: …"*; an unsupported version names an old product name (§18).
- Format: **`.slp`** (Solar Layout Project). It stores the session — §4.10.
- The file is a tamper-evident binary container: a `PVSLP` magic signature, a
  format version byte (**2** for a full project), a truncated SHA-256 checksum
  over a secret plus the compressed payload, then the zlib-compressed,
  base64url-encoded payload — a serialised object snapshot in version 2; JSON
  of input values only in the legacy version 1, which is still readable.
  A wrong magic or a mismatched checksum is reported as an error rather than loaded.
- **Unsaved changes prompt** (#444; `MW:1266-1276, 4184-4186`): closing a window marked modified asks **Save changes?** / *"The project has changes that are not saved."* Save · Discard · Cancel, default Save; Save goes through the file dialog and closing continues only if it saved. The mark is `*` in the title. Only these set it (`MW:8971, 9820, 10627, 12018, 12072, 12343`): project details, company or folder; the grid connection; earthing inputs; Advanced settings; BOM settings; check acceptances. ⚠️ Generate, input edits, Sketch edits and BOM line edits do not (§20): do not promise the prompt protects them.
- **Opening** (`MW:3678-3992`): the earthing window and Export dialog close; the SLD editor ends; a default company may be taken (§13.3a). A design mismatch asks **Design Mode Mismatch**: *"The project was saved in <mode / type> mode, but this window is in <…> mode. Some settings may not restore correctly. Do you want to continue?"*, Yes / No, default No. A restore problem shows **Partial Restore** / *"Input settings restored with warnings:"*. Status after opening:

  | Case | Status |
  |---|---|
  | a project with a layout that matches its inputs | *"Opened <name> · the layout matches its inputs"* [ran] |
  | saved by an earlier version | *"Opened <name>, saved by an earlier version: 1 input was restored from its saved layout"* / *"…: N inputs were restored …"* (`RI:551-557`) |
  | out of date on opening (saved out of date, or an input file missing or changed) | the out-of-date line (§6.6) |
  | no layout, or a version-1 file | *"Project loaded: <name>"* (5 s) |

- **Reopening restores the tools fully, without a Generate** (#392; [ran]): the Export menu per its rules, **Satellite**, **Piles** and **ICR blocks** (enabled, off), the arrester and cable layers, obstruction, MCR and object tools, **Remove MCR** / **Remove Objects**, **the Studies buttons**, the Yield line, and Calculate Energy per the location. The Electrical card shows the saved grouping. Summary opens on **By block**. ⚠️ The Energy view of a reopened project with energy is empty, and the chart and TMY stay off until Calculate Energy (§20).
- **File ▸ New Project** (**Ctrl+Shift+N**) opens a fresh window at defaults in the same design; **File ▸ Open Sample Site** loads the bundled sample.

## 15. Access & licensing — `license_dialog.py`, `access_chip.py`, `trial_client.py`, `licensing.py`

**Online, device-bound access — no licence file.** Entitlement is checked
server-side; there is **no `.lic` file** to install, copy, back up, or load.
The app opens without access; `_require_license` (`MW:4055-4069`) gates **Generate Layout**, **Export TMY data CSV** (`:5828`), **Export Image (PNG)** (`:6060`), the SLD's **PDF…** and **DWG…** (`:7670, 7707`), **BOM · Excel workbook…** and **BOM · PDF…** (`:9081`), **opening Export deliverables…** (`:9104`), the Earthing exports (`:10680`), and **Robot count from DXF, to open and again for its report** (`:10752, 10766`). When blocked, the app opens the **License / Subscription** window itself — there is no separate "Subscription Required" message. An unexpected failure of the check itself lets the action through (`:4060-4061`).
**Free without access:** saving and opening a project, the clean KMZ copy, a BOM profile file, a company file, **Copy** to the clipboard (`MW:3640`, `IP:2724`, `tests/test_export_gates_static.py:22-27`). ⛔ The SLD and BOM views are not gated, their exports are.

**Device ID** — `licensing.machine_id()`: on Windows the registry MachineGuid,
the value shown under Settings ▸ System ▸ About ▸ Device ID.

**Help ▸ License / Subscription…** opens the window (`license_dialog.py`):
- Headline and detail by state (`access_chip.py:56-84`): **✓ Active — until
  <date>** / *"You have access until <date>."*; **Start your free trial** /
  *"All features are available during your free trial. Activation takes one
  click in your browser."* (no access yet); **Access expired** / *"Your free
  trial or subscription has ended. Contact us to purchase, or to request a
  trial extension."*; **Access revoked** / *"Access on this device has been
  revoked. Contact us to restore it."*; **Access status unavailable** / *"We
  couldn't reach the SolarLayout server. Check your connection and press
  Refresh."*; after **Get Free Access**: **⏳ Waiting for activation** / *"This
  will update automatically when you return here after activating in your
  browser."* An optional line *"Access granted to <email>"* names the account.
- Buttons: active → **Access Details**, **Support cases**; not active → **Get
  Free Access**, **Contact Us**; always **Refresh**, **Close**.
- The **Device ID** is folded behind a **Having trouble?** disclosure: group
  **Your Device ID**, hint *"If support asks for your Device ID, copy it from
  here and include it in your message."*, a **Copy** button — `license_dialog.py:99-132`.
- The window re-checks on focus, so returning from the browser after
  activating flips it to Active by itself.

**Getting access.** **Get Free Access** opens the browser at
`{web}/desktop/solarlayout?device=<DeviceID>` (`_WEB_BASE` default
`https://solarlayout.app`). **Contact Us** opens `{web}/contact`; **Access
Details** the same `/desktop` page; **Support cases** the support-case list.

**Status model** (`SC/trial_client.py:172-180`, `APP/access_chip.py:61-68`): the server returns
`active | expired | revoked | none` plus a `valid_till` date. A good check is
cached; the app keeps working through a **3-day offline grace** window, which applies only to a cached `active`; a cached expired or revoked, offline, reads Access status unavailable. An active result is treated fresh (no network call) for 5 minutes. **Refresh** and window focus force a live check; the chip's check runs off the UI thread (`APP/license_dialog.py:146-150`, `MW:4101, 4287-4300`). Active with no date reads *"You have active access on this device."*; offline appends *" (offline)"*. At launch the
License window opens by itself only in the `none` state.

**Account-level access, one device** (server side — `solarlayout` repo,
GH #1249, #1317; verified at `solarlayout` main `16c163c6b`, 2026-11-02):
access belongs to the signed-in account (email) per app, not to a device; one
access record per account holds the kind, status and end date
(`mvp_api/src/modules/desktop/desktop.service.ts:54` `DEVICE_LIMIT = 1`; `:48`
`TRIAL_DAYS = 7`). Every device on the account shows the **same** end date and
status; an extension reaches all of them; revoke ends all of them. Rules in
order (`desktop.service.ts:107-114`): a device already on the account is a
no-op; a device registered under **another** account is refused (*"This device
is already in use"*); a **second** device is refused; an expired or revoked
account may still add its first device, which simply shows that status.
The activation page
(`solarlayout_web/src/app/desktop/[app]/_components/DesktopAccessClient.tsx`)
reads, verbatim: the first device's button **Activate free access for this
device** (`:444`); a second device → heading **Your access is already on
another device** (`:520`), subtext *"Free access is for one device per
account."* (`:568`), card *"Your account already uses <App> on another device,
so this one cannot be added."* (`:796`) with a **Registered device** row, a
**This device** row (`:800`, `:806`) and a **Contact SolarLayout** button
(`:814`). The details card's **Devices** row lists every device with a **This
device** badge on the current one and *"1 of 1 device"* (`:645-658`). An
account that registered more than one device under the earlier limit of 3
keeps them all (no device was removed) and cannot add another: its card reads
*"…on N devices…"* with **Device 1…N** rows, its details *"N devices"*
(`:656-658`, `:796-800`). The form's *"This will be device N of …"* helper and
**Add this device** button (`:383`, `:441`) need an account below its limit
that already has a device, which a limit of 1 never allows — not shown.

**A customer cannot free a slot; an admin can** (`solarlayout` PR #1332, GH
#1331, verified at main `16c163c6b`). In the admin portal, **Switch device** replaces
a device with the Device ID the customer sends
(`mvp_api/src/modules/admin/desktop-device-switch.service.ts:174`), **Set
device** gives an account with no device its device (same function), and
**Remove device** frees the slot for the customer to activate
(`desktop-admin.service.ts:177`). The end date, kind and status do not change,
no trial starts, and a revoked account is refused. The new device reports the
account's status on its next check; the old one reports `none`. An admin can
move both apps together when both are on the old device; the pages do not say so
(each tree stands alone). After a Remove, the activation form reads **Activate this device**
(`DesktopAccessClient.tsx:525`, `:443`) with *"Your access runs until <date>."*
(`:575`).

**Updates & second users.** Access is server-side and belongs to the account,
so it survives reinstalls and updates with nothing to re-load, and a second
Windows user account on the same PC shares the same Device ID.

**Always-visible chrome:**
- **Access chip** in the ribbon (`MW:3242-3265`): **● Active — until <date>**
  (orange on navy; *"(offline)"* appended when the cached result is in use);
  **● Access expired** / **● Access revoked** (red) with a **Contact Us**
  button; **● Access status unavailable** (muted). With no access at all the
  chip itself is hidden and only a gold **Get Free Access** button shows.
  Refreshed at startup, on window focus, after the License window closes, and
  every 30 minutes.
- **Docs** button → https://solarlayout.app/docs/solarlayout (`SC/trial_client.py:125-127`). **Support** button → the
  **Support / Feedback** window (*"Tell us what's going on — we'll get back to
  you by email."*; **Subject**, limit 80 characters, **Category** — *Something's broken · How do I… ·
  I have a suggestion · Billing & account · My results don't look right* —,
  **Description**, a **View support cases & replies** link, **Cancel** /
  **Send**; validation *"Please enter a subject and a description (at least 10
  characters)."*). After **Send**: a box with the server's message, *"Track this case and see our replies under your support cases on the web."*, **View support cases** / **OK**; failure: the message in a **Support** box (`APP/support_dialog.py:34, 79-103`). Without active access the button shows *"You'll need active
  access to file a support ticket. Start a free trial, or contact us
  directly."* with **Get Free Access** / **Contact Us** / **Cancel**. The ribbon's **Get Free Access** opens the browser directly, not the window (`MW:4089-4095`).
- **App version** in the status bar (§6.0).

- ⛔ Never document how access is granted server-side, keys, or any vendor
  operation. Reader-side only.

## 16. Menus — `MW:1725-1763, 5115-5120`

Four menus, thirteen items, in this order ([ran]):

- **File:** New Project (Ctrl+Shift+N) · Move to String / Central Window…
  (Ctrl+N) · Save Project… (Ctrl+S) · Open Project… (Ctrl+O) · Open Sample
  Site · **Company…** (§13.3a) · **Advanced settings…** (reads *"Advanced settings… (N changed)"*; §6.9) · Exit (Ctrl+Q)
- **Edit-Pile:** Define Pile Layout…
- **Tools:** Robot count from DXF… (§10.3; works without a layout) · Earthing Design… (§10.4). Neither has a shortcut. They **copy each Studies button's enabled state and tooltip** on opening, and this menu shows tooltips, so Earthing Design… is disabled before a layout (#392).
  ⛔ The Tools menu does **not** hold the AC simulation, Robotic Module Cleaning or Shadow View.
- **Help:** How to Use This Tool (F1) · License / Subscription…

⚠️ File, Edit-Pile and Help item tooltips are set in the code but **never shown** (§20); do not quote them, File ▸ Company…'s and Advanced settings…'s included.

**Help ▸ How to Use This Tool** opens **Help — SolarLayout** with the tabs
*Getting Started · Input Parameters · Layout / Sketch Editing · Inverters, ICR,
Cables · Terrain / Obstructions · Energy Yield · SLD / BOM · Export, PDF,
Licensing* (`APP/help_dialog.py:16-511`). ⚠️ Its text is older than the interface in places (§18); the docs site, not the in-app guide, is the reference.

## 17. Other reader-visible behaviour

- Water-body detection uses **KMZ-defined polygons only** (`MW:3667-3672`
  hard-sets satellite detection off). A **Water bodies** window exists in the
  code but is **not reachable**. ⛔ Do not document satellite water detection.
- An unexpected error shows *"An unexpected error occurred, but the
  application will keep running."* and appends the traceback to
  `solarlayout_error.log` in the system temp directory — `entrypoints.py`.
- Every plant is cable-routed in full; only the DC comb of a plot with more
  than 30 000 tables is sampled, and its DC trench is marked (§5.3a). ⛔ There is no "fast geometric estimation" for large plants.
- **Progress: one overlay from Generate to the first draw** (#615; `MW:4607-4608, 4826-4835, 5159, 5269-5270`): *"Generating Layout…"* with **Cancel** (*"Cancelling…"*), status *"Calculating layout…"* → *"Placing inverters…"* (cables off) or *"Calculating Cable Routes…"* / *"The calculation is going on, please wait."* → *"Preparing the summary…"* → *"Rendering Layout on Canvas…"* / *"Large plants may take a few minutes — please wait."* Cancel: *"Generate cancelled. The layout on screen is unchanged."* (`MW:5425-5426`). Other cards: §9, §7. Other run statuses: *"Re-plotting the aligned grid around your
  sketch edits…"*, *"Layout not generated: say where the drawing sits first."*
  (§3.2), and *"Error."* with a **Layout Error** box; a cable failure shows
  **Cable Calculation Error** and then the *"Layout ready …"* line.
- **After a run** the status line reads **"Layout ready"** followed by notes
  as they apply, in this order: *"| n water body(s) excluded"*
  (verbatim), *"| n tables cleared for building shadows"* (*trackers* on a
  tracker), *"| MV cable: n m"*, *"| DC target x MWp met"* or *"| ⚠ DC x MWp is
  BELOW the y MWp target — the site has no room left; reduce the AC capacity or
  DC/AC ratio"* (§10.1), *"| Input panel updated from the AC simulation: …"*,
  the location carry note (§3.2), a drawn-trench note (§7), the fleet note (§10.2) and *"| the energy result was cleared:
  calculate energy again"* (§6.6). The totals are in the plant chips, not the status line; the line is not mirrored to the ribbon.
- **Closing while a calculation runs** asks **Calculation in progress** — *"A
  layout, cable or weather calculation is still running. Wait for it to finish
  (the window closes by itself when it does), or quit now and discard the
  result?"* — **Wait** / **Quit now**; **Wait** also cancels a running layout (`MW:4203-4209`). Close messages: *"Closing as soon as the cables are routed..."*, *"Closing as soon as the package is cancelled..."*, *"Closing as soon as the export count stops..."*, *"Closing as soon as the current calculation finishes..."* (`MW:4164-4221`).

## 18. Known stale sources — do not repeat these

| Stale claim | Where it appears | Verified truth |
|---|---|---|
| ICR is 40 m × 14 m | `README.md`, `MP:255-256` comments, `CLAUDE.md`, F1 help | 10 × 4 m, from the reader's own fields (`icr_placer.py:8` now says so) |
| MCR is 30 m × 10 m | F1 help, `MP:265-266` comments | 15 × 8 m |
| LA footprint is 40 m × 14 m | `la_manager.py` docstring, `MP:369-370` comments | 30 × 7 m fixed tilt; 1 × 1 m SAT |
| One ICR per 18 MWp is fixed | `README.md`, `icr_placer.py` | Default 18 MWp, reader-editable 0.1–500 |
| Module default is 580 Wp | `MP:29` | UI ships 610 Wp |
| Module gaps default to 0 m | `MP:42-43` | UI ships 0.020 m |
| Half tables are on by default | `MP:148-152` | UI checkbox ships unchecked |
| Depression exclusion is on by default | `MP:207` | UI checkbox ships unchecked |
| PR losses 2 / 4 / 2 / 2 %, 25 yr, σ 7.5 % | `MP:442-492` | UI ships 1 / 2 / 1 / 1 %, 30 yr, σ 5 % |
| Energy pages are "Pro Plus" | `MP:478` comment | No tiers exist |
| Terrain excludes an RL / flood-level band | `terrain.py` | No UI fields exist for it — unreachable |
| Satellite water-body detection is available | `water_body_mode_dialog.py` | Hard-set to KMZ-only — unreachable |
| Image scale example "1000 m = 10 mm" | `image_boundary_parser.py` docstring | Dialog default is 100 m / 10 mm |
| A line named as a road takes its width from a `width` attribute, 5.0 m by default | this sheet before 2026-11-05, older docs | Every line takes the Line corridor (§3.1) |
| Name keywords for transmission lines and roads; a canal class apart from water | this sheet before 2026-11-05, older docs | The name only sets water (§3.1) |
| Check boundaries opens on load | this sheet before 2026-11-05, older docs | Opens at Generate Layout (§3.1) |
| *Transmission line corridor* as the Site field's label | older docs, screenshots before 2026-11-05 | **Line corridor (each side)** (§4.5). The Sketch Mode prompt keeps its own *Transmission line corridor* label |
| A 15 m TL setback is fixed | `README.md`, `layout_engine.py:29` | Default 15 m per side, reader-editable 0–500 |
| Flat `core/` `gui/` `models/` project layout, `main.py` | `README.md` | Restructured into `packages/` + `apps/` — irrelevant to readers either way |
| A four-card start-up window with **Select** buttons | older docs pages, screenshots before 2026-09-21 | Two segmented controls (MOUNTING, INVERTER), a summary card, **Continue** (§2) |
| One long input panel with **Generate Layout** at the bottom | older docs, F1 help | A pinned **Generate Layout** above five stage tabs: Site · Array · Electrical · Yield · Tools (§4.0) |
| A plot toolbar with 💾 Save(Project) · ⛶ Expand Plot · 🛰 Satellite · ▢ Wireframe · 📍 Piles · ✏ Sketch Mode · 📋 BOM · ⚡ SLD, and a block of ON/OFF view switches | older docs | View tabs Layout · Summary · Checks · Workings · Energy · BOM · SLD with a tools row; the switches live in the **Layers ▾** popover (§6.1, §6.2) |
| A **Layout & Energy Summary** table under the plot with a **⛶ Maximize** button | older docs, F1 help, the SLD/BOM checkbox label *Hide Layout & Energy Summary* | The **Summary** view and **Open in window**; under every view sits the plant chip row (§6.3, §6.4) |
| **Export PDF (Layout + Summary)** and an export button block under the inputs | older docs | **Export ▾** menu (§13.1) |
| *"Calculate the number of modules in series automatically?"* Auto / Manual prompt after loading a module file | older docs | Removed; the **Size…** button opens string sizing (§4.8a) |
| **Calculate Cables for PV Power Plant** in the inverter group | older docs | **Calculate cables** in the **Cables** card, with three DC allowances (§4.8b) |
| **⊕ Move to String / Central Window** button under the inputs | older docs | The ribbon design chip and File ▸ Move to String / Central Window… (§2) |
| Dialogs titled *DXF Site Coordinates*, *Image Boundary — Scale & Coordinates*, *Boundary Validation Issues* | older docs | **Site reference** and **Check boundaries** (§3) |
| Back / Forward arrows on the plot toolbar; a visible Device ID | older docs | Home · Pan · Zoom only; the Device ID sits behind **Having trouble?** (§6.1, §15) |
| Legend ON by default | older docs | OFF, folded behind the **Legend ▾** chip (§6.2) |
| *Stale since the 2026-09-28 re-verification:* | | |
| A CAD / image boundary without coordinates silently uses a fallback of 20° N, 78° E | older docs, this sheet before 2026-09-28 | Gone. **Layout only** leaves the location unknown: no KMZ, energy, satellite; tilt and pitch from a typed latitude or set by hand (§3.2) |
| **Site reference** with *I know the site coordinates*, default 20.000000 / 78.000000, **Use this location**, **Continue without coordinates**, a **Layout only** button, 520 px | older docs, screenshots before 2026-09-28 | Three modes — **Drawing's coordinates**, **Place by latitude and longitude**, **Layout only**; nothing pre-filled; primary **Use UTM zone …** / **Place the drawing here** / **Continue with layout only**; **Cancel** does not load the file (§3.2) |
| A contour DXF must be in the project's UTM coordinates | older docs | In the **boundary file's** coordinates (UTM for a KMZ) — `IP:1169-1173` (§4.7) |
| A project file does not keep Structures & Shadow, Topography, the contour path, the cable allowances, Maximize placement, half tables, the LA tick, shading auto or ground clearance | older docs, this sheet's §4.10 before 2026-09-28 | All saved since #302 (§4.10). Earthing inputs, Robotic Cleaning answers and ICR block AC are saved now too; view state is not |
| LA height and pile Ø are not saved and feed nothing | older docs | Saved, compared, and they shape the mast's keep-clear (§4.6, §5.2) |
| Opening a project always reads *"Project loaded: …"* | older docs | *"Opened <name> · the layout matches its inputs"* and the other §14 lines |
| The project payload is base64url JSON | `project_io.py` docstring | Version 2 stores a serialised object snapshot; JSON only in legacy version 1 (§14) |
| Tables are grouped by K-means into blocks of roughly one ICR Block each; a marginal capacity gives a small extra block | older docs, this sheet before 2026-09-28 | Exactly *k* blocks per piece of near-equal capacity (±5 % target); no small leftover block (§5.1) |
| Each inverter's AC cable runs to the **nearest** ICR | older docs | Nearest along the plant within the building's rating, overflow handed on (§5.3) |
| Arresters are placed after inverters and cables | this sheet's §5 before 2026-09-28 | Before them (§5) |
| Cables may run in the road band but never outside the fence | this sheet before 2026-09-28 | DC clipped to the usable area; AC / DC trunks best-effort inside the boundary, exceptions reported by check E-07 (§5) |
| Very large plants use fast geometric cable estimation | older docs, `SIM:4624-4628` code comment | Everything is routed; only the DC comb of a > 30 000-table plot is sampled and marked (§5.3a) |
| The **Tools** tab is locked until a layout exists | older docs, this sheet's §4.0 before 2026-09-28 | Only its tab tooltip changes; the buttons are greyed out, except **Robot count from DXF…** (§4.0) |
| Three studies; three menus (File · Edit-Pile · Help) | older docs, screenshots before 2026-09-28 | Five Studies buttons; four menus with **Tools**, thirteen items (§10, §16) |
| Inter-module lead 0.5 m (*"BOQ convention 0.5 m"*); String return run on, *"Untick for U-wired strings"* | older docs | 0.00 m (the supplier provides the leads); return run off (leapfrog), tick for daisy-chain (§4.8b) |
| Auto-build rules fixed at 15 / 4 / 17.2 MVA *"mirrored in bom_builder"*; Full SLD = one row per ICR | older docs, this sheet's §11 before 2026-09-28 | The **ACCB & Transformer** card's rules; Full SLD one row per ACCB / central inverter (§4.8c, §11) |
| ACCB = "AC circuit breaker" | older docs (glossary) | **AC combiner box** (`IP:1339`) |
| The `power_transformer_basis` example without the words "margin" / "derating" | `EG:364` docstring | The real remark includes them (§4.8c) |
| A half table receives the full pile pattern and counts at full weight | older docs, this sheet's §19a before 2026-09-28 | Half units carry the half pattern; counts are per unit (§8) |
| *Stale since the 2026-11-05 re-verification:* | | |
| A five-column editable BOM, BOM TOOLS, **⚙ Rebuild from Layout**, BOM templates, **Replace plant BOM**, rows *Plant AC Capacity*, *Design warning*; a rebuild discards edits | older docs, this sheet's §12, §19a | The profile-driven builder; edits survive a Generate (§12) |
| Earthing materials are not in the BOM; Earthing Design is not saved and doesn't follow the layout | older docs, this sheet's §10.4 | In the BOM, saved, and the window closes when the layout is replaced (§10.4) |
| The Word report (**Export Detailed Project Report**), **Export KMZ**, **Export DXF**, ICR-Block PDF / DXF, **Export Cable Schedule (Excel)**, **Export PDF (with Piles)**, the pile Excel | older docs, screenshots | One package from **Export deliverables…** (§13); R1 is an A4 PDF |
| The ICR block window, opened by a click or arrow keys and Enter | older docs, **ICR blocks** tooltip `MW:2298-2301` | Gone; **Summary ▸ By block**; the layer only colours (§6.2, §6.4) |
| Design warnings: banner, chip, *DESIGN WARNINGS* block, **Check:** remarks in files, *Design warning* BOM row | older docs | Design checks (§6.7); remarks in the app's BOM view only (§12.9) |
| Five views, Ctrl+1 … Ctrl+5; **Copy** on the Summary; Layers rows Legend, Lightning arresters, Plant totals; **Export ▾** every item disabled while out of date | older docs, this sheet's §6 | Seven views, Ctrl+1 … Ctrl+7; Copy on Energy only; ten Layers rows; Export deliverables… stays enabled (§6.1, §6.2, §6.6) |
| *"Show or hide plot layers: plant layout, legend, lightning arresters, … plant totals."* | **Layers ▾** tooltip `MW:2994-2997` | §6.2 |
| A trailing `*` on auto tilt and pitch; the Summary's Metric sheet under SITE · ARRAY · ELECTRICAL · CABLES · ENERGY; *Inverter rating (kWp)*, *SMB rating (kWp)*, *Central inverter rating (kWp)*, *CUF (%)* | older docs | Plant and By block sheets, reasons, How?, the new labels (§4.8f, §6.4) |
| Auto pitch at winter-solstice solar noon | older docs, this sheet's §4.3 | Widest over the Shadow Window on 21 December (§4.3) |
| A half table is half the strings and counts 0.5 | older docs, `MP` `enable_half_tables` comments | Whole strings; half weight is its share of modules (§4.2a) |
| Arrester grid at the radius, 0.707 R, 30 × 7 m footprint, 1 × 1 m tracker marker, no tracker units lost; LA height and pile have no effect | older docs, this sheet's §4.6, §5.2 | §5.2 |
| *"LAs are placed on a grid with spacing equal to this radius"*; *"clears the MMS tables they overlap"*; *"clears tables under its footprint"* | **LA protection radius** tooltip `IP:1189-1193`, **Place Lightning Arresters** tooltip `IP:1181-1185`, `APP/help_dialog.py:187` | 1.4 × radius; pile and shadow (§5.2) |
| ACCBs per transformer, max; Central inverters per transformer, max; at most 4 central inverters per ICR; topped up to the simulation's count; rating lists as text fields, *"Keeping …"* | older docs, this sheet's §4.8, §4.8c | Transformer forms, chip lists, §4.8c, §4.8f |
| The cable schedule stays at 33 kV whatever the card says | older docs, this sheet | The MV voltage reaches it (`CS:145-149`); the tooltip is now true |
| Drawn trenches don't survive Generate; a deleted automatic trench returns silently; trench rows keep old figures after an obstruction | older docs, this sheet's §5.3, §7, §19a | §5.3, §7 |
| *"Please place inside the boundary."*; *"MCR placed. Enable 'Cable Calc'…"*; *"Sketch Mode OFF — plant totals updated."*; *"Tip: Click and drag a blue ICR to reposition it."*; an ICR dragged outside Sketch; an Object row with 0.0 defaults | older docs, this sheet's §4.6, §7 | §7 |
| **Generate: Automatic / Manual**, SLD TOOLS, **Full SLD** checkbox, **Hide Layout & Energy Summary**, ⬇ Export SLD buttons, a PDF traced only as an image, *rating needs OND* | older docs, this sheet's §11 | §11 |
| *"The project report's SLD page uses this diagram too."* | SLD Export card, `VM:210` | False: D5 is automatic (§11.6) |
| Specific yield = GTI × PR; `E = kWp × GTI/1000 × PR × LID × dt`; one CUF; four energy tiles; *CUF (%)* column; a hidden PVGIS uplift | older docs, this sheet's §6.5, §9 | §6.5, §9 |
| *"Open an interactive 7-day energy chart with a year slider. Shows 15-minute energy generation…"* | **Show Energy Chart** tooltip `MW:1995-2000` | A daily hourly and monthly window (§9) |
| *"Calculate 25-year energy yield…"* | **Calculate Energy** tooltip `MW:1285` | Default lifetime 30 |
| *"Typical: 2–3 %"* | **1st year degradation** tooltip | Default 1.0 |
| *"used by the near-shading model and the Shadow View"* | **Module ground clearance** tooltip `IP:2334-2337` | Shadow View only (§19a) |
| *"Enable 15-minute interval CSV export"* | weather source tooltip | §9 |
| *"Number of ICRs = ceil(total plant MWp ÷ ICR Block size)."* | **ICR Block** tooltip `IP:1204-1206` | Per piece of land (§5.1) |
| *"Chosen on the start screen. Use File ▸ New Project to change it."* | MOUNTING chip `IP:454` | New Project keeps the design; use the design chip (§2) |
| *"On Generate, DC cable follows your trenches"*, *"Used on Generate"* | trench tooltips `MW:2458-2466` | A drawn trench acts at once (§7) |
| *"Comes with a later release"* | E-04, E-05 rows `CC:57` | Quote only *"Not checked in this version: … by hand."* (§6.7) |
| *"Please update PV Layout Advanced to open this file."*; *"PV Layout Project"* | `SC/project_io.py:204`, file filter | Old product name; file filter quoted only as a filter (§14) |
| *"Obstacle outside boundary — obstacle placed outside the plant polygon is ignored."*; *"Every obstacle / feature must lie INSIDE"*; *"The line must run INSIDE"*; *"under 50 m"* | KMZ File Preparation Guide `APP/kmz_help_dialog.py:164` | It is another plot; a line up to 500 m out is kept; ends **within** 50 m (§3.1) |
| *"2 of 4 boundaries have a problem"* | docs capture `tools/docs_site_shots.py:412`, older docs | *"2 boundaries have a problem"* (§3.1) |
| F1: ICR ≈40 m × 14 m (`:233`); *"see your Device ID"* (`:548`); *"licensed per machine"* (`:546`); *"7-day free trial"* (`:548-551`); *"← → step back and forward through views"* (`:68`); *"⚡ T-Line: Click vertices; right-click to finish"* (`:195`); *"Switch any of these lines on or off in the BOM."*, *"switch on MMS steel"* (`:137-139`); *"the design report prints the table"* of checks (`:343-346`); *"the summary with its verdict"*, *"Tools ▸ Pile layout"* (`:515-535`) | `APP/help_dialog.py` | §10.3, §7, §12.3, §6.7, §16. Do not quote F1 |
| *"D0–D5, one PDF"* | Company dialog tile `APP/company_dialog.py:389` | The set runs to D6 (§13.4) |
| *"Sizes cables · Generate again"* on Road angle, Road to MMS clearance, Fence line, RS485; *"Checks · applies now"* on Handover point reach | `SC/settings_form.py:20-22`, `design.json` | Pills quoted as they read, with no claim that those settings size cables (§6.9) |

## 19a. Resolved queries — behaviours that are easy to get wrong

Each of these was a question a writer raised; each is answered from code. They
are collected here because in every case the intuitive answer is wrong.

**How the performance ratio is combined** — `energy_calculator.py:597-607`.
**Multiplicatively**, not additively:

```
PR = (inverter efficiency / 100)
   × (1 − DC cable loss)   × (1 − AC cable loss)
   × (1 − soiling)         × (1 − temperature)
   × (1 − mismatch)        × (1 − shading)
   × (availability / 100)
   × (1 − transformer)     × (1 − other)
```

A reader defending the figure will be asked, so state it. The **monthly**
performance ratio is built the same way but with the annual temperature term
left out and a month-specific one substituted — `energy_calculator.py:796-797,
891-898`.

**The first-year degradation factor** (LID) is exactly
`1 − first-year degradation ÷ 100`, in the run's gain (§9; `SC/energy_calculator.py:710`).

**`Plant Area (Acres)` is the gross boundary area**, taken from the full
boundary polygon before the perimeter-road setback —
`layout_engine.py:484-485`. It is **not** the usable area, so it does not fall
when obstructions or terrain exclusions grow.

**Ground albedo affects only the bifacial gain.** The GHI-to-in-plane
transposition carries its own fixed ground-reflectance of 0.20 internally and
is **not** passed the reader's **Ground albedo** field
(`solar_transposition.py:47, 162, 178, 305`; no albedo argument is passed from
`energy_calculator.py`). This matches the field's own tooltip, which says it has
no effect for a monofacial module.

**The bifacial gain is computed as a percentage** and kept on the run's basis; the Workings'
Year-1 energy lists Bifaciality and Albedo among its inputs. There is no separate on-screen
readout for it, and whether R1 §9 prints the gain was not verified (`SC/energy_calculator.py:710`).

**Loading an inverter file does NOT set the inverter efficiency.** It stores the
nominal and maximum AC power, updates the status line, and recomputes the
DC/AC ratio — `MW:6562-6579`. The **String / Central Inverter efficiency** field
in the loss breakdown stays at whatever the reader entered. Say so, or a reader
will assume the file filled it.

**Computed shading is calculated on Generate Layout, not on Calculate Energy** —
`MW:3340-3362`, in the same block that fills the derived tilt and pitch.

**Module ground clearance does not enter the computed shading loss.** The
shading routine takes latitude, tilt, ground coverage ratio, surface azimuth and
the tracker flag — and no clearance argument at all
(`shading.py:188-199`; the call site passes none). Clearance feeds the
**Shadow View** cross-section only. Do not describe it as a loss input.

**A hand-drawn transmission line does not use the Transmission line corridor
setback.** The T-Line tool **prompts for a corridor width**, buffers the
centre-line by **half** that width so the cleared strip equals the width, draws
the red centre-line, records the corridor as a keep-out and removes the tables
inside it. With no width supplied it defaults to **10.0 m** —
`sketch_manager.py:2753-2778`. Not the Site tab's corridor field.

**Trench edits last** (#346, #403). A drawn trench replaces every automatic run of its type in the plot holding its middle, and survives leaving Sketch Mode and a Generate
(`SC/frame_carry.py:46, 190-205`). A deleted **automatic** run stays deleted until a re-route, which asks first with Calculate cables on (§7; `CE:145-150`, `MW:4429-4453`). No control
switches trench edits on or off. ⛔ Do not repeat "any Generate discards it".

**MV cables are routed on the next Generate, not when the MCR is placed, and only with Calculate cables on.**
After **Place MCR** the result bar gives the next step (*"Generate again to route the MV cables."* / *"To route its MV cables, tick Calculate cables and generate again."*, `PW:133-141`). With it off no MV is routed and any left is cleared (`tests/test_mv_only_with_cables_346.py`). Then the status line adds *"| MV cable: n m"*. Summary reason: *needs an MCR on the layout* or *needs Calculate cables*.

**A hand-drawn obstruction (Tools tab) re-routes, and the trench rows follow.** With **Calculate cables** on, the cables are re-routed and DC / AC / MV trench totals recomputed on that run (`MW:4462-4471`, `tests/test_sketch_trenches_346.py`). The BOM recounts when next opened.

**The Symbol Editor's buttons are labelled `Accept` and `Reject`** —
`sld_symbol_editor.py:57-59`.

**Auto-build needs no energy calculation.** Its counts and ratings come from
the layout, the electrical grouping and the OND file (§11), not from the
materials list or an energy run. Generating the layout is enough; without an
OND the sheet prints *— kVA* and *33 kV / — V* (§11.1).

**What Generate Layout does to Sketch-Mode edits** — `MW:2739-2771`. This is
consequential and easy to get wrong, so state it precisely:

1. If the reader is still in Sketch Mode, Generate leaves it first, so the
   edits are committed rather than lost.
2. If the layout was edited, Generate **re-places every table, tracker,
   inverter and control room from scratch** into the newly available space. So
   hand-placed and hand-deleted **tables do not survive** a Generate.
3. But the obstructions, corridors, Sketch roads, main control room, USS, handover points, objects, sketch
   annotations and drawn trenches the reader placed **do** survive — they are carried onto the new
   layout and the obstructions and corridors are fed to the placement as
   **keep-outs** (`SC/frame_carry.py:180-193`, `MW:4016-4071`). That is the
   point of the re-plot: the design is rebuilt *around* the reader's
   constraints.
4. The re-plot is forced to the **aligned grid** — **Maximize placement** is
   switched off for it, deliberately, so pile coordinates stay uniform for
   construction. A reader who had Maximize placement on will get an aligned
   plant back.
5. The status line reads *"Re-plotting the aligned grid around your sketch
   edits…"*.
6. **Hand-drawn cable trenches survive**; automatic runs you deleted come back, after the question in §7.
7. An energy result is cleared (§6.6). 8. Arresters placed by hand are not carried (§5.2).

`_refresh_layout_keep_edits` exists in the code but nothing calls it, so there
is **no** "keep my layout, just refresh the numbers" path. Do not document one.

**An imported CAD reference is read in the boundary drawing's coordinates** (#366; `SC/sketch_dxf.py:1-8`, `APP/sketch_manager.py:1150`):
no scaling, no re-centring, no fit-to-extent. A placed or layout-only drawing moves by the same offset as the plant, so it overlays and
exports back as it was; a KMZ site and a drawing in UTM have no offset, so the reference must be in that UTM zone. Supported entity types, from the message shown when nothing
imports: **LINE, POLYLINE, CIRCLE, ARC, ELLIPSE, SPLINE, TEXT**. Imported
elements land on the **currently selected sketch layer**, and the status line
reports how many came in and onto which layer.

**The bill of materials' line items:** §12.12. A line exists when its entry applies to the design; off-by-default entries and a zero count are listed on the Profile card (§12.3). Earthing is in it (§10.4).

**Half tables carry their own pile pattern, and every pile count is per
unit.** Since #290 a half table gets the half pattern — derived from the full
one (same end overhangs, even spans, a centre drive pile on a tracker) or the
reader's own — and the Summary, the status line and every export count each
unit's own piles (`SC/piles.py:31-112`; §8). ⛔ Do not repeat the old
statement that half tables receive the full pattern and count at full weight.

Confirmed in review (2026-09-28):
- A USS casts a keep-clear shadow like the ICR and MCR, so **Clear tables in
  shadows** covers it too (`layout_engine.py:361-365`), though the tooltip
  names only ICR / MCR / objects (`IP:1115-1117`).
- **Shadow View** opens with the layout's tilt, pitch and ground clearance
  (`shadow_view_dialog.py:62-67`, `MW:9182`).
- *"This spot is outside the boundary. Move inside the plot."* leaves MCR placement armed (`PW`, §7).
- Earthing: the Layout legend counts pits per category (`EA/plot.py:111`); the
  BoQ's earth-pit remark lists pits by category (`EA/layout.py:635`); the IS
  3043 and IEEE 80 strip sizes are shown in the conductor-sizing section
  (`EA/calc.py:261-273`, `EA/report.py:139`); the design basis includes
  *Module / MMS bonding — IEC 62548, IEC 60364-7-712* (`EA/report.py:26`).
- SLD: a wire is drawn by pressing at its start and releasing at its end
  (`APP/sld_manager.py:380-486`).
- Sketch Mode: Ctrl+V pastes 5 m east and 5 m north (`sketch_manager.py:1256-1264`).
- **Generate Layout** is disabled while no boundary file is selected
  (`MW:9477-9487`). Generate resets the zoom and pan (`MW:3776`), as does
  loading a boundary file (`MW:9497`).
- **Show Energy Chart** turns on after an energy run; **Export TMY data CSV**
  only when hourly data exists. Both are spread from the run's months (§9).
- The License window shows **Get Free Access** and **Contact Us** in every
  non-active state, expired and revoked included (`license_dialog.py:159-162`).
  That is a defect, not the intent (§20 #30, #349).

## 19. Facts we do not have

These are genuinely unknown, not merely unverified. Write around them; do not
invent a value.

| Unknown | How to handle it |
|---|---|
| The Microsoft Store listing URL | Tell the reader to open the Microsoft Store and search for the application by name. Do not write a URL or a `ms-windows-store:` link. |
| ~~The current version number and release date~~ | **Resolved (Arun, 2026-08-18): v1.0.0, dated 2026-08-18**, published as the first documented release. It records the shipped capability set rather than a change list, because there is no earlier documented version to compare against. Later entries are real changelogs. |
| ~~Where the installed version number is displayed~~ | **Resolved (2026-08): the app version is always shown in the bottom status bar** — `app_version.display_version()`, which drops a trailing `.0` from the four-part build number: build 2.0.2.0 shows **v2.0.2** (`dev` when run from source; `APP/app_version.py:14-21`); see §6.0. Which changes each build contains: §21. |
| Whether a CAD drawing must be in metres | The parser appears to auto-detect units (`dxf_parser.py:161-189, 264`); not confirmed with the product owner (2026-09-28). Do not state a unit requirement or a conversion until confirmed (§3.2). |
| ~~Whether uninstalling removes the licence file~~ | **Moot under the online model:** there is no licence file (§15). Access is server-side and device-bound, so it survives an uninstall/reinstall on the same machine automatically — nothing to keep or restore. |
| What changes the Device ID | The fingerprint is derived per machine, but which hardware or OS changes alter it is not something to promise. Say a reinstall of Windows or a change of machine can change it, and that a changed ID needs access re-activated (**Get Free Access** again). |
| Any release history | Do not invent changelog entries. What each tagged build contains, is in §21; anything else about a release needs the product owner. |
| Minimum Windows build, RAM, disk, or screen resolution | State the requirements qualitatively — a 64-bit Windows PC, a display wide enough for the panel and plot side by side, an internet connection only for weather and elevation data. Leave a `{/* VERIFY: minimum Windows version and hardware requirements */}`. |
| ~~Support email address or contact route~~ | **Resolved (Arun, 2026-08-18): `sales@solarlayout.app`.** It is the route for everything reader-facing — a new licence, a renewal, a reissue for a new machine, and any problem the pages do not resolve. |
| Typical run times for Generate on a given plant size | Do not quote seconds or minutes. Say cable calculation is the slow step on large plants, which is what the application itself warns. |
| Price, plans, licence duration options | Out of scope. The licence pages cover activation and error messages only. |

## 20. Product issues — not behaviour to document

**Pages must not describe these as intended behaviour, and must not document a workaround that
relies on them.** Where a page has to steer round one, it states only the correct route (as noted in
the relevant section). They are reported to the product team; re-check before the next docs update.

### Still open from 2026-09-28

Tracked in `PVlayout_Advance` under epic #340 (open). #348 and #349 are open; #341–#347 are closed. Rows fixed or moot at `5e54979`, by the row-by-row sweep, were removed; row numbers are kept for reference.

| # | Issue | State and evidence |
|---|---|---|
| 5 | **Menu-bar tooltips are never shown** on File, Edit-Pile and Help. | Partly fixed: Tools shows its tooltips (`MW:1756`). Read |
| 8 | **Layout-only messages:** a skipped shadow clearance has no status line; it is check E-13 only. | Partly fixed (`MW:5208-5209`, `DL/checks/engineering.py:32`). Read |
| 10 | **Off-menu export refusals while out of date are status-bar messages only**, soon replaced; "changed on disk" is noticed only on returning to the window or at export. | Partly fixed: the menu has its banner (`MW:2785-2791, 5069-5075`). Read |
| 11 | **Every Generate clears an existing energy result, even with no input changed.** By design; documented in §6.6, flagged because it may surprise. | Unchanged |
| 13 | **Clear** on the pile window's Half tab gives half units 0 piles with no warning. | `PD:449-453`. Read |
| 25 | **AC-capacity window:** *"Enter a positive AC capacity and target DC/AC ratio."* is unreachable; the reserved fix-button row leaves a blank strip under *Fits this layout*. | #349 open; `ACS:217`. Read |
| 26 | Cosmetic strings: *"water body(s)"*; *"Closing as soon as the cables are routed..."* (ASCII dots); the Electrical tab tooltip does not mention transformers. | `MW:4165, 5183, 5376`, `IP:132`. Read |
| 29 | **Fixed-tilt Maximize placement vs its tooltip:** the tooltip says rows hug the boundary so columns will not line up; the fixed-tilt packer keeps one column grid. Decided in #348: aligned columns are intended on fixed tilt; the tooltip is wrong. Until it lands, the pages keep their wording. | #348 open; `IP:900-905`, `layout_engine.py:35-98`. Read, runtime repro 2026-09-28 |
| 30 | **The License window offers Get Free Access when access has expired or been revoked.** Pages must not tell expired or revoked users to use it; **Contact Us** / `sales@solarlayout.app` is the route. | #349 open; `APP/license_dialog.py:159-162`. Read |

### Product issues noticed 2026-11-05 — not behaviour to document

"Run" = seen in a headless run of the real code. "Read" = code reading only.

| # | Area | Issue | Evidence | Verified |
|---|---|---|---|---|
| 1 | Arresters | **A hand-placed mast gets no project parameters** (resolved in code). `_add_la` passes `getattr(self, "_params", None)` but the manager's attribute is `params`, so `add_arrester` gets `None`: radius 100, pile 0.3, height 9 m, window 09–15, whatever the fields say; the recount and ledger step are skipped. With radius 250, pile 1.5, height 25: the hand mast read 100 / 0.3, its keep-clear 170.6 m² against 2,149.3 m² at the project's inputs | `APP/sketch_manager.py:2710`, `SC/la_manager.py:229, 290-300` | Run |
| 2 | Arresters | **A hand-placed mast does not last.** With Place Lightning Arresters on, leaving Sketch re-runs the grid and it is gone (6 masts + 1 → 6; tables also fell 1,411 → 1,384, cause not traced). With it off it stays at the defaults, and the next Generate drops it (1 → 0) | `MW:747-767`, `SC/la_manager.py:323` | Run |
| 3 | Arresters | **Clear tables in shadows does not govern masts**; may be intended, its tooltip is silent. Ask, then document | `SC/la_manager.py:156-171` | Run |
| 4 | Arresters | Tracker capacity loss is large: 90 of 582 units (15 %) for 21 masts at the defaults; a mast's yearly sweep across a 64 m tracker removes the whole unit. A domain question | §5.2 | Run |
| 5 | BOM | **Internal identifiers customers can see** (resolved in code). Add a line ▸ Design quantity: *"modules (pv.modules)"*, *"strings (pv.lone_strings)"*, *"tables (mms.units)"*, *"m of boundary (site.perimeter)"* (21 such). Workbook **Design quantities** sheet, in the package's S2 too: Key `pv.modules`, `mms.units`, `cable.length`; Attributes *"wp 610 · wp_label 610 Wp"*, *"kind fixed_table · size full · config 2P × 28 portrait · unit_label full table · modules 56 · …"*, *"kind idt · windings 5 · mv_kv 33"*, *"at mcr"*; one row What = `laying.ties`, Note *"The design doesn't count this yet."* Hard rule 8 | `APP/bom_builder_panel.py:606`, `SC/bom/export/view.py:275`, `SC/bom/export/xlsx.py:141` | Run |
| 6 | BOM | The same in orphan and Stay rows, *"(size_mm2 400)"*; `decision_words` prints spec keys | `SC/bom/session.py:700-702`, `SC/bom/edits.py:97-99`, `SC/bom/words.py:27` | Read |
| 7 | BOM | **BOM edits don't mark the project changed**, so closing asks nothing and they are lost: quantity, Turn this entry off, Add a line, Use profile; only a BOM setting marks it | `MW:4184, 12072` | Run |
| 8 | Projects | **Unsaved work closes silently:** a generated layout, input edits and Sketch edits never set the mark. May be by design (#444's scope); worth asking | `MW:8971, 9820, 10627, 12018, 12072, 12343` | Read |
| 9 | BOM | **An entry cannot be switched on in the UI.** `toggle_entry` has no caller outside the session, so Turn this entry off is one-way, and 24 off-by-default entries (Cable trench, roads, drain, foundations, MMS steel, fasteners, module bolts, washers, tracker posts, installation) stay off; adding the type through Add a line was not run. F1 promises otherwise | `SC/bom/session.py`, `APP/help_dialog.py:137-139` | Read |
| 10 | BOM | **Duplicate drops a profile's BOM settings** though its hint says a copy of its changes | `SC/bom/store.py:295-298` | Run |
| 11 | BOM | Cable-trench check remarks show nowhere: they map to an entry off by default | `DL/check_remarks.py:33` | Read |
| 12 | BOM | The AC clamp's spec is fixed at *"to hold 3C × 300 mm² Al armoured cable"* beside 185 and 240 mm² feeders | entry `ac-cable-clamp` | Run |
| 13 | BOM | MCR words on plants without one: *"MV termination kit · at the MCR"* on feeders ending at a USS; *"1 × 1 MCR weather stations"* with no MCR | profile | Run |
| 14 | BOM | Plurals in Basis: *"1 tables"*, *"1 power transformers"*, *"50 m × 1 weather stations"* | `SC/bom/engine.py:60-70` | Run |
| 15 | BOM | Block combo tooltip *"Show one block's quantities"*, but it filters lines and leaves every column | `APP/bom_view.py:319` | Read |
| 16 | BOM | The structure-kit note says *"Update the profile"*, and no Update offer exists for the built-in; the route is Change… ▸ built-in ▸ Use | `MW:9027`, `APP/bom_profiles_dialog.py:357` | Read |
| 17 | BOM | Profile delete and Turn this entry off have no confirmation; delete removes the file. A decision to take | `APP/bom_profiles_dialog.py:492-505` | Read |
| 18 | Package | **R1 §12.3 names a drawing-set file that doesn't exist** (`…-G-CV-001.pdf` for `…-E-DS-001.pdf`) and omits the DXF, piles.csv and manifest | `DL/report/build.py:1302-1305` | Run |
| 19 | Package | **D0's series summary leaves out D6**, so its counts don't add up to its Total | `DL/sheets/d0_register.py:273` | Run |
| 20 | Package | S1's README says *"Not in this package: the drawing set was not written"* when it was written and no pile pattern exists | `DL/package.py:307`, `DL/schedules.py:49` | Run |
| 21 | Package | The register's Rev column prints "—" on every sheet of an issued package, under *"Revisions are per sheet and begin at the first issue."* | D0, R1 §12.2 | Run |
| 22 | Package | **A draft's revision disagrees with itself:** folder *"Rev A · DRAFT"*, the Company preview's Rev A; title blocks and R1 footer Rev — · DRAFT; S1's README on a later draft takes the last issued revision (that last by reading) | `DL/schedules.py:462-466` | Run |
| 23 | Package | The history note is letters-only: *"Letter revisions begin at the first issue (A, B, C…). A draft uses none."* under a `C01` row | R1 | Run |
| 24 | Package | No Close button when ready: the secondary is *Export draft package*; only Esc or the close box | `APP/export_deliverables_dialog.py:716-717` | Run |
| 25 | Package | **Nothing ticked can still write:** the secondary writes a manifest-only draft, and the split ▾ issues and records a revision | `APP/export_deliverables_dialog.py:577-580, 790-810, 988-1000` | Run |
| 26 | Package | The footer's *"Writes N files"* ignores piles.csv | `APP/export_deliverables_dialog.py:542` | Run |
| 27 | Package | **Revision Z crashes the dialog:** *"Revisions run A to Z."* escapes; the project can't open it | `DL/revisions.py:69-92` | Run |
| 28 | Package | A report-only package's R1 §12.3 says *K1 KMZ · Not designed · — · as it lands* for an unticked row; *as it lands* is an internal phrase | `DL/report/build.py:1311, 1316` | Run |
| 29 | Package | The banner says *Cables are being routed* while the wait is for the checks; its lead says *Draft:* above a primary that issues; the footer promises *"then saves the project"* on a never-saved project | `APP/export_deliverables_dialog.py:683-684` | Run (last two), Read |
| 30 | Package | The Revisions card's size is the uncompressed snapshot: 719 KB in a 159 KB file | `SC/project_io.py:75` | Run |
| 31 | Package | D4's note names four corners and only three setting-out names exist | `DL/sheets/d4_piles.py:37, 44` | Read |
| 32 | Package | R1's irradiance source can misstate after a file run following a PVGIS one: the basis keeps *pvgis* | `DL/report/build.py:1190-1192` | Run (basis), Read (R1) |
| 33 | Checks | **Fix links on passed and not-applicable rows**: a passing row offers *"Fix: Site tab"*, E-12 on a string plant *"Fix: Electrical tab"* | `MW` `_fix_links` | Run |
| 34 | Checks | R-04 and R-06 can't-check read *"Cables not calculated: tick Calculate cables and Generate"* beside *"No setting changes this: send us the project"* | `CC:56` | Run |
| 35 | Checks | **The chip and line can't reach zero:** E-04 and E-05 can't run, so the chip stays until they are accepted; the line reads *"6 design checks failed"* on a fresh layout for missing company details, piles, PAN | `DL/check_report.py:118-121` | Run |
| 36 | Layers | The ICR blocks tooltip promises the removed window; the Layers tooltip lists removed rows (§18) | `MW:2298-2301, 2994-2997` | Run (Layers text), Read |
| 37 | Summary | Open in window: How? and reason links look live and do nothing | `MW:8744-8760` | Read |
| 38 | Settings | Effect pills overstate (§18); Handover point reach's *Checks* pill governs placement; Weather data correction leaves an existing energy result looking current with no marker | `SC/settings_form.py:20-22, 275`, `MW:9452, 9600-9601, 9782` | Run (weather), Read |
| 39 | SLD | The Export card's note *"The project report's SLD page uses this diagram too."* is false | `VM:210` | Run |
| 40 | SLD | **DWG…** with a traced background and no elements: enabled, then *"There is no SLD to export yet."*; one of two `NOTHING_TO_EXPORT` strings is dead | `MW:7674-7677, 7884`, `VM:191, 305` | Read (second run) |
| 41 | Sketch | Unsure: after a Sketch road and Generate the road is both a keep-out and re-applied; 1,574 tables after 1,572, no evidence of a double move, offsets not measured | `SC/frame_carry.py:312-338`, `SC/road_manager.py:35-37` | Run, inconclusive |
| 42 | Energy | **A reopened project with energy: the Energy view says *No energy result yet*,** with an enabled **Calculate energy**, while Summary, chip and Yield line show it | `MW:5661` | Run |
| 43 | Energy | Show Energy Chart and TMY stay disabled after Open even with energy; the chart button stays enabled after a Generate clears energy, answering *"Please run 'Calculate Energy' first."*; opening a project with energy in a window that ran one may use the old parameters (by reading) | `MW:5914-5926` | Run |
| 44 | Energy | **The "both services failed" text tells a user on PVGIS to switch to PVGIS**; *"PVGIS fetch failed — …"* is effectively unreachable | `MW:5631-5634`, `SC/energy_calculator.py:81-125` | Run |
| 45 | Energy | A typed GTI with the file option and no file: annual model, correction 1.0, Summary filled, Energy view empty; Workings says *"your hourly file"* with no file (by reading) | `SC/workings.py:1133` | Run |
| 46 | Energy | The TMY GHI column repeats GTI on a fixed-tilt PVGIS fetch | `SC/energy_calculator.py:230, 1086-1089` | Read |
| 47 | Energy | The *25yr* labels are fixed whatever the lifetime (§6.4); the *Year-1 P50* chip caption fixed whatever P1 | `MW:11714, 12405-12416` | Read |
| 48 | Energy | Multi-plot energy uses the first plot's centroid, tilt and GCR for all plots. A simplification; say so only if asked | `MW:5470-5478, 5588-5595` | Read |
| 49 | Earthing | A truly measured 50 Ω·m reads as *assumed*; the LA tooltip's *"with a measured soil"* (assumed soil also grows it); the report prints *IDT neutral 0*, *Central inverter (CI mode)*, *USS (multi-plot)*, *0 per site* rows regardless of design | `EA/calc.py:285-290`, `EA/report.py:53-112` | Read, Run (report rows) |
| 50 | Boundary | **A file with no plot stays loaded:** after **Boundary read error** the path stays and Generate is enabled, then **Layout Error** with the same sentence, status *"Error."* | `MW:9896-9898` | Run |
| 51 | Boundary | While Check boundaries is up the status bar already reads *"Generate cancelled. The layout on screen is unchanged."*, and stays after continuing; the banner lost its total | `MW:4565, 4569` | Read |
| 52 | Boundary | A pins-only file opens a window whose only exit is Cancel; its verdict says *"Every plot is left out or removed"* when none existed | `CBD:1044-1048` | Run (window), Read (words) |
| 53 | Docs tool | `tools/docs_site_shots.py` clicks the primary, which issues on a saved project; `renders` lists `report-with-piles.pdf`, `icr-blocks.pdf`, `report-warnings.pdf`, which nothing writes; `:412` passes `total=4` | `tools/docs_site_shots.py:244-264, 412, 1310-1312` | Read |

Comment-only or tooltip-only staleness is in §18.

## 21. Release mapping

Verified 2026-11-05 with `git tag --contains <sha> --sort=version:refname` in the product repo
(`main` at `5e54979`; local tags equal `git ls-remote --tags origin`). The in-app version drops the
trailing `.0` (§6.0), so tag `solarlayout-v2.1.19.0` is the build that shows **v2.1.19**.

⚠️ **Sort numerically.** A lexical sort puts `v2.1.10.0` before `v2.1.3.0`: this sheet before 2026-11-05 gave #364 as first in v2.1.10.0, and the "In tags" column of the audit's change list has the same flaw. Tags 2.1.5, 2.1.6, 2.1.8 and 2.1.11 do not exist.

| Tag | Tagged, at | First contains (significant changes; PR, merge) |
|---|---|---|
| `solarlayout-v2.0.1.0` | 2026-09-22 | #208 (every device cabled, ICR assignment, containment), #219 (leaving Sketch Mode) |
| `solarlayout-v2.0.2.0` | 2026-09-25, `040330b` | #274, #275, #276, #277, #288–#292, #295, #296, #298, #299 |
| `solarlayout-v2.1.0.0` | 2026-09-28, `e93f6be` | #301, #302, #303, #305, #308, #309, #310, #315, #318, #319 |
| `solarlayout-v2.1.1.0` | 2026-09-28, `d249ec2` | #353 (New design window takes the focus) |
| `solarlayout-v2.1.2.0` | 2026-09-29, `b4b2225` | #355 (whole strings, §4.2a), #357 (Earthing: crash-proof inputs, one window, gated exports) |
| `solarlayout-v2.1.3.0` | 2026-10-06, `14966be` | **#362, #365 (the BOM builder and profiles; old BOM deleted)**, #359 (BOM workbook, PDF, project section), #368 (**the Checks view**, chip, acceptances, layer), #364 (**Clean boundary**, `6e7c416`), #366 (latitude refusal), #373 (survey maps), #378 |
| `solarlayout-v2.1.4.0` | 2026-10-09, `5459019` | **#391 (Advanced settings)**, #389 (access on every file output), #393 (BOM settings), #395 (fuses and SMB inputs), #396 (DC harness, string fuses), #386 (DC trunk conductor), #387 (two feeder sizes), #392 (full reopen, one Tools state), #394 (land warnings), #398 (MV voltage reaches cables and SLD), #401 (Y across tables), #402 (Docs link) |
| `solarlayout-v2.1.7.0` | 2026-10-22, `66a95fd` | Most of this update. **Earthing:** #412, #417. **SLD:** #422, #424, #427, #447, #452, #464, #472, #480, #487. **Package:** #467, #485, #491 (R1; **Word report deleted**), #498 (**Export deliverables**, draft), #506 (DXF twin), #513 (D5), #523 (**File ▸ Company…**), #538 (D4, piles.csv), #544 (D6), #545 (S1, S2), #547 (K1), **#549 (the old exports deleted)**. **Summary and views:** #518, #524 (Plant, **By block**), #479, #482, #488, #490 (**Workings**), #540 (land account), #553 (**the checks fold; design warnings gone**), #449, #462 (rating rows). **Engine:** #459 (shade-free pitch), #461 (arresters), #477 (ground footprint), #448 (no 4-per-ICR limit), #510 (central inverters from the plant AC), #552, #555 (**transformer forms**), #497 (**Sketch roads move rows**), #403 (**trenches survive Generate**). **Energy:** #517 (**one energy run**), #471 (weather correction), #474 (CUF on AC). **BOM:** #404, #406, #408, #420, #423, #426, #451, #463, #512, #515, #526. **Studies:** #411, #413, #415, #416, #421 |
| `solarlayout-v2.1.9.0` | 2026-10-26, `a6d1a48` | #563 (**issuing a revision**), #567 (arrester shadow drawn), #568 (**Place object window**), #569 (soil 50 Ω·m), #558 |
| `solarlayout-v2.1.10.0` | 2026-10-26, `9cb69d9` | #570 (internal references out of customer text) |
| `solarlayout-v2.1.12.0` | 2026-11-01, `735efb8` | #572 (Shadow View sliders), #590, #591 (R1 central terms), #600 (**panning**), #608 (**the package carries no check; any revision issues**), #609 (Site area leads the chips), #610 (**Layers: ten rows**), #611 (**Layout view read-only**), #614 (finished layout as a boundary) |
| `solarlayout-v2.1.13.0` | 2026-11-01, `4bf21ca` | #615 (one overlay after Generate), #616, #617 (a twisted fence) |
| `solarlayout-v2.1.14.0` | 2026-11-01, `0c0a4ee` | #618 (the boundary progress card) |
| `solarlayout-v2.1.15.0` | 2026-11-02, `19f8e6d` | #620 (the lean review, `d4fb07f`), #624 (a corridor or setback per item, `19f8e6d`) |
| `solarlayout-v2.1.16.0` | 2026-11-03, `6fcfff0` | #626 (**the placing cue**), #628 |
| `solarlayout-v2.1.17.0` | 2026-11-04, `6b03bf5` | #638 (**a failed save leaves the old file**), #647 (Save waits for a run), #657 (failed-save words), #645 (radius 0), #646, #648, #649, #651 (satellite certificate); performance #640–#644, #650, #652–#654 |
| `solarlayout-v2.1.18.0` | 2026-11-04, `ae599a9` | #661 (the stuck gate), #662 (a CAD export of loose lines, `ae599a9`) |
| `solarlayout-v2.1.19.0` | 2026-11-05, `5e54979`, this sheet's baseline | **#664** (a file with no polygon, §3.1f, `f05400a`), **#668** (a survey of points only, §3.1e, `7636162`), **#670** (grid connection by others, §5a, `5e54997`), #665 (docs tool only) |

⚠️ Pages describe the current `main`. A release-notes entry must name only
what its release contains. **Everything in this sheet is released in v2.1.19.0**, so pages describe all of it as released behaviour. GitHub release published 2026-11-05 08:16 UTC; the owner says to treat it as published in the Microsoft Store, with certification in progress (2026-11-05). Check `git ls-remote --tags origin` before saying what has shipped since.

**Docs release labels (Arun, 2026-09-28).** The docs' release entries keep
their own labels: the existing **1.0.0** and **1.2.0** entries stay as they are.
The build at `e93f6be` is labelled **2.1.0**: the version at which SolarLayout Desktop is released on the
Microsoft Store and the direct-download channel. Tag `solarlayout-v2.1.0.0`
(2026-09-28) points at that commit, so the docs label and the tag agree from
this release on; the entry is dated 2026-09-28. `releases.mdx` has nothing past 2.1.0; a label for later builds is the owner's to choose.

Merge commits of the earlier rows, for re-checking with `git tag --contains`:

| PR | Merge | PR | Merge | PR | Merge |
|---|---|---|---|---|---|
| #208 | `3d6d46a` | #290 | `33b2238` | #303 | `d0f424c` |
| #219 | `bf1d5e1` | #291 | `94e4531` | #305 | `87f76ef` |
| #274 | `171d5c8` | #292 | `4ac76f3` | #308 | `8f6dd8a` |
| #275 | `5ae6921` | #295 | `b291be3` | #309 | `d99fbe2` |
| #276 | `51a5bd9` | #296 | `41a0e2e` | #310 | `d4b713e` |
| #277 | `bcc67e9` | #298 | `305ceab` | #315 | `7dd7bda` |
| #288 | `1e35c87` | #299 | `040330b` | #318 | `1469656` |
| #289 | `444cf84` | #301 | `8cb430e` | #319 | `ee1d389` |
| | | #302 | `b2c3c9f` | | |
