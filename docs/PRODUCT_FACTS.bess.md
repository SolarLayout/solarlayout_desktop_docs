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
Battery Energy Storage System" (`apps/bess-tool/bess_tool/seci_bess_gui.py:2317`).
Standalone tkinter app; entry point `bess-tool` (`apps/bess-tool/bess_tool/seci_bess_gui.py:8648`).

## 2. Install & launch

### Packaging (Windows is the ship target)
PyInstaller **one-dir** build via `apps/bess-tool/specs/BESS.Desktop.spec`: a
separate `EXE(...)` with `exclude_binaries=True` (`apps/bess-tool/specs/BESS.Desktop.spec:60`,
`exclude_binaries=True` at `apps/bess-tool/specs/BESS.Desktop.spec:64`) feeds a
`COLLECT(...)` (`apps/bess-tool/specs/BESS.Desktop.spec:79`) — this two-stage
EXE+COLLECT shape (rather than a single onefile `EXE`) is what makes it one-dir.
Both are named `'BESS.Desktop'` (`apps/bess-tool/specs/BESS.Desktop.spec:65` and
`apps/bess-tool/specs/BESS.Desktop.spec:86`).

The **MSIX Store package** is built by CI workflow
`.github/workflows/build-windows-bess-msix.yml`, which runs
`uv run pyinstaller --noconfirm --clean apps/bess-tool/specs/BESS.Desktop.spec`
(`.github/workflows/build-windows-bess-msix.yml:50`) and packs the payload as
`BESSDesktop.msix`. Store identity: `MSIX_NAME: "Rensaar.BESSDesktop"`
(`.github/workflows/build-windows-bess-msix.yml:23`); manifest `DisplayName` =
"BESS Desktop" (`apps/bess-tool/msix/AppxManifest.template.xml:9` and
`apps/bess-tool/msix/AppxManifest.template.xml:22`); `PublisherDisplayName` =
"Rensaar" (`apps/bess-tool/msix/AppxManifest.template.xml:10`). The uploaded
package is unsigned — Microsoft signs it on Store ingestion
(`.github/workflows/build-windows-bess-msix.yml:21`).

### Launch behaviour
`main()` constructs `BESSApp()` — a `tk.Tk` subclass — and calls `.mainloop()`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:8648` – `apps/bess-tool/bess_tool/seci_bess_gui.py:8650`).
Window geometry is `1600x900` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2319`),
maximised ("zoomed") on Windows (`apps/bess-tool/bess_tool/seci_bess_gui.py:2321`).

**No license check or startup dialog fires at launch.** `BESSApp.__init__`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2310` – `apps/bess-tool/bess_tool/seci_bess_gui.py:2375`)
sets the title/geometry, loads branding, and calls `_init_vars`, `_setup_style`,
`_build_menu`, `_build_statusbar`, `_build_ui`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2371` – `apps/bess-tool/bess_tool/seci_bess_gui.py:2375`)
— none of which call `_require_license` or `trial_client.check_status`. The app
opens fully usable; gating happens only later, at Simulate / Optimise / Export
(see §3).

### Main-window layout
**Menu bar** — three cascades **File**, **Run**, **Help**, built in `_build_menu`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2600` – `apps/bess-tool/bess_tool/seci_bess_gui.py:2643`).

**Top banner** — navy `#1a3a5c` (token `C["header"]`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:335`), a `tk.Frame` of `height=48`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2649`). Left-to-right: a white logo
chip carrying the SolarLayout wordmark
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2655`), then the title
`"BESS Project Design Solution"`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2659`). Right-aligned:
`"🏗  Plant Layout & SLD"` button
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2662`), `"  Save"` icon button
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2668`), `"  Open"` icon button
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2674`), `"Support"` button
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2680`), and the amber subtitle
`"Hybrid RE + Battery Energy Storage System Analyser"`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2685`).

**Left — input notebook** (`_build_left`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2706` – `apps/bess-tool/bess_tool/seci_bess_gui.py:2736`),
width ~420 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2694`). Two action
buttons on top: `"▶  Simulate"`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2712`) and `"⚙  Optimise"`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2715`) — styled `Run.TButton`
(green, `C["accent2"]`) and `Opt.TButton` (amber, `C["accent"]`) respectively
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2562` – `apps/bess-tool/bess_tool/seci_bess_gui.py:2571`).
Then an **8-tab** input notebook: `📂 Data`, `⏰ Peak`, `📐 Sizing`, `🔋 BESS`,
`📉 Degrad.`, `💰 CAPEX`, `📊 OPEX`, `🏦 Finance`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2723` – `apps/bess-tool/bess_tool/seci_bess_gui.py:2732`).

**Right — result notebook** (`_build_right`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2738` – `apps/bess-tool/bess_tool/seci_bess_gui.py:2770`),
**4 tabs**: `📈 Dashboard` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2746`),
`📋 DFR Table` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2760`), `💹 Financials`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2765`), `📝 Summary`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2770`).

**Status bar** (`_build_statusbar`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:4656` – `apps/bess-tool/bess_tool/seci_bess_gui.py:4677`):
status text left (`apps/bess-tool/bess_tool/seci_bess_gui.py:4674`), a thin
separator (`apps/bess-tool/bess_tool/seci_bess_gui.py:4672`), an amber
elapsed-time label (`apps/bess-tool/bess_tool/seci_bess_gui.py:4666`), and a
progress bar, right-most (`apps/bess-tool/bess_tool/seci_bess_gui.py:4661`).

### Menu items (exact labels)
**File** (cascade built at `apps/bess-tool/bess_tool/seci_bess_gui.py:2606` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2624`): `Save Project (.slb)…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2608`), `Open Project (.slb)…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2610`), `Load Generation CSV…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2613`), `Export PDF Report…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2615`), `Export Plot (PNG)…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2617`), `Save Project Report (Word)…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2618`), `Export Report (TXT)…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2619`), `Export DFR CSV…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2620`),
`Export Time-Series CSV (Dashboard Data)…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2621`), `Exit`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2624`).

**Run** (cascade built at `apps/bess-tool/bess_tool/seci_bess_gui.py:2626` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2634`): `Simulate`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2628`), `Optimise`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2629`), `Sensitivity Analysis…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2631`), `BESS Plant Layout & SLD…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2633`).

