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

## 5. Dispatch & analyses

### 5.1 The dispatch model

The engine that Run ▸ `Simulate` and Run ▸ `Optimise` both call is defined at module level
directly inside `seci_bess_gui.py` — `simulate()` (`apps/bess-tool/bess_tool/seci_bess_gui.py:354`),
`monthly_dfr()` (`apps/bess-tool/bess_tool/seci_bess_gui.py:769`), `financial_model()`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1297`). This is the shipped engine, confirmed two ways:
the `bess-tool` console-script entry point resolves to `bess_tool.seci_bess_gui:main`, in this same
file (§1); and `seci_bess_gui.py` contains **zero** references to `seci_bess_tool` — the older CLI
variant `apps/bess-tool/bess_tool/seci_bess_tool.py`, which carries its own duplicate copy of
`simulate`/`financial_model`, is never imported or called from the shipped GUI.

`simulate()` runs a **15-minute annual dispatch**: `DT = 0.25` hours per step
(`apps/bess-tool/bess_tool/seci_bess_gui.py:107`) over `n = len(df)` steps, which is **35,040** for a
full year at 15-min resolution — either the generation CSV the user loaded (auto-upsampled to
15-min, §4.2) or, for a Standalone project, the internally-built calendar `_standalone_timebase()`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5098`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5112`),
built from `TB_DAY = 96` intervals/day (`apps/bess-tool/bess_tool/seci_bess_gui.py:108`) × 365 days
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5105`).

Generation always has first claim on the battery: solar + wind is computed once as
`tot = sol + wnd` (`apps/bess-tool/bess_tool/seci_bess_gui.py:373`), and the grid may only supply
what the remaining generation cannot
(`apps/bess-tool/bess_tool/seci_bess_gui.py:408`–`apps/bess-tool/bess_tool/seci_bess_gui.py:411`).
`simulate()` picks one of five mutually-exclusive per-timestep dispatch branches, selected once per
run from the collected inputs
(`apps/bess-tool/bess_tool/seci_bess_gui.py:381`–`apps/bess-tool/bess_tool/seci_bess_gui.py:433`):

| Branch | Trigger | Behaviour |
|---|---|---|
| **Standalone (grid-charged)** | `project_type == "standalone_bess"` (`apps/bess-tool/bess_tool/seci_bess_gui.py:381`, dispatch `apps/bess-tool/bess_tool/seci_bess_gui.py:499`–`apps/bess-tool/bess_tool/seci_bess_gui.py:530`) | No generation. Peak hours: discharge to meet the Contracted Capacity. Off-Peak: recharge from the grid up to C-rate/headroom (grid import tracked separately as `gchrg` for costing) |
| **CC-firming** | An explicitly empty peak-hour set (`pk["peak_set"]` empty) on a generation-backed project (`apps/bess-tool/bess_tool/seci_bess_gui.py:389`–`apps/bess-tool/bess_tool/seci_bess_gui.py:390`, dispatch `apps/bess-tool/bess_tool/seci_bess_gui.py:532`–`apps/bess-tool/bess_tool/seci_bess_gui.py:564`) | Firms the Contracted Capacity every hour: generation ≥ CC → serve CC, charge the surplus, export only what the (full) battery can't absorb; generation < CC → discharge to fill the gap, any remainder is a shortfall |
| **Generation-charged Peak-Shift** | the Peak-Shift checkbox (§4.1) → `solar_shift` (`apps/bess-tool/bess_tool/seci_bess_gui.py:382`, dispatch `apps/bess-tool/bess_tool/seci_bess_gui.py:566`–`apps/bess-tool/bess_tool/seci_bess_gui.py:627`) | Peak window: battery (plus any generation) discharges to meet the Contracted Capacity, surplus exported. All other hours: generation charges the battery first, balance exported, **no** load obligation outside the window; an optional worst-case grid backup tops the battery up only with what remaining generation in that window can't cover (`apps/bess-tool/bess_tool/seci_bess_gui.py:606`–`apps/bess-tool/bess_tool/seci_bess_gui.py:624`) |
| **Peak / Off-Peak** (default, "IRR-optimal") | none of the above; `is_peak` from the Peak-tab hour set (dispatch `apps/bess-tool/bess_tool/seci_bess_gui.py:629`–`apps/bess-tool/bess_tool/seci_bess_gui.py:699`) | Peak: battery is a deficit-filler only — idle if generation ≥ CC, else discharges exactly the gap; no charging on Peak. Off-Peak: battery is a surplus-absorber only — CC met from generation first, battery charges only from the surplus above CC; no discharging Off-Peak |
| **Cycle-mode** (Battery EOL basis = "In Total Cycles", §4.5) | `eol_basis == "cycles"` (`apps/bess-tool/bess_tool/seci_bess_gui.py:433`, dispatch `apps/bess-tool/bess_tool/seci_bess_gui.py:440`–`apps/bess-tool/bess_tool/seci_bess_gui.py:497`) | Window-scheduled: fixed discharge / day-charge / night-charge(wind-only) / grid-charge hour windows from the **`⚙  Configure Cycles & Charge/Discharge Windows…`** dialog (§4.5), independent of the Peak tab's hour set |

