# SolarLayout Desktop — verified product facts

**This file is the only permitted factual source for content in this repo.**

Every value below was read from executing code in the product repository
(`PVlayout_Advance`, branch `main`, re-verified 2026-09-21 after the interface
rebuild of issues #156, #203, #210 and #213) and carries a `file:line`-style citation.
Where the product's own README, module docstrings, code comments, or in-app F1
help state something different, **they are stale and must not be used**. A
list of the specific known-stale claims is in [§18](#18-known-stale-sources--do-not-repeat-these).

Citations are relative to the product repo root. `IP` = `apps/solarlayout-desktop/solarlayout_desktop/input_panel.py`,
`MW` = `.../main_window.py`, `MP` = `packages/solar-core/solar_core/models/project.py`.

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

- CAD drawings carry no geographic position, so choosing a `.dxf` / `.dwg`
  file opens the **Site reference** window (`dxf_latlon_dialog.py`,
  `site_reference_dialog.py`, a `ResultDialog`, 520 px): caption **LOCATION**,
  a ticked checkbox **I know the site coordinates**, **Latitude** (default
  20.000000 °N, −90–90) and **Longitude** (default 78.000000 °E, −180–180), a
  consequence banner *"With coordinates: layout, row pitch from latitude, and
  energy yield."* / *"Without coordinates: layout only. Energy yield is
  disabled."*, the footer hint *"Without coordinates you get the layout only."*,
  a **Layout only** button and the primary **Use this location** (which reads
  **Continue without coordinates** when the checkbox is unticked) —
  `site_reference_dialog.py:46-226`.
  ⛔ The window is not called "DXF Site Coordinates".
- Without coordinates the layout is still generated geometrically, but
  **energy calculation is unavailable**.
- Geo-referencing preserves shape and area exactly: each DXF point is
  treated as a metre offset from the drawing centroid, added to the
  reference point projected to UTM — `dxf_parser.py:8-22`.
- ⚠️ **Skipping the coordinates does not stop the layout — it silently uses a
  fallback position.** The parser falls back to **latitude 20.0° N, longitude
  78.0° E** (`dxf_parser.py:38-39, 274-275`), which is also the window's
  untouched default. Consequences the reader must know:
  - The layout is generated normally, but the **automatic tilt and row pitch
    are derived from that fallback latitude**, not from the real site. On a site
    far from that latitude they will be wrong. Overriding both is the fix.
  - **Calculate Energy is properly disabled** in this case, with a tooltip
    explaining why and telling the reader to reload with coordinates. So no
    wrong energy figure is produced — the exposure is limited to tilt and pitch.
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

- Choosing an image opens the same **Site reference** window with an extra
  **SCALE** card first (`image_scale_dialog.py`, `site_reference_dialog.py:97-128`):
  one sentence row, *"[100.00 m] on site is drawn as [10.00 mm]"* (site
  0.1–1 000 000 m, drawing 0.01–100 000 mm), with the live hint *"1 : 10,000.
  Measure any known distance on the drawing."*; then the LOCATION card and the
  same footer as §3.2. Both buttons keep the scale.
  ⛔ The window is not called "Image Boundary — Scale & Coordinates".
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

### 4.0 The five stage tabs — `IP:63-81, 162-204`, `MW:1471, 1521-1522, 1579-1581`

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
| **Electrical** | String Inverter *(or)* SMB – String Monitoring Box · Cables |
| **Yield** | Run Energy Calculation · Energy Yield |
| **Tools** | Obstructions · the tip *"Tip: Click and drag a blue ICR to reposition it."* · Main Control Room & Objects · Studies |

The **Tools** tab is locked until a layout exists (tooltip *"Generate a layout
first"*; its buttons are disabled) — `MW:1581, 3986-3990`, `IP:263-268`.

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

### 4.5 Site Parameters — `IP:777-821` (Site tab)

| Field | Default | Range | Unit |
|---|---|---|---|
| Perimeter road width | 6.0 | 0.0–50.0 | m |
| Place Lightning Arresters | off | — | — |
| LA protection radius | 100.0 (enabled only when LA is on) | 10.0–500.0 | m |
| ICR Block | 18.0 | 0.1–500.0 | MWp |
| Transmission line corridor | 15.0 per side (30 m total) | 0.0–500.0 | m |

- Number of ICRs = `ceil(total plant MWp ÷ ICR Block)` — `IP:805-809`, `MP:162-164`.
- With Lightning Arresters **off**, no arresters are placed and tables fill
  the whole usable area; they can still be added by hand in Sketch Mode —
  `IP:785-789`.
- The corridor tooltip suggests raising the setback for higher-voltage lines
  (e.g. 30 m per side for 400 kV) — `IP:813-819`.

### 4.6 Structures & Shadow (keep-clear) — `IP:833-930` (Site tab)

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
- ⚠️ **LA height and LA pile Ø are inert.** They are read from the panel into
  the layout settings (`IP:1010-1011`) and then **nothing consumes them** — no
  placement, no shadow clearing, no quantity, no export. They are also absent
  from the project-file state, so they do not even persist. **Do not claim any
  effect for them.**
- **Street lights** on: place poles along the perimeter spaced by the span,
  just inside the fence, and clear tables their shadow touches. Count ≈
  perimeter ÷ span — `IP:919`.

### 4.7 Topography (slope-aware exclusion) — `IP:932-984` (Site tab)

| Field | Default | Range | Unit |
|---|---|---|---|
| Avoid steep ground | off | — | — |
| Contour data | button **Load contour / levels…**, label *"Auto (satellite DEM)"* | — | — |
| Satellite DEM if no file | on | — | — |
| Max N–S slope | 10.0 | 0.0–45.0 | ° |
| Max E–W slope | 15.0 | 0.0–100.0 | % |
| Max height var / table | 5.0 | 0.0–30.0 | m |
| Exclude depressions | **off** ⚠️ (`MP` says on) | — | — |

- **Contour data** accepts a DXF contour file **in the project's UTM
  coordinates**, or a CSV of `lon,lat,elevation`. File dialog **Select contour
  / spot-level file**, filter `*.dxf *.dwg *.csv *.txt` — `IP:987-989`.
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

### 4.8 String Inverter / SMB card — `IP:1040-1104` (Electrical tab)

Card title **String Inverter** (string design) or **SMB – String Monitoring
Box** (central design).

| Field | Default | Range | Notes |
|---|---|---|---|
| Max strings per inverter *(String)* / Max strings per SMB *(Central)* | 20 | 1–500 | 1 string = 1 row of modules within an MMS-Table |
| Max SMB per Central Inverter *(Central only)* | 10 | 1–200 | Central Inverter capacity = SMB capacity × this |
| OND (inverter) | *"No OND file loaded"*, buttons **Load .OND** and **View** | — | View enabled once a file loads |

- **Load .OND** (file dialog **Load Inverter OND File**) parses a PVsyst
  inverter file; the row then shows *Manufacturer Model*. **PmaxOut** drives
  plant AC capacity, falling back to **Pnom** when absent — `IP:1174-1212`.
  ⚠️ The button's tooltip still says Pnom is used; the code uses PmaxOut first.
- **View** opens the read-only viewer **Inverter (OND) — <file>** with **five**
  tabs: *Main parameters*, *Efficiency curve*, *Additional parameters*,
  *Output parameters*, *Sizes and technology* — `ond_viewer_dialog.py:51-58`.
  (There is no *Commercial data* tab.)
- Max central inverters housed in one ICR building: **4** — `MP:132`.
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

### 4.8b Cables card — `IP:1106-1164` (Electrical tab) — new

| Field | Default | Range | Unit |
|---|---|---|---|
| Calculate cables | **off** | — | — |
| Inter-module lead | 0.5 | 0.0–2.0 | m/module |
| String return run along table | **on** | — | — |
| DC cable slack | 10.0 | 0.0–30.0 | % |

- Ticking **Calculate cables** raises **Cable Calculation — Performance
  Notice**: *"Cable calculation can take a long time on large or complex
  layouts."* — *"It is recommended to generate the plant layout first without
  cable calculation, review the result, and then enable cable calculation for
  the final run. Do you want to enable cable calculation now?"* Buttons
  **Enable Now** / **Not Now (Recommended)** (the default; unticks the box) —
  `IP:1217-1245`. Reopening a project does not raise it.
- Its tooltip: string DC cables (MMS → String Inverter) and AC cables (String
  Inverter → ICR) are routed and their total lengths shown; in a central design
  the DC cables SMB → Central Inverter (×2 for +/− conductors) — `IP:1118-1132`.
- With cables off, inverter/SMB counts are still computed and the cable
  figures read `—` — `MP:139-141`.
- **Inter-module lead**: *"Inter-module string cable per module (BOQ
  convention 0.5 m). Counted once per string. Fixed-tilt tables only."*
- **String return run along table**: *"One string per module row leaves its two
  leads at opposite ends of the table, so one conductor runs back along the
  table to exit beside the other. Untick for U-wired strings whose leads exit
  the same end. Fixed-tilt tables only."*
- **DC cable slack**: *"Slack / wastage added to the DC string-cable total (BOQ
  convention 10 %)."*
- ⚠️ The three allowances are **not saved** in a project file (`IP:2421-2512`).

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
| ↳ Auto (row-to-row, GCR) | **on** | — | line under it: *"Auto (row-to-row, computed on Generate)"* → *"Auto → 1.23% (row-to-row, computed)"* |
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

### 4.10 What a project file keeps — `IP:2421-2512`

Saved in `.slp`: module, table, tilt/pitch, tracker geometry, road width, LA
radius, ICR block, corridor, max strings per inverter/SMB, the cable-calculation
tick, weather source and file, GHI/GTI, every loss, ambient/wind/mounting/albedo,
degradation and P-values, plus the layout, sketch edits, SLD, BOM and terrain
result. **Not saved:** the three cable allowances (§4.8b), everything in
Structures & Shadow (footprints, LA, shadow window, clear-in-shadows, street
lights), everything in Topography, Maximize placement, half tables, the
**Place Lightning Arresters** tick, the shading auto tick and ground clearance,
and the terrain file path. A reopened project shows the defaults for those.


## 5. Layout pipeline

Order of operations — `layout_engine.py:1-11`, `MP`, and the ICR/LA modules:

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
8. Place ICRs; remove tables overlapping their footprints. The ICR count is
   then re-checked against the reduced capacity — `layout_engine.py:836-861`.
9. Place inverters/SMBs and route cables (when cable calculation is on).
10. Place Lightning Arresters (when enabled); clear tables under their
    footprints; recompute capacity.

- **`usable_polygon`** is the authoritative layout area (boundary − road
  band − obstacles − corridors − terrain exclusions). Cable routing and LA
  placement validate against it.
- Cables may run inside the perimeter road band but never outside the plant
  fence — `MP:590-592`.
- The perimeter road band is exactly `boundary − boundary.buffer(−road_width)`,
  computed once and shared by the on-screen plot, PDF, KMZ and DXF —
  `perimeter_road.py:1-13`.

### 5.1 ICR placement — `icr_placer.py`

- One ICR per **ICR Block** MWp; `num_icrs = ceil(capacity_mwp / icr_block_mwp)`.
- Tables are grouped spatially with **2-D K-means** into blocks of roughly
  one block-size each; an ICR sits at each block's centroid, so every group
  of tables surrounds its own ICR — `icr_placer.py:208`.
- Each ICR must be **fully contained** in the usable polygon.
- Any table overlapping an ICR footprint is removed.
- An ICR can be dragged on the canvas; the layout rebuilds on release and an
  invalid drop snaps back — see §7.

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
  ×2 for + / − conductors); AC cables run inverter → nearest ICR (×1,
  three-phase) — `MP:335-341`.