**Help** (cascade built at `apps/bess-tool/bess_tool/seci_bess_gui.py:2637` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2642`): `User Guide / Formulas…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2639`), `License…`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2640`), `About`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2642`).

## 3. Access & licensing

**Device fingerprint** — `machine_id()`
(`apps/bess-tool/bess_tool/licensing.py:16` – `apps/bess-tool/bess_tool/licensing.py:50`):
Windows returns the registry **MachineGuid** (the Device ID shown under
Settings ▸ System ▸ About), read at
`apps/bess-tool/bess_tool/licensing.py:34`, full uppercase GUID
(`apps/bess-tool/bess_tool/licensing.py:36`). macOS falls back to the hardware
**IOPlatformUUID** (`apps/bess-tool/bess_tool/licensing.py:42` and
`apps/bess-tool/bess_tool/licensing.py:67` –
`apps/bess-tool/bess_tool/licensing.py:83`). Any other platform falls back to
`"NODE-" + <primary MAC, 12 hex>` (`apps/bess-tool/bess_tool/licensing.py:46` –
`apps/bess-tool/bess_tool/licensing.py:49`). Entitlement itself is server-side,
via `trial_client.py` (the Mogambo trial/access service) — there is no local
licence-key file; the Device ID is the key.

**Help ▸ `License…`** (`apps/bess-tool/bess_tool/seci_bess_gui.py:2640`) opens
the License window, `_show_license_dialog`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:8402` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:8530`):
- Status headline, set by `_render`: `✓  Active`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8493`), `✗  No access`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8498`), and
  `⏳  Waiting for activation`, shown immediately after clicking
  **Get Free Access** (`apps/bess-tool/bess_tool/seci_bess_gui.py:8479`).
- **`Your Device ID (identifies this computer to SolarLayout:)`** read-only
  field (`apps/bess-tool/bess_tool/seci_bess_gui.py:8452` –
  `apps/bess-tool/bess_tool/seci_bess_gui.py:8460`) plus a **`Copy`** button
  that copies it to the clipboard
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8462` –
  `apps/bess-tool/bess_tool/seci_bess_gui.py:8468`).
- State-dependent buttons, rendered by `_render`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8490` –
  `apps/bess-tool/bess_tool/seci_bess_gui.py:8513`): **Active** →
  `Access Details` (`apps/bess-tool/bess_tool/seci_bess_gui.py:8503`),
  `Refresh` (`apps/bess-tool/bess_tool/seci_bess_gui.py:8510`), `Close`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8512`). **Not active** →
  `Get Free Access` (`apps/bess-tool/bess_tool/seci_bess_gui.py:8506`),
  `Contact Us` (`apps/bess-tool/bess_tool/seci_bess_gui.py:8508`), `Refresh`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8510`), `Close`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8512`).
- **`Get Free Access`** calls `trial_client.open_activation()`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8475`), which opens
  `activation_url()` (`apps/bess-tool/bess_tool/trial_client.py:64` –
  `apps/bess-tool/bess_tool/trial_client.py:65`) — i.e.
  `https://solarlayout.app/desktop/bess?device=<DeviceID>`, from the default
  `_WEB_BASE = "https://solarlayout.app"`
  (`apps/bess-tool/bess_tool/trial_client.py:25`) and `APP = "bess"`
  (`apps/bess-tool/bess_tool/trial_client.py:23`).
- The window auto-re-checks on `<FocusIn>`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8527`), which calls `_refresh` →
  `trial_client.check_status(force=True)`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8515` –
  `apps/bess-tool/bess_tool/seci_bess_gui.py:8523`). The **`Refresh`** button
  triggers the same `_refresh`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:8510`), which bypasses the
  fresh-status cache so a server-side revoke/revive shows immediately
  (`apps/bess-tool/bess_tool/trial_client.py:86` –
  `apps/bess-tool/bess_tool/trial_client.py:94`).

**Status model** (`check_status`,
`apps/bess-tool/bess_tool/trial_client.py:86` –
`apps/bess-tool/bess_tool/trial_client.py:114`): the server's `/desktop/status`
returns `active | expired | revoked | none`. Messages: active → "Access
active" (`apps/bess-tool/bess_tool/trial_client.py:104`); expired → "Your
access has ended. Contact SolarLayout to purchase a licence."
(`apps/bess-tool/bess_tool/trial_client.py:106`); revoked → "Access has been
revoked. Contact SolarLayout." (`apps/bess-tool/bess_tool/trial_client.py:108`);
none → "No active access for this device. Click 'Get Free Access' to get
started." (`apps/bess-tool/bess_tool/trial_client.py:109`). Offline **grace
cache** = 3 days, `_GRACE_SECONDS = 3 * 24 * 3600`
(`apps/bess-tool/bess_tool/trial_client.py:29`, applied at
`apps/bess-tool/bess_tool/trial_client.py:112`); an "active" result is treated
**fresh** (network call skipped) for 5 minutes, `_FRESH_SECONDS = 300`
(`apps/bess-tool/bess_tool/trial_client.py:30`, applied at
`apps/bess-tool/bess_tool/trial_client.py:92` –
`apps/bess-tool/bess_tool/trial_client.py:93`).

**Gating** (`_require_license`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:8384` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:8400`) fails **closed** if the
licensing module is unavailable
(`apps/bess-tool/bess_tool/seci_bess_gui.py:8387` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:8391`); otherwise it calls
`trial_client.check_status()` and, on failure, offers to open the License
window (`apps/bess-tool/bess_tool/seci_bess_gui.py:8392` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:8400`). Call sites:
- **Simulate** — `_on_simulate`, action label `"Simulation"`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:5137`).
- **Optimise** — `_on_optimise`, action label `"Optimisation"`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:5192`).
- **Every Export**, action label `"Export"`: the Sensitivity
  Single-Variable-Sweep CSV export
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:6132`), `Export Plot (PNG)…`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:7274`), `Export Report (TXT)…`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:7293`),
  `Save Project Report (Word)…`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:7318`), `Export DFR CSV…`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:7371`),
  `Export Time-Series CSV (Dashboard Data)…`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:7415`), `Export PDF Report…`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:7446`).