Round-trip efficiency (`eta_c`/`eta_d`, from √RTE, §4.5) and Depth-of-Discharge × State-of-Health
(`cap_usable = bess_mwh * dod * soh`, `apps/bess-tool/bess_tool/seci_bess_gui.py:360`) are applied
uniformly across every branch; the battery starts each `simulate()` call at 100% SOC
(`apps/bess-tool/bess_tool/seci_bess_gui.py:363`).

`financial_model()` is not a scaled projection of one dispatch run — it **re-runs the full 15-min
`simulate()`** once per project year, at that year's degraded SOH and generation factor, plus
`monthly_dfr()` for that year
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1348`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1349`),
then assembles the discounted annual cash-flow from the per-year results, calling
`progress_cb(yr, yrs)` after each year when supplied
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1329`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1330`).

### 5.2 Run ▸ `Simulate`

`_on_simulate` (`apps/bess-tool/bess_tool/seci_bess_gui.py:5136`) is gated by
`_require_license("Simulation")` (`apps/bess-tool/bess_tool/seci_bess_gui.py:5137`, §3) and requires
data — `_ensure_data()` (`apps/bess-tool/bess_tool/seci_bess_gui.py:5139`) either confirms a loaded
generation CSV or, for a Standalone project, silently builds the internal calendar (§5.1). Inputs
(Peak hours + all tab parameters) are collected on the main thread; the run itself executes on a
background thread, `_run_simulate`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5151`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5155`).

`_run_simulate` calls, in order: `simulate()`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5169`), `monthly_dfr()`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5170`), then `financial_model()` with a progress callback
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5172`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5173`)
— the status bar shows `Financial model: year <yr>/<total>…` while it runs
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5166`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5167`).

On completion it fires the telemetry event **`bess_simulate`**
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5175`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5176`,
metadata from `simulate_event_meta()` at `apps/bess-tool/bess_tool/seci_bess_gui.py:2284`) and pushes
the run to `_update_all`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5178`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5179`,
def at `apps/bess-tool/bess_tool/seci_bess_gui.py:6973`), which refreshes all **four** result tabs —
`📈 Dashboard`, `📋 DFR Table`, `💹 Financials`, `📝 Summary`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:6984`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6987`)
— sets the run-summary status line

`Done │ IRR=<pct>%  NPV=Rs<value>Cr  CAPEX=Rs<value>Cr  Sol=<value>MW  Wnd=<value>MW  BESS=<value>MWh`

(`apps/bess-tool/bess_tool/seci_bess_gui.py:6991`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6994`),
and switches the result notebook to the Dashboard tab
(`apps/bess-tool/bess_tool/seci_bess_gui.py:6996`).

### 5.3 Run ▸ `Optimise`

`_on_optimise` (`apps/bess-tool/bess_tool/seci_bess_gui.py:5191`) is gated by
`_require_license("Optimisation")` (`apps/bess-tool/bess_tool/seci_bess_gui.py:5192`, §3), requires
data the same way as Simulate, and reads `Project Target IRR` (§4.8), falling back to 15% if
unparsable
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5204`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5206`).
The run executes on a background thread, `_run_optimise`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5212`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5216`).

The search uses **SciPy's `differential_evolution`** (imported
`apps/bess-tool/bess_tool/seci_bess_gui.py:59`, invoked
`apps/bess-tool/bess_tool/seci_bess_gui.py:5335`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5340`)
over three free variables — **Solar MW × Wind MW × BESS MWh** — with bounds that respect the project
topology: an excluded source (§4.1) is pinned to ≈0 MW so the optimiser never adds it
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5252`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5266`).
It produces **three scenarios**:

| Scenario | Displayed title | What it does |
|---|---|---|
| Scenario 1 | `Max IRR • Your Peak Hours` | Wide + narrow DE search on the user's own selected Peak hours (`apps/bess-tool/bess_tool/seci_bess_gui.py:5353`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5372`) |
| Scenario 2 | `Max IRR • Suggested Peak Hours` | Scans all 24 contiguous N-hour blocks (N = the user's peak-hour count) for the highest-scoring block (`apps/bess-tool/bess_tool/seci_bess_gui.py:5393`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5426`), then re-runs the same wide + narrow DE search on that block (`apps/bess-tool/bess_tool/seci_bess_gui.py:5433`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5451`) |
| Option 3 | `Hits Target IRR (±0.5%)` when reachable, else `Closest Achievable to Target` | Grid-sweeps Solar×Wind×BESS combinations — a coarse pass then local refinement (`apps/bess-tool/bess_tool/seci_bess_gui.py:5489`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5544`) — then scales/bisects that mix against the **full** `financial_model()` so the reported project IRR lands within ±0.5 pp of the Target IRR when possible (`apps/bess-tool/bess_tool/seci_bess_gui.py:5546`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5617`; the ±0.5 pp check is at `apps/bess-tool/bess_tool/seci_bess_gui.py:5617`) |

(Exact title strings: `apps/bess-tool/bess_tool/seci_bess_gui.py:5630`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:5632`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:5634`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5636`.)

Scenario 1 is pre-loaded into the main view (Dashboard/DFR/Financials/Summary) **before** the dialog
opens
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5625`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5626`).
The run then fires telemetry **`bess_optimise`**
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5648`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5649`,
metadata from `optimise_event_meta()` at `apps/bess-tool/bess_tool/seci_bess_gui.py:2290`) and opens
the **Scenario Comparison** dialog, `_show_comparison_dialog`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5663`), window title
**`Optimisation — Scenario Comparison`**
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5682`).

The dialog's table has one column per scenario and these rows, top to bottom
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5729`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5741`):
Peak Hours Selected, Solar Capacity (MW), Wind Capacity (MW), BESS Energy (MWh), Total CAPEX (Cr),
IRR (%), NPV @ 10% (Cr), Gross Rev Yr1 (Cr), Penalty Yr1 (Lac), Pen % of Revenue Yr1, Export MWh Yr1,
NCF Yr1 (Cr). The column header of whichever scenario has the highest IRR is shaded green if that
IRR also meets the Target IRR, red if it doesn't
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5709`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5713`);
for each KPI row (CAPEX, IRR, NPV, Gross Rev, NCF) the winning cell is shaded light-green
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5773`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5786`);
a bottom banner states `★  Highest IRR: <name> (<value>%)  |  Target <value>%  — met ✓` / `— not met`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5808`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5813`).
Each column has a **`✓  Apply <Scenario>`** button that applies that scenario's peak hours, sizes and
results to the main view and closes the dialog
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5819`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5837`),
plus a single **`✕  Close`** button
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5839`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5842`).

### 5.4 Run ▸ `Sensitivity Analysis…`

`_open_sensitivity` (`apps/bess-tool/bess_tool/seci_bess_gui.py:5846`) — reachable from the Run menu
(§2) or the **`📈 Sensitivity`** button on the `📝 Summary` tab's export toolbar
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4646`) — **requires a base case**: if no Simulate/
Optimise result exists yet (`self._last_fin is None or self._last_p is None`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:5848`), it warns "Please run Simulate or Optimise first to
establish a base case." (`apps/bess-tool/bess_tool/seci_bess_gui.py:5849`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:5851`) and does not open. It is not licence-gated (§3).

The window, titled **`Sensitivity Analysis`**
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5866`, 1200×760), has **5 tabs**, each pulling from a
shared driver list — every input that moves NPV/IRR, filtered to the current project topology and to
non-zero base values: source capacities, PPA & export tariffs, each CAPEX and O&M line, penalty
multiplier, availability, discount rate, debt interest rate (only when debt financing is enabled),
module and BESS degradation, and payment lag
(`apps/bess-tool/bess_tool/seci_bess_gui.py:5891`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5933`).

