# BESS Desktop — product reference for `update-docs`

## Where things are

| What | Path |
|---|---|
| Fact sheet | `docs/PRODUCT_FACTS.bess.md` — §9 known-stale list, §10 glossary. Its header has no "verified at" line yet: **add one** ("re-verified <date> against `main` at `<sha>`") so the next run has a baseline commit |
| Citation check | `BESS_REPO=<product repo> node scripts/check-bess-facts-citations.mjs` — every `file:line` must resolve; also run by `bun run test:e2e` |
| Pages | `content/bess/**`, served at `/docs/bess/**` (nav: each folder's `meta.json`) |
| Release notes | `content/bess/releases.mdx` — deliberately carries **no version history**; it says where the version and update history live. Don't add entries unless the user asks |
| Screenshot manifest | `content/bess/screenshots.ts` → images under `public/screenshots/bess/…`; ids always `bess-`-prefixed |
| Screenshot worklist | `docs/bess-screenshot-index.xlsx` (`bun run screenshots:index:bess`) |
| Video worklist | `content/bess/videos.mjs` → `docs/bess-video-index.xlsx` (`bun run videos:index:bess`) |
| Product code | `PVlayout_Advance`: `apps/bess-tool/bess_tool/` (a tkinter app; the main window is `seci_bess_gui.py`) |
| Release tags | `bess-vX.Y.Z.0` |

## The reader and the tree

The reader is a battery-storage / hybrid-renewables developer sizing and
financing solar- or wind-plus-storage projects. Domain vocabulary (C-rate,
DoD, round-trip efficiency, PPA, DSCR, curtailment) is defined on first use.

A BESS page never names the SolarLayout **product** — not by name, not as
"the other product", not as a cross-sell. "SolarLayout" as the supplier's
name (support, access, the download page `solarlayout.app/downloads/bess`)
is correct and expected. Everything else in `docs/WRITING_GUIDE.md` applies
unchanged.

## Screenshots: a person captures them

There is no capture tool for the tkinter app; the existing set was captured
by hand from the worklist. So the screenshot step is a hand-off:

1. For every image the change makes stale, and every new image a page needs,
   write or update the manifest entry with a precise `what` (what the frame
   must contain) and `state` (how to reach it from launch, with the inputs
   to use) — someone will follow it literally. Ask for the window at a fixed,
   stated size, never maximised: a maximised capture on a large screen gives
   specks for text. Older entries say "maximise"; correct them as you touch
   them.
2. `bun run screenshots:index:bess` and tell the user which rows need
   capturing (ids and files).
3. The site ships no "Screenshot pending" placeholders, so do not merge a
   page that references an uncaptured id. Either hold the PR until the files
   are dropped at `public/screenshots/bess/<file>` (no code change needed),
   or ship the prose now without the new `<Screenshot>` and add it with the
   capture. Ask the user which.
4. Delete image files no entry references any more.

A planned move of the app to Qt (product issue #240) would change every
screen at once; if it has merged, treat the whole set as stale. Whether to
build an automated BESS capture tool (like SolarLayout's) is the user's
call — offer it when most of the set is stale.

## The citation check proves less than it seems

`check-bess-facts-citations.mjs` confirms that each cited `file:line` exists,
not that the line still holds the cited fact. The main window file has grown
by thousands of lines since the sheet was written, so most citations point
at the wrong line while the check passes. Re-anchor citations during the
audit, file by file.

## Videos

`content/bess/videos.mjs` carries `say` lines that presenters read aloud, and
every factual sentence in them must come from the fact sheet. When a fact
changes, update the affected `say` lines and run `bun run videos:index:bess`.

## Other products and trees

`content/docs/**` (SolarLayout Desktop) is out of scope for a BESS update —
don't touch it.

## Gates

```
bun run lint && bun run typecheck && bun run build
BESS_REPO=<product repo> node scripts/check-bess-facts-citations.mjs
BESS_REPO=<product repo> bun run test:e2e
bun run screenshots:index:bess && bun run videos:index:bess
```