- **Not gated**: Sensitivity Analysis itself, the Plant Designer, Save/Open
  project, and CSV loading — none of their handlers call `_require_license`
  (confirmed against the full call-site list above, which is exhaustive for
  `apps/bess-tool/bess_tool/seci_bess_gui.py`).

**Un-activated Support prompt** (`_show_support_activation_prompt`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:8540` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:8569`): clicking **Support** on a
device without active access — checked via `check_status()` in
`_show_support_dialog`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:8577` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:8579`) — shows "You'll need active
access to file a support ticket. Start a free trial, or contact us directly."
(`apps/bess-tool/bess_tool/seci_bess_gui.py:8549` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:8552`) with **`Get Free Access`**,
**`Contact Us`**, **`Cancel`** buttons
(`apps/bess-tool/bess_tool/seci_bess_gui.py:8564` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:8569`).


## 4. Inputs

The left-hand input notebook has **8 tabs** — `📂 Data`, `⏰ Peak`, `📐 Sizing`, `🔋 BESS`,
`📉 Degrad.`, `💰 CAPEX`, `📊 OPEX`, `🏦 Finance` — built by `_build_left`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2706` – `apps/bess-tool/bess_tool/seci_bess_gui.py:2736`),
each populated by its own `_tab_*` method. All StringVar defaults below are set once, in
`_init_vars` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2380` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2524`), and are exactly what a fresh launch shows —
no other code path overwrites them before first render. Numeric ranges are the bounds enforced by
`_flt()` (`apps/bess-tool/bess_tool/seci_bess_gui.py:4856` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:4865`) inside `_collect_params`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4867` – `apps/bess-tool/bess_tool/seci_bess_gui.py:5093`),
which runs on every Simulate/Optimise; a value outside `[lo, hi]` raises "Invalid value for
'\<name\>'" and blocks the run. Fields with no `hi` bound accept any value ≥ `lo`; "no explicit
bound" means `_collect_params` parses the field with a bare `float()`/no `_flt()` call at all.

### 4.1 Project Type (Data tab, topology radio)

Radio group, `_project_type_changed`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:3087` – `apps/bess-tool/bess_tool/seci_bess_gui.py:3145`),
built at `apps/bess-tool/bess_tool/seci_bess_gui.py:2806` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2821`. Default: **`3.  Solar + Wind + BESS`**
(`self.v_project_type = sv(value="solar_wind_bess")`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2392`).

| Label (exact) | Internal value | Effect |
|---|---|---|
| `1.  Solar + BESS` | `solar_bess` | Wind pinned to 0 MW; Wind Installed/CAPEX/O&M inputs disabled |
| `2.  Wind + BESS` | `wind_bess` | Solar pinned to 0 MW; Solar Installed/CAPEX/O&M inputs disabled |
| `3.  Solar + Wind + BESS` (default) | `solar_wind_bess` | Both sources active |
| `4.  Standalone BESS (grid-charged)` | `standalone_bess` | Solar **and** Wind pinned to 0 MW; both sources' Sizing/CAPEX/O&M inputs disabled; generation-CSV loader disabled (a 1-year 15-min calendar is built internally, `_standalone_timebase`, `apps/bess-tool/bess_tool/seci_bess_gui.py:5098`); Peak-Shift checkbox disabled |