| Tab (exact label) | Inputs | Run button(s) | Output |
|---|---|---|---|
| `Single Variable Sweep` (`apps/bess-tool/bess_tool/seci_bess_gui.py:5968`) | Variable, Min, Max, Steps (`apps/bess-tool/bess_tool/seci_bess_gui.py:5974`–`apps/bess-tool/bess_tool/seci_bess_gui.py:5987`) | `▶  Run Sweep` (`apps/bess-tool/bess_tool/seci_bess_gui.py:5989`); `💾 Export CSV` (`apps/bess-tool/bess_tool/seci_bess_gui.py:5991`, licence-gated `"Export"` at `apps/bess-tool/bess_tool/seci_bess_gui.py:6132`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6133`) | Table — Value, IRR %, NPV Cr, GRev Cr Yr1, Pen Lac Yr1, Pen% Rev, Exp MWh Yr1, Exp Rev Lac Yr1, NCF Cr Yr1 (`apps/bess-tool/bess_tool/seci_bess_gui.py:6012`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6014`), base row and best-IRR row highlighted (`apps/bess-tool/bess_tool/seci_bess_gui.py:6020`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6021`), plus IRR-vs-variable and NPV-vs-variable plots (`apps/bess-tool/bess_tool/seci_bess_gui.py:6106`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6120`) |
| `Tornado Chart` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6149`) | Variation ± % (default 20, `apps/bess-tool/bess_tool/seci_bess_gui.py:6156`); Metric — `IRR (%)` / `NPV (Cr)` / `NCF Yr1 (Cr)` / `Penalty Yr1 (Lac)` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6161`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6163`) | `▶  Run Tornado` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6167`) | Varies each driver ± the chosen % around base, one at a time, and draws a horizontal bar chart of Δmetric sorted by swing magnitude (`apps/bess-tool/bess_tool/seci_bess_gui.py:6213`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6242`) |
| `2-Variable Heatmap` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6254`) | X-Axis, Y-Axis driver (`apps/bess-tool/bess_tool/seci_bess_gui.py:6259`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6268`); Grid N×N (default 8, `apps/bess-tool/bess_tool/seci_bess_gui.py:6270`); Range ±% (default 50, `apps/bess-tool/bess_tool/seci_bess_gui.py:6275`) | `▶  Run Heatmap` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6280`) | N×N grid of `financial_model()` evaluations rendered as an IRR colour map with contour lines and a base-case marker (`apps/bess-tool/bess_tool/seci_bess_gui.py:6348`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6376`) |
| `Breakeven Solver` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6388`) | Solve for: lever, same driver universe (`apps/bess-tool/bess_tool/seci_bess_gui.py:6402`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6444`); Target metric — `IRR (%)` / `NPV (Cr)` / `Equity IRR (%)` / `Min DSCR (x)` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6455`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6459`) and its target value; editable search range Min/Max, auto-filled to 0.2×–5× the lever's base value (`apps/bess-tool/bess_tool/seci_bess_gui.py:6469`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6496`) | `🎯  Solve` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6466`) | Bisects the lever within the search range (`apps/bess-tool/bess_tool/seci_bess_gui.py:6591`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6606`); reports the solved value plus resulting IRR/NPV/Equity IRR/Min DSCR (`apps/bess-tool/bess_tool/seci_bess_gui.py:6608`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6624`), or "Target … not bracketed within [Min, Max]" if unreachable in that range (`apps/bess-tool/bess_tool/seci_bess_gui.py:6582`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6587`) |
| `Monte Carlo` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6635`) | Per-driver ±1σ % with sensible per-driver defaults (`apps/bess-tool/bess_tool/seci_bess_gui.py:6648`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6691`); Iterations (default 500, `apps/bess-tool/bess_tool/seci_bess_gui.py:6715`); Seed (default 42, `apps/bess-tool/bess_tool/seci_bess_gui.py:6719`); Percentiles P (default 10/50/90, editable 0–100, `apps/bess-tool/bess_tool/seci_bess_gui.py:6730`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6734`) | `🎲  Run Monte Carlo` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6736`); `↻  Show P-values` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6738`, re-reports the chosen percentiles from the stored sample set without re-running, `apps/bess-tool/bess_tool/seci_bess_gui.py:6770`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6773`) | IRR distribution histogram + NPV CDF plot, both marked at the base case and the chosen percentiles; reports sample count and `P(NPV<0)=<pct>%` / `P(IRR≥target)=<pct>%` (`apps/bess-tool/bess_tool/seci_bess_gui.py:6786`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6787`, `apps/bess-tool/bess_tool/seci_bess_gui.py:6818`–`apps/bess-tool/bess_tool/seci_bess_gui.py:6820`) |

⚠️ **Note on the inventory map's Monte Carlo percentiles**: the topic map (
`.superpowers/sdd/2026-08-24-two-app-docs-phase0-1/bess-inventory-map.md`) describes the reported
percentiles as "P5/P50/P95" — the shipped default is **P10/P50/P90**
(`self.v_p1... = "10"/"50"/"90"`, `apps/bess-tool/bess_tool/seci_bess_gui.py:6730`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:6732`), fully user-editable to any value 0–100. Publish
P10/P50/P90 as the default.

## 6. Results & the financial model