- **Central inverter mode:** DC string cables run table → SMB (×2); a DC
  trunk runs SMB → ICR (×2). There is **no AC leg**, because the central
  inverter sits **inside** the ICR building — `MP:342-347`.
- AC routing is **Manhattan only** — horizontal and vertical segments, no
  diagonals. Every candidate path is validated against the usable polygon
  before use. Patterns are tried in order A, A2, B, C, D, E, F, ending in a
  best-effort centroid path that always returns something connected —
  `string_inverter_manager.py:1-22`.
- Duplicate segments shared by several inverters through the same corridor
  are de-duplicated at draw time.
- **MV cables** run ICR → MCR over a **minimum spanning tree** across all ICR
  exit points plus the MCR entry point, so nearby ICRs share a trunk and
  merge into one trench rather than running parallel lines. Termination
  allowance is 10 m per MST edge — `mv_cable_router.py:1-20`.
- **Trench** totals are the de-duplicated path length per cable type, and are
  distinct from conductor totals — many cables share one trench —
  `MP:670-675`.
- When the reader deletes an auto trench or draws a manual one, Generate
  keeps the current cables instead of re-routing, so the edits persist —
  `MP:667-669`.

## 6. The main window: ribbon, left column, views

### 6.0 Chrome — `MW:1136-1273, 2897-2918`