(`(("1.  Solar + BESS","solar_bess"), ("2.  Wind + BESS","wind_bess"), ("3.  Solar + Wind + BESS","solar_wind_bess"), ("4.  Standalone BESS (grid-charged)","standalone_bess")`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2813` – `apps/bess-tool/bess_tool/seci_bess_gui.py:2816`.)
Excluded-source disabling (Solar entry/CAPEX/O&M and Wind entry/CAPEX/O&M) is at
`apps/bess-tool/bess_tool/seci_bess_gui.py:3106` – `apps/bess-tool/bess_tool/seci_bess_gui.py:3118`;
generation-CSV loader disabling at `apps/bess-tool/bess_tool/seci_bess_gui.py:3133` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:3145`.

**Generation-charged Peak-Shift dispatch** checkbox
(`apps/bess-tool/bess_tool/seci_bess_gui.py:2838` – `apps/bess-tool/bess_tool/seci_bess_gui.py:2844`),
default **off** (`self._solar_shift = tk.BooleanVar(value=False)`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2395`). Its label adapts to the topology
(`apps/bess-tool/bess_tool/seci_bess_gui.py:3095` – `apps/bess-tool/bess_tool/seci_bess_gui.py:3105`):
`Solar-charged Peak-Shift dispatch` (`solar_bess`), `Wind-charged Peak-Shift dispatch`
(`wind_bess`), `Solar+Wind-charged Peak-Shift dispatch` (`solar_wind_bess`); disabled and forced
off for `standalone_bess`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:3100` – `apps/bess-tool/bess_tool/seci_bess_gui.py:3103`).
When on, generation charges the battery first, surplus is exported, and the battery discharges
only in the selected Peak window to meet the minimum DFR — no load obligation (and no penalty)
outside that window (help text, `apps/bess-tool/bess_tool/seci_bess_gui.py:2848` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2855`).

### 4.2 Data tab (`📂 Data`) — generation CSV

Built by `_tab_data` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2800` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2900`).

| Element | Detail | Source |
|---|---|---|
| `CSV Path:` entry | bound to `v_csv`, default `""` | `apps/bess-tool/bess_tool/seci_bess_gui.py:2384`, field at `apps/bess-tool/bess_tool/seci_bess_gui.py:2863`–`apps/bess-tool/bess_tool/seci_bess_gui.py:2867` |
| `Browse…` button | opens a file picker, sets `v_csv` | `_browse_csv`, `apps/bess-tool/bess_tool/seci_bess_gui.py:4682`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4687`, button at `apps/bess-tool/bess_tool/seci_bess_gui.py:2868`–`apps/bess-tool/bess_tool/seci_bess_gui.py:2870` |
| `Load & Preview CSV` button | parses + validates the file | `_load_csv`, `apps/bess-tool/bess_tool/seci_bess_gui.py:4712`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4797`, button at `apps/bess-tool/bess_tool/seci_bess_gui.py:2872`–`apps/bess-tool/bess_tool/seci_bess_gui.py:2875` |
| Status label | starts `"No file loaded."`, replaced by a load summary | `apps/bess-tool/bess_tool/seci_bess_gui.py:2877`–`apps/bess-tool/bess_tool/seci_bess_gui.py:2884` |

**CSV format**, shown in-panel (`apps/bess-tool/bess_tool/seci_bess_gui.py:2886` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2900`) and enforced by `_load_csv`:
- Columns `datetime, solar_pu, wind_pu` — the datetime column is auto-detected by name keyword
  (`time`/`date`/`stamp`/`datetime`, `apps/bess-tool/bess_tool/seci_bess_gui.py:4726`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4735`,
  falling back to a synthetic 2025-01-01 15-min index if none matches,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:4736`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4738`); solar/wind columns are auto-matched
  by keyword (`solar/pv/sun/photovoltaic`, `wind/wg/wtg/turbine`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:4743`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4754`), falling back to the first/second
  numeric column.
- Values are per-1-MW-installed, 0–1 (clipped at 0 on load,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:4757`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4760`).
- Row count / resolution: 35,040 rows = native 15-min; 8,760 rows = hourly; 30-min also accepted —
  resolution is **auto-detected** from the median datetime step (or, with no datetime column, from
  the row count) by `_infer_gen_factor`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:4689` – `apps/bess-tool/bess_tool/seci_bess_gui.py:4710`)
  and **upsampled** to 15-min by repeating each row across its sub-intervals
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:4762` – `apps/bess-tool/bess_tool/seci_bess_gui.py:4774`).

### 4.3 Peak tab (`⏰ Peak`)

Built by `_tab_peak` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2902` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2985`).

**`Quick Preset:`** combobox (`apps/bess-tool/bess_tool/seci_bess_gui.py:2919` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2934`), display-default index 0
(`self._preset_cb.current(0)`, `apps/bess-tool/bess_tool/seci_bess_gui.py:2931`):

| Option (exact) | Hours applied by `_apply_peak_preset` |
|---|---|
| `Evening  18:00–24:00  (6 hrs)` | 18–23 |
| `Morning  06:00–12:00  (6 hrs)` | 06–11 |
| `Day      06:00–18:00  (12 hrs)` | 06–17 |
| `Night    18:00–06:00  (12 hrs)` | 18–23, 00–05 |
| `All Hours  (24 hrs)` | 00–23 |
| `Custom` | no auto-fill |

(Values/labels `apps/bess-tool/bess_tool/seci_bess_gui.py:2923` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2930`; `_apply_peak_preset` mapping
`apps/bess-tool/bess_tool/seci_bess_gui.py:4802` – `apps/bess-tool/bess_tool/seci_bess_gui.py:4809`.)
⚠️ **Known-stale display**: `.current(0)` only visually pre-selects the combobox — it does not fire
`_apply_peak_preset` (bound only to `<<ComboboxSelected>>`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2934`) — so the 6-hour Evening preset it appears to show
is **not** what a fresh launch actually ticks; the real default is the 24 individual checkboxes
below.

**24 hour checkboxes**, 4-column × 6-row grid (`apps/bess-tool/bess_tool/seci_bess_gui.py:2950` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:2963`), one per `_pk_vars[h]`. Default ticked (Peak):
**18:00, 19:00, 20:00, 21:00** — 4 hours — the rest start Off-Peak
(`self._pk_vars[h] = bv(value=(h in [18, 19, 20, 21]))`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2388`). A live counter reflects the current tick state
(`_pk_count_update`, `apps/bess-tool/bess_tool/seci_bess_gui.py:4817`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4828`).

Peak = battery discharges first, then excess charges the battery; Off-Peak = battery charges
first, remainder meets the contracted load (help text,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2908`–`apps/bess-tool/bess_tool/seci_bess_gui.py:2912`). An explicitly **empty** peak set (all 24
hours unticked) is read by `_collect_pk`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4830` – `apps/bess-tool/bess_tool/seci_bess_gui.py:4851`)
as `{"peak_list": [], ..., "firming": True}` — the special **CC-firming** dispatch (firm the
Contracted Capacity every hour) — except for a Standalone (non-cycle) BESS, which requires at
least 1 peak hour and warns instead
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4838` – `apps/bess-tool/bess_tool/seci_bess_gui.py:4846`).