The right-hand result notebook (§2, `_build_right`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:2738`–`apps/bess-tool/bess_tool/seci_bess_gui.py:2771`)
has **4 tabs**, populated by `_update_all` once Simulate/Optimise finishes (§5.2): `📈 Dashboard`,
`📋 DFR Table`, `💹 Financials`, `📝 Summary`.

### 6.1 `📈 Dashboard` tab

Built by `make_plots()` (`apps/bess-tool/bess_tool/seci_bess_gui.py:1465`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:1823`), a single matplotlib figure embedded by
`_embed_canvas` (`apps/bess-tool/bess_tool/seci_bess_gui.py:7035`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:7062`).

**Header strip** — a navy bar (`HDR_BG = "#1a3a5c"`, `apps/bess-tool/bess_tool/seci_bess_gui.py:1492`)
above the panels: left `  Solar = <val> MW      Wind = <val> MW      BESS = <val> MWh`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1515`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1517`);
right `IRR = <val>      Contracted Capacity = <val> MW  `
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1518`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1519`).

**Six panels**, each titled via the shared `_ptitle()` helper
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1501`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1505`)
— exact `_ptitle` strings, verbatim (note the double em-spaces around "─" in the shipped code):

1. `Total Generation vs Contracted Capacity  ─  7-day scrollable window`
   (`apps/bess-tool/bess_tool/seci_bess_gui.py:1618`) — stacked solar/wind generation fill, a
   total-generation line vs the Contracted-Capacity line, a Scheduled/Delivered line, and an
   exported-surplus fill.
2. `Battery Charge / Discharge & State of Charge  ─  7-day scrollable window`
   (`apps/bess-tool/bess_tool/seci_bess_gui.py:1669`) — charge/discharge/grid-charge fills on the
   left axis, SOC (MWh) on a twin right axis; days with any grid charging are shaded purple on both
   panel 1 and panel 2 (`apps/bess-tool/bess_tool/seci_bess_gui.py:1626`–
   `apps/bess-tool/bess_tool/seci_bess_gui.py:1633`).
3. `Monthly DFR Performance` (`apps/bess-tool/bess_tool/seci_bess_gui.py:1698`) — grouped
   Overall/Peak/Off-Peak DFR % bars per month against their target lines.
4. `Monthly DFR Penalty  (Red = Target Missed)` (`apps/bess-tool/bess_tool/seci_bess_gui.py:1720`)
   — monthly penalty (Rs Lakhs) bars, green when peak+off-peak+overall all pass that month, red
   otherwise (`apps/bess-tool/bess_tool/seci_bess_gui.py:1702`–
   `apps/bess-tool/bess_tool/seci_bess_gui.py:1703`).
5. `Annual Revenue vs OPEX` (`apps/bess-tool/bess_tool/seci_bess_gui.py:1745`) — Gross
   Revenue / OPEX / Penalty bars plus a Net CF line, one point per project year.
6. `Cumulative Cashflow  ─  IRR = <irr>` (f-string,
   `apps/bess-tool/bess_tool/seci_bess_gui.py:1772`) — annual + cumulative cashflow bars/line, a
   payback-year marker, and an IRR badge coloured green when `irr_pct ≥ 15`, red otherwise (a fixed
   15% benchmark, independent of the `Project Target IRR` input, §4.8) —
   `apps/bess-tool/bess_tool/seci_bess_gui.py:1771`.

**7-day scrollable window & slider**: panels 1–2 default to a 7-day window (`WINDOW = 7 * TB_DAY`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:1472`). A matplotlib `Slider` labelled `Day` scrolls both
panels together (`apps/bess-tool/bess_tool/seci_bess_gui.py:1782`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:1793`), with instruction text
`◀  Drag slider to scroll through all 365 days  ▶` beneath it
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1796`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1799`).

**`⛶  Maximize`** — appended next to the matplotlib `NavigationToolbar2Tk` when the figure is embedded
in the main Dashboard tab (`apps/bess-tool/bess_tool/seci_bess_gui.py:7042`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:7050`), calling `_maximize_dashboard`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:7064`–`apps/bess-tool/bess_tool/seci_bess_gui.py:7084`):
detaches the inline canvas and re-embeds the same figure into a maximised `Toplevel` titled
`BESS Dashboard  —  Maximized   (close or press Esc to restore)`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:7075`), whose toolbar shows `🗗  Restore` instead
(`apps/bess-tool/bess_tool/seci_bess_gui.py:7051`–`apps/bess-tool/bess_tool/seci_bess_gui.py:7057`).
Esc or the window's close button both call `_restore_dashboard`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:7081`–`apps/bess-tool/bess_tool/seci_bess_gui.py:7082`,
def at `apps/bess-tool/bess_tool/seci_bess_gui.py:7086`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:7098`), which re-embeds the figure back into the tab and
re-selects it (`apps/bess-tool/bess_tool/seci_bess_gui.py:7098`).

### 6.2 `📋 DFR Table` tab

Built by `_build_dfr_tree` (`apps/bess-tool/bess_tool/seci_bess_gui.py:4472`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:4493`); one row per calendar month of Year 1, populated by
`_update_dfr_tree` (`apps/bess-tool/bess_tool/seci_bess_gui.py:7100`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:7125`).

**Columns, in order** (`apps/bess-tool/bess_tool/seci_bess_gui.py:4473`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:4477`):
`Month, 15min%, Total%, Peak%, Off-Pk%, 15m OK, Pk OK, OffPk OK, Mon OK, ShortPk MWh,
ShortOpk MWh, Short15m MWh, Penalty Lac, Pen%Rev, Export MWh, Export Rev Lac`.

**Row shading**: green background `#e8fde8` (tag `ok`) when that month's peak, off-peak, overall
*and* 15-min DFR all meet target; red background `#fde8e8` (tag `miss`) otherwise
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4484`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4485`,
tag selection `apps/bess-tool/bess_tool/seci_bess_gui.py:7105`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:7107`). Column-heading hover tooltips are wired via
`_attach_heading_tooltips` against `_DFR_TIPS`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4493`, tips
`apps/bess-tool/bess_tool/seci_bess_gui.py:4573`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4595`).

### 6.3 `💹 Financials` tab

Built by `_build_fin_tree` (`apps/bess-tool/bess_tool/seci_bess_gui.py:4597`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:4635`); headline text + per-year rows are populated by
`_update_fin_tree` (`apps/bess-tool/bess_tool/seci_bess_gui.py:7127`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:7248`).

**Headline summary lines** — a read-only `Text` widget so individual negative numbers can be painted
red inline (`apps/bess-tool/bess_tool/seci_bess_gui.py:4603`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:4610`; painter `_set_fin_summary`
`apps/bess-tool/bess_tool/seci_bess_gui.py:7250`–`apps/bess-tool/bess_tool/seci_bess_gui.py:7261`).
Each line is shown only when its underlying value is available:

1. `Total CAPEX: Rs <val> Cr  │  Project IRR: <val>  │  NPV @<disc>%: Rs <val> Cr  │  Sol: <val>Cr
   Wnd: <val>Cr  BESS: <val>Cr` (`apps/bess-tool/bess_tool/seci_bess_gui.py:7137`–
   `apps/bess-tool/bess_tool/seci_bess_gui.py:7139`).
