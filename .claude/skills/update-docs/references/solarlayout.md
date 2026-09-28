# SolarLayout Desktop — product reference for `update-docs`

## Where things are

| What | Path |
|---|---|
| Fact sheet | `docs/PRODUCT_FACTS.md` — header carries "re-verified <date> against `main` at `<sha>`"; stale sources §18; product issues §20; release mapping §21 |
| Pages | `content/docs/**` (nav: each folder's `meta.json`) |
| Release notes | `content/docs/releases.mdx` (`<Release version date tag="current">`) |
| Screenshot manifest | `content/screenshots.ts` → images under `public/screenshots/<file>` (every folder except `bess/`) |
| Screenshot worklist | `docs/screenshot-index.xlsx` (`bun run screenshots:index`) |
| Video worklist | `content/videos.mjs` → `docs/video-index.xlsx` (`bun run videos:index`) |
| Product code | `PVlayout_Advance`: `apps/solarlayout-desktop/solarlayout_desktop/` (UI), `packages/solar-core/solar_core/` (engine), `packages/solar-ui/solar_ui/` |
| Capture tool | `PVlayout_Advance/tools/docs_site_shots.py`, guide `CAPTURING_SCREENSHOTS.md` |
| Release tags | `solarlayout-vX.Y.Z.0`; the app shows `vX.Y.Z` (trailing `.0` dropped) |

## Release notes are the product owner's call

The docs' release entries use their own labels, which need not match the
product tags. As of 2026-09-28 the entries are 1.0.0, 1.2.0 and 2.1.0 (2.1.0 is
the Store / direct-download release carrying product `main` at `e93f6be`;
fact sheet §21). Before writing an entry, **ask the user** for the label and
date, and whether the change set is released or still pending. Write one
compact entry per release, distilled to what the reader gets; call out
changes that alter results (defaults, counts, sizing, formats) under their
own heading. Keep old entries as they are unless the user says otherwise.

## Screenshots: recapture, never pending

Every manifest entry must have its PNG (`bun run test:e2e` fails otherwise,
and the site ships no "Screenshot pending" placeholders). Images come from
the product's own render-to-PNG capture, never a desktop screen grab and
never the maximised window.

**Capture on Windows, real display.** `--offscreen` on Windows renders no
widget text at all; a macOS capture renders Helvetica and a native menu bar
outside the window. The set is Segoe UI with the menu bar drawn in-window.

**Inputs.** The run needs the test module and inverter files `Test.PAN` and
`Test-S.ond`. They are not in either repo — ask the user where they are, copy
them to your scratch directory. Everything else (the bundled sample site, a
three-plot variant, exports) the tool makes itself.

**Extend the tool first.** New windows and states need code in
`docs_site_shots.py` (a phase function or a block inside one). Patterns that
work:
- modal dialogs: `cap.dialog(name, action, prep)` — the patched `exec_`
  shows, runs `prep(dlg)`, grabs under the queued name, closes; to grab
  several states of one modal dialog, call `cap.grab(dlg, …)` inside `prep`;
- non-modal windows (`show()`): call the opener, grab the attribute directly
  (e.g. `w._earthing_dialog`), resize it to its opening size first;
- cards: `grab_card(cap, w, "<title prefix>", name)`; whole stage pages:
  `stage_page(w, stage)`; menus: match by menu title, never by position;
- file exports: patch `QFileDialog.getSaveFileName` with `save_name(path)`
  into `<out>/_files/`, then render PDF pages in the `renders` phase;
- a state that leaves a status-bar message behind (e.g. a forced "busy"
  state) goes **last** in its phase and clears the status afterwards, or the
  message leaks into every later whole-window frame.
Work on a product branch (`tools/docs-shots-<date>`), run `ruff check` on the
file, open a product PR for the tool change, and switch the product checkout
back to `main` when done.

**Run** (≈ 10–15 min, needs internet; a window flashes on screen throughout;
run it in the background):
```
uv run python tools/docs_site_shots.py --out <SCRATCH>/shots --pan <Test.PAN> --ond <Test-S.ond>
uv run --with pymupdf python tools/docs_site_shots.py --phase renders --out <SCRATCH>/shots
```
A single phase (`--phase main`, `fresh`, `halves`, …) can be re-run to fix
one area without redoing the rest. Set `PYTHONIOENCODING=utf-8` for any
probe script that prints labels with emoji.

**Verify before trusting.** Open a spread of PNGs (whole windows, dialogs,
cards, renders) and check: labels have text, the menu bar is in-window, no
stray status message, the state is the one the manifest describes. Compare
the captured file list with the manifest's `file` values (both sorted with
`LC_ALL=C`) so nothing referenced is missing.

**Install.** `git rm -r` the desktop folders under `public/screenshots/`
(never `bess/`), copy in exactly the files the manifest references, and
update each changed entry's `alt` / `what` / `state` to match its new image
— look at the image when you write the alt text. Record the capture date in
the manifest header. A frame that shows a product bug (e.g. a clipped field)
is dropped and reported, not documented.

## Other products and trees

A SolarLayout page never mentions BESS. `content/bess/**` is out of scope for
this product — don't touch it, even when BESS PRs merged in the same window.

## Gates

```
bun run lint && bun run typecheck && bun run build
BESS_REPO=<product repo> bun run test:e2e      # without BESS_REPO the BESS citation test fails
bun run screenshots:index
```