### 4.4 Sizing tab (`📐 Sizing`)

Built by `_tab_sizing` (`apps/bess-tool/bess_tool/seci_bess_gui.py:3201` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:3289`).

**Contracted Capacity** — radio `Fixed Value` / `CSV Profile`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:3212`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3219`), default mode `"fixed"`
(`self._cc_mode = tk.StringVar(value="fixed")`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2397`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Fixed Value` (`Value` entry) | `1.6` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2390`) | ≥ 0.001 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4879`) | MW | Firm contracted capacity the plant must serve |
| `CSV Profile` (`📂 Browse CSV…`) | none loaded, status `"No file loaded"` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2400`) | 35,040 or 8,760 rows, column `cc_mw` (case-insensitive) or first column, hourly auto-interpolated to 15-min (`apps/bess-tool/bess_tool/seci_bess_gui.py:3147`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3199`) | MW | Time-varying contracted capacity |

`_load_cc_csv`: `apps/bess-tool/bess_tool/seci_bess_gui.py:3147` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:3199`; column match at `apps/bess-tool/bess_tool/seci_bess_gui.py:3157`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3164`; row-count
branch (35,040 / 8,760 with `np.interp` upsample) at `apps/bess-tool/bess_tool/seci_bess_gui.py:3166`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3186`.

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Project / Contract Life` | 20 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2401`) | 1–50 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4881`) | years | Length of the financial model / simulation horizon |

**DFR Targets** (`apps/bess-tool/bess_tool/seci_bess_gui.py:3267`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3277`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `15-min DFR Target` | 0 (off) (`apps/bess-tool/bess_tool/seci_bess_gui.py:2409`) | 0–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4885`) | % | Minimum delivery-fulfilment ratio required at each 15-min step |
| `Peak-hour DFR Target` | 90 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2406`) | 0–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4882`) | % | Minimum DFR required during Peak hours |
| `Off-Peak DFR Target` | 80 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2407`) | 0–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4883`) | % | Minimum DFR required during Off-Peak hours |
| `Overall Monthly DFR` | 90 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2408`) | 0–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4884`) | % | Minimum overall DFR required per calendar month |
| `Annual DFR Target` | 0 (off) (`apps/bess-tool/bess_tool/seci_bess_gui.py:2410`) | 0–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4886`) | % | Minimum DFR required across the year |

**Initial Sizing (starting point)** (`apps/bess-tool/bess_tool/seci_bess_gui.py:3278`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3286`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Solar Installed` | 1.8 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2402`) | ≥ 0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4892`); pinned to 0 and disabled unless topology includes Solar (`apps/bess-tool/bess_tool/seci_bess_gui.py:3106`, `apps/bess-tool/bess_tool/seci_bess_gui.py:3109`) | MW | Starting Solar capacity for Simulate; the Optimise search variable when topology includes Solar |
| `Wind Installed` | 3 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2403`) | ≥ 0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4893`); pinned to 0 and disabled unless topology includes Wind (`apps/bess-tool/bess_tool/seci_bess_gui.py:3107`, `apps/bess-tool/bess_tool/seci_bess_gui.py:3110`) | MW | Starting Wind capacity |
| `BESS Energy` | 1 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2404`) | ≥ 0.1 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4906`) | MWh | Starting BESS nameplate energy |

### 4.5 BESS tab (`🔋 BESS`)

Built by `_tab_bess` (`apps/bess-tool/bess_tool/seci_bess_gui.py:3291` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:3500`).

**RTE Mode** — radio `Fixed` / `Custom Year-by-Year`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:3297`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3309`), default `"fixed"`
(`self._rte_mode = tk.StringVar(value="fixed")`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2414`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Round-Trip Efficiency including Auxiliary` (Fixed mode) | 78 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2412`) | 50–99 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4907`) | % | Round-trip efficiency (√RTE applied to both charge and discharge legs, `apps/bess-tool/bess_tool/seci_bess_gui.py:5088`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5089`) |
| `📋  Edit Year-by-Year RTE Profile…` (Custom mode) | status `"No custom profile set"` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2416`) | per-year 50–99% (dialog text, `apps/bess-tool/bess_tool/seci_bess_gui.py:3686`); must cover every year to Battery EOL or Simulate/Optimise blocks (`apps/bess-tool/bess_tool/seci_bess_gui.py:4918`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4926`) | % per year | RTE that varies year-by-year to Battery EOL |

Field at `apps/bess-tool/bess_tool/seci_bess_gui.py:3314`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3315`; editor button at `apps/bess-tool/bess_tool/seci_bess_gui.py:3320`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3325`;
`_open_rte_profile_editor` at `apps/bess-tool/bess_tool/seci_bess_gui.py:3658`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3774`.

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Depth of Discharge (DoD)` | 90 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2417`) | 50–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4931`) | % | Fraction of nameplate energy usable per cycle |
| `Initial State of Health (SOH)` | 100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2418`) | 50–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4932`) | % | Starting battery health at Year 0 |

Fields at `apps/bess-tool/bess_tool/seci_bess_gui.py:3332`, `apps/bess-tool/bess_tool/seci_bess_gui.py:3334`.

