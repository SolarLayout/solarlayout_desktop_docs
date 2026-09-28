# SolarLayout Desktop — verified product facts

**This file is the only permitted factual source for content in this repo.**

Every value below was read from executing code in the product repository
(`PVlayout_Advance`, branch `main`) and carries a `file:line`-style citation.
The sheet was rebuilt on 2026-09-21 after the interface rebuild of issues
#156, #203, #210 and #213, and **re-verified on 2026-09-28 against `main` at
`e93f6be`**,
after PRs #274–#319 (fresh results, design warnings, location truth, the
ACCB & Transformer card, Earthing Design, Robot count from DXF, ICR blocks,
piles on half tables, the cable schedule rework and the routing lock). Which
of those changes are in a released build is in [§21](#21-release-mapping).
Where the product's own README, module docstrings, code comments, tooltips or
in-app F1 help state something different, **they are stale and must not be
used**. A list of the specific known-stale claims is in
[§18](#18-known-stale-sources--do-not-repeat-these); product defects that must
not be described as behaviour are in [§20](#20-product-issues-noticed-2026-09-28--not-behaviour-to-document).

Citations are relative to the product repo root. Line numbers before
2026-09-28 in sections the re-verification did not touch may have drifted;
the facts themselves were not contradicted. Abbreviations:

| Short | Path |
|---|---|
| `APP` | `apps/solarlayout-desktop/solarlayout_desktop` |
| `SC` | `packages/solar-core/solar_core` |
| `SU` | `packages/solar-ui/solar_ui` |
| `IP` | `APP/input_panel.py` |
| `MW` | `APP/main_window.py` |
| `MP` | `SC/models/project.py` |
| `RI` | `SC/run_inputs.py` (fresh results) |
| `DV` | `SC/design_verdict.py` (design warnings) |
| `GR` | `SC/georef.py` |
| `SRV` / `SRD` | `SC/site_reference_verdict.py` / `APP/site_reference_dialog.py` |
| `EG` | `SC/electrical_grouping.py` |
| `CS` | `SC/cable_schedule.py` |
| `BB` | `SC/bom_builder.py` |
| `SA` | `SC/sld_autobuild.py` |
| `SIM` | `SC/string_inverter_manager.py` |
| `CE` | `SC/cable_edits.py` |
| `IBS` / `IBP` / `IBD` | `SC/icr_block_summary.py` / `SC/icr_block_pdf.py` / `APP/icr_block_summary_dialog.py` |
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
  (`MW:907`; the title is *"SolarLayout  [Fixed Tilt  |  String Inverter]"*,
  `MW:954-956`); the Windows application name and the PDF metadata still use
  **SolarLayout.Desktop** (`entrypoints.py`, `pdf_exporter.py:1747`). In prose,
  write **SolarLayout Desktop**; quote the dotted form only when quoting a
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
- The main window's title reads `SolarLayout.Desktop  [Fixed Tilt  |  String Inverter]`
  (or the other combinations) — `MW:954-956`.
- **Changing the design later:** the ribbon's **design chip** (reads
  *"Fixed tilt · String inverter ▾"*, *"Tracker · Central inverter ▾"*, …) or
  **File ▸ Move to String / Central Window…** (**Ctrl+N**) opens the same
  New design window and launches a **new, independent window** for the chosen
  combination; the current window stays open, so two designs can be compared
  side by side. It is not a mode switch applied to the work in progress —
  `MW:1152-1158, 1220-1230, 3172-3191, 4734-4739`. The MOUNTING chip's tooltip
  on the Array tab says *"Chosen on the start screen. Use File ▸ New Project to
  change it."* (`IP:216`); **File ▸ New Project** (Ctrl+Shift+N) opens a fresh
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

A `.kmz` / `.kml` is read at once and opens no further window (it carries its
own coordinates, `GR:123-126`). A CAD drawing or an image first opens the
**Site reference** window (§3.2, §3.3) **before** the file is taken; **Cancel**
there leaves the file unloaded and the previously loaded file in place —
`IP:2056-2130`, `tests/test_location_wiring.py:70-79`.

### 3.1 KMZ / KML

- Plant boundary must be a **closed polygon**; first and last ring
  coordinate identical. Multiple boundaries in one file are supported
  (multi-plot). Every feature must lie **inside** a boundary polygon.
- Boundary detection: top-level polygons not contained within others;
  polygons fully contained within a boundary become obstacles —
  `kmz_parser.py:1-8`.
- Feature classification is **by name keyword**, case-insensitive —
  `kmz_parser.py:20-32`:
  - **Water:** `pond`, `lake`, `reservoir`, `water`, `wetland`, `swamp`,
    `marsh`, `waterbody`, `water body`, `water_body`
  - **Canal:** `canal`, `channel`, `drain`, `drainage`, `nala`, `nallah`,
    `nullah`, `river`, `stream`, `creek`, `flood`
  - **Transmission line:** `transmission`, `transmissionline`,
    `transmission line`, `powerline`, `power line`, `power_line`, `hv`,
    `hvl`, `ehv`, `132kv`, `220kv`, `400kv`
- Polygons **without** a water keyword are treated as generic obstructions
  (buildings, substations).
- **LineString** features (transmission lines, canals, roads) get a setback
  buffer on each side; total corridor = 2 × setback.
- Open rings raise the **Check boundaries** window (`boundary_validation_dialog.py`,
  a `ResultDialog`): a warning banner *"N of M boundaries have a problem"* (or
  *"1 boundary has a problem"*) with the detail *"Leave them out and continue
  with the others, or fix them in Google Earth and load the file again."*; a
  table with columns **Leave out** · **Boundary** · **Problem** (each problem
  reads *"Ring is NOT CLOSED  (gap between first and last point ≈ 42.7 m)"*,
  `kmz_parser.py:272-275`), every row ticked by default; the note *"An unticked
  boundary is kept as it is and may produce a wrong layout."*; footer buttons
  **All**, **None**, **Fix in Google Earth first**, and the primary
  **Continue without N** (reads **Continue with all boundaries** when nothing is
  ticked) — `boundary_validation_dialog.py:39-159`. **Fix in Google Earth first**
  closes the window and the file is not loaded (`MW:3640-3642`); the primary
  loads the file without the ticked boundaries.
  ⛔ The window is not called "Boundary Validation Issues" and has no plain Cancel.

#### Road line features get their own width — not the TL setback

A distinct behaviour worth its own subsection, because the corridor width is
computed differently — `kmz_parser.py:39-44, 96-133, 311-319, 452-470`:

- A LineString whose **name matches a road keyword** is treated as a road, not
  as a transmission line. Road keywords: `road`, `roads`, `street`, `highway`,
  `internal road`, `access road`, `service road`, `farm road`, `track`.
- A road corridor is buffered by **half its own width each side** — i.e. the
  cleared strip is the road width — rather than by the transmission-line
  setback.
- The width is read from the placemark's KML `ExtendedData`, under any
  attribute named `width`, `road_width`, `roadwidth` or `lane_width`. Both the
  `<Data><value>` and `<SimpleData>` forms are accepted. Values below 1 m are
  raised to 1 m.
- With no recognised width attribute the default is **5.0 m**.
- Roads are assigned to whichever boundary contains the line's midpoint, or to
  the nearest boundary if none contains it.
- Every **other** LineString — transmission line, canal, or a line matching
  no keyword list at all — is buffered by the **Transmission line corridor**
  setback in §4.5. So an unnamed or oddly-named line still becomes a corridor;
  it just uses the setback rather than a width.

#### The preparation guide (ⓘ)

**KMZ File Preparation Guide** (`kmz_help_dialog.py:53-213`): an intro paragraph,
then the sections *1 ▸ Plant / Site Boundary*, *2 ▸ Water Bodies (Ponds, Lakes,
Canals …)*, *3 ▸ Transmission Lines (TL) / Canals / Roads*, *4 ▸ Buildings /
Obstruction Areas*, *5 ▸ Common Mistakes to Avoid*, and a **Quick Reference**
table with the columns Feature / KML type / Name rule / Colour on map; one
**Close** button. ⚠️ Its text is fixed: it lists the water keywords as *"pond
lake reservoir river canal water wetland swamp tank"* and says *"A 15 m setback
is automatically applied on each side of the line."* — the parser's keyword
list (above) and the editable corridor field (§4.5) are the truth.

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

⛔ The **Placed by hand** and **Layout only** details end in sentences that say
*"The design report lists it as placed by hand (check C-01)."* / *"… the design
report lists the location as unknown (check C-01)."* **No such report or check
exists in the product** (`SRV:22, 26` is the only occurrence; §18, §20). Pages
may quote the parts that are true — *"Drawings and the DXF keep the drawing's
own coordinates. KMZ, tilt, row pitch and energy use this location."* (placed);
*"… There is no KMZ and no energy yield … Automatic tilt, row pitch and
building-shadow clearance are off until you enter a latitude."* (layout only;
with a latitude it ends *"… Tilt and row pitch use 27.0739° N."*) — but never
the report sentence.

⛔ There is no *I know the site coordinates* checkbox, no default 20° N / 78° E,
no **Use this location** or **Continue without coordinates**, and the window is
not called "DXF Site Coordinates".

**What each choice means** — `GR:1-20, 177-202`, `dxf_parser.py:9-21, 470-500`:

| | **Drawing's coordinates** | **Placed by hand** | **Layout only** |
|---|---|---|---|
| Where the site is | The drawing's numbers **are** UTM metres in that zone, used as they are (`layout_engine.py:493-496`, `tests/test_location_engine.py:35-42`) | The boundary centre — the **centroid of all boundaries together** (`dxf_parser.py:395-406`) — is put at the typed latitude/longitude; the drawing is translated, never scaled or rotated | **Unknown.** Nothing treats it as a site. ⛔ **The old 20° N 78° E fallback is gone** (`tests/test_dxf_location.py:96-111`) |
| Automatic tilt and row pitch | from the site | from the typed latitude | from the typed latitude, if one was given; **with none, tick both overrides under Array** and set them by hand (`layout_engine.py:720-727`; see §20 for what happens otherwise) |
| Building-shadow clearance | on | on | skipped without a latitude (`layout_engine.py:427-440`) |
| Automatic shading value (Yield) | computed | computed | without a latitude the line reads *"Auto → — (needs the site's latitude)"* (`IP:2531-2543`) |
| Energy | yes | yes | **off** — Calculate Energy disabled; tooltip and Yield status *"Energy yield is off: the site's location is unknown (layout only)."*; the Energy view says the same (`GR:54-55`, `MW:4696-4699, 7704-7709, 7745`) |
| KMZ export | yes | yes | disabled; the menu item reads **Export KMZ — location unknown**, tooltip *"The site's location is unknown (layout only), so a KMZ would put the plant in the wrong place."* (`MW:5311-5320`) |
| Satellite | yes | yes | refused: *"Satellite imagery needs the site's location."* (`MW:5476-5483`) |
| Shadow View | yes | yes | without a latitude, refused: *"Shadow view needs the site's latitude: pick the boundary file again and enter one."* (`MW:9173-9178`) |
| Terrain | a contour DXF in the drawing's (UTM) coordinates; CSV and satellite DEM as usual | a contour DXF **in the boundary drawing's coordinates** | the same, but a longitude/latitude CSV is refused and the satellite DEM is never fetched (`GR:59-64`) |
| Plot units note | *"UTM 42N · metres"* | *"Drawing coordinates · metres"* | *"Drawing coordinates · metres"* (`GR:220-228`) |
| Axis ticks, cursor read-out, pile labels | UTM | the drawing's own coordinates (`tests/test_location_wiring.py:378-405`) | the drawing's own coordinates |
| DXF and ICR-block DXF exports | UTM, the same as the input | **the drawing's own coordinates** — translated back so the export overlays the source drawing (`dxf_exporter.py` `_to_drawing_frame`, `tests/test_location_exports.py:54-66`) | the drawing's own coordinates |
| Pile Excel (§8) | **Easting (m)** / **Northing (m)** + Longitude / Latitude | **X drawing (m)** / **Y drawing (m)** + Longitude / Latitude | **X drawing (m)** / **Y drawing (m)**; Longitude / Latitude **blank** (`SC/pile_export.py:48-80`) |

- The choice is **saved in the project** (`IP:3019-3022`) and **reused at
  Generate without asking** (`tests/test_location_wiring.py:147-161`). An older
  project with a CAD or image boundary and no saved choice is asked at
  Generate; **Cancel** there gives *"Layout not generated: say where the drawing
  sits first."* (`MW:3870-3875`), and **Place Object** before a Generate gives
  *"Say where the drawing sits first."* (`MW:8605`).
- The window opens only from **Browse…**, and re-picking the file replaces the
  layout with a preview, so in practice **changing the location means picking
  the file again and generating again**.
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
| **Electrical** | String Inverter *(or)* SMB – String Monitoring Box · **ACCB & Transformer** *(string design)* / **Transformer** *(central design)* (§4.8c) · Cables — `IP:291-294, 1327` |
| **Yield** | Run Energy Calculation · Energy Yield |
| **Tools** | Obstructions · the tip *"Tip: Click and drag a blue ICR to reposition it."* (hidden until a run has placed ICRs, `MW:1640-1643, 4495`) · Main Control Room & Objects · Studies (§10) |

**The Tools tab is never locked** — it can be opened at any time. Before a
layout exists only its **tab tooltip** changes, to *"Generate a layout first"*
(`set_stage_locked` swaps the tooltip and nothing else, `IP:361-366`; called at
`MW:1747` and after each cable run at `MW:4506-4507`). What is actually
unavailable is the buttons: Draw Rectangle / Draw Polygon / Undo Last / Clear
All, Place MCR / Remove MCR and four of the five Studies buttons are disabled
until a layout exists; **Robot count from DXF…** is enabled from the start
(`MW:1510-1514, 1651-1675, 1704-1708`). ⛔ Do not write "the Tools tab is
locked"; write "its buttons are greyed out until a layout exists, except
**Robot count from DXF…**".

While any input differs from the last run, an 8 px amber dot follows the name
of each tab that holds a change (§6.6).

### 4.1 Module Specifications — `IP:403-477` (Array tab)

| Field | Default | Range | Unit |
|---|---|---|---|
| Module file | *"No .PAN file loaded"*, buttons **Load .PAN** and **View** (View enabled once a file loads) | — | — |
| Length (long side) | 2.38 | 0.5–5.0 | m |
| Width (short side) | 1.13 | 0.5–3.0 | m |
| Wattage | **610** ⚠️ (`MP` says 580) | 100–1000 | Wp |
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
longer on large sites — `IP:505-513`.

**Half tables** are half the E-W width carrying half the strings, dropped
wherever a full table will not fit; the tooltip adds *"Half tables are also
available in Sketch Mode."* — `IP:519-525`.

### 4.3 Spacing & Tilt (Fixed Tilt only) — `IP:529-594`

| Field | Default | Range | Unit |
|---|---|---|---|
| Override tilt angle | off → the line under it reads *"Auto (latitude-based)"* | — | — |
| Tilt angle (when overridden) | 20.0 | 0.0–90.0 | ° |
| Override row pitch | off → *"Auto (no-shading, latitude-based)"* | — | — |
| Row pitch (when overridden) | 7.0 | 1.0–50.0 | m |

- Auto tilt rule of thumb shown in the tooltip: `tilt ≈ latitude × 0.76 + 3.1°`
  — `IP:538-544`.
- Auto pitch is the no-shading pitch at winter-solstice solar noon.
  Formula — `spacing_calc.py:5-15`:
  `pitch = L·cos(tilt) + L·sin(tilt) / tan(solar_elevation)` where `L` is the
  table height in the tilt plane.
- After a layout runs, the auto lines read *"Auto → 12.3° (latitude-based)"*
  and *"Auto → 7.42 m (no-shading, latitude-based)"* and the values are
  pre-filled into the (still greyed-out) boxes — `IP:2078-2103`.
- Reported **GCR** = table height ÷ row pitch.

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

### 4.5 Site Parameters — `IP:993-1050` (Site tab)

| Field | Default | Range | Unit |
|---|---|---|---|
| Perimeter road width | 6.0 | 0.0–50.0 | m |
| Place Lightning Arresters | off | — | — |
| LA protection radius | 100.0 (enabled only when LA is on) | 10.0–500.0 | m |
| ICR Block | 18.000 (three decimals; the field shows **18.000  MWp**) | 0.1–500.0 | MWp |
| Transmission line corridor | 15.0 per side (30 m total) | 0.0–500.0 | m |

- **ICR Block** has three decimals because the AC-capacity study writes the
  block DC into it (§10.1) — `IP:1020-1028`.
- **The number of ICRs is counted per separate piece of land**, not from the
  plant total: Σ over pieces of `ceil(piece MWp ÷ ICR Block)`, half tables
  weighted 0.5 (§5.1). It equals `ceil(total plant MWp ÷ ICR Block)` only on a
  site in one piece — `SC/icr_placer.py:110-201`. ⚠️ The field's tooltip still
  gives the plant-total formula (`IP:1025`; §18).
- With Lightning Arresters **off**, no arresters are placed and tables fill
  the whole usable area; they can still be added by hand in Sketch Mode —
  `IP:785-789`.
- The corridor tooltip suggests raising the setback for higher-voltage lines
  (e.g. 30 m per side for 400 kV) — `IP:813-819`.

### 4.6 Structures & Shadow (keep-clear) — `IP:1051-1149` (Site tab)

A grid with column headers **L**, **W**, **H**: Length (E-W) × Width (N-S),
plus a Height that drives the shadow footprint. The compact fields carry no
unit suffix; the row labels do (*"ICR (m):"*).

| Structure | Length | Width | Height | Unit |
|---|---|---|---|---|
| ICR | **10.0** | **4.0** | 5.0 | m |
| MCR | **15.0** | **8.0** | 5.0 | m |
| USS | 5.0 | 4.0 | 5.0 | m |
| Object | 0.0 | 0.0 | 0.0 (0 = not configured) | m |

Ranges for those twelve fields: **Length 0.0–500.0 m**, **Width 0.0–500.0 m**,
**Height 0.0–200.0 m**, each to one decimal place. They are the same for all
four structures. Corroborated by the constants — `MP:233-243`.

| Other row | Default | Range | Unit |
|---|---|---|---|
| LA (m): *pile Ø* ⚠️ inert | 0.30 | 0.0–5.0 | m |
| LA (m): height ⚠️ inert | 9.0 | 0.0–100.0 | m |
| Shadow Window (h): | **9.0 to 15.0** ⚠️ (was documented as 16.0) | 4–12 / 12–20 | solar hours |
| Clear tables in shadows: | **on** | — | — |
| *— Street Light —* Pile Ø / Height: | 0.30 / 6.0 | 0.0–5.0 / 0.0–50.0 | m |
| Span / Setback: | 40.0 / 0.20 | 1.0–500.0 / 0.0–50.0 | m |
| Place street lights: | **off** | — | — |

- Shadow-window tooltip: *"Solar-time window the keep-clear sweeps on every day
  of the year. 9 to 15 h is the usual shadow-free design window (winter
  solstice governs). A later end adds the low-sun afternoon tail and roughly
  doubles the ground each 5 m building sterilises."* — `IP:883-887`.
- **USS (Unit Substation):** in a multi-plot file, *Place MCR* first drops a
  USS of this size in every plot **except** the one holding the MCR; each
  plot's ICRs route their MV cables to their USS — `IP:861-864`.
  The USS→MCR link itself is an overhead line or buried cable handled
  outside the automatic MV routing — `MP:271-276`.
- **Clear tables in shadows** removes tables/trackers falling inside the
  year-round shadow footprint of the ICR / MCR / objects during the shadow
  window. Note the arrester is **not** in that list.
- ⚠️ **LA height and LA pile Ø do not affect the design.** They are read into
  the layout settings and **nothing in the layout consumes them** — no
  placement, no shadow clearing, no quantity, no drawing. Since #302 they are
  **saved in the project** and **compared as inputs** (changing one marks the
  layout out of date, §6.6) — `IP:159`, `RI:109-110` — and the Word report
  prints them among its input parameters (`docx_exporter.py:293`). **Do not
  claim any design effect for them.**
- **Street lights** on: place poles along the perimeter spaced by the span,
  just inside the fence, and clear tables their shadow touches. Count ≈
  perimeter ÷ span — `IP:919`.

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
| Max strings per inverter *(String)* / Max strings per SMB *(Central)* | 20 | 1–500 | 1 string = 1 row of modules within an MMS-Table |
| Max SMB per Central Inverter *(Central only)* | 10 | 1–200 | Central Inverter capacity = SMB capacity × this |
| OND (inverter) | *"No OND file loaded"*, buttons **Load .OND** and **View** | — | View enabled once a file loads |

- **Load .OND** (file dialog **Load Inverter OND File**) parses a PVsyst
  inverter file; the row then shows *Manufacturer Model*. **PmaxOut** drives
  plant AC capacity, falling back to **Pnom** when absent — `IP:1560-1580`.
  ⚠️ The button's tooltip still says *"The nominal AC power (Pnom) will be used
  to calculate total plant AC capacity and DC/AC ratio."* (`IP:1298-1303`); the
  code uses PmaxOut first (§18).
- The OND also feeds the **ACCB & Transformer** card (§4.8c): PMaxOut sets the
  transformer loads and the power transformer, VOutConv the LV voltage, IMaxAC
  the inverter → ACCB feeder current in the cable schedule (§13.6) — `EG:52-64,
  164`, `CS:153-166`. Loading an OND after a layout regroups at once and marks
  the layout out of date (the OND is a run input) — `MW:8864-8896`, `RI:176`.
- The OND **path is saved in the project**; a missing file reads *"Not found:
  <file>"*, an unreadable one *"Could not load: <file>"* (`IP:2924-2931`).
- **View** opens the read-only viewer **Inverter (OND) — <file>** with **five**
  tabs: *Main parameters*, *Efficiency curve*, *Additional parameters*,
  *Output parameters*, *Sizes and technology* — `ond_viewer_dialog.py:51-58`.
  (There is no *Commercial data* tab.)
- Max central inverters housed in one ICR building: **4** — `MP:141`
  (`max_cinv_per_icr`). In a central design the central-inverter count is
  decided **per ICR block**: `max(1, ceil(block SMBs ÷ Max SMB per Central
  Inverter))`, capped at 4 per ICR, then topped up round-robin to an
  AC-capacity simulation's unit count — `EG:119-143`.
- ⛔ The cable option is **not** in this card any more — see §4.8b.

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
- ⛔ Do not repeat the old tooltip wording (*"BOQ convention 0.5 m"*, *"Untick
  for U-wired strings"*) or say the allowances are not saved.

### 4.8c ACCB & Transformer card and the electrical grouping — `IP:1320-1472`, `EG` (Electrical tab, second card; #301, #308, #309)

Title **ACCB & Transformer** in a string design, **Transformer** in a central
design (`IP:1327`). ACCB is the **AC combiner box** (the product's own
expansion, `IP:1339`, `BB:167`). Spin boxes show the unit after two spaces
(`17.2  MVA`, `1.00  ×`). Rows, top to bottom — defaults `MP:197-213`:

| Field (verbatim label) | Design | Default | Range | Unit | Tooltip (verbatim) |
|---|---|---|---|---|---|
| **Inverters per ACCB, max:** | string | 15 | 1–60 | — | *"Most string inverters on one AC combiner box (ACCB). Each ICR block gets its own ACCBs, the inverters shared evenly."* |
| **ACCBs per transformer, max:** | string | 4 | 1–12 | — | *"Most ACCBs on one transformer; each takes one LV winding."* |
| **Central inverters per transformer, max:** | central | 4 | 1–12 | — | *"Most central inverters on one transformer; each takes one LV winding."* |
| **Transformer size limit:** | both | 17.2 (1 dp) | 0.5–100.0 | MVA | *"Largest transformer allowed. A block whose load is bigger gets more transformers. Never above the largest listed rating."* |
| **Standard transformer ratings (kVA):** (caption, then a full-width text field) | both | `2500, 3150, 5000, 6300, 8000, 10000, 12500, 16000` | — | kVA | *"The ratings a transformer can take, in kVA, separated by commas. Each transformer takes the smallest one at or above its load."* |
| **MV voltage:** | both | 33.0 (1 dp) | 0.4–400.0 | kV | *"The transformers' MV side, and the MV cables to the MCR."* — ⚠️ only half true, see below and §18 |
| **Power transformer margin:** | both | 1.00 (2 dp, step 0.05) | 1.00–3.00 | × | *"Power transformer at the MCR ≥ the plant's maximum AC (every inverter at PMaxOut) × this margin ÷ the derating, rounded up to the next listed rating. Rounding up already leaves headroom."* |
| **Power transformer derating:** | both | 1.00 (2 dp, step 0.05) | 0.50–1.00 | × | *"Below 1.00 for a site above about 40 °C ambient or 1,000 m altitude: the power transformer then needs a higher rating for the same load."* |
| **Standard power transformer ratings (MVA):** (caption, then a text field) | both | `10, 12.5, 16, 20, 25, 31.5, 40, 50, 63, 80, 100` | — | MVA | *"The ratings the power transformer can take, in MVA, separated by commas. It takes the smallest one at or above the plant's need; above the largest, as many transformers as that needs."* |
| **LV voltage:** | both | read-only: *"needs the OND file"*, or *"800 V · from the OND"* (the OND's VOutConv) | — | V | — (`IP:1470-1472`) |
| (answer line, full width) | both | *"Now: Generate a layout first"* | — | — | — |

**Rating lists** (`EG:72-93`, `IP:1409-1426`): entries may be separated by
commas, semicolons or spaces; the list is sorted and duplicates dropped, read
when editing finishes (Enter or leaving the field), and rewritten tidily
(`2500, 5000`). An invalid list keeps the previous ratings and a hint under the
field reads *"<reason> Keeping <previous list>."*, the reasons being *"List at
least one rating."*, *"“x” is not a number."* and *"x is not a positive
rating."* — e.g. *"List at least one rating. Keeping 2500, 5000."*
(`tests/test_grouping_card.py:90, 107`).

**The answer line** (`EG:328-340, 396-408`, `IP:1467-1468`), prefixed
**`Now: `**:

| State | Text |
|---|---|
| No layout / grouping yet | *"Now: Generate a layout first"* |
| String design, OND loaded, all rated | *"Now: 12 ACCBs · 4 transformers: 4 × 16,000 kVA"* (mixed: *"… : 2 × 12,500 + 2 × 16,000 kVA"*) |
| No OND | *"Now: 12 ACCBs · 4 transformers · ratings need the OND file"* |
| Central design | *"Now: 16 central inverters · 4 transformers: …"* / *"… · ratings need the OND file"* |
| A transformer's load fits no listed rating within the limit | *"Now: … transformers: … · <k> with no listed rating"* |

The answer line never mentions the power transformer.

**Grouping rules, per ICR block** (`EG:96-179, 196-218`):

- Devices are the ICR's string inverters (string) or SMBs (central).
- **ACCBs** (string): `ceil(inverters ÷ Inverters per ACCB)`; the inverters are
  shared out in order into groups whose sizes differ by at most one.
- **Central inverters** (central): see §4.8.
- **Transformers:** the larger of `ceil(feeders ÷ per-transformer max)` and,
  with an OND, `ceil(block load ÷ limit)` — never more than one per feeder;
  feeders (ACCBs or central inverters) are shared out in order, and a
  transformer is added while any one is over the limit.
- **The limit** is **Transformer size limit**, but **never above the largest
  listed rating** — with the defaults that is **16,000 kVA**, not 17.2 MVA
  (`EG:96-103`).
- **Transformer (IDT) load** = Σ PMaxOut of the inverters (or central
  inverters) on it; **rating** = the smallest listed rating with
  `load ≤ rating ≤ limit`, or none when nothing fits (the reason is not shown
  anywhere in the UI, §20).
- **Windings** = feeders on the transformer + 1 (`EG:177`, `MP:468`).
- **Voltages:** LV = the OND's VOutConv (none without an OND); MV = the card's
  **MV voltage** (`EG:178`).
- **Without an OND:** counts only; loads, ratings and LV are empty and read
  *"rating needs OND"* / *"needs OND"* (`EG:46-47, 204, 334-335`).

**Power transformer** (whole plant, at the MCR; `EG:243-370`): exists only when
a plot holds an MCR, an OND is loaded and a grouping exists. Units = every
plot's inverters (string) or central inverters (central), because the other
plots feed through their USS. `need = units × PMaxOut ÷ 1000 × margin ÷
derating` MVA; `count = max(1, ceil(need ÷ largest listed))`, each unit the
smallest listed MVA ≥ `need ÷ count`. Text *"63"* or *"2 × 80"* (MVA); *"needs
OND"* with an MCR but no OND; `—` without an MCR. Its basis (the BOM remark)
reads *"Σ PMaxOut 58.1 MVA × margin 1 ÷ derating 1 = 58.1 MVA → next listed
rating"*.

**What an edit on the card does** (`IP:99-101, 1403-1439`, `MW:3141, 8898-8922`):

- Every spin change and every accepted rating list **regroups every plot at
  once, without a Generate** — nothing moves, nothing is re-placed or
  re-routed. It does nothing before the first layout.
- It refreshes the **Now:** line and the Summary view, and closes any open ICR
  block windows (§6.8).
- It does **not** mark the layout out of date — the card's fields are not run
  inputs (§6.6; `tests/test_fresh_results.py:132-146`) — so exports stay
  available. Loading an OND, by contrast, does mark it out of date (§4.8).
- **BOM:** the list is flagged for a rebuild; the next time the BOM view is
  entered it is **recomputed from the layout, and manual BOM edits are
  discarded** without a prompt (`MW:8007-8012, 8916`). Until then the
  Detailed Project Report still prints the previous list (§20).
- **SLD:** a stored automatic diagram is **not** redrawn; choose **Automatic**
  again in the SLD view to rebuild it from the new grouping (§11, §20).
- **Saved in the project:** the card's rules are saved and restored without
  re-running the grouping; the computed grouping itself returns with the
  layout (`IP:3070, 3214-3235`, `MW:3452`).

**Where the grouping shows:** the Summary view's ELECTRICAL rows **ACCBs**,
**Transformers (IDT)**, **Power transformer (MVA)** (§6.4); the ICR block window
and ICR-block PDF/DXF rows **ACCBs** / **Central inverters**, **Transformer**,
**Transformer load** (§6.8, §13.5); BOM rows 12, 13 and 18 (§19a); the automatic
SLD (§11); the cable schedule's collection table (§13.6). All read the same
grouping, so they agree.

⚠️ **MV voltage** reaches the transformers' text, the BOM IDT remark, the SLD
labels and the ICR block **Transformer load** row, but **not the cable
schedule**, which is fixed at 33 kV (§13.6). Its tooltip's *"and the MV cables
to the MCR"* is therefore stale (§18).

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

### 4.10 What a project file keeps — `IP:155-164, 2993-3113`, `MW:3253-3294`

**Every input on the five stage tabs is saved** (since #302; the project
format is version 2, `IP:3010`; `tests/test_every_input_saved.py:39-50`, all
four designs):

- **Boundary and location:** the boundary file path (the sample site as a
  token), the **Site reference** choice and the **image scale** (§3.2, §3.3).
- **Files:** the PAN, OND, hourly weather and contour file **paths** — kept
  even when the file is missing (§6.6).
- **Array:** module size and wattage, bifacial and φ; table orientation,
  modules per row, rows per table, the gaps; tilt and pitch override ticks and
  values; all ten tracker fields; **Maximize placement**; **half tables**.
- **Site:** road width, the **Place Lightning Arresters** tick, LA radius, ICR
  Block (three decimals), corridor; everything in **Structures & Shadow**
  (ICR/MCR/USS/Object L-W-H, LA height and pile Ø, the shadow window,
  **Clear tables in shadows**, the street-light tick and its four fields);
  everything in **Topography**.
- **Electrical:** max strings per inverter/SMB, max SMB per central inverter,
  the **Calculate cables** tick, the three cable allowances, and the **ACCB &
  Transformer** card's rules.
- **Yield:** weather source, GHI/GTI, every loss, the shading auto tick and
  ground clearance, ambient / wind / mounting / albedo, degradation, lifetime,
  uncertainty and P1–P3.
- **Pile patterns** — full, half, the half pattern's "based on" record and the
  radius (§8) — ride inside the saved layout settings (`MP:126-134`,
  `MW:3269-3286, 3365-3366`).

**Also saved** (the layout settings and results are stored whole): the
layout, ICRs, inverters, cables, MCR / USS / objects, drawn obstructions,
sketch elements, hand-drawn trenches, the terrain result, the energy result,
the BOM as edited or templated, the SLD and its background, the electrical
grouping, the robotic-cleaning fleet result, the OND figures, the record of
what produced the layout (the fresh-results baseline, §6.6) and the
AC-capacity target and start point — `MW:3253-3294, 3365-3373, 3427-3433`.

**Not saved:**

- the **Earthing Design** inputs — remembered only while that application
  window stays open (§10.4; `MW:9138-9143`);
- the **Robotic Module Cleaning** window's answers and its bridge / skip
  previews (the fleet result itself is saved) — `MW:1173-1178, 3269-3285`;
- **Robot count from DXF** — never touches the project (§10.3);
- the AC-capacity window's **ICR block AC** (it opens at *Not set* every time;
  its effect, the ICR Block value it wrote, is saved) — `ACD:276-286`;
- view state: Layers toggles, Satellite, Wireframe, **Piles: ON/OFF**, SLD
  paper and expand flags.

**Older projects** (saved before #302) are repaired from their saved layout
settings on opening; the status then reads *"Opened <name>, saved by an earlier
version: 1 input was restored from its saved layout"* / *"…: N inputs were
restored from its saved layout"* (`RI:490-494`, `MW:3389-3396, 3455-3459`).

⛔ Do not write that any Structures & Shadow, Topography, cable-allowance,
Maximize, half-table, LA-tick, shading-auto or ground-clearance setting is lost
on reopening — that was true before #302 and is no longer.


## 5. Layout pipeline

Order of operations — `layout_engine.py:1-11, 858-960`, `MW:544-577, 4016-4138, 4415-4593`:

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
   a **second ICR re-check** that can only lower the count (fixed tilt only) —
   `layout_engine.py:913-956`.
10. Carry the reader's MCR, USS, obstructions, objects and sketch annotations
    onto the new layout and clear tables under them; apply the AC-capacity DC
    target when one is set (§10.1) — `MW:4016-4138`.
11. Place **Lightning Arresters** (when enabled) and clear tables under their
    footprints; top a DC-capped plant back up to its target — `MW:546-559`.
12. Place inverters/SMBs — always, whether or not cables are calculated — and
    route DC / AC / DC-trunk cables when **Calculate cables** is on (§5.3).
13. Route MV cables for every plot that holds an MCR or a USS — `MW:573-576`.
14. Compute trench totals, build the BOM, write the status line and draw —
    `MW:4415-4593`.

⛔ Arresters are placed **before** inverters and cables, not after
(`MW:546-576`; the same order in the re-placement path, `MW:8849-8858`).

- **`usable_polygon`** is the authoritative layout area (boundary − road
  band − obstacles − corridors − terrain exclusions). LA placement and DC
  routing validate against it.
- **Cable containment** (#208; `SIM:4634-4644, 5022-5030`): DC runs are
  clipped to the usable area, so they stay off the perimeter road band. AC
  feeders and central-design DC trunks are held inside the plant boundary on a
  best-effort basis; a run that cannot be re-routed inside keeps its original
  path *"in the drawing, the DXF and the quantities"* and is reported as a
  design warning (§6.7). ⛔ Do not write that every cable is guaranteed to stay
  inside the fence.
- The perimeter road band is exactly `boundary − boundary.buffer(−road_width)`,
  computed once and shared by the on-screen plot, PDF, KMZ and DXF —
  `perimeter_road.py:1-13`.

### 5.1 ICR count and placement — `SC/icr_placer.py` (#274)

**Count — per separate piece of land** (`icr_placer.py:110-201`):

- The tables are split into **separate pieces of land**: two tables share a
  piece when a chain of tables links them with no edge-to-edge gap in the
  chain over **300 m** (`SEPARATE_LAND_GAP_M`). Internal roads, corridors and
  setbacks never split a piece.
- A piece's MWp is the plant MWp shared by module weight (a **half table
  weighs 0.5**). Each piece needs **`ceil(piece MWp ÷ ICR Block)`** ICRs; the
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
stay compact; half tables count 0.5 throughout. Each block is therefore about
`piece MWp ÷ k`, at most one ICR Block and usually less — ⛔ there is no
"leftover small block" any more.

**Placement** (`icr_placer.py:32-103, 419-483`):

- Each ICR goes to the centroid of its block's tables, searched north–south
  first (±100 m in 1 m steps), then in rings (±300 m in 5 m steps). The
  building must fit **fully inside** the usable polygon, at the reader's
  **ICR L × W** (Structures & Shadow; `layout_engine.py:862-865, 892-895,
  946-949`, `tracker_layout_engine.py:479-482, 493-496`).
- **An ICR that finds no valid spot is counted, not silently dropped**: it
  surfaces as the design warning **ICR not placed** — *"2 of the 6 ICRs this
  plot needs found no room in it."* (§6.7; `icr_placer.py:432-433`).
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

**Dragging:** an ICR can be dragged on the canvas; the tables rebuild on
release, an invalid drop snaps back, and the count does not change (§7). Drags
are ignored while cables are being routed (§5.4).

**What an ICR block is** (`IBS`, `SC/icr_blocks.py:1-12, 65-85`): for every
output that talks about blocks — the Layers row, the block window, the
ICR-block PDF and DXF — a block is **one ICR and the tables wired to it**
through their inverter or SMB (the electrical grouping), **not** the placement
cluster above. The two differ slightly because of the inverter-to-ICR
assignment (§5.3). Before inverters are placed a block has no tables.

### 5.2 Lightning Arresters — `la_manager.py`

- Each arrester protects a **circular area of the LA protection radius**
  (default 100 m) from its centre.
- Arresters sit on a square grid with spacing equal to the radius, so
  adjacent circles overlap and every point is within one radius of an
  arrester. Grid spacing of R gives a worst-case gap of `R·√2/2 ≈ 0.707 R` —
  inside the radius, a minimum ~29 % coverage overlap.
- Only grid positions whose centre lies inside the usable polygon are kept.
- After the grid pass, any table whose centre is beyond the radius from
  every placed arrester gets an extra arrester at the nearest valid position.
- **Footprint — fixed tilt: 30 m (E-W) × 7 m (N-S)** (`LA_EW`/`LA_NS`,
  `MP:359-360`, used at `la_manager.py:177-178`). Tables overlapping that
  rectangle are removed.
- **Footprint — SAT: 1 m × 1 m** pole marker (`LA_SAT_W`/`LA_SAT_H`,
  `la_manager.py:46-47`). Each grid X is snapped to the nearest inter-row gap
  centre so the pole sits between tracker columns, and **no tracker units are
  removed**.
- Radius comes from the user's field; the module constant is only a fallback
  — `la_manager.py:172-173`.

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
  building still over its rating is reported as the design warning **ICR over
  rating** (§6.7). ⛔ Do not write "each inverter goes to the nearest ICR".
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
  distinct from conductor totals — many cables share one trench —
  `MP:670-675`. They are computed **only at the end of a full cable run**
  (Generate, or leaving Sketch Mode after a change) — `CE:124-170`,
  `MW:4427`. Canvas edits that re-route cables (drawing an obstruction, Undo
  Last, Clear All, dragging an ICR) re-measure the **cable** lengths but leave
  the **trench** rows at their previous figures until the next full run (§19a).
- **Hand-drawn trenches** (Sketch Mode, §7): a drawn trench of a type
  **replaces every automatic run of that type** in the plot, and both the
  cable and trench totals then come from what was drawn (`CE:139-160`,
  `sketch_manager.py:2383-2400`). In a central design the 🔴 AC Trench tool
  draws the SMB → central-inverter **DC trunk** (`CE:161-170`). Drawn trenches
  survive leaving Sketch Mode but **not a Generate**, which lays out and routes
  everything afresh (§19a). ⛔ Do not write that Generate keeps the current
  cables after trench edits — it does not.

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
- That scaled DC trench is labelled **" (est.)"** (`CE:116`) in: the BOM row
  **DC String Trench (est.)** with the remark *"MMS/Tracker → String Inverter;
  drawn for a sample of clusters, scaled to all tables"* (SMB in a central
  design; `BB:142-149`); the PDF summary page (per-plot and total columns,
  `pdf_exporter.py:1954-1955, 1988-1989`); and the Word report's *DC / AC / MV
  trench* row, e.g. *"12,345 (est.) / … / … m"* (`docx_exporter.py:403-405`).
  It is **not** labelled in the on-screen Summary view, the KMZ, the DXF or the
  cable schedule, and the sampled DC string **cable** is not marked either
  (§20).
- Deleting a sampled DC trench in Sketch Mode scales the deletion by the same
  factor; a hand-drawn DC trench is measured as drawn (`CE:147-154`).

### 5.4 One cable run at a time (#319) — `MW:933-936, 8740-8818`

While an edit's own cable routing is running (after drawing an obstruction,
placing or moving an MCR / USS / object, dragging an ICR, and so on):

- the **Obstructions** and **Main Control Room & Objects** cards on the Tools
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

## 6. The main window: ribbon, left column, views

### 6.0 Chrome — `MW:1136-1273, 2897-2918`

- **Menu bar:** File · Edit-Pile · **Tools** · Help (§16; `MW:1250-1333`).
- **Ribbon** (navy bar): the brand **SolarLayout**; the **design chip** reading
  *"Fixed tilt · String inverter ▾"* / *"Tracker · Central inverter ▾"* etc.
  (tooltip *"Open another window for a different design: fixed tilt or tracker,
  string or central inverter. This window stays open."*, `MW:1223-1230`); a
  status mirror (gold italic) that repeats most status-bar messages — **not**
  the *"Layout ready …"* line, the out-of-date line or quiet messages
  (`MW:10392-10413`); the **access chip** (§15); a **Docs** button (opens
  https://solarlayout.app/docs) and a **Support** button (§15).
- **Left column:** the pinned gold **Generate Layout** button (**F5**) with a
  hint line under it — *"Select a boundary file on the Site tab to generate a
  layout."* while no file is selected (`MW:8381-8421`) — then the five stage
  tabs (§4.0). While any input differs from the last run the button reads
  **Regenerate Layout** with a second line inside it, e.g. *"Module wattage
  changed since the last run"* / *"2 inputs changed since the last run"*; its
  height never changes (§6.6; `MW:1421-1440, 4291-4295`). While Sketch, SLD or
  BOM owns the column a **mode banner** replaces the button (§7, §11, §12).
- **Right side:** a view header, the view itself, and the plant chips.
- **Status bar:** progress and result messages on the left; on the right the
  live **cursor position** — UTM metres for a KMZ or a drawing located by its
  own coordinates, **the drawing's own coordinates** for a CAD or image
  boundary placed by hand or layout only (§3.2) — and the **app version**. The
  version shows the four-part build number with a trailing `.0` dropped, e.g.
  build 2.0.2.0 displays **v2.0.2** (*dev* when run from source) —
  `APP/app_version.py:14-21`, `MW:2903-2909`. There is no idle instruction.

### 6.1 Views — `MW:2683-2714, 6671-6716`

Five tabs across the top of the right side: **Layout · Summary · Energy ·
BOM · SLD** (**Ctrl+1 … Ctrl+5**). They are views of the same plant, so each
takes the whole area under the header. The Energy tab reads *"Energy •"* when a
result landed while another view was up. Tools sit to the right of the tabs:

| Always | **Save project** · **Export ▾** (§13) |
|---|---|
| Layout and SLD | **Satellite** · **Wireframe** · **Piles: OFF** (reads **Piles: ON** when on) · **Layers ▾** · **Sketch** · the three navigation icons **Home**, **Pan**, **Zoom** · **⛶** (expand) |
| Summary and Energy | **Copy** · **Open in window** |

- **Satellite** (disabled until a layout exists): an Esri World Imagery aerial
  photo behind the layout, geo-aligned to the file's latitude/longitude; needs
  internet. Refused on a layout-only site with *"Satellite imagery needs the
  site's location."* (§3.2). **Wireframe**: tables / trackers as outlines only. **Piles**
  (disabled until a layout exists): the pile overlay; first use opens the Pile
  layout editor (§8). **Sketch**: Sketch Mode (§7).
- **Navigation:** the toolbar is reduced to **Home**, **Pan** and **Zoom**
  (`NAV_TOOLS`, `MW:918, 2647-2649`). Home fits the whole plant (tooltip *"Fit
  the whole plant · the mouse wheel zooms at the cursor"*). The **mouse wheel
  zooms at the cursor** in every view but SLD, and the view you set persists
  across redraws until Home, a new layout or a new boundary file —
  `MW:9182-9267`. Back / Forward, Subplots, Customize and the toolbar's Save are
  gone; saving the plot as a picture is **Export ▾ Export Image (PNG)**.
- **When the tools do not fit** beside the tabs, Satellite / Wireframe / Piles
  move to the top of the Layers popover as ON/OFF rows (labelled *Satellite
  image*, *Wireframe tables*, *Piles*) and the button reads **Layers ▾ +3**;
  if still too wide, the tools wrap under the tabs — `MW:6718-6738`.
- **⛶ Expand** opens **SolarLayout — Expanded View**: the plot in a large
  resizable window with a full toolbar and a **⟵ Return to Main Window**
  button; the main window shows *"Plot is open in the Expanded View window.
  Close that window to return the plot here."* meanwhile — `MW:2949-3021`.

### 6.2 Layers popover — `MW:1583-1767`

**Layers ▾** opens a 260 px popover (header *Layers*, × to close) of ON/OFF
pills. Rows in order, with defaults:

| Row | Default | Notes |
|---|---|---|
| Plant layout | **ON** | OFF shows only the boundary and obstacles |
| Legend | OFF | the same switch as the **Legend ▾** chip in the plot corner |
| Lightning arresters | OFF | rectangles + labels + protection circles |
| ICR blocks | OFF | colours each ICR block (the tables **wired** to that ICR, §5.1) and outlines it; enabled only once inverters are placed (an electrical grouping exists) — not greyed while out of date; with it ON a click on a block, or the arrow keys and Enter, opens the block's summary window (§6.8) — `MW:1894-1909, 8929-8937, 10029-10075` |
| DC string cables (Tbl→Inv) | OFF | enabled only when cables were calculated |
| AC cables (Inv→ICR) — *"DC cables (SMB→CI)"* in a central design | OFF | enabled only when cables were calculated |
| MV cables (ICR→MCR) | OFF | needs an MCR placed and cables calculated |
| Contour / terrain | OFF | with an *RL:* readout: *"RL: min – max m · Excluded: x ac / v m³"* |
| Plant totals | **ON** | hides the plant chip row under the view |

⛔ The old ON/OFF switch block in the input panel is gone, "Legend" is OFF by
default (it was documented ON), and there is no "Summary" switch — the row is
**Plant totals** and it hides the chip strip, not a table.

- **Legend chip:** a small **Legend ▾** button in the plot's top-right corner
  (Layout view only); the legend is folded by default so it never sits on the
  drawing; when open the chip reads **Legend ▴** and the legend itself can be
  dragged — `MW:2876-2886, 8687-8700`.
- The plot carries a units note bottom-left: *"UTM 38N · metres"* for a KMZ or
  a drawing located by its own coordinates, *"Drawing coordinates · metres"* for
  a CAD or image boundary placed by hand or layout only — `MW:7116-7124`,
  `GR:220-228`.
- While out of date the plot dims and carries an amber note at its top-left
  (§6.6).
- Canvas colours — `MW:369-382`: tables blue; ICR dark blue; MCR violet
  (`#EE82EE`); string inverters violet (`#8B00FF`); DC string cable **green**
  (`#00b050`); AC cable red; MV cable dark green (`#006400`); arrester circles
  orange-red (`#FF4500`); obstacles / transmission corridor red; water blue;
  the perimeter road band grey.

### 6.3 Plant chips (KPI strip) — `SU/chip_row.py`, `MW:2855-2872, 9093-9124`

One row under every view, never wrapping. Chips and captions, with the value
format: **DC capacity** (*48.11 MWp*), **Site area** (*88.94 acres*),
**Plants** (multi-plot only), **Tables** / **Trackers**, **Modules**,
**ICR blocks**, **Lightning arresters** (only when some are placed),
**Year-1 P50 energy** (*98,377 MWh*, or *—* before an energy run). Clicking a
chip opens the Summary view; the energy chip opens the Energy view. When the
row is too narrow the lowest-priority chips hide first (Lightning arresters,
Plants, ICR blocks, Site area, Tables, Modules; DC capacity and energy last).
Water-body results are left out of the totals. This is the only place plant
totals are shown — the status line no longer carries them.

Two chips can come **first**, both opening the Summary view when clicked and
neither ever hidden for width:

- **Out of date** (amber; value *Out of date*, caption *figures from the last
  run*) while any input differs from the last run; every other chip is then
  greyed (§6.6; `MW:4301`, `SU/chip_row.py:133-160`).
- **Design warnings** (warning tone with an exclamation disc; value = the
  count; tooltip *"Open the Summary view"*) when the design has warnings; after
  the Out of date chip when both show (§6.7; `MW:3057-3070, 10379-10383`).

### 6.4 The Summary view — `MW:2729-2753, 6777-6921`, `SC/summary_sheet.py`

The per-plant figures as a sheet turned on its side: a **Metric** column, one
column per plant (header *"<plant> ›"* — clicking it shows that plant on the
Layout view), and a **Total** column when there are two or more plants. Rows
are grouped under **SITE · ARRAY · ELECTRICAL · CABLES · ENERGY**:

| Group | Rows (fixed tilt / tracker wording) |
|---|---|
| SITE | Plant area (acres) · Boundary length (m) · ICR blocks · Lightning arresters · Street lights · Cleaning robots · Piles |
| ARRAY | Full tables / Full trackers · Half tables / Half trackers · Modules · Tilt (°) / Max tracking angle (°) · Pitch (m) |
| ELECTRICAL | String: DC capacity (MWp) · String inverters · Inverter rating (kWp) · AC capacity (MWac) · Inverter capacity (MW) · DC / AC ratio · **ACCBs** · **Transformers (IDT)** · **Power transformer (MVA)**. Central: DC capacity (MWp) · SMBs · SMB rating (kWp) · Central inverters · Central inverter rating (kWp) · AC capacity (MWac) · Inverter capacity (MW) · DC / AC ratio · **Transformers (IDT)** · **Power transformer (MVA)** (no ACCBs row) — `MW:10091-10107`, `SC/summary_sheet.py:36-48` |
| CABLES | String DC cable (m) · AC cable to ICR (m) / DC cable to central inverter (m) · MV cable (m) · DC trench (m) · AC trench (m) · MV trench (m) |
| ENERGY | P50 energy, year 1 (MWh) · P75 energy, year 1 (MWh) · P90 energy, year 1 (MWh) · CUF (%) · P50 energy, 25 years (MWh) |

- The grouping rows (§4.8c; `MW:10204-10213, 10294`): **ACCBs** — the count;
  **Transformers (IDT)** — *"4 × 16,000 kVA"*, *"2 × 12,500 + 2 × 16,000 kVA"*,
  *"4 · rating needs OND"* or *"4 · 1 with no listed rating"*; **Power
  transformer (MVA)** — the whole plant's figure, shown only on the plot that
  holds the MCR and in Total, `—` elsewhere and without an MCR, *needs OND*
  with an MCR but no OND. All three read `—` before a grouping exists; Total
  sums ACCBs and IDTs.
- The three P rows are named from the reader's exceedance probabilities (§4.9).
- ⚠️ **"P50 energy, 25 years" is mislabelled.** The value is the lifetime
  total — the sum of years 1 to **Plant lifetime** (default **30**) — scaled to
  the first exceedance probability (`energy_calculator.py:696-717`); the row
  name does not follow the lifetime setting. Document it as the lifetime total.
- A trailing **`*`** on Tilt or Pitch means the value was auto-calculated
  (fixed tilt only); a `—` means not computed (cable rows with cables off,
  energy rows before a run). Whole numbers of four or more digits get
  thousands separators on screen.
- Empty state: *"Generate a layout to see the per-plant summary here."*
- **Copy** puts the sheet on the clipboard as tab-separated text (*"Copied.
  Paste into Excel or a document."*). **Open in window** opens
  **SolarLayout — Summary**, a non-modal window with the tabs **Summary** and
  **Monthly energy (Year 1)** (the second enabled once energy exists) that
  follows the layout — `MW:7067-7114`.
- Plant Area is the gross boundary area before the road setback (§19a).
- **Above the sheet**, when they apply: the **out-of-date banner** (the sheet
  is then greyed and **Copy** is disabled; §6.6) and the **design warnings
  banner** (§6.7). The **Open in window** Summary window carries the
  out-of-date banners too (its Monthly energy tab the energy one), but not the
  design warnings.

### 6.5 The Energy view — `MW:2755-2849, 6933-7057`

Before a run: the title **No energy result yet**, a note — *"Generate a layout
first. Energy is calculated for the generated layout."* with no layout, *"Uses
the weather source and losses set on the Yield tab. With PVGIS selected,
irradiance is fetched for the site (needs internet)."* when ready, or *"Energy
yield is off: the site's location is unknown (layout only)."* on a layout-only
site (§3.2) — and a gold **Calculate energy** button that does what the Yield
tab's button does.

Other empty states (`MW:7731-7770`):

- **Out of date, no energy yet:** title **No energy result yet**, note *"Energy
  calculation is not available right now."*, status line *"Regenerate the
  layout first: inputs changed since the last run."*, **Calculate energy**
  disabled (§6.6).
- **After a Generate that replaced a layout with energy:** title **Layout
  regenerated**, note *"The energy result belonged to the previous layout, so
  it was cleared. Calculate energy again on the Yield tab for this layout."*
  (§6.6).

With an energy result and the layout out of date, a banner sits above the
tiles and the figures are greyed (§6.6).

After a run: four tiles — **Year-1 energy** (MWh), **Specific yield**
(kWh/kWp), **Performance ratio** (%), **CUF** (%) — then the monthly table
(columns **Month · GHI (kWh/m²) · H_i (kWh/m²) · T_amb (°C) · T_cell (°C) ·
Y_r (h) · Y_f (kWh/kWp) · PR (%) · Energy (MWh) · CUF (%)**, twelve rows and
a **TOTAL / Annual** row; *"Monthly Energy Breakdown — IEC 61724-1 — Year 1
(all plants combined)"*), under it the chart **In-plane irradiation (kWh/m²,
bars) and performance ratio (%, line)**, and on the right **Monthly energy,
Year 1 (MWh)**. The irradiation chart steps aside on a short window.

The Yield tab's status line after a run reads *"PR: 82.9% | Yr1: 98,471 MWh |
CUF: 23.4% | 25yr: 2,713.1 GWh | Monthly table updated"* — `MW:4358-4362`.

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
| Array: design, module size and Wp, bifacial and φ, orientation, modules per row, rows per table, gaps, table gap, the **Override tilt** / **Override row pitch** ticks, Maximize placement, half tables, every tracker field | always |
| **Tilt angle** / **Row pitch** | only while its override is ticked (`RI:88, 90`) |
| Site: road width, LA tick and radius, ICR Block, corridor, ICR / MCR / USS / Object L-W-H, LA height and pile Ø, shadow window, Clear tables in shadows, street lights and their fields, every Topography field | always |
| Electrical: max strings, max SMBs, **Calculate cables**, the three cable allowances | always |
| Yield: weather source, **every loss**, ambient, wind, mounting, albedo, degradation, lifetime, uncertainty, P1–P3 | always |
| **Temperature losses** | only while no PAN file is loaded (`RI:143`) |
| **Shading losses** | only while automatic shading is off (`RI:146`) |
| Tools: the AC-capacity target, inverter count and start point | always (`RI:164-171`) |
| The **Site reference** choice and the **image scale** | always (`RI:169-170`) |
| Boundary, PAN, OND files | always (`RI:173-179`) |
| Contour file | only while **Avoid steep ground** is on (`RI:184`) |
| Weather file | only while **Hourly GHI file (CSV)** is selected (`MW:4175`) |

⚠️ **Changing any Yield-tab loss makes the whole layout out of date**, so
Calculate Energy is refused until the reader regenerates
(`tests/test_fresh_results.py:222-236`).

**What does NOT mark results out of date:** **GHI** and **GTI** (`RI:137-138`);
values the application fills in itself (auto tilt and pitch, the auto shading
value, the temperature loss recomputed from a PAN); the **ACCB & Transformer**
card (it regroups live, §4.8c); **hand edits** — Sketch Mode, ICR drags, drawn
obstructions, Place MCR / Object, pile patterns (§8), layer toggles, views; and
re-picking an unchanged file at the same path.

**How a change reads in the list** (`RI:298-367`): a number with its unit
(*"610.0 Wp"*); a flag *on* / *off*; location *"not set"* / *"drawing's
coordinates, UTM 42N"* / *"placed at 27.0739, 70.3413"* / *"layout only"*;
scale *"100 m on site = 10 mm"*; AC start point *"E 1,234.5, N 6,789.0"*;
files — edited on disk *"as at the last run → changed on disk"*, missing
*"<name> → not found at <path>"*, locked *"… → can't be read"*, added *"none →
<name>"*, swapped *"<old> → <new>"*.

**Every surface while out of date** (verbatim; `RI:431-498`):

| Where | What the reader sees |
|---|---|
| **Generate button** | **Regenerate Layout**, second line *"Module wattage changed since the last run"* / *"2 inputs changed since the last run"* (`MW:1421-1440, 4291-4295`) |
| **Changed fields** | turn amber; tooltip *"Module wattage: 610.0 Wp at the last run"*; the normal tooltip returns when current (`IP:372-391`) |
| **Stage tabs** | an 8 px amber dot after the name of each tab (Site, Array, Electrical, Yield or Tools) holding a change; tooltip *"Inputs on this tab differ from the last run"* (`IP:256-272, 393-400`) |
| **Layout view** | the plot dims; an amber note top-left: ***Out of date:*** *module wattage changed after this layout was generated.* (several: *inputs changed after this layout was generated.*), with a link **Show 1 change** / **Show 2 changes** (**Hide changes** while open). Layout view only, not SLD (`MW:3090-3104, 7514-7520`, `SU/stale_note.py:25-81`) |
| **List of changes** (popover under the note) | title *"Changed since the last run"*; one row per change: tab · field · ~~was~~ → **now**; footer *"Click a change to go to its input. Change a value back and the layout is current again."* Clicking a row opens the tab, unfolds the card, scrolls to the field and focuses it (`MW:4210-4264`, `IP:402-499`) |
| **Plant chips** | the **Out of date** chip first; every other chip greyed (§6.3) |
| **Summary view** | banner ***Out of date.*** *These figures are from the last run, and 2 inputs have changed since: Module wattage 610.0 Wp → 700.0 Wp, Soiling losses 2.0 % → 3.0 %. Regenerate the layout to update them.* (one: *"…and 1 input has changed since: …"*); sheet greyed; **Copy** disabled, tooltip *"Inputs changed since the last run. Regenerate first."* (`MW:2932-2933, 4280-4320`) |
| **Summary window** | the same banner on its Summary tab; the energy banner on Monthly energy (Year 1) when energy exists (`MW:7879-7931`) |
| **ICR block windows** | banner ***Out of date.*** *These figures are from the last run, and 1 input has changed since. Regenerate the layout to update them.* (no list); **PDF…** and **Copy** disabled with the same tooltip (`IBD:66-68, 145-154`) |
| **Energy view, with energy** | banner ***Out of date.*** *This energy was calculated for the last run, and 2 inputs have changed since. Regenerate the layout, then calculate energy again.*; tiles and table greyed, bars muted — shown **only when an energy result exists** (`MW:2975-2976, 4304-4322`) |
| **Energy view, no energy** | §6.5 |
| **Yield tab** | **Calculate Energy** disabled; tooltip and status line (warning tone) *"Regenerate the layout first: inputs changed since the last run."* (`MW:7684-7722`) |
| **Status bar** | *"Out of date: module wattage changed since the last run. Regenerate the layout to update results and exports."* / *"Out of date: 2 inputs changed since the last run. Regenerate the layout to update results and exports."* — not mirrored to the ribbon (`MW:4323-4337`) |
| **Export ▾ menu** | an amber row at the top, ***Inputs changed since the last run.*** *Regenerate first.*, and **every item disabled, Export Image (PNG) included** (`MW:2614-2623, 5300-5320`) |
| **BOM view, SLD view** | no banner; their exports are refused (below) |

**Exports refused while out of date** — only the status-bar message *"Inputs
changed since the last run. Regenerate first."*; no dialog, no file dialog
(`MW:4355-4361`; `tests/test_fresh_results.py:202-219`): Export KMZ, Export
DXF, Export ICR-Block DXF, Export ICR-Block PDF (and **PDF…** in a block
window), Export Cable Schedule (Excel), Export Detailed Project Report, Export
PDF (with Piles), Export Image (PNG), the pile window's **Export to Excel…**,
**Export TMY data CSV**, **⬇ Export SLD to DWG**, **⬇ Export SLD to PDF**,
**⬇ Export BOM to Excel**, **⬇ Export BOM to PDF**. **Calculate Energy** is
refused with *"Regenerate the layout first: inputs changed since the last
run."* (`MW:4687`). **Save project is allowed.** (The Earthing Design window is
not part of this — §10.4, §20.)

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

### 6.7 Design warnings (#315, #242) — `DV`, `MW:10350-10390`

A warning **never blocks anything** (`DV:13-17`). Warnings are computed from
the **last run's** results, recomputed on every Summary refresh — after
Generate, a cable run, a regroup, an ICR drag, leaving Sketch Mode, drawing an
obstruction — and clear when the design is clean again. They stay shown
(greyed) while the layout is out of date. **The cable checks need Calculate
cables on** and routed feeders; with cables off they say nothing
(`DV:88-95`). Feeders are sized with the design's own PAN Vmp/Imp and the OND's
output voltage, as in the cable schedule (§13.6; `DV:196-198`).

| Check (the name printed in the PDF) | Trigger | Verbatim text (`DV:106-178`) |
|---|---|---|
| **ICR over rating** | an ICR is assigned more inverters (SMBs) than its rating, `ceil(ICR Block MWp × 1000 ÷ device kWp)` (§5.3); only when the plot has more than one ICR (`SIM:4825-4840`) | *"ICR 3 carries 60 inverters; it is rated for 53."*; several: *"4 ICRs carry more inverters than their rating of 53: ICR 2 (60), ICR 4 (58), … and N more."* (six listed, then "and N more"); *SMBs* in a central design |
| **ICR not placed** | fewer ICRs placed than the plot needs (§5.1) | *"2 of the 6 ICRs this plot needs found no room in it."* |
| **Trench outside plant** | AC runs (central: DC trunks) the router could not keep inside the plant | *"1 AC trench runs outside the plant boundary; it keeps its original route in the drawing, the DXF and the quantities."* / *"3 AC trenches run outside … they keep their …"*; *DC trunk trench(es)* in a central design |
| **Trench under a table** | runs still crossing a table | *"1 AC trench still runs under a table."* / *"2 AC trenches still run under a table."* |
| **Feeder over one run** | an inverter → ACCB feeder current above the derated ampacity of one 630 mm² aluminium run | *"1 AC feeder carries 812 A, more than one 630 mm² run can."* |
| **Feeder drop over limit** | a feeder's voltage drop above **2.5 %** (`CS:77`) | *"59 AC feeders drop more than 2.5 % (worst 4.00 %): 447–711 m (longest: ICR1-INV-113)."*; one feeder *"…: ICR2-INV-05, 910 m."*; two *"692 m and 759 m"* |
| **Drop over budget** | the site-wide current-weighted LV AC drop above **1.5 %** (`CS:76, 194-202`) | *"The plant's LV AC drop averages 2.04 %, over the 1.5 % budget."* (plant cell empty; the PDF shows *Whole site*) |
| **DC trunk too long** (central) | a DC trunk whose drop exceeds 2 × 1.5 % even at 630 mm² | *"1 DC trunk is too long for 1.5 % drop even as 2 parallel 630 mm² runs: SMB…, 1,234 m."* |

On a multi-plot site each line starts with the plot name in bold
(`MW:10385-10387`).

**Where warnings appear:**

1. **Summary view** — a warning-tone banner (an exclamation mark, never a
   cross) above the sheet: title *"1 design warning"* / *"2 design
   warnings"*, then *"The layout is complete, but this falls outside the
   design rules. The PDF summary and the BOM carry it too."* (plural *"…but
   these fall outside the design rules. The PDF summary and the BOM carry them
   too."*), then one bullet per warning. Absent on a clean design
   (`MW:2938-2946`, `DV:201-209`).
2. **Plant chips** — the **Design warnings** chip (§6.3).
3. **PDF summary page** (page 2 of **Export PDF (with Piles)**) — a block
   headed **DESIGN WARNINGS (N)** with a table **Plant · Check · Found**
   (*Whole site* for the drop budget); a clean page is unchanged
   (`pdf_exporter.py:1608-1650, 1672-1702`).
4. **Word report** — its **Design Summary** annexure is the same page, so it
   carries the same block (`docx_exporter.py:610`; inferred from the shared
   builder, not tested).
5. **BOM** — a remark starting **`Check: `** on the row the warning qualifies:
   ICR warnings on **ICR (Inverter Control Room)**; feeder and drop warnings on
   **AC Cable (Inverter → ICR)** / **DC Cable (SMB → Central Inverter)**; trench
   warnings on **AC Trench (Inverter → ICR)** / **DC Trench (SMB → Central
   Inverter)**. Several on one row are joined with "; ". A warning whose row is
   absent gets its own row, **Design warning**, with no quantity or unit. In
   the BOM view those rows are tinted in the warning colour with the remark as
   tooltip; the remark travels into the BOM Excel / PDF and the report's BOM
   page (`DV:216-223`, `BB:86-92, 150-181, 229-232`, `MW:8024-8042`).

**Not shown in:** the Summary window, **Copy**, the ICR block windows, the
KMZ, the DXF, or the cable schedule (which has its own Flag column, §13.6).

**On the bundled sample site** (fixed tilt, string inverter, UI defaults):

| Case | Warnings | Source |
|---|---|---|
| Cables off | **0** | code probe 2026-09-28 |
| Cables on, no OND | **0** | code probe; `tests/test_design_verdict_242.py:269-271` |
| Cables on, with the docs' Test PAN / OND, default inputs | **1** | **observed 2026-09-28 capture** |
| Cables on, **ICR Block = 60 MWp** (one ICR) | **2** — *Feeder drop over limit* (*"77 AC feeders drop more than 2.5 % (worst 4.56 %): 396–711 m (longest: ICR1-INV-113)."*) and *Drop over budget* (*"The plant's LV AC drop averages 2.32 %, over the 1.5 % budget."*) | code probe 2026-09-28 |

The exact counts depend on the PAN / OND; pages should not quote a count as a
property of the sample site. Central-inverter and tracker designs were not
probed.

### 6.8 The ICR block summary window (#291) — `IBD`, `IBS`, `MW:9861-10027`

**Opening it** (Layers ▾ ▸ **ICR blocks** ON, Layout view): a left click on a
block (press and release on the same block, moved ≤ 4 px) opens its window; a
double-click, a drag, or a press on the ICR building itself (which starts the
ICR drag) does not. Nothing opens while Sketch, SLD or BOM is on, while Pan or
Zoom is active, or while an MCR / object / AC start-point placement or an
obstruction drawing is in progress (`MW:9876-9931`).

- **Hover** draws nothing on the plot; the status bar reads *"ICR-3 — click to
  open its summary"* (`MW:9933-9946`).
- **Keys** (with the plot focused — switching the row ON gives the plot the
  keyboard): **→** / **↓** next block, **←** / **↑** previous block, **Enter**
  opens the selected one. The selected block gets a thick outline and the status
  reads *"ICR-3 selected — press Enter to open its summary"*
  (`MW:9948-9984`).
- Each click or Enter opens **another** window; windows are non-modal and
  cascade 28 px apart at the top right of the main window.

**The window** — title *"ICR-3 — Demo"* (block — plant), 440 px
(`IBD:49-116`):

- **Strip:** a colour swatch, the block name, the plant name, and chips
  **Fixed tilt** / **Single-axis tracker** and **String inverter** / **Central
  inverter**.
- **Tiles:** **DC capacity** (`x,xxx.xxxx MWp`, note *"s.s % of the plant"*) ·
  **Tables** / **Trackers** (note *"n full · m half"*) · **Modules** · **String
  inverters** / **SMBs** (central note *"n central inverters"*).
- **Card** (selectable values), in order: Block area (acres) · Block perimeter
  (m) · ACCBs *(string)* · Transformer · Transformer load · Inverter capacity
  (MW) · AC capacity (MWac) · DC/AC ratio · DC string cable (m) · AC cable Inv
  to ICR (m) *(string)* / DC trunk SMB to CInv (m) *(central)* · Lightning
  arresters · Piles.
- **Note line**, joining what applies: *"Cable lengths need Cable Calc."*,
  *"Inverter capacity needs an OND file."*, and always *"Energy is calculated
  for the whole plant (Energy view)."* — **energy is deliberately not split per
  block** (`IBS:14`).
- **Footer:** **PDF…** (tooltip *"Save this block's sheet as a PDF: the block,
  a key plan of the plant and this table"*; save dialog **"Save ICR-3 PDF"**,
  one page; status *"ICR-block PDF exported (1 pages): <path>"*; refused while
  out of date; needs active access), **Copy** (tooltip *"Copy this summary as a
  two-column table (pastes into Excel)"*; reads **Copied** for 1.4 s; copies
  `ICR block`, `Plant` and every row as tab-separated lines), **Close**
  (default).

**How each value is computed** (`IBS:117-267`; the same rows print in the
ICR-block PDF and DXF sheets, §13.5; `—` = not available):

| Row | Format | Computation |
|---|---|---|
| Block area (acres) | `,.2f` | the block outline's area ÷ 4046.856 m² |
| Block perimeter (m) | `,.0f` | length of the outline rings |
| Full tables / Full trackers · Half tables / Half trackers | count | by the table's half flag |
| Modules | count | Σ modules on the block's tables |
| DC capacity (MWp) | `,.4f` | modules × module Wp |
| Share of plant DC (%) | `.1f` | block DC ÷ plant DC |
| String inverters / SMBs | count | the grouping's devices on this ICR |
| ACCBs *(string)* / Central inverters *(central)* | count or `—` | from the grouping (§4.8c) |
| Transformer | text | e.g. *"1 × 16,000 kVA · 4-winding"*; without an OND *"1 · 4-winding · rating needs OND"*; `—` with none |
| Transformer load | text | e.g. *"13,200 kVA · 33 / 0.8 kV"*, *"… · 33 kV"* when the OND names no AC voltage; `—` without an OND |
| Inverter capacity (MW) | `,.3f` or `—` | the plant's inverter capacity × this block's share of devices |
| AC capacity (MWac) | `,.3f` or `—` | the plant AC capacity (the AC-capacity target when one was run, else the inverter capacity) split the same way |
| DC/AC ratio | `.3f` or `—` | block DC ÷ block inverter capacity |
| DC string cable (m) · AC cable Inv to ICR (m) / DC trunk SMB to CInv (m) | `,.0f` or `—` | the per-ICR cable totals, only when cables were calculated |
| Lightning arresters | count | each arrester counts in the block whose outline holds its centre, else the nearest, so blocks sum to the plant total |
| Piles | count or `—` | Σ each table's own piles (§8), when a pile pattern exists |

Blocks are named **ICR-n** (the ICR's number in its plant, with no plot
prefix in the window); the outline hugs the block's tables, closes gaps inside
it, avoids other blocks and is clipped to the boundary, so a block can have
several pieces; colours cycle through 16 fixed colours (`SC/icr_blocks.py:32-62,
113-174`).

**Windows close themselves** on any inverter re-placement (an ICR drag, a
drawn obstruction and the other canvas edits), any regroup (an OND load or an
ACCB & Transformer card change), and on opening a project
(`MW:3343-3345, 8833, 8917, 10022-10027`). A window opened while out of date
starts with the out-of-date banner (§6.6).

## 7. Sketch Mode — `sketch_manager.py`, `MW:1769-2111, 5377-5453`

**Sketch** (Layout view tools) switches it on. The left column is taken over:
an orange banner **● Sketch Mode** with the table count on the right and one
button **Exit Sketch Mode — apply edits, recalc totals**; leaving the Layout
view also switches Sketch off. Status on entry: *"Sketch Mode ON — select a
tool from the left panel."*

**Leaving Sketch Mode** (#219; `MW:6081-6163, 8261-8326`) compares the plot
with how it was on entry — tables (position, size, half), arresters,
inverters, roads, sketch elements, the three hand-drawn trench lists and the
MCR position; a purely cosmetic edit such as a line colour does not count:

- **Nothing changed:** nothing is recomputed, redrawn or re-routed; the status
  reads *"Sketch Mode OFF."*
- **Something changed:** plant totals (modules, capacity, LA count) are
  recomputed and the summary rebuilt, and a cable run always follows: it
  re-places the inverters / SMBs and, with **Calculate cables** on, re-routes
  every cable. The status reads *"Sketch Mode OFF — plant totals updated."*,
  then the *"Layout ready …"* line when the run ends (§17).

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
| ➕ LA | Click to place a lightning arrester (tables under its footprint are removed). |
| 🚧 Road | **Drag a straight centre-line, then enter the road width (m)** in a **Road width** prompt (default 5.0 m). The corridor is placed and tables under it are removed. |
| ⚡ T-Line | Drag a straight centre-line, then enter the corridor width (m) in a **Transmission line corridor** prompt (default 10.0 m). The red line is placed and tables in the corridor are removed. |
| ╱ Line / ⌒ Polyline | Draw, then a **Line width** prompt: 0 = line only, more than 0 = a corridor that removes tables under it. Polyline: click vertices, right-click to finish. |
| □ Rect / ○ Circle / ◜ Arc / ⬭ Ellipse / ∿ Spline / ▨ Fill/Zone | Annotation shapes (arc: start, end, then a point on it; spline and fill: click points, right-click or double-click to finish). |
| 🅣 Text | Click to add multi-line text (an **Add text** prompt); move it with Move. |
| 📏 Measure | Click points; snaps to corners / edge midpoints / centres. 2 points = distance + bearing; 3 or more then double- or right-click = area + perimeter; angles at each vertex; Esc clears. Not saved. |
| 📐 Dimension | A permanent dimension between two points (click-drag, or click a start point then type a length); saved, redrawn, exported to DXF. |
| 🧭 Scale bar + N | Shows a metric scale bar and a north arrow (toggle). |
| 🟢 / 🔴 / 🟩 trench | Click vertices, right-click to finish. A drawn trench **replaces every automatic run of that type** in the plot, and the totals come from what was drawn; it survives leaving Sketch Mode but **not a Generate** (§5.3). In a central design 🔴 draws the SMB → central-inverter DC trunk. |
| ✂ Del Trench | Click any trench (automatic or manual) to delete it. ⚠️ A deleted **automatic** run lasts only inside the Sketch session: with **Calculate cables** on, leaving Sketch Mode re-routes every cable and the run comes back (`MW:8314-8326`; observed 2026-09-28). ⛔ Do not describe the deletion as lasting. |
| ⟳ Rotate / ⤢ Scale / ⇋ Mirror / ⇥ Offset / ▤ Array | Act on the selection: a typed angle (° clockwise); a factor; left↔right or top↔bottom; a perpendicular distance; a rectangular or polar pattern. |
| ⧉ Group / ⿲ Ungroup | Group selected annotations so they select and move together (Group needs 2+ annotations selected). |
| 📂 Import DXF | Editable elements on the active layer; coordinates read as-is in project metres (§19a). |

⛔ There are **no Pan / Zoom buttons** in the palette: the navigation icons and
the mouse wheel do it, and a drag is ignored by the sketch tool while Pan or
Zoom is on.

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

**Moving an ICR:** with no Pan / Zoom tool active, click-hold a blue ICR, drag to
a valid spot inside the perimeter road and release — the layout rebuilds.
Invalid drops snap back. The Tools tab shows *"Tip: Click and drag a blue ICR to
reposition it."* once a run has placed ICRs. A drag is ignored while cables are
being routed (§5.4).

**Obstructions** (Tools tab) are internally called roads; every label says
*Obstruction*. **Draw Rectangle** (*"Click and drag on the plot to draw a
rectangular obstruction."*), **Draw Polygon** (*"Click to add vertices.
Double-click or right-click to close."*), **Undo Last**, **Clear All** —
`MW:1480-1522, 5305-5375`. Status after a draw: *"Obstruction added — n tables |
m modules | x MWp"*; after Clear All the status still reads *"All roads cleared."*
A drawn obstruction re-places the inverters and, with cables on, re-measures
the cable lengths; the trench rows keep their old figures until the next full
cable run (§5.3, §19a).

**MCR / objects** (Tools tab, **Main Control Room & Objects**): **Place MCR**
(reads **Cancel Placement** while armed; hint *"Click on the plot to place the
MCR."*, or in a multi-plot file *"n plots — click INSIDE each plot to drop a USS
(Unit Substation). The LAST unassigned plot you click gets the MCR. Each plot's
ICRs route to its own USS/MCR."*), **Remove MCR**, **Place Object** (enabled as
soon as an Object L/W/H is set, no layout needed), **Remove Objects**. Placement
outside the boundary is refused with *"Please place inside the boundary."*;
after placing: *"MCR placed. Total MV cable: n m"* (with cables) or *"MCR placed.
Enable 'Cable Calc' and regenerate layout to route MV cables."* —
`MW:1525-1579, 7519-7850`.

## 8. Piles — `PD`, `SC/piles.py`, `SC/pile_export.py` (#288 spec, #290, #296)

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
- **Footer:** **Export to Excel…** (enabled with a full pattern; exports the
  edits in the window, applied or not), a line *"{N} piles across the plant"*
  (full units × full pattern + half units × half pattern), **Close**, and the
  primary **"Apply to all {N} tables"** (**"Apply to whole plant"** when the
  count is unknown; disabled with *"Place at least one pile"* when there is no
  pattern; **"Remove piles from all {N} tables"** when the pattern was emptied).

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
  across **Generate** and a new boundary file (`SC/piles.py:148-159`,
  `MW:4027, 8632, 3269-3286, 3365-3366`). The overlay's ON / OFF is not saved.
  Pile edits do **not** make the layout out of date (§6.6).

**Every output that counts or draws piles** (each unit counts its own piles):

| Output | When | Detail |
|---|---|---|
| Summary **Piles** row | a full pattern exists — **overlay state irrelevant** | Σ each unit's own piles (half units the half pattern); `—` without a pattern (`MW:10174-10183, 10275-10285`) |
| Plot overlay | pattern exists and **Piles: ON** | circles `#ffcc00`, labels for piles in view |
| **Export to Excel…** (pile window) | a full pattern; refused while out of date; needs active access | sheet **Pile Coordinates**; save dialog **Export Pile Coordinates**, default `pile_coordinates.xlsx`; status *"Exported {n} pile coordinates → {path}"* and a box *"Exported {n} pile coordinates to: {path}"*; with no pattern *"Define at least one pile first."* (`SC/pile_export.py:49-91`, `MW:5431-5468`) |
| **Export PDF (with Piles)** | **Piles: ON** and a pattern | page 1 draws each unit's own piles with Easting / Northing labels (1 dp, in the drawing's frame), at 300 dpi; the summary page gains a **Piles** column (`pdf_exporter.py:433-454, 1411-1421, 1754-1757`) |
| **Export DXF** `PILES` layer | **Piles: ON and a pattern** — a pattern alone is not enough | a circle per pile (the pile radius) and E / N text (2 dp); colour orange (`MW:5639`, `dxf_exporter.py:189, 242-244, 358-384`) |
| ICR block window **Piles** row, ICR-block PDF | a pattern exists | Σ the block's units' own piles (`MW:5703, 9994`) |
| ICR-block DXF **Piles** row and `PILES` layer | **Piles: ON** and a pattern | the same count (`MW:5667`) |
| KMZ, Detailed Project Report | never | — |

**Pile Excel columns**, in order (`SC/pile_export.py:62-65`): **Pile ID ·
Plant · Table No. · Unit** (`Full` / `Half`) **· X local (m) · Y local (m) ·
Easting (m)** (or **X drawing (m)**) **· Northing (m)** (or **Y drawing (m)**)
**· Longitude · Latitude · Pile Ø (m)** (= 2 × radius). The "drawing" names
apply when the site is placed by hand or layout only; Longitude / Latitude are
blank when the location is unknown (§3.2).

⛔ Do not write that the pattern is stamped onto every table, or that half
tables count at full weight — both were true before #290 and are not now.

## 9. Energy calculation — `energy_calculator.py`

**Run Energy Calculation** card (first on the Yield tab) — `MW:1405-1471`:
**Calculate Energy**, **📊 Show Energy Chart**, **Interval:** (1 min, 10 min,
**15 min**, 30 min, 1 hour) and **Export TMY data CSV**, plus a status line.
All disabled until a layout exists; the Energy view's **Calculate energy**
button is the same action. **Calculate Energy** is also disabled while the
layout is out of date (§6.6) and on a layout-only site (§3.2), each with its
own tooltip and status text.

Irradiance priority: PVGIS (EU JRC, returns in-plane GTI directly for the
lat/lon/tilt/azimuth, no key) → NASA POWER (monthly GHI climatology with a
simple isotropic tilt correction) → zeros with source `unavailable`. Status
lines: *"Fetching irradiance from PVGIS…"*, *"Irradiance fetched from PVGIS (EU
JRC): GHI n | GTI n kWh/m²/yr | 12 monthly values"*, or *"PVGIS fetch failed —
check your internet connection, or switch to 'Hourly GHI file (CSV)' and load a
local file."*

Model:
- `Specific yield = GTI (kWh/m²/yr) × PR`
- `Year 1 energy = capacity_kWp × specific_yield` (before LID)
- `Year 1 (actual) = Year 1 × (1 − first_year_deg%)`
- `Year n (n ≥ 2) = Year 1 (actual) × (1 − annual_deg%)^(n−1)`
- `CUF = Year 1 (actual) / (capacity_kWp × 8760) × 100 %`

Monthly figures follow **IEC 61724-1**:
- `Y_r = H_i / G_STC` (h), `Y_f = E_AC / P_0` (kWh/kWp), `PR_m = Y_f / Y_r`
- Monthly PR varies with module temperature: ambient follows a sinusoidal
  seasonal model whose amplitude scales with |latitude| (or comes from the
  file's temperature column when present);
  `G_m = monthly GTI × 1000 / (days × 8 h/day)` W/m²; `T_mod_m` from Sandia.

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

**📊 Show Energy Chart** — `energy_timeseries_window.py`: a window titled
*"Hourly energy · 48.11 MWp · Fixed tilt · PR 82.9 %"* with one toolbar: a view
combo **Daily (hourly)** / **Monthly (yearly)**; **◀**, a date field with a
calendar, **▶**; and chips *Energy*, the peak hour, *Irradiance*. Daily view:
24 hourly bars of energy over 24 bars of in-plane irradiance, a hover readout
(*"Drag along the month strip or use ◀ ▶ · hover the chart for hourly
values"*), and a day slider with twelve clickable month ticks. Monthly view:
twelve bars of energy (MWh) and irradiance (kWh/m²) with *"Full year <year> ·
monthly totals"*. Data source priority: hourly GTI in the loaded file → hourly
GHI transposed to GTI → synthesised from 12 monthly GTI values plus solar
geometry → uniform annual distribution.

**Export TMY data CSV** — `MW:4513-4562`, `energy_calculator.py:938-1019`:
full-year GHI, GTI and Energy time series at **1 / 10 / 15 / 30 / 60 min**,
default **15 min** (dialog **Export TMY Irradiance & Energy Data**, default
name `tmy_energy_15min.csv`). `E (kWh) = capacity_kWp × GTI(W/m²)/1000 × PR ×
LID × (interval/60)`. Timestamps are local time. Needs an hourly series — a
loaded file or a PVGIS API hourly fetch.

**🌓 Shadow View (row spacing)** (Studies, Tools tab; `shadow_view_dialog.py`):
window **Shadow View** with two tabs. **Between rows (side view)** — a
cross-section of three adjacent rows; inputs **Tilt angle**, **Row pitch**,
**Lower-edge height** (note *"Analysis only — the layout is unchanged"*);
sliders **Day of year** (default 355) and **Solar time** (5–19 h, default 12);
a verdict such as *"The rear row is shade-free …"* (tick) or *"n % of the rear
row is shaded …"* with *"Sun elevation … · profile angle … · lower s m of the L
m slope"*. **Object shadow (plan / keep-clear)** — **Object length (E–W)**,
**Width (N–S)**, **Height**, **Solar time from … to …**; verdict *"Keep a m²
clear — the shadow reaches up to r m"* or *"This object casts no shadow in the
chosen window"*. On a layout-only site without a latitude it is refused:
*"Shadow view needs the site's latitude: pick the boundary file again and
enter one."* (`MW:9173-9178`).

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

All five are present from the start. Buttons 1, 2, 4 and 5 are enabled at the
end of a run that produced a layout (`MW:4502-4504`); **Robot count from DXF…**
is always enabled (`tests/test_left_column.py:69-73`). **Robot count from
DXF…** and **Earthing Design…** are also on the **Tools** menu (§16). ⚠️ After
**Open Project** the four layout studies stay disabled until a Generate (§20) —
do not document that as intended.

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
  | **Modules per string**, with a **Size…** button (§4.8a) | — (not verified) | 1–200 | — |
- **EQUIPMENT**: the **MODULE · PAN** and **INVERTER · OND** rows with **View**
  and **Replace…**, a one-line spec of each, and an expander **Override
  nameplate values** (**Module Pmax** 0–2000 W, **Inverter rated AC**
  0–100,000 kW). When a nameplate value is missing the expander opens with
  *"The PAN file has no module power (PNom). Enter it to run the simulation."*
  or *"The OND file has no rated AC power (PNomConv). Enter it to run the
  simulation."* (`ACD:497-505`).
- **RESULT · updates as you type**: a verdict banner, *Target DC* and
  *Headroom* over a capacity meter (*"layout holds x MWp"*), and tiles
  **Inverters**, **Strings per inverter**, **Installed AC**, **Target DC**,
  **DC/AC ratio**, **DC per inverter**. Then the **ICR block AC** row (#292,
  `ACD:265-290, 547-558`): a spin 0–5,000,000 **kW** (step 100) that reads
  **Not set** at 0 (its default, every time the window opens); tooltip *"AC
  capacity one ICR block serves. ICR block DC = block AC × DC/AC ratio; ICR
  blocks = plant AC ÷ block AC, rounded up. Regenerate writes the block DC into
  the input panel's ICR Block. Leave at 0 to keep the input panel's ICR
  Block."*; beside it *"→ {n} blocks of {x.xxx} MWp DC"* when set, *"keeps the
  input panel's {ICR Block} MWp blocks"* when not set (the panel value when the
  window opened), `—` when the inputs are invalid. A central design then adds
  **Strings per SMB** (default 20) with *"→ n SMBs per inverter"* — in the
  RESULT column, **enabled only when the verdict fits** (its answer reads `—`
  otherwise; `ACD:292-326, 539-545`).
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

Field details (`RCD:133-186`, `RC:23-70, 443-541`): **Skip lines up to**
applies per **segment** (a whole line, or a stretch between unbridged gaps),
a half unit counting 0.5; its tooltip adds *"half steps are allowed (e.g. 0.5
skips a lone half {unit})"*. **Out and back** tooltip: *"When ticked, the
distance to cover is twice the segment length, so a shorter range is needed to
finish a row."* A gap counts as standard up to the **span + 0.25 m** (placement
tolerance, `RC:49-52, 476`).

**RESULT** — `RCD:461-511`: a verdict banner, always the **good** kind, headline
*"n robot(s) for m line(s)"*, detail:

- extra robots and a bridgeable gap left: *"k of them only because of
  unbridged gaps."*, plus *" Bridge a gap to save its robot."* only while no
  crossing gap is ticked;
- extra robots but no bridgeable gap left: *"k of them because of gaps whose
  bridge would leave the site."*;
- robots equal lines: *"One robot per cleaning line."* (also when every gap is
  bridged and no range is set);
- otherwise *"No robot is lost to an unbridged gap."* — when the range or the
  skip threshold moves the count with nothing split;
- any ticked crossing gaps append *" n crossing bridge(s) is/are preview only."*;
- no tables: headline **"No tables placed"**, detail *"Generate a layout first,
  then size the cleaning fleet."*, the primary reads **Add to BOM**, disabled,
  reason *"No tables to clean"*.

Tiles and their sub-lines: **Standard bridges** (*"+ n supported"* or *"gaps
up to x m"*), **Longest segment** (value in whole metres; *"+n robot(s) for
range"*, *"within range"* or *"no range limit"*), **Cleaning segments** (*"k
skipped · −n robot(s)"*, *"n unbridged gap(s)"* or *"no broken lines"*), **One
full pass** (metres; *"out and back"* or *"one way"*).

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
earlier overlays (`MW:9194-9263`). Footer: the meta *"Bridges preview on the
plot as you tick them."*, **Close** and the primary **Add n robot(s) + m
bridge(s) to BOM** (m = standard plus supported bridges; tooltip *"Confirm this
fleet quantity and the bridges — the robot count is added to the layout, the
results summary, the BOM and the exported reports."*). Results feed the
Summary's *Cleaning robots* row and the BOM, and are saved with the project;
the window's own answers are not (§4.10).

### 10.3 Robot count from DXF (#276, #299) — `RDD`, `RDX`, `RDR`, `RC`

Sizes a cleaning-robot fleet from **any plant layout DXF**, with no layout
generated. Opened from **Tools ▸ Robot count from DXF…** or the Studies button
of the same name (both always enabled). A modal window; **nothing is written
into the current project, layout, BOM or Summary** — the footer says
*"Nothing is added to the current project."* (`MW:9206-9211`, `RDD:17, 601`).
It is the same counting engine as Robotic Module Cleaning (§10.2).

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

**Tiles** (`RDD:272-278, 848-862`; `—` with no result): **Standard bridges**
(*"gaps up to {span} m"*), **Wide gaps** (*"{k} bridged · {m} split"*),
**Longest segment** (*"x.x m"*; *"+n robot(s) for range"*, *"{2x} m out and
back"* or *"one way"*), **One full pass** (*"x.xx km"* from 1000 m, else
metres; *"all robots together"*).

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
— {file}"* (Row · Gap m · Cause · Bridged). The **analysis notes appear only in
the PDF**: *"{n} table(s) drawn twice were counted once."*, *"{n} shape(s) on
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

### 10.4 Earthing Design (#318, issue #317) — `ED`, `EA/`, `MW:1315-1323, 1499-1505, 9130-9144`

A preliminary **IEC earthing calculation** for the generated layout: how many
earth pits, which GI strip / Cu cable size for each connection, the earthing
plan, a calculation report and a bill of quantities. IS 3043 and IEEE 80 are
shown alongside as cross-checks and **never govern**.

**Opening it:** **Tools ▸ Earthing Design…** (always enabled; with no usable
layout it shows **Generate first** — *"Generate a layout first, then open
Earthing Design."*) or the Studies button **⚡  Earthing Design** (disabled
until a layout exists). Water plots and plots without tables are left out.

**The window** — title **Earthing Design**, **non-modal**, minimise and
maximise buttons, minimum 760 × 480, opening at 1240 × 760 clamped to the
screen (`ED:94-149`). A verdict banner across the top; inputs on the left
(scrolling); results on the right in tabs **Layout · Calculation · BoQ**; the
footer. Every field shows for every design (no fixed / tracker or string /
central switching). The frequency is fixed at 50 Hz (`EA/calc.py:118`).

**There is no Run button.** The window calculates when it opens, and then 300
ms after any input change (`ED:99, 133, 357-373`).

**Inputs** — defaults from `EA/calc.py:92-172`, groups in order (`ED:158-298`):

**1. Soil & site**

| Field | Default | Range | Unit | Tooltip / effect |
|---|---|---|---|---|
| Soil resistivity | 100.0 | 1–100000 | Ω·m | *"Measured soil resistivity (Wenner 4-pin test)"*; × Season factor = the design resistivity used everywhere |
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
| X/R | 10.0 | 0–60 | — | *"System X/R for the decrement factor"* — ⛔ never document 0 (§20) |

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

Size lists take commas or semicolons, `×` for `x`, any case. A malformed entry
turns the banner to warn — **"Check the size lists"** / *"GI strip sizes are
width x thickness (e.g. 25x6, 50x10); Cu cable sizes are mm² (e.g. 16, 35)."* —
and disables the three exports with *"Fix the inputs to export"*; the results
keep the last valid calculation (`ED:440-504`).

**6. Equipment rules**

| Field | Default | Range | Unit | Tooltip / effect |
|---|---|---|---|---|
| IDT per ICR (fallback) | 2 | 0–10 | — | *"Used only when the layout has no transformer grouping"* |
| Pits per ICR / USS | 2 | 0–8 | — | pit groups at the ring corners |
| Neutral pits per IDT | 2 | 0–8 | — | pit groups south of each ICR, per transformer |
| Pits for MCR | 2 | 0–8 | — | pit groups at the MCR ring corners |
| Aux transformer at MCR | on | — | — | adds auxiliary-transformer neutral pits and a body link |
| Aux TX neutral pits | 2 | 0–8 | — | — |
| Min. pits per LA | 3 | 1–12 | — | minimum ring size per arrester |
| Fence pit every | 50 | 0–1000 | m | *"0 = no fence pits"* |
| Gates | 1 | 0–20 | — | one pit per gate |
| CCTV pole every | 100 | 0–2000 | m | *"0 = no CCTV poles"* |
| Weather stations | 1 | 0–10 | — | — |
| Serrated washers / module | 4 | 0–12 | — | *"Serrated washers per module (frame bonding)"* |
| Tracker bonding jumper | 16 | 6–120 | mm² | *"Trackers: flexible tinned Cu braid across each bearing and the slew drive"* |
| Jumper length | 0.50 | 0.1–5 | m | — |
| Bearing spacing (no piles) | 7.5 | 1–30 | m | *"Trackers without a pile pattern: jumpers are estimated from the tracker length at this bearing spacing"* |

**7. Layout rules**

| Field | Default | Range | Unit | Tooltip / effect |
|---|---|---|---|---|
| Strip in AC / MV trenches | on | — | — | lays strip along the MV and AC cable routes and hand-drawn trenches; when off, or with no MV route, an L-shaped MV backbone joins each ICR ring to the USS / MCR ring |
| MMS link length | 2.0 | 0–20 | m | *"Strip per MMS table (riser + clamp)"* — counted, not drawn |
| Equipment link length | 5.0 | 0–50 | m | *"Strip per equipment body link"* |
| Fence / pole link length | 3.0 | 0–50 | m | counted per fence, CCTV and street-light pit |
| Row runner gap split | 15 | 1–200 | m | *"Break a row runner at bigger gaps"* |
| Max cross-link length | 30 | 1–200 | m | *"Longest row-to-row cross link"* |

**Method** (`EA/calc.py:1-26, 174-616`; the report's design basis,
`EA/report.py:19-28`):

- **Design resistivity** = soil resistivity × season factor (150 Ω·m on the
  defaults).
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
  Defaults: **32.45 Ω** IEC, 34.87 Ω IS 3043.
- **Pits per point:** *One pit per point* (default) gives 1 pit at each
  equipment point, bonded to the grid (note when one pit misses its target:
  *"One pit alone is {R} Ω (> {target} Ω). Each equipment pit is bonded to the
  main grid, so the plant grid value applies at every point."*); *Add pits*
  adds pits in a line until each point meets **Each earth pit** (up to 50;
  defaults 10 pits → 4.78 Ω). **LA:** a ring of at least **Min. pits per LA**
  until ≤ **LA earth pit** (IEC 62305-3 type A; defaults 5 pits → 9.07 Ω). The
  report also gives the electrode length one pit would need (defaults 30.6 m).
  Warnings: *"Electrode shorter than 2.5 m — below IEC 62305-3 type A vertical
  minimum for LPS class III/IV."*, *"Rod diameter below 15 mm — below IEC
  60364-5-54 minimum for copper-bonded steel rod."*, *"Pit spacing is less than 2
  × electrode length — pits screen each other; resistance gain from extra pits
  is reduced."*
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

**What gets earthed** (per land plot; `EA/layout.py`): a GI **row runner**
along every table row (fixed tilt E–W near the south edge; tracker N–S on the
centre line), broken at gaps over **Row runner gap split**; **cross links**
between rows within **Max cross-link length**; an MMS-link allowance per table;
a **Cu cable** from each inverter / SMB to the nearest runner; **trench strip**
along MV and AC routes (when on); a ring 1.5 m round each **ICR** with pit
groups at its corners and IDT-neutral pits south of it (the IDT count from the
electrical grouping, else the fallback); **USS** and **MCR** rings with their
pits (and auxiliary-transformer pits); **weather-station** pits beside the MCR;
a **pit ring round each arrester**; **fence**, **gate**, **CCTV** and
**street-light** pits (local pits: not bonded to the mesh, no strip drawn, an
allowance each); isolated parts tied in with L-shaped strips. **Trackers only**
get bonding jumpers — one per pile of the pile pattern, else estimated from the
bearing spacing. Totals are drawn length + allowances, × (1 + Wastage). A
multi-plot site gets one network and one grid check per plot; the banner uses
the worst.

**Results:**

- **Verdict banner** (`ED:527-541`) — good when every plot meets the IEC grid
  target and the IEC touch check, otherwise warn (per-point and LA misses do not
  affect it). Title *"{pits} earth pits · plant grid {R} Ω (target ≤ {target}
  Ω)"*; detail the strip lengths by size and the Cu cable, e.g. *"GI 25x6 71,320
  m, GI 50x10 359 m, Cu 35 mm² 720 m."*, then *" The grid misses its IEC target
  or touch limit — see Calculation."* when not met, or *" One pit alone is {R} Ω;
  bonded to the grid it takes the plant value."* Example measured on the sample
  site without an MCR: *"280 earth pits · plant grid 0.11 Ω (target ≤ 1 Ω)"*
  (the pit count changes once an MCR is placed). No tiles.
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
  mm"*, *"incl. {n}% wastage"*), the Cu cable, MMS earthing connections,
  serrated washers, tracker bonding jumpers (trackers), and LA test joints —
  `EA/layout.py:632-675`.

**Footer and exports** (`ED:331-572`, `EA/export.py`): **Export DXF…**,
**Export BoQ…**, a status label, **Close**, and the primary **Export PDF
report…**.

| Export | Dialog | Default file | Contents |
|---|---|---|---|
| PDF | **Export earthing report** | `Earthing_Design.pdf` | *"Earthing Design Report — {project}"*; A4 portrait pages for sections 1–10, then an A3 landscape **Earthing Layout** page |
| DXF | **Export earthing DXF** | `Earthing_Layout.dxf` | in the layout's own coordinates; layers `REF_LAYOUT`, `EARTH_GI_{size}_{duty}` (e.g. `EARTH_GI_50X10_MV`, `EARTH_GI_25X6_LV`), `EARTH_CU_CABLE_{n}SQMM`, and one `EARTH_PIT_…` layer per pit category |
| BoQ | **Export earthing BoQ** | `Earthing_BoQ.csv` | CSV (UTF-8 with BOM): `S.No,Description,Qty,Unit,Remark` |

After a save the footer reads *"Saved {path}"*; nothing goes to the main
status bar. A write error shows *"Could not save the file: …"*.

**How it relates to the rest of the application:**

- **Not saved** in the project; the inputs are remembered only while that
  application window stays open (reopening the window brings back the last
  values; **File ▸ New Project** starts at the defaults) — `MW:9138-9139`.
- **Not in** the BOM, the Summary, the Export menu, the main DXF / KMZ / Word
  report. Earthing materials come only from this window's BoQ and CSV.
- **It does not follow the layout.** An open window keeps the layout it was
  opened on; after a Generate or an edit, open Earthing Design again to work on
  the new layout. It has no out-of-date marking (§20).

## 11. SLD view — `sld_manager.py`, `sld_symbols.py`, `sld_autobuild.py`, `sld_sheet.py`

The **SLD** tab (Ctrl+5) shows the drawing sheet on the right and takes over
the left column with a blue banner **● SLD Preparation** / **Exit SLD** and the
**SLD TOOLS** panel. **Nothing is generated on entry** — the view shows the
stored diagram, if any, and clears the radio buttons (`MW:6716-6726,
7227-7234`). The row **Generate:** offers **Automatic** (build the diagram from
the layout's counts, the **electrical grouping** of §4.8c and the OND file;
status *"Auto-built SLD (simple feeder) — edit as needed."* or *"Auto-built SLD
(full (per-ICR/feeder)) — edit as needed."*; without a layout *"Generate a
layout first, then choose Automatic."*) or **Manual** (tooltip *"Start a blank
sheet and draw the SLD yourself with the tools below."*; status *"Manual SLD —
draw with the tools below; nothing is auto-generated."*; *"Start a blank SLD
for manual drawing? This clears the current diagram."* when one exists) —
`MW:2302-2304, 7210-7294`.

- ⛔ **The automatic build never reads the bill of materials** (since #303;
  `SA:1-6`, `MW:7275-7294`; the report's fallback diagram neither,
  `pdf_exporter.py:1210-1217`). Editing the BOM or loading a BOM template cannot
  change the diagram. ⚠️ The **Automatic** button's tooltip still says *"Generate
  the SLD automatically from the current layout + BOM."* — stale, do not quote
  it (§18).
- **When it rebuilds:** only when **Automatic** is chosen, or **Full SLD** is
  toggled while Automatic is active (`MW:7236-7273`). A stored diagram is not
  refreshed by a Generate, an **ACCB & Transformer** card change or an OND load;
  choose **Automatic** again (§20).

- Tools (2-column grid): **↖ Move/Select**, **🗑 Delete**, **╱ Wire**,
  **📝 Text**, then the symbols **PV Module**, **Inverter**, **SMB**, **ACCB**,
  **2 Wdg Tx**, **3 Wdg Tx**, **4 Wdg Tx**, **5 Wdg Tx**, **MV Panel**,
  **Lightning Arr.**, **ISO+Earth Sw**, **Isolator+Earth**, **VT (2 Core)**,
  **CT**, **VSS**, **Voltmeter (V)**, **MFM**, **VCB**, **CB ON/OFF/TRIP**,
  **R-Y-B Phase**, **Fuse**, **MCB**, **MCCB**, **⊚ Relay** (asks for the ANSI
  device number), then any imported image symbols.
- **🖼 Import Image Symbol** traces an image's outlines into a **vector**
  symbol (crisp line art, real vectors in DWG/DXF), stored per user across
  sessions; the **Symbol Editor — edit, then Accept** window opens first with
  **✏ Pen**, **🧽 Erase**, **🗑 Clear** and **Accept** / **Reject**.
  **🗑 Delete Image Symbol** removes one.
- **Rotate:** angle spin (0–360°, step 15, default 90) + **⟳ Apply**, **⟲ 90°**;
  **🔗 Group**, **✂ Ungroup**, **⧉ Copy**; **View:** **✋ Pan**, **🔍 Zoom**,
  **⤢ Fit**; **🗑 Clear SLD**; checkbox **Full SLD (per-ICR / per-feeder)**
  (Automatic only; tooltip *"Off = single annotated feeder with ×N
  multiplicities. On = expand into parallel feeders converging to per-ICR
  transformers. Toggling rebuilds the auto-SLD."*, `MW:2463-2467`; what each
  draws is below); **📄 Import PDF /
  DXF**, **✖ Remove BG**; **⬇ Export SLD to DWG**, **⬇ Export SLD to PDF**;
  hint *"Pick a symbol, click on the canvas to place it. Move/Select
  (Shift-click) to select; ⟲ 90° or Apply to rotate. Use ✋ Pan / 🔍 Zoom to
  navigate (turn off to edit)."*; checkbox **Hide Layout & Energy Summary**
  (hides the plant chip row).
- The inverter and every transformer are placed **pre-rotated to 270°** so
  they align with the horizontal bus — `sld_manager.py:736-739`.
- **📄 Import PDF / DXF**: a vector SLD PDF cannot be reliably parsed back into
  typed symbols, so the first page is rendered to a high-resolution image
  (longest side capped at 2600 px) and placed as a **background**; the reader
  overlays editable symbols, wires and text, and the whole thing carries into
  the exports — `pdf_sld_import.py:1-18`.
- **Auto-build** — `SA:57-432` (#301, #303). It needs no energy run. Counts,
  ratings and voltages are the **electrical grouping's** (§4.8c) — the card's
  rules, defaults 15 inverters per ACCB, 4 ACCBs (or central inverters) per
  transformer, size limit 17.2 MVA capped at the largest listed rating (16,000
  kVA by default).
  - **Simple feeder** (Full SLD off): string design **PV** (*"{modules} ×
    {Wp}Wp"*, *"PV Array {strings} strings"*) → **String Inverter** (*"{kVA}
    kVA"* from the OND's nominal AC power, only with an OND; *"String Inverter
    ×{N}"*) → **ACCB** (*"ACCB ×{n}"*) → **Transformer** (*"{rating} {MV}/{LV}"*,
    *"Transformer ×{n} ({k}-Wdg)"*) → **MV Panel** (*"{MV} kV Switchgear"*) →
    *"GRID {MV} kV"*; central design **SMB ×N** → **Central Inverter ×n** →
    Transformer → MV Panel. Wire labels carry the multiplicities (modules and
    strings per device, the most inverters on one ACCB, the most feeders on one
    transformer, the transformer count).
  - **Full SLD** (on): **one row per feeder** — per ACCB (string) or per central
    inverter (central), plant-wide, labelled **ACCB-1…** / **C.Inv-1…**,
    grouped by transformer **TX-1, TX-2…** (*"TX-{k} ({n}-Wdg)"*; the rating
    and voltages under TX-1), then *"{MV} kV Panel"* and the grid. ⛔ Not "one
    row per control room".
  - **Labels:** a rating *"12,500 kVA"*, a range *"12,500–16,000 kVA"*, or
    *"rating needs OND"*; MV from the card's **MV voltage**; LV *"{V} V"* or *"LV
    needs OND"*. Header *"SINGLE-LINE DIAGRAM"* and *"{MWp} MWp DC · {MW AC}
    MW AC · String|Central Inverter · {n} ICR"* (MW AC only with an OND).
  - **Winding symbol:** 1 feeder → 2-Wdg, 2 → 3-Wdg, 3 → 4-Wdg, **4 or more →
    5-Wdg** (the symbol set stops at five windings; simple mode uses the most
    feeders on any transformer, full mode each transformer's own; §20).
  - **Paper:** simple feeder A3; Full SLD A3 up to 10 feeders, A1 up to 28,
    else A0 (`SA:74-82, 207`).
- The sheet is an **A3 landscape** frame (420 × 297 units) with an orange
  outer border, an inner frame, a zone grid (8..1 across, F..A down) and a
  right-hand band carrying LEGENDS, NOTES and a blank title block —
  `sld_sheet.py:1-21`. For a large plant the **physical** paper size grows
  (A3 → A1 → A0) while the drawing box keeps A3 proportions —
  `pdf_exporter.py:1468-1476`.
- **⬇ Export SLD to DWG** writes a DXF natively and converts it to DWG when
  the ODA File Converter is installed, otherwise it stays `.dxf` —
  `sld_dxf_export.py:1-16`.

## 12. BOM view — `bom_builder.py`, `bom_presets.py`, `bom_template_window.py`

The **BOM** tab (Ctrl+4) shows the editable table on the right (columns
**S.No · Material Description · Quantity · Unit · Remark**) and takes over the
left column with a green banner **● Bill of Materials** / **Exit BOM** and the
**BOM TOOLS** panel: **➕ Add Row**, **🗑 Delete Selected Row**, **⚙ Rebuild
from Layout** (discards edits); **BOM Template:** — a combo with **Plant
(auto-computed)** and **only the one built-in template that matches the
current design** (`30MWp_20MW_String_FT`, `30MWp_20MW_Central_FT`,
`26.65MWp_20MW_String Inverter_SAT` or `26.65MWp_20MW_Central Inverter_SAT`) —
and **📥 Load Template**; **⬇ Export BOM to Excel**, **⬇ Export BOM to PDF**;
the hint *"The main table is the automated BOM. Load Template opens it in a
separate window; edit it there, then replace the plant BOM with it (used in the
PDF)."*; checkbox **Hide Layout & Energy Summary**. Status on entry: *"BOM Mode
ON — double-click any cell to edit. It prints on its own page in the PDF."*

- **Load Template** opens **BOM template — <name>**, a separate non-modal
  window (**+ Add row**, **Delete row**, **Close**, and the primary **Replace
  plant BOM with this template**, confirmed by a **Replace plant BOM** box).
  After replacing: *"Plant BOM replaced with the template (n rows). It will
  appear on the PDF Bill of Material page."* Closing after edits asks *"You
  edited the template. Replace the plant BOM with it before closing?"*
- The computed line items are in §19a. The BOM view and every BOM output use
  that builder (`BB`, `MW:88, 4437, 8010`); the newer headless materials core
  (#277) and its catalog lines (#310: LV-IDT cable, glands, lugs) have **no
  consumer in the application** — ⛔ do not document them.
- **Design-warning remarks:** rows qualified by a design warning carry a
  remark starting **`Check: `** and are tinted in the warning colour, with the
  remark as tooltip; a warning whose row is absent adds a **Design warning**
  row (§6.7).
- ⚠️ **When the list is recomputed:** after a **Generate**, an **ACCB &
  Transformer** card change or an OND load on an existing layout, the next
  entry to the BOM view **recomputes the list from the layout and discards
  manual edits without asking** (`MW:4432-4440, 8007-8012, 8916`). Tell the
  reader to make BOM edits last, or to use a template.
- **Earthing materials are not in the BOM** — earth pits, GI strip, earthing
  cable, washers, jumpers and test links come only from **Earthing Design**'s
  BoQ tab and CSV (§10.4).
- BOM exports are refused while the layout is out of date (§6.6).

## 13. Exports

### 13.1 The Export menu — `MW:2601-2644, 5293-5334`

**Export ▾** sits beside **Save project** in the view header. Items, in order:

| Item | Produces | Available |
|---|---|---|
| *(amber row)* ***Inputs changed since the last run.*** *Regenerate first.* | — | shown only while out of date; every item below is then disabled, Export Image (PNG) included (§6.6) |
| **Export KMZ** | the Google Earth file (§13.2) | after a layout with a known location; on a layout-only site it reads **Export KMZ — location unknown**, disabled, with the reason as tooltip (§3.2) |
| **Export DXF** | the layered CAD drawing (§13.3) | after a layout |
| **Export ICR-Block DXF** | one DXF drawing set: sheet 1 the whole plant with a blocks table, then one sheet per ICR block with its summary table (§13.5) | once inverters are placed (a grouping exists) |
| **Export ICR-Block PDF** | one A3 PDF: sheet 1 the whole plant with every block and a table, then one sheet per block with its key plan and details (§13.5) | once inverters are placed |
| **Export Cable Schedule (Excel)** | a workbook with one sheet per ICR block: DC strings, AC feeders or DC trunks, and the collection runs to the transformers and MCR (§13.6) | after a layout with ICRs — **Calculate cables is not required** (`MW:4398-4412`) |
| — | | |
| **Export Detailed Project Report** | a **Word document (.docx)** — cover page, site layout plan, design summary, single line diagram, bill of materials and energy yield (§13.1a) | after a layout |
| **Export PDF  (with Piles)** (the label has two spaces before the parenthesis, `MW:1565`; write **Export PDF (with Piles)** in prose) | the PDF report including the pile drawing and coordinates | visible only while **Piles** is on, a pattern exists and a layout exists (`MW:5293-5298, 5310`) |
| — | | |
| **Export Image (PNG)** | the plot as it is on screen, as an image file | after a layout |

The menu's exports are disabled while a run is in progress, and refused while
the layout is out of date (§6.6). Access: see §15 for which exports check it.
Status lines: *"KMZ exported: …"*, *"DXF exported: …"*, *"ICR-block DXF
exported (n block sheets + plant): …"* (with no blocks *"DXF exported (no ICR
blocks — whole plant only): …"*), *"ICR-block PDF exported (n pages): …"*,
*"Cable schedule exported (n ICR-block sheets): …"*, *"Document exported: …"*,
*"PDF exported: …"*.

Also outside the menu: **Export TMY data CSV** (Yield tab, §9), **⬇ Export BOM
to Excel** / **⬇ Export BOM to PDF** (BOM tools), **⬇ Export SLD to DWG** /
**⬇ Export SLD to PDF** (SLD tools), **Export to Excel…** (pile editor),
**PDF…** (an ICR block window, §6.8), and the **Earthing Design** window's PDF /
DXF / CSV (§10.4) — the earthing outputs are not on this menu. The **Robot count
from DXF** window writes its own PDF (§10.3).

⚠️ The **Export ▾** button's tooltip still lists *"KMZ, DXF, ICR-block DXF,
cable schedule, project report"* and omits the ICR-block PDF (`MW:2606-2608`);
do not quote it as the list.

⛔ There is no *"Export PDF (Layout + Summary)"* button any more, and no export
button block under the inputs.

### 13.1a The Detailed Project Report (.docx) — `SC/docx_exporter.py`

Saved through **Save Word Document**. A3 landscape, 12 mm margins, footer
*"Rensaar Private Limited — Detailed Project Report"*. Content order: cover
page → **Project Overview & Methodology** → **Design Basis — Input Parameters**
→ **Results & Analysis — Output** → **Energy Yield & Loss Analysis** (only when
energy was calculated) → the drawing annexures **Site Layout Plan**, **Design
Summary**, **Single Line Diagram**, **Bill of Materials** (paginated *(i/n)*)
and **Energy Yield — Drawings** (two figures when monthly data exists, else
one). The drawings are the same page builders the PDF uses. The layout
drawing hides DC / AC / MV cables and the arrester circles and forces the
arrester rectangles and labels visible, then restores the on-screen state
(§19a). The **Design Summary** annexure carries the **DESIGN WARNINGS (N)**
block when the design has warnings (§6.7), and on a sampled very large plot
the *DC / AC / MV trench* row marks the DC figure *"(est.)"* (§5.3a). The
Structures & Shadow inputs it prints include the LA height and pile Ø
(`docx_exporter.py:293`). It never carries piles. The SLD annexure uses the
stored diagram when there is one, else builds the automatic one
(`pdf_exporter.py:1203-1217`); the BOM annexure prints the current BOM list
(§12).

**Export PDF (with Piles)** (`pdf_exporter.py:1689-1750`): every page A3
landscape, in this order — the engineering drawing (layout, border, north
arrow at top-right, title block, plant-details table) with **each table's own
piles** (half tables the half pattern, §8) labelled with Easting / Northing;
the summary (layout summary, design parameters, inverter/cable summary with
the per-ICR breakdown, a **Piles** column, and the **DESIGN WARNINGS (N)**
block — a table **Plant · Check · Found** — when there are warnings); the
single-line diagram (skipped silently on error); the bill of materials
(paginated); the energy pages (only when energy was calculated: two pages with
monthly data, else one). Metadata: Title *"SolarLayout.Desktop Report"*,
Subject *"Automated PV layout summary"*.

### 13.2 KMZ — `kmz_exporter.py:1-11`

One folder per boundary, named after the plant, containing the boundary
polygon, exclusion zones, the panel tables, and a **summary placemark**
(capacity MWp, area acres, pitch, table count); plus an **Overall Summary**
folder aggregating every boundary. Inverters, ICR, arresters and cables are
also written. Opens in Google Earth. A drawing placed by hand lands at the
typed boundary centre; a layout-only site cannot export a KMZ (§3.2).

### 13.3 DXF — `dxf_exporter.py:166-218`

⚠️ **The module docstring's layer list is incomplete — it omits six layers.**
The list below is read from the `layers.new(...)` calls that actually run.

All coordinates in metres: **UTM** for a KMZ boundary or a drawing located by
its own coordinates; **the drawing's own coordinates** for a CAD or image
boundary placed by hand or layout only, so the export overlays the source
drawing (§3.2; `tests/test_location_exports.py:54-66`).

**Always written:**

| Layer | Carries | Colour |
|---|---|---|
| `BOUNDARY` | plant boundaries | yellow |
| `PERIMETER_ROAD` | the road setback band, as two outline polylines with no fill | grey |
| `OBSTACLES` | exclusion zones | red |
| `WATER` | water bodies | light blue |
| `TERRAIN` | reduced-level contour lines | grey |
| `TABLES` | module tables / tracker units | blue |
| `ICR` | inverter control rooms | cyan |
| `MCR` | main control room | violet |
| `INVERTERS`, or `SMB` in a central design | inverters or string monitoring boxes | lime |
| `OBSTRUCTIONS` | hand-drawn obstructions | green |
| `OBJECTS` | user-placed objects | brown |
| `STREET_LIGHT` | street-light poles | orange |
| `ICR_MCR_SHADOW` | the year-round keep-clear shadow of the control rooms | grey |
| `OBJECT_SHADOW` | the keep-clear shadow of placed objects | grey |
| `STREET_LIGHT_SHADOW` | the keep-clear shadow of the street lights | grey |
| `DC_TRENCH` / `AC_TRENCH` / `MV_TRENCH` | trench routes, automatic and hand-drawn | green / red / dark green |
| `SKETCH` | **all** Sketch-Mode annotations | white |
| `ANNOTATIONS` | labels and text | white |

**Conditional:**

| Layer | Written when |
|---|---|
| `DC_CABLES` (orange), `AC_CABLES` (magenta), `MV_CABLES` (green) | cable calculation was on |
| `LA` (maroon) | arresters were placed |
| `PILES` (orange) | a pile pattern exists **and the Piles overlay is ON at export** — a pattern alone is not enough (`MW:5639`, `dxf_exporter.py:189, 242-244`) |

- ⛔ **Sketch-Mode layers do NOT become CAD layers.** The layer set is fixed;
  every annotation lands on the single `SKETCH` layer regardless of which
  in-application layer it was drawn on.
- **Tables are written as block references**, not as individual polylines —
  every table of a given size is an insert of one shared block definition, so
  editing that block in a CAD program updates every table in the plant at once
  (`dxf_exporter.py:212-218`). The block's own geometry sits on layer `0`.

### 13.4 What the Google Earth export does NOT carry

Checked against `kmz_exporter.py`: **street lights, piles and terrain contours
are not written.** They appear on the plot, in the report drawing and in the
CAD export, but not in the Google Earth file.

### 13.5 Export ICR-Block PDF and Export ICR-Block DXF (#291, #296)

Both are enabled once inverters are placed (an electrical grouping exists) and
the layout is current; both need active access (`MW:8936-8937, 5647-5709`).
Blocks are those of §5.1 / §6.8. On a site where more than one plot has ICRs,
block names in the PDF and DXF carry a `P{n}-` prefix (`IBP:369-380`,
`dxf_exporter.py:837-853`).

**Export ICR-Block PDF** (`IBP`, `MW:1536-1543, 5680-5709`) — tooltip *"Export
one A3 PDF: page 1 = whole plant with every ICR block in its colour, then one
page per block with its key plan and details."*; save dialog **"Save ICR-Block
PDF"**; status *"ICR-block PDF exported ({n} pages): {path}"*. A3 landscape in
the report's engineering frame and title block; metadata Title *"ICR block
layout"*. Pages: 1 + one per block (the plant sheet alone with no ICRs).

- **Sheet 1** — the whole plant, each block's tables in a lightened block
  colour with its outline and a labelled ICR, a scale bar; panel **"ICR BLOCK
  LAYOUT"**, the project name(s), a north arrow; a table **"ICR BLOCKS"** with
  columns **BLOCK · AREA (AC) · TABLES/TRACKERS · MODULES · DC (MWP) ·
  INVERTERS/SMBS · AC (MWAC) · DC/AC** and a **TOTAL** row when there are
  several blocks (`IBS:270-295`); **NOTES:-** *"Each colour is one ICR block:
  the tables wired, through their inverter / SMB, to that ICR."*, *"Block sheets
  follow (sheet 2 onwards)."*, *"Cable schedule: refer to the cable schedule
  Excel (Export Cable Schedule)."*, *"All dimensions are in metres unless
  stated."*; doc title **"ICR BLOCK LAYOUT - PLANT"**.
- **Sheets 2…** — zoomed to the block (other blocks grey, the block's inverters
  / SMBs dark), a **"KEY PLAN"** with this block in red, a title *"{ICR-k}  -
  {PLANT NAME}"* and the design line, then **"BLOCK DETAILS"** (**S.NO · ITEM ·
  VALUE**, every row of §6.8); **NOTES:-** naming the cable-schedule sheet
  *"ICR-k"*, *"Area and perimeter are measured on the block outline."*,
  *"Tables belong to the ICR their inverter / SMB feeds. Other blocks are shown
  in grey."*; doc title **"ICR BLOCK LAYOUT - ICR-k"**.
- The **Piles** row is filled whenever a pile pattern exists (overlay state
  irrelevant, `MW:5703`).
- A block window's **PDF…** writes that block's sheet alone (*"SHEET NO:- 1 OF
  1"*).

**Export ICR-Block DXF** (`dxf_exporter.py:800-953`, `MW:5647-5678`) — save
dialog **"Save ICR-Block DXF"**. Model space is the full **Export DXF** drawing
(§13.3); paper space holds A3 landscape sheets:

- **"01 - Plant"** — a viewport on the left; on the right the title **"ICR
  BLOCKS - {plant names}"**, the same blocks table as the PDF, and notes
  *"Block sheets follow (02 onwards)."* and *"Cable schedule: refer to the cable
  schedule Excel (Export Cable Schedule)."*
- **"NN - ICR-k"** per block — a viewport; the title **"{name} SUMMARY -
  {plant}"**, a subtitle *"{Fixed tilt|Single-axis tracker} - {String
  inverter|Central inverter}"*, an **ITEM / VALUE** table of the §6.8 rows, and
  the three block notes.
- Tables are paper-space text on layer **`SUMMARY_TABLE`**, with CAD-safe
  characters (— and – become `-`, × becomes `x`, " · " becomes ", "), so a
  transformer prints as `1 x 16,000 kVA, 4-winding`.
- Per block: layers **`ICR{n}_TABLES`** (the block's tables) and
  **`ICR{n}_BND`** (outline and label), in the block colour; each block sheet
  freezes the other blocks' layers.
- The **Piles** row and a `PILES` layer appear only when the Piles overlay is
  ON and a pattern exists (`MW:5666-5667`; §20).
- The arrester layer follows the Layers popover's arrester switch.

### 13.6 Export Cable Schedule (Excel) (#305, #310, #301) — `CS`, `MW:5711-5756`

- **Availability:** after any layout that is current and has ICRs;
  **Calculate cables is not required** — without it lengths are straight line
  × 1.15 (`MW:4398-4412`, `CS:664-666`). Save dialog **Save Cable Schedule
  (Excel)**, filter *"Excel Workbook (*.xlsx)"*. Plots with tables and ICRs are
  scheduled; on a multi-plot site each sheet name is prefixed `P{i}-`
  (`MW:5730-5742`). Status *"Cable schedule exported ({n} ICR-block sheets):
  {path}"*. With no ICR blocks: box **Cable Schedule** — its text mentions
  *"Enable 'Cable Calc'"*, which is stale (§18).
- Button tooltip, unchanged: *"Export a detailed cable schedule as an Excel
  workbook — one sheet per ICR block: DC strings (table/row → inverter/SMB) and
  AC/DC-trunk feeders, with recommended conductor sizes."* (`MW:1544-1551`) — it
  does not mention the collection table.

**Sizing inputs** (`CS:56-118`): module Wp from the Module card; Vmp and Imp
from the PAN (else Vmp 42 V and Imp = Wp ÷ Vmp); LV voltage = the OND's
VOutConv, else **800 V** (string) / **690 V** (central). Fixed settings: DC
conductor copper; AC and MV aluminium; max DC drop 1.5 %; AC feeder 300 mm²;
LV drop budget 1.5 % (plant average), flag above 2.5 % per feeder; derate 0.9;
route factor 1.15 (when lengths are not routed); minimum DC string size 4 mm²;
MV sizes 300 / 400 mm²; **MV voltage 33 kV, fixed**; ACCB / central inverter →
transformer lead **20 m**; MV max drop 2.0 %; power factor 1.0.

**One sheet per ICR block**, named `ICR-{b}`:

- **A1** *"Solar PV Plant — Cable Schedule — {sheet}"* (the project name is
  always *Solar PV Plant*).
- **A2** (italic grey), the basis line, verbatim pattern (`CS:645-676`):
  *"Basis: module {Wp} Wp, Vmp {Vmp} V, Imp {Imp} A, {m} modules/string, string
  {V} V; DC copper, AC aluminium; max VD DC 1.5%; AC feeders 3C x 300 mm2
  aluminium, one run (stepped up and flagged only where the current needs it),
  current: {feeder basis}; LV drop budget 1.5% average, flag > 2.5%; derate 0.9;
  {lengths from routed layout | route ×1.15}; min DC string 4 mm2; IDT LV {LV} V{,
  idt basis}; MV aluminium 300/400 mm2 @ 33 kV{, current: mv basis}, max VD
  2.0%."* — feeder basis *"IMaxAC {A} A (from the OND)"*, *"PMaxOut {kW} kW ÷
  (√3 × {V} V × PF 1)"* or *"DC kWp of each inverter (no OND loaded)"* (*n/a* on
  central sheets); idt basis *"current: the sum of each ACCB's feeders"*
  (string), *"current per central inverter: {feeder basis}"* or *"… an equal
  share of the block's DC Wp"*; mv basis *"Σ PMaxOut of the block's inverters
  ({kVA} kVA each)"* (or central inverters) or *"the block's DC Wp (no OND
  loaded)"*.
- **A3** (string sheets only): *"LV AC drop: plant average {avg} % (budget 1.5
  %: over budget|within budget); {n} feeder(s) above 2.5 % flagged (this block:
  {k})"* — bold red when over budget or any feeder is flagged, else grey. The
  average is **current-weighted over every AC feeder in the workbook** (all
  plots), not per sheet (`CS:194-202, 678-687`).

**Tables** (a title row, then a header row white on orange):

| Table (verbatim title) | Columns, in order | Rows |
|---|---|---|
| **DC String Schedule** (from row 4) | String No · From Table/Tracker · Row · Col · Modules/String · To Inverter/SMB · Cores · +ve (m) · -ve (m) · Total (m) · String I (A) · Size (mm2) · %VD | one per string, `R{r}-C{c}-S{s}` → `ICR{b}-INV-{kk}` / `ICR{b}-SMB-{kk}`; size = smallest ≥ 4 mm² meeting derated ampacity and 1.5 % drop |
| **AC Cable Schedule (Inverter - ICR ACCB)** (string) / **DC Trunk Schedule (SMB - Central Inverter)** (central) | Cable No · From · To · Type · Cores · Current (A) · Length (m) · Size (mm2) · %VD · Flag | AC: `AC-ICR{b}-INV-{kk}` → `ICR{b}-ACCB{a}`, Type `AC`, 3 cores. DC trunk: `DCT-ICR{b}-SMB-{kk}` → `ICR{b}-CINV`, Type `DC-TRUNK`, 2 cores, smallest size meeting ampacity and 1.5 % drop, Flag empty |
| **Collection Schedule (ACCB/CINV - IDT - MCR)** | Cable No · From · To · Type · kV · Cores · Runs · Current (A) · Length (m) · Size (mm2) · %VD | **LV-IDT rows for every block with transformers** (OND or not): `LV-ICR{b}-ACCB{a}` / `LV-ICR{b}-CINV{k}` → `ICR{b}-IDT{t}`, Type `LV-IDT`, 3 cores, length fixed at 20.0 m. **One MV row only when the plot has an MCR, or else its USS:** `MV-ICR{b}-IDT1…` → `MCR` / `USS-{n}`, Type `MV-33kV`, kV 33.0, routed length (else straight line × 1.15). Both sized as parallel runs of 300 or 400 mm² aluminium, fewest runs winning, until drop ≤ 2.0 % |

**AC feeder sizing** (#305; `CS:39-49, 153-191, 524-538`): current = the OND's
**IMaxAC**, else PMaxOut ÷ (√3 × V × PF), else (no OND) the inverter's DC kWp ÷
(√3 × V × PF). **One 3-core run of 300 mm² aluminium**, stepped up to 400 /
500 / 630 mm² **only when 300 mm² cannot carry the current**; the drop never
changes the size. Derated aluminium ampacities: 300 → 341.2 A, 400 → 389.6 A,
500 → 442.3 A, 630 → 494.2 A. **Flag** texts, joined with "; ": *"stepped up to
{size} mm2"*, *"no single run carries {I} A"* (size then 630), *"drop {vd} % >
2.5 %"*.

- ⚠️ **MV is fixed at 33 kV** in the schedule — the card's **MV voltage** does
  not reach it (`CS:84, 107-118, 579-603`), although the card's tooltip says it
  does (§18).
- The application writes no other cable workbook; its only Excel outputs are
  this schedule, the BOM and the pile coordinates.
- ⛔ Do not write that every conductor is the smallest size meeting both
  ampacity and drop — true only for DC strings and DC trunks.

## 14. Projects — `project_io.py`, `MW:3253-3461`

- **Save project** in the view header, or **File ▸ Save Project…** (**Ctrl+S**);
  **File ▸ Open Project…** (**Ctrl+O**). Save dialog **Save Project**, filter
  *"PV Layout Project (*.slp)"*; status *"Project saved (full): …"* (5 s).
  Saving is allowed while the layout is out of date. Errors: **Save Failed** /
  *"Could not save project file:"*, **Open Failed** / *"Could not open project
  file:"*.
- Format: **`.slp`** (Solar Layout Project). It stores the session — every
  input (§4.10), the layout, sketch edits, SLD, BOM, terrain, energy, the
  electrical grouping, the robotic fleet result and the record of what produced
  the layout (§6.6).
- The file is a tamper-evident binary container: a `PVSLP` magic signature, a
  format version byte (**2** for a full project), a truncated SHA-256 checksum
  over a secret plus the compressed payload, then the zlib-compressed,
  base64url-encoded payload — a serialised object snapshot in version 2; JSON
  of input values only in the legacy version 1, which is still readable
  (`project_io.py:33-42, 71-104`). A wrong magic or a mismatched checksum is
  reported as an error rather than loaded.
- **Opening** (`MW:3296-3461`): a design mismatch asks **Design Mode
  Mismatch**; a restore problem shows **Partial Restore** / *"Input settings
  restored with warnings:"*. Open ICR block windows close. Status after opening:

  | Case | Status |
  |---|---|
  | a project with a layout that matches its inputs | *"Opened <name> · the layout matches its inputs"* (no timeout) |
  | saved by a version before #302 | *"Opened <name>, saved by an earlier version: 1 input was restored from its saved layout"* / *"…: N inputs were restored …"* |
  | out of date on opening (saved out of date, or an input file missing or changed) | the out-of-date line (§6.6) |
  | no layout, or a version-1 file | *"Project loaded: <name>"* (5 s) |

- **Reopening enables the layout tools without a Generate** (#298;
  `MW:4363-4398`, `tests/test_reopen_project_293.py:15-94`): the exports (KMZ
  unless the location is unknown, DXF, ICR-Block DXF and PDF, cable schedule,
  report, image), **Satellite**, **Piles** and **ICR blocks** (enabled, off),
  the arrester layer and — when the saved run had cables — the three cable
  layers, **Draw Rectangle**, **Draw Polygon** (and Undo Last / Clear All when
  there are obstructions), **Place MCR**, **Place Object**, and Calculate Energy
  per the location. Saved piles can be shown; the Electrical card shows the
  saved grouping. Exports stay refused if the reopened layout is out of date.
  ⚠️ **Not** enabled on opening: the Studies buttons, **Remove MCR** / **Remove
  Objects**, and the Tools tab tooltip still says *"Generate a layout first"*
  (§20) — do not document these as intended.
- **File ▸ New Project** (**Ctrl+Shift+N**) opens a fresh window at defaults in
  the same design; **File ▸ Open Sample Site** loads the bundled sample.

## 15. Access & licensing — `license_dialog.py`, `access_chip.py`, `trial_client.py`, `licensing.py`

**Online, device-bound access — no licence file.** Entitlement is checked
server-side; there is **no `.lic` file** to install, copy, back up, or load.
The app opens without access, but **Generate Layout** and the exports (KMZ,
DXF, ICR-block DXF, ICR-block PDF and a block window's **PDF…**, cable
schedule, report, pile Excel, TMY CSV) are blocked until access is active
(`_require_license`, `MW:3200-3213, 5627, 5680-5709`). (Export Image (PNG), a
block window's **Copy** and the Earthing Design window's exports do not call
that check — §20; pages say "Generate Layout and the exports need active
access" and do not enumerate exceptions.) When blocked, the app opens
the **License / Subscription** window itself — there is no separate
"Subscription Required" message. ⛔ The SLD and BOM views are **not** gated.

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

**Status model** (`trial_client.check_status`): the server returns
`active | expired | revoked | none` plus a `valid_till` date. A good check is
cached; the app keeps working through a **3-day offline grace** window, and an
active result is treated fresh (no network call) for 5 minutes. At launch the
License window opens by itself only in the `none` state.

**Account-level access, up to 3 devices** (server side — `solarlayout` repo,
GH #1249): access belongs to the signed-in account (email) per app, not to a
device; one access record per account holds the kind, status and end date
(`DEVICE_LIMIT = 3`, `TRIAL_DAYS = 7`). Every device on the account shows the
**same** end date and status; an extension reaches all of them; revoke ends all
of them. Rules in order: a device already on the account is a no-op; a device
registered under **another** account is refused (*"This device is already in
use"*); a **fourth** device is refused (*"You have used all 3 devices"* —
*"Your account already uses <App> on 3 devices, so this one cannot be
added."*); an expired or revoked account may still add a device, which simply
shows that status. **Nothing frees a slot** — support only. The activation
page says *"This will be device N of 3 on your account."*, its button reads
**Add this device** (or **Activate free access for this device** for the
first), and its details card lists every device with a **This device** badge.

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
- **Docs** button → https://solarlayout.app/docs. **Support** button → the
  **Support / Feedback** window (*"Tell us what's going on — we'll get back to
  you by email."*; **Subject**, **Category** — *Something's broken · How do I… ·
  I have a suggestion · Billing & account · My results don't look right* —,
  **Description**, a **View support cases & replies** link, **Cancel** /
  **Send**; validation *"Please enter a subject and a description (at least 10
  characters)."*). Without active access the button shows *"You'll need active
  access to file a support ticket. Start a free trial, or contact us
  directly."* with **Get Free Access** / **Contact Us** / **Cancel**.
- **App version** in the status bar (§6.0).

- ⛔ Never document how access is granted server-side, keys, or any vendor
  operation. Reader-side only.

## 16. Menus — `MW:1250-1333`

Four menus, eleven items, in this order:

- **File:** New Project (Ctrl+Shift+N) · Move to String / Central Window…
  (Ctrl+N) · Save Project… (Ctrl+S) · Open Project… (Ctrl+O) · Open Sample
  Site · Exit (Ctrl+Q)
- **Edit-Pile:** Define Pile Layout…
- **Tools:** Robot count from DXF… (opens the window of §10.3; works without a
  layout) · Earthing Design… (opens §10.4; before a layout it shows **Generate
  first** — *"Generate a layout first, then open Earthing Design."*). Neither
  has a shortcut. ⛔ The Tools menu does **not** hold the AC simulation,
  Robotic Module Cleaning or Shadow View.
- **Help:** How to Use This Tool (F1) · License / Subscription…

Every menu item is always enabled. ⛔ Menu-item tooltips are set in the code
but **never shown** (only the Export ▾ menu shows tooltips, `MW:2612`) — do
not quote any menu-bar tooltip.

**Help ▸ How to Use This Tool** opens **Help — SolarLayout** with the tabs
*Getting Started · Input Parameters · Layout / Sketch Editing · Inverters, ICR,
Cables · Terrain / Obstructions · Energy Yield · SLD / BOM · Export, PDF,
Licensing*. ⚠️ Its text is older than the interface in places (it still
mentions Back / Forward toolbar arrows, "Pro Plus" energy pages and a visible
Device ID); the docs site, not the in-app guide, is the reference.

## 17. Other reader-visible behaviour

- Water-body detection uses **KMZ-defined polygons only** (`MW:3667-3672`
  hard-sets satellite detection off). A **Water bodies** window exists in the
  code but is **not reachable**. ⛔ Do not document satellite water detection.
- An unexpected error shows *"An unexpected error occurred, but the
  application will keep running."* and appends the traceback to
  `solarlayout_error.log` in the system temp directory — `entrypoints.py`.
- Every plant is cable-routed in full; only the DC comb of a plot with more
  than 30 000 tables is sampled, and its DC trench is labelled *"(est.)"*
  (§5.3a). ⛔ There is no "fast geometric estimation" for large plants.
- **Progress** (`MW:3969-3970, 4147-4151, 4537-4548`): *"Calculating layout…"*
  with the overlay *Generating Layout…*; then *"Calculating cable routes…"* /
  *Calculating Cable Routes…* — *"The calculation is going on, please wait."*;
  then *Rendering Layout on Canvas…* — *"Large plants may take a few minutes —
  please wait."* Other run statuses: *"Re-plotting the aligned grid around your
  sketch edits…"*, *"Layout not generated: say where the drawing sits first."*
  (§3.2), and *"Error."* with a **Layout Error** box; a cable failure shows
  **Cable Calculation Error** and then the *"Layout ready …"* line.
- **After a run** the status line reads **"Layout ready"** followed by notes
  as they apply, in this order (`MW:4457-4492`): *"| n water body(s) excluded"*
  (verbatim), *"| n tables cleared for building shadows"* (*trackers* on a
  tracker), *"| MV cable: n m"*, *"| DC target x MWp met"* or *"| ⚠ DC x MWp is
  BELOW the y MWp target — the site has no room left; reduce the AC capacity or
  DC/AC ratio"* (§10.1), *"| Input panel updated from the AC simulation: …"*,
  the location carry note (§3.2), and *"| the energy result was cleared:
  calculate energy again"* (§6.6). No ICR-count or design-warning note goes to
  the status line. The totals are in the plant chips, not the status line; the
  line is not mirrored to the ribbon. On the sample site: *"Layout ready | 5
  tables cleared for building shadows"* (observed 2026-09-28).
- **Closing while a calculation runs** asks **Calculation in progress** — *"A
  layout, cable or weather calculation is still running. Wait for it to finish
  (the window closes by itself when it does), or quit now and discard the
  result?"* — **Wait** / **Quit now**.

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
| Energy pages are "Pro Plus" | F1 help, `pdf_exporter.py` comments, `MP:478` | No tiers exist; gated only on whether energy was calculated |
| Terrain excludes an RL / flood-level band | F1 help, `terrain.py` | No UI fields exist for it — unreachable |
| Satellite water-body detection is available | F1 help, `water_body_mode_dialog.py` | Hard-set to KMZ-only — unreachable |
| Image scale example "1000 m = 10 mm" | `image_boundary_parser.py` docstring | Dialog default is 100 m / 10 mm |
| A 15 m TL setback is fixed | `README.md`, `layout_engine.py:29` | Default 15 m per side, reader-editable 0–500 |
| Flat `core/` `gui/` `models/` project layout, `main.py` | `README.md` | Restructured into `packages/` + `apps/` — irrelevant to readers either way |
| A four-card start-up window with **Select** buttons | older docs pages, screenshots before 2026-09-21 | Two segmented controls (MOUNTING, INVERTER), a summary card, **Continue** (§2) |
| One long input panel with **Generate Layout** at the bottom | older docs, F1 help | A pinned **Generate Layout** above five stage tabs: Site · Array · Electrical · Yield · Tools (§4.0) |
| A plot toolbar with 💾 Save(Project) · ⛶ Expand Plot · 🛰 Satellite · ▢ Wireframe · 📍 Piles · ✏ Sketch Mode · 📋 BOM · ⚡ SLD, and a block of ON/OFF view switches | older docs | View tabs Layout · Summary · Energy · BOM · SLD with a tools row; the switches live in the **Layers ▾** popover (§6.1, §6.2) |
| A **Layout & Energy Summary** table under the plot with a **⛶ Maximize** button | older docs, F1 help, the SLD/BOM checkbox label *Hide Layout & Energy Summary* | The **Summary** view and **Open in window**; under every view sits the plant chip row (§6.3, §6.4) |
| **Export PDF (Layout + Summary)** and an export button block under the inputs | older docs, F1 help | **Export ▾** menu; the report is **Export Detailed Project Report**, a Word `.docx`; PDF only as **Export PDF (with Piles)** (§13.1) |
| *"Calculate the number of modules in series automatically?"* Auto / Manual prompt after loading a module file | older docs | Removed; the **Size…** button opens string sizing (§4.8a) |
| **Calculate Cables for PV Power Plant** in the inverter group | older docs | **Calculate cables** in the **Cables** card, with three DC allowances (§4.8b) |
| **⊕ Move to String / Central Window** button under the inputs | older docs | The ribbon design chip and File ▸ Move to String / Central Window… (§2) |
| Dialogs titled *DXF Site Coordinates*, *Image Boundary — Scale & Coordinates*, *Boundary Validation Issues* | older docs | **Site reference** and **Check boundaries** (§3) |
| Back / Forward arrows on the plot toolbar; *"Pro Plus"* energy pages; a visible Device ID | F1 help | Home · Pan · Zoom only; no tiers; the Device ID sits behind **Having trouble?** (§6.1, §15) |
| Legend ON by default | older docs | OFF, folded behind the **Legend ▾** chip (§6.2) |
| *Stale since the 2026-09-28 re-verification:* | | |
| A CAD / image boundary without coordinates silently uses a fallback of 20° N, 78° E | older docs, this sheet before 2026-09-28 | Gone. **Layout only** leaves the location unknown: no KMZ, energy, satellite; tilt and pitch from a typed latitude or set by hand (§3.2) |
| **Site reference** with *I know the site coordinates*, default 20.000000 / 78.000000, **Use this location**, **Continue without coordinates**, a **Layout only** button, 520 px | older docs, screenshots before 2026-09-28 | Three modes — **Drawing's coordinates**, **Place by latitude and longitude**, **Layout only**; nothing pre-filled; primary **Use UTM zone …** / **Place the drawing here** / **Continue with layout only**; **Cancel** does not load the file (§3.2) |
| *"The design report lists it as placed by hand (check C-01)."* / *"… lists the location as unknown (check C-01)."* | Site reference verdicts, `SRV:22, 26` | No such report or check exists; quote only the rest of the verdict (§3.2, §20) |
| A contour DXF must be in the project's UTM coordinates | older docs | In the **boundary file's** coordinates (UTM for a KMZ) — `IP:1169-1173` (§4.7) |
| A project file does not keep Structures & Shadow, Topography, the contour path, the cable allowances, Maximize placement, half tables, the LA tick, shading auto or ground clearance | older docs, this sheet's §4.10 before 2026-09-28 | All saved since #302 (§4.10). Not saved: Earthing inputs, Robotic Cleaning answers, ICR block AC, view state |
| LA height and pile Ø are not saved and feed nothing | older docs | Saved and compared as inputs, printed in the Word report; still no design effect (§4.6) |
| Opening a project always reads *"Project loaded: …"* | older docs | *"Opened <name> · the layout matches its inputs"* and the other §14 lines |
| The project payload is base64url JSON | `project_io.py` docstring | Version 2 stores a serialised object snapshot; JSON only in legacy version 1 (§14) |
| *"Number of ICRs = ceil(total plant MWp ÷ ICR Block size)."* | **ICR Block** tooltip `IP:1025`; `icr_placer.py:5` docstring ("One ICR per 18 MWp") | Counted per separate piece of land, half tables weighted 0.5 (§4.5, §5.1) |
| Tables are grouped by K-means into blocks of roughly one ICR Block each; a marginal capacity gives a small extra block | older docs, this sheet before 2026-09-28 | Exactly *k* blocks per piece of near-equal capacity (±5 % target); no small leftover block (§5.1) |
| Each inverter's AC cable runs to the **nearest** ICR | older docs | Nearest along the plant within the building's rating, overflow handed on (§5.3) |
| Arresters are placed after inverters and cables | this sheet's §5 before 2026-09-28 | Before them (§5) |
| Cables may run in the road band but never outside the fence | this sheet before 2026-09-28 | DC clipped to the usable area; AC / DC trunks best-effort inside the boundary, exceptions reported as design warnings (§5) |
| Very large plants use fast geometric cable estimation | older docs, `SIM:4624-4628` code comment | Everything is routed; only the DC comb of a > 30 000-table plot is sampled, labelled *"(est.)"* (§5.3a) |
| After a trench edit, Generate keeps the current cables; a deleted automatic trench stays deleted | older docs, `sketch_manager.py:2394` and `MP` `cables_user_edited` comments, `MW:3811-3815` docstring | Generate re-routes everything and drops drawn trenches; a deleted automatic run returns when leaving Sketch with cables on (§5.3, §7, §19a) |
| After drawing an obstruction the cable rows read 0 | older docs, this sheet's §19a before 2026-09-28 | Cable lengths are re-measured; the **trench** rows keep old figures (§19a) |
| Leaving Sketch Mode always reads *"Sketch Mode OFF — plant totals updated."* and recomputes | older docs | Only after a change; otherwise *"Sketch Mode OFF."* and nothing recomputed (§7) |
| The **Tools** tab is locked until a layout exists | older docs, this sheet's §4.0 before 2026-09-28 | Only its tab tooltip changes; the buttons are greyed out, except **Robot count from DXF…** (§4.0) |
| Three studies; three menus (File · Edit-Pile · Help) | older docs, screenshots before 2026-09-28 | Five Studies buttons; four menus with **Tools** (§10, §16) |
| Inter-module lead 0.5 m (*"BOQ convention 0.5 m"*); String return run on, *"Untick for U-wired strings"* | older docs | 0.00 m (the supplier provides the leads); return run off (leapfrog), tick for daisy-chain (§4.8b) |
| *"The nominal AC power (Pnom) will be used to calculate total plant AC capacity and DC/AC ratio."* | **Load .OND** tooltip `IP:1298-1303` | PmaxOut first, Pnom only as fallback (§4.8) |
| *"Generate the SLD automatically from the current layout + BOM."* | **Automatic** tooltip `MW:2302-2304`, docstring `MW:7236-7237` | Built from the layout, the electrical grouping and the OND; never the BOM (§11) |
| Auto-build rules fixed at 15 / 4 / 17.2 MVA *"mirrored in bom_builder"*; Full SLD = one row per ICR | older docs, this sheet's §11 before 2026-09-28 | The **ACCB & Transformer** card's rules; Full SLD one row per ACCB / central inverter (§4.8c, §11) |
| *"The transformers' MV side, and the MV cables to the MCR."* | **MV voltage** tooltip `IP:1365` | The cable schedule stays at 33 kV whatever the card says (§13.6) |
| ACCB = "AC circuit breaker" | older docs (glossary) | **AC combiner box** (`IP:1339`, `BB:167`) |
| BOM remarks *"≤ 15 inverters each"*, *"33 kV / 800 V"*, Power Transformer *"ΣIDT × 1.2"* | older docs, this sheet's §19a before 2026-09-28 | Follow the card and the OND; Power Transformer from Σ PMaxOut × margin ÷ derating (§19a) |
| The `power_transformer_basis` example without the words "margin" / "derating" | `EG:364` docstring | The real remark includes them (§4.8c) |
| Cable schedule: every conductor the smallest size meeting ampacity and drop; the MV Collection Schedule only with an MCR; needs Calculate cables | older docs, this sheet's §13.1 before 2026-09-28 | AC feeders fixed 3C × 300 mm² Al, stepped up only for current and flagged; the collection table exists for every grouped block, its MV row only with an MCR / USS; no cable calculation needed (§13.6) |
| *"No ICR blocks to schedule. Enable 'Cable Calc', generate a layout with ICRs, then export."* | cable-schedule box `MW:5746-5747` | Cable calculation is not required, and the checkbox is **Calculate cables** (§13.6) |
| *"Export the generated layout: KMZ, DXF, ICR-block DXF, cable schedule, project report"* | **Export ▾** tooltip `MW:2606-2608` | The menu also has **Export ICR-Block PDF** (§13.1) |
| The `PILES` DXF layer is present whenever a pile pattern is defined | older docs, this sheet's §13.3 before 2026-09-28 | Only with a pattern **and** the Piles overlay ON (§8, §13.3) |
| A half table receives the full pile pattern and counts at full weight | older docs, this sheet's §19a before 2026-09-28 | Half units carry the half pattern; counts are per unit (§8) |
| Robotic cleaning: *"No robot is lost to an unbridged gap."* once every wide gap is bridged; the gap list header always *"GAPS TOO WIDE FOR A STANDARD BRIDGE"*; **Blocked by** always shown | older docs | See §10.2 |

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

**The first-year degradation factor** used in the time-series export is exactly
`1 − first-year degradation ÷ 100`, the same field the annual figures use —
`energy_calculator.py:667`.

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

**The bifacial gain is computed as a percentage** (`bifacial_gain_pct`) and
surfaces on the report's energy pages — `pdf_exporter.py:2336`. There is no
separate on-screen readout for it.

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
`sketch_manager.py:2753-2778`. Same model as a road line feature (§3.1), not the
setback field.

**Trench edits are short-lived, and there is no toggle for them.** A drawn
trench replaces every automatic run of its type in the plot and survives
leaving Sketch Mode; **any Generate discards it** — the layout is laid out and
routed afresh, and the "user edited" flag lives on the old result
(`SC/frame_carry.py:180-193`, `MW:4016-4071`; observed 2026-09-28: after
Generate the drawn DC trench total was 0 and every automatic run was back). A
deleted **automatic** run returns as soon as Sketch Mode is left with
**Calculate cables** on (`MW:8314-8326`; observed 2026-09-28). No control
switches trench edits on or off. Tell the reader to draw trenches after the
last Generate, and not to rely on deleting automatic ones.

**Arresters on the exported drawing ignore the on-screen switch.** Both
report exports force the arrester rectangles and labels **visible** and forces the
protection circles **hidden**, then restores the previous state —
`MW:4266-4280`. So arresters always appear on the drawing page and the coverage
circles never do, whatever the **Lightning Arresters** switch is set to.

**MV cables are routed on the next Generate, not when the MCR is placed.**
After **Place MCR** the hint reads *"MCR placed. Enable 'Cable Calc' and
regenerate layout to route MV cables."* (`MW:8500-8503`); the MV row of the
Layers popover has nothing to show, and the Summary's *MV cable (m)* reads `—`,
until the reader generates again. Then the status line adds *"| MV cable: n
m"*. ⚠️ The code routes MV for every plot holding an MCR / USS whether or not
**Calculate cables** is on (`MW:573-576`), while the hint and the MV layer row
(disabled with cables off, `MW:4390-4392`) imply cables must be on — not yet
verified by a run (§20). Pages say "generate again with **Calculate cables**
on", which is correct either way, and make no claim about cables off.

**A hand-drawn obstruction (Tools tab) re-measures the cables but not the
trenches.** Drawing an obstruction (and Undo Last, Clear All, an ICR drag)
re-places the inverters and, with **Calculate cables** on, re-routes the cables,
so *String DC cable (m)* and *AC cable to ICR (m)* are re-measured (`MW:5983,
8856-8858`; observed 2026-09-28 on the sample site: DC 151,951 → 147,534 m, AC
26,247 → 25,131 m). The **DC / AC trench** rows keep their previous figures,
because trench totals are computed only at the end of a full cable run
(`MW:4427`, `CE:124`), and the BOM is not rebuilt either. Tell the reader to
generate again after drawing obstructions before quoting **trench** lengths.

**The Symbol Editor's buttons are labelled `Accept` and `Reject`** —
`sld_symbol_editor.py:57-59`.

**Auto-build needs no energy calculation.** Its counts and ratings come from
the layout, the electrical grouping and the OND file (§11), not from the
materials list or an energy run. Generating the layout is enough; without an
OND the ratings read *"rating needs OND"* and the LV *"LV needs OND"*.

**What Generate Layout does to Sketch-Mode edits** — `MW:2739-2771`. This is
consequential and easy to get wrong, so state it precisely:

1. If the reader is still in Sketch Mode, Generate leaves it first, so the
   edits are committed rather than lost.
2. If the layout was edited, Generate **re-places every table, tracker,
   inverter and control room from scratch** into the newly available space. So
   hand-placed and hand-deleted **tables do not survive** a Generate.
3. But the obstructions, corridors, main control room, USS, objects and sketch
   annotations the reader placed **do** survive — they are carried onto the new
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
6. **Hand-drawn cable trenches do not survive** — Generate routes every cable
   afresh (see the trench entry above).
7. An energy result is cleared (§6.6).

`_refresh_layout_keep_edits` exists in the code but nothing calls it, so there
is **no** "keep my layout, just refresh the numbers" path. Do not document one.

**An imported CAD reference is placed at its own coordinates, unchanged.**
`sketch_manager.py:1101-1104` takes the coordinates **as-is, in project metres** —
no scaling, no re-centring, no fit-to-extent. The drawing must already be in the
project's coordinate system, or it lands somewhere else entirely, possibly off
the visible canvas. Supported entity types, from the message shown when nothing
imports: **LINE, POLYLINE, CIRCLE, ARC, ELLIPSE, SPLINE, TEXT**. Imported
elements land on the **currently selected sketch layer**, and the status line
reports how many came in and onto which layer.

**The computed bill of materials line items** — `BB:103-234`. Rows appear in
this order, and a row is **omitted entirely** when its quantity is zero or its
condition fails, so a short list means the plant has none of that thing:

| # | Material Description (verbatim) | Unit | Quantity | Remark carried |
|---|---|---|---|---|
| 1 | Plant AC Capacity | MW | 2 dp, or `—` without an inverter file | *"AC capacity requested in the AC-capacity simulation"* after an AC-capacity run, else *"PmaxOut × no. of inverters (from OND)"* |
| 2 | Plant DC Capacity | MWp | 3 dp | — |
| 3 | PV Module | Nos | count | *"{Wp} Wp each"* |
| 4 | String Inverter *(string)* | Nos | count | *"{kWp} kWp each"* |
| 4 | SMB (String Monitoring Box) *(central)* | Nos | count | *"{n} SMB per central inverter"* |
| 4b | Central Inverter *(central)* | Nos | count | — |
| 5 | MMS Table (Module Mounting Structure) — Full / Tracker (Full) | Nos | count | — |
| 6 | Half MMS Table (Module Mounting Structure) / Half Tracker | Nos | count | *"half length; carries half the strings"* |
| 7 | DC String Cable | m | 0 dp | *"incl. +ve / −ve conductors"* |
| 8 | DC String Trench — or **DC String Trench (est.)** on a sampled very large plot (§5.3a) | m | 0 dp | *"MMS/Tracker → String Inverter"* (or *→ SMB*), plus *"; drawn for a sample of clusters, scaled to all tables"* when estimated |
| 9 | DC Cable (SMB → Central Inverter) *(central)* | m | 0 dp | a design-warning remark only |
| 10 | AC Cable (Inverter → ICR) *(string)* | m | 0 dp | a design-warning remark only |
| 11 | AC Trench (Inverter → ICR) *(string)* / DC Trench (SMB → Central Inverter) *(central)* | m | 0 dp | a design-warning remark only |
| 12 | ACCB (AC Combiner Box) *(string, once grouped)* | Nos | count | *"≤ {Inverters per ACCB} inverters each"* — follows the card, default 15 |
| 13 | Inverter Duty Transformer (IDT) *(once grouped)* | Nos | count | *"{MV} kV / {LV} V; {ratings}; ≤ {n} ACCB/Tx, one LV winding each"* (*C.Inv/Tx* in a central design; *n* = the most feeders on any one transformer); without an OND *"33 kV / LV from the OND; 4 · rating needs OND; ≤ 4 ACCB/Tx, one LV winding each"* |
| 14 | ICR (Inverter Control Room) | Nos | count | a design-warning remark only |
| 15 | MV Panel (Switchgear) *(MCR)* | Lot | 1 | *"Inside MCR"* |
| 16 | MV Cable (ICR → MCR) *(MCR)* | m | 0 dp | — |
| 17 | MV Trench (ICR → MCR) *(MCR)* | m | 0 dp | — |
| 18 | Power Transformer *(MCR)* | MVA | *"63"* / *"2 × 80"* / `—` | the basis, e.g. *"Σ PMaxOut 58.1 MVA × margin 1 ÷ derating 1 = 58.1 MVA → next listed rating"*; without an OND *"needs the inverter file (OND)"* |
| 19 | MCR (Main Control Room) *(MCR)* | Nos | 1 | — |
| 20 | Lightning Arrester | Nos | count | — |
| 21 | Street Light (perimeter) | Nos | count | *"{h} m pole @ {span} m spacing"* |
| 22 | Robotic Module Cleaning Equipment | Nos | count | *"{rows} table row(s)"* / *"tracker column(s)"*, plus *" + {x} for broken lines / battery range"* |
| 23 | Cleaning Robot Bridge (table-to-table) | Nos | count | *"Gaps ≤ {gap} m"* |
| 24 | Cleaning Robot Bridge (supported span) | Nos | count | *"Over arresters / buildings / obstructions"* |
| 25 | Design warning | — | — | *"Check: …"* — only for a warning whose own row is absent (§6.7) |

Rows 22–24 appear only after the cleaning tool has been run. Design-warning
remarks (*"Check: …"*) attach to rows 9 / 10 (feeder and drop warnings), 11
(trench warnings) and 14 (ICR warnings) — `DV:44, 56-63, 223-229`. ⛔ The old
remarks *"≤ 15 inverters each"* (fixed), *"33 kV / 800 V"* (fixed) and
*"ΣIDT × 1.2"* are gone. Earthing materials are not in this list (§10.4).

**Half tables carry their own pile pattern, and every pile count is per
unit.** Since #290 a half table gets the half pattern — derived from the full
one (same end overhangs, even spans, a centre drive pile on a tracker) or the
reader's own — and the Summary, the status line and every export count each
unit's own piles (`SC/piles.py:31-112`; §8). ⛔ Do not repeat the old
statement that half tables receive the full pattern and count at full weight.

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
| Any release history | Do not invent changelog entries. What each tagged build contains, as far as the 2026-09-28 re-verification covers, is in §21; anything else about a release needs the product owner. |
| Minimum Windows build, RAM, disk, or screen resolution | State the requirements qualitatively — a 64-bit Windows PC, a display wide enough for the panel and plot side by side, an internet connection only for weather and elevation data. Leave a `{/* VERIFY: minimum Windows version and hardware requirements */}`. |
| ~~Support email address or contact route~~ | **Resolved (Arun, 2026-08-18): `sales@solarlayout.app`.** It is the route for everything reader-facing — a new licence, a renewal, a reissue for a new machine, and any problem the pages do not resolve. |
| Typical run times for Generate on a given plant size | Do not quote seconds or minutes. Say cable calculation is the slow step on large plants, which is what the application itself warns. |
| Price, plans, licence duration options | Out of scope. The licence pages cover activation and error messages only. |

## 20. Product issues noticed 2026-09-28 — not behaviour to document

The audits of 2026-09-28 found these defects and oddities. **Pages must not
describe them as intended behaviour, and must not document a workaround that
relies on them.** Where a page has to steer round one, it states only the
correct route (as noted in the relevant section). They are reported to the
product team; re-check before the next docs update.

| # | Issue | Evidence |
|---|---|---|
| 1 | **Earthing Design: X/R = 0 crashes.** The field allows 0; the calculation divides by zero and shows the *"An unexpected error occurred …"* box; the window keeps showing (and exporting) the previous result, and every later opening in that session fails. | `ED:201, 495-505`, `EA/calc.py:484-486` |
| 2 | **Earthing Design: other size-list edge cases** — an empty strip or cable list silently uses the full default list; an absurd value (`1e400x6`) crashes; when no size fits, the BoQ, banner and DXF layer names print `—` / `None`. | `ED:469-470`, `EA/layout.py:578-581` |
| 3 | **Earthing Design is outside the fresh-results and access checks** — it opens and exports on an out-of-date layout, an open window keeps the layout it was opened on, and its exports are neither licence-checked nor disabled during a run. Reopening does not raise an already open window (two can show). | `MW:9130-9144`, `ED:551-572` |
| 4 | **Earthing Design: LA pits cap at 50 per arrester silently**; *Weather stations* and *Gates* apply per plot on a multi-plot site while the report says one; the *Fence / poles* legend line appears only because of the weather-station strip. | `EA/calc.py:338-346`, `EA/layout.py:434-473` |
| 5 | **Menu-bar tooltips are never shown** (only the Export ▾ menu shows tooltips), so the Tools ▸ Earthing Design… tooltip is invisible. Tools ▸ Earthing Design… is always enabled while the Studies button is disabled before a layout. | `MW:1315-1323, 2612` |
| 6 | **After Open Project**, the four layout Studies buttons stay disabled and the Tools tab tooltip still says *"Generate a layout first"* until a Generate; **Remove MCR** / **Remove Objects** stay disabled even when the project has an MCR or objects; the Yield status line is blank; the AC-capacity baseline (first-run DC) is not restored. | `MW:1708, 1734, 1747, 3382, 4083-4086, 4502-4507` |
| 7 | **A layout-only site with no latitude and automatic tilt / pitch "succeeds" with 0 tables** — the status says *"Layout ready"*, the only trace is *"[ERROR: Automatic tilt and row pitch need the site's latitude. …]"* in the plant name, and the Array tab is then overwritten with *Auto → 0.0°* / *Auto → 0.00 m* (ticking the overrides without retyping then generates at 0° and 1 m). Pages say only "give a latitude, or set tilt and pitch by hand". | `layout_engine.py:1015`, `IP:2500-2530` |
| 8 | **Layout-only terrain and shadow messages are swallowed** — *"The site's location is unknown, so no elevation data can be fetched…"* and the skipped shadow clearance are never shown. | `GR:59-64`, `MP:861` |
| 9 | **Site reference verdicts cite a non-existent "design report … (check C-01)".** | `SRV:22, 26` |
| 10 | **The export refusal while out of date is a transient status-bar message only**, soon replaced by the "Out of date: …" line; "changed on disk" is noticed only on returning to the window or at export. An older project needing no repair can read *"0 inputs were restored"*. | `MW:4355-4361`, `RI:490-494` |
| 11 | **Every Generate clears an existing energy result, even with no input changed.** By design in the code; documented as behaviour in §6.6 — flagged here only because it may surprise readers. | `MW:4022-4024, 4105-4116` |
| 12 | **A plain Generate probably does not close open ICR block windows**; afterwards such a window loses its banner, re-enables Copy / PDF… on the old figures, and its PDF… can write a 0-page file. Not verified by a run. | `MW:4314-4316, 8833, 8917`, `IBP:383-384` |
| 13 | **Pile inclusion differs between the ICR-block outputs** (window and PDF: a pattern exists; DXF: the overlay must be ON); the plain DXF likewise drops `PILES` with the overlay off while the Summary counts piles. `Piles: ON` is not reset when a project is opened. **Clear** on the Half tab gives half units 0 piles with no warning. | `MW:5639, 5667, 5703, 9994`, `PD:449-453` |
| 14 | **ICR-block naming mismatches on multi-plot sites** (DXF sheet `ICR-1` vs layer `ICR3_TABLES` vs title `P2-ICR-1`; the window has no prefix, its PDF does); *"(1 pages)"* in the single-block status; DXF block sheets freeze the road / corridor / T-line obstruction layers. | `dxf_exporter.py:79-86, 864-934`, `MW:5691-5705` |
| 15 | **Export Image (PNG) and an ICR block window's Copy do not check access** though every other export does. | `MW:5330-5334`, `IBD:156-161` |
| 16 | **A grouping edit (ACCB & Transformer card, OND load) never refreshes a stored SLD** in practice (the card is unreachable while the SLD view is open, and entering the view clears the radios); the report keeps the old diagram. The BOM is only flagged, so the report's BOM page shows old ACCB / IDT figures until the BOM view has been visited — and that visit discards manual edits without asking. | `MW:8007-8012, 8916-8922, 7227-7234` |
| 17 | **SLD winding symbols stop at 5-Wdg** although a transformer can carry up to 12 feeders (13 windings); the block window says "n-winding". The answer line is not singular-aware ("1 ACCBs"); an unrated transformer's reason is never shown; an invalid rating list stays in the field; the LV row keeps *"needs the OND file"* when an OND lacks VOutConv; the size limit is silently capped at the largest listed rating. | `SA:57-71`, `EG:96-103, 174, 402-408`, `IP:1417-1421, 1470-1472` |
| 18 | **Cable schedule oddities** — the project name is always *Solar PV Plant*; central sheets print the AC-feeder basis and LV budget though they have no AC feeders; the fixed 20 m LV-IDT lead is not stated in the basis line; an MV cable number contains an en dash (`IDT1–4`). | `CS:585, 613, 645-661`, `MW:5749` |
| 19 | **SLD inverter kVA uses the OND's nominal power while transformers use PMaxOut**; BOM row 1's remark says PmaxOut while its fallback computes Pnom first. | `SA:172, 197`, `BB:51-56` |
| 20 | **Trench totals go stale after canvas edits** (obstruction, Undo, Clear, ICR drag re-route cables but not trench totals, re-create deleted automatic runs, and do not rebuild the BOM); a drawn trench is stored on the first plot whatever plot it was drawn in (code reading only). The flashed status *"Sketch changes applied — …"* is overwritten at once. | `MW:4427, 5983, 8317-8322`, `sketch_manager.py:2389-2392` |
| 21 | **The sampled DC string cable on a > 30 000-table plot is not marked "(est.)"**, nor is the Summary's DC trench row. | `BB:139-149`, `MW:10171` |
| 22 | **MV cables appear to be routed with Calculate cables off** (whenever an MCR / USS exists) while the MV layer row is disabled and the hint says to enable cable calculation. Code reading only; verify with a run. | `MW:573-576, 4390-4392, 8500-8503` |
| 23 | **A reopened robotic fleet goes stale** — the fleet is saved but the window's answers are not, so later edits never re-size it and a Generate drops it silently. The cable allowances stay enabled on a tracker design where two of them do nothing. | `MW:9307-9343` |
| 24 | **Robot count from DXF** — the analysis notes reach only the PDF; changing a layer role or the Structure clears ticked gaps; the PDF's *"(≤ x.xx m)"* ignores the 0.25 m tolerance. The two cleaning windows present the same engine differently (verdict kind, decimals, km vs m, *row* vs *line*). | `RDD:676-686`, `RDR:309-310`, `RC:476` |
| 25 | **AC-capacity window** — *"Enter a positive AC capacity and target DC/AC ratio."* is unreachable; the reserved fix-button row leaves a blank strip under *Fits this layout*. | `ACS:180-188`, `ACD:234-238` |
| 26 | Cosmetic strings: *"water body(s)"*; *"Closing as soon as the cables are routed..."* (ASCII dots); **Export PDF  (with Piles)** (two spaces); the Electrical tab tooltip *"Inverter sizing and cable options"* does not mention transformers. | `MW:4457, 3619-3627, 1565`, `IP:79` |

## 21. Release mapping

Verified 2026-09-28 with `git tag --contains <merge>` in the product repo
(`PVlayout_Advance`, `main` at `e93f6be`). The in-app version drops the
trailing `.0` (§6.0), so tag `solarlayout-v2.0.2.0` is the build that shows
**v2.0.2**.

| Tag | Tagged | Contains (of the PRs this sheet covers) |
|---|---|---|
| `solarlayout-v2.0.1.0` (shows v2.0.1) | 2026-09-22 | #208 (every device cabled, ICR assignment, containment), #219 (leaving Sketch Mode) |
| `solarlayout-v2.0.2.0` (shows v2.0.2) | 2026-09-25 | everything in v2.0.1.0, plus #274 (ICR count per land piece, balanced blocks), #275 (DC comb sample, "(est.)"), #276 (Robot count from DXF), #277 (headless BOM core — no visible change), #288 (piles on half tables, spec), #289 (Cables card defaults), #290 (half-table piles), #291 (ICR block window, ICR-Block PDF), #292 (ICR block AC in the AC-capacity study), #295 (location truth — the Site reference window), #296 (half-table piles follow-up), #298 (reopen enables the tools), #299 (Robot count from DXF and AC-capacity window refinements) |
| **not in any tag** (unreleased as of 2026-09-28) | — | #301 (ACCB & Transformer card), #302 (results that know they are out of date; every input saved), #303 (automatic SLD without the BOM), #305 (AC feeder sizing in the cable schedule), #308 / #309 (power transformer), #310 (cable take-off catalog — no visible change), #315 (design warnings), #318 (Earthing Design), #319 (one cable run at a time) |

⚠️ Pages describe the current `main`. A release-notes entry must name only
what its tag contains: nothing in the last row may be announced as released
until a tag contains it.

Merge commits on `main`, for re-checking with `git tag --contains`:

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
