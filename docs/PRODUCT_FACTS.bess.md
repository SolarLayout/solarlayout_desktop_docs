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