**Battery EOL basis** — radio `In Years` / `In Total Cycles`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:3337`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3349`), default `"years"`
(`self._eol_basis = tk.StringVar(value="years")`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2421`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Battery EOL (End-of-Life)` (Years basis) | 20 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2419`) | 5–30 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4933`) | years | Age at which the pack reaches end-of-life and is replaced/augmented |
| `Rated Cycle Life` (Cycles basis) | 6000 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2422`) | 100–20,000 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4938`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4939`) | cycles | Rated Equivalent-Full-Cycle life; EOL hits when cumulative EFCs reach this |
| `End-of-Warranty SOH @ N` (Cycles basis) | 70 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2423`) | 40–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4940`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4941`) | % | Warrantied SOH at the rated cycle count |
| `⚙  Configure Cycles & Charge/Discharge Windows…` (Cycles basis) | 1 cycle/day; discharge/charge hour-window defaults per topology (`apps/bess-tool/bess_tool/seci_bess_gui.py:2424`–`apps/bess-tool/bess_tool/seci_bess_gui.py:2435`) | hour ranges 0–24, half-open, overnight wrap allowed (`apps/bess-tool/bess_tool/seci_bess_gui.py:3503`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3517`) | hours | Project-type-aware dialog defining cycles/day and discharge/charge windows (standalone: grid-charge method too) |

`Battery EOL (End-of-Life)` field: `apps/bess-tool/bess_tool/seci_bess_gui.py:3351`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3352`.
Cycle sub-frame fields: `Rated Cycle Life` `apps/bess-tool/bess_tool/seci_bess_gui.py:3360`, `End-of-Warranty SOH @ N` `apps/bess-tool/bess_tool/seci_bess_gui.py:3361`; dialog
button `apps/bess-tool/bess_tool/seci_bess_gui.py:3362`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3367`; `_open_cycle_editor`: `apps/bess-tool/bess_tool/seci_bess_gui.py:3544`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3638`.

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `C-Rate  (Power ÷ Energy)` | 0.25 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2436`) | 0.1–2.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4934`) | (ratio) | Power/Energy sizing ratio for the BESS |

Field at `apps/bess-tool/bess_tool/seci_bess_gui.py:3378`.

**EOL Strategy** — radio `Replacement (full swap)` / `Augmentation (top-up)`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:3382`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3396`), default `"replacement"`
(`self._eol_strategy = tk.StringVar(value="replacement")`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2444`). Augmentation sub-modes, radio `Automatic
(restore to nameplate)` / `Manual` (`apps/bess-tool/bess_tool/seci_bess_gui.py:3408`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3417`),
default `"auto"` (`self._aug_mode = tk.StringVar(value="auto")`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2445`): Automatic tops the pack up every EOL-interval
year to restore nameplate; Manual opens **`📋  Edit Augmentation Schedule…`**
(`apps/bess-tool/bess_tool/seci_bess_gui.py:3420`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3425`; editor
`_open_aug_schedule_editor`, `apps/bess-tool/bess_tool/seci_bess_gui.py:3978`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4113`) — a table of
(Year, Capacity MWh) rows, Year must be within 1–Project Life
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4013`), status default `"No augmentation schedule
set"` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2449`). New tranches degrade from their own
install year and book their own CAPEX
(`apps/bess-tool/bess_tool/seci_bess_gui.py:3430`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3436`).

**Battery SOH Degradation** — radio `Linear (Year-1 + Annual)` / `Custom Year-by-Year`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:3439`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3456`), default `"linear"`
(`self._soh_mode = tk.StringVar(value="linear")`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2440`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `SOH Loss Year-1` (Linear) | 2.5 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2437`) | 0–20 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4979`) | %/yr | Battery SOH loss in Year 1 |
| `SOH Loss Year-2+` (Linear) | 2.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2438`) | 0–10 (`apps/bess-tool/bess_tool/seci_bess_gui.py:4980`) | %/yr | Annual SOH loss from Year 2 onward |
| `📋  Edit Year-by-Year SOH Profile…` (Custom) | status `"No custom profile set"` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2442`), pre-filled from the Linear formula (`apps/bess-tool/bess_tool/seci_bess_gui.py:3788`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3797`) | per-year 0–100% (`apps/bess-tool/bess_tool/seci_bess_gui.py:3821`, enforced `apps/bess-tool/bess_tool/seci_bess_gui.py:3923`), must cover every project year (`apps/bess-tool/bess_tool/seci_bess_gui.py:4989`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4996`) | % per year | Custom year-by-year SOH curve; **`↺  Fill from Linear`** button repopulates it from the Linear settings (`apps/bess-tool/bess_tool/seci_bess_gui.py:3911`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3915`) |

Linear fields: `apps/bess-tool/bess_tool/seci_bess_gui.py:3465`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3469`; Custom editor button
`apps/bess-tool/bess_tool/seci_bess_gui.py:3476`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3482`; `_open_soh_profile_editor`: `apps/bess-tool/bess_tool/seci_bess_gui.py:3775`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3977`.

### 4.6 Degrad. tab (`📉 Degrad.`) — solar/wind module degradation

Built by `_tab_degradation` (`apps/bess-tool/bess_tool/seci_bess_gui.py:4114` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:4130`).

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Generation Loss Year-1` | 1.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2451`) | 0–5 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5025`) | % | Solar/Wind generation loss in Year 1 |
| `Generation Loss Year-2+` | 0.4 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2452`) | 0–2 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5026`) | %/yr | Annual generation loss from Year 2 onward |

Fields at `apps/bess-tool/bess_tool/seci_bess_gui.py:4118`, `apps/bess-tool/bess_tool/seci_bess_gui.py:4120`. In-panel formula note:
`gen_factor(yr) = (1 − deg_y1) × (1 − deg_ann)^(yr−1)`, captioned "Default: 1% Year-1, 0.4%/yr
thereafter (IEC 61215 standard module degradation)"
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4122`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4126`) — matches the shipped defaults exactly.

### 4.7 CAPEX tab (`💰 CAPEX`)

Built by `_tab_capex` (`apps/bess-tool/bess_tool/seci_bess_gui.py:4132` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:4151`).

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Solar CAPEX` | 5.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2454`) | ≥ 0.1 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5027`) | Cr/MW | Solar capital cost per installed MW |
| `Wind CAPEX` | 7.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2455`) | ≥ 0.1 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5028`) | Cr/MW | Wind capital cost per installed MW |
| `BESS CAPEX` | 1.5 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2456`) | ≥ 0.1 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5029`) | Cr/MWh | BESS capital cost per installed MWh |

Fields at `apps/bess-tool/bess_tool/seci_bess_gui.py:4136`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4142`. 1 Crore = Rs 1,00,00,000
(in-panel note, `apps/bess-tool/bess_tool/seci_bess_gui.py:4145`).