- **Menu bar:** File · Edit-Pile · Help (§16).
- **Ribbon** (navy bar): the brand **SolarLayout**; the **design chip** reading
  *"Fixed tilt · String inverter ▾"* / *"Tracker · Central inverter ▾"* etc.
  (tooltip *"Open another window for a different design: fixed tilt or tracker,
  string or central inverter. This window stays open."*, `MW:1223-1230`); a
  status mirror (gold italic) that repeats status-bar messages; the
  **access chip** (§15); a **Docs** button (opens https://solarlayout.app/docs)
  and a **Support** button (§15).
- **Left column:** the pinned gold **Generate Layout** button (**F5**) with a
  hint line under it — *"Select a boundary file on the Site tab to generate a
  layout."* while no file is selected (`MW:8381-8421`) — then the five stage
  tabs (§4.0). While Sketch, SLD or BOM owns the column a **mode banner**
  replaces the button (§7, §11, §12).
- **Right side:** a view header, the view itself, and the plant chips.
- **Status bar:** progress and result messages on the left; on the right the
  live **cursor position** (UTM metres) and the **app version** (*v1.2.3*, or
  *dev* when run from source) — `MW:2903-2909`. There is no idle instruction.

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
  internet. **Wireframe**: tables / trackers as outlines only. **Piles**
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
| ICR blocks | OFF | colours each ICR block's area and outlines it |
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
- The plot carries a units note bottom-left: *"UTM 38N · metres"* — `MW:7116-7124`.
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

### 6.4 The Summary view — `MW:2729-2753, 6777-6921`, `SC/summary_sheet.py`

The per-plant figures as a sheet turned on its side: a **Metric** column, one
column per plant (header *"<plant> ›"* — clicking it shows that plant on the
Layout view), and a **Total** column when there are two or more plants. Rows
are grouped under **SITE · ARRAY · ELECTRICAL · CABLES · ENERGY**:

| Group | Rows (fixed tilt / tracker wording) |
|---|---|
| SITE | Plant area (acres) · Boundary length (m) · ICR blocks · Lightning arresters · Street lights · Cleaning robots · Piles |
| ARRAY | Full tables / Full trackers · Half tables / Half trackers · Modules · Tilt (°) / Max tracking angle (°) · Pitch (m) |
| ELECTRICAL | DC capacity (MWp) · String inverters · Inverter rating (kWp) — *or* SMBs · SMB rating (kWp) · Central inverters · Central inverter rating (kWp) — · AC capacity (MWac) · Inverter capacity (MW) · DC / AC ratio |
| CABLES | String DC cable (m) · AC cable to ICR (m) / DC cable to central inverter (m) · MV cable (m) · DC trench (m) · AC trench (m) · MV trench (m) |
| ENERGY | P50 energy, year 1 (MWh) · P75 energy, year 1 (MWh) · P90 energy, year 1 (MWh) · CUF (%) · P50 energy, 25 years (MWh) |

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

### 6.5 The Energy view — `MW:2755-2849, 6933-7057`

Before a run: the title **No energy result yet**, a note — *"Generate a layout
first. Energy is calculated for the generated layout."* with no layout, *"Uses
the weather source and losses set on the Yield tab. With PVGIS selected,
irradiance is fetched for the site (needs internet)."* when ready, or the
DXF-without-coordinates explanation — and a gold **Calculate energy** button
that does what the Yield tab's button does.

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

## 7. Sketch Mode — `sketch_manager.py`, `MW:1769-2111, 5377-5453`

**Sketch** (Layout view tools) switches it on. The left column is taken over:
an orange banner **● Sketch Mode** with the table count on the right and one
button **Exit Sketch Mode — apply edits, recalc totals**; leaving it
recomputes plant totals (modules, capacity, LA count), and leaving the Layout
view switches Sketch off. Status: *"Sketch Mode ON — select a tool from the
left panel."* / *"Sketch Mode OFF — plant totals updated."*

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
| 🟢 / 🔴 / 🟩 trench | Click vertices, right-click to finish. On Generate the cable follows your trenches. |
| ✂ Del Trench | Click any trench (automatic or manual) to delete it; the untouched trenches stay as the automatic routing. |
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
reposition it."*

**Obstructions** (Tools tab) are internally called roads; every label says
*Obstruction*. **Draw Rectangle** (*"Click and drag on the plot to draw a
rectangular obstruction."*), **Draw Polygon** (*"Click to add vertices.
Double-click or right-click to close."*), **Undo Last**, **Clear All** —
`MW:1480-1522, 5305-5375`. Status after a draw: *"Obstruction added — n tables |
m modules | x MWp"*; after Clear All the status still reads *"All roads cleared."*

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

## 8. Piles — `pile_dialog.py`

**Piles: OFF** in the Layout tools, or **Edit-Pile ▸ Define Pile Layout…**,
opens **Pile layout** (a `ResultDialog`, 860 px). Strip: *One table* **w × h m**
*origin at the bottom-left corner · X east, Y north*, chip *n piles*. Left:
**+ Add**, **Auto grid…**, **Remove**, **Clear**; a table **# · X (m) · Y (m)**
(empty text *"Click inside the outline to place a pile, or use Auto grid for an
even pattern."*); **Pile radius** (0.01–2 m, default **0.15**). Right: one
table drawn to scale — click inside it to place a pile. Footer: **Export to
Excel…**, **Close**, and the primary **Apply to all n tables** (disabled with
the reason *"Place at least one pile"*; **Remove piles from …** when clearing).
**Auto grid** asks **Piles per row** (along X, east) and **Rows of piles**
(along Y, north): *"Evenly spaced, inset 6% from the ends and 10% from the
sides · replaces the piles placed so far"*, button **Place n piles**.

- The pattern is defined on **one reference table** whose origin (0, 0) is its
  bottom-left (south-west) corner; it is stamped onto **every** table, so a
  pile's UTM position is `(table.x + X, table.y + Y)`.
- Status after applying: *"Piles applied: n per table · N piles across the
  plant."* The **Piles: ON** overlay stays visible even with Plant layout off.
- The Summary's **Piles** row is `tables × piles-per-table` (halves at full
  weight, §19a).
- With piles on, **Export ▾** gains **Export PDF (with Piles)** — the PDF report
  with the pile coordinates; page 1 is rendered at 300 dpi for that export —
  `MW:4703-4724`, `pdf_exporter.py:1699-1700`.

## 9. Energy calculation — `energy_calculator.py`

**Run Energy Calculation** card (first on the Yield tab) — `MW:1405-1471`:
**Calculate Energy**, **📊 Show Energy Chart**, **Interval:** (1 min, 10 min,
**15 min**, 30 min, 1 hour) and **Export TMY data CSV**, plus a status line.
All disabled until a layout exists; the Energy view's **Calculate energy**
button is the same action.

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
chosen window"*.

## 10. Studies (Tools tab) — `MW:1317-1353`

The **Studies** card holds **🔆 Simulation with AC Capacity**, **🤖 Robotic
Module Cleaning** and **🌓 Shadow View (row spacing)**. All three are present
from the start and **disabled until a layout exists** (they do not appear later).

### 10.1 Simulation with AC Capacity — `ac_capacity_dialog.py`, `ac_capacity_sim.py`, `dc_cap.py`, `ac_capacity_verdict.py`

Needs a module file and an inverter file (otherwise: *"Load a PAN module file
and an OND inverter file first (in the input panel), then run the AC-capacity
simulation."*). The window **Simulation with AC Capacity** (880 px):

- Strip: *This layout holds* **x MWp** *DC · the target cannot exceed it*, chips
  *String inverter* / *Central inverter* and *"n-string tables"*.
- **TARGET**: **AC capacity** (kW, with *= x.xx MW* beside it), **DC/AC ratio**
  (default **1.30**), **Overload limit** (default **1.5** string / **1.4**
  central — the design overload limit, not the inverter's nameplate DC input),
  **Modules per string** with a **Size…** button (§4.8a).
- **EQUIPMENT**: the **MODULE · PAN** and **INVERTER · OND** rows with **View**
  and **Replace…**, a one-line spec of each, and an expander **Override
  nameplate values** (**Module Pmax** W, **Inverter rated AC** kW).
- **RESULT · updates as you type**: a verdict banner, *Target DC* and
  *Headroom* over a capacity meter (*"layout holds x MWp"*), and tiles
  **Inverters**, **Strings per inverter**, **Installed AC**, **Target DC**,
  **DC/AC ratio**, **DC per inverter**. A central design adds **Strings per
  SMB** (default 20) with *"→ n SMBs per inverter"*.
- Verdicts: **Fits this layout** — *"Target DC uses n % of the x MWp placed.
  Regenerating trims the layout to y MWp."*; **Needs x MWp more than this
  layout holds** — *"… Lower the target, or make room in the layout (tighter
  pitch, more area) and generate again."* with fix buttons *Set AC capacity
  to … kW* / *Set ratio to …*; **DC/AC ratio is over the inverter's limit** —
  *"You asked for r; the overload limit is m. DC beyond the limit is clipped.
  Figures below use the limit."* with *Set ratio to …* / *Raise limit to …*;
  **Missing input**.
- Footer: a checkbox **Let me choose where placement starts** (*"After
  regenerating, click a point on the plot; the tables nearest it are kept."*),
  **Close**, and the primary **Regenerate layout at x MWp**.
- Maths: `num_inverters = ceil(AC_capacity / Pac_rated)` — never under-sizes;
  `installed_ac = num_inverters × Pac_rated ≥ AC_capacity`; target DC =
  requested AC × ratio. Modules-in-series come from the string-sizing method;
  parallel strings per inverter from the inverter's current and DC-power
  limits, rounded to whole tables on a string design.
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

**RESULT**: a verdict banner — *"n robots for m lines"* with a detail such as
*"k of them only because of unbridged gaps. Bridge a gap to save its robot."*,
*"One robot per cleaning line."* or *"No robot is lost to an unbridged gap."*
(or *"No tables placed"*) — and tiles **Standard bridges**, **Longest
segment**, **Cleaning segments**, **One full pass**.

Right: **GAPS TOO WIDE FOR A STANDARD BRIDGE · n** with a filter *Inside the
boundary · Crossing it · At equipment*, **Bridge all n** / **None**, and a table
**Bridge · Table row · Gap · Saves · Blocked by**. Ticking a gap means the reader
will install a supported bridge, so the fleet count drops; unticked, the line
stays broken and that stretch keeps its own robot. **Nothing is bridged unless
ticked**; bridges preview on the plot as they are ticked; a bridge that would
leave the site is preview only. Footer: **Close** and the primary **Add n robots
+ m bridges to BOM**. Results feed the Summary's *Cleaning robots* row and the
BOM.

## 11. SLD view — `sld_manager.py`, `sld_symbols.py`, `sld_autobuild.py`, `sld_sheet.py`

The **SLD** tab (Ctrl+5) shows the drawing sheet on the right and takes over
the left column with a blue banner **● SLD Preparation** / **Exit SLD** and the
**SLD TOOLS** panel. **Nothing is generated on entry**: the row **Generate:**
offers **Automatic** (build the diagram from the layout and the bill of
materials; status *"Auto-built SLD (simple feeder) — edit as needed."*) or
**Manual** (a blank sheet; *"Start a blank SLD for manual drawing? This clears
the current diagram."* when one exists) — `MW:2126-2150, 6471-6516`.

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
  (Automatic only: off = one annotated feeder with ×N multiplicities, on =
  parallel feeders converging to per-ICR transformers); **📄 Import PDF /
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
- **Auto-build** rules — `sld_autobuild.py:1-22`: string design PV → String
  Inverter (×N) → ACCB (×n) → Transformer → MV Panel → Grid; central design PV
  → SMB (×N) → Central Inverter (×n) → Transformer → MV Panel → Grid; 15
  inverters per ACCB, 4 ACCBs per IDT, IDT max 17.2 MVA (mirrored in
  `bom_builder.py:16-19`). It needs no energy run.
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
- The computed line items are in §19a.

## 13. Exports

### 13.1 The Export menu — `MW:2437-2462, 4719-4732`

**Export ▾** sits beside **Save project** in the view header. Items, in order:

| Item | Produces | Available |
|---|---|---|
| **Export KMZ** | the Google Earth file (§13.2) | after a layout |
| **Export DXF** | the layered CAD drawing (§13.3) | after a layout |
| **Export ICR-Block DXF** | one DXF drawing set: sheet 1 the whole plant, then one sheet per ICR block | after a layout |
| **Export Cable Schedule (Excel)** | a workbook with one sheet per ICR block (`P{n}-` prefix on multi-plot): DC String Schedule (string no, `R{row}-C{col}` source, `ICR{b}-INV/SMB-{k}` target, cores, +ve/−ve/total m, I, mm², %VD), AC Cable Schedule (string) / DC Trunk Schedule (central), and an MV Collection Schedule (ACCB/CINV → IDT → MCR) only when an MCR/USS is placed; sizes = smallest of `_SIZES` 1.5…630 mm² meeting derated ampacity AND %VD; basis line printed at A2 (Vmp/Imp from `.PAN`, LV voltage from `.OND` VOutConv else 800 V string / 690 V central) — `cable_schedule.py:37-128, 496-600`, `main_window.py:_on_export_cable_xlsx` | after a layout; needs ICRs — with no blocks the export shows *"No ICR blocks to schedule…"* |
| — | | |
| **Export Detailed Project Report** | a **Word document (.docx)** — cover page, site layout plan, design summary, single line diagram, bill of materials and energy yield (§13.1a) | after a layout |
| **Export PDF (with Piles)** | the PDF report including the pile drawing and coordinates | only while **Piles** is on |
| — | | |
| **Export Image (PNG)** | the plot as it is on screen, as an image file | after a layout |

Every export needs active access (§15) and all are disabled while a run is in
progress. Status lines: *"KMZ exported: …"*, *"DXF exported: …"*, *"ICR-block
DXF exported (n block sheets + plant): …"*, *"Cable schedule exported (n
ICR-block sheets): …"*, *"Document exported: …"*, *"PDF exported: …"*.

Also outside the menu: **Export TMY data CSV** (Yield tab, §9), **⬇ Export BOM
to Excel** / **⬇ Export BOM to PDF** (BOM tools), **⬇ Export SLD to DWG** /
**⬇ Export SLD to PDF** (SLD tools), **Export to Excel…** (pile editor).

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
(§19a).

**Export PDF (with Piles)** (`pdf_exporter.py:1689-1750`): every page A3
landscape, in this order — the engineering drawing (layout, border, north
arrow at top-right, title block, plant-details table) with the piles; the
summary (layout summary, design parameters, inverter/cable summary with the
per-ICR breakdown); the single-line diagram (skipped silently on error); the
bill of materials (paginated); the energy pages (only when energy was
calculated: two pages with monthly data, else one). Metadata: Title
*"SolarLayout.Desktop Report"*, Subject *"Automated PV layout summary"*.

### 13.2 KMZ — `kmz_exporter.py:1-11`

One folder per boundary, named after the plant, containing the boundary
polygon, exclusion zones, the panel tables, and a **summary placemark**
(capacity MWp, area acres, pitch, table count); plus an **Overall Summary**
folder aggregating every boundary. Inverters, ICR, arresters and cables are
also written. Opens in Google Earth.

### 13.3 DXF — `dxf_exporter.py:166-218`

⚠️ **The module docstring's layer list is incomplete — it omits six layers.**
The list below is read from the `layers.new(...)` calls that actually run.

All coordinates in UTM metres.

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
| `PILES` (orange) | a pile pattern has been defined |

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

## 14. Projects — `project_io.py`, `MW:1162-1187, 3033-3160`

- **Save project** in the view header, or **File ▸ Save Project…** (**Ctrl+S**);
  **File ▸ Open Project…** (**Ctrl+O**). Save dialog **Save Project**, filter
  *"PV Layout Project (*.slp)"*; status *"Project saved (full): …"* / *"Project
  loaded: …"*.
- Format: **`.slp`** (Solar Layout Project). It stores the session — inputs
  (see §4.10 for what is *not* kept), layout, sketch edits, SLD, BOM, terrain.
- The file is a tamper-evident binary container: a `PVSLP` magic signature, a
  format version byte, a truncated SHA-256 checksum over a secret plus the
  compressed payload, then a zlib-compressed, base64url-encoded JSON payload.
  A wrong magic or a mismatched checksum is reported as an error rather than
  loaded.
- **File ▸ New Project** (**Ctrl+Shift+N**) opens a fresh window at defaults in
  the same design; **File ▸ Open Sample Site** loads the bundled sample.

## 15. Access & licensing — `license_dialog.py`, `access_chip.py`, `trial_client.py`, `licensing.py`

**Online, device-bound access — no licence file.** Entitlement is checked
server-side; there is **no `.lic` file** to install, copy, back up, or load.
The app opens without access, but **Generate Layout** and every export (KMZ,
DXF, ICR-block DXF, cable schedule, report, TMY CSV) are blocked until access
is active (`_require_license`, `MW:3200-3213`). When blocked, the app opens
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

## 16. Menus — `MW:1136-1210`

- **File:** New Project (Ctrl+Shift+N) · Move to String / Central Window…
  (Ctrl+N) · Save Project… (Ctrl+S) · Open Project… (Ctrl+O) · Open Sample
  Site · Exit (Ctrl+Q)
- **Edit-Pile:** Define Pile Layout…
- **Help:** How to Use This Tool (F1) · License / Subscription…

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
- Very large plants use fast geometric cable **estimation** so generation
  stays quick.
- **Progress:** *"Calculating layout…"* with the overlay *Generating Layout…*;
  then *"Calculating cable routes…"* / *Calculating Cable Routes…* — *"The
  calculation is going on, please wait."*; then *Rendering Layout on Canvas…*
  — *"Large plants may take a few minutes — please wait."*
- **After a run** the status line reads **"Layout ready"** followed by notes
  as they apply: *"| n water bodies excluded"*, *"| n tables cleared for
  building shadows"* (*trackers* on a tracker), *"| MV cable: n m"*, the DC
  target note (§10.1). The totals are in the plant chips, not the status line.
- **Closing while a calculation runs** asks **Calculation in progress** — *"A
  layout, cable or weather calculation is still running. Wait for it to finish
  (the window closes by itself when it does), or quit now and discard the
  result?"* — **Wait** / **Quit now**.

## 18. Known stale sources — do not repeat these

| Stale claim | Where it appears | Verified truth |
|---|---|---|
| ICR is 40 m × 14 m | `README.md`, `icr_placer.py` docstring, `MP:255-256` comments, `CLAUDE.md`, F1 help | 10 × 4 m, from the reader's own fields |
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

**There is no way to clear manual trench edits.** Once a trench has been drawn
or an automatic one deleted, the flag that freezes cable routing is set and
**never reset** — no control clears it (`sketch_manager.py:2322, 2372`; no
assignment back to false exists anywhere). The route back is a fresh layout or a
new project. Tell the reader that plainly rather than implying a toggle exists.

**Arresters on the exported drawing ignore the on-screen switch.** Both
report exports force the arrester rectangles and labels **visible** and forces the
protection circles **hidden**, then restores the previous state —
`MW:4266-4280`. So arresters always appear on the drawing page and the coverage
circles never do, whatever the **Lightning Arresters** switch is set to.

**MV cables are routed on the next Generate, not when the MCR is placed.**
After **Place MCR** the hint reads *"MCR placed. Enable 'Cable Calc' and
regenerate layout to route MV cables."* (`MW:7638-7640`); the MV row of the
Layers popover has nothing to show, and the Summary's *MV cable (m)* reads `—`,
until the reader generates again with cables on. Then the status line adds
*"| MV cable: n m"*.

**A hand-drawn obstruction (Tools tab) re-places inverters without
re-measuring cables.** `_on_road_drawn` calls `_refresh_inverters` and rebuilds
the summary (`MW:5332-5352`); the DC and AC **trench** rows keep their figures
but *String DC cable (m)* and *AC cable to ICR (m)* read **0** until the next
Generate re-runs the cable worker. Tell the reader to generate again after
drawing obstructions before quoting cable lengths.

**The Symbol Editor's buttons are labelled `Accept` and `Reject`** —
`sld_symbol_editor.py:57-59`.

**Auto-build needs no energy calculation.** Its ratings come from the materials
list, which is computed from the layout alone. Generating the layout is enough.

**What Generate Layout does to Sketch-Mode edits** — `MW:2739-2771`. This is
consequential and easy to get wrong, so state it precisely:

1. If the reader is still in Sketch Mode, Generate leaves it first, so the
   edits are committed rather than lost.
2. If the layout was edited, Generate **re-places every table, tracker,
   inverter and control room from scratch** into the newly available space. So
   hand-placed and hand-deleted **tables do not survive** a Generate.
3. But the obstructions, corridors and main control room the reader drew **do**
   survive — they are collected and fed to the placement as **keep-outs**. That
   is the point of the re-plot: the design is rebuilt *around* the reader's
   constraints.
4. The re-plot is forced to the **aligned grid** — **Maximize placement** is
   switched off for it, deliberately, so pile coordinates stay uniform for
   construction. A reader who had Maximize placement on will get an aligned
   plant back.
5. The status line reads *"Re-plotting the aligned grid around your sketch
   edits…"*.
6. Hand-drawn cable trenches are the exception and do persist — see the trench
   entry above.

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

**The computed bill of materials line items** — `bom_builder.py:98-223`. Rows
appear in this order, and a row is **omitted entirely** when its quantity is
zero, so a short list means the plant has none of that thing:

| # | Description | Unit | Remark carried |
|---|---|---|---|
| 1 | Plant AC Capacity | MW | *"PmaxOut × no. of inverters (from OND)"*; shows `—` without an inverter file |
| 2 | Plant DC Capacity | MWp | |
| 3 | PV Module | Nos | wattage each |
| 4 | String Inverter, **or** SMB (String Monitoring Box) + Central Inverter | Nos | capacity each / SMBs per central inverter |
| 5 | MMS Table … — Full, **or** Tracker (Full) | Nos | |
| 6 | Half MMS Table, **or** Half Tracker | Nos | *"half length; carries half the strings"* — only when present |
| 7 | DC String Cable | m | *"incl. +ve / −ve conductors"* |
| 8 | DC String Trench | m | names the destination, SMB or String Inverter |
| 9 | DC Cable (SMB → Central Inverter) | m | Central mode only |
| 10 | AC Cable (Inverter → ICR) | m | String mode |
| 11 | AC Trench (Inverter → ICR), **or** DC Trench (SMB → Central Inverter) | m | |
| 12 | ACCB (AC Combiner Box) | Nos | *"≤ 15 inverters each"* |
| 13 | Inverter Duty Transformer (IDT) | Nos | *"33 kV / 800 V"* plus the units-per-transformer and winding progression |
| 14 | ICR (Inverter Control Room) | Nos | |
| 15 | MV Panel (Switchgear) | Lot | *"Inside MCR"* — only once an MCR is placed |
| 16 | MV Cable (ICR → MCR) | m | MCR only |
| 17 | MV Trench (ICR → MCR) | m | MCR only |
| 18 | Power Transformer | MVA | *"ΣIDT × 1.2"* — MCR only |
| 19 | MCR (Main Control Room) | Nos | MCR only |
| 20 | Lightning Arrester | Nos | |
| 21 | Street Light (perimeter) | Nos | pole height and spacing |
| 22 | Robotic Module Cleaning Equipment | Nos | row count, plus any added for broken lines or battery range |
| 23 | Cleaning Robot Bridge (table-to-table) | Nos | the standard span |
| 24 | Cleaning Robot Bridge (supported span) | Nos | *"Over arresters / buildings / obstructions"* |

Rows 22–24 appear only after the cleaning tool has been run.

**A half table receives the full pile pattern and counts as a whole table.**
The pattern is stamped onto every entry in the placed-table list without
regard to `is_half` (`MW:4029, 8016`), and the summary's pile column is
`table count × piles per table` (`MW:7373, 7462`) — halves included at full
weight. So on a plant with half-table infill the pile count is optimistic, and
some stamped piles can fall outside a half table's narrower footprint. Say so.

## 19. Facts we do not have

These are genuinely unknown, not merely unverified. Write around them; do not
invent a value.

| Unknown | How to handle it |
|---|---|
| The Microsoft Store listing URL | Tell the reader to open the Microsoft Store and search for the application by name. Do not write a URL or a `ms-windows-store:` link. |
| ~~The current version number and release date~~ | **Resolved (Arun, 2026-08-18): v1.0.0, dated 2026-08-18**, published as the first documented release. It records the shipped capability set rather than a change list, because there is no earlier documented version to compare against. Later entries are real changelogs. |
| ~~Where the installed version number is displayed~~ | **Resolved (2026-08): the app version is always shown in the bottom status bar** — `app_version.display_version()`, e.g. `v1.1.0` (`dev` when run from source); see §15. |
| ~~Whether uninstalling removes the licence file~~ | **Moot under the online model:** there is no licence file (§15). Access is server-side and device-bound, so it survives an uninstall/reinstall on the same machine automatically — nothing to keep or restore. |
| What changes the Device ID | The fingerprint is derived per machine, but which hardware or OS changes alter it is not something to promise. Say a reinstall of Windows or a change of machine can change it, and that a changed ID needs access re-activated (**Get Free Access** again). |
| Any release history | There is none to write. Do not invent changelog entries. |
| Minimum Windows build, RAM, disk, or screen resolution | State the requirements qualitatively — a 64-bit Windows PC, a display wide enough for the panel and plot side by side, an internet connection only for weather and elevation data. Leave a `{/* VERIFY: minimum Windows version and hardware requirements */}`. |
| ~~Support email address or contact route~~ | **Resolved (Arun, 2026-08-18): `sales@solarlayout.app`.** It is the route for everything reader-facing — a new licence, a renewal, a reissue for a new machine, and any problem the pages do not resolve. |
| Typical run times for Generate on a given plant size | Do not quote seconds or minutes. Say cable calculation is the slow step on large plants, which is what the application itself warns. |
| Price, plans, licence duration options | Out of scope. The licence pages cover activation and error messages only. |
