# SolarLayout Desktop — verified product facts

**This file is the only permitted factual source for content in this repo.**

Every value below was read from executing code in the product repository
(`PVlayout_Advance`, branch `main`) and carries a `file:line`-style citation.
Where the product's own README, module docstrings, code comments, or in-app F1
help state something different, **they are stale and must not be used**. A
list of the specific known-stale claims is in [§14](#14-known-stale-sources--do-not-repeat-these).

Citations are relative to the product repo root. `IP` = `apps/solarlayout-desktop/solarlayout_desktop/input_panel.py`,
`MW` = `.../main_window.py`, `MP` = `packages/solar-core/solar_core/models/project.py`.

> **Rule for writers:** if a number, label, or behaviour is not in this file,
> do not state it. Describe the capability without the number, or leave a
> `{/* VERIFY: … */}` comment for a follow-up pass.

---

## 1. Product identity

- Application name as it appears in the app: **SolarLayout.Desktop**
  (window titles, `app.setApplicationName`) — `entrypoints.py:main_full`.
  In prose, write **SolarLayout Desktop** (no dot); use the dotted form only
  when quoting a literal UI string.
- Platform documented: **Microsoft Windows only.**
- Distribution documented: **Microsoft Store**, published by **Rensaar**.
  Store-distributed packages are signed and updated by Microsoft and are
  exempt from SmartScreen warnings — `docs/superpowers/specs/2026-08-03-msix-store-packaging-design.md §1`.
- **Never mention:** other operating systems, portable/zip builds, GitHub
  Releases, `.dmg`, source builds, PyInstaller, product tiers or editions,
  the cloud product, or the BESS product.
- There is **no feature tiering**. Nothing in the app imports `edition.py`;
  every button is created unconditionally. Do not write "Pro", "Pro Plus",
  or "available in your plan".

## 2. Launch: design-mode selection

A modal 4-card dialog appears at every launch before the main window
(`startup_dialog.py`). The reader must pick one combination:

| Mounting | Electrical | Chain shown on the card |
|---|---|---|
| Fixed Tilt | String Inverter | Modules → MMS-Table → String Inverter → ICR |
| Fixed Tilt | Central Inverter | Modules → MMS-Table → SMB → Central Inverter |
| Single Axis Tracker | String Inverter | Modules → Tracker MMS → String Inverter → ICR |
| Single Axis Tracker | Central Inverter | Modules → Tracker MMS → SMB → Central Inverter |

- Single Axis Tracker is **horizontal, N–S axis**; panels sweep E–W.
- The choice controls which input groups appear: SAT replaces the
  *MMS-Table Configuration* **and** *Spacing & Tilt* groups with a single
  *Tracker Configuration* group — `IP:82-86`.
- Central Inverter mode renames the inverter group to *SMB – String
  Monitoring Box*, adds *Max SMB per Central Inverter*, and relabels the
  cable rows — `IP:767-795`.
- Switching mode later: **File ▸ Move to String / Central Window…**, also on
  the toolbar as **⊕ Move to String / Central Window** — `MW:974, MW:2197`.

## 3. Boundary input

Field label: **Input KMZ File**; button **Browse…**; an **ⓘ** button opens the
preparation guide — `IP:98-138`.

Accepted extensions in the file dialog — `IP:1310-1314`:
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
- Open/invalid rings raise a **Boundary Validation Issues** dialog listing
  each problem boundary with a checkbox to exclude it and proceed with the
  rest, or Cancel to go fix the file — `boundary_validation_dialog.py:1-13`.

### 3.2 DXF / DWG

- CAD drawings carry no geographic position. A **DXF Site Coordinates**
  dialog asks for optional site latitude/longitude — `dxf_latlon_dialog.py:1-12`.
- Without coordinates the layout is still generated geometrically, but
  **energy calculation is unavailable**.
- Geo-referencing preserves shape and area exactly: each DXF point is
  treated as a metre offset from the drawing centroid, added to the
  reference point projected to UTM — `dxf_parser.py:8-22`.

### 3.3 Raster image

- An **Image Boundary — Scale & Coordinates** dialog asks how a real site
  distance maps to a drawing distance, plus optional latitude/longitude —
  `image_scale_dialog.py:1-12`.
- The largest closed outline in the image becomes the boundary —
  `image_boundary_parser.py:1-9`.
- Scale maths — `image_boundary_parser.py:10-20`:
  `mm_per_pixel = 25.4 / dpi`; `site_m_per_mm = site_distance_m / drawing_distance_mm`;
  `m_per_pixel = mm_per_pixel × site_m_per_mm`. DPI is read from image
  metadata, defaulting to **96**.
- Dialog default scale: **100 m site / 10 mm drawing** — `image_scale_dialog.py:480-481`.
  (The module docstring's "1000 m / 10 mm" example is stale.)

## 4. Input defaults — as shipped in the UI

⚠️ **Publish these values, not the dataclass defaults in `MP`.** Several
dataclass defaults are never seen by a reader because the input panel's
widgets override them. Divergences are marked ⚠️.

### 4.1 Module Specifications — `IP:143-221`

| Field | Default | Range | Unit |
|---|---|---|---|
| Length (long side) | 2.38 | 0.5–5.0 | m |
| Width (short side) | 1.13 | 0.5–3.0 | m |
| Wattage | **610** ⚠️ (`MP` says 580) | 100–1000 | Wp |
| Bifacial module | off | — | — |
| Bifaciality factor (φ) | 0.70 (enabled only when Bifacial is on) | 0.50–0.95 | — |

- **Load .PAN** parses a PVsyst module file and auto-fills wattage, long
  side, short side, and — when the file declares it — turns on Bifacial and
  fills φ. It also recomputes the temperature loss — `IP:1386-1435`.
- **View** opens a read-only PVsyst-style viewer with tabs *Basic data*,
  *Sizes and Technology*, *Model parameters*, *Additional Data*, *Graphs*;
  the Graphs tab draws an I–V / P–V curve from the STC points —
  `pan_viewer_dialog.py:1-10`.
- PAN dimension values are accepted in metres (< 100) or millimetres
  (≥ 100) — `pan_parser.py:9-11`.
- After a PAN load the app asks **"Calculate the number of modules in series
  automatically?"** with **Auto** / **Manual** buttons — `IP:1440-1460`.

### 4.2 MMS-Table Configuration (Fixed Tilt only) — `IP:223-270`

| Field | Default | Range | Unit |
|---|---|---|---|
| Orientation | Portrait (or Landscape) | — | — |
| Modules per row | 28 | 1–100 | — |
| Rows per MMS-Table | 2 | 1–10 | — |
| Gap between modules E-W | **0.020** ⚠️ (`MP` says 0) | 0.0–5.0 | m |
| Gap between modules N-S | **0.020** ⚠️ (`MP` says 0) | 0.0–5.0 | m |
| Gap between MMS-Tables | 1.0 | 0.0–20.0 | m |
| Maximize placement | off | — | — |
| Add half tables in leftover space | **off** ⚠️ (`MP` says on) | — | — |

Table dimensions — `MP:45-65`:
- Portrait: module short side → E-W, long side → N-S. Landscape: reversed.
- `table_width  = modules_in_row × mod_ew + (modules_in_row − 1) × gap_ew`
- `table_height = rows_per_table × mod_ns + (rows_per_table − 1) × gap_ns`

**Maximize placement** positions each row independently to hug the exact
boundary edge, fitting extra tables near diagonal or curved fences. Table
columns will **not** be vertically aligned across rows, and computation takes
longer on large sites — `IP:248-257`.

**Half tables** are half the E-W width carrying half the strings, dropped
wherever a full table will not fit — `IP:260-268`.

### 4.3 Spacing & Tilt (Fixed Tilt only) — `IP:272-335`

| Field | Default | Range | Unit |
|---|---|---|---|
| Override tilt angle | off → auto from latitude | — | — |
| Tilt angle (when overridden) | 20.0 | 0.0–90.0 | ° |
| Override row pitch | off → auto | — | — |
| Row pitch (when overridden) | 7.0 | 1.0–50.0 | m |

- Auto tilt rule of thumb shown in the tooltip: `tilt ≈ latitude × 0.76 + 3.1°`
  — `IP:284`.
- Auto pitch is the no-shading pitch at winter-solstice solar noon —
  `IP:316-318`. Formula — `spacing_calc.py:5-15`:
  `pitch = L·cos(tilt) + L·sin(tilt) / tan(solar_elevation)` where `L` is the
  table height in the tilt plane.
- After a layout runs, the auto values are displayed inline
  ("Auto → 12.3° (latitude-based)", "Auto → 7.42 m (no-shading, latitude-based)")
  and pre-filled into the override boxes — `IP:1684-1718`.
- Reported **GCR** = table height ÷ row pitch.

### 4.4 Tracker Configuration (SAT only) — `IP:337-480`

| Field | Default | Range | Unit |
|---|---|---|---|
| No. of strings per tracker | 2 | 1–20 | — |
| Modules across tracker (E–W) | 1 | 1–8 | — |
| Module orientation | P config (Portrait) — long side E–W | — | — |
| Modules per string (N–S) | 28 | 4–120 | — |
| Gap between modules E–W | 0.020 | 0.0–5.0 | m |
| Gap between modules N–S | 0.020 | 0.0–5.0 | m |
| Tracker E-W pitch | 5.5 | 1.0–30.0 | m |
| N–S service gap between units | 2.0 | 0.0–20.0 | m |
| Max rotation angle (±) | 55.0 | 5.0–75.0 | ° |
| Tracker height from ground | 1.5 | 0.5–10.0 | m |
| Maximize placement | off | — | — |
| Add half trackers in leftover space | off | — | — |

- **L config (Landscape)** puts the module long edge N–S along the torque tube.
- A live preview line under the group shows **Aperture (E-W)**, **Length (N-S)**,
  **GCR**, and **Modules/tracker** — `IP:482-511`, computed as:
  `aperture = modules_across × mod_ew`; `ns_length = strings × modules_per_string × mod_ns`;
  `gcr = aperture / pitch_ew`; `modules = across × strings × per_string`.
- Tracker height and max angle are described in the tooltips as reference /
  shading-analysis inputs — `IP:427-438`.
- Placement sweep is the mirror of fixed tilt: outer loop E-W across tracker
  columns, inner loop N-S along units in the column — `tracker_layout_engine.py:19-21`.

### 4.5 Site Parameters — `IP:513-557`

| Field | Default | Range | Unit |
|---|---|---|---|
| Perimeter road width | 6.0 | 0.0–50.0 | m |
| Place Lightning Arresters | off | — | — |
| LA protection radius | 100.0 (enabled only when LA is on) | 10.0–500.0 | m |
| ICR Block | 18.0 | 0.1–500.0 | MWp |
| Transmission line corridor | 15.0 per side (30 m total) | 0.0–500.0 | m |

- Number of ICRs = `ceil(total plant MWp ÷ ICR Block)` — `IP:543`, `MP:162-164`.
- With Lightning Arresters **off**, no arresters are placed and tables fill
  the whole usable area; they can still be added by hand in Sketch Mode —
  `IP:521-525`.
- The corridor tooltip suggests raising the setback for higher-voltage lines
  (e.g. 30 m per side for 400 kV) — `IP:553-554`.

### 4.6 Structures & Shadow (keep-clear) — `IP:569-660`

Footprints are **Length (E-W) × Width (N-S)**, plus a **Height** that drives
the shadow footprint.

| Structure | Length | Width | Height | Unit |
|---|---|---|---|---|
| ICR | **10.0** | **4.0** | 5.0 | m |
| MCR | **15.0** | **8.0** | 5.0 | m |
| USS | 5.0 | 4.0 | 5.0 | m |
| Object | 0.0 | 0.0 | 0.0 (0 = not configured) | m |

Corroborated by the constants — `MP:233-243`: `ICR_EW=10.0`, `ICR_NS=4.0`,
`MCR_EW=15.0`, `MCR_NS=8.0`, `USS_EW=5.0`, `USS_NS=4.0`. The runtime footprint
comes from the user's fields, passed through as `icr_w`/`icr_h` —
`layout_engine.py:831-834`.

| Other field | Default | Range | Unit |
|---|---|---|---|
| LA height | 9.0 | 0.0–100.0 | m |
| LA pile Ø | 0.3 | 0.0–5.0 | m |
| Shadow Window | 9.0 to 16.0 | 4–12 / 12–20 | solar hours |
| Clear tables inside shadows | **on** | — | — |
| Street light pile Ø | 0.3 | 0.0–5.0 | m |
| Street light height | 6.0 | 0.0–50.0 | m |
| Street light span (pole to pole) | 40.0 | 1.0–500.0 | m |
| Street light setback (inset inside perimeter) | 0.2 | 0.0–50.0 | m |
| Street lights | **off** | — | — |

- **USS (Unit Substation):** in a multi-plot file, *Place MCR* first drops a
  USS of this size in every plot **except** the one holding the MCR; each
  plot's ICRs route their MV cables to their USS — `IP:597-600`.
  The USS→MCR link itself is an overhead line or buried cable handled
  outside the automatic MV routing — `MP:271-276`.
- **Clear tables inside shadows** removes tables/trackers falling inside the
  year-round shadow footprint of the ICR / MCR / objects during the shadow
  window — `IP:626-628`.
- **Street lights** on: place poles along the perimeter spaced by the span,
  just inside the fence, and clear tables their shadow touches. Count ≈
  perimeter ÷ span — `IP:647, IP:652-655`.

### 4.7 Topography (slope-aware exclusion) — `IP:662-711`

| Field | Default | Range | Unit |
|---|---|---|---|
| Avoid steep / unsuitable ground | off | — | — |
| Contour data | Auto (satellite DEM) | — | — |
| Fetch from satellite if no file (SRTM 30 m) | on | — | — |
| Max N–S slope | 10.0 | 0.0–45.0 | ° |
| Max E–W slope | 15.0 | 0.0–100.0 | % |
| Max height var / table | 5.0 | 0.0–30.0 | m |
| Exclude depressions / water-pooling cells | **off** ⚠️ (`MP` says on) | — | — |

- **Contour data** accepts a DXF contour file **in the project's UTM
  coordinates**, or a CSV of `lon,lat,elevation` — `IP:682-683`.
  File dialog filter: `*.dxf *.dwg *.csv *.txt` — `IP:716`.
- With no file and auto-fetch on, the DEM is built from public satellite
  elevation data (SRTM) — needs an internet connection.
- Excluded ground: slope steeper than the limits, and (when enabled)
  depressions / water-pooling cells — `terrain.py:5-11`.
- **Max height var / table** is the ground relief allowed within one table
  footprint — the pile-reveal differential — `IP:703-705`.
- Any terrain failure (no network, bad file) is non-fatal: the layout simply
  proceeds without terrain exclusion — `terrain.py:16-18`.
- ⛔ **Do not document a reduced-level (RL) band.** `terrain_min_rl` /
  `terrain_max_rl` exist in `MP:205-206` but have **no widgets** in the input
  panel, so a reader cannot set them. The F1 help's flood-level example is
  unreachable.
- Contours are drawn green (low) → blue → red (high) and toggled by the
  **Terrain** switch; the excluded area is reported in acres — `MW:7709`.

### 4.8 String Inverter / SMB group — `IP:767-862`

| Field | Default | Range | Notes |
|---|---|---|---|
| Max strings per inverter *(String)* / Max strings per SMB *(Central)* | 20 | 1–500 | 1 string = 1 row of modules within an MMS-Table |
| Max SMB per Central Inverter *(Central only)* | 10 | 1–200 | Central Inverter capacity = SMB capacity × this |
| Calculate Cables for PV Power Plant | **off** | — | see below |

- Ticking **Calculate Cables** raises a performance notice: cable
  calculation can take a long time on large or complex layouts; the
  recommendation is to generate the layout first without it, review, then
  enable it for the final run. Buttons: **Enable Now** /
  **Not Now (Recommended)** (the default) — `IP:909-937`.
- With cables off, inverter/SMB counts are still computed and cable columns
  show `—` — `MP:139-141`.
- **Load .OND** parses a PVsyst inverter file; **PmaxOut** drives plant AC
  capacity, falling back to **Pnom** when absent — `IP:872-902`.
- **View** opens a read-only OND viewer with tabs *Main parameters*,
  *Efficiency curve*, *Additional parameters*, *Output parameters*, *Sizes
  and Technology*, *Commercial data* — `ond_viewer_dialog.py:1-9`.
- Max central inverters housed in one ICR building: **4** — `MP:132`.

### 4.9 Energy Yield group — `IP:939-1272`

**Weather Data Source** (mutually exclusive) — `IP:950-980`:
- **PVGIS API (auto-fetch on Calculate)** — default. EU JRC service, no API
  key. Falls back to **NASA POWER** when PVGIS has no data.
- **Hourly GHI file (CSV)** — reveals a Browse row. Selecting it pops a
  format reminder: **exactly 3 columns in order** — hourly timestamp, GHI
  (W/m²), ambient temperature (°C); a full year is 8 760 rows; a header row
  is optional and auto-detected — `IP:1521-1540`.

  The parser itself is more tolerant than that dialog: it accepts flexible
  column names and an optional GTI column — `pvgis_file_parser.py:1-25`.
  Time: `time`, `datetime`, `date`, `timestamp`, `time(utc)`, `time(local)`,
  `date/time`. GHI: `ghi`, `g(h)`, `gh`, `global_horizontal`,
  `global horizontal irradiance`, `irradiance`, `solar irradiance`,
  `allsky_sfc_sw_dwn`. GTI: `gti`, `g(i)`, `gi`, `in-plane irradiance`.
  When a temperature column is present, monthly averages come from the file
  instead of the sinusoidal seasonal model.

| Field | Default | Range | Unit |
|---|---|---|---|
| GHI | 0.0 (auto-filled) | 0–3000 | kWh/m²/yr |
| GTI (in-plane) | 0.0 (auto-filled) | 0–3500 | kWh/m²/yr |
| Avg. ambient temp. | 28.0 | −10–55 | °C |
| Mounting type | Open Rack – Ground Mount | 4 options | — |
| Avg. wind speed | 3.0 | 0.5–15.0 | m/s |
| Ground albedo (ρ) | 0.25 | 0.05–0.80 | — |

Sandia mounting options and coefficients — `IP:1052-1056`:
Open Rack – Ground Mount `a=−3.56, b=−0.075`; Roof Mount – Close
`a=−2.81, b=−0.0455`; Stand-off Mount `a=−3.23, b=−0.130`;
Insulated Back `a=−2.81, b=−0.0455`.

**Performance Ratio breakdown** — publish the UI defaults ⚠️ (all differ from
`MP:442-451`):

| Loss / factor | Default | Range | Notes |
|---|---|---|---|
| String / Central Inverter efficiency | 97.0 % | 50–100 | label follows the mode |
| String DC cable losses | 1.0 % | 0–20 | *(MMS → SMB in Central mode)* |
| AC cable losses (Str. Inv. → ICR) | 1.0 % | 0–20 | *(SMB → Central Inv. in Central mode)* |
| Soiling losses | 2.0 % | 0–20 | dust, dirt, bird droppings |
| Temperature losses | 6.0 % | 0–20 | auto-computed once a PAN is loaded |
| Module mismatch | 1.0 % | 0–10 | |
| Shading losses | 1.0 % | 0–20 | editable only when auto-compute is off |
| Auto-compute (row-to-row from GCR) | **on** ⚠️ | — | |
| Module ground clearance | 0.5 m | 0.0–5.0 | lower-edge height above ground |
| Availability | 99.0 % | 50–100 | |
| Transformer losses | 1.0 % | 0–10 | |
| Other losses | 2.0 % | 0–10 | monitoring, auxiliary, misc |

Temperature model — `IP:1140-1150`, `energy_calculator.py`:
`T_module = T_ambient + G × exp(a + b × W)`, then
`Loss (%) = |muPmpp| × (T_module − 25)`. `G` is the average operating
irradiance derived from GTI as `min(900, GTI × 1000 / (365 × 8))` W/m², or
600 W/m² when GTI is 0 — `IP:1608-1611`. The computed module temperature is
displayed next to the row, with a formula trace under the inputs.

**Degradation** — `IP:1203-1224`:

| Field | Default | Range | Unit |
|---|---|---|---|
| 1st year degradation | **1.0** ⚠️ | 0–10 | % |
| Annual degradation | **0.4** ⚠️ | 0–5 | %/yr |
| Plant lifetime | **30** ⚠️ | 1–50 | years |

**Probabilistic Yield (P-values)** — `IP:1226-1269`:

| Field | Default | Range | Unit |
|---|---|---|---|
| Combined uncertainty (1σ) | **5.0** ⚠️ | 0.1–30.0 | % |
| Exceedance prob. 1 | 50.0 | 1.0–99.9 | % |
| Exceedance prob. 2 | 75.0 | 1.0–99.9 | % |
| Exceedance prob. 3 | 90.0 | 1.0–99.9 | % |

Tooltip formulas — `IP:1237-1238`: `P75 = P50 × (1 − 0.674 × σ)`,
`P90 = P50 × (1 − 1.282 × σ)`. All three columns are user-set exceedance
probabilities; the summary column headers are built from them, so they read
`P50Yr1(MWh)` etc. and change when the reader changes the probabilities —
`MW:7307-7314`.

Bifacial model — `MP:495-501`:
`GTI_rear ≈ GHI × ground_albedo × F_ground_rear × (1 − GCR)` where
`F_ground_rear = (1 + cos(tilt)) / 2`; `bifacial_gain = φ × GTI_rear / GTI_front`.
Bifaciality tooltip states a typical bifacial energy gain of **5–15 %** over
a monofacial module and a typical φ range of **0.65–0.80** — `IP:205, IP:213`.

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

## 6. Canvas, toolbar and view toggles

Toolbar buttons — `MW:2261-2365`:

| Button | Default | What it does |
|---|---|---|
| 💾 Save(Project) | — | Save the session to `.slp` |
| ⛶ Expand Plot | — | Open the plot in a large window with **⟵ Return to Main Window** (`MW:2474-2499`) |
| 🛰 Satellite | off, disabled until a layout exists | Esri World Imagery aerial photo behind the layout, geo-aligned to the file's latitude/longitude. Needs internet. |
| ▢ Wireframe | off (filled) | Draw tables / trackers as outline only |
| 📍 Piles: OFF | off, disabled until a layout exists | Pile overlay. First use opens the Pile Layout editor; piles stay visible even with Plant Layout off. Re-open from **Edit-Pile ▸ Define Pile Layout…** |
| ✏ Sketch Mode | off | Hand-edit the layout |
| 📋 BOM | off | Bill-of-materials editor |
| ⚡ SLD | off | Single-line-diagram editor |

ON/OFF switches — `MW:1359-1470`, `MW:7184-7272`:

| Switch | Default |
|---|---|
| AC Cables | OFF |
| DC Cables | OFF |
| MV Cables (ICR→MCR) | OFF |
| Contour / Terrain | OFF |
| Plant Layout | ON |
| Legend | ON |
| Lightning Arresters | OFF |
| Summary | ON |

Canvas colours — `MW:342` and the exporters: MV cable `#006400` (dark
green); boundary gold; tables blue; ICR dark blue; inverters green/lime; DC
cable orange; AC cable red; arresters dark red; obstacles red; water blue.

The matplotlib navigation toolbar is standard except that **Home (⌂)** resets
to the stored plant bounding box (fit-to-plant) rather than matplotlib's
internal initial view — `MW:69-80`.

**Layout & Energy Summary** table sits under the canvas with a **⛶ Maximize**
button that opens it in its own window — `MW:2390`, `MW:5804`.

### 6.1 Summary table columns — `MW:7280-7315`

Fixed order. `Full Tbl`/`Half Tbl` become `Full Trk`/`Half Trk` for SAT, and
`Tilt(°)` becomes `MaxAng(°)`:

`Plant` · `Plant Area (Acres)` · `Plant Boundary (in meter)` · `Full Tbl` ·
`Half Tbl` · `Modules` · `DC(MWp)` · `Tilt(°)` · `Pitch(m)` · `ICR` →
then **String mode:** `Str.Inv` · `Inv kWp`; **Central mode:** `SMBs` ·
`SMB kWp` · `C.Inv` · `CInv kWp` →
then **String:** `StrDC(m)` · `AC-ICR(m)`; **Central:** `StrDC(m)` · `DC-CInv(m)` →
then `LA` · `St.Lt` · `Robots` · `Piles` · `MV(m)` · `DC-Tr(m)` · `AC-Tr(m)` ·
`MV-Tr(m)` · `AC(MWac)` · `InvCap(MW)` · `DC/AC` ·
`P50Yr1(MWh)` · `P75Yr1(MWh)` · `P90Yr1(MWh)` · `CUF(%)` · `25yrP50(MWh)`.

- The three P-columns are named from the reader's exceedance probabilities.
- A trailing **`*`** on Tilt or Pitch means the value was auto-calculated
  rather than entered — shown for Fixed Tilt only — `MW:7325-7328`.
- A `—` means not computed (e.g. cable columns with cable calculation off).
- A **TOTAL** row aggregates every plant — `MW:7400+`.

## 7. Sketch Mode — `sketch_manager.py`, `MW:1517-1860`

Entering Sketch Mode reveals a tool palette. Leaving it recomputes plant
totals (modules, capacity, LA count).

| Tool | Behaviour |
|---|---|
| ↖ Move | Click to select; Shift-click multi-select; drag empty space for a rubber band; drag any selection to move it together. Ctrl+Arrow nudges 1 m. |
| ⎘ Copy | Duplicate the selection, offset 5 m E + 5 m N. Ctrl+C / Ctrl+V also work. |
| 🗑 Delete | Click any object to remove it |
| ➕ Table | Place a full MMS table |
| ➕ Half Table | Place a half unit (the module axis is halved) |
| ➕ LA | Place a Lightning Arrester (clears tables under its footprint) |
| 🚧 Road | Drag a rectangle obstruction (removes overlapping tables) |
| ⚡ T-Line | Click vertices; right-click to finish a transmission line |
| 🅣 Text | Click to drop a multi-line label; reposition with ↖ Move |
| ╱ Line | Click-drag a straight line |
| ⌒ Polyline | Click vertices; right-click or double-click to finish |
| □ Rect | Click-drag a rectangle |
| ○ Circle | Click the centre, drag the radius |
| ◜ Arc | Click start, end, then a point on the arc |
| ⬭ Ellipse | Click-drag a bounding box |
| ∿ Spline | Click fit points; right-click or double-click to finish |
| ▨ Fill/Zone | Click a closed polygon to fill it |
| 📏 Measure | Click points: 2 gives distance + bearing, more gives a running total |
| 📐 Dimension | Click-drag, or click a point then a second, to place a dimension |
| 🟢 DC Trench / 🔴 AC Trench / 🟩 MV Trench | Click points to draw a trench polyline |
| ✂ Del Trench | Click a cable trench (auto or manual) to delete it |
| 🖐 Pan / 🔍 Zoom | Navigate; Home fits the view |

Also in the palette — `MW:1617-1843`: **🎨 Colour**, **🧲 Snap**, **⊾ Ortho**,
**↶ Undo**, **↷ Redo**, **▦ Grid**, layer controls (**＋** new layer, **👁**
visibility), **📂 Import DXF**, **⧉ Group** / **⿲ Ungroup**,
**🧭 Scale bar + North**, **🗑 Clear Annotations**.

A typed command line accepts CAD-style aliases — `MW:4876-4888`:
`L`/`LINE`, `PL`/`POLY`, `REC`/`RECT`/`R`, `C`/`CIR`, `ARC`/`A`, `EL`/`ELL`,
`SPL`/`SP`, `H`/`HATCH`/`FILL`, `DIM`/`D`, `T`/`TEXT`, `M`/`MEA`, `S`/`SEL`.

Annotation elements carry a layer and an optional named group; the default
stroke is `#FF4500` at 1.5 pt — `MP:413-427`.

**Moving an ICR:** with no pan/zoom tool active, click-hold a blue ICR, drag
to a valid spot inside the perimeter road and release — the layout rebuilds.
Invalid drops snap back.

**Obstructions** are internally called roads (`PlacedRoad`); every UI label
says *Obstruction*. Controls: **Draw Rectangle**, **Draw Polygon**,
**Undo Last**, **Clear All** — `MW:1240-1266`.

**MCR / objects:** **Place MCR** (button becomes **Cancel Placement** while
armed) then click the plot; **Remove MCR**; **Place Object** / **Remove
Objects**. Placement outside the boundary is refused with "Please place
inside the boundary." — `MW:1291-1330`, `MW:6212-6523`.

## 8. Piles — `pile_dialog.py`

- The editor defines a pile pattern on **one reference table**, whose local
  origin (0, 0) is the table's bottom-left (south-west) corner. X runs east
  across the table width; Y runs north up its height.
- Each pile is a circle of the given radius centred on the entered (X, Y);
  default radius **0.15 m** — `MP:125`.
- The pattern is stamped onto **every** table in the plant, so a pile's UTM
  position is `(table.x + X, table.y + Y)`.
- The summary's `Piles` column is `tables × piles-per-table`.
- **Export PDF (with Piles)** produces the pile drawing; page 1 is rendered
  at 300 dpi for that export rather than 150 — `MW:1136`, `pdf_exporter.py:1699-1700`.

## 9. Energy calculation — `energy_calculator.py`

Buttons — `MW:1156-1210`: **Calculate Energy**, **📊 Show Energy Chart**,
**Export TMY data CSV** with an interval selector.

Irradiance priority: PVGIS (EU JRC, returns in-plane GTI directly for the
lat/lon/tilt/azimuth, no key) → NASA POWER (monthly GHI climatology with a
simple isotropic tilt correction) → zeros with source `unavailable`.

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
beam near-shading loss in %. This is the same model that feeds the
Shadow View, so the picture and the number always agree.

**📊 Show Energy Chart** — `energy_timeseries_window.py:1-20`:
- **Daily (hourly):** 24 hourly bars, energy (kWh/hour, deep green) stacked
  over inclined irradiance / GTI (W/m², amber), a slider across all 365 days,
  a month jump, and a live red crosshair readout in both subplots showing
  time, energy and GTI.
- **Monthly (yearly):** 12 bars — energy (MWh/month) and irradiance
  (kWh/m²/month) — with annual totals.
- Data source priority: hourly GTI in the loaded file → hourly GHI
  transposed to GTI → synthesised from 12 monthly GTI values plus solar
  geometry → uniform annual distribution.

**Export TMY data CSV** — `MW:1184-1208`, `energy_calculator.py:938-1019`:
full-year GHI, GTI and Energy time series at **1 / 10 / 15 / 30 / 60 min**,
default **15 min**. `E (kWh) = capacity_kWp × GTI(W/m²)/1000 × PR × LID × (interval/60)`.
Timestamps are local time, so values are zero at night and peak at solar
noon. The export needs an hourly series — either a loaded file or a PVGIS
API hourly fetch — `IP:1998-2001`.

**Shadow View (row spacing)** — `shadow_view_dialog.py:1-13`: a 2-D
cross-section of three adjacent rows in the plane perpendicular to the row
axis. Two sliders move the sun (day of year, solar hour); the shaded part of
each rear collector is highlighted live. Button: **🌓 Shadow View (row spacing)** — `MW:1096`.

## 10. Simulation tools

### 10.1 Simulation with AC Capacity — `ac_capacity_dialog.py`, `ac_capacity_sim.py`, `dc_cap.py`

Button **🔆 Simulation with AC Capacity** appears **only after the first
layout** — `MW:1070-1076`.

- Sizes the plant from a target **AC capacity** plus a target **DC/AC ratio**,
  using the PAN and OND files. Modules-in-series come from the same string
  sizing method; parallel strings per inverter come from the inverter's
  current and DC-power limits.
- `num_inverters = ceil(AC_capacity / Pac_rated)` — never under-sizes;
  `installed_ac = num_inverters × Pac_rated ≥ AC_capacity`.
- Maximum practical DC/AC ratio, user-adjustable: **1.5× for string
  inverters, 1.4× for central inverters**. This is the design overload limit,
  not the inverter's nameplate DC input, because utility inverters are
  routinely DC-overloaded and simply clip the surplus.
- If the target DC ≤ the first run's DC, the app offers to regenerate the
  layout capped to the target. If the target DC is higher, it advises
  reducing the AC capacity or the DC/AC ratio.
- The delivered DC must land **at or just above** target, never below, or the
  delivered ratio falls short of the design. Because later stages (ICR
  re-placement, arresters, inverter pads) clear more ground after the trim,
  trimmed tables are held in a reserve and put back afterwards, skipping any
  whose ground is now occupied. Half tables count as 0.5 throughout —
  `dc_cap.py:1-24`.

### 10.2 Robotic Module Cleaning — `robotic_cleaning_dialog.py`, `robotic_cleaning.py`

Button **🤖 Robotic Module Cleaning** — `MW:1085`.

- A robot drives along the module frames of one cleaning line. **Fixed tilt:
  lines run west–east. Tracker: lines run north–south.**
- Inputs: the robot's **battery range** (0 = no limit), whether the run must
  be **out and back on one charge** (default on), and the **span of a standard
  inter-table bridge**, which defaults to the gap already set between
  tables/trackers.
- Every gap too wide for a standard bridge is listed individually with its
  measured span and location, split into gaps blocked by equipment
  (arresters, buildings, obstructions) and gaps in open ground. Each has a
  checkbox. Ticking it means the reader will install a supported bridge, so
  the robot drives across and the fleet count drops. Leaving it unticked
  breaks the line, and that stretch keeps its own robot. **Nothing is bridged
  unless ticked.**
- Fleet size: one robot per row to start, growing for two reasons — broken
  lines (each segment needs its own robot) and battery range (a robot that
  cannot finish its segment on one charge needs company).
- A segment whose weighted table count is at or below **min tables per line**
  is too short to justify a dedicated robot and is not counted; a half unit
  counts as 0.5 — `robotic_cleaning.py:87-91`.
- Everything recalculates live. Results feed the summary's `Robots` column
  and the BOM. The BOM never carries a fleet the reader did not ask for —
  `MP:645-648`.

## 11. SLD Mode — `sld_manager.py`, `sld_symbols.py`, `sld_autobuild.py`, `sld_sheet.py`

- Tools: **↖ Move** (select and drag), **Wire** (click-drag a connecting
  wire), **Text** (multi-line label), **Delete**.
- Rotation: **⟲ 90°**, or type an angle and **⟳ Apply** — `MW:1992-1997`.
- **🔗 Group** / **✂ Ungroup** / **⧉ Copy**; **✋ Pan**, **🔍 Zoom**, **⤢ Fit**;
  **🗑 Clear SLD** — `MW:2006-2046`.
- Symbol set — `sld_symbols.py:110-731`: PV Module, Inverter, SMB, ACCB,
  2-winding / 3-winding (IDT) / 4-winding / 5-winding transformers, Power Tx,
  MV Panel, Lightning Arrester, ISO with Earth Switch, isolator with earth,
  Voltage Transformer (2-core), VT delta, Current Transformer, Voltmeter
  Selector Switch, Voltmeter, Multi Function Meter, VCB, CB status, R-Y-B
  phase indication, Fuse, MCB, MCCB, relay.
- The inverter and every transformer are placed **pre-rotated to 270°** so
  they align with the horizontal SLD bus in all topologies —
  `sld_manager.py:736-739`.
- **📄 Import PDF / DXF** brings an existing diagram in. A vector SLD PDF
  cannot be reliably parsed back into typed symbols, so the first page is
  rendered to a high-resolution image and placed as a **background** on the
  canvas; the reader overlays editable symbols, wires and text on top, and
  the whole thing carries into the exported PDF. Longest rendered dimension
  is capped at 2600 px — `pdf_sld_import.py:1-18`. **✖ Remove BG** removes it.
- **🖼 Import Image Symbol** traces an image's outlines into a **vector**
  symbol (normalised polylines), not a pasted raster — so it renders as crisp
  line art and exports to DWG/DXF as real vectors. Symbols are stored per
  user and stay available across sessions. A **Symbol Editor** opens first
  with **✏ Pen** / **🧽 Erase** / **🗑 Clear** so the traced strokes can be
  fixed before accepting — `sld_custom_symbols.py:1-18`, `sld_symbol_editor.py:1-8`.
  **🗑 Delete Image Symbol** removes one.
- **Auto-build** generates a starter diagram from the current plant's counts
  and the BOM's ratings, annotated with ×N multiplicities and ratings —
  `sld_autobuild.py:1-12`:
  - String inverter: PV → String Inverter (×N) → ACCB (×n) → Transformer → MV Panel → Grid
  - Central inverter: PV → SMB (×N) → Central Inverter (×n) → Transformer → MV Panel → Grid
  - Topology rules: 15 inverters per ACCB, 4 ACCBs per IDT, IDT max 17.2 MVA
    — `sld_autobuild.py:19-22`, mirrored in `bom_builder.py:16-19`.
- The sheet is an **A3 landscape** frame (420 × 297 drawing units) with an
  orange outer border, an inner frame, a zone grid (numbers 8..1 across,
  letters F..A down) and a right-hand band carrying LEGENDS, NOTES and a
  blank title-block skeleton with generic field labels only —
  `sld_sheet.py:1-21`. For a large plant the **physical** paper size grows
  (A3 → A1 → A0) while the drawing coordinate box stays at A3 proportions —
  `pdf_exporter.py:1468-1476`.
- **⬇ Export SLD to DWG** writes a DXF natively and converts it to DWG when
  the ODA File Converter is installed, otherwise it stays `.dxf`.
  Symbol glyphs are rendered off-screen and their primitives re-emitted as
  DXF entities, rotated about each element's centre, so the CAD drawing
  matches the screen — `sld_dxf_export.py:1-16`. **⬇ Export SLD to PDF**
  writes the sheet as a PDF.
- **Hide Layout & Energy Summary** enlarges the working area.

## 12. BOM Mode — `bom_builder.py`, `bom_presets.py`, `bom_template_window.py`

- Columns: **S.No · Material Description · Quantity · Unit · Remark** —
  `MW:2199`, `bom_builder.py:7`.
- The main table is the app's **automated BOM**, computed from the layout and
  fully editable: **➕ Add Row**, **🗑 Delete Selected Row**,
  **⚙ Rebuild from Layout** — `MW:2123-2133`.
- **BOM Template** picks a built-in preset and **📥 Load Template** opens it
  in a **separate, non-modal window** beside the automated BOM. Presets —
  `bom_presets.py:10, 130, 262, 400`:
  `30MWp_20MW_Central_FT`, `30MWp_20MW_String_FT`,
  `26.65MWp_20MW_Central Inverter_SAT`, `26.65MWp_20MW_String Inverter_SAT`.
- Edit the template there, then **Overlap into Plant BOM**. After
  confirmation it **replaces** the automated BOM — and therefore the BOM page
  of the exported PDF — `bom_template_window.py:1-10`.
- **⬇ Export BOM to Excel**, **⬇ Export BOM to PDF** — `MW:2163-2167`.
- **Hide Layout & Energy Summary** enlarges the working area.

## 13. Exports

### 13.1 PDF report — `pdf_exporter.py:1689-1750`

Buttons: **Export PDF (Layout + Summary)** and **Export PDF (with Piles)** —
`MW:1126, MW:1136`. Every page is **A3 landscape** (16.54 × 11.69 in), emitted
in this order:

1. **Engineering drawing** — the layout, border, north arrow at top-right,
   title block, and a plant-details table with editable form fields.
2. **Summary** — layout summary, design parameters, and the inverter/cable
   summary including the per-ICR cable breakdown.
3. **Single Line Diagram** — the reader's diagram (skipped silently if the
   drawing errors, so it never blocks the rest of the report).
4. **Bill of Material** — paginated across as many pages as needed.
5. **Energy** — present only when an energy calculation has been run: two
   pages when monthly data is available (inputs + PR breakdown, then the
   monthly IEC 61724-1 table and the multi-year forecast), otherwise one
   combined page.

PDF metadata: Title "SolarLayout.Desktop Report", Subject "Automated PV
layout summary".

### 13.2 KMZ — `kmz_exporter.py:1-11`

One folder per boundary, named after the plant, containing the boundary
polygon, exclusion zones, the panel tables, and a **summary placemark**
(capacity MWp, area acres, pitch, table count); plus an **Overall Summary**
folder aggregating every boundary. Inverters, ICR, arresters and cables are
also written. Opens in Google Earth.

### 13.3 DXF — `dxf_exporter.py:1-26`

All coordinates in UTM metres. Layers:

`BOUNDARY` (plant boundaries, yellow) · `OBSTACLES` (exclusions, red) ·
`WATER` (water bodies, blue) · `TERRAIN` (RL contour lines, grey) ·
`TABLES` (blue) · `ICR` (cyan) · `OBSTRUCTIONS` (user-drawn, green) ·
`INVERTERS` (lime; named SMB in Central mode) · `DC_CABLES` (orange) ·
`AC_CABLES` (magenta) · `MV_CABLES` (ICR→MCR, green) · `MCR` (violet) ·
`DC_TRENCH` (green) · `AC_TRENCH` (red) · `MV_TRENCH` (dark green) ·
`SKETCH` (Sketch-Mode annotations) · `LA` (arrester symbols) ·
`ANNOTATIONS` (labels and text).

Cable layers are written only when cable calculation was on; the `LA` layer
only when arresters were placed.

## 14. Projects — `project_io.py`

- **File ▸ Save Project…** / **Open Project…**, and the toolbar's
  **💾 Save(Project)** — `MW:984-993`, `MW:2261`.
- Format: **`.slp`** (Solar Layout Project). It stores the whole session —
  inputs, layout, sketch edits, SLD, BOM, terrain.
- The file is a tamper-evident binary container: a `PVSLP` magic signature, a
  format version byte, a truncated SHA-256 checksum over a secret plus the
  compressed payload, then a zlib-compressed, base64url-encoded JSON payload.
  A wrong magic or a mismatched checksum is reported as an error rather than
  loaded.
- **File ▸ New Project** starts fresh — `MW:964`.

## 15. Licence — `licensing.py`, `license_dialog.py`

- **Help ▸ License / Subscription…** — `MW:1020`.
- The app is licensed **per machine for a subscription period**. It opens
  without a licence, but **Generate Layout is blocked** until a valid,
  in-date licence for that machine is loaded.
- Flow: copy the **Device ID** from the dialog → send it with the reader's
  email to the vendor → receive a `license.lic` → **Load License File…**.
- The app carries only the public half of the key pair, so a licence can be
  checked but never created or edited on the reader's machine. Changing one
  character invalidates the signature.
- Checks applied in order, all of which must pass: file present and
  readable → valid JSON with `payload` and `sig` → signature matches →
  machine ID matches this computer → system clock has not been set backwards
  → a usable expiry date exists → not before the start date → not expired.
- Stored at `%APPDATA%\SolarLayout.Desktop\license.lic`; a file beside the
  executable also works as a read-only fallback. Clock tracking lives in
  `%APPDATA%\SolarLayout.Desktop\.lastseen`.
- On first run the app looks for a licence left by a previous installation and
  adopts it automatically, so upgrading does not lose the licence.
- Reader-facing messages, verbatim: *"No license found"*, *"License signature
  invalid (tampered or wrong key)"*, *"License is issued for a different
  computer"*, *"System clock appears to have been set backwards"*,
  *"License is not active until …"*, *"License expired on …"*,
  *"License has no valid expiry date"*.
- ⛔ Never document how licences are issued, the private key, or any vendor
  operation. Reader-side only.

## 16. Menus — `MW:962-1020`

- **File:** New Project · Move to String / Central Window… · Save Project… ·
  Open Project… · Exit
- **Edit-Pile:** Define Pile Layout…
- **Help:** How to Use This Tool · License / Subscription…

## 17. Other reader-visible behaviour

- Water-body detection currently uses **KMZ-defined polygons only**; the mode
  is hard-set to `"kmz"` after every browse — `IP:1320-1322`. A satellite
  detector exists in the codebase (`satellite_water_detector.py`,
  `satellite_detection_dialog.py`, `water_body_mode_dialog.py`) but is
  **not reachable** from the shipped flow. ⛔ **Do not document satellite
  water detection as a feature.**
- An unexpected error shows "An unexpected error occurred, but the
  application will keep running." and appends the traceback to
  `solarlayout_error.log` in the system temp directory — `entrypoints.py:_install_excepthook`.
- Very large plants use fast geometric cable **estimation** so generation
  stays quick.
- Status line after a run reports plant count, total acres, and more —
  `MW:3259`.

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

## 19. Facts we do not have

These are genuinely unknown, not merely unverified. Write around them; do not
invent a value.

| Unknown | How to handle it |
|---|---|
| The Microsoft Store listing URL | Tell the reader to open the Microsoft Store and search for the application by name. Do not write a URL or a `ms-windows-store:` link. |
| The current version number and release date | Do not state a version anywhere. On the release-notes page, leave a `{/* VERIFY: current version number and release date */}` and describe where the reader can see their installed version. |
| Any release history | There is none to write. Do not invent changelog entries. |
| Minimum Windows build, RAM, disk, or screen resolution | State the requirements qualitatively — a 64-bit Windows PC, a display wide enough for the panel and plot side by side, an internet connection only for weather and elevation data. Leave a `{/* VERIFY: minimum Windows version and hardware requirements */}`. |
| Support email address or contact route | Say to contact the vendor who supplied the licence. Leave a `{/* VERIFY: support contact route */}`. |
| Typical run times for Generate on a given plant size | Do not quote seconds or minutes. Say cable calculation is the slow step on large plants, which is what the application itself warns. |
| Price, plans, licence duration options | Out of scope. The licence pages cover activation and error messages only. |