⚠️ **Known-stale in-panel caption**: the same tab's static help text reads "Defaults: Solar 5
Cr/MW, Wind 7 Cr/MW, BESS 1 Cr/MWh" (`apps/bess-tool/bess_tool/seci_bess_gui.py:4144`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4147`), but
the BESS CAPEX field's actual bound value — what the entry box shows on a fresh launch — is **1.5**
(`self.v_bss_capex = sv(value="1.5")`, `apps/bess-tool/bess_tool/seci_bess_gui.py:2456`), with no
code path that overwrites it before display. Publish **1.5 Cr/MWh** as the BESS CAPEX default; the
caption's "1" is stale.

### 4.8 OPEX tab (`📊 OPEX`)

Built by `_tab_opex` (`apps/bess-tool/bess_tool/seci_bess_gui.py:4153` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:4316`).

**Operation & Maintenance** (`apps/bess-tool/bess_tool/seci_bess_gui.py:4156`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4166`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Solar O&M` | 3.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2458`) | ≥ 0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5030`) | Lac/MW/yr | Solar annual O&M cost per MW |
| `Wind O&M` | 5.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2459`) | ≥ 0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5031`) | Lac/MW/yr | Wind annual O&M cost per MW |
| `BESS O&M (fixed)` | 5.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2460`) | ≥ 0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5032`) | Lac/yr | Fixed annual BESS O&M cost |
| `OPEX Escalation` | 2.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2461`) | 0–20 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5033`) | %/yr | Annual escalation applied to all O&M |

**Revenue, Export & Penalty** (`apps/bess-tool/bess_tool/seci_bess_gui.py:4167`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4196`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `PPA Tariff` | 5.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2463`) | ≥ 0.1 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5034`) | Rs/kWh | Contracted tariff for delivered energy |
| `Penalty Multiplier` | 1.5 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2464`) | 0.0–3.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5035`) | × tariff | Penalty rate applied to DFR shortfall, as a multiple of the PPA tariff |
| `Apply Annual CUF Cap` (checkbox) | off (`apps/bess-tool/bess_tool/seci_bess_gui.py:2468`) | — | — | Enables an annual offtake ceiling; energy above it is paid at the Export Price instead of the PPA tariff |
| `% (of CC × 8760)` (with the CUF-cap checkbox) | 28.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2469`) | 0.0–100.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5038`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5039`) | % | The CUF ceiling itself, disabled unless the checkbox is ticked (`apps/bess-tool/bess_tool/seci_bess_gui.py:3008`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3013`) |

**Export Price (3rd party)** — radio `Fixed Price` / `CSV (15-min pricing)`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4199`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4211`), default `"fixed"`
(`self._export_mode = tk.StringVar(value="fixed")`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2472`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Value` (Fixed Price) | 0.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2470`) | ≥ 0.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5040`) | Rs/kWh | Flat 3rd-party export price |
| `📂 Browse CSV…` (CSV pricing) | status `"No file loaded"` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2475`); unit combobox defaults `Rs/MWh` (`apps/bess-tool/bess_tool/seci_bess_gui.py:2476`) | 35,040 or 8,760 rows (hourly auto-interpolated), price column auto-detected (`mcp`/`price`/`clearing`/`tariff`/`rate`/`rs`, else last numeric column) (`apps/bess-tool/bess_tool/seci_bess_gui.py:3015`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3061`) | Rs/MWh or Rs/kWh | 15-min export-pricing time series (e.g. IEX DAM/RTM MCP), converted to Rs/kWh internally when unit = Rs/MWh (`apps/bess-tool/bess_tool/seci_bess_gui.py:3068`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3069`) |

`_load_export_csv`: `apps/bess-tool/bess_tool/seci_bess_gui.py:3015`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3078`.

**Grid Charging** (`apps/bess-tool/bess_tool/seci_bess_gui.py:4259`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4312`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Grid Charging Price` | 0.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2478`) | ≥ 0.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5057`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5058`) | Rs/kWh | Price paid for grid energy used to charge the battery (Standalone: always; generation-backed: only as backup) |
| `Grid charging backup when generation is short` (checkbox) | off (`apps/bess-tool/bess_tool/seci_bess_gui.py:2480`); disabled and forced off for Standalone BESS (`apps/bess-tool/bess_tool/seci_bess_gui.py:3126`–`apps/bess-tool/bess_tool/seci_bess_gui.py:3132`) | — | — | Lets generation-backed plants top up from the grid on low-irradiance/low-wind days |
| `Max Grid Charge Limit` | 100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2481`) | 0.0–100.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5054`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5056`) | % of usable capacity per charge cycle | Caps how much of the battery's usable capacity the grid may supply per cycle (100% = unrestricted) |

