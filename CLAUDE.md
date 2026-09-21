# solarlayout_desktop_docs — Claude Code context

Product documentation site for **SolarLayout Desktop** (and the BESS tool under
`content/bess/`), built with Next.js + Fumadocs. Content is MDX on disk.

## Before touching content

1. Read `docs/WRITING_GUIDE.md` — voice, structure, components, linking rules.
2. Read `docs/PRODUCT_FACTS.md` — **the only permitted factual source** for the
   desktop pages (`docs/PRODUCT_FACTS.bess.md` for BESS). If a number, label or
   behaviour is not there, verify it in the product repository
   (`PVlayout_Advance`: `apps/solarlayout-desktop/` and `packages/solar-core/`)
   and add it to the fact sheet with a `file:line` citation before writing it.
3. Never repeat anything in `PRODUCT_FACTS.md` §18 (known-stale sources). The
   product's in-app F1 guide is one of them.

## Screenshots are never pending

`content/screenshots.ts` is the manifest; every entry has its PNG under
`public/screenshots/`, and `bun run test:e2e` fails otherwise. When a UI change
makes an image stale, recapture it with the product repository's capture
tooling (`tools/ui_shots.py` / `tools/docs_screenshots.py`; see the product's
`CAPTURING_SCREENSHOTS.md` and
`docs/superpowers/plans/2026-09-21-desktop-docs-revamp.md` here) — never a
desktop screen-grab, never the maximised window. Delete stale files; do not
leave an old image behind a new id.

## Gates

```bash
bun run lint && bun run typecheck && bun run build   # CI runs these
bun run test:e2e                                      # run locally before a deploy
bun run screenshots:index                             # refresh docs/screenshot-index.xlsx
```

Deployment is manual (`.github/workflows/deployment.yml`); pushing never deploys.