2. `Post-tax IRR: <val>   │   Equity IRR: <val>   │   WACC: <val>   │   DSCR min/avg: <val>/<val>`
   (`apps/bess-tool/bess_tool/seci_bess_gui.py:7145`–`apps/bess-tool/bess_tool/seci_bess_gui.py:7153`).
3. `LCOE(<basis>): <val> Rs/kWh   │   LCOS: <val> Rs/kWh   │   Payback: <val> yr   │
   Disc.Payback: <val> yr   │   MoIC: <val>x   │   PI: <val>`
   (`apps/bess-tool/bess_tool/seci_bess_gui.py:7155`–`apps/bess-tool/bess_tool/seci_bess_gui.py:7170`).
4. Grid-charging totals (only when any year drew grid energy): `Grid charging: Yr1 <val> MWh =
   <val>% of export (<val> Cr)   │   life <val> MWh = <val>% of export, cost <val> Cr`
   (`apps/bess-tool/bess_tool/seci_bess_gui.py:7172`–`apps/bess-tool/bess_tool/seci_bess_gui.py:7184`).
5. Payment-delay WC cost (only when Receivable Lag > 0): `Payment delay <val> d  →  WC carrying
   cost <val> Cr total  │  IRR impact <val>  │  NPV impact <val> Cr`
   (`apps/bess-tool/bess_tool/seci_bess_gui.py:7186`–`apps/bess-tool/bess_tool/seci_bess_gui.py:7193`).

**Per-year columns, in order** (`apps/bess-tool/bess_tool/seci_bess_gui.py:4612`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:4616`):
`Yr, Deg%, SOH%, BESS MWh, Sched MWh, Export MWh, Export Rev Lac, Gross Rev Cr, Pen Lac, Pen%Rev,
OPEX Lac, Grid MWh, Grid %Exp, Grid Chg Cr, WC/Delay Cr, Repl/Aug Cr, EBITDA Cr, Interest Cr,
Tax Cr, NCF Cr, Equity CF Cr, DSCR`.

**Row shading**: light-red `#fde8e8` (tag `neg`) for a negative-NCF year; yellow `#fff3cd` (tag
`rep`) for a replacement/augmentation year — mutually exclusive, `neg` checked first
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4624`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4625`,
selection `apps/bess-tool/bess_tool/seci_bess_gui.py:7211`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:7214`). Independently, a row's text is painted red (tag
`neg_red`, `#c0392b`) if *any* of Gross Rev / EBITDA / NCF / Equity CF / Interest / Tax / Penalty /
OPEX / Export Rev / DSCR is negative for that year
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4627`, check
`apps/bess-tool/bess_tool/seci_bess_gui.py:7215`–`apps/bess-tool/bess_tool/seci_bess_gui.py:7221`).
Column-heading hover tooltips via `_FIN_TIPS`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4521`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4572`).

### 6.4 `📝 Summary` tab

Built by `_build_summary_panel` (`apps/bess-tool/bess_tool/seci_bess_gui.py:4637`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:4654`): a dark console-style `ScrolledText`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:4650`–`apps/bess-tool/bess_tool/seci_bess_gui.py:4654`)
filled by `_update_summary`, which calls `build_report_text()`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:7263`–`apps/bess-tool/bess_tool/seci_bess_gui.py:7268`;
report builder `apps/bess-tool/bess_tool/seci_bess_gui.py:1826`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:1977`). The plain-text report runs, in order: a project
header + configuration block, a CAPEX/IRR/NPV headline
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1864`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1877`),
a `FINANCIAL METRICS` block (`apps/bess-tool/bess_tool/seci_bess_gui.py:1878`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:1933`) — including an `[ABOVE 15%]` / `[BELOW 15%]` tag
on the headline IRR line that, like the Dashboard IRR badge (§6.1), compares against the same fixed
15% benchmark rather than the user's `Project Target IRR`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1875`) — a `MONTHLY DFR COMPLIANCE (Year 1)` table
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1934`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1963`),
and a `YEAR-BY-YEAR CASHFLOW` table
(`apps/bess-tool/bess_tool/seci_bess_gui.py:1964`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1976`).

**Export toolbar** (`apps/bess-tool/bess_tool/seci_bess_gui.py:4639`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:4648`), 6 buttons, exact labels in order:
`📥 Export PDF` (→ `_export_pdf`), `💾 Save Plot` (→ `_export_plot`), `📄 Save Report`
(→ `_save_word_report`), `📊 Save DFR CSV` (→ `_export_csv`), `🕒 Time-Series CSV`
(→ `_export_timeseries_csv`), `📈 Sensitivity` (→ `_open_sensitivity`) — the first five are
licence-gated `"Export"` calls (§3); Sensitivity is not gated.

### 6.5 Financial metrics & their definitions