**Optimisation Target** (`apps/bess-tool/bess_tool/seci_bess_gui.py:4314`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4315`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Project Target IRR` | 15.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2483`) | no explicit bound — parsed as a bare `float()` in `_on_optimise`, falling back to 15% if unparsable (`apps/bess-tool/bess_tool/seci_bess_gui.py:5203` – `apps/bess-tool/bess_tool/seci_bess_gui.py:5206`) | % | Target project IRR the `Optimise` search (and its "Hits Target IRR" scenario) aims for |

### 4.9 Finance tab (`🏦 Finance`)

Built by `_tab_finance` (`apps/bess-tool/bess_tool/seci_bess_gui.py:4318` –
`apps/bess-tool/bess_tool/seci_bess_gui.py:4451`).

**Discounting & Escalation** (`apps/bess-tool/bess_tool/seci_bess_gui.py:4323`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4326`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Discount Rate (NPV)` | 10.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2488`) | 0.0–40 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5060`) | % | Discount rate used for NPV |
| `PPA Tariff Escalation` | 0.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2489`) | -5–20 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5061`) | %/yr | Annual escalation applied to the PPA tariff |
| `Terminal / Salvage Value` | 0.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2490`) | 0.0–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5062`) | % CAPEX | Terminal/salvage value at the end of Project Life, as a % of total CAPEX |

**LCOE Energy Basis** combobox (`apps/bess-tool/bess_tool/seci_bess_gui.py:4329`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4348`), default
`delivered` (`self.v_lcoe_basis = sv(value="delivered")`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2492`):

| Option (exact) | Internal value | What it does |
|---|---|---|
| `Energy delivered to load (default)` | `delivered` | LCOE denominator = energy served to the Contracted Capacity |
| `Total generation (solar+wind)` | `generation` | LCOE denominator = total generation incl. exported energy |
| `Delivered + exported energy` | `delivered_export` | LCOE denominator = all useful energy sold |

(`apps/bess-tool/bess_tool/seci_bess_gui.py:4333`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4337`.) The last two need an Export Price
configured; without one the tool falls back to the delivered basis (help text,
`apps/bess-tool/bess_tool/seci_bess_gui.py:4358`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4360`).

**Payment Delay / Working Capital** (`apps/bess-tool/bess_tool/seci_bess_gui.py:4367`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4371`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Receivable Lag` | 0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2494`) | 0.0–365.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5065`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5066`) | days | Days after billing before the offtaker pays; 0 disables the working-capital cost |
| `Working-Capital Rate` | 11.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2495`) | 0.0–40 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5067`) | %/yr | Interest rate on the working-capital loan carrying the receivables |
| `Late-Payment Surcharge` | 0.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2496`) | 0.0–40 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5068`) | %/yr | Interest the offtaker owes on overdue amounts (offsets the WC cost) |
| `WC Facility Fee` | 0.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2497`) | 0.0–20 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5069`) | % recv. | Facility fee on the working-capital line, as % of receivables |

**Debt Financing** — **`Enable debt (levered analysis)`** checkbox
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4388`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4393`), default **off**
(`self._debt_enable = bv(value=False)`, `apps/bess-tool/bess_tool/seci_bess_gui.py:2499`); its
5 sub-fields are disabled while unchecked (`_debt_enable_changed`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:4453`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4459`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Gearing (Debt)` | 70.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2500`) | 0.0–95 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5071`) | % CAPEX | Debt as a % of total CAPEX |
| `Interest Rate` | 9.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2501`) | 0.0–25 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5072`) | %/yr | Loan interest rate |
| `Repayment Tenor` | 15 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2502`) | 1–30 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5073`) | years | Equal-principal repayment period |
| `Moratorium` | 0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2503`) | 0–10 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5074`) | years | Years before repayment begins |
| `DSRA` | 0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2504`) | 0–24 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5075`) | months | Debt-Service Reserve Account, in months of debt service |

**Tax & Depreciation** — **`Enable tax (post-tax analysis)`** checkbox
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4408`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4413`), default **off**
(`self._tax_enable = bv(value=False)`, `apps/bess-tool/bess_tool/seci_bess_gui.py:2506`); its
sub-fields are disabled while unchecked (`_tax_enable_changed`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:4461`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4467`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Corporate Tax Rate` | 25.17 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2507`) | 0.0–50 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5077`) | % | Normal corporate tax rate |
| `MAT Rate` | 17.16 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2508`) | 0.0–30 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5078`) | % | Minimum Alternate Tax rate |
| `Tax Depreciation` (radio `WDV` / `Straight-line`) | `wdv` (`self._dep_method = tk.StringVar(value="wdv")`, `apps/bess-tool/bess_tool/seci_bess_gui.py:2509`) | — | — | Depreciation method for the tax cash-flow |
| `WDV Dep. Rate` | 40.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2510`) | 0.0–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5080`) | %/yr | Written-Down-Value depreciation rate |

Radio at `apps/bess-tool/bess_tool/seci_bess_gui.py:4425`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4430`.

**Advanced Tech-Economic** (`apps/bess-tool/bess_tool/seci_bess_gui.py:4436`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4439`):

| Field | Default | Range | Unit | What it does |
|---|---|---|---|---|
| `Plant Availability` | 100.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2512`) | 1–100 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5081`) | % | Plant availability factor applied in the financial model |
| `Insurance` | 0.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2514`) | 0.0–5 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5082`) | % CAPEX/yr | Annual insurance cost as a % of total CAPEX |
| `BESS Cost Decline (augment.)` | 0.0 (`apps/bess-tool/bess_tool/seci_bess_gui.py:2513`) | 0.0–20 (`apps/bess-tool/bess_tool/seci_bess_gui.py:5083`) | %/yr | Annual decline applied to the BESS unit cost used for augmentation tranches |

In-panel note: "Debt & Tax are OFF by default → results match the simple pre-tax project model"
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4441`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4445`) — consistent with the defaults above.