Formulas as stated by Help ▸ `User Guide / Formulas…` (`_show_help`,
`apps/bess-tool/bess_tool/seci_bess_gui.py:8328`), tab `  Financial Calculations  `
(`apps/bess-tool/bess_tool/seci_bess_gui.py:8364`), body text `_HELP_FINANCE`
(`apps/bess-tool/bess_tool/seci_bess_gui.py:117`–`apps/bess-tool/bess_tool/seci_bess_gui.py:263`).
Every figure is derived from the 15-min `simulate()` dispatch (§5.1) rolled into an annual cash-flow
model by `financial_model()` (`apps/bess-tool/bess_tool/seci_bess_gui.py:1297`) and
`compute_project_finance()` (`apps/bess-tool/bess_tool/seci_bess_gui.py:1048`–
`apps/bess-tool/bess_tool/seci_bess_gui.py:1270`).

- **IRR** — the rate `r` that makes NPV(CF, r) = 0, via `numpy_financial.irr` with a
  Newton-Raphson fallback (`_HELP_FINANCE`, `apps/bess-tool/bess_tool/seci_bess_gui.py:230`–
  `apps/bess-tool/bess_tool/seci_bess_gui.py:232`; code `calc_irr`
  `apps/bess-tool/bess_tool/seci_bess_gui.py:91`–`apps/bess-tool/bess_tool/seci_bess_gui.py:100`,
  fallback `_irr_fallback` `apps/bess-tool/bess_tool/seci_bess_gui.py:69`–
  `apps/bess-tool/bess_tool/seci_bess_gui.py:89`). Two IRR figures are shown from two different
  cash-flow streams: the headline **Project IRR** (Dashboard header/badge, status-bar summary,
  Financials/report summary line 1) comes straight from `financial_model()`'s own `cashflows` —
  `[-CAPEX]` then per-year `EBITDA − replacement/augmentation`, no debt/tax/salvage
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:1314`, `apps/bess-tool/bess_tool/seci_bess_gui.py:1376`–
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1377`; IRR at
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1413`, exposed as `irr_pct`
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1437`); the report's `Project IRR (pre-tax)` /
  Financials-line-2 `Post-tax IRR` instead come from `compute_project_finance()`'s salvage-inclusive
  `pre_cf`/`post_cf` streams (`apps/bess-tool/bess_tool/seci_bess_gui.py:1143`–
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1149`, selected by
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1155`, IRR
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1157`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1158`,
  exposed as `irr_pre_pct`/`post_tax_irr_pct`
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1242`, `apps/bess-tool/bess_tool/seci_bess_gui.py:1245`).
- **Equity IRR** — IRR of the equity cash-flow stream: EBITDA − interest − principal −
  tax(levered) − reinvestment (+ terminal value and DSRA release, net of remaining debt, in the
  final year); only computed when Debt Financing is enabled (`_HELP_FINANCE:230`–`232`; code `eq_cf`
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1145`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1153`,
  IRR `apps/bess-tool/bess_tool/seci_bess_gui.py:1159`, exposed
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1246`).
- **NPV** — `SUM_t CF_t / (1 + d)^t` at the Discount Rate `d` (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:233`; code `_npv`
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1031`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1032`).
  Mirrors the IRR split above: the headline `NPV @<disc>%` (Financials line 1) is `_npv(cashflows,
  disc_rate)`, exposed as `npv_10_cr`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:1417`, `apps/bess-tool/bess_tool/seci_bess_gui.py:1438`);
  the `NPV @ <disc>%` line inside the report's `FINANCIAL METRICS` block is the salvage/tax-aware
  `_npv(proj_cf, disc)`, exposed as `npv_disc_cr`
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:1160`, `apps/bess-tool/bess_tool/seci_bess_gui.py:1248`).
- **Payback (simple / discounted)** — the year cumulative (or discounted-cumulative) project cash
  flow first turns ≥ 0, linearly interpolated within the year (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:234`–`apps/bess-tool/bess_tool/seci_bess_gui.py:235`;
  code `_payback` `apps/bess-tool/bess_tool/seci_bess_gui.py:1035`–
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1045`, called on `proj_cf` / its discounted form
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1207`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1210`).
- **DSCR** — `(EBITDA − tax(levered) − reinvestment) / (interest + principal)` for the year, reported
  as minimum and average across the debt tenor (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:236`–`apps/bess-tool/bess_tool/seci_bess_gui.py:237`;
  code `apps/bess-tool/bess_tool/seci_bess_gui.py:1163`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1170`).
- **DSRA** (Debt-Service Reserve Account) — `(DSRA_months / 12) × (first year's interest +
  principal)` (`_HELP_FINANCE`, `apps/bess-tool/bess_tool/seci_bess_gui.py:207`; code
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1087`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1091`);
  funded upfront alongside equity, released (net of remaining debt) in the final equity-cash-flow
  year (`apps/bess-tool/bess_tool/seci_bess_gui.py:1145`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1151`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1152`).
- **MoIC** (Multiple on Invested Capital) — sum of positive cash inflows ÷ initial outlay; outlay =
  Equity + DSRA when levered, else Total CAPEX (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:238`–`apps/bess-tool/bess_tool/seci_bess_gui.py:239`;
  code `apps/bess-tool/bess_tool/seci_bess_gui.py:1211`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1216`).
- **PI** (Profitability Index) — `(NPV + CAPEX) / CAPEX`; PI > 1 is value-accretive (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:240`; code
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1217`).
- **WACC** (after-tax, levered projects only) — `(E/V) × cost_equity + (D/V) × interest_rate ×
  (1 − tax_rate)`, with `cost_equity` taken as the Discount Rate (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:241`–`apps/bess-tool/bess_tool/seci_bess_gui.py:242`;
  code `apps/bess-tool/bess_tool/seci_bess_gui.py:1220`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1225`).
- **LCOE** (Levelised Cost of Energy) — `(CAPEX_total + Σ_y discounted(OPEX_y + reinvest_y)) /
  Σ_y discounted(Energy_y × 1000)`, Rs/kWh (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:244`–`apps/bess-tool/bess_tool/seci_bess_gui.py:251`;
  code `apps/bess-tool/bess_tool/seci_bess_gui.py:1193`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1203`).
  Three selectable energy bases (§4.9 LCOE Energy Basis combobox), falling back to `delivered` when
  no export price is configured
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:1180`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1191`):
  `Energy delivered to load (default)` (energy scheduled against the CC), `Total generation
  (solar+wind)` (all generation, incl. exported), `Delivered + exported energy` (all useful energy
  sold).
- **LCOS** (Levelised Cost of Storage) — the same shape as LCOE but over BESS CAPEX + BESS OPEX +
  reinvestment, divided by discounted battery-discharge throughput (Rs/kWh) — "the cost of every kWh
  that actually passes through the battery" (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:253`–`apps/bess-tool/bess_tool/seci_bess_gui.py:257`;
  code `apps/bess-tool/bess_tool/seci_bess_gui.py:1195`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1204`).
- **DFR-shortfall penalty** — per month, per peak / off-peak / overall / 15-min bucket:
  `shortfall = max(target_DFR × required_MWh − delivered_MWh, 0)`; `penalty = penalty_mult ×
  PPA_tariff × shortfall × 1000`; the month's penalty is `max(peak_penalty + off-peak_penalty,
  overall_penalty, 15-min_penalty)` (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:157`–`apps/bess-tool/bess_tool/seci_bess_gui.py:165`;
  code `monthly_dfr()` `apps/bess-tool/bess_tool/seci_bess_gui.py:769`, shortfalls
  `apps/bess-tool/bess_tool/seci_bess_gui.py:815`, `apps/bess-tool/bess_tool/seci_bess_gui.py:819`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:823`, `apps/bess-tool/bess_tool/seci_bess_gui.py:829`,
  penalties `apps/bess-tool/bess_tool/seci_bess_gui.py:835`–
  `apps/bess-tool/bess_tool/seci_bess_gui.py:839`). Standalone / generation-charged Peak-Shift /
  cycle-mode projects owe the load only in their discharge window, so off-window hours carry no
  requirement and no penalty (`apps/bess-tool/bess_tool/seci_bess_gui.py:790`–
  `apps/bess-tool/bess_tool/seci_bess_gui.py:792`).
- **Annual CUF cap** (optional, per-tender) — when enabled with a cap %: `cap_mwh = cap% × CC ×
  8760`; energy up to the cap is paid at the PPA tariff, the excess at the export price
  (`_HELP_FINANCE`, `apps/bess-tool/bess_tool/seci_bess_gui.py:143`–
  `apps/bess-tool/bess_tool/seci_bess_gui.py:148`; code `_cuf_cap_split()`
  `apps/bess-tool/bess_tool/seci_bess_gui.py:737`–`apps/bess-tool/bess_tool/seci_bess_gui.py:755`).
- **Grid-charging cost** (Standalone BESS always; a generation-backed Peak-Shift plant only as
  worst-case backup) — `SUM(grid_import_mwh × grid_charge_price × 1000) × esc_f` (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:167`–`apps/bess-tool/bess_tool/seci_bess_gui.py:169`;
  code `_grid_charge_cost_rs()` `apps/bess-tool/bess_tool/seci_bess_gui.py:758`–
  `apps/bess-tool/bess_tool/seci_bess_gui.py:766`).
- **Payment-delay / working-capital carrying cost** — models the gap between PPA billing and
  offtaker payment as a recurring finance cost: `receivables = annual_revenue × (lag_days / 365)`;
  `WC carry cost = receivables × (WC_rate + facility_fee − LPS_rate)`; deductible, so it reduces
  EBITDA (and tax) each year; zero when Receivable Lag = 0 (`_HELP_FINANCE`,
  `apps/bess-tool/bess_tool/seci_bess_gui.py:171`–`apps/bess-tool/bess_tool/seci_bess_gui.py:182`;
  code `_working_capital_cost()` `apps/bess-tool/bess_tool/seci_bess_gui.py:1273`–
  `apps/bess-tool/bess_tool/seci_bess_gui.py:1294`). The Financials headline and report show the
  total WC cost and its IRR/NPV impact versus the same case with no lag
  (`apps/bess-tool/bess_tool/seci_bess_gui.py:1418`–`apps/bess-tool/bess_tool/seci_bess_gui.py:1432`).

